<template>
  <section>
    <div>
      <el-col :span="24">
        <el-table
          :data="nostockdata"
          border
          class="elTableForm"
          :header-cell-style="getRowClass"
          v-loading="listLoading"
          :height="tableHeightstock"
          style="width: 100%;margin-top:5px;"
        >
          <el-table-column type="index" fixed align="center" header-align="center" width="45"></el-table-column>  
          <el-table-column label="姓名" fixed header-align="center" align="center" prop="name" width="80"></el-table-column>
          <el-table-column label="月份" fixed header-align="center" align="center" prop="month" width="80"></el-table-column>
          <el-table-column label="总积分" fixed header-align="center" align="center" prop="total_integral" width="80"></el-table-column>
          <el-table-column label="计件工资" fixed header-align="center" align="center" prop="wages" width="80"></el-table-column>
          <el-table-column label="出勤天数" header-align="center" align="center" prop="working_days" width="80"></el-table-column>  
          <el-table-column label="组别" header-align="center" align="center" prop="group" width="80"></el-table-column>
          <el-table-column label="职位" header-align="center" align="center" prop="job" width="80"></el-table-column>
          <el-table-column label="小组" header-align="center" align="center" prop="team" width="80"></el-table-column>
          <el-table-column label="采购入库包裹" header-align="center" align="center" prop="pur_in_package_num" width="115"></el-table-column>
          <el-table-column label="入库包裹" header-align="center" align="center" prop="in_package_num" width="90"></el-table-column>
          <el-table-column label="入库数量" header-align="center" align="center" prop="in_storage_num" width="90"></el-table-column>
          <el-table-column label="PDA入库SKU数" header-align="center" align="center" prop="pda_in_storage_sku_num" width="125"></el-table-column>
          <el-table-column label="单品包裹数" header-align="center" align="center" prop="single_sku_package_num" width="105"></el-table-column>
          <el-table-column label="核单包裹数" header-align="center" align="center" prop="check_package_num" width="105"></el-table-column>
          <el-table-column label="拣货SKU种数" header-align="center" align="center" prop="picked_sku_num" width="115"></el-table-column>
          <el-table-column label="拣货总数量" header-align="center" align="center" prop="picked_total_num" width="105"></el-table-column>
          <el-table-column label="包裹数" header-align="center" align="center" prop="package_num" width="100"></el-table-column>
          <el-table-column label="拆包积分" header-align="center" align="center" prop="unpacking_integral" width="100"></el-table-column>
          <el-table-column label="打标积分" header-align="center" align="center" prop="marking_integral" width="100"></el-table-column>
          <el-table-column label="贴标积分" header-align="center" align="center" prop="labeling_integral" width="100"></el-table-column>
          <el-table-column label="上架积分" header-align="center" align="center" prop="on_shelf_integral" width="100"></el-table-column>
          <el-table-column label="拣货积分" header-align="center" align="center" prop="picking_integral" width="100"></el-table-column>
          <el-table-column label="打包积分" header-align="center" align="center" prop="packing_integral" width="100"></el-table-column>
          <el-table-column label="分拣积分" header-align="center" align="center" prop="sorting_integral" width="100"></el-table-column>
          <el-table-column label="其它得分项" header-align="center" align="center" prop="other_integral" width="100"></el-table-column>
          <el-table-column label="扣分项" header-align="center" align="center" prop="deduction_integral" width="105"></el-table-column>
          <el-table-column label="统计截止时间" header-align="center" align="center" prop="update_date" width="110">
              <template slot-scope="scope">{{scope.row.update_date | cutOutDate}}</template>
          </el-table-column>
        </el-table>
        <!-- <div class="toolbar">
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
        </div> -->
      </el-col>
    </div>
  </section>
</template>
<script type="text/ecmascript-6">
import { getIntegral, APIStockPerformExport } from "../../api/product";
import { getDeveloper,getMember,getPlatGoodsStatus } from "../../api/profit";
import { compareUp, compareDown, getMonthDate } from "../../api/tools";
export default {
  data() {
    return {
      tableHeightstock: window.innerHeight - 70,
      options: ["备货", "不备货"],
      listLoading: false,
      developer: [],
      purchaser: [],
      goodsState:[],
      condition: {
        sku: null,
        skuName: null,
        goodsSKUStatus: null,
        purchaser: null,
        pageSize: 20,
        page: 1,
        orderTime: []
      },
      total: null,
      nostockdata: [],
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
    cutOutDate(value){
      if(value)  value = value.substring(0, 11);
      return value;
    },
  },
  methods: {
    formatter(row, column) {
      return row.minOrderTime ? row.minOrderTime.substring(0, 16) : "";
    },
    exportExcel() {
      APIStockPerformExport(this.condition).then(res => {
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
    handleSizeChange(val) {
      this.condition.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.condition.page = val;
      this.getData();
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "color:#3c8dbc;background:#f5f7fa";
      } else {
        return "";
      }
    },
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
        } else {
          sums[index] = "N/A";
        }
        let arr = sums;
        if (index === 7) {
          sums[index] = Number(arr[7]).toFixed(2);
        }
      });

      return sums;
    },
    getData() {
      this.listLoading = true;
      getIntegral().then(res => {
        this.nostockdata = res.data.data;
        this.listLoading = false;
      });
    }
  },
  mounted() {
    getDeveloper().then(response => {
      this.developer = response.data.data;
    });
     getMember().then(response => {
      const res = response.data.data;
      this.purchaser = res.filter(ele => ele.position === "采购");
    });
    getPlatGoodsStatus().then(response => {
      this.goodsState = response.data.data;
    });
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
.clasRed {
  color: #c55 !important;
}
.clasGreen {
  color: #0e9a00;
}
.classa {
  color: #337ab7;
  text-decoration: none;
}
.clasRed1 {
  color: #f56c6c;
  border: rgba(245, 108, 108, 0.2) solid 1px;
  background: rgba(245, 108, 108, 0.1);
  width: 65%;
  margin: auto;
  line-height: 32px;
  display: block;
  border-radius: 5px;
}
.clasGreen1 {
  color: #0e9a00;
  border-radius: 5px;
  width: 65%;
  margin: auto;
  line-height: 32px;
  display: block;
  border: rgba(3, 82, 38, 0.2) solid 1px;
  background: rgba(33, 170, 95, 0.1);
}
.redCu {
  color: red;
  font-weight: bold;
}
.redblack {
  color: #606266;
}
.saleP {
  font-size: 14px;
  margin-top: 5px;
  display: block;
  text-align: right;
  padding-right: 10px;
}
.floet {
  overflow: hidden;
}
.floet01 {
  float: left;
  margin-right: 20px;
}
.winput{
  width: 140px;
}
@media (max-width: 1400px) {
  .floet01 {
    float: left;
    margin-right: 10px;
  }
  .winput{
    width: 100px;
  }
}
</style>
