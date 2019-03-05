<template>
  <section>
    <el-tabs v-model="activeName"
             type="card"
             @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in this.allMenu"
                   :label="item.name"
                   :name="item.name"
                   :key="index">
      </el-tab-pane>
    </el-tabs>
    <div v-show="risk">
      <el-form :model="condition"
               :inline="true"
               class="toolbar"
               label-width="100px">
        <el-form-item label="时间">
          <el-date-picker size="small"
                          v-model="date"
                          @change="time"
                          type="daterange"
                          value-format="yyyy-MM-dd"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="small"
                     type="primary"
                     @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="this.tableData"
                v-loading="loading"
                element-loading-text="正在加载中...">
        <el-table-column label="订单编号"
                         prop="tradeNid"></el-table-column>
        <el-table-column label="交易时间"
                         prop="orderTime"></el-table-column>
        <el-table-column label="账号简称"
                         prop="suffix"></el-table-column>
        <el-table-column label="买家ID"
                         prop="buyerId"></el-table-column>
        <el-table-column label="收货人"
                         prop="shipToName"></el-table-column>
        <el-table-column label="收货地址"
                         prop="shipToStreet"></el-table-column>
        <el-table-column label="收货地址2"
                         prop="shipToStreet2"></el-table-column>
        <el-table-column label="城市"
                         prop="shipToCity"></el-table-column>
        <el-table-column label="邮编"
                         prop="shipToZip"></el-table-column>
        <el-table-column label="国家"
                         prop="shipToCountryCode"></el-table-column>
        <el-table-column label="电话"
                         prop="shipToPhoneNum"></el-table-column>
        <el-table-column label="处理人"
                         prop="processor"></el-table-column>
        <el-table-column label="处理状态"
                         prop="completeStatus">
          <template slot-scope="scope">
            <el-tag :type="tags[scope.row.completeStatus]['type']">{{ scope.row.completeStatus }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button :type="tags[scope.row.completeStatus]['type']"
                       round
                       size="small"
                       @click="mark(scope.$index, scope.row)">标记完成</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block toolbar">
        <el-pagination background
                       @size-change='handleSizeChange'
                       @current-change='handleCurrentChange'
                       :current-page="this.condition.currentPage"
                       :page-size="this.condition.pageSize"
                       :page-sizes="[10,20,30,40]"
                       layout="total,sizes,prev,pager,next,jumper"
                       :total="this.totalCount"></el-pagination>
      </div>
    </div>
    <div v-show="blacklist"
         class="toolbar"
         style="padding:10px 20px;">
      <el-col :span="24">
        <el-form :inline="true">
          <el-form-item>
            <el-input size="small"
                      clearable
                      placeholder='search'
                      v-model='searchValue'
                      @input='handleSearch'></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small"
                       type="primary"
                       @click="handleAdd">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!-- 黑名单列表 -->
      <table id="oTable"
             border="1px solid #ebeef5"
             cellpadding="9"
             style="border: 1px solid #ebeef5;background-color:#fff;color:#606266;width:100%;border-collapse:collapse;">
        <thead>
          <tr>
            <th>平台</th>
            <th>买家ID</th>
            <th>收货人姓名</th>
            <th>收货人地址</th>
            <th>邮编</th>
            <th>电话</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in blackData"
              :key="index"
              style="text-align:center;">
            <td>{{ item.addressowner }}</td>
            <td>{{ item.buyerid}}</td>
            <td>{{ item.shipToName}}</td>
            <td>{{ item.shiptocountryCode}}{{ item.shiptostate}}{{ item.shiptocity}}{{ item.shiptostreet}}{{ item.shiptostreet2}}</td>
            <td>{{ item.shiptozip}}</td>
            <td>{{ item.SHIPtoPHONEnUM}}</td>
            <td>
              <el-button size="mini"
                         type="danger"
                         @click="del(item.id)"
                         style="margin:-20px;">删除</el-button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="block toolbar">
        <el-pagination background
                       @size-change='handleSizeChange1'
                       @current-change='handleCurrentChange1'
                       :current-page="this.page.currentPage"
                       :page-size="this.page.pageSize"
                       :page-sizes="[20,30,40,50]"
                       layout="total,sizes,prev,pager,next,jumper"
                       :total="this.total"></el-pagination>
      </div>
      <!-- 新增界面  -->
      <el-dialog title="新增"
                 :visible.sync="addFormVisible"
                 :close-on-click-modal="false">
        <el-form :inline="true"
                 :model="data"
                 label-width="100px"
                 ref="data">
          <el-form-item label="平台">
            <el-input v-model="data.addressowner"
                      auto-complete="off"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="买家ID">
            <el-input v-model="data.buyerId"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="收货人姓名">
            <el-input v-model="data.shipToName"></el-input>
          </el-form-item>
          <el-form-item label="是否模糊匹配">
            <el-switch v-model="value1"
                       @change="match('name')"
                       active-color="#13ce66"
                       inactive-color="#909399"></el-switch>
          </el-form-item>
          <br>
          <el-form-item label="区">
            <el-input v-model="data.shipToStreet"></el-input>
          </el-form-item>
          <el-form-item label="是否模糊匹配">
            <el-switch v-model="value2"
                       @change="match('street')"
                       active-color="#13ce66"
                       inactive-color="#909399"></el-switch>
          </el-form-item>
          <br>
          <el-form-item label="街道">
            <el-input v-model="data.shipToStreet2"></el-input>
          </el-form-item>
          <el-form-item label="是否模糊匹配">
            <el-switch v-model="value3"
                       @change="match('street2')"
                       active-color="#13ce66"
                       inactive-color="#909399"></el-switch>
          </el-form-item>
          <br>
          <el-form-item label="收货人城市">
            <el-input v-model="data.shipToCity"></el-input>
          </el-form-item>
          <el-form-item label="是否模糊匹配">
            <el-switch v-model="value4"
                       @change="match('city')"
                       active-color="#13ce66"
                       inactive-color="#909399"></el-switch>
          </el-form-item>
          <br>
          <el-form-item label="收货人省份">
            <el-input v-model="data.shipToState"></el-input>
          </el-form-item>
          <el-form-item label="是否模糊匹配">
            <el-switch v-model="value5"
                       @change="match('state')"
                       active-color="#13ce66"
                       inactive-color="#909399"></el-switch>
          </el-form-item>
          <br>
          <el-form-item label="国家">
            <el-input v-model="data.shipToCountryCode"></el-input>
          </el-form-item>
          <el-form-item label="是否模糊匹配">
            <el-switch v-model="value6"
                       @change="match('country')"
                       active-color="#13ce66"
                       inactive-color="#909399"></el-switch>
          </el-form-item>
          <br>
          <el-form-item label="邮编">
            <el-input v-model="data.shipToZip"></el-input>
          </el-form-item>
          <el-form-item label="是否模糊匹配">
            <el-switch v-model="value7"
                       @change="match('zip')"
                       active-color="#13ce66"
                       inactive-color="#909399"></el-switch>
          </el-form-item>
          <br>
          <el-form-item label="电话">
            <el-input v-model="data.shipToPhoneNum"></el-input>
          </el-form-item>
          <el-form-item label="是否模糊匹配">
            <el-switch v-model="value8"
                       @change="match('tel')"
                       active-color="#13ce66"
                       inactive-color="#909399"></el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取消</el-button>
          <el-button type="primary"
                     @click.native="addSubmit">提交</el-button>
        </div>
      </el-dialog>
    </div>
  </section>
</template>

<script>
import {
  Risk,
  BlackList,
  delBlackList,
  postBlacklist,
  postHandleOrder
} from '../../api/api'
import { getMenu } from '../../api/login'
export default {
  data() {
    return {
      tags: {
        待处理: { type: 'danger' },
        已完成: { type: 'success' }
      },
      value: '',
      currentPage: null,
      perPage: null,
      totalCount: null,
      total: null,
      searchValue: '',
      searchTable: [],
      value1: false,
      value2: false,
      value3: false,
      value4: false,
      value5: false,
      value6: false,
      value7: false,
      value8: false,
      addFormVisible: false,
      risk: true,
      blacklist: false,
      blackloading: false,
      activeName: '风险订单',
      allMenu: [],
      loading: false,
      tableData: [],
      blackData: [],
      data: {
        addressowner: '',
        buyerId: '',
        shipToName: '',
        shipToStreet: '',
        shipToStreet2: '',
        shipToCity: '',
        shipToState: '',
        shipToZip: '',
        shipToCountryCode: '',
        shipToPhoneNum: ''
      },
      date: [],
      condition: {
        beginDate: '',
        endDate: '',
        pageSize: 10,
        currentPage: 1
      },
      page: {
        currentPage: 1,
        pageSize: 20
      },
      condition2: {
        tradeNid: '',
        processor: ''
      }
    }
  },
  watch: {
    activeName: function(newVal, oldVal) {
      this.activeName = newVal
      this.getOrder(this.activeName)
    }
  },
  mounted() {
    getMenu().then(response => {
      const res = response.data.data
      const menu = res.filter(e => e.name === 'UR小工具')
      for (let i = 0; i < menu.length; i++) {
        for (let j = 0; j < menu[i].children.length; j++) {
          if (menu[i].children[j].tabs.length) {
            this.allMenu = menu[i].children[j].tabs
          }
        }
      }
    })
    this.getOrder(this.activeName)
  },
  methods: {
    time() {
      if (this.date !== null) {
        this.condition.beginDate = this.date[0]
        this.condition.endDate = this.date[1]
      } else {
        this.condition.beginDate = ''
        this.condition.endDate = ''
      }
    },
    // 标记
    mark(index, row) {
      this.condition2.tradeNid = row.tradeNid
      this.condition2.processor = this.$store.getters.name
      postHandleOrder(this.condition2).then(response => {
        this.getOrder(this.activeName)
      })
    },
    // 分页
    handleSizeChange(val) {
      this.condition.pageSize = val
      this.getOrder(this.activeName)
    },
    handleCurrentChange(val) {
      this.condition.currentPage = val
      this.getOrder(this.activeName)
    },
    handleSizeChange1(val) {
      this.page.pageSize = val
      this.getOrder(this.activeName)
    },
    handleCurrentChange1(val) {
      this.page.currentPage = val
      this.getOrder(this.activeName)
    },
    // 搜索
    handleSearch() {
      const ot = document.getElementById('oTable')
      const rowsLength = ot.rows.length
      const searchValue = this.searchValue && this.searchValue.toLowerCase()
      for (let i = 1; i < rowsLength; i++) {
        const searchText = ot.rows[i].innerHTML
        if (searchText.toLowerCase().indexOf(searchValue) > -1) {
          ot.rows[i].style.display = ''
        } else {
          ot.rows[i].style.display = 'none'
        }
      }
    },
    thstyle() {
      return 'color:black'
    },
    match(item) {
      if (item === 'name') {
        if (this.value1 === true) {
          if (this.data.shipToName === undefined) {
            this.data.shipToName = ''
          } else if (this.data.shipToName !== undefined) {
            this.data.shipToName = '%' + this.data.shipToName + '%'
          }
        } else {
          this.data.shipToName = this.data.shipToName.split('%').join('')
        }
      } else if (item === 'street') {
        if (this.value2 === true) {
          if (this.data.shipToStreet === undefined) {
            this.data.shipToStreet = ''
          } else if (this.data.shipToStreet !== undefined) {
            this.data.shipToStreet = '%' + this.data.shipToStreet + '%'
          }
        } else {
          this.data.shipToStreet = this.data.shipToStreet.split('%').join('')
        }
      } else if (item === 'street2') {
        if (this.value3 === true) {
          if (this.data.shipToStreet2 === undefined) {
            this.data.shipToStreet2 = ''
          } else if (this.data.shipToStreet2 !== undefined) {
            this.data.shipToStreet2 = '%' + this.data.shipToStreet2 + '%'
          }
        } else {
          this.data.shipToStreet2 = this.data.shipToStreet2.split('%').join('')
        }
      } else if (item === 'city') {
        if (this.value4 === true) {
          if (this.data.shipToCity === undefined) {
            this.data.shipToCity = ''
          } else if (this.data.shipToCity !== undefined) {
            this.data.shipToCity = '%' + this.data.shipToCity + '%'
          }
        } else {
          this.data.shipToCity = this.data.shipToCity.split('%').join('')
        }
      } else if (item === 'state') {
        if (this.value5 === true) {
          if (this.data.shipToState === undefined) {
            this.data.shipToState = ''
          } else if (this.data.shipToState !== undefined) {
            this.data.shipToState = '%' + this.data.shipToState + '%'
          }
        } else {
          this.data.shipToState = this.data.shipToState.split('%').join('')
        }
      } else if (item === 'country') {
        if (this.value6 === true) {
          if (this.data.shipToCountryCode === undefined) {
            this.data.shipToCountryCode = ''
          } else if (this.data.shipToCountryCode !== undefined) {
            this.data.shipToCountryCode =
              '%' + this.data.shipToCountryCode + '%'
          }
        } else {
          this.data.shipToCountryCode = this.data.shipToCountryCode
            .split('%')
            .join('')
        }
      } else if (item === 'zip') {
        if (this.value7 === true) {
          if (this.data.shipToZip === undefined) {
            this.data.shipToZip = ''
          } else if (this.data.shipToZip !== undefined) {
            this.data.shipToZip = '%' + this.data.shipToZip + '%'
          }
        } else {
          this.data.shipToZip = this.data.shipToZip.split('%').join('')
        }
      } else if (item === 'tel') {
        if (this.value8 === true) {
          if (this.data.shipToPhoneNum === undefined) {
            this.data.shipToPhoneNum = ''
          } else if (this.data.shipToPhoneNum !== undefined) {
            this.data.shipToPhoneNum = '%' + this.data.shipToPhoneNum + '%'
          }
        } else {
          this.data.shipToPhoneNum = this.data.shipToPhoneNum
            .split('%')
            .join('')
        }
      }
    },
    // 权限
    handleClick(tab, event) {
      if (tab.label === '风险订单') {
        this.risk = true
      } else {
        this.risk = false
      }
      if (tab.label === '黑名单') {
        this.blacklist = true
      } else {
        this.blacklist = false
      }
    },
    // 新增
    handleAdd() {
      const form = {
        addressowner: '',
        buyerId: '',
        shipToName: '',
        shipToStreet: '',
        shipToStreet2: '',
        shipToCity: '',
        shipToState: '',
        shipToZip: '',
        shipToCountryCode: '',
        shipToPhoneNum: ''
      }
      this.data = Object.assign({}, form)
      this.addFormVisible = true
    },
    // 删除
    del(id) {
      delBlackList(id).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
          this.getOrder(this.activeName)
        } else {
          return false
        }
      })
    },
    addSubmit() {
      this.addFormVisible = false
      postBlacklist(this.data).then(response => {
        debugger
        if (response.data.code === 200) {
          this.$confirm('成功!', '提示', {
            confirmButtonText: '确定',
            type: 'success'
          })
          this.getOrder(this.activeName)
        } else {
          this.$confirm('失败！', '提示', {
            confirmButtonText: '确定',
            type: 'error'
          })
        }
      })
    },
    onSubmit() {
      this.getOrder(this.activeName)
    },
    getOrder(name) {
      if (name === '风险订单') {
        this.loading = true
        Risk(this.condition).then(response => {
          this.loading = false
          this.tableData = response.data.data.items
          this.totalCount = response.data.data._meta.totalCount
          this.condition.currentPage = response.data.data._meta.currentPage
          this.condition.pageSize = response.data.data._meta.perPage
        })
      } else if (name === '黑名单') {
        this.blackloading = true
        BlackList(this.page).then(response => {
          this.blackloading = false
          this.blackData = this.searchTable = response.data.data.items
          this.total = response.data.data._meta.totalCount
          this.page.currentPage = response.data.data._meta.currentPage
          this.page.pageSize = response.data.data._meta.perPage
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.toolbar {
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>


