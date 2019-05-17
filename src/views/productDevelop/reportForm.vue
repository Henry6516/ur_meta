<template>
  <section>
    <el-tabs
      v-model="activeName"
      type="card"
      @tab-click="handleClick"
      style="background-color:#fff"
    >
      <el-tab-pane
        v-for="(item, index) in this.allMenu"
        :label="item.name"
        :name="item.route"
        :key="index"
      ></el-tab-pane>
    </el-tabs>
    <div v-show="show.sale">
      <el-col :span="24" style="padding:10px 20px;">
        <el-button type="success" @click="markAll">批量标记推广完成</el-button>
      </el-col>
      <!-- 销售列表 -->
      <el-table :data="platData" @selection-change="selsChange" :height="tableHeight">
        <el-table-column type="selection" fixed align="center" header-align="center"></el-table-column>
        <el-table-column type="index" fixed align="center" header-align="center"></el-table-column>
        <el-table-column label="操作" fixed header-align="center" width="78">
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
                style="color: #409EFF;cursor:pointer;margin-left: 5px"
              ></i>
            </el-tooltip>
            <el-tooltip content="标记推广完成">
              <i
                class="el-icon-star-on"
                @click="mark(scope.$index,scope.row)"
                style="color: #409EFF;cursor:pointer;"
              ></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="picUrl" fixed label="主图" header-align="center" width="90">
          <template slot-scope="scope">
            <img :src="scope.row.picUrl" style="width: 70px;height: 60px">
          </template>
        </el-table-column>
        <el-table-column label="商品编码" header-align="center">
          <el-table-column
            prop="goodsCode"
            :render-header="renderHeaderPlat"
            width="150"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="推广状态" header-align="center">
          <el-table-column
            prop="extendStatus"
            :render-header="renderHeaderPlat"
            width="150"
            align="center"
          >
            <template slot-scope="scope">
              <a
                :class="scope.row.extendStatus=='未推广'?'clasRed1':'clasGreen1'"
              >{{scope.row.extendStatus}}</a>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="对应销售" header-align="center">
          <el-table-column
            prop="mapPersons"
            :render-header="renderHeaderPlat"
            width="150"
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
            width="150"
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
            width="150"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="Wish待刊登" header-align="center">
          <el-table-column
            prop="wishPublish"
            :render-header="renderHeaderPlat"
            width="150"
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
          <el-table-column prop="completeStatus" :render-header="renderHeaderPlat" width="180">
            <template slot-scope="scope">
              <a
                :class="!scope.row.completeStatus?'clasRed':''"
                style="text-align:center;display:block;width:100%;"
              >{{scope.row.completeStatus?scope.row.completeStatus:'未设置'}}</a>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="禁售平台" header-align="center">
          <el-table-column prop="dictionaryName" :render-header="renderHeaderPlat" width="220">
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
            width="150"
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
          <el-table-column prop="cate" :render-header="renderHeaderPlat" width="150" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="子类目" header-align="center">
          <el-table-column
            prop="subCate"
            :render-header="renderHeaderPlat"
            width="150"
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
            width="150"
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
            width="150"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="采购" header-align="center">
          <el-table-column
            prop="purchaser"
            :render-header="renderHeaderPlat"
            width="150"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="美工" header-align="center">
          <el-table-column
            prop="possessMan1"
            :render-header="renderHeaderPlat"
            width="150"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="是否采集数据" header-align="center">
          <el-table-column prop :render-header="renderHeaderPlat" width="150" align="center">
            <template slot-scope="scope">
              <a>{{scope.row.mid >1?'采集':'非采集'}}</a>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="开发时间" header-align="center">
          <el-table-column
            prop="devDatetime"
            :render-header="renderHeaderPlat"
            width="220"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="更新时间" header-align="center">
          <el-table-column
            prop="updateTime"
            :render-header="renderHeaderPlat"
            width="220"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="是否多属性" header-align="center">
          <el-table-column
            prop="isVar"
            :render-header="renderHeaderPlat"
            width="150"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="商品状态" header-align="center">
          <el-table-column
            prop="goodsStatus"
            :render-header="renderHeaderPlat"
            width="150"
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
            width="150"
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
    </div>
    <div v-show="show.wish">
      <!-- wish列表 -->
      <el-table :data="platDataWish" @selection-change="selsChange" :height="tableHeightWish">
        <el-table-column type="index" fixed align="center" header-align="center"></el-table-column>
        <el-table-column label="操作" fixed header-align="center" width="58">
          <template slot-scope="scope">
            <el-tooltip content="更新">
              <i
                @click="platEdit(scope.$index, scope.row)"
                class="el-icon-edit"
                style="color: #409EFF;cursor:pointer;margin-left: 12px"
              ></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="picUrl" fixed label="主图" header-align="center" width="90">
          <template slot-scope="scope">
            <img :src="scope.row.picUrl" style="width: 70px;height: 60px">
          </template>
        </el-table-column>
        <el-table-column label="商品编码" header-align="center">
          <el-table-column
            prop="goodsCode"
            :render-header="renderHeaderWish"
            width="150"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="Wish待刊登" header-align="center">
          <el-table-column
            prop="wishPublish"
            :render-header="renderHeaderWish"
            width="150"
            align="center"
          >
            <template slot-scope="scope">
              <a
                :class="!scope.row.wishPublish?'clasRed':''"
              >{{scope.row.wishPublish?scope.row.wishPublish:'未设置'}}</a>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="禁售平台" header-align="center">
          <el-table-column prop="dictionaryName" :render-header="renderHeaderWish" width="220">
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
            :render-header="renderHeaderWish"
            width="150"
            align="center"
          >
            <template slot-scope="scope">
              <a
                :class="!scope.row.goodsName?'clasRed':''"
              >{{scope.row.goodsName?scope.row.goodsName:'未设置'}}</a>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="开发员" header-align="center">
          <el-table-column
            prop="developer"
            :render-header="renderHeaderWish"
            width="150"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="采购" header-align="center">
          <el-table-column
            prop="purchaser"
            :render-header="renderHeaderWish"
            width="150"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="美工" header-align="center">
          <el-table-column
            prop="possessMan1"
            :render-header="renderHeaderWish"
            width="150"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="开发时间" header-align="center">
          <el-table-column
            prop="devDatetime"
            :render-header="renderHeaderWish"
            width="220"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="库存" header-align="center">
          <el-table-column
            prop="number"
            :render-header="renderHeaderWish"
            width="120"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="是否多属性" header-align="center">
          <el-table-column
            prop="isVar"
            :render-header="renderHeaderWish"
            width="150"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="商品状态" header-align="center">
          <el-table-column
            prop="goodsStatus"
            :render-header="renderHeaderWish"
            width="150"
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
            :render-header="renderHeaderWish"
            width="150"
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
      <el-pagination
        background
        @size-change="handleSizeChangeWish"
        @current-change="handleCurrentChangeWish"
        :current-page="this.platWish.page"
        :page-sizes="[10, 20, 40,100,200]"
        :page-size="this.plat.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.totalWish"
      ></el-pagination>
    </div>
    <div v-show="show.stockUp">
      <el-col :span="24" style="padding:10px 20px;">
        <el-button @click="exportExcel" type="primary">导出表格</el-button>
      </el-col>
      <el-col :span="24" style="padding: 0;">
        <h3
          class="toolbar essential"
          style="margin-top: 0;margin-bottom: 15px;padding-left:15px;line-height:45px;font-size:15px;"
        >
          备货产品表现
          <span
            style="float:right;margin-right: 30px;font-size: 14px;margin-bottom: 15px;display: block"
          >
            共{{skuTotal}}条
            <span style="margin-left: 15px">第1-{{skuTotal}}条数据</span>
          </span>
        </h3>
      </el-col>
      <el-table
        :data="stockdata"
        border
        class="elTableForm"
        :summary-method="getSummaries"
        :header-cell-style="getRowClass"
        show-summary
        :height="tableHeightstock"
        style="width: 98%;margin:auto;margin-top:5px;"
      >
        <el-table-column type="index" fixed align="center" width="80" header-align="center"></el-table-column>
        <el-table-column label="开发员" header-align="right" align="right" prop="developer"></el-table-column>
        <el-table-column label="备货产品款数" header-align="right" align="right" prop="number"></el-table-column>
        <el-table-column label="出单产品款数" header-align="right" align="right" prop="orderNum"></el-table-column>
        <el-table-column label="出单率(%)" header-align="right" align="right" prop="orderRate"></el-table-column>
        <el-table-column label="旺款数量" header-align="right" align="right" prop="hotStyleNum"></el-table-column>
        <el-table-column label="旺款率(%)" header-align="right" align="right" prop="hotRate"></el-table-column>
        <el-table-column label="爆款数量" header-align="right" align="right" prop="exuStyleNum"></el-table-column>
        <el-table-column label="爆款率(%)" header-align="right" align="right" prop="exuRate"></el-table-column>
        <el-table-column
          label="本月可用备货款数"
          header-align="right"
          align="right"
          prop="stockNumThisMonth"
        >
          <template slot-scope="scope">
            <a
              :class="scope.row.stockNumThisMonth?'':'clasRed'"
            >{{scope.row.stockNumThisMonth?scope.row.stockNumThisMonth:'未设置'}}</a>
          </template>
        </el-table-column>
        <el-table-column
          label="下月可用备货款数"
          header-align="right"
          align="right"
          prop="stockNumLastMonth"
        >
          <template slot-scope="scope">
            <a
              :class="scope.row.stockNumLastMonth?'':'clasRed'"
            >{{scope.row.stockNumLastMonth?scope.row.stockNumLastMonth:'未设置'}}</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="show.nostockUp">
      <el-col :span="24" style="padding:10px 20px;">
        <el-button @click="noexportExcel" type="primary">导出表格</el-button>
      </el-col>
      <el-col :span="24" style="padding: 0;">
        <h3
          class="toolbar essential"
          style="margin-top: 0;margin-bottom: 15px;padding-left:15px;line-height:45px;font-size:15px;"
        >
          不备货产品表现
          <span
            style="float:right;margin-right: 30px;font-size: 14px;margin-bottom: 15px;display: block"
          >
            共{{noskuTotal}}条
            <span style="margin-left: 15px">第1-{{noskuTotal}}条数据</span>
          </span>
        </h3>
      </el-col>
      <el-table
        :data="nostockdata"
        border
        class="elTableForm"
        :summary-method="getSummaries"
        :header-cell-style="getRowClass"
        show-summary
        :height="tableHeightstock"
        style="width: 98%;margin:auto;margin-top:5px;"
      >
        <el-table-column type="index" fixed align="center" width="80" header-align="center"></el-table-column>
        <el-table-column label="开发员" header-align="right" align="right" prop="developer"></el-table-column>
        <el-table-column label="不备货产品款数" header-align="right" align="right" prop="number"></el-table-column>
        <el-table-column label="出单产品款数" header-align="right" align="right" prop="orderNum"></el-table-column>
        <el-table-column label="出单率(%)" header-align="right" align="right" prop="orderRate"></el-table-column>
        <el-table-column label="旺款数量" header-align="right" align="right" prop="hotStyleNum"></el-table-column>
        <el-table-column label="旺款率(%)" header-align="right" align="right" prop="hotRate"></el-table-column>
        <el-table-column label="爆款数量" header-align="right" align="right" prop="exuStyleNum"></el-table-column>
        <el-table-column label="爆款率(%)" header-align="right" align="right" prop="exuRate"></el-table-column>
        <el-table-column
          label="本月可用不备货款数"
          header-align="right"
          align="right"
          prop="stockNumThisMonth"
        >
          <template slot-scope="scope">
            <a
              :class="scope.row.stockNumThisMonth?'':'clasRed'"
            >{{scope.row.stockNumThisMonth?scope.row.stockNumThisMonth:'未设置'}}</a>
          </template>
        </el-table-column>
        <el-table-column
          label="下月可用不备货款数"
          header-align="right"
          align="right"
          prop="stockNumLastMonth"
        >
          <template slot-scope="scope">
            <a
              :class="scope.row.stockNumLastMonth?'':'clasRed'"
            >{{scope.row.stockNumLastMonth?scope.row.stockNumLastMonth:'未设置'}}</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </section>
