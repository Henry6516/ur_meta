<template>
  <!-- <div>采购毛利润报表</div>     -->
  <div class="toolbar">
    <div class="demo-block demo-box demo-zh-CN demo-transition"
         @mouseover="changeActive"
         @mouseout="removeActive">
      <transition name="el-fade-in-linear">
        <el-form :model="condition"
                 :inline="true"
                 ref="condition"
                 label-width="70px"
                 class="demo-form-inline"
                 v-show="show">
          <el-form-item label="采购员"
                        class="input">
            <el-select size="small"
                       v-model="condition.member"
                       multiple
                       collapse-tags
                       placeholder="采购员">
              <el-button plain
                         type="info"
                         @click="selectallm">全选</el-button>
              <el-button plain
                         type="info"
                         @click="noselectm">取消</el-button>
              <el-option v-for="(item,index) in member"
                         :index="item[index]"
                         :key="item.username"
                         :label="item.username"
                         :value="item.username"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="时间类型"
                        class="input"
                        prop="dateType">
            <el-radio-group v-model="condition.dateType">
              <el-radio border
                        v-for="(item,index) in dateType"
                        :index="index"
                        :key="item.id"
                        :label="item.id"
                        :value="item.id">{{item.type}}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="日期"
                        class="input"
                        prop="dateRange"
                        :rules="[{required: true, message: '请选择时间', trigger: 'blur'}]">
            <el-date-picker size="small"
                            v-model="condition.dateRange"
                            value-format="yyyy-MM-dd"
                            type="daterange"
                            align="right"
                            unlink-panels
                            style="width:250px;"
                            start-placeholder="开始日期"
                            range-separator="至"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions2">
            </el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-button size="small"
                       type="primary"
                       @click="onSubmit(condition)">查询</el-button>
          </el-form-item>
        </el-form>
      </transition>
      <div class="demo-block-control"
           @click="handleChange"
           style="left:0rem;">
        <transition>
          <i :class="{'el-icon-caret-bottom':isA,'el-icon-caret-top':!isA}"
             class="transition-i">
          </i>
        </transition>
        <transition>
          <span v-show="show1"
                class="transition-span">{{text}}</span>
        </transition>
      </div>
    </div>
    <el-row>
      <el-col :span="19">
        <el-tabs v-model="activeName"
                 type="card"
                 @tab-click="handleClick">
          <el-tab-pane label="毛利润报表"
                       name="first">
          </el-tab-pane>
          <el-tab-pane label="死库明细"
                       name="second">
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="2">
        <el-input clearable
                  placeholder="search"
                  v-model="searchValue"
                  @change="handleSearch"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button style="float:left;"
                   type="default"
                   @click="exportExcel">导出Excel</el-button>
      </el-col>
    </el-row>
    <div v-show="showis1">
      <el-table :data="tableData"
                id="sale-table"
                v-loading="listLoading"
                element-loading-text="正在加载中..."
                @sort-change="sortNumber"
                show-summary
                :summary-method="getSummaries"
                :height="tableHeight"
                :max-height="tableHeight"
                border 
                class="elTable"
                :header-cell-style="getRowClass" 
                style="width: 100%;font-size:13px;">
        <el-table-column min-width="90"
                         prop="purchaser"
                         label="采购员"
                          align="center"
                         :formatter="empty"
                         sortable></el-table-column>
        <el-table-column min-width="100"
                         prop="salemoneyrmbus"
                         label="成交价$"
                          align="center"
                         :formatter="empty"
                         sortable="custom">
                         <template slot-scope="scope">
                           {{scope.row.salemoneyrmbus | cutOut}}
                         </template>
                         </el-table-column>
        <el-table-column min-width="100"
                         prop="salemoneyrmbzn"
                         label="成交价￥"
                          align="center"
                         :formatter="empty"
                         sortable="custom">
                         <template slot-scope="scope">
                           {{scope.row.salemoneyrmbzn | cutOut}}
                         </template>
                         </el-table-column>
        <el-table-column min-width="130"
                         prop="ppebayus"
                          align="center"
                         label="交易费汇总$"
                         :formatter="empty"
                         sortable="custom">
                         <template slot-scope="scope">
                           {{scope.row.ppebayus | cutOut}}
                         </template>
                         </el-table-column>
        <el-table-column min-width="130"
                         prop="ppebayzn"
                          align="center"
                         label="交易费汇总￥"
                         :formatter="empty"
                         sortable="custom">
                         <template slot-scope="scope">
                           {{scope.row.ppebayzn | cutOut}}
                         </template>
                         </el-table-column>
        <el-table-column min-width="115"
                         prop="costmoneyrmb"
                         label="商品成本￥"
                          align="center"
                         :formatter="empty"
                         sortable="custom"></el-table-column>
        <el-table-column min-width="115"
                         prop="expressfarermb"
                         label="运费成本￥"
                          align="center"
                         :formatter="empty"
                         sortable="custom"></el-table-column>
        <el-table-column min-width="115"
                         prop="inpackagefeermb"
                         label="包装成本￥"
                          align="center"
                         :formatter="empty"
                         sortable="custom"></el-table-column>
        <el-table-column min-width="115"
                         prop="devofflinefee"
                         label="死库处理￥"
                          align="center"
                         :formatter="empty"
                         sortable="custom"></el-table-column>
        <el-table-column min-width="120"
                         prop="devopefee"
                         label="运营杂费￥"
                          align="center"
                         :formatter="empty"
                         sortable="custom"></el-table-column>
        <el-table-column min-width="100"
                         prop="netprofit"
                          align="center"
                         label="毛利￥"
                         :formatter="empty"
                         sortable="custom">
                         <template slot-scope="scope">
                           {{scope.row.netprofit | cutOut}}
                         </template>
                         </el-table-column>
        <el-table-column min-width="100"
                         prop="netrate"
                          align="center"
                         label="毛利率%"
                         :formatter="empty"
                         sortable="custom"></el-table-column>
        <el-table-column min-width="120"
                         prop="totalamount"
                          align="center"
                         label="采购差额￥"
                         :formatter="empty"
                         sortable="custom"></el-table-column>
      </el-table>
    </div>
    <div v-show="showis2">
      <el-table :data="tableData1"
                @sort-change="sortNumber1"
                :height="tableHeightOb"
                v-loading="load1"
                border 
                class="elTable"
                :header-cell-style="getRowClass" 
                style="width: 100%;font-size:13px;">
        <el-table-column prop="importDate"
                         label="导入时间"
                         sortable
                         align="center"
                         width="125">
                         <template slot-scope="scope">{{scope.row.importDate | cutOutDate}}</template>
                         </el-table-column>
        <el-table-column prop="type"
                         label="清仓类型"
                         align="center"
                         width="105"
                         sortable></el-table-column>
        <!-- <el-table-column prop="developer"
                         label="开发1"
                         sortable
                         min-width="100"></el-table-column>
        <el-table-column prop="developer2"
                         label="开发2"
                         sortable></el-table-column>
        <el-table-column prop="possessMan"
                         label="美工"
                         sortable></el-table-column>
        <el-table-column prop="introducer"
                         label="推荐人"
                         min-width="100"
                         sortable></el-table-column> -->
        <el-table-column prop="purchaser"
                         label="采购"
                         align="center"
                         sortable></el-table-column>
        <el-table-column prop="storeName"
                         label="仓库"
                         align="center"
                         sortable></el-table-column>
        <el-table-column prop="goodsCode"
                         label="商品编码"
                         align="center"
                         width="100"
                         sortable></el-table-column>
        <el-table-column prop="sku"
                         label="SKU"
                         align="center"
                         width="115"
                         sortable></el-table-column>
        <el-table-column prop="goodsName"
                         label="商品名称"
                         align="center"
                         width="130"
                         sortable></el-table-column>
        <el-table-column prop="createDate"
                         label="商品创建时间"
                         align="center"
                         width="130"
                         sortable>
                         <template slot-scope="scope">{{scope.row.createDate | cutOutDate}}</template>
                         </el-table-column>
        <el-table-column prop="createDate2"
                         label="时间辅助"
                         align="center"
                         width="100"
                         sortable></el-table-column>                 
        <el-table-column prop="lastPurchaseDate"
                         label="最后采购时间"
                         align="center"
                         width="130"
                         sortable>
                         <template slot-scope="scope">{{scope.row.lastPurchaseDate | cutOutDate}}</template>
                         </el-table-column>
        <el-table-column prop="checkNumber"
                         label="盘点数量"
                         width="100"
                         sortable="custom"
                         align="center"></el-table-column>
        <el-table-column prop="preCheckPrice"
                         label="盘前价格"
                         width="100"
                         align="center"
                         sortable="custom"></el-table-column>
        <el-table-column prop="deadPrice"
                         label="盘少价格（死库）"
                         sortable="custom"
                         align="center"
                         width="155"></el-table-column>
        <el-table-column prop="aftCheckPrice"
                         label="盘后价格"
                         sortable="custom"
                         align="center"
                         width="100"></el-table-column>
        <el-table-column prop="aveAmount"
                         label="分摊死库"
                         width="105"
                         align="center"
                         sortable></el-table-column>
      </el-table>
      <div class="block toolbar" style="overflow:hidden">
        <div style="float:left;">
        <el-pagination background
                       @size-change='handleSizeChangeDead'
                       @current-change='handleCurrentChangeDead'
                       :current-page="this.dead.page"
                       :page-size="this.dead.pageSize"
                       :page-sizes="[10,20,30,40]"
                       layout="total,sizes,prev,pager,next,jumper"
                       :total="this.totalpur">
        </el-pagination>
        </div>
        <div style="float:right">
          <p style="margin:0;font-size:14px;margin-right:18px;margin-top:5px;">分摊死库合计:<span style="color:red">{{totalPrice | cutOut}}</span></p>
        </div>          
        <div style="float:right">  
          <p style="margin:0;font-size:14px;margin-right:18px;margin-top:5px;">当前页分摊死库:<span style="color:red">{{currentPrice | cutOut}}</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {APIReportExport} from '../../api/product'
