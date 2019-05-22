<template>
  <!-- <div>采购毛利润报表</div>     -->
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
          label-width="6.8rem"
          class="demo-form-inline"
          v-show="show"
        >
          <el-form-item label="部门" class="input">
            <el-select
              size="small"
              v-model="formInline.region"
              multiple
              collapse-tags
              placeholder="部门"
              @change="choosed"
            >
              <el-button plain type="info" @click="selectalld">全选</el-button>
              <el-button plain type="info" @click="noselectd">取消</el-button>
              <el-option
                v-for="(item,index) in department"
                :index="index"
                :key="item.department"
                :label="item.department"
                :value="item.department"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开发员" class="input">
            <el-select
              size="small"
              v-model="condition.developer"
              filterable
              multiple
              collapse-tags
              placeholder="开发员"
            >
              <el-button plain type="info" @click="selectallm">全选</el-button>
              <el-button plain type="info" @click="noselectm">取消</el-button>
              <el-option
                v-for="(item,index) in member"
                :index="index"
                :key="item.username"
                :label="item.username"
                :value="item.username"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间类型" class="input" prop="dateType">
            <el-radio-group v-model="condition.dateType">
              <el-radio
                border
                v-for="(item,index) in dateType"
                :index="index"
                :key="item.id"
                :label="item.id"
                :value="item.id"
              >{{item.type}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="日期"
            class="input"
            prop="dateRange"
            :rules="[{required: true, message: '请选择时间', trigger: 'blur'}]"
          >
            <el-date-picker
              size="small"
              v-model="condition.dateRange"
              value-format="yyyy-MM-dd"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions2"
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
      id="sale-table"
      v-loading="listLoading"
      element-loading-text="正在加载中..."
      @sort-change="sortNumber"
      show-summary
      :summary-method="getSummaries"
      style="width: 100%"
    >
      <el-table-column prop="developer" width="108" label="归属人" :formatter="empty" sortable></el-table-column>
      <el-table-column
        width="185"
        prop="hasNumber"
        label="已有商品数(非清仓)"
        :formatter="empty"
        sortable="custom"
      ></el-table-column>
      <el-table-column
        width="180"
        prop="maxNumber"
        label="最多可拥有商品数"
        :formatter="empty"
        sortable="custom"
      ></el-table-column>
      <el-table-column
        width="130"
        prop="reduceNumber"
        label="需要砍商品数"
        :formatter="empty"
        sortable="custom"
      ></el-table-column>
      <el-table-column
        width="145"
        prop="avaliableNumber"
        label="还可开发商品数"
        :formatter="empty"
        sortable="custom"
      ></el-table-column>
      <el-table-column
        width="130"
        prop="soldNumber"
        label="出单数"
        :formatter="empty"
        sortable="custom"
      ></el-table-column>
      <el-table-column width="130" prop="soldRate" label="出单率" :formatter="empty" sortable="custom"></el-table-column>
      <el-table-column
        width="130"
        prop="monthSold"
        label="月销量"
        :formatter="empty"
        sortable="custom"
      ></el-table-column>
      <el-table-column
        width="130"
        prop="monthAmt"
        label="月销售额"
        :formatter="empty"
        sortable="custom"
      ></el-table-column>
      <el-table-column
        width="130"
        prop="monthProfit"
        label="月利润"
        :formatter="empty"
        sortable="custom"
      ></el-table-column>
      <el-table-column
        width="130"
        prop="profitRate"
        label="利润率"
        :formatter="empty"
        sortable="custom"
      ></el-table-column>
      <el-table-column
        width="150"
        prop="avgProfit"
        label="平均利润/款"
        :formatter="empty"
        sortable="custom"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  getMember,
  getDevLimit,
  getOtherDeadFee,
  getSection
} from "../../api/profit";
import { compareUp, compareDown, getMonthDate } from "../../api/tools";
import { isAdmin } from "../../api/api";

