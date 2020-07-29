<template>
  <section class="toolbar">
    <!--<el-tabs v-model="activeName"-->
    <!--type="card"-->
    <!--@tab-click="handleClick">-->
    <!--<el-tab-pane v-for="(item, index) in this.allMenu"-->
    <!--:label="item.name"-->
    <!--:name="item.name"-->
    <!--:key="index">-->
    <!--</el-tab-pane>-->
    <!--</el-tabs>-->    
    <el-col :span="24" style="padding:10px 0;padding-left:10px;">
      <el-input
        placeholder="SKU查询(逗号隔开)"
        v-model="plat.codeStr"
        class="none16001"
        style="width:240px;float: left"
        clearable
      ></el-input>
      <span class="exportAccount" @click="seachSku">查询</span>
      <el-select
        placeholder="--请选择账号--"
        clearable
        multiple
        collapse-tags
        v-model="joom"
        class="none16002"
        style="float: left;width:252px;margin-left:10px;"
      >
        <el-button plain type="info" @click="selectalld1">全选</el-button>
        <el-button plain type="info" @click="noselectd1">取消</el-button>
        <el-option v-for="(item, key) in joomArr" :key="item.key" :label="item" :value="item"></el-option>
      </el-select>
      <span class="exportAccount" @click="exportJoom">导出Joom模板</span>
      <el-select
        placeholder="--请选择账号--"
        clearable
        multiple
        collapse-tags
        v-model="vova"
        class="none16002"
        style="float: left;width:252px;margin-left:10px;"
      >
        <el-button plain type="info" @click="selectalld3">全选</el-button>
        <el-button plain type="info" @click="noselectd3">取消</el-button>
        <el-option v-for="(item, key) in vovaArr" :key="item.key" :label="item" :value="item"></el-option>
      </el-select>
      <span class="exportAccount" @click="exportVova">导出vova模板</span>
      <el-select
          placeholder="--所有账号--"
          clearable
          multiple
          collapse-tags
          v-model="accountNum"
          style="width: 16%;float: left;margin-left:10px"
          class="selee"
        >
          <el-button plain type="info" @click="selectalld2">全选</el-button>
          <el-button plain type="info" @click="noselectd2">取消</el-button>
          <el-option
            v-for="(item, key) in accountNumber"
            :key="item.key"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      <span class="exportAccount" @click="exportSmt">添加导出队列</span>
      <span class="exportAccountmy" @click="exportMymall" style="margin-left:10px;" :style="{'cursor':Loading?'wait':'pointer'}">导出mymall</span>
      <span class="exportAccountmy" @click="exportLazada" style="margin-left:10px;" :style="{'cursor':Loading?'wait':'pointer'}">导出lazada</span>
      <span class="exportAccountmy" @click="exportShopee" style="margin-left:10px;" :style="{'cursor':Loading?'wait':'pointer'}">导出shopee</span>
    </el-col>
    <el-col :span="24">
      <div class="posIndex">
        <span class="signPerfectWish" @click="keepPerfect('wish')">标记Wish完善</span>
        <span class="signPerfectEbay" @click="keepPerfect('ebay')">标记eBay完善</span>
        <span class="signPerfectJoom" @click="keepPerfect('joom')">标记Joom完善</span>
        <span class="signPerfectSmt" @click="keepPerfect('aliexpress')">标记Aliexpress完善</span>
        <span class="signPerfectTotal" @click="keepPerfect('total')">标记全部完善</span>
      </div>
    </el-col>
    <div class="infoTable">
      <!-- 平台信息列表 -->
      <el-table :data="platData" @selection-change="selsChange" :height="tableHeight"  v-loading="Loading">
        <el-table-column type="selection" fixed align="center" header-align="center"></el-table-column>
        <el-table-column type="index" fixed align="center" header-align="center"></el-table-column>
        <el-table-column label="操作" fixed header-align="center" width="70">
          <template slot-scope="scope">
            <el-tooltip content="查看">
              <i
                class="el-icon-view"
                @click="viewPlat(scope.$index, scope.row)"
                style="color: #409EFF;cursor:pointer;"
              ></i>
            </el-tooltip>
            <el-tooltip content="更新">
              <i
                @click="platEdit(scope.$index, scope.row)"
                class="el-icon-edit"
                style="color: #409EFF;cursor:pointer;margin-left: 15px"
              ></i>
            </el-tooltip>
            <!--<el-tooltip content="删除">-->
            <!--<i class="el-icon-delete"-->
            <!--style="color: #409EFF;cursor:pointer;"></i>-->
            <!--</el-tooltip>-->
          </template>
        </el-table-column>
        <el-table-column prop="picUrl" fixed label="主图" header-align="center" width="80">
          <template slot-scope="scope">
            <el-tooltip
              placement="right"
              :open-delay="10"
              class="exxHover"
              popper-class="page-login-toolTipClass"
            >
              <div slot="content">
                <img :src="scope.row.picUrl" style="width: 300px;height: 300px;" />
              </div>
              <img :src="scope.row.picUrl" style="width: 60px;height: 60px" />
            </el-tooltip>
            <!-- <img :src="scope.row.picUrl" style="width: 70px;height: 60px"> -->
          </template>
        </el-table-column>
        <el-table-column label="商品编码" fixed width="100" header-align="center">
          <el-table-column
            prop="goodsCode"
            fixed
            width="100"
            :render-header="renderHeaderPlat"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="对应销售" header-align="center">
          <el-table-column
            prop="mapPersons"
            :render-header="renderHeaderPlat"
            width="125"
            align="center"
          >
            <template slot-scope="scope">
              <a
                :class="!scope.row.mapPersons?'clasRed':''"
              >{{scope.row.mapPersons?scope.row.mapPersons:'未设置'}}</a>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="仓库" header-align="center">
          <el-table-column
            prop="storeName"
            :render-header="renderHeaderPlat"
            width="108"
            align="center"
          >
            <template slot-scope="scope">
              <a
                :class="!scope.row.storeName?'clasRed':''"
              >{{scope.row.storeName?scope.row.storeName:'未设置'}}</a>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="是否备货" header-align="center">
          <el-table-column
            prop="stockUp"
            :render-header="renderHeaderPlat"
            width="108"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="Wish待刊登" header-align="center">
          <el-table-column
            prop="wishPublish"
            :render-header="renderHeaderPlat"
            width="108"
            align="center"
          >
            <template slot-scope="scope">
              <a
                :class="!scope.row.wishPublish?'clasRed':''"
              >{{scope.row.wishPublish?scope.row.wishPublish:'未设置'}}</a>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="完成状况" header-align="center">
          <el-table-column prop="completeStatus" :render-header="renderHeaderPlat" width="123">
            <template slot-scope="scope">
              <a
                :class="!scope.row.completeStatus?'clasRed':''"
                style="text-align:center;display:block;width:100%;"
              >{{scope.row.completeStatus?scope.row.completeStatus:'未设置'}}</a>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="禁售平台" header-align="center">
          <el-table-column prop="dictionaryName" :render-header="renderHeaderPlat" width="160">
            <template slot-scope="scope">
              <a
                :class="!scope.row.dictionaryName?'clasRed':''"
                style="text-align:center;display:block;width:100%;"
              >{{scope.row.dictionaryName?scope.row.dictionaryName:'未设置'}}</a>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="商品名称" header-align="center">
          <el-table-column
            prop="goodsName"
            :render-header="renderHeaderPlat"
            width="140"
            align="center"
          >
            <template slot-scope="scope">
              <a
                :class="!scope.row.goodsName?'clasRed':''"
              >{{scope.row.goodsName?scope.row.goodsName:'未设置'}}</a>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="主类目" header-align="center">
          <el-table-column prop="cate" :render-header="renderHeaderPlat" width="120" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="子类目" header-align="center">
          <el-table-column
            prop="subCate"
            :render-header="renderHeaderPlat"
            width="120"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="供应商名称" header-align="center">
          <el-table-column
            prop="supplierName"
            :render-header="renderHeaderPlat"
            width="150"
            align="center"
          >
            <template slot-scope="scope">
              <a
                :class="!scope.row.supplierName?'clasRed':''"
              >{{scope.row.supplierName?scope.row.supplierName:'未设置'}}</a>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="推荐人" header-align="center">
          <el-table-column
            prop="introducer"
            :render-header="renderHeaderPlat"
            width="110"
            align="center"
          >
            <template slot-scope="scope">
              <a
                :class="!scope.row.introducer?'clasRed':''"
              >{{scope.row.introducer?scope.row.introducer:'未设置'}}</a>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="开发员" header-align="center">
          <el-table-column
            prop="developer"
            :render-header="renderHeaderPlat"
            width="110"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="采购" header-align="center">
          <el-table-column
            prop="purchaser"
            :render-header="renderHeaderPlat"
            width="110"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="美工" header-align="center">
          <el-table-column
            prop="possessMan1"
            :render-header="renderHeaderPlat"
            width="110"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="是否采集数据" header-align="center">
          <el-table-column prop :render-header="renderHeaderPlat" width="108" align="center">
            <template slot-scope="scope">
              <a>{{scope.row.mid >1?'采集':'非采集'}}</a>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="开发时间" header-align="center">
          <el-table-column
            prop="devDatetime"
            :render-header="renderHeaderPlat"
            width="160"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="更新时间" header-align="center">
          <el-table-column
            prop="updateTime"
            :render-header="renderHeaderPlat"
            width="160"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="是否多属性" header-align="center">
          <el-table-column
            prop="isVar"
            :render-header="renderHeaderPlat"
            width="108"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="商品状态" header-align="center">
          <el-table-column
            prop="goodsStatus"
            :render-header="renderHeaderPlat"
            width="120"
            align="center"
          >
            <template slot-scope="scope">
              <a
                :class="!scope.row.goodsStatus?'clasRed':''"
              >{{scope.row.goodsStatus?scope.row.goodsStatus:'未设置'}}</a>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="采购到货天数" header-align="center">
          <el-table-column
            prop="stockDays"
            :render-header="renderHeaderPlat"
            width="110"
            align="center"
          >
            <template slot-scope="scope">
              <a
                :class="!scope.row.stockDays?'clasRed':''"
              >{{scope.row.stockDays?scope.row.stockDays:'未设置'}}</a>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
      <!-- 平台信息查看对话框 -->
      <el-dialog title="查看" :visible.sync="dialogPlat" width="70%">
        <el-form
          label-position="left"
          label-width="110px"
          ref="platForm"
          style="width: 100%;overflow: hidden"
        >
          <el-form-item label="供应商链接1" prop class="item">
            <span>
              <a
                :href="oaGoodsPlat.vendor1"
                target="_blank"
                class="classa"
              >{{oaGoodsPlat.vendor1?oaGoodsPlat.vendor1:'未设置'}}</a>
            </span>
          </el-form-item>
          <el-form-item label="供应商链接2" prop class="item">
            <span>
              <a
                :href="oaGoodsPlat.vendor2"
                target="_blank"
                class="classa"
              >{{oaGoodsPlat.vendor2?oaGoodsPlat.vendor2:'未设置'}}</a>
            </span>
          </el-form-item>
          <el-form-item label="供应商链接3" prop class="item">
            <span>
              <a
                :href="oaGoodsPlat.vendor3"
                target="_blank"
                class="classa"
              >{{oaGoodsPlat.vendor3?oaGoodsPlat.vendor3:'未设置'}}</a>
            </span>
          </el-form-item>
          <el-form-item label="平台参考链接1" prop class="item">
            <span>
              <a
                :href="oaGoodsPlat.origin1"
                target="_blank"
                class="classa"
              >{{oaGoodsPlat.origin1?oaGoodsPlat.origin1:'未设置'}}</a>
            </span>
          </el-form-item>
          <el-form-item label="平台参考链接2" prop class="item">
            <span>
              <a
                :href="oaGoodsPlat.origin2"
                target="_blank"
                class="classa"
              >{{oaGoodsPlat.origin2?oaGoodsPlat.origin2:'未设置'}}</a>
            </span>
          </el-form-item>
          <el-form-item label="平台参考链接3" prop class="item">
            <span>
              <a
                :href="oaGoodsPlat.origin3"
                target="_blank"
                class="classa"
              >{{oaGoodsPlat.origin3?oaGoodsPlat.origin3:'未设置'}}</a>
            </span>
          </el-form-item>
          <el-form-item label="是否液体" prop="IsLiquid" class="item">
            <span>{{goodsInfoPlat.isLiquid?goodsInfoPlat.isLiquid:'未设置'}}</span>
          </el-form-item>
          <el-form-item label="是否粉末" prop="IsPowder" class="item">
            <span>{{goodsInfoPlat.isPowder?goodsInfoPlat.isPowder:'未设置'}}</span>
          </el-form-item>
          <el-form-item label="是否带磁" prop="isMagnetism" class="item">
            <span>{{goodsInfoPlat.isMagnetism?goodsInfoPlat.isMagnetism:'未设置'}}</span>
          </el-form-item>
          <el-form-item label="是否带电" prop="IsCharged" class="item">
            <span>{{goodsInfoPlat.isCharged?goodsInfoPlat.isCharged:'未设置'}}</span>
          </el-form-item>
          <el-form-item label="描述" prop="description" class="item">
            <span>{{goodsInfoPlat.description?goodsInfoPlat.description:'未设置'}}</span>
          </el-form-item>
          <el-form-item label="商品名称" prop="GoodsName" class="item">
            <span>{{goodsInfoPlat.goodsName?goodsInfoPlat.goodsName:'未设置'}}</span>
          </el-form-item>
          <el-form-item label="中文申报名" prop="AliasCnName" class="item">
            <span>{{goodsInfoPlat.aliasCnName?goodsInfoPlat.aliasCnName:'未设置'}}</span>
          </el-form-item>
          <el-form-item label="英文申报名" prop="AliasEnName" class="item">
            <span>{{goodsInfoPlat.aliasEnName?goodsInfoPlat.aliasEnName:'未设置'}}</span>
          </el-form-item>
          <el-form-item label="Pack Name" prop class="item">
            <span>{{goodsInfoPlat.packName?goodsInfoPlat.packName:'未设置'}}</span>
          </el-form-item>
          <el-form-item label="季节" prop="Season" class="item">
            <span>{{goodsInfoPlat.season?goodsInfoPlat.season:'未设置'}}</span>
          </el-form-item>
          <el-form-item label="禁售平台" prop="dictionaryName" class="item">
            <span>{{goodsInfoPlat.dictionaryName?goodsInfoPlat.dictionaryName:'未设置'}}</span>
          </el-form-item>
          <el-form-item label="供应商名称" prop="supplierName" class="item">
            <span>{{goodsInfoPlat.supplierName?goodsInfoPlat.supplierName:'未设置'}}</span>
          </el-form-item>
          <el-form-item label="仓库" prop="StoreName" class="item">
            <span>{{goodsInfoPlat.storeName?goodsInfoPlat.storeName:'未设置'}}</span>
          </el-form-item>
          <el-form-item label="采购" prop="purchaser" class="item">
            <span>{{goodsInfoPlat.purchaser?goodsInfoPlat.purchaser:'未设置'}}</span>
          </el-form-item>
          <el-form-item label="美工" prop="possessMan1" class="item">
            <span>{{goodsInfoPlat.possessMan1?goodsInfoPlat.possessMan1:'未设置'}}</span>
          </el-form-item>
          <el-form-item label="责任人2" prop="possessMan2" class="item">
            <span>{{goodsInfoPlat.possessMan2?goodsInfoPlat.possessMan2:'未设置'}}</span>
          </el-form-item>
          <el-form-item label="声明价" prop="declaredValue" class="item">
            <span>{{goodsInfoPlat.declaredValue?goodsInfoPlat.declaredValue:'未设置'}}</span>
          </el-form-item>
          <el-form-item label="图片" prop="picUrl" class="item">
            <span>
              <a
                :href="goodsInfoPlat.picUrl"
                target="_blank"
                class="classa"
              >{{goodsInfoPlat.picUrl?goodsInfoPlat.picUrl:'未设置'}}</a>
            </span>
          </el-form-item>
          <el-form-item label="Goodsid" prop="goodsid" class="item">
            <span>{{goodsInfoPlat.goodsId?goodsInfoPlat.goodsId:'未设置'}}</span>
          </el-form-item>
          <el-form-item label="商品编码" prop="goodsCode" class="item">
            <span>{{goodsInfoPlat.goodsCode?goodsInfoPlat.goodsCode:'未设置'}}</span>
          </el-form-item>
          <el-form-item label="是否备货" prop="stockUp" class="item">
            <span>{{goodsInfoPlat.stockUp?goodsInfoPlat.stockUp:'未设置'}}</span>
          </el-form-item>
          <el-form-item label="Achieve Status" prop="achieveStatus" class="item">
            <span>{{goodsInfoPlat.achieveStatus?goodsInfoPlat.achieveStatus:'未设置'}}</span>
          </el-form-item>
          <el-form-item label="开发时间" prop="devDatetime" class="item">
            <span>{{goodsInfoPlat.devDatetime?goodsInfoPlat.devDatetime:'未设置'}}</span>
          </el-form-item>
          <el-form-item label="开发员" prop="developer" class="item">
            <span>{{goodsInfoPlat.developer?goodsInfoPlat.developer:'未设置'}}</span>
          </el-form-item>
          <el-form-item label="更新时间" prop="updateTime" class="item">
            <span>{{goodsInfoPlat.updateTime}}</span>
          </el-form-item>
          <el-form-item label="图片状态" prop="picStatus" class="item">
            <span>{{goodsInfoPlat.picStatus?goodsInfoPlat.picStatus:'未设置'}}</span>
          </el-form-item>
          <el-form-item label="供应商ID" prop="supplierID" class="item">
            <span>{{goodsInfoPlat.supplierID?goodsInfoPlat.supplierID:'未设置'}}</span>
          </el-form-item>
          <el-form-item label="仓库ID" prop="storeID" class="item">
            <span>{{goodsInfoPlat.storeID?goodsInfoPlat.storeID:'未设置'}}</span>
          </el-form-item>
          <el-form-item label="特殊属性名" prop class="item">
            <span>{{goodsInfoPlat.attributeName?goodsInfoPlat.attributeName:'未设置'}}</span>
          </el-form-item>
          <el-form-item label="Bgoodsid" prop="bgoodsid" class="item">
            <span>{{goodsInfoPlat.bgoodsId?goodsInfoPlat.bgoodsId:'未设置'}}</span>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-pagination
        background
        @size-change="handleSizeChangePlat"
        @current-change="handleCurrentChangePlat"
        :current-page="this.plat.page"
        :page-sizes="[10, 20, 40,100,200]"
        :page-size="this.plat.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.totalPlat"
      ></el-pagination>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
