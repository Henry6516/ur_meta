<template>
  <div>
    <div>
      <el-col :span="24" style="padding:15px 10px;">
        <el-select
          v-model="reccondition.department"
          multiple
          collapse-tags
          placeholder="部门"
          size="small"
          @change="choosed"
        >
          <el-button plain type="info" @click="selectalld">全选</el-button>
          <el-button plain type="info" @click="noselectd">取消</el-button>
          <el-option
            v-for="(item,index) in department"
            :index="index"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
        <el-select
          size="small"
          v-model="reccondition.accountName"
          filterable
          multiple
          collapse-tags
          placeholder="账号"
          style="margin-left:8px;"
        >
          <el-button plain type="info" @click="selectall">全选</el-button>
          <el-button plain type="info" @click="noselect">取消</el-button>
          <el-option
            v-for="(item,index) in account"
            :index="index"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
        <el-select
          size="small"
          v-model="reccondition.username"
          filterable
          multiple
          collapse-tags
          placeholder="销售员"
          style="margin-left:8px;"
        >
          <el-button plain type="info" @click="selectallm">全选</el-button>
          <el-button plain type="info" @click="noselectm">取消</el-button>
          <el-option
            v-for="(item,index) in member"
            :index="index"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
        <el-button @click="search()" type="primary" style="margin-left:8px;" size="small">查询</el-button>
        <el-button @click="exportExcel()" type="primary" size="small">导出表格</el-button>
      </el-col>
      <el-table
        :data="tabdate"
        :height="tableHeight"
        class="elTable"
        @sort-change="sortNumber"
        v-loading="load1"
      >
        <el-table-column type="index" fixed align="center" header-align="center"></el-table-column>
        <el-table-column label="账号名称" header-align="center" prop="accountName" sortable="custom">
          <el-table-column prop="accountName" :render-header="renderHeaderPic" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="销售" header-align="center" prop="username" sortable="custom">
          <el-table-column prop="username" :render-header="renderHeaderPic" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="部门" header-align="center" prop="department" sortable="custom">
          <el-table-column prop="department" :render-header="renderHeaderPic" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="出账单时间" header-align="center" prop="balanceTime" sortable="custom">
          <el-table-column prop="balanceTime" :render-header="renderHeaderPic" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="余额" header-align="center" sortable="custom" prop="balance">
          <el-table-column prop="balance" :render-header="renderHeaderPic" align="center">
            <template slot-scope="scope">
              <span
                :class="scope.row.balance>0?'clasRedd':scope.row.balance<0?'clasGreen':''"
              >{{scope.row.balance}}</span>
            </template>
          </el-table-column>
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
        <el-button type="text" @click="showAll">显示全部</el-button>
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { APIEbayBalance, APIExportEbayBalance } from "../../api/product";
import { getEbayBalanceConditon } from "../../api/profit";
export default {
  data() {
    return {
      tableHeight: window.innerHeight - 160,
      total: 0,
      time1: null,
      load1: false,
      tabdate: [],
      date: [],
      account: [],
      account1: [],
      department: [],
      member: [],
      member1: [],
      reccondition: {
        pageSize: null,
        page: 1,
        accountName: [],
        balance: null,
        username: [],
        department: [],
        currency: null,
        sort: null,
        balanceTime: null,
        updatedDate: []
      }
    };
  },
  methods: {
    choosed() {
      const val = this.reccondition.department;
      let per = [];
      const secDep = [];
      const user = [];
      if (val.length !== 0) {
        for (let i = 0; i < val.length; i++) {
          // 账号
          for (let k = 0; k < this.date.length; k++) {
            if (this.date[k].department === val[i]) {
              secDep.push(this.date[k].store);
            }
          }
        }
        for (let i = 0; i < val.length; i++) {
          // 人员
          for (let k = 0; k < this.date.length; k++) {
            if (this.date[k].department === val[i]) {
              user.push(this.date[k].username);
            }
          }
        }
        function unique1(arr) {
          var hash = [];
          for (var i = 0; i < arr.length; i++) {
            if (hash.indexOf(arr[i]) == -1) {
              hash.push(arr[i]);
            }
          }
          return hash;
        }
        this.account = unique1(secDep);
        this.member = unique1(user);
      } else {
        this.member = this.member1;
        this.account = this.account1;
      }
    },
    selectallm() {
      const allValues = [];
      for (const item of this.member) {
        allValues.push(item.username);
      }
      this.reccondition.username = allValues;
    },
    noselectm() {
      this.reccondition.username = [];
    },
    search() {
      this.getPic();
    },
    selectall() {
      const allValues = [];
      for (const item of this.account) {
        allValues.push(item.store);
      }
      this.reccondition.accountName = allValues;
    },
    noselect() {
      this.reccondition.accountName = [];
    },
    selectalld() {
      const allValues = [];
      for (const item of this.department) {
        allValues.push(item.department);
      }
      this.reccondition.department = allValues;
      this.member = this.allMember;
    },
    noselectd() {
      this.reccondition.department = [];
      this.member = this.member1;
      this.account = this.account1;
    },
    showAll() {
      this.handleSizeChange(this.total);
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
      this.load1 = true;
      APIEbayBalance(this.reccondition).then(response => {
        this.load1 = false;
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
      this.reccondition.pageSize = null;
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
                value: this.reccondition.username,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.reccondition.username = value;
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
                value: this.reccondition.department,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.reccondition.department = value;
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
                value: this.reccondition.balanceTime,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.reccondition.balanceTime = value;
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
      } else if ($index === 6) {
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
    function unique1(arr) {
      var hash = [];
      for (var i = 0; i < arr.length; i++) {
        if (hash.indexOf(arr[i]) == -1) {
          hash.push(arr[i]);
        }
      }
      return hash;
    }
    getEbayBalanceConditon().then(response => {
      this.date = response.data.data;
      let depart = [];
      let member = [];
      let account = [];
      for (let i = 0; i < response.data.data.length; i++) {
        if (response.data.data[i].department != null) {
          depart.push(response.data.data[i].department);
        }
        if (response.data.data[i].username != null) {
          member.push(response.data.data[i].username);
        }
        if (response.data.data[i].store != null) {
          account.push(response.data.data[i].store);
        }
      }
      this.department = unique1(depart).reverse();
      this.member = unique1(member);
      this.member1 = unique1(member);
      this.account = account;
      this.account1 = account;
    });
    // getSection().then(response => {
    //   const res = response.data.data;
    //   this.department = res.filter(
    //     ele => ele.department && ele.type === "业务"
    //   );
    // });
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
.clasRedd {
  font-weight: bold;
  color: red;
}
.clasGreen {
  font-weight: bold;
  color: #0e9a00;
}
</style>

