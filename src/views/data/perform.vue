<template>
  <div class="perBac" :style="obj">
    <el-form :model='form'
             :inline='true'
             ref='condition'
             label-width='100px'
             class='demo-form-inline toolbar'>
      <el-form-item label='交易日期'
                    prop="dateRange"
                    :rules="[{required: true, message: '请选择时间', trigger: 'blur'}]">
        <el-date-picker size="small"
                        v-model='form.dateRange'
                        @change="time('exchange')"
                        type='daterange'
                        value-format='yyyy-MM-dd'
                        style="width:250px;"
                        range-separator='至'
                        start-placeholder='开始日期'
                        end-placeholder='结束日期'
                        :picker-options='pickerOptions'>
        </el-date-picker>
      </el-form-item>
      <el-form-item label='新品日期'>
        <el-date-picker size="small"
                        v-model='form.newRange'
                        @change="time('product')"
                        type='daterange'
                        value-format='yyyy-MM-dd'
                        style="width:250px;"
                        range-separator='至'
                        start-placeholder='开始日期'
                        end-placeholder='结束日期'
                        :picker-options='pickerOptions2'>
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button size="small"
                   type="primary"
                   style="margin-left:1px"
                   @click="onSubmit(condition)">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="tab tabwidth"
         v-show="show"
         v-loading="listLoading"
         element-loading-text="正在加载中...">
      <el-row>
        <el-card>
        <el-col :span="12" style="padding:15px 0">
          <Myechart :options="option"
                    ref="myechart"></Myechart>
        </el-col>
        <el-col :span="12" style="padding:15px 0">
          <Myechartlre :options="options"
                       ref="myechartlre"></Myechartlre>
        </el-col>
        </el-card>
      </el-row>
      <div style="margin-top:15px;margin-bottom:15px;">
      <el-card>
      <el-tabs v-model="activeName"
               class="perDemoTab" 
               @tab-click="handleClick"
               v-show="this.tableData1.length>0?true:false">
        <el-tab-pane label="所有状态"
                     name="first">
          <el-table :header-row-style="rowheader"
                    @sort-change="sortNumber1"
                    show-summary
                    :summary-method="getSummaries"
                    max-height="630"
                    :data="tableData1"
                    border 
                    class="elTableee"
                    :header-cell-style="getRowClass" 
                    style="width: 100%;">
            <el-table-column fixed
                             min-width="125"
                             prop="salername"
                             label="业绩归属人1"
                             :formatter="empty"
                             align="center"
                             sortable></el-table-column>
            <el-table-column min-width="102"
                             prop="goodsNum"
                             label="商品总数"
                             align="center"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="115"
                             prop="SoldNum"
                             label="出单商品数"
                             align="center"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="100"
                             prop="SoldRate"
                             label="出单率%"
                             align="center"
                             :formatter="empty"
                             sortable="custom"></el-table-column>  
            <el-table-column width="102"
                             prop="SkuSoldNum"
                             label="销量数量"
                             align="center"
                             v-if="showOpen.sy"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column width="130"
                             prop="saleMoneyRmb"
                             align="center"
                             label="销售额(RMB)"
                             v-if="showOpen.sy"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column width="115"
                             prop="profitRmb"
                             label="利润(RMB)"
                             align="center"
                             v-if="showOpen.sy"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column width="100"
                             prop="ProfitRate"
                             label="利润率%"
                             align="center"
                             v-if="showOpen.sy"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column width="150"
                             prop="wishSoldNum"
                             label="Wish出单商品数"
                             v-if="showOpen.sy"
                             align="center"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column width="135"
                             prop="wishRate"
                             v-if="showOpen.sy"
                             align="center"
                             label="Wish出单率%"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column width="150"
                             prop="eabySoldNum"
                             v-if="showOpen.sy"
                             align="center"
                             label="eBay出单商品数"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column width="135"
                             prop="eBayRate"
                             v-if="showOpen.sy"
                             align="center"
                             label="eBay出单率%"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column width="145"
                             prop="SMTSoldNum"
                             v-if="showOpen.sy"
                             align="center"
                             label="SMT出单商品数"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column width="130"
                             prop="SMTRate"
                             v-if="showOpen.sy"
                             align="center"
                             label="SMT出单率%"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column width="170"
                             prop="amaSoldNum"
                             v-if="showOpen.sy"
                             align="center"
                             label="Amazon出单商品数"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column width="155"
                             prop="amaRate"
                             align="center"
                             v-if="showOpen.sy"
                             label="Amazon出单率%"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column width="110"
                             label="操作"
                             align="center"
                             :formatter="empty">
                             <template slot-scope="scope">
                                <el-tooltip content="查看">
                                  <i
                                    v-if="!showOpen.sy"
                                    class="el-icon-circle-plus-outline"
                                    @click="openSy(scope.$index, scope.row)"
                                    style="color: #409EFF;cursor:pointer;"
                                  ></i>
                                  <i
                                    v-if="showOpen.sy"
                                    class="el-icon-remove-outline"
                                    @click="openSy(scope.$index, scope.row)"
                                    style="color: #409EFF;cursor:pointer;"
                                  ></i>
                                </el-tooltip>
                              </template>
                             </el-table-column>                 
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="爆款"
                     name="second">
          <el-table :header-row-style="rowheader"
                    @sort-change="sortNumber2"
                    show-summary
                    :summary-method="getSummaries"
                    max-height="630"
                    :data="tableData2"
                    border 
                    class="elTableee"
                    :header-cell-style="getRowClass"
                    style="width: 100%;">
            <el-table-column fixed
                             min-width="125"
                             prop="salername"
                             label="业绩归属人1"
                             :formatter="empty"
                             align="center"
                             sortable></el-table-column>
            <el-table-column min-width="102"
                             prop="goodsNum"
                             label="商品总数"
                             align="center"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="102"
                             prop="SoldNum"
                             label="爆款总数"
                             align="center"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="100"
                             prop="SoldRate"
                             label="爆款率%"
                             align="center"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column width="102"
                             prop="SkuSoldNum"
                             label="销量数量"
                             v-if="showOpen.bk"
                             align="center"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column width="130"
                             prop="saleMoneyRmb"
                             align="center"
                             v-if="showOpen.bk"
                             label="销售额(RMB)"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column width="115"
                             prop="profitRmb"
                             label="利润(RMB)"
                             v-if="showOpen.bk"
                             align="center"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column width="100"
                             prop="ProfitRate"
                             label="利润率%"
                             v-if="showOpen.bk"
                             align="center"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column width="122"
                             prop="wishSoldNum"
                             label="Wish爆款数"
                             v-if="showOpen.bk"
                             align="center"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column width="162"
                             prop="wishRate"
                             v-if="showOpen.bk"
                             label="Wish爆款贡献率%"
                             align="center"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column width="122"
                             prop="eabySoldNum"
                             v-if="showOpen.bk"
                             align="center"
                             label="eBay爆款数"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column width="162"
                             prop="eBayRate"
                             v-if="showOpen.bk"
                             align="center"
                             label="eBay爆款贡献率%"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column width="120"
                             prop="SMTSoldNum"
                             v-if="showOpen.bk"
                             align="center"
                             label="SMT爆款数"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column width="160"
                             prop="SMTRate"
                             label="SMT爆款贡献率%"
                             v-if="showOpen.bk"
                             align="center"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column width="145"
                             prop="amaSoldNum"
                             label="Amazon爆款数"
                             v-if="showOpen.bk"
                             align="center"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column width="185"
                             prop="amaRate"
                             label="Amazon爆款贡献率%"
                             v-if="showOpen.bk"
                             align="center"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column width="110"
                             label="操作"
                             align="center"
                             :formatter="empty">
                             <template slot-scope="scope">
                                <el-tooltip content="查看">
                                  <i
                                    v-if="!showOpen.bk"
                                    class="el-icon-circle-plus-outline"
                                    @click="openBk(scope.$index, scope.row)"
                                    style="color: #409EFF;cursor:pointer;"
                                  ></i>
                                  <i
                                    v-if="showOpen.bk"
                                    class="el-icon-remove-outline"
                                    @click="openBk(scope.$index, scope.row)"
                                    style="color: #409EFF;cursor:pointer;"
                                  ></i>
                                </el-tooltip>
                              </template>
                             </el-table-column>                 
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="旺款"
                     name="third">
          <el-table :header-row-style="rowheader"
                    @sort-change="sortNumber3"
                    show-summary
                    :summary-method="getSummaries"
                    max-height="630"
                    :data="tableData3"
                    border 
                    class="elTableee"
                    :header-cell-style="getRowClass"
                    style="width: 100%;">
            <el-table-column fixed
                             min-width="125"
                             prop="salername"
                             label="业绩归属人1"
                             :formatter="empty"
                             align="center"
                             sortable></el-table-column>
            <el-table-column min-width="102"
                             prop="goodsNum"
                             align="center"
                             label="商品总数"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="102"
                             prop="SoldNum"
                             align="center"
                             label="旺款总数"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="100"
                             prop="SoldRate"
                             align="center"
                             label="旺款率%"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column width="102"
                             prop="SkuSoldNum"
                             align="center"
                             v-if="showOpen.wk"
                             label="销售数量"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column width="130"
                             prop="saleMoneyRmb"
                             v-if="showOpen.wk"
                             align="center"
                             label="销售额(RMB)"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column width="115"
                             prop="profitRmb"
                             v-if="showOpen.wk"
                             align="center"
                             label="利润(RMB)"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column width="100"
                             prop="ProfitRate"
                             v-if="showOpen.wk"
                             align="center"
                             label="利润率%"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column width="122"
                             prop="wishSoldNum"
                             v-if="showOpen.wk"
                             align="center"
                             label="Wish旺款数"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column width="162"
                             prop="wishRate"
                             v-if="showOpen.wk"
                             align="center"
                             label="Wish旺款贡献率%"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column width="122"
                             prop="eabySoldNum"
                             v-if="showOpen.wk"
                             align="center"
                             label="eBay旺款数"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column width="162"
                             prop="eBayRate"
                             v-if="showOpen.wk"
                             align="center"
                             label="eBay旺款贡献率%"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column width="120"
                             prop="SMTSoldNum"
                             v-if="showOpen.wk"
                             align="center"
                             label="SMT旺款数"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column width="160"
                             prop="SMTRate"
                             label="SMT旺款贡献率%"
                             v-if="showOpen.wk"
                             align="center"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column width="145"
                             prop="amaSoldNum"
                             v-if="showOpen.wk"
                             label="Amazon旺款数"
                             align="center"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column width="185"
                             prop="amaRate"
                             label="Amazon旺款贡献率%"
                             v-if="showOpen.wk"
                             align="center"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column width="110"
                             label="操作"
                             align="center"
                             :formatter="empty">
                             <template slot-scope="scope">
                                <el-tooltip content="查看">
                                  <i
                                    v-if="!showOpen.wk"
                                    class="el-icon-circle-plus-outline"
                                    @click="openWk(scope.$index, scope.row)"
                                    style="color: #409EFF;cursor:pointer;"
                                  ></i>
                                  <i
                                    v-if="showOpen.wk"
                                    class="el-icon-remove-outline"
                                    @click="openWk(scope.$index, scope.row)"
                                    style="color: #409EFF;cursor:pointer;"
                                  ></i>
                                </el-tooltip>
                              </template>
                             </el-table-column>                 
          </el-table>
        </el-tab-pane>
      </el-tabs>
      </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { getPerform } from '../../api/profit'
