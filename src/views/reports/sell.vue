<template>
  <!-- <div>销售毛利润报表</div>     -->
  <div class="toolbar">
    <div class='demo-block demo-box demo-zh-CN demo-transition'
         @mouseover='changeActive'
         @mouseout='removeActive'>
      <transition name='el-fade-in-linear'>
        <el-form :model='condition'
                 :inline='true'
                 ref='condition'
                 label-width='10rem'
                 class='demo-form-inline'
                 v-show='show'>
          <el-form-item label='部门'
                        class='input'>
            <el-select size="small"
                       v-model='condition.department'
                       multiple
                       collapse-tags
                       placeholder='部门'
                       @change='choosed'>
              <el-button plain
                         type="info"
                         @click="selectalld">全选</el-button>
              <el-button plain
                         type="info"
                         @click="noselectd">取消</el-button>
              <el-option v-for='(item,index) in department'
                         :index='index'
                         :key='item.department'
                         :label='item.department'
                         :value='item.department'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='二级部门'
                        class='input'>
            <el-select size="small"
                       v-model='condition.secDepartment'
                       multiple
                       collapse-tags
                       placeholder='二级部门'
                       @change='secChoosed'>
              <el-button plain
                         type="info"
                         @click="selectallSec">全选</el-button>
              <el-button plain
                         type="info"
                         @click="noselectSec">取消</el-button>
              <el-option v-for='(item,index) in secDepartment'
                         :index='index'
                         :key='item.department'
                         :label='item.department'
                         :value='item.department'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='平台'
                        class='input'>
            <el-select size="small"
                       v-model='condition.plat'
                       clearable
                       multiple
                       placeholder='平台'>
              <el-option v-for='(item,index) in plat'
                         :index='index'
                         :key='item.plat'
                         :label='item.plat'
                         :value='item.plat'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='销售员'
                        class='input'>
            <el-select size="small"
                       v-model='condition.member'
                       filterable
                       multiple
                       collapse-tags
                       placeholder='销售员'>
              <el-button plain
                         type="info"
                         @click="selectallm">全选</el-button>
              <el-button plain
                         type="info"
                         @click="noselectm">取消</el-button>
              <el-option v-for='(item,index) in member'
                         :index='index'
                         :key='item.username'
                         :label='item.username'
                         :value='item.username'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账号"
                        class="input">
            <el-select size="small"
                       v-model="condition.account"
                       filterable
                       multiple
                       collapse-tags
                       placeholder="账号">
              <el-button plain
                         type="info"
                         @click="selectall">全选</el-button>
              <el-button plain
                         type="info"
                         @click="noselect">取消</el-button>
              <el-option v-for="(item,index) in account"
                         :index="index"
                         :key="item.id"
                         :label="item.store"
                         :value="item.store">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='出货仓库'
                        class='input'>
            <el-select size="small"
                       v-model='condition.store'
                       filterable
                       multiple
                       collapse-tags
                       placeholder='请选择'>
              <el-button plain
                         type="info"
                         @click="selectalls">全选</el-button>
              <el-button plain
                         type="info"
                         @click="noselects">取消</el-button>
              <el-option v-for='item in store'
                         :key='item'
                         :value='item'>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='时间类型'
                        class='input'
                        prop='dateType'>
            <el-radio-group v-model='condition.dateType'>
              <el-radio border
                        v-for='(item,index) in dateType'
                        :index='index'
                        :key='item.id'
                        :label='item.id'
                        :value='item.id'
                        style="width:8.55rem">{{item.type}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label='日期'
                        class='input'
                        prop='dateRange'
                        :rules="[{required: true, message: '请选择时间', trigger: 'blur'}]">
            <el-date-picker size="small"
                            v-model='condition.dateRange'
                            type='daterange'
                            value-format='yyyy-MM-dd'
                            align='right'
                            unlink-panels
                            range-separator='至'
                            start-placeholder='开始日期'
                            end-placeholder='结束日期'
                            :picker-options='pickerOptions2'
                            style="width:18rem;">
            </el-date-picker>
          </el-form-item>
          <el-form-item style="margin-left:6rem">
            <el-button size="small"
                       type='primary'
                       class='input'
                       @click='onSubmit(condition)'>查询</el-button>
          </el-form-item>
        </el-form>
      </transition>
      <div class='demo-block-control'
           @click='handleChange'
           style='left:0rem'>
        <transition>
          <i :class="{'el-icon-caret-bottom':isA,'el-icon-caret-top':!isA}"
             class='transition-i'>
          </i>
        </transition>
        <transition>
          <span v-show='show1'
                class='transition-span'>{{text}}</span>
        </transition>
      </div>
    </div>
    <el-row>
      <el-col :span="19">
        <el-tabs v-model="activeName"
                 type="card"
                 @tab-click="handleClick">
          <el-tab-pane v-for="(item, index) in this.allMenu"
                       :label="item.name"
                       :name="item.name"
                       :key="index">
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span='2'>
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
    <!-- 毛利润报表 -->
    <el-table :data="tableData"
              id="sale-table"
              v-loading="listLoading"
              @sort-change="sortNumber"
              show-summary
              :summary-method="getSummaries"
              :height="tableHeight"
              :max-height="tableHeight"
              v-show="showTable.sell"
              style="width: 100%;zoom:0.53;">
      <el-table-column min-width="100"
                       prop="pingtai"
                       label="平台"
                       :formatter="empty"
                       sortable
                       align="center"></el-table-column>
      <el-table-column min-width="100"
                       prop="suffix"
                       label="账号"
                       :formatter="empty"
                       sortable
                       align="center"></el-table-column>
      <el-table-column min-width="120"
                       prop="salesman"
                       label="销售员"
                       :formatter="empty"
                       sortable
                       align="center"></el-table-column>
      <el-table-column min-width="130"
                       prop="salemoney"
                       label="成交价$"
                       :formatter="empty"
                       sortable="custom"
                       align="center"></el-table-column>
      <el-table-column min-width="160"
                       prop="salemoneyzn"
                       label="成交价￥"
                       :formatter="empty"
                       sortable="custom"
                       align="center"></el-table-column>
      <el-table-column min-width="190"
                       prop="ebayFeeebay"
                       label="eBay成交费$"
                       :formatter="empty"
                       sortable="custom"
                       align="center"></el-table-column>
      <el-table-column min-width="200"
                       prop="ebayfeeznebay"
                       label="eBay成交费￥"
                       :formatter="empty"
                       sortable="custom"
                       align="center"></el-table-column>
      <el-table-column min-width="170"
                       prop="ppFee"
                       label="PP成交费$"
                       :formatter="empty"
                       sortable="custom"
                       align="center"></el-table-column>
      <el-table-column min-width="180"
                       prop="ppFeezn"
                       label="PP成交费￥"
                       :formatter="empty"
                       sortable="custom"
                       align="center"></el-table-column>
      <el-table-column min-width="170"
                       prop="costmoney"
                       label="商品成本￥"
                       :formatter="empty"
                       sortable="custom"
                       align="center"></el-table-column>
      <el-table-column min-width="170"
                       prop="expressFare"
                       label="运费成本￥"
                       :formatter="empty"
                       sortable="custom"
                       align="center"></el-table-column>
      <el-table-column min-width="170"
                       prop="inpackagemoney"
                       label="包装成本￥"
                       :formatter="empty"
                       sortable="custom"
                       align="center"></el-table-column>
      <el-table-column min-width="140"
                       prop="storename"
                       label="发货仓库"
                       :formatter="empty"
                       sortable="custom"
                       align="center"></el-table-column>
      <el-table-column min-width="170"
                       prop="refund"
                       label="退款金额￥"
                       :formatter="empty"
                       sortable="custom"
                       align="center"></el-table-column>
      <el-table-column min-width="140"
                       prop="refundrate"
                       label="退款率%"
                       :formatter="empty"
                       sortable="custom"
                       align="center"></el-table-column>
      <el-table-column min-width="170"
                       prop="diefeeZn"
                       label="死库处理￥"
                       :formatter="empty"
                       sortable="custom"
                       align="center"></el-table-column>
      <el-table-column min-width="170"
                       prop="insertionFee"
                       label="店铺杂费￥"
                       :formatter="empty"
                       sortable="custom"
                       align="center"></el-table-column>
      <el-table-column min-width="170"
                       prop="saleOpeFeeZn"
                       label="运营杂费￥"
                       :formatter="empty"
                       sortable="custom"
                       align="center"></el-table-column>
      <el-table-column min-width="140"
                       prop="grossprofit"
                       label="毛利￥"
                       :formatter="empty"
                       sortable="custom"
                       align="center"></el-table-column>
      <el-table-column min-width="140"
                       prop="grossprofitRate"
                       label="毛利率%"
                       :formatter="empty"
                       sortable="custom"
                       align="center"></el-table-column>
    </el-table>
    <!-- 退款订单明细 -->
    <el-table :data="tableData1"
              @sort-change="sortNumber"
              max-height="670"
              v-show="showTable.order">
      <el-table-column prop="suffix"
                       label="账号"
                       sortable
                       align="center"></el-table-column>
      <el-table-column prop="salesman"
                       label="销售员"
                       sortable
                       align="center"></el-table-column>
      <el-table-column prop="goodsName"
                       label="商品名称"
                       sortable
                       align="center"></el-table-column>
      <el-table-column prop="goodsCode"
                       label="商品编码"
                       sortable
                       align="center"></el-table-column>
      <el-table-column prop="goodsSku"
                       label="商品SKU"
                       sortable
                       align="center"></el-table-column>
      <el-table-column prop="tradeId"
                       label="订单编号"
                       sortable
                       align="center"></el-table-column>
      <el-table-column prop="orderId"
                       label="店铺单号"
                       sortable
                       align="center"></el-table-column>
      <el-table-column prop="storeName"
                       label="仓库"
                       sortable
                       align="center"></el-table-column>
      <el-table-column prop="refund"
                       label="退款$"
                       sortable="custom"
                       align="center"></el-table-column>
      <el-table-column prop="refundZn"
                       label="退款￥"
                       sortable="custom"
                       :formatter="empty"
                       align="center"></el-table-column>
      <el-table-column prop="orderCountry"
                       label="国家"
                       sortable
                       align="center"></el-table-column>
      <el-table-column prop="expressWay"
                       label="物流方式"
                       sortable
                       align="center"></el-table-column>
      <el-table-column prop="platform"
                       label="平台"
                       sortable
                       align="center"></el-table-column>
      <el-table-column prop="orderTime"
                       label="交易时间"
                       align="center"></el-table-column>
      <el-table-column prop="refundTime"
                       label="退款时间"
                       align="center"></el-table-column>
    </el-table>
    <div class="block toolbar"
         v-show="showTable.order">
      <el-pagination background
                     @size-change='handleSizeChange'
                     @current-change='handleCurrentChange'
                     :current-page="this.condition.page"
                     :page-size="this.condition.pageSize"
                     :page-sizes="[10,20,30,40]"
                     layout="total,sizes,prev,pager,next,jumper"
                     :total="this.total">
      </el-pagination>
    </div>
    <!-- 退款产品明细 -->
    <el-table :data="tableData2"
              @sort-change="sortNumber"
              max-height="670"
              v-show="showTable.goods">
      <el-table-column prop="suffix"
                       label="账号"
                       sortable
                       align="center"></el-table-column>
      <el-table-column prop="goodsName"
                       label="商品名称"
                       sortable
                       align="center"></el-table-column>
      <el-table-column prop="goodsCode"
                       label="商品编码"
                       sortable
                       align="center"></el-table-column>
      <el-table-column prop="goodsSku"
                       label="商品SKU"
                       sortable
                       align="center"></el-table-column>
      <el-table-column prop="times"
                       label="退款次数"
                       sortable="custom"
                       align="center"></el-table-column>
      <el-table-column prop="salesman"
                       label="销售员"
                       sortable
                       align="center"></el-table-column>
    </el-table>
    <div class="block toolbar"
         v-show="showTable.goods">
      <el-pagination background
                     @size-change='handleSizeChangeGoods'
                     @current-change='handleCurrentChangeGoods'
                     :current-page="this.goods.page"
                     :page-size="this.goods.pageSize"
                     :page-sizes="[10,20,30,40]"
                     layout="total,sizes,prev,pager,next,jumper"
                     :total="this.total2">
      </el-pagination>
    </div>
    <!-- 死库明细 -->
    <el-table :data="tableData3"
              @sort-change="sortNumber"
              max-height="670"
              v-show="showTable.dead">
      <el-table-column prop="suffix"
                       label="账号"
                       sortable
                       align="center"></el-table-column>
      <el-table-column prop="storename"
                       label="出货仓库"
                       sortable
                       align="center"></el-table-column>
      <el-table-column prop="total"
                       label="总计"
                       sortable="custom"
                       align="center"></el-table-column>
      <el-table-column prop="dateTime"
                       label="时间"
                       sortable
                       align="center"></el-table-column>
      <el-table-column prop="salesman"
                       label="销售员"
                       sortable
                       align="center"></el-table-column>
    </el-table>
    <div class="block toolbar"
         v-show="showTable.dead">
      <el-pagination background
                     @size-change='handleSizeChangeDead'
                     @current-change='handleCurrentChangeDead'
                     :current-page="this.dead.page"
                     :page-size="this.dead.pageSize"
                     :page-sizes="[10,20,30,40]"
                     layout="total,sizes,prev,pager,next,jumper"
                     :total="this.total3">
      </el-pagination>
    </div>
    <!-- 杂费明细 -->
    <el-table :data="tableData4"
              @sort-change="sortNumber"
              max-height="670"
              v-show="showTable.extra">
      <el-table-column prop="suffix"
                       label="账号"
                       sortable
                       align="center"></el-table-column>
      <el-table-column prop="saleOpeFeeZn"
                       label="杂费"
                       sortable="custom"
                       align="center"></el-table-column>
      <el-table-column prop="dateTime"
                       label="时间"
                       sortable
                       align="center"></el-table-column>
      <el-table-column prop="salesman"
                       label="销售员"
                       sortable
                       align="center"></el-table-column>
    </el-table>
    <div class="block toolbar"
         v-show="showTable.extra">
      <el-pagination background
                     @size-change='handleSizeChangeExtra'
                     @current-change='handleCurrentChangeExtra'
                     :current-page="this.extra.page"
                     :page-size="this.extra.pageSize"
                     :page-sizes="[10,20,30,40]"
                     layout="total,sizes,prev,pager,next,jumper"
                     :total="this.total4">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  getSection,
  getSecDepartment,
  getPlatform,
  getMember,
  getStore,
  getAccount,
  getSales,
  getRefund,
  getDeadFee,
  getExtraFee
} from '../../api/profit'
import { isAdmin } from '../../api/api'
import {
  compareUp,
  compareDown,
  getMonthDate,
  getDateRangeType
} from '../../api/tools'
import { getMenu } from '../../api/login'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  data() {
    const vue = this
    return {
      total: null,
      total2: null,
      total3: null,
      total4: null,
      activeName: '毛利润报表',
      tableHeight: 0,
      allMember: [],
      isA: true,
      text: '显示输入框',
      show: true,
      show1: false,
      showTable: {
        sell: false,
        order: false,
        goods: false,
        report: false,
        dead: false,
        extra: false
      },
      allMenu: [],
      allDataOrder: [],
      allDataGoods: [],
      allDataDead: [],
      allDataExtra: [],
      tableData: [],
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      searchTable: [],
      searchTable1: [],
      searchTable2: [],
      searchTable3: [],
      searchTable4: [],
      searchValue: '',
      listLoading: false,
      department: [],
      allSecDep: [],
      secDepartment: [],
      plat: [],
      member: [],
      store: [],
      dateType: [{ id: 1, type: '发货时间' }, { id: 0, type: '交易时间' }],
      dateRange: [],
      account: [],
      condition: {
        department: [],
        secDepartment: [],
        plat: [],
        member: [],
        store: [],
        dateType: 1,
        dateRange: [],
        account: [],
        dateRangeType: 3,
        page: 1,
        pageSize: 10,
        suffix: [],
        type: 'order'
      },
      goods: {
        department: [],
        secDepartment: [],
        plat: [],
        member: [],
        dateRange: [],
        account: [],
        dateRangeType: 3,
        page: 1,
        pageSize: 10,
        type: 'goods'
      },
      order: {},
      dead: {
        plat: [],
        storename: [],
        account: [],
        member: [],
        dateRange: [],
        page: 1,
        pageSize: 10
      },
      extra: {
        plat: [],
        storename: [],
        account: [],
        member: [],
        dateRange: [],
        page: 1,
        pageSize: 10
      },
      pickerOptions2: {
        onPick(maxDate, minDate) {
          vue.condition.dateRangeType = 3
        },
        shortcuts: [
          {
            text: '本月',
            onClick(vm) {
              const date = getMonthDate('thisMonth')
              vm.$emit('pick', [date['start'], date['end']])
              vue.condition.dateRangeType = getDateRangeType(
                date['start'],
                date['end']
              )
            }
          },
          {
            text: '上个月',
            onClick(picker) {
              const date = getMonthDate('previousMonth')
              vue.condition.dateRangeType = 2
              picker.$emit('pick', [date['start'], date['end']])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const date = getMonthDate('lastMonth')
              vue.condition.dateRangeType = 1
              picker.$emit('pick', [date['start'], date['end']])
            }
          }
        ]
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.condition.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.condition.page = val
      this.getData()
    },
    handleSizeChangeGoods(val) {
      this.goods.pageSize = val
      this.getGoods()
    },
    handleCurrentChangeGoods(val) {
      this.goods.page = val
      this.getGoods()
    },
    handleSizeChangeDead(val) {
      this.dead.pageSize = val
      this.getDead()
    },
    handleCurrentChangeDead(val) {
      this.dead.page = val
      this.getDead()
    },
    handleSizeChangeExtra(val) {
      this.extra.pageSize = val
      this.getExtra()
    },
    handleCurrentChangeExtra(val) {
      this.extra.page = val
      this.getExtra()
    },
    handleClick(tab, event) {
      if (tab.label === '退款订单明细') {
        this.showTable['sell'] = false
        this.showTable['order'] = true
        this.showTable['goods'] = false
        this.showTable['report'] = false
        this.showTable['dead'] = false
        this.showTable['extra'] = false
        this.getData()
      } else if (tab.label === '退款产品明细') {
        this.showTable['sell'] = false
        this.showTable['order'] = false
        this.showTable['goods'] = true
        this.showTable['report'] = false
        this.showTable['dead'] = false
        this.showTable['extra'] = false
        this.getGoods()
      } else if (tab.label === '退款分析报告') {
        this.showTable['sell'] = false
        this.showTable['order'] = false
        this.showTable['goods'] = false
        this.showTable['report'] = true
        this.showTable['dead'] = false
        this.showTable['extra'] = false
      } else if (tab.label === '死库明细') {
        this.showTable['sell'] = false
        this.showTable['order'] = false
        this.showTable['goods'] = false
        this.showTable['report'] = false
        this.showTable['dead'] = true
        this.showTable['extra'] = false
        this.getDead()
      } else if (tab.label === '杂费明细') {
        this.showTable['sell'] = false
        this.showTable['order'] = false
        this.showTable['goods'] = false
        this.showTable['report'] = false
        this.showTable['dead'] = false
        this.showTable['extra'] = true
        this.getExtra()
      } else {
        this.showTable['sell'] = true
        this.showTable['order'] = false
        this.showTable['goods'] = false
        this.showTable['report'] = false
        this.showTable['dead'] = false
        this.showTable['extra'] = false
      }
    },
    selectalls() {
      const allValues = []
      for (const item of this.store) {
        allValues.push(item)
      }
      this.condition.store = allValues
    },
    noselects() {
      this.condition.store = []
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
    selectalld() {
      const allValues = []
      for (const item of this.department) {
        allValues.push(item.department)
      }
      this.condition.department = allValues
      this.member = this.allMember
    },
    noselectd() {
      this.condition.department = []
      this.member = this.allMember
    },
    selectallSec() {
      const allValues = []
      for (const item of this.secDepartment) {
        allValues.push(item.department)
      }
      this.condition.secDepartment = allValues
      this.member = this.allMember
    },
    noselectSec() {
      this.condition.secDepartment = []
      this.member = this.allMember
    },
    selectall() {
      const allValues = []
      for (const item of this.account) {
        allValues.push(item.store)
      }
      this.condition.account = allValues
    },
    noselect() {
      this.condition.account = []
    },
    choosed() {
      let res = []
      const val = this.condition.department

      // 二级部门处理
      const allDepartments = this.department
      const allDepartmentsMap = {}
      for (let i = 0; i < allDepartments.length; i++) {
        allDepartmentsMap[allDepartments[i].id] = allDepartments[i].department
      }

      // 人员处理
      res = this.allMember
      let per = []
      const secDep = []
      this.member = []
      this.condition.member = []
      if (val.length !== 0) {
        for (let i = 0; i < val.length; i++) {
          // 部门
          for (let k = 0; k < this.allSecDep.length; k++) {
            if (allDepartmentsMap[this.allSecDep[k].parent] === val[i]) {
              secDep.push(this.allSecDep[k])
            }
          }

          // 人员
          per = res.filter(
            ele =>
              (ele.department === val[i] || ele.parent_department === val[i]) &&
              ele.position === '销售'
          )
          this.member = this.member.concat(per)
        }
        this.secDepartment = secDep
      } else {
        this.member = res
        this.secDepartment = this.allSecDep
      }
    },
    secChoosed() {
      // 值变化之后人员要处理
      let res = []
      const val = this.condition.secDepartment
      // 人员处理
      res = this.allMember
      let per = []
      this.member = []
      this.condition.member = []
      if (val.length !== 0) {
        for (let i = 0; i < val.length; i++) {
          // 人员
          per = res.filter(
            ele => ele.department === val[i] && ele.position === '销售'
          )
          this.member = this.member.concat(per)
        }
      } else {
        this.member = res
      }
    },
    handleChange() {
      this.show = !this.show
      this.isA = !this.isA
      if (this.show === false) {
        this.text = '显示输入框'
        const height = document.getElementById('app').clientHeight
        this.tableHeight = height + 585 + 'px'
      } else if (this.show === true) {
        this.text = '隐藏输入框'
        const height = document.getElementById('app').clientHeight
        this.tableHeight = height + 362 + 'px'
      }
    },
    changeActive() {
      this.show1 = true
    },
    removeActive() {
      this.show1 = false
    },
    myForm(form) {
      const myform = JSON.parse(JSON.stringify(form))
      if (myform.member.length !== 0) {
        if (isAdmin() === false) {
          myform.member = this.condition.member
        }
      }
      // 根据选定的部门，处理人员
      if (myform.member.length === 0) {
        if (isAdmin() === false) {
          const name = this.$store.getters.name
          const res = this.allMember
          const per = res.filter(ele => ele.username === name)[0].department
          myform.member = res
            .filter(ele => ele.department === per)
            .map(m => {
              return m.username
            })
        }
        if (myform.department.length !== 0) {
          if (myform.secDepartment.length === 0) {
            const val = form.department
            const res = this.allMember
            for (let i = 0; i < val.length; i++) {
              const per = res.filter(
                ele => ele.department === val[i] && ele.position === '销售'
              )
              this.member.concat(per)
            }
            myform.member = this.member.map(m => {
              return m.username
            })
          }
          if (myform.secDepartment.length !== 0) {
            const val = form.secDepartment
            const res = this.allMember
            for (let i = 0; i < val.length; i++) {
              const per = res.filter(
                ele => ele.department === val[i] && ele.position === '销售'
              )
              this.member.concat(per)
            }
            myform.member = this.member.map(m => {
              return m.username
            })
          }
        } else {
          if (myform.secDepartment.length !== 0) {
            const val = form.secDepartment
            const res = this.allMember
            for (let i = 0; i < val.length; i++) {
              const per = res.filter(
                ele => ele.department === val[i] && ele.position === '销售'
              )
              this.member.concat(per)
            }
            myform.member = this.member.map(m => {
              return m.username
            })
          }
        }
      }
      return myform
    },
    onSubmit(form) {
      const height = document.documentElement.clientHeight
      this.tableHeight = height + 360
      this.showTable['sell'] = true
      this.showTable['order'] = false
      this.showTable['goods'] = false
      this.showTable['report'] = false
      this.showTable['dead'] = false
      this.showTable['extra'] = false
      this.activeName = '毛利润报表'
      this.$refs.condition.validate(valid => {
        if (valid) {
          const myform = this.myForm(form)
          this.listLoading = true
          getSales(myform).then(response => {
            this.listLoading = false
            this.tableData = this.searchTable = response.data.data
          })
        } else {
          return false
        }
      })
    },
    // 搜索
    handleSearch() {
      const searchValue = this.searchValue && this.searchValue.toLowerCase()
      if (this.activeName === '毛利润报表') {
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
      } else if (this.activeName === '退款订单明细') {
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
      } else if (this.activeName === '退款产品明细') {
        const data = this.searchTable2
        if (searchValue) {
          this.tableData2 = data.filter(function(row) {
            return Object.keys(row).some(function(key) {
              return (
                String(row[key])
                  .toLowerCase()
                  .indexOf(searchValue) > -1
              )
            })
          })
        } else {
          this.tableData2 = data
        }
      } else if (this.activeName === '死库明细') {
        const data = this.searchTable3
        if (searchValue) {
          this.tableData3 = data.filter(function(row) {
            return Object.keys(row).some(function(key) {
              return (
                String(row[key])
                  .toLowerCase()
                  .indexOf(searchValue) > -1
              )
            })
          })
        } else {
          this.tableData3 = data
        }
      } else if (this.activeName === '杂费明细') {
        const data = this.searchTable4
        if (searchValue) {
          this.tableData4 = data.filter(function(row) {
            return Object.keys(row).some(function(key) {
              return (
                String(row[key])
                  .toLowerCase()
                  .indexOf(searchValue) > -1
              )
            })
          })
        } else {
          this.tableData4 = data
        }
      }
    },
    // 数字排序
    sortNumber(column, prop, order) {
      if (this.activeName === '毛利润报表') {
        const data = this.tableData
        if (column.order === 'descending') {
          this.tableData = data.sort(compareDown(data, column.prop))
        } else {
          this.tableData = data.sort(compareUp(data, column.prop))
        }
      } else if (this.activeName === '退款订单明细') {
        const data = this.tableData1
        if (column.order === 'descending') {
          this.tableData1 = data.sort(compareDown(data, column.prop))
        } else {
          this.tableData1 = data.sort(compareUp(data, column.prop))
        }
      } else if (this.activeName === '退款产品明细') {
        const data = this.tableData2
        if (column.order === 'descending') {
          this.tableData2 = data.sort(compareDown(data, column.prop))
        } else {
          this.tableData2 = data.sort(compareUp(data, column.prop))
        }
      } else if (this.activeName === '死库明细') {
        const data = this.tableData3
        if (column.order === 'descending') {
          this.tableData3 = data.sort(compareDown(data, column.prop))
        } else {
          this.tableData3 = data.sort(compareUp(data, column.prop))
        }
      } else if (this.activeName === '杂费明细') {
        const data = this.tableData4
        if (column.order === 'descending') {
          this.tableData4 = data.sort(compareDown(data, column.prop))
        } else {
          this.tableData4 = data.sort(compareUp(data, column.prop))
        }
      }
    },
    // 小数和空值格式化
    empty(row, column, cellValue, index) {
      row.salemoneyzn = Math.round(row.salemoneyzn * 100) / 100
      row.ebayfeeznebay = Math.round(row.ebayfeeznebay * 100) / 100
      row.ppFeezn = Math.round(row.ppFeezn * 100) / 100
      row.refundrate = Math.round(row.refundrate * 100) / 100
      row.grossprofit = Math.round(row.grossprofit * 100) / 100
      row.refundZn = Math.round(row.refundZn * 100) / 100
      if (!isNaN(cellValue)) {
        return Number(cellValue)
      }
      return cellValue
    },
    // 导出
    exportExcel() {
      /* generate workbook object from table */
      if (this.activeName === '毛利润报表') {
        var wb = XLSX.utils.table_to_book(
          document.querySelector('#sale-table'),
          {
            raw: true
          }
        )
        var lastRow = wb.Sheets.Sheet1['!ref'].match(/\d+$/)[0]
        for (var ele in wb.Sheets.Sheet1) {
          var rowNumber = ele.replace(/[^0-9]+/g, '')
          if (rowNumber === lastRow) {
            delete wb.Sheets.Sheet1[ele]
            continue
          }
          const row = wb.Sheets.Sheet1[ele]
          try {
            if (!isNaN(row['v']) && row['v'] !== '') {
              row['t'] = 'n'
              row['v'] = Number(row['v'])
            }
          } catch (err) {
            console.log(err)
          }
        }
        /* get binary string as output */
        const filename = '销售毛利润报表'
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
      } else if (this.activeName === '退款订单明细') {
        this.order = Object.assign({}, this.condition)
        this.order.pageSize = this.total
        getRefund(this.order).then(res => {
          this.allDataOrder = res.data.data.items
          const Filename = '退款订单明细'
          const data = this.allDataOrder.map(v => filterVal.map(k => v[k]))
          const [fileName, fileType, sheetName] = [Filename, 'xls']
          this.$toExcel({ th, data, fileName, fileType, sheetName })
        })
        const th = [
          '账号',
          '退款月份',
          '销售员',
          '商品名称',
          '商品编码',
          '商品SKU',
          '订单编号',
          '店铺单号',
          '仓库',
          '退款$',
          '退款￥',
          '国家',
          '物流方式',
          '平台',
          '交易时间',
          '退款时间',
          '退款时间-交易时间(天)'
        ]
        const filterVal = [
          'suffix',
          'refMonth',
          'salesman',
          'goodsName',
          'goodsCode',
          'goodsSku',
          'tradeId',
          'orderId',
          'storeName',
          'refund',
          'refundZn',
          'orderCountry',
          'expressWay',
          'platform',
          'orderTime',
          'refundTime',
          'dateDelta'
        ]
      } else if (this.activeName === '退款产品明细') {
        this.order = Object.assign({}, this.goods)
        this.order.pageSize = this.total2
        getRefund(this.order).then(res => {
          this.allDataGoods = res.data.data.items
          const Filename = '退款产品明细'
          const data = this.allDataGoods.map(v => filterVal.map(k => v[k]))
          const [fileName, fileType, sheetName] = [Filename, 'xls']
          this.$toExcel({ th, data, fileName, fileType, sheetName })
        })
        const th = [
          '账号',
          '商品名称',
          '商品编码',
          '商品SKU',
          '退款次数',
          '销售员'
        ]
        const filterVal = [
          'suffix',
          'goodsName',
          'goodsCode',
          'goodsSku',
          'times',
          'salesman'
        ]
      } else if (this.activeName === '死库明细') {
        this.order = Object.assign({}, this.dead)
        this.order.pageSize = this.total3
        getDeadFee(this.order).then(res => {
          this.allDataDead = res.data.data.items
          const Filename = '死库明细'
          const data = this.allDataDead.map(v => filterVal.map(k => v[k]))
          const [fileName, fileType, sheetName] = [Filename, 'xls']
          this.$toExcel({ th, data, fileName, fileType, sheetName })
        })
        const th = ['账号', '发货仓库', '总计', '时间', '销售员']
        const filterVal = [
          'suffix',
          'storename',
          'total',
          'dateTime',
          'salesman'
        ]
      } else if (this.activeName === '杂费明细') {
        this.order = Object.assign({}, this.extra)
        this.order.pageSize = this.total4
        getExtraFee(this.order).then(res => {
          this.allDataExtra = res.data.data.items
          const Filename = '杂费明细'
          const data = this.allDataExtra.map(v => filterVal.map(k => v[k]))
          const [fileName, fileType, sheetName] = [Filename, 'xls']
          this.$toExcel({ th, data, fileName, fileType, sheetName })
        })
        const th = ['账号', '杂费', '时间', '销售员']
        const filterVal = ['suffix', 'saleOpeFeeZn', 'dateTime', 'salesman']
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
      // 退款率和利润率核算
      sums[fileds.indexOf('refundrate')] =
        Math.round(
          (sums[fileds.indexOf('refund')] * 10000) /
            sums[fileds.indexOf('salemoneyzn')]
        ) / 100
      sums[fileds.indexOf('grossprofitRate')] =
        Math.round(
          (sums[fileds.indexOf('grossprofit')] * 10000) /
            sums[fileds.indexOf('salemoneyzn')]
        ) / 100
      return sums
    },
    // 折叠导航栏
    collapse: function() {
      this.collapsed = !this.collapsed
    },
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        'submenu-hook-' + i
      )[0].style.display = status ? 'block' : 'none'
    },
    getData() {
      const myform = this.myForm(this.condition)
      getRefund(myform).then(res => {
        this.searchTable1 = this.tableData1 = res.data.data.items
        this.total = res.data.data._meta.totalCount
        this.condition.page = res.data.data._meta.currentPage
        this.condition.pageSize = res.data.data._meta.perPage
      })
    },
    getGoods() {
      this.goods.dateRange = this.condition.dateRange
      this.goods.account = this.condition.account
      this.goods.member = this.condition.member
      this.goods.dateRangeType = this.condition.dateRangeType
      this.goods.department = this.condition.department
      this.goods.secDepartment = this.condition.secDepartment
      this.goods.plat = this.condition.plat
      const myform = this.myForm(this.goods)
      getRefund(myform).then(res => {
        this.searchTable2 = this.tableData2 = res.data.data.items
        this.total2 = res.data.data._meta.totalCount
        this.goods.page = res.data.data._meta.currentPage
        this.goods.pageSize = res.data.data._meta.perPage
      })
    },
    getDead() {
      this.dead.plat = this.condition.plat
      this.dead.storename = this.condition.store
      this.dead.account = this.condition.account
      this.dead.member = this.condition.member
      this.dead.dateRange = this.condition.dateRange
      this.dead.department = this.condition.department
      this.dead.secDepartment = this.condition.secDepartment
      const myform = this.myForm(this.dead)
      getDeadFee(myform).then(res => {
        this.searchTable3 = this.tableData3 = res.data.data.items
        this.total3 = res.data.data._meta.totalCount
        this.dead.page = res.data.data._meta.currentPage
        this.dead.pageSize = res.data.data._meta.perPage
      })
    },
    getExtra() {
      this.extra.plat = this.condition.plat
      this.extra.storename = this.condition.store
      this.extra.account = this.condition.account
      this.extra.member = this.condition.member
      this.extra.dateRange = this.condition.dateRange
      this.extra.department = this.condition.department
      this.extra.secDepartment = this.condition.secDepartment
      const myform = this.myForm(this.extra)
      getExtraFee(myform).then(res => {
        this.searchTable4 = this.tableData4 = res.data.data.items
        this.total4 = res.data.data._meta.totalCount
        this.extra.page = res.data.data._meta.currentPage
        this.extra.pageSize = res.data.data._meta.perPage
      })
    }
  },
  mounted() {
    // 权限
    getMenu().then(response => {
      const res = response.data.data
      const menu = res.filter(e => e.name === '毛利润报表')
      for (let i = 0; i < menu.length; i++) {
        for (let j = 0; j < menu[i].children.length; j++) {
          if (menu[i].children[j].tabs.length) {
            this.allMenu = menu[i].children[j].tabs
          }
        }
      }
    })
    getSection().then(response => {
      const res = response.data.data
      this.department = res.filter(ele => ele.department && ele.type === '业务')
    })
    getSecDepartment().then(reseponse => {
      const res = reseponse.data.data
      this.secDepartment = this.allSecDep = res
    })
    getPlatform().then(response => {
      this.plat = response.data.data
    })
    getMember().then(response => {
      const res = response.data.data
      this.allMember = this.member = res.filter(ele => ele.position === '销售')
    })
    getStore().then(response => {
      this.store = response.data.data
    })
    getAccount().then(response => {
      this.account = response.data.data
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

