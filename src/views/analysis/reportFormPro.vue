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
    <div class="platname" v-show="totoalPlat">
      <div class="plat01" v-for="(item,index) in selectPlat" :key="index" @click="platSelect(index,item)">
        <span :class="index==platindex?'platActive':''"></span>
        <a :class="index==platindex?'platActiveText':''">{{item}}</a>
      </div>
    </div>
    <div v-show="show.mt">
      <div class="mtBox">
        <div class="mtBox01">
          <div class="t1">
            <span>今日全部</span>
          </div>
          <img src="../../assets/qbpro.png" class="img1" style="width: 50px;height: 50px;" />
          <div class="twz" v-show="plateBay">
            <span class="tw1">新品</span>
            <span class="tw2">{{xptotal}}</span>
          </div>
          <div class="twz" v-show="plateBay">
            <span class="tw1">热销</span>
            <span class="tw2">{{rxtotal}}</span>
          </div>
          <div v-show="platWish" class="twz1">
            <span class="tw3">{{wishmrtotal}}</span>
          </div>
          <div v-show="platShopee" class="twz1">
            <span class="tw3">{{wishmrtotal}}</span>
          </div>
        </div>
        <div class="mtBox01">
          <div class="t1">
            <span>今日已推送</span>
          </div>
          <img src="../../assets/tspro.png" class="img1" style="width: 50px;height: 50px;" />
          <div class="twz" v-show="plateBay">
            <span class="tw1">新品</span>
            <span class="tw2">{{tsxptotal}}</span>
          </div>
          <div class="twz" v-show="plateBay">
            <span class="tw1">热销</span>
            <span class="tw2">{{tsrxtotal}}</span>
          </div>
          <div v-show="platWish" class="twz1">
            <span class="tw3">{{wishtstotal}}</span>
          </div>
          <div v-show="platShopee" class="twz1">
            <span class="tw3">{{wishtstotal}}</span>
          </div>
        </div>
        <div class="mtBox01">
          <div class="t1">
            <span>今日已认领</span>
          </div>
          <img src="../../assets/rlpro.png" class="img1" style="width: 50px;height: 50px;" />
          <div class="twz" v-show="plateBay">
            <span class="tw1">新品</span>
            <span class="tw2">{{rlxptotal}}</span>
          </div>
          <div class="twz" v-show="plateBay">
            <span class="tw1">热销</span>
            <span class="tw2">{{rlrxtotal}}</span>
          </div>
          <div v-show="platWish" class="twz1">
            <span class="tw3">{{wishrltotal}}</span>
          </div>
          <div v-show="platShopee" class="twz1">
            <span class="tw3">{{wishrltotal}}</span>
          </div>
        </div>
        <div class="mtBox01">
          <div class="t1">
            <span>今日已过滤</span>
          </div>
          <img src="../../assets/glpro.png" class="img1" style="width: 50px;height: 50px;" />
          <div class="twz" v-show="plateBay">
            <span class="tw1">新品</span>
            <span class="tw2">{{glxptotal}}</span>
          </div>
          <div class="twz" v-show="plateBay">
            <span class="tw1">热销</span>
            <span class="tw2">{{glrxtotal}}</span>
          </div>
          <div v-show="platWish" class="twz1">
            <span class="tw3">{{wishgltotal}}</span>
          </div>
          <div v-show="platShopee" class="twz1">
            <span class="tw3">{{wishgltotal}}</span>
          </div>
        </div>
        <div class="mtBox01">
          <div class="t1">
            <span>今日未处理</span>
          </div>
          <img src="../../assets/clpro.png" class="img1" style="width: 50px;height: 50px;" />
          <div class="twz" v-show="plateBay">
            <span class="tw1">新品</span>
            <span class="tw2">{{clxptotal}}</span>
          </div>
          <div class="twz" v-show="plateBay">
            <span class="tw1">热销</span>
            <span class="tw2">{{clrxtotal}}</span>
          </div>
          <div v-show="platWish" class="twz1">
            <span class="tw3">{{wishcltotal}}</span>
          </div>
          <div v-show="platShopee" class="twz1">
            <span class="tw3">{{wishcltotal}}</span>
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
            <div class="xBox" v-show="plateBay">
              <div class="mcT01" v-for="(item,index) in devNum" :key="index">
                <span class="mName">{{item.username}}</span>
                <div class="mcDiv" v-show="numIndex==index">
                  <span
                    :style="{width:item.claimRate+'%'}"
                    v-show="item.claimNum>0"
                  >{{item.claimNum}}</span>
                  <span
                    :style="{width:item.filterRate+'%'}"
                    v-show="item.filterNum>0"
                  >{{item.filterNum}}</span>
                  <span
                    :style="{width:item.unhandledRate+'%'}"
                    v-show="item.unhandledNum>0"
                  >{{item.unhandledNum}}</span>
                </div>
                <div class="xCase" @mouseover="numIndex=index" @mouseout="numIndex=999">
                  <span class="xg" :style="{width:item.claimRate+'%'}"></span>
                  <span class="xr" :style="{width:item.filterRate+'%'}"></span>
                  <span class="xh" :style="{width:item.unhandledRate+'%'}"></span>
                </div>
              </div>
            </div>
            <div class="xBox" v-show="platWish">
              <div class="mcT01" v-for="(item,index) in devNumWish" :key="index">
                <span class="mName">{{item.username}}</span>
                <div class="mcDiv" v-show="numIndex==index">
                  <span
                    :style="{width:item.claimRate+'%'}"
                    v-show="item.claimNum>0"
                  >{{item.claimNum}}</span>
                  <span
                    :style="{width:item.filterRate+'%'}"
                    v-show="item.filterNum>0"
                  >{{item.filterNum}}</span>
                  <span
                    :style="{width:item.unhandledRate+'%'}"
                    v-show="item.unhandledNum>0"
                  >{{item.unhandledNum}}</span>
                </div>
                <div class="xCase" @mouseover="numIndex=index" @mouseout="numIndex=999">
                  <span class="xg" :style="{width:item.claimRate+'%'}"></span>
                  <span class="xr" :style="{width:item.filterRate+'%'}"></span>
                  <span class="xh" :style="{width:item.unhandledRate+'%'}"></span>
                </div>
              </div>
            </div>
            <div class="xBox" v-show="platShopee">
              <div class="mcT01" v-for="(item,index) in devNumWish" :key="index">
                <span class="mName">{{item.username}}</span>
                <div class="mcDiv" v-show="numIndex==index">
                  <span
                    :style="{width:item.claimRate+'%'}"
                    v-show="item.claimNum>0"
                  >{{item.claimNum}}</span>
                  <span
                    :style="{width:item.filterRate+'%'}"
                    v-show="item.filterNum>0"
                  >{{item.filterNum}}</span>
                  <span
                    :style="{width:item.unhandledRate+'%'}"
                    v-show="item.unhandledNum>0"
                  >{{item.unhandledNum}}</span>
                </div>
                <div class="xCase" @mouseover="numIndex=index" @mouseout="numIndex=999">
                  <span class="xg" :style="{width:item.claimRate+'%'}"></span>
                  <span class="xr" :style="{width:item.filterRate+'%'}"></span>
                  <span class="xh" :style="{width:item.unhandledRate+'%'}"></span>
                </div>
              </div>
            </div>
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
          @sort-change="sortNumber1"
          v-loading="listLoading1"
          style="width: 100%;margin:auto;margin-top:5px;"
        >
          <el-table-column type="index" fixed align="center" width="45" header-align="center"></el-table-column>
          <el-table-column label="开发员" header-align="center" align="center" prop="developer" width="90"></el-table-column>
          <el-table-column label="分配产品总数" header-align="center" align="center" prop="dispatchNum" sortable="custom"></el-table-column>
          <el-table-column label="认领产品数" header-align="center" align="center" prop="claimNum" sortable="custom"></el-table-column>
          <el-table-column label="认领率(%)" header-align="center" align="center" prop="claimRate" sortable="custom">
            <template slot-scope="scope">{{scope.row.claimRate | cutOut}}</template>
          </el-table-column>
          <el-table-column label="出单数" header-align="center" align="center" prop="orderNum" sortable="custom"></el-table-column>
          <el-table-column label="出单率(%)" header-align="center" align="center" prop="orderRate" sortable="custom">
            <template slot-scope="scope">{{scope.row.orderRate | cutOut}}</template>
          </el-table-column>
          <el-table-column label="过滤数" header-align="center" align="center" prop="filterNum" sortable="custom"></el-table-column>
          <el-table-column label="过滤率(%)" header-align="center" align="center" prop="filterRate" sortable="custom">
            <template slot-scope="scope">{{scope.row.filterRate | cutOut}}</template>
          </el-table-column>
          <el-table-column label="爆款数" header-align="center" align="center" prop="hotNum" sortable="custom"></el-table-column>
          <el-table-column label="爆款率(%)" header-align="center" align="center" prop="hotRate" sortable="custom">
            <template slot-scope="scope">{{scope.row.hotRate | cutOut}}</template>
          </el-table-column>
          <el-table-column label="旺款数" header-align="center" align="center" prop="popNum" sortable="custom"></el-table-column>
          <el-table-column label="旺款率(%)" header-align="center" align="center" prop="popRate" sortable="custom">
            <template slot-scope="scope">{{scope.row.popRate | cutOut}}</template>
          </el-table-column>
          <el-table-column label="未处理数" header-align="center" align="center" prop="unhandledNum" sortable="custom"></el-table-column>
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
          v-loading="listLoading1"
          @sort-change="sortNumber"
          style="width: 100%;margin:auto;margin-top:5px;"
        >
          <el-table-column type="index" fixed align="center" width="40" header-align="center"></el-table-column>
          <el-table-column label="规则类型" header-align="center" align="center" prop="ruleType" width="80">
            <template slot-scope="scope">
              <span>{{scope.row.ruleType=='new'?'新品':'热销'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="规则名称" header-align="center" align="center" prop="ruleName"></el-table-column>
          <el-table-column label="总产品数" header-align="center" align="center" prop="totalNum" sortable="custom"></el-table-column>
          <el-table-column label="推送总数" header-align="center" align="center" prop="dispatchNum" sortable="custom"></el-table-column>
          <el-table-column label="认领产品数" header-align="center" align="center" prop="claimNum" sortable="custom" width="115"></el-table-column>
          <el-table-column label="认领率(%)" header-align="center" align="center" prop="claimRate" sortable="custom">
            <template slot-scope="scope">{{scope.row.claimRate | cutOut}}</template>
          </el-table-column>
          <el-table-column label="出单数" header-align="center" align="center" prop="orderNum" sortable="custom"></el-table-column>
          <el-table-column label="出单率(%)" header-align="center" align="center" prop="orderRate" sortable="custom">
            <template slot-scope="scope">{{scope.row.orderRate | cutOut}}</template>
          </el-table-column>
          <el-table-column label="过滤产品数" header-align="center" align="center" prop="filterNum" sortable="custom" width="115"></el-table-column>
          <el-table-column label="过滤率(%)" header-align="center" align="center" prop="filterRate" sortable="custom">
            <template slot-scope="scope">{{scope.row.filterRate | cutOut}}</template>
          </el-table-column>
          <el-table-column label="爆款数" header-align="center" align="center" prop="hotNum" sortable="custom"></el-table-column>
          <el-table-column label="爆款率(%)" header-align="center" align="center" prop="hotRate" sortable="custom">
            <template slot-scope="scope">{{scope.row.hotRate | cutOut}}</template>
          </el-table-column>
          <el-table-column label="旺款数" header-align="center" align="center" prop="popNum" sortable="custom"></el-table-column>
          <el-table-column label="旺款率(%)" header-align="center" align="center" prop="popRate" sortable="custom">
            <template slot-scope="scope">{{scope.row.popRate | cutOut}}</template>
          </el-table-column>
          <el-table-column
            label="未处理产品数"
            width="100"
            header-align="center"
            sortable="custom"
            align="center"
            prop="unhandledNewNum"
          ></el-table-column>
        </el-table>
      </div>
    </div>
    <div v-show="show.gl">
      <div class="w95">
        <div class="floet">
          <div class="floet01">
            <span>时间日期</span>
            <el-date-picker
              size="small"
              v-model="condition2.dateRange"
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
            <el-button size="small" type="primary" @click="getDataGl()">查询</el-button>
          </div>
        </div>
      </div>
      <div class="w95">
        <el-col :span="24">
          <el-card>
            <div ref="or1" :style="obj1"></div>
          </el-card>
        </el-col>
      </div>
    </div>
    <el-dialog width="75%" title :visible.sync="innerVisible">
      <el-row>
        <div v-for="(item,index) in detailArr" :key="index" class="xRep">
          <div class="xRepChild">
            <span class="ddSpan">{{item.name}}</span>
            <span class="deSpan">{{item.num}}</span>
          </div>
        </div>
      </el-row>
    </el-dialog>
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
  getDailyReport,
  formRefuseReport
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
      totoalPlat:true,
      platindex:0,
      plateBay:true,
      platWish:false,
      platShopee:false,
      selectPlat:['eBay','Wish','shopee'],
      platName:null,
      qbTotal:{
        ebay:true,
        wish:false
      },
      tsTotal:{
        ebay:true,
        wish:false
      },
      rlTotal:{
        ebay:true,
        wish:false
      },
      glTotal:{
        ebay:true,
        wish:false
      },
      clTotal:{
        ebay:true,
        wish:false
      },
      wishcltotal:null,
      wishgltotal:null,
      wishrltotal:null,
      wishtstotal:null,
      wishmrtotal:null,
      qbactove:1,
      tsactove:1,
      rlactove:1,
      glactove:1,
      clactove:1,
      index: 1,
      numIndex: 999,
      innerVisible: false,
      websock: null,
      tableHeightstock: window.innerHeight - 210,
      activeName: "first",
      developer: [],
      obj: {
        height: window.innerHeight - 60 + "px"
      },
      obj1: {
        height: window.innerHeight - 205 + "px"
      },
      plat:['Wish','eBay'],
      show: {
        mt: true,
        rl: false,
        ts: false,
        gl: false
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
      condition2: {
        dateRange: []
      },
      ruleType: ["新品", "热销"],
      ruleNameData: [],
      listLoading: false,
      listLoading1: false,
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
      tabledatagl: [],
      detailArr: [],
      isshow: false,
      devNum: [],
      devNumWish: [],
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
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: []
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [],
            type: "bar",
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "#222222"
                  },
                  formatter: function(params) {
                    if (params.value == 0) {
                      return "";
                    } else {
                      return params.value;
                    }
                  }
                },
                barBorderRadius: [12, 12, 12, 12],
                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#4fd6d2" // 0% 处的颜色
                  },
                  {
                    offset: 0.5,
                    color: "#4fd6d2" // 100% 处的颜色
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
                color: "#4fd6d2",
                lineStyle: {
                  // 系列级个性化折线样式
                  width: 4,
                  type: "dotted",
                  color: "#4fd6d2" //折线的颜色
                }
              }
            }, //线条样式
            barWidth: "20" //折线点的大小
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
  destroyed: function() {
    this.websocketclose();
  },
  created() {
    this.initWebSocket();
  },
  methods: {
    platSelect(index,item){
      this.platindex=index
      if(item=='eBay'){
        this.plateBay=true
        this.platWish=false
        this.platShopee=false
      }
      if(item=='Wish'){
        this.plateBay=false
        this.platWish=true
        this.platShopee=false
      }
      if(item=='shopee'){
        this.plateBay=false
        this.platWish=false
        this.platShopee=true
      }
      this.getDataTotal();
    },
    cltab(index){
      this.clactove=index
      if(index==1){
        this.clTotal.ebay=true
      }else{
        this.clTotal.ebay=false
      }
      if(index==0){
        this.clTotal.wish=true
      }else{
        this.clTotal.wish=false
      }
    },    
    gltab(index){
      this.glactove=index
      if(index==1){
        this.glTotal.ebay=true
      }else{
        this.glTotal.ebay=false
      }
      if(index==0){
        this.glTotal.wish=true
      }else{
        this.glTotal.wish=false
      }
    },    
    rltab(index){
      this.rlactove=index
      if(index==1){
        this.rlTotal.ebay=true
      }else{
        this.rlTotal.ebay=false
      }
      if(index==0){
        this.rlTotal.wish=true
      }else{
        this.rlTotal.wish=false
      }
    },    
    tstab(index){
      this.tsactove=index
      if(index==1){
        this.tsTotal.ebay=true
      }else{
        this.tsTotal.ebay=false
      }
      if(index==0){
        this.tsTotal.wish=true
      }else{
        this.tsTotal.wish=false
      }
    },    
    qbtab(index){
      this.qbactove=index
      if(index==1){
        this.qbTotal.ebay=true
      }else{
        this.qbTotal.ebay=false
      }
      if(index==0){
        this.qbTotal.wish=true
      }else{
        this.qbTotal.wish=false
      }
    },
    sortNumber(column, prop, order) {
      const data = this.tabledata
      if (column.order === 'ascending') {
        this.tabledata = data.sort(compareDown(data, column.prop));
      } else {
        this.tabledata = data.sort(compareUp(data, column.prop));
      }
    },
    sortNumber1(column, prop, order) {
      const data = this.tabledatarl
      if (column.order === 'ascending') {
        this.tabledatarl = data.sort(compareDown(data, column.prop));
      } else {
        this.tabledatarl = data.sort(compareUp(data, column.prop));
      }
    },    
    initWebSocket() {
      //初始化weosocket
      const wsuri = "ws://192.168.0.150:2346"; //ws地址
      this.websock = new WebSocket(wsuri);
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() {
      let actions = "new";
      this.websocketsend(actions);
      console.log("WebSocket连接成功");
    },
    websocketonerror(e) {
      //错误
      console.log("WebSocket连接发生错误");
    },
    websocketonmessage(e) {
      //数据接收
      var redata = JSON.parse(e.data).ebay;
      var redataWish = JSON.parse(e.data).wish;
      this.devNum = redata.devData;
      this.devNumWish = redataWish.devData;
      this.isshow = true;
      var xptotal = redata.totalNewNum;
      var setTime = setInterval(() => {
        if (this.xptotal >= xptotal) {
          this.xptotal = xptotal;
          clearInterval(setTime);
        } else {
          this.xptotal = this.xptotal + 5;
        }
      }, 1);
      var rxtotal = redata.totalHotNum;
      var setTime1 = setInterval(() => {
        if (this.rxtotal >= rxtotal) {
          this.rxtotal = rxtotal;
          clearInterval(setTime1);
        } else {
          this.rxtotal = this.rxtotal + 200;
        }
      }, 1);
      this.wishmrtotal = redataWish.totalWishNum;
      this.wishtstotal = redataWish.dispatchWishNum;
      this.wishrltotal = redataWish.claimWishNum;
      this.wishgltotal = redataWish.filterWishNum;
      this.wishcltotal = redataWish.unhandledWishNum;
      var tsxptotal = redata.dispatchNewNum;
      var setTime2 = setInterval(() => {
        if (this.tsxptotal >= tsxptotal) {
          this.tsxptotal = tsxptotal;
          clearInterval(setTime2);
        } else {
          this.tsxptotal = this.tsxptotal + 1;
        }
      }, 1);
      var tsrxtotal = redata.dispatchHotNum;
      var setTime3 = setInterval(() => {
        if (this.tsrxtotal >= tsrxtotal) {
          this.tsrxtotal = tsrxtotal;
          clearInterval(setTime3);
        } else {
          this.tsrxtotal = this.tsrxtotal + 1;
        }
      }, 1);
      var rlxptotal = redata.claimNewNum;
      var setTime4 = setInterval(() => {
        if (this.rlxptotal >= rlxptotal) {
          this.rlxptotal = rlxptotal;
          clearInterval(setTime4);
        } else {
          this.rlxptotal = this.rlxptotal + 1;
        }
      }, 1);
      var rlrxtotal = redata.claimHotNum;
      var setTime7 = setInterval(() => {
        if (this.rlrxtotal >= rlrxtotal) {
          this.rlrxtotal = rlrxtotal;
          clearInterval(setTime7);
        } else {
          this.rlrxtotal = this.rlrxtotal + 1;
        }
      }, 1);
      var glxptotal = redata.filterNewNum;
      var setTime5 = setInterval(() => {
        if (this.glxptotal >= glxptotal) {
          this.glxptotal = glxptotal;
          clearInterval(setTime5);
        } else {
          this.glxptotal = this.glxptotal + 1;
        }
      }, 1);
      var glrxtotal = redata.filterHotNum;
      var setTime8 = setInterval(() => {
        if (this.glrxtotal >= glrxtotal) {
          this.glrxtotal = glrxtotal;
          clearInterval(setTime8);
        } else {
          this.glrxtotal = this.glrxtotal + 1;
        }
      }, 1);
      var clxptotal = redata.unhandledNewNum;
      var setTime6 = setInterval(() => {
        if (this.clxptotal >= clxptotal) {
          this.clxptotal = clxptotal;
          clearInterval(setTime6);
        } else {
          this.clxptotal = this.clxptotal + 1;
        }
      }, 1);
      var clrxtotal = redata.unhandledHotNum;
      var setTime9 = setInterval(() => {
        if (this.clrxtotal >= clrxtotal) {
          this.clrxtotal = clrxtotal;
          clearInterval(setTime9);
        } else {
          this.clrxtotal = this.clrxtotal + 1;
        }
      }, 1);
    },

    websocketsend(agentData) {
      //数据发送
      this.websock.send(agentData);
    },

    websocketclose(e) {
      //关闭
      console.log("我关闭了",e);
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        if (
          index == 3 ||
          index == 4 ||
          index == 5 ||
          index == 7 ||
          index == 9 ||
          index == 11 ||
          index == 13 ||
          index == 15
        ) {
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
        } else {
          sums[index] = "--";
        }
        var arr = sums;
        if (index == 6) {
          sums[index] = ((arr[5] / arr[4]) * 100).toFixed(2);
        }
        if (index == 8) {
          sums[index] = ((arr[7] / arr[5]) * 100).toFixed(2);
        }
        if (index == 10) {
          sums[index] = ((arr[9] / arr[4]) * 100).toFixed(2);
        }
        if (index == 12) {
          sums[index] = ((arr[11] / arr[5]) * 100).toFixed(2);
        }
        if (index == 14) {
          sums[index] = ((arr[13] / arr[5]) * 100).toFixed(2);
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
        if (
          index == 2 ||
          index == 3 ||
          index == 5 ||
          index == 7 ||
          index == 9 ||
          index == 11 ||
          index == 13
        ) {
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
        } else {
          sums[index] = "--";
        }
        var arr = sums;
        if (index == 4) {
          sums[index] = ((arr[3] / arr[2]) * 100).toFixed(2);
        }
        if (index == 6) {
          sums[index] = ((arr[5] / arr[3]) * 100).toFixed(2);
        }
        if (index == 8) {
          sums[index] = ((arr[7] / arr[2]) * 100).toFixed(2);
        }
        if (index == 10) {
          sums[index] = ((arr[9] / arr[3]) * 100).toFixed(2);
        }
        if (index == 12) {
          sums[index] = ((arr[11] / arr[3]) * 100).toFixed(2);
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
        this.totoalPlat=true
        this.getDataTotal();
      } else {
        this.show["mt"] = false;
      }
      if (tab.name === "/v1/products-engine/product-report") {
        this.show["rl"] = true;
        this.totoalPlat=false
        this.getData();
      } else {
        this.show["rl"] = false;
      }
      if (tab.name === "/v1/products-engine/rule-report") {
        this.show["ts"] = true;
        this.totoalPlat=false
        this.getDataTs();
      } else {
        this.show["ts"] = false;
      }
      if (tab.name === "/v1/products-engine/refuse-report") {
        this.show["gl"] = true;
        this.totoalPlat=false
        this.getDataGl();
      } else {
        this.show["gl"] = false;
      }
    },
    getDataTotal() {
      getDailyReport().then(response => {
        var arrName = [];
        var arrData = [];
        if(this.plateBay){
          var lineData = response.data.data.ebay.claimData;
          for (var i = 0; i < lineData.length; i++) {
            arrName.push(lineData[i].name);
            arrData.push(lineData[i].value);
          }
          this.options.xAxis[0].data = arrName;
          this.options.series[0].data = arrData;
          let indexOr = this.$echarts.init(this.$refs.indexOr);
          indexOr.setOption(this.options);
        }
        if(this.platWish){
          var lineData = response.data.data.wish.claimData;
          for (var i = 0; i < lineData.length; i++) {
            arrName.push(lineData[i].name);
            arrData.push(lineData[i].value);
          }
          this.options.xAxis[0].data = arrName;
          this.options.series[0].data = arrData;
          let indexOr = this.$echarts.init(this.$refs.indexOr);
          indexOr.setOption(this.options);
        }
        if(this.platShopee){
          var lineData = response.data.data.shopee.claimData;
          for (var i = 0; i < lineData.length; i++) {
            arrName.push(lineData[i].name);
            arrData.push(lineData[i].value);
          }
          this.options.xAxis[0].data = arrName;
          this.options.series[0].data = arrData;
          let indexOr = this.$echarts.init(this.$refs.indexOr);
          indexOr.setOption(this.options);
        }
      });
    },
    getDataTs() {
      this.listLoading1 = true;
      formRuleReport(this.condition1).then(res => {
        this.tabledata = res.data.data;
        this.listLoading1 = false;
      });
    },
    getDataGl() {
      formRefuseReport(this.condition2).then(res => {
        var tabledatagl = res.data.data.refuse;
        var name = [];
        var data = [];
        for (var i = 0; i < tabledatagl.length; i++) {
          name.push(tabledatagl[i].refuse);
          data.push(tabledatagl[i].num);
        }
        this.options1.xAxis.data = name;
        this.options1.series[0].data = data;
        let or1 = this.$echarts.init(this.$refs.or1);
        or1.setOption(this.options1);
        var _this = this;
        or1.on("click", function(params) {
          if (params.name == "8: 其他") {
            _this.innerVisible = true;
          }
        });
        var detailArr = res.data.data.detail;
        for (var i = 0; i < detailArr.length; i++) {
          detailArr[i].name = detailArr[i].name.replace("8: 其他:", "");
          detailArr[i].name = detailArr[i].name.replace("8: 其它:", "");
        }
        this.detailArr = detailArr;
      });
    },
    getData() {
      this.listLoading1 = true;
      formProductReport(this.condition).then(res => {
        this.tabledatarl = res.data.data;
        this.listLoading1 = false;
      });
    }
  },
  mounted() {
    this.getDataTotal();
    var startData = getMonthDate("sevenData").start;
    var endData = getMonthDate("sevenData").end;
    var startToda = getMonthDate("todaData").start;
    var endToda = getMonthDate("todaData").end;
    this.condition.dateRange = [
      getNextDate(startData, 0),
      getNextDate(endData, 0)
    ];
    this.condition1.dateRange = [
      getNextDate(startData, 0),
      getNextDate(endData, 0)
    ];
    this.condition2.dateRange = [
      getNextDate(startToda, 0),
      getNextDate(endToda, 0)
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
.plat01{
  overflow: hidden;
  float: left;
  margin-left: 20px;
  cursor: pointer;
}
.plat01 span{
  display: block;
  width: 12px;
  height: 12px;
  border:#ccc solid 1px;
  border-radius: 50%;
  float: left;
  margin-right: 10px;
  margin-top: 13px;
}
.plat01 a{
  display: block;
  float: left;
  line-height: 41px;
  color: #303133;
  padding: 0;
  margin: 0;
}
.platActive{
  background: #409EFF !important;
  border:#409EFF solid 1px !important;
}
.platActiveText{
color: #409EFF !important;
}
.platname{
  position: absolute;
  right: 1.4%;
  top: 0;
}
.ta{
  text-align: right;
  display: block;
  float: right;
  margin: 0 5px;
  font-size: 13px;
  cursor: pointer;
}
.tsec{
  float: right;
  width: 90px;
  margin-right: 18px;
  height: 25px;
  line-height: 25px;
}
.tabheught {
  background: #eee;
}
.w95 {
  width: 97%;
  overflow: hidden;
  background: #fff;
  margin-left: 0.6%;
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
.t1{
  color: #fff;
  font-size: 15px;
  padding: 10px;
  width: 100%;
  padding-left: 15px;
}
.taright{
  margin-right: 25px !important;
}
.blueActive{
  color: #edf102 !important;
}
.blueActive1{
  color: #edf102 !important;
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
.twz1 {
  width: 85%;
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
.tw3 {
  display: block;
  text-align: center;
  font-size: 15px;
  font-size: 34px;
  margin-top: 20px;
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
  height: 90%;
  overflow: hidden;
  overflow-y: auto;
}
.mcT01 {
  width: 92%;
  margin: auto;
  position: relative;
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
  position: relative;
}
.xg span {
  text-align: center;
  display: block;
  color: #000;
  line-height: 12px;
}
.xr span {
  text-align: center;
  display: block;
  color: #000;
  line-height: 12px;
}
.xh span {
  text-align: center;
  display: block;
  color: #000;
  line-height: 12px;
}
.xr {
  display: block;
  float: left;
  background: #f56c6c;
  height: 12px;
  position: relative;
}
.xh {
  display: block;
  float: left;
  background: #909399;
  height: 12px;
  position: relative;
}
.mcDiv {
  width: 95%;
  left: 50%;
  margin-left: -47.5%;
  overflow: hidden;
  position: absolute;
  border-radius: 25px;
  top: 15px;
}
.mcDiv span {
  width: 100%;
  display: block;
  float: left;
  text-align: right;
}
.xRep {
  width: 15.6%;
  float: left;
  margin: 8px 0.4%;
  text-align: center;
  font-size: 13px;
  line-height: 40px;
  border: #eee solid 1px;
  background: #eee;
  border-radius: 5px;
  text-align: center;
  position: relative;
}
.xRepChild {
  overflow: hidden;
  margin: 0 auto;
}
.ddSpan {
  display: inline-block;
  text-align: left;
}
.deSpan {
  position: absolute;
  top: 0;
  right: 0;
  background: #f35b5b;
  width: 18px;
  height: 18px;
  line-height: 18px;
  color: #fff;
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