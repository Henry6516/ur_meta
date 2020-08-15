<template>
  <section v-loading="joomloding">
    <!-- <div class="wishPas">
      <el-button
          type="primary"
          style="float: left;margin-left: 15px;margin-top:15px;"
          size="mini"
          @click="exportWish"
        >导出Wish</el-button>
    <el-button
          type="success"
          style="float: left;margin-left: 10px;margin-top:15px;"
          size="mini"
          @click="exportMymall"
        >导出mymall</el-button>
        <el-button
          type="warning"
          style="float: left;margin-left: 10px;margin-top:15px;"
          size="mini"
          @click="exportLazada"
        >导出lazada</el-button>
        <el-button
          type="danger"
          style="float: left;margin-left: 10px;margin-top:15px;"
          size="mini"
          @click="exportShopee"
        >导出shopee</el-button>
    </div>-->
    <el-col
      :span="24"
      class="toolbar"
      style="position:fixed;bottom:0px;text-align:center;z-index:10;padding-bottom:15px;padding-top: 12px"
    >
      <el-col :span="24" class="leftmedia">
        <el-button type="primary" @click="update" style="float: left;">保 存</el-button>
        <el-button style="float:left;" type="success" @click="keepPerfect('Wish')">保存完善Wish</el-button>
        <el-button style="float:left;" type="success" @click="keepPerfect('Joom')">保存完善Joom</el-button>
        <el-select
          placeholder="--请选择部门--"
          clearable
          v-model="departmentValue"
          @change="selectDep"
          style="float: left;width:160px;margin-left:10px;"
          class="top1600 top1601"
        >
          <el-option
            v-for="(item, key) in department"
            :key="item.key"
            :label="item.department"
            :value="item.department"
          ></el-option>
        </el-select>
        <!-- <span class="exportAccount" @click="exportJoom">导出Joom</span> -->
        <el-select
          placeholder="--请选择平台--"
          clearable
          v-model="platValue"
          class="clshopify"
          @change="selectPlat()"
          style="float: left;width:160px;"
        >
          <el-option v-for="(item, key) in platData" :key="item.key" :label="item" :value="item"></el-option>
        </el-select>
        <!-- <span class="exportAccount" @click="exportShopify" style="margin-right:10px;">导出shopify</span> -->
        <el-select
          placeholder="--请选择账号--"
          clearable
          multiple
          collapse-tags
          v-model="suffixValue"
          class="top1600 top1601"
          style="float: left;width:250px;"
        >
          <el-button plain type="info" @click="selectalld3">全选</el-button>
          <el-button plain type="info" @click="noselectd3">取消</el-button>
          <el-option v-for="(item, key) in suffixData" :key="item.key" :label="item" :value="item"></el-option>
        </el-select>
        <el-button type="danger" @click="keepExport" style="float: left;">导出模板</el-button>
        <!-- <span class="exportAccount top1600" @click="keepExport" style="padding-left:20px;padding-right:20px;">导 出</span> -->
        <!--<el-dropdown @command="handleCommand"-->
        <!--placement="top-start">-->
        <!--<el-button type="primary">标记完善<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i></el-button>-->
        <!--<el-dropdown-menu slot="dropdown">-->
        <!--<el-dropdown-item command="a">Wish</el-dropdown-item>-->
        <!--<el-dropdown-item command="b">Joom</el-dropdown-item>-->
        <!--</el-dropdown-menu>-->
        <!--</el-dropdown>-->
        <!-- <el-select
          v-model="tips"
          placeholder="--保存完善--"
          style="float: left;width: 80px;"
        >
          <el-option label="Wish" value="Wish"></el-option>
          <el-option label="Joom" value="Joom"></el-option>
        </el-select>-->
        <!-- <span class="exportAccount" @click="keepPerfect">
          <i class="el-icon-document" style="margin-right:5px;"></i>保存完善
        </span>-->
        <!-- <span class="exportAccount1" style @click="keepExport">
          <i class="el-icon-download" style="margin-right:5px;"></i>导出
        </span>
        <el-select
          v-model="tipsPlat"
          placeholder="--保存完善--"
          style="float: left;width: 105px;margin-right:10px;"
        >
          <el-option label="Wish" value="Wish"></el-option>
          <el-option label="Mymall" value="Mymall"></el-option>
          <el-option label="Lazada" value="Lazada"></el-option>
          <el-option label="Shopee" value="Shopee"></el-option>
        </el-select>-->
        <el-button type="warning" style="float:left;margin-left:10px;" @click="putJoom">上架Joom</el-button>
        <!-- <span class="exportAccount accyjsj" @click="putJoom" style="border: #dcdfe6 solid 1px;"><i class="el-icon-upload2" style="margin-right:5px;"></i>一键上架</span> -->
        <!-- <el-button
          type="success"
          style="float: left;margin-right: 10px"
          @click="exportWish"
        >导出Wish</el-button>-->
        <!-- <span class="exportAccount top1600" @click="exportVova">导出vova</span> -->
        <!-- <el-button
          type="success"
          style="float: left;margin-left: 10px"
          @click="exportMymall"
        >导出mymall</el-button>
        <el-button
          type="success"
          style="float: left;margin-left: 10px"
          @click="exportLazada"
        >导出lazada</el-button>
        <el-button
          type="success"
          style="float: left;margin-left: 10px"
          @click="exportShopee"
        >导出shopee</el-button>-->
      </el-col>
    </el-col>
    <el-col :span="24" style="padding: 0;margin-left: 15px">
      <h3 class="toolbar essential">基本信息</h3>
    </el-col>
    <el-form
      :model="wishForm"
      :inline="true"
      label-width="100px"
      ref="wishForm"
      style="margin-left: 15px"
    >
      <el-row>
        <el-col :span="24">
          <el-col :span="12">
            <el-col :span="4" class="textZt">SKU</el-col>
            <el-col :span="20">
              <el-input v-model="wishForm.sku"></el-input>
            </el-col>
            <el-col :span="4" class="textZt" style="margin-top: 15px">是否备货</el-col>
            <el-col :span="20" style="margin-top: 15px">
              <el-input v-model="wishForm.stockUp" :disabled="true"></el-input>
            </el-col>
            <el-col :span="4" class="textZt" style="margin-top: 15px">主图</el-col>
            <el-col :span="20" style="margin-top: 15px">
              <el-input v-model="wishForm.mainImage"></el-input>
            </el-col>
            <el-col :span="4" class="textZt" style="margin-top: 15px"></el-col>
          </el-col>
          <el-col :span="10" style="margin-left: 25px">
            <a
              :href="wishForm.mainImage"
              target="_blank"
              style="display: block; width: 155px;height: 155px"
            >
              <img :src="wishForm.mainImage" style="display: block; width: 155px;height: 155px" />
            </a>
          </el-col>
        </el-col>
      </el-row>
      <!--<el-row>-->
      <!--<el-col :span="5">-->
      <!--<el-form-item label=" ">-->
      <!--<a :href="wishForm.mainImage"-->
      <!--target="_blank">-->
      <!--<img :src="wishForm.mainImage"-->
      <!--style="width:230px;height:150px;" />-->
      <!--</a>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <!--<el-col :span="19">-->
      <!--<el-form-item label="主图">-->
      <!--<el-input v-model="wishForm.mainImage"-->
      <!--size="small"-->
      <!--style="width:1150px;"></el-input>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <!--<el-col :span="19">-->
      <!--<el-form-item label="SKU">-->
      <!--<el-input size="small"-->
      <!--v-model="wishForm.SKU"-->
      <!--style="width:1150px;"></el-input>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <!--<el-col :span="19">-->
      <!--<el-form-item label="是否备货">-->
      <!--<el-input v-model="wishForm.stockUp"-->
      <!--size="small"-->
      <!--disabled-->
      <!--style="width:1150px;"></el-input>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <!--</el-row>-->
      <el-row>
        <el-col style="margin-bottom: 10px;margin-top: 5px" :span="24">
          <span
            @click="sIs()"
            style="padding: 10px 20px;background: #409EFF;color: #fff;cursor: pointer;display: block;width: 70px;padding-left:10px;text-align: center;margin-left: 15px"
          >
            <i :class="[shoIS?'el-icon-minus':'el-icon-plus']" style="margin-right: 5px"></i>附加图
          </span>
        </el-col>
      </el-row>
      <el-row style="margin-left: 15px">
        <el-col :span="24">
          <el-col
            :span="12"
            style="margin-top: 15px;margin-bottom: 2px"
            v-for="(item,index) in url"
            :key="index"
            v-show="shoIS"
          >
            <el-col :span="19">
              <el-col :span="24">
                <el-input v-model="url[index]" @input="revise($event,index)"></el-input>
              </el-col>
              <el-col>
                <p class="sx" @click="botIndex(index)">
                  <i class="el-icon-arrow-down"></i>下移动
                </p>
                <p class="sx" @click="topIndex(index)">
                  <i class="el-icon-arrow-up"></i>上移动
                </p>
                <p class="sx" @click="delDz(index)">
                  <i class="el-icon-delete"></i>删除
                </p>
                <p class="sx" @click="dialogFormVisible1 = true">
                  <i class="el-icon-plus"></i>增加
                </p>
                <p class="ss">#{{index+1}}</p>
              </el-col>
            </el-col>
            <el-col :span="3" style="margin-left: 15px">
              <a :href="url[index]" target="_blank">
                <img :src="url[index]" style="display: block;width: 90px;height: 90px" />
              </a>
            </el-col>
          </el-col>
        </el-col>
      </el-row>
      <!--<el-col v-for="(item, index) in url"-->
      <!--:key="index" style="margin-top: 15px" v-show="shoIS" :span="24">-->
      <!--<el-col :span="2">-->
      <!--<div style="margin-left:20px;">#{{index}}</div>-->
      <!--<a :href="url[index]"-->
      <!--target="_blank">-->
      <!--<img :src="url[index]"-->
      <!--class="image" />-->
      <!--</a>-->
      <!--</el-col>-->
      <!--<el-col :span="22">-->
      <!--<el-form-item>-->
      <!--<el-input v-model="url[index]"-->
      <!--size="small"-->
      <!--style="width:1000px;margin-top: 16px"></el-input>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <!--<el-button size="small"-->
      <!--@click="addUrl">-->
      <!--<font size="3">增加</font>-->
      <!--</el-button>-->
      <!--<el-button size="small"-->
      <!--@click="delUrl(index)">-->
      <!--<font size="3">删除</font>-->
      <!--</el-button>-->
      <!--<el-button size="small"-->
      <!--@click="up(index)">-->
      <!--<font size="3">上移动</font>-->
      <!--</el-button>-->
      <!--<el-button size="small"-->
      <!--@click="down(index)">-->
      <!--<font size="3">下移动</font>-->
      <!--</el-button>-->
      <!--</el-col>-->
      <el-row>
        <el-col :span="24" style="padding: 0;">
          <h3 class="toolbar essential">主信息</h3>
        </el-col>
        <el-col :span="24">
          <span style="text-align: center;float: left;margin-left: 15px;margin-top: 6px">关键词Tags</span>
          <el-col :span="21" style="margin-left: 15px;">
            <el-tooltip
              class="item"
              effect="dark"
              content="提示：关 键 词 最 多 不 能 超 过 10 个 (以逗号分割)"
              placement="top"
            >
              <el-input v-model="wishForm.wishTags" style="width: 100%" class="aArial"></el-input>
            </el-tooltip>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="24" style="margin-top: 15px">
            <span style="text-align: center;float: left;margin-left: 15px;margin-right: 13px">最前关键词</span>
            <span>
              <span style="color: red">{{foremost}}</span>个字符
            </span>
            <span style="margin-left: 10px">
              <font style="color: red">说明：</font>性别定位/多个一卖等。如Women/Men/Girl/Baby/Kids/1PC/2PC/5PC/4 Colors/5Pcs Set…
            </span>
          </el-col>
          <el-col :span="22" style="margin-left: 100px;margin-top: 10px">
            <el-input
              v-model="wishForm.headKeywords"
              style="width:96%"
              class="aArial"
              placeholder="--一个关键词--"
              @input="top($event)"
            ></el-input>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="24" style="margin-top: 4px">
            <span style="text-align: center;margin-left: 15px;margin-right: 13px">必选关键词</span>
            <span>
              <span style="color: red">{{bxlength}}</span>个关键词
              <span style="color: red;margin-left: 10px">{{bxtotal}}</span>个字符
            </span>
            <span>
              <font style="color: red;margin-left: 10px">说明：</font>物品名/材质/特征等。如T-Shirt(物品名)/V-neck(特征)/Cotton(材质)
            </span>
            <el-button type="text" @click="dialogTableVisible = true">批量设置</el-button>
          </el-col>
          <el-col :span="23">
            <div style="margin-left: 70px">
              必填
              <el-input
                style="width:31%"
                v-model="mandatoryData[0]"
                @blur="mandatory()"
                class="aArial"
              ></el-input>
              <el-input
                style="width:31%"
                v-model="mandatoryData[1]"
                @blur="mandatory()"
                class="aArial"
              ></el-input>
              <el-input
                style="width:31%"
                v-model="mandatoryData[2]"
                @blur="mandatory()"
                class="aArial"
              ></el-input>
            </div>
            <div style="margin-left: 70px;margin-top: 5px">
              选填
              <el-input
                style="width:31%"
                v-model="mandatoryData[3]"
                @blur="mandatory()"
                class="aArial"
              ></el-input>
              <el-input
                style="width:31%"
                v-model="mandatoryData[4]"
                @blur="mandatory()"
                class="aArial"
              ></el-input>
              <el-input
                style="width:31%"
                v-model="mandatoryData[5]"
                @blur="mandatory()"
                class="aArial"
              ></el-input>
            </div>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="24" style="margin-top: 4px">
            <span style="text-align: center;margin-left: 15px;margin-right: 13px">随机关键词</span>
            <span>
              <span style="color: red">{{sjlength}}</span>个关键词
              <span style="color: red;margin-left: 10px">{{sjtotal}}</span>个字符
            </span>
            <span>
              <font style="color: red;margin-left: 10px">说明：</font>形容词/品类热词等。如Fashion/Elegant/Hot/DIY/Casual…
            </span>
            <el-button type="text" @click="dialogTable = true">批量设置</el-button>
          </el-col>
          <el-col :span="23">
            <div style="margin-left: 70px">
              必填
              <el-input style="width:18.5%" v-model="randomData[0]" @blur="random()" class="aArial"></el-input>
              <el-input style="width:18.5%" v-model="randomData[1]" @blur="random()" class="aArial"></el-input>
              <el-input style="width:18.5%" v-model="randomData[2]" @blur="random()" class="aArial"></el-input>
              <el-input style="width:18.5%" v-model="randomData[3]" @blur="random()" class="aArial"></el-input>
              <el-input style="width:18.5%" v-model="randomData[4]" @blur="random()" class="aArial"></el-input>
            </div>
            <div style="margin-left: 70px;margin-top: 5px">
              选填
              <el-input style="width:18.5%" v-model="randomData[5]" @blur="random()" class="aArial"></el-input>
              <el-input style="width:18.5%" v-model="randomData[6]" @blur="random()" class="aArial"></el-input>
              <el-input style="width:18.5%" v-model="randomData[7]" @blur="random()" class="aArial"></el-input>
              <el-input style="width:18.5%" v-model="randomData[8]" @blur="random()" class="aArial"></el-input>
              <el-input style="width:18.5%" v-model="randomData[9]" @blur="random()" class="aArial"></el-input>
            </div>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="24" style="margin-top: 15px">
            <span
              style="text-align: center;float: left;margin-left: 15px;margin-right: 13px"
              class="aArial"
            >最后关键词</span>
            <span>
              <span style="color: red">{{last}}</span>个字符
            </span>
            <span>
              <font style="color: red">说明：</font>附加说明词。如Randomly/S-3XL/2ml/(Color: Nude)/Big Size…
            </span>
          </el-col>
          <el-col :span="22" style="margin-left: 100px;margin-top: 10px;margin-bottom: 20px">
            <el-input
              v-model="wishForm.tailKeywords"
              style="width: 96%"
              placeholder="--最多一个关键词--"
              @input="bottm($event)"
            ></el-input>
          </el-col>
        </el-col>
        <el-col :span="24">
          <span style="text-align: right;margin-top: 8px;float: left;padding-left: 44px">描述</span>
          <el-col :span="22">
            <el-input
              v-model="wishForm.description"
              type="textarea"
              class="aArial"
              :rows="14"
              style="width:96%;margin-left: 27px"
            ></el-input>
          </el-col>
        </el-col>
        <el-col :span="24" style="margin-top: 15px">
          <span style="text-align: right;margin-top: 8px;float: left;padding-left: 44px">数量</span>
          <el-col :span="22">
            <el-input
              v-model="wishForm.inventory"
              style="width:96%;margin-left: 27px"
              class="aArial"
            ></el-input>
          </el-col>
        </el-col>
        <el-col :span="24" style="margin-top: 15px">
          <span
            style="text-align: right;margin-top: 8px;float: left;padding-left: 35px;margin-right: 10px"
          >运输时间</span>
          <el-col :span="21">
            <el-input v-model="wishForm.shippingTime" style="width:100%" class="aArial"></el-input>
          </el-col>
        </el-col>
      </el-row>
    </el-form>
    <el-col :span="24" style="padding: 0;margin-left: 15px">
      <h3 class="toolbar essential">多属性设置</h3>
    </el-col>
    <div class="ptom60">
      <el-row>
        <!-- <el-button @click="dialogVisible = true" style="margin-left:35px;" type="primary">多属性设置</el-button> -->
        <el-col :span="24">
          <el-button
            style="margin-left:17px;float:left"
            type="primary"
            size="small"
            @click="showAttribute"
          >
            <i :class="[showattribute?'el-icon-minus':'el-icon-plus']" style="margin-right: 5px"></i>多属性设置
          </el-button>
          <el-input
            style="float:left;width:100px;margin-left:10px;"
            placeholder="替换前"
            size="small"
            v-model="ordColor"
          ></el-input>
          <el-input
            style="float:left;width:100px;margin-left:5px;"
            placeholder="替换后"
            size="small"
            v-model="newColor"
          ></el-input>
          <el-button
            type="success"
            style="float:left;width:100px;margin-left:5px;"
            size="small"
            @click="replaceColor"
          >替换颜色</el-button>
          <el-input
            style="float:left;width:100px;margin-left:10px;"
            placeholder="替换前"
            size="small"
            v-model="ordSize"
          ></el-input>
          <el-input
            style="float:left;width:100px;margin-left:5px;"
            placeholder="替换后"
            size="small"
            v-model="newSize"
          ></el-input>
          <el-button
            type="danger"
            style="float:left;width:100px;margin-left:5px;"
            size="small"
            @click="replaceSize"
          >替换尺寸</el-button>
          <el-button
            type="warning"
            style="float:left;width:100px;margin-left:10px;"
            size="small"
            @click="clearColor"
          >清空颜色</el-button>
          <el-button
            type="warning"
            style="float:left;width:100px;margin-left:10px;"
            size="small"
            @click="clearSize"
          >清空尺寸</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        border
        style="width:98%;margin-left:1%;margin-top:15px;"
        v-if="showattribute"
        :header-cell-style="getRowClass"
        max-height="550"
      >
        <!-- <el-table-column type="selection" width="30" align="center" header-align="center"></el-table-column> -->
        <el-table-column type="index" width="50" align="center" header-align="center" fixed></el-table-column>
        <el-table-column label="操作" width="50" header-align="center" align="center" fixed>
          <template slot-scope="scope">
            <el-tooltip content="删除">
              <i
                class="el-icon-delete"
                @click="del(scope.$index, scope.row)"
                style="color:#409EFF;cursor:pointer;"
              ></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          label="SKU"
          prop="sku"
          header-align="center"
          align="center"
          min-width="140"
          fixed
        >
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.sku"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="颜色"
          prop="color"
          header-align="center"
          align="center"
          min-width="100"
        >
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.color"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="尺寸" prop="size" header-align="center" align="center" min-width="80">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.size"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="数量"
          prop="inventory"
          header-align="center"
          align="center"
          min-width="100"
        >
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.inventory"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="重量(g)"
          prop="weight"
          header-align="center"
          align="center"
          min-width="100"
        >
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.weight"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="价格(USD)"
          prop="price"
          header-align="center"
          align="center"
          min-width="100"
        >
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.price"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="运费(USD)"
          prop="shipping"
          header-align="center"
          align="center"
          min-width="100"
        >
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.shipping"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="建议零售价(USD)"
          prop="msrp"
          min-width="130"
          align="center"
          header-align="center"
        >
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.msrp"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="Joom零售价(USD)"
          prop="joomPrice"
          min-width="140"
          align="center"
          header-align="center"
        >
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.joomPrice"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="Joom运费(USD)"
          prop="joomShipping"
          min-width="130"
          align="center"
          header-align="center"
        >
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.joomShipping"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="运输时间"
          prop="shippingTime"
          header-align="center"
          align="center"
          min-width="90"
        >
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.shippingTime"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="主图"
          prop="linkUrl"
          header-align="center"
          min-width="100"
          align="center"
        >
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.linkUrl"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="图片" prop="linkUrl" header-align="center" width="70">
          <template slot-scope="scope">
            <img
              :src="scope.row.linkUrl"
              style="width:50px;height:50px;display: block;margin: auto"
            />
          </template>
        </el-table-column>
      </el-table>
      <el-row style="margin-left:1%;" v-if="showattribute">
        <div style="width:135px;overflow:hidden;float:left;margin-top:15px;" class="rd1">
          <input
            placeholder="行数"
            v-model="rows"
            class="rn1"
            style="width:53%;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center"
          />
          <span class="xzz" @click="addClomun">新增行</span>
        </div>
        <div style="width:180px;overflow:hidden;float:left;margin-top:15px;" class="rd2">
          <input
            placeholder="数量"
            v-model="num"
            class="rn2"
            style="width:54%;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center"
          />
          <span class="xzz1" @click="setNum">数量确定</span>
        </div>
        <div style="width:180px;overflow:hidden;float:left;margin-top:15px;" class="rd2">
          <input
            placeholder="重量"
            v-model="weightNumber"
            class="rn2"
            style="width:54%;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center"
          />
          <span class="xzz1" @click="setWeight">重量确定</span>
        </div>
        <div style="width:180px;overflow:hidden;float:left;margin-top:15px;" class="rd2">
          <input
            placeholder="价格"
            v-model="price"
            class="rn2"
            style="width:54%;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center"
          />
          <span class="xzz1" @click="setPrice">价格确定</span>
        </div>
        <div style="width:180px;overflow:hidden;float:left;margin-top:15px;" class="rd2">
          <input
            placeholder="运费"
            v-model="ship"
            class="rn2"
            style="width:54%;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center"
          />
          <span class="xzz1" @click="setShip">运费确定</span>
        </div>
        <div style="width:180px;overflow:hidden;float:left;margin-top:15px;" class="rd2">
          <!--<el-input v-model="advicePrice"-->
          <!--size="small"-->
          <!--placeholder="建议零售价"-->
          <!--style="width:190px"></el-input>-->
          <!--<el-button size="small"-->
          <!--@click="setAdvice">建议零售价</el-button>-->
          <input
            placeholder="建议零售价"
            v-model="advicePrice"
            class="rn2"
            style="width:54%;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center"
          />
          <span class="xzz1" @click="setAdvice">零售确定</span>
        </div>
        <div style="width:180px;overflow:hidden;float:left;margin-top:15px;" class="rd2">
          <!--<el-input v-model="joomPrice"-->
          <!--size="small"-->
          <!--placeholder="Joom零售价"-->
          <!--style="width:185px"></el-input>-->
          <!--<el-button size="small"-->
          <!--@click="setJoom">Joom零售价</el-button>-->
          <input
            placeholder="Joom零售价"
            v-model="joomPrice"
            class="rn3"
            style="width:50%;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center"
          />
          <span class="xzz1" @click="setJoom">Joom确定</span>
        </div>
        <div style="width:180px;overflow:hidden;float:left;margin-top:15px;" class="rd2">
          <!--<el-input v-model="transport"-->
          <!--size="small"-->
          <!--placeholder="Joom运费"-->
          <!--style="width:185px"></el-input>-->
          <!--<el-button size="small"-->
          <!--@click="setTransport">Joom运费</el-button>-->
          <input
            placeholder="Joom运费"
            v-model="transport"
            class="rn3"
            style="width:50%;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center"
          />
          <span class="xzz1" @click="setTransport">Joom运费</span>
        </div>
        <div style="width:180px;overflow:hidden;float:left;margin-top:15px;" class="rd2">
          <!--<el-input v-model="time"-->
          <!--size="small"-->
          <!--placeholder="运输时间"-->
          <!--style="width:185px"></el-input>-->
          <!--<el-button size="small"-->
          <!--@click="setTime">运输时间</el-button>-->
          <input
            placeholder="运输时间"
            v-model="time"
            class="rn2"
            style="width:55%;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center"
          />
          <span class="xzz1" @click="setTime">时间确定</span>
        </div>
      </el-row>
    </div>
    <!-- 多属性设置对话框 -->
    <el-dialog title="多属性" :visible.sync="dialogVisible" width="90%">
      <el-table :data="tableData" border>
        <el-table-column type="selection" width="30" align="center" header-align="center"></el-table-column>
        <el-table-column type="index" width="50" align="center" header-align="center"></el-table-column>
        <el-table-column label="操作" width="50" header-align="center" align="center">
          <template slot-scope="scope">
            <el-tooltip content="删除">
              <i
                class="el-icon-delete"
                @click="del(scope.$index, scope.row)"
                style="color:#409EFF;cursor:pointer;"
              ></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="SKU" prop="sku" header-align="center">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.sku"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="颜色" prop="color" header-align="center">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.color"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="尺寸" prop="size" header-align="center">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.size"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="数量" prop="inventory" header-align="center">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.inventory"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="价格(USD)" prop="price" header-align="center">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.price"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="运费(USD)" prop="shipping" header-align="center">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.shipping"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="建议零售价(USD)" prop="msrp" min-width="110" header-align="center">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.msrp"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="Joom零售价(USD)"
          prop="joomPrice"
          min-width="110"
          header-align="center"
        >
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.joomPrice"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="Joom运费(USD)"
          prop="joomShipping"
          min-width="110"
          header-align="center"
        >
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.joomShipping"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="运输时间" prop="shippingTime" header-align="center">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.shippingTime"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="主图" prop="linkUrl" header-align="center">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.linkUrl"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="图片" prop="linkUrl" header-align="center">
          <template slot-scope="scope">
            <img
              :src="scope.row.linkUrl"
              style="width:50px;height:50px;display: block;margin: auto"
            />
          </template>
        </el-table-column>
      </el-table>
      <el-row style="margin-top:15px;">
        <el-col :span="3">
          <input
            placeholder="行数"
            v-model="rows"
            style="width:62px;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center"
          />
          <span class="xzz" @click="addClomun">新增行</span>
        </el-col>
        <el-col :span="3">
          <!--<el-input v-model="num"-->
          <!--size="small"-->
          <!--placeholder="数量"-->
          <!--style="width:190px"></el-input>-->
          <!--<el-button size="small"-->
          <!--@click="setNum">数量确定</el-button>-->
          <input
            placeholder="数量"
            v-model="num"
            style="width:95px;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center"
          />
          <span class="xzz1" @click="setNum">数量确定</span>
        </el-col>
        <el-col :span="3">
          <!--<el-input v-model="price"-->
          <!--size="small"-->
          <!--placeholder="价格"-->
          <!--style="width:190px"></el-input>-->
          <!--<el-button size="small"-->
          <!--@click="setPrice">价格确定</el-button>-->
          <input
            placeholder="价格"
            v-model="price"
            style="width:95px;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center"
          />
          <span class="xzz1" @click="setPrice">价格确定</span>
        </el-col>
        <el-col :span="3">
          <!--<el-input v-model="ship"-->
          <!--size="small"-->
          <!--placeholder="运费"-->
          <!--style="width:190px"></el-input>-->
          <!--<el-button size="small"-->
          <!--@click="setShip">运费确定</el-button>-->
          <input
            placeholder="运费"
            v-model="ship"
            style="width:95px;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center"
          />
          <span class="xzz1" @click="setShip">运费确定</span>
        </el-col>
        <el-col :span="3">
          <!--<el-input v-model="advicePrice"-->
          <!--size="small"-->
          <!--placeholder="建议零售价"-->
          <!--style="width:190px"></el-input>-->
          <!--<el-button size="small"-->
          <!--@click="setAdvice">建议零售价</el-button>-->
          <input
            placeholder="建议零售价"
            v-model="advicePrice"
            style="width:75px;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center"
          />
          <span class="xzz1" @click="setAdvice">建议零售价</span>
        </el-col>
        <el-col :span="3">
          <!--<el-input v-model="joomPrice"-->
          <!--size="small"-->
          <!--placeholder="Joom零售价"-->
          <!--style="width:185px"></el-input>-->
          <!--<el-button size="small"-->
          <!--@click="setJoom">Joom零售价</el-button>-->
          <input
            placeholder="Joom零售价"
            v-model="joomPrice"
            style="width:75px;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center"
          />
          <span class="xzz1" @click="setJoom">Joom零售价</span>
        </el-col>
        <el-col :span="3">
          <!--<el-input v-model="transport"-->
          <!--size="small"-->
          <!--placeholder="Joom运费"-->
          <!--style="width:185px"></el-input>-->
          <!--<el-button size="small"-->
          <!--@click="setTransport">Joom运费</el-button>-->
          <input
            placeholder="Joom运费"
            v-model="transport"
            style="width:85px;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center"
          />
          <span class="xzz1" @click="setTransport">Joom运费</span>
        </el-col>
        <el-col :span="3">
          <!--<el-input v-model="time"-->
          <!--size="small"-->
          <!--placeholder="运输时间"-->
          <!--style="width:185px"></el-input>-->
          <!--<el-button size="small"-->
          <!--@click="setTime">运输时间</el-button>-->
          <input
            placeholder="运输时间"
            v-model="time"
            style="width:95px;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center"
          />
          <span class="xzz1" @click="setTime">运输时间</span>
        </el-col>
      </el-row>
      <div class="bgk"></div>
    </el-dialog>
    <!-- 批量设置对话框 -->
    <el-dialog title="批量增加必选关键词" :visible.sync="dialogTableVisible">
      <el-input
        size="small"
        type="textarea"
        :rows="20"
        placeholder="-多个必选关键词-"
        @change="mandatoryDate($event)"
      ></el-input>
    </el-dialog>
    <el-dialog title="批量增加随机关键词" :visible.sync="dialogTable">
      <el-input
        size="small"
        type="textarea"
        :rows="20"
        placeholder="-多个随机关键词-"
        @change="mandatoryDate1($event)"
      ></el-input>
    </el-dialog>
    <el-dialog title="增加附加图" :visible.sync="dialogFormVisible1">
      <el-input v-model="addPhoto"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="addRess">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script type="text/ecmascript-6">
