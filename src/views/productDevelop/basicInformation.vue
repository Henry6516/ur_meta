<template>
    <section>
        <el-tabs v-model="activeName"
                 type="card"
                 @tab-click="handleClick" class="toolbar">
            <el-tab-pane v-for="(item, index) in this.allMenu"
                         :label="item.name"
                         :name="item.name"
                         :key="index">
            </el-tab-pane>
        </el-tabs>
        <div v-show="show.wish">
            <el-row class="contentt">
                <el-col :span="24">
                  <el-button type="primary" @click="addWish()"><i class="el-icon-plus"></i>添加Wish账号</el-button>
                </el-col>
                <!-- <el-col :span="24" class="cTop">
                    <el-col :span="8">
                        <p class="basp">卖家账号</p>
                        <el-col :span="19">
                            <el-input v-model="account"></el-input>
                        </el-col>
                    </el-col>
                    <el-col :span="8">
                        <p class="basp">运费比列</p>
                        <el-col :span="19">
                            <el-input v-model="freight"></el-input>
                        </el-col>
                    </el-col>
                    <el-col :span="8">
                        <p class="basp">主图名称</p>
                        <el-col :span="19">
                            <el-input v-model="masterGraph"></el-input>
                        </el-col>
                    </el-col>
                </el-col>
                <el-col :span="24" class="cTop">
                    <el-col :span="8">
                        <p class="basp">简称</p>
                        <el-col :span="19">
                            <el-input v-model="abbreviation"></el-input>
                        </el-col>
                    </el-col>
                    <el-col :span="8">
                        <p class="basp">后缀</p>
                        <el-col :span="19">
                            <el-input v-model="Suffix"></el-input>
                        </el-col>
                    </el-col>
                </el-col>
                <el-col :span="24" class="top20">
                    <el-button type="primary" @click="addDate()"><i class="el-icon-plus"></i>新增Add</el-button>
                </el-col> -->
            </el-row>
            <el-row class="content1">
                <el-col :span="24" class="font14">
                    第1-20条，共{{totalWish}}条数据.
                </el-col>
                <el-col :span="23" style="margin-top: 20px">
                    <el-table :data="date"
                              border
                              class="elTable"
                              style="width: 100%">
                        <el-table-column type="index"
                                         fixed
                                         align="center"
                                         width="80"
                                         header-align="center">
                        </el-table-column>
                        <el-table-column label="操作"
                                         fixed
                                         header-align="center"
                                         width="80">
                            <template slot-scope="scope">
                                <el-tooltip content="查看">
                                    <i class="el-icon-view"
                                       @click="viewWish(scope.$index, scope.row)"
                                       style="color: #409EFF;cursor:pointer;"></i>
                                </el-tooltip>
                                <el-tooltip content="更新">
                                    <i @click="editWish(scope.$index, scope.row)"
                                       class="el-icon-edit"
                                       style="color: #409EFF;cursor:pointer;"></i>
                                </el-tooltip>
                                <el-tooltip content="删除">
                                    <i class="el-icon-delete"
                                       style="color: #409EFF;cursor:pointer;" @click="delWish(scope.$index, scope.row)"></i>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column label="卖家账号"
                                         header-align="center">
                            <el-table-column prop="ibaySuffix"
                                             :render-header="renderHeaderPic"
                                             align="center">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="简称"
                                         header-align="center">
                            <el-table-column prop="shortName"
                                             :render-header="renderHeaderPic"
                                             align="center">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="后缀"
                                         header-align="center">
                            <el-table-column prop="suffix"
                                             :render-header="renderHeaderPic"
                                             align="center">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="运费比例"
                                         header-align="center">
                            <el-table-column prop="rate"
                                             :render-header="renderHeaderPic"
                                             align="center">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="主图名称"
                                         header-align="center">
                            <el-table-column prop="mainImg"
                                             :render-header="renderHeaderPic"
                                             align="center">
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="condition.page"
                    :page-size="condition.pageSize"
                    :total="this.totalWish"
                    background
                    layout="prev, pager, next" style="margin: 20px 0;margin-left: 10px">
            </el-pagination>
            <el-dialog title="Wish账号详情" :visible.sync="dialogPicture">
               <el-row>
                    <table style="width: 100%;margin: auto;border-collapse:collapse;">
                        <thead style="background: #409EFF;border:#409EFF solid 1px ">
                        <th width="20%" style="text-align: center;color: #fff;font-weight: normal;line-height: 45px;border-right: #d4d4d4 solid 1px">Nid</th>
                        <th width="20%" style="text-align: center;color: #fff;font-weight: normal;line-height: 45px;border-right: #d4d4d4 solid 1px">卖家账号</th>
                        <th width="20%" style="text-align: center;color: #fff;font-weight: normal;line-height: 45px;border-right: #d4d4d4 solid 1px">后缀</th>
                        <th width="20%" style="text-align: center;color: #fff;font-weight: normal;line-height: 45px;border-right: #d4d4d4 solid 1px">运费比例</th>
                        <th width="20%" style="text-align: center;color: #fff;font-weight: normal;line-height: 45px">主图名称</th>
                        </thead>
                        <tbody>
                        <tr>
                            <td width="20%" style="text-align: center;font-weight: normal;line-height: 45px;border: #d4d4d4 solid 1px">{{delistWish.id}}</td>
                            <td width="20%" style="text-align: center;font-weight: normal;line-height: 45px;border: #d4d4d4 solid 1px">{{delistWish.ibaySuffix}}</td>
                            <td width="20%" style="text-align: center;font-weight: normal;line-height: 45px;border: #d4d4d4 solid 1px">{{delistWish.suffix}}</td>
                            <td width="20%" style="text-align: center;font-weight: normal;line-height: 45px;border: #d4d4d4 solid 1px">{{delistWish.rate}}</td>
                            <td width="20%" style="text-align: center;font-weight: normal;line-height: 45px;border: #d4d4d4 solid 1px">{{delistWish.mainImg}}</td>
                        </tr>
                        </tbody>
                    </table>
               </el-row>
            </el-dialog>
            <el-dialog title="编辑Wish字典" :visible.sync="dialogPictureBj">
                <el-row class="contentt" style="margin-top: 0">
                    <el-col :span="24" style="margin-bottom: 20px;font-size: 16px;color: #66b1ff">
                        Update Wish Suffix Dictionary: {{contenWish.id}}
                    </el-col>
                    <el-col :span="24" class="cTop">
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="2">
                                <p class="basp">卖家账号</p>
                            </el-col>
                            <el-col :span="21">
                                <el-input v-model="contenWish.ibaySuffix"></el-input>
                            </el-col>
                        </el-col>
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="2">
                            <p class="basp">运费比列</p>
                            </el-col>
                            <el-col :span="21">
                                <el-input v-model="contenWish.rate"></el-input>
                            </el-col>
                        </el-col>
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="2">
                            <p class="basp">主图名称</p>
                            </el-col>
                            <el-col :span="21">
                                <el-input v-model="contenWish.mainImg"></el-input>
                            </el-col>
                        </el-col>
                    </el-col>
                    <el-col :span="24" class="cTop">
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="2">
                            <p class="basp" style="margin-left: 15px">简称</p>
                            </el-col>
                            <el-col :span="21">
                                <el-input v-model="contenWish.shortName"></el-input>
                            </el-col>
                        </el-col>
                        <el-col :span="24">
                            <el-col :span="2">
                            <p class="basp" style="margin-left: 15px">后缀</p>
                        </el-col>
                            <el-col :span="21">
                                <el-input v-model="contenWish.suffix"></el-input>
                            </el-col>
                        </el-col>
                    </el-col>
                </el-row>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogPictureBj = false">取 消</el-button>
                    <el-button type="primary" @click="saveWish">保 存</el-button>
                </div>
            </el-dialog>
             <el-dialog title="添加Wish账号" :visible.sync="dialogPictureWish">
                <el-row class="contentt" style="margin-top: 0">
                    <el-col :span="24" class="cTop">
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp">卖家账号</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input v-model="account"></el-input>
                            </el-col>
                        </el-col>
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp">简称</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input v-model="abbreviation"></el-input>
                            </el-col>
                        </el-col>
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp">后缀</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input v-model="Suffix"></el-input>
                            </el-col>
                        </el-col>
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp">运费比例</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input v-model="freight"></el-input>
                            </el-col>
                        </el-col>
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp">主图名称</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input v-model="masterGraph"></el-input>
                            </el-col>
                        </el-col>
                    </el-col>
                </el-row>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogPictureWish = false">取 消</el-button>
                    <el-button type="primary" @click="addDate()">添 加</el-button>
                </div>
            </el-dialog>
        </div>
        <div v-show="show.ebay">
            <basicInformationeBay></basicInformationeBay>
        </div>
        <div v-show="show.joom">
            <basicInformationJoom></basicInformationJoom>
        </div>
        <div v-show="show.ys">
            <basicInformationJoomYs></basicInformationJoomYs>
        </div>
        <div v-show="show.jw">
            <basicInformationJw></basicInformationJw>
        </div>
        <div v-show="show.kf">
            <basicInformationArt></basicInformationArt>
        </div>
        <div v-show="show.pay">
            <basicInformationPay></basicInformationPay>
        </div>
    </section>
