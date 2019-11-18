<template>
  <!-- <div>AU真仓</div>     -->
  <div class="toolbar">
    <div class="demo-block demo-box demo-zh-CN demo-transition">
      <transition name="el-fade-in-linear">
        <el-form
          :model="condition"
          :inline="true"
          ref="condition"
          label-width="5.8rem"
          class="demo-form-inline"
        >
          <el-form-item label="sku" class="input">
            <el-input
              placeholder="sku"
              v-model="condition.sku"
              style="width:160px;"
              size="small"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="开发员" class="input">
            <el-select
              size="small"
              clearable
              v-model="condition.salerName"
              style="width:160px;"
              placeholder="开发员"
            >
              <el-option
                v-for="(item,index) in member"
                :index="index"
                :key="item.username"
                :label="item.username"
                :value="item.username"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="采购员" class="input">
            <el-select
              size="small"
              clearable
              v-model="condition.purchaser"
              style="width:160px;"
              placeholder="采购员"
            >
              <el-option
                v-for="(item,index) in purchaser"
                :index="index"
                :key="item.username"
                :label="item.username"
                :value="item.username"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="销售趋势" class="input">
            <el-select
              size="small"
              clearable
              v-model="condition.trend"
              style="width:160px;"
              placeholder="销售趋势"
            >
              <el-option
                v-for="(item,index) in trend"
                :index="index"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否采购" class="input">
            <el-select
              size="small"
              clearable
              v-model="condition.isPurchaser"
              style="width:160px;"
              placeholder="是否采购"
            >
              <el-option
                v-for="(item,index) in isPurchaser"
                :index="index"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否发货" class="input">
            <el-select
              size="small"
              clearable
              v-model="condition.isShipping"
              style="width:160px;"
              placeholder="是否发货"
            >
              <el-option
                v-for="(item,index) in isShipping"
                :index="index"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
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
      <el-table-column prop="salerName" label="开发员" width="100" fixed align="center"></el-table-column>
      <el-table-column prop="SKU" label="sku" width="100" fixed align="center"></el-table-column>
      <el-table-column prop="SKUName" label="SKU名称" width="120" fixed align="center"></el-table-column>
      <el-table-column prop="goodsCode" label="商品编码" width="100" fixed align="center"></el-table-column>
      <el-table-column prop="goodsStatus" label="状态" width="100" align="center"></el-table-column>
      <el-table-column prop="season" label="季节" width="100" align="center"></el-table-column>
      <el-table-column prop="categoryName" label="类目" width="100" align="center"></el-table-column>
      <el-table-column prop="price" label="价格" sortable="custom" width="100" align="center"></el-table-column>
      <el-table-column prop="weight" label="重量(g)" sortable="custom" width="100" align="center"></el-table-column>
      <el-table-column prop="purchaser" label="采购" width="100" align="center"></el-table-column>
      <el-table-column prop="supplierName" label="供应商" width="140" align="center"></el-table-column>
      <el-table-column prop="saleNum3days" label="3天销量" sortable="custom" width="100" align="center"></el-table-column>
      <el-table-column prop="saleNum7days" label="7天销量" sortable="custom" width="100" align="center"></el-table-column>
      <el-table-column prop="saleNum15days" label="15天销量" sortable="custom" width="100" align="center"></el-table-column>
      <el-table-column prop="saleNum30days" label="30天销量" sortable="custom" width="100" align="center"></el-table-column>
      <el-table-column prop="trend" label="走势" width="100" align="center"></el-table-column>
      <el-table-column prop="saleNumDailyAve" label="日均销量" sortable="custom" width="100" align="center"></el-table-column>
      <el-table-column prop="399HopeUseNum" label="金皖399预计可用" sortable="custom" width="145" align="center"></el-table-column>
      <el-table-column prop="uHopeUseNum" label="万邑通AU预计可用库存" sortable="custom" width="185" align="center"></el-table-column>
      <el-table-column prop="totalHopeUseNum" label="预计可用库存" sortable="custom" width="140" align="center"></el-table-column>
      <el-table-column prop="uHopeSaleDays" label="万邑通AU预计可用天数" sortable="custom" width="185" align="center"></el-table-column>
      <el-table-column prop="hopeSaleDays" label="预计可卖天数" sortable="custom" width="125" align="center"></el-table-column>
      <el-table-column prop="purchaseNum" label="采购数量" sortable="custom" width="100" align="center"></el-table-column>
      <el-table-column prop="shipNum" label="发货数量" sortable="custom" width="100" align="center"></el-table-column>
    </el-table>
    <div class="toolbar" style="overflow:hidden">
      <div style="float:left;">
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
      <div style="float:right">
        <p style="margin:0;font-size:14px;margin-right:18px;margin-top:7px;">
          采购成本:
          <span style="color:red">{{totalPrice}}</span>
        </p>
      </div>
      <div style="float:right">
        <p style="margin:0;font-size:14px;margin-right:18px;margin-top:7px;">
          发货重量:
          <span style="color:red">{{totalPrice1}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getMember, getUkRealReplenish } from "../../api/profit";
import { APIExportReplenish  } from "../../api/product";
import { compareUp, compareDown, getMonthDate } from "../../api/tools";

export default {
  data() {
    return {
      tableHeight:window.innerHeight -210,
      tableData: [],
      goodsState: [],
      totalPrice1:0,
      totalPrice:0,
      member: [],
      total: null,
      purchaser: [],
      trend: ["持续上升", "波动上升", "持续下降", "波动下降", "维持不变"],
      isShipping:["是", "否"],
      isPurchaser: ["是", "否"],
      condition: {
        sku: "",
        salerName: "",
        purchaser: "",
        trend: "",
        isPurchaser: "",
        isShipping:'',
        pageSize: 20,
        page: 1
      },
      listLoading: false
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
    exportExcel(from){
      from.type='auReal'
       APIExportReplenish(from).then(res => {
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
      this.listLoading=true
      getUkRealReplenish(form).then(response => {
        this.listLoading=false
        this.tableData = response.data.data.items;
        this.total = response.data.data._meta.totalCount;
        this.condition.page = response.data.data._meta.currentPage;
        this.condition.pageSize = response.data.data._meta.perPage;
        this.totalPrice = response.data.data.extra.totalPurCost;
        this.totalPrice1 = response.data.data.extra.totalShipWeight;
      });
    }
  },
  mounted() {
    getMember().then(response => {
      const res = response.data.data;
      this.allMember = this.member = res.filter(ele => ele.position === "开发" && ele.department === "运营一部开发组");
      this.purchaser = res.filter(ele => ele.position === "采购");
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
