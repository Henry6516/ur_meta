<template>
  <section>
    <el-form :inline="true"
             class="toolbar"
             :model="condition"
             label-width="50px">
      <el-form-item label="日期">
        <el-date-picker size="small"
                        v-model="date"
                        style="width:250px;"
                        type="daterange"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button size="small"
                   type="primary"
                   @click="onSubmit">查询</el-button>
      </el-form-item>
    <el-table :data="this.tableData"
              :height="tabheight"
              v-loading="loading"
              element-loading-text="正在加载中..."
              class="elTableee"
              :header-cell-style="getRowClass" 
              border
              cellpadding="9"
              style="border: 1px solid #ebeef5;background-color:#fff;color:#606266;width:99%;border-collapse:collapse;margin-left:0.2%">
      <el-table-column label="itemId"
                       prop="itemId" align="center">
        <template slot-scope="scope">
          <a :href="'https://www.ebay.com/itm/'+scope.row.itemId"
             target="_blank">{{scope.row.itemId}}</a>
        </template>
      </el-table-column>
      <el-table-column label="payPal"
                       prop="payPal" align="center"></el-table-column>
      <el-table-column label="卖家账号"
                       prop="sellerUserId" align="center"></el-table-column>
      <el-table-column label="创建时间"
                       prop="createdTime" align="center"></el-table-column>
    </el-table>
  </el-form> 
  </section>
</template>

<script>
import { getPaypal } from '../../api/profit'
export default {
  data() {
    return {
      tabheight:window.innerHeight -178,
      loading: false,
      date: [],
      tableData: [],
      condition: {
        beginDate: '',
        endDate: ''
      }
    }
  },
  methods: {
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "color:#337ab7;background:#f5f7fa";
      } else {
        return "";
      }
    },
    onSubmit() {
      if (this.date !== null) {
        this.condition.beginDate = this.date[0]
        this.condition.endDate = this.date[1]
      } else {
        this.condition.beginDate = ''
        this.condition.endDate = ''
      }
      this.loading = true
      getPaypal(this.condition).then(response => {
        this.loading = false
        this.tableData = response.data.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.toolbar {
  padding: 10px;
}
a {
  color: #428bac;
  text-decoration: none;
}
a:hover {
  color: #2a6496;
  text-decoration: underline;
}
</style>
