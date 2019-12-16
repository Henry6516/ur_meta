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
      <div v-show="show.wish">1</div>
      <div v-show="show.ebay">
        <div class="ebayCase">
          <el-button
            type="success"
            size="small"
            v-show="ebay.xp"
            @click="addEbayxpLogin()"
            style="margin-left:0.5%;float:left"
          >
            <i class="el-icon-plus"></i>添加wish规则
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
            <el-table-column label="操作" fixed header-align="center" align="center" width="75">
              <template slot-scope="scope">
                <el-tooltip content="更新">
                  <i
                    @click="editArt(scope.$index, scope.row)"
                    class="el-icon-edit"
                    style="color: #409EFF;cursor:pointer;"
                  ></i>
                </el-tooltip>
                <el-tooltip content="立即更新">
                  <i
                    @click="ljArt(scope.$index, scope.row)"
                    class="el-icon-star-on"
                    style="color: #409EFF;cursor:pointer;"
                  ></i>
                </el-tooltip>
                <el-tooltip content="删除">
                  <i
                    class="el-icon-delete"
                    style="color: #409EFF;cursor:pointer;"
                    @click="delArt(scope.$index, scope.row)"
                  ></i>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column property="ruleName" label="规则名称" align="center" width="100"></el-table-column>
            <el-table-column property="ruleMark" label="规则备注" align="center" width="100"></el-table-column>
            <el-table-column property="ruleType" label="规则类别" align="center" width="100">
              <template slot-scope="scope">
                {{scope.row.ruleType=='new'?'新品':'热销'}}
              </template>
            </el-table-column>
            <el-table-column property="pb" label="商品pb" align="center" width="80">
              <template slot-scope="scope">
                {{scope.row.pb=='1'?'有':scope.row.pb=='0'?'无':'不限'}}
              </template>
            </el-table-column>
            <el-table-column property="hwc" label="海外仓" align="center" width="80">
              <template slot-scope="scope">
                {{scope.row.hwc=='1'?'海外仓':scope.row.hwc=='0'?'非海外仓':'不限'}}
              </template>
            </el-table-column>
            <el-table-column property="verified" label="Wish认证" align="center" width="100">
              <template slot-scope="scope">
                {{scope.row.verified=='1'?'认证':scope.row.verified=='0'?'非认证':'不限'}}
              </template>
            </el-table-column>
            <el-table-column property="listedTime" label="上架时间" align="center" width="90"></el-table-column>
            <el-table-column property="maxNumBoughtStart" label="销量大于" align="center" width="80"></el-table-column>
            <el-table-column property="maxNumBoughtEnd" label="销量小于" align="center" width="80"></el-table-column>
            <el-table-column property="ratingStart" label="评分大于" align="center"></el-table-column>
            <el-table-column property="ratingEnd" label="评分小于" align="center"></el-table-column>
            <el-table-column property="totalpriceStart" label="价格大于" align="center" width="80"></el-table-column>
            <el-table-column property="totalpriceEnd" label="价格小于" align="center" width="80"></el-table-column>
            <el-table-column property="viewRate1Start" label="前7天Viewing均值大于" align="center" width="170"></el-table-column>
            <el-table-column property="viewRate1End" label="前7天Viewing均值小于" align="center" width="170"></el-table-column>
            <el-table-column property="intervalRatingStart" label="前30天新增评论数大于" align="center" width="170"></el-table-column>
            <el-table-column property="intervalRatingEnd" label="前30天新增评论数小于" align="center" width="170"></el-table-column>
          </el-table>
        </div>
        <div v-show="ebay.rx">
          <el-table
            :data="ebayRxdata"
            class="elTableee"
            border
            :height="tableHeightstock"
            :header-cell-style="getRowClass"
            style="width:98%;margin-left:0.7%;margin-top:15px;"
          >
            <el-table-column type="index" fixed align="center" width="40" header-align="center"></el-table-column>
            <el-table-column label="操作" fixed header-align="center" align="center" width="80">
              <template slot-scope="scope">
                <el-tooltip content="更新">
                  <i
                    @click="editArtRx(scope.$index, scope.row)"
                    class="el-icon-edit"
                    style="color: #409EFF;cursor:pointer;"
                  ></i>
                </el-tooltip>
                <el-tooltip content="立即更新">
                  <i
                    @click="ljArtRx(scope.$index, scope.row)"
                    class="el-icon-star-on"
                    style="color: #409EFF;cursor:pointer;"
                  ></i>
                </el-tooltip>
                <el-tooltip content="删除">
                  <i
                    class="el-icon-delete"
                    style="color: #409EFF;cursor:pointer;"
                    @click="delArtRx(scope.$index, scope.row)"
                  ></i>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column property="ruleName" label="规则名称" align="center" width="100"></el-table-column>
            <el-table-column property="ruleMark" label="规则备注" align="center" width="100"></el-table-column>
            <el-table-column property="publishedSite" label="刊登站点" align="center" width="180"></el-table-column>
            <el-table-column property="storeLocation" label="注册地址" align="center" width="100"></el-table-column>
            <el-table-column
              property="salesThreeDayFlag"
              label="连续三天有销量"
              align="center"
              width="120"
            >
              <template slot-scope="scope">{{scope.row.salesThreeDayFlag==0?'否':'是'}}</template>
            </el-table-column>
            <el-table-column property="isUsed" label="是否停用" align="center">
              <template slot-scope="scope">{{scope.row.isUsed==0?'停用':'在用'}}</template>
            </el-table-column>
            <el-table-column property="priceEnd" label="价格小于" align="center" width="100"></el-table-column>
            <el-table-column property="priceStart" label="价格大于" align="center" width="100"></el-table-column>
            <el-table-column property="soldEnd" label="销量小于" align="center" width="100"></el-table-column>
            <el-table-column property="soldStart" label="销量大于" align="center" width="100"></el-table-column>
            <el-table-column property="genTimeEnd" label="上架时间小于" align="center" width="110"></el-table-column>
            <el-table-column property="genTimeStart" label="上架时间大于" align="center" width="110"></el-table-column>
            <el-table-column
              property="soldThePreviousDayEnd"
              label="前一天销量小于"
              align="center"
              width="120"
            ></el-table-column>
            <el-table-column
              property="soldThePreviousDayStart"
              label="前一天销量大于"
              align="center"
              width="120"
            ></el-table-column>
            <el-table-column
              property="paymentThePreviousDayEnd"
              label="前一天销售额小于"
              align="center"
              width="140"
            ></el-table-column>
            <el-table-column
              property="paymentThePreviousDayStart"
              label="前一天销售额大于"
              align="center"
              width="140"
            ></el-table-column>
            <el-table-column
              property="soldThePreviousGrowthEnd"
              label="前一天销量增幅小于"
              align="center"
              width="150"
            ></el-table-column>
            <el-table-column
              property="soldThePreviousGrowthStart"
              label="前一天销量增幅大于"
              align="center"
              width="150"
            ></el-table-column>
            <el-table-column
              property="salesThreeDay1End"
              label="近三天销量小于"
              align="center"
              width="140"
            ></el-table-column>
            <el-table-column
              property="salesThreeDay1Start"
              label="近三天销量大于"
              align="center"
              width="140"
            ></el-table-column>
            <el-table-column
              property="paymentThreeDay1End"
              label="近三天销售额小于"
              align="center"
              width="140"
            ></el-table-column>
            <el-table-column
              property="paymentThreeDay1Start"
              label="近三天销售额大于"
              align="center"
              width="140"
            ></el-table-column>
            <el-table-column
              property="salesThreeDayGrowthEnd"
              label="近三天销量增幅小于"
              align="center"
              width="150"
            ></el-table-column>
            <el-table-column
              property="salesThreeDayGrowthStart"
              label="近三天销量增幅大于"
              align="center"
              width="150"
            ></el-table-column>
            <el-table-column property="creator" label="创建人" align="center" width="80"></el-table-column>
            <el-table-column property="createdDate" label="创建时间" align="center" width="100">
              <template slot-scope="scope">{{scope.row.createdDate | cutOutMonye}}</template>
            </el-table-column>
            <el-table-column property="updatedDate" label="更新时间" align="center" width="100">
              <template slot-scope="scope">{{scope.row.updatedDate | cutOutMonye}}</template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div v-show="show.joom">2</div>
      <el-dialog title="wish规则" :visible.sync="ebaydisLoginxp" width="75%" :close-on-click-modal="false">
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
                <p class="basp">规则类型</p>
              </el-col>
              <el-col :span="15">
                <el-select v-model="ebayXp.ruleType" placeholder="请选择" style="width:100%;" clearable>
                  <el-option
                    v-for="item in optionsType"
                    :key="item.value"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp">销量区间</p>
              </el-col>
              <el-col :span="7">
                <el-input v-model="ebayXp.maxNumBoughtStart" placeholder="大于"></el-input>
              </el-col>
              <el-col :span="1">
                <span class="colspan">-</span>
              </el-col>
              <el-col :span="7">
                <el-input v-model="ebayXp.maxNumBoughtEnd" placeholder="小于"></el-input>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp">评分</p>
              </el-col>
              <el-col :span="7">
                <el-input v-model="ebayXp.ratingStart" placeholder="大于"></el-input>
              </el-col>
              <el-col :span="1">
                <span class="colspan">-</span>
              </el-col>
              <el-col :span="7">
                <el-input v-model="ebayXp.ratingEnd" placeholder="小于"></el-input>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp">价格区间</p>
              </el-col>
              <el-col :span="7">
                <el-input v-model="ebayXp.totalpriceStart" placeholder="大于"></el-input>
              </el-col>
              <el-col :span="1">
                <span class="colspan">-</span>
              </el-col>
              <el-col :span="7">
                <el-input v-model="ebayXp.totalpriceEnd" placeholder="小于"></el-input>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp">上架时间</p>
              </el-col>
              <el-col :span="15">
               <el-select
                  style="width:100%"
                  multiple
                  filterable
                  collapse-tags
                  allow-create
                  default-first-option
                  v-model="ebayXp.listedTime"
                >
                  <el-button plain type="info" @click="selectalld3">全选</el-button>
                  <el-button plain type="info" @click="noselectd3">取消</el-button>
                  <el-option
                    v-for="(item, key) in ebayOptionsTime"
                    :key="item.key"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp">前7天Viewing均值</p>
              </el-col>
              <el-col :span="7">
                <el-input v-model="ebayXp.viewRate1Start" placeholder="大于"></el-input>
              </el-col>
              <el-col :span="1">
                <span class="colspan">-</span>
              </el-col>
              <el-col :span="7">
                <el-input v-model="ebayXp.viewRate1End" placeholder="小于"></el-input>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp">前30天新增评论数</p>
              </el-col>
              <el-col :span="7">
                <el-input v-model="ebayXp.intervalRatingStart" placeholder="大于"></el-input>
              </el-col>
              <el-col :span="1">
                <span class="colspan">-</span>
              </el-col>
              <el-col :span="7">
                <el-input v-model="ebayXp.intervalRatingEnd" placeholder="小于"></el-input>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp">商品pb</p>
              </el-col>
              <el-col :span="15">
                <el-select v-model="ebayXp.pb" placeholder="请选择" style="width:100%;" clearable>
                  <el-option
                    v-for="item in optionsPb"
                    :key="item.value"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp">海外仓</p>
              </el-col>
              <el-col :span="15">
                <el-select v-model="ebayXp.hwc" placeholder="请选择" style="width:100%;" clearable>
                  <el-option
                    v-for="item in optionsHwc"
                    :key="item.value"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp">Wish认证</p>
              </el-col>
              <el-col :span="15">
                <el-select v-model="ebayXp.verified" placeholder="请选择" style="width:100%;" clearable>
                  <el-option
                    v-for="item in optionsWish"
                    :key="item.value"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-col>
            </el-col>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="ebaydisLoginxp = false">取 消</el-button>
          <el-button type="primary" @click="saveEbayXp()">保 存</el-button>
        </div>
      </el-dialog>
      <el-dialog title="添加wish规则" :visible.sync="addEbaydisLoginxp" width="75%" :close-on-click-modal="false">
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
                <p class="basp">规则类型</p>
              </el-col>
              <el-col :span="15">
                <el-select v-model="addEbayXp.ruleType" placeholder="请选择" style="width:100%;" clearable>
                  <el-option
                    v-for="item in optionsType"
                    :key="item.value"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp">销量区间</p>
              </el-col>
              <el-col :span="7">
                <el-input v-model="addEbayXp.maxNumBoughtStart" placeholder="大于"></el-input>
              </el-col>
              <el-col :span="1">
                <span class="colspan">-</span>
              </el-col>
              <el-col :span="7">
                <el-input v-model="addEbayXp.maxNumBoughtEnd" placeholder="小于"></el-input>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp">评分</p>
              </el-col>
              <el-col :span="7">
                <el-input v-model="addEbayXp.ratingStart" placeholder="大于"></el-input>
              </el-col>
              <el-col :span="1">
                <span class="colspan">-</span>
              </el-col>
              <el-col :span="7">
                <el-input v-model="addEbayXp.ratingEnd" placeholder="小于"></el-input>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp">价格区间</p>
              </el-col>
              <el-col :span="7">
                <el-input v-model="addEbayXp.totalpriceStart" placeholder="大于"></el-input>
              </el-col>
              <el-col :span="1">
                <span class="colspan">-</span>
              </el-col>
              <el-col :span="7">
                <el-input v-model="addEbayXp.totalpriceEnd" placeholder="小于"></el-input>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp">上架时间</p>
              </el-col>
              <el-col :span="15">
               <el-select
                  style="width:100%"
                  multiple
                  filterable
                  collapse-tags
                  allow-create
                  default-first-option
                  v-model="addEbayXp.listedTime"
                >
                  <el-button plain type="info" @click="addselectalld3">全选</el-button>
                  <el-button plain type="info" @click="addnoselectd3">取消</el-button>
                  <el-option
                    v-for="(item, key) in ebayOptionsTime"
                    :key="item.key"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp">前7天Viewing均值</p>
              </el-col>
              <el-col :span="7">
                <el-input v-model="addEbayXp.viewRate1Start" placeholder="大于"></el-input>
              </el-col>
              <el-col :span="1">
                <span class="colspan">-</span>
              </el-col>
              <el-col :span="7">
                <el-input v-model="addEbayXp.viewRate1End" placeholder="小于"></el-input>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp">前30天新增评论数</p>
              </el-col>
              <el-col :span="7">
                <el-input v-model="addEbayXp.intervalRatingStart" placeholder="大于"></el-input>
              </el-col>
              <el-col :span="1">
                <span class="colspan">-</span>
              </el-col>
              <el-col :span="7">
                <el-input v-model="addEbayXp.intervalRatingEnd" placeholder="小于"></el-input>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp">商品pb</p>
              </el-col>
              <el-col :span="15">
                <el-select v-model="addEbayXp.pb" placeholder="请选择" style="width:100%;" clearable>
                  <el-option
                    v-for="item in optionsPb"
                    :key="item.value"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp">海外仓</p>
              </el-col>
              <el-col :span="15">
                <el-select v-model="addEbayXp.hwc" placeholder="请选择" style="width:100%;" clearable>
                  <el-option
                    v-for="item in optionsHwc"
                    :key="item.value"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-bottom: 20px">
              <el-col :span="9">
                <p class="basp">Wish认证</p>
              </el-col>
              <el-col :span="15">
                <el-select v-model="addEbayXp.verified" placeholder="请选择" style="width:100%;" clearable>
                  <el-option
                    v-for="item in optionsWish"
                    :key="item.value"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-col>
            </el-col>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addEbaydisLoginxp = false">取 消</el-button>
          <el-button type="primary" @click="addSaveEbayXp()">保 存</el-button>
        </div>
      </el-dialog>
    </div>
  </section>