import { getMember, getPurchase,getOtherDeadFee  } from '../../api/profit'
import { compareUp, compareDown, getMonthDate } from '../../api/tools'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { isAdmin } from '../../api/api'

export default {
  data() {
    return {
      totalPrice:0,
      currentPrice:0,
      tableHeight: window.innerHeight -220,
      tableHeightOb:window.innerHeight -250,
      isA: true,
      text: '显示输入框',
      show: true,
      show1: false,
      show2: false,
      showis1:true,
      showis2:false,
      activeName: 'first',
      tableData: [],
      searchTable: [],
      tableData1:[],
      searchTable1:[],
      searchValue: '',
      totalpur:0,
      listLoading: false,
      load1:false,
      order: {},
      res: [],
      allDataDead:[],
      dead: {
        dateType: [],
        dateRange: [],
        role: 'purchaser',
        member: [],
        page: 1,
        pageSize: 20
      },
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
  filters: {
    cutOut: function(value) {
      value = Number(value).toFixed(2);
      return value;
    },
    cutOutDate(value){
      value = value.substring(0, 16);
      return value;
    },
  },
  methods: {
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "color:#3c8dbc;background:#f5f7fa";
      } else {
        return "";
      }
    },
    handleSizeChangeDead(val) {
      this.dead.pageSize = val
      this.onSubmit1(this.condition)
    },
    handleCurrentChangeDead(val) {
      this.dead.page = val
      this.onSubmit1(this.condition)
    },
    handleClick(tab, event){
      this.activeName = tab.name
      if (this.activeName === 'second') {
        this.showis1 = false
        this.showis2 = true
        this.onSubmit1(this.condition)
      } else {
        this.showis1 = true
        this.showis2 = false
        this.onSubmit(this.condition)
      }
    },
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
        this.tableHeightOb = height - 175 + 'px'
      } else if (this.show === true) {
        this.text = '隐藏输入框'
        const height = document.getElementById('app').clientHeight
        this.tableHeight = height - 220 + 'px'
        this.tableHeightOb = height - 250 + 'px'
      }
    },
    changeActive() {
      this.show1 = true
    },
    removeActive() {
      this.show1 = false
    },
    onSubmit1(form){
      this.load1=true
      const myform = JSON.parse(JSON.stringify(form))
      this.dead.member=myform.member
      this.dead.dateType=myform.dateType
      this.dead.dateRange=myform.dateRange
      const height = document.getElementById('app').clientHeight
      this.tableHeightOb = height - 250 + 'px'
      let admin = ''
          const username = sessionStorage.getItem('user')
          for (let i = 0; i < this.res.length; i++) {
            admin = this.res[i].username
          }
          if (username === admin || isAdmin() === true) {
            getOtherDeadFee(this.dead).then(response => {
              this.load1 = false
              this.tableData1 = this.searchTable1 = response.data.data.items
              this.totalpur = response.data.data._meta.totalCount
              this.dead.page = response.data.data._meta.currentPage
              this.dead.pageSize = response.data.data._meta.perPage
              let strNum=0;
              for(let i=0;i<this.tableData1.length;i++){
                  strNum=strNum+Number(this.tableData1[i].aveAmount)
              }
              this.totalPrice=response.data.data.extra.totalAveAmount
              this.currentPrice=strNum
            })
          } else {
            this.dead.member = this.member.map(m => {
              return m.username
            })
            getOtherDeadFee(this.dead).then(response => {
              this.load1 = false
              this.tableData1 = this.searchTable1 = response.data.data.items
              this.totalpur = response.data.data._meta.totalCount
              this.dead.page = response.data.data._meta.currentPage
              this.dead.pageSize = response.data.data._meta.perPage
              let strNum=0;
              for(let i=0;i<this.tableData1.length;i++){
                  strNum=strNum+Number(this.tableData1[i].aveAmount)
              }
              this.totalPrice=response.data.data.extra.totalAveAmount
              this.currentPrice=strNum
            })
          }
    },
    onSubmit(form) {
      if(this.activeName === 'second'){
        this.onSubmit1(form)
      }else {
        const myform = JSON.parse(JSON.stringify(form))
        const height = document.getElementById('app').clientHeight
        this.tableHeight = height - 220 + 'px'
        this.showis2 = false
        this.showis1 = true
        this.activeName = 'first'
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
            this.listLoading = false
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    handleSearch() {
      const searchValue = this.searchValue && this.searchValue.toLowerCase()
      if(this.activeName === 'first'){
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
      }else{
        const data = this.searchTable1
        if (searchValue) {
          this.tableData1 = data.filter(function(row) {
            return Object.keys(row).some(function(key) {
              return (
                      String(row[key])
                              .toLowerCase()
                              .indexOf(searchValue) > -1
              )
            })
          })
        } else {
          this.tableData1 = data
        }
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
    sortNumber1(column, prop, order) {
      const data = this.tableData1
      if (column.order === 'descending') {
        this.tableData1 = data.sort(compareDown(data, column.prop))
      } else {
        this.tableData1 = data.sort(compareUp(data, column.prop))
      }
    },
    // 导出
    exportExcel() {
      /* generate workbook object from table */
      if (this.activeName === 'first') {
        var wb = XLSX.utils.table_to_book(document.querySelector('#sale-table'), {
          raw: true
        })
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
                  new Blob([wbout], {type: 'application/octet-stream'}),
                  filename + '.xls'
          )
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, wbout)
        }
      }else{
        let arrTk={}
        let admin = ''
        arrTk.dateRange=this.condition.dateRange
        arrTk.dateRangeType=this.condition.dateType
        arrTk.role='purchaser'
        arrTk.pageSize=1000000
        arrTk.type='otherDeadFee'
        const username = sessionStorage.getItem('user')
        for (let i = 0; i < this.res.length; i++) {
         admin = this.res[i].username
        }
        if (username === admin || isAdmin() === true) {
           arrTk.member=this.condition.member
        } else {
          arrTk.member = this.member.map(m => {
           return m.username
         })
       }
        APIReportExport(arrTk).then(res => {
          const blob = new Blob([res.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
          })
          const downloadElement = document.createElement('a')
          const objectUrl = window.URL.createObjectURL(blob)
          downloadElement.href = objectUrl
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
                  '司库明细_' + year + month + strDate + hour + minute + second
          downloadElement.download = filename + '.xls'
          document.body.appendChild(downloadElement)
          downloadElement.click()
          document.body.removeChild(downloadElement)
        })
      }
    }
  },
  mounted() {
    getMember().then(response => {
      const res = response.data.data
      this.member = res.filter(ele => ele.position === '采购')
      this.res = res.filter(
        ele => ele.position === '主管' && ele.department === '采购部'
      )
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
