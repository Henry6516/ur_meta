<template>
    <section>
        <el-form :model='condition' :inline='true' ref='condition' label-width='100px' class='demo-form-inline'>
          <el-form-item label="账号" class="input">
            <el-select size="small" v-model="condition.suffix" filterable multiple collapse-tags placeholder="账号">
              <el-button plain type="info" @click="selectall">全选</el-button>
              <el-button plain type="info" @click="noselect">取消</el-button>
              <el-option v-for="(item,index) in account" :index="index" :key="item.id" :label="item.store" :value="item.store">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='销售员' class='input'>
            <el-select size="small" v-model='condition.salesman' filterable multiple collapse-tags placeholder='销售员' >
              <el-button plain type="info" @click="selectallm">全选</el-button>
              <el-button plain type="info" @click="noselectm">取消</el-button>
              <el-option v-for='(item,index) in member' :index='index' :key='item.username' :label='item.username' :value='item.username'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品编码" style="margin-left: 40px;">
            <el-input size="small" v-model="condition.goodsCode" style="width:215px;"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="商品名称">
            <el-input size="small" v-model="condition.goodsName" style="width: 215px;"></el-input>
          </el-form-item>
          <el-form-item label='日期1' prop='lastDateRange' :rules="[{required: true, message: '请选择时间', trigger: 'blur'}]">
            <el-date-picker size="small" v-model='condition.lastDateRange' type='daterange' value-format='yyyy-MM-dd' align='right' unlink-panels range-separator='至' start-placeholder='开始日期' end-placeholder='结束日期' style="width: 215px;">
            </el-date-picker>
            <div style="color: #f56c6c;width: 40px;float: right;">{{this.lastWeek}}</div>
          </el-form-item>
          <el-form-item label='日期2' prop='dateRange' :rules="[{required: true, message: '请选择时间', trigger: 'blur'}]">
            <el-date-picker size="small" v-model='condition.dateRange' type='daterange' value-format='yyyy-MM-dd' align='right' unlink-panels range-separator='至' start-placeholder='开始日期' end-placeholder='结束日期' style="width: 215px;">
            </el-date-picker>
            <span style="color: #f56c6c;width: 40px;float: right;">{{this.week}}</span>
          </el-form-item>
          <el-form-item style="margin-left:60px;">
            <el-button size="small" type='primary' @click='onSubmit'>查询</el-button>
          </el-form-item>
        </el-form>
        <el-row class="toolbar">
            <el-col :span='2' :offset="21">
               <el-button style='float:left' type='default' @click='exportExcel'>导出Excel
               </el-button>
            </el-col>
        </el-row>
        <el-table :data="tableData" v-loading="listLoading" @sort-change="sortNumber" max-height="770" style="width:100%">
            <el-table-column prop="suffix" label="账号简称" sortable align="center"></el-table-column>
            <el-table-column prop="username" label="销售员" sortable align="center"></el-table-column>
            <el-table-column prop="goodsCode" label="商品编码" sortable align="center"></el-table-column>
            <el-table-column prop="goodsName" label="商品名称" align="center"></el-table-column>
            <el-table-column prop="lastNum" label="上上周销量" sortable="custom" align="center"></el-table-column>
            <el-table-column prop="lastAmt" label="上上周销售额" sortable="custom" align="center"></el-table-column>
            <el-table-column prop="num" label="上周销量" sortable="custom" align="center"></el-table-column>
            <el-table-column prop="amt" label="上周销售额" sortable="custom" align="center"></el-table-column>
            <el-table-column prop="numDiff" label="销量变化" sortable="custom" align="center"></el-table-column>
            <el-table-column prop="amtDiff" label="销售额变化" sortable="custom" align="center"></el-table-column>
            <el-table-column prop="createDate" label="创建时间" :formatter="empty" align="center"></el-table-column>
        </el-table>
        <div class="toolbar">
            <el-pagination 
                background 
                @size-change="handleSizeChange" 
                @current-change="handleCurrentChange" 
                :current-page="this.condition.page" 
                :page-sizes="[10, 20, 30, 40]" 
                :page-size="this.condition.pageSize" 
                layout="total, sizes, slot, prev, pager, next, jumper" 
                :total="this.total">
                <span>
                  <el-button type="text" @click="showAll">显示全部</el-button>
                </span>
            </el-pagination>
        </div>
    </section>
