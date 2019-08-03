<template>
  <section>
    <div>
      <el-row class="contentt">
        <el-col :span="24">
          <el-button type="primary" @click="addJoom()">
            <i class="el-icon-plus"></i>添加shopify账号
          </el-button>
        </el-col>
      </el-row>
      <el-row class="content1">
        <el-col :span="24" class="font14">第1-10条，共{{total}}条数据.</el-col>
        <el-col :span="24" style="margin-top: 20px">
          <el-table :data="date" border class="elTable" style="width: 98.5%" :max-height="tableHeight">
            <el-table-column type="index" fixed align="center" width="80" header-align="center"></el-table-column>
            <el-table-column label="操作" fixed align="center" width="80">
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
                    @click="edit(scope.$index, scope.row)"
                    class="el-icon-edit"
                    style="color: #409EFF;cursor:pointer;"
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
            <el-table-column label="账号名称" header-align="center">
              <el-table-column prop="account" :render-header="renderHeaderPic" align="center"></el-table-column>
            </el-table-column>
            <el-table-column label="标签" header-align="center">
              <el-table-column prop="tags" :render-header="renderHeaderPic" align="center"></el-table-column>
            </el-table-column>
            <el-table-column label="主类目" header-align="center">
              <el-table-column prop="cate" :render-header="renderHeaderPic" align="center"></el-table-column>
            </el-table-column>
            <el-table-column label="子类目" header-align="center">
              <el-table-column prop="subCate" :render-header="renderHeaderPic" align="center"></el-table-column>
            </el-table-column>
            <el-table-column label="创建日期" header-align="center">
              <el-table-column prop="createdDate" :render-header="renderHeaderPic" align="center"></el-table-column>
            </el-table-column>
            <el-table-column label="更新日期" header-align="center">
              <el-table-column prop="updatedDate" :render-header="renderHeaderPic" align="center"></el-table-column>
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
        :total="this.total"
        layout="prev, pager, next"
        style="margin: 20px 0;margin-left: 10px"
      ></el-pagination>
      <el-dialog title="shopify账号详情" :visible.sync="dialogPicture">
        <el-row>
          <table style="width: 100%;margin: auto;border-collapse:collapse;">
            <thead style="background: #409EFF;border:#409EFF solid 1px ">
              <th
                width="25%"
                style="text-align: center;color: #fff;font-weight: normal;line-height: 45px;border-right: #d4d4d4 solid 1px"
              >账号名称</th>
              <th
                width="25%"
                style="text-align: center;color: #fff;font-weight: normal;line-height: 45px;border-right: #d4d4d4 solid 1px"
              >标签</th>
              <th
                width="25%"
                style="text-align: center;color: #fff;font-weight: normal;line-height: 45px;border-right: #d4d4d4 solid 1px"
              >主类目</th>
              <th
                width="25%"
                style="text-align: center;color: #fff;font-weight: normal;line-height: 45px;"
              >子类目</th>
            </thead>
            <tbody>
              <tr>
                <td
                  width="25%"
                  style="text-align: center;font-weight: normal;line-height: 45px;border: #d4d4d4 solid 1px"
                >{{delist.account}}</td>
                <td
                  width="25%"
                  style="text-align: center;font-weight: normal;line-height: 45px;border: #d4d4d4 solid 1px"
                >{{delist.tags}}</td>
                <td
                  width="25%"
                  style="text-align: center;font-weight: normal;line-height: 45px;border: #d4d4d4 solid 1px"
                >{{delist.cate}}</td>
                <td
                  width="25%"
                  style="text-align: center;font-weight: normal;line-height: 45px;border: #d4d4d4 solid 1px"
                >{{delist.subCate}}</td>
              </tr>
            </tbody>
          </table>
        </el-row>
      </el-dialog>
      <el-dialog title="添加shopify账号" :visible.sync="dialogPictureBj">
        <el-row class="contentt" style="margin-top: 0">
          <el-col :span="24" class="cTop">
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="2">
                <p class="basp" style="margin-left: 5px">账号</p>
              </el-col>
              <el-col :span="21">
                <el-input v-model="account"></el-input>
              </el-col>
            </el-col>
            <el-col :span="24" class="cTop">
              <el-col :span="24" style="margin-bottom: 20px">
                <el-col :span="2">
                  <p class="basp" style="margin-left: 5px">标签</p>
                </el-col>
                <el-col :span="21">
                  <el-input v-model="tags"></el-input>
                </el-col>
              </el-col>
            </el-col>
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="2">
                <p class="basp">主类目</p>
              </el-col>
              <el-col :span="21">
                <el-select v-model="cate" @change="getSubcate" style="width:100%;">
                  <el-option v-for="item in cateName" :value="item" :key="item"></el-option>
                </el-select>
              </el-col>
            </el-col>
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="2">
                <p class="basp">子类目</p>
              </el-col>
              <el-col :span="21">
                <el-select v-model="subCate" style="width:100%;">
                  <el-option v-for="item in subCateName" :value="item" :key="item"></el-option>
                </el-select>
              </el-col>
            </el-col>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogPictureBj = false">取 消</el-button>
          <el-button type="primary" @click="addShopify()">添 加</el-button>
        </div>
      </el-dialog>
      <el-dialog title="编辑shopify账号" :visible.sync="disLogin">
        <el-row class="contentt" style="margin-top: 0">
          <el-col :span="24" class="cTop">
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">账号名称</p>
              </el-col>
              <el-col :span="20">
                <el-input v-model="conten.account"></el-input>
              </el-col>
            </el-col>
            <el-col :span="24" class="cTop">
              <el-col :span="24" style="margin-bottom: 20px">
                <el-col :span="3">
                  <p class="basp" style="margin-left: 5px">标签</p>
                </el-col>
                <el-col :span="20">
                  <el-input v-model="conten.tags"></el-input>
                </el-col>
              </el-col>
            </el-col>
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">主类目</p>
              </el-col>
              <el-col :span="20">
                <el-select v-model="conten.cate" @change="getSubcateAd" style="width:100%;">
                  <el-option v-for="item in cateName" :value="item" :key="item"></el-option>
                </el-select>
              </el-col>
            </el-col>
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">子类目</p>
              </el-col>
              <el-col :span="20">
                <el-select v-model="conten.subCate" style="width:100%;">
                  <el-option v-for="item in subCateName" :value="item" :key="item"></el-option>
                </el-select>
              </el-col>
            </el-col>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="disLogin = false">取 消</el-button>
          <el-button type="primary" @click="save()">保 存</el-button>
        </div>
      </el-dialog>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
