<template>
  <section>
    <el-button type="primary"
               @click="addVisible = true"
               style="margin:10px;">创建产品</el-button>
    <el-dialog title="创建产品"
               :visible.sync="addVisible"
               width="60%">
      <el-form :model="addForm"
               label-width="100px;">
        <el-row>
          <el-col :span="24">
            <el-form-item label="供应商名称">
              <el-select v-model="addForm.supplier"
                         filterable
                         style="width:100%;">
                <el-option v-for="item in options"
                           :key="item.id"
                           :label="item.text"
                           :value="item.text">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="线下采购员">
              <el-input v-model="addForm.purchaser"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="商品编码">
              <el-input v-model="addForm.goodsCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="商品名称">
              <el-input v-model="addForm.goodsName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="供应商商品编码">
              <el-input v-model="addForm.supplierGoodsCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="add">创 建</el-button>
      </span>
    </el-dialog>
    <el-dialog title="产品详情"
               :visible.sync="viewVisible"
               width="80%">
      <el-table :data="viewTableData">
        <el-table-column type="index"
                         width="30"></el-table-column>
        <el-table-column type="selection"
                         width="40"></el-table-column>
        <el-table-column label="操作"
                         width="50">
          <template slot-scope="scope">
            <el-tooltip content="删除">
              <i @click="viewDel(scope.$index, scope.row)"
                 class="el-icon-delete"></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="SKU"
                         prop="sku">
          <template slot-scope="scope">
            <el-input v-model="scope.row.sku"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="款式1"
                         prop="property1">
          <template slot-scope="scope">
            <el-input v-model="scope.row.property1"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="款式2"
                         prop="property2">
          <template slot-scope="scope">
            <el-input v-model="scope.row.property2"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="款式3"
                         prop="property3">
          <template slot-scope="scope">
            <el-input v-model="scope.row.property3"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="成本价"
                         prop="costPrice">
          <template slot-scope="scope">
            <el-input v-model="scope.row.costPrice"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="采购价"
                         prop="purchasePrice">
          <template slot-scope="scope">
            <el-input v-model="scope.row.purchasePrice"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="重量"
                         prop="weight">
          <template slot-scope="scope">
            <el-input v-model="scope.row.weight"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="图片"
                         prop="image">
          <template slot-scope="scope">
            <img :src="scope.row.image"
                 style="width:50px;height:50px;">
          </template>
        </el-table-column>
        <el-table-column label="近三个月最低采购价"
                         prop="lowestPrice">
          <template slot-scope="scope">
            <el-input v-model="scope.row.lowestPrice"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="最低价采购数量"
                         prop="purchaseNumber">
          <template slot-scope="scope">
            <el-input v-model="scope.row.purchaseNumber"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="供应商产品SKU"
                         prop="supplierGoodsSku">
          <template slot-scope="scope">
            <el-input v-model="scope.row.supplierGoodsSku"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="addClomun">+增加行</el-button>
        <el-button type="primary"
                   @click="save">保 存</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑产品"
               :visible.sync="editVisible"
               width="60%">
      <el-form :model="editForm"
               label-width="100px;">
        <el-row>
          <el-col :span="24">
            <el-form-item label="供应商名称">
              <el-select v-model="editForm.supplier"
                         filterable
                         style="width:100%;">
                <el-option v-for="item in options"
                           :key="item.id"
                           :label="item.text"
                           :value="item.text">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="线下采购员">
              <el-input v-model="editForm.purchaser"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="商品编码">
              <el-input v-model="editForm.goodsCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="商品名称">
              <el-input v-model="editForm.goodsName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="供应商商品编码">
              <el-input v-model="editForm.supplierGoodsCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="edit">更 新</el-button>
      </span>
    </el-dialog>
    <el-table :data="tableData" class="elTablee" style="width: 98%;margin-left: 1%">
      <el-table-column type="index"
                       width="50"></el-table-column>
      <el-table-column label="操作"
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
      <el-table-column label="供应商名称"
                       header-align="center">
        <el-table-column prop="supplier"
                         :render-header="renderHeader"
                         align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="线下采购员"
                       header-align="center">
        <el-table-column prop="purchaser"
                         :render-header="renderHeader"
                         align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="商品编码"
                       header-align="center">
        <el-table-column prop="goodsCode"
                         :render-header="renderHeader"
                         align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="商品名称"
                       header-align="center">
        <el-table-column prop="goodsName"
                         :render-header="renderHeader"
                         align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="供应商商品编码"
                       header-align="center">
        <el-table-column prop="supplierGoodsCode"
                         :render-header="renderHeader"
                         align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="创建时间"
                       header-align="center">
        <el-table-column prop="createdTime"
                         :render-header="renderHeader"
                         align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="更新时间"
                       header-align="center">
        <el-table-column prop="updatedTime"
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
  </section>
