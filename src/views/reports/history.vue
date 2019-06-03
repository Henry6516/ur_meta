<template>
  <div class="toolbar">
    <div
      class="demo-block demo-box demo-zh-CN demo-transition"
      @mouseover="changeActive"
      @mouseout="removeActive"
    >
      <transition name="el-fade-in-linear">
        <el-form
          :model="condition"
          :inline="true"
          ref="condition"
          class="demo-form-inline"
          label-width="6rem"
          v-show="show"
        >
          <el-form-item label="部门" class="input">
            <el-select
              size="small"
              v-model="condition.department"
              multiple
              collapse-tags
              placeholder="部门"
              @change="choosed"
            >
              <el-button plain type="info" @click="selectAll('department')">全选</el-button>
              <el-button plain type="info" @click="unselect('department')">取消</el-button>
              <el-option
                v-for="(item,index) in department"
                :index="index"
                :key="item.department"
                :label="item.department"
                :value="item.department"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二级部门" class="input">
            <el-select
              size="small"
              v-model="condition.secDepartment"
              multiple
              collapse-tags
              placeholder="二级部门"
              @change="secChoosed"
            >
              <el-button plain type="info" @click="selectAll('secDepartment')">全选</el-button>
              <el-button plain type="info" @click="unselect('secDepartment')">取消</el-button>
              <el-option
                v-for="(item,index) in secDepartment"
                :index="index"
                :key="item.department"
                :label="item.department"
                :value="item.department"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="销售平台" class="input">
            <el-select
              size="small"
              v-model="condition.plat"
              multiple
              collapse-tags
              placeholder="销售平台"
              style="height: 3rem;"
            >
              <el-button plain type="info" @click="selectAll('plat')">全选</el-button>
              <el-button plain type="info" @click="unselect('plat')">取消</el-button>
              <el-option
                v-for="(item,index) in plat"
                :index="index"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="销售员" class="input">
            <el-select
              size="small"
              v-model="condition.member"
              filterable
              multiple
              collapse-tags
              placeholder="销售员"
            >
              <el-button plain type="info" @click="selectAll('member')">全选</el-button>
              <el-button plain type="info" @click="unselect('member')">取消</el-button>
              <el-option
                v-for="(item,index) in member"
                :index="index"
                :key="item.username"
                :label="item.username"
                :value="item.username"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="日期"
            class="input"
            :rules="[{required: true, message: '请选择时间', trigger: 'blur'}]"
          >
            <el-date-picker
              size="small"
              v-model="time1"
              type="month"
              value-format="yyyy-MM"
              style="width:10rem;"
              placeholder="起始月"
              @change="settime"
            ></el-date-picker>
            -
            <el-date-picker
              size="small"
              v-model="time2"
              type="month"
              value-format="yyyy-MM"
              style="width:10rem;"
              placeholder="结束月"
              @change="gettime"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="onSubmit(condition)">查询</el-button>
          </el-form-item>
        </el-form>
      </transition>
      <div class="demo-block-control" @click="handleChange" style="left:0rem;">
        <transition>
          <i :class="{'el-icon-caret-bottom':isA,'el-icon-caret-top':!isA}" class="transition-i"></i>
        </transition>
        <transition>
          <span v-show="show1" class="transition-span">{{text}}</span>
        </transition>
      </div>
    </div>
    <el-table
      :data="tableData"
      v-show="tableData.length!=0"
      style="width:100%;margin-top:20px;"
      class="lrtable"
      max-height="700"
      :header-cell-style="getRowClass"
    >
      <el-table-column prop="username" label="人员" width="80" align="center" fixed></el-table-column>
      <el-table-column prop="department" label="部门" align="center" fixed></el-table-column>
      <el-table-column prop="plat" label="销售平台" align="center" fixed></el-table-column>
      <el-table-column prop="hireDate" label="入职日期" align="center" fixed :formatter="formatter"></el-table-column>
      <el-table-column label="历史利润表" align="center">
        <el-table-column :label="item" align="center" v-for="(item,index) in list" :key="index">
          <template scope="scope">
            <span
              :class="scope.row.historyProfit[index].lr==1?'redd1':'red1'"
            >{{scope.row.historyProfit[index].profit}}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="历史排名" align="center">
        <el-table-column :label="item" align="center" v-for="(item,index) in list" :key="index">
          <template scope="scope">
            <span
              :class="scope.row.historyRank[index].rank>scope.row.departmentTotal/2?'redd':'red1'"
            >{{scope.row.historyRank[index].rank}}/{{scope.row.departmentTotal}}</span>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <div class="abcSs">
      <button
        v-show="tableData.length!=0"
        style="margin-left:15px;margin-top:20px;"
        type="primary"
        @click="dexz()"
      >{{defaultay}}</button>
    </div>
    <div class="abcSp">
      <Myecharts
        style="max-height:800px;overflow:auto"
        :options="options"
        v-loading="listLoading"
        element-loading-text="正在加载中..."
        ref="myecharts"
      ></Myecharts>
    </div>
    <div class="abcSp">
      <Chart
        style="max-height:800px;overflow:auto"
        :options="options1"
        v-loading="listLoading"
        element-loading-text="正在加载中..."
        ref="myechart"
      ></Chart>
      <div class="abcSs1">
        <button
          v-show="tableData.length!=0"
          style="margin-left:15px;margin-top:10px;"
          type="primary"
          @click="dexz1()"
        >{{defaultay1}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getSection,
  getSecDepartment,
  getPlatform,
  getMember,
  getAccount,
  getSalestrend,
  getProfitReport,
  APIOrderCount,
  APISkuCount,
  getHistoryRank,
  getHistoryProfit,
  getHistorySalesProfit,
  getHistoryPlat
} from "../../api/profit";
import { getMonthDate } from "../../api/tools";
import { getMenu } from "../../api/login";
import Chart from "../../component/order/Orderchart";
import SkuChart from "../../component/sku/Skuchart";
import profit from "../../component/profit/profit";

