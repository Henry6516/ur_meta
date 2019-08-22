<template>
  <section>
    <div>
      <el-col :span="24" class="toolbar tabe" style="padding:15px 25px;">
        <div class="floet">
          <div class="floet01">
            <span>开发员</span>
            <el-select
              v-model="condition.saler"
              placeholder="请选择"
              size="small"
              class="m10"
              clearable
              style="width:110px;"
            >
              <el-option v-for="item in developer" :value="item" :key="item"></el-option>
            </el-select>
          </div>
          <div class="floet01">
            <span>时间类型</span>
            <el-radio-group v-model="condition.dateFlag">
              <el-radio
                border
                v-for="(item,index) in dateType"
                :index="index"
                :key="item.id"
                :label="item.id"
                :value="item.id"
                class="rid100"
              >{{item.type}}</el-radio>
            </el-radio-group>
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
              clearable
              v-model="condition.devDate"
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
            <el-button size="small" type="primary" @click="getdata()">查询</el-button>
          </div>
          <div class="floet01">
            <el-button size="small" type="success">导出</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="24">
        <el-table
          :data="tableData"
          border
          class="elTableForm"
          :summary-method="getSummaries"
          :header-cell-style="getRowClass"
          show-summary
          v-loading="listLoading"
          :height="tableHeightstock"
          style="width: 98%;margin:auto;margin-top:15px;"
        >
          <el-table-column type="index" fixed align="center" width="80" header-align="center"></el-table-column>
          <el-table-column label="开发员" header-align="center" align="center" prop="developer"></el-table-column>
          <el-table-column label="商品编码" header-align="center" align="center" prop="goodsCode"></el-table-column>
          <el-table-column
            label="商品名称"
            header-align="center"
            align="center"
            prop="goodsName"
            min-width="180"
          ></el-table-column>
          <el-table-column label="开发日期" header-align="center" align="center" prop="createDate"></el-table-column>
          <el-table-column label="产品状态" header-align="center" align="center" prop="goodsStatus"></el-table-column>
          <el-table-column label="销量" header-align="center" align="center" prop="l_qty"></el-table-column>
          <el-table-column label="销售额($)" header-align="center" align="center" prop="l_amt"></el-table-column>
        </el-table>
        <div class="toolbar">
          <el-pagination
            background
            style="margin-left:12px;"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="this.condition.page"
            :page-size="this.condition.pageSize"
            :page-sizes="[20,30,40,50]"
            layout="total,sizes,prev,pager,next,jumper"
            :total="this.total"
          ></el-pagination>
        </div>
      </el-col>
    </div>
  </section>
</template>
<script type="text/ecmascript-6">
import { getProductPerform } from "../../api/product";
import { getDeveloper } from "../../api/profit";
import { compareUp, compareDown, getMonthDate } from "../../api/tools";
export default {
  data() {
    return {
      tableHeightstock: window.innerHeight - 214,
      options: [],
      total: null,
      developer:[],
      listLoading: false,
      dateType: [{ id: 0, type: "交易时间" }, { id: 1, type: "发货时间" }],
      condition: {
        saler: null,
        dateFlag: 0,
        orderDate: [],
        devDate: [],
        pageSize: 20,
        page: 1
      },
      tableData: [],
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
    handleSizeChange(val) {
      this.condition.pageSize = val;
      this.getdata(this.condition);
    },
    handleCurrentChange(val) {
      this.condition.page = val;
      this.getdata(this.condition);
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
    getdata() {
      this.listLoading = true;
      getProductPerform(this.condition).then(response => {
        this.listLoading = false;
        this.tableData = response.data.data.items;
        this.total = response.data.data._meta.totalCount;
        this.condition.page = response.data.data._meta.currentPage;
        this.condition.pageSize = response.data.data._meta.perPage;
      });
    }
  },
  mounted() {
    this.condition.orderDate = [
      getMonthDate("lastMonth").start,
      getMonthDate("lastMonth").end
    ];
    getDeveloper().then(response => {
      const possessMan = response.data.data;
      this.developer = possessMan
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
@media screen and (max-width: 1500px) {
  .m10 {
    margin-left: 1px !important;
  }
  .rid100 {
    margin-left: 1px !important;
  }
  .floet01 {
    margin-right: 3px !important;
  }
  .tabe {
    padding-left: 10px !important;
  }
  .m210 {
    width: 205px;
  }
}
</style>
