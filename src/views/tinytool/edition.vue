<template>
  <section>
    <el-form :model="condition"
             :inline="true"
             class="toolbar"
             label-width="60px">
      <el-form-item label="日期">
        <el-date-picker @change="time"
                        size="small"
                        v-model="date"
                        type="daterange"
                        value-format="yyyy-MM-dd"
                        style="width:250px;"
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
              style="width:98%;;margin-left:0.8%;">
      <el-table-column label="修改人"
                       prop="editor" align="center"></el-table-column>
      <el-table-column label="订单编号"
                       prop="tradeNid" align="center"></el-table-column>
      <el-table-column label="收货人"
                       prop="shipToName" align="center"></el-table-column>
      <el-table-column label="邮编"
                       prop="shipToZip" align="center"></el-table-column>
      <el-table-column label="修改时间"
                       prop="createdTime" align="center"></el-table-column>
    </el-table>
   </el-form> 
  </section>
</template>

<script>
import { getEdition } from '../../api/profit'
export default {
  data() {
    return {
      tabheight:window.innerHeight -165,
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
    time() {
      if (this.date !== null) {
        this.condition.beginDate = this.date[0]
        this.condition.endDate = this.date[1]
      } else {
        this.condition.beginDate = ''
        this.condition.endDate = ''
      }
    },
    onSubmit() {
      this.loading = true
      getEdition(this.condition).then(response => {
        this.loading = false
        this.tableData = response.data.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.toolbar {
  padding-top: 10px;
}
</style>
