<template>
  <!-- <div>美工毛利润报表</div>     -->
  <div class="toolbar">
    <div class="demo-block demo-box demo-zh-CN demo-transition" @mouseover="changeActive" @mouseout="removeActive">
      <transition name="el-fade-in-linear">
        <el-form :model="condition" :inline="true" ref="condition" label-width="6.8rem" class="demo-form-inline" v-show="show" style="margin-bottom:10px;">
          <el-form-item label="部门" class="input">
            <el-select size="small" v-model="formInline.region" multiple collapse-tags placeholder="部门" @change="choosed">
              <el-button plain type="info" @click="selectalld">全选</el-button>
              <el-button plain type="info" @click="noselectd">取消</el-button>
              <el-option v-for="(item,index) in department" :index="item[index]" :key="item.id" :label="item.department" :value="item.department"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="美工员" class="input">
            <el-select size="small" v-model="condition.member" filterable multiple collapse-tags placeholder="美工员">
              <el-button plain type="info" @click="selectallm">全选</el-button>
              <el-button plain type="info" @click="noselectm">取消</el-button>
              <el-option v-for="(item,index) in member" :index="index" :key="item.username" :label="item.username" :value="item.username"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="时间类型" class="input" prop="dateType">
            <el-radio-group v-model="condition.dateType">
              <el-radio border v-for="(item,index) in dateType" :index="index" :key="item.id" :label="item.id" :value="item.id">{{item.type}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="日期" class="input" prop="dateRange" :rules="[{required: true, message: '请选择时间', trigger: 'blur'}]">
            <el-date-picker size="small" v-model="condition.dateRange" value-format="yyyy-MM-dd" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
            </el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-button size="small" type="primary" @click="onSubmit(condition)">查询</el-button>
          </el-form-item>
        </el-form>
      </transition>
      <div class="demo-block-control" @click="handleChange" style="left:0rem;">
        <transition>
          <i :class="{'el-icon-caret-bottom':isA,'el-icon-caret-top':!isA}" class="transition-i">
          </i>
        </transition>
        <transition>
          <span v-show="show1" class="transition-span">{{text}}</span>
        </transition>
      </div>
    </div>
    <el-row>
      <el-col :span="2" :offset="17">
        <el-input clearable placeholder="search" v-model="searchValue" @change="handleSearch"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button style="float:left;" type="default" @click="exportExcel">导出Excel</el-button>
      </el-col>
      <el-col :span="3">
        <el-dropdown trigger="click" style="margin-left:20px;">
          <span class="el-dropdown-link">
            属性选择
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-checkbox v-model="checked1" @change="handleCheck1">责任人表</el-checkbox><br>
            <el-checkbox v-model="checked2" @change="handleCheck2">时间段（0-6月）</el-checkbox><br>
            <el-checkbox v-model="checked3" @change="handleCheck3">销售额$（0-6月）</el-checkbox><br>
            <el-checkbox v-model="checked4" @change="handleCheck4">销售额￥（0-6月）</el-checkbox><br>
            <el-checkbox v-model="checked5" @change="handleCheck5">商品成本￥（0-6月）</el-checkbox><br>
            <el-checkbox v-model="checked6" @change="handleCheck6">交易费汇总$ (0-6月)</el-checkbox><br>
            <el-checkbox v-model="checked7" @change="handleCheck7">交易费汇总￥ (0-6月)</el-checkbox><br>
            <el-checkbox v-model="checked8" @change="handleCheck8">包装成本￥（0-6月）</el-checkbox><br>
            <el-checkbox v-model="checked9" @change="handleCheck9">运费成本￥（0-6月）</el-checkbox><br>
            <el-checkbox v-model="checked10" @change="handleCheck10">死库处理￥（0-6月）</el-checkbox><br>
            <el-checkbox v-model="checked11" @change="handleCheck11">运营杂费￥（0-6月）</el-checkbox><br>
            <el-checkbox v-model="checked12" @change="handleCheck12">毛利润￥（0-6月）</el-checkbox><br>
            <el-checkbox v-model="checked13" @change="handleCheck13">毛利率%（0-6月）</el-checkbox><br>
            <el-checkbox v-model="checked14" @change="handleCheck14">时间段（6-12月）</el-checkbox><br>
            <el-checkbox v-model="checked15" @change="handleCheck15">销售额$（6-12月）</el-checkbox><br>
            <el-checkbox v-model="checked16" @change="handleCheck16">销售额￥（6-12月）</el-checkbox><br>
            <el-checkbox v-model="checked17" @change="handleCheck17">商品成本￥（6-12月）</el-checkbox><br>
            <el-checkbox v-model="checked18" @change="handleCheck18">交易费汇总$ (6-12月)</el-checkbox><br>
            <el-checkbox v-model="checked19" @change="handleCheck19">交易费汇总￥ (6-12月)</el-checkbox><br>
            <el-checkbox v-model="checked20" @change="handleCheck20">包装成本￥（6-12月）</el-checkbox><br>
            <el-checkbox v-model="checked21" @change="handleCheck21">运费成本￥（6-12月）</el-checkbox><br>
            <el-checkbox v-model="checked22" @change="handleCheck22">死库处理￥（6-12月）</el-checkbox><br>
            <el-checkbox v-model="checked23" @change="handleCheck23">运营杂费￥（6-12月）</el-checkbox><br>
            <el-checkbox v-model="checked24" @change="handleCheck24">毛利润￥（6-12月）</el-checkbox><br>
            <el-checkbox v-model="checked25" @change="handleCheck25">毛利率%（6-12月）</el-checkbox><br>
            <el-checkbox v-model="checked26" @change="handleCheck26">时间段（12月以上）</el-checkbox><br>
            <el-checkbox v-model="checked27" @change="handleCheck27">销售额$（12月以上）</el-checkbox><br>
            <el-checkbox v-model="checked28" @change="handleCheck28">销售额￥（12月以上）</el-checkbox><br>
            <el-checkbox v-model="checked29" @change="handleCheck29">商品成本￥（12月以上）</el-checkbox><br>
            <el-checkbox v-model="checked30" @change="handleCheck30">交易费汇总$ (12月以上)</el-checkbox><br>
            <el-checkbox v-model="checked31" @change="handleCheck31">交易费汇总￥ (12月以上)</el-checkbox><br>
            <el-checkbox v-model="checked32" @change="handleCheck32">包装成本￥（12月以上）</el-checkbox><br>
            <el-checkbox v-model="checked33" @change="handleCheck33">运费成本￥（12月以上）</el-checkbox><br>
            <el-checkbox v-model="checked34" @change="handleCheck34">死库处理￥（12月以上）</el-checkbox><br>
            <el-checkbox v-model="checked35" @change="handleCheck35">运营杂费￥（12月以上）</el-checkbox><br>
            <el-checkbox v-model="checked36" @change="handleCheck36">毛利润￥（12月以上）</el-checkbox><br>
            <el-checkbox v-model="checked37" @change="handleCheck37">毛利率%（12月以上）</el-checkbox><br>
            <el-checkbox v-model="checked38" @change="handleCheck38">销售额￥（汇总）</el-checkbox><br>
            <el-checkbox v-model="checked39" @change="handleCheck39">毛利润￥（汇总）</el-checkbox><br>
            <el-checkbox v-model="checked40" @change="handleCheck40">毛利率%（汇总）</el-checkbox>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <el-table ref="table" :data="tableData" id="sale-table" v-loading="listLoading" @sort-change="sortNumber" show-summary :summary-method="getSummaries" v-show="show2" :height="tableHeight" :max-height="tableHeight"  style="width: 100%;">
      <el-table-column v-if="this.checked1" min-width="100" prop="possessman1Zero" label="责任人表" :formatter="empty" sortable></el-table-column>
      <el-table-column v-if="this.checked2" min-width="125" prop="timegroupZero" label="时间段（0-6月）"></el-table-column>
      <el-table-column v-if="this.checked3" min-width="160" prop="salemoneyrmbusZero" label="销售额$（0-6月）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column v-if="this.checked4" min-width="170" prop="salemoneyrmbznZero" label="销售额￥（0-6月）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column v-if="this.checked5" min-width="180" prop="costmoneyrmbZero" label="商品成本￥（0-6月）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column v-if="this.checked6" min-width="190" prop="ppebayusZero" label="交易费汇总$（0-6月）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column v-if="this.checked7" min-width="200" prop="ppebayznZero" label="交易费汇总￥（0-6月）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column v-if="this.checked8" min-width="180" prop="inpackagefeermbZero" label="包装成本￥（0-6月）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column v-if="this.checked9" min-width="180" prop="expressfarermbZero" label="运费成本￥（0-6月）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column v-if="this.checked10" min-width="180" prop="devofflinefeeZero" label="死库处理￥（0-6月）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column v-if="this.checked11" min-width="180" prop="devOpeFeeZero" label="运营杂费￥（0-6月）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column v-if="this.checked12" min-width="170" prop="netprofitZero" label="毛利润￥（0-6月）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column v-if="this.checked13" min-width="170" prop="netrateZero" label="毛利率%（0-6月）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column v-if="this.checked14" min-width="135" prop="timegroupSix" label="时间段（6-12月）"></el-table-column>
      <el-table-column v-if="this.checked15" min-width="170" prop="salemoneyrmbusSix" label="销售额$（6-12月）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column v-if="this.checked16" min-width="180" prop="salemoneyrmbznSix" label="销售额￥（6-12月）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column v-if="this.checked17" min-width="190" prop="costmoneyrmbSix" label="商品成本￥（6-12月）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column v-if="this.checked18" min-width="200" prop="ppebayusSix" label="交易费汇总$（6-12月）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column v-if="this.checked19" min-width="200" prop="ppebayznSix" label="交易费汇总￥（6-12月）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column v-if="this.checked20" min-width="190" prop="inpackagefeermbSix" label="包装成本￥（6-12月）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column v-if="this.checked21" min-width="190" prop="expressfarermbSix" label="运费成本￥（6-12月）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column v-if="this.checked22" min-width="190" prop="devofflinefeeSix" label="死库处理￥（6-12月）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column v-if="this.checked23" min-width="190" prop="devOpeFeeSix" label="运营杂费￥（6-12月）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column v-if="this.checked24" min-width="180" prop="netprofitSix" label="毛利润￥（6-12月）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column v-if="this.checked25" min-width="170" prop="netrateSix" label="毛利率%（6-12月）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column v-if="this.checked26" min-width="150" prop="timegroupTwe" label="时间段（12月以上）"></el-table-column>
      <el-table-column v-if="this.checked27" min-width="180" prop="salemoneyrmbusTwe" label="销售额$（12月以上）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column v-if="this.checked28" min-width="190" prop="salemoneyrmbznTwe" label="销售额￥（12月以上）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column v-if="this.checked29" min-width="200" prop="costmoneyrmbTwe" label="商品成本￥（12月以上）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column v-if="this.checked30" min-width="210" prop="ppebayusTwe" label="交易费汇总$（12月以上）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column v-if="this.checked31" min-width="220" prop="ppebayznTwe" label="交易费汇总￥（12月以上）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column v-if="this.checked32" min-width="200" prop="inpackagefeermbTwe" label="包装成本￥（12月以上）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column v-if="this.checked33" min-width="210" prop="expressfarermbTwe" label="运费成本￥（12月以上）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column v-if="this.checked34" min-width="210" prop="devofflinefeeTwe" label="死库处理￥（12月以上）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column v-if="this.checked35" min-width="200" prop="devOpeFeeTwe" label="运营杂费￥（12月以上）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column v-if="this.checked36" min-width="190" prop="netprofitTwe" label="毛利润￥（12月以上）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column v-if="this.checked37" min-width="190" prop="netrateTwe" label="毛利率%（12月以上）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column v-if="this.checked38" min-width="160" prop="salemoneyrmbtotal" label="销售额￥（汇总）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column v-if="this.checked39" min-width="160" prop="netprofittotal" label="毛利润￥（汇总）" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column v-if="this.checked40" min-width="160" prop="netratetotal" label="毛利率%（汇总）" :formatter="empty" sortable="custom"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getSection, getMember, getPossess } from '../../api/profit'
