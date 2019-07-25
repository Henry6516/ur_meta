<template>
  <div>
    <el-form :model='form'
             :inline='true'
             ref='condition'
             label-width='6rem'
             class='demo-form-inline toolbar'>
      <el-form-item label='日期'
                    class='input'
                    prop="dateRange"
                    :rules="[{required: true, message: '请选择时间', trigger: 'blur'}]">
        <el-date-picker size="small"
                        v-model='form.dateRange'
                        type='daterange'
                        value-format='yyyy-MM-dd'
                        align='right'
                        style="width:250px;"
                        unlink-panels
                        range-separator='至'
                        start-placeholder='开始日期'
                        end-placeholder='结束日期'
                        :picker-options='pickerOptions2'>
        </el-date-picker>
      </el-form-item>
      <el-form-item label="物流公司">
        <el-select size="small"
                   v-model="condition.wlCompany"
                   clearable>
          <el-option v-for="item in wlCompany"
                     :key="item"
                     :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small"
                   type="primary"
                   @click="onSubmit(condition)"
                   style="margin-left:1px">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-input clearable
                  size="small"
                  placeholder='search'
                  v-model='searchValue'
                  @change='handleSearch'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button 
                   size="small" 
                   type='default'
                   @click='exportExcel'>导出Excel</el-button>
      </el-form-item>
    </el-form>
    <!-- <el-row class="toolbar">
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
    </el-row> -->
    <div v-loading="listLoading"
         element-loading-text="正在加载中...">
      <el-table id="sale-table"
                :header-row-style="rowheader"
                :height="tableHeight"
                :data="tableData"
                @sort-change="sortNumber"
                show-summary
                :summary-method="getSummaries"
                style="width: 100%;"
                border 
                class="elTableee"
                :header-cell-style="getRowClass"
                v-show="this.tableData.length>0">
        <el-table-column prop="wlCompany"
                         label="物流公司"
                         :formatter="empty"
                         sortable>
          <template slot-scope="scope">
            <span v-if="scope.row.wlCompany=='汇总'"
                  style="color:black;font-weight:600">{{scope.row.wlCompany}}</span>
            <span v-else-if="scope.row.wlCompany=='物流方式找不到物流公司'"
                  style="color:red">{{scope.row.wlCompany}}</span>
            <span v-else>{{scope.row.wlCompany}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="eBay"
                         label="eBay￥"
                         :formatter="empty"
                         sortable="custom">
          <template slot-scope="scope">
            <span v-if="scope.row.wlCompany=='汇总'"
                  style="color:black;font-weight:600">{{scope.row.eBay}}</span>
            <span v-else-if="scope.row.wlCompany=='物流方式找不到物流公司'"
                  style="color:red">{{scope.row.eBay}}</span>
            <span v-else>{{scope.row.eBay}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="Wish"
                         label="Wish￥"
                         :formatter="empty"
                         sortable="custom">
          <template slot-scope="scope">
            <span v-if="scope.row.wlCompany=='汇总'"
                  style="color:black;font-weight:600">{{scope.row.Wish}}</span>
            <span v-else-if="scope.row.wlCompany=='物流方式找不到物流公司'"
                  style="color:red">{{scope.row.Wish}}</span>
            <span v-else>{{scope.row.Wish}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="Amazon"
                         label="Amazon￥"
                         :formatter="empty"
                         sortable="custom">
          <template slot-scope="scope">
            <span v-if="scope.row.wlCompany=='汇总'"
                  style="color:black;font-weight:600">{{scope.row.Amazon}}</span>
            <span v-else-if="scope.row.wlCompany=='物流方式找不到物流公司'"
                  style="color:red">{{scope.row.Amazon}}</span>
            <span v-else>{{scope.row.Amazon}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="SMT"
                         label="SMT￥"
                         :formatter="empty"
                         sortable="custom">
          <template slot-scope="scope">
            <span v-if="scope.row.wlCompany=='汇总'"
                  style="color:black;font-weight:600">{{scope.row.SMT}}</span>
            <span v-else-if="scope.row.wlCompany=='物流方式找不到物流公司'"
                  style="color:red">{{scope.row.SMT}}</span>
            <span v-else>{{scope.row.SMT}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="Shopee"
                         label="Shopee￥"
                         :formatter="empty"
                         sortable="custom">
          <template slot-scope="scope">
            <span v-if="scope.row.wlCompany=='汇总'"
                  style="color:black;font-weight:600">{{scope.row.Shopee}}</span>
            <span v-else-if="scope.row.wlCompany=='物流方式找不到物流公司'"
                  style="color:red">{{scope.row.Shopee}}</span>
            <span v-else>{{scope.row.Shopee}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="Joom"
                         label="Joom￥"
                         :formatter="empty"
                         sortable="custom">
          <template slot-scope="scope">
            <span v-if="scope.row.wlCompany=='汇总'"
                  style="color:black;font-weight:600">{{scope.row.Joom}}</span>
            <span v-else-if="scope.row.wlCompany=='物流方式找不到物流公司'"
                  style="color:red">{{scope.row.Joom}}</span>
            <span v-else>{{scope.row.Joom}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="total"
                         label="合计￥"
                         :formatter="empty"
                         sortable="custom">
          <template slot-scope="scope">
            <span v-if="scope.row.wlCompany=='汇总'"
                  style="color:black;font-weight:600">{{scope.row.total}}</span>
            <span v-else-if="scope.row.wlCompany=='物流方式找不到物流公司'"
                  style="color:red">{{scope.row.total}}</span>
            <span v-else>{{scope.row.total}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="fare"
                         label="实际费用￥"
                         :formatter="empty"
                         sortable="custom">
          <template slot-scope="scope">
            <span v-if="scope.row.wlCompany=='汇总'"
                  style="color:black;font-weight:600">{{scope.row.fare}}</span>
            <span v-else-if="scope.row.wlCompany=='物流方式找不到物流公司'"
                  style="color:red">{{scope.row.fare}}</span>
            <span v-else>{{scope.row.fare}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getPerformlogistics, getPerformcost } from '../../api/profit'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { compareUp, compareDown } from '../../api/tools'
export default {
  data() {
    return {
      tableHeight: window.innerHeight - 165,
      form: {
        dateRange: []
      },
      show: false,
      listLoading: false,
      tableData: [],
      searchTable: [],
      searchValue: '',
      wlCompany: [],
      condition: {
        beginDate: '',
        endDate: '',
        wlCompany: ''
      },
      pickerOptions2: {
        shortcuts: [
          {
            text: '本月',
            onClick(picker) {
              const end = new Date()
              const y = end.getFullYear()
              let m = end.getMonth() + 1
              if (m < 10) {
                m = '0' + m
              }
              const firstday = y + '-' + m + '-' + '01'
              const start = new Date()
              const sy = start.getFullYear()
              let sm = start.getMonth() + 1
              const sd = start.getDate()
              if (sm < 10) {
                sm = '0' + sm
              }
              const sfirstday = sy + '-' + sm + '-' + sd
              picker.$emit('pick', [firstday, sfirstday])
            }
          },
          {
            text: '上个月',
            onClick(picker) {
              const nowdays = new Date()
              let year = nowdays.getFullYear()
              let month = nowdays.getMonth()
              if (month === 0) {
                month = 12
                year = year - 1
              }
              if (month < 10) {
                month = '0' + month
              }
              const firstDay = [year, month, '01'].join('-')
              const myDate = new Date(year, month, 0)
              const lastDay = [year, month, myDate.getDate()].join('-')
              picker.$emit('pick', [firstDay, lastDay])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }
        ]
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
      this.$refs.condition.validate(valid => {
        if (valid) {
          this.show = true
          this.listLoading = true
          this.condition.beginDate = this.form.dateRange[0]
          this.condition.endDate = this.form.dateRange[1]
          getPerformcost(this.condition).then(response => {
            this.listLoading = false
            const obj = response.data.data
            delete obj['allfee']
            const arr = []
            for (const i in obj) {
              arr.push(obj[i])
            }
            this.tableData = this.searchTable = arr
          })
        }
      })
    },
    rowheader({ row, rowIndex }) {
      return 'font-weight:600;color:black'
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
    // 合计
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
      return sums
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
    getPerformlogistics().then(response => {
      this.wlCompany = response.data.data
    })
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  padding-top: 10px;
}
</style>
