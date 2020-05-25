<template>
  <section>
    <div>
      <el-col :span="24" class="toolbar" style="padding:15px 12px;">
        <div class="floet">
          <div class="floet01">
            <span>SKU</span>
            <el-input
              placeholder="SKU"
              size="small"
              class="winput"
              style="margin-left:10px;"
              v-model="condition.sku"
              clearable
            ></el-input>
          </div>
          <div class="floet01">
            <span>库位</span>
            <el-input
              placeholder="库位"
              size="small"
              class="winput"
              style="margin-left:10px;"
              v-model="condition.location"
              clearable
            ></el-input>
          </div>
          <div class="floet01">
            <span>仓库</span>
            <el-input
              placeholder="仓库"
              size="small"
              class="winput"
              style="margin-left:10px;"
              v-model="condition.store"
              clearable
            ></el-input>
          </div>
          <div class="floet01">
            <span>操作人</span>
            <el-input
              placeholder="操作人"
              size="small"
              class="winput"
              style="margin-left:10px;"
              v-model="condition.person"
              clearable
            ></el-input>
          </div>
          <div class="floet01">
            <span>订单时间</span>
            <el-date-picker
              size="small"
              v-model="condition.changeTime"
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
          :header-cell-style="getRowClass"
          v-loading="listLoading"
          :height="tableHeightstock"
          style="width: 100%;margin:auto;"
        >
          <el-table-column type="index" fixed align="center" width="50" header-align="center"></el-table-column>
          <el-table-column label="sku" header-align="center" align="center" prop="sku"></el-table-column>
          <el-table-column label="操作人" header-align="center" align="center" prop="person"></el-table-column>
          <el-table-column label="类型" header-align="center" align="center" prop="type"></el-table-column>
          <el-table-column label="仓库" header-align="center" align="center" prop="storeName"></el-table-column>
          <el-table-column label="库位" header-align="center" align="center" prop="locationName"></el-table-column>
          <el-table-column
            label="操作时间"
            header-align="center"
            align="center"
            prop="changeTime"
            :formatter="formatter"
          ></el-table-column>
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
          <span>
            <el-button type="text"
                       @click="showAll">显示全部</el-button>
          </span>
          </el-pagination>
        </div>
      </el-col>
    </div>
  </section>
</template>
<script type="text/ecmascript-6">
import { APIWareSku, APIWareSkuExport } from "../../api/product";
import { getDeveloper,getMember,getPlatGoodsStatus } from "../../api/profit";
import { compareUp, compareDown, getMonthDate } from "../../api/tools";
export default {
  data() {
    return {
      tableHeightstock: window.innerHeight - 155,
      options: ["备货", "不备货"],
      listLoading: false,
      developer: [],
      purchaser: [],
      goodsState:[],
      condition: {
        sku: null,
        location: null,
        store: null,
        person: null,
        pageSize: 100,
        page: 1,
        changeTime: []
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
    showAll() {
      this.handleSizeChange(this.total)
    },
    formatter(row, column) {
      return row.changeTime ? row.changeTime.substring(0, 16) : "";
    },
    exportExcel() {
      APIWareSkuExport(this.condition).then(res => {
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
      APIWareSku(this.condition).then(res => {
        this.nostockdata = res.data.data.items;
        this.condition.page = res.data.data._meta.currentPage;
        this.condition.pageSize = res.data.data._meta.perPage;
        this.total = res.data.data._meta.totalCount;
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
    this.condition.changeTime = [
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
