<template>
  <div>
    <el-form :model='condition'
             :inline='true'
             ref='condition'
             label-width='8rem'
             class='demo-form-inline'>
      <el-form-item label="平台">
        <el-select size="small"
                   v-model="condition.plat"
                   clearable
                   @change='platform'>
          <el-option v-for="item in plat"
                     :key="item.plat"
                     :value="item.plat"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="卖家简称">
        <el-select size="small"
                   v-model="condition.suffix"
                   clearable
                   multiple
                   collapse-tags>
          <el-button plain
                     type="info"
                     @click="selectall">全选</el-button>
          <el-button plain
                     type="info"
                     @click="noselect">取消</el-button>
          <el-option v-for="item in suffix"
                     :key="item.id"
                     :value="item.store"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="业绩归属人1">
        <el-select size="small"
                   v-model="condition.saler"
                   clearable>
          <el-option v-for="(item,index) in saler"
                     :index="index"
                     :key="item.username"
                     :value="item.username"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small"
                   type="primary"
                   @click="onSubmit(condition)">查询</el-button>
      </el-form-item>
    </el-form>
    <el-row class="toolbar">
      <el-col :span='2'
              :offset='19'>
        <el-input clearable
                  placeholder='search'
                  v-model='searchValue'
                  @change='handleSearch'></el-input>
      </el-col>
      <el-col :span='2'>
        <el-button style='float:left'
                   type='default'
                   @click='exportExcel'>导出Excel</el-button>
      </el-col>
    </el-row>
    <div>
      <el-table v-loading="listLoading"
                max-height="760"
                :data="this.tableData"
                @sort-change=" sortNumber"
                v-show="show"
                style="width: 100%;">
        <el-table-column min-width="100"
                         prop="GoodsCode"
                         label="商品编码"
                         :formatter="empty"
                         sortable></el-table-column>
        <el-table-column min-width="100"
                         prop="GoodsName"
                         label="商品名称"
                         :formatter="empty"
                         sortable></el-table-column>
        <el-table-column min-width="100"
                         prop="GoodsSKUStatus"
                         label="商品状态"
                         :formatter="empty"
                         sortable></el-table-column>
        <el-table-column min-width="80"
                         prop="CategoryName"
                         label="类目"
                         :formatter="empty"
                         sortable></el-table-column>
        <el-table-column min-width="80"
                         prop="SalerName"
                         label="归属1"
                         :formatter="empty"
                         sortable></el-table-column>
        <el-table-column min-width="80"
                         prop="SalerName2"
                         label="归属2"
                         :formatter="empty"
                         sortable></el-table-column>
        <el-table-column min-width="100"
                         prop="CreateDate"
                         label="创建日期"
                         :formatter="empty"
                         sortable></el-table-column>
        <el-table-column min-width="110"
                         prop="jinyitian"
                         label="近1天销量"
                         :formatter="empty"
                         sortable></el-table-column>
        <el-table-column min-width="110"
                         prop="shangyitian"
                         label="上1天销量"
                         :formatter="empty"
                         sortable></el-table-column>
        <el-table-column min-width="130"
                         prop="changeOneDay"
                         label="1天销量变化"
                         :formatter="empty"
                         sortable></el-table-column>
        <el-table-column min-width="110"
                         prop="jinwutian"
                         label="近5天销量"
                         :formatter="empty"
                         sortable></el-table-column>
        <el-table-column min-width="110"
                         prop="shangwutian"
                         label="上5天销量"
                         :formatter="empty"
                         sortable></el-table-column>
        <el-table-column min-width="130"
                         prop="changeFiveDay"
                         label="5天销量变化"
                         :formatter="empty"
                         sortable></el-table-column>
        <el-table-column min-width="120"
                         prop="jinshitian"
                         label="近10天销量"
                         :formatter="empty"
                         sortable></el-table-column>
        <el-table-column min-width="120"
                         prop="shangshitian"
                         label="上10天销量"
                         :formatter="empty"
                         sortable></el-table-column>
        <el-table-column min-width="130"
                         prop="changeTenDay"
                         label="10天销量变化"
                         :formatter="empty"
                         sortable></el-table-column>
      </el-table>
    </div>
    <el-col :span="24"
            class="toolbar"
            v-show="total>0">
      <div class="pagination-container"
           align="right">
        <el-pagination background
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[100, 200, 500,1000,this.total]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
      </div>
    </el-col>
  </div>
</template>

<script>
import { getPsales, getMember, getPlatform, getAccount } from '../../api/profit'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { compareUp, compareDown } from '../../api/tools'
export default {
  data() {
    return {
      allData: [],
      allSuffix: [],
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
        suffix: [],
        saler: '',
        start: 1,
        limit: 100
      }
    }
  },
  methods: {
    // 全选
    selectall() {
      const allValues = []
      for (const item of this.suffix) {
        allValues.push(item.store)
      }
      this.condition.suffix = allValues
    },
    noselect() {
      this.condition.suffix = []
    },
    platform() {
      if (this.condition.plat.length > 0) {
        this.suffix = this.allSuffix.filter(
          e => e.platform === this.condition.plat
        )
      } else if (this.condition.plat.length === 0) {
        this.suffix = this.allSuffix
      }
    },
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
      const th = [
        '商品编码',
        '商品名称',
        '商品状态',
        '类目',
        '归属1',
        '归属2',
        '创建日期',
        '近1天销量',
        '上1天销量',
        '1天销量变化',
        '近5天销量',
        '上5天销量',
        '5天销量变化',
        '近10天销量',
        '上10天销量',
        '10天销量变化'
      ]
      const filterVal = [
        'GoodsCode',
        'GoodsName',
        'GoodsSKUStatus',
        'CategoryName',
        'SalerName',
        'SalerName2',
        'CreateDate',
        'jinyitian',
        'shangyitian',
        'changeOneDay',
        'jinwutian',
        'shangwutian',
        'changeFiveDay',
        'jinshitian',
        'shangshitian',
        'changeTenDay'
      ]
      const form = Object.assign({}, this.condition)
      form.limit = this.total
      getPsales(form).then(response => {
        this.allData = response.data.data.items
        const Filename = '销售变化表'
        const data = this.allData.map(v => filterVal.map(k => v[k]))
        const [fileName, fileType, sheetName] = [Filename, 'xls']
        this.$toExcel({ th, data, fileName, fileType, sheetName })
      })
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
      this.allSuffix = this.suffix = response.data.data
    })
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  padding-top: 1rem;
}
</style>
