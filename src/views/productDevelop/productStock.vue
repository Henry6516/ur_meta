<template>
  <section>
    <div>
      <el-col :span="24" class="toolbar" style="padding:15px 25px;">
        <div class="floet">
          <div class="floet01">
            <span>开发员</span>
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
            <span>商品编码</span>
            <el-input placeholder="请输入商品编码" size="small" style="width:180px;margin-left:10px;"></el-input>
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
          <el-table-column label="开发员" header-align="center" align="center" prop="exuStyleNum"></el-table-column>
          <el-table-column label="商品编码" header-align="center" align="center" prop="developer"></el-table-column>
          <el-table-column label="商品名称" header-align="center" align="center" prop="number"></el-table-column>
          <el-table-column label="开发日期" header-align="center" align="center" prop="orderNum"></el-table-column>
          <el-table-column label="产品状态" header-align="center" align="center" prop="orderRate"></el-table-column>
          <el-table-column label="库存数量" header-align="center" align="center" prop="exuRate"></el-table-column>
          <el-table-column label="库存金额(￥)" header-align="center" align="center" prop="hotStyleNum"></el-table-column>
          <el-table-column label="5天销量" header-align="center" align="center" prop="hotRate"></el-table-column>
          <el-table-column label="10天销量" header-align="center" align="center" prop="hotRate"></el-table-column>
          <el-table-column label="20天销量" header-align="center" align="center" prop="hotRate"></el-table-column>
        </el-table>
      </el-col>
    </div>
  </section>
</template>
<script type="text/ecmascript-6">
import { APInoStock } from "../../api/product";
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
