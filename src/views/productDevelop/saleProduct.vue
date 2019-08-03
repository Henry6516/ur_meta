<template>
  <section>
    <div>
      <el-col :span="24" class="toolbar" style="padding:15px 25px;">
        <div class="floet">
          <div class="floet01">
            <span>是否是备货产品</span>
            <el-select
              v-model="condition.value"
              placeholder="请选择"
              size="small"
              style="width:150px;margin-left:10px;"
            >
              <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </div>
          <div class="floet01">
            <span>销售员</span>
            <el-select
              v-model="condition.value"
              placeholder="请选择"
              size="small"
              style="width:150px;margin-left:10px;"
            >
              <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </div>
          <div class="floet01">
            <span>开发时间</span>
            <el-date-picker
              size="small"
              v-model="condition.createDate"
              value-format="yyyy-MM-dd"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:250px;margin-left:10px;"
              :picker-options="pickerOptions2"
            ></el-date-picker>
          </div>
          <div class="floet01">
            <el-button size="small" type="primary">查询</el-button>
          </div>
          <div class="floet01">
            <el-button size="small" type="success">导出表格</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="24">
      <el-table
        :data="nostockdata"
        border
        class="elTableForm"
        :summary-method="getSummaries"
        :header-cell-style="getRowClass"
        show-summary
        :height="tableHeightstock"
        style="width: 98%;margin:auto;margin-top:15px;"
      >
        <el-table-column type="index" fixed align="center" width="80" header-align="center"></el-table-column>
        <el-table-column label="销售员" header-align="center" align="center" prop="developer"></el-table-column>
        <el-table-column label="销售产品款数" header-align="center" align="center" prop="number"></el-table-column>
        <el-table-column label="出单产品款数" header-align="center" align="center" prop="orderNum"></el-table-column>
        <el-table-column label="出单率(%)" header-align="center" align="center" prop="orderRate">
          <template slot-scope="scope">{{scope.row.orderRate | cutOut100}}</template>
        </el-table-column>
        <el-table-column label="旺款数量" header-align="center" align="center" prop="exuStyleNum"></el-table-column>
        <el-table-column label="旺款率(%)" header-align="center" align="center" prop="exuRate">
          <template slot-scope="scope">{{scope.row.exuRate | cutOut100}}</template>
        </el-table-column>
        <el-table-column label="爆款数量" header-align="center" align="center" prop="hotStyleNum"></el-table-column>
        <el-table-column label="爆款率(%)" header-align="center" align="center" prop="hotRate">
          <template slot-scope="scope">{{scope.row.hotRate | cutOut100}}</template>
        </el-table-column>
      </el-table>
      </el-col>
    </div>
  </section>
</template>
<script type="text/ecmascript-6">
import limit from "../reports/limit.vue";
import {
  APInoStock,
} from "../../api/product";
import { compareUp, compareDown, getMonthDate } from "../../api/tools";
export default {
  data() {
    return {
      tableHeightstock: window.innerHeight - 180,
      options: ["备货", "不备货"],
      condition: {
        value: null,
        createDate: []
      },
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
    cutOut: function(value) {
      if (!value) return "";
      value = value.substring(0, 21);
      return value;
    },
    cutOut100: function(value) {
      if (!value) return "";
      value = (value * 100).toFixed(0);
      return value;
    }
  },
  methods: {
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "color:#337ab7";
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
    getnoStock() {
      APInoStock().then(res => {
        this.nostockdata = res.data.data;
        this.noskuTotal = this.nostockdata.length;
      });
    }
  },
  mounted() {
    this.getnoStock();
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
</style>
