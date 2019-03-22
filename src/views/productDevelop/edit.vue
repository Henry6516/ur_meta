<template>
  <section>
    <el-form :model="editForm"
             :inline="true"
             label-width="100px"
             ref="editForm">
      <el-row>
        <el-col :span="8">
          <el-form-item label="">
            <img :src='editForm.picUrl'
                 style="width: 440px;height: 405px;padding-left:100px;padding-top:10px;margin-bottom:5px;">
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商品图片链接">
            <el-input size="small"
                      v-model="editForm.picUrl"
                      style="width:390px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否备货">
            <el-select size="small"
                       v-model="editForm.stockUp"
                       style="width:390px;">
              <el-option label="否"
                         value="0"></el-option>
              <el-option label="是"
                         value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商品编码">
            <el-input size="small"
                      v-model="editForm.goodsCode"
                      style="width:390px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="">
            <span style="color: red;margin-left: 30px;margin-right: 8px">*商品名称</span>
            <el-input size="small"
                      v-model="editForm.goodsName"
                      style="width:390px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="">
            <span style="color: red;margin-left: 14px;margin-right: 8px">*中文申报名</span>
            <el-input size="small"
                      v-model="editForm.aliasCnName"
                      style="width:390px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="">
            <span style="color: red;margin-left: 14px;margin-right: 8px">*英文申报名</span>
            <el-input size="small"
                      v-model="editForm.aliasEnName"
                      style="width:390px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="采购">
            <el-input size="small"
                      v-model="editForm.purchaser"
                      style="width:390px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="业绩归属人1">
            <el-input size="small"
                      v-model="editForm.possessMan1"
                      style="width:390px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="责任归属人1">
            <el-input size="small"
                      v-model="editForm.possessMan2"
                      style="width:390px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="">
            <span style="color: red;margin-left: 14px;margin-right: 8px">*供应商名称</span>
            <el-input size="small"
                      v-model="editForm.supplierName"
                      style="width:390px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="">
            <span style="color: red;margin-left: 54px;margin-right: 8px">*规格</span>
            <el-select size="small"
                       v-model="editForm.packName"
                       style="width:390px"
                       @change="specIndex($event)">
              <el-option v-for="(item, key) in spec" :key='item.key' :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="特殊属性必填">
            <el-select size="small"
                       v-model="editForm.attributeName"
                       style="width:390px"
                       @change="specificityIndex($event)">
              <el-option v-for="(item, key) in specificity" :key='item.key' :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="">
            <span style="color: red;margin-left: 54px;margin-right: 8px">*仓库</span>
            <el-select size="small"
                       v-model="editForm.storeName"
                       style="width:390px"
                       filterable clearable
                       @change="repertoryIndex($event)">
              <el-option v-for="(item, key) in repertory" :key='item.key' :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="季节">
            <el-select size="small"
                       v-model="editForm.season"
                       style="width:390px"
                       @change="seasonnIndex($event)">
              <el-option v-for="(item, key) in seasonn" :key='item.key' :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-col :span="7">
            <el-form-item label="禁售平台">
              <el-select size="small"
                         style="width:350px"
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
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="对应销售">
              <el-select size="small"
                         style="width:350px"
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
            </el-form-item>
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
          <el-col :span="5">
            <el-form-item label="主类目">
              <el-select size="small"
                         style="width:200px"
                         v-model="oaGoods.cate"
                         @change="mainIndex($event)">
                <el-option v-for="(item, key) in mainCategory" :key='item.key' :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="子类目">
              <el-select size="small"
                         style="width:200px"
                         v-model="oaGoods.subCate"
                         @change="childrenIndex($event)">
                <el-option v-for="(item, key) in childrenCategory" :key='item.key' :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-form-item label="">
            <span style="color: red;margin-left: 54px;margin-right: 8px">*描述</span>
            <el-input size="small"
                      type="textarea"
                      v-model="editForm.description"
                      style="width:1500px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="关键词Tags">
            <el-input size="small"
                      v-model="editForm.wishTags"
                      style="width: 1500px"
                      placeholder="--tags关键词不能超过10个，逗号分隔--"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="最前关键词">
            <span>
              <span style="color: red">{{foremost}}</span>个字符
            </span>
             <span style="margin-left: 10px">
              <font style="color: red">说明：</font>性别定位/多个一卖等。如Women/Men/Girl/Baby/Kids/1PC/2PC/5PC/4 Colors/5Pcs Set…
            </span>
            <br>
            <el-input size="small"
                      v-model="editForm.headKeywords"
                      style="width:1500px"
                      placeholder="--一个关键词--"
                      @input="top($event)"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="必选关键词">
             <span>
              <span style="color: red">{{bxlength}}</span>个关键词<span style="color: red;margin-left: 10px">{{bxtotal}}</span>个字符
            </span>
            <span>
              <font style="color: red;margin-left: 10px">说明：</font>物品名/材质/特征等。如T-Shirt(物品名)/V-neck(特征)/Cotton(材质)
            </span>
            <el-button type="text" @click="dialogTableVisible = true">批量设置</el-button>
            <div>
              必填
              <el-input size="small"
                        style="width:487px" v-model="mandatoryData[0]" @blur="mandatory()"></el-input>
              <el-input size="small"
                        style="width:487px" v-model="mandatoryData[1]" @blur="mandatory()"></el-input>
              <el-input size="small"
                        style="width:487px" v-model="mandatoryData[2]" @blur="mandatory()"></el-input>
            </div>
            <div>
              选填
              <el-input size="small"
                        style="width:487px" v-model="mandatoryData[3]" @blur="mandatory()"></el-input>
              <el-input size="small"
                        style="width:487px" v-model="mandatoryData[4]" @blur="mandatory()"></el-input>
              <el-input size="small"
                        style="width:487px" v-model="mandatoryData[5]" @blur="mandatory()"></el-input>

            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="随机关键词">
            <span>
              <span style="color: red">{{sjlength}}</span>个关键词<span style="color: red;margin-left: 10px">{{sjtotal}}</span>个字符
            </span>
            <span>
              <font style="color: red;margin-left: 10px">说明：</font>形容词/品类热词等。如Fashion/Elegant/Hot/DIY/Casual…
            </span>
            <el-button type="text" @click="dialogTable = true">批量设置</el-button>
            <div>
              必填
              <el-input size="small"
                        style="width:290px" v-model="randomData[0]" @blur="random()"></el-input>
              <el-input size="small"
                        style="width:290px" v-model="randomData[1]" @blur="random()"></el-input>
              <el-input size="small"
                        style="width:290px" v-model="randomData[2]" @blur="random()"></el-input>
              <el-input size="small"
                        style="width:290px" v-model="randomData[3]" @blur="random()"></el-input>
              <el-input size="small"
                        style="width:290px" v-model="randomData[4]" @blur="random()"></el-input>
            </div>
            <div>
              选填
              <el-input size="small"
                        style="width:290px" v-model="randomData[5]" @blur="random()"></el-input>
              <el-input size="small"
                        style="width:290px" v-model="randomData[6]" @blur="random()"></el-input>
              <el-input size="small"
                        style="width:290px" v-model="randomData[7]" @blur="random()"></el-input>
              <el-input size="small"
                        style="width:290px" v-model="randomData[8]" @blur="random()"></el-input>
              <el-input size="small"
                        style="width:290px" v-model="randomData[9]" @blur="random()"></el-input>

            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="最后关键词">
            <span>
              <span style="color: red">{{last}}</span>个字符
            </span>
            <span>
              <font style="color: red">说明：</font>附加说明词。如Randomly/S-3XL/2ml/(Color: Nude)/Big Size…
            </span>
            <br>
            <el-input size="small"
                      v-model="editForm.tailKeywords"
                      style="width: 1500px"
                      placeholder="--最多一个关键词--"
                      @input="bottm($event)"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-form :model="oaGoods"
             :inline="true"
             label-width="100px"
             ref="oaGoods">
      <el-row>
        <el-col :span="8">
          <el-form-item label="供应商链接1">
            <el-input size="small"
                      v-model="oaGoods.vendor1"
                      style="width:390px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="供应商链接2">
            <el-input size="small"
                      v-model="oaGoods.vendor2"
                      style="width:390px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="供应商链接3">
            <el-input size="small"
                      v-model="oaGoods.vendor3"
                      style="width:390px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="平台链接1">
            <el-input size="small"
                      v-model="oaGoods.origin1"
                      style="width:390px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="平台链接2">
            <el-input size="small"
                      v-model="oaGoods.origin2"
                      style="width:390px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="平台链接3">
            <el-input size="small"
                      v-model="oaGoods.origin3"
                      style="width:390px"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-select v-model="btn"
               size="small"
               placeholder="请选择操作方式">
      <el-option v-for="item in options"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value"></el-option>
    </el-select>
    <el-table :data="tableData">
      <el-table-column type="selection"
                       align="center"
                       header-align="center"></el-table-column>
      <el-table-column type="index"
                       align="center"
                       header-align="center">
      </el-table-column>
      <el-table-column label="操作"
                       header-align="center"
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
                       header-align="center">
        <template slot-scope="scope">
          <el-input size="small"
                    v-model="scope.row.sku"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="款式1"
                       prop="property1"
                       header-align="center">
        <template slot-scope="scope">
          <el-input size="small"
                    v-model="scope.row.property1"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="款式2"
                       prop="property2"
                       header-align="center">
        <template slot-scope="scope">
          <el-input size="small"
                    v-model="scope.row.property2"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="款式3"
                       prop="property3"
                       header-align="center">
        <template slot-scope="scope">
          <el-input size="small"
                    v-model="scope.row.property3"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="成本价"
                       prop="costPrice"
                       header-align="center">
        <template slot-scope="scope">
          <el-input size="small"
                    v-model="scope.row.costPrice"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="重量"
                       prop="weight"
                       header-align="center">
        <template slot-scope="scope">
          <el-input size="small"
                    v-model="scope.row.weight"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="零售价"
                       prop="retailPrice"
                       header-align="center">
        <template slot-scope="scope">
          <el-input size="small"
                    v-model="scope.row.retailPrice"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="joom零售价"
                       prop="joomPrice"
                       header-align="center">
        <template slot-scope="scope">
          <el-input size="small"
                    v-model="scope.row.joomPrice"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="joom运费"
                       prop="joomShipping"
                       header-align="center">
        <template slot-scope="scope">
          <el-input size="small"
                    v-model="scope.row.joomShipping"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="备货数量"
                       prop="stockNum"
                       header-align="center">
        <template slot-scope="scope">
          <el-input size="small"
                    v-model="scope.row.stockNum"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <el-row style="margin-top:5px;">
      <el-col :span="4">
        <el-input v-model="rows"
                  size="small"
                  placeholder="行数"
                  style="width:190px"></el-input>
        <el-button size="small"
                   @click="addClomun">新增行</el-button>
      </el-col>
      <el-col :span="4">
        <el-input v-model="costprice"
                  size="small"
                  placeholder="成本价￥"
                  style="width:190px"></el-input>
        <el-button size="small"
                   @click="cosprice">成本确定</el-button>
      </el-col>
      <el-col :span="4">
        <el-input v-model="weight"
                  size="small"
                  placeholder="重量g"
                  style="width:190px"></el-input>
        <el-button size="small"
                   @click="weht">重量确定</el-button>
      </el-col>
      <el-col :span="4">
        <el-input v-model="retailprice"
                  size="small"
                  placeholder="零售价$"
                  style="width:190px"></el-input>
        <el-button size="small"
                   @click="price">价格确定</el-button>
      </el-col>
      <el-col :span="4">
        <el-input v-model="joomretailprice"
                  size="small"
                  placeholder="joom零售价$"
                  style="width:190px"></el-input>
        <el-button size="small"
                   @click="joomprice">价格确定</el-button>
      </el-col>
      <el-col :span="4">
        <el-input v-model="transportationcost"
                  size="small"
                  placeholder="joom运费$"
                  style="width:185px"></el-input>
        <el-button size="small"
                   @click="transport">价格确定</el-button>
      </el-col>
    </el-row>
    <!-- <div style="margin-top:20px;">
      <el-button size="small"
                 type="success">一键生成SKU</el-button>
      <el-button size="small"
                 type="primary">保存当前数据</el-button>
      <el-button size="small"
                 type="primary">保存并完善</el-button>
      <el-button size="small"
                 type="warning">导入普源</el-button>
      <el-button size="small"
                 type="info">生成采购单</el-button>
      <el-button size="small"
                 type="danger">删除行</el-button>
    </div> -->
    <el-dialog title="批量增加关键词"
               :visible.sync="dialogTableVisible">
      <el-input size="small"
                type="textarea"
                :rows="20"
                placeholder="-多个必选关键词-"></el-input>
    </el-dialog>
    <el-dialog title="批量增加关键词"
               :visible.sync="dialogTable">
      <el-input size="small"
                type="textarea"
                :rows="20"
                placeholder="-多个随机关键词-"></el-input>
    </el-dialog>
    <el-button type="primary"
               @click="save"
               style="position: fixed;bottom: 5px;left:50%;width:200px;">保存</el-button>
  </section>
