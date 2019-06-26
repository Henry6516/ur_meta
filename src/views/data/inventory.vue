<template>
  <!-- <div>采购毛利润报表</div>     -->
  <div class="toolbar">
    <el-col :span="24" style="padding:10px 20px;">
      <el-button @click="exportExcel" type="primary">导出总表</el-button>
      <el-button @click="exportExcelMx" type="success">导出状态明细表</el-button>
      <el-button @click="exportExcelMxKf" type="warning">导出开发明细表</el-button>
    </el-col>  
    <el-table
      :data="tableData"
      id="sale-table"
      v-loading="listLoading"
      show-summary
      :summary-method="getSummaries"
      element-loading-text="正在加载中..."
      @sort-change="sortNumber"
      style="width: 100%"
      :height="tableHeight"
    >
      <el-table-column prop="storeName" label="仓库" :formatter="empty"></el-table-column>
      <el-table-column
        prop="useNum"
        label="可用库存数量"
        :formatter="empty"
        sortable="custom"
      ></el-table-column>
      <el-table-column
        prop="costmoney"
        label="可用库存金额"
        :formatter="empty"
        sortable="custom"
      >
      <template slot-scope="scope">{{scope.row['costmoney'] | cutOut}}</template>
      </el-table-column>
      <el-table-column
        prop="notInStore"
        label="在途数量"
        :formatter="empty"
        sortable="custom"
      ></el-table-column>
      <el-table-column
        prop="notInCostmoney"
        label="在途金额"
        :formatter="empty"
        sortable="custom"
      >
      <template slot-scope="scope">{{scope.row['notInCostmoney'] | cutOut}}</template>
      </el-table-column>
      <el-table-column
        prop="hopeUseNum"
        label="总库存数量"
        :formatter="empty"
        sortable="custom"
      ></el-table-column>
      <el-table-column
        prop="totalCostmoney"
        label="总库存金额"
        :formatter="empty"
        sortable="custom"
      >
      <template slot-scope="scope">{{scope.row['totalCostmoney'] | cutOut}}</template>
      </el-table-column>
      <el-table-column
        prop="30DayCostmoney"
        label="近30天出库金额"
        :formatter="empty"
        sortable="custom"
      >
      <template slot-scope="scope">{{scope.row['30DayCostmoney'] | cutOut}}</template>
      </el-table-column>
      <el-table-column
        prop="sellDays"
        label="库存周转(天)"
        :formatter="empty"
        sortable="custom"
      ></el-table-column>
      <el-table-column label="状态明细" :formatter="empty" width="90">
        <template slot-scope="scope">
          <el-button type="text" @click="view1(scope.$index, scope.row)">
            <i class="iconfont icon-yulan"></i>
          </el-button>
        </template>
      </el-table-column>
       <el-table-column label="开发明细" :formatter="empty" width="90">
        <template slot-scope="scope">
          <el-button type="text" @click="view2(scope.$index, scope.row)">
            <i class="iconfont icon-yulan"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="查看状态明细" :visible.sync="dialogTableVisible" width="70%">
      <el-table :data="viewForm" @sort-change="sortNumberView">
        <el-table-column property="storeName" label="仓库"></el-table-column>
        <el-table-column property="useNum" label="可用库存数量" sortable="custom"></el-table-column>
        <el-table-column property="costmoney" label="可用库存金额" sortable="custom">
            <template slot-scope="scope">{{scope.row['costmoney'] | cutOut}}</template>
        </el-table-column>
        <el-table-column property="notInStore" label="在途数量" sortable="custom"></el-table-column>
        <el-table-column property="notInCostmoney" label="在途金额" sortable="custom">
            <template slot-scope="scope">{{scope.row['notInCostmoney'] | cutOut}}</template>
        </el-table-column>
        <el-table-column property="hopeUseNum" label="总库存数量" sortable="custom"></el-table-column>
        <el-table-column property="totalCostmoney" label="总库存金额" sortable="custom">
            <template slot-scope="scope">{{scope.row['totalCostmoney'] | cutOut}}</template>
        </el-table-column>
        <el-table-column property="30DayCostmoney" label="近30天出库金额" sortable="custom" width="150">
            <template slot-scope="scope">{{scope.row['30DayCostmoney'] | cutOut}}</template>
        </el-table-column>
        <el-table-column property="sellDays" label="库存周转(天)" sortable="custom"></el-table-column>
        <el-table-column property="goodsStatus" label="状态"></el-table-column>
      </el-table>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="exportExcelMx()">导出明细</el-button>
      </div> -->
    </el-dialog>
    <el-dialog title="查看开发明细" :visible.sync="dialogTableVisibleKf" width="72%">
      <el-table :data="viewFormKf" @sort-change="sortNumberViewKf">
        <el-table-column property="storeName" label="仓库"></el-table-column>
        <el-table-column property="salerName" label="开发员"></el-table-column>
        <el-table-column property="useNum" label="可用库存数量" sortable="custom"></el-table-column>
        <el-table-column property="costmoney" label="可用库存金额" sortable="custom">
          <template slot-scope="scope">{{scope.row['costmoney'] | cutOut}}</template>
        </el-table-column>
        <el-table-column property="notInStore" label="在途数量" sortable="custom"></el-table-column>
        <el-table-column property="notInCostmoney" label="在途金额" sortable="custom">
          <template slot-scope="scope">{{scope.row['notInCostmoney'] | cutOut}}</template>
        </el-table-column>
        <el-table-column property="hopeUseNum" label="总库存数量" sortable="custom"></el-table-column>
        <el-table-column property="totalCostmoney" label="总库存金额" sortable="custom">
          <template slot-scope="scope">{{scope.row['totalCostmoney'] | cutOut}}</template>
        </el-table-column>
        <el-table-column property="30DayCostmoney" label="近30天出库金额" sortable="custom" width="150">
          <template slot-scope="scope">{{scope.row['30DayCostmoney'] | cutOut}}</template>
        </el-table-column>
        <el-table-column property="sellDays" label="库存周转(天)" sortable="custom"></el-table-column>
      </el-table>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisibleKf = false">取 消</el-button>
        <el-button type="primary" @click="exportExcelMxKf()">导出明细</el-button>
      </div> -->
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { getStackStatus,getStockStatusDetail,getStockDeveloperDetail } from "../../api/profit";
import { compareUp, compareDown, getMonthDate } from "../../api/tools";

