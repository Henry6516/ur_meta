<template>
  <section>
    <div>
      <el-col :span="24" class="toolbar" style="padding:15px 12px;">
        <div class="floet">
          <div class="floet01">
            <span>组别</span>
            <el-select size="small" v-model="condition.group" clearable style="width:130px;margin-left:10px;">
              <el-option v-for="item in group" :key="item" :value="item"></el-option>
            </el-select>
          </div>
          <div class="floet01">
            <span>岗位</span>
            <el-select size="small" v-model="condition.job" clearable style="width:130px;margin-left:10px;">
              <el-option v-for="item in job" :key="item" :value="item"></el-option>
            </el-select>
          </div>
          <div class="floet01">
            <span>人员</span>
            <el-select size="small" v-model="condition.name" clearable style="width:130px;margin-left:10px;">
              <el-option v-for="item in name" :key="item" :value="item"></el-option>
            </el-select>
          </div>
          <div class="floet01">
            <span>月份</span>
            <el-date-picker
              size="small"
              v-model="condition.month"
              type="month"
              value-format="yyyy-MM"
              style="width:150px;margin-left:10px;"
              placeholder="月份"
            ></el-date-picker>
          </div>
          <div class="floet01">
            <el-button size="small" type="primary" @click="getData()">查询</el-button>
          </div>
          <div class="floet01">
            <el-button size="small" type="success" @click="exportExcel">导出表格</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="24">
        <el-table
          :data="nostockdata"
          border
          class="elTableForm"
          @sort-change="sortNumber"
          :summary-method="getSummaries"
          show-summary
          :header-cell-style="getRowClass"
          v-loading="listLoading"
          :height="tableHeightstock"
          style="width: 100%;"
        >
          <el-table-column type="index" fixed align="center" header-align="center" width="45"></el-table-column>  
          <el-table-column label="姓名" fixed header-align="center" align="center" prop="name" width="80"></el-table-column>
          <el-table-column label="月份" fixed header-align="center" align="center" prop="month" width="80"></el-table-column>
          <el-table-column label="总积分"  header-align="center" align="center" prop="total_integral" width="100" sortable="custom"></el-table-column>
          <el-table-column label="计件工资"  header-align="center" align="center" prop="wages" width="105" sortable="custom">
            <template slot-scope="scope">
              <span style="color:red;">{{scope.row.wages}}</span>
            </template>
          </el-table-column>
          <el-table-column label="出勤天数" header-align="center" align="center" prop="all_days" width="110" sortable="custom"></el-table-column>
          <el-table-column label="贴标出勤天数" header-align="center" align="center" prop="labeling_days" width="130" sortable="custom"></el-table-column>
          <el-table-column label="分拣出勤天数" header-align="center" align="center" prop="sorting_days" width="130" sortable="custom"></el-table-column>  
          <el-table-column label="组别" header-align="center" align="center" prop="group" width="80"></el-table-column>
          <el-table-column label="职位" header-align="center" align="center" prop="job" width="80"></el-table-column>
          <el-table-column label="小组" header-align="center" align="center" prop="team" width="80"></el-table-column>
          <el-table-column label="拆包" header-align="center" align="center">
            <el-table-column label="采购入库包裹" header-align="center" align="center" prop="pur_in_package_num" width="130" sortable="custom"></el-table-column>
          </el-table-column>
          <el-table-column label="打标" header-align="center" align="center">
          <el-table-column label="打标入库包裹" header-align="center" align="center" prop="marking_in_storage_package_num" width="130" sortable="custom"></el-table-column>
          <el-table-column label="打标入库数量" header-align="center" align="center" prop="marking_in_storage_num" width="130" sortable="custom"></el-table-column>
          </el-table-column>
          <el-table-column label="贴标" header-align="center" align="center">
          <el-table-column label="贴标入库包裹" header-align="center" align="center" prop="labeling_in_storage_package_num" width="130" sortable="custom"></el-table-column>
          <el-table-column label="贴标入库数量" header-align="center" align="center" prop="labeling_in_storage_num" width="130" sortable="custom"></el-table-column>
          </el-table-column>
          <el-table-column label="上架" header-align="center" align="center">
          <el-table-column label="PDA入库SKU数" header-align="center" align="center" prop="pda_in_storage_sku_num" width="150" sortable="custom"></el-table-column>
          </el-table-column>
          <el-table-column label="拣货" header-align="center" align="center">
          <el-table-column label="单品包裹数" header-align="center" align="center" prop="single_package_num" width="115" sortable="custom"></el-table-column>
          <el-table-column label="核单包裹数" header-align="center" align="center" prop="multi_package_num" width="115" sortable="custom"></el-table-column>
          <el-table-column label="拣货SKU种数" header-align="center" align="center" prop="picking_sku_num" width="135" sortable="custom"></el-table-column>
          <el-table-column label="拣货总数量" header-align="center" align="center" prop="picking_total_num" width="115" sortable="custom"></el-table-column>
          </el-table-column>
          <el-table-column label="打包" header-align="center" align="center">
          <el-table-column label="打包单品包裹数" header-align="center" align="center" prop="pack_single_package_num" width="145" sortable="custom"></el-table-column>
          <el-table-column label="打包核单包裹数" header-align="center" align="center" prop="pack_multi_package_num" width="145" sortable="custom"></el-table-column>
          </el-table-column>
          <el-table-column label="分拣" header-align="center" align="center">
          <el-table-column label="分拣包裹数" header-align="center" align="center" prop="package_num" width="130" sortable="custom"></el-table-column>
          </el-table-column>
          <el-table-column label="拆包积分" header-align="center" align="center" prop="unpacking_integral" width="105" sortable="custom"></el-table-column>
          <el-table-column label="打标积分" header-align="center" align="center" prop="marking_integral" width="105" sortable="custom"></el-table-column>
          <el-table-column label="贴标积分" header-align="center" align="center" prop="labeling_integral" width="105" sortable="custom"></el-table-column>
          <el-table-column label="上架积分" header-align="center" align="center" prop="on_shelf_integral" width="105" sortable="custom"></el-table-column>
          <el-table-column label="拣货积分" header-align="center" align="center" prop="picking_integral" width="105" sortable="custom"></el-table-column>
          <el-table-column label="打包积分" header-align="center" align="center" prop="packing_integral" width="105" sortable="custom"></el-table-column>
          <el-table-column label="分拣积分" header-align="center" align="center" prop="sorting_integral" width="105" sortable="custom"></el-table-column>
          <el-table-column label="其它得分项" header-align="center" align="center" prop="other_integral" width="115" sortable="custom"></el-table-column>
          <el-table-column label="扣分项" header-align="center" align="center" prop="deduction_integral" width="105" sortable="custom"></el-table-column>
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
import { getIntegral, APIStockPerformExport,getqueryInfojob,getqueryInfoname,getqueryInfogroup } from "../../api/product";
import { getDeveloper,getMember,getPlatGoodsStatus } from "../../api/profit";
import { compareUp, compareDown, getMonthDate } from "../../api/tools";
export default {
  data() {
    return {
      group:[],
      job:[],
      name:[],
      tableHeightstock: window.innerHeight - 125,
      options: ["备货", "不备货"],
      listLoading: false,
      developer: [],
      purchaser: [],
      goodsState:[],
      time1:'',
      condition: {
        month:null,
        group:null,
        job:null,
        name:null,
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
    sortNumber(column, prop, order) {
      const data = this.nostockdata;
      if (column.order === "descending") {
        this.nostockdata = data.sort(compareDown(data, column.prop));
      } else {
        this.nostockdata = data.sort(compareUp(data, column.prop));
      }
    },
    formatter(row, column) {
      return row.minOrderTime ? row.minOrderTime.substring(0, 16) : "";
    },
    exportExcel() {
      const th = [
        "姓名",
        "月份",
        "总积分",
        "计件工资",
        "组别",
        "职位",
        "小组",
        "出勤天数",
        "贴标出勤天数",
        "分拣出勤天数",
        "采购入库包裹",
        "打标入库包裹",
        "打标入库数量",
        "贴标入库包裹",
        "贴标入库数量",
        "PDA入库SKU数",
        "单品包裹数",
        "核单包裹数",
        "打包单品包裹数",
        "打包核单包裹数",
        "拣货SKU种数",
        "拣货总数量",
        "分拣包裹数",
        "拆包积分",
        "打标积分",
        "贴标积分",
        "上架积分",
        "拣货积分",
        "打包积分",
        "分拣积分",
        "其它得分项",
        "扣分项",
        "统计截止时间",
      ];
      const filterVal = [
        "name",
        "month",
        "total_integral",
        "wages",
        "group",
        "job",
        "team",
        "all_days",
        "labeling_days",
        "sorting_days",
        "pur_in_package_num",
        "marking_in_storage_package_num",
        "marking_in_storage_num",
        "labeling_in_storage_package_num",
        "labeling_in_storage_num",
        "pda_in_storage_sku_num",
        "single_package_num",
        "multi_package_num",
        "pack_single_package_num",
        "pack_multi_package_num",
        "picking_sku_num",
        "picking_total_num",
        "package_num",
        "unpacking_integral",
        "marking_integral",
        "labeling_integral",
        "on_shelf_integral",
        "picking_integral",
        "packing_integral",
        "sorting_integral",
        "other_integral",
        "deduction_integral",
        "update_date",
      ];
      const Filename = "仓库积分报表";
      const data = this.nostockdata.map(v => filterVal.map(k => v[k]));
      const [fileName, fileType, sheetName] = [Filename, "xls"];
      this.$toExcel({ th, data, fileName, fileType, sheetName });
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
      }else if(rowIndex == 1 || columnIndex>3){
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
      });

      return sums;
    },
    getData() {
      this.listLoading = true;
      getIntegral(this.condition).then(res => {
        this.nostockdata = res.data.data;
        for(let i =0;i<this.nostockdata.length;i++){
          if(this.nostockdata[i].total_integral=='0'){
            this.nostockdata.splice(i--,1);
          }
        }
        this.listLoading = false;
      });
    }
  },
  mounted() {
    getDeveloper().then(response => {
      this.developer = response.data.data;
    });
    getqueryInfojob().then(response => {
      this.job = response.data.data;
    });
    getqueryInfoname().then(response => {
      this.name = response.data.data;
    });
    getqueryInfogroup().then(response => {
      this.group = response.data.data;
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
