<template>
  <div class="toolbar">
    <el-form :model='condition' :inline='true' ref='condition' label-width='8rem' class='demo-form-inline'>
      <el-form-item label="平台">
        <el-select size="small" v-model="condition.plat" clearable>
          <el-option v-for="item in plat" :key="item.plat" :value="item.plat"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="卖家简称">
        <el-select size="small" v-model="condition.suffix" clearable>
          <el-option v-for="item in suffix" :key="item.id" :value="item.store"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="业绩归属人1">
        <el-select size="small" v-model="condition.saler" clearable>
          <el-option v-for="(item,index) in saler" :index="index" :key="item.username" :value="item.username"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="onSubmit(condition)">查询</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span='2' :offset='19'>
        <el-input clearable placeholder='search' v-model='searchValue' @change='handleSearch'></el-input>
      </el-col>
      <el-col :span='2'>
        <el-button style='float:left' type='default' @click='exportExcel'>导出Excel</el-button>
      </el-col>
    </el-row>
    <div>
      <el-table v-loading="listLoading" max-height="760" :data="this.tableData" @sort-change=" sortNumber" v-show="show" style="width: 100%;">
        <el-table-column min-width="100" prop="GoodsCode" label="商品编码" :formatter="empty" sortable></el-table-column>
        <el-table-column min-width="100" prop="GoodsName" label="商品名称" :formatter="empty" sortable></el-table-column>
        <el-table-column min-width="100" prop="GoodsSKUStatus" label="商品状态" :formatter="empty" sortable></el-table-column>
        <el-table-column min-width="80" prop="CategoryName" label="类目" :formatter="empty" sortable></el-table-column>
        <el-table-column min-width="80" prop="SalerName" label="归属1" :formatter="empty" sortable></el-table-column>
        <el-table-column min-width="80" prop="SalerName2" label="归属2" :formatter="empty" sortable></el-table-column>
        <el-table-column min-width="100" prop="CreateDate" label="创建日期" :formatter="empty" sortable></el-table-column>
        <el-table-column min-width="110" prop="jinyitian" label="近1天销量" :formatter="empty" sortable></el-table-column>
        <el-table-column min-width="110" prop="shangyitian" label="上1天销量" :formatter="empty" sortable></el-table-column>
        <el-table-column min-width="130" prop="changeOneDay" label="1天销量变化" :formatter="empty" sortable></el-table-column>
        <el-table-column min-width="110" prop="jinwutian" label="近5天销量" :formatter="empty" sortable></el-table-column>
        <el-table-column min-width="110" prop="shangwutian" label="上5天销量" :formatter="empty" sortable></el-table-column>
        <el-table-column min-width="130" prop="changeFiveDay" label="5天销量变化" :formatter="empty" sortable></el-table-column>
        <el-table-column min-width="120" prop="jinshitian" label="近10天销量" :formatter="empty" sortable></el-table-column>
        <el-table-column min-width="120" prop="shangshitian" label="上10天销量" :formatter="empty" sortable></el-table-column>
        <el-table-column min-width="130" prop="changeTenDay" label="10天销量变化" :formatter="empty" sortable></el-table-column>
      </el-table>
    </div>
    <el-col :span="24" class="toolbar" v-show="total>0">
      <div class="pagination-container" align="right">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 500,1000,this.total]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </el-col>
  </div>
</template>

<script>
import {
  getPsales,
  getMember,
  getPlatform,
  getAccount
} from '../../api/profit'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { compareUp, compareDown } from '../../api/tools'
export default {
  data() {
    return {
      show: false,
      currentPage: 1,
      pageSize: 100,
      listLoading: false,
      tableData: [],
      searchTable: [],
      searchValue: '',
      total: null,
      plat: [],
      suffix: [],
      saler: [],
      condition: {
        plat: '',
        suffix: '',
        saler: '',
        start: 1,
        limit: 100
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.condition.limit = this.pageSize * this.currentPage
      this.listLoading = true
      getPsales(this.condition).then(response => {
        this.listLoading = false
        this.tableData = response.data.data.items
        this.total = Number(response.data.data.totalCount)
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.condition.start = (this.currentPage - 1) * this.pageSize + 1
      this.condition.limit = this.pageSize
      this.listLoading = true
      getPsales(this.condition).then(response => {
        this.listLoading = false
        this.tableData = response.data.data.items
        this.total = Number(response.data.data.totalCount)
      })
    },
    onSubmit() {
      this.show = true
      this.listLoading = true
      this.pageSize = 100
      this.currentPage = 1
      this.condition.start = 0
      this.condition.limit = 100
      getPsales(this.condition).then(response => {
        this.listLoading = false
        this.tableData = response.data.data.items
        this.total = Number(response.data.data.totalCount)
      })
    },
    // 导出
    exportExcel() {
      /* generate workbook object from table */
      var wb = XLSX.utils.table_to_book(document.querySelector('#sale-table'))
      /* get binary string as output */
      const date = new Date()
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      let hour = date.getHours()
      let minute = date.getMinutes()
      let second = date.getSeconds()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      if (hour >= 0 && hour <= 9) {
        hour = '0' + hour
      }
      if (minute >= 0 && minute <= 9) {
        minute = '0' + minute
      }
      if (second >= 0 && second <= 9) {
        second = '0' + second
      }
      const filename =
        '物流费用' + year + month + strDate + hour + minute + second
      var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: 'application/octet-stream' }),
          filename + '.xlsx'
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      //  return wbout
    },
    handleSearch() {
      const searchValue = this.searchValue && this.searchValue.toLowerCase()
      const data = this.searchTable
      if (searchValue) {
        this.tableData = data.filter(function(row) {
          return Object.keys(row).some(function(key) {
            return (
              String(row[key])
                .toLowerCase()
                .indexOf(searchValue) > -1
            )
          })
        })
      } else {
        this.tableData = data
      }
    },
    empty(row, column, cellValue, index) {
      return cellValue || '--'
    },
    sortNumber(column, prop, order) {
      const data = this.tableData
      if (column.order === 'descending') {
        this.tableData = data.sort(compareDown(data, column.prop))
      } else {
        this.tableData = data.sort(compareUp(data, column.prop))
      }
    }
  },
  mounted() {
    getMember().then(response => {
      const s = response.data.data
      this.saler = s.filter(e => e.position === '开发')
    })
    getPlatform().then(response => {
      this.plat = response.data.data
    })
    getAccount().then(response => {
      this.suffix = response.data.data
    })
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  padding-top: 1rem;
}
</style>
