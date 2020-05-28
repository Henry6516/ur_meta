<template>
  <section>
    <div>
      <el-col :span="24" class="toolbar" style="padding:15px 15px;">
        <div class="floet">
          <div class="floet01">
            <span>扫描人</span>
            <el-select
              size="small"
              v-model="condition.member"
              multiple
              collapse-tags
              filterable
              style="width:170px;"
              placeholder="扫描人"
            >
              <el-option
                v-for="(item,index) in memeberData"
                :index="index"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </div>
          <div class="floet01">
            <span>扫描时间</span>
            <el-date-picker
              size="small"
              v-model="condition.date"
              value-format="yyyy-MM-dd"
              type="daterange"
              align="right"
              clearable
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:220px;margin-left:10px;"
              :picker-options="pickerOptions2"
            ></el-date-picker>
          </div>
          <div class="floet01">
            <el-button size="small" type="primary" @click="getData()">查询</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="24">
        <el-table
          :data="nostockdata"
          border
          class="elTableForm"
          :header-cell-style="getRowClass"
          v-loading="listLoading"
          :height="tableHeightstock"
          style="width: 100%;margin:auto;"
        >
          <el-table-column type="index" fixed align="center" width="50" header-align="center"></el-table-column>
          <el-table-column label="入库单号" header-align="center" align="center" prop="billNumber">
              <el-table-column prop="billNumber" :render-header="renderHeader" align="center"></el-table-column>
          </el-table-column>
          <el-table-column label="姓名" header-align="center" align="center" prop="recorder"></el-table-column>
          <el-table-column label="时间" header-align="center" align="center" prop="makeDate" :formatter="formatter"></el-table-column>
        </el-table>
        <div class="toolbar">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="this.condition.page"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="this.condition.pageSize"
            layout="total, sizes, slot, prev, pager, next, jumper"
            :total="this.total"
          >
          </el-pagination>
        </div>
      </el-col>
    </div>
  </section>
</template>
<script type="text/ecmascript-6">
import { APIFreight } from "../../api/product";
import { getMemberCk } from "../../api/profit";
import { compareUp, compareDown, getMonthDate } from "../../api/tools";
export default {
  data() {
    return {
      tableHeightstock: window.innerHeight - 155,
      listLoading: false,
      developer: [],
      purchaser: [],
      goodsState:[],
      memeberData:[],
      condition: {
        member: null,
        pageSize: 100,
        billNumber:null,
        page: 1,
        date: []
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
    cutOutMonye: function(value) {
      if (!value) return "";
      value = Number(value).toFixed(2);
      return value;
    }
  },
  methods: {
    renderHeader(h, { column, $index }) {
      if ($index === 0) {
        return h(
          "div",
          {
            style: {
              width:'95%',  
              height: "30px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.condition.billNumber,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.billNumber = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.getData();
                }
              }
            })
          ]
        );
      }
    },      
    showAll() {
      this.handleSizeChange(this.total)
    },
    formatter(row, column) {
      return row.makeDate ? row.makeDate.substring(0, 16) : "";
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
      });

      return sums;
    },
    getData() {
      this.listLoading = true;
      APIFreight(this.condition).then(res => {
        this.nostockdata = res.data.data.items;
        this.condition.page = res.data.data._meta.currentPage;
        this.condition.pageSize = res.data.data._meta.perPage;
        this.total = res.data.data._meta.totalCount;
        this.listLoading = false;
      });
    }
  },
  mounted() {
    getMemberCk().then(response => {
      this.memeberData = response.data.data;
    });
    this.condition.date = [
      getMonthDate("lastMonth").start,
       getMonthDate("lastMonth").end,
    ];
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
    margin-right: 5px;
  }
  .winput{
    width: 115px;
  }
}
</style>
