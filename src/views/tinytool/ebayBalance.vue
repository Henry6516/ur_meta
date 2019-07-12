<template>
  <div>
    <div>
      <el-col :span="24" style="padding:10px 20px;">
        <el-button @click="exportExcel()" type="primary">导出表格</el-button>
      </el-col>
      <el-table :data="tabdate" :height="tableHeight" class="elTable" @sort-change="sortNumber">
        <el-table-column type="index" fixed align="center" header-align="center"></el-table-column>
        <el-table-column label="账号名称" header-align="center" prop="accountName" sortable="custom">
          <el-table-column prop="accountName" :render-header="renderHeaderPic" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="余额" header-align="center" sortable="custom" prop="balance">
          <el-table-column prop="balance" :render-header="renderHeaderPic" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="货币" header-align="center" sortable="custom" prop="currency">
          <el-table-column prop="currency" :render-header="renderHeaderPic" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="更新时间" header-align="center" sortable="custom" prop="updatedDate">
          <el-table-column prop="updatedDate" :render-header="renderHeaderPic" align="center"></el-table-column>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.reccondition.page"
        :page-sizes="[50, 100, 200]"
        :page-size="this.reccondition.pageSize"
        layout="total, sizes,slot, prev, pager, next, jumper"
        :total="this.total"
        style="padding-top:5px;padding-bottom:5px;"
      >
      <el-button type="text"
                       @click="showAll">显示全部</el-button>
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { APIEbayBalance,APIExportEbayBalance } from "../../api/product";
export default {
  data() {
    return {
      tableHeight: window.innerHeight - 157,
      total: 0,
      time1: null,
      tabdate: [],
      reccondition: {
        pageSize: null,
        page: 1,
        accountName: null,
        balance: null,
        currency: null,
        sort: null,
        updatedDate: []
      }
    };
  },
  methods: {
    showAll() {
      this.handleSizeChange(this.total)
    },
    exportExcel() {
      APIExportEbayBalance(this.reccondition).then(res => {
        const blob = new Blob([res.data], {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        var file = res.headers["content-disposition"]
          .split(";")[1]
          .split("filename=")[1];
        var filename = JSON.parse(file);
        const downloadElement = document.createElement("a");
        const objectUrl = window.URL.createObjectURL(blob);
        downloadElement.href = objectUrl;
        // const filename =
        //   "eBay_" + year + month + strDate + hour + minute + second;
        downloadElement.download = filename;
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);
      });
    },
    sortNumber(column, prop, order) {
      if (column.order == null) {
        this.reccondition.sort = null;
        this.getPic();
      }
      if (column.order == "ascending") {
        this.reccondition.sort = column.prop;
        this.getPic();
      }
      if (column.order == "descending") {
        this.reccondition.sort = "-" + column.prop;
        this.getPic();
      }
    },
    handleSizeChange(val) {
      this.reccondition.pageSize = val;
      this.getPic();
    },
    handleCurrentChange(val) {
      this.reccondition.page = val;
      this.getPic();
    },
    getPic() {
      APIEbayBalance(this.reccondition).then(response => {
        this.tabdate = response.data.data.items;
        this.total = response.data.data._meta.totalCount;
        this.reccondition.pageSize = response.data.data._meta.perPage;
        this.reccondition.page = response.data.data._meta.currentPage;
      });
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
        this.reccondition.updatedDate = [
          this.formatDate(this.time1[0]),
          this.formatDate(this.time1[1])
        ];
      } else {
        this.reccondition.updatedDate = [];
      }
      this.reccondition.pageSize=null
      this.getPic();
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
                value: this.reccondition.accountName,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.reccondition.accountName = value;
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
                value: this.reccondition.balance,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.reccondition.balance = value;
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
                value: this.reccondition.currency,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.reccondition.currency = value;
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
        return h("el-date-picker", {
          props: {
            value: this.time1,
            size: "mini",
            type: "daterange"
          },
          style: {
            width: "200px",
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
      }
    }
  },
  mounted() {
    this.getPic();
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 8rem auto;
  width: 40rem;
  padding: 6rem 2rem 2rem 4.5rem;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;

  .el-form-item {
    margin-bottom: 4rem;

    .el-input {
      width: 18rem;
    }

    .el-button {
      margin-left: 3rem;
    }
  }
}
.clasRed1 {
  color: #f56c6c;
  border: rgba(245, 108, 108, 0.2) solid 1px;
  background: rgba(245, 108, 108, 0.1);
  width: 50%;
  margin: auto;
  line-height: 32px;
  display: block;
  border-radius: 5px;
  margin-top: 8px;
  margin-bottom: 8px;
}
.clasGreen1 {
  color: #0e9a00;
  border-radius: 5px;
  width: 50%;
  margin: auto;
  line-height: 32px;
  display: block;
  border: rgba(3, 82, 38, 0.2) solid 1px;
  background: rgba(33, 170, 95, 0.1);
  margin-top: 8px;
  margin-bottom: 8px;
}
</style>

