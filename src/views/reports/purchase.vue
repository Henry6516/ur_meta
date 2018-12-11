<template>
  <!-- <div>采购毛利润报表</div>     -->
  <div class="toolbar">
    <div class="demo-block demo-box demo-zh-CN demo-transition" @mouseover="changeActive" @mouseout="removeActive">
      <transition name="el-fade-in-linear">
        <el-form :model="condition" :inline="true" ref="condition" label-width="6.8rem" class="demo-form-inline" v-show="show">
          <el-form-item label="采购员" class="input">
            <el-select size="small" v-model="condition.member" multiple collapse-tags placeholder="采购员">
              <el-button plain type="info" @click="selectallm">全选</el-button>
              <el-button plain type="info" @click="noselectm">取消</el-button>
              <el-option v-for="(item,index) in member" :index="item[index]" :key="item.username" :label="item.username" :value="item.username"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="时间类型" class="input" prop="dateType">
            <el-radio-group v-model="condition.dateType">
              <el-radio border v-for="(item,index) in dateType" :index="index" :key="item.id" :label="item.id" :value="item.id">{{item.type}}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="日期" class="input" prop="dateRange" :rules="[{required: true, message: '请选择时间', trigger: 'blur'}]">
            <el-date-picker size="small" v-model="condition.dateRange" value-format="yyyy-MM-dd" type="daterange" align="right" unlink-panels start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期" :picker-options="pickerOptions2">
            </el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-button size="small" type="primary" @click="onSubmit(condition)">查询</el-button>
          </el-form-item>
        </el-form>
      </transition>
      <div class="demo-block-control" @click="handleChange" style="left:0rem;">
        <transition>
          <i :class="{'el-icon-caret-bottom':isA,'el-icon-caret-top':!isA}" class="transition-i">
          </i>
        </transition>
        <transition>
          <span v-show="show1" class="transition-span">{{text}}</span>
        </transition>
      </div>
    </div>
    <el-row>
      <el-col :span="2" :offset="19">
        <el-input clearable placeholder="search" v-model="searchValue" @change="handleSearch"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button style="float:left;" type="default" @click="exportExcel">导出Excel</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" id="sale-table" v-loading="listLoading" @sort-change="sortNumber" show-summary :summary-method="getSummaries" v-show="show2" :height="tableHeight" :max-height="tableHeight" style="width: 100%">
      <el-table-column min-width="90" prop="purchaser" label="采购员" :formatter="empty" sortable></el-table-column>
      <el-table-column min-width="100" prop="salemoneyrmbus" label="成交价$" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="100" prop="salemoneyrmbzn" label="成交价￥" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="130" prop="ppebayus" label="交易费汇总$" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="130" prop="ppebayzn" label="交易费汇总￥" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="115" prop="costmoneyrmb" label="商品成本￥" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="115" prop="expressfarermb" label="运费成本￥" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="115" prop="inpackagefeermb" label="包装成本￥" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="115" prop="devofflinefee" label="死库处理￥" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="120" prop="devopefee" label="运营杂费￥" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="90" prop="netprofit" label="毛利￥" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="100" prop="netrate" label="毛利率%" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column min-width="120" prop="totalamount" label="采购差额￥" :formatter="empty" sortable="custom"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getMember, getPurchase } from '../../api/profit'
import { compareUp, compareDown, getMonthDate } from '../../api/tools'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { isAdmin } from '../../api/api'

