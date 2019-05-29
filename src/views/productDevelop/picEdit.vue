<template>
  <section class="toolbar">
    <!--<el-row>-->
      <!--<el-col :span="24" style="position: fixed;z-index: 999;overflow: hidden;border-bottom: #e4e7ed solid 1px; background: #eee;padding: 0">-->
        <!--<span @click="attribute(log.name)" class="adClass" :class="log.name=='图片信息'?'actie':''" v-for="(log,index) in allMenu" :key="index">{{log.name}}</span>-->
      <!--</el-col>-->
    <!--</el-row>-->
    <el-col :span="24" style="margin-top: 0px;background: #fff;border-bottom: #ccc solid 1px;padding-left: 15px">
      <el-button type="primary"
                 @click="save">保存当前数据</el-button>
      <el-button type="primary"
                 @click="preserve">保存并完善</el-button>
      <el-button type="warning"
                 @click="upload">上传到FTP</el-button>
    </el-col>
    <el-table :data="tableData">
      <el-table-column type="index"
      align="center"
                                 header-align="center"
                       width="50">
      </el-table-column>
      <!-- <el-table-column type="selection"
                       width="55">
      </el-table-column> -->
      <!--<el-table-column prop=""-->
                       <!--label="操作">-->
        <!--<template slot-scope="scope">-->
          <!--<el-tooltip content="查看">-->
            <!--<i class="el-icon-view"-->
               <!--@click="view(scope.$index, scope.row)"-->
               <!--style="color: #409EFF;cursor:pointer;"></i>-->
          <!--</el-tooltip>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column prop="sku"
       header-align="center"
                       label="SKU">
        <template slot-scope="scope">
          <el-input size="small"
                    disabled
                    v-model="scope.row.sku"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="linkUrl"
      width="570"
                        header-align="center" 
                       label="图片库地址">
        <template slot-scope="scope">
          <el-input size="small"
                    v-model="scope.row.linkUrl"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="linkUrl"
                       width="100" 
                        header-align="center"
                       label="图片">
        <template slot-scope="scope">
          <el-tooltip placement="right" :open-delay='10' class="exxHover" popper-class="page-login-toolTipClass">
                            <div slot="content"><img :src="scope.row.linkUrl" style="width: 300px;height: 300px;"></div>
                            <img :src="scope.row.linkUrl" style="width: 60px;height: 60px">
                        </el-tooltip>
          <!-- <img :src="scope.row.linkUrl" style="width:50px;height:50px;display: block;margin: auto"> -->
        </template>
      </el-table-column>
      <el-table-column prop="property1"
       header-align="center"
                       label="款式1">
        <template slot-scope="scope">
          <el-input size="small"
                    disabled
                    v-model="scope.row.property1"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="property2"
       header-align="center"
                       label="款式2">
        <template slot-scope="scope">
          <el-input size="small"
                    disabled
                    v-model="scope.row.property2"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="property3"
       header-align="center"
                       label="款式3">
        <template slot-scope="scope">
          <el-input size="small"
                    disabled
                    v-model="scope.row.property3"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <div :class="mask?'zhezhao':''"></div>
  </section>
</template>
<script type="text/ecmascript-6">
import {
  APIPictureInfo,
  APISavePictureInfo,
  APIFinishPicture,
  APIPictureToFtp
} from '../../api/product'
import { getMenu } from '../../api/login'
export default {
  data() {
    return {
      tableData: [],
      mask:false,
      allMenu:[],
      condition: {
        id: 0
      }
    }
  },
  methods: {
    attribute(name){
      if(name=='属性信息'){
        sessionStorage.setItem('judge', "属性信息")
        this.$router.push({
          path: `/v1/oa-goodsinfo/index`
        })
      }else if(name=='图片信息'){
        sessionStorage.setItem('judge', "图片信息")
        this.$router.push({
          path: `/v1/oa-goodsinfo/index`
        })
      }else {
        sessionStorage.setItem('judge', "平台信息")
        this.$router.push({
          path: `/v1/oa-goodsinfo/index`
        })
      }
    },
    //保存
    save() {
      let strObj={
        pictureInfo:this.tableData
      }
      APISavePictureInfo(strObj).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '保存成功!',
            type: 'success'
          })
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    //保存并完善
    preserve() {
      let strObj1={
        pictureInfo:this.tableData,
        id:this.condition.id
      }
      APIFinishPicture(strObj1).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '保存成功!',
            type: 'success'
          })
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    //上传
    upload() {
      this.mask=true
      APIPictureToFtp(this.condition).then(res => {
        if (res.data.code == 200) {
          this.mask=false
          this.$message({
            message: '保存成功!',
            type: 'success'
          })
        } else {
          this.mask=false
          this.$message.error(res.data.message)
        }
      })
    },
    view(index, row) {},
    getData() {
      APIPictureInfo(this.condition).then(res => {
        this.tableData = res.data.data
      })
    }
  },
  mounted() {
    this.condition.id = this.$route.params.id
    this.getData()
    getMenu().then(response => {
      const res = response.data.data
      const menu = res.filter(e => e.name === '产品中心')
      let arr=menu[0].children
      for(let i=0;i<arr.length;i++){
        if(arr[i].name=="产品资料"){
          this.allMenu=arr[i].tabs
        }
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.el-col {
  padding: 10px;
}
.adClass{
  display: block;
  float: left;
  padding: 14px 30px;
  border-right: 1px solid #e4e7ed;
  cursor: pointer;
}
.actie{
  color: #409EFF;
}
.adClass:hover{
  color: #409EFF;
}
.zhezhao{
  width: 200%;
  background: #000;
  height: 100%;
  position: fixed;
  opacity: 0.4;
  top: 0;
  left: -20rem;
  z-index: 999;
}
</style>