</template>

<script>
import { getSalesChange, getAccount, getMember } from '../../api/profit'

export default {
    data() {
        return {
          lastWeek: null,
          week: null,
          listLoading: false,
            searchValue: '',
            total: null,
            member: [],
            account: [],
            tableDataAll: [],
            tableData: [],
            condition: {
              lastDateRange: [],
              dateRange: [],
              suffix: [],
              salesman: [],
              goodsName: '',
              goodsCode: '',
              page: 1,
              pageSize: 10,
              sort: ''
            }
        }
    },
    mounted() {
        getAccount().then(response => {
          this.account = response.data.data
        })
        getMember().then(response => {
          const res = response.data.data
          this.allMember = this.member = res.filter(ele => ele.position === '销售')
        })
    },
    methods: {
      showAll() {
        this.handleSizeChange(this.total)
      },
      onSubmit() {
        this.$refs.condition.validate(valid => {
          if (valid) {
            this.getWeek()
            this.getData()
          } else {
            return false
          }
        })
      },
        selectall() {
          const allValues = []
          for (const item of this.account) {
            allValues.push(item.store)
          }
          this.condition.suffix = allValues
        },
        noselect() {
          this.condition.suffix = []
        },
        selectallm() {
          const allValues = []
          for (const item of this.member) {
            allValues.push(item.username)
          }
          this.condition.salesman = allValues
        },
        noselectm() {
          this.condition.salesman = []
        },
        // 导出
        exportExcel() {
            const th = [
              '账号简称',
              '销售员',
              '商品编码',
              '商品名称',
              '上上周销量',
              '上上周销售额',
              '上周销量',
              '上周销售额',
              '销量变化',
              '销售额变化',
              '创建时间'
            ]
            const filterVal = [
              "suffix",
              "username",
              "goodsCode",
              "goodsName",
              "num",
              "amt",
              "lastNum",
              "lastAmt",
              "numDiff",
              "amtDiff",
              "createDate"
            ]
            const form = Object.assign({}, this.condition)
            form.page = 1
            form.pageSize = 0
            getSalesChange(form).then(res => {
                this.tableDataAll = res.data.data.items
                const FileName = '产品销售变化表'
                const data = this.tableDataAll.map(v => filterVal.map(k => v[k]))
                const [fileName, fileType, sheetName] = [FileName, 'xls']
                this.$toExcel({ th, data, fileName, fileType, sheetName })
            })
        },
        empty(row, column) {
            return row.createDate.substring(0, 10)
        },
        // 数字排序
        sortNumber(column, prop, order) {
            if (column.order === 'descending') {
                this.condition.sort = '-' + column.prop
                this.getData()
            } else {
                this.condition.sort = column.prop
                this.getData()
            }
        },
        handleCurrentChange(val) {
            this.condition.page = val
            this.getData()
        },
        handleSizeChange(val) {
            this.condition.pageSize = val
            this.getData()
        },
        getWeek() {
          const s = this.condition.lastDateRange[1]
          const s1 = this.condition.lastDateRange[0]
          const s2 = this.condition.dateRange[1]
          const s3 = this.condition.dateRange[0]
          const t = Date.UTC(s.slice(0, 4), s.slice(5, 7), s.slice(8, 10)) - Date.UTC(s1.slice(0, 4), s1.slice(5, 7), s1.slice(8, 10))
          const t1 = Date.UTC(s2.slice(0, 4), s2.slice(5, 7), s2.slice(8, 10)) - Date.UTC(s3.slice(0, 4), s3.slice(5, 7), s3.slice(8, 10))
          this.lastWeek = t / (24 * 3600 * 1000) + 1 + '天' 
          this.week = t1 / (24 * 3600 * 1000) + 1 + '天'
        },
        getData() {
          this.listLoading = true
            getSalesChange(this.condition).then(res => {
              this.listLoading = false
                this.tableData = res.data.data.items
                this.condition.page = res.data.data._meta.currentPage
                this.condition.pageSize = res.data.data._meta.perPage
                this.total = res.data.data._meta.totalCount
            })
        }
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

