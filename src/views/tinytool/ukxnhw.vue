<template>
  <!-- <div>UK虚拟仓</div>     -->
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
          <el-form-item label="开发员" class="input" style="margin-left:12px;">
            <el-select
              size="small"
              clearable
              v-model="condition.salerName"
              style="width:170px;"
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
              style="width:170px;"
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
          <el-form-item>
            <el-button
              size="small"
              type="primary"
              @click="onSubmit(condition)"
              style="margin-left:10px;"
            >查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="success" @click="exportExcel(condition)">导出</el-button>
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
      <el-table-column prop="salerName" label="开发员" width="100" align="center" fixed></el-table-column>
      <el-table-column prop="sku" label="sku" width="100" align="center" fixed></el-table-column>
      <el-table-column prop="goodsCode" label="商品编码" width="100" align="center" fixed></el-table-column>
      <el-table-column prop="goodsName" label="商品名称" width="110" align="center" fixed></el-table-column>
      <el-table-column prop="goodsSkuStatus" label="商品状态" width="100" align="center"></el-table-column>
      <el-table-column prop="purchaser" label="采购员" width="100" align="center"></el-table-column>
      <el-table-column prop="hopeUseNum" label="预计可用数量" width="130" align="center" sortable="custom"></el-table-column>
      <el-table-column prop="storeName" label="仓库" width="100" align="center"></el-table-column>
      <el-table-column prop="supplierName" label="供应商" width="150" align="center"></el-table-column>
      <el-table-column prop="goodsPrice" label="成本价" width="100" align="center" sortable="custom"></el-table-column>
      <el-table-column prop="costprice" label="平均单价" width="100" align="center" sortable="custom"></el-table-column>
      <el-table-column prop="weight" label="重量" width="100" align="center" sortable="custom"></el-table-column>
      <el-table-column prop="sellCount3" label="3天销量" width="100" align="center" sortable="custom"></el-table-column>
      <el-table-column prop="sellCount7" label="7天销量" width="100" align="center" sortable="custom"></el-table-column>
      <el-table-column prop="sellCount15" label="15天销量" width="100" align="center" sortable="custom"></el-table-column>
      <el-table-column prop="sellCount30" label="30天销量" width="100" align="center" sortable="custom"></el-table-column>
      <el-table-column prop="sellAvg3" label="3天平均销量" width="120" align="center" sortable="custom"></el-table-column>
      <el-table-column prop="sellAvg7" label="7天平均销量" width="120" align="center" sortable="custom"></el-table-column>
      <el-table-column prop="sellAvg15" label="15天平均销量" width="125" align="center" sortable="custom"></el-table-column>
      <el-table-column prop="sellAvg30" label="30天平均销量" width="125" align="center" sortable="custom"></el-table-column>
      <el-table-column prop="trend" label="走势" width="100" align="center" sortable="custom"></el-table-column>
      <el-table-column prop="sellAvg" label="日均销量" width="100" align="center" sortable="custom"></el-table-column>
      <el-table-column prop="totalHopeUseNum" label="总预计可用库存" width="140" align="center" sortable="custom"></el-table-column>
      <el-table-column prop="stockDays" label="采购到货天数" width="130" align="center" sortable="custom"></el-table-column>
      <el-table-column prop="sellDays" label="预警销售天数" width="125" align="center" sortable="custom"></el-table-column>
      <el-table-column prop="hopeSellDays" label="预计可卖天数" width="125" align="center" sortable="custom"></el-table-column>
      <el-table-column prop="isStock" label="是否特殊备货" width="130" align="center" sortable="custom"></el-table-column>
      <el-table-column prop="isPur" label="是否采购" width="100" align="center" sortable="custom"></el-table-column>
      <el-table-column prop="purNum" label="采购数量" width="100" align="center" sortable="custom"></el-table-column>
      <el-table-column prop="price" label="单价" width="100" align="center" sortable="custom"></el-table-column>
      <el-table-column prop="purCost" label="采购成本(￥)" width="120" align="center" sortable="custom"></el-table-column>
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
      <!-- <div style="float:right">
        <p style="margin:0;font-size:15px;margin-right:18px;margin-top:7px;">
          采购成本:
          <span style="color:red">{{totalPrice}}</span>
        </p>
      </div> -->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getMember, getUkVirtual } from "../../api/profit";
import { APIExportReplenish } from "../../api/product";
import { compareUp, compareDown, getMonthDate } from "../../api/tools";

export default {
  data() {
    return {
      tableHeight: window.innerHeight - 197,
      tableData: [],
      goodsState: [],
      member: [],
      total: null,
      totalPrice: 0,
      purchaser: [],
      condition: {
        salerName: "",
        purchaser: "",
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
    exportExcel(from) {
      from.type = "uk2";
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
      this.listLoading = true;
      getUkVirtual(form).then(response => {
        this.listLoading = false;
        this.tableData = response.data.data.items;
        this.total = response.data.data._meta.totalCount;
        this.condition.page = response.data.data._meta.currentPage;
        this.condition.pageSize = response.data.data._meta.perPage;
      });
    }
  },
  mounted() {
    getMember().then(response => {
      const res = response.data.data;
      this.allMember = this.member = res.filter(
        ele => ele.position === "开发" && ele.department === "运营一部开发组"
      );
      this.purchaser = res.filter(ele => ele.position === "采购");
      this.res = res.filter(ele => ele.position === "主管");
    });
  }
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