export default {
  data() {
    return {
      tableHeight:window.innerHeight -160,
      tableData: [],
      listLoading: false,
      viewForm:[],
      viewFormKf:[],
      dialogTableVisible:false,
      dialogTableVisibleKf:false,
      viewFormZt:[],
      viewFormKfQk:[]
    };
  },
  filters: {
    cutOut: function(value) {
      if(value!=0){
       value = Number(value).toFixed(2);
       return value;
      }else{
        return 0;  
      }
    }
  },
  methods: {
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
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
        sums[index] = Math.round(sums[index] * 100) / 100;
        let arr=sums
        if(index==8){
          sums[index] = (arr[6]/arr[7]*30).toFixed(2);
        }
      });
      return sums;
    },
    view1(index, row) {
      this.viewForm=[];  
      this.dialogTableVisible = true;
      let viewForm = {
        storeName: row.storeName,
      };
      getStockStatusDetail(viewForm).then(res => {
        this.viewForm = res.data.data;
      });
    },
    view2(index, row) {
      this.viewFormKf=[];  
      this.dialogTableVisibleKf = true;
      let viewFormKf = {
        storeName: row.storeName,
      };
      getStockDeveloperDetail(viewFormKf).then(res => {
        this.viewFormKf = res.data.data;
      });
    },
    empty(row, column, cellValue, index) {
      return cellValue || '--'
    },
    getData() {
      getStackStatus().then(response => {
        this.tableData = response.data.data;
      });
    },
    getDataMx(){
      let viewFormZt = {
        storeName: '',
      };
      getStockStatusDetail(viewFormZt).then(res => {
        this.viewFormZt = res.data.data;
      });
    },
    getDataMxKf(){
      let viewFormKfQk = {
        storeName: '',
      };
      getStockDeveloperDetail(viewFormKfQk).then(res => {
        this.viewFormKfQk = res.data.data;
      });
    },
    exportExcelMxKf() {
      const th = [
        "仓库",
        "开发员",
        "可用库存数量",
        "可用库存金额",
        "在途数量",
        "在途金额",
        "总库存数量",
        "总库存金额",
        "近30天出库金额",
        "库存周转(天)"
      ];
      const filterVal = [
        "storeName",
        "salerName",
        "useNum",
        "costmoney",
        "notInStore",
        "notInCostmoney",
        "hopeUseNum",
        "totalCostmoney",
        "30DayCostmoney",
        "sellDays"
      ];
      const Filename = "库存情况开发明细";
      const data = this.viewFormKfQk.map(v => filterVal.map(k => v[k]));
      const [fileName, fileType, sheetName] = [Filename, "xls"];
      this.$toExcel({ th, data, fileName, fileType, sheetName });
    },
    exportExcelMx() {
      const th = [
        "仓库",
        "可用库存数量",
        "可用库存金额",
        "在途数量",
        "在途金额",
        "总库存数量",
        "总库存金额",
        "近30天出库金额",
        "库存周转(天)",
        "状态"
      ];
      const filterVal = [
        "storeName",
        "useNum",
        "costmoney",
        "notInStore",
        "notInCostmoney",
        "hopeUseNum",
        "totalCostmoney",
        "30DayCostmoney",
        "sellDays",
        "goodsStatus"
      ];
      const Filename = "库存情况状态明细";
      const data = this.viewFormZt.map(v => filterVal.map(k => v[k]));
      const [fileName, fileType, sheetName] = [Filename, "xls"];
      this.$toExcel({ th, data, fileName, fileType, sheetName });
    },
    exportExcel() {
      if (this.tableData.length != 0) {
        const th = [
          "仓库",
          "可用库存数量",
          "可用库存金额",
          "在途数量",
          "在途金额",
          "总库存数量",
          "总库存金额",
          "近30天出库金额",
          "库存周转(天)"
        ];
        const filterVal = [
          "storeName",
          "useNum",
          "costmoney",
          "notInStore",
          "notInCostmoney",
          "hopeUseNum",
          "totalCostmoney",
          "30DayCostmoney",
          "sellDays"
        ];
        const Filename = "库存情况";
        const data = this.tableData.map(v => filterVal.map(k => v[k]));
        const [fileName, fileType, sheetName] = [Filename, "xls"];
        this.$toExcel({ th, data, fileName, fileType, sheetName });
      }
    },
    // 数字排序
    sortNumber(column, prop, order) {
      const data = this.tableData;
      if (column.order === "descending") {
        this.tableData = data.sort(compareDown(data, column.prop));
      } else if(column.order === "ascending") {
        this.tableData = data.sort(compareUp(data, column.prop));
      }else{
        this.getData();
      }
    },
    sortNumberView(column, prop, order) {
      const data = this.viewForm;
      if (column.order === "descending") {
        this.viewForm = data.sort(compareDown(data, column.prop));
      } else{
        this.viewForm = data.sort(compareUp(data, column.prop));
      }
    },
    sortNumberViewKf(column, prop, order) {
      const data = this.viewFormKf;
      if (column.order === "descending") {
        this.viewFormKf = data.sort(compareDown(data, column.prop));
      } else{
        this.viewFormKf = data.sort(compareUp(data, column.prop));
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
    this.getData();
    this.getDataMx();
    this.getDataMxKf();
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
