<template>
  <!-- <div>销售毛利润报表</div>     -->
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
          label-width="95px"
          class="demo-form-inline"
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
          <el-form-item label="平台" class="input">
            <el-select size="small" v-model="condition.plat" clearable placeholder="平台">
              <el-option
                v-for="(item,index) in plat"
                :index="index"
                :key="item.plat"
                :label="item.plat"
                :value="item.plat"
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

          <el-form-item label="账号" class="input">
            <el-select
              size="small"
              v-model="condition.account"
              filterable
              multiple
              collapse-tags
              placeholder="账号"
            >
              <el-button plain type="info" @click="selectall">全选</el-button>
              <el-button plain type="info" @click="noselect">取消</el-button>
              <el-option
                v-for="(item,index) in account"
                :index="item[index]"
                :key="item.id"
                :label="item.store"
                :value="item.store"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出货仓库" class="input">
            <el-select
              size="small"
              v-model="condition.store"
              filterable
              multiple
              collapse-tags
              placeholder="请选择"
            >
              <el-button plain type="info" @click="selectalls">全选</el-button>
              <el-button plain type="info" @click="noselects">取消</el-button>
              <el-option v-for="item in store" :key="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input size="small" v-model="condition.goodsName" style="width:215px;"></el-input>
          </el-form-item>

          <el-form-item label="商品编码">
            <el-input size="small" v-model="condition.sku" style="width:215px;"></el-input>
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
                style="width:102px"
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
              type="daterange"
              value-format="yyyy-MM-dd"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions2"
              style="width:215px;"
            ></el-date-picker>
          </el-form-item>
          <el-form-item
            label="开发时间"
            class="input"
            prop="devDateRange"
            :rules="[{required: true, message: '请选择时间', trigger: 'blur'}]"
          >
            <el-date-picker
              size="small"
              v-model="condition.devDateRange"
              type="daterange"
              value-format="yyyy-MM-dd"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions2"
              style="width:215px;"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" class="input" @click="onTop(condition)">查询</el-button>
          </el-form-item>
        </el-form>
      </transition>
      <div class="demo-block-control" @click="handleChange" style="left:0rem">
        <transition>
          <i :class="{'el-icon-caret-bottom':isA,'el-icon-caret-top':!isA}" class="transition-i"></i>
        </transition>
        <transition>
          <span v-show="show1" class="transition-span">{{text}}</span>
        </transition>
      </div>
    </div>
    <el-row>
      <el-col :span="2" :offset="19">
        <el-input clearable placeholder="search" v-model="searchValue" @change="handleSearch"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button style="float:left" type="default" @click="exportExcel(condition)">导出Excel</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="this.tableData"
      id="sale-table"
      size="mini"
      v-loading="listLoading"
      element-loading-text="正在加载中..."
      @sort-change="sortNumber"
      :show-summary="showSum"
      :summary-method="getSummaries"
      :height="tableHeight"
      :max-height="tableHeight"
      ref="table"
      border
      class="elTable"
      :header-cell-style="getRowClass"
      style="width: 100%;font-size:12px;"
    >
      <el-table-column prop="suffix" label="账号" align="center"></el-table-column>
      <el-table-column prop="pingtai" label="平台" align="center"></el-table-column>
      <el-table-column prop="salesman" label="销售员" align="center"></el-table-column>
      <el-table-column
        prop="GoodsCode"
        label="商品编码"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="GoodsName"
        label="商品名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="SalerName"
        label="开发员"
        align="center"
      ></el-table-column>
      <el-table-column prop="devDate" label="开发时间" align="center">
        <template slot-scope="scope">
          {{scope.row.devDate | cutOutDate}}
        </template>
      </el-table-column>
      <el-table-column prop="SKUQty" label="销量" align="center" sortable="custom"></el-table-column>
      <el-table-column
        prop="SaleMoneyRmb"
        label="销售额"
        align="center"
        sortable="custom"
      >
      <template slot-scope="scope">
        {{scope.row.SaleMoneyRmb | cutOut}}
      </template>
      </el-table-column>
      <el-table-column
        prop="refund"
        label="退款￥"
        align="center"
        sortable="custom"
      >
      <template slot-scope="scope">
        {{scope.row.refund | cutOut}}
      </template>
      </el-table-column>
      <el-table-column
        prop="ProfitRmb"
        label="利润￥"
        align="center"
        sortable="custom"
      >
      <template slot-scope="scope">
        {{scope.row.ProfitRmb | cutOut}}
      </template>
      </el-table-column>
      <el-table-column prop="rate" label="利润率%" align="center" sortable="custom">
        <template slot-scope="scope">
          {{scope.row.rate | cutOut}}
        </template>
      </el-table-column>
      <el-table-column
        prop="refundRate"
        label="退款利润占比%"
        align="center"
        sortable="custom"
      >
      <template slot-scope="scope">
        {{scope.row.refundRate | cutOut}}
      </template>
      </el-table-column>
    </el-table>
    <el-col class="toolbar" v-show="total>0">
      <div class="pagination-container">
        <el-pagination
          :current-page="this.condition.start"
          :page-sizes="[50,100,200,500,1000]"
          :page-size="this.condition.limit"
          background
          layout="total, sizes, slot, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :total="this.total"
        >
          <span>
            <el-button type="text" @click="showAll">显示全部</el-button>
          </span>
        </el-pagination>
      </div>
    </el-col>
  </div>
