<template>
  <section>
    <div>
      <el-row class="contentt">
        <el-col :span="24">
          <el-button type="primary" @click="addJoomEbay()">
            <i class="el-icon-plus"></i>添加eBay账号
          </el-button>
        </el-col>
      </el-row>
      <el-row class="content1">
        <el-col :span="24" class="font14">第1-20条，共{{totalEbay}}条数据.</el-col>
        <el-col :span="24" style="margin-top: 20px">
          <el-table :data="dateEbay" border class="elTable" style="width: 98%;" :height="tableHeight">
            <el-table-column type="index" fixed align="center" width="80" header-align="center"></el-table-column>
            <el-table-column label="操作" fixed header-align="center" width="80">
              <template slot-scope="scope">
                <el-tooltip content="查看">
                  <i
                    class="el-icon-view"
                    @click="viewPicEbay(scope.$index, scope.row)"
                    style="color: #409EFF;cursor:pointer;"
                  ></i>
                </el-tooltip>
                <el-tooltip content="更新">
                  <i
                    @click="editEbay(scope.$index, scope.row)"
                    class="el-icon-edit"
                    style="color: #409EFF;cursor:pointer;"
                  ></i>
                </el-tooltip>
                <el-tooltip content="删除">
                  <i
                    class="el-icon-delete"
                    style="color: #409EFF;cursor:pointer;"
                    @click="delEbay(scope.$index, scope.row)"
                  ></i>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="eBay账号" header-align="center">
              <el-table-column prop="ebayName" :render-header="renderHeaderPicEbay" align="center" min-width="180"></el-table-column>
            </el-table-column>
            <el-table-column label="eBay账号简称" header-align="center">
              <el-table-column
                prop="ebaySuffix"
                :render-header="renderHeaderPicEbay"
                align="center"
                min-width="180"
              ></el-table-column>
            </el-table-column>
            <el-table-column label="仓储国家" header-align="center">
              <el-table-column
                prop="storeCountry"
                :render-header="renderHeaderPicEbay"
                align="center"
                min-width="180"
              ></el-table-column>
            </el-table-column>
            <el-table-column label="eBay编码" header-align="center">
              <el-table-column prop="nameCode" :render-header="renderHeaderPicEbay" align="center" min-width="180"></el-table-column>
            </el-table-column>
            <el-table-column label="主图" header-align="center">
              <el-table-column prop="mainImg" :render-header="renderHeaderPicEbay" align="center" min-width="180"></el-table-column>
            </el-table-column>
            <el-table-column label="刊登风格" header-align="center">
              <el-table-column
                prop="ibayTemplate"
                :render-header="renderHeaderPicEbay"
                align="center"
                min-width="180"
              ></el-table-column>
            </el-table-column>
            <el-table-column label="大额PayPal" header-align="center">
              <el-table-column prop="high" :render-header="renderHeaderPicEbay" align="center" min-width="195"></el-table-column>
            </el-table-column>
            <el-table-column label="小额PayPal" header-align="center">
              <el-table-column prop="low" :render-header="renderHeaderPicEbay" align="center" min-width="180"></el-table-column>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-pagination
        background
        @size-change="handleSizeChangeEbay"
        @current-change="handleCurrentChangeEbay"
        :current-page="conditionEbay.page"
        :page-size="conditionEbay.pageSize"
        :total="this.totalEbay"
        layout="prev, pager, next"
        style="margin: 20px 0;margin-left: 10px;margin-bottom:0"
      ></el-pagination>
      <el-dialog title="eBay账号详情" :visible.sync="dialogPictureEbay">
        <el-row class="contentt" style="margin-top: 0">
          <el-col :span="24" class="cTop">
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">eBay账号</p>
              </el-col>
              <el-col :span="20">
                <el-input :value="delistEbay.ebayName" :disabled="true"></el-input>
              </el-col>
            </el-col>
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">eBay账号简称</p>
              </el-col>
              <el-col :span="20">
                <el-input :value="delistEbay.ebaySuffix" :disabled="true"></el-input>
              </el-col>
            </el-col>
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">仓储国家</p>
              </el-col>
              <el-col :span="20">
                <el-input :value="delistEbay.storeCountry" :disabled="true"></el-input>
              </el-col>
            </el-col>
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">eBay编码</p>
              </el-col>
              <el-col :span="20">
                <el-input :value="delistEbay.nameCode" :disabled="true"></el-input>
              </el-col>
            </el-col>
            <el-col :span="24" class="cTop">
              <el-col :span="24" style="margin-bottom: 20px">
                <el-col :span="3">
                  <p class="basp" style="margin-left: 15px">主图</p>
                </el-col>
                <el-col :span="20">
                  <el-input :value="delistEbay.mainImg" :disabled="true"></el-input>
                </el-col>
              </el-col>
            </el-col>
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">刊登风格</p>
              </el-col>
              <el-col :span="20">
                <el-input :value="delistEbay.ibayTemplate" :disabled="true"></el-input>
              </el-col>
            </el-col>
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">大额PayPal</p>
              </el-col>
              <el-col :span="20">
                <el-input :value="delistEbay.high" :disabled="true"></el-input>
              </el-col>
            </el-col>
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">小额PayPal</p>
              </el-col>
              <el-col :span="20">
                <el-input :value="delistEbay.low" :disabled="true"></el-input>
              </el-col>
            </el-col>
          </el-col>
        </el-row>
      </el-dialog>
      <el-dialog title="添加eBay账号" :visible.sync="dialogPictureBjEbay">
        <el-row class="contentt" style="margin-top: 0">
          <el-col :span="24" class="cTop">
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">eBay账号</p>
              </el-col>
              <el-col :span="20">
                <el-input v-model="ebayAcount"></el-input>
              </el-col>
            </el-col>
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">eBay账号简称</p>
              </el-col>
              <el-col :span="20">
                <el-input v-model="ebayAcountJC"></el-input>
              </el-col>
            </el-col>
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">仓储国家</p>
              </el-col>
              <el-col :span="20">
                <el-input v-model="ccCountry"></el-input>
              </el-col>
            </el-col>
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">eBay编码</p>
              </el-col>
              <el-col :span="20">
                <el-input v-model="codeEbay"></el-input>
              </el-col>
            </el-col>
            <el-col :span="24" class="cTop">
              <el-col :span="24" style="margin-bottom: 20px">
                <el-col :span="3">
                  <p class="basp" style="margin-left: 15px">主图</p>
                </el-col>
                <el-col :span="20">
                  <el-input v-model="graph"></el-input>
                </el-col>
              </el-col>
            </el-col>
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">刊登风格</p>
              </el-col>
              <el-col :span="20">
                <el-input v-model="publish"></el-input>
              </el-col>
            </el-col>
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">大额PayPal</p>
              </el-col>
              <el-col :span="20">
                <el-select v-model="bigEbay" style="width: 100%" filterable clearable>
                  <el-option
                    v-for="(item,key) in highPrice"
                    :key="key"
                    :label="item.paypal"
                    :value="item.paypal"
                  ></el-option>
                </el-select>
                <!-- <el-input v-model="bigEbay"></el-input> -->
              </el-col>
            </el-col>
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">小额PayPal</p>
              </el-col>
              <el-col :span="20">
                <el-select v-model="smallEbay" style="width: 100%" filterable clearable>
                  <el-option
                    v-for="(item,key) in highPrice"
                    :key="key"
                    :label="item.paypal"
                    :value="item.paypal"
                  ></el-option>
                </el-select>
                <!-- <el-input v-model="smallEbay"></el-input> -->
              </el-col>
            </el-col>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogPictureBjEbay = false">取 消</el-button>
          <el-button type="primary" @click="addJoomTjEbay()">添 加</el-button>
        </div>
      </el-dialog>
      <el-dialog title="编辑eBay账号" :visible.sync="disLoginEbay">
        <el-row class="contentt" style="margin-top: 0">
          <el-col :span="24" class="cTop">
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">eBay账号</p>
              </el-col>
              <el-col :span="20">
                <el-input v-model="contenEbay.ebayName"></el-input>
              </el-col>
            </el-col>
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">eBay账号简称</p>
              </el-col>
              <el-col :span="20">
                <el-input v-model="contenEbay.ebaySuffix"></el-input>
              </el-col>
            </el-col>
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">仓储国家</p>
              </el-col>
              <el-col :span="20">
                <el-input v-model="contenEbay.storeCountry"></el-input>
              </el-col>
            </el-col>
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">eBay编码</p>
              </el-col>
              <el-col :span="20">
                <el-input v-model="contenEbay.nameCode"></el-input>
              </el-col>
            </el-col>
            <el-col :span="24" class="cTop">
              <el-col :span="24" style="margin-bottom: 20px">
                <el-col :span="3">
                  <p class="basp" style="margin-left: 15px">主图</p>
                </el-col>
                <el-col :span="20">
                  <el-input v-model="contenEbay.mainImg"></el-input>
                </el-col>
              </el-col>
            </el-col>
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">刊登风格</p>
              </el-col>
              <el-col :span="20">
                <el-input v-model="contenEbay.ibayTemplate"></el-input>
              </el-col>
            </el-col>
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">大额PayPal</p>
              </el-col>
              <el-col :span="20">
                <el-select v-model="contenEbay.high" style="width: 100%" filterable clearable>
                  <el-option
                    v-for="(item,key) in highPrice"
                    :key="key"
                    :label="item.paypal"
                    :value="item.paypal"
                  ></el-option>
                </el-select>
                <!-- <el-input v-model="contenEbay.high"></el-input> -->
              </el-col>
            </el-col>
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">小额PayPal</p>
              </el-col>
              <el-col :span="20">
                <el-select v-model="contenEbay.low" style="width: 100%" filterable clearable>
                  <el-option
                    v-for="(item,key) in highPrice"
                    :key="key"
                    :label="item.paypal"
                    :value="item.paypal"
                  ></el-option>
                </el-select>
                <!-- <el-input v-model="contenEbay.low"></el-input> -->
              </el-col>
            </el-col>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="disLoginEbay = false">取 消</el-button>
          <el-button type="primary" @click="saveEbay()">保 存</el-button>
        </div>
      </el-dialog>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