import goodsInfoPicture from "./goodsInfoPicture.vue";
import goodsInfoPlatform from "./goodsInfoPlatform.vue";
import {
  APIGoodsInfo,
  APIPictureList,
  APIPlatList,
  APIAttribute,
  APIAttributeInfo,
  APIFinishAttribute,
  APIGenerateCode,
  APIPlat,
  APIJoomName,
  APIDeleteVariant,
  APIPicturePreview,
  APIFinishPicture,
  APIPlatExportJoom,
  APIPlatExportVova,
  APIFinishPlat,
  APIVovaName,
  getPlatSmtAccount,
  getPlatSmtCategory,
  APIPlatExportSmt,
  APIPlatExportMymall,
  APIPlatExportLazada,
  APIPlatExportShopee,
} from "../../api/product";
import {
  getAttributeInfoStoreName,
  getAttributeInfoCat,
  getPlatGoodsStatus,
  getPlatCompletedPlat,
  getForbidPlat
} from "../../api/profit";
import { getMenu } from "../../api/login";
export default {
  data() {
    return {
      Loading:false,
      defaultPropsApp: {
        children: "children",
        label: "name",
        value:'id'
      },
      category:[],      
      options:[],
      accountNum:[],
      accountNumber:[],
      tableHeight: window.innerHeight - 195,
      dialogVisible: false,
      dialogPicture: false,
      dialogPlat: false,
      total: null,
      totalPic: null,
      totalPlat: null,
      violation: [],
      vovaArr: [],
      vova: null,
      activeName: "属性信息",
      sels: [],
      time1: "",
      time2: "",
      joom: null,
      allMenu: [],
      joomArr: [],
      joomName: "",
      repertory: [],
      productState: [],
      mainCategory: [],
      perfectPlatform: [],
      goodsState: [],
      goodsInfo: [],
      oaGoods: [],
      goodsInfoPlat: [],
      oaGoodsPlat: [],
      goodsInfoPic: [],
      oaGoodsPic: [],
      tableData: [],
      picId: {
        id: null
      },
      pictureData: [],
      platData: [],
      show: {
        status: true,
        picture: false,
        plat: false
      },
      condition: {
        pageSize: 10,
        page: 1,
        goodsCode: "",
        achieveStatus: "",
        goodsName: "",
        developer: "",
        devDatetime: [],
        updateTime: [],
        aliasCnName: "",
        aliasEnName: "",
        stockUp: "",
        isLiquid: "",
        isPowder: "",
        isMagnetism: "",
        isCharged: "",
        isVar: ""
      },
      picture: {
        pageSize: 10,
        page: 1,
        goodsCode: "",
        achieveStatus: "",
        goodsName: "",
        developer: "",
        devDatetime: [],
        updateTime: [],
        aliasCnName: "",
        aliasEnName: "",
        stockUp: "",
        isLiquid: "",
        isPowder: "",
        isMagnetism: "",
        isCharged: "",
        isVar: "",
        origin1: "",
        origin2: null,
        origin3: "",
        vendor1: "",
        vendor2: "",
        vendor3: null
      },
      plat: {
        picUrl: null,
        goodsCode: null,
        possessMan: null,
        storeName: null,
        stockUp: null,
        wishPublish: null,
        completeStatus: null,
        goodsName: null,
        cate: null,
        subCate: null,
        supplierName: null,
        introducer: null,
        developer: null,
        purchaser: null,
        possessMan1: null,
        mid: null,
        dictionaryName: null,
        devDatetime: [],
        updateTime: [],
        isVar: null,
        goodsStatus: null,
        stockDays: null,
        codeStr:null,
        pageSize: 10,
        page: 1
      },
      viewForm: {
        id: null
      },
      picForm: {
        id: null
      },
      platForm: {
        id: null
      },
      finish: {
        id: []
      }
    };
  },
  filters: {
    cutOut: function(value) {
      if (!value) return "";
      value = value.substring(0, 21);
      return value;
    }
  },
  methods: {
    exportMymall(){
      if(this.sels.length!=0){
        if(!this.Loading){
          this.Loading = true
          const mymallAry = []
          for (let i = 0; i < this.sels.length; i++) {
            mymallAry.push(this.sels[i].id);
          }
          let objStr = {
            id: mymallAry
          };
          APIPlatExportMymall(objStr).then(res => {
            this.Loading = false
            const blob = new Blob([res.data], {
              type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
            });
            var file = res.headers["content-disposition"].split(";")[1].split("filename=")[1];
            var filename=JSON.parse(file)
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
        }else{
          this.$message.error('请勿重复点击');
        }
      }else{
        this.$message.error('请选择产品');
      }
    },
    exportShopee(){
      if(this.sels.length!=0){
        if(!this.Loading){
          this.Loading = true
          const mymallAry = []
          for (let i = 0; i < this.sels.length; i++) {
            mymallAry.push(this.sels[i].id);
          }
          let objStr = {
            id: mymallAry
          };
          APIPlatExportShopee(objStr).then(res => {
            this.Loading = false
            if(res.headers["content-disposition"]){
              var file = res.headers["content-disposition"].split(";")[1].split("filename=")[1];
              var filename=JSON.parse(file)
              const blob = new Blob([res.data], {
                type:
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
              });
              const downloadElement = document.createElement("a");
              const objectUrl = window.URL.createObjectURL(blob);
              downloadElement.href = objectUrl;
              // const filename =
              //   "Wish_" + year + month + strDate + hour + minute + second;
              downloadElement.download = filename;
              document.body.appendChild(downloadElement);
              downloadElement.click();
              document.body.removeChild(downloadElement);
            }else{
              const that = this
              const blob = new Blob([res.data], {
                type:
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
              });
              var reader = new FileReader();
              reader.readAsText(blob, 'utf-8');
              reader.onload = function (e) {
                const title = JSON.parse(reader.result)
                that.$message.error(title.message);
              }
            }
          });
        }else{
          this.$message.error('请勿重复点击');
        }
      }else{
        this.$message.error('请选择产品');
      }
    },    
    exportLazada(){
      if(this.sels.length!=0){
        if(!this.Loading){
          this.Loading = true
          const mymallAry = []
          for (let i = 0; i < this.sels.length; i++) {
            mymallAry.push(this.sels[i].id);
          }
          let objStr = {
            id: mymallAry
          };
          APIPlatExportLazada(objStr).then(res => {
            this.Loading = false
            if(res.headers["content-disposition"]){
              var file = res.headers["content-disposition"].split(";")[1].split("filename=")[1];
              var filename=JSON.parse(file)
              const blob = new Blob([res.data], {
                type:
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
              });
              const downloadElement = document.createElement("a");
              const objectUrl = window.URL.createObjectURL(blob);
              downloadElement.href = objectUrl;
              // const filename =
              //   "Wish_" + year + month + strDate + hour + minute + second;
              downloadElement.download = filename;
              document.body.appendChild(downloadElement);
              downloadElement.click();
              document.body.removeChild(downloadElement);
            }else{
              const that = this
              const blob = new Blob([res.data], {
                type:
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
              });
              var reader = new FileReader();
              reader.readAsText(blob, 'utf-8');
              reader.onload = function (e) {
                const title = JSON.parse(reader.result)
                that.$message.error(title.message);
              }
            }
          });
        }else{
          this.$message.error('请勿重复点击');
        }
      }else{
        this.$message.error('请选择产品');
      }
    },    
    exportSmt() {
      if(this.accountNum.length!=0 && this.sels.length!=0){
        let smtAry = [];
        for (let i = 0; i < this.sels.length; i++) {
          smtAry.push(this.sels[i].id);
        }
        let objStr = {
          ids:smtAry,
          suffix:this.accountNum
          // category: this.category[this.category.length-1]
        };
        APIPlatExportSmt(objStr).then(res => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success', 
              dangerouslyUseHTMLString: true,
              message: res.data.data
            });
            this.getPlat();
          } else {
            this.$message.error(res.data.message);
          }
        });
      }else{
        this.$message.error('请账号或者产品');
      }
    },    
    selectalld2() {
      var ard1 = [];
      for (const item in this.accountNumber) {
        ard1.push(this.accountNumber[item]);
      }
      this.accountNum = ard1;
    },
    noselectd2() {
      this.accountNum = [];
    },    
    seachSku(){
      this.getPlat();
    },
    selectalld3() {
      var ard1 = [];
      for (const item in this.vovaArr) {
        ard1.push(this.vovaArr[item]);
      }
      this.vova = ard1;
    },
    noselectd3() {
      this.vova = [];
    },
    //            handleClick(tab, event) {
    //                if (tab.label === '属性信息') {
    //                    sessionStorage.setItem('judge', "属性信息")
    //                    this.show['status'] = true
    //                    this.getData()
    //                } else {
    //                    this.show['status'] = false
    //                }
    //                if (tab.label === '图片信息') {
    //                    sessionStorage.setItem('judge', "图片信息")
    //                    this.show['picture'] = true
    //                    this.getPic()
    //                } else {
    //                    this.show['picture'] = false
    //                }
    //                if (tab.label === '平台信息') {
    //                    sessionStorage.setItem('judge', "平台信息")
    //                    this.show['plat'] = true
    //                    this.getPlat()
    //                    getAttributeInfoStoreName().then(response => {
    //                        this.repertory =  response.data.data
    //                    })
    //                    getAttributeInfoCat().then(response => {
    //                        this.mainCategory =  response.data.data
    //                    })
    //                    getPlatGoodsStatus().then(response => {
    //                        this.goodsState =  response.data.data
    //                    })
    //                    getPlatCompletedPlat().then(response => {
    //                        this.perfectPlatform =  response.data.data
    //                    })
    //                } else {
    //                    this.show['plat'] = false
    //                }
    //            },
    //属性信息分页
    exportJoom() {
      if (this.joom.length != 0) {
        let joomAry = [];
        for (let i = 0; i < this.sels.length; i++) {
          joomAry.push(this.sels[i].goodsCode);
        }
        if (this.joomName.length > 0 && this.joomName.indexOf("，") > -1) {
          let joomId = this.joomName.split("，");
          for (let k = 0; k < joomId.length; k++) {
            joomAry.push(joomId[k]);
          }
        } else if (
          this.joomName.length > 0 &&
          this.joomName.indexOf(",") > -1
        ) {
          let joomNum = this.joomName.split(",");
          for (let j = 0; j < joomNum.length; j++) {
            joomAry.push(joomNum[j]);
          }
        } else {
          joomAry.push(this.joomName);
        }
        if (joomAry.length == 0 || joomAry[0] == "") {
          this.$message.error("请选择产品或填写商品编号");
        } else {
          for (let n = 0; n < joomAry.length; n++) {
            if (joomAry[n] == "") {
              joomAry.splice(n, 1);
            }
          }
          var joomAcount = this.joom;
          for (var i = 0; i < joomAcount.length; i++) {
            let objStr1 = {
              id: joomAry,
              account: [joomAcount[i]]
            };
            APIPlatExportJoom(objStr1).then(res => {
              const blob = new Blob([res.data], {
                type: "data:text/csv;charset=utf-8"
              });
              var file = res.headers["content-disposition"]
                .split(";")[1]
                .split("filename=")[1];
              var filename = JSON.parse(file);
              const downloadElement = document.createElement("a");
              const objectUrl = window.URL.createObjectURL(blob);
              downloadElement.href = objectUrl;
              // const filename =
              //   "joom_" + year + month + strDate + hour + minute + second;
              downloadElement.download = filename;
              document.body.appendChild(downloadElement);
              downloadElement.click();
              document.body.removeChild(downloadElement);
            });
          }
        }
      } else {
        this.$message.error("未选择账号");
      }
    },
    exportVova() {
      let vovaAry = [];
      for (let i = 0; i < this.sels.length; i++) {
        vovaAry.push(this.sels[i].id);
      }
      if (vovaAry.length != 0) {
        let objStr = {};
        if (this.vova != "") {
          var strObj = this.vova;
          for (var i = 0; i < strObj.length; i++) {
            objStr = {
              id: vovaAry,
              account: [strObj[i]]
            };
            APIPlatExportVova(objStr).then(res => {
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
          }
        } else {
          var strObj = this.vovaArr;
          for (var i = 0; i < strObj.length; i++) {
            objStr = {
              id: vovaAry,
              account: [strObj[i]]
            };
            APIPlatExportVova(objStr).then(res => {
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
          }
        }
      } else {
        let objStr = {};
        let joomAry = [];
        if (this.joomName.length != 0) {
          if (this.joomName.length > 0 && this.joomName.indexOf("，") > -1) {
            let joomId = this.joomName.split("，");
            for (let k = 0; k < joomId.length; k++) {
              joomAry.push(joomId[k]);
            }
          } else if (
            this.joomName.length > 0 &&
            this.joomName.indexOf(",") > -1
          ) {
            let joomNum = this.joomName.split(",");
            for (let j = 0; j < joomNum.length; j++) {
              joomAry.push(joomNum[j]);
            }
          } else {
            joomAry.push(this.joomName);
          }
          if (this.vova != "") {
            var strObj = this.vova;
            for (var i = 0; i < strObj.length; i++) {
              objStr = {
                id: joomAry,
                account: [strObj[i]]
              };
              APIPlatExportVova(objStr).then(res => {
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
            }
          } else {
            var strObj = this.vovaArr;
            for (var i = 0; i < strObj.length; i++) {
              objStr = {
                id: joomAry,
                account: [strObj[i]]
              };
              APIPlatExportVova(objStr).then(res => {
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
            }
          }
        } else {
          this.$message.error("请选择产品或填写商品编码");
        }
      }
    },
    selectalld1() {
      var ard1 = [];
      for (const item in this.joomArr) {
        ard1.push(this.joomArr[item]);
      }
      this.joom = ard1;
    },
    noselectd1() {
      this.joom = [];
    },
    handleCurrentChange(val) {
      this.condition.page = val;
      this.getData();
    },
    handleSizeChange(val) {
      this.condition.pageSize = val;
      this.getData();
    },
    //属性信息查看
    view(index, row) {
      this.dialogVisible = true;
      this.viewForm.id = row.id;
      APIAttributeInfo(this.viewForm).then(res => {
        //        this.viewForm = res.data.data
        this.goodsInfo = res.data.data.basicInfo.goodsInfo;
        this.oaGoods = res.data.data.basicInfo.oaGoods;
      });
    },
    //标记
    mark(index, row) {
      this.finish.id = row.id;
      APIFinishAttribute(this.finish).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: "标记成功",
            type: "success"
          });
          this.getData();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //批量标记
    markAll() {
      this.finish.id = this.sels.map(e => e.id);
      APIFinishAttribute(this.finish).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: "标记成功",
            type: "success"
          });
          this.getData();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //导入普源
    passAll() {},
    //生成编码
    codeAll() {
      if (this.sels) {
        let data = {
          id: this.sels.map(e => e.id)[0]
        };
        APIGenerateCode(data).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: "生成成功",
              type: "success"
            });
            for (let i = 0; i < this.tableData.length; i++) {
              if (this.tableData[i].id === data.id) {
                this.tableData[i].GoodsCode = res.data.data[0];
              }
            }
          }
        });
      }
    },
    //单元格样式
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (row.isVar === "是" && columnIndex === 4) {
        return "color: red";
      }
    },
    //属性信息删除
    del(index, row) {
      let arrId = [];
      arrId.push(row.id);
      let aryId = {
        id: arrId
      };
      APIDeleteVariant(aryId).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.getData();
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    //属性信息全选
    selsChange(sels) {
      this.sels = sels;
    },
    //属性信息获取数据
    getData() {
      APIGoodsInfo(this.condition).then(res => {
        this.tableData = res.data.data.items;
        this.total = res.data.data._meta.totalCount;
        this.condition.pageSize = res.data.data._meta.perPage;
        this.condition.page = res.data.data._meta.currentPage;
      });
    },
    //属性信息表头input框
    renderHeader(h, { column, $index }) {
      if ($index === 0) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: "",
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.goodsCode = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      } else if ($index === 1) {
        let filters = [
          { text: "是", value: "是" },
          { text: "否", value: "否" }
        ];
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.condition.stockUp,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.condition.stockUp = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.filter();
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item.text,
                  label: item.value
                }
              });
            })
          ]
        );
      } else if ($index === 2) {
        let filters = [
          { text: "待处理", value: "待处理" },
          { text: "已完善", value: "已完善" },
          { text: "已导入", value: "已导入" }
        ];
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.condition.achieveStatus,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.condition.achieveStatus = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.filter();
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item.text,
                  label: item.value
                }
              });
            })
          ]
        );
      } else if ($index === 3) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.condition.goodsName,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.goodsName = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      } else if ($index === 4) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.condition.developer,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.developer = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      } else if ($index === 5) {
        return h("el-date-picker", {
          props: {
            value: this.time1,
            size: "mini",
            type: "daterange"
          },
          style: {
            width: "180px",
            padding: "2px"
          },
          on: {
            input: value => {
              this.time1 = value;
              this.$emit("input", value);
            },
            change: value => {
              this.filter();
            }
          }
        });
      } else if ($index === 6) {
        return h("el-date-picker", {
          props: {
            value: this.time2,
            size: "mini",
            type: "daterange"
          },
          style: {
            width: "180px",
            padding: "2px"
          },
          on: {
            input: value => {
              this.time2 = value;
              this.$emit("input", value);
            },
            change: value => {
              this.filter();
            }
          }
        });
      } else if ($index === 7) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.condition.aliasCnName,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.aliasCnName = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      } else if ($index === 8) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.condition.aliasEnName,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.aliasEnName = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      } else if ($index === 9) {
        let filters = [
          { text: "是", value: "是" },
          { text: "否", value: "否" }
        ];
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.condition.isLiquid,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.condition.isLiquid = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.filter();
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item.text,
                  label: item.value
                }
              });
            })
          ]
        );
      } else if ($index === 10) {
        let filters = [
          { text: "是", value: "是" },
          { text: "否", value: "否" }
        ];
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.condition.isPowder,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.condition.isPowder = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.filter();
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item.text,
                  label: item.value
                }
              });
            })
          ]
        );
      } else if ($index === 11) {
        let filters = [
          { text: "是", value: "是" },
          { text: "否", value: "否" }
        ];
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.condition.isMagnetism,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.condition.isMagnetism = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.filter();
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item.text,
                  label: item.value
                }
              });
            })
          ]
        );
      } else if ($index === 12) {
        let filters = [
          { text: "是", value: "是" },
          { text: "否", value: "否" }
        ];
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.condition.isCharged,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.condition.isCharged = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.filter();
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item.text,
                  label: item.value
                }
              });
            })
          ]
        );
      } else if ($index === 13) {
        let filters = [
          { text: "是", value: "是" },
          { text: "否", value: "否" }
        ];
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.condition.isVar,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.condition.isVar = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.filter();
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item.text,
                  label: item.value
                }
              });
            })
          ]
        );
      }
    },
    upte(index, row) {
      sessionStorage.setItem("judge", "属性信息");
      this.$router.push({
        path: `/${row.id}`
      });
    },
    formatTen(num) {
      return num > 9 ? num + "" : "0" + num;
    },
    formatDate(date) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();
      return year + "-" + this.formatTen(month) + "-" + this.formatTen(day);
    },
    filter() {
      if (this.time1 !== null && this.time1.length !== 0) {
        this.plat.devDatetime = [
          this.formatDate(this.time1[0]),
          this.formatDate(this.time1[1])
        ];
      } else {
        this.plat.devDatetime = [];
      }
      if (this.time2 !== null && this.time2.length !== 0) {
        this.plat.updateTime = [
          this.formatDate(this.time2[0]),
          this.formatDate(this.time2[1])
        ];
      } else {
        this.plat.updateTime = [];
      }
      this.getPlat();
    },
    //图片信息
    signPerfect(index, row) {
      let objSin = {
        id: row.id
      };
      APIFinishPicture(objSin).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: "成功",
            type: "success"
          });
          this.getPic();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    handleSizeChangePic(val) {
      this.picture.pageSize = val;
      this.getPic();
    },
    handleCurrentChangePic(val) {
      this.picture.page = val;
      this.getPic();
    },
    //图片信息查看
    viewPic(index, row) {
      this.dialogPicture = true;
      this.picId.id = row.id;
      APIPicturePreview(this.picId).then(res => {
        this.goodsInfoPic = res.data.data;
      });
    },
    picEdit(index, row) {
      sessionStorage.setItem("judge", "图片信息");
      this.$router.push({
        path: `/table/${row.id}`
      });
    },
    //图片信息获取数据
    getPic() {
      APIPictureList(this.picture).then(res => {
        this.pictureData = res.data.data.items;
        this.totalPic = res.data.data._meta.totalCount;
        this.picture.pageSize = res.data.data._meta.perPage;
        this.picture.page = res.data.data._meta.currentPage;
      });
    },
    //图片信息表头input框
    renderHeaderPic(h, { column, $index }) {
      if ($index === 0) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.picture.goodsCode,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.picture.goodsCode = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      } else if ($index === 1) {
        let filters = [
          { text: "是", value: "是" },
          { text: "否", value: "否" }
        ];
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.picture.stockUp,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.picture.stockUp = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.filter();
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item.text,
                  label: item.value
                }
              });
            })
          ]
        );
      } else if ($index === 2) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.picture.goodsName,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.picture.goodsName = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      } else if ($index === 3) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.picture.vendor1,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.picture.vendor1 = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      } else if ($index === 4) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.picture.vendor2,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.picture.vendor2 = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      } else if ($index === 5) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.picture.vendor3,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.picture.vendor3 = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      } else if ($index === 6) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.picture.origin1,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.picture.origin1 = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      } else if ($index === 7) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.picture.origin2,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.picture.origin2 = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      } else if ($index === 8) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.picture.origin3,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.picture.origin3 = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      } else if ($index === 9) {
        let filters = [
          { text: "待处理", value: "待处理" },
          { text: "已完善", value: "已完善" }
        ];
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.picture.picStatus,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.picture.picStatus = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.filter();
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item.text,
                  label: item.value
                }
              });
            })
          ]
        );
      } else if ($index === 10) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.picture.developer,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.picture.developer = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      } else if ($index === 11) {
        return h("el-date-picker", {
          props: {
            value: this.time1,
            size: "mini",
            type: "daterange"
          },
          style: {
            width: "180px",
            padding: "2px"
          },
          on: {
            input: value => {
              this.time1 = value;
              this.$emit("input", value);
            },
            change: value => {
              this.filter();
            }
          }
        });
      } else if ($index === 12) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.picture.possessMan1,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.picture.possessMan1 = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      } else if ($index === 13) {
        let filters = [
          { text: "是", value: "是" },
          { text: "否", value: "否" }
        ];
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.picture.isVar,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.picture.isVar = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.filter();
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item.text,
                  label: item.value
                }
              });
            })
          ]
        );
      }
    },
    //平台信息
    handleSizeChangePlat(val) {
      this.plat.pageSize = val;
      this.getPlat();
    },
    handleCurrentChangePlat(val) {
      this.plat.page = val;
      sessionStorage.setItem("sepage", val);
      this.getPlat();
    },
    //平台信息查看
    viewPlat(index, row) {
      this.dialogPlat = true;
      this.platForm.id = row.id;
      APIPlat(this.platForm).then(res => {
        this.goodsInfoPlat = res.data.data;
        if (this.goodsInfoPlat.oaGoods) {
          this.oaGoodsPlat = this.goodsInfoPlat.oaGoods;
        } else {
          this.oaGoodsPlat = [];
        }
      });
    },
    //平台信息更新
    platEdit(index, row) {
      sessionStorage.setItem("judge", "平台信息");
      let Logistics = this.$router.resolve({
        path: `/plat/${row.id}`
      });
      window.open(Logistics.href);
    },
    //完善
    keepPerfect(n) {
      if (this.sels.length != 0) {
        let dataObj = {
          id: null,
          plat: []
        };
        dataObj.id = this.sels.map(e => e.id);
        if (n == "wish") {
          dataObj.plat = ["wish"];
        } else if (n == "ebay") {
          dataObj.plat = ["ebay"];
        } else if (n == "joom") {
          dataObj.plat = ["joom"];
        }else if (n == "aliexpress") {
          dataObj.plat = ["aliexpress"];
        } else {
          dataObj.plat = ["wish", "ebay", "joom","aliexpress"];
        }
        APIFinishPlat(dataObj).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.getPlat();
          } else {
            this.$message.error(res.data.message);
          }
        });
      } else {
        this.$message.error("请选择产品");
      }
    },
    //平台信息获取数据
    getPlat() {
      APIPlatList(this.plat).then(res => {
        this.platData = res.data.data.items;
        for (let i = 0; i < this.platData.length; i++) {
          var strData = this.platData[i].picUrl;
          var replaceStr;
          var reg = /([\s\S]+)(.(jpg_)?\d{2}x\d+)([\s\S]+)/g;
          var result = reg.exec(strData);
          if (result) {
            if (result[1].charAt(result[1].length - 1) == ".") {
              result[1] = result[1].substring(0, result[1].length - 1);
            }
            replaceStr = result[1] + result[result.length - 1];
            this.platData[i].picUrl = replaceStr;
          }
        }
        this.totalPlat = res.data.data._meta.totalCount;
        this.plat.pageSize = res.data.data._meta.perPage;
        this.plat.page = res.data.data._meta.currentPage;
      });
    },
    renderHeaderPlat(h, { column, $index }) {
      if ($index === 0) {
        return h(
          "div",
          {
            style: {
              width:'100%',
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.plat.goodsCode,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.plat.goodsCode = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      } else if ($index === 1) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.plat.mapPersons,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.plat.mapPersons = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      } else if ($index === 2) {
        let filters = this.repertory;
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.plat.storeName,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.plat.storeName = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.filter();
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
      } else if ($index === 3) {
        let filters = [
          { text: "是", value: "是" },
          { text: "否", value: "否" }
        ];
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.plat.stockUp,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.plat.stockUp = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.filter();
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item.text,
                  label: item.value
                }
              });
            })
          ]
        );
      } else if ($index === 4) {
        let filters = [{ text: "Y", value: "Y" }, { text: "N", value: "N" }];
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.plat.wishPublish,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.plat.wishPublish = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.filter();
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item.text,
                  label: item.value
                }
              });
            })
          ]
        );
      } else if ($index === 5) {
        //                    let filters = [{ text: '未设置', value: '未设置' }, { text: 'eBay已完善', value: 'eBay已完善' }, { text: 'Wish已完善', value: 'Wish已完善' }, { text: 'Joom已完善', value: 'Joom已完善' }, { text: 'Wish已完善|eBay已完善', value: 'Wish已完善|eBay已完善' }, { text: 'Wish已完善|Joom已完善', value: 'Wish已完善|Joom已完善' }, { text: 'Joom已完善|eBay已完善', value: 'Joom已完善|eBay已完善'}, { text: 'Wish已完善|Joom已完善|eBay已完善', value: 'Wish已完善|Joom已完善|eBay已完善'}]
        let filters = this.perfectPlatform;
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.plat.completeStatus,
              size: "mini",
              multiple: true,
              collapseTags: true,
              clearable: true
            },
            on: {
              input: value => {
                this.plat.completeStatus = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.filter();
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
      } else if ($index === 6) {
        let filters = this.violation;
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.plat.dictionaryName,
              size: "mini",
              multiple: true,
              collapseTags: true,
              clearable: true
            },
            on: {
              input: value => {
                this.plat.dictionaryName = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.filter();
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
      } else if ($index === 7) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.plat.goodsName,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.plat.goodsName = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      } else if ($index === 8) {
        let filters = this.mainCategory;
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.plat.cate,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.plat.cate = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.filter();
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
      } else if ($index === 9) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.plat.subCate,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.plat.subCate = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      } else if ($index === 10) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.plat.supplierName,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.plat.supplierName = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      } else if ($index === 11) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.plat.introducer,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.plat.introducer = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      } else if ($index === 12) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.plat.developer,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.plat.developer = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      } else if ($index === 13) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.plat.purchaser,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.plat.purchaser = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      } else if ($index === 14) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.plat.possessMan1,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.plat.possessMan1 = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      } else if ($index === 15) {
        let filters = [
          { text: "是", value: "是" },
          { text: "否", value: "否" }
        ];
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.plat.mid,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.plat.mid = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.filter();
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item.text,
                  label: item.value
                }
              });
            })
          ]
        );
      } else if ($index === 16) {
        return h("el-date-picker", {
          props: {
            value: this.time1,
            size: "mini",
            type: "daterange"
          },
          style: {
            width: "145px",
            padding: "2px"
          },
          on: {
            input: value => {
              this.time1 = value;
              this.$emit("input", value);
            },
            change: value => {
              this.filter();
            }
          }
        });
      } else if ($index === 17) {
        return h("el-date-picker", {
          props: {
            value: this.time2,
            size: "mini",
            type: "daterange"
          },
          style: {
            width: "145px",
            padding: "2px"
          },
          on: {
            input: value => {
              this.time2 = value;
              this.$emit("input", value);
            },
            change: value => {
              this.filter();
            }
          }
        });
      } else if ($index === 18) {
        let filters = [
          { text: "是", value: "是" },
          { text: "否", value: "否" }
        ];
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.plat.isVar,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.plat.isVar = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.filter();
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item.text,
                  label: item.value
                }
              });
            })
          ]
        );
      } else if ($index === 19) {
        let filters = this.goodsState;
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.plat.goodsStatus,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.plat.goodsStatus = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.filter();
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
      } else if ($index === 20) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.plat.stockDays,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.plat.stockDays = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      }
    }
  },
  mounted() {
    getMenu().then(response => {
      const res = response.data.data;
      const menu = res.filter(e => e.name === "产品中心");
      let arr = menu[0].children;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].name == "产品资料") {
          this.allMenu = arr[i].tabs;
        }
      }
    });
    const seePage = sessionStorage.getItem("sepage");
    if (seePage) {
      this.plat.page = Number(seePage);
    }
    this.getPlat();
    //仓库
    getAttributeInfoStoreName().then(response => {
      this.repertory = response.data.data;
    });
    getAttributeInfoCat().then(response => {
      this.mainCategory = response.data.data;
    });
    getPlatGoodsStatus().then(response => {
      this.goodsState = response.data.data;
    });
    getPlatCompletedPlat().then(response => {
      this.perfectPlatform = response.data.data;
    });
    APIJoomName().then(response => {
      this.joomArr = response.data.data;
    });
    getForbidPlat().then(response => {
      this.violation = response.data.data;
    });
    APIVovaName().then(response => {
      this.vovaArr = response.data.data;
    });
    getPlatSmtAccount().then(response => {
      this.accountNumber=response.data.data
    });
    getPlatSmtCategory().then(response => {
      this.options=response.data.data
    });
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
.exportAccount {
  display: block;
  float: left;
  border: #dcdfe6 solid 1px;
  height: 38px;
  line-height: 38px;
  border-left: none;
  background: #fff;
  padding: 0 8px;
  font-size: 13px;
  cursor: pointer;
  background: linear-gradient(to bottom, #f5f7fa 0%, #f5f7fa 45%, #d4d4d4 100%);
}
.exportAccountmy {
  display: block;
  float: left;
  border: #dcdfe6 solid 1px;
  height: 38px;
  line-height: 38px;
  background: #fff;
  padding: 0 8px;
  font-size: 13px;
  cursor: pointer;
  background: linear-gradient(to bottom, #f5f7fa 0%, #f5f7fa 45%, #d4d4d4 100%);
}
.signPerfectWish {
  padding: 0 10px;
  display: block;
  float: left;
  line-height: 30px;
  background: #00c0ef;
  color: #fff;
  cursor: pointer;
  margin-left: 10px;
  border-radius: 5px;
}
.signPerfectEbay {
  padding: 0 10px;
  display: block;
  float: left;
  line-height: 30px;
  background: #367fa9;
  color: #fff;
  cursor: pointer;
  margin-left: 10px;
  border-radius: 5px;
}
.signPerfectJoom {
  padding: 0 10px;
  display: block;
  float: left;
  line-height: 30px;
  background: #008d4c;
  color: #fff;
  cursor: pointer;
  margin-left: 10px;
  border-radius: 5px;
}
.signPerfectSmt {
  padding: 0 10px;
  display: block;
  float: left;
  line-height: 30px;
  background: #d30101;
  color: #fff;
  cursor: pointer;
  margin-left: 10px;
  border-radius: 5px;
}
.signPerfectTotal {
  padding: 0 10px;
  display: block;
  float: left;
  line-height: 30px;
  background: #e08e0b;
  color: #fff;
  cursor: pointer;
  margin-left: 10px;
  border-radius: 5px;
}
.zoomInOt{
    zoom: 0.92;
}
@media (max-width: 1600px) {
  .none1600 {
    width: 120px !important;
  }
  .none16001 {
    width: 120px !important;
    margin-left: 5px !important;
  }
  .none16002 {
    width: 125px !important;
    margin-left: 5px !important;
  }
  .zoomInOt{
    zoom: 0.73;
  }
  .exportAccount {
    display: block;
    float: left;
    border: #dcdfe6 solid 1px;
    height: 38px;
    line-height: 38px;
    border-left: none;
    background: #fff;
    padding: 0 5px;
    font-size: 10px;
    cursor: pointer;
    background: linear-gradient(to bottom, #f5f7fa 0%, #f5f7fa 45%, #d4d4d4 100%);
  }
.exportAccountmy {
    display: block;
    float: left;
    border: #dcdfe6 solid 1px;
    height: 38px;
    line-height: 38px;
    background: #fff;
    padding: 0 5px;
    font-size: 10px;
    cursor: pointer;
    background: linear-gradient(to bottom, #f5f7fa 0%, #f5f7fa 45%, #d4d4d4 100%);
  }
}
.posIndex{
  position: absolute;
  right: 10px;
  top: 5px;
}
</style>