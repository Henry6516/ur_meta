<template>
  <section>
    <!--<el-row>-->
      <!--<el-col :span="24" style="position: fixed;z-index: 999;overflow: hidden;border-bottom: #e4e7ed solid 1px; background: #eee">-->
          <!--<span @click="attribute(log.name)" class="adClass" :class="log.name=='属性信息'?'actie':''" v-for="(log,index) in allMenu" :key="index">{{log.name}}</span>-->
      <!--</el-col>-->
    <!--</el-row>-->
    <el-form :model="editForm"
             :inline="true"
             label-width="100px"
             ref="editForm">
      <el-row style="margin-top: 10px;margin-bottom: 0px">
        <el-col :span="24"
                style="padding: 0;margin-left: 15px;">
          <h3 class="toolbar essential" style="margin-top: 15px;margin-bottom: 10px">基本信息</h3>
        </el-col>
      </el-row>
      <el-col :span="24">
        <el-col :span="6" style="margin-left:20px;">
            <a :href="editForm.picUrl"
               target="_blank">
            <img :src='editForm.picUrl'
                 style="width: 155px;height:155px; margin-top:10px;margin-bottom:0px;border-radius: 10px">
              </a>
        </el-col>
      </el-col>
      <el-row style="margin-top: 0px">
        <el-col :span="8" style="margin-top: 20px;">
          <el-col :span="5" style="text-align: center;margin-top: 8px" class="font13">
            商品图片链接
          </el-col>
          <el-col :span="18">
              <el-input
                      v-model="editForm.picUrl"
                      style=""></el-input>
          </el-col>
          </el-col>
        <el-col :span="8" style="margin-top: 20px">
          <el-col :span="5" style="text-align: center;margin-top: 8px" class="font13">
            是否备货
          </el-col>
          <el-col :span="18">
             <el-input
                      v-model="editForm.stockUp"
                      style="" disabled=""></el-input>
            <!-- <el-select
                    v-model="editForm.stockUp"
                    style="width: 100%"
                    @change="iSn($event)">
              <el-option v-for="(item, key) in IsF" :key='item.key' :label="item" :value="item"></el-option>
            </el-select> -->
          </el-col>
        </el-col>
        <el-col :span="8" style="margin-top: 20px">
          <el-col :span="5" style="text-align: center;margin-top: 8px" class="font13">
            商品编码
          </el-col>
          <el-col :span="18">
            <el-input
                    v-model="editForm.goodsCode"
                    style=""></el-input>
          </el-col>
        </el-col>
        <el-col :span="8" style="margin-top: 20px">
          <el-col :span="5" style="text-align: center;margin-top: 8px;color: red;" class="font13">
            *商品名称
          </el-col>
          <el-col :span="18">
            <el-input
                    v-model="editForm.goodsName"
                    style=""></el-input>
          </el-col>
        </el-col>
        <el-col :span="8" style="margin-top: 20px">
          <el-col :span="5" style="text-align: center;margin-top: 8px;color: red;" class="font13">
            *中文申报名
          </el-col>
          <el-col :span="18">
            <el-input
                    v-model="editForm.aliasCnName"
                    style=""></el-input>
          </el-col>
        </el-col>
        <el-col :span="8" style="margin-top: 20px">
          <el-col :span="5" style="text-align: center;margin-top: 8px;color: red;" class="font13">
            *英文申报名
          </el-col>
          <el-col :span="18">
            <el-input
                    v-model="editForm.aliasEnName"
                    style=""></el-input>
          </el-col>
        </el-col>
        <el-col :span="8" style="margin-top: 20px">
          <el-col :span="5" style="text-align: center;margin-top: 8px;" class="font13">
            采购
          </el-col>
          <el-col :span="18">
            <el-input
                    v-model="editForm.purchaser"
                    style="" disabled></el-input>
          </el-col>
        </el-col>
        <el-col :span="8" style="margin-top: 20px">
          <el-col :span="5" style="text-align: center;margin-top: 8px;" class="font13">
            业绩归属人1
          </el-col>
          <el-col :span="18">
            <el-input
                    v-model="editForm.developer"
                    style=""></el-input>
          </el-col>
        </el-col>
        <el-col :span="8" style="margin-top: 20px">
          <el-col :span="5" style="text-align: center;margin-top: 8px;" class="font13">
            责任归属人1
          </el-col>
          <el-col :span="18">
            <el-input
                    v-model="editForm.possessMan1"
                    style=""></el-input>
          </el-col>
        </el-col>
        <el-col :span="8" style="margin-top: 20px">
          <el-col :span="5" style="text-align: center;margin-top: 8px;color: red" class="font13">
            *供应商名称
          </el-col>
          <el-col :span="18">
            <el-input
                    v-model="editForm.supplierName"
                    style=""></el-input>
          </el-col>
        </el-col>
        <el-col :span="8" style="margin-top: 20px">
          <el-col :span="5" style="text-align: center;margin-top: 8px;color: red" class="font13">
            *包装规格
          </el-col>
          <el-col :span="18">
            <el-select
                    v-model="editForm.packName"
                    style="width: 100%"
                    filterable clearable
                    @change="specIndex($event)">
              <el-option v-for="(item, key) in spec" :key='item.key' :label="item" :value="item"></el-option>
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="8" style="margin-top: 20px">
          <el-col :span="5" style="text-align: center;margin-top: 8px;" class="font13">
            特殊属性必填
          </el-col>
          <el-col :span="18">
            <el-select
                    v-model="editForm.attributeName"
                    clearable
                    style="width: 100%"
                    @change="specificityIndex($event)">
              <el-option v-for="(item, key) in specificity" :key='item.key' :label="item" :value="item"></el-option>
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="8" style="margin-top: 20px">
          <el-col :span="5" style="text-align: center;margin-top: 8px;color: red" class="font13">
            *仓库
          </el-col>
          <el-col :span="18">
            <el-select
                    v-model="editForm.storeName"
                    style="width: 100%"
                    filterable clearable
                    @change="repertoryIndex($event)">
              <el-option v-for="(item, key) in repertory" :key='item.key' :label="item" :value="item"></el-option>
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="8" style="margin-top: 20px">
          <el-col :span="5" style="text-align: center;margin-top: 8px;color: red" class="font13">
            *主类目
          </el-col>
          <el-col :span="18">
            <el-select
                      style="width:100%"
                      clearable
                      v-model="oaGoods.cate"
                      @change="mainIndex($event)">
                <el-option v-for="(item, key) in mainCategory" :key='item.key' :label="item" :value="item"></el-option>
              </el-select>
          </el-col>
        </el-col>
        <el-col :span="8" style="margin-top: 20px">
          <el-col :span="5" style="text-align: center;margin-top: 8px;" class="font13">
            子类目
          </el-col>
          <el-col :span="18">
            <el-select
                      style="width: 100%"
                      clearable
                      v-model="oaGoods.subCate"
                      @change="childrenIndex($event)">
                <el-option v-for="(item, key) in childrenCategory" :key='item.key' :label="item" :value="item"></el-option>
              </el-select>
          </el-col>
        </el-col>
        <el-col :span="8" style="margin-top: 20px">
          <el-col :span="5" style="text-align: center;margin-top: 8px;" class="font13">
            季节
          </el-col>
          <el-col :span="18">
            <el-select
                    v-model="editForm.season"
                    clearable
                    style="width: 100%"
                    @change="seasonnIndex($event)">
              <el-option v-for="(item, key) in seasonn" :key='item.key' :label="item" :value="item"></el-option>
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="8" style="margin-top: 20px">
          <el-col :span="5" style="text-align: center;margin-top: 8px;color: red" class="font13">
            *海关编码
          </el-col>
          <el-col :span="18">
            <el-input
                    v-model="editForm.hsCode"
                    style=""></el-input>
          </el-col>
        </el-col>
        <el-col :span="24"
                style="padding: 0;margin-left: 15px;">
          <h3 class="toolbar essential" style="margin-top: 15px;margin-bottom: 10px">主信息</h3>
        </el-col>
        <el-col :span="24" style="margin-top: 10px;margin-bottom: 15px">
          <el-col :span="12">
            <span style="text-align: center;float: left;margin-left: 30px;margin-top: 6px">
            禁售平台
          </span>
            <el-col :span="18" style="margin-left: 15px;">
              <el-select
                      style="width:100%"
                      multiple
                      filterable
                      allow-create
                      default-first-option
                      v-model="editForm.dictionaryName"
                      @change="forbidSale($event)">
                <el-button plain
                           type="info"
                           @click="selectalld">全选</el-button>
                <el-button plain
                           type="info"
                           @click="noselectd">取消</el-button>
                <el-option v-for="(item, key) in violation" :key='item.key' :label="item" :value="item"></el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="12">
            <span style="text-align: center;float: left;margin-top: 6px">
            对应销售
          </span>
            <el-col :span="20" style="margin-left: 15px;">
              <el-select
                      style="width:100%"
                      multiple
                      filterable
                      allow-create
                      default-first-option
                      v-model="editForm.mapPersons"
                      @change="forbidSale1($event)">
                <el-button plain
                           type="info"
                           @click="selectalld1">全选</el-button>
                <el-button plain
                           type="info"
                           @click="noselectd1">取消</el-button>
                <el-option v-for="(item, key) in mainSsale" :key='item.key' :label="item" :value="item"></el-option>
              </el-select>
            </el-col>
          </el-col>
          <!--<el-col :span="6">-->
          <!--<el-form-item label="对应销售">-->
          <!--<el-select size="small"-->
          <!--style="width:250px"-->
          <!--multiple-->
          <!--filterable-->
          <!--allow-create-->
          <!--default-first-option-->
          <!--v-model="editForm.mapPersons"-->
          <!--@change="forbidSale($event)">-->
          <!--<el-button plain-->
          <!--type="info"-->
          <!--@click="selectalld1">全选</el-button>-->
          <!--<el-button plain-->
          <!--type="info"-->
          <!--@click="noselectd1">取消</el-button>-->
          <!--<el-option v-for="(item, key) in sale" :key='item.key' :label="item" :value="item"></el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!-- <el-col :span="5">
            <el-col :span="5" style="text-align: center;margin-top: 8px;">
              主类目
            </el-col>
            <el-col :span="19">
              <el-select
                      style="width:95%"
                      v-model="oaGoods.cate"
                      @change="mainIndex($event)">
                <el-option v-for="(item, key) in mainCategory" :key='item.key' :label="item" :value="item"></el-option>
              </el-select>
            </el-col>
          </el-col> -->
          <!-- <el-col :span="5">
            <el-col :span="5" style="text-align: center;margin-top: 8px;">
              子类目
            </el-col>
            <el-col :span="19">
              <el-select
                      style="width: 95%"
                      v-model="oaGoods.subCate"
                      @change="childrenIndex($event)">
                <el-option v-for="(item, key) in childrenCategory" :key='item.key' :label="item" :value="item"></el-option>
              </el-select>
            </el-col>
          </el-col> -->
        </el-col>
        <el-col :span="24">
             <span style="text-align: center;float: left;margin-left: 15px;margin-top: 6px">
            关键词Tags
          </span>
          <el-col :span="20" style="margin-left: 15px;">
            <el-input
                    v-model="editForm.wishTags"
                    style="width: 100%"
                    class="aArial"
                    placeholder="--tags关键词不能超过10个，逗号分隔--"></el-input>
          </el-col>
        </el-col>
        <el-col :span="24" style="margin-top: 4px">
          <el-col :span="24" style="margin-top: 15px">
             <span style="text-align: center;float: left;margin-left: 15px;margin-right: 13px">
            最前关键词
          </span>
             <span>
              <span style="color: red">{{foremost}}</span>个字符
            </span>
             <span style="margin-left: 10px">
              <font style="color: red">说明：</font>性别定位/多个一卖等。如Women/Men/Girl/Baby/Kids/1PC/2PC/5PC/4 Colors/5Pcs Set…
            </span>
          </el-col>
          <el-col :span="21" style="margin-left: 100px;margin-top: 10px">
            <el-input
                      v-model="editForm.headKeywords"
                      style="width: 96%"
                      class="aArial"
                      placeholder="--一个关键词--"
                      @input="top($event)"
            ></el-input>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="24" style="margin-top: 4px">
           <span style="text-align: center;margin-left: 15px;margin-right: 13px">
            必选关键词
           </span>
             <span>
              <span style="color: red">{{bxlength}}</span>个关键词<span style="color: red;margin-left: 10px">{{bxtotal}}</span>个字符
            </span>
            <span>
              <font style="color: red;margin-left: 10px">说明：</font>物品名/材质/特征等。如T-Shirt(物品名)/V-neck(特征)/Cotton(材质)
            </span>
            <el-button type="text" @click="dialogTableVisible = true">批量设置</el-button>
          </el-col>
          <el-col :span="23">
            <div style="margin-left: 70px">
              必填
              <el-input class="aArial"
                        style="width:31.1%" v-model="mandatoryData[0]" @blur="mandatory()"></el-input>
              <el-input class="aArial"
                        style="width:31.1%" v-model="mandatoryData[1]" @blur="mandatory()"></el-input>
              <el-input class="aArial"
                        style="width:31.1%" v-model="mandatoryData[2]" @blur="mandatory()"></el-input>
            </div>
            <div style="margin-left: 70px;margin-top: 5px">
              选填
              <el-input class="aArial"
                        style="width:31.1%" v-model="mandatoryData[3]" @blur="mandatory()"></el-input>
              <el-input class="aArial"
                        style="width:31.1%" v-model="mandatoryData[4]" @blur="mandatory()"></el-input>
              <el-input class="aArial"
                        style="width:31.1%" v-model="mandatoryData[5]" @blur="mandatory()"></el-input>

            </div>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="24" style="margin-top: 4px">
            <span style="text-align: center;margin-left: 15px;margin-right: 13px">
            随机关键词
           </span>
              <span>
              <span style="color: red">{{sjlength}}</span>个关键词<span style="color: red;margin-left: 10px">{{sjtotal}}</span>个字符
            </span>
            <span>
              <font style="color: red;margin-left: 10px">说明：</font>形容词/品类热词等。如Fashion/Elegant/Hot/DIY/Casual…
            </span>
            <el-button type="text" @click="dialogTable = true">批量设置</el-button>
          </el-col>
          <el-col :span="23">
            <div style="margin-left: 70px">
              必填
              <el-input class="aArial"
                        style="width:18.5%" v-model="randomData[0]" @blur="random()"></el-input>
              <el-input class="aArial"
                        style="width:18.5%" v-model="randomData[1]" @blur="random()"></el-input>
              <el-input class="aArial"
                        style="width:18.5%" v-model="randomData[2]" @blur="random()"></el-input>
              <el-input class="aArial"
                        style="width:18.5%" v-model="randomData[3]" @blur="random()"></el-input>
              <el-input class="aArial"
                        style="width:18.5%" v-model="randomData[4]" @blur="random()"></el-input>
            </div>
            <div style="margin-left: 70px;margin-top: 5px">
              选填
              <el-input class="aArial"
                        style="width:18.5%" v-model="randomData[5]" @blur="random()"></el-input>
              <el-input class="aArial"
                        style="width:18.5%" v-model="randomData[6]" @blur="random()"></el-input>
              <el-input class="aArial"
                        style="width:18.5%" v-model="randomData[7]" @blur="random()"></el-input>
              <el-input class="aArial"
                        style="width:18.5%" v-model="randomData[8]" @blur="random()"></el-input>
              <el-input class="aArial"
                        style="width:18.5%" v-model="randomData[9]" @blur="random()"></el-input>

            </div>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="24" style="margin-top: 10px">
             <span style="text-align: center;float: left;margin-left: 15px;margin-right: 13px">
            最后关键词
          </span>
               <span>
              <span style="color: red">{{last}}</span>个字符
            </span>
            <span>
              <font style="color: red">说明：</font>附加说明词。如Randomly/S-3XL/2ml/(Color: Nude)/Big Size…
            </span>
            </el-col>
          <el-col :span="21" style="margin-left: 100px;margin-top: 10px;margin-bottom: 20px">
            <el-input
                      v-model="editForm.tailKeywords"
                      style="width: 96%"
                      class="aArial"
                      placeholder="--最多一个关键词--"
                      @input="bottm($event)"
            ></el-input>
          </el-col>
        </el-col>
        <el-col :span="24" style="margin-bottom: 15px">
          <span  style="text-align: right;margin-top: 8px;color: red;float: left;padding-left: 40px">
            *描述
          </span>
          <el-col :span="22">
            <el-input
                    type="textarea"
                    :rows="14"
                    v-model="editForm.description"
                    class="aArial"
                    style="width:96%;margin-left: 27px;font-family:Arial;"></el-input>
          </el-col>
        </el-col>
      </el-row>
    </el-form>
    <el-form :model="oaGoods"
             :inline="true"
             label-width="100px"
             ref="oaGoods">
      <el-row style="margin-left: 10px">
        <el-col :span="8">
          <el-form-item label="供应商链接1">
            <el-input
                      v-model="oaGoods.vendor1"
                      style="width:360px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="供应商链接2">
            <el-input
                      v-model="oaGoods.vendor2"
                      style="width:360px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="供应商链接3">
            <el-input
                      v-model="oaGoods.vendor3"
                      style="width:360px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="平台链接1">
            <el-input
                      v-model="oaGoods.origin1"
                      style="width:360px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="平台链接2">
            <el-input
                      v-model="oaGoods.origin2"
                      style="width:360px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="平台链接3">
            <el-input
                      v-model="oaGoods.origin3"
                      style="width:360px"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-col :span="24"
            style="padding: 0;margin-left: 15px;">
      <h3 class="toolbar essential" style="margin-top: 15px;margin-bottom: 15px">SKU<span style="float:right;margin-right: 78px;font-size: 14px;margin-bottom: 15px;display: block">共{{skuTotal}}条<span style="margin-left: 15px">第1-{{skuTotal}}条数据</span></span>
      </h3>
       <el-input style="float:left;" placeholder="替换前" v-model="ordColor" class="wid100" size="medium"></el-input>
        <el-input style="float:left;margin-left:5px;" placeholder="替换后" v-model="newColor" class="wid100" size="medium"></el-input>
        <el-button type="success" style="float:left;width:100px;margin-left:5px;" @click="replaceColor" size="medium">替换款式1</el-button>
        <el-input style="float:left;margin-left:10px;" placeholder="替换前" v-model="ordSize" class="wid100" size="medium"></el-input>
        <el-input style="float:left;margin-left:5px;" placeholder="替换后" v-model="newSize" class="wid100" size="medium"></el-input>
        <el-button type="danger" style="float:left;width:100px;margin-left:5px;" @click="replaceSize" size="medium">替换款式2</el-button>
        <el-input style="float:left;margin-left:10px;" placeholder="替换前" v-model="ordpro" class="wid100" size="medium"></el-input>
        <el-input style="float:left;margin-left:5px;" placeholder="替换后" v-model="newpro" class="wid100" size="medium"></el-input>
        <el-button type="warning" style="float:left;width:100px;margin-left:5px;" @click="replacePro" size="medium">替换款式3</el-button>
        <el-button type="primary" style="float:left;width:100px;margin-left:5px;" @click="deleteAll" size="medium">批量删除</el-button>
        <!-- <el-button type="success" style="float:left;width:100px;margin-left:5px;" @click="allStyle" size="medium">填充款式</el-button> -->
    </el-col>
    <el-col :span="24" style="margin-top:15px;">
    </el-col>
    <!--<el-select v-model="btn"-->
               <!--size="small"-->
               <!--placeholder="请选择操作方式" class="edSel">-->
      <!--<el-option v-for="item in options"-->
                 <!--:key="item.value"-->
                 <!--:label="item.label"-->
                 <!--:value="item.value"></el-option>-->
    <!--</el-select>-->
    <el-table :data="tableData" border style="width: 98%;margin-left: 1%" @selection-change="selsChange" max-height="500" :header-cell-style="getRowClass" v-loading="loading">
      <el-table-column type="index"
                       align="center"
                       width="40"
                       label="#"
                       fixed
                       header-align="center">
      </el-table-column>
      <el-table-column type="selection"
                       align="center"
                       width="40"
                       fixed
                       header-align="center"></el-table-column>
      <el-table-column label="操作"
                       header-align="center"
                       width="50"
                       fixed
                       align="center">
        <template slot-scope="scope">
          <el-tooltip content="删除">
            <i class="el-icon-delete"
               @click="del(scope.$index, scope.row)"
               style="color:#409EFF;cursor:pointer;"></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="SKU"
                       prop="sku"
                       fixed
                       width="160"
                       header-align="center">
        <template slot-scope="scope">
          <el-input size="small"
                    v-model="scope.row.sku"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="款式1"
                       prop="property1"
                       width="160"
                       fixed
                       header-align="center">
        <template slot-scope="scope">
          <el-input size="small"
                    v-model="scope.row.property1"></el-input>                  
        </template>
      </el-table-column>
      <el-table-column label="款式2"
                       prop="property2"
                       width="120"
                       fixed
                       header-align="center">
        <template slot-scope="scope">
          <el-input size="small"
                    v-model="scope.row.property2"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="款式3"
                       prop="property3"
                       width="90"
                       header-align="center">
        <template slot-scope="scope">
          <el-input size="small"
                    v-model="scope.row.property3"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="成本价"
                       prop="costPrice"
                       width="90"
                       header-align="center">
        <template slot-scope="scope">
          <el-input size="small"
                    v-model="scope.row.costPrice"></el-input>                 
        </template>
      </el-table-column>
      <el-table-column label="重量"
                       prop="weight"
                       width="90"
                       header-align="center">
        <template slot-scope="scope">
          <el-input size="small"
                    v-model="scope.row.weight"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="零售价"
                       prop="retailPrice"
                       width="90"
                       header-align="center">
        <template slot-scope="scope">
          <el-input size="small"
                    v-model="scope.row.retailPrice"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="joom零售价"
                       prop="joomPrice"
                       width="100"
                       header-align="center">
        <template slot-scope="scope">
          <el-input size="small"
                    v-model="scope.row.joomPrice"></el-input>            
        </template>
      </el-table-column>
      <el-table-column label="joom运费"
                       prop="joomShipping"
                       width="90"
                       header-align="center">
        <template slot-scope="scope">
          <el-input size="small"
                    v-model="scope.row.joomShipping"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="备货数量"
                       prop="stockNum"
                       width="90"
                       header-align="center">
        <template slot-scope="scope">
          <el-input size="small"
                    v-model="scope.row.stockNum" v-if="editForm.stockUp=='是'"></el-input>
          <el-input size="small"
                    v-model="scope.row.stockNum" disabled v-if="editForm.stockUp=='否'"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="供应商"
                       width="200" 
                       prop="property2"
                       header-align="center">
        <template slot-scope="scope">
          <el-select v-model="scope.row.offerId" placeholder="请选择供应商" size="small" style="width:100%;margin-top:5px;" @change="currentSel(scope.$index,$event)">
            <el-option
              v-for="(item,index) in data1688"
              :key="index"
              :label="item.vendor"
              :value="item.offerId">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="1688规格"
                       prop="property2"
                       width="250"
                       header-align="center">
        <template slot-scope="scope">
          <el-select v-model="scope.row.specId" placeholder="请选择" style="width:100%">
            <el-option
              v-for="(item,index) in scope.row.selectData"
              :key="index"
              :label="item.style"
              :value="item.specId">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
    </el-table>
    <el-row style="margin-top:15px;padding-left: 1%">
      <el-col :span="3">
        <input placeholder="行数" v-model="rows"
                  style="width:54%;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center">
        <span class="xzz" @click="addClomun">新增行</span>
        <!--<el-button size="small"-->
                   <!--@click="addClomun">新增行</el-button>-->
      </el-col>
      <el-col :span="4">
        <input placeholder="成本价￥" v-model="costprice"
               style="width:52%;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center">
        <span class="xzz1" @click="cosprice">成本确定</span>
        <!--<el-input v-model="costprice"-->
                  <!--size="small"-->
                  <!--placeholder="成本价￥"-->
                  <!--style="width:117px"></el-input>-->
        <!--<el-button size="small"-->
                   <!--@click="cosprice">成本确定</el-button>-->
      </el-col>
      <el-col :span="4">
        <input placeholder="重量g" v-model="weight"
               style="width:50%;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center">
        <span class="xzz1" @click="weht">重量确定</span>
        <!--<el-input v-model="weight"-->
                  <!--size="small"-->
                  <!--placeholder="重量g"-->
                  <!--style="width:117px"></el-input>-->
        <!--<el-button size="small"-->
                   <!--@click="weht">重量确定</el-button>-->
      </el-col>
      <el-col :span="4">
        <input placeholder="零售价$" v-model="retailprice"
               style="width:50%;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center">
        <span class="xzz1" @click="priceAll">零售确定</span>
        <!--<el-input v-model="retailprice"-->
                  <!--size="small"-->
                  <!--placeholder="零售价$"-->
                  <!--style="width:117px"></el-input>-->
        <!--<el-button size="small"-->
                   <!--@click="price">价格确定</el-button>-->
      </el-col>
      <el-col :span="5">
        <input placeholder="joom零售价$" v-model="joomretailprice"
               style="width:51%;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center">
        <span class="xzz1" @click="joomprice">Joom价确定</span>
        <!--<el-input v-model="joomretailprice"-->
                  <!--size="small"-->
                  <!--placeholder="joom零售价$"-->
                  <!--style="width:117px"></el-input>-->
        <!--<el-button size="small"-->
                   <!--@click="joomprice">价格确定</el-button>-->
      </el-col>
      <el-col :span="4">
        <input placeholder="joom运费$" v-model="transportationcost"
               style="width:52%;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center">
        <span class="xzz1" @click="transport">运费确定</span>
        <!--<el-input v-model="transportationcost"-->
                  <!--size="small"-->
                  <!--placeholder="joom运费$"-->
                  <!--style="width:117px"></el-input>-->
        <!--<el-button size="small"-->
                   <!--@click="transport">价格确定</el-button>-->
      </el-col>
    </el-row>
     <div style="margin-top:15px;margin-left: 1%" class="pos">
      <el-button size="small"
                 type="success" @click="oneKey()">一键生成SKU</el-button>
      <el-button size="small"
                 type="warning" @click="passAll">导入普源</el-button>
      <span class="pob" v-show="titleTips">未导入的商品不能完善</span>           
      <el-button size="small"
                 type="primary" @click="save1()" :disabled="saveFlag" style="margin-left:12px;">
                  <span @mouseover="saveFb" @mouseout="saveFbfalse" style="display:block;width:100%;">保存并完善</span>
                 </el-button>
      <el-button size="small"
                 type="danger" @click="createOrder" :disabled="orderTrue">生成采购单</el-button>
      <el-button size="small"
                 type="success" @click="synchro1688">同步1688</el-button>
      <el-select v-model="allSupplierValue" placeholder="请选择供应商" size="small">
            <el-option
              v-for="(item,index) in data1688"
              :key="index"
              :label="item.vendor"
              :value="item.offerId">
            </el-option>
        </el-select>
      <el-button type="primary" @click="allSupplier" size="small">一键应用供应商</el-button>           
      <el-button size="small"
                 type="warning" @click="allStyle">一键填充款式</el-button>           
      <!-- <el-select v-model="value1688" placeholder="请选择供应商" value-key="companyName" size="small" @change="currentSel">
        <el-option
          v-for="item in data1688"
          :key="item.companyName"
          :label="item.companyName"
          :value="item">
        </el-option>
      </el-select> -->
      <span style="font-size:13px;color:red;margin-left:10px;">提示：先同步1688->选择供应商->再选择1688规格，如果对应不了1688规格请选择无。</span>                      
      <!--<el-button size="small"-->
                 <!--type="danger">删除行</el-button>-->
    </div>
    <el-dialog title="批量增加必选关键词"
               :visible.sync="dialogTableVisible">
      <el-input size="small"
                type="textarea"
                :rows="20"
                placeholder="-多个必选关键词-"
                @change="mandatoryDate($event)"
      ></el-input>
    </el-dialog>
    <el-dialog title="批量增加随机关键词"
               :visible.sync="dialogTable">
      <el-input size="small"
                type="textarea"
                :rows="20"
                placeholder="-多个随机关键词-"
                @change="mandatoryDate1($event)"></el-input>
    </el-dialog>
    <el-col :span="24" style="background: #fff;position: fixed;bottom: 0px; z-index:999;border-top: #eee solid 1px">
      <el-col :span="24" :offset="8">
        <el-button type="primary"
                   @click="save"
                   style="width:350px;margin: 5px 0;margin-top: 8px;padding: 15px 0">保存</el-button>
      </el-col>
    </el-col>
    <div :class="mask?'zhezhao':''"></div>
  </section>