export default {
  data() {
    return {
      tableHeight: 0,
      isA: true,
      text: '显示输入框',
      show: true,
      show1: false,
      show2: false,
      tableData: [],
      searchTable: [],
      searchValue: '',
      listLoading: false,
      res: [],
      member: [],
      dateType: [{ id: 1, type: '发货时间' }, { id: 0, type: '交易时间' }],
      condition: {
        member: [],
        dateType: 1,
        dateRange: []
      },
      pickerOptions2: {
        shortcuts: [
          {
            text: '本月',
            onClick(vm) {
              const date = getMonthDate('thisMonth')
              vm.$emit('pick', [date['start'], date['end']])
            }
          },
          {
            text: '上个月',
            onClick(picker) {
              const date = getMonthDate('previousMonth')
              picker.$emit('pick', [date['start'], date['end']])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const date = getMonthDate('lastMonth')
              picker.$emit('pick', [date['start'], date['end']])
            }
          }
        ]
      }
    }
  },
  methods: {
    selectallm() {
      const allValues = []
      for (const item of this.member) {
        allValues.push(item.username)
      }
      this.condition.member = allValues
    },
    noselectm() {
      this.condition.member = []
    },
    handleChange() {
      this.show = !this.show
      this.isA = !this.isA
      if (this.show === false) {
        this.text = '显示输入框'
        const height = document.getElementById('app').clientHeight
        this.tableHeight = height - 140 + 'px'
      } else if (this.show === true) {
        this.text = '隐藏输入框'
        const height = document.getElementById('app').clientHeight
        this.tableHeight = height - 220 + 'px'
      }
    },
    changeActive() {
      this.show1 = true
    },
    removeActive() {
      this.show1 = false
    },
    onSubmit(form) {
      const myform = JSON.parse(JSON.stringify(form))
      const height = document.getElementById('app').clientHeight
      this.tableHeight = height - 220 + 'px'
      this.show2 = true
      let admin = ''
      this.$refs.condition.validate(valid => {
        if (valid) {
          const username = sessionStorage.getItem('user')
          for (let i = 0; i < this.res.length; i++) {
            admin = this.res[i].username
          }
          if (username === admin || isAdmin() === true) {
            this.listLoading = true
            getPurchase(myform).then(response => {
              this.listLoading = false
              this.tableData = this.searchTable = response.data.data
            })
          } else {
            myform.member = this.member.map(m => {
              return m.username
            })
            this.listLoading = true
            getPurchase(myform).then(response => {
              this.listLoading = false
              this.tableData = this.searchTable = response.data.data
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
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
      row.totalamount = Math.round(row.totalamount * 100) / 100
      if (!isNaN(cellValue)) {
        return Number(cellValue)
      }
      return cellValue
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      const fileds = columns.map(item => item.property)
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item =>
          Number(item[column.property] ? item[column.property] : 'unkonwn')
        )
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] = Math.round(sums[index] * 100) / 100
        } else {
          sums[index] = 'N/A'
        }
      })
      // 退款率和利润率核算
      sums[fileds.indexOf('netrate')] =
        Math.round(
          (sums[fileds.indexOf('netprofit')] * 10000) /
            sums[fileds.indexOf('salemoneyrmbzn')]
        ) / 100
      return sums
    },
    // 数字排序
    sortNumber(column, prop, order) {
      const data = this.tableData
      if (column.order === 'descending') {
        this.tableData = data.sort(compareDown(data, column.prop))
      } else {
        this.tableData = data.sort(compareUp(data, column.prop))
      }
    },
    // 导出
    exportExcel() {
      /* generate workbook object from table */
      var wb = XLSX.utils.table_to_book(document.querySelector('#sale-table'), { raw: true })
      var lastRow = wb.Sheets.Sheet1['!ref'].match(/\d+$/)[0]
      for (var ele in wb.Sheets.Sheet1) {
        var rowNumber = ele.replace(/[^0-9]+/g, '')
        if (rowNumber === lastRow) {
          delete wb.Sheets.Sheet1[ele]
          continue
        }
        const row = wb.Sheets.Sheet1[ele]
        try {
          if (!isNaN(row['v'])) {
            row['t'] = 'n'
            row['v'] = Number(row['v'])
          }
        } catch (err) {
          console.log(err)
        }
      }
      /* get binary string as output */
      const filename = '采购毛利润报表'
      var wbout = XLSX.write(wb, {
        bookType: 'xls',
        bookSST: true,
        type: 'array'
      })
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: 'application/octet-stream' }),
          filename + '.xls'
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
    }
  },
  mounted() {
    getMember().then(response => {
      const res = response.data.data
      this.member = res.filter(ele => ele.position === '采购')
      this.res = res.filter(ele => ele.position === '主管' && ele.department === '采购部')
    })
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  margin-bottom: 20px;
  .el-form-item {
    margin-bottom: 0px;
  }
}
</style>
