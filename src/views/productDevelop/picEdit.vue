<template>
  <section class="toolbar">
    <el-row>
      <el-col :span="24" style="position: fixed;z-index: 999;overflow: hidden;border-bottom: #e4e7ed solid 1px; background: #eee;padding: 0">
        <span @click="attribute(log.name)" class="adClass" :class="log.name=='图片信息'?'actie':''" v-for="(log,index) in allMenu" :key="index">{{log.name}}</span>
      </el-col>
    </el-row>
    <el-col :span="24" style="margin-top: 50px;background: #fff;border-bottom: #ccc solid 1px;padding-left: 15px">
      <el-button type="primary"
                 @click="save">保存当前数据</el-button>
      <el-button type="primary"
                 @click="preserve">保存并完善</el-button>
      <el-button type="warning"
                 @click="upload">上传到FTP</el-button>
    </el-col>
    <el-table :data="tableData">
      <el-table-column type="index"
                       width="50">
      </el-table-column>
      <el-table-column type="selection"
                       width="55">
      </el-table-column>
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
                       label="SKU">
        <template slot-scope="scope">
          <el-input size="small"
                    disabled
                    v-model="scope.row.sku"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="linkUrl"
                       label="图片库地址">
        <template slot-scope="scope">
          <el-input size="small"
                    v-model="scope.row.linkUrl"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="property1"
                       label="款式1">
        <template slot-scope="scope">
          <el-input size="small"
                    disabled
                    v-model="scope.row.property1"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="property2"
                       label="款式2">
        <template slot-scope="scope">
          <el-input size="small"
                    disabled
                    v-model="scope.row.property2"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="property3"
                       label="款式3">
        <template slot-scope="scope">
          <el-input size="small"
                    disabled
                    v-model="scope.row.property3"></el-input>
        </template>
      </el-table-column>
    </el-table>
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
      APISavePictureInfo(this.tableData).then(res => {
        if (res.data.data[0] === 'success') {
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
      APIFinishPicture(this.condition).then(res => {
        if (res.data.data[0] === 'success') {
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
      APIPictureToFtp(this.condition).then(res => {
        if (res.data.data[0] === 'success') {
          this.$message({
            message: '保存成功!',
            type: 'success'
          })
        } else {
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
      console.log(this.allMenu)
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
</style>