export default {
  data() {
    return {
      totalPrice: 0,
      currentPrice: 0,
      showis1: true,
      showis2: false,
      tableData1: [],
      dead: {
        dateType: [],
        dateRange: [],
        role: "developer",
        member: [],
        page: 1,
        pageSize: 10
      },
      totalpur: 0,
      tableHeight: 0,
      allMember: [],
      isA: true,
      text: "显示输入框",
      show: true,
      show1: false,
      show2: true,
      show3: false,
      activeName: "first",
      tableData01: [],
      tableData: [],
      tableData02: [],
      searchTableFirst: [],
      searchTableSecond: [],
      searchValue: "",
      listLoading: false,
      department: [],
      res: [],
      member: [],
      dateRange: [],
      dateType: [{ id: 1, type: "发货时间" }, { id: 0, type: "交易时间" }],
      formInline: {
        region: []
      },
      condition: {
        developer: [],
        dateType: 1,
        dateRange: []
      },
      tableMap: {
        first: {
          tableData: "tableData01",
          searchTable: "searchTableFirst"
        },
        second: {
          tableData: "tableData02",
          searchTable: "searchTableSecond"
        }
      },
      pickerOptions2: {
        shortcuts: [
          {
            text: "本月",
            onClick(vm) {
              const date = getMonthDate("thisMonth");
              vm.$emit("pick", [date["start"], date["end"]]);
            }
          },
          {
            text: "上个月",
            onClick(picker) {
              const date = getMonthDate("previousMonth");
              picker.$emit("pick", [date["start"], date["end"]]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const date = getMonthDate("lastMonth");
              picker.$emit("pick", [date["start"], date["end"]]);
            }
          }
        ]
      }
    };
  },
  methods: {
    selectalld() {
      const allValues = [];
      for (const item of this.department) {
        allValues.push(item.department);
      }
      this.formInline.region = allValues;
      this.member = this.allMember;
    },
    noselectd() {
      this.formInline.region = [];
      this.member = this.allMember;
    },
    selectallm() {
      const allValues = [];
      for (const item of this.member) {
        allValues.push(item.username);
      }
      this.condition.developer = allValues;
    },
    noselectm() {
      this.condition.developer = [];
    },
    choosed() {
      let res = [];
      this.member = [];
      this.condition.developer = [];
      const val = this.formInline.region;
      res = this.allMember;
      let per = [];
      if (val.length != 0) {
        for (let i = 0; i < val.length; i++) {
          per = res.filter(
            ele =>
              (ele.department === val[i] || ele.parent_department === val[i]) &&
              ele.position === "开发"
          );
          this.member = this.member.concat(per);
        }
      } else if (val.length == 0) {
        this.member = res;
      }
    },
    handleChange() {
      this.show = !this.show;
      this.isA = !this.isA;
      if (this.show === false) {
        this.text = "显示输入框";
        const height = document.getElementById("app").clientHeight;
        this.tableHeight = height - 145 + "px";
      } else if (this.show === true) {
        this.text = "隐藏输入框";
        const height = document.getElementById("app").clientHeight;
        this.tableHeight = height - 225 + "px";
      }
    },
    changeActive() {
      this.show1 = true;
    },
    removeActive() {
      this.show1 = false;
    },
    onSubmit(form) {
      let admin = "";
      const myform = JSON.parse(JSON.stringify(form));
      let ret;
      this.$refs.condition.validate(valid => {
        if (valid) {
          if (myform.developer.length > 0) {
            getDevLimit(myform).then(response => {
              this.listLoading = false;
              this.tableData = response.data.data;
            });
          } else if (
            myform.developer.length == 0 &&
            this.formInline.region.length === 0
          ) {
            myform.developer = this.member.map(m => {
              return m.username;
            });
            getDevLimit(myform).then(response => {
              this.listLoading = false;
              this.tableData = response.data.data;
            });
          } else if (
            this.formInline.region.length !== 0 &&
            myform.developer.length === 0
          ) {
            const val = this.formInline.region;
            const res = this.allMember;
            for (let i = 0; i < val.length; i++) {
              const per = res.filter(
                ele =>
                  (ele.department === val[i] ||
                    ele.parent_department === val[i]) &&
                  ele.position === "开发"
              );
              this.member.concat(per);
            }
            myform.developer = this.member.map(m => {
              return m.username;
            });
            getDevLimit(myform).then(response => {
              this.listLoading = false;
              this.tableData = response.data.data;
            });
          }
        }
      });
    },
    empty(row, column, cellValue, index) {
      row.totalamount = Math.round(row.totalamount * 100) / 100;
      if (!isNaN(cellValue)) {
        return Number(cellValue);
      }
      return cellValue;
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      const fileds = columns.map(item => item.property);
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        const values = data.map(item =>
          Number(item[column.property] ? item[column.property] : "unkonwn")
        );
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] = Math.round(sums[index] * 100) / 100;
        } else {
          sums[index] = "N/A";
        }
      });
      // 退款率和利润率核算
      sums[fileds.indexOf("netrate")] =
        Math.round(
          (sums[fileds.indexOf("netprofit")] * 10000) /
            sums[fileds.indexOf("salemoneyrmbzn")]
        ) / 100;
      return sums;
    },
    // 数字排序
    sortNumber(column, prop, order) {
      const data = this.tableData;
      if (column.order === "descending") {
        this.tableData = data.sort(compareDown(data, column.prop));
      } else {
        this.tableData = data.sort(compareUp(data, column.prop));
      }
    },
    sortNumber1(column, prop, order) {
      const data = this.tableData1;
      if (column.order === "descending") {
        this.tableData1 = data.sort(compareDown(data, column.prop));
      } else {
        this.tableData1 = data.sort(compareUp(data, column.prop));
      }
    }
  },
  mounted() {
    getSection().then(response => {
      const res = response.data.data;
      this.department = res.filter(
        ele => ele.department && ele.type === "业务"
      );
    });
    getMember().then(response => {
      const res = response.data.data;
      this.allMember = this.member = res.filter(ele => ele.position === "开发");
      this.res = res.filter(ele => ele.position === "主管");
    });
  }
};
</script>

<style lang="scss" scoped>
.el-form {
  margin-bottom: 20px;
  .el-form-item {
    margin-bottom: 0px;
  }
}
</style>
