<template>
  <div class="joomCat">
    <el-row style="margin-top:10px;">
      <el-col :span="24">
        <div class="infoTable">
          <el-table
            :data="tableData"
            border
            @sort-change="sortNumber"
            style="width:100%;margin-top:0px;margin:auto;"
            :height="tableHeight"
          >
            <el-table-column type="index" width="40" align="center" header-align="center" fixed></el-table-column>
            <el-table-column label="商品图片" prop="mainImage" header-align="center" width="80" fixed>
              <template slot-scope="scope">
                <a
                  :href="'https://www.joom.com/en/products/'+scope.row.productId"
                  target="_blank"
                  style="display: block; width: 60px;height: 60px"
                >
                  <el-tooltip
                    placement="right"
                    :open-delay="10"
                    class="exxHover"
                    popper-class="page-login-toolTipClass"
                  >
                    <div slot="content">
                      <img :src="scope.row.mainImage" style="width: 300px;height: 300px;" />
                    </div>
                    <img
                      :src="scope.row.mainImage"
                      style="width: 60px;height: 60px;"
                    />
                  </el-tooltip>
                </a>
              </template>
            </el-table-column>
            <el-table-column label="产品名称" prop="productName" header-align="center">
              <el-table-column
                prop="productName"
                :render-header="renderHeader"
                align="center"
                width="202"
              >
                <template slot-scope="scope">
                  <a
                    :href="'https://www.joom.com/en/products/'+scope.row.productId"
                    target="_blank"
                    class="classared"
                  >{{scope.row.productName}}</a>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              label="产品ID"
              prop="productId"
              header-align="center"
              align="center"
              width="150"
              sortable="custom"
            >
              <el-table-column
                prop="storeId"
                :render-header="renderHeader"
                align="center"
                width="150"
              ></el-table-column>
            </el-table-column>
            <el-table-column label="类目名称" prop="cateName" header-align="center">
              <el-table-column
                label="类目名称"
                prop="cateName"
                :render-header="renderHeader"
                align="center"
                width="180"
              >
                <template slot-scope="scope">
                  <a
                    :href="'https://www.joom.com/en/search/c.'+scope.row.productId"
                    target="_blank"
                    class="classa"
                  >{{scope.row.cateName}}</a>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              label="价格"
              prop="price"
              align="center"
              width="147"
              sortable="custom"
              placeholder="例如(1-10)"
            >
              <el-table-column
                prop="price"
                placeholder="例如(1-10)"
                :render-header="renderHeader"
                align="center"
                width="147"
              ></el-table-column>
            </el-table-column>
            <el-table-column
              label="评分"
              prop="rating"
              header-align="center"
              align="center"
              width="140"
              sortable="custom"
            >
              <el-table-column
                prop="rating"
                :render-header="renderHeader"
                align="center"
                width="140"
              ></el-table-column>
            </el-table-column>
            <el-table-column
              label="店铺ID"
              prop="storeId"
              header-align="center"
              align="center"
              width="185"
              sortable="custom"
            >
              <el-table-column
                prop="storeId"
                :render-header="renderHeader"
                align="center"
                width="185"
              ></el-table-column>
            </el-table-column>
            <el-table-column
              label="创建时间"
              sortable="custom"
              prop="taskCreatedTime"
              header-align="center"
              align="center"
              width="150"
            >
              <el-table-column
                prop="taskCreatedTime"
                :render-header="renderHeader"
                align="center"
                width="150"
              >
              <template slot-scope="scope">{{scope.row.taskCreatedTime | cutOutDate}}</template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              label="更新时间"
              sortable="custom"
              prop="taskUpdatedTime"
              header-align="center"
              align="center"
              width="140"
            >
              <el-table-column
                prop="taskUpdatedTime"
                :render-header="renderHeader"
                align="center"
                width="140"
              >
              <template slot-scope="scope">{{scope.row.taskUpdatedTime | cutOutDate}}</template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              label="上架时间"
              sortable="custom"
              prop="proCreatedDate"
              header-align="center"
              align="center"
              width="145"
            >
              <el-table-column
                prop="proCreatedDate"
                :render-header="renderHeader"
                align="center"
                width="145"
              >
              <template slot-scope="scope">{{scope.row.proCreatedDate | cutOutDate}}</template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              label="评论数"
              sortable="custom"
              prop="reviewsCount"
              header-align="center"
              align="center"
              width="140"
            >
              <el-table-column
                prop="reviewsCount"
                :render-header="renderHeader"
                align="center"
                width="140"
              ></el-table-column>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="this.condition.page"
          :page-sizes="[20, 30, 40]"
          :page-size="this.condition.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script type="text/ecmascript-6">