</template>
<script type="text/ecmascript-6">
import { APIAttributeInfo, APISaveAttribute, APIAttribute,APISaveFinishAttribute,APIDeleteVariant,APIAttributeToShopElf,APIMakePurchasingOrder,APIsync1688Goods,APIget1688Suppliers,APIsync1688GoodStyle  } from '../../api/product'
import { getMember, getGoodscats, getAttributeInfoPackName, getAttributeInfoSpecialAttribute, getAttributeInfoStoreName, getAttributeInfoSeason, getAttributeInfoPlat, getAttributeInfoSalesman, getAttributeInfoCat, getAttributeInfoSubCat } from '../../api/profit'
import { getMenu } from '../../api/login'
export default {
  data() {
    return {
      allSupplierValue:null,
      ordColor:'',
      newColor:'',
      ordSize:'',
      newSize:'',
      ordpro:'',
      newpro:'',
      tableData: [],
      titleTips:false,
      mask:false,
      btn: '',
      rows: 1,
      rowss: 1,
      IsF: ['是', '否'],
      costprice: null,
      weight: null,
      retailprice: null,
      joomretailprice: null,
      transportationcost: null,
      dialogTableVisible: false,
      dialogTable: false,
      sjlength: 0,
      bxlength: 0,
      orderTrue:false,
      saveFlag:false,
      jspt: false,
      cate: [],
      last: 0,
      dyxs: false,
      skuTotal: 0,
      category: [],
      spec: [],
      specificity: [],
      repertory: [],
      seasonn: [],
      violation: [],
      mainSsale: [],
      mainCategory: [],
      childrenCategory: [],
      screen: [],
      foremost: 0,
      options1: [],
      options2: [],
      condition: {
        id: 0
      },
      bxtotal: 0,
      sjtotal: 0,
      mandatoryData: ['', '', '', '', '', ''],
      randomData: ['', '', '', '', '', '', '', '', '', ''],
      editForm: {},
      oaGoods: {},
      dictionaryName1: '',
      mapPersons1: '',
      allMenu:[],
      sels:[],
      data1688:[],
      value1688:null,
      loading:false,
      style1688Data:[],
      id1688:null,
    }
  },
  methods: {
    deleteAll(){
      let arrId = []
      for (let i = 0; i < this.sels.length; i++) {
        arrId.push(this.sels[i].id);
      }
      let aryId={
        id:arrId
      }
      APIDeleteVariant(aryId).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          for(let k =0;k<this.tableData.length;k++){
            for(let j =0;j<aryId.length;j++){
              if(this.tableData[k].id==aryId[j]){
                this.tableData.splice(k, 1)
              }
            }
          }
          this.skuTotal = this.tableData.length
//          this.getData()
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "color:#3c8dbc;background:#f5f7fa";
      } else {
        return "";
      }
    },
    allStyle(){
      for(let i=0;i<this.tableData.length;i++){
        const styleNumber=this.tableData[i].specId
        for(let k =0;k<this.data1688.length;k++){
          let dataValue = this.data1688[k].value
          for(let j =0;j<dataValue.length;j++){
            if(styleNumber==dataValue[j].specId){
              const arr = dataValue[j].style
              this.tableData[i].property1=arr.split(' ')[0]
              this.tableData[i].property2=arr.split(' ')[1]
            }
          }
        }
      }
    },
    allSupplier(){
      for(let i =0;i<this.tableData.length;i++){
        this.tableData[i].offerId=this.allSupplierValue
        this.tableData[i].specId=''
        for(let k=0;k<this.data1688.length;k++){
          if(this.tableData[i].offerId==this.data1688[k].offerId){
            this.tableData[i].selectData=this.data1688[k].value
          }
        }
      }
    },    
    currentSel(index,e){
      for(var i =0;i<this.data1688.length;i++){
        if(this.data1688[i].offerId==e){
          this.tableData[index].selectData=this.data1688[i].value
          this.tableData[index].specId=''
        }
      }
    },
    synchro1688(){
      let obj={
        id:this.condition.id,
      }
      this.loading=true
      APIsync1688Goods(obj).then(res => {
        if(res.data.code=='200'){
          this.$message({
            message: '同步成功',
            type: 'success'
          })
          this.get1688Suppliers();
        }else{
          this.loading=false 
          this.$message.error(res.data.message)
        }  
      })
    },
    get1688Suppliers(){
      let obj={
        id:this.condition.id,
      }
      APIget1688Suppliers(obj).then(res => {
         if(res.data.code==200){
           this.data1688=res.data.data
         }else{
           this.$message.error(res.data.message)
         }  
         this.loading=false 
      })
    },
    saveFb(){
      if(this.saveFlag){
        this.titleTips=true
      }else{
        this.titleTips=false
      }
    },
    saveFbfalse(){
      this.titleTips=false
    },
    replaceColor(){
      for(let i=0;i<this.tableData.length;i++){
        if(this.ordColor==this.tableData[i].property1){
          this.tableData[i].property1=this.newColor
        }
      }
    },
    replaceSize(){
      for(let i=0;i<this.tableData.length;i++){
        if(this.ordSize==this.tableData[i].property2){
          this.tableData[i].property2=this.newSize
        }
      }
    },
    replacePro(){
      for(let i=0;i<this.tableData.length;i++){
        if(this.ordpro==this.tableData[i].property3){
          this.tableData[i].property3=this.newpro
        }
      }
    },
    selsChange(sels) {
      this.sels = sels
    },
    passAll() {
        this.mask=true
        let arrI=[]
        arrI.push(this.editForm.id)
        let dataTe = {
          id: arrI
        }
        APIAttributeToShopElf(dataTe).then(res => {
          if (res.data.code === 0) {
            this.$confirm('该商品已导入过普源, 是否重新导入?\n重复SKU以下普源信息不会被更新：产品名称 产品状态 款式 成本价 重量 售价 网页URL 网页URL2 网页URL3 网页URL4 网页URL5 网页URL6 英文名称', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }).then(() => {
               let arrIDa=[]
                arrIDa.push(this.editForm.id)
                let dataTeDa = {
                  id: arrIDa,
                  repeat:1
                }
                APIAttributeToShopElf(dataTeDa).then(res => {
                  this.mask=false
                  this.$message({
                    message: res.data.message,
                    type: 'success'
                  })
                  this.saveFlag=false
                }) 
            }).catch(() => {
              this.mask=false
            });
          }else if(res.data.code === 1){
            this.mask=false
            this.$message({
              message: '成功',
              type: 'success'
            })
            this.saveFlag=false
          }else {
            this.mask=false
            this.$message.error(res.data.message)
          }
        })
    },
    createOrder(){
      if(!this.orderTrue){
        let numberStr=0
        for(let i=0;i<this.tableData.length;i++){
          numberStr+=Number(this.tableData[i].stockNum)
        }
        if(numberStr>50 || numberStr==0){
          this.$message.error('备货数量不能大于50或者等于0')
          return
        }else{
          // let arrIdr=[]
          // arrIdr.push(this.editForm.id)
          let dataTeod = {
            id: this.editForm.id
          }
          APIMakePurchasingOrder(dataTeod).then(res => {
            if (res.data.code === 200) {
              this.$message({
                showClose: true,
                message: res.data.data[0],
                type: 'success',
                duration: 50 * 1000
              })
            } else {
              this.$message.error(res.data.message)
            }
          })
        }
      }
    },
    formatTen(num) {
      return num > 9 ? (num + '') : ('0' + num)
    },
    oneKey() {
      const obj = {}; const ary = []
      this.tableData.map((item, index, input) => {
        if (obj[item.property1] !== item.property1) {
          ary.push(item)
          item.index = JSON.parse(JSON.stringify(ary)).length
          const k = ary.length
          item.sku = `${this.editForm.goodsCode}${this.formatTen(k)}${item.property2 ? `_` + item.property2 : ''}${
            item.property3 ? `_` + item.property3 : ''
          }`
        } else {
          var targetIndex = ''
          for (var j = 0; j < ary.length; j++) {
            if (item.property1 == ary[j].property1) {
              targetIndex = ary[j].index
              break
            }
          }
          item.sku = `${this.editForm.goodsCode}${this.formatTen(targetIndex)}${
            item.property2 ? `_` + item.property2 : ''
          }${item.property3 ? `_` + item.property3 : ''}`
        }
        obj[item.property1] = item.property1
      })
    },
    mandatoryDate(e) {
      this.bxlength = 0
      this.bxtotal = 0
      var st1 = 0
      const arde = e.split(/[(\r\n)\r\n]+/)
      for (var i = 0; i < arde.length; i++) {
        var daee = arde[i]
        for (var j = 0; j < this.mandatoryData.length; j++) {
          this.mandatoryData[i] = daee
        }
      }
      for (var i = 0; i < this.mandatoryData.length; i++) {
        if (this.mandatoryData[i] != '') {
          this.bxlength++
          st1 += this.mandatoryData[i].length
        }
      }
      this.bxtotal = st1
    },
    mandatoryDate1(e) {
      this.sjlength = 0
      this.sjtotal = 0
      var st2 = 0
      const arde1 = e.split(/[(\r\n)\r\n]+/)
      for (var i = 0; i < arde1.length; i++) {
        var daee = arde1[i]
        for (var j = 0; j < this.randomData.length; j++) {
          this.randomData[i] = daee
        }
      }
      for (var i = 0; i < this.randomData.length; i++) {
        if (this.randomData[i] != '') {
          this.sjlength++
          st2 += this.randomData[i].length
        }
      }
      this.sjtotal = st2
    },
    attribute(name){
      if(name=='属性信息'){
        sessionStorage.setItem('judge', "属性信息")
        this.$router.push({
          path: `/v1/oa-goodsinfo/index`
        })
      }else if(name=='图片信息'){
        sessionStorage.setItem('judge', "图片信息")
        this.$router.push({
          path: `/v1/oa-goodsinfo/index`
        })
      }else {
        sessionStorage.setItem('judge', "平台信息")
        this.$router.push({
          path: `/v1/oa-goodsinfo/index`
        })
      }
    },
    iSn(e) {
    },
    selectalld() {
      var ard = []
      for (const item in this.violation) {
        ard.push(this.violation[item])
      }
      this.editForm.dictionaryName = ard
      this.dictionaryName1 = ard.join(',')
      //      this.member = this.allMember
    },
    noselectd() {
      this.editForm.dictionaryName = []
      this.dictionaryName1 = ''
      //      this.member = this.allMember
    },
    selectalld1() {
      var ard1 = []
      for (const item in this.mainSsale) {
        ard1.push(this.mainSsale[item])
      }
      this.editForm.mapPersons = ard1
      this.mapPersons1 = ard1.join(',')
      //      this.member = this.allMember
    },
    noselectd1() {
      this.editForm.mapPersons = []
      this.mapPersons1 = ''
      //      this.member = this.allMember
    },
    forbidSale(e) {
      this.dictionaryName1 = e.join(',')
    },
    forbidSale1(e) {
      this.mapPersons1 = e.join(',')
    },
    top(e) {
      this.foremost = e.length
    },
    bottm(e) {
      this.last = e.length
    },
    mainIndex(item) {
      this.oaGoods.cate = item
      this.childrenCategory = []
      for (var key in this.screen) {
        if (this.screen[key] == item) {
          this.childrenCategory.push(key)
        }
      }
      if (this.childrenCategory.length != 0) {
        this.oaGoods.subCate = this.childrenCategory[0]
      } else {
        this.oaGoods.subCate = ''
      }
    },
    childrenIndex(item) {
      this.oaGoods.subCate = item
    },
    pushVin(item) {
      this.editForm.dictionaryName.push(item)
      this.jspt = !this.jspt
    },
    pushSale(item) {
      this.editForm.mapPersons.push(item)
      this.dyxs = !this.dyxs
    },
    specIndex(e) {
      this.editForm.packName = e
    },
    specificityIndex(e) {
      this.editForm.attributeName = e
    },
    repertoryIndex(e) {
      this.editForm.storeName = e
    },
    seasonnIndex(e) {
      this.editForm.season = e
    },
    addzk() {
      this.jspt = !this.jspt
    },
    addxs() {
      this.dyxs = !this.dyxs
    },
    dellxs(index) {
      this.editForm.mapPersons.splice(index, 1)
    },
    delljs(index) {
      this.editForm.dictionaryName.splice(index, 1)
    },
    del(index, row) {
      let arrId = []
      arrId.push(row.id)
      let aryId={
        id:arrId
      }
      APIDeleteVariant(aryId).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.tableData.splice(index, 1)
          this.skuTotal = this.tableData.length
//          this.getData()
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    // 增加行
    addClomun() {
      for (let i = 0; i < this.rows; i++) {
        var obj = {}
        obj.id = null
        obj.infoId = this.editForm.id
        obj.sku = ''
        obj.property1 = null
        obj.property2 = null
        obj.property3 = null
        obj.weight = null
        obj.memo1 = null
        obj.memo2 = null
        obj.memo3 = null
        obj.memo4 = null
        obj.linkUrl = null
        obj.goodsSkuId = null
        obj.retailPrice = null
        obj.costPrice = null
        obj.stockNum = null
        obj.did = null
        obj.joomPrice = null
        obj.joomShipping = null
        obj.offerId = null
        obj.specId = null
        obj.selectData = []
        this.tableData.push(obj)
      }
      this.skuTotal = this.tableData.length
    },
    // 成本确定
    cosprice() {
      if (this.costprice) {
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].costPrice = this.costprice
        }
      } else {
        return false
      }
    },
    // 重量确定
    weht() {
      if (this.weight) {
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].weight = this.weight
        }
      } else {
        return false
      }
    },
    // 零售价格确定
    priceAll() {
      if (this.retailprice) {
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].retailPrice = this.retailprice
          console.log(this.tableData[i].retailPrice)
        }
      } else {
        return false
      }
    },
    // joom零售价格确定
    joomprice() {
      if (this.joomretailprice) {
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].joomPrice = this.joomretailprice
        }
      } else {
        return false
      }
    },
    // joom运费
    transport() {
      if (this.transportationcost) {
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].joomShipping = this.transportationcost
        }
      } else {
        return false
      }
    },
    save1() {
      if(!this.editForm.goodsName){
        this.$message.error('请填写商品名称')
        return
      }
      if(!this.editForm.aliasCnName){
        this.$message.error('请填写中文申报名')
        return
      }
      if(!this.editForm.aliasEnName){
        this.$message.error('请填写英文申报名')
        return
      }
      if(!this.oaGoods.cate){
        this.$message.error('请选择主类目')
        return
      }
      if(!this.editForm.supplierName){
        this.$message.error('请填写供应商名称')
        return
      }
      if(!this.editForm.packName){
        this.$message.error('请选择包装规格')
        return
      }
      if(!this.editForm.storeName){
        this.$message.error('请选择仓库')
        return
      }
      if(!this.editForm.description){
        this.$message.error('请填写描述')
        return
      }
      if(!this.editForm.hsCode){
        this.$message.error('请填写海关编码')
        return
      }
      const md = JSON.stringify(this.mandatoryData)
      const mr = JSON.stringify(this.randomData)
      const saveInfo = {
        basicInfo: {
          goodsInfo: {
            id: this.editForm.id,
            isLiquid: this.editForm.isLiquid,
            isPowder: this.editForm.isPowder,
            isMagnetism: this.editForm.isMagnetism,
            isCharged: this.editForm.isCharged,
            description: this.editForm.description,
            goodsName: this.editForm.goodsName,
            aliasCnName: this.editForm.aliasCnName,
            aliasEnName: this.editForm.aliasEnName,
            packName: this.editForm.packName,
            season: this.editForm.season,
            dictionaryName: this.dictionaryName1,
            supplierName: this.editForm.supplierName,
            storeName: this.editForm.storeName,
            purchaser: this.editForm.purchaser,
            possessMan1: this.editForm.possessMan1,
            possessMan2: this.editForm.possessMan2,
            declaredValue: this.editForm.declaredValue,
            picUrl: this.editForm.picUrl,
            goodsId: this.editForm.goodsId,
            goodsCode: this.editForm.goodsCode,
            achieveStatus: this.editForm.achieveStatus,
            devDatetime: this.editForm.devDatetime,
            developer: this.editForm.developer,
            updateTime: this.editForm.updateTime,
            picStatus: this.editForm.picStatus,
            supplierID: this.editForm.supplierID,
            storeID: this.editForm.storeID,
            attributeName: this.editForm.attributeName,
            bgoodsId: this.editForm.bgoodsId,
            completeStatus: this.editForm.completeStatus,
            isVar: this.editForm.isVar,
            headKeywords: this.editForm.headKeywords,
            requiredKeywords: md,
            randomKeywords: mr,
            tailKeywords: this.editForm.tailKeywords,
            wishTags: this.editForm.wishTags,
            stockUp: this.editForm.stockUp,
            picCompleteTime: this.editForm.picCompleteTime,
            goodsStatus: this.editForm.goodsStatus,
            stockDays: this.editForm.stockDays,
            wishPublish: this.editForm.wishPublish,
            number: this.editForm.number,
            mid: this.editForm.mid,
            extendStatus: this.editForm.extendStatus,
            mapPersons: this.mapPersons1,
            filterType: this.editForm.filterType,
            hsCode:this.editForm.hsCode,
          },
          oaGoods: {
            nid: this.oaGoods.nid,
            cate: this.oaGoods.cate,
            subCate: this.oaGoods.subCate,
            vendor1: this.oaGoods.vendor1,
            vendor2: this.oaGoods.vendor2,
            vendor3: this.oaGoods.vendor3,
            origin1: this.oaGoods.origin1,
            origin2: this.oaGoods.origin2,
            origin3: this.oaGoods.origin3
          }
        },
        offerId: this.id1688,
        skuInfo: this.tableData
      }
      APISaveFinishAttribute(saveInfo).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          setTimeout(()=>{
            location.reload()
          },1000)
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    save() {
      // if(!this.value1688){
      //   this.$confirm("没选1688商品,确认是否提交?", "提示", {
      //     confirmButtonText: "确定",
      //     cancelButtonText: "取消",
      //     type: "warning"
      //   }).catch(() => {
      //     return;     
      //   });
      // }
      if(!this.editForm.goodsName){
        this.$message.error('请填写商品名称')
        return
      }
      if(!this.editForm.aliasCnName){
        this.$message.error('请填写中文申报名')
        return
      }
      if(!this.editForm.aliasEnName){
        this.$message.error('请填写英文申报名')
        return
      }
      if(!this.oaGoods.cate){
        this.$message.error('请选择主类目')
        return
      }
      if(!this.editForm.supplierName){
        this.$message.error('请填写供应商名称')
        return
      }
      if(!this.editForm.packName){
        this.$message.error('请选择规格')
        return
      }
      if(!this.editForm.storeName){
        this.$message.error('请选择仓库')
        return
      }
      if(!this.editForm.description){
        this.$message.error('请填写描述')
        return
      }
      if(!this.editForm.hsCode){
        this.$message.error('请填写海关编码')
        return
      }
      const md = JSON.stringify(this.mandatoryData)
      const mr = JSON.stringify(this.randomData)
      const saveInfo = {
        basicInfo: {
          goodsInfo: {
            id: this.editForm.id,
            isLiquid: this.editForm.isLiquid,
            isPowder: this.editForm.isPowder,
            isMagnetism: this.editForm.isMagnetism,
            isCharged: this.editForm.isCharged,
            description: this.editForm.description,
            goodsName: this.editForm.goodsName,
            aliasCnName: this.editForm.aliasCnName,
            aliasEnName: this.editForm.aliasEnName,
            packName: this.editForm.packName,
            season: this.editForm.season,
            dictionaryName: this.dictionaryName1,
            supplierName: this.editForm.supplierName,
            storeName: this.editForm.storeName,
            purchaser: this.editForm.purchaser,
            possessMan1: this.editForm.possessMan1,
            possessMan2: this.editForm.possessMan2,
            declaredValue: this.editForm.declaredValue,
            picUrl: this.editForm.picUrl,
            goodsId: this.editForm.goodsId,
            goodsCode: this.editForm.goodsCode,
            achieveStatus: this.editForm.achieveStatus,
            devDatetime: this.editForm.devDatetime,
            developer: this.editForm.developer,
            updateTime: this.editForm.updateTime,
            picStatus: this.editForm.picStatus,
            supplierID: this.editForm.supplierID,
            storeID: this.editForm.storeID,
            attributeName: this.editForm.attributeName,
            bgoodsId: this.editForm.bgoodsId,
            completeStatus: this.editForm.completeStatus,
            isVar: this.editForm.isVar,
            headKeywords: this.editForm.headKeywords,
            requiredKeywords: md,
            randomKeywords: mr,
            tailKeywords: this.editForm.tailKeywords,
            wishTags: this.editForm.wishTags,
            stockUp: this.editForm.stockUp,
            picCompleteTime: this.editForm.picCompleteTime,
            goodsStatus: this.editForm.goodsStatus,
            stockDays: this.editForm.stockDays,
            wishPublish: this.editForm.wishPublish,
            number: this.editForm.number,
            mid: this.editForm.mid,
            extendStatus: this.editForm.extendStatus,
            mapPersons: this.mapPersons1,
            filterType: this.editForm.filterType,
            hsCode:this.editForm.hsCode,
          },
          oaGoods: {
            nid: this.oaGoods.nid,
            cate: this.oaGoods.cate,
            subCate: this.oaGoods.subCate,
            vendor1: this.oaGoods.vendor1,
            vendor2: this.oaGoods.vendor2,
            vendor3: this.oaGoods.vendor3,
            origin1: this.oaGoods.origin1,
            origin2: this.oaGoods.origin2,
            origin3: this.oaGoods.origin3
          }
        },
        offerId: this.id1688,
        skuInfo: this.tableData
      }
      APISaveAttribute(saveInfo).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
           setTimeout(()=>{
            location.reload()
          },1000)
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    mandatory(e) {
      this.bxlength = 0
      this.bxtotal = 0
      var st1 = 0
      for (var i = 0; i < this.mandatoryData.length; i++) {
        if (this.mandatoryData[i] != '') {
          this.bxlength++
          st1 += this.mandatoryData[i].length
        }
      }
      this.bxtotal = st1
    },
    random(e) {
      this.sjlength = 0
      this.sjtotal = 0
      var st2 = 0
      for (var i = 0; i < this.randomData.length; i++) {
        if (this.randomData[i] != '') {
          this.sjlength++
          st2 += this.randomData[i].length
        }
      }
      this.sjtotal = st2
    },
    getData() {
      APIAttributeInfo(this.condition).then(res => {
        this.tableData = res.data.data.skuInfo
        this.skuTotal = this.tableData.length
        this.editForm = res.data.data.basicInfo.goodsInfo
        this.oaGoods = res.data.data.basicInfo.oaGoods
        this.dictionaryName1 = this.editForm.dictionaryName
        this.mapPersons1 = this.editForm.mapPersons
        if(this.editForm.storeName==null){
          this.editForm.storeName='义乌仓'
        }
        this.editForm.stockUp=='否'?this.orderTrue=true:this.orderTrue=false
        this.editForm.achieveStatus=='待处理'?this.saveFlag=true:this.saveFlag=false
        this.editForm.requiredKeywords = JSON.parse(this.editForm.requiredKeywords)
        this.editForm.randomKeywords = JSON.parse(this.editForm.randomKeywords)
        if(this.editForm.dictionaryName){
          this.editForm.dictionaryName = this.editForm.dictionaryName.split(',')
        }else {
          this.editForm.dictionaryName = []
        }
        if(this.editForm.mapPersons){
          this.editForm.mapPersons = this.editForm.mapPersons.split(',')
        }else {
          this.editForm.mapPersons = []
        }
        if (this.editForm.headKeywords) {
          this.foremost = this.editForm.headKeywords.length
        }
        if (this.editForm.tailKeywords) {
          this.last = this.editForm.tailKeywords.length
        }
        if (this.editForm.requiredKeywords) {
          this.mandatoryData = this.editForm.requiredKeywords
        }
        if (this.editForm.randomKeywords) {
          this.randomData = this.editForm.randomKeywords
        }
        if (this.editForm.randomKeywords) {
          for (var i = 0; i < this.editForm.randomKeywords.length; i++) {
            if (this.editForm.randomKeywords[i] != '') {
              this.sjlength++
              this.sjtotal += this.editForm.randomKeywords[i].length
            }
          }
        }
        if (this.editForm.requiredKeywords) {
          for (var i = 0; i < this.editForm.requiredKeywords.length; i++) {
            if (this.editForm.requiredKeywords[i] != '') {
              this.bxlength++
              this.bxtotal += this.editForm.requiredKeywords[i].length
            }
          }
        }
        this.id1688=res.data.data.offerId
        if(this.id1688){
          for(var i =0;i<this.data1688.length;i++){
            if(this.id1688==this.data1688[i].offerId){
              this.value1688=this.data1688[i]
            }
          }
          this.currentSel(this.value1688)
        }
      })
    }
  },
  mounted() {
    getMenu().then(response => {
      const res = response.data.data
      const menu = res.filter(e => e.name === '产品中心')
      let arr=menu[0].children
      for(let i=0;i<arr.length;i++){
        if(arr[i].name=="产品资料"){
          this.allMenu=arr[i].tabs
        }
      }
    })
    this.condition.id = this.$route.params.id
    this.get1688Suppliers();
    this.getData()
    getGoodscats().then(response => {
      this.category = this.cate = response.data.data
    })
    getAttributeInfoPackName().then(response => {
      this.spec = response.data.data
    })
    getAttributeInfoSpecialAttribute().then(response => {
      this.specificity = response.data.data
    })
    getAttributeInfoStoreName().then(response => {
      this.repertory = response.data.data
    })
    getAttributeInfoSeason().then(response => {
      this.seasonn = response.data.data
    })
    getAttributeInfoPlat().then(response => {
      this.violation = response.data.data
    })
    getAttributeInfoSalesman().then(response => {
      this.mainSsale = response.data.data
    })
    getAttributeInfoCat().then(response => {
      this.mainCategory = response.data.data
    })
    getAttributeInfoSubCat().then(response => {
      this.screen = response.data.data
      const sCate = this.oaGoods.cate
      for (var key in this.screen) {
        if (this.screen[key] == sCate) {
          this.childrenCategory.push(key)
        }
      }
    })
  }
}
</script>
<style lang="scss" scoped>
section {
  margin-bottom: 80px;
}
.essential {
  font-size: 16px;
  line-height: 45px;
  font-weight: normal;
  padding-left: 18px;
  border-left: 2px solid #2395f1;
}
.el-form-item{
  margin-bottom: 18px;
}
  .fp{
    float: left;
  }
  .hovp:hover{
    color: steelblue;
  }
  .tabClass{
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    cursor: pointer;
  }
  .adClass{
    display: block;
    float: left;
    padding: 14px 30px;
    border-right: 1px solid #e4e7ed;
    cursor: pointer;
  }
  .actie{
    color: #409EFF;
  }
  .adClass:hover{
    color: #409EFF;
  }
  .edSel{
    margin-left: 20px;
    margin-bottom: 10px;
  }
  .xzz{
    display: block;
    float: left;
    text-align: center;
    line-height: 30px;
    border: #ccc solid 1px;
    cursor: pointer;
    padding: 0 3px;
    font-size: 13px;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }
.xzz1{
  display: block;
  float: left;
  text-align: center;
  line-height: 30px;
  border: #ccc solid 1px;
  cursor: pointer;
  padding: 0 8px;
  font-size: 13px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
.zhezhao{
  width: 200%;
  background: #000;
  height: 100%;
  position: fixed;
  opacity: 0.4;
  top: 0;
  left: -20rem;
  z-index: 999;
}
.wid100{
  width: 100px;
}
@media screen and (max-width: 1500px){
   .font13{
     font-size: 13px;
   }
}
@media screen and (max-width: 1400px){
   .font13{
     font-size: 12px;
   }
   .wid100{
    width: 80px;
  }
}
.pos{
  position: relative
}
.pob{
  position: absolute;
  left: 180px;
  top: -35px;
  display: block;
  background: #000;
  padding: 5px 10px;
  border-radius: 1px;
  color: #fff;
}
</style>

