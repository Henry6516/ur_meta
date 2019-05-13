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
    <div v-show="show.status">
      <!-- <div v-show="show.wait"> -->
      <el-col :span="24" style="padding:10px 20px;">
        <el-button plain @click="passAll">批量导入普源</el-button>
        <el-button plain @click="codeAll">重新生成商品编码</el-button>
        <el-button plain @click="markAll">标记已完善</el-button>
      </el-col>
      <!-- 属性信息列表 -->
      <el-table
        :data="tableData"
        :cell-style="cellStyle"
        @selection-change="selsChange"
        style="width: 100%;border: none;"
        :height="tableHeight"
      >
        <el-table-column type="selection" fixed align="center" header-align="center"></el-table-column>
        <el-table-column type="index" fixed align="center" header-align="center"></el-table-column>
        <el-table-column label="操作" fixed header-align="center" width="110">
          <template slot-scope="scope">
            <el-tooltip content="查看">
              <i
                class="el-icon-view"
                @click="view(scope.$index, scope.row)"
                style="color: #409EFF;cursor:pointer;"
              ></i>
            </el-tooltip>
            <el-tooltip content="更新">
              <!--<router-link :to="'/'+scope.row.id"-->
              <!--style="color: #409EFF">-->
              <i
                class="el-icon-edit"
                style="color: #409EFF;cursor:pointer;"
                @click="upte(scope.$index, scope.row)"
              ></i>
              <!--</router-link>-->
            </el-tooltip>
            <el-tooltip content="导入普源">
              <i
                class="el-icon-printer"
                style="color: #409EFF;cursor:pointer;"
                @click="passPy(scope.$index,scope.row)"
              ></i>
            </el-tooltip>
            <el-tooltip content="标记已完善">
              <i
                class="el-icon-star-on"
                @click="mark(scope.$index,scope.row)"
                style="color: #409EFF;cursor:pointer;"
              ></i>
            </el-tooltip>
            <el-tooltip content="删除">
              <i
                class="el-icon-delete"
                @click="del(scope.$index, scope.row)"
                style="color: #409EFF;cursor:pointer;"
              ></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="picUrl" fixed label="商品图片" header-align="center" width="90">
          <template slot-scope="scope">
            <img :src="scope.row.picUrl" style="width: 70px;height: 60px">
          </template>
        </el-table-column>
        <el-table-column label="商品编码" header-align="center">
          <el-table-column
            prop="goodsCode"
            :render-header="renderHeader"
            width="150"
            align="center"
          >
            <template slot-scope="scope">
              <a :class="scope.row.stockUp=='是'?'redCu':'redblack'">{{scope.row.goodsCode}}</a>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="是否备货" header-align="center">
          <el-table-column prop="stockUp" :render-header="renderHeader" width="150" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="属性状态" header-align="center">
          <el-table-column
            prop="achieveStatus"
            :render-header="renderHeader"
            width="150"
            align="center"
          >
            <template slot-scope="scope">
              <a
                :class="scope.row.achieveStatus=='待处理'?'clasRed1':'clasGreen1'"
              >{{scope.row.achieveStatus}}</a>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="商品名称" header-align="center">
          <el-table-column
            prop="goodsName"
            :render-header="renderHeader"
            width="150"
            align="center"
          >
            <template slot-scope="scope">
              <a
                :class="!scope.row.goodsName?'clasRed':''"
              >{{scope.row.goodsName?scope.row.goodsName:"未设置"}}</a>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="开发员" header-align="center">
          <el-table-column
            prop="developer"
            :render-header="renderHeader"
            width="150"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="开发时间" header-align="center">
          <el-table-column
            prop="devDatetime"
            :render-header="renderHeader"
            width="230"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="更新时间" header-align="center">
          <el-table-column
            prop="updateTime"
            :render-header="renderHeader"
            width="200"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="中文申报名" header-align="center">
          <el-table-column
            prop="aliasCnName"
            :render-header="renderHeader"
            width="150"
            align="center"
          >
            <template slot-scope="scope">
              <a
                :class="!scope.row.aliasCnName?'clasRed':''"
              >{{scope.row.aliasCnName?scope.row.aliasCnName:"未设置"}}</a>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="英文申报名" header-align="center">
          <el-table-column
            prop="aliasEnName"
            :render-header="renderHeader"
            width="150"
            align="center"
          >
            <template slot-scope="scope">
              <a
                :class="!scope.row.aliasEnName?'clasRed':''"
              >{{scope.row.aliasEnName?scope.row.aliasEnName:"未设置"}}</a>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="是否液体" header-align="center">
          <el-table-column prop="isLiquid" :render-header="renderHeader" width="150" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="是否粉末" header-align="center">
          <el-table-column prop="isPowder" :render-header="renderHeader" width="150" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="是否带磁" header-align="center">
          <el-table-column
            prop="isMagnetism"
            :render-header="renderHeader"
            width="150"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="是否带电" header-align="center">
          <el-table-column
            prop="isCharged"
            :render-header="renderHeader"
            width="150"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="是否多属性" header-align="center">
          <el-table-column prop="isVar" :render-header="renderHeader" width="150" align="center"></el-table-column>
        </el-table-column>
      </el-table>
      <!-- 属性信息查看对话框 -->
      <el-dialog title="查看" :visible.sync="dialogVisible" width="70%" class="dig70">
        <el-form
          label-position="left"
          label-width="110px"
          ref="viewForm"
          style="width: 100%;overflow: hidden"
        >
          <el-form-item label="图片" prop="picUrl" class="item1">
            <a :href="goodsInfo.picUrl" target="_blank" style="cursor: pointer">
              <img :src="goodsInfo.picUrl" style="width: 150px;height: 100px;">
            </a>
          </el-form-item>
          <el-form-item label="图片地址" prop="picUrl" class="item">
            <span>
              <a :href="goodsInfo.picUrl" target="_blank" class="classa">{{goodsInfo.picUrl}}</a>
            </span>
          </el-form-item>
          <el-form-item label="商品编码" prop="goodsCode" class="item">
            <span>{{goodsInfo.goodsCode?goodsInfo.goodsCode:"未设置"}}</span>
          </el-form-item>
          <el-form-item label="是否备货" prop="stockUp" class="item">
            <span>{{goodsInfo.stockUp}}</span>
          </el-form-item>
          <el-form-item label="商品名称" prop="goodsName" class="item">
            <span>{{goodsInfo.goodsName?goodsInfo.goodsName:"未设置"}}</span>
          </el-form-item>
          <el-form-item label="采购" prop="purchaser" class="item">
            <span>{{goodsInfo.purchaser?goodsInfo.purchaser:"未设置"}}</span>
          </el-form-item>
          <el-form-item label="开发员" prop="developer" class="item">
            <span>{{goodsInfo.developer?goodsInfo.developer:"未设置"}}</span>
          </el-form-item>
          <el-form-item label="美工" prop="possessMan1" class="item">
            <span>{{goodsInfo.possessMan1?goodsInfo.possessMan1:"未设置"}}</span>
          </el-form-item>
          <el-form-item label="供应商名称" prop="SupplierName" class="item">
            <span>{{goodsInfo.supplierName?goodsInfo.supplierName:"未设置"}}</span>
          </el-form-item>
          <el-form-item label="中文申报名" prop="AttributeName" class="item">
            <span>{{goodsInfo.aliasCnName?goodsInfo.aliasCnName:"未设置"}}</span>
          </el-form-item>
          <el-form-item label="英文申报名" prop="DictionaryName" class="item">
            <span>{{goodsInfo.aliasEnName?goodsInfo.aliasEnName:"未设置"}}</span>
          </el-form-item>
          <el-form-item label="规格" prop class="item">
            <span>{{goodsInfo.packName?goodsInfo.packName:"未设置"}}</span>
          </el-form-item>
          <el-form-item label="描述" prop class="item">
            <span>{{goodsInfo.description?goodsInfo.description:"未设置"}}</span>
          </el-form-item>
          <el-form-item label="季节" prop="Season" class="item">
            <span>{{goodsInfo.season?goodsInfo.season:"未设置"}}</span>
          </el-form-item>
          <el-form-item label="仓库" prop="StoreName" class="item">
            <span>{{goodsInfo.storeName?goodsInfo.storeName:"未设置"}}</span>
          </el-form-item>
          <el-form-item label="是否液体" prop="IsLiquid" class="item">
            <span>{{goodsInfo.isLiquid?goodsInfo.isLiquid:"未设置"}}</span>
          </el-form-item>
          <el-form-item label="是否粉末" prop="IsPowder" class="item">
            <span>{{goodsInfo.isPowder?goodsInfo.isPowder:"未设置"}}</span>
          </el-form-item>
          <el-form-item label="是否带磁" prop="isMagnetism" class="item">
            <span>{{goodsInfo.isMagnetism?goodsInfo.isMagnetism:"未设置"}}</span>
          </el-form-item>
          <el-form-item label="是否带电" prop="IsCharged" class="item">
            <span>{{goodsInfo.isCharged?goodsInfo.isCharged:"未设置"}}</span>
          </el-form-item>
          <el-form-item label="主类目" prop class="item">
            <span>{{oaGoods.cate}}</span>
          </el-form-item>
          <el-form-item label="子类目" prop class="item">
            <span>{{oaGoods.subCate}}</span>
          </el-form-item>
          <el-form-item label="供应商链接1" prop class="item">
            <span>
              <a
                :href="oaGoods.vendor1"
                target="_blank"
                class="classa"
              >{{oaGoods.vendor1?oaGoods.vendor1:"未设置"}}</a>
            </span>
          </el-form-item>
          <el-form-item label="供应商链接2" prop class="item">
            <span>
              <a
                :href="oaGoods.vendor2"
                target="_blank"
                class="classa"
              >{{oaGoods.vendor2?oaGoods.vendor2:"未设置"}}</a>
            </span>
          </el-form-item>
          <el-form-item label="供应商链接3" prop class="item">
            <span>
              <a
                :href="oaGoods.vendor3"
                target="_blank"
                class="classa"
              >{{oaGoods.vendor3?oaGoods.vendor3:"未设置"}}</a>
            </span>
          </el-form-item>
          <el-form-item label="平台参考链接1" prop class="item">
            <span>
              <a
                :href="oaGoods.origin1"
                target="_blank"
                class="classa"
              >{{oaGoods.origin1?oaGoods.origin1:"未设置"}}</a>
            </span>
          </el-form-item>
          <el-form-item label="平台参考链接2" prop class="item">
            <span>
              <a
                :href="oaGoods.origin2"
                target="_blank"
                class="classa"
              >{{oaGoods.origin2?oaGoods.origin2:"未设置"}}</a>
            </span>
          </el-form-item>
          <el-form-item label="平台参考链接3" prop class="item">
            <span>
              <a
                :href="oaGoods.origin3"
                target="_blank"
                class="classa"
              >{{oaGoods.origin3?oaGoods.origin3:"未设置"}}</a>
            </span>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" type="primary">关 闭</el-button>
        </span>
      </el-dialog>
      <!-- 属性信息分页 -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.condition.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="this.condition.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total"
      ></el-pagination>
    </div>
    <div v-show="show.picture">
      <!-- 图片信息列表 -->
      <el-table :data="pictureData" @selection-change="selsChange">
        <el-table-column type="selection" fixed align="center" header-align="center"></el-table-column>
        <el-table-column type="index" fixed align="center" header-align="center"></el-table-column>
        <el-table-column label="操作" fixed header-align="center" width="80">
          <template slot-scope="scope">
            <el-tooltip content="查看">
              <i
                class="el-icon-view"
                @click="viewPic(scope.$index, scope.row)"
                style="color: #409EFF;cursor:pointer;"
              ></i>
            </el-tooltip>
            <el-tooltip content="更新">
              <i
                @click="picEdit(scope.$index, scope.row)"
                class="el-icon-edit"
                style="color: #409EFF;cursor:pointer;"
              ></i>
            </el-tooltip>
            <el-tooltip content="标记已完善">
              <i
                class="el-icon-star-on"
                style="color: #409EFF;cursor:pointer;"
                @click="signPerfect(scope.$index, scope.row)"
              ></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="picUrl" fixed label="商品图片" header-align="center">
          <template slot-scope="scope">
            <img :src="scope.row.picUrl" style="width: 60px;height: 50px">
          </template>
        </el-table-column>
        <el-table-column label="商品编码" header-align="center">
          <el-table-column
            prop="goodsCode"
            :render-header="renderHeaderPic"
            width="150"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="是否备货" header-align="center">
          <el-table-column
            prop="stockUp"
            :render-header="renderHeaderPic"
            width="150"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="商品名称" header-align="center">
          <el-table-column
            prop="goodsName"
            :render-header="renderHeaderPic"
            width="150"
            align="center"
          >
            <template slot-scope="scope">
              <a
                :class="!scope.row.goodsName?'clasRed':''"
              >{{scope.row.goodsName?scope.row.goodsName:"未设置"}}</a>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="供应商链接1" header-align="center">
          <el-table-column
            prop="vendor1"
            :render-header="renderHeaderPic"
            width="170"
            align="center"
          >
            <template slot-scope="scope">
              <a
                :href="scope.row.vendor1"
                target="_blank"
                class="classa"
                :class="!scope.row.vendor1?'clasRed':''"
              >{{!scope.row.vendor1?'未设置':scope.row.vendor1 | cutOut}}</a>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="供应商链接2" header-align="center">
          <el-table-column
            prop="oaGoods.vendor2"
            :render-header="renderHeaderPic"
            width="170"
            align="center"
          >
            <template slot-scope="scope">
              <a
                :href="scope.row.vendor2"
                target="_blank"
                class="classa"
                :class="!scope.row.vendor2?'clasRed':''"
              >{{!scope.row.vendor2?'未设置':scope.row.vendor2 | cutOut}}</a>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="供应商链接3" header-align="center">
          <el-table-column
            prop="oaGoods.vendor3"
            :render-header="renderHeaderPic"
            width="170"
            align="center"
          >
            <template slot-scope="scope">
              <a
                :href="scope.row.vendor3"
                target="_blank"
                class="classa"
                :class="!scope.row.vendor3?'clasRed':''"
              >{{!scope.row.vendor3?'未设置':scope.row.vendor3 | cutOut}}</a>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="平台链接1" header-align="center">
          <el-table-column
            prop="oaGoods.origin1"
            :render-header="renderHeaderPic"
            width="170"
            align="center"
          >
            <template slot-scope="scope">
              <a
                :href="scope.row.origin1"
                target="_blank"
                class="classa"
                :class="!scope.row.origin1?'clasRed':''"
              >{{!scope.row.origin1?'未设置':scope.row.origin1 | cutOut}}</a>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="平台链接2" header-align="center">
          <el-table-column
            prop="oaGoods.origin2"
            :render-header="renderHeaderPic"
            width="170"
            align="center"
          >
            <template slot-scope="scope">
              <a
                :href="scope.row.origin2"
                target="_blank"
                class="classa"
                :class="!scope.row.origin2?'clasRed':''"
              >{{!scope.row.origin2?'未设置':scope.row.origin2 | cutOut}}</a>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="平台链接3" header-align="center">
          <el-table-column
            prop="oaGoods.origin3"
            :render-header="renderHeaderPic"
            width="170"
            align="center"
          >
            <template slot-scope="scope">
              <a
                :href="scope.row.origin3"
                target="_blank"
                class="classa"
                :class="!scope.row.origin3?'clasRed':''"
              >{{!scope.row.origin3?'未设置':scope.row.origin3 | cutOut}}</a>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="图片状态" header-align="center">
          <el-table-column
            prop="picStatus"
            :render-header="renderHeaderPic"
            width="150"
            align="center"
          >
            <template slot-scope="scope">
              <a :class="scope.row.picStatus=='待处理'?'clasRed':'clasGreen'">{{scope.row.picStatus}}</a>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="开发员" header-align="center">
          <el-table-column
            prop="developer"
            :render-header="renderHeaderPic"
            width="150"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="开发时间" header-align="center">
          <el-table-column
            prop="devDatetime"
            :render-header="renderHeaderPic"
            width="200"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="美工" header-align="center">
          <el-table-column
            prop="possessMan1"
            :render-header="renderHeaderPic"
            width="150"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="是否多属性" header-align="center">
          <el-table-column prop="isVar" :render-header="renderHeaderPic" width="150" align="center"></el-table-column>
        </el-table-column>
      </el-table>
      <!-- 图片信息查看对话框 -->
      <el-dialog title="查看" :visible.sync="dialogPicture">
        <el-form label-position="left" label-width="110px" ref="picForm">
          <el-form-item label="图片" prop="goodsInfoPic.picUrl" class="item1">
            <img :src="goodsInfoPic.picUrl" style="width: 150px;height: 100px;">
          </el-form-item>
          <el-form-item label="图片地址" prop="picUrl" class="item">
            <span>
              <a :href="goodsInfoPic.picUrl" target="_blank" class="classa">{{goodsInfoPic.picUrl}}</a>
            </span>
          </el-form-item>
          <el-form-item label="商品名称" prop="GoodsName" class="item">
            <span>{{goodsInfoPic.goodsName?goodsInfoPic.goodsName:'未设置'}}</span>
          </el-form-item>
          <el-form-item label="商品编码" prop="GoodsCode" class="item">
            <span>{{goodsInfoPic.goodsCode}}</span>
          </el-form-item>
          <el-form-item label="是否备货" prop="stockUp" class="item">
            <span>{{goodsInfoPic.stockUp}}</span>
          </el-form-item>
          <el-form-item label="供应商名称" prop="supplierName" class="item">
            <span>{{goodsInfoPic.supplierName?goodsInfoPic.supplierName:'未设置'}}</span>
          </el-form-item>
          <el-form-item label="中文申报名" prop="aliasCnName" class="item">
            <span>{{goodsInfoPic.aliasCnName?goodsInfoPic.aliasCnName:'未设置'}}</span>
          </el-form-item>
          <el-form-item label="英文申报名" prop="aliasEnName" class="item">
            <span>{{goodsInfoPic.aliasEnName?goodsInfoPic.aliasEnName:'未设置'}}</span>
          </el-form-item>
          <el-form-item label="规格" prop class="item">
            <span>{{goodsInfoPic.packName?goodsInfoPic.packName:'未设置'}}</span>
          </el-form-item>
          <el-form-item label="季节" prop="season" class="item">
            <span>{{goodsInfoPic.season?goodsInfoPic.season:'未设置'}}</span>
          </el-form-item>
          <el-form-item label="仓库" prop="storeName" class="item">
            <span>{{goodsInfoPic.storeName?goodsInfoPic.storeName:'未设置'}}</span>
          </el-form-item>
          <el-form-item label="是否液体" prop="isLiquid" class="item">
            <span>{{goodsInfoPic.isLiquid}}</span>
          </el-form-item>
          <el-form-item label="是否粉末" prop="isPowder" class="item">
            <span>{{goodsInfoPic.isPowder}}</span>
          </el-form-item>
          <el-form-item label="是否带磁" prop="isMagnetism" class="item">
            <span>{{goodsInfoPic.isMagnetism}}</span>
          </el-form-item>
          <el-form-item label="是否带电" prop="isCharged" class="item">
            <span>{{goodsInfoPic.isCharged}}</span>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-pagination
        background
        @size-change="handleSizeChangePic"
        @current-change="handleCurrentChangePic"
        :current-page="this.picture.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="this.picture.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.totalPic"
      ></el-pagination>
    </div>
    <div v-show="show.plat">
      <el-table :data="platData" @selection-change="selsChange">
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
        <el-table-column prop="picUrl" fixed label="主图" header-align="center">
          <template slot-scope="scope">
            <img :src="scope.row.picUrl" style="width: 60px;height: 50px">
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
          <el-table-column
            prop="completeStatus"
            :render-header="renderHeaderPlat"
            width="150"
            align="center"
          >
            <template slot-scope="scope">
              <a
                :class="!scope.row.completeStatus?'clasRed':''"
              >{{scope.row.completeStatus?scope.row.completeStatus:'未设置'}}</a>
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
        <el-table-column label="是否是采集数据" header-align="center">
          <el-table-column prop :render-header="renderHeaderPlat" width="150" align="center">
            <template slot-scope="scope">
              <a>{{scope.row.mid >1?'采集':'非采集'}}</a>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="禁售平台" header-align="center">
          <el-table-column
            prop="dictionaryName"
            :render-header="renderHeaderPlat"
            width="150"
            align="center"
          >
            <template slot-scope="scope">
              <a
                :class="!scope.row.dictionaryName?'clasRed':''"
              >{{scope.row.dictionaryName?scope.row.dictionaryName:'未设置'}}</a>
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
      <!-- 平台信息查看对话框 -->
      <el-dialog title="查看" :visible.sync="dialogPlat">
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
        :current-page="this.plat.currentPage"
        :page-sizes="[10, 20, 30, 40]"
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
  APIDeleteVariant,
  APIPicturePreview,
  APIFinishPicture,
  APIAttributeToShopElf,
  APIDeleteAttribute
} from "../../api/product";
import {
  getAttributeInfoStoreName,
  getAttributeInfoCat,
  getPlatGoodsStatus,
  getPlatCompletedPlat
} from "../../api/profit";
import { getMenu } from "../../api/login";
export default {
  components: {
    goodsInfoPicture: goodsInfoPicture,
    goodsInfoPlatform: goodsInfoPlatform
  },
  data() {
    return {
      tableHeight: window.innerHeight - 195,
      dialogVisible: false,
      dialogPicture: false,
      dialogPlat: false,
      total: null,
      totalPic: null,
      totalPlat: null,
      activeName: "属性信息",
      sels: [],
      time1: "",
      time2: "",
      allMenu: [],
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
    handleCurrentChange(val) {
      this.condition.page = val;
      sessionStorage.setItem("sepageInfo", val);
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
      if (!row.goodsName) {
        this.$message.error("未完善商品名称,不可标记");
        return;
      }
      if (!row.aliasCnName) {
        this.$message.error("未完善中文申报名,不可标记");
        return;
      }
      if (!row.aliasEnName) {
        this.$message.error("未完善英文申报名,不可标记");
        return;
      }
      if (!row.supplierName) {
        this.$message.error("未完善供应商名称,不可标记");
        return;
      }
      if (!row.packName) {
        this.$message.error("未完善包装规格,不可标记");
        return;
      }
      if (!row.storeName) {
        this.$message.error("未完善仓库,不可标记");
        return;
      }
      if (!row.description) {
        this.$message.error("未完善描述,不可标记");
        return;
      }
      let arrRowid = [];
      arrRowid.push(row.id);
      let markStr = {
        id: arrRowid
      };
      this.finish.id = row.id;
      APIFinishAttribute(markStr).then(res => {
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
    passPy(index, row) {
      let addy = [];
      addy.push(row.id);
      let dataTe = {
        id: addy
      };
      APIAttributeToShopElf(dataTe).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: "成功",
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
      if (this.sels.length != 0) {
        for (let i = 0; i < this.sels.length; i++) {
          if (this.sels[i].goodsName == null || this.sels[i].goodsName=='') {
            this.$message.error("未完善商品名称,不可标记");
            return;
          }
          if (this.sels[i].aliasCnName == null || this.sels[i].aliasCnName=='') {
            this.$message.error("未完善中文申报名,不可标记");
            return;
          }
          if (this.sels[i].aliasEnName == null || this.sels[i].aliasEnName=='') {
            this.$message.error("未完善英文申报名,不可标记");
            return;
          }
          if (this.sels[i].supplierName == null || this.sels[i].supplierName=='') {
            this.$message.error("未完善供应商名称,不可标记");
            return;
          }
          if (this.sels[i].packName == null || this.sels[i].packName=='') {
            this.$message.error("未完善包装规格,不可标记");
            return;
          }
          if (this.sels[i].storeName == null || this.sels[i].storeName=='') {
            this.$message.error("未完善仓库,不可标记");
            return;
          }
          if (this.sels[i].description == null || this.sels[i].description=='') {
            this.$message.error("未完善描述,不可标记");
            return;
          }
        }
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
      } else {
        this.$message.error("未选择");
      }
    },
    //导入普源
    passAll() {
      if (this.sels.length != 0) {
        let dataTe = {
          id: this.sels.map(e => e.id)
        };
        APIAttributeToShopElf(dataTe).then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: "成功",
              type: "success"
            });
            this.getData();
          } else {
            this.$message.error(res.data.message);
          }
        });
      } else {
        this.$message.error("未选择");
      }
    },
    //生成编码
    codeAll() {
      if (this.sels.length != 0) {
        let data = {
          id: this.sels.map(e => e.id)
          // id: this.sels.map(e => e.id)[0]
        };
        APIGenerateCode(data).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: "生成成功",
              type: "success"
            });
            this.getData();
            // for (let i = 0; i < this.tableData.length; i++) {
            //     if (this.tableData[i].id === data.id) {
            //         this.tableData[i].goodsCode = res.data.data[0]
            //     }
            // }
          } else {
            this.$message.error(res.data.message);
          }
        });
      } else {
        this.$message.error("未选择");
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
      let arrString = {
        id: row.id
      };
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          APIDeleteAttribute(arrString).then(res => {
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
        })
        .catch(() => {});
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
      // this.$router.push({
      //   path: `/${row.id}`
      // });
      let Logistics=this.$router.resolve({
                   path: `/${row.id}`
                })     
      window.open(Logistics.href);
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
      if (this.activeName === "属性信息") {
        if (this.time1 !== null && this.time1.length !== 0) {
          this.condition.devDatetime = [
            this.formatDate(this.time1[0]),
            this.formatDate(this.time1[1])
          ];
        } else {
          this.condition.devDatetime = [];
        }
        if (this.time2 !== null && this.time2.length !== 0) {
          this.condition.updateTime = [
            this.formatDate(this.time2[0]),
            this.formatDate(this.time2[1])
          ];
        } else {
          this.condition.updateTime = [];
        }
        this.getData();
      } else if (this.activeName === "图片信息") {
        if (this.time1 !== null && this.time1.length !== 0) {
          this.picture.devDatetime = [
            this.formatDate(this.time1[0]),
            this.formatDate(this.time1[1])
          ];
        } else {
          this.picture.devDatetime = [];
        }
        this.getPic();
      } else {
        if (this.time1 !== null && this.time1.length !== 0) {
          this.platData.devDatetime = [
            this.formatDate(this.time1[0]),
            this.formatDate(this.time1[1])
          ];
        } else {
          this.platData.devDatetime = [];
        }
        if (this.time2 !== null && this.time2.length !== 0) {
          this.platData.updateTime = [
            this.formatDate(this.time2[0]),
            this.formatDate(this.time2[1])
          ];
        } else {
          this.platData.updateTime = [];
        }
        this.getPlat();
      }
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
                value: this.picture.possessman1,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.picture.possessman1 = value;
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
      this.$router.push({
        path: `/plat/${row.id}`
      });
    },
    //平台信息获取数据
    getPlat() {
      APIPlatList(this.plat).then(res => {
        this.platData = res.data.data.items;
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
      } else if ($index === 7) {
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
      } else if ($index === 14) {
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
                value: this.plat.dictionaryName,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.plat.dictionaryName = value;
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
      } else if ($index === 17) {
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
    const seePage = sessionStorage.getItem("sepageInfo");
    if (seePage) {
      this.condition.page = Number(seePage);
    }
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
.redCu {
  color: red;
  font-weight: bold;
}
.redblack {
  color: #606266;
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
</style>