import { compareUp, compareDown, getMonthDate } from '../../api/tools'
import { isAdmin } from '../../api/api'

export default {
  data() {
    return {
      checked1: true,
      checked2: false,
      checked3: false,
      checked4: true,
      checked5: false,
      checked6: false,
      checked7: false,
      checked8: false,
      checked9: false,
      checked10: false,
      checked11: false,
      checked12: true,
      checked13: true,
      checked14: false,
      checked15: false,
      checked16: true,
      checked17: false,
      checked18: false,
      checked19: false,
      checked20: false,
      checked21: false,
      checked22: false,
      checked23: false,
      checked24: true,
      checked25: true,
      checked26: false,
      checked27: false,
      checked28: true,
      checked29: false,
      checked30: false,
      checked31: false,
      checked32: false,
      checked33: false,
      checked34: false,
      checked35: false,
      checked36: true,
      checked37: true,
      checked38: true,
      checked39: true,
      checked40: true,
      tableHeight: 0,
      allMember: [],
      isA: true,
      text: '显示输入框',
      show: true,
      show1: false,
      show2: false,
      tableData: [],
      searchTable: [],
      searchValue: '',
      listLoading: false,
      department: [],
      dateType: [{ id: 1, type: '发货时间' }, { id: 0, type: '交易时间' }],
      res: [],
      member: [],
      formInline: {
        region: []
      },
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
    handleCheck1() {
      !this.checked1
    },
    handleCheck2() {
      !this.checked2
    },
    handleCheck3() {
      !this.checked3
    },
    handleCheck4() {
      !this.checked4
    },
    handleCheck5() {
      !this.checked5
    },
    handleCheck6() {
      !this.checked6
    },
    handleCheck7() {
      !this.checked7
    },
    handleCheck8() {
      !this.checked8
    },
    handleCheck9() {
      !this.checked9
    },
    handleCheck10() {
      !this.checked10
    },
    handleCheck11() {
      !this.checked11
    },
    handleCheck12() {
      !this.checked12
    },
    handleCheck13() {
      !this.checked13
    },
    handleCheck14() {
      !this.checked14
    },
    handleCheck15() {
      !this.checked15
    },
    handleCheck16() {
      !this.checked16
    },
    handleCheck17() {
      !this.checked17
    },
    handleCheck18() {
      !this.checked18
    },
    handleCheck19() {
      !this.checked19
    },
    handleCheck20() {
      !this.checked20
    },
    handleCheck21() {
      !this.checked21
    },
    handleCheck22() {
      !this.checked22
    },
    handleCheck23() {
      !this.checked23
    },
    handleCheck24() {
      !this.checked24
    },
    handleCheck25() {
      !this.checked25
    },
    handleCheck26() {
      !this.checked26
    },
    handleCheck27() {
      !this.checked27
    },
    handleCheck28() {
      !this.checked28
    },
    handleCheck29() {
      !this.checked29
    },
    handleCheck30() {
      !this.checked30
    },
    handleCheck31() {
      !this.checked31
    },
    handleCheck32() {
      !this.checked32
    },
    handleCheck33() {
      !this.checked33
    },
    handleCheck34() {
      !this.checked34
    },
    handleCheck35() {
      !this.checked35
    },
    handleCheck36() {
      !this.checked36
    },
    handleCheck37() {
      !this.checked37
    },
    handleCheck38() {
      !this.checked38
    },
    handleCheck39() {
      !this.checked39
    },
    handleCheck40() {
      !this.checked40
    },
    selectalld() {
      const allValues = []
      for (const item of this.section) {
        allValues.push(item.department)
      }
      this.formInline.region = allValues
      this.member = this.allMember
    },
    noselectd() {
      this.formInline.region = []
      this.member = this.allMember
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
    choosed() {
      let res = []
      this.member = []
      this.condition.member = []
      const val = this.formInline.region
      res = this.allMember
      let per = []
      if (val !== '') {
        for (let i = 0; i < val.length; i++) {
          per = res.filter(
            ele => (ele.department === val[i] || ele.parent_depart === val[i]) && ele.position === '美工'
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
        this.tableHeight = height - 150 + 'px'
      } else if (this.show === true) {
        this.text = '隐藏输入框'
        const height = document.getElementById('app').clientHeight
        this.tableHeight = height - 225 + 'px'
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
      const height = document.getElementById('app').clientHeight
      this.tableHeight = height - 225 + 'px'
      this.show2 = true
      let admin = ''
      this.$refs.condition.validate(valid => {
        if (valid) {
          const username = sessionStorage.getItem('user')
          for (let i = 0; i < this.res.length; i++) {
            admin = this.res[i].username
          }
          if (isAdmin() === true && this.formInline.region.length === 0 && myform.member === 0) {
            myform.member = this.member.map(m => {
              return m.username
            })
          } else if (this.formInline.region.length !== 0 && myform.member.length === 0) {
            const val = this.formInline.region
            let res = []
            let person = []
            res = this.allMember
            for (let i = 0; i < val.length; i++) {
              person = res.filter(
                ele => (ele.department === val[i] || ele.parent_depart === val[i]) && ele.position === '美工'
              )
              this.member.concat(person)
            }
            myform.member = this.member.map(m => {
              return m.username
            })
          } else if (username === admin && this.formInline.region.length === 0 && myform.member.length === 0) {
            myform.member = this.member.map(m => {
              return m.username
            })
          } else if (isAdmin() === false && username !== admin) {
            myform.member = this.member.map(m => {
              return m.username
            })
          }
          this.listLoading = true
          getPossess(myform).then(response => {
            this.listLoading = false
            this.tableData = this.searchTable = response.data.data
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 空值显示“--”
    empty(row, column, cellValue, index) {
      return cellValue || '--'
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
      sums[fileds.indexOf('netrateZero')] =
        Math.round(
          (sums[fileds.indexOf('netprofitZero')] * 10000) /
            sums[fileds.indexOf('salemoneyrmbznZero')]
        ) / 100
      sums[fileds.indexOf('netrateSix')] =
        Math.round(
          (sums[fileds.indexOf('netprofitSix')] * 10000) /
            sums[fileds.indexOf('salemoneyrmbznSix')]
        ) / 100
      sums[fileds.indexOf('netrateTwe')] =
        Math.round(
          (sums[fileds.indexOf('netprofitTwe')] * 10000) /
            sums[fileds.indexOf('salemoneyrmbznTwe')]
        ) / 100
      sums[fileds.indexOf('netratetotal')] =
        Math.round(
          (sums[fileds.indexOf('netprofittotal')] * 10000) /
            sums[fileds.indexOf('salemoneyrmbtotal')]
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
    // 导出
    exportExcel() {
      const th = [
        '表类型',
        '时间分组',
        '业绩归属人',
        '销售额$(0-6月)',
        '销售额￥(0-6月)',
        '商品成本￥(0-6月)',
        '交易费汇总$(0-6月)',
        '交易费汇总￥(0-6月)',
        '内包装成本￥(0-6月)',
        '运费成本(0-6月)',
        '死库费用￥(0-6月)',
        '运营杂费(0-6月)',
        '毛利润￥(0-6月)',
        '毛利润率%(0-6月)',
        '时间分组',
        '销售额$(6-12月)',
        '销售额￥(6-12月)',
        '商品成本￥(6-12月)',
        '交易费汇总$(6-12月)',
        '交易费汇总￥(6-12月)',
        '内包装成本￥(6-12月)',
        '运费成本￥(6-12月)',
        '死库费用￥(6-12月)',
        '运营杂费(6-12月)',
        '毛利润￥(6-12月)',
        '毛利润率%(6-12月)',
        '时间分组',
        '销售额$(12月以上)',
        '销售额￥(12月以上)',
        '商品成本￥(12月以上)',
        '交易费汇总$(12月以上)',
        '交易费汇总￥(12月以上)',
        '内包装成本￥(12月以上)',
        '运费成本￥(12月以上)',
        '死库费用￥(12月以上)',
        '运营杂费(12月以上)',
        '毛利润￥(12月以上)',
        '毛利润率%(12月以上)',
        '销售额￥(汇总)',
        '毛利润￥(汇总)',
        '毛利润率%(汇总)'
      ]
      const filterVal = [
        'tableType',
        'timegroupZero',
        'possessman1Zero',
        'salemoneyrmbusZero',
        'salemoneyrmbznZero',
        'costmoneyrmbZero',
        'ppebayusZero',
        'ppebayznZero',
        'inpackagefeermbZero',
        'expressfarermbZero',
        'possessofflinefeeZero',
        'possessOpeFeeZero',
        'netprofitZero',
        'netrateZero',
        'timegroupSix',
        'salemoneyrmbusSix',
        'salemoneyrmbznSix',
        'costmoneyrmbSix',
        'ppebayusSix',
        'ppebayznSix',
        'inpackagefeermbSix',
        'expressfarermbSix',
        'possessofflinefeeSix',
        'possessOpeFeeSix',
        'netprofitSix',
        'netrateSix',
        'timegroupTwe',
        'salemoneyrmbusTwe',
        'salemoneyrmbznTwe',
        'costmoneyrmbTwe',
        'ppebayusTwe',
        'ppebayznTwe',
        'inpackagefeermbTwe',
        'expressfarermbTwe',
        'possessofflinefeeTwe',
        'possessOpeFeeTwe',
        'netprofitTwe',
        'netrateTwe',
        'salemoneyrmbtotal',
        'netprofittotal',
        'netratetotal'
      ]
      const Filename = '美工毛利润报表'
      const data = this.tableData.map(v => filterVal.map(k => v[k]))
      const [fileName, fileType, sheetName] = [Filename, 'xls']
      this.$toExcel({ th, data, fileName, fileType, sheetName })
    },
    handleSearch() {
      const searchValue = this.searchValue && this.searchValue.toLowerCase()
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
    }
  },
  mounted() {
    getSection().then(response => {
      const res = response.data.data
      this.department = res.filter(ele => ele.department && ele.type === '业务')
    })
    getMember().then(response => {
      const res = response.data.data
      this.allMember = this.member = res.filter(ele => ele.position === '美工')
      this.res = res.filter(ele => (ele.position === '经理' || ele.position === '主管'))
    })
  }
}
</script>

<style lang="scss">
.el-select-dropdown {
  .el-button--info.is-plain {
    width: 50%;
    padding: 0.5rem 1rem;
    font-size: 12px;
    line-height: 1.5;
    margin-left: 0;
    float: left;
    border-radius: 0 !important;
    color: #333;
    background-color: #fff;
  }
  .el-button:hover {
    color: #333;
    background-color: #ebebeb;
    border-color: #adadad;
  }
}
.el-table__body {
  td {
    padding: 0.5rem 0;
    .cell {
      line-height: normal;
    }
  }
}
.el-table__footer {
  .cell {
    line-height: normal;
    color: red;
    font-weight: 550;
  }
}
.el-radio.is-bordered {
  padding: 0.6rem 1.6rem 0 0.6rem;
  height: 3rem;
}
</style>
