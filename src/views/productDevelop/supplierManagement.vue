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
    <div v-show="show.management">
      <el-button @click="addVisible = true"
                 type="primary"
                 style="margin:10px;margin-left: 1%">添加新供应商</el-button>
      <el-dialog title="添加新供应商"
                 :visible.sync="addVisible"
                 width="60%">
        <el-form :model="addForm"
                 label-width="100px"
                 ref="addForm">
          <el-row>
            <el-col :span="24">
              <el-form-item label="供应商名称"
                            :rules="[{ required: true, message: '请输入关键词', trigger: 'blur' }]">
                <el-select v-model="addForm.supplierName"
                           filterable
                           remote
                           reserve-keyword
                           placeholder="请输入关键词"
                           :remote-method="remoteMethod"
                           :loading="loading"
                           style="width:100%;">
                  <el-option v-for="item in options4"
                             :key="item.id"
                             :label="item.text"
                             :value="item.text">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="线下采购"
                            :rules="[{ required: true, message: '线下采购不能为空', trigger: 'blur' }]">
                <el-input v-model="addForm.purchaser"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="联系人1">
                <el-input v-model="addForm.contactPerson1"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="电话1">
                <el-input v-model="addForm.phone1"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="联系人2">
                <el-input v-model="addForm.contactPerson2"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="电话2">
                <el-input v-model="addForm.phone2"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="地址">
                <el-input v-model="addForm.address"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="账期"
                            aria-placeholder="--请选择账期--">
                <el-select v-model="addForm.paymentDays"
                           style="width:100%;">
                  <el-option label="无"
                             value="无"></el-option>
                  <el-option label="1个月"
                             value="1个月"></el-option>
                  <el-option label="2个月"
                             value="2个月"></el-option>
                  <el-option label="3个月"
                             value="3个月"></el-option>
                  <el-option label="半年"
                             value="半年"></el-option>
                  <el-option label="一年"
                             value="一年"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="账期"
                            aria-placeholder="--请选择付款渠道--">
                <el-select v-model="addForm.payChannel"
                           style="width:100%;">
                  <el-option label="线上"
                             value="线上"></el-option>
                  <el-option label="线下"
                             value="线下"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="店铺链接1">
                <el-input v-model="addForm.link1"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="店铺链接2">
                <el-input v-model="addForm.link2"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="店铺链接3">
                <el-input v-model="addForm.link3"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="店铺链接4">
                <el-input v-model="addForm.link4"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="店铺链接5">
                <el-input v-model="addForm.link5"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="店铺链接6">
                <el-input v-model="addForm.link6"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     @click="add('addForm')">添 加</el-button>
        </span>
      </el-dialog>
      <el-dialog title="编辑供应商"
                 :visible.sync="editVisible"
                 width="60%">
        <el-form :model="editForm"
                 label-width="100px"
                 ref="editForm">
          <el-row>
            <el-col :span="24">
              <el-form-item label="供应商名称"
                            :rules="[{ required: true, message: '请输入关键词', trigger: 'blur' }]">
                <el-select v-model="editForm.supplierName"
                           filterable
                           remote
                           reserve-keyword
                           placeholder="请输入关键词"
                           :remote-method="remoteMethod"
                           :loading="loading"
                           style="width:100%;">
                  <el-option v-for="item in options4"
                             :key="item.id"
                             :label="item.text"
                             :value="item.text">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="线下采购"
                            :rules="[{ required: true, message: '线下采购不能为空', trigger: 'blur' }]">
                <el-input v-model="editForm.purchaser"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="联系人1">
                <el-input v-model="editForm.contactPerson1"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="电话1">
                <el-input v-model="editForm.phone1"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="联系人2">
                <el-input v-model="editForm.contactPerson2"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="电话2">
                <el-input v-model="editForm.phone2"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="地址">
                <el-input v-model="editForm.address"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="账期"
                            aria-placeholder="--请选择账期--">
                <el-select v-model="editForm.paymentDays"
                           style="width:100%;">
                  <el-option label="无"
                             value="无"></el-option>
                  <el-option label="1个月"
                             value="1个月"></el-option>
                  <el-option label="2个月"
                             value="2个月"></el-option>
                  <el-option label="3个月"
                             value="3个月"></el-option>
                  <el-option label="半年"
                             value="半年"></el-option>
                  <el-option label="一年"
                             value="一年"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="账期"
                            aria-placeholder="--请选择付款渠道--">
                <el-select v-model="editForm.payChannel"
                           style="width:100%;">
                  <el-option label="线上"
                             value="线上"></el-option>
                  <el-option label="线下"
                             value="线下"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="店铺链接1">
                <el-input v-model="editForm.link1"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="店铺链接2">
                <el-input v-model="editForm.link2"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="店铺链接3">
                <el-input v-model="editForm.link3"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="店铺链接4">
                <el-input v-model="editForm.link4"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="店铺链接5">
                <el-input v-model="editForm.link5"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="店铺链接6">
                <el-input v-model="editForm.link6"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     @click="edit('editForm')">编 辑</el-button>
        </span>
      </el-dialog>
      <el-dialog title="供应商详情"
                 :visible.sync="viewVisible"
                 width="60%">
        <el-form :model="viewForm"
                 label-width="100px"
                 ref="viewForm">
          <el-row>
            <el-col :span="24">
              <el-form-item label="Id"
                            class="item">{{viewForm.id}}</el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="供应商名称"
                            class="item">
                <span>{{viewForm.supplierName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="联系人1"
                            class="item">
                <span>{{viewForm.contactPerson1}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="电话1"
                            class="item">
                <span>{{viewForm.phone1}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="联系人2"
                            class="item">
                <span>{{viewForm.contactPerson2}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="电话2"
                            class="item">
                <span>{{viewForm.phone2}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="地址"
                            class="item">
                <span>{{viewForm.address}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="店铺链接1"
                            class="item">
                <span>{{viewForm.link1}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="店铺链接2"
                            class="item">
                <span>{{viewForm.link2}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="店铺链接3"
                            class="item">
                <span>{{viewForm.link3}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="店铺链接4"
                            class="item">
                <span>{{viewForm.link4}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="店铺链接5"
                            class="item">
                <span>{{viewForm.link5}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="店铺链接6"
                            class="item">
                <span>{{viewForm.link6}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="账期"
                            class="item">
                <span>{{viewForm.paymentDays}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="付款渠道"
                            class="item">
                <span>{{viewForm.payChannel}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="线下采购"
                            class="item">
                <span>{{viewForm.purchaser}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="添加时间"
                            class="item">
                <span>{{viewForm.createTime}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="更新时间"
                            class="item">
                <span>{{viewForm.updateTime}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
      <el-table :data="tableData" class="elTablee" style="width: 98%;margin-left: 1%">
        <el-table-column type="index"
                         fixed
                         width="50"></el-table-column>
        <el-table-column label="操作"
                         fixed
                         header-align="center"
                         width="71">
          <template slot-scope="scope">
            <el-tooltip content="查看">
              <i class="el-icon-view"
                 @click="view(scope.$index, scope.row)"></i>
            </el-tooltip>
            <el-tooltip content="更新">
              <i @click="Edit(scope.$index, scope.row)"
                 class="el-icon-edit"></i>
            </el-tooltip>
            <el-tooltip content="删除">
              <i @click="del(scope.$index, scope.row)"
                 class="el-icon-delete"></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="线下采购"
                         header-align="center">
          <el-table-column prop="purchaser"
                           :render-header="renderHeader"
                           align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column label="供应商名称"
                         header-align="center">
          <el-table-column prop="supplierName"
                           :render-header="renderHeader"
                           align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column label="联系人1"
                         header-align="center">
          <el-table-column prop="contactPerson1"
                           :render-header="renderHeader"
                           align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column label="电话1"
                         header-align="center">
          <el-table-column prop="phone1"
                           :render-header="renderHeader"
                           align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column label="联系人2"
                         header-align="center">
          <el-table-column prop="contactPerson2"
                           :render-header="renderHeader"
                           align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column label="电话2"
                         header-align="center">
          <el-table-column prop="phone2"
                           :render-header="renderHeader"
                           align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column label="账期"
                         header-align="center">
          <el-table-column prop="paymentDays"
                           :render-header="renderHeader"
                           align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column label="付款渠道"
                         header-align="center">
          <el-table-column prop="payChannel"
                           :render-header="renderHeader"
                           align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column label="地址"
                         header-align="center">
          <el-table-column prop="address"
                           :render-header="renderHeader"
                           align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column label="店铺链接1"
                         header-align="center">
          <el-table-column prop="link1"
                           :render-header="renderHeader"
                           align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column label="店铺链接2"
                         header-align="center">
          <el-table-column prop="link2"
                           :render-header="renderHeader"
                           align="center">
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-pagination class="toolbar"
                     background
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="condition.page"
                     :page-sizes="[20, 30, 40, 50]"
                     :page-size="condition.pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="this.total">
      </el-pagination>
    </div>
    <div v-show="show.product">
      <supplier-product></supplier-product>
    </div>
    <div v-show="show.payment">
      <payment-detailed></payment-detailed>
    </div>
    <div v-show="show.order">
      <ordermanage></ordermanage>
    </div>
  </section>
</template>
<script type="text/ecmascript-6">
import { getMenu } from '../../api/login'
import SupplierProduct from './supplierProduct.vue'
import PaymentDetailed from './paymentDetailed.vue'
import ordermanage from './ordermanage.vue'
import {
  APISupplierList,
  APICreateSupplier,
  APIDetail,
  APIDelete,
  APIUpdateSupplier,
  APIPySupplierList
} from '../../api/product'
export default {
  components: {
    SupplierProduct,
    PaymentDetailed,
    ordermanage:ordermanage
  },
  data() {
    return {
      loading: false,
      addVisible: false,
      editVisible: false,
      viewVisible: false,
      total: null,
      activeName: '供应商管理',
      options4: [],
      allMenu: [],
      tableData: [],
      addForm: {},
      editForm: {},
      viewForm: {},
      show: {
        management: true,
        product: false,
        order: false,
        payment: false
      },
      condition: {
        purchaser: null,
        supplierName: null,
        contactPerson1: null,
        phone1: null,
        contactPerson2: null,
        phone2: null,
        paymentDays: null,
        payChannel: null,
        address: null,
        link1: null,
        link2: null,
        page: 1,
        pageSize: 20
      }
    }
  },
  methods: {
    //远程搜索
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          let data = {}
          data.q = query
          APIPySupplierList(data).then(res => {
            this.loading = false
            this.options4 = res.data.data.results
          })
        }, 200)
      } else {
        this.options4 = []
      }
    },
    handleClick(tab, event) {
      if (tab.label === '供应商管理') {
        this.show['management'] = true
      } else {
        this.show['management'] = false
      }
      if (tab.label === '供应商产品管理') {
        this.show['product'] = true
        // this.getPic()
      } else {
        this.show['product'] = false
      }
      if (tab.label === '供应商订单管理') {
        this.show['order'] = true
        // this.getPlat()
      } else {
        this.show['order'] = false
      }
      if (tab.label === '付款明细') {
         this.show['payment'] = true
      } else {
        this.show['payment'] = false
      }
    },
    //分页
    handleCurrentChange(val) {
      this.condition.page = val
      this.getData()
    },
    handleSizeChange(val) {
      this.condition.pageSize = val
      this.getData()
    },
    //添加
    add(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          APICreateSupplier(this.addForm).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.addVisible = false
              this.getData()
            } else {
              this.$message.error('添加失败')
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    //查看
    view(index, row) {
      this.viewVisible = true
      let data = {}
      data.id = row.id
      APIDetail(data).then(res => {
        this.viewForm = res.data.data
      })
    },
    //更新
    Edit(index, row) {
      this.editVisible = true
      this.editForm = Object.assign({}, row)
    },
    edit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          APIUpdateSupplier(this.editForm).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '编辑成功',
                type: 'success'
              })
              this.editVisible = false
              this.getData()
            } else {
              this.$message.error('编辑失败')
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    //删除
    del(index, row) {
      let data = {}
      data.id = row.id
      APIDelete(data).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getData()
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    getData() {
      APISupplierList(this.condition).then(res => {
        this.tableData = res.data.data.items
        this.condition.page = res.data.data._meta.currentPage
        this.condition.pageSize = res.data.data._meta.perPage
        this.total = res.data.data._meta.totalCount
      })
    },
    renderHeader(h, { column, $index }) {
      if ($index === 0) {
        return h(
          'div',
          {
            style: {
              height: '40px'
            }
          },
          [
            h('el-input', {
              props: {
                value: this.condition.purchaser,
                size: 'mini',
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.purchaser = value
                  this.$emit('input', value)
                },
                change: value => {
                  this.getData()
                }
              }
            })
          ]
        )
      } else if ($index === 1) {
        return h(
          'div',
          {
            style: {
              height: '40px'
            }
          },
          [
            h('el-input', {
              props: {
                value: this.condition.supplierName,
                size: 'mini',
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.supplierName = value
                  this.$emit('input', value)
                },
                change: value => {
                  this.getData()
                }
              }
            })
          ]
        )
      } else if ($index === 2) {
        return h(
          'div',
          {
            style: {
              height: '40px'
            }
          },
          [
            h('el-input', {
              props: {
                value: this.condition.contactPerson1,
                size: 'mini',
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.contactPerson1 = value
                  this.$emit('input', value)
                },
                change: value => {
                  this.getData()
                }
              }
            })
          ]
        )
      } else if ($index === 3) {
        return h(
          'div',
          {
            style: {
              height: '40px'
            }
          },
          [
            h('el-input', {
              props: {
                value: this.condition.phone1,
                size: 'mini',
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.phone1 = value
                  this.$emit('input', value)
                },
                change: value => {
                  this.getData()
                }
              }
            })
          ]
        )
      } else if ($index === 4) {
        return h(
          'div',
          {
            style: {
              height: '40px'
            }
          },
          [
            h('el-input', {
              props: {
                value: this.condition.contactPerson2,
                size: 'mini',
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.contactPerson2 = value
                  this.$emit('input', value)
                },
                change: value => {
                  this.getData()
                }
              }
            })
          ]
        )
      } else if ($index === 5) {
        return h(
          'div',
          {
            style: {
              height: '40px'
            }
          },
          [
            h('el-input', {
              props: {
                value: this.condition.phone2,
                size: 'mini',
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.phone2 = value
                  this.$emit('input', value)
                },
                change: value => {
                  this.getData()
                }
              }
            })
          ]
        )
      } else if ($index === 6) {
        return h(
          'div',
          {
            style: {
              height: '40px'
            }
          },
          [
            h('el-input', {
              props: {
                value: this.condition.paymentDays,
                size: 'mini',
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.paymentDays = value
                  this.$emit('input', value)
                },
                change: value => {
                  this.getData()
                }
              }
            })
          ]
        )
      } else if ($index === 7) {
        return h(
          'div',
          {
            style: {
              height: '40px'
            }
          },
          [
            h('el-input', {
              props: {
                value: this.condition.payChannel,
                size: 'mini',
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.payChannel = value
                  this.$emit('input', value)
                },
                change: value => {
                  this.getData()
                }
              }
            })
          ]
        )
      } else if ($index === 8) {
        return h(
          'div',
          {
            style: {
              height: '40px'
            }
          },
          [
            h('el-input', {
              props: {
                value: this.condition.address,
                size: 'mini',
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.address = value
                  this.$emit('input', value)
                },
                change: value => {
                  this.getData()
                }
              }
            })
          ]
        )
      } else if ($index === 9) {
        return h(
          'div',
          {
            style: {
              height: '40px'
            }
          },
          [
            h('el-input', {
              props: {
                value: this.condition.link1,
                size: 'mini',
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.link1 = value
                  this.$emit('input', value)
                },
                change: value => {
                  this.getData()
                }
              }
            })
          ]
        )
      } else if ($index === 10) {
        return h(
          'div',
          {
            style: {
              height: '40px'
            }
          },
          [
            h('el-input', {
              props: {
                value: this.condition.link2,
                size: 'mini',
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.link2 = value
                  this.$emit('input', value)
                },
                change: value => {
                  this.getData()
                }
              }
            })
          ]
        )
      }
    }
  },
  mounted() {
    getMenu().then(response => {
      const res = response.data.data
      const menu = res.filter(e => e.name === '产品中心')
      this.allMenu = menu[0].children[3].tabs
    })
    this.getData()
  }
}
</script>
<style lang="scss" scoped>
i {
  color: #409eff;
  cursor: pointer;
}
</style>
<style>
.item .el-form-item__label {
  color: #99a9bf;
  margin-right: 1%;
}
</style>

