<template>
  <section class="toolbar">
    <el-col :span="24">
      <el-button type="primary"
                 @click="save">保存当前数据</el-button>
      <el-button type="primary"
                 @click="preserve ">保存并完善</el-button>
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
      <el-table-column prop=""
                       label="操作">
        <template slot-scope="scope">
          <el-tooltip content="查看">
            <i class="el-icon-view"
               @click="view(scope.$index, scope.row)"
               style="color: #409EFF;cursor:pointer;"></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="sku"
                       label="SKU">
        <template slot-scope="scope">
          <el-input size="small"
                    disabled
                    v-model="scope.row.sku"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="linkurl"
                       label="图片库地址">
        <template slot-scope="scope">
          <el-input size="small"
                    v-model="scope.row.linkurl"></el-input>
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
<script>
import {
  APIPictureInfo,
  APISavePictureInfo,
  APIFinishPicture,
  APIPictureToFtp
} from '../../api/product'
export default {
  data() {
    return {
      tableData: [],
      condition: {
        id: 5
      }
    }
  },
  methods: {
    //保存
    save() {
      APISavePictureInfo(this.tableData).then(res => {
        if (res.data.data[0] === 'success') {
          this.$message({
            message: '保存成功!',
            type: 'success'
          })
        } else {
          this.$message.error('保存失败!')
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
          this.$message.error('保存失败!')
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
          this.$message.error('保存失败!')
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
    this.getData()
    // this.condition.id = this.$route.params.id
  }
}
</script>
<style lang="scss" scoped>
.el-col {
  padding: 10px;
}
</style>


