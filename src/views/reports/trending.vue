<template>
  <div class="toolbar">
    <div class="demo-block demo-box demo-zh-CN demo-transition"
         @mouseover="changeActive"
         @mouseout="removeActive">
      <transition name="el-fade-in-linear">
        <el-form :model="condition"
                 :inline="true"
                 ref="condition"
                 class="demo-form-inline"
                 label-width="120px"
                 v-show="show">
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
          <el-form-item label="时间类型"
                        class="input"
                        prop="dateType">
            <el-radio-group v-model="condition.dateType">
              <el-radio border
                        v-for="(item,index) in dateType"
                        :index="index"
                        :key="item.id"
                        :label="item.id"
                        :value="item.id"
                        style="width:102px">{{item.type}}</el-radio>
            </el-radio-group>
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
                        style="width:102px;">{{item.type}}</el-radio>
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
                            style="width:218px;">
            </el-date-picker>
          </el-form-item>
          <el-form-item style="margin-left:6rem">
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
      <el-col :span="24">
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
    </el-row>
    <Myecharts v-if="sale"
               style="max-height:800px;overflow:auto"
               :options="options"
               v-loading="listLoading"
               element-loading-text="正在加载中..."
               ref="myecharts"></Myecharts>
    <Chart v-if="order"
           style="max-height:800px;overflow:auto"
           :options="options"
           v-loading="listLoading"
           element-loading-text="正在加载中..."
           ref="myechart"></Chart>
    <sku-chart v-if="count"
               style="max-height:800px;overflow:auto"
               :options="options"
               v-loading="listLoading"
               element-loading-text="正在加载中..."
               ref="skuchart"></sku-chart>
    <profit v-if="pro"
               style="max-height:800px;overflow:auto"
               :options="options"
               v-loading="listLoading"
               element-loading-text="正在加载中..."
               ref="prochart"></profit>           
  </div>
</template>

<script>
import {
  getSection,
  getSecDepartment,
  getPlatform,
  getMember,
  getAccount,
  getSalestrend,
  getProfitReport,
  APIOrderCount,
  APISkuCount
} from '../../api/profit'
import { getMonthDate } from '../../api/tools'
import { getMenu } from '../../api/login'
import Chart from '../../component/order/Orderchart'
import SkuChart from '../../component/sku/Skuchart'
import profit from '../../component/profit/profit'