</template>
<script>
import {
  APISupplierGoodsList,
  APICreateGoods,
  APIUpdateGoods,
  APIGoodsAttribute,
  APIGoodsDelelte,
  APISupplierList,
  APIDeleteSku,
  APISupplier
} from '../../api/product'
export default {
  data() {
    return {
      loading: false,
      total: null,
      addVisible: false,
      viewVisible: false,
      editVisible: false,
      addForm: {},
      editForm: {},
      options: [],
      tableData: [],
      viewTableData: [],
      condition: {
        purchaser: null,
        supplier: null,
        goodsName: null,
        goodsCode: null,
        supplierGoodsCode: null,
        page: 1,
        pageSize: 20
      }
    }
  },
  methods: {
    //分页
    handleCurrentChange(val) {
      this.condition.page = val
      this.getData()
    },
    handleSizeChange(val) {
      this.condition.pageSize = val
      this.getData()
    },
    //创建
    add() {
      APICreateGoods(this.addForm).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '创建成功',
            type: 'success'
          })
          this.addVisible = false
          this.getData()
        } else {
          this.$message.error('创建失败')
        }
      })
    },
    //查看
    view(index, row) {
      this.viewVisible = true
      let data = {}
      data.id = 2
      APIGoodsAttribute(data).then(res => {
        this.viewTableData = res.data.data.items
      })
    },
    //增加行
    addClomun() {
      let data = {
        id: null,
        supplierGoodsId: null,
        sku: '',
        property1: '',
        property2: '',
        property3: '',
        costPrice: '',
        purchasePrice: '',
        weight: '',
        image: '',
        lowestPrice: '',
        purchaseNumber: null,
        supplierGoodsSku: ''
      }
      this.viewTableData.push(data)
    },
    save() {},
    //更新
    Edit(index, row) {
      this.editVisible = true
      this.editForm = Object.assign({}, row)
    },
    edit() {
      APIUpdateGoods(this.editForm).then(res => {
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
    },
    //删除
    del(index, row) {
      let data = {}
      data.id = row.id
      APIGoodsDelelte(data).then(res => {
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
    viewDel(index, row) {
      if (row.id !== null) {
        APIDeleteSku(row.id).then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.viewTableData.splice(index, 1)
          } else {
            this.$message.error('删除失败')
          }
        })
      } else {
        this.viewTableData.splice(index, 1)
      }
    },
    getList() {
      APISupplier().then(res => {})
    },
    getData() {
      APISupplierGoodsList(this.condition).then(res => {
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
                value: this.condition.supplier,
                size: 'mini',
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.supplier = value
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
                value: this.condition.goodsCode,
                size: 'mini',
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.goodsCode = value
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
                value: this.condition.goodsName,
                size: 'mini',
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.goodsName = value
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
                value: this.condition.supplierGoodsCode,
                size: 'mini',
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.supplierGoodsCode = value
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
                value: this.condition.createdTime,
                size: 'mini',
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.createdTime = value
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
                value: this.condition.updatedTime,
                size: 'mini',
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.updatedTime = value
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