<template>
  <div>
    <el-table
      :data="logData"
      style="width: 98%;margin-top:15px;margin-left:0.8%;font-size:14px;"
      border
      class="elTable"
      :height="tableHeight"
      :header-cell-style="getRowClass"
    >
      <el-table-column type="index" label="#" align="center" width="45"></el-table-column>
      <el-table-column prop="goodsName" label="商品名称" align="center"></el-table-column>
      <el-table-column prop="id" label="日志ID" align="center"></el-table-column>
      <el-table-column prop="ibaySuffix" label="ibay账号简称" align="center"></el-table-column>
      <el-table-column prop="SKU" label="SKU" align="center"></el-table-column>
      <el-table-column prop="mubanId" label="模板ID" align="center"></el-table-column>
      <el-table-column prop="creator" label="操作人" align="center"></el-table-column>
      <el-table-column prop="createDate" label="操作时间" align="center">
        <template slot-scope="scope">{{scope.row.createDate | cutOutDate}}</template>
      </el-table-column>
      <el-table-column prop="completeDate1" label="单属性完成时间" align="center">
        <template slot-scope="scope">{{scope.row.completeDate1 | cutOutDate}}</template>
      </el-table-column>
      <el-table-column prop="completeDate2" label="多属性完成时间" align="center">
        <template slot-scope="scope">{{scope.row.completeDate2 | cutOutDate}}</template>
      </el-table-column>
      <el-table-column prop="status1" label="单属性完成状态" align="center">
        <template slot-scope="scope">
          <a
            :class="scope.row.status1=='0'?'clasRed1':'clasGreen1'"
          >{{scope.row.status1=='0'?'未完成':'已完成'}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="status2" label="多属性完成状态" align="center">
        <template slot-scope="scope">
          <a
            :class="scope.row.status2=='0'?'clasRed1':'clasGreen1'"
          >{{scope.row.status2=='0'?'未完成':'已完成'}}</a>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.condition.page"
        :page-sizes="[50, 100, 150, 200]"
        :page-size="this.condition.pageSize"
        style="padding-left:0.75%;margin-top:8px"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total"
      ></el-pagination>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { getSmtLog } from "../../api/product.js";
export default {
  data() {
    return {
      tableHeight: window.innerHeight - 120,
      logData: [],
      total: 0,
      condition: {
        page: 1,
        pageSize: 50
      }
    };
  },
  filters: {
    cutOutDate(value) {
      value = value.substring(0, 11);
      return value;
    }
  },
  destroyed: function() {},
  methods: {
    handleSizeChange(val) {
      this.condition.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.condition.page = val;
      this.getData();
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "color:#3c8dbc;background:#f5f7fa";
      } else {
        return "";
      }
    },
    getData() {
      getSmtLog(this.condition).then(res => {
        this.logData = res.data.data.items;
        this.condition.page = res.data.data._meta.currentPage;
        this.condition.pageSize = res.data.data._meta.perPage;
        this.total = res.data.data._meta.totalCount;
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
<style lang="scss" scoped>
.clasRed1 {
  color: #f56c6c;
  border: rgba(245, 108, 108, 0.2) solid 1px;
  background: rgba(245, 108, 108, 0.1);
  width: 85%;
  margin: auto;
  line-height: 32px;
  display: block;
  border-radius: 5px;
}
.clasGreen1 {
  color: #0e9a00;
  border-radius: 5px;
  width: 85%;
  margin: auto;
  line-height: 32px;
  display: block;
  border: rgba(3, 82, 38, 0.2) solid 1px;
  background: rgba(33, 170, 95, 0.1);
}
</style>