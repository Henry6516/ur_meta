<template>
  <section>
    <div>
      <el-row>
        <el-col :span="24" style="padding:10px 20px;">
          <el-col :span='5'>
            <el-input v-model="collectionNumber" style="width:97%;" clearable></el-input>
          </el-col>
          <el-col :span='2'>
            <span class="dsblock fon12 dsblockGreen" @click="collection">开始采集</span>
          </el-col>
          <el-col :span='3'>
            <span class="dsblock fon12 dsblockred">批量导出joom-csv</span>
          </el-col>
          <el-col :span='2'>
            <span class="dsblock fon12 dsblockcse">批量标记完善</span>
          </el-col>
        </el-col>
        <el-col :span="24">
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
                    @click="signPerfect(scope.$index, scope.row)"
                  ></i>
                </el-tooltip>
                <el-tooltip content="关联产品">
                  <i
                    class="el-icon-share"
                    style="color: #409EFF;cursor:pointer;"
                    @click="signPerfect(scope.$index, scope.row)"
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
            <el-table-column prop="picUrl" fixed label="商品图片" header-align="center" width="90">
              <template slot-scope="scope">
                <img :src="scope.row.mainImage" style="width: 70px;height: 60px">
              </template>
            </el-table-column>
            <el-table-column label="商品编号" header-align="center">
              <el-table-column
                prop="proId"
                :render-header="renderHeaderPic"
                width="150"
                align="center"
              ></el-table-column>
            </el-table-column>
            <el-table-column label="平台状态" header-align="center">
              <el-table-column
                prop="platForm"
                :render-header="renderHeaderPic"
                width="150"
                align="center"
              ></el-table-column>
            </el-table-column>
            <el-table-column label="状态" header-align="center">
              <el-table-column
                prop="progress"
                :render-header="renderHeaderPic"
                width="150"
                align="center"
              ></el-table-column>
            </el-table-column>
            <el-table-column label="创建人" header-align="center">
              <el-table-column
                prop="creator"
                :render-header="renderHeaderPic"
                width="150"
                align="center"
              ></el-table-column>
            </el-table-column>
            <el-table-column label="创建时间" header-align="center">
              <el-table-column
                prop="createTime"
                :render-header="renderHeaderPic"
                width="200"
                align="center"
              ></el-table-column>
            </el-table-column>
            <el-table-column label="更新时间" header-align="center">
              <el-table-column
                prop="updateTime"
                :render-header="renderHeaderPic"
                width="200"
                align="center"
              ></el-table-column>
            </el-table-column>
            <el-table-column label="产品状态" header-align="center">
              <el-table-column
                prop="detailStatus"
                :render-header="renderHeaderPic"
                width="150"
                align="center"
              >
                <template slot-scope="scope">{{scope.row.detailStatus}}</template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="开发状态" header-align="center">
              <el-table-column
                prop="devStatus"
                :render-header="renderHeaderPic"
                width="150"
                align="center"
              >
                <template slot-scope="scope">{{scope.row.devStatus}}</template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="主类目" header-align="center">
              <el-table-column
                prop="cat"
                :render-header="renderHeaderPic"
                width="150"
                align="center"
              ></el-table-column>
            </el-table-column>
            <el-table-column label="子类目" header-align="center">
              <el-table-column
                prop="subCat"
                :render-header="renderHeaderPic"
                width="150"
                align="center"
              ></el-table-column>
            </el-table-column>
            <el-table-column label="商品编码" header-align="center">
              <el-table-column
                prop="goodsCode"
                :render-header="renderHeaderPic"
                width="150"
                align="center"
              ></el-table-column>
            </el-table-column>
            <el-table-column label="普源商品编码" header-align="center">
              <el-table-column
                prop="pyGoodsCode"
                :render-header="renderHeaderPic"
                width="150"
                align="center"
              ></el-table-column>
            </el-table-column>
          </el-table>
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
import { APIMineList, APIMineInfo,APICjMine } from "../../api/product";
import { getMenu } from "../../api/login";
import {
  getAttributeInfoStoreName,
  getAttributeInfoCat,
  getPlatGoodsStatus,
  getPlatCompletedPlat
} from "../../api/profit";
export default {
  data() {
    return {
      allMenu: [],
      activeName: "",
      pictureData: [],
      collectionNumber:null,
      tableHeight: window.innerHeight - 195,
      total: 0,
      dialogPicture: false,
      dialogPictureBj: false,
      disLogin: false,
      mainCategory: [],
      conten: [],
      delist: [],
      condition: {
        pageSize: 10,
        page: 1
      }
    };
  },
  methods: {
     collection(){
       console.log(1)
      if(this.collectionNumber){
        let objStr={
          proId:this.collectionNumber
        }
         APICjMine(objStr).then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: "采集成功",
                type: "success"
              });
              this.getDate();
              setTimeout(()=>{
               this.getDate();
              },1000)
            }else{
              this.$message.error(res.data.message)
            }
        });
      }
    },
    joomId(idnex, row) {
      this.$router.push({
        path: `/joom/${row.id}`
      });
    },
    selsChange(sels) {
      this.sels = sels;
    },
    edit(index, row) {},
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
          APIDeleteJoom(conId).then(res => {
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
    viewPic(index, row) {
      let conId = {
        id: row.id
      };
      this.dialogPicture = true;
      APIMineInfo(conId).then(res => {
        if (res.data.message == "success") {
          if(res.data.data.basicInfo){
            this.delist = res.data.data.basicInfo;
          }else{
            this.delist=[]
          }
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
              height: "30px"
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
              height: "30px"
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
                value: this.condition.progress,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.progress = value;
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
            width: "180px",
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
            width: "180px",
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
      } else if ($index === 10) {
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
              height: "30px"
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
    getDate() {
      APIMineList(this.condition).then(res => {
        this.pictureData = res.data.data.items;
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
.dsblock{
  width: 95%;
  display: block;
  border: #ccc solid 1px;
  line-height: 38px;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
}
.dsblockGreen{
  background: #008d4c;
  color: #fff;
  border: #008d4c solid 1px;
}
.dsblockred{
  background: #d73925;
  border: #d73925 solid 1px;
  color: #fff;
}
.dsblockcse{
  background: #e08e0b;
  border: #e08e0b solid 1px;
  color: #fff;
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