import {
  getGoodscats,
  getAttributeInfoCat,
  getAttributeInfoSubCat
} from "../../api/profit";
import {
  APIShopifyList,
  APIShopifySave,
  APIShopifyInfo,
  APIDeleteShopify
} from "../../api/product";
import { getMenu } from "../../api/login";
export default {
  data() {
    return {
      tableHeight: window.innerHeight - 275,
      allMenu: [],
      activeName: "Joom账号字典",
      date: [],
      total: 0,
      time1: [],
      time2: [],
      cateName: [],
      subCateName: [],
      subCae: [],
      dialogPicture: false,
      dialogPictureBj: false,
      disLogin: false,
      account: null,
      tags: null,
      cate: null,
      subCate: null,
      conten: [],
      delist: [],
      condition: {
        account: null,
        tags: null,
        cate: null,
        subCate: null,
        createdDate: [],
        updatedDate: [],
        pageSize: 10,
        page: 1
      }
    };
  },
  methods: {
    getSubcate() {
      if (this.cate !== "") {
        this.subCateName = [];
        const val = this.cate;
        for (var key in this.subCae) {
          if (this.subCae[key] == val) {
            this.subCateName.push(key);
          }
        }
        if (this.subCateName.length != 0) {
          this.subCate = this.subCateName[0];
        } else {
          this.subCate = "";
        }
        // const res = this.category
        // this.subCate = res.filter(e => e.CategoryParentName === val)
      }
    },
    getSubcateAd() {
      if (this.conten.cate !== "") {
        this.subCateName = [];
        const val = this.conten.cate;
        for (var key in this.subCae) {
          if (this.subCae[key] == val) {
            this.subCateName.push(key);
          }
        }
        if (this.subCateName.length != 0) {
          this.conten.subCate = this.subCateName[0];
        } else {
          this.conten.subCate = "";
        }
        // const res = this.category
        // this.subCate = res.filter(e => e.CategoryParentName === val)
      }
    },
    addShopify() {
      if (this.account) {
        var condate = {
          id: null,
          account: this.account,
          tags: this.tags,
          cate: this.cate,
          subCate: this.subCate
        };
        this.account = null;
        this.tags = null;
        this.cate = null;
        this.subCate = null;
        APIShopifySave(condate).then(res => {
          if (res.data.data) {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.condition.page = 1;
            this.condition.account = null;
            this.condition.tags = null;
            this.condition.cate = null;
            this.condition.subCate = null;
            this.condition.createdDate = [];
            this.condition.updatedDate = [];
            this.condition.pageSize = 10;
            this.getDate();
            this.dialogPictureBj = false;
          }
        });
      } else {
        this.$message.error("账号不能为空");
      }
    },
    edit(index, row) {
      this.disLogin = true;
      let conId = {
        id: row.id
      };
      APIShopifyInfo(conId).then(res => {
        if (res.data.message == "success") {
          this.conten = res.data.data;
        }
      });
    },
    save() {
      APIShopifySave(this.conten).then(res => {
        if (res.data.data) {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.disLogin = false;
          this.getDate();
        }
      });
    },
    del(index, row) {
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let conId = {
            id: row.id
          };
          APIDeleteShopify(conId).then(res => {
            if (res.data.message == "success") {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getDate();
            }
          });
        })
        .catch(() => {});
    },
    addJoom() {
      this.dialogPictureBj = true;
    },
    viewPic(index, row) {
      let conId = {
        id: row.id
      };
      this.dialogPicture = true;
      APIShopifyInfo(conId).then(res => {
        if (res.data.message == "success") {
          this.delist = res.data.data;
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
        this.condition.createdDate = [
          this.formatDate(this.time1[0]),
          this.formatDate(this.time1[1])
        ];
      } else {
        this.condition.createdDate = [];
      }
      if (this.time2 !== null && this.time2.length !== 0) {
        this.condition.updatedDate = [
          this.formatDate(this.time2[0]),
          this.formatDate(this.time2[1])
        ];
      } else {
        this.condition.updatedDate = [];
      }
      this.getDate();
    },
    renderHeaderPic(h, { column, $index }) {
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
                value: this.condition.account,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.account = value;
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
              height: "30px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.condition.tags,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.tags = value;
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
        let filters = this.cateName;
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              filterable: true,
              value: this.condition.cate,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.condition.cate = value;
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
                value: this.condition.subCate,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.subCate = value;
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
            width: "95%",
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
      } else if ($index === 5) {
        return h("el-date-picker", {
          props: {
            value: this.time2,
            size: "mini",
            type: "daterange"
          },
          style: {
            width: "95%",
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
      }
    },
    getDate() {
      APIShopifyList(this.condition).then(res => {
        this.date = res.data.data.items;
        this.total = res.data.data._meta.totalCount;
        this.condition.pageSize = res.data.data._meta.perPage;
        this.condition.page = res.data.data._meta.currentPage;
      });
    }
  },
  mounted() {
    getAttributeInfoCat().then(response => {
      this.cateName = response.data.data;
    });
    getAttributeInfoSubCat().then(response => {
      this.subCae = response.data.data;
    });
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
    this.getDate();
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
</style>
