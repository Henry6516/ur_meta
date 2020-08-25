<template>
  <!-- <div>AU真仓</div>     -->
  <div class="toolbar">
    <div class="demo-block demo-box demo-zh-CN demo-transition">
      <transition name="el-fade-in-linear">
        <el-form
          :model="condition"
          :inline="true"
          ref="condition"
          label-width="70px"
          style="padding-top:10px;"
          class="demo-form-inline"
        >
          <el-form-item label="sku" class="input">
            <el-input
              placeholder="主sku"
              v-model="condition.sku"
              style="width:160px;"
              size="small"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="账号" class="input">
            <el-select
              size="small"
              filterable
              v-model="condition.suffix"
              style="width:220px;"
              clearable
            >
              <el-option
                v-for="(item,index) in account"
                :index="index"
                :key="item.id"
                :label="item.store"
                :value="item.store"
              ></el-option>
              <!-- <el-input size="small" v-model="condition.sellerUserid" clearable></el-input> -->
            </el-select>
          </el-form-item>
          <el-form-item label="item_id" class="input">
            <el-input
              placeholder="item_id"
              v-model="condition.item_id"
              style="width:160px;"
              size="small"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="日期" class="input">
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
              style="width:250px"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="onSubmit(condition)">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="exportExcel(condition)">导出</el-button>
          </el-form-item>
        </el-form>
      </transition>
    </div>
    <el-table
      :data="tableData"
      id="sale-table"
      v-loading="listLoading"
      element-loading-text="正在加载中..."
      @sort-change="sortNumber"
      :height="tableHeight"
      border
      class="elTable"
      :header-cell-style="getRowClass"
      style="width: 100%;font-size:13px;"
    >
      <el-table-column prop="suffix" label="账号简称" align="center"></el-table-column>
      <el-table-column prop="sku" label="主sku" align="center"></el-table-column>
      <el-table-column prop="ad_rate" label="广告费率(%)" align="center"></el-table-column>
      <el-table-column prop="ad_fee" label="广告费(￥)" align="center"></el-table-column>
      <el-table-column prop="fee_time" label="费用时间" align="center"></el-table-column>
      <el-table-column prop="description" label="描述" align="center"></el-table-column>
      <el-table-column prop="item_id" label="itemId" align="center"></el-table-column>
      <el-table-column prop="transaction_price" label="成交价(￥)" align="center"></el-table-column>
      <el-table-column prop="shipping_name" label="物流名称" align="center"></el-table-column>
    </el-table>
    <div class="toolbar" style="overflow:hidden">
      <div style="float:left;padding-top:2px">
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
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getMember, getUkRealReplenish, getAccount } from "../../api/profit";
import { APIEbayAdFeeExport, getEbayAdFee } from "../../api/product";
import { compareUp, compareDown, getMonthDate } from "../../api/tools";

export default {
  data() {
    return {
      tableHeight: window.innerHeight - 197,
      tableData: [],
      goodsState: [],
      totalPrice1: 0,
      totalPrice: 0,
      member: [],
      total: null,
      purchaser: [],
      trend: ["持续上升", "波动上升", "持续下降", "波动下降", "维持不变"],
      isShipping: ["是", "否"],
      isPurchaser: ["是", "否"],
      account: [],
      condition: {
        sku: "",
        suffix: "",
        item_id: "",
        dateRange: [],
        pageSize: 20,
        page: 1,
      },
      listLoading: false,
    };
  },
  methods: {
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "color:#337ab7;background:#f5f7fa";
      } else {
        return "";
      }
    },
    exportExcel(from) {
      this.listLoading = true;
      APIEbayAdFeeExport(from).then((res) => {
        this.listLoading = false;
        const blob = new Blob([res.data], {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
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
    sortNumber(column, prop, order) {
      const data = this.tableData;
      if (column.order === "descending") {
        this.tableData = data.sort(compareDown(data, column.prop));
      } else {
        this.tableData = data.sort(compareUp(data, column.prop));
      }
    },
    handleCurrentChange(val) {
      this.condition.page = val;
      this.onSubmit(this.condition);
    },
    handleSizeChange(val) {
      this.condition.pageSize = val;
      this.onSubmit(this.condition);
    },
    onSubmit(form) {
      this.listLoading = true;
      getEbayAdFee(form).then((response) => {
        this.listLoading = false;
        this.tableData = response.data.data.items;
        this.total = response.data.data._meta.totalCount;
        this.condition.page = response.data.data._meta.currentPage;
        this.condition.pageSize = response.data.data._meta.perPage;
      });
    },
  },
  mounted() {
    getAccount().then((response) => {
      const res = response.data.data;
      this.account = res.filter((ele) => ele.platform === "eBay");
    });
    getMember().then((response) => {
      const res = response.data.data;
      this.allMember = this.member = res.filter(
        (ele) => ele.position === "开发" && ele.parent_id === "1"
      );
      this.purchaser = res.filter((ele) => ele.position === "采购");
      this.res = res.filter((ele) => ele.position === "主管");
    });
  },
};
</script>

<style lang="scss" scoped>
.el-form {
  margin-bottom: 10px;
  .el-form-item {
    margin-bottom: 0px;
  }
}
</style>
