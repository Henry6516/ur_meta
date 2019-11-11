<template>
  <section>
    <div>
      <!-- <el-tabs
        v-model="activeName"
        type="card"
        style="background-color:#fff"
        @tab-click="handleClick"
      >
        <el-tab-pane v-for="(item, index) in this.allMenu" :label="item" :name="item" :key="index"></el-tab-pane>
      </el-tabs> -->
      <div v-show="show.wish">
        <div class="proBox">
          <div class="proCase01" v-for="(item,index) in nostockdata" :key="index">
            <div class="priImg">
              <img
                :src="'https://contestimg.wish.com/api/webimage/'+item.pid+'-medium.jpg'"
                @click="goLinkUrl(item.pid)"
              />
            </div>
            <span class="corner">{{corner}}</span>
            <a class="justa">{{item.pname}}</a>
            <div class="proText">
              <div class="pro01">
                <p>
                  评论数
                  <span class="pred">{{item.num_rating}}</span>
                </p>
                <p>
                  评分
                  <span class="pred">{{item.rating}}</span>
                </p>
              </div>
              <div class="pro01">
                <p>
                  USD
                  <span class="pblue">{{item.price}}</span>
                </p>
                <p>
                  销售量
                  <span class="pblue">{{item.max_num_bought}}</span>
                </p>
              </div>
              <p style="text-align:left;margin-left:8px;margin-top:5px;">
                上架时间
                <span class="pblue">{{item.gen_time | cutOutMonye}}</span>
              </p>
              <div class="pbottom">
                <a
                  class="goDev"
                  @click="submission('https://contestimg.wish.com/api/webimage/'+item.pid+'-medium.jpg','https://www.wish.com/product/'+item.pid,item.price)"
                >立即开发</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="show.ebay" style="background:#fff;padding-top:10px;">
        <div class="ebayCase">
          <span class="ebayText" @click="tabEbayXp" style="margin-left:12px;">
            <span class="ebayactive" :class="ebayStlye==0?'ebayActive':''"></span>新品商品
          </span>
          <span class="ebayText" @click="tabEbayRx">
            <span class="ebayactive" :class="ebayStlye==1?'ebayActive':''"></span>热销商品
          </span>
          <span class="pospan">{{proTotalXp}}</span>
          <span class="pospan1">{{proTotalRx}}</span>
        </div>
        <div v-show="ebay.xp" class="infoTable">
          <el-table
            :data="ebayDataXp"
            border
            :height="tableHeightstock"
            @sort-change="sortNumber"
            :header-cell-style="getRowClass"
            v-loading="lodingEbayXp"
            style="width:98%;margin-left:0.7%;margin-top:10px;"
          >
            <el-table-column type="index" fixed align="center" width="40" header-align="center"></el-table-column>
            <el-table-column prop="mainImage" fixed label="主图" header-align="center" width="80">
              <template slot-scope="scope">
                <el-tooltip
                  placement="right"
                  :open-delay="10"
                  class="exxHover"
                  popper-class="page-login-toolTipClass"
                >
                  <div slot="content">
                    <img :src="scope.row.mainImage" style="width: 300px;height: 300px;" />
                  </div>
                  <img :src="scope.row.mainImage" style="width: 60px;height: 60px" />
                </el-tooltip>
                <a class="ebayBlocka ebayBlocka1" @click="submissionEbayXp(scope.row._id.oid)">
                  <i class="el-icon-star-off" style="margin-right:3px;"></i>认领
                </a>
                <a class="ebayBlocka ebayBlocka2" @click="refuseEbayXp(scope.row._id.oid)">
                  <i class="el-icon-delete" style="margin-right:3px;"></i>过滤
                </a>
                <!-- <img :src="scope.row.picUrl" style="width: 70px;height: 60px"> -->
              </template>
            </el-table-column>
            <el-table-column
              property="title"
              label="标题 / 类目 / 商品ID /品牌 / 更新时间"
              header-align="center"
              fixed
              width="300"
            >
              <template slot-scope="scope">
                <p style="margin:0">{{scope.row.title}}</p>
                <p
                  style="margin:0;margin-top:8px;color:#e6a23c;font-size:13px;"
                >{{scope.row.cidName}}</p>
                <div style="margin-top:8px;">
                  <span
                    style="margin:0;margin-top:8px;color:#3c8dbc;font-size:13px;"
                  >商品ID:{{scope.row.itemId}}</span>
                  <span
                    style="margin:0;margin-top:8px;color:#3c8dbc;font-size:13px;margin-left:15px;"
                  >品牌:{{scope.row.brand}}</span>
                </div>
                <div style="margin-top:8px;">
                  <span
                    style="margin:0;margin-top:5px;font-size:13px;"
                  >连续三天有销量:{{scope.row.salesThreeDayFlag==0?'否':'是'}}</span>
                  <span
                    style="margin:0;margin-top:5px;font-size:13px;margin-left:15px;"
                  >更新时间:{{scope.row.lastModiTime | cutOutMonye}}</span>
                </div>
                <div style="margin-top:8px;" class="ebayGoa">
                  <span
                    style="margin:0;margin-top:5px;font-size:13px;"
                    @click="goLinkUrlEbay(scope.row.marketplace,scope.row.itemId)"
                  >eBay链接</span>
                  <span
                    style="margin:0;margin-top:5px;font-size:13px;"
                    @click="goLinkUrlEbayHy('https://kj.1688.com/pdt_tongkuan.html?imgUrl=' + scope.row.mainImage)"
                  >货源链接</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              property="price"
              label="价格"
              align="center"
              width="95"
              sortable="custom"
            ></el-table-column>
            <el-table-column
              property="visit"
              label="浏览数"
              align="center"
              width="95"
              sortable="custom"
            ></el-table-column>
            <el-table-column property="sold" label="销量" align="center" width="95" sortable="custom"></el-table-column>
            <el-table-column property="soldChart" label="销量走势图" align="center" width="258">
              <template slot-scope="scope">
                <div class="eDiv" :id="'echarts'+scope.$index"></div>
              </template>
            </el-table-column>
            <el-table-column
              property="listedTime"
              label="上架时间"
              align="center"
              width="110"
              sortable="custom"
            >
              <template slot-scope="scope">{{scope.row.listedTime | cutOutMonye}}</template>
            </el-table-column>
            <el-table-column property="marketplace" label="刊登站点" align="center" width="145">
              <el-table-column
                prop="marketplace"
                :render-header="renderHeaderEbayXp"
                width="145"
                align="center"
              ></el-table-column>
            </el-table-column>
            <el-table-column property="seller" label="卖家名称" align="center" width="110">
              <template slot-scope="scope">             
              <a :href="'https://www.ebay.com/usr/'+scope.row.seller" target="_blank" class="goa">{{scope.row.seller}}</a>
              </template>
            </el-table-column>
            <el-table-column property="itemLocation" label="发货地址" align="center" width="110"></el-table-column>
            <el-table-column property="storeLocation" label="注册地址" align="center" width="100"></el-table-column>
            <el-table-column property="store" label="店铺名称" align="center" width="120"></el-table-column>
          </el-table>
          <div class="block toolbar">
            <el-pagination
              background
              @size-change="handleSizeChangeEbayXp"
              @current-change="handleCurrentChangeEbayXp"
              :current-page="this.condition.page"
              :page-sizes="[20, 30, 40, 50]"
              :page-size="this.condition.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="this.totalEbayXp"
            ></el-pagination>
          </div>
        </div>
        <div v-show="ebay.rx" class="infoTable">
          <el-table
            :data="ebayDataRx"
            border
            @sort-change="sortNumberRx"
            :height="tableHeightstock"
            v-loading="lodingEbayRx"
            :header-cell-style="getRowClass"
            style="width:98%;margin-left:0.7%;margin-top:10px;"
          >
            <el-table-column type="index" fixed align="center" width="40" header-align="center"></el-table-column>
            <el-table-column prop="mainImage" fixed label="主图" header-align="center" width="80">
              <template slot-scope="scope">
                <el-tooltip
                  placement="right"
                  :open-delay="10"
                  class="exxHover"
                  popper-class="page-login-toolTipClass"
                >
                  <div slot="content">
                    <img :src="scope.row.mainImage" style="width: 300px;height: 300px;" />
                  </div>
                  <img :src="scope.row.mainImage" style="width: 60px;height: 60px" />
                </el-tooltip>
                <a class="ebayBlocka ebayBlocka1" @click="submissionEbayRx(scope.row._id.oid)">
                  <i class="el-icon-star-off" style="margin-right:3px;"></i>认领
                </a>
                <a class="ebayBlocka ebayBlocka2" @click="refuseEbayRx(scope.row._id.oid)">
                  <i class="el-icon-delete" style="margin-right:3px;"></i>过滤
                </a>
                <!-- <img :src="scope.row.picUrl" style="width: 70px;height: 60px"> -->
              </template>
            </el-table-column>
            <el-table-column
              property="title"
              label="标题 / 类目 / 商品ID /品牌 / 更新时间"
              header-align="center"
              fixed
              width="300"
            >
              <template slot-scope="scope">
                <p style="margin:0">{{scope.row.title}}</p>
                <p
                  style="margin:0;margin-top:8px;color:#e6a23c;font-size:13px;"
                >{{scope.row.categoryStructure}}</p>
                <div style="margin-top:8px;">
                  <span
                    style="margin:0;margin-top:8px;color:#3c8dbc;font-size:13px;"
                  >商品ID:{{scope.row.itemId}}</span>
                  <span
                    style="margin:0;margin-top:8px;color:#3c8dbc;font-size:13px;margin-left:15px;"
                  >品牌:{{scope.row.brand}}</span>
                </div>
                <div style="margin-top:8px;">
                  <span
                    style="margin:0;margin-top:5px;font-size:13px;"
                  >连续三天有销量:{{scope.row.salesThreeDayFlag==0?'否':'是'}}</span>
                  <span
                    style="margin:0;margin-top:5px;font-size:13px;margin-left:15px;"
                  >更新时间:{{scope.row.lastModiTime | cutOutMonye}}</span>
                </div>
                <div style="margin-top:8px;" class="ebayGoa">
                  <span
                    style="margin:0;margin-top:5px;font-size:13px;"
                    @click="goLinkUrlEbay(scope.row.marketplace,scope.row.itemId)"
                  >eBay链接</span>
                  <span
                    style="margin:0;margin-top:5px;font-size:13px;"
                    @click="goLinkUrlEbayHy('https://kj.1688.com/pdt_tongkuan.html?imgUrl=' + scope.row.mainImage)"
                  >货源链接</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              property="price"
              label="价格"
              align="center"
              width="90"
              sortable="custom"
            ></el-table-column>
            <el-table-column
              property="visit"
              label="浏览数"
              align="center"
              width="90"
              sortable="custom"
            ></el-table-column>
            <el-table-column property="sold" label="销量" align="center" width="90" sortable="custom"></el-table-column>
            <el-table-column property="soldChart" label="销量走势图" align="center" width="258">
              <template slot-scope="scope">
                <div class="eDiv1" :id="'echartsRx'+scope.$index"></div>
              </template>
            </el-table-column>
            <el-table-column
              property="listedTime"
              label="上架时间"
              align="center"
              width="95"
              sortable="custom"
            >
              <template slot-scope="scope">{{scope.row.genTime | cutOutMonye}}</template>
            </el-table-column>
            <el-table-column property="marketplace" label="刊登站点" align="center" width="145">
              <el-table-column
                prop="marketplace"
                :render-header="renderHeaderEbayRx"
                width="145"
                align="center"
              ></el-table-column>
            </el-table-column>
            <el-table-column label="前三天销售" align="center">
              <el-table-column
                property="salesThreeDay1"
                label="件数"
                align="center"
                width="85"
                sortable="custom"
              ></el-table-column>
              <el-table-column
                property="paymentThreeDay1"
                label="金额"
                align="center"
                width="85"
                sortable="custom"
              ></el-table-column>
              <el-table-column
                property="salesThreeDayGrowth"
                label="增幅(%)"
                align="center"
                sortable="custom"
                width="85"
              ></el-table-column>
            </el-table-column>
            <el-table-column label="前七天销售" align="center">
              <el-table-column
                property="salesWeek1"
                label="件数"
                align="center"
                width="85"
                sortable="custom"
              ></el-table-column>
              <el-table-column
                property="paymentWeek1"
                label="金额"
                align="center"
                width="85"
                sortable="custom"
              ></el-table-column>
              <el-table-column
                property="salesWeekGrowth"
                label="增幅(%)"
                align="center"
                width="85"
                sortable="custom"
              ></el-table-column>
            </el-table-column>
            <el-table-column property="seller" label="卖家名称" align="center" width="100">
              <template slot-scope="scope">             
              <a :href="'https://www.ebay.com/usr/'+scope.row.seller" target="_blank" class="goa">{{scope.row.seller}}</a>
              </template>
            </el-table-column>
            <el-table-column property="itemLocation" label="发货地址" align="center" width="100"></el-table-column>
            <el-table-column property="storeLocation" label="注册地址" align="center" width="100"></el-table-column>
          </el-table>
          <div class="block toolbar">
            <el-pagination
              background
              @size-change="handleSizeChangeEbayRx"
              @current-change="handleCurrentChangeEbayRx"
              :current-page="this.condition1.page"
              :page-sizes="[20, 30, 40, 50]"
              :page-size="this.condition1.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="this.totalEbayRx"
            ></el-pagination>
          </div>
        </div>
      </div>
      <div v-show="show.joom">
        <div class="proBox">
          <div class="proCase01" v-for="(item,index) in dataJoom" :key="index">
            <div class="priImg">
              <img :src="item.mainImage" @click="goLinkUrlJoom(item.productId)" />
            </div>
            <span class="corner">{{corner}}</span>
            <a class="justa">{{item.productName}}</a>
            <div class="proText">
              <div class="pro01">
                <p>
                  评论数
                  <span class="pred">{{item.reviewsCount}}</span>
                </p>
                <p>
                  评分
                  <span class="pred">{{item.rating}}</span>
                </p>
              </div>
              <div class="pro01">
                <p>
                  USD
                  <span class="pblue">{{item.price}}</span>
                </p>
                <p>
                  推荐指数
                  <span class="pblue">{{item.hot_index}}</span>
                </p>
              </div>
              <p style="text-align:left;margin-left:8px;margin-top:5px;">
                上架时间
                <span class="pblue">{{item.publishedDate | cutOutMonye}}</span>
              </p>
              <div class="pbottom">
                <a
                  class="goDev"
                  @click="submission(item.mainImage,'https://www.joom.com/en/products/'+item.productId,item.price)"
                >立即开发</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-dialog title :visible.sync="dialogEbayXpRefuse">
        <el-row>
          <el-col :span="24">
            <el-col :span="4" class="basp"><span style="color:red">*</span>过滤原因</el-col>
            <el-col :span="18">
              <el-select
                v-model="ebayXpText"
                placeholder="请选择"
                style="width:100%"
                @change="selectEbayXp($event)"
              >
                <el-option v-for="item in reason" :key="item" :label="item" :value="item"></el-option>
              </el-select>
              <el-input
                type="textarea"
                v-show="ebayXpRefuse"
                :rows="4"
                placeholder="其他"
                style="margin-top:10px;"
                v-model="ebayXpText1"
              ></el-input>
            </el-col>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogEbayXpRefuse = false">取 消</el-button>
          <el-button type="primary" @click="addEbayXpRefuse">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title :visible.sync="dialogEbayRxRefuse">
        <el-row>
          <el-col :span="24">
            <el-col :span="4" class="basp"><span style="color:red">*</span>过滤原因</el-col>
            <el-col :span="18">
              <el-select
                v-model="ebayRxText"
                placeholder="请选择"
                style="width:100%"
                @change="selectEbayRx($event)"
              >
                <el-option v-for="item in reason" :key="item" :label="item" :value="item"></el-option>
              </el-select>
              <el-input
                type="textarea"
                v-show="ebayRxRefuse"
                :rows="4"
                placeholder="其他"
                style="margin-top:10px;"
                v-model="ebayRxText1"
              ></el-input>
            </el-col>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogEbayRxRefuse = false">取 消</el-button>
          <el-button type="primary" @click="addEbayRxRefuse">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </section>
