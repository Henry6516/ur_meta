<template>
  <div>
    <el-form :model='form'
             :inline='true'
             ref='condition'
             label-width='150px'
             class='demo-form-inline toolbar'>
      <el-form-item label='交易日期'
                    prop="dateRange"
                    :rules="[{required: true, message: '请选择时间', trigger: 'blur'}]">
        <el-date-picker size="small"
                        v-model='form.dateRange'
                        @change="time('exchange')"
                        type='daterange'
                        value-format='yyyy-MM-dd'
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
                        range-separator='至'
                        start-placeholder='开始日期'
                        end-placeholder='结束日期'
                        :picker-options='pickerOptions2'>
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button size="small"
                   type="primary"
                   style="margin-left:60px"
                   @click="onSubmit(condition)">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="tab"
         v-show="show"
         v-loading="listLoading">
      <el-row>
        <el-col :span="12">
          <Myechart :options="option"
                    ref="myechart"></Myechart>
        </el-col>
        <el-col :span="12">
          <Myechartlre :options="options"
                       ref="myechartlre"></Myechartlre>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName"
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
                    style="width: 100%;">
            <el-table-column min-width="125"
                             prop="salername"
                             label="业绩归属人1"
                             :formatter="empty"
                             sortable></el-table-column>
            <el-table-column min-width="100"
                             prop="goodsNum"
                             label="商品总数"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="115"
                             prop="SoldNum"
                             label="出单商品数"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="100"
                             prop="SoldRate"
                             label="出单率%"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="100"
                             prop="SkuSoldNum"
                             label="销量数量"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="130"
                             prop="saleMoneyRmb"
                             label="销售额(RMB)"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="115"
                             prop="profitRmb"
                             label="利润(RMB)"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="100"
                             prop="ProfitRate"
                             label="利润率%"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="150"
                             prop="wishSoldNum"
                             label="Wish出单商品数"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="135"
                             prop="wishRate"
                             label="Wish出单率%"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="150"
                             prop="eabySoldNum"
                             label="eBay出单商品数"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="135"
                             prop="eBayRate"
                             label="eBay出单率%"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="145"
                             prop="SMTSoldNum"
                             label="SMT出单商品数"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="130"
                             prop="SMTRate"
                             label="SMT出单率%"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="170"
                             prop="amaSoldNum"
                             label="Amazon出单商品数"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="155"
                             prop="amaRate"
                             label="Amazon出单率%"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
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
                    style="width: 100%;">
            <el-table-column min-width="125"
                             prop="salername"
                             label="业绩归属人1"
                             :formatter="empty"
                             sortable></el-table-column>
            <el-table-column min-width="100"
                             prop="goodsNum"
                             label="商品总数"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="100"
                             prop="SoldNum"
                             label="爆款总数"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="100"
                             prop="SoldRate"
                             label="爆款率%"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="100"
                             prop="SkuSoldNum"
                             label="销量数量"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="130"
                             prop="saleMoneyRmb"
                             label="销售额(RMB)"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="115"
                             prop="profitRmb"
                             label="利润(RMB)"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="100"
                             prop="ProfitRate"
                             label="利润率%"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="120"
                             prop="wishSoldNum"
                             label="Wish爆款数"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="160"
                             prop="wishRate"
                             label="Wish爆款贡献率%"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="120"
                             prop="eabySoldNum"
                             label="eBay爆款数"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="160"
                             prop="eBayRate"
                             label="eBay爆款贡献率%"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="120"
                             prop="SMTSoldNum"
                             label="SMT爆款数"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="160"
                             prop="SMTRate"
                             label="SMT爆款贡献率%"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="145"
                             prop="amaSoldNum"
                             label="Amazon爆款数"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="185"
                             prop="amaRate"
                             label="Amazon爆款贡献率%"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
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
                    style="width: 100%;">
            <el-table-column min-width="125"
                             prop="salername"
                             label="业绩归属人1"
                             :formatter="empty"
                             sortable></el-table-column>
            <el-table-column min-width="100"
                             prop="goodsNum"
                             label="商品总数"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="100"
                             prop="SoldNum"
                             label="旺款总数"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="100"
                             prop="SoldRate"
                             label="旺款率%"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="100"
                             prop="SkuSoldNum"
                             label="销售数量"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="130"
                             prop="saleMoneyRmb"
                             label="销售额(RMB)"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="115"
                             prop="profitRmb"
                             label="利润(RMB)"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="100"
                             prop="ProfitRate"
                             label="利润率%"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="120"
                             prop="wishSoldNum"
                             label="Wish旺款数"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="160"
                             prop="wishRate"
                             label="Wish旺款贡献率%"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="120"
                             prop="eabySoldNum"
                             label="eBay旺款数"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="160"
                             prop="eBayRate"
                             label="eBay旺款贡献率%"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="120"
                             prop="SMTSoldNum"
                             label="SMT旺款数"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="160"
                             prop="SMTRate"
                             label="SMT旺款贡献率%"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="145"
                             prop="amaSoldNum"
                             label="Amazon旺款数"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
            <el-table-column min-width="185"
                             prop="amaRate"
                             label="Amazon旺款贡献率%"
                             :formatter="empty"
                             sortable="custom"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getPerform } from '../../api/profit'
import { compareUp, compareDown, getMonthDate } from '../../api/tools'
export default {
  data() {
    return {
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
  margin-bottom: 10px;
  .el-form-item {
    margin-bottom: 20px;
  }
}
</style>
