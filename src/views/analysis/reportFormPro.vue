<template>
  <section class="tabheught" :style="obj">
    <el-tabs
      v-model="activeName"
      type="card"
      @tab-click="handleClick"
      style="background: #fff;height:40px;"
    >
      <el-tab-pane
        v-for="(item, index) in this.allMenu"
        :label="item.name"
        :name="item.route"
        :key="index"
      ></el-tab-pane>
    </el-tabs>
    <div v-show="show.mt">
      <div class="mtBox">
        <div class="mtBox01">
          <div class="t1">今日全部</div>
          <img src="../../assets/qbpro.png" class="img1" style="width: 50px;height: 50px;" />
          <div class="twz">
            <span class="tw1">新品</span>
            <span class="tw2">{{xptotal}}</span>
          </div>
          <div class="twz">
            <span class="tw1">热销</span>
            <span class="tw2">{{rxtotal}}</span>
          </div>
        </div>
        <div class="mtBox01">
          <div class="t1">今日已推送</div>
          <img src="../../assets/tspro.png" class="img1" style="width: 50px;height: 50px;" />
          <div class="twz">
            <span class="tw1">新品</span>
            <span class="tw2">{{tsxptotal}}</span>
          </div>
          <div class="twz">
            <span class="tw1">热销</span>
            <span class="tw2">{{tsrxtotal}}</span>
          </div>
        </div>
        <div class="mtBox01">
          <div class="t1">今日已认领</div>
          <img src="../../assets/rlpro.png" class="img1" style="width: 50px;height: 50px;" />
          <div class="twz">
            <span class="tw1">新品</span>
            <span class="tw2">{{rlxptotal}}</span>
          </div>
          <div class="twz">
            <span class="tw1">热销</span>
            <span class="tw2">{{rlrxtotal}}</span>
          </div>
        </div>
        <div class="mtBox01">
          <div class="t1">今日已过滤</div>
          <img src="../../assets/glpro.png" class="img1" style="width: 50px;height: 50px;" />
          <div class="twz">
            <span class="tw1">新品</span>
            <span class="tw2">{{glxptotal}}</span>
          </div>
          <div class="twz">
            <span class="tw1">热销</span>
            <span class="tw2">{{glrxtotal}}</span>
          </div>
        </div>
        <div class="mtBox01">
          <div class="t1">今日未处理</div>
          <img src="../../assets/clpro.png" class="img1" style="width: 50px;height: 50px;" />
          <div class="twz">
            <span class="tw1">新品</span>
            <span class="tw2">{{clxptotal}}</span>
          </div>
          <div class="twz">
            <span class="tw1">热销</span>
            <span class="tw2">{{clrxtotal}}</span>
          </div>
        </div>
      </div>
      <div class="mtCase">
        <div class="mtCase01" :style="mtCase01">
          <p class="mtop">近七天认领走势图</p>
          <el-col :span="24">
            <div ref="indexOr" :style="styObj"></div>
          </el-col>
        </div>
        <div class="mtCase02 reCop" :style="mtCase01">
          <p class="mtop">今日开发产品处理情况</p>
          <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeIn">
            <div class="xBox" v-show="isshow">
              <div class="mcT01" v-for="(item,index) in devNum" :key="index">
                <span class="mName">{{item.username}}</span>
                <div class="xCase">
                  <span class="xg" :style="{width:item.claimRate+'%'}"></span>
                  <span class="xr" :style="{width:item.filterRate+'%'}"></span>
                  <span class="xh" :style="{width:item.unhandledRate+'%'}"></span>
                  <!-- <el-tooltip :content="item.claimNum+''" placement="top">
                    <span class="xg" :style="{width:item.claimRate+'%'}"></span>
                  </el-tooltip>
                  <el-tooltip :content="item.filterNum+''" placement="top">
                    <span class="xr" :style="{width:item.filterRate+'%'}"></span>
                  </el-tooltip>
                  <el-tooltip :content="item.unhandledNum+''" placement="top">
                    <span class="xh" :style="{width:item.unhandledRate+'%'}"></span>
                  </el-tooltip>-->
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <div v-show="show.rl">
      <div class="w95">
        <div class="floet">
          <div class="floet01" style="margin-left:5px;">
            <span>开发员</span>
            <el-select
              v-model="condition.developer"
              multiple
              collapse-tags
              placeholder="请选择"
              clearable
              size="small"
              style="width:170px;margin-left:10px;"
            >
              <el-option v-for="item in developer" :value="item" :key="item"></el-option>
            </el-select>
          </div>
          <div class="floet01">
            <span>认领时间</span>
            <el-date-picker
              size="small"
              v-model="condition.dateRange"
              value-format="yyyy-MM-dd"
              type="daterange"
              align="right"
              clearable
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:250px;margin-left:10px;"
              :picker-options="pickerOptions2"
            ></el-date-picker>
          </div>
          <div class="floet01">
            <el-button size="small" type="primary" @click="getData()">查询</el-button>
          </div>
        </div>
      </div>
      <div class="w95">
        <el-table
          :data="tabledatarl"
          border
          class="elTableForm"
          :summary-method="getSummariesrl"
          :header-cell-style="getRowClass"
          show-summary
          :height="tableHeightstock"
          style="width: 100%;margin:auto;margin-top:5px;"
        >
          <el-table-column type="index" fixed align="center" width="80" header-align="center"></el-table-column>
          <el-table-column label="开发员" header-align="center" align="center" prop="developer"></el-table-column>
          <el-table-column label="分配产品总数" header-align="center" align="center" prop="dispatchNum"></el-table-column>
          <el-table-column label="爆款数" header-align="center" align="center" prop="hotNum"></el-table-column>
          <el-table-column label="爆款率(%)" header-align="center" align="center" prop="hotRate">
            <template slot-scope="scope">{{scope.row.hotRate | cutOut}}</template>
          </el-table-column>
          <el-table-column label="旺款数" header-align="center" align="center" prop="popNum"></el-table-column>
          <el-table-column label="旺款率(%)" header-align="center" align="center" prop="popRate">
            <template slot-scope="scope">{{scope.row.popRate | cutOut}}</template>
          </el-table-column>
          <el-table-column label="认领产品数" header-align="center" align="center" prop="claimNum"></el-table-column>
          <el-table-column label="认领率(%)" header-align="center" align="center" prop="claimRate">
            <template slot-scope="scope">{{scope.row.claimRate | cutOut}}</template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div v-show="show.ts">
      <div class="w95">
        <div class="floet">
          <div class="floet01" style="margin-left:5px;">
            <span>规则类型</span>
            <el-select
              v-model="condition1.ruleType"
              placeholder="请选择"
              clearable
              size="small"
              @change="getRuleName($event)"
              style="width:170px;margin-left:10px;"
            >
              <el-option v-for="item in ruleType" :value="item" :key="item"></el-option>
            </el-select>
          </div>
          <div class="floet01">
            <span>规则名称</span>
            <el-select
              v-model="condition1.ruleName"
              placeholder="请选择"
              clearable
              size="small"
              style="width:170px;margin-left:10px;"
            >
              <el-option v-for="item in ruleNameData" :value="item.ruleName" :key="item.ruleName"></el-option>
            </el-select>
          </div>
          <div class="floet01">
            <span>认领时间</span>
            <el-date-picker
              size="small"
              v-model="condition1.dateRange"
              value-format="yyyy-MM-dd"
              type="daterange"
              align="right"
              clearable
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:250px;margin-left:10px;"
              :picker-options="pickerOptions2"
            ></el-date-picker>
          </div>
          <div class="floet01">
            <el-button size="small" type="primary" @click="getDataTs()">查询</el-button>
          </div>
        </div>
      </div>
      <div class="w95">
        <el-table
          :data="tabledata"
          border
          class="elTableForm"
          :summary-method="getSummaries"
          :header-cell-style="getRowClass"
          show-summary
          :height="tableHeightstock"
          style="width: 100%;margin:auto;margin-top:5px;"
        >
          <el-table-column type="index" fixed align="center" width="80" header-align="center"></el-table-column>
          <el-table-column label="规则类型" header-align="center" align="center" prop="ruleType">
            <template slot-scope="scope">
              <span>{{scope.row.ruleType=='new'?'新品':'热销'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="规则名称" header-align="center" align="center" prop="ruleName"></el-table-column>
          <el-table-column label="总产品数" header-align="center" align="center" prop="totalNum"></el-table-column>
          <el-table-column label="推送总数" header-align="center" align="center" prop="dispatchNum"></el-table-column>
          <el-table-column label="认领产品数" header-align="center" align="center" prop="claimNum"></el-table-column>
          <el-table-column label="爆款数" header-align="center" align="center" prop="hotNum"></el-table-column>
          <el-table-column label="旺款数" header-align="center" align="center" prop="popNum"></el-table-column>
        </el-table>
      </div>
    </div>
  </section>
</template>
<script type="text/ecmascript-6">
import { getMenu } from "../../api/login";
import { getDeveloper } from "../../api/profit";
import echarts from "echarts";
import {
  formProductReport,
  APRengineRule,
  APRengineRuleHot,
  formRuleReport,
  getDailyReport
} from "../../api/product";
import {
  compareUp,
  compareDown,
  getMonthDate,
  getNextDate
} from "../../api/tools";
export default {
  data() {
    return {
      index: 1,
      tableHeightstock: window.innerHeight - 210,
      activeName: "first",
      developer: [],
      obj: {
        height: window.innerHeight - 60 + "px"
      },
      obj1: {
        height: window.innerHeight - 205 + "px"
      },
      show: {
        mt: true,
        rl: false,
        ts: false
      },
      styObj: {
        width: "100%",
        height: window.innerHeight - 339 + "px"
      },
      sty: {
        width: "100%",
        height: window.innerHeight - 208 + "px"
      },
      mtCase01: {
        height: window.innerHeight - 295 + "px"
      },
      condition: {
        developer: [],
        dateRange: []
      },
      condition1: {
        ruleType: null,
        ruleName: null,
        dateRange: []
      },
      ruleType: ["新品", "热销"],
      ruleNameData: [],
      listLoading: false,
      rltotal: 0,
      gltotal: 0,
      cltotal: 0,
      tsxptotal: 0,
      tsrxtotal: 0,
      xptotal: 0,
      rxtotal: 0,
      rlxptotal: 0,
      rlrxtotal: 0,
      glxptotal: 0,
      glrxtotal: 0,
      clxptotal: 0,
      clrxtotal: 0,
      allMenu: [],
      ruleNameXp: [],
      ruleNameRx: [],
      tabledata: [],
      tabledatarl: [],
      isshow: false,
      devNum: [],
      options: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: []
          }
        ],
        yAxis: {
          type: "value"
        },
        series: [
          {
            type: "line",
            itemStyle: {
              normal: {
                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#d7f4f8" // 0% 处的颜色
                  },
                  {
                    offset: 0.5,
                    color: "#eefcfd" // 100% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#4fd6d2" // 100% 处的颜色
                  }
                ]), //背景渐变色
                lineStyle: {
                  // 系列级个性化折线样式
                  width: 4,
                  type: "solid",
                  color: "#4fd6d2"
                }
              },
              emphasis: {
                color: "#67c23a",
                lineStyle: {
                  // 系列级个性化折线样式
                  width: 4,
                  type: "dotted",
                  color: "#4fd6d2" //折线的颜色
                }
              }
            }, //线条样式
            symbolSize: 8, //折线点的大小
            areaStyle: { normal: {} },
            data: [],
            smooth: true
          }
        ]
      },
      options1: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          top: "2%",
          data: ["爆款数", "旺款数", "产品总数"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            top: "1%",
            data: []
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "爆款数",
            type: "bar",
            data: []
          },
          {
            name: "旺款数",
            type: "bar",
            data: []
          },
          {
            name: "产品总数",
            type: "bar",
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
  filters: {
    cutOut: function(value) {
      value = ((Number(value) * 1000000) / 10000).toFixed(2);
      return value;
    }
  },
  methods: {
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
          sums[index] += "";
        } else {
          sums[index] = "N/A";
        }
      });
      return sums;
    },
    getSummariesrl(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        if (index == 2 || index == 3 || index == 5 || index == 7) {
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
            sums[index] += "";
          } else {
            sums[index] = "N/A";
          }
        }
      });
      return sums;
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "color:#337ab7;background:#f5f7fa";
      } else {
        return "";
      }
    },
    getRuleName(e) {
      this.condition1.ruleName = null;
      if (e == "新品") {
        this.ruleNameData = this.ruleNameXp;
      } else {
        this.ruleNameData = this.ruleNameRx;
      }
    },
    handleClick(tab, event) {
      if (tab.name === "/v1/products-engine/daily-report") {
        this.show["mt"] = true;
        this.getDataTotal();
      } else {
        this.show["mt"] = false;
      }
      if (tab.name === "/v1/products-engine/product-report") {
        this.show["rl"] = true;
        this.getData();
      } else {
        this.show["rl"] = false;
      }
      if (tab.name === "/v1/products-engine/rule-report") {
        this.show["ts"] = true;
        this.getDataTs();
      } else {
        this.show["ts"] = false;
      }
    },
    getDataTotal() {
      getDailyReport().then(response => {
        this.devNum = response.data.data.devData;
        this.isshow = true;
        var xptotal = response.data.data.totalNewNum;
        var setTime = setInterval(() => {
          if (this.xptotal >= xptotal) {
            this.xptotal = xptotal;
            clearInterval(setTime);
          } else {
            this.xptotal = this.xptotal + 5;
          }
        }, 1);
        var rxtotal = response.data.data.totalHotNum;
        var setTime1 = setInterval(() => {
          if (this.rxtotal >= rxtotal) {
            this.rxtotal = rxtotal;
            clearInterval(setTime1);
          } else {
            this.rxtotal = this.rxtotal + 50;
          }
        }, 1);
        var tsxptotal = response.data.data.dispatchNewNum;
        var setTime2 = setInterval(() => {
          if (this.tsxptotal >= tsxptotal) {
            this.tsxptotal = tsxptotal;
            clearInterval(setTime2);
          } else {
            this.tsxptotal = this.tsxptotal + 1;
          }
        }, 1);
        var tsrxtotal = response.data.data.dispatchHotNum;
        var setTime3 = setInterval(() => {
          if (this.tsrxtotal >= tsrxtotal) {
            this.tsrxtotal = tsrxtotal;
            clearInterval(setTime3);
          } else {
            this.tsrxtotal = this.tsrxtotal + 1;
          }
        }, 1);
        var rlxptotal = response.data.data.claimNewNum;
        var setTime4 = setInterval(() => {
          if (this.rlxptotal >= rlxptotal) {
            this.rlxptotal = rlxptotal;
            clearInterval(setTime4);
          } else {
            this.rlxptotal = this.rlxptotal + 1;
          }
        }, 1);
        var rlrxtotal = response.data.data.claimHotNum;
        var setTime7 = setInterval(() => {
          if (this.rlrxtotal >= rlrxtotal) {
            this.rlrxtotal = rlrxtotal;
            clearInterval(setTime7);
          } else {
            this.rlrxtotal = this.rlrxtotal + 1;
          }
        }, 1);
        var glxptotal = response.data.data.filterNewNum;
        var setTime5 = setInterval(() => {
          if (this.glxptotal >= glxptotal) {
            this.glxptotal = glxptotal;
            clearInterval(setTime5);
          } else {
            this.glxptotal = this.glxptotal + 1;
          }
        }, 1);
        var glrxtotal = response.data.data.filterHotNum;
        var setTime8 = setInterval(() => {
          if (this.glrxtotal >= glrxtotal) {
            this.glrxtotal = glrxtotal;
            clearInterval(setTime8);
          } else {
            this.glrxtotal = this.glrxtotal + 1;
          }
        }, 1);
        var clxptotal = response.data.data.unhandledNewNum;
        var setTime6 = setInterval(() => {
          if (this.clxptotal >= clxptotal) {
            this.clxptotal = clxptotal;
            clearInterval(setTime6);
          } else {
            this.clxptotal = this.clxptotal + 1;
          }
        }, 1);
        var clrxtotal = response.data.data.unhandledHotNum;
        var setTime9 = setInterval(() => {
          if (this.clrxtotal >= clrxtotal) {
            this.clrxtotal = clrxtotal;
            clearInterval(setTime9);
          } else {
            this.clrxtotal = this.clrxtotal + 1;
          }
        }, 1);
        var arrName = [];
        var arrData = [];
        var lineData = response.data.data.claimData;
        for (var i = 0; i < lineData.length; i++) {
          arrName.push(lineData[i].name);
          arrData.push(lineData[i].value);
        }
        this.options.xAxis[0].data = arrName;
        this.options.series[0].data = arrData;
        let indexOr = this.$echarts.init(this.$refs.indexOr);
        indexOr.setOption(this.options);
      });
    },
    getDataTs() {
      formRuleReport(this.condition1).then(res => {
        this.tabledata = res.data.data;
      });
    },
    getData() {
      this.listLoading = true;
      formProductReport(this.condition).then(res => {
        this.tabledatarl = res.data.data;
        this.listLoading = false;
      });
    }
  },
  mounted() {
    this.getDataTotal();
    var startData = getMonthDate("sevenData").start;
    var endData = getMonthDate("sevenData").end;
    this.condition.dateRange = [
      getNextDate(startData, 0),
      getNextDate(endData, 0)
    ];
    this.condition1.dateRange = [
      getNextDate(startData, 0),
      getNextDate(endData, 0)
    ];
    APRengineRule().then(res => {
      this.ruleNameXp = res.data.data;
    });
    APRengineRuleHot().then(res => {
      this.ruleNameRx = res.data.data;
    });
    getMenu().then(response => {
      const res = response.data.data;
      const menu = res.filter(e => e.route === "/v1/products-engine/index");
      const arr = menu[0].children;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].route == "/v1/products-engine/dashboard") {
          this.allMenu = arr[i].tabs;
        }
      }
      this.activeName = this.allMenu[0].route;
    });
    getDeveloper().then(response => {
      this.developer = response.data.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.tabheught {
  background: #eee;
}
.w95 {
  width: 97%;
  overflow: hidden;
  background: #fff;
  margin-left: 0.5%;
  padding: 10px 10px;
  margin-top: 10px;
  border-radius: 5px;
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
  margin-right: 15px;
}
.mtBox {
  width: 98.5%;
  margin: auto;
  margin-top: 15px;
  height: 150px;
  overflow: hidden;
}
.mtBox01 {
  width: 18.85%;
  height: 150px;
  float: left;
  border-radius: 5px;
  position: relative;
}
.mtBox01:nth-child(1) {
  background: #3c8dbc;
}
.mtBox01:nth-child(4) {
  margin-left: 1.33%;
  background: #f56c6c;
}
.mtBox01:nth-child(2) {
  margin-left: 1.33%;
  background: #e6a23c;
}
.mtBox01:nth-child(3) {
  margin-left: 1.33%;
  background: #67c23a;
}
.mtBox01:nth-child(5) {
  margin-left: 1.33%;
  background: #909399;
}
.mtCase {
  width: 98.5%;
  margin: auto;
  margin-top: 16px;
  overflow: hidden;
}
.mtCase01 {
  width: 79.4%;
  background: #fff;
  float: left;
  border-radius: 5px;
}
.mtCase02 {
  width: 18.8%;
  float: right;
  background: #fff;
  border-radius: 5px;
  margin-right: 0.45%;
}
.t1 {
  color: #fff;
  font-size: 15px;
  padding: 10px;
  width: 100%;
  padding-left: 15px;
}
.img1 {
  position: absolute;
  right: 30px;
  top: 50px;
}
.sj66 {
  text-shadow: 0px 1px 0px #fff, 0px 2px 0px #888, 0px 1px 0px #777,
    0px 1px 0px #666, 0px 1px 0px #555, 0px 1px 0px #444,
    0px 1px 0px rgb(95, 95, 95), 0px 5px 5px #606061;
  color: #fff;
  letter-spacing: 2px;
  font-size: 40px;
  display: block;
  width: 90%;
  text-align: center;
  margin-top: 15px;
}
.twz {
  width: 32%;
  color: #fff;
  letter-spacing: 2px;
  float: left;
}
.tw1 {
  display: block;
  text-align: center;
  font-size: 14px;
  margin-top: 8px;
}
.tw2 {
  display: block;
  text-align: center;
  font-size: 15px;
  font-size: 28px;
  margin-top: 10px;
  text-shadow: 0px 1px 0px #fff, 0px 2px 0px #888, 0px 1px 0px #777,
    0px 1px 0px #666, 0px 1px 0px #555, 0px 1px 0px #444,
    0px 1px 0px rgb(95, 95, 95), 0px 5px 5px #606061;
}
.mtop {
  margin: 0;
  font-size: 14px;
  line-height: 45px;
  padding-left: 15px;
  border-bottom: rgb(224, 224, 224) solid 1px;
}
.xBox {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
}
.mcT01 {
  width: 92%;
  margin: auto;
}
.mName {
  display: block;
  font-size: 14px;
  text-align: center;
  margin: 15px 0px 10px 0px;
}
.xCase {
  width: 95%;
  margin: auto;
  overflow: hidden;
  border-radius: 25px;
}
.xg {
  display: block;
  float: left;
  background: #67c23a;
  height: 12px;
}
.xr {
  display: block;
  float: left;
  background: #f56c6c;
  height: 12px;
}
.xh {
  display: block;
  float: left;
  background: #909399;
  height: 12px;
}
@media screen and (max-width: 1500px) {
  .img1 {
    position: absolute;
    right: 15px;
    top: 50px;
  }
  .twz {
    width: 30%;
    color: #fff;
    letter-spacing: 2px;
    float: left;
  }
  .tw2 {
    font-size: 18px;
  }
  .sj66 {
    width: 75%;
  }
}
</style>
<style>
.reCop ::-webkit-scrollbar {
  width: 7px;
  height: 7px;
}
</style>