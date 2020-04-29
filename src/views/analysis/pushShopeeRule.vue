<template>
  <section>
    <div>
        <div class="ebayCase">
          <el-button
            type="success"
            size="small"
            v-show="ebay.xp"
            @click="addEbayxpLogin()"
            style="margin-left:0.5%;float:left"
          >
            <i class="el-icon-plus"></i>添加Shopee规则
          </el-button>
        </div>
        <div v-show="ebay.xp">
          <el-table
            :data="ebaydata"
            class="elTableee"
            border
            :header-cell-style="getRowClass"
            style="width:98%;margin-left:0.7%;margin-top:15px;"
          >
            <el-table-column type="index" fixed align="center" width="40" header-align="center"></el-table-column>
            <el-table-column label="操作" fixed header-align="center" align="center" width="80">
              <template slot-scope="scope">
                <el-tooltip content="更新">
                  <i
                    @click="editArt(scope.$index, scope.row)"
                    class="el-icon-edit"
                    style="color: #409EFF;cursor:pointer;"
                  ></i>
                </el-tooltip>
                <!-- <el-tooltip content="立即更新">
                  <i
                    @click="ljArt(scope.$index, scope.row)"
                    class="el-icon-star-on"
                    style="color: #409EFF;cursor:pointer;"
                  ></i>
                </el-tooltip> -->
                <el-tooltip content="删除">
                  <i
                    class="el-icon-delete"
                    style="color: #409EFF;cursor:pointer;"
                    @click="delArt(scope.$index, scope.row)"
                  ></i>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column property="ruleName" label="规则名称" align="center" width="130"></el-table-column>
            <el-table-column property="ruleMark" label="规则备注" align="center" width="130"></el-table-column>
            <el-table-column property="country" label="国家" align="center" width="120"></el-table-column>
            <el-table-column property="genTimeStart" label="上架时间" align="center" width="128">
              <template slot-scope="scope">{{scope.row.listedTime[0]}} - {{scope.row.listedTime[1]}}</template>
            </el-table-column>
            <!-- <el-table-column property="genTimeEnd" label="上架时间" align="center" width="80"></el-table-column> -->
            <el-table-column property="historicalSoldStart" label="总销售件数" align="center" width="125">
              <template slot-scope="scope">{{scope.row.historicalSoldStart}} - {{scope.row.historicalSoldEnd}}</template>
            </el-table-column>
            <el-table-column property="historicalSoldStart" label="价格区间" align="center" width="128">
              <template slot-scope="scope">{{scope.row.priceStart}} - {{scope.row.priceEnd}}</template>
            </el-table-column>
            <!-- <el-table-column property="historicalSoldEnd" label="总销售件数小于" align="center" width="80"></el-table-column> -->
            <el-table-column property="isShopeeVerified" label="虾皮优选" align="center" width="110">
              <template slot-scope="scope">{{scope.row.shopLocationStatus==''?'不限':scope.row.shopLocationStatus=='1'?'是':scope.row.shopLocationStatus}}</template>
            </el-table-column>
            <el-table-column property="likedCountStart" label="Favorite" align="center" width="128">
              <template slot-scope="scope">{{scope.row.likedCountStart}} - {{scope.row.likedCountEnd}}</template>
            </el-table-column>
            <!-- <el-table-column property="likedCountEnd" label="Favorite小于" align="center" width="80"></el-table-column> -->
            <!-- <el-table-column property="paymentStart" label="前30天销售金额" align="center" width="128">
              <template slot-scope="scope">{{scope.row.paymentStart}} - {{scope.row.paymentEnd}}</template>
            </el-table-column> -->
            <!-- <el-table-column property="paymentEnd" label="前30天销售金额小于" align="center" width="100"></el-table-column> -->
            <el-table-column property="soldStart" label="前30天销售件数" align="center" width="128">
              <template slot-scope="scope">{{scope.row.soldStart}} - {{scope.row.soldEnd}}</template>
            </el-table-column>
            <!-- <el-table-column property="soldEnd" label="前30天销售件数小于" align="center" width="100"></el-table-column> -->
            <el-table-column property="ratingCountStart" label="评分区间" align="center" width="128">
              <template slot-scope="scope">{{scope.row.ratingCountStart}} - {{scope.row.ratingCountEnd}}</template>
            </el-table-column>
            <!-- <el-table-column property="ratingCountEnd" label="评分小于" align="center" width="100"></el-table-column> -->
            <el-table-column property="shopLocationStatus" label="所在地" align="center" width="100">
              <template slot-scope="scope">{{scope.row.shopLocationStatus==1?'海外':scope.row.shopLocationStatus==1?'本地':'全部'}}</template>
            </el-table-column>
            <el-table-column property="creator" label="创建人" align="center" width="95"></el-table-column>
            <el-table-column property="createdDate" label="创建时间" align="center" width="100">
              <template slot-scope="scope">{{scope.row.createdDate | cutOutMonye}}</template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <el-dialog title="shopee规则" :visible.sync="ebaydisLoginxp" width="75%" :close-on-click-modal="false">
        <el-row style="margin-top: 0">
          <el-col :span="24" class="cTop">
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp"><span style="color:red;font-size:14px;">* </span>规则名称</p>
              </el-col>
              <el-col :span="15">
                <el-input v-model="ebayXp.ruleName"></el-input>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp">规则备注</p>
              </el-col>
              <el-col :span="15">
                <el-input v-model="ebayXp.ruleMark"></el-input>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp">国家</p>
              </el-col>
              <el-col :span="15">
                <el-select v-model="ebayXp.country" placeholder="请选择" style="width:100%;" clearable>
                  <el-option
                    v-for="item in countrys"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp">上架时间</p>
              </el-col>
              <el-col :span="7">
                <el-input v-model="ebayXp.listedTime[0]" placeholder="开始"></el-input>
              </el-col>
              <el-col :span="1">
                <span class="colspan">-</span>
              </el-col>
              <el-col :span="7">
                <el-input v-model="ebayXp.listedTime[1]" placeholder="结束"></el-input>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp">总销售数</p>
              </el-col>
              <el-col :span="7">
                <el-input v-model="ebayXp.historicalSoldStart" placeholder="大于"></el-input>
              </el-col>
              <el-col :span="1">
                <span class="colspan">-</span>
              </el-col>
              <el-col :span="7">
                <el-input v-model="ebayXp.historicalSoldEnd" placeholder="小于"></el-input>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp">价格区间</p>
              </el-col>
              <el-col :span="7">
                <el-input v-model="ebayXp.priceStart" placeholder="大于"></el-input>
              </el-col>
              <el-col :span="1">
                <span class="colspan">-</span>
              </el-col>
              <el-col :span="7">
                <el-input v-model="ebayXp.priceEnd" placeholder="小于"></el-input>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp">Favorite</p>
              </el-col>
              <el-col :span="7">
                <el-input v-model="ebayXp.likedCountStart" placeholder="大于"></el-input>
              </el-col>
              <el-col :span="1">
                <span class="colspan">-</span>
              </el-col>
              <el-col :span="7">
                <el-input v-model="ebayXp.likedCountEnd" placeholder="小于"></el-input>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp">前30天销售金额</p>
              </el-col>
              <el-col :span="7">
                <el-input v-model="ebayXp.paymentStart" placeholder="大于"></el-input>
              </el-col>
              <el-col :span="1">
                <span class="colspan">-</span>
              </el-col>
              <el-col :span="7">
                <el-input v-model="ebayXp.paymentEnd" placeholder="小于"></el-input>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp">前30天销售件数</p>
              </el-col>
              <el-col :span="7">
                <el-input v-model="ebayXp.soldStart" placeholder="大于"></el-input>
              </el-col>
              <el-col :span="1">
                <span class="colspan">-</span>
              </el-col>
              <el-col :span="7">
                <el-input v-model="ebayXp.soldEnd" placeholder="小于"></el-input>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp">评分</p>
              </el-col>
              <el-col :span="7">
                <el-input v-model="ebayXp.ratingCountStart" placeholder="大于"></el-input>
              </el-col>
              <el-col :span="1">
                <span class="colspan">-</span>
              </el-col>
              <el-col :span="7">
                <el-input v-model="ebayXp.ratingCountEnd" placeholder="小于"></el-input>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp">虾皮优选</p>
              </el-col>
              <el-col :span="15">
                <el-radio-group v-model="ebayXp.isShopeeVerified" size="medium">
                  <el-radio-button label="">不限</el-radio-button>
                  <el-radio-button label="1">是</el-radio-button>
                  <el-radio-button label="0">否</el-radio-button>
                </el-radio-group>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp">所在地</p>
              </el-col>
              <el-col :span="15">
                <el-radio-group v-model="ebayXp.shopLocationStatus" size="medium">
                  <el-radio-button label="">ALL</el-radio-button>
                  <el-radio-button label="1">海外</el-radio-button>
                  <el-radio-button label="2">本地</el-radio-button>
                </el-radio-group>
              </el-col>
            </el-col>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="ebaydisLoginxp = false">取 消</el-button>
          <el-button type="primary" @click="saveEbayXp()">保 存</el-button>
        </div>
      </el-dialog>
      <el-dialog title="添加shopee规则" :visible.sync="addEbaydisLoginxp" width="75%" :close-on-click-modal="false">
        <el-row style="margin-top: 0">
          <el-col :span="24" class="cTop">
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp"><span style="color:red;font-size:14px;">* </span>规则名称</p>
              </el-col>
              <el-col :span="15">
                <el-input v-model="addEbayXp.ruleName"></el-input>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp">规则备注</p>
              </el-col>
              <el-col :span="15">
                <el-input v-model="addEbayXp.ruleMark"></el-input>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp">国家</p>
              </el-col>
              <el-col :span="15">
                <el-select v-model="addEbayXp.country" placeholder="请选择" style="width:100%;" clearable>
                  <el-option
                    v-for="item in countrys"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp">上架时间</p>
              </el-col>
              <el-col :span="7">
                <el-input v-model="addEbayXp.listedTime[0]" placeholder="开始"></el-input>
              </el-col>
              <el-col :span="1">
                <span class="colspan">-</span>
              </el-col>
              <el-col :span="7">
                <el-input v-model="addEbayXp.listedTime[1]" placeholder="结束"></el-input>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp">总销售数</p>
              </el-col>
              <el-col :span="7">
                <el-input v-model="addEbayXp.historicalSoldStart" placeholder="大于"></el-input>
              </el-col>
              <el-col :span="1">
                <span class="colspan">-</span>
              </el-col>
              <el-col :span="7">
                <el-input v-model="addEbayXp.historicalSoldEnd" placeholder="小于"></el-input>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp">价格区间</p>
              </el-col>
              <el-col :span="7">
                <el-input v-model="addEbayXp.priceStart" placeholder="大于"></el-input>
              </el-col>
              <el-col :span="1">
                <span class="colspan">-</span>
              </el-col>
              <el-col :span="7">
                <el-input v-model="addEbayXp.priceEnd" placeholder="小于"></el-input>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp">Favorite</p>
              </el-col>
              <el-col :span="7">
                <el-input v-model="addEbayXp.likedCountStart" placeholder="大于"></el-input>
              </el-col>
              <el-col :span="1">
                <span class="colspan">-</span>
              </el-col>
              <el-col :span="7">
                <el-input v-model="addEbayXp.likedCountEnd" placeholder="小于"></el-input>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp">前30天销售金额</p>
              </el-col>
              <el-col :span="7">
                <el-input v-model="addEbayXp.paymentStart" placeholder="大于"></el-input>
              </el-col>
              <el-col :span="1">
                <span class="colspan">-</span>
              </el-col>
              <el-col :span="7">
                <el-input v-model="addEbayXp.paymentEnd" placeholder="小于"></el-input>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp">前30天销售件数</p>
              </el-col>
              <el-col :span="7">
                <el-input v-model="addEbayXp.soldStart" placeholder="大于"></el-input>
              </el-col>
              <el-col :span="1">
                <span class="colspan">-</span>
              </el-col>
              <el-col :span="7">
                <el-input v-model="addEbayXp.soldEnd" placeholder="小于"></el-input>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp">评分</p>
              </el-col>
              <el-col :span="7">
                <el-input v-model="addEbayXp.ratingCountStart" placeholder="大于"></el-input>
              </el-col>
              <el-col :span="1">
                <span class="colspan">-</span>
              </el-col>
              <el-col :span="7">
                <el-input v-model="addEbayXp.ratingCountEnd" placeholder="小于"></el-input>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp">虾皮优选</p>
              </el-col>
              <el-col :span="15">
                <el-radio-group v-model="addEbayXp.isShopeeVerified" size="medium">
                  <el-radio-button label="">不限</el-radio-button>
                  <el-radio-button label="1">是</el-radio-button>
                  <el-radio-button label="0">否</el-radio-button>
                </el-radio-group>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp">所在地</p>
              </el-col>
              <el-col :span="15">
                <el-radio-group v-model="addEbayXp.shopLocationStatus" size="medium">
                  <el-radio-button label="">ALL</el-radio-button>
                  <el-radio-button label="1">海外</el-radio-button>
                  <el-radio-button label="2">本地</el-radio-button>
                </el-radio-group>
              </el-col>
            </el-col>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addEbaydisLoginxp = false">取 消</el-button>
          <el-button type="primary" @click="addSaveEbayXp()">保 存</el-button>
        </div>
      </el-dialog>
  </section>