import { APIJoomCateProduct } from "../../api/profit";

export default {
  data() {
    return {
      toolTipClass: "page-login-toolTipClass",
      tableHeight: window.innerHeight - 153,
      total: 0,
      tableData: [],
      time1: null,
      time2: null,
      time3: null,
      condition: {
        cateId: null,
        productName: null,
        cateName: null,
        pricee1: null,
        pricee2: null,
        ratinge1: null,
        ratinge2: null,
        storeId: null,
        taskCreatedTime: [],
        taskUpdatedTime: [],
        proCreatedDate: [],
        reviewsCounte1: null,
        reviewsCounte2: null,
        sort: null,
        pageSize: 20,
        page: 1
      }
    };
  },
  filters: {
    cutOutDate(value){
      if(value) value = value.substring(0, 16);
      return value;
    },
  },
  methods: {
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
        this.condition.taskCreatedTime = [
          this.formatDate(this.time1[0]),
          this.formatDate(this.time1[1])
        ];
      } else {
        this.condition.taskCreatedTime = [];
      }
      if (this.time2 !== null && this.time2.length !== 0) {
        this.condition.taskUpdatedTime = [
          this.formatDate(this.time2[0]),
          this.formatDate(this.time2[1])
        ];
      } else {
        this.condition.taskUpdatedTime = [];
      }
      if (this.time3 !== null && this.time3.length !== 0) {
        this.condition.proCreatedDate = [
          this.formatDate(this.time3[0]),
          this.formatDate(this.time3[1])
        ];
      } else {
        this.condition.proCreatedDate = [];
      }
      this.relation();
    },
    sortNumber(column, prop, order) {
      if (column.order == null) {
        this.condition.sort = null;
        this.relation();
      }
      if (column.order == "ascending") {
        this.condition.sort = column.prop;
        this.relation();
      }
      if (column.order == "descending") {
        this.condition.sort = "-" + column.prop;
        this.relation();
      }
    },
    renderHeader(h, { column, $index }) {
      if ($index === 0) {
        return h("div", [
          h("el-input", {
            props: {
              value: this.condition.productName,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.condition.productName = value;
                this.$emit("input", value);
              },
              change: value => {
                this.filter();
              }
            }
          })
        ]);
      } else if ($index === 1) {
        return h("div", [
          h("el-input", {
            props: {
              value: this.condition.productId,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.condition.productId = value;
                this.$emit("input", value);
              },
              change: value => {
                this.filter();
              }
            }
          })
        ]);
      } else if ($index === 2) {
        return h("div", [
          h("el-input", {
            props: {
              value: this.condition.cateName,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.condition.cateName = value;
                this.$emit("input", value);
              },
              change: value => {
                this.filter();
              }
            }
          })
        ]);
      } else if ($index === 3) {
        return h("div", [
          h("el-input", {
            style: {
              width: "45%",
            },
            props: {
              value: this.condition.pricee1,
              size: "mini"
            },
            on: {
              input: value => {
                this.condition.pricee1 = value;
                this.$emit("input", value);
              },
              change: value => {
                this.filter();
              }
            }
          }),
          h(
            'span', {}, '-'
          ),
          h("el-input", {
            style: {
              width: "45%",
            },
            props: {
              placeholder: "例如(1-10)",
              value: this.condition.pricee2,
              size: "mini",
            },
            on: {
              input: value => {
                this.condition.pricee2 = value;
                this.$emit("input", value);
              },
              change: value => {
                this.filter();
              }
            }
          })
        ]);
      } else if ($index === 4) {
        return h("div", [
          h("el-input", {
            style: {
              width: "45%",
            },
            props: {
              value: this.condition.ratinge1,
              size: "mini"
            },
            on: {
              input: value => {
                this.condition.ratinge1 = value;
                this.$emit("input", value);
              },
              change: value => {
                this.filter();
              }
            }
          }),
          h(
            'span', {}, '-'
          ),
          h("el-input", {
            style: {
              width: "45%",
            },
            props: {
              value: this.condition.ratinge2,
              size: "mini"
            },
            on: {
              input: value => {
                this.condition.ratinge2 = value;
                this.$emit("input", value);
              },
              change: value => {
                this.filter();
              }
            }
          })
        ]);
      } else if ($index === 5) {
        return h("div", [
          h("el-input", {
            style: {
              width: "95%",
            },
            props: {
              value: this.condition.storeId,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.condition.storeId = value;
                this.$emit("input", value);
              },
              change: value => {
                this.filter();
              }
            }
          })
        ]);
      } else if ($index === 6) {
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
      } else if ($index === 7) {
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
      } else if ($index === 8) {
        return h("el-date-picker", {
          props: {
            value: this.time3,
            size: "mini",
            type: "daterange"
          },
          style: {
            width: "95%",
            padding: "2px"
          },
          on: {
            input: value => {
              this.time3 = value;
              this.$emit("input", value);
            },
            change: value => {
              this.filter();
            }
          }
        });
      } else if ($index === 9) {
        return h("div", [
          h("el-input", {
            style: {
              width: "45%",
            },
            props: {
              value: this.condition.reviewsCounte1,
              size: "mini"
            },
            on: {
              input: value => {
                this.condition.reviewsCounte1 = value;
                this.$emit("input", value);
              },
              change: value => {
                this.filter();
              }
            }
          }),
          h(
            'span', {}, '-'
          ),
          h("el-input", {
            style: {
              width: "45%",
            },
            props: {
              placeholder: "例如(1-10)",
              value: this.condition.reviewsCounte2,
              size: "mini",
            },
            on: {
              input: value => {
                this.condition.reviewsCounte2 = value;
                this.$emit("input", value);
              },
              change: value => {
                this.filter();
              }
            }
          })
        ]);
      }
    },
    // getRowClass({ row, column, rowIndex, columnIndex }) {
    //   if (rowIndex == 0) {
    //     return "color:#337ab7;background:#f5f7fa";
    //   } else {
    //     return "";
    //   }
    // },
    handleSizeChange(val) {
      this.condition.pageSize = val;
      this.relation();
    },
    handleCurrentChange(val) {
      this.condition.page = val;
      this.relation();
    },
    relation() {
      if (this.condition.pricee1 && this.condition.pricee2) {
        this.condition.price = [this.condition.pricee1,this.condition.pricee2];
      } else {
        this.condition.price = [];
      }
      if (this.condition.ratinge1 && this.condition.ratinge2) {
        this.condition.rating = [this.condition.ratinge1,this.condition.ratinge2];
      } else {
        this.condition.rating = [];
      }
      if (this.condition.reviewsCounte1 && this.condition.reviewsCounte2) {
        this.condition.reviewsCount = [this.condition.reviewsCounte1,this.condition.reviewsCounte2];
      } else {
        this.condition.reviewsCount = [];
      }
      APIJoomCateProduct(this.condition).then(response => {
        if (response.data.code == 200) {
          this.tableData = response.data.data.items;
          this.total = response.data.data._meta.totalCount;
          this.condition.pageSize = response.data.data._meta.perPage;
          this.condition.page = response.data.data._meta.currentPage;
        } else {
          this.$message.error(res.data.message);
        }
      });
    }
  },
  mounted() {
    this.condition.cateId = this.$route.params.id;
    this.relation();
  }
};
</script>

<style lang="scss" scoped>
.joomCat {
  width: 100%;
  overflow: hidden;
  margin: auto;
  margin-top: 10px;
}
.classa {
  color: black;
  text-decoration: none;
}
.classared {
  color: #fff;
  text-decoration: none;
  background: #f78989;
  display: block;
  padding: 10px 5px;
  width: 90%;
  margin: auto;
  border-radius: 6px;
}
</style>

