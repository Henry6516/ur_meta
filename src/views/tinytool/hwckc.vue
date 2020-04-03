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
          <el-form-item label="商品编码" class="input" style="margin-left:10px;">
            <el-input
              placeholder="sku"
              v-model="condition.goodsCode"
              style="width:170px;"
              size="small"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="销售员" class="input">
            <el-select
              size="small"
              clearable
              v-model="condition.seller"
              style="width:170px;"
              placeholder="销售员"
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
          <el-form-item>
            <el-button
              size="small"
              type="primary"
              @click="onSubmit(condition)"
              style="margin-left:1px;"
            >查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="success" @click="exportExcel(condition)">导出</el-button>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="warning" @click="add(condition)">添加</el-button>
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
      <el-table-column prop="depart" label="部门" align="center" fixed width="80"></el-table-column>
      <el-table-column prop="storeName" label="仓库" align="center" fixed width="80"></el-table-column>
      <el-table-column prop="goodsCode" label="商品编码" align="center" fixed width="90"></el-table-column>
      <el-table-column prop="sku" label="sku" align="center" fixed width="100"></el-table-column>
      <el-table-column prop="skuName" label="商品名称" align="center" fixed width="150"></el-table-column>
      <el-table-column prop="salerName" label="开发员" fixed width="80" align="center"></el-table-column>
      <el-table-column prop="seller1" label="销售员1" align="center" width="90">
        <template slot-scope="scope">
          {{scope.row.seller1}}
          <el-tooltip content="更新">
            <i
              @click="edit(scope.$index, scope.row)"
              class="el-icon-edit"
              style="color: #409EFF;cursor:pointer;"
            ></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="seller2" label="销售员2" align="center" width="80"></el-table-column>
      <el-table-column prop="weight" label="重量" align="center" sortable="custom" width="80"></el-table-column>
      <el-table-column prop="costPrice" label="平均单价" align="center" sortable="custom" width="100"></el-table-column>
      <el-table-column prop="costmoney" label="成本" align="center" sortable="custom" width="100"></el-table-column>
      <el-table-column prop="useNum" label="可用库存" align="center" sortable="custom" width="100"></el-table-column>
      <el-table-column
        prop="hopeUseNum"
        label="预计可用库存"
        align="center"
        sortable="custom"
        width="125"
      ></el-table-column>
      <!-- <el-table-column prop="notInStore" label="在途数量" align="center" sortable="custom" width="100"></el-table-column> -->
      <!-- <el-table-column prop="notInCostmoney" label="在途金额" align="center" sortable="custom" width="100"></el-table-column> -->
      <el-table-column
        prop="turnoverDays"
        label="周转天数"
        align="center"
        sortable="custom"
        width="100"
      >
        <template slot-scope="scope">{{scope.row.turnoverDays | cutOut}}</template>
      </el-table-column>
      <el-table-column
        prop="threeSellCount"
        label="3天销量"
        align="center"
        sortable="custom"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="sevenSellCount"
        label="7天销量"
        align="center"
        sortable="custom"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="fourteenSellCount"
        label="14天销量"
        align="center"
        sortable="custom"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="thirtySellCount"
        label="30天销量"
        align="center"
        sortable="custom"
        width="100"
      ></el-table-column>
      <!-- <el-table-column prop="updateTime" label="更新时间" align="center" sortable="custom" width="100">
        <template slot-scope="scope">{{scope.row.updateTime | cutOutDate}}</template>
      </el-table-column>-->
      <el-table-column prop="goodsStatus" label="商品状态" align="center" width="80"></el-table-column>
    </el-table>
    <el-dialog title="编辑销售" :visible.sync="dialogFormVisible1" width="35%">
      <el-select clearable v-model="sellerName" placeholder="销售员" style="width:90%;margin-left:5%;">
        <el-option
          v-for="(item,index) in member"
          :index="index"
          :key="item.username"
          :label="item.username"
          :value="item.username"
        ></el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="addRess">确 定</el-button>
      </div>
    </el-dialog>
    <div class="toolbar" style="overflow:hidden">
      <div style="float:left;">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="this.condition.page"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="this.condition.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getMember, gethwckcsku } from "../../api/profit";
import { APIExportskuExport, hwcSkuUpdate } from "../../api/product";
import { compareUp, compareDown, getMonthDate } from "../../api/tools";

export default {
  data() {
    return {
      tableHeight: window.innerHeight - 197,
      dialogFormVisible1: false,
      sellerName: null,
      tableData: [],
      goodsState: [],
      member: [],
      total: null,
      totalPrice: 0,
      purchaser: [],
      goodsCode: null,
      condition: {
        goodsCode: "",
        seller: "",
        pageSize: 100,
        page: 1
      },
      listLoading: false
    };
  },
  filters: {
    cutOutDate(value) {
      value = value.substring(0, 11);
      return value;
    },
    cutOut(value) {
      value = Number(value).toFixed(0);
      return value;
    }
  },
  methods: {
    addRess() {
      var condition = {
        goodsCode: this.goodsCode,
        seller: this.sellerName
      };
      hwcSkuUpdate(condition).then(response => {
        if (response.data.code == 200) {
          this.$message({
            message: "成功",
            type: "success"
          });
          this.onSubmit(this.condition);
        } else {
          this.$message.error(res.data.message);
        }
        this.dialogFormVisible1 = false;
      });
    },
    edit(index, row) {
      this.goodsCode = row.goodsCode;
      this.dialogFormVisible1 = true;
    },
    add(from) {
      var condition = {
        goodsCode: from.goodsCode,
        seller: from.seller
      };
      hwcSkuUpdate(condition).then(response => {
        if (response.data.code == 200) {
          this.$message({
            message: "成功",
            type: "success"
          });
          this.onSubmit(this.condition);
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "color:#337ab7;background:#f5f7fa";
      } else {
        return "";
      }
    },
    exportExcel(from) {
      var condition = {
        goodsCode: from.goodsCode,
        seller: from.seller
      };
      APIExportskuExport(condition).then(res => {
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
      gethwckcsku(form).then(response => {
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
        ele =>
          ele.parent_id === "1" &&
          ele.position === "销售"
      );
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