</template>
<script type="text/ecmascript-6">
import { APIAttributeInfo, APISaveAttribute,APIAttribute } from '../../api/product'
import { getMember, getGoodscats,getAttributeInfoPackName,getAttributeInfoSpecialAttribute,getAttributeInfoStoreName,getAttributeInfoSeason,getAttributeInfoPlat,getAttributeInfoSalesman,getAttributeInfoCat,getAttributeInfoSubCat } from '../../api/profit'
export default {
  data() {
    return {
      tableData: [],
      btn: '',
      rows: 1,
      costprice: null,
      weight: null,
      retailprice: null,
      joomretailprice: null,
      transportationcost: null,
      dialogTableVisible:false,
      dialogTable:false,
      sjlength:0,
      bxlength:0,
      jspt:false,
      cate: [],
      last:0,
      dyxs:false,
      category:[],
      spec:[],
      specificity:[],
      repertory:[],
      seasonn:[],
      violation:[],
      mainSsale:[],
      mainCategory:[],
      childrenCategory:[],
      screen:[],
      foremost:0,
      options: [
        {
          value: '选项1',
          label: '一键生成SKU'
        },
        {
          value: '选项2',
          label: '保存当前数据'
        },
        {
          value: '选项3',
          label: '保存并完善'
        },
        {
          value: '选项4',
          label: '导入普源'
        },
        {
          value: '选项5',
          label: '生成采购单'
        },
        {
          value: '选项6',
          label: '删除行'
        }
      ],
      condition: {
        id: 0
      },
      bxtotal:0,
      sjtotal:0,
      mandatoryData:["","","","","",""],
      randomData:["","","","","","","","","",""],
      editForm: {},
      oaGoods: {},
      dictionaryName1:"",
      mapPersons1:""
//      saveInfo: {
//        basicInfo: {
//          goodsInfo: {
//            id: 5,
//            IsLiquid: '是',
//            IsPowder: '否',
//            isMagnetism: '否',
//            IsCharged: '否',
//            description: null,
//            GoodsName: 'test-01-01-plat',
//            AliasCnName: null,
//            AliasEnName: null,
//            PackName: null,
//            Season: null,
//            DictionaryName: null,
//            SupplierName: null,
//            StoreName: null,
//            Purchaser: null,
//            possessMan1: null,
//            possessMan2: null,
//            DeclaredValue: null,
//            picUrl: null,
//            goodsid: 24,
//            GoodsCode: null,
//            achieveStatus: null,
//            devDatetime: null,
//            developer: null,
//            updateTime: null,
//            picStatus: null,
//            SupplierID: null,
//            StoreID: null,
//            AttributeName: null,
//            bgoodsid: null,
//            completeStatus: null,
//            isVar: '否',
//            headKeywords: null,
//            requiredKeywords: null,
//            randomKeywords: null,
//            tailKeywords: null,
//            wishtags: null,
//            stockUp: '否',
//            picCompleteTime: null,
//            goodsstatus: null,
//            stockdays: null,
//            wishpublish: null,
//            number: null,
//            mid: null,
//            extendStatus: null,
//            mapPersons: null,
//            filterType: 3
//          },
//          oaGoods: {
//            nid: 24,
//            vendor1: '',
//            vendor2: null,
//            vendor3: null,
//            origin1: '',
//            origin2: null,
//            origin3: null
//          }
//        },
//        skuInfo: [
//
//        ]
//      }
    }
  },
  methods: {
    selectalld() {
      var ard = []
      for (const item in this.violation) {
        ard.push(this.violation[item])
      }
      this.editForm.dictionaryName = ard
      this.dictionaryName1=ard.join(',')
      console.log(this.dictionaryName1)
//      this.member = this.allMember
    },
    noselectd() {
      this.editForm.dictionaryName = []
      this.dictionaryName1=""
//      this.member = this.allMember
      console.log(this.editForm)
    },
    selectalld1() {
      var ard1 = []
      for (const item in this.mainSsale) {
        ard1.push(this.mainSsale[item])
      }
      this.editForm.mapPersons = ard1
      this.mapPersons1=ard1.join(',')
      console.log(this.editForm.mapPersons)
//      this.member = this.allMember
    },
    noselectd1() {
      this.editForm.mapPersons = []
      this.mapPersons1=""
//      this.member = this.allMember
      console.log(this.editForm)
    },
    forbidSale(e){
      this.dictionaryName1=e.join(',')
    },
    forbidSale1(e){
      this.mapPersons1=e.join(',')
    },
    top(e){
      this.foremost=e.length
    },
    bottm(e){
      this.last=e.length
    },
    mainIndex(item){
      this.oaGoods.cate=item
      this.childrenCategory=[]
      for(var key in this.screen) {
        if(this.screen[key]==item){
          this.childrenCategory.push(key)
        }
      }
      this.oaGoods.subCate=this.childrenCategory[0]
    },
    childrenIndex(item){
      this.oaGoods.subCate=item
      console.log(this.oaGoods)
    },
    pushVin(item){
      this.editForm.dictionaryName.push(item)
      this.jspt=!this.jspt
    },
    pushSale(item){
      this.editForm.mapPersons.push(item)
      this.dyxs=!this.dyxs
    },
    specIndex(e){
      this.editForm.packName=e
      console.log(this.editForm.packName)
    },
    specificityIndex(e){
      this.editForm.attributeName=e
      console.log(this.editForm.attributeName)
    },
    repertoryIndex(e){
      this.editForm.storeName=e
      console.log(this.editForm.storeName)
    },
    seasonnIndex(e){
      this.editForm.season=e
      console.log(this.editForm.season)
    },
    addzk(){
      this.jspt=!this.jspt
    },
    addxs(){
      this.dyxs=!this.dyxs
    },
    dellxs(index){
      this.editForm.mapPersons.splice(index, 1)
    },
    delljs(index){
      this.editForm.dictionaryName.splice(index, 1)
    },
    del(index, row) {
      this.tableData.splice(index, 1)
      console.log(this.tableData)
    },
    //增加行
    addClomun() {
      let data = {
        id: null,
        infoId: null,
        sku: '',
        property1: null,
        property2: null,
        property3: null,
        Weight: null,
        memo1: null,
        memo2: null,
        memo3: null,
        memo4: null,
        linkurl: null,
        goodsskuid: null,
        RetailPrice: null,
        CostPrice: null,
        stockNum: null,
        did: null,
        joomPrice: null,
        joomShipping: null
      }
      for (let i = 0; i < this.rows; i++) {
        this.tableData.push(data)
      }
      console.log(this.tableData)
    },
    //成本确定
    cosprice() {
      if (this.costprice) {
        console.log(this.costprice)
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].costPrice = this.costprice
        }
      } else {
        return false
      }
    },
    //重量确定
    weht() {
      if (this.weight) {
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].weight = this.weight
        }
      } else {
        return false
      }
    },
    //零售价格确定
    price() {
      if (this.retailprice) {
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].retailPrice = this.retailprice
        }
      } else {
        return false
      }
    },
    //joom零售价格确定
    joomprice() {
      if (this.joomretailprice) {
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].joomPrice = this.joomretailprice
        }
      } else {
        return false
      }
    },
    //joom运费
    transport() {
      if (this.transportationcost) {
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].joomShipping = this.transportationcost
        }
      } else {
        return false
      }
    },
    save() {
      const md=JSON.stringify(this.mandatoryData)
      const mr=JSON.stringify(this.randomData)
      let saveInfo={
        basicInfo: {
          goodsInfo: {
            id: this.condition.id,
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
            filterType: this.editForm.filterType
          },
          oaGoods: {
            nid: this.oaGoods.nid,
            cate:this.oaGoods.cate,
            subCate:this.oaGoods.subCate,
            vendor1: this.oaGoods.vendor1,
            vendor2: this.oaGoods.vendor2,
            vendor3: this.oaGoods.vendor3,
            origin1: this.oaGoods.origin1,
            origin2: this.oaGoods.origin2,
            origin3: this.oaGoods.origin3
          }
        },
        skuInfo: this.tableData
      }
      console.log(saveInfo)
      APISaveAttribute(saveInfo).then(res => {
        if (res.data.data[0] === 'success') {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        } else {
          this.$message.error('保存失败')
        }
      })
    },
    mandatory(e){
      this.bxlength=0
      this.bxtotal=0
      var st1=0
      for(var i=0;i<this.mandatoryData.length;i++){
        if(this.mandatoryData[i]!=""){
          this.bxlength++
          st1+=this.mandatoryData[i].length
        }
      }
      this.bxtotal=st1
      console.log(this.mandatoryData)
    },
    random(e){
      this.sjlength=0
      var st2=0
      for(var i=0;i<this.randomData.length;i++){
        if(this.randomData[i]!=""){
          this.sjlength++
          st2+=this.randomData[i].length
        }
      }
      this.sjtotal=st2
    },
    getData() {
      APIAttributeInfo(this.condition).then(res => {
        this.tableData = res.data.data.skuInfo
        this.editForm = res.data.data.basicInfo.goodsInfo
        this.oaGoods = res.data.data.basicInfo.oaGoods
        this.dictionaryName1=this.editForm.dictionaryName
        this.mapPersons1=this.editForm.mapPersons
        this.editForm.requiredKeywords=JSON.parse(this.editForm.requiredKeywords)
        this.editForm.randomKeywords=JSON.parse(this.editForm.randomKeywords)
        this.editForm.mapPersons=this.editForm.mapPersons.split(",")
        this.editForm.dictionaryName=this.editForm.dictionaryName.split(",")
        if(this.editForm.headKeywords){
          this.foremost=this.editForm.headKeywords.length
        }
        if(this.editForm.tailKeywords){
          this.last=this.editForm.tailKeywords.length
        }
        if(this.editForm.requiredKeywords){
          this.mandatoryData= this.editForm.requiredKeywords
        }
        if(this.editForm.randomKeywords){
          this.randomData= this.editForm.randomKeywords
        }
        console.log(this.randomData)
        if(this.editForm.randomKeywords){
          for(var i=0;i<this.editForm.randomKeywords.length;i++){
            if(this.editForm.randomKeywords[i]!=""){
              this.sjlength++
              this.sjtotal+=this.editForm.randomKeywords[i].length
            }
          }
        }
        if(this.editForm.requiredKeywords){
          for(var i=0;i<this.editForm.requiredKeywords.length;i++){
            if(this.editForm.requiredKeywords[i]!=""){
              this.bxlength++
              this.bxtotal+=this.editForm.requiredKeywords[i].length
            }
          }
        }
      })
    }
  },
  mounted() {
    this.condition.id = this.$route.params.id
    this.getData()
    getGoodscats().then(response => {
      this.category = this.cate = response.data.data
    })
    getAttributeInfoPackName().then(response => {
      this.spec =  response.data.data
    })
    getAttributeInfoSpecialAttribute().then(response => {
      this.specificity =  response.data.data
    })
    getAttributeInfoStoreName().then(response => {
      this.repertory =  response.data.data
    })
    getAttributeInfoSeason().then(response => {
      this.seasonn =  response.data.data
    })
    getAttributeInfoPlat().then(response => {
      this.violation =  response.data.data
      console.log(this.violation)
    })
    getAttributeInfoSalesman().then(response => {
      this.mainSsale =  response.data.data
      console.log(this.mainSsale)
    })
    getAttributeInfoCat().then(response => {
      this.mainCategory =  response.data.data
    })
    getAttributeInfoSubCat().then(response => {
      this.screen =  response.data.data
      const sCate=this.oaGoods.cate
      for(var key in this.screen) {
        if(this.screen[key]==sCate){
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
  margin-top: 20px;
}
  .fp{
    float: left;
  }
  .hovp:hover{
    color: steelblue;
  }
</style>

