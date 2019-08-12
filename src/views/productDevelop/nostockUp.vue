<template>
  <section>
      <el-col :span="24" style="padding:10px 20px;">
        <el-button @click="noexportExcel" type="primary">导出表格</el-button>
      </el-col>
      <el-col :span="24" style="padding: 0;">
        <h3
          class="toolbar essential"
          style="margin-top: 0;margin-bottom: 15px;padding-left:15px;line-height:45px;font-size:15px;"
        >
          不备货产品表现
          <span
            style="float:right;margin-right: 30px;font-size: 14px;margin-bottom: 15px;display: block"
          >
            共{{noskuTotal}}条
            <span style="margin-left: 15px">第1-{{noskuTotal}}条数据</span>
          </span>
        </h3>
      </el-col>
      <el-table
        :data="nostockdata"
        border
        class="elTableForm"
        :summary-method="getSummaries"
        :header-cell-style="getRowClass"
        show-summary
        :height="tableHeightstock"
        style="width: 98%;margin:auto;margin-top:5px;"
      >
        <el-table-column type="index" fixed align="center" width="80" header-align="center"></el-table-column>
        <el-table-column label="开发员" header-align="right" align="right" prop="developer"></el-table-column>
        <el-table-column label="不备货产品款数" header-align="right" align="right" prop="number"></el-table-column>
        <el-table-column label="出单产品款数" header-align="right" align="right" prop="orderNum"></el-table-column>
        <el-table-column label="出单率(%)" header-align="right" align="right" prop="orderRate">
          <template slot-scope="scope">{{scope.row.orderRate | cutOut100}}</template>
        </el-table-column>
        <el-table-column label="旺款数量" header-align="right" align="right" prop="exuStyleNum"></el-table-column>
        <el-table-column label="旺款率(%)" header-align="right" align="right" prop="exuRate">
          <template slot-scope="scope">{{scope.row.exuRate | cutOut100}}</template>
        </el-table-column>
        <el-table-column label="爆款数量" header-align="right" align="right" prop="hotStyleNum"></el-table-column>
        <el-table-column label="爆款率(%)" header-align="right" align="right" prop="hotRate">
          <template slot-scope="scope">{{scope.row.hotRate | cutOut100}}</template>
        </el-table-column>
        <el-table-column
          label="本月可用不备货款数"
          header-align="right"
          align="right"
          prop="stockNumThisMonth"
        >
          <template slot-scope="scope">
            <a
              :class="scope.row.stockNumThisMonth?'':'clasRed'"
            >{{scope.row.stockNumThisMonth?scope.row.stockNumThisMonth:'未设置'}}</a>
          </template>
        </el-table-column>
        <el-table-column
          label="下月可用不备货款数"
          header-align="right"
          align="right"
          prop="stockNumLastMonth"
        >
          <template slot-scope="scope">
            <a
              :class="scope.row.stockNumLastMonth?'':'clasRed'"
            >{{scope.row.stockNumLastMonth?scope.row.stockNumLastMonth:'未设置'}}</a>
          </template>
        </el-table-column>
      </el-table>
  </section>