export default {
  components: {
    Chart,
    SkuChart,
    profit
  },
  data() {
    return {
      sale: true,
      order: false,
      count: false,
      defaultay: "全不选",
      defaultay1: "全不选",
      pro: false,
      time1: null,
      time2: null,
      allMenu: [],
      tableData: [],
      activeName: "销售额走势",
      allMember: [],
      list: [],
      isA: true,
      text: "显示输入框",
      id: "test",
      options: {
        title: {
          text: "销售额走势($)"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          type: "scroll",
          width: "70%",
          left: "10.5%",
          data: [String]
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar", "stack", "tiled"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [String]
          }
        ],
        yAxis: [
          {
            type: "value",
            inverse: true,
            axisLabel: {
              formatter: "{value} $"
            }
          }
        ],
        series: [Object]
      },
      options1: {
        title: {
          text: "销售额走势($)"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          type: "scroll",
          width: "70%",
          left: "10.5%",
          data: [String]
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar", "stack", "tiled"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [String]
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value} $"
            }
          }
        ],
        series: [Object]
      },
      show: true,
      show1: false,
      searchTable: [],
      searchValue: "",
      listLoading: false,
      plat: [],
      member: [],
      account: [],
      department: [],
      allSecDp: [],
      secDepartment: [],
      dateType: [{ id: 1, type: "发货时间" }, { id: 0, type: "交易时间" }],
      flag: [{ id: 0, type: "按天" }, { id: 2, type: "按月" }],
      dateRange: [],
      condition: {
        department: [],
        member: [],
        plat: [],
        dateRange: []
      }
    };
  },
  methods: {
    dexz() {
      var selectAll = this.options.legend.data;
      if (this.defaultay == "全不选") {
        var val = false;
        this.defaultay = "全选";
      } else {
        var val = true;
        this.defaultay = "全不选";
      }
      var obj = {};
      for (var key in selectAll) {
        obj[selectAll[key]] = val;
      }
      this.options.legend.selected = obj;
      this.$refs.myecharts.drawAreaStack(this.options);
    },
    dexz1() {
      var selectAll = this.options1.legend.data;
      if (this.defaultay1 == "全不选") {
        var val = false;
        this.defaultay1 = "全选";
      } else {
        var val = true;
        this.defaultay1 = "全不选";
      }
      var obj = {};
      for (var key in selectAll) {
        obj[selectAll[key]] = val;
      }
      this.options1.legend.selected = obj;
      this.$refs.myechart.drawAreaStack(this.options1);
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      const indexDel = this.list.length;
      if (rowIndex === 0 && columnIndex <= 3) {
        return "background: rgb(236, 245, 255);color:#666";
      }
      if (rowIndex === 0 && columnIndex === 5) {
        return "background: #C0C4CC;color:#666";
      }
      if (rowIndex === 0 && columnIndex === 4) {
        return "background: rgb(248, 209, 158);color:#666";
      }
      if (rowIndex === 1 && columnIndex >= indexDel) {
        return "background: #C0C4CC;color:#666";
      }
      if (rowIndex === 1 && columnIndex < indexDel) {
        return "background: rgb(248, 209, 158);color:#666";
      }
    },
    settime(e) {
      this.condition.dateRange[0] = this.time1;
    },
    gettime(e) {
      this.condition.dateRange[1] = this.time2;
    },
    selectAll(name) {
      if (name === "member") {
        this.condition["member"] = this["member"].map(ele => ele["username"]);
      } else if (name === "account") {
        this.condition["account"] = this[name].map(ele => ele["store"]);
      } else if (name === "department") {
        this.condition[name] = this[name].map(ele => ele[name]);
        this.member = this.allMember;
      } else if (name === "secDepartment") {
        this.condition[name] = this[name].map(ele => ele.department);
        this.member = this.allMember;
      } else {
        this.condition[name] = this[name].map(ele => ele[name]);
      }
    },
    unselect(name) {
      if (name === "department") {
        this.member = this.allMember;
      }
      this["condition"][name] = [];
    },
    choosed() {
      let res = [];
      const val = this.condition.department;

      // 二级部门处理
      const allDepartments = this.department;
      const allDepartmentsMap = {};
      for (let i = 0; i < allDepartments.length; i++) {
        allDepartmentsMap[allDepartments[i].id] = allDepartments[i].department;
      }

      // 人员处理
      res = this.allMember;
      let per = [];
      const secDep = [];
      this.member = [];
      this.condition.member = [];
      if (val.length !== 0) {
        for (let i = 0; i < val.length; i++) {
          // 部门
          for (let k = 0; k < this.allSecDep.length; k++) {
            if (allDepartmentsMap[this.allSecDep[k].parent] === val[i]) {
              secDep.push(this.allSecDep[k]);
            }
          }

          // 人员
          per = res.filter(
            ele =>
              (ele.department === val[i] || ele.parent_department === val[i]) &&
              ele.position === "销售"
          );
          this.member = this.member.concat(per);
        }
        this.secDepartment = secDep;
      } else {
        this.member = res;
        this.secDepartment = this.allSecDep;
      }
    },
    secChoosed() {
      // 值变化之后人员要处理
      let res = [];
      const val = this.condition.secDepartment;
      // 人员处理
      res = this.allMember;
      let per = [];
      this.member = [];
      this.condition.member = [];
      if (val.length !== 0) {
        for (let i = 0; i < val.length; i++) {
          // 人员
          per = res.filter(
            ele => ele.department === val[i] && ele.position === "销售"
          );
          this.member = this.member.concat(per);
        }
      } else {
        this.member = res;
      }
    },
    formatter(row, column) {
      return row.hireDate ? row.hireDate.substring(0, 10) : "";
    },
    handleChange() {
      this.show = !this.show;
      this.isA = !this.isA;
      if (this.show === false) {
        this.text = "显示输入框";
      } else if (this.show === true) {
        this.text = "隐藏输入框";
      }
    },
    changeActive() {
      this.show1 = true;
    },
    removeActive() {
      this.show1 = false;
    },
    onSubmit(form) {
      const myform = JSON.parse(JSON.stringify(form));
      if (myform.dateRange.length < 2) {
        this.$message.error("请选择日期");
      } else {
        this.$refs.condition.validate(valid => {
          if (valid) {
            this.listLoading = true;
            if (
              this.condition.department.length === 0 &&
              this.condition.member.length === 0
            ) {
              myform.member = this.member.map(m => {
                return m.username;
              });
            } else if (
              this.condition.department.length !== 0 &&
              this.condition.member.length === 0
            ) {
              const val = form.department;
              const res = this.allMember;
              for (let i = 0; i < val.length; i++) {
                const per = res.filter(
                  ele =>
                    (ele.department === val[i] ||
                      ele.parent_depart === val[i]) &&
                    ele.position === "销售"
                );
                this.member.concat(per);
              }
              myform.member = this.member.map(m => {
                return m.username;
              });
            } else if (this.condition.member.lenght !== 0) {
              myform.member = this.condition.member;
            }
            getHistorySalesProfit(myform).then(response => {
              this.list = [];
              this.tableData = response.data.data;
              let addDy = this.tableData[0].historyProfit;
              for (let i = 0; i < addDy.length; i++) {
                this.list.push(addDy[i].month);
              }
              for (let i = 0; i < this.tableData.length; i++) {
                this.tableData[i].avgProfit = Number(
                  this.tableData[i].avgProfit
                );
              }
              for (let k = 0; k < this.tableData.length; k++) {
                var lr = -1000000;
                for (
                  let j = 0;
                  j < this.tableData[k].historyProfit.length;
                  j++
                ) {
                  this.tableData[k].historyProfit[j].profit = Number(
                    this.tableData[k].historyProfit[j].profit
                  ).toFixed(0);
                  if (
                    Number(this.tableData[k].historyProfit[j].profit) <
                    Number(lr)
                  ) {
                    this.tableData[k].historyProfit[j].lr = 1;
                    lr = this.tableData[k].historyProfit[j].profit;
                  } else {
                    this.tableData[k].historyProfit[j].lr = 0;
                    lr = this.tableData[k].historyProfit[j].profit;
                  }
                }
              }
            });
            if (myform.plat.length == 0) {
              myform.plat = this.plat;
            }
            getHistoryRank(myform).then(response => {
              this.listLoading = false;
              const ret = response.data.data;
              const lineName = [];
              const series = [];
              ret.forEach(element => {
                if (lineName.indexOf(element.title) < 0) {
                  lineName.push(element.title);
                }
              });
              const date = [];
              lineName.forEach(name => {
                const sery = {
                  type: "line",
                  smooth: true
                };
                const amt = [];
                ret.map(element => {
                  if (element.title === name) {
                    amt.push(Number(element.rank));
                    if (date.indexOf(element.monthName) < 0) {
                      date.push(element.monthName);
                    }
                  }
                });
                sery["data"] = amt;
                sery["name"] = name;
                series.push(sery);
              });
              this.options.legend.data = lineName;
              this.options.xAxis[0].data = date;
              this.options.series = series;
              this.$refs.myecharts.drawAreaStack(this.options);
            });
            this.options.title.text = "历史排名走势";
            this.options.yAxis[0].axisLabel.formatter = "{value}";
            getHistoryProfit(myform).then(response => {
              this.listLoading = false;
              const ret = response.data.data;
              const lineName = [];
              const series = [];
              ret.forEach(element => {
                if (lineName.indexOf(element.title) < 0) {
                  lineName.push(element.title);
                }
              });
              const date = [];
              lineName.forEach(name => {
                const sery = {
                  type: "line",
                  smooth: true
                };
                const amt = [];
                ret.map(element => {
                  if (element.title === name) {
                    amt.push(Number(element.profit));
                    if (date.indexOf(element.monthName) < 0) {
                      date.push(element.monthName);
                    }
                  }
                });
                sery["data"] = amt;
                sery["name"] = name;
                series.push(sery);
              });
              this.options1.legend.data = lineName;
              this.options1.xAxis[0].data = date;
              this.options1.series = series;
              this.$refs.myechart.drawAreaStack(this.options1);
            });
            this.options1.title.text = "历史利润走势";
            this.options1.yAxis[0].axisLabel.formatter = "{value}";
          }
        });
      }
    }
  },
  mounted() {
    // 权限
    getMenu().then(response => {
      const res = response.data.data;
      const menu = res.filter(e => e.name === "毛利润报表");
      if (menu[0].children[0].tabs.length) {
        this.allMenu = menu[0].children[0].tabs;
      }
    });
    getMember().then(response => {
      const res = response.data.data;
      this.allMember = this.member = res.filter(ele => ele.position === "销售");
    });
    getSection().then(response => {
      const res = response.data.data;
      this.department = res.filter(
        ele => ele.department && ele.type === "业务"
      );
    });
    getSecDepartment().then(reseponse => {
      const res = reseponse.data.data;
      this.secDepartment = this.allSecDep = res;
    });
    getHistoryPlat().then(response => {
      this.plat = response.data.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.el-form {
  margin-bottom: 20px;
  .el-form-item {
    margin-bottom: 0rem;
  }
}
.redd1 {
  color: rgb(247, 247, 64);
  display: block;
  width: 100%;
  background: #f16363;
  color: #fff;
  padding: 10px 0;
}
.redd {
  display: block;
  width: 100%;
  background: #f87c7c;
  color: #fff;
  padding: 10px 0;
}
.red1 {
  padding: 10px 0;
  display: block;
  width: 100%;
}
.abcSp {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: #fff;
}
.abcSs {
  position: absolute;
  right: 220px;
  margin-top: 19px;
  z-index: 999;
}
.abcSs1 {
  position: absolute;
  right: 220px;
  margin-top: 24px;
  z-index: 999;
}
.abcSs span {
  display: block;
}
@media screen and (max-width: 1361px) {
  .abcSs {
    position: absolute;
    right: 20px;
    margin-top: -10px;
    z-index: 999;
  }
  .abcSs1 {
    position: absolute;
    right: 20px;
    margin-top: -10px;
    z-index: 999;
  }
}
</style>
<style>
.lrtable td {
  padding: 0;
}
.lrtable .cell {
  padding: 0;
}
</style>