</template>
<script type="text/ecmascript-6">
import {
  wishProductsRule,
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
      ebayStlye: 0,
      ebaydisLoginxp: false,
      ebaydisLoginrx: false,
      addEbaydisLoginxp: false,
      addEbaydisLoginrx: false,
      lodingTo: false,
      optionsType:['new','hot'],
      optionsPb:['有','无'],
      optionsHwc:['海外仓','非海外仓'],
      optionsWish:['认证','非认证'],
      ebayOptionsTime: ["今天", "昨天", "前天"],
      ebayXp: {
        id: "",
        ruleType: "",
        ruleMark: "",
        ruleName: "",
        genTimeStart:'',
        genTimeEnd:'',
        totalpriceStart:'',
        totalpriceEnd:'',
        viewRate1Start:'',
        listedTime:[],
        viewRate1End:'',
        intervalRatingStart:'',
        intervalRatingEnd:'',
        maxNumBoughtStart:'',
        maxNumBoughtEnd:'',
        ratingStart:'',
        ratingEnd:'',
        pb:'',
        hwc:'',
        verified:'',
      },
      addEbayXp: {
        ruleType: "",
        listedTime:[],
        ruleMark: "",
        ruleName: "",
        genTimeStart:'',
        genTimeEnd:'',
        totalpriceStart:'',
        totalpriceEnd:'',
        viewRate1Start:'',
        viewRate1End:'',
        intervalRatingStart:'',
        intervalRatingEnd:'',
        maxNumBoughtStart:'',
        maxNumBoughtEnd:'',
        ratingStart:'',
        ratingEnd:'',
        pb:'',
        hwc:'',
        verified:'',
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
      let conde = {
        ruleId: row._id
      };
      this.lodingTo = true;
      this.$message({
          message: '正在更新',
          type: 'warning'
      });
      ebayRunRuleHot(conde).then(res => {
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
      this.addEbayXpruleType= "";
      this.addEbayXpruleTypegenTimeStart='';
      this.addEbayXpruleTypegenTimeEnd='';
      this.addEbayXpruleTypetotalpriceStart='';
      this.addEbayXpruleTypetotalpriceEnd='';
      this.addEbayXpruleTypeviewRate1Start='';
      this.addEbayXpruleTypeviewRate1End='';
      this.addEbayXpruleTypeintervalRatingStart='';
      this.addEbayXpruleTypeintervalRatingEnd='';
      this.addEbayXpruleTypemaxNumBoughtStart='';
      this.addEbayXpruleTypemaxNumBoughtEnd='';
      this.addEbayXpruleTyperatingStart='';
      this.addEbayXpruleTyperatingEnd='';
      this.addEbayXpruleTypepb='';
      this.addEbayXpruleTypehwc='';
      this.addEbayXpruleTypeverified='';
      this.addEbayXp.ruleMark = "";
      this.addEbayXp.listedTime = [];
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
      this.ebayXp.genTimeStart = row.genTimeStart;
      this.ebayXp.genTimeEnd = row.genTimeEnd;
      this.ebayXp.totalpriceStart = row.totalpriceStart;
      this.ebayXp.totalpriceEnd = row.totalpriceEnd;
      this.ebayXp.viewRate1Start = row.viewRate1Start;
      this.ebayXp.viewRate1End = row.viewRate1End;
      this.ebayXp.intervalRatingStart = row.intervalRatingStart;
      this.ebayXp.intervalRatingEnd = row.intervalRatingEnd;
      this.ebayXp.maxNumBoughtStart = row.maxNumBoughtStart;
      this.ebayXp.maxNumBoughtEnd = row.maxNumBoughtEnd;
      this.ebayXp.ratingStart = row.ratingStart;
      this.ebayXp.ratingEnd = row.ratingEnd;
      this.ebayXp.pb = row.pb;
      this.ebayXp.hwc = row.hwc;
      this.ebayXp.verified = row.verified;
      this.ebayXp.ruleName = row.ruleName;
      this.ebayXp.ruleMark = row.ruleMark;
      this.ebayXp.ruleType = row.ruleType;
      this.ebayXp.listedTime = row.listedTime;
      this.ebayXp.pb == 0 ? this.ebayXp.pb = '无': this.ebayXp.pb == 1?this.ebayXp.pb = '有':this.ebayXp.pb='';
      this.ebayXp.hwc == 0? this.ebayXp.hwc = '非海外仓': this.ebayXp.hwc == 1?this.ebayXp.hwc = '海外仓':this.ebayXp.hwc='';
      this.ebayXp.verified == 0? this.ebayXp.verified = '非认证': this.ebayXp.verified == 1?this.ebayXp.verified = '认证':this.ebayXp.verified='';  
      for(let i=0;i<this.ebayXp.listedTime.length;i++){
        this.ebayXp.listedTime[i]=this.ebayXp.listedTime[i].replace(/,/g, "");
      }
      this.ebaydisLoginxp = true;
    },
    saveEbayXp() {
      for (let i = 0; i < this.ebayXp.listedTime.length; i++) {
          if (this.ebayXp.listedTime[i] == "今天") {
            this.ebayXp.listedTime[i] = 0;
          }
          if (this.ebayXp.listedTime[i] == "昨天") {
            this.ebayXp.listedTime[i] = 1;
          }
          if (this.ebayXp.listedTime[i] == "前天") {
            this.ebayXp.listedTime[i] = 2;
          }
      }
      this.ebayXp.pb == '无' ? this.ebayXp.pb = '0': this.ebayXp.pb == '有'?this.ebayXp.pb = '1':this.ebayXp.pb='';
      this.ebayXp.hwc == '非海外仓'? this.ebayXp.hwc = '0': this.ebayXp.hwc == '海外仓'?this.ebayXp.hwc = '1':this.ebayXp.hwc='';
      this.ebayXp.verified == '非认证'? this.ebayXp.verified = '0': this.ebayXp.verified == '认证'?this.ebayXp.verified = '1':this.ebayXp.verified='';  
      this.ebaydisLoginxp = true;
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
        for (let i = 0; i < this.addEbayXp.listedTime.length; i++) {
            if (this.addEbayXp.listedTime[i] == "今天") {
              this.addEbayXp.listedTime[i] = 0;
            }
            if (this.addEbayXp.listedTime[i] == "昨天") {
              this.addEbayXp.listedTime[i] = 1;
            }
            if (this.addEbayXp.listedTime[i] == "前天") {
              this.addEbayXp.listedTime[i] = 2;
            }
        }
        this.addEbayXp.pb == '无' ? this.addEbayXp.pb = '0': this.addEbayXp.pb == '有'?this.addEbayXp.pb = '1':this.addEbayXp.pb='';
        this.addEbayXp.hwc == '非海外仓'? this.addEbayXp.hwc = '0': this.addEbayXp.hwc == '海外仓'?this.addEbayXp.hwc = '1':this.addEbayXp.hwc='';
        this.addEbayXp.verified == '非认证'? this.addEbayXp.verified = '0': this.addEbayXp.verified == '认证'?this.addEbayXp.verified = '1':this.addEbayXp.verified=''; 
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
      wishProductsRule().then(res => {
        this.ebaydata = res.data.data;
        for (let i = 0; i < this.ebaydata.length; i++) {
          let date = this.ebaydata[i].listedTime;
          for (let k = 0; k < date.length; k++) {
              if (date[k] == "0") {
                date[k] = "今天,";
              }
              if (date[k] == "1") {
                date[k] = "昨天,";
              }
              if (date[k] == "2") {
                date[k] = "前天";
              }
          }
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
