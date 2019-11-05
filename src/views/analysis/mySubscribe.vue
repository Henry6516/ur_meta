<template>
  <section>
    <div>
      <el-tabs
        v-model="activeNameAll"
        type="card"
        style="background-color:#fff"
        @tab-click="handleClick"
      >
        <el-tab-pane
          v-for="(item, index) in this.allMenuAll"
          :label="item"
          :name="item"
          :key="index"
        ></el-tab-pane>
      </el-tabs>
      <div v-show="show.wish">
        <div class="myCat">
          <div class="tabPlat">
            <a
              :class="platActive==index?'platActive':''"
              v-for="(item, index) in this.allMenu"
              :key="index"
            >{{item.name}}</a>
            <div class="tabRight">
              <div class="tr01">
                <span class="trActive"></span>
                <P>美国</P>
              </div>
              <div class="tr01">
                <span></span>
                <P>英国</P>
              </div>
              <div class="tr01">
                <span></span>
                <P>澳大利亚</P>
              </div>
            </div>
          </div>
        </div>
        <div class="proBox">
          <el-col :span="24">
            <el-table
              :data="nostockdata"
              border
              class="elTableForm"
              :header-cell-style="getRowClass"
              v-loading="listLoading"
              :height="tableHeightstock"
              style="width: 98%;margin:auto;margin-top:5px;"
            >
              <el-table-column label="商品标题" header-align="center" align="center" prop="sku">
                <template slot-scope="scope">
                  <span>Tempered</span>
                </template>
              </el-table-column>
              <el-table-column label="商品分类" header-align="center" align="center" prop="sku">
                <template slot-scope="scope">
                  <span>PC Laptops & Netbooks</span>
                </template>
              </el-table-column>
              <el-table-column label="售价" header-align="center" align="center" prop="sku">
                <template slot-scope="scope">
                  <span>23.33</span>
                </template>
              </el-table-column>
              <el-table-column label="总销量" header-align="center" align="center" prop="sku">
                <template slot-scope="scope">
                  <span>2,195</span>
                </template>
              </el-table-column>
              <el-table-column label="销量" header-align="center" align="center" prop="sku">
                <template slot-scope="scope">
                  <span>2,195</span>
                </template>
              </el-table-column>
              <el-table-column label="销售额" header-align="center" align="center" prop="sku">
                <template slot-scope="scope">
                  <span>2,195</span>
                </template>
              </el-table-column>
              <el-table-column label="交易增幅" header-align="center" align="center" prop="sku">
                <template slot-scope="scope">
                  <span>2,195</span>
                </template>
              </el-table-column>
              <el-table-column label="店铺名称" header-align="center" align="center" prop="sku">
                <template slot-scope="scope">
                  <span>reebok</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作时间"
                header-align="center"
                align="center"
                prop="changeTime"
                :formatter="formatter"
              >
                <template slot-scope="scope">
                  <span>2019-05-16</span>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </div>
      </div>
      <div v-show="show.ebay">
        <div class="myCat">
          <div class="tabPlat">
            <a
              :class="platActive==index?'platActive':''"
              v-for="(item, index) in this.allMenu"
              :key="index"
            >{{item.name}}</a>
            <div class="tabRight">
              <div class="tr01">
                <span class="trActive"></span>
                <P>美国</P>
              </div>
              <div class="tr01">
                <span></span>
                <P>英国</P>
              </div>
              <div class="tr01">
                <span></span>
                <P>澳大利亚</P>
              </div>
            </div>
          </div>
        </div>
        <div class="proBox">
          <el-col :span="24">
            <el-table
              :data="nostockdata"
              border
              class="elTableForm"
              :header-cell-style="getRowClass"
              v-loading="listLoading"
              :height="tableHeightstock"
              style="width: 98%;margin:auto;margin-top:5px;"
            >
              <el-table-column label="商品标题" header-align="center" align="center" prop="sku">
                <template slot-scope="scope">
                  <span>Tempered</span>
                </template>
              </el-table-column>
              <el-table-column label="商品分类" header-align="center" align="center" prop="sku">
                <template slot-scope="scope">
                  <span>PC Laptops & Netbooks</span>
                </template>
              </el-table-column>
              <el-table-column label="售价" header-align="center" align="center" prop="sku">
                <template slot-scope="scope">
                  <span>23.33</span>
                </template>
              </el-table-column>
              <el-table-column label="总销量" header-align="center" align="center" prop="sku">
                <template slot-scope="scope">
                  <span>2,195</span>
                </template>
              </el-table-column>
              <el-table-column label="销量" header-align="center" align="center" prop="sku">
                <template slot-scope="scope">
                  <span>2,195</span>
                </template>
              </el-table-column>
              <el-table-column label="销售额" header-align="center" align="center" prop="sku">
                <template slot-scope="scope">
                  <span>2,195</span>
                </template>
              </el-table-column>
              <el-table-column label="交易增幅" header-align="center" align="center" prop="sku">
                <template slot-scope="scope">
                  <span>2,195</span>
                </template>
              </el-table-column>
              <el-table-column label="店铺名称" header-align="center" align="center" prop="sku">
                <template slot-scope="scope">
                  <span>reebok</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作时间"
                header-align="center"
                align="center"
                prop="changeTime"
                :formatter="formatter"
              >
                <template slot-scope="scope">
                  <span>2019-05-16</span>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </div>
      </div>
      <div v-show="show.joom">
        <div class="myCat">
          <div class="tabPlat">
            <a
              :class="platActive==index?'platActive':''"
              v-for="(item, index) in this.allMenu"
              :key="index"
            >{{item.name}}</a>
            <div class="tabRight">
              <div class="tr01">
                <span class="trActive"></span>
                <P>美国</P>
              </div>
              <div class="tr01">
                <span></span>
                <P>英国</P>
              </div>
              <div class="tr01">
                <span></span>
                <P>澳大利亚</P>
              </div>
            </div>
          </div>
        </div>
        <div class="proBox">
          <el-col :span="24">
            <el-table
              :data="nostockdata"
              border
              class="elTableForm"
              :header-cell-style="getRowClass"
              v-loading="listLoading"
              :height="tableHeightstock"
              style="width: 98%;margin:auto;margin-top:5px;"
            >
              <el-table-column label="商品标题" header-align="center" align="center" prop="sku">
                <template slot-scope="scope">
                  <span>Tempered</span>
                </template>
              </el-table-column>
              <el-table-column label="商品分类" header-align="center" align="center" prop="sku">
                <template slot-scope="scope">
                  <span>PC Laptops & Netbooks</span>
                </template>
              </el-table-column>
              <el-table-column label="售价" header-align="center" align="center" prop="sku">
                <template slot-scope="scope">
                  <span>23.33</span>
                </template>
              </el-table-column>
              <el-table-column label="总销量" header-align="center" align="center" prop="sku">
                <template slot-scope="scope">
                  <span>2,195</span>
                </template>
              </el-table-column>
              <el-table-column label="销量" header-align="center" align="center" prop="sku">
                <template slot-scope="scope">
                  <span>2,195</span>
                </template>
              </el-table-column>
              <el-table-column label="销售额" header-align="center" align="center" prop="sku">
                <template slot-scope="scope">
                  <span>2,195</span>
                </template>
              </el-table-column>
              <el-table-column label="交易增幅" header-align="center" align="center" prop="sku">
                <template slot-scope="scope">
                  <span>2,195</span>
                </template>
              </el-table-column>
              <el-table-column label="店铺名称" header-align="center" align="center" prop="sku">
                <template slot-scope="scope">
                  <span>reebok</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作时间"
                header-align="center"
                align="center"
                prop="changeTime"
                :formatter="formatter"
              >
                <template slot-scope="scope">
                  <span>2019-05-16</span>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </div>
      </div>
    </div>
  </section>