</template>

<script>
import {
  getSection,
  getPlatform,
  getMember,
  getStore,
  getAccount,
  getaccount
} from "../../api/profit";
import { APIAccountExport } from "../../api/product";
import { compareUp, compareDown, getMonthDate } from "../../api/tools";
export default {
  data() {
    return {
      totalQty:null,
      totalSaleMoney:null,
      totalRefund:null,
      totalProfitRmb:null,
      totalRate:null,
      totalRefundRate:null,
      showSum:true,
      flagShowAll:false,
      currentPage: 1,
      pageSize: null,
      total: null,
      tableHeight: window.innerHeight - 285,
      allMember: [],
      isA: true,
      text: "显示输入框",
      show: true,
      show1: false,
      show2: false,
      tableData: [],
      searchTable: [],
      searchValue: "",
      listLoading: false,
      department: [],
      plat: "",
      member: [],
      store: [],
      dateType: [{ id: 1, type: "发货时间" }, { id: 0, type: "交易时间" }],
      dateRange: [],
      account: [],
      condition: {
        department: [],
        plat: "",
        member: [],
        store: [],
        sku: "",
        devDateRange:[],
        goodsName: "",
        dateType: 1,
        sort:null,
        dateRange: [],
        account: [],
        start: 1,
        limit: 50
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
  filters: {
    cutOut: function(value) {
      value = Number(value).toFixed(2);
      return value;
    },
    cutOutDate(value){
      value = value.substring(0, 11);
      return value;
    },
  },  
  methods: {
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "color:#3c8dbc;background:#f5f7fa";
      } else {
        return "";
      }
    },
    showAll() {
      this.flagShowAll=true
      this.condition.start=1
      this.tableData=[]
      this.onSubmit(this.condition);
    },
    onTop(form){
      this.flagShowAll=false
      form.start = 1 
      form.limit = 50;
      this.onSubmit(form);
    },
    handleCurrentChange(val) {
      // this.currentPage = val
      // this.condition.start = (this.currentPage - 1) * this.pageSize + 1
      // this.condition.limit = this.pageSize
      // this.listLoading = true
      // getaccount(this.condition).then(response => {
      //   this.listLoading = false
      //   this.tableData = this.searchTable = response.data.data.items
      //   this.total = Number(response.data.data.totalCount)
      // })
      this.flagShowAll=false
      this.condition.start = val;
      this.onSubmit(this.condition);
    },
    handleSizeChange(val) {
      // this.pageSize = val
      // this.currentPage = 1
      // this.condition.limit = this.pageSize * this.currentPage
      // this.listLoading = true
      // getaccount(this.condition).then(response => {
      //   this.listLoading = false
      //   this.tableData = this.searchTable = response.data.data.items
      //   this.total = Number(response.data.data.totalCount)
      // })
      if(this.flagShowAll){
        this.flagShowAll=false
        this.condition.start = 1 
        this.condition.limit = val;
        this.onSubmit(this.condition);
      }else{
      this.condition.limit = val;
      this.onSubmit(this.condition);
      }
    },
    selectalls() {
      const allValues = [];
      for (const item of this.store) {
        allValues.push(item);
      }
      this.condition.store = allValues;
    },
    noselects() {
      this.condition.store = [];
    },
    selectallm() {
      const allValues = [];
      for (const item of this.member) {
        allValues.push(item.username);
      }
      this.condition.member = allValues;
    },
    noselectm() {
      this.condition.member = [];
    },
    selectalld() {
      const allValues = [];
      for (const item of this.department) {
        allValues.push(item.department);
      }
      this.condition.department = allValues;
      this.member = this.allMember;
    },
    noselectd() {
      this.condition.department = [];
      this.member = this.allMember;
    },
    selectall() {
      const allValues = [];
      for (const item of this.account) {
        allValues.push(item.store);
      }
      this.condition.account = allValues;
    },
    noselect() {
      this.condition.account = [];
    },
    choosed() {
      let res = [];
      const val = this.condition.department;
      res = this.allMember;
      let per = [];
      this.member = [];
      this.condition.member = [];
      if (val !== "") {
        for (let i = 0; i < val.length; i++) {
          per = res.filter(
            ele =>
              (ele.department === val[i] || ele.parent_department === val[i]) &&
              ele.position === "销售"
          );
          this.member = this.member.concat(per);
        }
      } else {
        this.member = res;
      }
    },
    handleChange() {
      this.show = !this.show;
      this.isA = !this.isA;
      if (this.show === false) {
        this.text = "显示输入框";
        const height = document.getElementById("app").clientHeight;
        this.tableHeight = height - 167 + "px";
      } else if (this.show === true) {
        this.text = "隐藏输入框";
        const height = document.getElementById("app").clientHeight;
        this.tableHeight = height - 285 + "px";
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
      const height = document.getElementById("app").clientHeight;
      this.tableHeight = height - 285 + "px";
      this.show2 = true;
      this.$refs.condition.validate(valid => {
        if (valid) {
          if (myform.member.length === 0 && myform.department.lenght !== 0) {
            const val = form.department;
            const res = this.allMember;
            for (let i = 0; i < val.length; i++) {
              const per = res.filter(
                ele =>
                  (ele.department === val[i] ||
                    ele.parent_department === val[i]) &&
                  ele.position === "销售"
              );
              this.member.concat(per);
            }
            myform.member = this.member.map(m => {
              return m.username;
            });
          }
          this.listLoading = true;
          // this.currentPage = 1
          // this.condition.start = 0
          getaccount(myform).then(response => {
            this.listLoading = false;
            this.tableData = this.searchTable = response.data.data.items;
            this.totalProfitRmb=response.data.data.extra.totalProfitRmb
            this.totalQty=response.data.data.extra.totalQty
            this.totalRate=response.data.data.extra.totalRate
            this.totalRefund=response.data.data.extra.totalRefund
            this.totalRefundRate=response.data.data.extra.totalRefundRate
            this.totalSaleMoney=response.data.data.extra.totalSaleMoney
            if(this.flagShowAll){
              this.condition.limit=response.data.data._meta.totalCount;
            }else{
              this.total = response.data.data._meta.totalCount;
            this.condition.start = response.data.data._meta.currentPage;
            this.condition.limit = response.data.data._meta.perPage;
            }
          });
        } else {
          return false;
        }
      });
    },
    onSubmit1(form) {
      const myform = JSON.parse(JSON.stringify(form));
      const height = document.getElementById("app").clientHeight;
      this.tableHeight = height - 290 + "px";
      this.show2 = true;
      this.$refs.condition.validate(valid => {
        if (valid) {
          if (myform.member.length === 0 && myform.department.lenght !== 0) {
            const val = form.department;
            const res = this.allMember;
            for (let i = 0; i < val.length; i++) {
              const per = res.filter(
                ele =>
                  (ele.department === val[i] ||
                    ele.parent_department === val[i]) &&
                  ele.position === "销售"
              );
              this.member.concat(per);
            }
            myform.member = this.member.map(m => {
              return m.username;
            });
          }
          // this.currentPage = 1
          // this.condition.start = 0
          this.condition.start++
          myform.start++
          myform.limit=50
          getaccount(myform).then(response => {
            this.condition.limit=response.data.data._meta.totalCount;
            this.tableData=this.tableData.concat(response.data.data.items)
            this.totalProfitRmb=response.data.data.extra.totalProfitRmb
            this.totalQty=response.data.data.extra.totalQty
            this.totalRate=response.data.data.extra.totalRate
            this.totalRefund=response.data.data.extra.totalRefund
            this.totalRefundRate=response.data.data.extra.totalRefundRate
            this.totalSaleMoney=response.data.data.extra.totalSaleMoney
          });
        } else {
          return false;
        }
      });
    },
    // 搜索
    handleSearch() {
      const searchValue = this.searchValue && this.searchValue.toLowerCase();
      const data = this.searchTable;
      if (searchValue) {
        this.tableData = data.filter(function(row) {
          return Object.keys(row).some(function(key) {
            return (
              String(row[key])
                .toLowerCase()
                .indexOf(searchValue) > -1
            );
          });
        });
      } else {
        this.tableData = data;
      }
    },
    // 数字排序
    sortNumber(column, prop, order) {
      if(this.flagShowAll){
        if(column.order==null){
          this.condition.start=1
          this.condition.limit=50
          this.condition.sort=null;
          this.onSubmit(this.condition);
        }
        if (column.order == "ascending") {
          this.condition.start=1
          this.condition.limit=50
          this.condition.sort = column.prop;
          this.onSubmit(this.condition);
        }
        if (column.order == "descending") {
          this.condition.start=1
          this.condition.limit=50
          this.condition.sort ='-'+column.prop;
          this.onSubmit(this.condition);
        }
      }else{
        if(column.order==null){
          this.condition.sort=null;
          this.onSubmit(this.condition);
        }
        if (column.order == "ascending") {
          this.condition.sort = column.prop;
          this.onSubmit(this.condition);
        }
        if (column.order == "descending") {
          this.condition.sort ='-'+column.prop;
          this.onSubmit(this.condition);
        }
      }
      // const data = this.tableData;
      // if (column.order === "descending") {
      //   this.tableData = data.sort(compareDown(data, column.prop));
      // } else {
      //   this.tableData = data.sort(compareUp(data, column.prop));
      // }
    },
    // 小数和空值格式化
    empty(row, column, cellValue, index) {
      row.SaleMoneyRmb = Math.round(row.SaleMoneyRmb * 100) / 100;
      row.ProfitRmb = Math.round(row.ProfitRmb * 100) / 100;
      row.rate = Math.round(row.rate * 100) / 100;
      if (cellValue === "0") {
        return cellValue;
      } else {
        // return cellValue || "--";
        return cellValue || "--";
      }
    },
    // 导出
    exportExcel(form) {
      this.listLoading = true;
      const myform = JSON.parse(JSON.stringify(form));
      if (myform.member.length === 0 && myform.department.lenght !== 0) {
        const val = form.department;
        const res = this.allMember;
        for (let i = 0; i < val.length; i++) {
          const per = res.filter(
            ele =>
              (ele.department === val[i] || ele.parent_department === val[i]) &&
              ele.position === "销售"
          );
          this.member.concat(per);
        }
        myform.member = this.member.map(m => {
          return m.username;
        });
      }
      APIAccountExport(myform).then(res => {
        this.listLoading = false;
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
        //   "Wish_" + year + month + strDate + hour + minute + second;
        downloadElement.download = filename;
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);
      });
    },
    // 合计
    getSummaries(param) {
      if(this.flagShowAll){
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
          let arr=sums
          if(index==6){
              sums[index] = this.totalQty;
          }
          if(index==7){
              sums[index] = this.totalSaleMoney;
          }
          if(index==8){
              sums[index] = this.totalRefund;
          }
          if(index==9){
              sums[index] = this.totalProfitRmb;
          }
          if(index==10){
              sums[index] = this.totalRate;
          }
          if(index==11){
              sums[index] = this.totalRefundRate;
          }
        });
        // 退款率和利润率核算
        sums[fileds.indexOf("rate")] =
          Math.round(
            (sums[fileds.indexOf("ProfitRmb")] * 10000) /
              sums[fileds.indexOf("SaleMoneyRmb")]
          ) / 100;
        return sums;        
      }else{
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
          let arr=sums
          if(index==11){
              sums[index] = ((arr[8]/arr[9])*100).toFixed(2);
          }
        });
        // 退款率和利润率核算
        sums[fileds.indexOf("rate")] =
          Math.round(
            (sums[fileds.indexOf("ProfitRmb")] * 10000) /
              sums[fileds.indexOf("SaleMoneyRmb")]
          ) / 100;
        return sums;        
      }
    }
  },
  updated(){
    this.$nextTick(() => {
      this.$refs['table'].doLayout();
    }) 
  },
  mounted() {
    getSection().then(response => {
      const res = response.data.data;
      this.department = res.filter(
        ele => ele.department && ele.type === "业务"
      );
    });
    getPlatform().then(response => {
      this.plat = response.data.data;
    });
    getMember().then(response => {
      const res = response.data.data;
      this.allMember = this.member = res.filter(ele => ele.position === "销售");
    });
    getStore().then(response => {
      this.store = response.data.data;
    });
    getAccount().then(response => {
      this.account = response.data.data;
    });
    this.dom = this.$refs.table.bodyWrapper
        this.dom.addEventListener('scroll', () => {
            // 滚动距离
            let scrollTop = this.dom.scrollTop
            // 变量windowHeight是可视区的高度
            let windowHeight = this.dom.clientHeight || this.dom.clientHeight
            // 变量scrollHeight是滚动条的总高度
            let scrollHeight = this.dom.scrollHeight || this.dom.scrollHeight
            if (scrollTop + windowHeight === scrollHeight) {
                // 获取到的不是全部数据 当滚动到底部 继续获取新的数据
                if(this.flagShowAll){                 
                this.onSubmit1(this.condition)
                }
            }
        })
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
</style>