import {
  APIWishSuffix,
  APICreateWish,
  APIDeleteJoom,
  APIJoomSuffix,
  APICreateJoom,
  APIJoomInfo,
  APIUpdateJoom,
  APIEbaySuffix,
  APICreateEbay,
  APIEbayInfo,
  APIDeleteEbay,
  APIUpdateEbay,
  APIPaypal
} from "../../api/product";
import { getMenu } from "../../api/login";
export default {
  data() {
    return {
      tableHeight: window.innerHeight - 275,
      allMenu: [],
      activeName: "eBay账号字典",
      dateEbay: [],
      totalEbay: 0,
      dialogPictureEbay: false,
      dialogPictureBjEbay: false,
      disLoginEbay: false,
      ebayAcount: null,
      ebayAcountJC: null,
      codeEbay: null,
      ccCountry: null,
      graph: null,
      publish: null,
      bigEbay: null,
      smallEbay: null,
      contenEbay: [],
      delistEbay: [],
      highPrice: [],
      lowPrice: [],
      conditionPay: {
        paypal: null,
        pageSize: 1000000,
        page: 1
      },
      conditionEbay: {
        ebayName: null,
        ebaySuffix: null,
        nameCode: null,
        mainImg: null,
        ibayTemplate: null,
        storeCountry: null,
        high: null,
        low: null,
        pageSize: 20,
        page: 1
      }
    };
  },
  methods: {
    uniq(array) {
      var temp = [];
      for (var i = 0; i < array.length; i++) {
        if (temp.indexOf(array[i]) == -1) {
          temp.push(array[i]);
        }
      }
      return temp;
    },
    addJoomTjEbay() {
      if (this.ebayAcount) {
        for (let i = 0; i < this.highPrice.length; i++) {
          if (this.bigEbay && this.bigEbay == this.highPrice[i].paypal) {
            this.bigEbay = this.highPrice[i].id;
          }
          if (this.smallEbay && this.smallEbay == this.highPrice[i].paypal) {
            this.smallEbay = this.highPrice[i].id;
          }
        }
        var condate = {
          ebayName: this.ebayAcount,
          ebaySuffix: this.ebayAcountJC,
          nameCode: this.codeEbay,
          mainImg: this.graph,
          ibayTemplate: this.publish,
          storeCountry: this.ccCountry,
          high: this.bigEbay,
          low: this.smallEbay
        };
        this.ebayAcount = null;
        this.ebayAcountJC = null;
        this.codeEbay = null;
        this.smallEbay = null;
        this.graph = null;
        this.publish = null;
        this.ccCountry = null;
        this.bigEbay = null;
        APICreateEbay(condate).then(res => {
          if (res.data.data) {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.conditionEbay.page = 1;
            this.conditionEbay.ebayName = null;
            this.conditionEbay.ebaySuffix = null;
            this.conditionEbay.nameCode = null;
            this.conditionEbay.mainImg = null;
            this.conditionEbay.ibayTemplate = null;
            this.conditionEbay.storeCountry = null;
            this.conditionEbay.high = null;
            this.conditionEbay.low = null;
            this.conditionEbay.pageSize = 20;
            this.getDateEbay();
            this.dialogPictureBjEbay = false;
          }
        });
      } else {
        this.$message.error("eBay账号不能为空");
      }
    },
    editEbay(index, row) {
      this.disLoginEbay = true;
      let conId = {
        id: row.id
      };
      APIEbayInfo(conId).then(res => {
        if (res.data.message == "success") {
          this.contenEbay = res.data.data;
        }
      });
    },
    saveEbay() {
      for (let i = 0; i < this.highPrice.length; i++) {
          if (this.contenEbay.high && this.contenEbay.high == this.highPrice[i].paypal) {
            this.contenEbay.high = this.highPrice[i].id;
          }
          if (this.contenEbay.low && this.contenEbay.low == this.highPrice[i].paypal) {
            this.contenEbay.low = this.highPrice[i].id;
          }
        }
      APIUpdateEbay(this.contenEbay).then(res => {
        if (res.data.data) {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.disLoginEbay = false;
          this.getDateEbay();
        }
      });
    },
    delEbay(index, row) {
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let conId = {
            id: row.id
          };
          APIDeleteEbay(conId).then(res => {
            if (res.data.message == "success") {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getDateEbay();
            }
          });
        })
        .catch(() => {});
    },
    addJoomEbay() {
      this.getDatePay()
      this.dialogPictureBjEbay = true;
    },
    viewPicEbay(index, row) {
      let conId = {
        id: row.id
      };
      this.dialogPictureEbay = true;
      APIEbayInfo(conId).then(res => {
        if (res.data.message == "success") {
          this.delistEbay = res.data.data;
        }
      });
    },

    handleSizeChangeEbay(val) {
      this.conditionEbay.pageSize = val;
      this.getDateEbay();
    },
    handleCurrentChangeEbay(val) {
      this.conditionEbay.page = val;
      this.getDateEbay();
    },
    renderHeaderPicEbay(h, { column, $index }) {
      if ($index === 0) {
        return h(
          "div",
          {
            style: {
              height: "30px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.conditionEbay.ebayName,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.conditionEbay.ebayName = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.getDateEbay();
                }
              }
            })
          ]
        );
      } else if ($index === 1) {
        return h(
          "div",
          {
            style: {
              height: "30px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.conditionEbay.ebaySuffix,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.conditionEbay.ebaySuffix = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.getDateEbay();
                }
              }
            })
          ]
        );
      } else if ($index === 2) {
        return h(
          "div",
          {
            style: {
              height: "30px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.conditionEbay.storeCountry,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.conditionEbay.storeCountry = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.getDateEbay();
                }
              }
            })
          ]
        );
      } else if ($index === 3) {
        return h(
          "div",
          {
            style: {
              height: "30px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.conditionEbay.nameCode,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.conditionEbay.nameCode = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.getDateEbay();
                }
              }
            })
          ]
        );
      } else if ($index === 4) {
        return h(
          "div",
          {
            style: {
              height: "30px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.conditionEbay.mainImg,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.conditionEbay.mainImg = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.getDateEbay();
                }
              }
            })
          ]
        );
      } else if ($index === 5) {
        return h(
          "div",
          {
            style: {
              height: "30px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.conditionEbay.ibayTemplate,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.conditionEbay.ibayTemplate = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.getDateEbay();
                }
              }
            })
          ]
        );
      } else if ($index === 6) {
        return h(
          "div",
          {
            style: {
              height: "30px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.conditionEbay.high,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.conditionEbay.high = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.getDateEbay();
                }
              }
            })
          ]
        );
      } else if ($index === 7) {
        return h(
          "div",
          {
            style: {
              height: "30px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.conditionEbay.low,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.conditionEbay.low = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.getDateEbay();
                }
              }
            })
          ]
        );
      }
    },
    handleClick(tab, event) {
      if (tab.label === "Wish账号字典") {
        this.$router.push({
          path: "/v1/basic-info/ebay-suffix"
        });
      }
      if (tab.label === "eBay账号字典") {
      }
      if (tab.label === "Joom账号字典") {
        this.$router.push({
          path: "/v1/basic-info/joom"
        });
      }
      if (tab.label === "eBay运输方式") {
        this.$router.push({
          path: "/v1/basic-info/ys"
        });
      }
      if (tab.label === "Joom对比Wish价格") {
        this.$router.push({
          path: "/v1/basic-info/jw"
        });
      }
      if (tab.label === "开发采购美工对应关系") {
        this.$router.push({
          path: "/v1/basic-info/art"
        });
      }
    },
    getDateEbay() {
      APIEbaySuffix(this.conditionEbay).then(res => {
        this.dateEbay = res.data.data.items;
        this.totalEbay = res.data.data._meta.totalCount;
        this.conditionEbay.pageSize = res.data.data._meta.perPage;
        this.conditionEbay.page = res.data.data._meta.currentPage;
      });
    },
    getDatePay() {
      APIPaypal(this.conditionPay).then(res => {
        this.highPrice = res.data.data.items;
      });
    }
  },
  mounted() {
    getMenu().then(response => {
      const res = response.data.data;
      const menu = res.filter(e => e.name === "产品中心");
      let arr = menu[0].children;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].name == "基本信息") {
          this.allMenu = arr[i].tabs;
        }
      }
    });
    this.getDateEbay();
    this.getDatePay();
  }
};
</script>

<style lang="scss">
.contentt {
  margin-left: 20px;
  margin-top: 15px;
}
.content1 {
  margin-left: 20px;
  margin-top: 20px;
}
.basp {
  padding: 0;
  margin: 0;
  line-height: 40px;
}
.cTop {
  margin-top: 0px;
}
.baspj {
  text-align: center;
}
.top20 {
  margin-top: 25px;
}
.font14 {
  font-size: 14px;
}
.elTable td {
  padding: 16px 0 !important;
}
</style>