</template>
<script type="text/ecmascript-6">
import {
  APRecommendWish,
  APRecommendEbay,
  APRecommendJoom,
  forwardCreateEngine,
  ebayXpAccept,
  ebayRxAccept,
  ebayXpRefuse,
  ebayRxRefuse
} from "../../api/product";
import { getEbayXpMind, getEbayRxMind } from "../../api/profit";
import { compareUp, compareDown, getMonthDate } from "../../api/tools";
export default {
  data() {
    return {
      tableHeightstock: window.innerHeight - 209,
      totalEbayXp: null,
      totalEbayRx: null,
      ebayXpRefuse: false,
      ebayRxRefuse: false,
      lodingEbayRx:false,
      lodingEbayXp:false,
      proTotalXp:0,
      proTotalRx:0,
      options: {
        xAxis: {
          type: "category",
          show: false,
          boundaryGap: false,
          data: []
        },
        tooltip: {
          trigger: "axis"
        },
        yAxis: {
          type: "value",
          minInterval: 20
        },
        series: [
          {
            data: [],
            type: "line"
          }
        ]
      },
      options1: {
        grid: {
          left: "17%"
        },
        xAxis: {
          type: "category",
          show: false,
          boundaryGap: false,
          data: []
        },
        tooltip: {
          trigger: "axis"
        },
        yAxis: {
          type: "value",
          minInterval: 100
        },
        series: [
          {
            data: [],
            type: "line"
          }
        ]
      },
      reason: [
        "1：产品重复",
        "2：产品侵权",
        "3：产品不好运输",
        "4：销量不好",
        "5：找不到货源",
        "6：价格没有优势",
        "7：产品评价低",
        "其他(可以手动输入文字)"
      ],
      ebayOptions: [
        "EBAY_CH",
        "EBAY_HK",
        "EBAY_US",
        "EBAY_GB",
        "EBAY_FR",
        "EBAY_DE",
        "EBAY_IT",
        "EBAY_AU"
      ],
      ebayDataXp: [],
      ebayDataXp1: [],
      ebayDataRx: [],
      ebayDataRx1: [],
      show: {
        wish: false,
        ebay: true,
        joom: false
      },
      ebay: {
        xp: true,
        rx: false
      },
      condition: {
        marketplace: "",
        page: 1,
        pageSize: 20,
        sort: ""
      },
      condition1: {
        marketplace: "",
        page: 1,
        pageSize: 20,
        sort: ""
      },
      ebayStlye: 0,
      allMenu: ["Ebay", "Wish", "Joom", "Amazon", "Aliexpress"],
      listLoading: false,
      corner: "Ebay",
      activeName: "Ebay",
      developer: [],
      purchaser: [],
      goodsState: [],
      nostockdata: [],
      dataEbay: [],
      dataJoom: [],
      ebayXpZd: null,
      ebayRxZd: null,
      dialogEbayXpRefuse: false,
      dialogEbayRxRefuse: false,
      ebayXpId: null,
      ebayXpText: null,
      ebayXpText1: null,
      ebayRxId: null,
      ebayRxText: null,
      ebayRxText1: null
    };
  },
  filters: {
    cutOutMonye: function(value) {
      if (!value) return "";
      value = value.substring(0, 11);
      return value;
    }
  },
  methods: {
    selectEbayXp(e) {
      if (e == "其他(可以手动输入文字)") {
        this.ebayXpRefuse = true;
      } else {
        this.ebayXpRefuse = false;
      }
    },
    selectEbayRx(e) {
      if (e == "其他(可以手动输入文字)") {
        this.ebayRxRefuse = true;
      } else {
        this.ebayRxRefuse = false;
      }
    },
    addEbayXpRefuse() {
      if (this.ebayXpText || this.ebayXpText1) {
        if (this.ebayXpText && this.ebayXpText1) {
          var condition = {
            id: this.ebayXpId,
            reason: '8：其他:'+this.ebayXpText1
          };
        } else {
          var condition = {
            id: this.ebayXpId,
            reason: this.ebayXpText
          };
        }
        ebayXpRefuse(condition).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: "过滤成功",
              type: "success"
            });
            this.proTotalXp=this.proTotalXp-1
            this.ebayXp();
          } else {
            this.$message.error(res.data.message);
          }
          this.ebayXpRefuse = false;
          this.dialogEbayXpRefuse = false;
        });
      } else {
        this.$message.error("请选择过滤理由");
      }
    },
    addEbayRxRefuse() {
      if (this.ebayRxText || this.ebayRxText1) {
        if (this.ebayRxText && this.ebayRxText1) {
          var condition = {
            id: this.ebayRxId,
            reason: this.ebayRxText1
          };
        } else {
          var condition = {
            id: this.ebayRxId,
            reason: this.ebayRxText
          };
        }
        ebayRxRefuse(condition).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: "过滤成功",
              type: "success"
            });
            this.proTotalRx=this.proTotalRx-1
            this.ebayRx();
          } else {
            this.$message.error(res.data.message);
          }
          this.ebayRxRefuse = false;
          this.dialogEbayRxRefuse = false;
        });
      } else {
        this.$message.error("请选择过滤理由");
      }
    },
    refuseEbayXp(id) {
      this.ebayXpId = id;
      this.ebayXpText = null;
      this.ebayXpText1 = null;
      this.ebayXpRefuse=false
      this.dialogEbayXpRefuse = true;
    },
    refuseEbayRx(id) {
      this.ebayRxId = id;
      this.ebayRxText = null;
      this.ebayRxText1 = null;
      this.ebayRxRefuse=false
      this.dialogEbayRxRefuse = true;
    },
    getEbayXpData() {
      let ebayShowDrr = this.ebayDataXp1;
      let ebXpData = [];
      if (this.ebayXpZd) {
        for (let i = 0; i < ebayShowDrr.length; i++) {
          if (ebayShowDrr[i].marketplace == this.ebayXpZd) {
            ebXpData.push(ebayShowDrr[i]);
          }
        }
        this.ebayDataXp = ebXpData;
        for (let i = 0; i < this.ebayDataXp.length; i++) {
          setTimeout(() => {
            var obj = this.ebayDataXp[i].soldChart.soldData;
            for (var k = 0; k < obj.length; k++) {
              if (obj[k] == null) {
                obj[k] = 0;
              }
            }
            this.options.xAxis.data = this.ebayDataXp[i].soldChart.soldDate;
            this.options.series[0].data = this.ebayDataXp[i].soldChart.soldData;
            let or2 = this.$echarts.init(
              document.getElementById("echarts" + i)
            );
            or2.setOption(this.options);
          }, 20);
        }
      } else {
        this.ebayDataXp = this.ebayDataXp1;
        for (let i = 0; i < this.ebayDataXp.length; i++) {
          setTimeout(() => {
            var obj = this.ebayDataXp[i].soldChart.soldData;
            for (var k = 0; k < obj.length; k++) {
              if (obj[k] == null) {
                obj[k] = 0;
              }
            }
            this.options.xAxis.data = this.ebayDataXp[i].soldChart.soldDate;
            this.options.series[0].data = this.ebayDataXp[i].soldChart.soldData;
            let or2 = this.$echarts.init(
              document.getElementById("echarts" + i)
            );
            or2.setOption(this.options);
          }, 20);
        }
      }
    },
    getEbayRxData() {
      let ebayShowDrr = this.ebayDataRx1;
      let ebXpData = [];
      if (this.ebayRxZd) {
        for (let i = 0; i < ebayShowDrr.length; i++) {
          if (ebayShowDrr[i].marketplace == this.ebayRxZd) {
            ebXpData.push(ebayShowDrr[i]);
          }
        }
        this.ebayDataRx = ebXpData;
        for (let i = 0; i < this.ebayDataRx.length; i++) {
          setTimeout(() => {
            var obj = this.ebayDataRx[i].soldChart.soldData;
            for (var k = 0; k < obj.length; k++) {
              if (obj[k] == null) {
                obj[k] = 0;
              }
            }
            this.options1.xAxis.data = this.ebayDataRx[i].soldChart.soldDate;
            this.options1.series[0].data = this.ebayDataRx[
              i
            ].soldChart.soldData;
            let or2 = this.$echarts.init(
              document.getElementById("echartsRx" + i)
            );
            or2.setOption(this.options1);
          }, 20);
        }
      } else {
        this.ebayDataRx = this.ebayDataRx1;
        for (let i = 0; i < this.ebayDataRx.length; i++) {
          setTimeout(() => {
            var obj = this.ebayDataRx[i].soldChart.soldData;
            for (var k = 0; k < obj.length; k++) {
              if (obj[k] == null) {
                obj[k] = 0;
              }
            }
            this.options1.xAxis.data = this.ebayDataRx[i].soldChart.soldDate;
            this.options1.series[0].data = this.ebayDataRx[
              i
            ].soldChart.soldData;
            let or2 = this.$echarts.init(
              document.getElementById("echartsRx" + i)
            );
            or2.setOption(this.options1);
          }, 20);
        }
      }
    },
    renderHeaderEbayXp(h, { column, $index }) {
      if ($index === 0) {
        let filters =this.ebayOptions
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.condition.marketplace,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.condition.marketplace = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.ebayXp();
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item,
                  label: item
                }
              });
            })
          ]
        );
      }
    },
    renderHeaderEbayRx(h, { column, $index }) {
      if ($index === 0) {
        let filters =this.ebayOptions
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.condition1.marketplace,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.condition1.marketplace = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.ebayRx();
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item,
                  label: item
                }
              });
            })
          ]
        );
      }
    },
    sortNumber(column, prop, order) {
      if (column.order == null) {
        this.condition.sort = null;
        this.ebayXp(this.condition);
      }
      if (column.order == "ascending") {       
        this.condition.sort = "-" + column.prop;
        this.ebayXp(this.condition);
      }
      if (column.order == "descending") {
        this.condition.sort = column.prop;
        this.ebayXp(this.condition);
      }
    },
    sortNumberRx(column, prop, order) {
      if (column.order == null) {
        this.condition1.sort = null;
        this.ebayRx(this.condition1);
      }
      if (column.order == "ascending") {
        this.condition1.sort = "-" + column.prop;
        this.ebayRx(this.condition1);
      }
      if (column.order == "descending") {
        this.condition1.sort = column.prop;
        this.ebayRx(this.condition1);
      }
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex <= 1) {
        return "color:#337ab7;background:#f5f7fa";
      } else {
        return "";
      }
    },
    tabEbayXp() {
      this.ebayStlye = 0;
      this.ebay.xp = true;
      this.ebay.rx = false;
    },
    tabEbayRx() {
      this.ebayStlye = 1;
      this.ebay.xp = false;
      this.ebay.rx = true;
    },
    goLinkUrlEbayHy(url) {
      window.open(url);
    },
    goLinkUrl(id) {
      window.open("https://www.wish.com/product/" + id);
    },
    goLinkUrlJoom(id) {
      window.open("https://www.joom.com/en/products/" + id);
    },
    goLinkUrlEbay(id,url) {
     if(id=='EBAY_GB'){
        window.open('https://www.ebay.co.uk/itm/'+url);
      }else if(id=='EBAY_DE'){
        window.open('https://www.ebay.de/itm/'+url);
      }else if(id=='EBAY_AU'){
        window.open('https://www.ebay.com.au/itm/'+url);
      }else{
        window.open('https://www.ebay.com/itm/'+url);
      }
    },
    handleCurrentChangeEbayXp(val) {
      this.condition.page = val;
      this.ebayXp(this.condition);
    },
    handleSizeChangeEbayXp(val) {
      this.condition.pageSize = val;
      this.ebayXp(this.condition);
    },
    handleCurrentChangeEbayRx(val) {
      this.condition1.page = val;
      this.ebayRx(this.condition);
    },
    handleSizeChangeEbayRx(val) {
      this.condition1.pageSize = val;
      this.ebayRx(this.condition);
    },
    ebayXp() {
      this.lodingEbayXp=true
      getEbayXpMind(this.condition).then(res => {
        this.ebayDataXp1 = this.ebayDataXp = res.data.data.items;
        this.totalEbayXp = res.data.data._meta.totalCount;
        this.condition.page = res.data.data._meta.currentPage;
        this.condition.pageSize = res.data.data._meta.perPage;
        if(this.proTotalXp==0){
          this.proTotalXp=res.data.data._meta.totalCount;
        }
        for (let i = 0; i < this.ebayDataXp.length; i++) {
          setTimeout(() => {
            var obj = this.ebayDataXp[i].soldChart.soldData;
            for (var k = 0; k < obj.length; k++) {
              if (obj[k] == null) {
                obj[k] = 0;
              }
            }
            this.options.xAxis.data = this.ebayDataXp[i].soldChart.soldDate;
            this.options.series[0].data = this.ebayDataXp[i].soldChart.soldData;
            let or2 = this.$echarts.init(
              document.getElementById("echarts" + i)
            );
            or2.setOption(this.options);
          }, 20);
        }
        this.lodingEbayXp=false
      });
    },
    ebayRx() {
      this.lodingEbayRx=true
      getEbayRxMind(this.condition1).then(res => {
        this.ebayDataRx = this.ebayDataRx1 = res.data.data.items;
        this.totalEbayRx = res.data.data._meta.totalCount;
        this.condition1.page = res.data.data._meta.currentPage;
        this.condition1.pageSize = res.data.data._meta.perPage;
        if(this.proTotalRx==0){
          this.proTotalRx=res.data.data._meta.totalCount;
        }
        for (let i = 0; i < this.ebayDataRx.length; i++) {
          setTimeout(() => {
            var obj = this.ebayDataRx[i].soldChart.soldData;
            for (var k = 0; k < obj.length; k++) {
              if (obj[k] == null) {
                obj[k] = 0;
              }
            }
            this.options1.xAxis.data = this.ebayDataRx[i].soldChart.soldDate;
            this.options1.series[0].data = this.ebayDataRx[
              i
            ].soldChart.soldData;
            let or2 = this.$echarts.init(
              document.getElementById("echartsRx" + i)
            );
            or2.setOption(this.options1);
          }, 20);
        }
        this.lodingEbayRx=false
      });
    },
    handleClick(tab, event) {
      if (tab.name === "Wish") {
        this.corner = "Wish";
        if (this.nostockdata.length == 0) {
          this.getDataWish();
        }
        this.show.wish = true;
      } else {
        this.show.wish = false;
      }
      if (tab.name === "Ebay") {
        this.corner = "Ebay";
        if (this.ebayDataXp.length == 0) {
          this.ebayXp();
          this.ebayRx();
        }
        this.show.ebay = true;
      } else {
        this.show.ebay = false;
      }
      if (tab.name === "Joom") {
        this.corner = "Joom";
        if (this.dataJoom.length == 0) {
          this.getDataJoom();
        }
        this.show.joom = true;
      } else {
        this.show.joom = false;
      }
      if (tab.name === "Amazon") {
        this.corner = "Amazon";
      }
      if (tab.name === "Aliexpress") {
        this.corner = "Aliexpress";
      }
    },
    formatter(row, column) {
      return row.changeTime ? row.changeTime.substring(0, 16) : "";
    },
    submissionEbayXp(id) {
      let condition = {
        id: id
      };
      ebayXpAccept(condition).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: "开发成功",
            type: "success"
          });
          this.proTotalXp=this.proTotalXp-1
          this.ebayXp();
        } else {
          this.$message.error(res.data.message);
          this.ebayXp();
        }
      });
    },
    submissionEbayRx(id) {
      let condition = {
        id: id
      };
      ebayRxAccept(condition).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: "开发成功",
            type: "success"
          });
          this.proTotalRx=this.proTotalRx-1
          this.ebayRx();
        } else {
          this.$message.error(res.data.message);
          this.ebayRx();
        }
      });
    },
    getDataEbay() {
      this.listLoading = true;
      APRecommendEbay().then(res => {
        this.dataEbay = res.data.data;
        this.listLoading = false;
      });
    },
    getDataJoom() {
      this.listLoading = true;
      APRecommendJoom().then(res => {
        this.dataJoom = res.data.data;
        this.listLoading = false;
      });
    },
    getDataWish() {
      this.listLoading = true;
      APRecommendWish().then(res => {
        this.nostockdata = res.data.data;
        this.listLoading = false;
      });
    }
  },
  mounted() {
    this.ebayXp()
    this.ebayRx()
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
  width: 12.26%;
  float: left;
  margin: 0 0.7%;
  margin-top: 15px;
  overflow: hidden;
  border: 5px solid #f0f0f0;
  background: rgb(243, 243, 243);
  position: relative;
}
.priImg {
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
}
.priImg img {
  display: block;
  width: 100%;
  height: 180px;
  cursor: pointer;
  transition: transform 0.3s;
}
.proText {
  width: 100%;
  overflow: hidden;
  background: #fff;
  border-top: #eee solid 1px;
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
  overflow: hidden;
}
.goDev {
  width: 95%;
  background: #3c8dbc;
  display: block;
  text-align: center;
  color: #fff;
  float: left;
  margin: auto;
  line-height: 28px;
  font-size: 13px;
  margin-left: 2.5%;
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
.proCase01:hover {
  border: 5px solid #2298a2;
}
.proCase01:hover .priImg img {
  transform: scale(1.1);
}
@media (max-width: 1400px) {
  .floet01 {
    float: left;
    margin-right: 10px;
  }
  .justa {
    display: block;
    font-size: 10px;
    background: #fff;
    padding: 10px 5px;
    max-height: 50px;
    overflow: hidden;
  }
  .floet01 span {
    width: 70px;
    text-align: center;
    display: inline-block;
  }
  .winput {
    width: 100px;
  }
  .proCase01 {
    width: 17.7%;
    overflow: hidden;
    cursor: pointer;
  }
  .proText p:first-child {
    float: left;
    font-size: 14px;
  }
  .proText p:last-child {
    float: right;
    font-size: 14px;
  }
  .goDev {
    font-size: 14px;
  }
  .goStore {
    font-size: 14px;
  }
}
.justa {
  display: block;
  font-size: 12px;
  text-align: justify;
  line-height: 20px;
  background: #fff;
  padding: 10px 5px;
  height: 50px;
  overflow: hidden;
}
.corner {
  display: block;
  background: #3c8dbc;
  color: #fff;
  text-align: center;
  position: absolute;
  top: 15px;
  right: -50px;
  width: 75%;
  line-height: 25px;
  transform: rotate(40deg);
}
.ebayCase {
  width: 98%;
  margin-left: 0.7%;
  border: 1px solid #e2e2e2;
  background: #f8f8f8;
  padding: 8px 0;
  overflow: hidden;
  border-radius: 6px;
  position: relative;
}
.ebayText {
  font-size: 14px;
  padding: 0 18px;
  display: block;
  float: left;
  cursor: pointer;
  border: #eee solid 1px;
  background: #fff;
  line-height: 35px;
  margin-left: 20px;
  border-radius: 5px;
}
.ebayactive {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: block;
  background: #fff;
  float: left;
  border: 1px solid #ccc;
  margin-top: 10px;
  margin-right: 10px;
}
.ebayActive {
  background: #fff;
  width: 4px;
  height: 4px;
  border: #409eff solid 5px;
}
.basp {
  text-align: center;
}
.eDiv {
  width: 100%;
  height: 200px;
}
.eDiv1 {
  width: 245px;
  height: 200px;
}
.ebayBlocka {
  display: block;
  text-align: center;
  margin-top: 10px;
  font-size: 13px;
  cursor: pointer;
}
.ebayBlocka1 {
  color: #337ab7;
}
.ebayBlocka2 {
  color: #f56c6c;
}
.ebayGoa {
  width: 100%;
  overflow: hidden;
}
.ebayGoa span {
  display: block;
  text-align: center;
  font-size: 13px;
  line-height: 28px;
  cursor: pointer;
}
.ebayGoa span:first-child {
  width: 40%;
  float: left;
  background: #409eff;
  color: #fff;
}
.ebayGoa span:last-child {
  width: 40%;
  float: right;
  background: #f56c6c;
  color: #fff;
}
.goa{
  text-decoration: none;
  color: #409EFF;
}
.pospan{
  display: block;
  position: absolute;
  background: red;
  color: #fff;
  padding: 1px 5px;
  border-radius: 20px;
  font-size: 10px;
  left: 108px;
  top: 3px;
}
.pospan1{
  display: block;
  position: absolute;
  background: red;
  color: #fff;
  padding: 1px 5px;
  border-radius: 20px;
  font-size: 10px;
  left: 247px;
  top: 3px;
}
</style>