</template>
<script type="text/ecmascript-6">
import { APIWareSku, APIStockPerformExport } from "../../api/product";
import { getMenu } from "../../api/login";
export default {
  data() {
    return {
      tableHeightstock: window.innerHeight - 160,
      allMenuAll: ["Wish", "Ebay", "Joom", "Amazon", "Aliexpress"],
      activeNameAll: "Wish",
      listLoading: false,
      platActive: 0,
      allMenu: [],
      activeName: "/v1/products-engine/watch-category",
      developer: [],
      purchaser: [],
      goodsState: [],
      show: {
        wish: true,
        ebay: false,
        joom: false
      },
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
    handleClick(tab, event) {
      if (tab.name === "Wish") {
        this.show["wish"] = true;
      } else {
        this.show["wish"] = false;
      }
      if (tab.name === "Ebay") {
        this.show["ebay"] = true;
      } else {
        this.show["ebay"] = false;
      }
      if (tab.name === "Joom") {
        this.show["joom"] = true;
      } else {
        this.show["joom"] = false;
      }
    },
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
        return "color:#909399";
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
    getMenu().then(response => {
      const res = response.data.data;
      const menu = res.filter(e => e.name === "产品引擎");
      let arr = menu[0].children;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].route == "/v1/products-engine/watch") {
          this.allMenu = arr[i].tabs;
        }
      }
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
  width: 98%;
  margin: auto;
  background: #f2f2f2;
  padding: 15px 0;
}
.floet01 {
  float: left;
  margin-left: 8px;
  margin-right: 10px;
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
.tabPlat {
  width: 98%;
  margin: auto;
  border: 1px solid #bfd4d9;
  background: #eef4f6;
  height: 42px;
  margin-top: 15px;
  margin-bottom: 12px;
}
.tabPlat a {
  display: block;
  line-height: 42px;
  border-right: 1px solid #bfd4d9;
  float: left;
  text-align: center;
  padding: 0 20px;
  cursor: pointer;
}
.tabRight {
  float: right;
  overflow: hidden;
  margin-right: 10px;
}
.tr01 {
  float: left;
  margin: 0 15px;
  cursor: pointer;
}
.tr01 span {
  display: block;
  width: 12px;
  height: 12px;
  border: #ccc solid 1px;
  border-radius: 50%;
  float: left;
  margin-right: 10px;
  margin-top: 14px;
}
.tr01 p {
  float: left;
  margin: 0;
  padding: 0;
  line-height: 42px;
}
.platActive {
  background-color: #fff;
  border-bottom: 3px solid #7ca4d2;
}
.ljkf {
  display: block;
  background: #3c8dbc;
  text-align: center;
  color: #fff;
  line-height: 35px;
}
.trActive {
  background: #66b1ff;
  border: #66b1ff solid 1px !important;
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
  .goDev {
    font-size: 12px;
  }
  .goStore {
    font-size: 12px;
  }
}
</style>
