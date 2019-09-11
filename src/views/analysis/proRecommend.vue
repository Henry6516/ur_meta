<template>
  <section>
    <div>
      <el-tabs v-model="activeName" type="card" style="background-color:#fff">
        <el-tab-pane v-for="(item, index) in this.allMenu" :label="item" :name="item" :key="index"></el-tab-pane>
      </el-tabs>
      <el-col :span="24" class="toolbar" style="padding:15px 12px;">
        <div class="floet">
          <div class="floet01">
            <span>店铺名称</span>
            <el-input
              placeholder="店铺名称"
              size="small"
              class="winput"
              style="margin-left:2px;"
              v-model="condition.sku"
              clearable
            ></el-input>
          </div>
          <div class="floet01">
            <span>商品售价</span>
            <el-input
              placeholder="商品售价"
              size="small"
              class="winput"
              style="margin-left:2px;"
              v-model="condition.location"
              clearable
            ></el-input>
          </div>
          <div class="floet01">
            <span>总销量</span>
            <el-input
              placeholder="总销量"
              size="small"
              class="winput"
              style="margin-left:2px;"
              v-model="condition.store	"
              clearable
            ></el-input>
          </div>
          <div class="floet01">
            <span>产品 ID</span>
            <el-input
              placeholder="产品 ID"
              size="small"
              class="winput"
              style="margin-left:2px;"
              v-model="condition.person"
              clearable
            ></el-input>
          </div>
          <div class="floet01">
            <span>发货地</span>
            <el-input
              placeholder="发货地"
              size="small"
              class="winput"
              style="margin-left:2px;"
              v-model="condition.person"
              clearable
            ></el-input>
          </div>
          <div class="floet01">
            <span>商品关键字</span>
            <el-input
              placeholder="商品关键字"
              size="small"
              class="winput"
              style="margin-left:2px;"
              v-model="condition.person"
              clearable
            ></el-input>
          </div>
          <div class="floet01">
            <span>上架时间</span>
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
              style="width:200px;margin-left:10px;"
              :picker-options="pickerOptions2"
            ></el-date-picker>
          </div>
          <div class="floet01">
            <el-button size="small" type="primary" @click="getData()">查询</el-button>
          </div>
          <!-- <div class="floet01">
            <el-button size="small" type="success" @click="exportExcel">导出表格</el-button>
          </div>-->
        </div>
      </el-col>
      <div class="proBox">
        <div class="proCase01" v-for="(item,index) in 21" :key="index">
          <div class="priImg">
            <img src="https://cbu01.alicdn.com/img/ibank/2018/967/507/9906705769_508626403.jpg" />
          </div>
          <div class="proText">
            <div class="pro01">
              <p>
                评论数
                <span class="pred">100</span>
              </p>
              <p>
                评分
                <span class="pred">100</span>
              </p>
            </div>
            <div class="pro01">
              <p>
                USD
                <span class="pblue">100</span>
              </p>
              <p>
                上线
                <span class="pblue">70天</span>
              </p>
            </div>
          </div>
          <div class="pbottom">
            <a class="goDev">立即开发</a>
            <a class="goStore">供应商</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script type="text/ecmascript-6">
import { APIWareSku, APIStockPerformExport } from "../../api/product";
import { getDeveloper, getMember, getPlatGoodsStatus } from "../../api/profit";
import { compareUp, compareDown, getMonthDate } from "../../api/tools";
export default {
  data() {
    return {
      tableHeightstock: window.innerHeight - 160,
      allMenu: ["Wish", "Ebay", "Joom"],
      listLoading: false,
      activeName: "Wish",
      developer: [],
      purchaser: [],
      goodsState: [],
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
    formatter(row, column) {
      return row.changeTime ? row.changeTime.substring(0, 16) : "";
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
  width: 100%;
}
.floet01 {
  float: left;
  margin-right: 18px;
}
.winput {
  width: 140px;
}
.proBox {
  width: 100%;
  overflow: hidden;
}
.proCase01 {
  width: 11.25%;
  float: left;
  margin: 0 1.2%;
  margin-top: 15px;
  border: 5px solid #f0f0f0;
  background: rgb(243, 243, 243);
}
.priImg {
  max-width: 100%;
  max-height: 100%;
}
.priImg img {
  display: block;
  width: 100%;
  height: 100%;
}
.proText {
  width: 100%;
  overflow: hidden;
}
.pro01 {
  width: 100%;
  overflow: hidden;
}
.proText p {
  margin: 0;
  padding: 0;
  font-size: 13px;
  text-align: center;
  margin-top: 10px;
}
.proText p:first-child {
  float: left;
  margin-left: 5%;
}
.proText p:last-child {
  float: right;
  margin-right: 5%;
}
.pred {
  color: #ff7f00;
}
.pblue {
  color: #337ab7;
}
.pbottom {
  width: 100%;
}
.goDev {
  width: 45%;
  background: #3c8dbc;
  display: block;
  text-align: center;
  color: #fff;
  float: left;
  margin-left: 2%;
  line-height: 28px;
  font-size: 13px;
  cursor: pointer;
  margin-top: 5px;
  margin-bottom: 5px;
}
.goStore {
  width: 45%;
  background: #e6a23c;
  display: block;
  text-align: center;
  color: #fff;
  float: right;
  margin-right: 2%;
  line-height: 28px;
  font-size: 13px;
  cursor: pointer;
  margin-top: 5px;
  margin-bottom: 5px;
}
@media (max-width: 1400px) {
  .floet01 {
    float: left;
    margin-right: 10px;
  }
  .winput {
    width: 130px;
  }
  .proCase01 {
    width: 11%;
  }
  .proText p:first-child {
    float: left;
    margin-left: 0%;
    font-size: 12px;
  }
  .proText p:last-child {
    float: right;
    margin-right: 0%;
    font-size: 12px;
  }
  .goDev{
      font-size: 12px;
  }
  .goStore{
      font-size: 12px;
  }
}
</style>
