<template>
  <el-row class="toolbar"
          style="padding:10px 20px;width:99.7%;">
    <el-col :span="24">
      <el-alert title=""
                type="warning">
        <font color="black">
          备注：报表中商品的销量和库存指的是对应
          <font color="red">
            <big>缺货SKU</big>
          </font>
          的销量和库存之和
        </font>
      </el-alert>
    </el-col>
    <el-row>
      <el-col :span='2' style="margin-top:10px;">
        <el-input clearable
                  placeholder='search'
                  v-model='searchValue'
                  @change='handleSearch'></el-input>
      </el-col>
      <el-col :span='2' style="margin-top:10px;">
        <el-button style='float:left'
                   type='default'
                   @click='exportExcel'>导出Excel</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData"
              id="sale-table"
              :header-cell-style="thstyle"
              @sort-change="sortNumber"
              :height="tableHeight"
              v-loading="listLoading"
              element-loading-text="正在加载中..."
              style="zoom:0.9;">
      <el-table-column fixed
                       min-width="80"
                       prop="Season"
                       label="季节"
                       :formatter="empty"
                       sortable
                       align="center"></el-table-column>
      <el-table-column fixed
                       min-width="100"
                       prop="goodscode"
                       label="商品编码"
                       :formatter="empty"
                       sortable="custom"
                       align="center"></el-table-column>
      <el-table-column min-width="130"
                       prop="delay_days"
                       label="最大延迟天数"
                       :formatter="empty"
                       sortable="custom"
                       align="center"></el-table-column>
      <el-table-column min-width="90"
                       prop="num"
                       label="SKU数"
                       :formatter="empty"
                       sortable="custom"
                       align="center"></el-table-column>
      <el-table-column min-width="90"
                       prop="goodsname"
                       label="商品名"
                       :formatter="empty"
                       sortable
                       align="center"></el-table-column>
      <el-table-column min-width="100"
                       prop="GoodsCodeStat"
                       label="商品状态"
                       :formatter="empty"
                       sortable
                       align="center"></el-table-column>
      <el-table-column min-width="90"
                       prop="Purchaser"
                       label="采购人"
                       :formatter="empty"
                       sortable
                       align="center"></el-table-column>
      <el-table-column min-width="130"
                       prop="SalerName"
                       label="业绩归属人1"
                       :formatter="empty"
                       sortable
                       align="center"></el-table-column>
      <el-table-column min-width="130"
                       prop="StockDays"
                       label="采购到货天数"
                       :formatter="empty"
                       sortable="custom"
                       align="center"></el-table-column>
      <el-table-column min-width="130"
                       prop="sellDays"
                       label="预警销售天数"
                       :formatter="empty"
                       sortable="custom"
                       align="center"></el-table-column>
      <el-table-column min-width="100"
                       prop="SellCount1"
                       label="5天销量"
                       :formatter="empty"
                       sortable="custom"
                       align="center"></el-table-column>
      <el-table-column min-width="110"
                       prop="SellCount2"
                       label="10天销量"
                       :formatter="empty"
                       sortable="custom"
                       align="center"></el-table-column>
      <el-table-column min-width="110"
                       prop="SellCount3"
                       label="20天销量"
                       :formatter="empty"
                       sortable="custom"
                       align="center"></el-table-column>
      <el-table-column min-width="120"
                       prop="factStockNum"
                       label="实际库存量"
                       :formatter="empty"
                       sortable="custom"
                       align="center"></el-table-column>
      <el-table-column min-width="120"
                       prop="NotInStore"
                       label="采购未入库"
                       :formatter="empty"
                       sortable="custom"
                       align="center"></el-table-column>
      <el-table-column min-width="130"
                       prop="hopeUseNum"
                       label="预计可用库存"
                       :formatter="empty"
                       sortable="custom"
                       align="center"></el-table-column>
      <infinite-loading slot="append"
                        @infinite="infiniteHandler"
                        force-use-infinite-wrapper=".el-table__body-wrapper">
      </infinite-loading>
    </el-table>
  </el-row>
</template>

