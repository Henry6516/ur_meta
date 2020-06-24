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
          label-width="85px"
          class="demo-form-inline"
          v-show="show"
        >
          <el-form-item label="部门" class="input">
            <el-select
              size="small"
              v-model="formInline.region"
              multiple
              collapse-tags
              class="proinput"
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
              v-model="condition.developer"
              class="proinput"
              multiple
              collapse-tags
              size="small"
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
          <el-form-item label="产品状态" class="input">
            <el-select
              size="small"
              v-model="condition.goodsStatus"
              class="proinput"
              multiple
              collapse-tags
              placeholder="产品状态"
            >
              <el-option
                v-for="(item,index) in goodsState"
                :index="index"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="推荐人" class="input">
            <el-input v-model="condition.introducer" size="small" class="proinput" clearable></el-input>
          </el-form-item>
          <el-form-item label="商品编码" class="input">
            <el-input v-model="condition.goodsCode" size="small" class="proinput" clearable></el-input>
          </el-form-item>
          <el-form-item label="时间类型" class="input" prop="dateType">
            <el-radio-group v-model="condition.dateType">
              <el-radio
                border
                v-for="(item,index) in dateType"
                :index="index"
                :key="item.id"
                class="proradio"
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
              class="proinput"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions2"
            ></el-date-picker>
          </el-form-item>
          <el-form-item style="margin-left:25px">
            <el-button size="small" type="primary" @click="onSubmit(condition)">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="exportExcel(condition)" type="success" size="small">导出表格</el-button>
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
    <!-- <el-col :span="24" style="padding:10px 10px;">
      <el-button @click="exportExcel(condition)" type="primary">导出表格</el-button>
    </el-col> -->
    <el-dialog title="查看明细" :visible.sync="dialogTableVisible" width="58%">
      <el-table :data="viewForm" @sort-change="sortNumber1" border class="elTableee" :header-cell-style="getRowClass" max-height="530">
        <el-table-column property="saleMen" label="销售员" align="center"></el-table-column>
        <el-table-column property="goodsCode" label="产品编码" align="center"></el-table-column>
        <el-table-column property="sold" label="销量" sortable="custom" align="center"></el-table-column>
        <el-table-column property="amt" label="销售额(￥)" sortable="custom" align="center">
          <template slot-scope="scope">{{scope.row.amt | cutOut}}</template>
        </el-table-column>
        <el-table-column property="profit" label="总利润(￥)" sortable="custom" align="center">
          <template slot-scope="scope">{{scope.row.profit | cutOut}}</template>
        </el-table-column>
        <el-table-column property="rate" label="利润率(%)" sortable="custom" align="center">
          <template slot-scope="scope">{{(scope.row.rate*10000/100).toFixed(2)}}</template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="exportExcelMx()">导出明细</el-button>
        <el-button @click="dialogTableVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-table
      :data="tableData"
      id="sale-table"
      v-loading="listLoading"
      element-loading-text="正在加载中..."
      @sort-change="sortNumber"
      show-summary
      :summary-method="getSummaries"
      :height="tabheight"
      border 
      class="elTablTab"
      :header-cell-style="getRowClass" 
      style="width: 100%;font-size:13px;">
    >
      <el-table-column prop="developer" width="75" label="开发员" :formatter="empty" align="center" fixed></el-table-column>
      <el-table-column width="55" prop="sold" label="查看" :formatter="empty" align="center" fixed>
        <template slot-scope="scope">
          <span type="text" @click="view1(scope.$index, scope.row)" style="cursor:pointer">
            <i class="iconfont icon-yulan"></i>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        width="105"
        prop="goodsCode"
        label="产品编码"
        fixed
         align="center"
        :formatter="empty"
      ></el-table-column>
      <el-table-column prop="img" label="主图" fixed header-align="center" width="70">
          <template slot-scope="scope">
            <el-tooltip
              placement="right"
              :open-delay="10"
              class="exxHover"
              popper-class="page-login-toolTipClass"
            >
              <div slot="content">
                <img :src="scope.row.img" style="width: 300px;height: 300px;" />
              </div>
              <img :src="scope.row.img" style="width: 50px;height: 50px" />
            </el-tooltip>
            <!-- <img :src="scope.row.picUrl" style="width: 70px;height: 60px"> -->
          </template>
      </el-table-column>
      <el-table-column
        width="140"
        fixed
        prop="goodsName"
        label="商品名称"
        align="center"
        :formatter="empty"
      ></el-table-column>  
      <el-table-column width="105" prop="devDate" label="开发日期" :formatter="formatter" align="center"></el-table-column>
      <el-table-column
        width="90"
        prop="goodsStatus"
         align="center"
        label="产品状态"
        :formatter="empty"
      ></el-table-column>
      <el-table-column width="95" prop="introducer" label="推荐人" align="center">
        <template slot-scope="scope">
          {{scope.row.introducer?scope.row.introducer:'--'}}
        </template>
      </el-table-column>
      <el-table-column width="75" prop="sold" label="销量" :formatter="empty" sortable="custom" align="center"></el-table-column>
      <el-table-column width="95" prop="amt" label="销售额" :formatter="empty" sortable="custom" align="center">
        <template slot-scope="scope">{{scope.row.amt | cutOut1}}</template>
      </el-table-column>
      <el-table-column width="90" prop="profit" label="总利润" :formatter="empty" sortable="custom" align="center">
        <template slot-scope="scope">{{scope.row.profit | cutOut1}}</template>
      </el-table-column>
      <el-table-column width="110" prop="rate" label="利润率(%)" :formatter="empty" sortable="custom" align="center">
        <template slot-scope="scope">{{scope.row.rate | cutOut2}}</template>
      </el-table-column>
      <el-table-column
        width="108"
        prop="ebaySold"
         align="center"
        label="eBay销量"
        :formatter="empty"
        sortable="custom"
      ></el-table-column>
      <el-table-column
        width="125"
        prop="ebayProfit"
         align="center"
        label="eBay利润(￥)"
        :formatter="empty"
        sortable="custom"
      >
      <template slot-scope="scope">{{scope.row.ebayProfit | cutOut1}}</template>
      </el-table-column>
      <el-table-column
        width="108"
        prop="wishSold"
         align="center"
        label="Wish销量"
        :formatter="empty"
        sortable="custom"
      ></el-table-column>
      <el-table-column
        width="125"
        prop="wishProfit"
         align="center"
        label="Wish利润(￥)"
        :formatter="empty"
        sortable="custom"
      >
      <template slot-scope="scope">{{scope.row.wishProfit | cutOut1}}</template>
      </el-table-column>
      <el-table-column
        width="145"
        prop="smtSold"
        label="Aliexpress销量"
         align="center"
        :formatter="empty"
        sortable="custom"
      ></el-table-column>
      <el-table-column
        width="160"
        prop="smtProfit"
         align="center"
        label="Aliexpress利润(￥)"
        :formatter="empty"
        sortable="custom"
      >
      <template slot-scope="scope">{{scope.row.smtProfit | cutOut1}}</template>
      </el-table-column>
      <el-table-column
        width="115"
        prop="joomSold"
         align="center"
        label="Joom销量"
        :formatter="empty"
        sortable="custom"
      ></el-table-column>
      <el-table-column
        width="130"
        prop="joomProfit"
         align="center"
        label="Joom利润(￥)"
        :formatter="empty"
        sortable="custom"
      >
      <template slot-scope="scope">{{scope.row.joomProfit | cutOut1}}</template>
      </el-table-column>
      <el-table-column
        width="128"
        prop="amazonSold"
         align="center"
        label="Amazon销量"
        :formatter="empty"
        sortable="custom"
      ></el-table-column>
      <el-table-column
        width="145"
        prop="amazonProfit"
         align="center"
        label="Amazon利润(￥)"
        :formatter="empty"
        sortable="custom"
      >
      <template slot-scope="scope">{{scope.row.amazonProfit | cutOut1}}</template>
      </el-table-column>
    </el-table>
    <div class="toolbar">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.condition.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="this.condition.pageSize"
        layout="total, sizes,slot, prev, pager, next, jumper"
        :total="this.total"
      >
      <span>
            <el-button type="text"
                       @click="showAll">显示全部</el-button>
      </span>
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  getMember,
  getDevGoodsProfit,
  getOtherDeadFee,
  getSection,
  getProfitDetail,
  getPlatGoodsStatus
} from "../../api/profit";
import { APIDevExportProfit } from "../../api/product";
import { compareUp, compareDown, getMonthDate } from "../../api/tools";
import { isAdmin } from "../../api/api";