export default {
  components: {
    Chart,
    SkuChart,
    profit
  },
  data() {
    return {
      sale: true,
      order: false,
      count: false,
      pro:false,
      allMenu: [],
      activeName: '销售额走势',
      allMember: [],
      isA: true,
      text: '显示输入框',
      id: 'test',
      options: {
        title: {
          text: '销售额走势($)'
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
            data: [String]
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: '{value} $'
            }
          }
        ],
        series: [Object]
      },
      show: true,
      show1: false,
      searchTable: [],
      searchValue: '',
      listLoading: false,
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
        department: [],
        getSecDepartment: [],
        plat: [],
        member: [],
        store: [],
        dateType: 0,
        flag: 0,
        dateRange: [],
        account: []
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
    handleClick(tab, event) {
      if (tab.label === '销售额走势') {
        this.sale = true
        this.order = false
        this.count = false
        this.pro = false
        this.onSubmit(this.condition)
      } else if (tab.label === '订单量走势') {
        this.sale = false
        this.order = true
        this.count = false
        this.pro = false
        this.onSubmit(this.condition)
      } else if (tab.label === '销售数量走势')  {
        this.sale = false
        this.order = false
        this.count = true
        this.pro = false
        this.onSubmit(this.condition)
      }else{
        this.pro = true
        this.sale = false
        this.order = false
        this.count = false
        this.onSubmit(this.condition)
      }
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
        const arr = []
        this.condition[name] = this[name].map(ele => ele.department)
        for(let i = 0;i<this.secDepartment.length;i++){
          const secname = this.secDepartment[i].department
          for(let k = 0;k<this.allMember.length;k++){
            if(secname == this.allMember[k].department){
              arr.push(this.allMember[k])
            }
          }
        }
        this.member = arr
        // this.member = this.allMember
      } else {
        this.condition[name] = this[name].map(ele => ele[name])
      }
    },
    unselect(name) {
      if (name === 'department') {
        this.condition.secDepartment = [];
        this.secDepartment = this.allSecDep
        this.member = this.allMember
      }
      if (name === 'secDepartment') {
        let arr = []
        if(this.condition.department.length>0){
          for(let i =0;i<this.condition.department.length;i++){
            const secname = this.condition.department[i]
            for(let k = 0;k<this.allMember.length;k++){
              if(secname == this.allMember[k].parent_department){
                arr.push(this.allMember[k])
              }
            }
          }
        }else{
          arr = this.allMember
        }  
        this.member = arr
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
            if (allDepartmentsMap[this.allSecDep[k].parent] === val[i] && this.allSecDep[k].type.indexOf('销售')>-1) {
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
      } else if (this.show === true) {
        this.text = '隐藏输入框'
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
      this.$refs.condition.validate(valid => {
        if (valid) {
          this.listLoading = true
          if (
            this.condition.department.length === 0 &&
            this.condition.member.length === 0 &&
            this.condition.plat.length === 0 &&
            this.condition.account.length === 0
          ) {
            if (this.department.length === 1) {
              myform.department = this.department.map(m => {
                return m.department
              })
            }
          } else if (
            this.condition.department.lenght !== 0 &&
            this.condition.member.lenght === 0
          ) {
            const val = form.department
            const res = this.allMember
            for (let i = 0; i < val.length; i++) {
              const per = res.filter(
                ele =>
                  (ele.department === val[i] || ele.parent_depart === val[i]) &&
                  ele.position === '销售'
              )
              this.member.concat(per)
            }
            myform.member = this.member.map(m => {
              return m.username
            })
          } else if (this.condition.member.lenght !== 0) {
            myform.member = this.condition.member
          }
          if (this.activeName === '销售额走势') {
            getSalestrend(myform).then(response => {
              this.listLoading = false
              const ret = response.data.data
              if(ret.length==0 || Number(ret[0].totalamt)==0){
                // this.$message.error('数据为空,联系管理员');
              }
              const lineName = []
              const series = []
              ret.forEach(element => {
                if (lineName.indexOf(element.title) < 0) {
                  lineName.push(element.title)
                }
              })
              const date = []
              lineName.forEach(name => {
                const sery = {
                  type: 'bar',
                  stack: '总量',
                  areaStyle: { normal: {} }
                }
                const amt = []
                ret.map(element => {
                  if (element.title === name) {
                    amt.push(Number(element.totalamt))
                    if (date.indexOf(element.ordertime) < 0) {
                      date.push(element.ordertime)
                    }
                  }
                })
                sery['data'] = amt
                sery['name'] = name
                series.push(sery)
              })
              this.options.legend.data = lineName
              this.options.xAxis[0].data = date
              this.options.series = series
              this.$refs.myecharts.drawAreaStack(this.options)
            })
            this.options.title.text = '销售额走势($)'
            this.options.yAxis[0].axisLabel.formatter = '{value} $'
          } else if (this.activeName === '订单量走势') {
            APIOrderCount(myform).then(response => {
              this.listLoading = false
              const ret = response.data.data
              if(ret.length==0 || Number(ret[0].totalamt)==0){
                // this.$message.error('数据为空,联系管理员');
              }
              const lineName = []
              const series = []
              ret.forEach(element => {
                if (lineName.indexOf(element.title) < 0) {
                  lineName.push(element.title)
                }
              })
              const date = []
              lineName.forEach(name => {
                const sery = {
                  type: 'bar',
                  stack: '总量',
                  areaStyle: { normal: {} }
                }
                const amt = []
                ret.map(element => {
                  if (element.title === name) {
                    amt.push(Number(element.totalamt))
                    if (date.indexOf(element.ordertime) < 0) {
                      date.push(element.ordertime)
                    }
                  }
                })
                sery['data'] = amt
                sery['name'] = name
                series.push(sery)
              })
              this.options.legend.data = lineName
              this.options.xAxis[0].data = date
              this.options.series = series
              this.$refs.myechart.drawAreaStack(this.options)
            })
            this.options.title.text = '订单量走势(单)'
            this.options.yAxis[0].axisLabel.formatter = '{value} 单'
          } else if (this.activeName === '销售数量走势')  {
            APISkuCount(myform).then(response => {
              this.listLoading = false
              const ret = response.data.data
              if(ret.length==0 || Number(ret[0].totalamt)==0){
                // this.$message.error('数据为空,联系管理员');
              }
              const lineName = []
              const series = []
              ret.forEach(element => {
                if (lineName.indexOf(element.title) < 0) {
                  lineName.push(element.title)
                }
              })
              const date = []
              lineName.forEach(name => {
                const sery = {
                  type: 'bar',
                  stack: '总量',
                  areaStyle: { normal: {} }
                }
                const amt = []
                ret.map(element => {
                  if (element.title === name) {
                    amt.push(Number(element.totalamt))
                    if (date.indexOf(element.ordertime) < 0) {
                      date.push(element.ordertime)
                    }
                  }
                })
                sery['data'] = amt
                sery['name'] = name
                series.push(sery)
              })
              this.options.legend.data = lineName
              this.options.xAxis[0].data = date
              this.options.series = series
              this.$refs.skuchart.drawAreaStack(this.options)
            })
            this.options.title.text = '销售数量走势(个)'
            this.options.yAxis[0].axisLabel.formatter = '{value} 个'
          }else{
           getProfitReport(myform).then(response => {
              this.listLoading = false
              const ret = response.data.data
              if(ret.length==0 || Number(ret[0].totalamt)==0){
                // this.$message.error('数据为空,联系管理员');
              }
              const lineName = []
              const series = []
              ret.forEach(element => {
                if (lineName.indexOf(element.title) < 0) {
                  lineName.push(element.title)
                }
              })
              const date = []
              lineName.forEach(name => {
                const sery = {
                  type: 'bar',
                  stack: '总量',
                  areaStyle: { normal: {} }
                }
                const amt = []
                ret.map(element => {
                  if (element.title === name) {
                    amt.push(Number(element.totalamt))
                    if (date.indexOf(element.ordertime) < 0) {
                      date.push(element.ordertime)
                    }
                  }
                })
                sery['data'] = amt
                sery['name'] = name
                series.push(sery)
              })
              this.options.legend.data = lineName
              this.options.xAxis[0].data = date
              this.options.series = series
              this.$refs.prochart.drawAreaStack(this.options)
            })
            this.options.title.text = '利润走势(￥)'
            this.options.yAxis[0].axisLabel.formatter = '{value} ￥'
        }
        }
      })
    }
  },
  mounted() {
    // 权限
    getMenu().then(response => {
      const res = response.data.data
      const menu = res.filter(e => e.name === '毛利润报表')
      if (menu[0].children[0].tabs.length) {
        this.allMenu = menu[0].children[0].tabs
      }
    })
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
      for(let i=0;i<this.allSecDep.length;i++){
        if(this.allSecDep[i].type==null){
          this.allSecDep[i].type=''
        }
      }
    })
    getPlatform().then(response => {
      this.plat = response.data.data
    })
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  margin-bottom: 20px;
  .el-form-item {
    margin-bottom: 0rem;
  }
}
</style>
