<template>
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
  </div>
</template>

<script>
import {
  getSection,
  getSecDepartment,
  getPlatform,
  getMember,
  getAccount,
  getSalestrend
} from '../../api/profit'
import { getMonthDate } from '../../api/tools'
export default {
  data() {
    return {
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
        dateType: 1,
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
    onSubmit() {},
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