export default {
  data() {
    return {
      dialogTableVisible: false,
      totalPrice: 0,
      currentPrice: 0,
      showis1: true,
      showis2: false,
      viewForm: [],
      tabheight:window.innerHeight -240,
      goodsState: [],
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
      total: 0,
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
        dateRange: [],
        goodsStatus: [],
        introducer:'',
        goodsCode:'',
        page: 1,
        pageSize: 20,
        sort: '-profit'
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
  filters: {
    cutOut: function(value) {
      value = Number(value).toFixed(2);
      return value;
    },
    cutOut1: function(value) {
      if(value==0){
       return 0;
      }else{
        value = Number(value).toFixed(2);
      return value;
      }
    },
    cutOut2: function(value) {
      if(value==0){
       return 0;
      }else{
        value = (Number(value)*100).toFixed(2);
        return value;
      }
    }    
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
      this.condition.pageSize = this.total;
      this.onSubmit(this.condition)
    },
    formatter(row, column) {
      return row.devDate ? row.devDate.substring(0, 10) : "";
    },
    handleCurrentChange(val) {
      this.condition.page = val;
      this.onSubmit(this.condition);
    },
    handleSizeChange(val) {
      this.condition.pageSize = val;
      this.onSubmit(this.condition);
    },
    exportExcelMx() {
      const th = [
        "销售员",
        "产品编码",
        "销量",
        "销售额",
        "总利润",
        "利润率",
        "时间类型",
        "订单时间"
      ];
      const filterVal = [
        "saleMen",
        "goodsCode",
        "sold",
        "amt",
        "profit",
        "rate",
        "dateFlag",
        "orderTime"
      ];
      const Filename = "开发产品利润明细表";
      const data = this.viewForm.map(v => filterVal.map(k => v[k]));
      const [fileName, fileType, sheetName] = [Filename, "xls"];
      this.$toExcel({ th, data, fileName, fileType, sheetName });
    },
    exportExcel(myform) {
      let obj = {
        developer: myform.developer,
        goodsStatus: myform.goodsStatus,
        dateRange: myform.dateRange,
        developer: myform.developer,
        dateType: myform.dateType,
        pageSize: 100000
      };
      if (obj.developer.length == 0 && this.formInline.region.length === 0) {
        obj.developer = this.member.map(m => {
          return m.username;
        });
      } else if (
        this.formInline.region.length !== 0 &&
        obj.developer.length === 0
      ) {
        const val = this.formInline.region;
        const res = this.allMember;
        for (let i = 0; i < val.length; i++) {
          const per = res.filter(
            ele =>
              (ele.department === val[i] || ele.parent_department === val[i]) &&
              ele.position === "开发"
          );
          this.member.concat(per);
        }
        obj.developer = this.member.map(m => {
          return m.username;
        });
      }
      if (obj.goodsStatus.length == 0) {
        obj.goodsStatus = this.goodsState;
      }
      APIDevExportProfit(obj).then(res => {
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
    view1(index, row) {
      this.dialogTableVisible = true;
      let viewForm = {
        dateRange: this.condition.dateRange,
        goodsCode: row.goodsCode,
        dateType: this.condition.dateType
      };
      getProfitDetail(viewForm).then(res => {
        this.viewForm = res.data.data;
      });
    },
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
        this.tabheight=window.innerHeight -128
      } else if (this.show === true) {
        this.text = "隐藏输入框";
        const height = document.getElementById("app").clientHeight;
        this.tabheight=window.innerHeight -240
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
          this.listLoading = true;
          if (myform.developer.length > 0) {
            if (myform.goodsStatus.length == 0) {
              myform.goodsStatus = this.goodsState;
            }
            getDevGoodsProfit(myform).then(response => {
              this.listLoading = false;
              this.tableData = response.data.data.items;
              this.total = response.data.data._meta.totalCount;
              this.condition.page = response.data.data._meta.currentPage;
              this.condition.pageSize = response.data.data._meta.perPage;
            });
          } else if (
            myform.developer.length == 0 &&
            this.formInline.region.length === 0
          ) {
            myform.developer = this.member.map(m => {
              return m.username;
            });
            if (myform.goodsStatus.length == 0) {
              myform.goodsStatus = this.goodsState;
            }
            getDevGoodsProfit(myform).then(response => {
              this.listLoading = false;
              this.tableData = response.data.data.items;
              this.total = response.data.data._meta.totalCount;
              this.condition.page = response.data.data._meta.currentPage;
              this.condition.pageSize = response.data.data._meta.perPage;
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
            if (myform.goodsStatus.length == 0) {
              myform.goodsStatus = this.goodsState;
            }
            getDevGoodsProfit(myform).then(response => {
              this.listLoading = false;
              this.tableData = response.data.data.items;
              this.total = response.data.data._meta.totalCount;
              this.condition.page = response.data.data._meta.currentPage;
              this.condition.pageSize = response.data.data._meta.perPage;
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
        if(index === 1){
          sums[index] = "N/A";
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
            sums[index] = (arr[10]/arr[9]*100).toFixed(2);
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
    },
    sortNumber1(column, prop, order) {
      const data = this.viewForm
      if (column.order === 'descending') {
        this.viewForm = data.sort(compareDown(data, column.prop))
      } else {
        this.viewForm = data.sort(compareUp(data, column.prop))
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
    getPlatGoodsStatus().then(response => {
      this.goodsState = response.data.data;
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
  margin-bottom: 15px;
  .el-form-item {
    margin-bottom: 0px;
  }
}
.proinput{
  width: 230px;
}
  .proradio{
    width: 110px;
  }
@media (max-width: 1400px) {
  .proinput{
    width: 182px;
  }
  .proradio{
    width: 85px;
  }
}
</style>
