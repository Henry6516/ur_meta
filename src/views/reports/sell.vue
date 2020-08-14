<template>
  <!-- <div>销售毛利润报表</div>     -->
  <div class="toolbar">
    <div
      class="demo-block demo-box demo-zh-CN demo-transition"
      @mouseover="changeActive"
      @mouseout="removeActive"
    >
      <transition name="el-fade-in-linear">
        <el-form
          :model="condition"
          :inline="true"
          ref="condition"
          label-width="120px"
          class="demo-form-inline"
          v-show="show"
        >
          <el-form-item label="部门" class="input">
            <el-select
              size="small"
              v-model="condition.department"
              multiple
              collapse-tags
              placeholder="部门"
              @change="choosed"
            >
              <el-button plain type="info" @click="selectalld">全选</el-button>
              <el-button plain type="info" @click="noselectd">取消</el-button>
              <el-option
                v-for="(item,index) in department"
                :index="index"
                :key="item.id"
                :label="item.department"
                :value="item.department"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二级部门" class="input">
            <el-select
              size="small"
              v-model="condition.secDepartment"
              multiple
              collapse-tags
              placeholder="二级部门"
              @change="secChoosed"
            >
              <el-button plain type="info" @click="selectallSec">全选</el-button>
              <el-button plain type="info" @click="noselectSec">取消</el-button>
              <el-option
                v-for="(item,index) in secDepartment"
                :index="index"
                :key="item.id"
                :label="item.department"
                :value="item.department"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="平台" class="input">
            <el-select
              size="small"
              v-model="condition.plat"
              clearable
              multiple
              collapse-tags
              placeholder="平台"
            >
              <el-option
                v-for="(item,index) in plat"
                :index="index"
                :key="item.plat"
                :label="item.plat"
                :value="item.plat"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="销售员" class="input">
            <el-select
              size="small"
              v-model="condition.member"
              filterable
              multiple
              collapse-tags
              placeholder="销售员"
            >
              <el-button plain type="info" @click="selectallm">全选</el-button>
              <el-button plain type="info" @click="noselectm">取消</el-button>
              <el-option
                v-for="(item,index) in member"
                :index="index"
                :key="item.username"
                :label="item.username"
                :value="item.username"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账号" class="input">
            <el-select
              size="small"
              v-model="condition.account"
              filterable
              multiple
              collapse-tags
              placeholder="账号"
            >
              <el-button plain type="info" @click="selectall">全选</el-button>
              <el-button plain type="info" @click="noselect">取消</el-button>
              <el-option
                v-for="(item,index) in account"
                :index="index"
                :key="item.id"
                :label="item.store"
                :value="item.store"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出货仓库" class="input">
            <el-select
              size="small"
              v-model="condition.store"
              filterable
              multiple
              collapse-tags
              placeholder="请选择"
            >
              <el-button plain type="info" @click="selectalls">全选</el-button>
              <el-button plain type="info" @click="noselects">取消</el-button>
              <el-option v-for="item in store" :key="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间类型" class="input" prop="dateType">
            <el-radio-group v-model="condition.dateType">
              <el-radio
                border
                v-for="(item,index) in dateType"
                :index="index"
                :key="item.id"
                :label="item.id"
                :value="item.id"
                style="width:102px"
              >{{item.type}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="日期"
            class="input"
            prop="dateRange"
            :rules="[{required: true, message: '请选择时间', trigger: 'blur'}]"
          >
            <el-date-picker
              size="small"
              v-model="condition.dateRange"
              type="daterange"
              value-format="yyyy-MM-dd"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions2"
              style="width:218px;"
            ></el-date-picker>
          </el-form-item>
          <el-form-item style="margin-left:6rem">
            <el-button size="small" type="primary" class="input" @click="onSubmit(condition)">查询</el-button>
          </el-form-item>
        </el-form>
      </transition>
      <div class="demo-block-control" @click="handleChange" style="left:0rem">
        <transition>
          <i :class="{'el-icon-caret-bottom':isA,'el-icon-caret-top':!isA}" class="transition-i"></i>
        </transition>
        <transition>
          <span v-show="show1" class="transition-span">{{text}}</span>
        </transition>
      </div>
    </div>
    <el-row>
      <el-col :span="19">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane
            v-for="(item, index) in this.allMenu"
            :label="item.name"
            :name="item.name"
            :key="index"
          ></el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="2" style="margin-left:3%">
        <el-input clearable placeholder="search" v-model="searchValue" @change="handleSearch"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button style="float:left" type="default" @click="exportExcel">导出Excel</el-button>
      </el-col>
    </el-row>
    <!-- 毛利润报表 -->
    <el-table
      :data="tableData"
      id="sale-table"
      v-loading="listLoading"
      element-loading-text="正在加载中..."
      @sort-change="sortNumber"
      show-summary
      :summary-method="getSummaries"
      :height="tableHeight"
      v-show="showTable.sell"
      border 
      class="elTableee"
      :header-cell-style="getRowClass" 
      style="width: 100%;font-size:13px;"
    >
      <el-table-column
        width="85"
        prop="pingtai"
        label="平台"
        fixed
        :formatter="empty"
        sortable
        align="center"
      ></el-table-column>
      <el-table-column
        width="180"
        prop="suffix"
        label="账号"
        fixed
        :formatter="empty"
        sortable
        align="center"
      ></el-table-column>
      <el-table-column
        width="100"
        prop="salesman"
        label="销售员"
        fixed
        :formatter="empty"
        sortable
        align="center"
      ></el-table-column>
      <el-table-column
        width="100"
        prop="salemoney"
        label="成交价$"
        :formatter="empty"
        sortable="custom"
        align="center"
      ></el-table-column>
      <el-table-column
        width="100"
        prop="salemoneyzn"
        label="成交价￥"
        :formatter="empty"
        sortable="custom"
        align="center"
      ></el-table-column>
      <el-table-column
        width="125"
        prop="ebayFeeebay"
        label="eBay成交费$"
        :formatter="empty"
        sortable="custom"
        align="center"
      ></el-table-column>
      <el-table-column
        width="130"
        prop="ebayfeeznebay"
        label="eBay成交费￥"
        :formatter="empty"
        sortable="custom"
        align="center"
      ></el-table-column>
      <el-table-column
        width="110"
        prop="ppFee"
        label="PP成交费$"
        :formatter="empty"
        sortable="custom"
        align="center"
      ></el-table-column>
      <el-table-column
        width="115"
        prop="ppFeezn"
        label="PP成交费￥"
        :formatter="empty"
        sortable="custom"
        align="center"
      ></el-table-column>
      <el-table-column
        width="110"
        prop="costmoney"
        label="商品成本￥"
        :formatter="empty"
        sortable="custom"
        align="center"
      ></el-table-column>
      <el-table-column
        width="110"
        prop="expressFare"
        label="运费成本￥"
        :formatter="empty"
        sortable="custom"
        align="center"
      ></el-table-column>
      <el-table-column
        width="110"
        prop="inpackagemoney"
        label="包装成本￥"
        :formatter="empty"
        sortable="custom"
        align="center"
      ></el-table-column>
      <el-table-column
        min-width="110"
        prop="storename"
        label="发货仓库"
        :formatter="empty"
        sortable="custom"
        align="center"
      ></el-table-column>
      <el-table-column
        width="110"
        prop="refund"
        label="退款金额￥"
        :formatter="empty"
        sortable="custom"
        align="center"
      ></el-table-column>
      <el-table-column
        width="100"
        prop="refundrate"
        label="退款率%"
        :formatter="empty"
        sortable="custom"
        align="center"
      ></el-table-column>
      <el-table-column
        width="110"
        prop="diefeeZn"
        label="死库处理￥"
        :formatter="empty"
        sortable="custom"
        align="center"
      ></el-table-column>
      <el-table-column
        width="110"
        prop="insertionFee"
        label="店铺杂费￥"
        :formatter="empty"
        sortable="custom"
        align="center"
      ></el-table-column>
      <el-table-column
        width="110"
        prop="saleOpeFeeZn"
        label="运营杂费￥"
        :formatter="empty"
        sortable="custom"
        align="center"
      ></el-table-column>
      <el-table-column
        width="100"
        prop="grossprofit"
        label="毛利￥"
        :formatter="empty"
        sortable="custom"
        align="center"
      ></el-table-column>
      <el-table-column
        width="100"
        prop="grossprofitRate"
        label="毛利率%"
        :formatter="empty"
        sortable="custom"
        align="center"
      ></el-table-column>
    </el-table>
    <!-- 退款订单明细 -->
    <el-table
      :data="tableData1"
      @sort-change="sortNumber"
      height="650"
      border
      class="elTable"
      v-show="showTable.order"
      :header-cell-style="getRowClass"
      style="width: 100%;font-size:13px;"
      v-loading="load1"
    >
      <el-table-column prop="suffix" label="账号" sortable align="center" width="150" fixed></el-table-column>
      <el-table-column prop="salesman" label="销售员" sortable align="center" width="100" fixed></el-table-column>
      <el-table-column prop="goodsName" label="商品名称" sortable align="center" width="150" fixed></el-table-column>
      <el-table-column prop="goodsCode" label="商品编码" sortable align="center" width="120"></el-table-column>
      <el-table-column prop="goodsSku" label="商品SKU" sortable align="center" width="120"></el-table-column>
      <el-table-column prop="tradeId" label="订单编号" sortable align="center" width="120"></el-table-column>
      <el-table-column prop="orderId" label="店铺单号" sortable align="center" width="200"></el-table-column>
      <el-table-column prop="mergeBillId" label="合并单号" sortable align="center" width="120"></el-table-column>
      <el-table-column prop="storeName" label="仓库" sortable align="center" width="120"></el-table-column>
      <el-table-column prop="refund" label="退款$" sortable="custom" align="center" width="120"></el-table-column>
      <el-table-column
        prop="refundZn"
        label="退款￥"
        width="120"
        sortable="custom"
        :formatter="empty"
        align="center"
      ></el-table-column>
      <el-table-column prop="orderCountry" label="国家" sortable align="center" width="120"></el-table-column>
      <el-table-column prop="expressWay" label="物流方式" sortable align="center" width="180"></el-table-column>
      <el-table-column prop="platform" label="平台" sortable align="center" width="120"></el-table-column>
      <el-table-column prop="orderTime" label="交易时间" align="center" width="150"></el-table-column>
      <el-table-column prop="refundTime" label="退款时间" align="center" width="150"></el-table-column>
    </el-table>
    <div class="block toolbar" v-show="showTable.order" style="overflow:hidden">
      <div style="float:left;margin-top:1px;">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="this.condition.page"
          :page-size="this.condition.pageSize"
          :page-sizes="[10,20,30,40]"
          layout="total,sizes,prev,pager,next,jumper"
          :total="this.total"
        ></el-pagination>
      </div>
      <div style="float:right">
        <p style="margin:0;font-size:14px;margin-right:18px;margin-top:8px;">
          退款合计($):
          <span style="color:red">{{tksj}}</span>
        </p>
      </div>
      <div style="float:right">
        <p style="margin:0;font-size:14px;margin-right:18px;margin-top:8px;">
          退款合计(￥):
          <span style="color:red">{{tkjq}}</span>
        </p>
      </div>
    </div>
    <!-- 退款产品明细 -->
    <el-table
      :data="tableData2"
      @sort-change="sortNumber"
      height="650"
      v-show="showTable.goods"
      border
      class="elTable"
      :header-cell-style="getRowClass"
      style="width: 100%;font-size:13px;"
      v-loading="load2"
    >
      <el-table-column prop="suffix" label="账号" sortable align="center"></el-table-column>
      <el-table-column prop="goodsName" label="商品名称" sortable align="center"></el-table-column>
      <el-table-column prop="goodsCode" label="商品编码" sortable align="center"></el-table-column>
      <el-table-column prop="goodsSku" label="商品SKU" sortable align="center"></el-table-column>
      <el-table-column prop="times" label="退款次数" sortable="custom" align="center"></el-table-column>
      <el-table-column prop="salesman" label="销售员" sortable align="center"></el-table-column>
    </el-table>
    <div class="block toolbar" v-show="showTable.goods">
      <el-pagination
        background
        @size-change="handleSizeChangeGoods"
        @current-change="handleCurrentChangeGoods"
        :current-page="this.goods.page"
        :page-size="this.goods.pageSize"
        :page-sizes="[10,20,30,40]"
        layout="total,sizes,slot,prev,pager,next,jumper"
        :total="this.total2"
      >
      <span>
            <el-button type="text"
                       @click="showAll">显示全部</el-button>
      </span>
      </el-pagination>
    </div>
    <div v-show="showTable.report">
      <el-col :span="12">
        <el-card>
          <div ref="ordPlatform" :style="{width: '100%', height: '400px'}" v-loading="listLoading1"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div ref="ordAccount" :style="{width: '100%', height: '400px'}" v-loading="listLoading2"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div ref="ordProduct" :style="{width: '100%', height: '400px'}" v-loading="listLoading3"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div ref="ordLogistics" :style="{width: '100%', height: '400px'}" v-loading="listLoading4"></div>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card>
          <div ref="ordRefund" id="myChart1" :style="{width: '100%', height: '400px'}" v-loading="listLoading5"></div>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card>
          <div ref="ordNumber" id="myChart2" :style="{width: '100%', height: '400px'}" v-loading="listLoading6"></div>
        </el-card>
      </el-col>
    </div>
    <!-- 死库明细 -->
    <el-table :data="tableData3" @sort-change="sortNumber" height="650" v-show="showTable.dead" border class="elTable" :header-cell-style="getRowClass" style="width: 100%;font-size:13px;" v-loading="load3">
      <el-table-column prop="plat" label="平台" sortable align="center" width="100" fixed></el-table-column>
      <el-table-column prop="suffix" label="账号" sortable align="center" width="100" fixed></el-table-column>
      <el-table-column prop="salesman" label="销售员" sortable align="center" width="100" fixed></el-table-column>
      <el-table-column prop="importDate" label="导入时间" sortable align="center"  width="125">
        <template slot-scope="scope">{{scope.row.importDate | cutOutDate}}</template>
      </el-table-column>
      <el-table-column prop="type" label="清仓类型" sortable align="center" width="125"></el-table-column>
      <el-table-column prop="storeName" label="出货仓库" sortable align="center" width="100"></el-table-column>
      <el-table-column prop="goodsCode" label="商品编码" sortable align="center" width="100"></el-table-column>
      <el-table-column prop="goodsName" label="商品名称" sortable align="center" width="150"></el-table-column>
      <el-table-column prop="sku" label="sku" sortable align="center" width="120"></el-table-column>
      <el-table-column prop="createDate" label="开发时间" sortable align="center" width="125">
        <template slot-scope="scope">{{scope.row.createDate | cutOutDate}}</template>
      </el-table-column>
      <el-table-column prop="lastPurchaseDate" label="最后采购时间" sortable align="center" width="125">
        <template slot-scope="scope">{{scope.row.lastPurchaseDate | cutOutDate}}</template>
      </el-table-column>
      <el-table-column prop="checkNumber" label="盘点数量" sortable align="center" width="100"></el-table-column>
      <el-table-column prop="preCheckPrice" label="盘点前单价" sortable align="center" width="120"></el-table-column>
      <el-table-column prop="deadPrice" label="盘少单价（死库）" sortable align="center" width="150"></el-table-column>
      <el-table-column prop="aftCheckPrice" label="盘后单价" sortable align="center" width="100"></el-table-column>
      <el-table-column prop="suffixSalesNumber" label="账号销量" sortable align="center" width="100"></el-table-column>
      <el-table-column prop="totalNumber" label="总销量" sortable align="center" width="100"></el-table-column>
      <el-table-column prop="amount" label="库存金额" sortable align="center" width="100"></el-table-column>
      <el-table-column prop="aveAmount" label="分摊金额" sortable align="center" width="100"></el-table-column>
    </el-table>
    <div class="block toolbar" v-show="showTable.dead" style="overflow:hidden">
      <div style="float:left;margin-top:0px;">
        <el-pagination
          background
          @size-change="handleSizeChangeDead"
          @current-change="handleCurrentChangeDead"
          :current-page="this.dead.page"
          :page-size="this.dead.pageSize"
          :page-sizes="[10,20,30,40]"
          layout="total,sizes,prev,pager,next,jumper"
          :total="this.total3"
        ></el-pagination>
      </div>
      <div style="float:right">
        <p style="margin:0;font-size:14px;margin-right:18px;margin-top:4px;">
          分摊金额合计:
          <span style="color:red">{{totalPrice | cutOut}}</span>
        </p>
      </div>  
      <div style="float:right">  
        <p style="margin:0;font-size:14px;margin-right:18px;margin-top:4px;">
          当前页分摊金额:
          <span style="color:red">{{currentPrice | cutOut}}</span>
        </p>
      </div>
    </div>
    <!-- 杂费明细 -->
    <el-table
      :data="tableData4"
      @sort-change="sortNumber"
      height="650"
      v-show="showTable.extra"
      border 
      class="elTable"
      :header-cell-style="getRowClass" 
      style="width: 100%;font-size:13px;" 
      v-loading="load4"
    >
      <el-table-column prop="suffix" label="账号" sortable align="center"></el-table-column>
      <el-table-column prop="saleOpeFeeZn" label="杂费" sortable="custom" align="center"></el-table-column>
      <el-table-column prop="comment" label="备注" align="center"></el-table-column>
      <el-table-column prop="dateTime" label="时间" sortable align="center"></el-table-column>
      <el-table-column prop="salesman" label="销售员" sortable align="center"></el-table-column>
    </el-table>
    <div class="block toolbar" v-show="showTable.extra">
      <el-pagination
        background
        @size-change="handleSizeChangeExtra"
        @current-change="handleCurrentChangeExtra"
        :current-page="this.extra.page"
        :page-size="this.extra.pageSize"
        :page-sizes="[10,20,30,40]"
        layout="total,sizes,prev,pager,next,jumper"
        :total="this.total4"
      ></el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { APIReportExport } from "../../api/product";
import echarts from "echarts";
import {
  getSection,
  getSecDepartment,
  getPlatform,
  getMember,
  getStore,
  getAccount,
  getSales,
  getRefund,
  getDeadFee,
  getExtraFee,
  getRefundAnalysisPlat,
  getRefundAnalysisSuffix,
  getRefundAnalysisExpress,
  getRefundAnalysisGoods,
  getRefundExpressRate,
  getRefundSuffixRate
} from "../../api/profit";
import { isAdmin } from "../../api/api";
import {
  compareUp,
  compareDown,
  getMonthDate,
  getDateRangeType
} from "../../api/tools";
import { getMenu } from "../../api/login";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    const vue = this;
    return {
      load1:false,
      load2:false,
      load3:false,
      load4:false,
      options: {
        title: {
          text: "平台退款金额占比(￥)",
          subtext: "",
          top: 15,
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "right",
          top: 8,
          data: [String]
        },
        series: [
          {
            name: "平台退款分析",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [Object],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      options1: {
        title: {
          text: "账号退款金额占比(￥)",
          subtext: "",
          top: 15,
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          left: "right",
          top: 8,
          data: [String],
          selected: {}
        },
        series: [
          {
            name: "账号退款分析",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [Object],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      options2: {
        title: {
          text: "产品退款次数占比",
          subtext: "",
          top: 15,
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          left: "right",
          top: 8,
          data: [String],
          selected: {}
        },
        series: [
          {
            name: "产品退款分析",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [Object],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      options3: {
        title: {
          text: "物流退款次数占比",
          subtext: "",
          top: 15,
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          left: "right",
          top: 8,
          data: [String],
          selected: {}
        },
        series: [
          {
            name: "物流退款分析",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [Object],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      // options4: {
      //   backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [
      //     {
      //       offset: 0,
      //       color: "#f7f8fa"
      //     },
      //     {
      //       offset: 1,
      //       color: "#cdd0d5"
      //     }
      //   ]),
      //   title: {
      //     text: "物流退款率",
      //     x: "center"
      //   },
      //   legend: {
      //     right: 10
      //   },
      //   xAxis: {
      //     splitLine: {
      //       lineStyle: {
      //         type: "dashed"
      //       }
      //     }
      //   },
      //   yAxis: {
      //     splitLine: {
      //       lineStyle: {
      //         type: "dashed"
      //       }
      //     },
      //     scale: true
      //   },
      //   grid:{
      //     left:55
      //   },
      //   series: []
      // },
      // options4: {
      //   title: {
      //     text: "物流退款率"
      //   },
      //   tooltip: {
      //     trigger: "item",
      //     formatter: ""
      //   },
      //   series: [
      //     {
      //       name: "物流退款率",
      //       type: "wordCloud",
      //       size: ["80%", "80%"],
      //       textRotation: [0, 45, 90, -45],
      //       textPadding: 0,
      //       autoSize: {
      //         enable: true,
      //         minSize: 14
      //       },
      //       data: []
      //     }
      //   ]
      // },
      listLoading1:false,
      listLoading2:false,
      listLoading3:false,
      listLoading4:false,
      listLoading5:false,
      listLoading6:false,
      kefu: [],
      totalPrice: 0,
      currentPrice: 0,
      autoHeight: 0,
      autoHeight1: 0,
      tksj: 0,
      tkjq: 0,
      total: null,
      total2: null,
      total3: null,
      total4: null,
      activeName: "毛利润报表",
      tableHeight: 0,
      allMember: [],
      isA: true,
      text: "显示输入框",
      show: true,
      show1: false,
      showTable: {
        sell: false,
        order: false,
        goods: false,
        report: false,
        dead: false,
        extra: false
      },
      allMenu: [],
      allDataOrder: [],
      allDataGoods: [],
      allDataDead: [],
      allDataExtra: [],
      tableData: [],
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      searchTable: [],
      searchTable1: [],
      searchTable2: [],
      searchTable3: [],
      searchTable4: [],
      searchValue: "",
      listLoading: false,
      department: [],
      allSecDep: [],
      secDepartment: [],
      plat: [],
      member: [],
      store: [],
      dateType: [{ id: 1, type: "发货时间" }, { id: 0, type: "交易时间" }],
      dateRange: [],
      account: [],
      condition: {
        department: [],
        secDepartment: [],
        plat: [],
        member: [],
        store: [],
        dateType: 1,
        dateRange: [],
        account: [],
        dateRangeType: 3,
        page: 1,
        pageSize: 20,
        suffix: [],
        type: "order"
      },
      goods: {
        department: [],
        secDepartment: [],
        plat: [],
        member: [],
        dateRange: [],
        account: [],
        dateRangeType: 3,
        page: 1,
        pageSize: 20,
        type: "goods"
      },
      order: {},
      dead: {
        plat: [],
        storename: [],
        account: [],
        member: [],
        dateRange: [],
        page: 1,
        pageSize: 20
      },
      extra: {
        plat: [],
        storename: [],
        account: [],
        member: [],
        dateRange: [],
        page: 1,
        pageSize: 20
      },
      pickerOptions2: {
        onPick(maxDate, minDate) {
          vue.condition.dateRangeType = 3;
        },
        shortcuts: [
          {
            text: "本月",
            onClick(vm) {
              const date = getMonthDate("thisMonth");
              vm.$emit("pick", [date["start"], date["end"]]);
              vue.condition.dateRangeType = getDateRangeType(
                date["start"],
                date["end"]
              );
            }
          },
          {
            text: "上个月",
            onClick(picker) {
              const date = getMonthDate("previousMonth");
              vue.condition.dateRangeType = 2;
              picker.$emit("pick", [date["start"], date["end"]]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const date = getMonthDate("lastMonth");
              vue.condition.dateRangeType = 1;
              picker.$emit("pick", [date["start"], date["end"]]);
            }
          }
        ]
      }
    };
  },
  filters: {
    cutOut: function(value) {
      value = Number(value).toFixed(2);
      return value;
    },
    cutOutDate(value){
      value = value.substring(0, 16);
      return value;
    },
  },
  methods: {
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "color:#3c8dbc;background:#f5f7fa";
      } else {
        return "";
      }
    },
    showAll() {
      this.goods.pageSize = this.total2;
      this.getGoods();
    },
    handleSizeChange(val) {
      this.condition.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.condition.page = val;
      this.getData();
    },
    handleSizeChangeGoods(val) {
      this.goods.pageSize = val;
      this.getGoods();
    },
    handleCurrentChangeGoods(val) {
      this.goods.page = val;
      this.getGoods();
    },
    handleSizeChangeDead(val) {
      this.dead.pageSize = val;
      this.getDead();
    },
    handleCurrentChangeDead(val) {
      this.dead.page = val;
      this.getDead();
    },
    handleSizeChangeExtra(val) {
      this.extra.pageSize = val;
      this.getExtra();
    },
    handleCurrentChangeExtra(val) {
      this.extra.page = val;
      this.getExtra();
    },
    handleClick(tab, event) {
      if (tab.label === "退款订单明细") {
        this.showTable["sell"] = false;
        this.showTable["order"] = true;
        this.showTable["goods"] = false;
        this.showTable["report"] = false;
        this.showTable["dead"] = false;
        this.showTable["extra"] = false;
        this.getData();
      } else if (tab.label === "退款产品明细") {
        this.showTable["sell"] = false;
        this.showTable["order"] = false;
        this.showTable["goods"] = true;
        this.showTable["report"] = false;
        this.showTable["dead"] = false;
        this.showTable["extra"] = false;
        this.getGoods();
      } else if (tab.label === "退款分析报告") {
        this.showTable["sell"] = false;
        this.showTable["order"] = false;
        this.showTable["goods"] = false;
        this.showTable["report"] = true;
        this.showTable["dead"] = false;
        this.showTable["extra"] = false;
        this.onSubmit(this.condition);
      } else if (tab.label === "死库明细") {
        this.showTable["sell"] = false;
        this.showTable["order"] = false;
        this.showTable["goods"] = false;
        this.showTable["report"] = false;
        this.showTable["dead"] = true;
        this.showTable["extra"] = false;
        this.getDead();
      } else if (tab.label === "运营杂费明细") {
        this.showTable["sell"] = false;
        this.showTable["order"] = false;
        this.showTable["goods"] = false;
        this.showTable["report"] = false;
        this.showTable["dead"] = false;
        this.showTable["extra"] = true;
        this.getExtra();
      } else {
        this.showTable["sell"] = true;
        this.showTable["order"] = false;
        this.showTable["goods"] = false;
        this.showTable["report"] = false;
        this.showTable["dead"] = false;
        this.showTable["extra"] = false;
        this.onSubmit(this.condition);
      }
    },
    selectalls() {
      const allValues = [];
      for (const item of this.store) {
        allValues.push(item);
      }
      this.condition.store = allValues;
    },
    noselects() {
      this.condition.store = [];
    },
    selectallm() {
      const allValues = [];
      for (const item of this.member) {
        allValues.push(item.username);
      }
      this.condition.member = allValues;
    },
    noselectm() {
      this.condition.member = [];
    },
    selectalld() {
      const allValues = [];
      for (const item of this.department) {
        allValues.push(item.department);
      }
      this.secDepartment = this.allSecDep
      this.condition.department = allValues;
      this.member = this.allMember;
    },
    noselectd() {
      this.condition.department = [];
      this.condition.secDepartment = [];
      this.secDepartment = this.allSecDep
      this.member = this.allMember;
    },
    selectallSec() {
      const allValues = [];
      for (const item of this.secDepartment) {
        allValues.push(item.department);
      }
      this.condition.secDepartment = allValues;
      const arr = []
      for(let i = 0;i<this.secDepartment.length;i++){
        const secname = this.secDepartment[i].department
        for(let k = 0;k<this.allMember.length;k++){
          if(secname == this.allMember[k].department){
            arr.push(this.allMember[k])
          }
        }
      }
      this.member = arr
      // this.member = this.allMember;
    },
    noselectSec() {
      this.condition.secDepartment = [];
      let arr = []
      if(this.condition.department.length>0){
        for(let i =0;i<this.condition.department.length;i++){
          const secname = this.condition.department[i]
          for(let k = 0;k<this.allMember.length;k++){
            if(secname == this.allMember[k].parent_department){
              arr.push(this.allMember[k])
            }
          }
        }
      }else{
        arr = this.allMember
      }
      this.member = arr
      // this.member = this.allMember;
    },
    selectall() {
      const allValues = [];
      for (const item of this.account) {
        allValues.push(item.store);
      }
      this.condition.account = allValues;
    },
    noselect() {
      this.condition.account = [];
    },
    choosed() {
      let res = [];
      const val = this.condition.department;

      // 二级部门处理
      const allDepartments = this.department;
      const allDepartmentsMap = {};
      for (let i = 0; i < allDepartments.length; i++) {
        allDepartmentsMap[allDepartments[i].id] = allDepartments[i].department;
      }
      // 人员处理
      res = this.allMember;
      let per = [];
      const secDep = [];
      this.member = [];
      this.condition.member = [];
      if (val.length !== 0) {
        for (let i = 0; i < val.length; i++) {
          // 部门
          for (let k = 0; k < this.allSecDep.length; k++) {
            if (allDepartmentsMap[this.allSecDep[k].parent] === val[i] && this.allSecDep[k].type.indexOf('销售')>-1) {
              secDep.push(this.allSecDep[k]);
            }
          }

          // 人员
          per = res.filter(
            ele =>
              (ele.department === val[i] || ele.parent_department === val[i]) &&
              ele.position === "销售"
          );
          this.member = this.member.concat(per);
        }
        this.secDepartment = secDep;
      } else {
        this.member = res;
        this.secDepartment = this.allSecDep;
      }
    },
    secChoosed() {
      // 值变化之后人员要处理
      let res = [];
      const val = this.condition.secDepartment;
      // 人员处理
      res = this.allMember;
      let per = [];
      this.member = [];
      this.condition.member = [];
      if (val.length !== 0) {
        for (let i = 0; i < val.length; i++) {
          // 人员
          per = res.filter(
            ele => ele.department === val[i] && ele.position === "销售"
          );
          this.member = this.member.concat(per);
        }
      } else {
        this.member = res;
      }
    },
    handleChange() {
      this.show = !this.show;
      this.isA = !this.isA;
      if (this.show === false) {
        this.text = "显示输入框";
        const height = document.getElementById("app").clientHeight;
        this.tableHeight = height - 135 + "px";
      } else if (this.show === true) {
        this.text = "隐藏输入框";
        const height = document.getElementById("app").clientHeight;
        this.tableHeight = height - 255;
      }
    },
    changeActive() {
      this.show1 = true;
    },
    removeActive() {
      this.show1 = false;
    },
    myForm(form) {
      const myform = JSON.parse(JSON.stringify(form));
      if (myform.member.length !== 0) {
        if (isAdmin() === false) {
          myform.member = this.condition.member;
        }
      }
      // 根据选定的部门，处理人员
      if (myform.member.length === 0) {
        if (isAdmin() === false) {
          const name = this.$store.getters.name;
          const res = this.allMember;
          const kes = this.kefu;
          if (kes.length > 0) {
            myform.member = res.map(m => {
              return m.username;
            });
          } else {
            myform.member = res.map(m => {
              return m.username;
            });
          }
        }
        if (myform.department.length !== 0) {
          if (myform.secDepartment.length === 0) {
            const val = form.department;
            const res = this.allMember;
            for (let i = 0; i < val.length; i++) {
              const per = res.filter(
                ele => ele.department === val[i] && ele.position === "销售"
              );
              this.member.concat(per);
            }
            myform.member = this.member.map(m => {
              return m.username;
            });
          }
          if (myform.secDepartment.length !== 0) {
            const val = form.secDepartment;
            const res = this.allMember;
            for (let i = 0; i < val.length; i++) {
              const per = res.filter(
                ele => ele.department === val[i] && ele.position === "销售"
              );
              this.member.concat(per);
            }
            myform.member = this.member.map(m => {
              return m.username;
            });
          }
        } else {
          if (myform.secDepartment.length !== 0) {
            const val = form.secDepartment;
            const res = this.allMember;
            for (let i = 0; i < val.length; i++) {
              const per = res.filter(
                ele => ele.department === val[i] && ele.position === "销售"
              );
              this.member.concat(per);
            }
            myform.member = this.member.map(m => {
              return m.username;
            });
          }
        }
      }
      return myform;
    },
    onSubmit(form) {
      if (this.activeName === "退款订单明细") {
        this.getData();
      } else if (this.activeName === "退款产品明细") {
        this.getGoods();
      } else if (this.activeName === "退款分析报告") {
        this.analysis(form);
      } else if (this.activeName === "死库明细") {
        this.getDead();
      } else if (this.activeName === "运营杂费明细") {
        this.getExtra();
      } else {
        const height = document.documentElement.clientHeight;
        this.tableHeight = height - 255;
        this.showTable["sell"] = true;
        this.showTable["order"] = false;
        this.showTable["goods"] = false;
        this.showTable["report"] = false;
        this.showTable["dead"] = false;
        this.showTable["extra"] = false;
        this.activeName = "毛利润报表";
        this.$refs.condition.validate(valid => {
          if (valid) {
            const myform = this.myForm(form);
            this.listLoading = true;
            getSales(myform).then(response => {
              this.listLoading = false;
              this.tableData = this.searchTable = response.data.data;
            });
          } else {
            return false;
          }
        });
      }
    },
    // 搜索
    handleSearch() {
      const searchValue = this.searchValue && this.searchValue.toLowerCase();
      if (this.activeName === "毛利润报表") {
        const data = this.searchTable;
        if (searchValue) {
          this.tableData = data.filter(function(row) {
            return Object.keys(row).some(function(key) {
              return (
                String(row[key])
                  .toLowerCase()
                  .indexOf(searchValue) > -1
              );
            });
          });
        } else {
          this.tableData = data;
        }
      } else if (this.activeName === "退款订单明细") {
        const data = this.searchTable1;
        if (searchValue) {
          this.tableData1 = data.filter(function(row) {
            return Object.keys(row).some(function(key) {
              return (
                String(row[key])
                  .toLowerCase()
                  .indexOf(searchValue) > -1
              );
            });
          });
        } else {
          this.tableData1 = data;
        }
      } else if (this.activeName === "退款产品明细") {
        const data = this.searchTable2;
        if (searchValue) {
          this.tableData2 = data.filter(function(row) {
            return Object.keys(row).some(function(key) {
              return (
                String(row[key])
                  .toLowerCase()
                  .indexOf(searchValue) > -1
              );
            });
          });
        } else {
          this.tableData2 = data;
        }
      } else if (this.activeName === "死库明细") {
        const data = this.searchTable3;
        if (searchValue) {
          this.tableData3 = data.filter(function(row) {
            return Object.keys(row).some(function(key) {
              return (
                String(row[key])
                  .toLowerCase()
                  .indexOf(searchValue) > -1
              );
            });
          });
        } else {
          this.tableData3 = data;
        }
      } else if (this.activeName === "运营杂费明细") {
        const data = this.searchTable4;
        if (searchValue) {
          this.tableData4 = data.filter(function(row) {
            return Object.keys(row).some(function(key) {
              return (
                String(row[key])
                  .toLowerCase()
                  .indexOf(searchValue) > -1
              );
            });
          });
        } else {
          this.tableData4 = data;
        }
      }
    },
    // 数字排序
    sortNumber(column, prop, order) {
      if (this.activeName === "毛利润报表") {
        const data = this.tableData;
        if (column.order === "descending") {
          this.tableData = data.sort(compareDown(data, column.prop));
        } else {
          this.tableData = data.sort(compareUp(data, column.prop));
        }
      } else if (this.activeName === "退款订单明细") {
        const data = this.tableData1;
        if (column.order === "descending") {
          this.tableData1 = data.sort(compareDown(data, column.prop));
        } else {
          this.tableData1 = data.sort(compareUp(data, column.prop));
        }
      } else if (this.activeName === "退款产品明细") {
        const data = this.tableData2;
        if (column.order === "descending") {
          this.tableData2 = data.sort(compareDown(data, column.prop));
        } else {
          this.tableData2 = data.sort(compareUp(data, column.prop));
        }
      } else if (this.activeName === "死库明细") {
        const data = this.tableData3;
        if (column.order === "descending") {
          this.tableData3 = data.sort(compareDown(data, column.prop));
        } else {
          this.tableData3 = data.sort(compareUp(data, column.prop));
        }
      } else if (this.activeName === "运营杂费明细") {
        const data = this.tableData4;
        if (column.order === "descending") {
          this.tableData4 = data.sort(compareDown(data, column.prop));
        } else {
          this.tableData4 = data.sort(compareUp(data, column.prop));
        }
      }
    },
    // 小数和空值格式化
    empty(row, column, cellValue, index) {
      row.salemoneyzn = Math.round(row.salemoneyzn * 100) / 100;
      row.ebayfeeznebay = Math.round(row.ebayfeeznebay * 100) / 100;
      row.ppFeezn = Math.round(row.ppFeezn * 100) / 100;
      row.grossprofit = Math.round(row.grossprofit * 100) / 100;
      row.refundZn = Math.round(row.refundZn * 100) / 100;
      if (!isNaN(cellValue)) {
        return Number(cellValue);
      } else {
        return cellValue;
      }
    },
    // 导出
    exportExcel() {
      /* generate workbook object from table */
      if (this.activeName === "毛利润报表") {
        const th = [
          "平台",
          "账号",
          "销售员",
          "成交价$",
          "成交价￥",
          "eBay成交费$",
          "eBay成交费￥",
          "PP成交费$",
          "pp成交费￥",
          "商品成本￥",
          "运费成本￥",
          "包装成本￥",
          "发货仓库",
          "退款金额￥",
          "退款率%",
          "死库处理￥",
          "店铺杂费￥",
          "运营杂费￥",
          "毛利",
          "毛利率%"
        ];
        const filterVal = [
          "pingtai",
          "suffix",
          "salesman",
          "salemoney",
          "salemoneyzn",
          "ebayFeeebay",
          "ebayfeeznebay",
          "ppFee",
          "ppFeezn",
          "costmoney",
          "expressFare",
          "inpackagemoney",
          "storename",
          "refund",
          "refundrate",
          "diefeeZn",
          "insertionFee",
          "saleOpeFeeZn",
          "grossprofit",
          "grossprofitRate"
        ];
        const Filename = "销售毛利润报表";
        const data = this.tableData.map(v => filterVal.map(k => v[k]));
        const [fileName, fileType, sheetName] = [Filename, "xls"];
        this.$toExcel({ th, data, fileName, fileType, sheetName });
      } else if (this.activeName === "退款订单明细") {
        let arrTk = {};
        arrTk.department = this.condition.department;
        arrTk.secDepartment = this.condition.secDepartment;
        arrTk.plat = this.condition.plat;
        arrTk.member = this.condition.member;
        arrTk.dateRange = this.condition.dateRange;
        arrTk.account = this.condition.account;
        arrTk.dateRangeType = this.condition.dateType;
        arrTk.role = this.condition.role;
        arrTk.storename = this.condition.store;
        arrTk.pageSize = 1000000;
        arrTk.type = "order";
        const myform = this.myForm(arrTk);
        APIReportExport(myform).then(res => {
          const blob = new Blob([res.data], {
            type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
          });
          const downloadElement = document.createElement("a");
          const objectUrl = window.URL.createObjectURL(blob);
          downloadElement.href = objectUrl;
          const date = new Date();
          const year = date.getFullYear();
          let month = date.getMonth() + 1;
          let strDate = date.getDate();
          let hour = date.getHours();
          let minute = date.getMinutes();
          let second = date.getSeconds();
          if (month >= 1 && month <= 9) {
            month = "0" + month;
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
          }
          if (hour >= 0 && hour <= 9) {
            hour = "0" + hour;
          }
          if (minute >= 0 && minute <= 9) {
            minute = "0" + minute;
          }
          if (second >= 0 && second <= 9) {
            second = "0" + second;
          }
          const filename =
            "退款订单明细_" + year + month + strDate + hour + minute + second;
          downloadElement.download = filename + ".xls";
          document.body.appendChild(downloadElement);
          downloadElement.click();
          document.body.removeChild(downloadElement);
        });
        //        this.order = Object.assign({}, this.condition)
        //        this.order.pageSize = this.total
        //        getRefund(this.order).then(res => {
        //          this.allDataOrder = res.data.data.items
        //          const Filename = '退款订单明细'
        //          const data = this.allDataOrder.map(v => filterVal.map(k => v[k]))
        //          const [fileName, fileType, sheetName] = [Filename, 'xls']
        //          this.$toExcel({ th, data, fileName, fileType, sheetName })
        //        })
        //        const th = [
        //          '账号',
        //          '退款月份',
        //          '销售员',
        //          '商品名称',
        //          '商品编码',
        //          '商品SKU',
        //          '订单编号',
        //          '店铺单号',
        //          '合并单号',
        //          '仓库',
        //          '退款$',
        //          '退款￥',
        //          '国家',
        //          '物流方式',
        //          '平台',
        //          '交易时间',
        //          '退款时间',
        //          '退款时间-交易时间(天)'
        //        ]
        //        const filterVal = [
        //          'suffix',
        //          'refMonth',
        //          'salesman',
        //          'goodsName',
        //          'goodsCode',
        //          'goodsSku',
        //          'tradeId',
        //          'orderId',
        //          'mergeBillId',
        //          'storeName',
        //          'refund',
        //          'refundZn',
        //          'orderCountry',
        //          'expressWay',
        //          'platform',
        //          'orderTime',
        //          'refundTime',
        //          'dateDelta'
        //        ]
      } else if (this.activeName === "退款产品明细") {
        let arrTk = {};
        arrTk.department = this.condition.department;
        arrTk.secDepartment = this.condition.secDepartment;
        arrTk.plat = this.condition.plat;
        arrTk.member = this.condition.member;
        arrTk.dateRange = this.condition.dateRange;
        arrTk.account = this.condition.account;
        arrTk.dateRangeType = this.condition.dateType;
        arrTk.role = this.condition.role;
        arrTk.storename = this.condition.store;
        arrTk.pageSize = 1000000;
        arrTk.type = "goods";
        const myform = this.myForm(arrTk);
        APIReportExport(myform).then(res => {
          const blob = new Blob([res.data], {
            type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
          });
          const downloadElement = document.createElement("a");
          const objectUrl = window.URL.createObjectURL(blob);
          downloadElement.href = objectUrl;
          const date = new Date();
          const year = date.getFullYear();
          let month = date.getMonth() + 1;
          let strDate = date.getDate();
          let hour = date.getHours();
          let minute = date.getMinutes();
          let second = date.getSeconds();
          if (month >= 1 && month <= 9) {
            month = "0" + month;
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
          }
          if (hour >= 0 && hour <= 9) {
            hour = "0" + hour;
          }
          if (minute >= 0 && minute <= 9) {
            minute = "0" + minute;
          }
          if (second >= 0 && second <= 9) {
            second = "0" + second;
          }
          const filename =
            "退款产品明细_" + year + month + strDate + hour + minute + second;
          downloadElement.download = filename + ".xls";
          document.body.appendChild(downloadElement);
          downloadElement.click();
          document.body.removeChild(downloadElement);
        });
        // this.order = Object.assign({}, this.goods)
        // this.order.type=order
        // this.order.pageSize = this.total2
        // getRefund(this.order).then(res => {
        //   this.allDataGoods = res.data.data.items
        //   const Filename = '退款产品明细'
        //   const data = this.allDataGoods.map(v => filterVal.map(k => v[k]))
        //   const [fileName, fileType, sheetName] = [Filename, 'xls']
        //   this.$toExcel({ th, data, fileName, fileType, sheetName })
        // })
        //        const th = [
        //          '账号',
        //          '商品名称',
        //          '商品编码',
        //          '商品SKU',
        //          '退款次数',
        //          '销售员'
        //        ]
        //        const filterVal = [
        //          'suffix',
        //          'goodsName',
        //          'goodsCode',
        //          'goodsSku',
        //          'times',
        //          'salesman'
        //        ]
      } else if (this.activeName === "死库明细") {
        let arrTk = {};
        arrTk.department = this.condition.department;
        arrTk.secDepartment = this.condition.secDepartment;
        arrTk.plat = this.condition.plat;
        arrTk.member = this.condition.member;
        arrTk.dateRange = this.condition.dateRange;
        arrTk.account = this.condition.account;
        arrTk.dateRangeType = this.condition.dateType;
        arrTk.role = this.condition.role;
        arrTk.storename = this.condition.store;
        arrTk.pageSize = 1000000;
        arrTk.type = "salesDeadFee";
        const myform = this.myForm(arrTk);
        APIReportExport(myform).then(res => {
          const blob = new Blob([res.data], {
            type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
          });
          const downloadElement = document.createElement("a");
          const objectUrl = window.URL.createObjectURL(blob);
          downloadElement.href = objectUrl;
          const date = new Date();
          const year = date.getFullYear();
          let month = date.getMonth() + 1;
          let strDate = date.getDate();
          let hour = date.getHours();
          let minute = date.getMinutes();
          let second = date.getSeconds();
          if (month >= 1 && month <= 9) {
            month = "0" + month;
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
          }
          if (hour >= 0 && hour <= 9) {
            hour = "0" + hour;
          }
          if (minute >= 0 && minute <= 9) {
            minute = "0" + minute;
          }
          if (second >= 0 && second <= 9) {
            second = "0" + second;
          }
          const filename =
            "司库明细_" + year + month + strDate + hour + minute + second;
          downloadElement.download = filename + ".xls";
          document.body.appendChild(downloadElement);
          downloadElement.click();
          document.body.removeChild(downloadElement);
        });
        // this.order = Object.assign({}, this.dead)
        // this.order.pageSize = this.total3
        // getDeadFee(this.order).then(res => {
        //   this.allDataDead = res.data.data.items
        //   const Filename = '死库明细'
        //   const data = this.allDataDead.map(v => filterVal.map(k => v[k]))
        //   const [fileName, fileType, sheetName] = [Filename, 'xls']
        //   this.$toExcel({ th, data, fileName, fileType, sheetName })
        // })
        // const th = ['账号', '发货仓库', '总计', '时间', '销售员']
        // const filterVal = [
        //   'suffix',
        //   'storename',
        //   'total',
        //   'dateTime',
        //   'salesman'
        // ]
      } else if (this.activeName === "店铺杂费明细") {
        let arrTk = {};
        arrTk.department = this.condition.department;
        arrTk.secDepartment = this.condition.secDepartment;
        arrTk.plat = this.condition.plat;
        arrTk.member = this.condition.member;
        arrTk.dateRange = this.condition.dateRange;
        arrTk.account = this.condition.account;
        arrTk.dateRangeType = this.condition.dateType;
        arrTk.role = this.condition.role;
        arrTk.storename = this.condition.store;
        arrTk.pageSize = 1000000;
        arrTk.type = "extra";
        const myform = this.myForm(arrTk);
        APIReportExport(myform).then(res => {
          const blob = new Blob([res.data], {
            type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
          });
          const downloadElement = document.createElement("a");
          const objectUrl = window.URL.createObjectURL(blob);
          downloadElement.href = objectUrl;
          const date = new Date();
          const year = date.getFullYear();
          let month = date.getMonth() + 1;
          let strDate = date.getDate();
          let hour = date.getHours();
          let minute = date.getMinutes();
          let second = date.getSeconds();
          if (month >= 1 && month <= 9) {
            month = "0" + month;
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
          }
          if (hour >= 0 && hour <= 9) {
            hour = "0" + hour;
          }
          if (minute >= 0 && minute <= 9) {
            minute = "0" + minute;
          }
          if (second >= 0 && second <= 9) {
            second = "0" + second;
          }
          const filename =
            "店铺杂费明细" + year + month + strDate + hour + minute + second;
          downloadElement.download = filename + ".xls";
          document.body.appendChild(downloadElement);
          downloadElement.click();
          document.body.removeChild(downloadElement);
        });
        // this.order = Object.assign({}, this.extra)
        // this.order.pageSize = this.total4
        // getExtraFee(this.order).then(res => {
        //   this.allDataExtra = res.data.data.items
        //   const Filename = '杂费明细'
        //   const data = this.allDataExtra.map(v => filterVal.map(k => v[k]))
        //   const [fileName, fileType, sheetName] = [Filename, 'xls']
        //   this.$toExcel({ th, data, fileName, fileType, sheetName })
        // })
        // const th = ['账号', '杂费', '时间', '销售员']
        // const filterVal = ['suffix', 'saleOpeFeeZn', 'dateTime', 'salesman']
      }
      //  return wbout
    },
    // 合计
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      const fileds = columns.map(item => item.property);
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        const values = data.map(item =>
          Number(item[column.property] ? item[column.property] : "unkonwn")
        );
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] = Math.round(sums[index] * 100) / 100;
        } else {
          sums[index] = "N/A";
        }
      });
      // 退款率和利润率核算
      sums[fileds.indexOf("refundrate")] =
        Math.round(
          (sums[fileds.indexOf("refund")] * 10000) /
            sums[fileds.indexOf("salemoneyzn")]
        ) / 100;
      sums[fileds.indexOf("grossprofitRate")] =
        Math.round(
          (sums[fileds.indexOf("grossprofit")] * 10000) /
            sums[fileds.indexOf("salemoneyzn")]
        ) / 100;
      return sums;
    },
    getSummaries1(param) {
      const { columns, data } = param;
      const sums = [];
      const fileds = columns.map(item => item.property);
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        if (index === 9) {
          sums[index] = this.tksj;
          return;
        }
        if (index === 10) {
          sums[index] = this.tkjq;
          return;
        }
      });
      return sums;
    },
    // 折叠导航栏
    collapse: function() {
      this.collapsed = !this.collapsed;
    },
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        "submenu-hook-" + i
      )[0].style.display = status ? "block" : "none";
    },
    getData() {
      this.load1=true
      const myform = this.myForm(this.condition);
      getRefund(myform).then(res => {
        this.load1=false
        this.searchTable1 = this.tableData1 = res.data.data.items;
        this.total = res.data.data._meta.totalCount;
        this.condition.page = res.data.data._meta.currentPage;
        this.condition.pageSize = res.data.data._meta.perPage;
        this.tksj = res.data.data.extra.totalRefundUs;
        this.tkjq = res.data.data.extra.totalRefundZn;
      });
    },
    analysis(from) {
      this.listLoading1=true
      this.listLoading2=true
      this.listLoading3=true
      this.listLoading4=true
      this.listLoading5=true
      this.listLoading6=true
      getRefundAnalysisPlat(from).then(res => {
        const orderpie = res.data.data.item;
        let arry = [];
        for (let i = 0; i < orderpie.length; i++) {
          arry.push(orderpie[i].name);
        }
        this.options.legend.data = arry;
        this.options.series[0].data = orderpie;
        let ordPlatform = this.$echarts.init(this.$refs.ordPlatform);
        ordPlatform.setOption(this.options);
        this.listLoading1=false
      });
      getRefundAnalysisSuffix(from).then(res => {
        const orderpie = res.data.data.item;
        let arry = [];
        let selected = {};
        for (let i = 0; i < orderpie.length; i++) {
          arry.push(orderpie[i].name);
          selected[orderpie[i].name] = i < 10;
        }
        this.options1.legend.data = arry;
        this.options1.series[0].data = orderpie;
        this.options1.legend.selected = selected;
        let ordAccount = this.$echarts.init(this.$refs.ordAccount);
        ordAccount.setOption(this.options1);
        this.listLoading2=false
      });
      getRefundAnalysisExpress(from).then(res => {
        const orderpie = res.data.data.item;
        let arry = [];
        let selected = {};
        for (let i = 0; i < orderpie.length; i++) {
          arry.push(orderpie[i].name);
          selected[orderpie[i].name] = i < 10;
        }
        this.options3.legend.data = arry;
        this.options3.series[0].data = orderpie;
        this.options3.legend.selected = selected;
        let ordLogistics = this.$echarts.init(this.$refs.ordLogistics);
        ordLogistics.setOption(this.options3);
        this.listLoading3=false
      });
      let objary = Object.assign({}, from);
      objary.type = "goods";
      getRefundAnalysisGoods(objary).then(res => {
        const orderpie = res.data.data.item;
        let arry = [];
        var selected = {};
        for (let i = 0; i < orderpie.length; i++) {
          arry.push(orderpie[i].name);
          selected[orderpie[i].name] = i < 10;
        }
        this.options2.legend.data = arry;
        this.options2.series[0].data = orderpie;
        this.options2.legend.selected = selected;
        let ordProduct = this.$echarts.init(this.$refs.ordProduct);
        ordProduct.setOption(this.options2);
        this.listLoading4=false
      });
      let objVat = Object.assign({}, from);
      if (objVat.account.length == 0) {
        objVat.account = this.account.map(m => {
          return m.store;
        });
      }
      getRefundExpressRate(objVat).then(res => {
        // function createRandomItemStyle() {
        //   return {
        //     normal: {
        //       color:
        //         "rgb(" +
        //         [
        //           Math.round(Math.random() * 160),
        //           Math.round(Math.random() * 160),
        //           Math.round(Math.random() * 160)
        //         ].join(",") +
        //         ")"
        //     }
        //   };
        // }
        // const ordArr = res.data.data;
        // var arr = [];
        // var options4 = {
        //   title: {
        //     text: "物流退款率"
        //   },
        //   tooltip: {
        //     trigger: "item",
        //     formatter: function(params) {
        //       var res = params.name + "<br/>";
        //       var myseries = ordArr;
        //       res =
        //         params.data.name +
        //         "：发货总量:" +
        //         params.data.value1 +
        //         "：退款比例:" +
        //         params.data.value2;
        //       return res;
        //     }
        //   },
        //   series: [
        //     {
        //       name: "物流退款率",
        //       type: "wordCloud",
        //       size: ["80%", "80%"],
        //       textRotation: [0, 45, 90, -45],
        //       textPadding: 0,
        //       autoSize: {
        //         enable: true,
        //         minSize: 14
        //       },
        //       textStyle: {
        //         normal: {
        //           color: function() {
        //             return (
        //               "rgb(" +
        //               [
        //                 Math.round(Math.random() * 160),
        //                 Math.round(Math.random() * 160),
        //                 Math.round(Math.random() * 160)
        //               ].join(",") +
        //               ")"
        //             );
        //           }
        //         }
        //       },
        //       data: []
        //     }
        //   ]
        // };
        // for (let i = 0; i < ordArr.length; i++) {
        //   let obj = {
        //     name: ordArr[i].expressName,
        //     value: ordArr[i].totalCount * ordArr[i].expressRate,
        //     value1: ordArr[i].totalCount,
        //     value2: ordArr[i].expressRate
        //   };
        //   arr.push(obj);
        // }
        // options4.series[0].data = arr;
        // let ordRefund = this.$echarts.init(this.$refs.ordRefund);
        // ordRefund.setOption(options4);
        if (res.data.code == 200) {
          const ordArr = res.data.data;
          var arr = [];
          var ary = [];
          var options4 = {
            title: {
              text: "物流退款率",
              top:"10"
            },
            tooltip: {
              trigger: "item",
              formatter: function(params) {
                var res = params.name + "<br/>";
                var myseries = ordArr;
                res =
                  params.data.name +
                  "，发货总量：" +
                  params.data.value1 +
                  "，退款总量：" +
                  params.data.value3+
                  "，退款比例(%)：" +
                  params.data.value2;
                return res;
              }
            },
            toolbox: {
              show: true,
              orient: "vertical",
              top: "center",
              feature: {
                dataView: { readOnly: false },
                restore: {},
                saveAsImage: {}
              }
            },
            legend: {
              type: "scroll",
              orient: "vertical",
              left: "left",
              top: 40,
              data: []
            },
            calculable: true,
            series: [
              {
                type: "funnel",
                width: "85%",
                top: "15",
                left: "14%",
                height: "96%",
                funnelAlign: "left",
                center: ["75%", "25%"], // for pie
                data: []
              }
            ]
          };
          for (let i = 0; i < ordArr.length; i++) {
            let obj = {
              name: ordArr[i].expressName,
              value: ordArr[i].refundCount,
              value1: ordArr[i].totalCount,
              value2: (ordArr[i].expressRate*100).toFixed(2),
              value3: ordArr[i].refundCount,
            };
            arr.push(obj);
            ary.push(ordArr[i].expressName);
          }
          options4.series[0].data = arr;
          options4.legend.data = arr;
          let ordRefund = this.$echarts.init(this.$refs.ordRefund);
          ordRefund.setOption(options4);
          let chartName = this.$echarts.init(
            document.getElementById("myChart1")
          );
          this.autoHeight = ordArr.length * 35 + 50; // counst.length为柱状图的条数，即数据长度。35为我给每个柱状图的高度，50为柱状图x轴内容的高度(大概的)。
          chartName.getDom().style.height = this.autoHeight + "px";
          chartName.getDom().childNodes[0].style.height =
            this.autoHeight + "px";
          chartName
            .getDom()
            .childNodes[0].childNodes[0].setAttribute(
              "height",
              this.autoHeight
            );
          chartName.getDom().childNodes[0].childNodes[0].style.height =
            this.autoHeight + "px";
          chartName.resize();
          this.listLoading5=false
        } else {
          this.$message.error(res.data.message);
        }
      });
      getRefundSuffixRate(objVat).then(res => {
        if (res.data.code == 200) {
          const ordArr1 = res.data.data;
          var arr = [];
          var ary = [];
          var options5 = {
            title: {
              text: "账号退款率",
              top:"1"
            },
            tooltip: {
              trigger: "item",
              formatter: function(params) {
                var res = params.name + "<br/>";
                var myseries = ordArr1;
                res =
                  params.data.name +
                  "，发货总额($)：" +
                  params.data.value1 +
                  "，退款总额($)：" +
                  params.data.value3+
                  "，退款比例(%)：" +
                  params.data.value2;
                return res;
              }
            },
            toolbox: {
              show: true,
              orient: "vertical",
              top: "center",
              feature: {
                dataView: { readOnly: false },
                restore: {},
                saveAsImage: {}
              }
            },
            legend: {
              type: "scroll",
              orient: "vertical",
              left: "left",
              top: 40,
              data: []
            },
            calculable: true,
            series: [
              {
                type: "funnel",
                width: "85%",
                top: "1",
                left: "14%",
                height: "99%",
                funnelAlign: "left",
                center: ["75%", "25%"], // for pie
                data: []
              }
            ]
          };
          for (let i = 0; i < ordArr1.length; i++) {
            let obj = {
              name: ordArr1[i].suffix,
              value: ordArr1[i].refundCount,
              value1: ordArr1[i].totalCount,
              value2: (ordArr1[i].suffixRate*100).toFixed(2),
              value3: ordArr1[i].refundCount,
            };
            arr.push(obj);
            ary.push(ordArr1[i].suffix);
          }
          options5.series[0].data = arr;
          options5.legend.data = arr;
          let ordRefund = this.$echarts.init(this.$refs.ordNumber);
          ordRefund.setOption(options5);
          let chartName = this.$echarts.init(
            document.getElementById("myChart2")
          );
          this.autoHeight1 = ordArr1.length * 35 + 50; // counst.length为柱状图的条数，即数据长度。35为我给每个柱状图的高度，50为柱状图x轴内容的高度(大概的)。
          chartName.getDom().style.height = this.autoHeight1 + "px";
          chartName.getDom().childNodes[0].style.height =
            this.autoHeight1 + "px";
          chartName
            .getDom()
            .childNodes[0].childNodes[0].setAttribute(
              "height",
              this.autoHeight1
            );
          chartName.getDom().childNodes[0].childNodes[0].style.height =
            this.autoHeight1 + "px";
          chartName.resize();
          this.listLoading6=false
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    getGoods() {
      this.load2=true
      this.goods.dateRange = this.condition.dateRange;
      this.goods.account = this.condition.account;
      this.goods.member = this.condition.member;
      this.goods.dateRangeType = this.condition.dateRangeType;
      this.goods.department = this.condition.department;
      this.goods.secDepartment = this.condition.secDepartment;
      this.goods.plat = this.condition.plat;
      const myform = this.myForm(this.goods);
      getRefund(myform).then(res => {
        this.load2=false
        this.searchTable2 = this.tableData2 = res.data.data.items;
        this.total2 = res.data.data._meta.totalCount;
        this.goods.page = res.data.data._meta.currentPage;
        this.goods.pageSize = res.data.data._meta.perPage;
      });
    },
    getDead() {
      this.load3=true
      this.dead.plat = this.condition.plat;
      this.dead.storename = this.condition.store;
      this.dead.account = this.condition.account;
      this.dead.member = this.condition.member;
      this.dead.dateRange = this.condition.dateRange;
      this.dead.department = this.condition.department;
      this.dead.secDepartment = this.condition.secDepartment;
      const myform = this.myForm(this.dead);
      getDeadFee(myform).then(res => {
        this.load3=false
        this.searchTable3 = this.tableData3 = res.data.data.items;
        this.total3 = res.data.data._meta.totalCount;
        this.dead.page = res.data.data._meta.currentPage;
        this.dead.pageSize = res.data.data._meta.perPage;
        let strNum = 0;
        for (let i = 0; i < this.tableData3.length; i++) {
          strNum = strNum + Number(this.tableData3[i].aveAmount);
        }
        this.totalPrice = res.data.data.extra.totalAveAmount;
        this.currentPrice = strNum;
      });
    },
    getExtra() {
      this.load4=true
      this.extra.plat = this.condition.plat;
      this.extra.storename = this.condition.store;
      this.extra.account = this.condition.account;
      this.extra.member = this.condition.member;
      this.extra.dateRange = this.condition.dateRange;
      this.extra.department = this.condition.department;
      this.extra.secDepartment = this.condition.secDepartment;
      const myform = this.myForm(this.extra);
      getExtraFee(myform).then(res => {
        this.load4=false
        this.searchTable4 = this.tableData4 = res.data.data.items;
        this.total4 = res.data.data._meta.totalCount;
        this.extra.page = res.data.data._meta.currentPage;
        this.extra.pageSize = res.data.data._meta.perPage;
      });
    }
  },
  mounted() {
    // 权限
    getMenu().then(response => {
      const res = response.data.data;
      const menu = res.filter(e => e.name === "毛利润报表");
      for (let i = 0; i < menu.length; i++) {
        for (let j = 0; j < menu[i].children.length; j++) {
          if (menu[i].children[j].tabs.length) {
            this.allMenu = menu[i].children[j].tabs;
          }
        }
      }
    });
    getSection().then(response => {
      const res = response.data.data;
      this.department = res.filter(
        ele => ele.department && ele.type === "业务"
      );
    });
    getSecDepartment().then(reseponse => {
      const res = reseponse.data.data;
      this.secDepartment = this.allSecDep = res;
      for(let i=0;i<this.allSecDep.length;i++){
        if(this.allSecDep[i].type==null){
          this.allSecDep[i].type=''
        }
      }
    });
    getPlatform().then(response => {
      this.plat = response.data.data;
    });
    getMember().then(response => {
      const res = response.data.data;
      this.allMember = this.member = res.filter(ele => ele.position === "销售");
      this.kefu = res.filter(ele => ele.position === "eBay客服");
    });
    getStore().then(response => {
      this.store = response.data.data;
    });
    getAccount().then(response => {
      this.account = response.data.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.el-form {
  margin-bottom: 20px;
  .el-form-item {
    margin-bottom: 0px;
  }
}
</style>