</template>

<script type="text/ecmascript-6">
    import { APIWishSuffix, APICreateWish, APIDeleteWish, APIWishInfo, APIUpdateWish } from '../../api/product'
    import { getMenu } from '../../api/login'
    import basicInformationArt from './basicInformationArt.vue'
    import basicInformationeBay from './basicInformationeBay.vue'
    import basicInformationJoom from './basicInformationJoom.vue'
    import basicInformationJoomYs from './basicInformationJoomYs.vue'
    import basicInformationJw from './basicInformationJw.vue'
    import basicInformationPay from './basicInformationPay.vue'
    export default {
        components: {
            basicInformationArt:basicInformationArt,
            basicInformationeBay:basicInformationeBay,
            basicInformationJoom:basicInformationJoom,
            basicInformationJoomYs:basicInformationJoomYs,
            basicInformationJw:basicInformationJw,
            basicInformationPay:basicInformationPay
        },
      data() {
        return {
          allMenu: [],
          activeName: 'Wish账号字典',
          date: [],
          totalWish: 0,
          dialogPicture: false,
          dialogPictureBj: false,
          dialogPictureWish:false,
          account: null,
          freight: null,
          delistWish: [],
          masterGraph: null,
          abbreviation: null,
            show: {
                wish: true,
                ebay: false,
                joom: false,
                ys: false,
                jw: false,
                kf: false,
                pay:false
            },
          Suffix: null,
          contenWish: [],
          condition: {
            'ibaySuffix': null,
            'shortName': null,
            'suffix': null,
            'mainImg': null,
            'parentCategory': null,
            'pageSize': 20,
            'page': 1
          }
        }
      },
      methods: {
          addWish(){
             this.dialogPictureWish = true
          },
          handleClick(tab, event) {
              if (tab.label === 'Wish账号字典') {
                  this.show['wish'] = true
              } else {
                  this.show['wish'] = false
              }
              if (tab.label === 'eBay账号字典') {
                  this.show['ebay'] = true
              } else {
                  this.show['ebay'] = false
              }
              if (tab.label === 'Joom账号字典') {
                  this.show['joom'] = true
              } else {
                  this.show['joom'] = false
              }
              if (tab.label === 'payPal账号字典') {
                  this.show['pay'] = true
              } else {
                  this.show['pay'] = false
              }
              if (tab.label === 'eBay运输方式') {
                  this.show['ys'] = true
              } else {
                  this.show['ys'] = false
              }
              if (tab.label === 'Joom对比Wish价格') {
                  this.show['jw'] = true
              } else {
                  this.show['jw'] = false
              } if (tab.label === '开发采购美工对应关系') {
                  this.show['kf'] = true
              } else {
                  this.show['kf'] = false
              }

          },
        saveWish() {
          APIUpdateWish(this.contenWish).then(res => {
            if (res.data.data) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.dialogPictureBj = false
              this.getDateWish()
            }
          })
        },
        editWish(index, row) {
          this.dialogPictureBj = true
          const conId = {
            id: row.id
          }
          APIWishInfo(conId).then(res => {
            if (res.data.message == 'success') {
              this.contenWish = res.data.data
            }
          })
        },
        delWish(index, row) {
          this.$confirm('确定删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              const conId = {
                id: row.id
              }
              APIDeleteWish(conId).then(res => {
                if (res.data.message == 'success') {
                  this.$message({
                    message: '删除成功',
                    type: 'success'
                  })
                  this.getDateWish()
                }
              })
            })
            .catch(() => {})
        },
        addDate() {
          if (this.account) {
            var condate = {
              'ibaySuffix': this.account,
              'shortName': this.abbreviation,
              'suffix': this.Suffix,
              'mainImg': this.masterGraph,
              'parentCategory': null,
              'rate': this.freight
            }
            APICreateWish(condate).then(res => {
              if (res.data.code==200) {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
                this.condition.page = 1
                this.condition.ibaySuffix = null
                this.condition.shortName = null
                this.condition.suffix = null
                this.condition.mainImg = null
                this.condition.parentCategory = null
                this.condition.pageSize = 20
                this.dialogPictureWish = false
                this.getDateWish()
              }else{
                this.$message.error(res.data.message)
              }
            })
          } else {
            this.$message.error('卖家名称不能为空')
          }
        },
        viewWish(index, row) {
          const conId = {
            id: row.id
          }
          this.dialogPicture = true
          APIWishInfo(conId).then(res => {
            if (res.data.message == 'success') {
              this.delistWish = res.data.data
            }
          })
        },

        handleSizeChange(val) {
          this.condition.pageSize = val
          this.getDateWish()
        },
        handleCurrentChange(val) {
          this.condition.page = val
          this.getDateWish()
        },
        renderHeaderPic(h, { column, $index }) {
          if ($index === 0) {
            return h(
              'div',
              {
                style: {
                  height: '30px'
                }
              },
              [
                h('el-input', {
                  props: {
                    value: this.condition.ibaySuffix,
                    size: 'mini',
                    clearable: true
                  },
                  on: {
                    input: value => {
                      this.condition.ibaySuffix = value
                      this.$emit('input', value)
                    },
                    change: value => {
                      this.getDateWish()
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
                  height: '30px'
                }
              },
              [
                h('el-input', {
                  props: {
                    value: this.condition.shortName,
                    size: 'mini',
                    clearable: true
                  },
                  on: {
                    input: value => {
                      this.condition.shortName = value
                      this.$emit('input', value)
                    },
                    change: value => {
                      this.getDateWish()
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
                  height: '30px'
                }
              },
              [
                h('el-input', {
                  props: {
                    value: this.condition.suffix,
                    size: 'mini',
                    clearable: true
                  },
                  on: {
                    input: value => {
                      this.condition.suffix = value
                      this.$emit('input', value)
                    },
                    change: value => {
                      this.getDateWish()
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
                  height: '30px'
                }
              },
              [
                h('el-input', {
                  props: {
                    value: this.condition.rate,
                    size: 'mini',
                    clearable: true
                  },
                  on: {
                    input: value => {
                      this.condition.rate = value
                      this.$emit('input', value)
                    },
                    change: value => {
                      this.getDateWish()
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
                  height: '30px'
                }
              },
              [
                h('el-input', {
                  props: {
                    value: this.condition.mainImg,
                    size: 'mini',
                    clearable: true
                  },
                  on: {
                    input: value => {
                      this.condition.mainImg = value
                      this.$emit('input', value)
                    },
                    change: value => {
                      this.getDateWish()
                    }
                  }
                })
              ]
            )
          }
        },
//        handleClick(tab, event) {
//          if (tab.label === 'Wish账号字典') {
//
//          }
//          if (tab.label === 'eBay账号字典') {
//            this.$router.push({
//              path: '/v1/basic-info/ebay'
//            })
//          }
//          if (tab.label === 'Joom账号字典') {
//            this.$router.push({
//              path: '/v1/basic-info/joom'
//            })
//          }
//          if (tab.label === 'eBay运输方式') {
//            this.$router.push({
//              path: '/v1/basic-info/ys'
//            })
//          }
//          if (tab.label === 'Joom对比Wish价格') {
//            this.$router.push({
//              path: '/v1/basic-info/jw'
//            })
//          }
//          if (tab.label === '开发采购美工对应关系') {
//            this.$router.push({
//              path: '/v1/basic-info/art'
//            })
//          }
//        },
        getDateWish() {
          APIWishSuffix(this.condition).then(res => {
            this.date = res.data.data.items
            this.totalWish = res.data.data._meta.totalCount
            this.condition.pageSize = res.data.data._meta.perPage
            this.condition.page = res.data.data._meta.currentPage
          })
        }
      },
      mounted() {
        getMenu().then(response => {
          const res = response.data.data
          const menu = res.filter(e => e.name === '产品中心')
          const arr = menu[0].children
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].name == '基本信息') {
              this.allMenu = arr[i].tabs
            }
          }
        })
        this.getDateWish()
      }
    }
</script>

<style lang="scss">
    .contentt{
        margin-left: 20px;
        margin-top: 15px;
    }
    .content1{
        margin-left: 20px;
        margin-top: 20px;
    }
    .basp{
        padding: 0;
        margin: 0;
        line-height: 40px;
    }
    .cTop{
        margin-top: 0px;
    }
    .baspj{
        text-align: center;
    }
    .top20{
        margin-top: 25px;
    }
    .font14{
        font-size: 14px;
    }
    .elTable td{
        padding: 16px 0 !important;
    }
</style>