<script>
import { getStock } from '../../api/profit'
import { compareUp, compareDown } from '../../api/tools'
import InfiniteLoading from 'vue-infinite-loading'
export default {
  components: {
    InfiniteLoading
  },
  data() {
    return {
      tableHeight: null,
      listLoading: false,
      scrollPage: 1,
      scrollPageSize: 30,
      tableDataAll: [],
      tableData: [],
      searchTable: [],
      searchValue: '',
      searchData: [],
      filters: {
        page: 1,
        pageSize: null,
        total: null
      }
    }
  },
  methods: {
    thstyle({ row, column, rowIndex, columnIndex }) {
      if (
        (rowIndex === 0 && columnIndex === 2) ||
        columnIndex === 13 ||
        columnIndex === 15
      ) {
        // 指定坐标
        return 'color:red'
      } else {
        return ''
      }
    },
    // 数字排序
    sortNumber(column, prop, order) {
      const data = this.tableDataAll
      var ret = []
      if (column.order === 'descending') {
        ret = data.sort(compareDown(data, column.prop))
      } else {
        ret = data.sort(compareUp(data, column.prop))
      }
      this.tableDataAll = ret
      if (this.tableData.length === this.scrollPageSize) {
        this.tableData = data.slice(0, this.scrollPageSize)
        this.scrollPage = 1
      } else {
        this.tableData = []
        this.scrollPage = 0
      }
    },
    // 导出
    exportExcel() {
      const th = [
        '季节',
        '商品编码',
        'SKU数',
        '商品名称',
        '商品状态',
        '采购人',
        '业绩归属人',
        '采购到货天数',
        '预警销售天数',
        '5天销量',
        '10天销量',
        '20天销量',
        '实际库存量',
        '采购未入库',
        '预计可用库存'
      ]
      const filterVal = [
        'Season',
        'goodscode',
        'delay_days',
        'goodsname',
        'GoodsCodeStat',
        'Purchaser',
        'SalerName',
        'StockDays',
        'sellDays',
        'SellCount1',
        'SellCount2',
        'SellCount3',
        'factStockNum',
        'NotInStore',
        'hopeUseNum'
      ]
      const date = new Date()
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      if (month <= 9) {
        month = '0' + month
      }
      if (strDate <= 9) {
        strDate = '0' + strDate
      }
      const filename = '缺货产品表_' + year + '_' + month + '_' + strDate
      const data = this.tableDataAll.map(v => filterVal.map(k => v[k]))
      const [fileName, fileType, sheetName] = [filename, 'xls']
      this.$toExcel({ th, data, fileName, fileType, sheetName })
    },
    // 过滤
    handleSearch() {
      const searchValue = this.searchValue && this.searchValue.toLowerCase()
      const data = this.tableDataAll
      if (searchValue) {
        this.searchData = data.filter(function(row) {
          return Object.keys(row).some(function(key) {
            return (
              String(row[key])
                .toLowerCase()
                .indexOf(searchValue) > -1
            )
          })
        })
        this.tableDataAll = this.searchData
        this.tableData = this.searchData.slice(
          (this.scrollPage - 1) * this.scrollPageSize,
          this.scrollPageSize
        )
      } else {
        if (this.tableDataAll.length) {
          this.tableData = data.slice(
            (this.scrollPage - 1) * this.scrollPageSize,
            this.scrollPageSize
          )
        } else {
          this.tableData = this.searchTable.slice(
            (this.scrollPage - 1) * this.scrollPageSize,
            this.scrollPageSize
          )
        }
      }
    },
    empty(row, column, cellValue, index) {
      return cellValue || '--'
    },
    infiniteHandler($state) {
      if (this.tableDataAll.length) {
        var data = this.tableDataAll.slice(
          this.scrollPage * this.scrollPageSize,
          (this.scrollPage + 1) * this.scrollPageSize
        )
        if (data.length) {
          this.scrollPage += 1
          this.tableData.push(...data)
          $state.loaded()
        } else {
          $state.complete()
        }
      } else {
        var param = { total: null }
        param.page = this.scrollPage
        param.pageSize = this.scrollPageSize
        getStock(param).then(response => {
          const res = response.data.data
          if (res.items.length) {
            this.tableData.push(...res.items)
            $state.loaded()
          }
        })
      }
    },
    getData() {
      this.listLoading = true
      getStock(this.filters).then(response => {
        this.listLoading = false
        const res = response.data.data
        this.searchTable = this.tableDataAll = res.items
      })
    }
  },
  mounted() {
    this.tableHeight = document.documentElement.scrollHeight - 140
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
.el-col-2 {
  margin-bottom: 10px;
}
</style>

