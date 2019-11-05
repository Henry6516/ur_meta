<template>
  <section>
    <div>
      <el-row class="contentt">
        <el-col :span="24">
          <el-button type="primary" @click="addJoomArt()">
            <i class="el-icon-plus"></i>创建
          </el-button>
        </el-col>
      </el-row>
      <el-row class="content1">
        <el-col :span="24" class="font14">第1-20条，共{{totalArt}}条数据.</el-col>
        <el-col :span="24" style="margin-top: 20px">
          <el-table
            :data="dateArt"
            border
            class="elTable"
            :height="tableHeight"
            style="width: 98%;"
          >
            <el-table-column type="index" fixed align="center" width="80" header-align="center"></el-table-column>
            <el-table-column label="操作" fixed header-align="center" align="center" width="80">
              <template slot-scope="scope">
                <el-tooltip content="查看">
                  <i
                    class="el-icon-view"
                    @click="viewPicArt(scope.$index, scope.row)"
                    style="color: #409EFF;cursor:pointer;"
                  ></i>
                </el-tooltip>
                <el-tooltip content="更新">
                  <i
                    @click="editArt(scope.$index, scope.row)"
                    class="el-icon-edit"
                    style="color: #409EFF;cursor:pointer;"
                  ></i>
                </el-tooltip>
                <el-tooltip content="删除">
                  <i
                    class="el-icon-delete"
                    style="color: #409EFF;cursor:pointer;"
                    @click="delArt(scope.$index, scope.row)"
                  ></i>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="规则名称" header-align="center">
              <el-table-column prop="ruleName" :render-header="renderHeaderPicArt" align="center"></el-table-column>
            </el-table-column>
            <el-table-column label="开发员" header-align="center">
              <el-table-column prop="ruleKey" :render-header="renderHeaderPicArt" align="center"></el-table-column>
            </el-table-column>
            <el-table-column label="对应美工或采购" header-align="center">
              <el-table-column prop="ruleValue" :render-header="renderHeaderPicArt" align="center"></el-table-column>
            </el-table-column>
            <el-table-column label="规则类型" header-align="center">
              <el-table-column prop="ruleType" :render-header="renderHeaderPicArt" align="center"></el-table-column>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-pagination
        background
        @size-change="handleSizeChangeArt"
        @current-change="handleCurrentChangeArt"
        :current-page="conditionArt.page"
        :page-size="conditionArt.pageSize"
        :total="this.totalArt"
        layout="prev, pager, next"
        style="margin: 20px 0;margin-left: 10px;margin-bottom:0"
      ></el-pagination>
      <el-dialog title="详情" :visible.sync="dialogPictureArt">
        <el-row class="contentt" style="margin-top: 0">
          <el-col :span="24" class="cTop">
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">规则编号</p>
              </el-col>
              <el-col :span="20">
                <el-input :value="delistArt.id" :disabled="true"></el-input>
              </el-col>
            </el-col>
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">大于等于重量(g)</p>
              </el-col>
              <el-col :span="20">
                <el-input :value="delistArt.greaterEqual" :disabled="true"></el-input>
              </el-col>
            </el-col>
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">规则名称</p>
              </el-col>
              <el-col :span="20">
                <el-input :value="delistArt.ruleName" :disabled="true"></el-input>
              </el-col>
            </el-col>
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">开发员</p>
              </el-col>
              <el-col :span="20">
                <el-input :value="delistArt.ruleKey" :disabled="true"></el-input>
              </el-col>
            </el-col>
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">对应美工或采购</p>
              </el-col>
              <el-col :span="20">
                <el-input :value="delistArt.ruleValue" :disabled="true"></el-input>
              </el-col>
            </el-col>
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">规则类型</p>
              </el-col>
              <el-col :span="20">
                <el-input :value="delistArt.ruleType" :disabled="true"></el-input>
              </el-col>
            </el-col>
          </el-col>
        </el-row>
      </el-dialog>
      <el-dialog title="创建" :visible.sync="dialogPictureBjArt">
        <el-row class="contentt" style="margin-top: 0">
          <el-col :span="24" class="cTop">
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">规则名称(g)</p>
              </el-col>
              <el-col :span="20">
                <el-select v-model="ruleArt" placeholder="请选择" style="width:100%;">
                  <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
                </el-select>
                <!-- <el-input v-model="ruleArt"></el-input> -->
              </el-col>
            </el-col>
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">开发员</p>
              </el-col>
              <el-col :span="20">
                <el-input v-model="developerArt"></el-input>
              </el-col>
            </el-col>
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">对应美工或采购</p>
              </el-col>
              <el-col :span="20">
                <el-input v-model="designerArt"></el-input>
              </el-col>
            </el-col>
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">规则类型</p>
              </el-col>
              <el-col :span="20">
                <el-select v-model="typeArt" placeholder="请选择" style="width:100%;">
                  <el-option v-for="item in options1" :key="item" :label="item" :value="item"></el-option>
                </el-select>
                <!-- <el-input v-model="typeArt"></el-input> -->
              </el-col>
            </el-col>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogPictureBjArt = false">取 消</el-button>
          <el-button type="primary" @click="addJoomTjArt()">添 加</el-button>
        </div>
      </el-dialog>
      <el-dialog title="编辑" :visible.sync="disLoginArt">
        <el-row class="contentt" style="margin-top: 0">
          <el-col :span="24" class="cTop">
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">规则名称</p>
              </el-col>
              <el-col :span="20">
                <!-- <el-input v-model="contenArt.ruleName"></el-input> -->
                <el-select v-model="contenArt.ruleName" placeholder="请选择" style="width:100%;">
                  <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-col>
            </el-col>
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">开发员</p>
              </el-col>
              <el-col :span="20">
                <el-input v-model="contenArt.ruleKey"></el-input>
              </el-col>
            </el-col>
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">对应美工或采购</p>
              </el-col>
              <el-col :span="20">
                <el-input v-model="contenArt.ruleValue"></el-input>
              </el-col>
            </el-col>
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">规则类型</p>
              </el-col>
              <el-col :span="20">
                <el-select v-model="contenArt.ruleType" placeholder="请选择" style="width:100%;">
                  <el-option v-for="item in options1" :key="item" :label="item" :value="item"></el-option>
                </el-select>
                <!-- <el-input v-model="contenArt.ruleType"></el-input> -->
              </el-col>
            </el-col>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="disLoginArt = false">取 消</el-button>
          <el-button type="primary" @click="saveArt()">保 存</el-button>
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
  APIShippingService,
  APICreateShipping,
  APIShippingInfo,
  APIUpdateShipping,
  APIDeleteShipping,
  APIJoomWish,
  APICreateContrast,
  APIContrastInfo,
  APIUpdateContrast,
  APIDeleteContrast,
  APISysRules,
  APICreateRules,
  APIRulesInfo,
  APIUpdateRules,
  APIDeleteRules
} from "../../api/product";
import { getMenu } from "../../api/login";
export default {
  data() {
    return {
      tableHeight: window.innerHeight - 275,
      allMenu: [],
      activeName: "开发采购美工对应关系",
      dateArt: [],
      totalArt: 0,
      options: ["开发美工映射", "开发采购映射"],
      options1: ["dev-pur-map", "dev-arc-map"],
      dialogPictureArt: false,
      dialogPictureBjArt: false,
      disLoginArt: false,
      greaterThan: null,
      lessThan: null,
      priceArt: null,
      crteadArt: null,
      updateArt: null,
      ruleArt: null,
      developerArt: null,
      designerArt: null,
      typeArt: null,
      contenArt: [],
      delistArt: [],
      conditionArt: {
        ruleName: null,
        ruleKey: null,
        ruleValue: null,
        ruleType: null,
        pageSize: 20,
        page: 1
      }
    };
  },
  methods: {
    addJoomTjArt() {
      var condate = {
        ruleName: this.ruleArt,
        ruleKey: this.developerArt,
        ruleValue: this.designerArt,
        ruleType: this.typeArt
      };
      this.ruleArt = null;
      this.developerArt = null;
      this.designerArt = null;
      this.typeArt = null;
      APICreateRules(condate).then(res => {
        if (res.data.data) {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.conditionArt.page = 1;
          this.conditionArt.ruleName = null;
          this.conditionArt.ruleKey = null;
          this.conditionArt.ruleValue = null;
          this.conditionArt.ruleType = null;
          this.conditionArt.pageSize = 20;
          this.getDateArt();
          this.dialogPictureBjArt = false;
        }
      });
    },
    editArt(index, row) {
      this.disLoginArt = true;
      let conId = {
        id: row.id
      };
      APIRulesInfo(conId).then(res => {
        if (res.data.message == "success") {
          this.contenArt = res.data.data;
        }
      });
    },
    saveArt() {
      APIUpdateRules(this.contenArt).then(res => {
        if (res.data.data) {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.disLoginArt = false;
          this.getDateArt();
        }
      });
    },
    delArt(index, row) {
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let conId = {
            id: row.id
          };
          APIDeleteRules(conId).then(res => {
            if (res.data.message == "success") {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getDateArt();
            }
          });
        })
        .catch(() => {});
    },
    addJoomArt() {
      this.dialogPictureBjArt = true;
    },
    viewPicArt(index, row) {
      let conId = {
        id: row.id
      };
      this.dialogPictureArt = true;
      APIRulesInfo(conId).then(res => {
        if (res.data.message == "success") {
          this.delistArt = res.data.data;
        }
      });
    },

    handleSizeChangeArt(val) {
      this.conditionArt.pageSize = val;
      this.getDateArt();
    },
    handleCurrentChangeArt(val) {
      this.conditionArt.page = val;
      this.getDateArt();
    },
    renderHeaderPicArt(h, { column, $index }) {
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
                value: this.conditionArt.ruleName,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.conditionArt.ruleName = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.getDateArt();
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
                value: this.conditionArt.ruleKey,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.conditionArt.ruleKey = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.getDateArt();
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
                value: this.conditionArt.ruleValue,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.conditionArt.ruleValue = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.getDateArt();
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
                value: this.conditionArt.ruleType,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.conditionArt.ruleType = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.getDateArt();
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
        this.$router.push({
          path: "/v1/basic-info/ebay"
        });
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
      }
    },
    getDateArt() {
      APISysRules(this.conditionArt).then(res => {
        this.dateArt = res.data.data.items;
        this.totalArt = res.data.data._meta.totalCount;
        this.conditionArt.pageSize = res.data.data._meta.perPage;
        this.conditionArt.page = res.data.data._meta.currentPage;
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
    this.getDateArt();
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
  padding: 8px 0 !important;
}
.aArial{
  font-family: Arial !important;
}
.aArial .el-textarea__inner{
  font-family: Arial !important;
}
.aArial .el-input__inner{
  font-family: Arial !important;
}
</style>
