<template>
  <section>
    <div>
      <el-row>
        <el-col :span="24" style="padding:15px 15px;">
          <el-col :span="6">
            <el-input
              placeholder="15090-18415021(多个用逗号隔开)"
              v-model="collectionNumber"
              style="width:97%;"
              clearable
            ></el-input>
          </el-col>
          <el-col :span="2">
            <span class="dsblock fon12 dsblockGreen" @click="collection">开始采集</span>
          </el-col>
          <el-col :span="3">
            <span class="dsblock fon12 dsblockred" @click="exportJoom">批量导出joom-csv</span>
          </el-col>
          <el-col :span="2">
            <span class="dsblock fon12 dsblockcse" @click="markAll">批量完善</span>
          </el-col>
          <el-col :span="5">
            <el-col :span="7">
              <el-select v-model="sign">
                <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-col>
            <el-col :span="10">
              <el-input placeholder="设置价格" class="fon12 bodinput" v-model="price"></el-input>
            </el-col>
            <el-col :span="7" class="boderrtb">
              <span @click="modifyprice()" class="dsblock fon12 dack">确定</span>
            </el-col>
          </el-col>
          <el-col :span="6">
            <el-col :span="9">
              <el-select
                v-model="cate"
                placeholder="-主类目-"
                class="fon12"
                @change="mainIndex($event)"
              >
                <el-option
                  v-for="item in mainCategory"
                  :key="item"
                  :label="item"
                  :value="item"
                  class="fon12"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="9">
              <el-select v-model="subCate">
                <el-option v-for="item in childrenCategory" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-col>
            <el-col :span="6">
              <span class="qCategory fon12" @click="defineCategory">确定类目</span>
            </el-col>
          </el-col>
        </el-col>
        <el-col :span="24">
          <div class="infoTable">
          <el-table :data="pictureData" @selection-change="selsChange" :height="tableHeight">
            <el-table-column type="selection" fixed align="center" header-align="center"></el-table-column>
            <el-table-column type="index" fixed align="center" header-align="center"></el-table-column>
            <el-table-column label="操作" fixed header-align="center" width="108">
              <template slot-scope="scope">
                <el-tooltip content="查看">
                  <i
                    class="el-icon-view"
                    @click="viewPic(scope.$index, scope.row)"
                    style="color: #409EFF;cursor:pointer;"
                  ></i>
                </el-tooltip>
                <el-tooltip content="更新">
                  <i
                    @click="joomId(scope.$index, scope.row)"
                    class="el-icon-edit"
                    style="color: #409EFF;cursor:pointer;"
                  ></i>
                </el-tooltip>
                <el-tooltip content="转至开发">
                  <i
                    class="el-icon-rank"
                    style="color: #409EFF;cursor:pointer;"
                    @click="goDevelopment(scope.$index, scope.row)"
                  ></i>
                </el-tooltip>
                <el-tooltip content="关联产品">
                  <i
                    class="el-icon-share"
                    style="color: #409EFF;cursor:pointer;"
                    @click="relation(scope.$index, scope.row)"
                  ></i>
                </el-tooltip>
                <el-tooltip content="删除">
                  <i
                    class="el-icon-delete"
                    style="color: #409EFF;cursor:pointer;"
                    @click="del(scope.$index, scope.row)"
                  ></i>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="picUrl" fixed label="商品图片" header-align="center" width="80">
              <template slot-scope="scope">
                <a
                :href="'https://www.joom.com/en/products/'+scope.row.proId"
                target="_blank"
                style="display: block; width: 60px;height: 60px"
              >
               <el-tooltip placement="right" :open-delay='10' class="exxHover" popper-class="page-login-toolTipClass">
                <div slot="content"><img :src="scope.row.mainImage" style="width: 300px;height: 300px;"></div>
                <img :src="scope.row.mainImage" style="width: 60px;height: 60px">
              </el-tooltip>
                <!-- <img :src="scope.row.mainImage" style="width: 70px;height: 60px"> -->
                </a>
              </template>
            </el-table-column>
            <el-table-column label="商品编号" header-align="center">
              <el-table-column
                prop="proId"
                :render-header="renderHeaderPic"
                width="240"
                align="center"
              ></el-table-column>
            </el-table-column>
            <el-table-column label="平台状态" header-align="center">
              <el-table-column
                prop="platForm"
                :render-header="renderHeaderPic"
                width="100"
                align="center"
              ></el-table-column>
            </el-table-column>
            <el-table-column label="状态" header-align="center">
              <el-table-column
                prop="progress"
                :render-header="renderHeaderPic"
                width="108"
                align="center"
              >
                <template slot-scope="scope">
                  <a
                    :class="scope.row.progress=='采集失败'?'clasRed1':scope.row.progress=='采集成功'?'clasGreen1':'classc'"
                  >{{scope.row.progress}}</a>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="创建人" header-align="center">
              <el-table-column
                prop="creator"
                :render-header="renderHeaderPic"
                width="110"
                align="center"
              ></el-table-column>
            </el-table-column>
            <el-table-column label="创建时间" header-align="center">
              <el-table-column
                prop="createTime"
                :render-header="renderHeaderPic"
                width="160"
                align="center"
              ></el-table-column>
            </el-table-column>
            <el-table-column label="更新时间" header-align="center">
              <el-table-column
                prop="updateTime"
                :render-header="renderHeaderPic"
                width="160"
                align="center"
              ></el-table-column>
            </el-table-column>
            <el-table-column label="产品状态" header-align="center">
              <el-table-column
                prop="detailStatus"
                :render-header="renderHeaderPic"
                width="108"
                align="center"
              >
                <template slot-scope="scope">
                  <a
                    :class="scope.row.detailStatus=='未完善'?'clasRed1':'clasGreen1'"
                  >{{scope.row.detailStatus}}</a>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="开发状态" header-align="center">
              <el-table-column
                prop="devStatus"
                :render-header="renderHeaderPic"
                width="108"
                align="center"
              >
                <template slot-scope="scope">
                  <a
                    :class="scope.row.devStatus=='未开发'?'clasRed1':scope.row.devStatus=='开发中'?'classc':scope.row.devStatus=='已开发'?'clasGreen1':'classl'"
                  >{{scope.row.devStatus}}</a>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="主类目" header-align="center">
              <el-table-column
                prop="cat"
                :render-header="renderHeaderPic"
                width="120"
                align="center"
              ></el-table-column>
            </el-table-column>
            <el-table-column label="子类目" header-align="center">
              <el-table-column
                prop="subCat"
                :render-header="renderHeaderPic"
                width="120"
                align="center"
              ></el-table-column>
            </el-table-column>
            <el-table-column label="商品编码" header-align="center">
              <el-table-column
                prop="goodsCode"
                :render-header="renderHeaderPic"
                width="130"
                align="center"
              ></el-table-column>
            </el-table-column>
            <el-table-column label="普源商品编码" header-align="center">
              <el-table-column
                prop="pyGoodsCode"
                :render-header="renderHeaderPic"
                width="130"
                align="center"
              ></el-table-column>
            </el-table-column>
          </el-table>
          </div>
        </el-col>
      </el-row>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.condition.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="this.condition.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total"
      ></el-pagination>
      <el-dialog :visible.sync="dialogRelation" width="80%">
        <div>第1-{{relationTotal}}条,共{{relationTotal}}条</div>
        <el-row style="margin-top:10px;">
          <el-col :span="24">
            <el-col :span="5">
              <el-input v-model="codeRelation" disabled style="width:98%"></el-input>
            </el-col>
            <el-col :span="5">
              <el-input v-model="codeRelationinput" placeholder="--普源商品编码--" style="width:98%"></el-input>
            </el-col>
            <el-col :span="8">
              <el-button type="success" @click="keepRelation">保存</el-button>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-table
              :data="variations"
              border
              style="width:100%;margin-top:10px;"
              max-height="500"
            >
              <el-table-column type="index" width="50" align="center" header-align="center"></el-table-column>
              <el-table-column label="唯一编码" prop="childId" header-align="center">
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.childId" disabled></el-input>
                </template>
              </el-table-column>
              <el-table-column label="颜色" prop="color" header-align="center">
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.color" disabled></el-input>
                </template>
              </el-table-column>
              <el-table-column label="尺码/型号" prop="proSize" header-align="center">
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.proSize" disabled></el-input>
                </template>
              </el-table-column>
              <el-table-column label="普源SKU" prop="pySku" header-align="center">
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.pySku"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="图片" prop="varMainImage" header-align="center" min-width="100">
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.varMainImage" disabled></el-input>
                </template>
              </el-table-column>
              <el-table-column label="图片" prop="varMainImage" header-align="center">
                <template slot-scope="scope">
                  <img
                    :src="scope.row.varMainImage"
                    style="width:50px;height:50px;display: block;margin: auto"
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-dialog>
      <el-dialog title="数据详情" :visible.sync="dialogPicture" width="70%">
        <el-row>
          <table style="width: 100%;margin: auto;border-collapse:collapse;">
            <thead style="background: #409EFF;border:#409EFF solid 1px ">
              <th
                width="10%"
                style="text-align: center;color: #fff;font-weight: normal;line-height: 45px;border-right: #d4d4d4 solid 1px"
              >ID</th>
              <th
                width="25%"
                style="text-align: center;color: #fff;font-weight: normal;line-height: 45px;border-right: #d4d4d4 solid 1px"
              >商品编号</th>
              <th
                width="10%"
                style="text-align: center;color: #fff;font-weight: normal;line-height: 45px;border-right: #d4d4d4 solid 1px"
              >平台名称</th>
              <th
                width="10%"
                style="text-align: center;color: #fff;font-weight: normal;line-height: 45px;border-right: #d4d4d4 solid 1px"
              >状态</th>
              <th
                width="10%"
                style="text-align: center;color: #fff;font-weight: normal;line-height: 45px;border-right: #d4d4d4 solid 1px"
              >创建人</th>
              <th
                width="15%"
                style="text-align: center;color: #fff;font-weight: normal;line-height: 45px;border-right: #d4d4d4 solid 1px"
              >创建时间</th>
              <th
                width="15%"
                style="text-align: center;color: #fff;font-weight: normal;line-height: 45px;"
              >更新时间</th>
            </thead>
            <tbody>
              <tr>
                <td
                  width="10%"
                  style="text-align: center;font-weight: normal;line-height: 35px;border: #d4d4d4 solid 1px"
                >{{delist.id}}</td>
                <td
                  width="20%"
                  style="text-align: center;font-weight: normal;line-height: 35px;border: #d4d4d4 solid 1px"
                >{{delist.proId}}</td>
                <td
                  width="10%"
                  style="text-align: center;font-weight: normal;line-height: 35px;border: #d4d4d4 solid 1px"
                >{{delist.platForm}}</td>
                <td
                  width="10%"
                  style="text-align: center;font-weight: normal;line-height: 35px;border: #d4d4d4 solid 1px"
                >{{delist.progress}}</td>
                <td
                  width="10%"
                  style="text-align: center;font-weight: normal;line-height: 35px;border: #d4d4d4 solid 1px"
                >{{delist.creator}}</td>
                <td
                  width="15%"
                  style="text-align: center;font-weight: normal;line-height: 35px;border: #d4d4d4 solid 1px"
                >{{delist.createTime}}</td>
                <td
                  width="15%"
                  style="text-align: center;font-weight: normal;line-height: 35px;border: #d4d4d4 solid 1px"
                >{{delist.updateTime}}</td>
              </tr>
            </tbody>
          </table>
        </el-row>
      </el-dialog>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
