<template>
  <div>
    <el-form :model="condition"
             :inline="true"
             ref="condition"
             class="toolbar"
             label-width="110px">
      <el-form-item label="部门"
                    class="input">
        <el-select size="small"
                   v-model="condition.department"
                   multiple
                   collapse-tags
                   placeholder="部门"
                   @change="choosed">
          <el-button plain
                     type="info"
                     @click='selectAll("department")'>全选</el-button>
          <el-button plain
                     type="info"
                     @click='unselect("department")'>取消</el-button>
          <el-option v-for="(item,index) in department"
                     :index="index"
                     :key="item.department"
                     :label="item.department"
                     :value="item.department">
          </el-option>
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
                     @click='selectAll("secDepartment")'>全选</el-button>
          <el-button plain
                     type="info"
                     @click='unselect("secDepartment")'>取消</el-button>
          <el-option v-for='(item,index) in secDepartment'
                     :index='index'
                     :key='item.department'
                     :label='item.department'
                     :value='item.department'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="平台"
                    class="input">
        <el-select size="small"
                   v-model="condition.plat"
                   multiple
                   collapse-tags
                   placeholder="平台"
                   style="height: 3rem;">
          <el-button plain
                     type="info"
                     @click='selectAll("plat")'>全选</el-button>
          <el-button plain
                     type="info"
                     @click='unselect("plat")'>取消</el-button>
          <el-option v-for="(item,index) in plat"
                     :index="index"
                     :key="item.plat"
                     :label="item.plat"
                     :value="item.plat">
          </el-option>
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
                     @click='selectAll("member")'>全选</el-button>
          <el-button plain
                     type="info"
                     @click='unselect("member")'>取消</el-button>
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
                     @click='selectAll("account")'>全选</el-button>
          <el-button plain
                     type="info"
                     @click='unselect("account")'>取消</el-button>
          <el-option v-for="(item,index) in account"
                     :index="index"
                     :key="item.id"
                     :label="item.store"
                     :value="item.store"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间类型">
        <el-radio-group v-model="condition.dateType">
          <el-radio border
                    v-for="(item,index) in dateType"
                    :index="index"
                    :key="item.id"
                    :label="item.id"
                    :value="item.id"
                    style="width:8.55rem">{{item.type}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="显示方式">
        <el-radio-group v-model="condition.flag">
          <el-radio border
                    v-for="(item,index) in flag"
                    :index="index"
                    :key="item.id"
                    :label="item.id"
                    :value="item.id"
                    style="width:8.55rem;">{{item.type}}</el-radio>
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
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions2"
                        style="width:18rem;">
        </el-date-picker>
      </el-form-item>
      <el-form-item style="margin-left:60px">
        <el-button size="small"
                   type="primary"
                   @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-card v-loading="listLoading"
               element-loading-text="正在加载中...">
        <el-col :span="12">
          <div ref="orderpie"
               :style="{width: '100%', height: '400px'}"></div>
        </el-col>
        <el-col :span="12">
          <div ref="skupie"
               :style="{width: '100%', height: '400px'}"></div>
        </el-col>
      </el-card>
      <el-col :span="12">
        <el-card>
          <div ref="lineNum"
               :style="{width: '100%', height: '400px'}"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div ref="lineRate"
               :style="{width: '100%', height: '400px'}"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div ref="slineNum"
               :style="{width: '100%', height: '400px'}"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div ref="slineRate"
               :style="{width: '100%', height: '400px'}"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div ref="orderAverage"
               :style="{width: '100%', height: '400px'}"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div ref="skuAverage"
               :style="{width: '100%', height: '400px'}"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getSection,
  getSecDepartment,
  getPlatform,
  getMember,
  getAccount,
  priceTrend
} from '../../api/profit'
import { getMonthDate } from '../../api/tools'
export default {
  data() {
    return {
      options: {
        title: {
          text: '客单价分布',
          subtext: '',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: [String]
        },
        series: [
          {
            name: '客单价分布',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [Object],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      opt: {
        title: {
          text: 'SKU单价分布',
          subtext: '',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: [String]
        },
        series: [
          {
            name: 'SKU单价分布',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [Object],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      lineNum: {
        title: {
          text: '客单价订单量走势'
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
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
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
      lineRate: {
        title: {
          text: '客单价占比走势'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          },
          formatter: function(params) {
            var str = ''
            str += '<div>' + params[0].name + '</div>'
            for (var i = 0; i < params.length; i++) {
              str +=
                '<div><span style="color:' +
                params[i].color +
                '">' +
                params[i].seriesName +
                '</span> : <span>' +
                (params[i].data
                  ? Math.round(params[i].data * 10000) / 100 + '%'
                  : '暂无') +
                '</span></div>'
            }
            return str
          }
        },
        legend: {
          data: [String]
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
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
      slineNum: {
        title: {
          text: 'SKU单价出单数走势'
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
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
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
      slineRate: {
        title: {
          text: 'SKU单价占比走势'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          },
          formatter: function(params) {
            var str = ''
            str += '<div>' + params[0].name + '</div>'
            for (var i = 0; i < params.length; i++) {
              str +=
                '<div><span style="color:' +
                params[i].color +
                '">' +
                params[i].seriesName +
                '</span> : <span>' +
                (params[i].data
                  ? Math.round(params[i].data * 10000) / 100 + '%'
                  : '暂无') +
                '</span></div>'
            }
            return str
          }
        },
        legend: {
          data: [String]
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
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
      orderAverage: {
        title: {
          text: '平均客单价走势'
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
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
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
      skuAverage: {
        title: {
          text: '平均SKU单价走势'
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
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
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
      listLoading: false,
      allMember: [],
      plat: [],
      member: [],
      account: [],
      department: [],
      allSecDp: [],
      secDepartment: [],
      dateType: [{ id: 1, type: '发货时间' }, { id: 0, type: '交易时间' }],
      flag: [{ id: 0, type: '按天' }, { id: 2, type: '按月' }],
      dateRange: [],
      condition: {
        dateType: 0,
        dateRange: [],
        member: [],
        flag: 0,
        plat: [],
        account: [],
        department: [],
        secDepartment: []
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
    onSubmit() {
      this.$refs.condition.validate(valid => {
        if (valid) {
          this.listLoading = true
          priceTrend(this.condition).then(res => {
            this.listLoading = false
            const orderpie = res.data.data.orderPie
            this.options.legend.data = orderpie.legend
            this.options.series[0].data = orderpie.data
            let orderPie = this.$echarts.init(this.$refs.orderpie)
            orderPie.setOption(this.options)

            const skupie = res.data.data.skuPie
            this.opt.legend.data = skupie.legend
            this.opt.series[0].data = skupie.data
            let skuPie = this.$echarts.init(this.$refs.skupie)
            skuPie.setOption(this.opt)

            const orderlinenum = res.data.data.orderLineNum
            if (orderlinenum.length > 0) {
              const lineName = []
              const series = []
              orderlinenum.forEach(element => {
                if (lineName.indexOf(element.flag) < 0) {
                  lineName.push(element.flag)
                }
              })
              const date = []
              lineName.forEach(name => {
                const sery = {
                  type: 'line',
                  stack: '总量',
                  areaStyle: { normal: {} }
                }
                const amt = []
                orderlinenum.map(element => {
                  if (element.flag === name) {
                    amt.push(Number(element.orderNum))
                    if (date.indexOf(element.orderDate) < 0) {
                      date.push(element.orderDate)
                    }
                  }
                })
                sery['data'] = amt
                sery['name'] = name
                series.push(sery)
              })
              this.lineNum.legend.data = lineName
              this.lineNum.xAxis[0].data = date
              this.lineNum.series = series
              let LineNum = this.$echarts.init(this.$refs.lineNum)
              LineNum.setOption(this.lineNum)
            }

            const orderlinerate = res.data.data.orderLineRate
            if (orderlinerate.length > 0) {
              const lineName = []
              const series = []
              orderlinerate.forEach(element => {
                if (lineName.indexOf(element.flag) < 0) {
                  lineName.push(element.flag)
                }
              })
              const date = []
              lineName.forEach(name => {
                const sery = {
                  type: 'line',
                  stack: '总量',
                  areaStyle: { normal: {} }
                }
                const amt = []
                orderlinerate.map(element => {
                  if (element.flag === name) {
                    amt.push(Number(element.rate))
                    if (date.indexOf(element.orderDate) < 0) {
                      date.push(element.orderDate)
                    }
                  }
                })
                sery['data'] = amt
                sery['name'] = name
                series.push(sery)
              })
              this.lineRate.legend.data = lineName
              this.lineRate.xAxis[0].data = date
              this.lineRate.series = series
              let LineRate = this.$echarts.init(this.$refs.lineRate)
              LineRate.setOption(this.lineRate)
            }
            const skulinenum = res.data.data.skuLineNum
            if (skulinenum.length > 0) {
              const lineName = []
              const series = []
              skulinenum.forEach(element => {
                if (lineName.indexOf(element.flag) < 0) {
                  lineName.push(element.flag)
                }
              })
              const date = []
              lineName.forEach(name => {
                const sery = {
                  type: 'line',
                  stack: '总量',
                  areaStyle: { normal: {} }
                }
                const amt = []
                skulinenum.map(element => {
                  if (element.flag === name) {
                    amt.push(Number(element.orderNum))
                    if (date.indexOf(element.orderDate) < 0) {
                      date.push(element.orderDate)
                    }
                  }
                })
                sery['data'] = amt
                sery['name'] = name
                series.push(sery)
              })
              this.slineNum.legend.data = lineName
              this.slineNum.xAxis[0].data = date
              this.slineNum.series = series
              let sLineNum = this.$echarts.init(this.$refs.slineNum)
              sLineNum.setOption(this.slineNum)
            }
            const skulinerate = res.data.data.skuLineRate
            if (skulinerate.length > 0) {
              const lineName = []
              const series = []
              skulinerate.forEach(element => {
                if (lineName.indexOf(element.flag) < 0) {
                  lineName.push(element.flag)
                }
              })
              const date = []
              lineName.forEach(name => {
                const sery = {
                  type: 'line',
                  stack: '总量',
                  areaStyle: { normal: {} }
                }
                const amt = []
                skulinerate.map(element => {
                  if (element.flag === name) {
                    amt.push(Number(element.rate))
                    if (date.indexOf(element.orderDate) < 0) {
                      date.push(element.orderDate)
                    }
                  }
                })
                sery['data'] = amt
                sery['name'] = name
                series.push(sery)
              })
              this.slineRate.legend.data = lineName
              this.slineRate.xAxis[0].data = date
              this.slineRate.series = series
              let sLineRate = this.$echarts.init(this.$refs.slineRate)
              sLineRate.setOption(this.slineRate)
            }

            const orderlineavg = res.data.data.orderLineAvg
            const series = []
            this.orderAverage.xAxis[0].data = orderlineavg.map(e => e.orderDate)
            const sery = {
              type: 'line',
              stack: '总量',
              areaStyle: { normal: {} }
            }
            sery['data'] = orderlineavg.map(e => e.amtAvg)
            series.push(sery)
            this.orderAverage.series = series
            let orderaverage = this.$echarts.init(this.$refs.orderAverage)
            orderaverage.setOption(this.orderAverage)

            const skulineavg = res.data.data.skuLineAvg
            const meries = []
            this.skuAverage.xAxis[0].data = skulineavg.map(e => e.orderDate)
            const mery = {
              type: 'line',
              stack: '总量',
              areaStyle: { normal: {} }
            }
            mery['data'] = skulineavg.map(e => e.amtAvg)
            meries.push(mery)
            this.skuAverage.series = meries
            let skuaverage = this.$echarts.init(this.$refs.skuAverage)
            skuaverage.setOption(this.skuAverage)
          })
        }
      })
    },
    selectAll(name) {
      if (name === 'member') {
        this.condition['member'] = this['member'].map(ele => ele['username'])
      } else if (name === 'account') {
        this.condition['account'] = this[name].map(ele => ele['store'])
      } else if (name === 'department') {
        this.condition[name] = this[name].map(ele => ele[name])
        this.member = this.allMember
      } else if (name === 'secDepartment') {
        this.condition[name] = this[name].map(ele => ele.department)
        this.member = this.allMember
      } else {
        this.condition[name] = this[name].map(ele => ele[name])
      }
    },
    unselect(name) {
      if (name === 'department') {
        this.member = this.allMember
      }
      this['condition'][name] = []
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
    }
  },
  mounted() {
    getMember().then(response => {
      const res = response.data.data
      this.allMember = this.member = res.filter(ele => ele.position === '销售')
    })
    getAccount().then(response => {
      this.account = response.data.data
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
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin: 10px;
  padding: 10px;
}
</style>