</template>
<script type="text/ecmascript-6">
import {
  shopeeProductsRule,
  APRengineRuleHot,
  wishProductsSaveRule,
  ebaySaveRuleHot,
  ebaySaveRuleDelete,
  ebaySaveRuleDeleteHot,
  wishRuleDelete,
  ebayRunRuleNew,
  ebayRunRuleHot
} from "../../api/product";
export default {
  data() {
    return {
      tableHeightstock: window.innerHeight - 185,
      countrys:['马来西亚','印度尼西亚','泰国','菲律宾','台湾','新加坡','越南'],
      ebayStlye: 0,
      ebaydisLoginxp: false,
      ebaydisLoginrx: false,
      addEbaydisLoginxp: false,
      addEbaydisLoginrx: false,
      lodingTo: false,
      listedTime1:null,
      listedTime2:null,
      optionsType:['new','hot'],
      optionsPb:['有','无'],
      optionsHwc:['海外仓','非海外仓'],
      optionsWish:['认证','非认证'],
      ebayOptionsTime: ["今天", "昨天", "前天"],
      ebayXp: {
        id: "",
        plat:'shopee',
        ruleMark: "",
        ruleName: "",
        country: "",
        genTimeEnd: "",
        genTimeStart: "",
        historicalSoldEnd: "",
        historicalSoldStart: "",
        isShopeeVerified: "",
        likedCountEnd: "",
        likedCountStart: "",
        paymentEnd: "",
        paymentStart: "",
        ratingCountEnd: "",
        ratingCountStart: "",
        shopLocationStatus: "",
        listedTime:[],
        priceStart:'',
        priceEnd:'',
        soldEnd: "",
        soldStart: "",
      },
      addEbayXp: {
        plat:'shopee',
        ruleMark: "",
        ruleName: "",
        country: "",
        genTimeEnd: "",
        genTimeStart: "",
        historicalSoldEnd: "",
        historicalSoldStart: "",
        isShopeeVerified: "",
        likedCountEnd: "",
        likedCountStart: "",
        listedTime:[],
        paymentEnd: "",
        paymentStart: "",
        ratingCountEnd: "",
        ratingCountStart: "",
        shopLocationStatus: "",
        priceStart:'',
        priceEnd:'',
        soldEnd: "",
        soldStart: "",
      },
      addEbayRx: {
        marketplace: [],
        publishedSite: [],
        salesThreeDayFlag: false,
        priceStart: "",
        priceEnd: "",
        soldStart: "",
        soldEnd: "",
        storeLocation: [],
        genTimeStart: "",
        genTimeEnd: "",
        soldThePreviousGrowthStart: "",
        soldThePreviousGrowthEnd: "",
        soldThePreviousDayStart: "",
        soldThePreviousDayEnd: "",
        paymentThePreviousDayStart: "",
        paymentThePreviousDayEnd: "",
        salesThreeDay1Start: "",
        salesThreeDay1End: "",
        salesThreeDayGrowthStart: "",
        salesThreeDayGrowthEnd: "",
        paymentThreeDay1Start: "",
        paymentThreeDay1End: "",
        ruleMark: "",
        ruleName: ""
      },
      ebayRx: {
        _id: "",
        brand: "",
        salesThreeDayFlag: "",
        priceStart: "",
        priceEnd: "",
        soldStart: "",
        soldEnd: "",
        storeLocation: [],
        marketplace: [],
        publishedSite: [],
        genTimeStart: "",
        genTimeEnd: "",
        soldThePreviousGrowthStart: "",
        soldThePreviousGrowthEnd: "",
        soldThePreviousDayStart: "",
        soldThePreviousDayEnd: "",
        paymentThePreviousDayStart: "",
        paymentThePreviousDayEnd: "",
        salesThreeDay1Start: "",
        salesThreeDay1End: "",
        salesThreeDayGrowthStart: "",
        salesThreeDayGrowthEnd: "",
        paymentThreeDay1Start: "",
        paymentThreeDay1End: "",
        ruleMark: "",
        ruleName: ""
      },
      show: {
        wish: false,
        ebay: true,
        joom: false
      },
      ebay: {
        xp: true,
        rx: false
      },
      allMenu: ["Ebay", "Wish", "Joom", "Amazon", "Aliexpress"],
      listLoading: false,
      activeName: "Ebay",
      ebaydata: [],
      ebayRxdata: [],
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
      ebayOptionsXp: [
        "美国",
        "英国",
        "德国",
        "澳大利亚",
      ],
      ebayOptionsAddress: [
        "中国",
        "香港",
        "美国",
        "英国",
        "法国",
        "德国",
        "意大利",
        "澳大利亚"
      ],
      ebayOptionsTime: ["今天", "昨天", "前天"]
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
    addselectalld3() {
      var ard1 = [];
      for (const item in this.ebayOptionsTime) {
        ard1.push(this.ebayOptionsTime[item]);
      }
      this.addEbayXp.listedTime = ard1;
    },
    addnoselectd3() {
      this.addEbayXp.listedTime = [];
    },
    selectalld3() {
      var ard1 = [];
      for (const item in this.ebayOptionsTime) {
        ard1.push(this.ebayOptionsTime[item]);
      }
      this.ebayXp.listedTime = ard1;
    },
    noselectd3() {
      this.ebayXp.listedTime = [];
    },    
    ljArt(index, row) {
      let conde = {
        ruleId: row._id
      };
      this.lodingTo = true;
      this.$message({
          message: '正在更新',
          type: 'warning'
      });
      ebayRunRuleNew(conde).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: "更新成功",
            type: "success"
          });
        } else {
          this.$message.error(res.data.message);
        }
        this.lodingTo = false;
      });
    },
    ljArtRx(index, row) {
      // let conde = {
      //   ruleId: row._id
      // };
      // this.lodingTo = true;
      // this.$message({
      //     message: '正在更新',
      //     type: 'warning'
      // });
      // ebayRunRuleHot(conde).then(res => {
      //   if (res.data.code == 200) {
      //     this.$message({
      //       message: "更新成功",
      //       type: "success"
      //     });
      //   } else {
      //     this.$message.error(res.data.message);
      //   }
      //   this.lodingTo = false;
      // });
    },
    selectalld1() {
      var ard1 = [];
      for (const item in this.ebayOptionsXp) {
        ard1.push(this.ebayOptionsXp[item]);
      }
      this.ebayXp.publishedSite = ard1;
    },
    noselectd1() {
      this.ebayXp.publishedSite = [];
    },
    selectalld1Rx() {
      var ard1 = [];
      for (const item in this.ebayOptionsXp) {
        ard1.push(this.ebayOptionsXp[item]);
      }
      this.ebayRx.publishedSite = ard1;
    },
    noselectd1Rx() {
      this.ebayRx.publishedSite = [];
    },
    addselectalld1() {
      var ard1 = [];
      for (const item in this.ebayOptionsXp) {
        ard1.push(this.ebayOptionsXp[item]);
      }
      this.addEbayXp.publishedSite = ard1;
    },
    addnoselectd1() {
      this.addEbayXp.publishedSite = [];
    },
    addselectalld1Rx() {    
      var ard1 = [];
      for (const item in this.ebayOptionsXp) {
        ard1.push(this.ebayOptionsXp[item]);
      }
      this.addEbayRx.publishedSite = ard1;
    },
    addnoselectd1Rx() {
      this.addEbayRx.publishedSite = [];
    },
    addselectalld2Rx() {
      var ard1 = [];
      for (const item in this.ebayOptionsAddress) {
        ard1.push(this.ebayOptionsAddress[item]);
      }
      this.addEbayRx.storeLocation = ard1;
    },
    addnoselectd2Rx() {
      this.addEbayRx.storeLocation = [];
    },
    selectalld2() {
      var ard1 = [];
      for (const item in this.ebayOptionsAddress) {
        ard1.push(this.ebayOptionsAddress[item]);
      }
      this.ebayXp.storeLocation = ard1;
    },
    noselectd2() {
      this.ebayXp.storeLocation = [];
    },
    selectalld2Rx() {
      var ard1 = [];
      for (const item in this.ebayOptionsAddress) {
        ard1.push(this.ebayOptionsAddress[item]);
      }
      this.ebayRx.storeLocation = ard1;
    },
    noselectd2Rx() {
      this.ebayRx.storeLocation = [];
    },
    addselectalld2() {
      var ard1 = [];
      for (const item in this.ebayOptionsAddress) {
        ard1.push(this.ebayOptionsAddress[item]);
      }
      this.addEbayXp.storeLocation = ard1;
    },
    addnoselectd2() {
      this.addEbayXp.storeLocation = [];
    },
    selectalld3() {
      var ard1 = [];
      for (const item in this.ebayOptionsTime) {
        ard1.push(this.ebayOptionsTime[item]);
      }
      this.ebayXp.listedTime = ard1;
    },
    noselectd3() {
      this.ebayXp.listedTime = [];
    },
    addselectalld3() {
      var ard1 = [];
      for (const item in this.ebayOptionsTime) {
        ard1.push(this.ebayOptionsTime[item]);
      }
      this.addEbayXp.listedTime = ard1;
    },
    addnoselectd3() {
      this.addEbayXp.listedTime = [];
    },
    forbidSale1(e) {},
    addEbayxpLogin() {
      this.addEbayXp.ruleType= "";
      this.addEbayXp.country= "",
      this.addEbayXp.isShopeeVerified= "",
      this.addEbayXp.shopLocationStatus= "",
      this.addEbayXp.genTimeStart='';
      this.addEbayXp.genTimeEnd='';
      this.addEbayXp.totalpriceStart='';
      this.addEbayXp.totalpriceEnd='';
      this.addEbayXp.viewRate1Start='';
      this.addEbayXp.viewRate1End='';
      this.addEbayXp.intervalRatingStart='';
      this.addEbayXp.intervalRatingEnd='';
      this.addEbayXp.maxNumBoughtStart='';
      this.addEbayXp.maxNumBoughtEnd='';
      this.addEbayXp.ratingStart='';
      this.addEbayXp.ratingEnd='';
      this.addEbayXp.pb='';
      this.addEbayXp.hwc='';
      this.addEbayXp.verified='';
      this.addEbayXp.ruleMark = "";
      this.addEbayXp.listedTime = [];
      this.listedTime1='';
      this.listedTime2='';
      this.addEbayXp.ruleName = "";
      this.addEbaydisLoginxp = true;
    },
    addEbayrxLogin() {
      this.addEbayRx.marketplace = [];
      this.addEbayXp.publishedSite = [];
      this.addEbayRx.salesThreeDayFlag = false;
      this.addEbayRx.priceStart = "";
      this.addEbayRx.priceEnd = "";
      this.addEbayRx.soldStart = "";
      this.addEbayRx.soldEnd = "";
      this.addEbayRx.storeLocation = [];
      this.addEbayRx.genTimeStart = "";
      this.addEbayRx.genTimeEnd = "";
      this.addEbayRx.soldThePreviousGrowthStart = "";
      this.addEbayRx.soldThePreviousGrowthEnd = "";
      this.addEbayRx.soldThePreviousDayStart = "";
      this.addEbayRx.soldThePreviousDayEnd = "";
      this.addEbayRx.paymentThePreviousDayStart = "";
      this.addEbayRx.paymentThePreviousDayEnd = "";
      this.addEbayRx.salesThreeDay1Start = "";
      this.addEbayRx.salesThreeDay1End = "";
      this.addEbayRx.salesThreeDayGrowthStart = "";
      this.addEbayRx.salesThreeDayGrowthEnd = "";
      this.addEbayRx.paymentThreeDay1Start = "";
      this.addEbayRx.paymentThreeDay1End = "";
      this.addEbayRx.ruleMark = "";
      this.addEbayRx.ruleName = "";
      this.addEbaydisLoginrx = true;
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
    editArt(index, row) {
      this.ebayXp.id = row._id;
      this.ebayXp.country = row.country;
      this.ebayXp.genTimeEnd = row.genTimeEnd;
      this.ebayXp.genTimeStart = row.genTimeStart;
      this.ebayXp.historicalSoldEnd = row.historicalSoldEnd;
      this.ebayXp.historicalSoldStart = row.historicalSoldStart;
      this.ebayXp.isShopeeVerified = row.isShopeeVerified;
      this.ebayXp.likedCountEnd = row.likedCountEnd;
      this.ebayXp.likedCountStart = row.likedCountStart;
      this.ebayXp.paymentEnd = row.paymentEnd;
      this.ebayXp.listedTime = row.listedTime;
      this.ebayXp.paymentStart = row.paymentStart;
      this.ebayXp.ratingCountEnd = row.ratingCountEnd;
      this.ebayXp.ratingCountStart = row.ratingCountStart;
      this.ebayXp.shopLocationStatus = row.shopLocationStatus;
      this.ebayXp.soldEnd = row.soldEnd;
      this.ebayXp.soldStart = row.soldStart;
      this.ebayXp.priceEnd = row.priceEnd;
      this.ebayXp.priceStart = row.priceStart;
      this.ebayXp.ruleName = row.ruleName;
      this.ebayXp.ruleMark = row.ruleMark;      
      this.ebaydisLoginxp = true;
    },
    saveEbayXp() {
      this.ebaydisLoginxp = true;
      this.ebayXp.country=='马来西亚'?this.ebayXp.country='1':this.ebayXp.country=='印度尼西亚'?this.ebayXp.country='2':this.ebayXp.country=='泰国'?this.ebayXp.country='3':this.ebayXp.country=='菲律宾'?this.ebayXp.country='4':this.ebayXp.country=='台湾'?this.ebayXp.country='5':this.ebayXp.country=='新加坡'?this.ebayXp.country='6':this.ebayXp.country='7'
      wishProductsSaveRule(this.ebayXp).then(res => {
        if (res.data.data) {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.ebaydisLoginxp = false;
          this.getDataEbay();
        } else {
          this.ebaydisLoginxp = false;
          this.getDataEbay();
        }
      });
    },
    addSaveEbayXp() {
      if (this.addEbayXp.ruleName) {
        this.addEbayXp.country=='马来西亚'?this.addEbayXp.country='1':this.addEbayXp.country=='印度尼西亚'?this.addEbayXp.country='2':this.addEbayXp.country=='泰国'?this.addEbayXp.country='3':this.addEbayXp.country=='菲律宾'?this.addEbayXp.country='4':this.addEbayXp.country=='台湾'?this.addEbayXp.country='5':this.addEbayXp.country=='新加坡'?this.addEbayXp.country='6':this.addEbayXp.country='7'
        wishProductsSaveRule(this.addEbayXp).then(res => {
          if (res.data.data) {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.addEbaydisLoginxp = false;
            this.getDataEbay();
          }
        });
      } else {
        this.$message.error("请填写规则名称");
      }
    },
    saveEbayRx() {
      if (this.ebayRx.salesThreeDayFlag) {
        this.ebayRx.salesThreeDayFlag = 1;
      } else {
        this.ebayRx.salesThreeDayFlag = 0;
      }
      if (this.ebayRx.popularStatus) {
        this.ebayRx.popularStatus = 1;
      } else {
        this.ebayRx.popularStatus = 0;
      }
      ebaySaveRuleHot(this.ebayRx).then(res => {
        if (res.data.data) {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.ebaydisLoginrx = false;
          this.getDataEbay();
        }
      });
    },
    addSaveEbayRx() {
      if (this.addEbayRx.ruleName) {
        if (this.addEbayRx.salesThreeDayFlag) {
          this.addEbayRx.salesThreeDayFlag = 1;
        } else {
          this.addEbayRx.salesThreeDayFlag = 0;
        }
        if (this.addEbayRx.popularStatus) {
        this.addEbayRx.popularStatus = 1;
      } else {
        this.addEbayRx.popularStatus = 0;
      }
        ebaySaveRuleHot(this.addEbayRx).then(res => {
          if (res.data.data) {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.addEbaydisLoginrx = false;
            this.getDataEbay();
          }
        });
      } else {
        this.$message.error("请填写规则名称");
      }
    },
    delArt(index, row) {
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let conId = {
            plat:'shopee',
            id: row._id
          };
          wishRuleDelete(conId).then(res => {
            if (res.data.message == "success") {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getDataEbay();
            }
          });
        })
        .catch(() => {});
    },
    delArtRx(index, row) {
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let conId = {
            id: row._id
          };
          ebaySaveRuleDeleteHot(conId).then(res => {
            if (res.data.message == "success") {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getDataEbay();
            }
          });
        })
        .catch(() => {});
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "color:#337ab7;background:#f5f7fa";
      } else {
        return "";
      }
    },
    handleClick(tab, event) {
      if (tab.name === "Wish") {
        this.corner = "Wish";
        this.show.wish = true;
      } else {
        this.show.wish = false;
      }
      if (tab.name === "Ebay") {
        this.corner = "Ebay";
        this.show.ebay = true;
        if (this.ebaydata.length == 0) {
          this.getDataEbay();
        }
      } else {
        this.show.ebay = false;
      }
      if (tab.name === "Joom") {
        this.corner = "Joom";
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
    getDataEbay() {
      this.listLoading = true;
      shopeeProductsRule().then(res => {
        this.ebaydata = res.data.data;
        for(var i=0;i<this.ebaydata.length;i++){
          this.ebaydata[i].country==1?this.ebaydata[i].country='马来西亚':this.ebaydata[i].country=='2'?this.ebaydata[i].country='印度尼西亚':this.ebaydata[i].country=='3'?this.ebaydata[i].country='泰国':this.ebaydata[i].country=='4'?this.ebaydata[i].country='菲律宾':this.ebaydata[i].country=='5'?this.ebaydata[i].country='台湾':this.ebaydata[i].country=='6'?this.ebaydata[i].country='新加坡':this.ebaydata[i].country='越南'
        }
        this.listLoading = false;
      });
    }
  },
  mounted() {
    this.getDataEbay();
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
  margin-top: 15px;
  background: #f8f8f8;
  padding: 6px 0;
  overflow: hidden;
  border-radius: 6px;
}
.ebayText {
  font-size: 14px;
  padding: 0 20px;
  display: block;
  float: left;
  cursor: pointer;
  margin-top: 5px;
}
.ebayactive {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: block;
  background: #fff;
  float: left;
  border: 1px solid #ccc;
  margin-top: 3px;
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
.colspan {
  display: block;
  text-align: center;
  line-height: 35px;
}
</style>