import {
  APIMineList,
  APIMineInfo,
  APICjMine,
  APISendToDevelop,
  APIMineExport,
  APIMineFinish,
  APIMineSetPrice,
  APISetCat,
  APIDeleteMine,
  APIbindShopSku,
  APISaveShopSku
} from "../../api/product";
import { getMenu } from "../../api/login";
import {
  getAttributeInfoStoreName,
  getAttributeInfoCat,
  getPlatGoodsStatus,
  getPlatCompletedPlat,
  getAttributeInfoSubCat
} from "../../api/profit";
export default {
  data() {
    return {
      allMenu: [],
      activeName: "",
      pictureData: [],
      collectionNumber: null,
      dialogRelation: false,
      codeRelation: null,
      codeRelationinput: null,
      relationTotal: 0,
      tableHeight: window.innerHeight - 205,
      total: 0,
      sels: [],
      dialogPicture: false,
      dialogPictureBj: false,
      options: ["=", "+", "-", "*", "/"],
      price: null,
      sign: "=",
      cate: null,
      subCate: null,
      time1: null,
      time2: null,
      finish: {
        id: null
      },
      disLogin: false,
      variations: [],
      mainCategory: [],
      childrenCategory: [],
      conten: [],
      delist: [],
      condition: {
        proId: null,
        platForm: null,
        progress: null,
        creator: null,
        createTime: null,
        updateTime: null,
        detailStaus: null,
        cat: null,
        subCat: null,
        devStatus: null,
        pyGoodsCode: null,
        pageSize: 10,
        page: 1
      }
    };
  },
  methods: {
    keepRelation() {
      let relationObj = {
        goodsCode: this.codeRelation,
        pyGoodsCode: this.codeRelationinput,
        variations: this.variations
      };
      APISaveShopSku(relationObj).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          // this.dialogRelation = false;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    relation(index, row) {
      // const ary = [];
      // ary.push(row.id);
      // let objtr = {
      //   id: ary
      // };
      // APIbindShopSku(objtr).then(res => {
      //   if (res.data.code == 200) {
      //     this.dialogRelation = true;
      //     this.variations = res.data.data.variations;
      //     this.relationTotal = this.variations.length;
      //     this.codeRelation = res.data.data.goodsCode;
      //   } else {
      //     this.$message.error(res.data.message);
      //   }
      // });
       let Logistics=this.$router.resolve({
            path: `/joomRelation/${row.id}`
        })     
       window.open(Logistics.href);
    },
    defineCategory() {
      if (this.sels.length != 0) {
        if (this.cate && this.subCate) {
          let objCat = {
            id: this.sels.map(e => e.id),
            cat: this.cate,
            subCat: this.subCate
          };
          APISetCat(objCat).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: "设置成功",
                type: "success"
              });
              this.getDate();
            } else {
              this.$message.error(res.data.message);
            }
          });
        } else {
          this.$message.error("未选择类目");
        }
      } else {
        this.$message.error("未选择");
      }
    },
    modifyprice() {
      if (this.sels.length != 0) {
        if (this.price) {
          let objTr = {
            id: this.sels.map(e => e.id),
            price: this.price,
            operator: this.sign
          };
          APIMineSetPrice(objTr).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: "设置成功",
                type: "success"
              });
              this.getDate();
            } else {
              this.$message.error(res.data.message);
            }
          });
        } else {
          this.$message.error("未设置价格");
        }
      } else {
        this.$message.error("未选择");
      }
    },
    markAll() {
      if (this.sels.length != 0) {
        this.finish.id = this.sels.map(e => e.id);
        APIMineFinish(this.finish).then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: "标记成功",
              type: "success"
            });
            this.getDate();
          } else {
            this.$message.error(res.data.message);
          }
        });
      } else {
        this.$message.error("未选择");
      }
    },
    exportJoom() {
      if (this.sels.length != 0) {
        let objStr1 = {
          id: this.sels.map(e => e.id)
        };
        APIMineExport(objStr1).then(res => {
          const blob = new Blob([res.data], {
            type: "data:text/csv;charset=utf-8"
          });
          const downloadElement = document.createElement("a");
          const objectUrl = window.URL.createObjectURL(blob);
          downloadElement.href = objectUrl;
          const date = new Date();
          const year = date.getFullYear();
          let month = date.getMonth() + 1;
          let strDate = date.getDate();
          let hour = date.getHours();
          let minute = date.getMinutes();
          let second = date.getSeconds();
          if (month >= 1 && month <= 9) {
            month = "0" + month;
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
          }
          if (hour >= 0 && hour <= 9) {
            hour = "0" + hour;
          }
          if (minute >= 0 && minute <= 9) {
            minute = "0" + minute;
          }
          if (second >= 0 && second <= 9) {
            second = "0" + second;
          }
          const filename =
            "joom_" + year + month + strDate + hour + minute + second;
          downloadElement.download = filename + ".csv";
          document.body.appendChild(downloadElement);
          downloadElement.click();
          document.body.removeChild(downloadElement);
        });
      } else {
        this.$message.error("未选择");
      }
    },
    goDevelopment(index, row) {
      const ary = [];
      ary.push(row.id);
      let objtr = {
        id: ary
      };
      APISendToDevelop(objtr).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: "成功",
            type: "success"
          });
          this.getDate();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    mainIndex(item) {
      this.childrenCategory = [];
      for (var key in this.screen) {
        if (this.screen[key] == item) {
          this.childrenCategory.push(key);
        }
      }
      if (this.childrenCategory.length != 0) {
        this.subCate = this.childrenCategory[0];
      } else {
        this.subCate = null;
      }
    },
    collection() {
      if (this.collectionNumber) {
        if (this.collectionNumber.indexOf("，") > -1) {
          const strObj = this.collectionNumber.split("，");
          this.collectionNumber = strObj.join(",");
          var objStr = {
            proId: this.collectionNumber
          };
        } else {
          var objStr = {
            proId: this.collectionNumber
          };
        }
        APICjMine(objStr).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: "采集成功",
              type: "success"
            });
            this.getDate();
            setTimeout(() => {
              this.getDate();
            }, 1000);
          } else {
            this.$message.error(res.data.message);
          }
        });
      } else {
        this.$message.error("未输入商品编号");
      }
    },
    joomId(idnex, row) {
      if (row.progress != "采集失败") {
        this.$router.push({
          path: `/joom/${row.id}`
        });
      } else {
        this.$message.error("采集成功以后才能编辑");
      }
    },
    selsChange(sels) {
      this.sels = sels;
    },
    del(index, row) {
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let arrDel = [];
          arrDel.push(row.id);
          let conId = {
            id: arrDel
          };
          APIDeleteMine(conId).then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getDate();
            } else {
              this.$message.error(res.data.message);
            }
          });
        })
        .catch(() => {});
    },
    viewPic(index, row) {
      this.delist = [];
      let conId = {
        id: row.id
      };
      this.dialogPicture = true;
      APIMineInfo(conId).then(res => {
        if (res.data.code == 200) {
          if (res.data.data.basicInfo) {
            this.delist = res.data.data.basicInfo;
          } else {
            this.delist = [];
          }
        } else {
          this.$message.error(res.data.message);
        }
      });
    },

    handleSizeChange(val) {
      this.condition.pageSize = val;
      this.getDate();
    },
    handleCurrentChange(val) {
      this.condition.page = val;
      this.getDate();
    },
    renderHeaderPic(h, { column, $index }) {
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
                value: this.condition.proId,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.proId = value;
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
                value: this.condition.platForm,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.platForm = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      } else if ($index === 2) {
        let filters = [
          { text: "采集成功", value: "采集成功" },
          { text: "待采集", value: "待采集" },
          { text: "采集失败", value: "采集失败" }
        ];
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.condition.progress,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.condition.progress = value;
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
                value: this.condition.creator,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.creator = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      } else if ($index === 4) {
        return h("el-date-picker", {
          props: {
            value: this.time1,
            size: "mini",
            type: "daterange"
          },
          style: {
            width: "200px"
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
      } else if ($index === 5) {
        return h("el-date-picker", {
          props: {
            value: this.time2,
            size: "mini",
            type: "daterange"
          },
          style: {
            width: "200px"
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
      } else if ($index === 6) {
        let filters = [
          { text: "未完善", value: "未完善" },
          { text: "已完善", value: "已完善" }
        ];
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.condition.detailStatus,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.condition.detailStatus = value;
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
      } else if ($index === 7) {
        let filters = [
          { text: "未开发", value: "未开发" },
          { text: "开发中", value: "开发中" },
          { text: "已开发", value: "已开发" },
          { text: "已关联", value: "已关联" }
        ];
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.condition.devStatus,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.condition.devStatus = value;
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
      } else if ($index === 8) {
        let filters = this.mainCategory;
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.condition.cat,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.condition.cat = value;
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
      } else if ($index === 9) {
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
                value: this.condition.subCat,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.subCat = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
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
                value: this.condition.goodsCode,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.goodsCode = value;
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
                value: this.condition.pyGoodsCode,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.pyGoodsCode = value;
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
        this.condition.createTime = [
          this.formatDate(this.time1[0]),
          this.formatDate(this.time1[1])
        ];
      } else {
        this.condition.createTime = [];
      }
      if (this.time2 !== null && this.time2.length !== 0) {
        this.condition.updateTime = [
          this.formatDate(this.time2[0]),
          this.formatDate(this.time2[1])
        ];
      } else {
        this.condition.updateTime = [];
      }
      this.getDate();
    },
    handleClick(tab, event) {},
    getDate() {
      APIMineList(this.condition).then(res => {
        this.pictureData = res.data.data.items;
        for(let i=0;i<this.pictureData.length;i++){
          var strData=this.pictureData[i].mainImage
          var replaceStr;
          var reg=/([\s\S]+)(.(jpg_)?\d{2}x\d+)([\s\S]+)/g
          var result=reg.exec(strData);
          if(result){
            if(result[1].charAt(result[1].length-1)=='.'){
              result[1] = result[1].substring(0, result[1].length - 1); 
            }
           replaceStr=result[1]+result[result.length-1]
           this.pictureData[i].mainImage=replaceStr
          }
        }
        this.total = res.data.data._meta.totalCount;
        this.condition.pageSize = res.data.data._meta.perPage;
        this.condition.page = res.data.data._meta.currentPage;
      });
    }
  },
  mounted() {
    this.getDate();
    getAttributeInfoCat().then(response => {
      this.mainCategory = response.data.data;
    });
    getAttributeInfoSubCat().then(response => {
      this.screen = response.data.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.contentt {
  margin-top: 15px;
}
.content1 {
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
.dsblock {
  width: 95%;
  display: block;
  border: #ccc solid 1px;
  line-height: 38px;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
}
.dsblockGreen {
  background: #008d4c;
  color: #fff;
  border: #008d4c solid 1px;
}
.dsblockred {
  background: #d73925;
  border: #d73925 solid 1px;
  color: #fff;
}
.dsblockcse {
  background: #e08e0b;
  border: #e08e0b solid 1px;
  color: #fff;
}
.dack {
  border: #ccc solid 1px;
  background: #eee;
  border-left: none;
  width: 92%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.bodinput input {
  border-radius: 0;
}
.qCategory {
  display: block;
  width: 100%;
  line-height: 38px;
  text-align: center;
  cursor: pointer;
  border: #ccc solid 1px;
  background: #eee;
  border-left: none;
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
.classc {
  color: #e6a23c;
  background-color: rgba(230, 162, 60, 0.1);
  border: rgba(214, 132, 8, 0.2) solid 1px;
  width: 85%;
  margin: auto;
  line-height: 32px;
  display: block;
  border-radius: 5px;
}
.classl {
  color: #409eff;
  background-color: rgba(64, 158, 255, 0.1);
  border: 1px solid rgba(64, 158, 255, 0.2);
  width: 85%;
  margin: auto;
  line-height: 32px;
  display: block;
  border-radius: 5px;
}
@media screen and (max-width: 1450px) {
  .fon12 {
    font-size: 13px;
  }
}
@media screen and (max-width: 1350px) {
  .fon12 {
    font-size: 12px;
  }
}
</style>