</template>
<script type="text/ecmascript-6">
import {
  APIProduct,
  APIPlat,
  APIFormWish,
  APIStock,
  APInoStock,
  APIFormExtend
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
      //销售
      tableHeight: window.innerHeight - 195,
      activeName: "",
      allMenu: [],
      platData: [],
      repertory: [],
      mainCategory: [],
      goodsState: [],
      violation: [],
      sels: [],
      time1: "",
      time2: "",
      dialogPlat: false,
      totalPlat: null,
      goodsInfoPlat: [],
      oaGoodsPlat: [],
      perfectPlatform: [],
      platForm: {
        id: null
      },
      plat: {
        extendStatus: null,
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
        pageSize: 10,
        page: 1
      },
      //wish
      tableHeightWish: window.innerHeight - 135,
      platDataWish: [],
      totalWish: null,
      time1Wish: "",
      platWish: {
        extendStatus: null,
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
        number: null,
        dictionaryName: null,
        devDatetime: [],
        updateTime: [],
        isVar: null,
        goodsStatus: null,
        stockDays: null,
        pageSize: 10,
        page: 1
      },
      //备货
      tableHeightstock: window.innerHeight - 230,
      stockdata: [],
      skuTotal: 0,
      //不备货
      nostockdata: [],
      noskuTotal: 0,
      show: {
        sale: true,
        wish: false,
        stockUp: false,
        nostockUp: false
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
    handleClick(tab, event) {
      if (tab.name === "/v1/oa-data/sales") {
        this.show["sale"] = true;
        this.getPlat();
      } else {
        this.show["sale"] = false;
      }
      if (tab.name === "/v1/oa-data/wish") {
        this.show["wish"] = true;
        this.getwish();
      } else {
        this.show["wish"] = false;
      }
      if (tab.name === "/v1/oa-data/stock") {
        this.show["stockUp"] = true;
        this.getStock();
      } else {
        this.show["stockUp"] = false;
      }
      if (tab.name === "/v1/oa-data/nonstock") {
        this.show["nostockUp"] = true;
        this.getnoStock();
      } else {
        this.show["nostockUp"] = false;
      }
    },
    //销售
    selsChange(sels) {
      this.sels = sels;
    },
    mark(index, row) {
      let arrMark = [row.id];
      let obj = {
        id: arrMark
      };
      APIFormExtend(obj).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: "成功",
            type: "success"
          });
          this.getPlat();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    markAll() {
      if(this.sels.length!=0){
        let finish = {
        id: null
        };
        finish.id = this.sels.map(e => e.id);
        APIFormExtend(finish).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: "成功",
              type: "success"
            });
            this.getPlat();
          } else {
            this.$message.error(res.data.message);
          }
        });
      }else{
        this.$message.error('请选择产品');
      }
    },
    handleSizeChangePlat(val) {
      this.plat.pageSize = val;
      this.getPlat();
    },
    handleCurrentChangePlat(val) {
      this.plat.page = val;
      this.getPlat();
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
    platEdit(index, row) {
      let Logistics = this.$router.resolve({
        path: `/form/${row.id}`
      });
      window.open(Logistics.href);
    },
    renderHeaderPlat(h, { column, $index }) {
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
        let filters = [
          { text: "未推广", value: "未推广" },
          { text: "已推广", value: "已推广" }
        ];
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.plat.extendStatus,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.plat.extendStatus = value;
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
      } else if ($index === 3) {
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
      } else if ($index === 4) {
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
      } else if ($index === 5) {
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
      } else if ($index === 6) {
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
      } else if ($index === 7) {
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
      } else if ($index === 9) {
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
      } else if ($index === 15) {
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
      } else if ($index === 16) {
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
      } else if ($index === 17) {
        return h("el-date-picker", {
          props: {
            value: this.time1,
            size: "mini",
            type: "daterange"
          },
          style: {
            width: "200px",
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
      } else if ($index === 18) {
        return h("el-date-picker", {
          props: {
            value: this.time2,
            size: "mini",
            type: "daterange"
          },
          style: {
            width: "200px",
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
      } else if ($index === 19) {
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
      } else if ($index === 20) {
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
      } else if ($index === 21) {
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
    },
    getPlat() {
      APIProduct(this.plat).then(res => {
        this.platData = res.data.data.items;
        this.platData.forEach((item, index) => {
          item.extendStatus = item.extendStatus ? item.extendStatus : "未推广";
        });
        this.totalPlat = res.data.data._meta.totalCount;
        this.plat.pageSize = res.data.data._meta.perPage;
        this.plat.page = res.data.data._meta.currentPage;
      });
    },
    //wish
    getwish() {
      APIFormWish(this.platWish).then(res => {
        this.platDataWish = res.data.data.items;
        this.totalWish = res.data.data._meta.totalCount;
        this.platWish.pageSize = res.data.data._meta.perPage;
        this.platWish.page = res.data.data._meta.currentPage;
      });
    },
    handleSizeChangeWish(val) {
      this.platWish.pageSize = val;
      this.getwish();
    },
    handleCurrentChangeWish(val) {
      this.platWish.page = val;
      this.getwish();
    },
    filterWish() {
      if (this.time1 !== null && this.time1.length !== 0) {
        this.platWish.devDatetime = [
          this.formatDate(this.time1[0]),
          this.formatDate(this.time1[1])
        ];
      } else {
        this.platWish.devDatetime = [];
      }
      this.getwish();
    },
    renderHeaderWish(h, { column, $index }) {
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
                value: this.platWish.goodsCode,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.platWish.goodsCode = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filterWish();
                }
              }
            })
          ]
        );
      } else if ($index === 1) {
        let filters = [{ text: "Y", value: "Y" }, { text: "N", value: "N" }];
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.platWish.wishPublish,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.platWish.wishPublish = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.filterWish();
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
        let filters = this.violation;
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.platWish.dictionaryName,
              size: "mini",
              multiple: true,
              collapseTags: true,
              clearable: true
            },
            on: {
              input: value => {
                this.platWish.dictionaryName = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.filterWish();
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
                value: this.platWish.goodsName,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.platWish.goodsName = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filterWish();
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
                value: this.platWish.developer,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.platWish.developer = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filterWish();
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
                value: this.platWish.purchaser,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.platWish.purchaser = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filterWish();
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
                value: this.platWish.possessMan1,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.platWish.possessMan1 = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filterWish();
                }
              }
            })
          ]
        );
      } else if ($index === 7) {
        return h("el-date-picker", {
          props: {
            value: this.time1Wish,
            size: "mini",
            type: "daterange"
          },
          style: {
            width: "200px",
            padding: "2px"
          },
          on: {
            input: value => {
              this.time1Wish = value;
              this.$emit("input", value);
            },
            change: value => {
              this.filterWish();
            }
          }
        });
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
                value: this.platWish.number,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.platWish.number = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filterWish();
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
              value: this.platWish.isVar,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.platWish.isVar = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.filterWish();
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
        let filters = this.goodsState;
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.platWish.goodsStatus,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.platWish.goodsStatus = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.filterWish();
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
                value: this.platWish.stockDays,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.platWish.stockDays = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filterWish();
                }
              }
            })
          ]
        );
      }
    },
    //备货
    exportExcel() {
      const th = [
        "开发员",
        "备货产品款数",
        "出单产品款数",
        "出单率(%)",
        "旺款数量",
        "旺款率(%)",
        "爆款数量",
        "爆款率(%)",
        "本月可用备货款数",
        "下月可用备货款数"
      ];
      const filterVal = [
        "developer",
        "number",
        "orderNum",
        "orderRate",
        "hotStyleNum",
        "hotRate",
        "exuStyleNum",
        "exuRate",
        "stockNumThisMonth",
        "stockNumLastMonth"
      ];
      const Filename = "备货产品表现";
      const data = this.stockdata.map(v => filterVal.map(k => v[k]));
      const [fileName, fileType, sheetName] = [Filename, "xls"];
      this.$toExcel({ th, data, fileName, fileType, sheetName });
    },
    getStock() {
      APIStock().then(res => {
        this.stockdata = res.data.data;
        this.skuTotal = this.stockdata.length;
      });
    },
    //不备货
    noexportExcel() {
      const th = [
        "开发员",
        "备货产品款数",
        "出单产品款数",
        "出单率(%)",
        "旺款数量",
        "旺款率(%)",
        "爆款数量",
        "爆款率(%)",
        "本月可用备货款数",
        "下月可用备货款数"
      ];
      const filterVal = [
        "developer",
        "number",
        "orderNum",
        "orderRate",
        "hotStyleNum",
        "hotRate",
        "exuStyleNum",
        "exuRate",
        "stockNumThisMonth",
        "stockNumLastMonth"
      ];
      const Filename = "不备货产品表现";
      const data = this.nostockdata.map(v => filterVal.map(k => v[k]));
      const [fileName, fileType, sheetName] = [Filename, "xls"];
      this.$toExcel({ th, data, fileName, fileType, sheetName });
    },
    getnoStock() {
      APInoStock().then(res => {
        this.nostockdata = res.data.data;
        this.noskuTotal = this.nostockdata.length;
      });
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        if (index === 2 || index === 3 || index === 5 || index === 7) {
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
        return "color:#337ab7";
      } else {
        return "";
      }
    }
  },
  mounted() {
    getMenu().then(response => {
      const res = response.data.data;
      const menu = res.filter(e => e.name === "产品中心");
      let arr = menu[0].children;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].route == "/v1/oa-data/product") {
          this.allMenu = arr[i].tabs;
        }
      }
      //权限判断
      if (this.allMenu[0].route === "/v1/oa-data/sales") {
        this.show["sale"] = true;
        this.activeName = this.allMenu[0].route;
        this.getPlat();
      } else {
        this.show["sale"] = false;
      }
      if (this.allMenu[0].route === "/v1/oa-data/wish") {
        this.show["wish"] = true;
        this.activeName = this.allMenu[0].route;
        this.getwish();
      } else {
        this.show["wish"] = false;
      }
      if (this.allMenu[0].route === "/v1/oa-data/stock") {
        this.show["stockUp"] = true;
        this.activeName = this.allMenu[0].route;
        this.getStock();
      } else {
        this.show["stockUp"] = false;
      }
      if (this.allMenu[0].route === "/v1/oa-data/nonstock") {
        this.show["nostockUp"] = true;
        this.activeName = this.allMenu[0].route;
        this.getnoStock();
      } else {
        this.show["nostockUp"] = false;
      }
      //销售
      this.getPlat();
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
      getForbidPlat().then(response => {
        this.violation = response.data.data;
      });
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
</style>
<style>
.elTableForm td {
  padding: 10px 0;
}
</style>


