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
                 label-width="6.8rem"
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
      <el-col :span="20">
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
                style="width: 100%">
        <el-table-column min-width="90"
                         prop="purchaser"
                         label="采购员"
                         :formatter="empty"
                         sortable></el-table-column>
        <el-table-column min-width="100"
                         prop="salemoneyrmbus"
                         label="成交价$"
                         :formatter="empty"
                         sortable="custom"></el-table-column>
        <el-table-column min-width="100"
                         prop="salemoneyrmbzn"
                         label="成交价￥"
                         :formatter="empty"
                         sortable="custom"></el-table-column>
        <el-table-column min-width="130"
                         prop="ppebayus"
                         label="交易费汇总$"
                         :formatter="empty"
                         sortable="custom"></el-table-column>
        <el-table-column min-width="130"
                         prop="ppebayzn"
                         label="交易费汇总￥"
                         :formatter="empty"
                         sortable="custom"></el-table-column>
        <el-table-column min-width="115"
                         prop="costmoneyrmb"
                         label="商品成本￥"
                         :formatter="empty"
                         sortable="custom"></el-table-column>
        <el-table-column min-width="115"
                         prop="expressfarermb"
                         label="运费成本￥"
                         :formatter="empty"
                         sortable="custom"></el-table-column>
        <el-table-column min-width="115"
                         prop="inpackagefeermb"
                         label="包装成本￥"
                         :formatter="empty"
                         sortable="custom"></el-table-column>
        <el-table-column min-width="115"
                         prop="devofflinefee"
                         label="死库处理￥"
                         :formatter="empty"
                         sortable="custom"></el-table-column>
        <el-table-column min-width="120"
                         prop="devopefee"
                         label="运营杂费￥"
                         :formatter="empty"
                         sortable="custom"></el-table-column>
        <el-table-column min-width="90"
                         prop="netprofit"
                         label="毛利￥"
                         :formatter="empty"
                         sortable="custom"></el-table-column>
        <el-table-column min-width="100"
                         prop="netrate"
                         label="毛利率%"
                         :formatter="empty"
                         sortable="custom"></el-table-column>
        <el-table-column min-width="120"
                         prop="totalamount"
                         label="采购差额￥"
                         :formatter="empty"
                         sortable="custom"></el-table-column>
      </el-table>
    </div>
    <div v-show="showis2">
      <el-table :data="tableData1"
                @sort-change="sortNumber1"
                max-height="670">
        <el-table-column prop="importDate"
                         label="导入时间"
                         sortable
                         min-width="120"></el-table-column>
        <el-table-column prop="type"
                         label="清仓类型"
                         min-width="100"
                         sortable></el-table-column>
        <el-table-column prop="developer"
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
                         sortable></el-table-column>
        <el-table-column prop="storeName"
                         label="仓库"
                         sortable></el-table-column>
        <el-table-column prop="goodsCode"
                         label="商品编码"
                         min-width="100"
                         sortable></el-table-column>
        <el-table-column prop="sku"
                         label="SKU"
                         min-width="100"
                         sortable></el-table-column>
        <el-table-column prop="goodsName"
                         label="商品名称"
                         min-width="100"
                         sortable></el-table-column>
        <el-table-column prop="createDate"
                         label="商品创建时间"
                         min-width="130"
                         sortable></el-table-column>
        <el-table-column prop="lastPurchaseDate"
                         label="最后采购时间"
                         min-width="130"
                         sortable></el-table-column>
        <el-table-column prop="checkNumber"
                         label="盘点数量"
                         min-width="100"
                         sortable="custom"
                         align="center"></el-table-column>
        <el-table-column prop="preCheckPrice"
                         label="盘前价格"
                         min-width="100"
                         sortable="custom"></el-table-column>
        <el-table-column prop="deadPrice"
                         label="盘少价格（死库）"
                         sortable="custom"
                         min-width="160"></el-table-column>
        <el-table-column prop="aftCheckPrice"
                         label="盘后价格"
                         sortable="custom"
                         min-width="100"></el-table-column>
        <el-table-column prop="aveAmount"
                         label="分摊死库"
                         min-width="105"
                         sortable></el-table-column>
        <el-table-column prop="purchaser"
                         label="采购"
                         sortable></el-table-column>
      </el-table>
      <div class="block toolbar">
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
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getMember, getPurchase,getOtherDeadFee  } from '../../api/profit'
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
  methods: {
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
    onSubmit1(form){
      const myform = JSON.parse(JSON.stringify(form))
      this.dead.member=myform.member
      this.dead.dateType=myform.dateType
      this.dead.dateRange=myform.dateRange
      const height = document.getElementById('app').clientHeight
      this.tableHeight = height - 220 + 'px'
      let admin = ''
          const username = sessionStorage.getItem('user')
          for (let i = 0; i < this.res.length; i++) {
            admin = this.res[i].username
          }
          if (username === admin || isAdmin() === true) {
            this.listLoading = true
            getOtherDeadFee(this.dead).then(response => {
              this.listLoading = false
              this.tableData1 = this.searchTable1 = response.data.data.items
              this.totalpur = response.data.data._meta.totalCount
              this.dead.page = response.data.data._meta.currentPage
              this.dead.pageSize = response.data.data._meta.perPage
            })
          } else {
            this.dead.member = this.member.map(m => {
              return m.username
            })
            this.listLoading = true
            getOtherDeadFee(this.dead).then(response => {
              this.listLoading = false
              this.tableData1 = this.searchTable1 = response.data.data.items
              this.totalpur = response.data.data._meta.totalCount
              this.dead.page = response.data.data._meta.currentPage
              this.dead.pageSize = response.data.data._meta.perPage
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
