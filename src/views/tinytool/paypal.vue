<template>
  <section>
    <el-form :inline="true" class="toolbar" :model="condition" label-width="100px">
      <el-form-item label="日期">
        <el-date-picker size="small" v-model="date" type="daterange" value-format="yyyy-MM-dd" range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="this.tableData" height="830" v-loading="loading">
      <el-table-column label="itemId" prop="itemId">
        <template slot-scope="scope">
          <a :href="'https://www.ebay.com/itm/'+scope.row.itemId" target="_blank">{{scope.row.itemId}}</a>
        </template>
      </el-table-column>
      <el-table-column label="payPal" prop="payPal"></el-table-column>
      <el-table-column label="卖家账号" prop="sellerUserId"></el-table-column>
      <el-table-column label="创建时间" prop="createdTime"></el-table-column>
    </el-table>
  </section>   
</template>

<script>
import { getPaypal } from '../../api/profit'
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
.toolbar{
  padding: 10px
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
