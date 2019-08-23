<template>
  <section>
    <div>
      <el-col :span="24" class="toolbar tabe" style="padding:15px 25px;">
        <div class="floet">
          <div class="floet01">
            <span>主类目</span>
            <el-select
              v-model="condition.cat"
              placeholder="请选择"
              size="small"
              clearable
              class="m10"
              style="width:110px;"
            >
              <el-option v-for="item in mainCategory" :value="item" :key="item"></el-option>
            </el-select>
          </div>
          <div class="floet01">
            <span>交易类型</span>
            <el-select
              v-model="condition.dateFlag"
              placeholder="请选择"
              size="small"
              clearable
              style="width:150px;margin-left:10px;"
            >
              <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </div>
          <div class="floet01">
            <span style="color:red">订单时间</span>
            <el-date-picker
              size="small"
              clearable
              v-model="condition.orderDate"
              value-format="yyyy-MM-dd"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              class="m10 m210"
              :picker-options="pickerOptions2"
            ></el-date-picker>
          </div>
          <div class="floet01">
            <span>开发时间</span>
            <el-date-picker
              size="small"
              v-model="condition.devDate"
              value-format="yyyy-MM-dd"
              type="daterange"
              clearable
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              class="m10 m210"
              :picker-options="pickerOptions2"
            ></el-date-picker>
          </div>
          <div class="floet01">
            <el-button size="small" type="primary" @click="getTableData()">查询</el-button>
          </div>
        </div>
      </el-col>
      <div>
        <el-table
          :data="tableData"
          border
          class="elTableForm"
          :summary-method="getSummaries"
          :header-cell-style="getRowClass"
          show-summary
          v-show="tableTrue"
          v-loading="listLoadingTable"
          style="width: 100%;margin:auto;margin-top:15px;"
        >
          <el-table-column type="index" fixed align="center" width="80" header-align="center"></el-table-column>
          <el-table-column
            label="主类目/子分类"
            header-align="center"
            align="center"
            prop="CategoryParentName"
          ></el-table-column>
          <el-table-column label="产品总款数" header-align="center" align="center" prop="catCodeNum"></el-table-column>
          <el-table-column label="非清仓款数" header-align="center" align="center" prop="non_catCodeNum"></el-table-column>
          <el-table-column label="非清仓款数占比%" header-align="center" align="center" prop="numRate"></el-table-column>
          <el-table-column label="销量" header-align="center" align="center" prop="l_qty"></el-table-column>
          <el-table-column label="非清仓销量" header-align="center" align="center" prop="non_l_qty"></el-table-column>
          <el-table-column label="销量占比" header-align="center" align="center" prop="qtyRate"></el-table-column>
          <el-table-column label="销售额（$）" header-align="center" align="center" prop="l_AMT"></el-table-column>
          <el-table-column label="非清仓销售额（$）" header-align="center" align="center" prop="non_l_AMT"></el-table-column>
          <el-table-column label="销售额占比(%)" header-align="center" align="center" prop="amtRate"></el-table-column>
        </el-table>
      </div>
      <el-col :span="24" style="margin-top:1px;">
        <el-col :span="12">
          <el-card>
            <div ref="or1" :style="sty" v-loading="listLoading"></div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <div ref="or2" :style="sty" v-loading="listLoading"></div>
          </el-card>
        </el-col>
      </el-col>
    </div>
  </section>
</template>
<script type="text/ecmascript-6">
import { APICatPerform, APIDataCat } from "../../api/product";
import { getAttributeInfoCat } from "../../api/profit";
import {
  compareUp,
  compareDown,
  getMonthDate,
  getNextDate
} from "../../api/tools";
export default {
  data() {
    return {
      tableHeightstock: window.innerHeight - 174,
      options: ["交易时间", "发货时间"],
      total: null,
      developer: [],
      tableData: [],
      mainCategory: [],
      listLoadingTable: false,
      tableTrue: false,
      sty: {
        width: "100%",
        height: window.innerHeight - 168 + "px"
      },
      listLoading: false,
      condition: {
        cat: null,
        dateFlag: "交易时间",
        orderDate: [],
        devDate: []
      },
      options1: {
        title: {
          top: 20,
          text: "30天-类目款数",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          type: "scroll",
          x: "center",
          y: "bottom",
          data: []
        },
        toolbox: {
          top: 10,
          right: 10,
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ["pie", "funnel"]
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "60%",
            data: []
          }
        ]
      },
      options2: {
        title: {
          top: 20,
          text: "30天-类目销售额($)",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          type: "scroll",
          x: "center",
          y: "bottom",
          data: []
        },
        toolbox: {
          top: 10,
          right: 10,
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ["pie", "funnel"]
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "60%",
            data: []
          }
        ]
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
  methods: {
    getdata() {
      this.listLoading = true;
      APICatPerform(this.condition).then(response => {
        this.listLoading = false;
        var dataArr1 = response.data.data;
        var arr1Name = [];
        var arr1Data = [];
        for (let i = 0; i < dataArr1.length; i++) {
          arr1Name.push(dataArr1[i].category);
          var obj = {
            value: dataArr1[i].num,
            name: dataArr1[i].category
          };
          arr1Data.push(obj);
        }
        this.options1.legend.data = arr1Name;
        this.options1.series[0].data = arr1Data;
        let or1 = this.$echarts.init(this.$refs.or1);
        or1.setOption(this.options1);
        var dataArr2 = response.data.data;
        var arr2Name = [];
        var arr2Data = [];
        for (let i = 0; i < dataArr2.length; i++) {
          arr2Name.push(dataArr2[i].category);
          var obj = {
            value: dataArr2[i].amt,
            name: dataArr2[i].category
          };
          arr2Data.push(obj);
        }
        this.options2.legend.data = arr2Name;
        this.options2.series[0].data = arr2Data;
        let or2 = this.$echarts.init(this.$refs.or2);
        or2.setOption(this.options2);
      });
    },
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
    getTableData() {
      this.condition.dateFlag == "交易时间"
        ? (this.condition.dateFlag = 0)
        : (this.condition.dateFlag = 1);
      this.tableTrue = true;
      this.listLoadingTable = true;
      APIDataCat(this.condition).then(response => {
        this.tableData = response.data.data.items;
        this.condition.dateFlag == 0
          ? (this.condition.dateFlag = "交易时间")
          : (this.condition.dateFlag = "发货时间");
        this.listLoadingTable = false;
      });
    }
  },
  mounted() {
    var startData = getMonthDate("lastMonth").start;
    var endData = getMonthDate("lastMonth").end;
    this.condition.orderDate = [
      getNextDate(startData, -1),
      getNextDate(endData, -1)
    ];
    getAttributeInfoCat().then(response => {
      this.mainCategory = response.data.data;
    });
    this.getdata();
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
.el-button {
  margin-left: 0px;
}
.m10 {
  margin-left: 10px;
}
.rid100 {
  margin-left: 10px;
}
.m210 {
  width: 230px;
}
</style>
