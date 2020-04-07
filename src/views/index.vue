<template>
  <div>
    <div class="dashboard-editor-container newIndex" :style="{ height: tableHeightNewTop + 'px' }">
      <section>
        <div class="left-box" :style="{ width: leftWidth + '%'}">
          <el-card>
            <div style="padding-top:20px;padding-left:12px;padding-bottom:5px;">
              <!-- <el-radio-group v-model="activeTitle">
              <el-radio-button :label="item.name" v-for="(item, index) in titleMenu" :key="index"></el-radio-button>
              </el-radio-group>-->
              <div class="index_content">
                <p
                  :class="indexTabactive==index?'index_p index_active':''"
                  v-for="(item, index) in titleMenu"
                  :key="index"
                  @click="handleTitle(item.name,index)"
                >
                  <i
                    :class="index==0?'el-icon-rank':index==1?'el-icon-tickets':index==2?'el-icon-document':index==3?'el-icon-date':'el-icon-tickets'"
                  ></i>
                  {{item.name}}
                </p>
                <span style="float:right;margin-right:15px;margin-top:10px;cursor:pointer;" @click="indexShrink()">
                  <img src="../assets/shrink.png" style="width: 25px;height: 25px;" />
                </span>
              </div>
            </div>
            <div class="tabs-container tabsPm tab-index-pan tabdColor" v-show="showTitle.ckIntegral" v-loading="loding">
              <warehouseIntegration :titleMenuCk="titleMenuCk"></warehouseIntegration>
            </div>
            <div class="tabs-container tab-index-pan tabsPm" v-show="showTitle.pming" v-loading="loding">
              <salesRanking></salesRanking>
            </div>
            <div class="tabs-container tab-index-pan" v-show="showTitle.zz">
              <el-tabs
                v-model="activeTabzz"
                style="width:100%;padding-left:14px;"
                @tab-click="handclickzz"
              >
                <el-tab-pane
                  v-for="(item, index) in titleMenuzz"
                  :label="item.name"
                  :name="item.name"
                  :key="index"
                ></el-tab-pane>
              </el-tabs>
              <div v-show="tabzz.ebay">
                <el-table
                  :data="zzEbay"
                  size="small"
                  height="798"
                  ref="table1"
                  v-scrollBar:slim
                  @sort-change="sortNumberZZ"
                >
                  <el-table-column type="index" align="center"></el-table-column>
                  <el-table-column prop="username" align="center" label="姓名" sortable></el-table-column>
                  <el-table-column prop="plat" align="center" label="平台" sortable></el-table-column>
                  <el-table-column prop="target" align="center" label="目标" sortable="custom"></el-table-column>
                  <el-table-column prop="amt" align="center" label="毛利" sortable="custom"></el-table-column>
                  <el-table-column prop="rate" align="center" label="目标进度" sortable="custom">
                    <template slot-scope="scope">
                      <el-progress
                        :text-inside="true"
                        :stroke-width="18"
                        :status="checkStatus(scope.row,'rate')"
                        :percentage="Math.round(scope.row.rate*10000)/100"
                      ></el-progress>
                    </template>
                  </el-table-column>
                  <el-table-column prop="dateRate" align="center" label="时间进度">
                    <template slot-scope="scope">
                      <el-progress
                        :text-inside="true"
                        :stroke-width="18"
                        status="exception"
                        :percentage="Math.round(scope.row.dateRate*10000)/100"
                      ></el-progress>
                    </template>
                  </el-table-column>
                  <el-table-column prop="updateTime" align="center" label="统计截止日期">
                    <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span>{{dateFormatter(scope.row.updateTime)}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div v-show="tabzz.joom">
                <el-table
                  :data="zzJoom"
                  size="small"
                  height="798"
                  ref="table1"
                  v-scrollBar:slim
                  @sort-change="sortNumberjoom"
                >
                  <el-table-column type="index" align="center"></el-table-column>
                  <el-table-column prop="username" align="center" label="姓名" sortable></el-table-column>
                  <el-table-column prop="plat" align="center" label="平台" sortable></el-table-column>
                  <el-table-column prop="target" align="center" label="目标" sortable="custom"></el-table-column>
                  <el-table-column prop="amt" align="center" label="毛利" sortable="custom"></el-table-column>
                  <el-table-column prop="rate" align="center" label="目标进度" sortable="custom">
                    <template slot-scope="scope">
                      <el-progress
                        :text-inside="true"
                        :stroke-width="18"
                        :status="checkStatus(scope.row,'rate')"
                        :percentage="Math.round(scope.row.rate*10000)/100"
                      ></el-progress>
                    </template>
                  </el-table-column>
                  <el-table-column prop="dateRate" align="center" label="时间进度">
                    <template slot-scope="scope">
                      <el-progress
                        :text-inside="true"
                        :stroke-width="18"
                        status="exception"
                        :percentage="Math.round(scope.row.dateRate*10000)/100"
                      ></el-progress>
                    </template>
                  </el-table-column>
                  <el-table-column prop="updateTime" align="center" label="统计截止日期">
                    <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span>{{dateFormatter(scope.row.updateTime)}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <!-- <div class="tabs-container tab-index-pan" v-show="showTitle.baokuan">
              <el-tabs
                v-model="activeTabNamebk"
                style="width:100%;padding-left:14px;"
                @tab-click="handclickbk"
              >
                <el-tab-pane
                  v-for="(item, index) in titleMenuTab"
                  :label="item"
                  :name="item"
                  :key="index"
                ></el-tab-pane>
              </el-tabs>
              <div v-show="indexbk.yw">
                <el-table :data="proTable" size="small" @sort-change="sortNumber" height="800">
                  <el-table-column type="index" align="center"></el-table-column>
                  <el-table-column prop="platform" label="平台" sortable align="center"></el-table-column>
                  <el-table-column prop="developer" label="开发员" sortable align="center"></el-table-column>
                  <el-table-column prop="goodsCode" label="商品编码" sortable align="center">
                    <template slot-scope="scope">
                      <a :href="scope.row.linkUrl" target="_blank">{{scope.row.goodsCode}}</a>
                    </template>
                  </el-table-column>
                  <el-table-column prop="goodsName" label="商品名称" sortable align="center"></el-table-column>
                  <el-table-column prop="subCate" label="主类目" sortable align="center"></el-table-column>
                  <el-table-column prop="cate" label="子类目" sortable align="center"></el-table-column>
                  <el-table-column prop="img" label="图片" align="center">
                    <template slot-scope="scope">
                      <img :src="scope.row.img" style="width: 120px;height: 120px;" />
                    </template>
                  </el-table-column>
                  <el-table-column prop="salesNum" label="月销量" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="profit" label="月毛利" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="endTime" label="统计截止日期" sortable align="center">
                    <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span>{{dateFormatter(scope.row.endTime)}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div v-show="indexbk.hw">
                <el-table :data="proTable" size="small" @sort-change="sortNumber" height="800">
                  <el-table-column type="index" align="center"></el-table-column>
                  <el-table-column prop="platform" label="平台" sortable align="center"></el-table-column>
                  <el-table-column prop="developer" label="开发员" sortable align="center"></el-table-column>
                  <el-table-column prop="goodsCode" label="商品编码" sortable align="center">
                    <template slot-scope="scope">
                      <a :href="scope.row.linkUrl" target="_blank">{{scope.row.goodsCode}}</a>
                    </template>
                  </el-table-column>
                  <el-table-column prop="goodsName" label="商品名称" sortable align="center"></el-table-column>
                  <el-table-column prop="subCate" label="主类目" sortable align="center"></el-table-column>
                  <el-table-column prop="cate" label="子类目" sortable align="center"></el-table-column>
                  <el-table-column prop="img" label="图片" sortable align="center">
                    <template slot-scope="scope">
                      <img :src="scope.row.img" style="width: 120px;height: 120px;" />
                    </template>
                  </el-table-column>
                  <el-table-column prop="salesNum" label="月销量" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="profit" label="月毛利" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="endTime" label="统计截止日期" sortable align="center">
                    <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span>{{dateFormatter(scope.row.endTime)}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div v-show="indexbk.wish">
                <el-table :data="proTable" size="small" @sort-change="sortNumber" height="800">
                  <el-table-column type="index" align="center"></el-table-column>
                  <el-table-column prop="platform" label="平台" sortable align="center"></el-table-column>
                  <el-table-column prop="developer" label="开发员" sortable align="center"></el-table-column>
                  <el-table-column prop="goodsCode" label="商品编码" sortable align="center">
                    <template slot-scope="scope">
                      <a :href="scope.row.linkUrl" target="_blank">{{scope.row.goodsCode}}</a>
                    </template>
                  </el-table-column>
                  <el-table-column prop="goodsName" label="商品名称" sortable align="center"></el-table-column>
                  <el-table-column prop="subCate" label="主类目" sortable align="center"></el-table-column>
                  <el-table-column prop="cate" label="子类目" sortable align="center"></el-table-column>
                  <el-table-column prop="img" label="图片" sortable align="center">
                    <template slot-scope="scope">
                      <img :src="scope.row.img" style="width: 120px;height: 120px;" />
                    </template>
                  </el-table-column>
                  <el-table-column prop="salesNum" label="月销量" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="profit" label="月毛利" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="endTime" label="统计截止日期" sortable align="center">
                    <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span>{{dateFormatter(scope.row.endTime)}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div v-show="indexbk.smt">
                <el-table :data="proTable" size="small" @sort-change="sortNumber" height="800">
                  <el-table-column type="index" align="center"></el-table-column>
                  <el-table-column prop="platform" label="平台" sortable align="center"></el-table-column>
                  <el-table-column prop="developer" label="开发员" sortable align="center"></el-table-column>
                  <el-table-column prop="goodsCode" label="商品编码" sortable align="center">
                    <template slot-scope="scope">
                      <a :href="scope.row.linkUrl" target="_blank">{{scope.row.goodsCode}}</a>
                    </template>
                  </el-table-column>
                  <el-table-column prop="goodsName" label="商品名称" sortable align="center"></el-table-column>
                  <el-table-column prop="subCate" label="主类目" sortable align="center"></el-table-column>
                  <el-table-column prop="cate" label="子类目" sortable align="center"></el-table-column>
                  <el-table-column prop="img" label="图片" sortable align="center">
                    <template slot-scope="scope">
                      <img :src="scope.row.img" style="width: 120px;height: 120px;" />
                    </template>
                  </el-table-column>
                  <el-table-column prop="salesNum" label="月销量" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="profit" label="月毛利" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="endTime" label="统计截止日期" sortable align="center">
                    <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span>{{dateFormatter(scope.row.endTime)}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div v-show="indexbk.ama">
                <el-table :data="proTable" size="small" @sort-change="sortNumber" height="800">
                  <el-table-column type="index" align="center"></el-table-column>
                  <el-table-column prop="platform" label="平台" sortable align="center"></el-table-column>
                  <el-table-column prop="developer" label="开发员" sortable align="center"></el-table-column>
                  <el-table-column prop="goodsCode" label="商品编码" sortable align="center">
                    <template slot-scope="scope">
                      <a :href="scope.row.linkUrl" target="_blank">{{scope.row.goodsCode}}</a>
                    </template>
                  </el-table-column>
                  <el-table-column prop="goodsName" label="商品名称" sortable align="center"></el-table-column>
                  <el-table-column prop="subCate" label="主类目" sortable align="center"></el-table-column>
                  <el-table-column prop="cate" label="子类目" sortable align="center"></el-table-column>
                  <el-table-column prop="img" label="图片" sortable align="center">
                    <template slot-scope="scope">
                      <img :src="scope.row.img" style="width: 120px;height: 120px;" />
                    </template>
                  </el-table-column>
                  <el-table-column prop="salesNum" label="月销量" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="profit" label="月毛利" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="endTime" label="统计截止日期" sortable align="center">
                    <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span>{{dateFormatter(scope.row.endTime)}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div v-show="indexbk.joom">
                <el-table :data="proTable" size="small" @sort-change="sortNumber" height="800">
                  <el-table-column type="index" align="center"></el-table-column>
                  <el-table-column prop="platform" label="平台" sortable align="center"></el-table-column>
                  <el-table-column prop="developer" label="开发员" sortable align="center"></el-table-column>
                  <el-table-column prop="goodsCode" label="商品编码" sortable align="center">
                    <template slot-scope="scope">
                      <a :href="scope.row.linkUrl" target="_blank">{{scope.row.goodsCode}}</a>
                    </template>
                  </el-table-column>
                  <el-table-column prop="goodsName" label="商品名称" sortable align="center"></el-table-column>
                  <el-table-column prop="subCate" label="主类目" sortable align="center"></el-table-column>
                  <el-table-column prop="cate" label="子类目" sortable align="center"></el-table-column>
                  <el-table-column prop="img" label="图片" sortable align="center">
                    <template slot-scope="scope">
                      <img :src="scope.row.img" style="width: 120px;height: 120px;" />
                    </template>
                  </el-table-column>
                  <el-table-column prop="salesNum" label="月销量" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="profit" label="月毛利" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="endTime" label="统计截止日期" sortable align="center">
                    <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span>{{dateFormatter(scope.row.endTime)}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div> -->
            <div class="tabs-container tab-index-pan" v-show="showTitle.zengzhang" v-loading="loding">
              <profitGrowth :allMenu='allMenu'></profitGrowth>
            </div>
            <div class="tabs-container tab-index-pan" v-show="showTitle.sale" style="width:100%;padding-left:14px;">
              <saleGrowth :allMenu='allMenu'></saleGrowth>
            </div>
          </el-card>
        </div>
        <el-card class="box-card" :style="{ width: rightWidth + '%',height: tableHeightNewTop1 + 'px' }">
          <div slot="header" class="clearfix-list">
            <h2>公告栏</h2>
          </div>
          <ul>
            <li v-for="(item, index) in newsList" :key="index">
              <div class="post-left-box">
                <div class="subtitle">
                  <h2 v-html="item.title"></h2>
                  <p
                    style="color:#b2b2b2;"
                  >{{item.creator}} &nbsp;&nbsp;| &nbsp;&nbsp;{{item.createDate.substring(0, 16)}}</p>
                </div>
              </div>
              <div class="post-right-box">
                <el-button type="text" @click="dialogTopShow(item.id)">
                  <i class="el-icon-view"></i>
                </el-button>
                <el-button
                  type="text"
                  slot="reference"
                  style="padding:8px;"
                  v-if="item.isTop==='1'"
                >
                  <el-badge value="顶" style="margin-top:-5px;"></el-badge>
                </el-button>
                <el-button
                  type="text"
                  @click="handleTop(item.id)"
                  slot="reference"
                  style="padding:10px;"
                  v-else-if="item.isTop==='0'"
                >
                  <span>⇧</span>
                </el-button>
              </div>
            </li>
          </ul>
          <el-button
            type="text"
            @click="loadMore"
            class="more"
            v-text="this.page>=this.newsData.page?'加载更多':'已无更多'"
          ></el-button>
        </el-card>
        <el-card class="box-card1" :style="{ width: rightWidth + '%',height: tableHeightNewTop2 + 'px'  }">
          <div slot="header" class="clearfix-list">
            <h2>更新日志</h2>
          </div>
          <div class="contentBox">
            <div class="contentBox01">
              <!-- <div class="contentBoxLeft">
            <div class="texta">
              <a class="titlea">2019-15-12</a>
              <span class="blueround"></span>    
            </div>
              </div>-->
              <div class="contentBoxRight">
                <div class="text01" v-for="(item, index) in logList" :key="index">
                  <span class="blueround"></span>
                  <p class="titlep" :class="index==0?'clasRed':''">{{item.title}}</p>
                  <span class="titlea">{{item.createdDate | cutOut}}</span>
                  <p class="cp">{{item.details}}</p>
                </div>
              </div>
            </div>
          </div>
        </el-card>
        <!-- <el-card class="box-card1">
        <div slot="header"
             class="clearfix-list">
          <h2>活动栏</h2>
        </div>
        <img src="../assets/1.5.jpg"
             style="height:400px;width:95%;padding:15px;">
        </el-card>-->
        <!-- <transition style="height:600px;" enter-active-class="animated fadeInRightBig">
      <div class="zhezhao" v-show="flagShow"></div>
        </transition>-->
        <el-dialog :visible.sync="dialogVisible">
          <el-form :model="newsDetailList" label-width="80px" ref="detailForm">
            <el-form-item label="标题：" prop="title">
              <span v-html="newsDetailList.title" style="font-size:18px;"></span>
            </el-form-item>
            <el-form-item label="详情：" prop="detail">
              <span v-html="newsDetailList.detail" style="font-size:18px;"></span>
            </el-form-item>
          </el-form>
        </el-dialog>
      </section>
    </div>
  </div>
</template>

<script>
import {
  news,
  newsTop,
  ProsTarget,
  APIAllDpart,
  getZzTargetEbay,
  getZzTargetJoom,
  APISiteIndex,
  APISiteSales,
  getSiteIndexXs,
  getSiteIndexKf,
  getSiteIndexBM,
} from "../api/api";
import { compareUp, compareDown } from "../api/tools";
import { updateLog,getqueryInfojob } from "../api/product";
import { getMenu } from "../api/login";
import salesRanking from "@/components/index/salesRanking.vue";
import warehouseIntegration from "@/components/index/warehouseIntegration.vue";
import profitGrowth from "@/components/index/profitGrowth.vue";
import saleGrowth from "@/components/index/saleGrowth.vue";
export default {
  components: { salesRanking , warehouseIntegration, profitGrowth , saleGrowth},
  data() {
    return {
      loding:false,
      tableHeightNewTop1: window.innerHeight /2-28,
      tableHeightNewTop2: window.innerHeight /2,
      tableHeightNewTop: window.innerHeight + 19,
      tableHeightNewTop: window.innerHeight + 19,
      tableHeightNew: window.innerHeight - 138,
      leftWidth:'99.6',
      rightWidth:'0',
      indexJob:[],
      thisMonth:0,
      lastMonth:0,
      titleMenuCk:[],
      ckintegral:[],
      activeTabNamebk: "eBay-义乌仓",
      indexTabactive: 0,
      titleMenuTab: [
        "eBay-义乌仓",
        "eBay-海外仓",
        "Wish",
        "Aliexpress",
        "Amazon",
        "Joom",
        "Shopee",
        "VOVA"
      ],
      activeTabzz: "郑州eBay平台",
      activeTabwcd: "所有销售",
      wcdxs: [],
      wcdxsTotal:[],
      wcdkf: [],
      wcdkfTotal:[],
      wcdbm: [],
      flagShow: false,
      sysUserName: null,
      flagShowFour: false,
      flagShowThree: false,
      flagShowTwo: false,
      flagShowOne: false,
      bonus: {
        total: null,
        pass: null,
        surplus: null,
        totalnj: null,
        passnj: null,
        surplusnj: null
      },
      bonusList: [],
      page: null,
      dialogVisible: false,
      sortData: [],
      tabSort: [],
      spareData: [],
      dateArr:[],
      data: {
        id: "",
        isTop: "1"
      },
      newsData: {
        page: 1,
        pageSize: 10
      },
      logdata: {
        page: 1,
        pageSize: 100000
      },
      newsDetailList: {},
      allMenu: [],
      titleMenu: [],
      moreData: [],
      newsList: [],
      tableHeight: null,
      permission: [],
      logList: [],
      shbm: [],
      sybm: [],
      zzbm: [],
      tabzz: {
        ebay: true,
        joom: false
      },
      tabwcd: {
        xs: true,
        kf: false,
        bm: false
      },
      shanghaiTable: [],
      zhengzhouTable: [],
      departTable: [],
      developerTable: [],
      proTable: [],
      proTablepm: [],
      indexSybm:['运营一部','运营二部','运营三部','运营五部','运营六部','运营七部','郑州分部Joom','郑州分部eBay1','郑州分部eBay2','郑州分部eBay3'],
      saleSh: [],
      saleDepartment: [],
      saleDevelop: [],
      xsBmSx:null,
      kfBmSx:null,
      saleZz: [],
      titleMenuzz: [],
      titleMenuwcd: ["所有销售", "所有开发", "所有部门"],
      zzEbay: [],
      zzJoom: [],
      activeTitle: "销售排名",
      activePlat: "eBay-义乌仓",
      activePlatpm: "eBay-义乌仓",
      showTitle: {
        baokuan: false,
        zengzhang: false,
        sale: false,
        pming: true,
        zz: false,
        wj: false,
        wcd: false,
        ckIntegral:false,
      },
      zbJob:null,
      shrinkFlag:true,
      indexbk: {
        yw: true,
        hw: false,
        wish: false,
        smt: false,
        ama: false,
        joom: false
      }
    };
  },
  methods: {
    indexShrink(){
      this.shrinkFlag=!this.shrinkFlag
      if(this.shrinkFlag){
        this.leftWidth='99.6'
        this.rightWidth='0'
      }else{
        this.leftWidth='69'
        this.rightWidth='30'
      }
    },
    handclickzz(tab, event) {
      if (tab.label === "郑州eBay平台") {
        this.tabzz["ebay"] = true;
      } else {
        this.tabzz["ebay"] = false;
      }
      if (tab.label === "郑州Joom平台") {
        this.tabzz["joom"] = true;
      } else {
        this.tabzz["joom"] = false;
      }
    },
    sortNumberZZ(column, prop, order) {
      const data = this.zzEbay;
      if (column.order === "descending") {
        this.zzEbay = data.sort(compareDown(data, column.prop));
      } else {
        this.zzEbay = data.sort(compareUp(data, column.prop));
      }
    },
    sortNumberjoom(column, prop, order) {
      const data = this.zzJoom;
      if (column.order === "descending") {
        this.zzJoom = data.sort(compareDown(data, column.prop));
      } else {
        this.zzJoom = data.sort(compareUp(data, column.prop));
      }
    },
    // 加载更多
    loadMore() {
      this.newsData.page++;
      news(this.newsData).then(res => {
        this.moreData = res.data.data.items;
        this.newsList = this.newsList.concat(this.moreData);
      });
    },
    // 公告详情
    dialogTopShow(id) {
      this.dialogVisible = true;
      this.newsDetailList = this.newsList.filter(e => e.id === id);
      this.newsDetailList = this.newsDetailList[0];
    },
    // 置顶
    handleTop(id) {
      this.data.id = id;
      newsTop(this.data).then(res => {
        this.getNews();
      });
      this.newsData.page = 1;
    },
    getNews() {
      news(this.newsData).then(res => {
        const ret = res.data.data.items;
        this.newsList = ret;
        this.page = res.data.data._meta.pageCount;
      });
    },
    handclickbk(tab, event) {
      if (tab.label === "eBay-义乌仓") {
        this.activeTabNamebk = "eBay-义乌仓";
        this.indexbk["yw"] = true;
        ProsTarget(this.activeTabNamebk).then(res => {
          this.proTable = res.data.data;
        });
      } else {
        this.indexbk["yw"] = false;
      }
      if (tab.label === "eBay-海外仓") {
        this.activeTabNamebk = "eBay-海外仓";
        this.indexbk["hw"] = true;
        ProsTarget(this.activeTabNamebk).then(res => {
          this.proTable = res.data.data;
        });
      } else {
        this.indexbk["hw"] = false;
      }
      if (tab.label === "Wish") {
        this.activeTabNamebk = "Wish";
        this.indexbk["wish"] = true;
        ProsTarget(this.activeTabNamebk).then(res => {
          this.proTable = res.data.data;
        });
      } else {
        this.indexbk["wish"] = false;
      }
      if (tab.label === "SMT") {
        this.activeTabNamebk = "SMT";
        this.indexbk["smt"] = true;
        ProsTarget(this.activeTabNamebk).then(res => {
          this.proTable = res.data.data;
        });
      } else {
        this.indexbk["smt"] = false;
      }
      if (tab.label === "Amazon") {
        this.activeTabNamebk = "Amazon";
        this.indexbk["ama"] = true;
        ProsTarget(this.activeTabNamebk).then(res => {
          this.proTable = res.data.data;
        });
      } else {
        this.indexbk["ama"] = false;
      }
      if (tab.label === "Joom") {
        this.activeTabNamebk = "Joom";
        this.indexbk["joom"] = true;
        ProsTarget(this.activeTabNamebk).then(res => {
          this.proTable = res.data.data;
        });
      } else {
        this.indexbk["joom"] = false;
      }
    },
    handleTitle(n, index) {
      this.loding = true
      if (n === "今日爆款") {
        this.showTitle["baokuan"] = true;
        this.activeTitle = "今日爆款";
        this.indexTabactive = index;
        this.loding = false
      } else {
        this.showTitle["baokuan"] = false;
      }
      if (n === "利润增长表") {
        this.showTitle["zengzhang"] = true;
        this.activeTitle = "利润增长表";
        this.indexTabactive = index;
        this.loding = false
      } else {
        this.showTitle["zengzhang"] = false;
      }
      if (n === "销售额增长表") {
        this.showTitle["sale"] = true;
        this.activeTitle = "销售额增长表";
        this.indexTabactive = index;
        this.loding = false
      } else {
        this.showTitle["sale"] = false;
      }
      if (n === "销售排名") {
        this.showTitle["pming"] = true;
        this.activeTitle = "销售排名";
        this.indexTabactive = index;
        this.loding = false
      } else {
        this.showTitle["pming"] = false;
      }
      if (n === "郑州分部目标完成度") {
        this.showTitle["zz"] = true;
        this.activeTitle = "郑州分部目标完成度";
        this.indexTabactive = index;
        this.loding = false
      } else {
        this.showTitle["zz"] = false;
      }
      if (n === "旺季目标") {
        this.ifShowIndex = false;
        this.ifShowIndex1 = true;
      }
      if (n === "旺季目标完成度") {
        this.showTitle["wcd"] = true;
        this.activeTitle = "旺季目标完成度";
        this.indexTabactive = index;
      } else {
        this.showTitle["wcd"] = false;
      }
      if (n === "仓库积分榜") {
        this.showTitle["ckIntegral"] = true;
        this.activeTitle = "仓库积分榜";
        this.indexTabactive = index;
        this.loding = false
      } else {
        this.showTitle["ckIntegral"] = false;
      }
    },
    dateFormatter(date) {
      return date.substring(0, 10);
    },
  },
  filters: {
    cutOut: function(value) {
      if (!value) return "";
      value = value.substring(0, 10);
      return value;
    },
    cutOut1: function(value) {
      value = Number(value).toFixed(0);
      return value;
    }
  },
  mounted() {
    getMenu().then(response => {
      const res = response.data.data;
      const menu = res.filter(e => e.name === "主页");
      this.titleMenu = menu[0].tabs;
      for (let i = 0; i < this.titleMenu.length; i++) {
        if (this.titleMenu[i].name == "今日爆款") {
          this.titleMenu.splice(i, 1);
        }
        if (this.titleMenu[i].route == "/v1/site/zz-target") {
          this.titleMenuzz = this.titleMenu[i].tabs;
        }
        if (this.titleMenu[i].route == "/v1/site/amt") {
          this.allMenu = menu[0].tabs[1].tabs;
        }
        if (this.titleMenu[i].route == "/v1/site/integral-ranking") {
          this.titleMenuCk = this.titleMenu[i].tabs;
        }
        if (this.titleMenu[0].route == "/v1/site/integral-ranking") {
          this.showTitle.pming=false
          this.showTitle.ckIntegral=true
        }
      }
    });
    this.$store.dispatch("GetUserInfo").then(() => {
      this.sysUserName = this.$store.getters.name;
    });
    updateLog(this.logdata).then(res => {
      if (res.data.code == 200) {
        this.logList = res.data.data.items;
      } else {
        this.$message.error(res.data.message);
      }
    });
    ProsTarget(this.activePlat).then(res => {
      this.proTable = res.data.data;
    });
    this.getNews();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.clasRed {
  color: red;
}
.colorRed {
  color: red;
}
.poImg {
  width: 80px;
  height: 80px;
}
.poImg img {
  margin-top: 16px;
}
.poImg1 {
  width: 80px;
  height: 80px;
  background: url(../assets/touguan.png) no-repeat center;
  background-size: 100% 100%;
}
.poImg2 {
  width: 80px;
  height: 80px;
  background: url(../assets/toukuang1.png) no-repeat center;
  background-size: 100% 100%;
}
.poImg3 {
  width: 80px;
  height: 80px;
  background: url(../assets/toukuang2.png) no-repeat center;
  background-size: 100% 100%;
}
.blueround {
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #007aff;
  position: absolute;
  left: -8.8%;
  top: 16px;
  z-index: 999;
}
.text01 {
  width: 100%;
  position: relative;
}
.titlea {
  display: block;
  padding-top: 12px;
  text-align: center;
  position: absolute;
  left: -37%;
  top: 0;
  font-size: 16px;
  color: #303133;
  text-decoration: none;
}
@media screen and (max-width: 1600px) {
  .blueround {
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #007aff;
    position: absolute;
    left: -9.5%;
    top: 16px;
    z-index: 999;
  }
  .titlea {
    display: block;
    padding-top: 12px;
    text-align: center;
    position: absolute;
    left: -38%;
    top: 0;
    font-size: 16px;
    color: #303133;
  }
}
@media screen and (max-width: 1400px) {
  .titlea {
    display: block;
    padding-top: 12px;
    text-align: center;
    position: absolute;
    left: -45.5%;
    top: 0;
    font-size: 16px;
    color: #303133;
  }
}
.contentBox {
  width: 95%;
  overflow: hidden;
  margin: auto;
}
.contentBox01 {
  width: 100%;
  overflow: hidden;
}
.contentBoxLeft {
  width: 25%;
  float: left;
}
.contentBoxRight {
  width: 68%;
  float: right;
  border-left: #d2d4da solid 1px;
  margin-left: 27%;
  padding-left: 5%;
  padding-top: 15px;
  min-height: 440px;
}
.cp {
  line-height: 25px;
  font-size: 14px;
}
.titlep {
  font-size: 16px;
  padding: 0;
  margin: 0;
  padding-top: 10px;
  font-weight: bold;
}
.clearfix-table {
  height: 21px;
  line-height: 0px;
}
.clearfix-list {
  height: 4px;
  line-height: 0px;
}
.left-box {
  // width: 69%;
  float: left;
  margin-top: 1.5%;
  // height: 900px;
}
.left-boxCase {
  width: 100%;
  float: left;
  margin-top: 1.5%;
  height: 915px;
  background: url(../assets/bgban7.jpg) no-repeat center;
  background-size: 100% 100%;
  position: relative;
}
.box-card {
  // width: 30%;
  // height: 375px;
  overflow-y: scroll;
  float: right;
  margin-top: 1.5%;
  background-size: 100% 100%;
  .post-left-box {
    position: relative;
    float: left;
    width: 400px;
    h2 {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
  .post-right-box {
    position: relative;
    float: right;
    margin-top: 10px;
    margin-right: 10px;
    i {
      margin-right: -15px;
      font-size: 20px;
    }
    span {
      margin-right: 5px;
      font-style: normal;
      font-size: 24px;
    }
    span:hover {
      color: red;
    }
  }
  li {
    list-style: none;
    border-bottom: 1px solid #eee;
    transition: all 0.3s;
    height: 100px;
  }
  .more {
    margin-left: 50%;
  }
}
.box-card1 {
  // width: 30%;
  // height: 530px;
  float: right;
  margin-top: 10px;
  overflow-y: scroll;
}
a {
  color: #428bac;
  text-decoration: none;
}
a:hover {
  color: #2a6496;
  text-decoration: underline;
}
h2:hover {
  color: #1ebbf0;
}
.dashboard-editor-container {
  padding: 0 30px;
  background-color: #f0f2f5;
  zoom: 0.9;
}
.table-container {
  background-color: #ffffff;
}
.tabs-container {
  background-color: #ffffff;
}
.text {
  font-size: 18px;
}
.index_content {
  width: auto;
  overflow: hidden;
  border-right: none;
}
.index_content p {
  float: left;
  padding: 0;
  margin: 0;
  padding: 12px 18px;
  font-size: 16px;
  border-top: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  border-right: 1px solid #dcdfe6;
  cursor: pointer;
}
.index_content p:first-child {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border-left: 1px solid #dcdfe6;
}
.index_content p:last-child {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}
.index_content p i {
  margin-right: 5px;
}
.index_active {
  background: #3c8dbc;
  color: #ffffff;
}
.tswj {
  height: 848px;
  overflow-y: auto;
  background: #494a5f;
}
.tabNo {
  width: 80%;
  float: left;
}
.tabY {
  width: 20%;
  float: left;
}
.tabNoBlock {
  width: 100%;
  background: #fff;
  height: 6px;
  margin-top: 65px;
  position: relative;
  padding-left: -25px;
}
.leftDemo,
.rightDemo {
  position: absolute;
  width: 507.5px;
  height: 90px;
  border: 30px solid;
}
.leftDemo {
  border-right: 0;
  border-top-left-radius: 100px;
  border-bottom-left-radius: 100px;
  z-index: 1;
}
.rightDemo {
  left: 485px;
  width: 460px;
  border-left: 0;
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
}
.leftDemo:before,
.rightDemo:before {
  content: "";
  position: absolute;
  display: block;
  width: 507.5px;
  height: 90px;
  top: -15px;
  border: 15px solid;
}
.leftDemo:before {
  border-right: 0;
  border-top-left-radius: 100px;
  border-bottom-left-radius: 100px;
  left: -15px;
}
.rightDemo:before {
  width: 460px;
  border-left: 0;
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
}
.bigDemo {
  width: 980px;
  margin: 0 auto;
  padding-top: 66px;
  position: relative;
  height: 800px;
  overflow: hidden;
  overflow-y: auto;
}
.start {
  display: block;
  width: 25px;
  height: 25px;
  background: #e7e7e7;
  border: #303334 solid 10px;
  border-radius: 50%;
  position: absolute;
  top: 57px;
  left: 450px;
  text-align: center;
  line-height: 25px;
}
.end {
  display: block;
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  top: 656px;
  text-align: center;
  line-height: 25px;
  right: 477px;
  z-index: 100;
  color: red;
  animation: myfirst 2s infinite;
}
.end img {
  position: absolute;
  top: -5px;
  left: -5px;
}
@keyframes myfirst {
  0%,
  100% {
    transform: scale(0.8);
    -webkit-transform: scale(0.8);
  }
  50% {
    transform: scale(1.2);
    -webkit-transform: scale(1.2);
  }
}
@keyframes myfirst1 {
  0%,
  100% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
  50% {
    transform: scale(1.5);
    -webkit-transform: scale(1.5);
  }
}
.span20 {
  display: block;
  color: #5a9c8e;
  font-size: 50px;
  font-weight: 600;
  position: absolute;
  right: 40px;
  top: 16px;
}
.span40 {
  display: block;
  color: #46b2bc;
  font-size: 50px;
  font-weight: 600;
  position: absolute;
  left: 40px;
  top: 16px;
}
.span60 {
  display: block;
  color: #40bdc9;
  font-size: 50px;
  font-weight: 600;
  position: absolute;
  right: 40px;
  top: 16px;
}
.span80 {
  display: block;
  color: #0bdbee;
  font-size: 50px;
  font-weight: 600;
  position: absolute;
  left: 40px;
  top: 16px;
}
.span100 {
  color: #83cf20;
  display: block;
  font-size: 50px;
  font-weight: 600;
  position: absolute;
  left: -50px;
  top: 16px;
}
.rightDemo:nth-child(1) {
  border-color: #76c5cc;
  top: 66.5px;
}
.rightDemo:nth-child(1):before {
  border-color: #69b8a7;
}
.leftDemo:nth-child(2) {
  top: 186px;
  width: 460px;
  border-color: #69b8a7;
}
.leftDemo:nth-child(2):before {
  width: 460px;
  border-color: #76c5cc;
}
.rightDemo:nth-child(3) {
  left: 485.5px;
  z-index: 2;
  width: 460px;
  top: 305.5px;
  border-color: #76c5cc;
}
.rightDemo:nth-child(3):before {
  border-color: #69b8a7;
  width: 460px;
}
.leftDemo:nth-child(4) {
  width: 475px;
  top: 425px;
  border-color: #69b8a7;
}
.leftDemo:nth-child(4):before {
  width: 475px;
  border-color: #76c5cc;
}
.rightDemo:nth-child(5) {
  left: 485.5px;
  z-index: 19;
  width: 460px;
  top: 544px;
  border-color: #76c5cc;
}
.rightDemo:nth-child(5):before {
  border-color: #69b8a7;
  width: 460px;
}
.leftDemo:nth-child(6) {
  width: 870px;
  top: 665px;
  z-index: 18;
  border-color: #6caf29;
}
.leftDemo:nth-child(6):before {
  width: 870px;
  border-color: #8cc63e;
}
.rightDemo:nth-child(7) {
  width: 870px;
  top: 785px;
  left:75px;
  z-index: 17;
  border-color: #8cc63e;
}
.rightDemo:nth-child(7):before {
  width: 870px;
  border-color: #6caf29;
}
.leftDemo:nth-child(8) {
  width: 870px;
  top: 905px;
  border-color: #6caf29;
  z-index: 16;
}
.leftDemo:nth-child(8):before {
  width: 870px;
  border-color: #8cc63e;
}
.rightDemo:nth-child(9) {
  width: 870px;
  top: 1025px;
  left:75px;
  z-index: 15;
  border-color: #8cc63e;
}
.rightDemo:nth-child(9):before {
  width: 870px;
  border-color: #6caf29;
}
.leftDemo:nth-child(10) {
  width: 870px;
  top: 1145px;
  border-color: #6caf29;
  z-index: 14;
}
.leftDemo:nth-child(10):before {
  width: 870px;
  border-color: #8cc63e;
}
.rightDemo:nth-child(11) {
  width: 870px;
  top: 1265px;
  left:75px;
  z-index: 13;
  border-color: #8cc63e;
}
.rightDemo:nth-child(11):before {
  width: 870px;
  border-color: #6caf29;
}
.leftDemo:nth-child(12) {
  width: 870px;
  top: 1385px;
  border-color: #6caf29;
  z-index: 12;
}
.leftDemo:nth-child(12):before {
  width: 870px;
  border-color: #8cc63e;
}
.rightDemo:nth-child(13) {
  width: 870px;
  top: 1505px;
  left:75px;
  z-index: 11;
  border-color: #8cc63e;
}
.rightDemo:nth-child(13):before {
  width: 870px;
  border-color: #6caf29;
}
.leftDemo:nth-child(14) {
  width: 870px;
  top: 1625px;
  border-color: #6caf29;
  z-index: 10;
}
.leftDemo:nth-child(14):before {
  width: 870px;
  border-color: #8cc63e;
}
.rightDemo:nth-child(15) {
  width: 870px;
  top: 1745px;
  left:75px;
  z-index: 9;
  border-color: #8cc63e;
}
.rightDemo:nth-child(15):before {
  width: 870px;
  border-color: #6caf29;
}
.leftDemo:nth-child(16) {
  width: 870px;
  top: 1865px;
  border-color: #6caf29;
  z-index: 8;
}
.leftDemo:nth-child(16):before {
  width: 870px;
  border-color: #8cc63e;
}
.indexbImg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-size: 100%;
  background: url(../assets/sc.png) no-repeat center;
  margin-left: -20px;
  cursor: pointer;
}
.indexbImg1 {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-size: 100%;
  background: url(../assets/sc1.png) no-repeat center;
  margin-left: -20px;
  cursor: pointer;
}
.indexbImg:hover {
  -webkit-animation: icon-bounce 0.5s alternate;
  -moz-animation: icon-bounce 0.5s alternate;
  -o-animation: icon-bounce 0.5s alternate;
  animation: icon-bounce 0.5s alternate;
}
.indexbImg1:hover {
  -webkit-animation: icon-bounce 0.5s alternate;
  -moz-animation: icon-bounce 0.5s alternate;
  -o-animation: icon-bounce 0.5s alternate;
  animation: icon-bounce 0.5s alternate;
}
@keyframes icon-bounce {
  0% {
    transform: translate(0px, 0px);
  }
  50% {
    transform: translate(0px, -10px);
  }
  100% {
    transform: translate(0px, 0px);
  }
}
// 全部
.digWhite {
  width: 1300px;
  height: 500px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -650px;
  margin-top: -250px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 1px 2px 10px 1px rgba(60, 141, 188, 0.2);
  z-index: 999;
  border-radius: 15px;
}
.closeIndex {
  position: absolute;
  right: -10px;
  top: -8px;
  cursor: pointer;
}
.CaseBox {
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
  height: 500px;
}
.testCase {
  width: 22%;
  float: left;
  margin: 0 1.3% 0 1.7%;
  background: #fff;
  border-radius: 5px;
  margin-top: 50px;
  margin-bottom: 20px;
  box-shadow: 1px 8px 30px 1px rgba(60, 141, 188, 0.2);
}
.tleft {
  float: left;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin: 20px;
  box-shadow: 4px 13px 30px 5px rgba(60, 141, 188, 0.2);
}
.tright {
  float: left;
  padding: 0 15px;
  margin: 15px;
  padding-left: 23px;
  margin-left: 0;
  box-shadow: 4px 13px 30px 1px rgba(60, 141, 188, 0.2);
}
.tright p {
  font-size: 13px;
}
.tright span {
  display: block;
  float: left;
  width: 60px;
  text-align: justify;
  margin-top: -1px;
}
.namep {
  width: 100%;
  font-size: 13px;
  text-align: center;
  background: #f5af19;
  line-height: 28px;
  color: #fff;
  border-radius: 20px;
  letter-spacing: 3px;
}
.zhezhao {
  width: 200%;
  background: #000;
  height: 100%;
  position: fixed;
  opacity: 0.3;
  top: 0;
  left: -20rem;
  z-index: 10;
}
.animated {
  animation-duration: 1.5s;
}
//四个
.digWhiteFour {
  width: 1300px;
  height: 265px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -650px;
  margin-top: -133px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 1px 2px 10px 1px rgba(60, 141, 188, 0.2);
  z-index: 999;
  border-radius: 15px;
}
.closeIndexFour {
  position: absolute;
  right: -10px;
  top: -8px;
  cursor: pointer;
}
.CaseBoxFour {
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
}
.testCaseFour {
  width: 22%;
  float: left;
  margin: 0 1.3% 0 1.7%;
  background: #fff;
  border-radius: 5px;
  margin-top: 50px;
  margin-bottom: 20px;
  box-shadow: 1px 8px 30px 1px rgba(60, 141, 188, 0.2);
}
.tleftFour {
  float: left;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin: 20px;
  box-shadow: 4px 13px 30px 5px rgba(60, 141, 188, 0.2);
}
.trightFour {
  float: left;
  padding: 0 15px;
  margin: 15px;
  padding-left: 23px;
  margin-left: 0;
  box-shadow: 4px 13px 30px 1px rgba(60, 141, 188, 0.2);
}
.trightFour p {
  font-size: 13px;
}
.trightFour span {
  display: block;
  float: left;
  width: 60px;
  text-align: justify;
  margin-top: -1px;
}
.namepFour {
  width: 100%;
  font-size: 13px;
  text-align: center;
  background: #f5af19;
  line-height: 28px;
  color: #fff;
  border-radius: 20px;
  letter-spacing: 3px;
}
//三个
.digWhiteThree {
  width: 1100px;
  height: 265px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -550px;
  margin-top: -133px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 1px 2px 10px 1px rgba(60, 141, 188, 0.2);
  z-index: 999;
  border-radius: 15px;
}
.closeIndexThree {
  position: absolute;
  right: -10px;
  top: -8px;
  cursor: pointer;
}
.CaseBoxThree {
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
}
.testCaseThree {
  width: 30%;
  float: left;
  margin: 0 1.3% 0 1.7%;
  background: #fff;
  border-radius: 5px;
  margin-top: 50px;
  margin-bottom: 20px;
  box-shadow: 1px 8px 30px 1px rgba(60, 141, 188, 0.2);
}
.tleftThree {
  float: left;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 20px;
  box-shadow: 4px 13px 30px 5px rgba(60, 141, 188, 0.2);
}
.trightThree {
  float: left;
  padding: 0 25px;
  margin: 15px;
  padding-left: 35px;
  margin-left: 0;
  box-shadow: 4px 13px 30px 1px rgba(60, 141, 188, 0.2);
}
.trightThree p {
  font-size: 14px;
}
.trightThree span {
  display: block;
  float: left;
  width: 70px;
  text-align: justify;
  margin-top: -1px;
}
.namepThree {
  width: 100%;
  font-size: 13px;
  text-align: center;
  background: #f5af19;
  line-height: 28px;
  color: #fff;
  border-radius: 20px;
  letter-spacing: 3px;
}
//两个
.digWhiteTwo {
  width: 750px;
  height: 265px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -375px;
  margin-top: -133px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 1px 2px 10px 1px rgba(60, 141, 188, 0.2);
  z-index: 999;
  border-radius: 15px;
}
.closeIndexTwo {
  position: absolute;
  right: -10px;
  top: -8px;
  cursor: pointer;
}
.CaseBoxTwo {
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
}
.testCaseTwo {
  width: 45%;
  float: left;
  margin: 0 2.5%;
  background: #fff;
  border-radius: 5px;
  margin-top: 50px;
  margin-bottom: 20px;
  box-shadow: 1px 8px 30px 1px rgba(60, 141, 188, 0.2);
}
.tleftTwo {
  float: left;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 20px;
  box-shadow: 4px 13px 30px 5px rgba(60, 141, 188, 0.2);
}
.trightTwo {
  float: left;
  padding: 0 30px;
  margin: 15px;
  padding-left: 35px;
  margin-left: 0;
  box-shadow: 4px 13px 30px 1px rgba(60, 141, 188, 0.2);
}
.trightTwo p {
  font-size: 14px;
}
.trightTwo span {
  display: block;
  float: left;
  width: 70px;
  text-align: justify;
  margin-top: -1px;
}
.namepTwo {
  width: 100%;
  font-size: 13px;
  text-align: center;
  background: #f5af19;
  line-height: 28px;
  color: #fff;
  border-radius: 20px;
  letter-spacing: 3px;
}
//1条
.digWhiteOne {
  width: 360px;
  height: 320px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -172px;
  margin-top: -160px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 1px 2px 10px 1px rgba(60, 141, 188, 0.2);
  z-index: 999;
  border-radius: 15px;
}
.closeIndexOne {
  position: absolute;
  right: -10px;
  top: -8px;
  cursor: pointer;
}
.CaseBoxOne {
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
}
.testCaseOne {
  width: 88%;
  margin: 0 6%;
  background: #fff;
  border-radius: 5px;
  margin-top: 30px;
  margin-bottom: 20px;
  box-shadow: 1px 8px 30px 1px rgba(60, 141, 188, 0.2);
  padding-top: 15px;
}
.tleftOne {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: auto;
  box-shadow: 4px 13px 30px 5px rgba(60, 141, 188, 0.2);
}
.trightOne {
  width: 90%;
  margin: auto;
  overflow: hidden;
  box-shadow: 4px 13px 30px 1px rgba(60, 141, 188, 0.2);
  margin-top: 55px;
  padding-bottom: 5px;
  margin-bottom: 10px;
  padding-left: 8px;
  padding-top: 5px;
}
.trightOne p {
  font-size: 14px;
  margin: 0;
  line-height: 25px;
  padding: 5px 10px;
  padding-top: 10px;
}
.trightOne span {
  display: block;
  float: left;
  width: 70px;
  text-align: justify;
}
.p01 {
  overflow: hidden;
}
.p01 p {
  width: 48%;
  padding: 2px;
  line-height: 30px;
}
.p01 p:first-child {
  float: left;
}
.p01 p:last-child {
  float: right;
}
.namepOne {
  width: 100%;
  font-size: 13px;
  text-align: center;
  background: #f5af19;
  line-height: 28px;
  color: #fff;
  border-radius: 20px;
  letter-spacing: 3px;
}
.pred {
  color: red;
  font-weight: bold;
}
.pred span {
  color: #000;
  font-weight: normal;
}
.tabCase {
  transition: All 0.3s ease-in-out;
  -webkit-transition: All 0.3s ease-in-out;
  -moz-transition: All 0.3s ease-in-out;
  -o-transition: All 0.3s ease-in-out;
}
.tabCase:hover {
  transform: translate(0, -20px);
  -webkit-transform: translate(0, -20px);
  -moz-transform: translate(0, -20px);
  -o-transform: translate(0, -20px);
  -ms-transform: translate(0, -20px);
}
.imbge {
  animation: myfirst1 1.2s infinite;
  z-index: 105;
}
//奖金池
.cardCase {
  width: 100%;
  margin: auto;
  background: rgba(246, 248, 142, 0.1);
  height: 525px;
  overflow: hidden;
}
.cardLeft {
  float: left;
  color: #fff;
  margin-top: 1px;
  font-family: "Consolas";
}
.zmb {
  text-align: center;
  margin: 0;
  margin-top: 5px;
  color: #000;
  margin-top: 10px;
}
.njs {
  text-align: center;
  margin: 0;
  margin-top: 5px;
  font-size: 16px;
  letter-spacing: 2px;
  font-weight: normal;
}
.cardLeft01 {
  width: 175px;
  border: #f5ad18 4px solid;
  height: 235px;
  border-radius: 12px;
  margin-left: 45px;
  margin-top: 10px;
}
.cardLeft02 {
  width: 175px;
  border: #f5ad18 4px solid;
  height: 190px;
  border-radius: 12px;
  margin-left: 45px;
  margin-top: 10px;
}
.cardLeft span {
  display: block;
  font-size: 24px;
  color: #fff;
  text-align: center;
  margin-top: 1px;
  color: red;
}
.cardLeft img {
  display: block;
  margin: auto;
  width: 63px;
  height: 53px;
}
.cardRight {
  float: right;
  width: 53%;
  margin-right: 20px;
  height: 490px;
  margin-top: 19px;
  background: rgba(255, 255, 255, 0.4);
  position: relative;
}
.luck-user-title {
  position: absolute;
  width: 90%;
  display: block;
  text-align: center;
  line-height: 50px;
  left: 5%;
  font-size: 18px;
  color: #f5b43a;
  font-weight: bold;
}
.luck-user-title::before {
  width: 100%;
  position: absolute;
  content: "";
  top: 100%;
  left: 0;
  background: -webkit-linear-gradient(
    left,
    rgba(248, 215, 59, 0),
    #f0d03a,
    rgba(248, 215, 59, 0)
  );
  height: 2px;
}
.cardText::-webkit-scrollbar {
  width: 4px;
  height: 10px;
}
.cardText::-webkit-scrollbar-thumb {
  background-color: #fff;
  height: 50px;
  outline-offset: -1px;
  outline: 2px solid #fff;
  -webkit-border-radius: 40px;
  border: 1px solid #fff;
}
.cardText {
  width: 100%;
  margin: auto;
  margin-top: 62px;
  overflow: hidden;
  color: #fff;
  height: 425px;
  overflow-y: auto;
}
.cardText01 {
  overflow: hidden;
  padding: 8px 0;
}
.cardText img {
  float: left;
  margin-left: 8%;
}
.cardText span {
  display: block;
  float: left;
  line-height: 45px;
  margin-left: 18px;
  color: #000;
}
.cardText p {
  float: right;
  margin-right: 12px;
  color: red;
}
.icimg {
  transition: All 0.3s ease-in-out;
  cursor: pointer;
}
.icimg:hover {
  transform: scale(1.2);
}
.njts {
  margin-top: 12px;
  color: #67c23a !important;
}
.spGreen {
  color: #67c23a !important;
}
.swhite {
  color: #e6a23c !important;
}
.jbg {
  animation: rotate 1.5s infinite;
}
@keyframes rotate {
  0% {
    -webkit-transform: rotateY(0deg);
  }
  100% {
    -webkit-transform: rotateY(360deg);
  }
}
//第二屏幕
.bgCase {
  width: 100%;
  height: 970px;
  background: url(../assets/bgban5.jpg) no-repeat center;
  background-size: 100% 100%;
  padding: 0 30px;
  background-color: #f0f2f5;
  zoom: 0.9;
}
.leftBox {
  width: 69%;
  float: left;
}
.rightBox {
  width: 30%;
  height: 475px;
  float: right;
  margin-top: 10px;
}
.lGoback {
  position: absolute;
  top: 20px;
  left: 20px;
  cursor: pointer;
  z-index: 999;
}
@media (max-width: 1500px) {
  .cardLeft {
    margin-left: 10px;
  }
  .cardLeft01 {
    margin-left: 0;
  }
  .cardText img {
    margin-left: 10px;
  }
  .cardText span {
    margin-left: 10px;
  }
  .cardText p {
    margin-right: 5px;
  }
  .cardRight {
    width: 54%;
    margin-right: 15px;
  }
  .cardLeft01 {
    width: 155px;
  }
  .cardLeft02 {
    width: 155px;
  }
}
</style>
<style>
.tab-index-pan .el-tabs__item {
  height: 50px;
  line-height: 50px;
}
.el-progress-bar__outer{
  background-color:#ccc;
}
.bigDemo::-webkit-scrollbar {
  width: 1px !important;
  height: 1px !important;
}
.newIndex td{
  padding:0.7rem 0 !important;
}
.tabsPm td{
  border-left: none !important;
  border-right: none !important;
  border-top: none !important;
}
.tabsPm .el-tabs__item{
  font-size: 16px !important;
}
.left-box td{
  font-size: 15px !important;
}
.left-box th{
  font-size: 15px !important;
}
</style>