import {
  APIPlatInfo,
  APISaveWishInfo,
  APIFinishPlat,
  APIJoomName,
  APIShopifyName,
  APIVovaName,
  APIPlatExportWish,
  APIPlatExportMymall,
  APIPlatExportLazada,
  APIPlatExportShopee,
  APIPlatExportShopify,
  APIPlatExportVova,
  APIPlatExportJoom,
  APIDeleteVariant,
  APIDeleteEbaySku,
  APISaveFinishPlat,
  APIPutJoom,
  APIsuffixAll,
  APIExportTemplate,
} from "../../api/product";
import { getSection } from "../../api/profit";
export default {
  props: {
    id: {
      type: Number,
      default: 5,
    },
    platName: {
      type: String,
      default: 5,
    },
  },
  data() {
    return {
      departmentValue: null,
      platValue: null,
      suffixValue: [],
      suffixData: [],
      allSuffix: [],
      department: [],
      platData: [
        "Wish",
        "Mymall",
        "Lazada",
        "Shopee",
        "Joom",
        "Shopify",
        "VOVA",
      ],
      tipsPlat: "Wish",
      joomloding: false,
      ordColor: null,
      newColor: null,
      ordSize: null,
      newSize: null,
      url: [],
      rows: 1,
      dialogTableVisible: false,
      dialogTable: false,
      dialogFormVisible1: false,
      tips: "Wish",
      num: null,
      weightNumber: null,
      foremost: 0,
      showattribute: false,
      price: null,
      ship: null,
      vova: null,
      vovaArr: [],
      joomArr: [],
      shopifyArr: [],
      addPhoto: "",
      advicePrice: null,
      joomPrice: null,
      transport: null,
      time: null,
      dialogVisible: false,
      setVisible: false,
      select: "",
      joom: null,
      shopify: null,
      wishForm: {},
      last: 0,
      tableData: [],
      bxtotal: 0,
      sjtotal: 0,
      bxlength: 0,
      sjlength: 0,
      mandatoryData: ["", "", "", "", "", ""],
      randomData: ["", "", "", "", "", "", "", "", "", ""],
      shoIS: false,
      activeNames: ["2"],
      condition: {
        id: 0,
        plat: "wish",
      },
    };
  },
  watch: {
    platName: function (newValue) {
      if (newValue == "Wish") {
        this.condition.id = this.$route.params.id;
        this.getData();
        getSection().then((response) => {
          const res = response.data.data;
          this.department = res.filter(
            (ele) => ele.department && ele.type === "业务"
          );
        });
        APIsuffixAll().then((response) => {
          this.allSuffix = response.data.data;
        });
        // APIJoomName().then(response => {
        //   this.joomArr = response.data.data;
        // });
        APIShopifyName().then((response) => {
          this.shopifyArr = response.data.data;
        });
        // APIVovaName().then(response => {
        //   this.vovaArr = response.data.data;
        // });
      }
    },
  },
  methods: {
    selectDep() {
      const arr = [];
      if (this.platValue != "Shopify") {
        if (!this.departmentValue) {
          for (let i = 0; i < this.allSuffix.length; i++) {
            if (this.platValue == this.allSuffix[i].platform) {
              arr.push(this.allSuffix[i].suffix);
            }
          }
        } else {
          for (let i = 0; i < this.allSuffix.length; i++) {
            if (
              this.platValue == this.allSuffix[i].platform &&
              this.departmentValue == this.allSuffix[i].depart
            ) {
              arr.push(this.allSuffix[i].suffix);
            }
          }
        }
      }
      this.suffixValue = [];
      this.suffixData = arr;
    },
    selectPlat() {
      const arr = [];
      if (this.platValue != "Shopify") {
        if (!this.departmentValue) {
          for (let i = 0; i < this.allSuffix.length; i++) {
            if (this.platValue == this.allSuffix[i].platform) {
              arr.push(this.allSuffix[i].suffix);
            }
          }
        } else {
          for (let i = 0; i < this.allSuffix.length; i++) {
            if (
              this.platValue == this.allSuffix[i].platform &&
              this.departmentValue == this.allSuffix[i].depart
            ) {
              arr.push(this.allSuffix[i].suffix);
            }
          }
        }
      }
      if (this.platValue == "Shopify") {
        for (let i = 0; i < this.shopifyArr.length; i++) {
          arr.push(this.shopifyArr[i]);
        }
      }
      this.suffixValue = [];
      this.suffixData = arr;
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "color:#3c8dbc;background:#f5f7fa";
      } else {
        return "";
      }
    },
    exportMymall() {
      let objStr = {
        id: this.wishForm.infoId,
      };
      APIPlatExportMymall(objStr).then((res) => {
        const blob = new Blob([res.data], {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
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
    },
    exportLazada() {
      let objStr = {
        id: [this.wishForm.infoId],
      };
      APIPlatExportLazada(objStr).then((res) => {
        if (res.headers["content-disposition"]) {
          var file = res.headers["content-disposition"]
            .split(";")[1]
            .split("filename=")[1];
          var filename = JSON.parse(file);
          const blob = new Blob([res.data], {
            type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
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
        } else {
          const that = this;
          const blob = new Blob([res.data], {
            type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
          });
          var reader = new FileReader();
          reader.readAsText(blob, "utf-8");
          reader.onload = function (e) {
            const title = JSON.parse(reader.result);
            that.$message.error(title.message);
          };
        }
      });
    },
    exportShopee() {
      let objStr = {
        id: [this.wishForm.infoId],
      };
      APIPlatExportShopee(objStr).then((res) => {
        if (res.headers["content-disposition"]) {
          var file = res.headers["content-disposition"]
            .split(";")[1]
            .split("filename=")[1];
          var filename = JSON.parse(file);
          const blob = new Blob([res.data], {
            type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
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
        } else {
          const that = this;
          const blob = new Blob([res.data], {
            type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
          });
          var reader = new FileReader();
          reader.readAsText(blob, "utf-8");
          reader.onload = function (e) {
            const title = JSON.parse(reader.result);
            that.$message.error(title.message);
          };
        }
      });
    },
    clearColor() {
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].color = null;
      }
    },
    clearSize() {
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].size = null;
      }
    },
    replaceColor() {
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.ordColor == this.tableData[i].color) {
          this.tableData[i].color = this.newColor;
        }
      }
    },
    replaceSize() {
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.ordSize == this.tableData[i].size) {
          this.tableData[i].size = this.newSize;
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
    selectalld2() {
      var ard1 = [];
      for (const item in this.shopifyArr) {
        ard1.push(this.shopifyArr[item]);
      }
      this.shopify = ard1;
    },
    noselectd2() {
      this.shopify = [];
    },
    selectalld3() {
      var ard1 = [];
      for (const item in this.suffixData) {
        ard1.push(this.suffixData[item]);
      }
      this.suffixValue = ard1;
    },
    noselectd3() {
      this.suffixValue = [];
    },
    showAttribute() {
      this.showattribute = !this.showattribute;
    },
    keepExport() {
      if (!this.platValue) {
        this.$message.error("请选择平台");
        return;
      }
      if (this.platValue == "Wish") {
        this.exportAll("Wish");
      } else if (this.platValue == "Mymall") {
        this.exportAll("Mymall");
      } else if (this.platValue == "Lazada") {
        this.exportAll("Lazada");
      } else if (this.platValue == "Shopee") {
        this.exportAll("Shopee");
      } else if (this.platValue == "Joom") {
        this.exportJoom();
      } else if (this.platValue == "Shopify") {
        this.exportAll("Shopify");
      } else if (this.platValue == "VOVA") {
        this.exportAll("VOVA");
      }
    },
    keepPerfect(type) {
      if (this.tips) {
        const tagsLength = this.wishForm.wishTags.split(",");
        if (tagsLength.length > 10) {
          this.$message.error(
            "关键词不能超过10个,当前数量为:" + tagsLength.length
          );
          return;
        }
        const md = JSON.stringify(this.mandatoryData);
        const mr = JSON.stringify(this.randomData);
        const data = {
          id: this.wishForm.infoId,
          basicInfo: {},
          plat: [],
          skuInfo: [],
        };
        data.basicInfo = this.wishForm;
        var url = "";
        for (var y = 0; y < this.url.length; y++) {
          if (y == this.url.length - 1) {
            url += this.url[y];
          } else {
            url += this.url[y] + "\n";
          }
        }
        if (type == "Wish") {
          data.plat = "wish";
        } else {
          data.plat = "joom";
        }
        data.basicInfo.extraImages = url;
        data.basicInfo.id = this.condition.id;
        data.basicInfo.requiredKeywords = md;
        data.basicInfo.randomKeywords = mr;
        data.skuInfo = this.tableData;
        APISaveFinishPlat(data).then((res) => {
          if (res.data.code == 200) {
            this.$message({
              message: "保存成功",
              type: "success",
            });
          } else {
            this.$message.error("保存失败");
          }
        });
        // const data = {
        //   id: this.wishForm.infoId,
        //   plat: []
        // };
        // APIFinishPlat(data).then(res => {
        //   if (res.data.code == 200) {
        //     this.$message({
        //       message: "保存成功",
        //       type: "success"
        //     });
        //   } else {
        //     this.$message.error(res.data.message);
        //   }
        // });
      } else {
        this.$message.error("请选择要保存的模板");
      }
    },
    exportJoom() {
      let arrID = [];
      if (this.suffixValue.length != 0) {
        arrID = this.suffixValue;
      } else {
        arrID = this.suffixData;
      }
      for (var i = 0; i < arrID.length; i++) {
        let objStr1 = {
          id: [this.wishForm.infoId],
          account: [arrID[i]],
        };
        APIPlatExportJoom(objStr1).then((res) => {
          const blob = new Blob([res.data], {
            type: "data:text/csv;charset=utf-8",
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
    },
    putJoom() {
      if (this.joom != "") {
        var arrID = this.joom;
        let objStr1 = {
          id: this.wishForm.infoId,
          account: arrID,
        };
        this.joomloding = true;
        APIPutJoom(objStr1).then((res) => {
          if (res.data.code === 200) {
            this.$message({
              message: "上架成功",
              type: "success",
            });
          } else {
            this.$message.error(res.data.message);
          }
          this.joomloding = false;
        });
      } else {
        this.$message.error("请选择账号");
      }
    },
    exportAll(type) {
      // let arrID = [];
      // if (this.suffixValue.length != 0) {
      //   arrID = this.suffixValue;
      // } else {
      //   arrID = this.suffixData;
      // }
      let objStr1 = {
        id: [this.wishForm.infoId],
        account: this.suffixValue,
        plat: type,
        depart: this.departmentValue,
      };
      APIExportTemplate(objStr1).then((res) => {
        if (res.headers["content-disposition"]) {
          const blob = new Blob([res.data], {
            type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
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
        } else {
          const that = this;
          const blob = new Blob([res.data], {
            type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
          });
          var reader = new FileReader();
          reader.readAsText(blob, "utf-8");
          reader.onload = function (e) {
            const title = JSON.parse(reader.result);
            that.$message.error(title.message);
          };
        }
      });
    },
    exportShopify() {
      let arrID = [];
      if (this.suffixValue.length != 0) {
        arrID = this.suffixValue;
      } else {
        arrID = this.suffixData;
      }
      for (var i = 0; i < arrID.length; i++) {
        let objStr1 = {
          id: [this.wishForm.infoId],
          account: [arrID[i]],
        };
        APIPlatExportShopify(objStr1).then((res) => {
          const blob = new Blob([res.data], {
            type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
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
      // if (this.shopify!='') {
      //   objStr = {
      //     id: [this.wishForm.infoId],
      //     account: this.shopify
      //   };
      // }else{
      //   objStr = {
      //     id: [this.wishForm.infoId],
      //     account: this.shopifyArr
      //   };
      // }
    },
    exportVova() {
      let objStr = {};
      let arrID = [];
      if (this.suffixValue.length != 0) {
        arrID = this.suffixValue;
      } else {
        arrID = this.suffixData;
      }
      for (var i = 0; i < arrID.length; i++) {
        let objStr1 = {
          id: [this.wishForm.infoId],
          account: [arrID[i]],
        };
        APIPlatExportVova(objStr1).then((res) => {
          const blob = new Blob([res.data], {
            type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
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
      // if (this.vova!='') {
      //   var strObj=this.vova
      //   for(var i=0;i<strObj.length;i++){
      //     objStr = {
      //       id: [this.wishForm.infoId],
      //       account: [strObj[i]]
      //     };
      //     APIPlatExportVova(objStr).then(res => {
      //     const blob = new Blob([res.data], {
      //       type:
      //         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
      //     });
      //     var file = res.headers["content-disposition"].split(";")[1].split("filename=")[1];
      //     var filename=JSON.parse(file)
      //     const downloadElement = document.createElement("a");
      //     const objectUrl = window.URL.createObjectURL(blob);
      //     downloadElement.href = objectUrl;
      //     // const filename =
      //     //   "Wish_" + year + month + strDate + hour + minute + second;
      //     downloadElement.download = filename;
      //     document.body.appendChild(downloadElement);
      //     downloadElement.click();
      //     document.body.removeChild(downloadElement);
      //   });
      //   }
      // }else{
      //   var strObj=this.vovaArr
      //   for(var i=0;i<strObj.length;i++){
      //     objStr = {
      //       id: [this.wishForm.infoId],
      //       account: [strObj[i]]
      //     };
      //     APIPlatExportVova(objStr).then(res => {
      //     const blob = new Blob([res.data], {
      //       type:
      //         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
      //     });
      //     var file = res.headers["content-disposition"].split(";")[1].split("filename=")[1];
      //     var filename=JSON.parse(file)
      //     const downloadElement = document.createElement("a");
      //     const objectUrl = window.URL.createObjectURL(blob);
      //     downloadElement.href = objectUrl;
      //     // const filename =
      //     //   "Wish_" + year + month + strDate + hour + minute + second;
      //     downloadElement.download = filename;
      //     document.body.appendChild(downloadElement);
      //     downloadElement.click();
      //     document.body.removeChild(downloadElement);
      //   });
      //   }
      // }
    },
    top(e) {
      this.foremost = e.length;
    },
    bottm(e) {
      this.last = e.length;
    },
    mandatoryDate(e) {
      this.bxlength = 0;
      this.bxtotal = 0;
      var st1 = 0;
      let arde = e.split(/[(\r\n)\r\n]+/);
      for (var i = 0; i < arde.length; i++) {
        var daee = arde[i];
        for (var j = 0; j < this.mandatoryData.length; j++) {
          this.mandatoryData[i] = daee;
        }
      }
      for (var i = 0; i < this.mandatoryData.length; i++) {
        if (this.mandatoryData[i] != "") {
          this.bxlength++;
          st1 += this.mandatoryData[i].length;
        }
      }
      this.bxtotal = st1;
    },
    mandatoryDate1(e) {
      this.sjlength = 0;
      this.sjtotal = 0;
      var st2 = 0;
      let arde1 = e.split(/[(\r\n)\r\n]+/);
      for (var i = 0; i < arde1.length; i++) {
        var daee = arde1[i];
        for (var j = 0; j < this.randomData.length; j++) {
          this.randomData[i] = daee;
        }
      }
      for (var i = 0; i < this.randomData.length; i++) {
        if (this.randomData[i] != "") {
          this.sjlength++;
          st2 += this.randomData[i].length;
        }
      }
      this.sjtotal = st2;
    },
    revise(e, index) {
      this.url[index] = e;
    },
    swapItems(arr, index1, index2, direction) {
      if (direction == "up") {
        // 置顶
        arr.unshift(arr[index1]);
        arr.splice(index1 + 1, 1);
        return arr;
      }
      arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      return arr;
    },
    addRess() {
      if (this.addPhoto == "") {
        this.$message.error("不能为空");
      } else {
        this.url.push(this.addPhoto);
        this.dialogFormVisible1 = false;
      }
    },
    delDz(index) {
      //        this.$confirm('确定删除?', '提示', {
      //                  confirmButtonText: '确定',
      //                  cancelButtonText: '取消',
      //                  type: 'warning'
      //                })
      //                .then(() => {
      //                  this.$message({
      //                    type: 'success',
      //                    message: '删除成功!'
      //                  })
      this.url.splice(index, 1);
      //                })
      //                .catch(() => {})
    },
    botOm(arr, index1, index2, direction) {
      if (direction == "down") {
        arr.push(arr[index1]);
        arr.splice(index1, 1);
        return arr;
      }
      arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      return arr;
    },
    botIndex(index) {
      if (index == this.url.length - 1) {
        this.$message({
          message: "已经是最后一张了",
          type: "success",
        });
        return;
      }
      this.botOm(this.url, index, index + 1);
    },
    topIndex(index) {
      if (index == 0) {
        this.$message({
          message: "已经是第一张了",
          type: "success",
        });
        return;
      }
      this.swapItems(this.url, index, index - 1);
    },
    delSx(index) {
      this.tableData.splice(index, 1);
    },
    mandatory(e) {
      this.bxlength = 0;
      this.bxtotal = 0;
      var st1 = 0;
      for (var i = 0; i < this.mandatoryData.length; i++) {
        if (this.mandatoryData[i] != "") {
          this.bxlength++;
          st1 += this.mandatoryData[i].length;
        }
      }
      this.bxtotal = st1;
    },
    random(e) {
      this.sjlength = 0;
      this.sjtotal = 0;
      var st2 = 0;
      for (var i = 0; i < this.randomData.length; i++) {
        if (this.randomData[i] != "") {
          this.sjlength++;
          st2 += this.randomData[i].length;
        }
      }
      this.sjtotal = st2;
    },
    sIs() {
      this.shoIS = !this.shoIS;
    },
    handleChange(val) {},
    // 删除URL
    delUrl(index) {
      this.url.splice(index, 1);
    },
    // 删除table行
    del(index, row) {
      let aryId = {
        id: row.id,
        plat: "wish",
      };
      APIDeleteEbaySku(aryId).then((res) => {
        if (res.data.code === 200) {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.tableData.splice(index, 1);
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    // 增加URL
    addUrl() {
      this.url.push("");
    },
    // 上移
    up(index) {
      if (index > 0) {
        const upData = this.url[index - 1];
        this.url.splice(index - 1, 1);
        this.url.splice(index, 0, upData);
      } else {
        alert("已经是第一条，不可上移");
      }
    },
    // 下移
    down(index) {
      if (index + 1 === this.url.length) {
        alert("已经是最后一条，不可下移");
      } else {
        const downData = this.url[index + 1];
        this.url.splice(index + 1, 1);
        this.url.splice(index, 0, downData);
      }
    },
    // 增加行
    addClomun() {
      for (let i = 0; i < this.rows; i++) {
        var obj = {};
        obj.id = null;
        obj.infoId = this.wishForm.infoId;
        obj.sid = null;
        obj.sku = "";
        obj.color = "";
        obj.size = null;
        obj.inventory = null;
        obj.price = null;
        obj.shipping = "";
        obj.msrp = null;
        obj.shippingTime = "";
        obj.linkUrl = "";
        obj.goodsSkuId = null;
        obj.weight = null;
        obj.joomPrice = null;
        obj.joomShipping = null;
        this.tableData.push(obj);
      }
    },
    // 重量
    setWeight() {
      if (this.weightNumber) {
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].weight = this.weightNumber;
        }
      } else {
        return false;
      }
    },
    // 数量
    setNum() {
      if (this.num) {
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].inventory = this.num;
        }
      } else {
        return false;
      }
    },
    // 价格
    setPrice() {
      if (this.price) {
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].price = this.price;
        }
      } else {
        return false;
      }
    },
    // 运费
    setShip() {
      if (this.ship) {
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].shipping = this.ship;
        }
      } else {
        return false;
      }
    },
    // 建议零售价
    setAdvice() {
      if (this.advicePrice) {
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].msrp = this.advicePrice;
        }
      } else {
        return false;
      }
    },
    // joom零售价格
    setJoom() {
      if (this.joomPrice) {
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].joomPrice = this.joomPrice;
        }
      } else {
        return false;
      }
    },
    // joom运费
    setTransport() {
      if (this.transport) {
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].joomShipping = this.transport;
        }
      } else {
        return false;
      }
    },
    // 运输时间
    setTime() {
      if (this.time) {
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].shippingTime = this.time;
        }
      } else {
        return false;
      }
    },
    // 更新
    update() {
      if (this.wishForm.wishTags) {
        const tagsLength = this.wishForm.wishTags.split(",");
        if (tagsLength.length > 10) {
          this.$message.error(
            "关键词不能超过10个,当前数量为:" + tagsLength.length
          );
          return;
        }
      }
      const md = JSON.stringify(this.mandatoryData);
      const mr = JSON.stringify(this.randomData);
      const data = {
        basicInfo: {},
        skuInfo: [],
      };
      data.basicInfo = this.wishForm;
      var url = "";
      for (var y = 0; y < this.url.length; y++) {
        if (y == this.url.length - 1) {
          url += this.url[y];
        } else {
          url += this.url[y] + "\n";
        }
      }
      data.basicInfo.extraImages = url;
      data.basicInfo.id = this.condition.id;
      data.basicInfo.requiredKeywords = md;
      data.basicInfo.randomKeywords = mr;
      data.skuInfo = this.tableData;
      APISaveWishInfo(data).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            message: "保存成功",
            type: "success",
          });
        } else {
          this.$message.error("保存失败");
        }
      });
    },
    // 标记
    handleCommand(command) {
      const data = {
        id: 5,
        plat: [],
      };
      if (command === "a") {
        data.plat = ["wish"];
      } else {
        data.plat = ["joom"];
      }
      APIFinishPlat(data).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            message: "保存成功",
            type: "success",
          });
        } else {
          this.$message.error("保存失败");
        }
      });
    },
    getData() {
      APIPlatInfo(this.condition).then((res) => {
        this.wishForm = res.data.data.basicInfo;
        this.tableData = res.data.data.skuInfo;
        this.condition.id = this.wishForm.id;
        const extraPic = res.data.data.basicInfo.extraImages;
        // const picture = extraPic.split("\n")[0];
        this.url = extraPic.split(/[\s\n]/);
        if (this.url[this.url.length - 1] == "") {
          this.url.pop();
        }
        //          this.url.pop()
        this.wishForm.requiredKeywords = JSON.parse(
          this.wishForm.requiredKeywords
        );
        this.wishForm.randomKeywords = JSON.parse(this.wishForm.randomKeywords);
        //          this.wishForm.mapPersons=this.wishForm.mapPersons.split(",")
        //          this.wishForm.dictionaryName=this.wishForm.dictionaryName.split(",")
        if (this.wishForm.headKeywords) {
          this.foremost = this.wishForm.headKeywords.length;
        }
        if (this.wishForm.tailKeywords) {
          this.last = this.wishForm.tailKeywords.length;
        }
        if (this.wishForm.requiredKeywords) {
          this.mandatoryData = this.wishForm.requiredKeywords;
        }
        if (this.wishForm.randomKeywords) {
          this.randomData = this.wishForm.randomKeywords;
        }
        if (this.wishForm.randomKeywords) {
          for (var i = 0; i < this.wishForm.randomKeywords.length; i++) {
            if (this.wishForm.randomKeywords[i] != "") {
              this.sjlength++;
              this.sjtotal += this.wishForm.randomKeywords[i].length;
            }
          }
        }
        if (this.wishForm.requiredKeywords) {
          for (var i = 0; i < this.wishForm.requiredKeywords.length; i++) {
            if (this.wishForm.requiredKeywords[i] != "") {
              this.bxlength++;
              this.bxtotal += this.wishForm.requiredKeywords[i].length;
            }
          }
        }
      });
    },
  },
  mounted() {
    if (this.platName == "Wish") {
      this.condition.id = this.$route.params.id;
      this.getData();
      getSection().then((response) => {
        const res = response.data.data;
        this.department = res.filter(
          (ele) => ele.department && ele.type === "业务"
        );
      });
      APIsuffixAll().then((response) => {
        this.allSuffix = response.data.data;
      });
      // APIJoomName().then(response => {
      //   this.joomArr = response.data.data;
      // });
      APIShopifyName().then((response) => {
        this.shopifyArr = response.data.data;
      });
      // APIVovaName().then(response => {
      //   this.vovaArr = response.data.data;
      // });
    }
  },
};
</script>
<style lang="scss" scoped>
.wishPas {
  position: absolute;
  right: 15px;
  top: 10px;
}
section {
  padding-bottom: 40px;
}
.image {
  width: 100px;
  height: 90px;
  margin-left: 10px;
}
.essential {
  font-size: 16px;
  line-height: 45px;
  font-weight: normal;
  padding-left: 18px;
  border-left: 2px solid #2395f1;
}
.spsz {
  font-size: 15px;
  font-weight: normal;
  line-height: 40px;
  padding: 0;
  margin: 0;
  float: left;
  margin-right: 10px;
}
.textZt {
  line-height: 38px;
  text-align: center;
}
.sx {
  background: #eee;
  text-align: center;
  line-height: 34px;
  margin-left: 15px;
  margin-top: 12px;
  border-radius: 3px;
  cursor: pointer;
  width: 80px;
  float: right;
  font-size: 13px;
  border: #eee solid 1px;
}
.sx:nth-child(4) {
  background: #ecf5ff;
  color: #409eff;
  border: #b3d8ff solid 1px;
}
.sx:nth-child(3) {
  background: #fef0f0;
  color: #f56c6c;
  border: #fbc4c4 solid 1px;
}
.sx:nth-child(1) {
  background: #ecf5ff;
  color: #409eff;
  border: #b3d8ff solid 1px;
}
.sx:nth-child(2) {
  background: #ecf5ff;
  color: #409eff;
  border: #b3d8ff solid 1px;
}
.sx:hover {
  background: #409eff;
  color: #fff;
}
.sx:nth-child(3):hover {
  background: #f56c6c;
  color: #fff;
}
.ss {
  text-align: center;
  line-height: 38px;
  margin-left: 10px;
  margin-top: 12px;
  border-radius: 3px;
  cursor: pointer;
  width: 20px;
  float: left;
  color: red;
}
.adres {
  font-weight: normal;
  margin-top: 15px;
  margin-left: 5px;
}
.xzz {
  display: block;
  float: left;
  text-align: center;
  line-height: 30px;
  border: #ccc solid 1px;
  cursor: pointer;
  padding: 0 5px;
  font-size: 13px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
.xzz1 {
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
.el-form-item {
  margin-bottom: 10px;
}
.exportAccount {
  display: block;
  float: left;
  border: #dcdfe6 solid 1px;
  height: 38px;
  line-height: 38px;
  border-left: none;
  background: #fff;
  padding: 0 10px;
  font-size: 13px;
  cursor: pointer;
  background: linear-gradient(to bottom, #f5f7fa 0%, #f5f7fa 45%, #d4d4d4 100%);
}
.exportAccount1 {
  display: block;
  float: left;
  border: #dcdfe6 solid 1px;
  height: 38px;
  line-height: 38px;
  border-right: none;
  background: #fff;
  padding: 0 14px;
  font-size: 13px;
  cursor: pointer;
  background: linear-gradient(to bottom, #f5f7fa 0%, #f5f7fa 45%, #d4d4d4 100%);
}
.leftmedia {
  margin-left: 13.2%;
}
.accyjsj {
  margin-left: 0px;
}
@media screen and (max-width: 1600px) {
  .leftmedia {
    margin-left: 2%;
  }
  //  .ptom60{
  //    padding-bottom: 50px;
  //  }
  .rd1 {
    width: 105px !important;
  }
  .rn1 {
    width: 43% !important;
  }
  .rd2 {
    width: 143px !important;
  }
  .rn2 {
    width: 45% !important;
  }
  .rn3 {
    width: 42% !important;
  }
  .clshopify {
    width: 105px !important;
  }
  //  .top1601{
  //    width: 105px !important;
  //  }
  .exportAccount {
    font-size: 12px;
  }
  .exportAccount1 {
    font-size: 12px;
  }
}
@media screen and (max-width: 1350px) {
  .sx {
    background: #eee;
    text-align: center;
    line-height: 34px;
    margin-left: 15px;
    margin-top: 12px;
    border-radius: 3px;
    cursor: pointer;
    width: 60px;
    float: right;
    font-size: 13px;
    border: #eee solid 1px;
  }
}
@media screen and (max-width: 1300px) {
  .leftmedia {
    margin-left: 1px;
  }
}
</style>