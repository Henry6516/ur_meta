<template>
  <div class="infoTable">
    <el-table
      :data="logData"
      style="width: 98%;margin-top:15px;margin-left:0.8%;font-size:13px;"
      border
      class="elTable"
      :height="tableHeight"
      :header-cell-style="getRowClass"
    >
      <el-table-column prop="id" label="日志ID" align="center" width="80">
        <el-table-column prop="id" :render-header="renderHeader" align="center" width="80"></el-table-column>
      </el-table-column>
      <el-table-column prop="goodsName" label="商品名称" align="center">
        <el-table-column prop="goodsName" :render-header="renderHeader" align="center"></el-table-column>
      </el-table-column>
      <el-table-column prop="ibaySuffix" label="ibay账号简称" align="center">
        <el-table-column prop="ibaySuffix" :render-header="renderHeader" align="center"></el-table-column>
      </el-table-column>
      <el-table-column prop="SKU" label="SKU" align="center">
        <el-table-column prop="SKU" :render-header="renderHeader" align="center"></el-table-column>
      </el-table-column>
      <el-table-column prop="mubanId" label="模板ID" align="center">
        <el-table-column prop="mubanId" :render-header="renderHeader" align="center"></el-table-column>
      </el-table-column>
      <el-table-column prop="creator" label="操作人" align="center">
        <el-table-column prop="creator" :render-header="renderHeader" align="center"></el-table-column>
      </el-table-column>
      <el-table-column prop="createDate" label="操作时间" align="center">
        <el-table-column prop="createDate" :render-header="renderHeader" align="center">
          <template slot-scope="scope">{{scope.row.createDate | cutOutDate}}</template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="status1" label="单属性状态" align="center">
        <el-table-column prop="status1" :render-header="renderHeader" align="center">
          <template slot-scope="scope">
            <a
              :class="scope.row.status1=='0'?'clasRed1':'clasGreen1'"
            >{{scope.row.status1=='0'?'未完成':'已完成'}}</a>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="status2" label="多属性状态" align="center">
        <el-table-column prop="status2" :render-header="renderHeader" align="center">
          <template slot-scope="scope">
            <a
              :class="scope.row.status2=='0'?'clasRed1':'clasGreen1'"
            >{{scope.row.status2=='0'?'未完成':'已完成'}}</a>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="completeDate1" label="单属性时间" align="center">
        <el-table-column prop="completeDate1" :render-header="renderHeader" align="center">
          <template slot-scope="scope">{{scope.row.completeDate1 | cutOutDate}}</template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="completeDate2" label="多属性时间" align="center">
        <el-table-column prop="completeDate2" :render-header="renderHeader" align="center">
          <template slot-scope="scope">{{scope.row.completeDate2 | cutOutDate}}</template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="content" label="提示信息" align="center">
        <el-table-column prop="content" :render-header="renderHeader" align="center" :show-overflow-tooltip="true">
          <template slot-scope="scope">{{scope.row.content}}</template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.condition.page"
        :page-sizes="[50, 100, 150, 200]"
        :page-size="this.condition.pageSize"
        style="padding-left:0.75%;margin-top:8px"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total"
      ></el-pagination>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { getSmtLog } from "../../api/product.js";
export default {
  data() {
    return {
      tableHeight: window.innerHeight - 120,
      logData: [],
      total: 0,
      condition: {
        goodsName: "",
        id: "",
        ibaySuffix: "",
        SKU: "",
        mubanId: "",
        creator: "",
        createDate: [],
        completeDate1: [],
        completeDate2: [],
        content:'',
        status1: "",
        status2: "",
        page: 1,
        pageSize: 50
      }
    };
  },
  filters: {
    cutOutDate(value) {
      if (value) {
        value = value.substring(0, 16);
        return value;
      } else {
        return "--";
      }
    }
  },
  destroyed: function() {},
  methods: {
    renderHeader(h, { column, $index }) {
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
                value: this.condition.id,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.id = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.getData();
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
                value: this.condition.goodsName,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.goodsName = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.getData();
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
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.condition.ibaySuffix,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.ibaySuffix = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.getData();
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
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.condition.SKU,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.SKU = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.getData();
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
                value: this.condition.mubanId,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.mubanId = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.getData();
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
                  this.getData();
                }
              }
            })
          ]
        );
      } else if ($index === 6) {
        return h("el-date-picker", {
          props: {
            value: this.condition.createDate,
            size: "mini",
            type: "daterange",
            valueFormat: "yyyy-MM-dd"
          },
          style: {
            width: "100%",
            padding: "2px"
          },
          on: {
            input: value => {
              this.condition.createDate = value;
              this.$emit("input", value);
            },
            change: value => {
              this.getData();
            }
          }
        });
      } else if ($index === 7) {
        let filters = [
          { text: "0", value: "未完成" },
          { text: "1", value: "已完成" }
        ];
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.condition.status1,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.condition.status1 = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.getData();
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
      }else if ($index === 8) {
        let filters = [
          { text: "0", value: "未完成" },
          { text: "1", value: "已完成" }
        ];
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.condition.status2,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.condition.status2 = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.getData();
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
      }else if ($index === 9) {
        return h("el-date-picker", {
          props: {
            value: this.condition.completeDate1,
            size: "mini",
            type: "daterange",
            valueFormat: "yyyy-MM-dd"
          },
          style: {
            width: "100%",
            padding: "2px"
          },
          on: {
            input: value => {
              this.condition.completeDate1 = value;
              this.$emit("input", value);
            },
            change: value => {
              this.getData();
            }
          }
        });
      } else if ($index === 10) {
        return h("el-date-picker", {
          props: {
            value: this.condition.completeDate2,
            size: "mini",
            type: "daterange",
            valueFormat: "yyyy-MM-dd"
          },
          style: {
            width: "100%",
            padding: "2px"
          },
          on: {
            input: value => {
              this.condition.completeDate2 = value;
              this.$emit("input", value);
            },
            change: value => {
              this.getData();
            }
          }
        });
      }else if ($index === 11) {
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
                value: this.condition.content,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.content = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.getData();
                }
              }
            })
          ]
        );
      }
    },
    handleSizeChange(val) {
      this.condition.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.condition.page = val;
      this.getData();
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "color:#3c8dbc;background:#f5f7fa";
      } else {
        return "";
      }
    },
    getData() {
      getSmtLog(this.condition).then(res => {
        this.logData = res.data.data.items;
        this.condition.page = res.data.data._meta.currentPage;
        this.condition.pageSize = res.data.data._meta.perPage;
        this.total = res.data.data._meta.totalCount;
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
<style lang="scss" scoped>
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
</style>
