<template>
  <section>
    <el-form :model="condition" :inline="true" class="toolbar" label-width="100px">
      <el-form-item label="日期">
        <el-date-picker @change="time" size="small" v-model="date" type="daterange" value-format="yyyy-MM-dd" range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="this.tableData" height="830" v-loading="loading">
      <el-table-column label="修改人" prop="editor"></el-table-column>
      <el-table-column label="订单编号" prop="tradeNid"></el-table-column>
      <el-table-column label="收货人" prop="shipToName"></el-table-column>
      <el-table-column label="邮编" prop="shipToZip"></el-table-column>
      <el-table-column label="修改时间" prop="createdTime"></el-table-column>
    </el-table>
  </section>   
</template>

<script>
import { getEdition } from '../../api/profit'
export default {
  data() {
    return {
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
.toolbar{
  padding-top: 10px
}
</style>
