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
      <el-form-item label="订单编号">
        <el-input size="small"
                  v-model="condition.trendId"
                  placeholder="多个订单以英文格式逗号分隔"
                  style="width:215px;"></el-input>
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
                   @click="onSubmit(condition)">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData"
              @sort-change="sortNumber"
              v-loading="listLoading"
              element-loading-text="正在加载中...">
      <el-table-column label="平台"
                       prop="platform"></el-table-column>
      <el-table-column label="销售员"
                       prop="username"
                       sortable="custom"></el-table-column>
      <el-table-column label="部门"
                       prop="department"
                       sortable="custom"></el-table-column>
      <el-table-column label="二级部门"
                       prop="secDepartment"
                       sortable="custom"></el-table-column>
      <el-table-column label="订单编号"
                       prop="trendId"
                       sortable="custom"></el-table-column>
      <el-table-column label="账号"
                       prop="suffix"
                       sortable="custom"></el-table-column>
      <el-table-column label="毛利"
                       prop="profit"
                       sortable="custom"></el-table-column>
      <el-table-column label="订单总重量(克)"
                       prop="orderWeight"></el-table-column>
      <el-table-column label="SKU总重量(克)"
                       prop="skuWeight"></el-table-column>
      <el-table-column label="重量差异"
                       prop="weightDiff"
                       sortable="custom"></el-table-column>
      <el-table-column label="发货时间"
                       prop="orderCloseDate"
                       sortable="custom"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="success"
                     @click="handleEdit(scope.row)"
                     plain>更改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background
                   @size-change='handleSizeChange'
                   @current-change='handleCurrentChange'
                   :current-page="condition.page"
                   :page-size="condition.pageSize"
                   :page-sizes="[10,20,30,40]"
                   layout="total,sizes,prev,pager,next,jumper"
                   :total="this.total">
    </el-pagination>
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
import { APIWeightDiff, APIUpdateWeight } from '../../api/data'
import { getMonthDate } from '../../api/tools'
import { isAdmin } from '../../api/api'
export default {
  data() {
    return {
      total: null,
      tableData: [],
      listLoading: false,
      allMember: [],
      plat: [],
      member: [],
      account: [],
      department: [],
      allSecDp: [],
      secDepartment: [],
      dateRange: [],
      condition: {
        trendId: '',
        dateRange: [],
        member: [],
        plat: [],
        account: [],
        department: [],
        secDepartment: [],
        page: 1,
        pageSize: 10,
        sort: ''
      },
      Id: {
        nid: []
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
    // 排序
    sortNumber(column, prop, order) {
      if (column.order === 'descending') {
        this.condition.sort = '-' + column.prop
      } else {
        this.condition.sort = column.prop
      }
      this.getData()
    },
    handleEdit(row) {
      this.Id.nid = [row.trendId]
      APIUpdateWeight(this.Id).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '修改成功！',
            type: 'success'
          })
        } else {
          this.$message({
            message: '修改失败！',
            type: 'warning'
          })
        }
      })
    },
    // 分页
    handleSizeChange(val) {
      this.condition.pageSize = val
      this.getData(form)
    },
    handleCurrentChange(val) {
      this.condition.page = val
      this.getData(form)
    },
    //权限
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
          // const kes = this.kefu
          // if (kes.length > 0) {
          //   myform.member = res.map(m => {
          //     return m.username
          //   })
          // } else {
          myform.member = res.map(m => {
            return m.username
          })
          // }
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
    // 查询
    onSubmit(form) {
      this.getData(form)
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
    },
    getData(form) {
      const myform = this.myForm(form)
      this.listLoading = true
      APIWeightDiff(myform).then(res => {
        this.listLoading = false
        this.tableData = res.data.data.items
        this.condition.page = res.data.data._meta.currentPage
        this.condition.pageSize = res.data.data._meta.perPage
        this.total = res.data.data._meta.totalCount
      })
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