import { compareUp, compareDown, getMonthDate } from '../../api/tools'
export default {
  data() {
    return {
      obj: {
        'min-height': window.innerHeight - 105 + "px"
      },
      showOpen:{
        sy:false,
        bk:false,
        wk:false,
      },
      form: {
        dateRange: [],
        newRange: []
      },
      activeName: 'first',
      show: false,
      listLoading: false,
      option: {
        title: {
          text: '销售额(RMB)'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },

        legend: {
          data: [String]
        },
        toolbox: {
          top:'10',
          show: true,
          feature: {}
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            data: [String]
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [Object]
      },
      options: {
        title: {
          text: '利润额(RMB)'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: [String]
        },
        toolbox: {
          show: true
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            data: [String]
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [Object]
      },
      tableData1: [],
      tableData2: [],
      tableData3: [],
      condition: {
        beginDate: '',
        endDate: '',
        createBeginDate: '',
        createEndDate: ''
      },
      pickerOptions: {
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
    openSy(index,row){
      this.showOpen['sy'] = !this.showOpen.sy
    },
    openBk(index,row){
      this.showOpen['bk'] = !this.showOpen.bk
    },
    openWk(index,row){
      this.showOpen['wk'] = !this.showOpen.wk
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "color:#337ab7;background:#f5f7fa";
      } else {
        return "";
      }
    },
    time(name) {
      if (name === 'exchange') {
        if (this.form.dateRange !== null) {
          this.condition.beginDate = this.form.dateRange[0]
          this.condition.endDate = this.form.dateRange[1]
        } else {
          this.condition.beginDate = ''
          this.condition.endDate = ''
        }
      } else if (name === 'product') {
        if (this.form.newRange !== null) {
          this.condition.createBeginDate = this.form.newRange[0]
          this.condition.createEndDate = this.form.newRange[1]
        } else {
          this.condition.createBeginDate = ''
          this.condition.createEndDate = ''
        }
      }
    },
    // 数字排序
    sortNumber1(column, prop, order) {
      const data = this.tableData1
      if (column.order === 'descending') {
        this.tableData1 = data.sort(compareDown(data, column.prop))
      } else {
        this.tableData1 = data.sort(compareUp(data, column.prop))
      }
    },
    sortNumber2(column, prop, order) {
      const data = this.tableData1
      if (column.order === 'descending') {
        this.tableData2 = data.sort(compareDown(data, column.prop))
      } else {
        this.tableData2 = data.sort(compareUp(data, column.prop))
      }
    },
    sortNumber3(column, prop, order) {
      const data = this.tableData1
      if (column.order === 'descending') {
        this.tableData3 = data.sort(compareDown(data, column.prop))
      } else {
        this.tableData3 = data.sort(compareUp(data, column.prop))
      }
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
      sums[fileds.indexOf('SoldRate')] =
        Math.round(
          (sums[fileds.indexOf('SoldNum')] * 10000) /
            sums[fileds.indexOf('goodsNum')]
        ) / 100
      sums[fileds.indexOf('ProfitRate')] =
        Math.round(
          (sums[fileds.indexOf('profitRmb')] * 10000) /
            sums[fileds.indexOf('saleMoneyRmb')]
        ) / 100
      sums[fileds.indexOf('wishRate')] =
        Math.round(
          (sums[fileds.indexOf('wishSoldNum')] * 10000) /
            sums[fileds.indexOf('goodsNum')]
        ) / 100
      sums[fileds.indexOf('eBayRate')] =
        Math.round(
          (sums[fileds.indexOf('eabySoldNum')] * 10000) /
            sums[fileds.indexOf('goodsNum')]
        ) / 100
      sums[fileds.indexOf('SMTRate')] =
        Math.round(
          (sums[fileds.indexOf('SMTSoldNum')] * 10000) /
            sums[fileds.indexOf('goodsNum')]
        ) / 100
      sums[fileds.indexOf('amaRate')] =
        Math.round(
          (sums[fileds.indexOf('amaSoldNum')] * 10000) /
            sums[fileds.indexOf('goodsNum')]
        ) / 100
      return sums
    },
    handleClick(tab, event) {
      this.activeName = tab.name
    },
    onSubmit() {
      this.$refs.condition.validate(valid => {
        if (valid) {
          this.show = true
          this.listLoading = true
          getPerform(this.condition).then(response => {
            this.listLoading = false
            const tableData = response.data.data
            this.tableData1 = tableData.AllReport
            this.tableData2 = tableData.HotReport
            this.tableData3 = tableData.PopReport
            const ret = this.tableData1
            const lineName = []
            const lineNames = []
            const serie = []
            const series = []
            const date = []
            const dates = []
            lineName.push('销售额')
            lineNames.push('利润额')
            lineName.forEach(name => {
              const sery = {
                type: 'bar',
                stack: '总量',
                itemStyle: { normal: { color: '#84C1FF' } }
              }
              const amt = []
              ret.map(element => {
                amt.push(Number(element.saleMoneyRmb))
                if (date.indexOf(element.salername) < 0) {
                  date.push(element.salername)
                }
              })
              sery['data'] = amt
              sery['name'] = name
              serie.push(sery)
            })
            lineNames.forEach(name => {
              const sery = {
                type: 'bar',
                stack: '总量',
                itemStyle: { normal: { color: '#84C1FF' } }
              }
              const amt = []
              ret.map(element => {
                amt.push(Number(element.profitRmb))
                if (dates.indexOf(element.salername) < 0) {
                  dates.push(element.salername)
                }
              })
              sery['data'] = amt
              sery['name'] = name
              series.push(sery)
            })
            this.option.legend.data = lineName
            this.option.xAxis[0].data = date
            this.option.series = serie
            this.options.legend.data = lineNames
            this.options.xAxis[0].data = dates
            this.options.series = series
            const _this = this
            _this.$refs.myechart.drawAreaStack(this.option)
            _this.$refs.myechartlre.drawareaStack(this.options)
          })
        } else {
          return false
        }
      })
    },
    rowheader({ row, rowIndex }) {
      return 'color:black'
    },
    empty(row, column, cellValue, index) {
      return cellValue || '--'
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  padding-top: 10px;
  margin-bottom: 5px;
  .el-form-item {
    margin-bottom: 10px;
  }
}
.tabwidth{
  width: 98%;
  margin: auto;
}
.perBac{
  background: #f7f7f7;
}
</style>
<style>
.perDemoTab .el-tabs__nav{
  left: 50%;
  margin-left:-100px;
  line-height: 50px;
}
</style>