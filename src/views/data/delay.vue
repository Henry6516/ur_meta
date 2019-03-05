<template>
  <section>
    <div class="toolbar">
      <el-form :model="condition"
               :inline="true"
               ref="condition"
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
        <el-form-item label="显示方式"
                      class="input"
                      prop="flag">
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
        <el-form-item label="发货时间"
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
    </div>
    <el-row>
      <el-col :span="24">
        <el-tabs v-model="activeName"
                 type="card"
                 @tab-click="handleClick">
          <el-tab-pane label="缺货天数统计"
                       name="first">
            <div :span="24"
                 ref="delaypie"
                 v-loading="listLoading"
                 element-loading-text="正在加载中..."
                 :style="{width: '100%', height: '500px'}">
            </div>
          </el-tab-pane>
          <el-tab-pane label="缺货产品详情"
                       name="second">
            <el-table :data="tableData"
                      v-loading="listLoading"
                      element-loading-text="正在加载中..."
                      style="width: 100%"
                      height="750">
              <el-table-column label="sku"
                               prop="sku"></el-table-column>
              <el-table-column label="skuName"
                               prop="skuName"></el-table-column>
              <el-table-column label="数量"
                               prop="number"></el-table-column>
              <el-table-column label="百分比"
                               :formatter="empty"
                               prop="rate"></el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import {
  getSection,
  getSecDepartment,
  getPlatform,
  getMember,
  getAccount
} from '../../api/profit'
import { getMonthDate } from '../../api/tools'
import { APIDelay, APIDelayDetail } from '../../api/data'
export default {
  data() {
    return {
      activeName: 'first',
      tableData: [],
      listLoading: false,
      plat: [],
      member: [],
      account: [],
      department: [],
      secDepartment: [],
      flag: [{ id: 0, type: '按天' }, { id: 2, type: '按月' }],
      condition: {
        dateRange: [],
        member: [],
        plat: [],
        account: [],
        department: [],
        secDepartment: [],
        flag: 0
      },
      options: {
        title: {
          text: '缺货柱状图'
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
            // str += '<div>' + params[0].name + '</div>'
            for (var i = 0; i < params.length; i++) {
              str +=
                '<div><span>' +
                params[i].name +
                '</span> : <span>' +
                (params[i].data
                  ? Math.round(params[i].data * 10000) / 100 + '%'
                  : '暂无') +
                '</span></div>'
            }
            return str
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
    empty(row, column, cellValue, index) {
      if (cellValue == null || cellValue == '') {
        return ''
      } else {
        return Math.round(cellValue * 10000) / 100 + '%'
      }
    },
    handleClick(tab, event) {
      this.activeName = tab.name
    },
    onSubmit() {
      this.$refs.condition.validate(valid => {
        if (valid) {
          this.listLoading = true
          if (this.activeName === 'first') {
            APIDelay(this.condition).then(res => {
              this.listLoading = false
              const data = res.data.data
              const lineName = []
              const series = []
              this.options.xAxis[0].data = data.map(e => e.name)
              const sery = {
                type: 'bar'
              }
              sery['data'] = data.map(e => e.value)
              series.push(sery)
              this.options.series = series
              let delayPie = this.$echarts.init(this.$refs.delaypie)
              delayPie.setOption(this.options)
            })
          } else {
            APIDelayDetail(this.condition).then(res => {
              this.listLoading = false
              this.tableData = res.data.data
            })
          }
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
</style>