</template>
<script type="text/ecmascript-6">
import limit from "../reports/limit.vue";
import saleProduct from "./saleProduct.vue";
import productStock from "./productStock.vue";
import productShow from "./productShow.vue";
import {
  APIProduct,
  APIPlat,
  APIFormWish,
  APIStock,
  APInoStock,
  APIFormExtend
} from "../../api/product";
import {
  getAttributeInfoStoreName,
  getAttributeInfoCat,
  getPlatGoodsStatus,
  getPlatCompletedPlat,
  getForbidPlat
} from "../../api/profit";
import { getMenu } from "../../api/login";
export default {
  components: {
    limit,
    saleProduct,
    productStock,
    productShow
  },
  data() {
    return {
      //销售
      tableHeight: window.innerHeight - 195,
      activeName: "",
      allMenu: [],
      platData: [],
      repertory: [],
      mainCategory: [],
      goodsState: [],
      violation: [],
      sels: [],
      time1: "",
      time2: "",
      dialogPlat: false,
      totalPlat: null,
      goodsInfoPlat: [],
      oaGoodsPlat: [],
      perfectPlatform: [],
      platForm: {
        id: null
      },
      plat: {
        extendStatus: null,
        picUrl: null,
        goodsCode: null,
        possessMan: null,
        storeName: null,
        stockUp: null,
        wishPublish: null,
        completeStatus: null,
        goodsName: null,
        cate: null,
        subCate: null,
        supplierName: null,
        introducer: null,
        developer: null,
        purchaser: null,
        possessMan1: null,
        mid: null,
        dictionaryName: null,
        devDatetime: [],
        updateTime: [],
        isVar: null,
        goodsStatus: null,
        stockDays: null,
        pageSize: 10,
        page: 1
      },
      //wish
      tableHeightWish: window.innerHeight - 135,
      platDataWish: [],
      totalWish: null,
      time1Wish: "",
      platWish: {
        extendStatus: null,
        picUrl: null,
        goodsCode: null,
        possessMan: null,
        storeName: null,
        stockUp: null,
        wishPublish: null,
        completeStatus: null,
        goodsName: null,
        cate: null,
        subCate: null,
        supplierName: null,
        introducer: null,
        developer: null,
        purchaser: null,
        possessMan1: null,
        mid: null,
        number: null,
        dictionaryName: null,
        devDatetime: [],
        updateTime: [],
        isVar: null,
        goodsStatus: null,
        stockDays: null,
        pageSize: 10,
        page: 1
      },
      //备货
      tableHeightstock: window.innerHeight - 230,
      stockdata: [],
      skuTotal: 0,
      //不备货
      nostockdata: [],
      noskuTotal: 0,
      showView:false,
      show: {
        sale: false,
        wish: false,
        stockUp: false,
        nostockUp: false,
        limit:false,
        saleProduct:false,
        productStock:false,
        productShow:false,
      }
    };
  },
  filters: {
    cutOut: function(value) {
      if (!value) return "";
      value = value.substring(0, 21);
      return value;
    },
    cutOut100: function(value) {
      if (!value) return "";
      value = (value*100).toFixed(0);
      return value;
    }
  },
  methods: {
    handleClick(tab, event) {
      if (tab.name === "/v1/oa-data/sales") {
        this.show["sale"] = true;
        this.showView=false
        this.getPlat();
      } else {
        this.show["sale"] = false;
      }
      if (tab.name === "/v1/oa-data/wish") {
        this.show["wish"] = true;
        this.showView=false
        this.getwish();
      } else {
        this.show["wish"] = false;
      }
      if (tab.name === "/v1/oa-data/stock") {
        this.show["stockUp"] = true;
        this.showView=false
        this.getStock();
      } else {
        this.show["stockUp"] = false;
      }
      if (tab.name === "/v1/oa-data/nonstock") {
        this.show["nostockUp"] = true;
        this.showView=false
        this.getnoStock();
      } else {
        this.show["nostockUp"] = false;
      }
      if (tab.name === "/v1/report/dev-limit") {
        this.show["limit"] = true;
        this.showView=false
      } else {
        this.show["limit"] = false;
      }
      if (tab.name === "/v1/oa-data/sales-perform") {
        this.show["saleProduct"] = true;
        this.showView=false
      } else {
        this.show["saleProduct"] = false;
      }
      if (tab.name === "/v1/oa-data/stock-perform") {
        this.show["productStock"] = true;
        this.showView=false
      } else {
        this.show["productStock"] = false;
      }
      if (tab.name === "/v1/oa-data/product-perform") {
        this.show["productShow"] = true;
        this.showView=false
      } else {
        this.show["productShow"] = false;
      }
      if (tab.name === "/v1/oa-data/dev-perform") {
        this.showView=true
        this.$router.push({
            path: `/v1/oa-data/dev-perform`
          });
      } else {
      }
      if (tab.name === "/v1/oa-data/cat-perform") {
        this.showView=true
        this.$router.push({
            path: `/v1/oa-data/cat-perform`
          });
      } else {
      }
    },
    //销售
    selsChange(sels) {
      this.sels = sels;
    },
    mark(index, row) {
      let arrMark = [row.id];
      let obj = {
        id: arrMark
      };
      APIFormExtend(obj).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: "成功",
            type: "success"
          });
          this.getPlat();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    markAll() {
      if(this.sels.length!=0){
        let finish = {
        id: null
        };
        finish.id = this.sels.map(e => e.id);
        APIFormExtend(finish).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: "成功",
              type: "success"
            });
            this.getPlat();
          } else {
            this.$message.error(res.data.message);
          }
        });
      }else{
        this.$message.error('请选择产品');
      }
    },
    handleSizeChangePlat(val) {
      this.plat.pageSize = val;
      this.getPlat();
    },
    handleCurrentChangePlat(val) {
      this.plat.page = val;
      this.getPlat();
    },
    formatTen(num) {
      return num > 9 ? num + "" : "0" + num;
    },
    formatDate(date) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();
      return year + "-" + this.formatTen(month) + "-" + this.formatTen(day);
    },
    filter() {
      if (this.time1 !== null && this.time1.length !== 0) {
        this.plat.devDatetime = [
          this.formatDate(this.time1[0]),
          this.formatDate(this.time1[1])
        ];
      } else {
        this.plat.devDatetime = [];
      }
      if (this.time2 !== null && this.time2.length !== 0) {
        this.plat.updateTime = [
          this.formatDate(this.time2[0]),
          this.formatDate(this.time2[1])
        ];
      } else {
        this.plat.updateTime = [];
      }
      this.getPlat();
    },
    viewPlat(index, row) {
      this.dialogPlat = true;
      this.platForm.id = row.id;
      APIPlat(this.platForm).then(res => {
        this.goodsInfoPlat = res.data.data;
        if (this.goodsInfoPlat.oaGoods) {
          this.oaGoodsPlat = this.goodsInfoPlat.oaGoods;
        } else {
          this.oaGoodsPlat = [];
        }
      });
    },
    platEdit(index, row) {
      let Logistics = this.$router.resolve({
        path: `/form/${row.id}`
      });
      window.open(Logistics.href);
    },
    renderHeaderPlat(h, { column, $index }) {
      if ($index === 0) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.plat.goodsCode,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.plat.goodsCode = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      } else if ($index === 1) {
        let filters = [
          { text: "未推广", value: "未推广" },
          { text: "已推广", value: "已推广" }
        ];
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.plat.extendStatus,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.plat.extendStatus = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.filter();
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item.text,
                  label: item.value
                }
              });
            })
          ]
        );
      } else if ($index === 2) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.plat.mapPersons,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.plat.mapPersons = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      } else if ($index === 3) {
        let filters = this.repertory;
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.plat.storeName,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.plat.storeName = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.filter();
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item,
                  label: item
                }
              });
            })
          ]
        );
      } else if ($index === 4) {
        let filters = [
          { text: "是", value: "是" },
          { text: "否", value: "否" }
        ];
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.plat.stockUp,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.plat.stockUp = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.filter();
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item.text,
                  label: item.value
                }
              });
            })
          ]
        );
      } else if ($index === 5) {
        let filters = [{ text: "Y", value: "Y" }, { text: "N", value: "N" }];
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.plat.wishPublish,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.plat.wishPublish = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.filter();
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item.text,
                  label: item.value
                }
              });
            })
          ]
        );
      } else if ($index === 6) {
        //                    let filters = [{ text: '未设置', value: '未设置' }, { text: 'eBay已完善', value: 'eBay已完善' }, { text: 'Wish已完善', value: 'Wish已完善' }, { text: 'Joom已完善', value: 'Joom已完善' }, { text: 'Wish已完善|eBay已完善', value: 'Wish已完善|eBay已完善' }, { text: 'Wish已完善|Joom已完善', value: 'Wish已完善|Joom已完善' }, { text: 'Joom已完善|eBay已完善', value: 'Joom已完善|eBay已完善'}, { text: 'Wish已完善|Joom已完善|eBay已完善', value: 'Wish已完善|Joom已完善|eBay已完善'}]
        let filters = this.perfectPlatform;
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.plat.completeStatus,
              size: "mini",
              multiple: true,
              collapseTags: true,
              clearable: true
            },
            on: {
              input: value => {
                this.plat.completeStatus = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.filter();
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item,
                  label: item
                }
              });
            })
          ]
        );
      } else if ($index === 7) {
        let filters = this.violation;
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.plat.dictionaryName,
              size: "mini",
              multiple: true,
              collapseTags: true,
              clearable: true
            },
            on: {
              input: value => {
                this.plat.dictionaryName = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.filter();
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item,
                  label: item
                }
              });
            })
          ]
        );
      } else if ($index === 8) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.plat.goodsName,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.plat.goodsName = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      } else if ($index === 9) {
        let filters = this.mainCategory;
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.plat.cate,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.plat.cate = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.filter();
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item,
                  label: item
                }
              });
            })
          ]
        );
      } else if ($index === 10) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.plat.subCate,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.plat.subCate = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      } else if ($index === 11) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.plat.supplierName,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.plat.supplierName = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      } else if ($index === 12) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.plat.introducer,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.plat.introducer = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      } else if ($index === 13) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.plat.developer,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.plat.developer = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      } else if ($index === 14) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.plat.purchaser,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.plat.purchaser = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      } else if ($index === 15) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.plat.possessMan1,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.plat.possessMan1 = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      } else if ($index === 16) {
        let filters = [
          { text: "是", value: "是" },
          { text: "否", value: "否" }
        ];
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.plat.mid,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.plat.mid = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.filter();
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item.text,
                  label: item.value
                }
              });
            })
          ]
        );
      } else if ($index === 17) {
        return h("el-date-picker", {
          props: {
            value: this.time1,
            size: "mini",
            type: "daterange"
          },
          style: {
            width: "145px",
            padding: "2px"
          },
          on: {
            input: value => {
              this.time1 = value;
              this.$emit("input", value);
            },
            change: value => {
              this.filter();
            }
          }
        });
      } else if ($index === 18) {
        return h("el-date-picker", {
          props: {
            value: this.time2,
            size: "mini",
            type: "daterange"
          },
          style: {
            width: "145px",
            padding: "2px"
          },
          on: {
            input: value => {
              this.time2 = value;
              this.$emit("input", value);
            },
            change: value => {
              this.filter();
            }
          }
        });
      } else if ($index === 19) {
        let filters = [
          { text: "是", value: "是" },
          { text: "否", value: "否" }
        ];
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.plat.isVar,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.plat.isVar = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.filter();
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item.text,
                  label: item.value
                }
              });
            })
          ]
        );
      } else if ($index === 20) {
        let filters = this.goodsState;
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.plat.goodsStatus,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.plat.goodsStatus = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.filter();
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item,
                  label: item
                }
              });
            })
          ]
        );
      } else if ($index === 21) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.plat.stockDays,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.plat.stockDays = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      }
    },
    getPlat() {
      APIProduct(this.plat).then(res => {
        this.platData = res.data.data.items;
        for(let i=0;i<this.platData.length;i++){
          var strData=this.platData[i].picUrl
          var replaceStr;
          var reg=/([\s\S]+)(.(jpg_)?\d{2}x\d+)([\s\S]+)/g
          var result=reg.exec(strData);
          if(result){
            if(result[1].charAt(result[1].length-1)=='.'){
              result[1] = result[1].substring(0, result[1].length - 1); 
            }
           replaceStr=result[1]+result[result.length-1]
           this.platData[i].picUrl=replaceStr
          }
        }
        this.platData.forEach((item, index) => {
          item.extendStatus = item.extendStatus ? item.extendStatus : "未推广";
        });
        this.totalPlat = res.data.data._meta.totalCount;
        this.plat.pageSize = res.data.data._meta.perPage;
        this.plat.page = res.data.data._meta.currentPage;
      });
    },
    //wish
    getwish() {
      APIFormWish(this.platWish).then(res => {
        this.platDataWish = res.data.data.items;
        for(let i=0;i<this.platDataWish.length;i++){
          var strData=this.platDataWish[i].picUrl
          var replaceStr;
          var reg=/([\s\S]+)(.(jpg_)?\d{2}x\d+)([\s\S]+)/g
          var result=reg.exec(strData);
          if(result){
            if(result[1].charAt(result[1].length-1)=='.'){
              result[1] = result[1].substring(0, result[1].length - 1); 
            }
           replaceStr=result[1]+result[result.length-1]
           this.platDataWish[i].picUrl=replaceStr
          }
        }
        this.totalWish = res.data.data._meta.totalCount;
        this.platWish.pageSize = res.data.data._meta.perPage;
        this.platWish.page = res.data.data._meta.currentPage;
      });
    },
    handleSizeChangeWish(val) {
      this.platWish.pageSize = val;
      this.getwish();
    },
    handleCurrentChangeWish(val) {
      this.platWish.page = val;
      this.getwish();
    },
    filterWish() {
      if (this.time1 !== null && this.time1.length !== 0) {
        this.platWish.devDatetime = [
          this.formatDate(this.time1[0]),
          this.formatDate(this.time1[1])
        ];
      } else {
        this.platWish.devDatetime = [];
      }
      this.getwish();
    },
    renderHeaderWish(h, { column, $index }) {
      if ($index === 0) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.platWish.goodsCode,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.platWish.goodsCode = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filterWish();
                }
              }
            })
          ]
        );
      } else if ($index === 1) {
        let filters = [{ text: "Y", value: "Y" }, { text: "N", value: "N" }];
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.platWish.wishPublish,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.platWish.wishPublish = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.filterWish();
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item.text,
                  label: item.value
                }
              });
            })
          ]
        );
      } else if ($index === 2) {
        let filters = this.violation;
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.platWish.dictionaryName,
              size: "mini",
              multiple: true,
              collapseTags: true,
              clearable: true
            },
            on: {
              input: value => {
                this.platWish.dictionaryName = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.filterWish();
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item,
                  label: item
                }
              });
            })
          ]
        );
      } else if ($index === 3) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.platWish.goodsName,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.platWish.goodsName = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filterWish();
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
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.platWish.developer,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.platWish.developer = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filterWish();
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
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.platWish.purchaser,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.platWish.purchaser = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filterWish();
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
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.platWish.possessMan1,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.platWish.possessMan1 = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filterWish();
                }
              }
            })
          ]
        );
      } else if ($index === 7) {
        return h("el-date-picker", {
          props: {
            value: this.time1Wish,
            size: "mini",
            type: "daterange"
          },
          style: {
            width: "145px",
            padding: "2px"
          },
          on: {
            input: value => {
              this.time1Wish = value;
              this.$emit("input", value);
            },
            change: value => {
              this.filterWish();
            }
          }
        });
      } else if ($index === 8) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.platWish.number,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.platWish.number = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filterWish();
                }
              }
            })
          ]
        );
      } else if ($index === 9) {
        let filters = [
          { text: "是", value: "是" },
          { text: "否", value: "否" }
        ];
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.platWish.isVar,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.platWish.isVar = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.filterWish();
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item.text,
                  label: item.value
                }
              });
            })
          ]
        );
      } else if ($index === 10) {
        let filters = this.goodsState;
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.platWish.goodsStatus,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.platWish.goodsStatus = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.filterWish();
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item,
                  label: item
                }
              });
            })
          ]
        );
      } else if ($index === 11) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.platWish.stockDays,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.platWish.stockDays = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filterWish();
                }
              }
            })
          ]
        );
      }
    },
    //备货
    exportExcel() {
      const th = [
        "开发员",
        "备货产品款数",
        "出单产品款数",
        "出单率(%)",
        "旺款数量",
        "旺款率(%)",
        "爆款数量",
        "爆款率(%)",
        "本月可用备货款数",
        "下月可用备货款数"
      ];
      const filterVal = [
        "developer",
        "number",
        "orderNum",
        "orderRate",
        "exuStyleNum",
        "exuRate",
        "hotStyleNum",
        "hotRate",
        "stockNumThisMonth",
        "stockNumLastMonth"
      ];
      const Filename = "备货产品表现";
      const data = this.stockdata.map(v => filterVal.map(k => v[k]));
      const [fileName, fileType, sheetName] = [Filename, "xls"];
      this.$toExcel({ th, data, fileName, fileType, sheetName });
    },
    getStock() {
      APIStock().then(res => {
        this.stockdata = res.data.data;
        this.skuTotal = this.stockdata.length;
      });
    },
    //不备货
    noexportExcel() {
      const th = [
        "开发员",
        "备货产品款数",
        "出单产品款数",
        "出单率(%)",
        "旺款数量",
        "旺款率(%)",
        "爆款数量",
        "爆款率(%)",
        "本月可用备货款数",
        "下月可用备货款数"
      ];
      const filterVal = [
        "developer",
        "number",
        "orderNum",
        "orderRate",
        "exuStyleNum",
        "exuRate",
        "hotStyleNum",
        "hotRate",
        "stockNumThisMonth",
        "stockNumLastMonth"
      ];
      const Filename = "不备货产品表现";
      const data = this.nostockdata.map(v => filterVal.map(k => v[k]));
      const [fileName, fileType, sheetName] = [Filename, "xls"];
      this.$toExcel({ th, data, fileName, fileType, sheetName });
    },
    getnoStock() {
      APInoStock().then(res => {
        this.nostockdata = res.data.data;
        this.noskuTotal = this.nostockdata.length;
      });
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        if (index === 2 || index === 3 || index === 5 || index === 7) {
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += "";
          } else {
            sums[index] = "N/A";
          }
        }
      });
      return sums;
    },

    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "color:#337ab7";
      } else {
        return "";
      }
    }
  },
  mounted() {
    getMenu().then(response => {
      const res = response.data.data;
      const menu = res.filter(e => e.name === "产品中心");
      let arr = menu[0].children;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].route == "/v1/oa-data/product") {
          this.allMenu = arr[i].tabs;
        }
      }
      //销售
      this.getnoStock();
      getAttributeInfoStoreName().then(response => {
        this.repertory = response.data.data;
      });
      getAttributeInfoCat().then(response => {
        this.mainCategory = response.data.data;
      });
      getPlatGoodsStatus().then(response => {
        this.goodsState = response.data.data;
      });
      getPlatCompletedPlat().then(response => {
        this.perfectPlatform = response.data.data;
      });
      getForbidPlat().then(response => {
        this.violation = response.data.data;
      });
    });
  }
};
</script>

<style lang="scss" scoped>
.clasRed {
  color: #c55 !important;
}
.clasGreen {
  color: #0e9a00;
}
.classa {
  color: #337ab7;
  text-decoration: none;
}
.clasRed1 {
  color: #f56c6c;
  border: rgba(245, 108, 108, 0.2) solid 1px;
  background: rgba(245, 108, 108, 0.1);
  width: 85%;
  margin: auto;
  line-height: 32px;
  display: block;
  border-radius: 5px;
}
.clasGreen1 {
  color: #0e9a00;
  border-radius: 5px;
  width: 85%;
  margin: auto;
  line-height: 32px;
  display: block;
  border: rgba(3, 82, 38, 0.2) solid 1px;
  background: rgba(33, 170, 95, 0.1);
}
.redCu {
  color: red;
  font-weight: bold;
}
.redblack {
  color: #606266;
}
</style>
<style>
.elTableForm td {
  padding: 10px 0;
}
</style>


