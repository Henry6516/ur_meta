<template>
  <div>
    <div class="tabPurChase">
      <el-col :span="24" style="font-size:18px">生成采购SKU</el-col>
      <el-col :span="24">
        <el-button type="primary" size="small" style="margin-top:10px;" @click="create()" :disabled="qcFlag">开始生成</el-button>
      </el-col>
    </div>
    <el-col :span="24">
      <el-table
        :data="tableData"
        style="width: 98%;margin-left:0.8%;line-height:25px"
        v-loading="loading"
        class="testPurTable"
        border
        :height="tableHeight"
        :header-cell-style="getRowClass"
      >
        <el-table-column label="SKU列表" prop="value"></el-table-column>
      </el-table>
    </el-col>
  </div>
</template>

<script type="text/ecmascript-6">
import { getShortage } from "../../api/product";
export default {
  data() {
    return {
      loading: false,
      tableHeight: window.innerHeight - 190,
      qcFlag: false,
      tableData: []
    };
  },
  methods: {
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "color:#3c8dbc;background:#f5f7fa";
      } else {
        return "";
      }
    },
    create() {
      this.loading = true;
      this.qcFlag = true;
      getShortage().then(res => {
        const arr = []
        if (res.data.data.length < 8000) {
          let obj = {
            value: res.data.data
          };
          arr.push(obj)
          this.tableData = arr;
        } else {
          let attr = res.data.data;
          let strLength = 0;
          checked(8000);
          let obj1 = {
            value: attr.substring(0, strLength + 1)
          };
          let obj2 = {
            value: attr.substring(strLength + 1, attr.length)
          };
          arr.push(obj1)
          arr.push(obj2)
          this.tableData = arr
          function checked(length) {
            if (attr.charAt(length) == ",") {
              strLength = length;
              return;
            } else {
              checked(length - 1);
            }
          }
        }
        this.qcFlag = false;
        this.loading = false;
      });
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.tabPurChase {
  overflow: hidden;
  padding: 10px 15px;
}
</style>
<style>
.testPurTable .cell{
    line-height: 25px;
}
</style>