<template>
  <section>
    <div>
      <el-button
        type="primary"
        @click="add()"
        size="small"
        style="margin-left:0.7%;margin-top:10px;"
      >
        <i class="el-icon-plus"></i>添加
      </el-button>
      <el-table
        :data="ebayData"
        border
        :height="tableHeightstock"
        :header-cell-style="getRowClass"
        style="width:98%;margin-left:0.7%;margin-top:15px;"
      >
        <el-table-column type="index" fixed align="center" width="50" header-align="center"></el-table-column>
        <el-table-column label="操作" fixed header-align="center" align="center" width="70">
          <template slot-scope="scope">
            <el-tooltip content="更新">
              <i
                @click="editArt(scope.$index, scope.row)"
                class="el-icon-edit"
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
        <el-table-column property="pyCate" label="普源类目" align="center" width="120"></el-table-column>
        <el-table-column label="平台" width="222" header-align="center" align="center">
          <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.detail" :key="index" class="supera">{{item.plat}}</div>
          </template>
        </el-table-column>
        <el-table-column label="站点" align="center">
          <template slot-scope="scope">
            <span v-for="(item, index) in scope.row.detail" :key="index">
              <span
                v-for="(itemm, index) in item.platValue"
                :key="index"
              >{{itemm.marketplace}}，</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column property="createdDate" label="添加时间" align="center" width="150">
          <template slot-scope="scope">{{scope.row.createdDate | cutOutDate}}</template>
        </el-table-column>
        <el-table-column property="updatedDate" label="更新时间" align="center" width="150">
          <template slot-scope="scope">{{scope.row.updatedDate | cutOutDate}}</template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="condition.page"
        :page-size="condition.pageSize"
        :total="this.total"
        layout="prev, pager, next"
        style="margin: 15px 0;margin-left: 10px;margin-bottom:0"
      ></el-pagination>
    </div>
    <el-dialog title="编辑" :visible.sync="ebaydisLogin" width="70%" :close-on-click-modal="false">
      <el-row style="margin-top: 0">
        <el-col :span="24" class="cTop cTop2">
          <el-col :span="24" style="margin-bottom: 10px">
            <el-col :span="2">
              <p class="baspOne">普源类目</p>
            </el-col>
            <el-col :span="22" style="margin-top:2px;">
              <el-radio-group v-model="ebay.pyCate">
                <el-radio v-for="(item,index) in pyCate" :key="index" :label="item">{{item}}</el-radio>
              </el-radio-group>
              <!-- <el-checkbox-group v-model="category" @change="handleCheckedCitiesChange">
                <el-checkbox v-for='(item,index) in pyCate' :key="index" :label="item" :value="item" @change="checkinlist(item)"></el-checkbox>
              </el-checkbox-group>-->
            </el-col>
          </el-col>
          <el-col :span="24" style="margin-bottom: 12px">
            <el-col :span="2">
              <p class="baspOne">平台</p>
            </el-col>
            <el-col :span="22" style="margin-top:2px;">
              <el-radio-group v-model="ebay.plat">
                <el-radio
                  v-for="(item,index) in rulePlat"
                  :key="index"
                  @change="getPlatEbay(item)"
                  :label="item"
                >{{item}}</el-radio>
              </el-radio-group>
            </el-col>
          </el-col>
          <el-col :span="24" style="margin-bottom: 12px">
            <el-col :span="2">
              <p class="baspOne">刊登站点</p>
            </el-col>
            <el-col :span="22" style="margin-top:2px;">
              <el-radio-group v-model="ebay.marketplace">
                <el-radio
                  v-for="(item,index) in ebayRuleOptions"
                  :key="index"
                  @change="getOneLowRule(item)"
                  :label="item"
                >{{item}}</el-radio>
              </el-radio-group>
            </el-col>
          </el-col>
          <el-col :span="24" style="margin-bottom: 12px" class="topn">
            <el-col :span="2">
              <p class="baspOne">一级类目</p>
            </el-col>
            <el-col :span="22" style="margin-top:2px;">
              <el-radio-group v-model="ebay.cate">
                <el-radio
                  v-for="(item,index) in ebayRuleOne"
                  :key="index"
                  @change="getTowLowRule(item.cate)"
                  :label="item.cate"
                >{{item.cate}}</el-radio>
              </el-radio-group>
            </el-col>
          </el-col>
          <el-col :span="24" style="margin-bottom: 0px" class="topn">
            <el-col :span="2">
              <p class="baspOne">二级类目</p>
            </el-col>
            <el-col :span="22" style="margin-top:2px;">
              <el-radio-group v-model="ebay.subCate">
                <el-radio v-for="(item,index) in ebayRuleTwo" :key="index" :label="item">{{item}}</el-radio>
              </el-radio-group>
            </el-col>
          </el-col>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ebaydisLogin = false">取 消</el-button>
        <el-button type="primary" @click="saveEbay()">保 存</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="添加"
      :visible.sync="addebaydisLogin"
      width="90%"
      :close-on-click-modal="false"
      top="5%"
    >
      <el-row style="margin-top: 0">
        <el-col :span="24" class="cTop cTop2">
          <el-col :span="24" style="margin-bottom: 10px">
            <el-col :span="1">
              <p class="baspOne">类目</p>
            </el-col>
            <el-col :span="22" style="margin-top:2px;">
              <el-radio-group v-model="addPyCate">
                <el-radio v-for="(item,index) in pyCate" :key="index" :label="item">{{item}}</el-radio>
              </el-radio-group>
            </el-col>
            <div class="pacAb">
              <el-button size="small" type="success" @click="customCate">自定义类目</el-button>
            </div>
          </el-col>
          <el-col :span="24" style="margin-bottom: 12px">
            <el-col :span="24">
              <el-col :span="1">
                <p class="baspOne">规则</p>
              </el-col>
              <el-col :span="23">
                <el-col :span="24">
                  <div v-for="(item,index) in itemDetail" :key="index">
                      <span
                        class="curSpan"
                        style="font-size:14px;display:block;float:left;margin-right:20px;"
                         :class="itemCateIndex==index?'redred':''"
                         @click="rulePlatActive1(index)"
                      >
                        <span class="oneClass" :class="item.flag?'ruleBac':''" @click.stop="rulePlatActive(index)"></span>
                        {{item.plat}}
                      </span>
                  </div>
                </el-col>
              </el-col>
              <el-col :span="23">
                <div v-for="(item,index) in itemDetail" :key="index">
                  <el-col :span="24" style="display: none;">
                    <span
                      class="curSpan"
                      style="font-size:14px;color:#3c8dbc"
                      @click="rulePlatActive(index)"
                    >
                      <span class="oneClass" :class="item.flag?'ruleBac':''"></span>
                      {{item.plat}}
                    </span>
                  </el-col>
                  <div
                    v-for="(itemTwo,indexTwo) in item.platValue"
                    :key="indexTwo"
                    v-show="itemCateIndex==index"
                  >
                  <div v-if="item.plat=='ebay'">
                    <el-col :span="8">
                      <el-col :span="24" style="margin-top:20px;">
                        <span
                          class="curSpan"
                          @click="ruleMakActive(index,indexTwo)"
                          :class="itemTwo.flag?'cColor':''"
                        >
                          <span class="oneClass" :class="itemTwo.flag?'ruleBac':''"></span>
                          {{itemTwo.marketplace}}
                        </span>
                      </el-col>
                      <el-col
                        :span="23"
                        style="margin-top:5px;padding-left:18px;"
                        class="scrollTopHeight"
                      >
                        <el-col
                          :span="24"
                          v-for="(itemTree,indexTree) in itemTwo.marketplaceValue"
                          :key="indexTree"
                        >
                          <el-col :span="24">
                            <span
                              class="curSpan curSpanTree"
                              :class="itemTree.flag?'cColor':''"
                              @click="ruleCateActive(index,indexTwo,indexTree)"
                            >
                              <span class="oneClass" :class="itemTree.flag?'ruleBac':''"></span>
                              {{itemTree.cate}}
                            </span>
                          </el-col>
                          <el-col :span="24" style="margin-top:5px;width:100%;" class="treeDiv">
                            <el-select
                              v-model="itemTree.cateValue.subCateChecked"
                              multiple
                              collapse-tags
                              style="width:95%;"
                              placeholder="请选择"
                              size="small"
                              @change="ruleSubcateActive(index,indexTwo,indexTree)"
                            >
                              <el-option
                                v-for="item in itemTree.cateValue.subCate"
                                :key="item"
                                :label="item"
                                :value="item"
                              ></el-option>
                            </el-select>
                          </el-col>
                        </el-col>
                      </el-col>
                    </el-col>
                  </div>
                  <div v-if="item.plat=='wish'">
                    <el-col :span="24">
                      <el-col :span="24" style="margin-top:20px;">
                        <span
                          class="curSpan"
                          @click="ruleMakActive(index,indexTwo)"
                          :class="itemTwo.flag?'cColor':''"
                        >
                          <span class="oneClass" :class="itemTwo.flag?'ruleBac':''"></span>
                          {{itemTwo.marketplace}}
                        </span>
                      </el-col>
                      <el-col
                        :span="23"
                        style="margin-top:5px;padding-left:18px;"
                        class="scrollTopHeight"
                      >
                        <el-col
                          :span="12"
                          v-for="(itemTree,indexTree) in itemTwo.marketplaceValue"
                          :key="indexTree"
                        >
                          <el-col :span="24">
                            <span
                              class="curSpan curSpanTree"
                              :class="itemTree.flag?'cColor':''"
                              @click="ruleCateActive(index,indexTwo,indexTree)"
                            >
                              <span class="oneClass" :class="itemTree.flag?'ruleBac':''"></span>
                              {{itemTree.cate}}
                            </span>
                          </el-col>
                          <el-col :span="24" style="margin-top:5px;width:100%;" class="treeDiv">
                            <el-select
                              v-model="itemTree.cateValue.subCateChecked"
                              multiple
                              collapse-tags
                              style="width:95%;"
                              placeholder="请选择"
                              size="small"
                              @change="ruleSubcateActive(index,indexTwo,indexTree)"
                            >
                              <el-option
                                v-for="item in itemTree.cateValue.subCate"
                                :key="item"
                                :label="item"
                                :value="item"
                              ></el-option>
                            </el-select>
                          </el-col>
                        </el-col>
                      </el-col>
                    </el-col>
                  </div>
                  <div v-if="item.plat=='shopee'">
                    <el-col :span="6">
                      <el-col :span="24" style="margin-top:20px;">
                        <span
                          class="curSpan"
                          @click="ruleMakActive(index,indexTwo)"
                          :class="itemTwo.flag?'cColor':''"
                        >
                          <span class="oneClass" :class="itemTwo.flag?'ruleBac':''"></span>
                          {{itemTwo.marketplace}}
                        </span>
                      </el-col>
                      <el-col
                        :span="23"
                        style="margin-top:5px;padding-left:18px;"
                        class="scrollTopHeight1"
                      >
                        <el-col
                          :span="24"
                          v-for="(itemTree,indexTree) in itemTwo.marketplaceValue"
                          :key="indexTree"
                        >
                          <el-col :span="24">
                            <span
                              class="curSpan curSpanTree"
                              :class="itemTree.flag?'cColor':''"
                              @click="ruleCateActive(index,indexTwo,indexTree)"
                            >
                              <span class="oneClass" :class="itemTree.flag?'ruleBac':''"></span>
                              {{itemTree.cate}}
                            </span>
                          </el-col>
                          <el-col :span="24" style="margin-top:5px;width:100%;" class="treeDiv">
                            <el-select
                              v-model="itemTree.cateValue.subCateChecked"
                              multiple
                              collapse-tags
                              style="width:95%;"
                              placeholder="请选择"
                              size="small"
                              @change="ruleSubcateActive(index,indexTwo,indexTree)"
                            >
                              <el-option
                                v-for="item in itemTree.cateValue.subCate"
                                :key="item"
                                :label="item"
                                :value="item"
                              ></el-option>
                            </el-select>
                          </el-col>
                        </el-col>
                      </el-col>
                    </el-col>
                  </div>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-col>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addebaydisLogin = false">取 消</el-button>
        <el-button type="primary" @click="addsaveEbay()">保 存</el-button>
      </div>
    </el-dialog>
    <el-dialog
      width="30%"
      title="添加类目"
      :visible.sync="innerVisible"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-input v-model="CustomCateName" placeholder="类目名称"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false" type="primary">取 消</el-button>
        <el-button @click="addCustomCate" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script type="text/ecmascript-6">
import {
  ebayDevCatRule,
  ebayCatRule,
  ebaySaveDevCat,
  ebayDeleteDevCat,
  cateRule,
  getRulePlat,
  getRuleMarketplace,
  ruleCategory,
  ruleSaveCateRule,
  ruleDeleteCateRule,
  getCateRuleInfo,
  getPyCate
} from "../../api/product";
import { getMember, getAttributeInfoCat } from "../../api/profit";
export default {
  data() {
    return {
      itemCateIndex: 0,
      addEbayTwo: [],
      addEbayOne: [],
      category: [],
      ebayRuleOne: [],
      ebayRuleTwo: [],
      addRuleCat: [],
      addCate: [],
      addPlat: [],
      itemDetail: [],
      itemDetail1: [],
      addPyCate: null,
      ruleActive: 999,
      addMarketplace: [],
      tableHeightstock: window.innerHeight - 175,
      ebaydisLogin: false,
      addebaydisLogin: false,
      innerVisible: false,
      CustomCateName: null,
      pyCate: [],
      condition: {
        page: 1,
        pageSize: 40
      },
      total: null,
      itemId: null,
      ebay: {
        id: null,
        pyCate: null,
        plat: null,
        marketplace: null,
        cate: null,
        subCate: null
      },
      ebayOptions: [],
      addebay: {
        pyCate: null,
        plat: null,
        marketplace: null,
        cate: null,
        subCate: null
      },
      ebayCat: {
        parentId: null,
        category: null,
        marketplace: null
      },
      ebayCatRule: [],
      ebayCatRuleId: [],
      member: [],
      ebayCatRuleTwo: [],
      ebayData: [],
      rulePlat: [],
      ebayRuleOptions: []
    };
  },
  filters: {
    cutOutDate(value) {
      value = value.substring(0, 11);
      return value;
    }
  },
  methods: {
    addCustomCate() {
      if (this.CustomCateName) {
        this.pyCate.push(this.CustomCateName);
        this.addPyCate = this.CustomCateName;
        this.innerVisible = false;
      } else {
        this.$message.error("请输入类目名称");
      }
    },
    customCate() {
      this.CustomCateName = null;
      this.innerVisible = true;
    },
    ruleSubcateActive(a, b, c, d) {
      if (
        this.itemDetail[a].platValue[b].marketplaceValue[c].cateValue
          .subCateChecked.length != 0
      ) {
        this.itemDetail[a].platValue[b].marketplaceValue[c].flag = true;
        this.itemDetail[a].platValue[b].flag = true;
      }
      if (
        this.itemDetail[a].platValue[b].marketplaceValue[c].cateValue
          .subCateChecked.length == 0
      ) {
        this.itemDetail[a].platValue[b].marketplaceValue[c].flag = false;
      }
    },
    ruleCateActive(a, b, c) {
      this.itemDetail[a].platValue[b].marketplaceValue[c].flag = !this
        .itemDetail[a].platValue[b].marketplaceValue[c].flag;
      if (this.itemDetail[a].platValue[b].marketplaceValue[c].flag == false) {
        var data = this.itemDetail[a].platValue[b].marketplaceValue[c]
          .cateValue;
        data.subCateChecked = [];
      } else {
        var data = this.itemDetail[a].platValue[b].marketplaceValue[c]
          .cateValue;
        data.subCateChecked = data.subCate;
      }
      if (this.itemDetail[a].platValue[b].marketplaceValue[c].flag == true) {
        this.itemDetail[a].platValue[b].flag = true;
      }
    },
    ruleMakActive(a, b) {
      this.itemDetail[a].platValue[b].flag = !this.itemDetail[a].platValue[b]
        .flag;
      if (this.itemDetail[a].platValue[b].flag == false) {
        var data = this.itemDetail[a].platValue[b].marketplaceValue;
        for (var i = 0; i < data.length; i++) {
          data[i].flag = false;
          var Twodata = data[i].cateValue;
          Twodata.subCateChecked = [];
        }
      }
      if (this.itemDetail[a].platValue[b].flag == true) {
        var data = this.itemDetail[a].platValue[b].marketplaceValue;
        for (var i = 0; i < data.length; i++) {
          data[i].flag = true;
          var Twodata = data[i].cateValue;
          Twodata.subCateChecked = Twodata.subCate;
        }
      }
    },
    rulePlatActive1(i) {
      this.itemCateIndex = i;
    },    
    rulePlatActive(i) {
      this.itemDetail[i].flag = !this.itemDetail[i].flag;
    },
    handleCheckAllChange1(val) {
      this.addRuleCat = val;
    },
    getPlat(e) {
      let obj = {
        plat: e
      };
      getRuleMarketplace(obj).then(res => {
        if (res.data.data) {
          this.ebayOptions = res.data.data;
        }
      });
    },
    getPlatEbay(e) {
      let obj = {
        plat: e
      };
      getRuleMarketplace(obj).then(res => {
        if (res.data.data) {
          this.ebayRuleOptions = res.data.data;
        }
      });
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "color:#337ab7;background:#f5f7fa";
      } else {
        return "";
      }
    },
    getOneLow(e, index) {
      this.addebay.cate = null;
      this.addebay.subCate = null;
      this.addEbayTwo = [];
      this.ruleActive = index;
      let obj = {
        cate: null,
        plat: this.addebay.plat,
        marketplace: e
      };
      ruleCategory(obj).then(res => {
        this.addEbayOne = res.data.data;
      });
    },
    getTowLow(e) {
      this.addebay.subCate = null;
      let obj = {
        cate: e,
        plat: this.addebay.plat,
        marketplace: this.addebay.marketplace
      };
      ruleCategory(obj).then(res => {
        this.addEbayTwo = res.data.data[0].subCate;
      });
    },
    getOneLowRule(e) {
      this.ebay.cate = null;
      this.ebay.subCate = null;
      this.ebayRuleTwo = [];
      let obj = {
        cate: null,
        plat: this.ebay.plat,
        marketplace: e
      };
      ruleCategory(obj).then(res => {
        this.ebayRuleOne = res.data.data;
      });
    },
    getTowLowRule(e) {
      this.ebay.subCate = null;
      let obj = {
        cate: e,
        plat: this.ebay.plat,
        marketplace: this.ebay.marketplace
      };
      ruleCategory(obj).then(res => {
        this.ebayRuleTwo = res.data.data[0].subCate;
      });
    },
    handleSizeChange(val) {
      this.condition.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.condition.page = val;
      this.getData();
    },
    getTowLow1(e) {
      for (let i = 0; i < this.ebayCatRuleId.length; i++) {
        if (e == this.ebayCatRuleId[i].category) {
          this.ebayCat.parentId = this.ebayCatRuleId[i].id;
        }
      }
      ebayCatRule(this.ebayCat).then(res => {
        this.ebayCatRuleTwo = res.data.data;
      });
    },
    add() {
      this.itemId = null;
      var obj = {
        id: null
      };
      this.addPyCate = null;
      this.itemCateIndex=0
      getCateRuleInfo(obj).then(response => {
        this.itemDetail = response.data.data.detail;
      });
      getPyCate().then(response => {
        this.pyCate = response.data.data;
      });
      setTimeout(() => {
        this.addebaydisLogin = true;
      }, 500);
    },
    saveEbay() {
      if (this.ebay.cate || this.ebay.subCate) {
        ruleSaveCateRule(this.ebay).then(res => {
          if (res.data.data) {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.ebaydisLogin = false;
            this.getData();
          } else {
            this.$message.error(res.data.message);
            this.ebaydisLogin = false;
            this.getData();
          }
        });
      } else {
        this.$message.error("请选择类目");
      }
    },
    addsaveEbay() {
      var obj = {
        pyCate: this.addPyCate,
        id: this.itemId,
        detail: []
      };
      var data = this.itemDetail;
      for (var i = 0; i < data.length; i++) {
        if (data[i].flag == false) {
          data.splice(i, 1);
          i--;
        } else {
          var dataTwo = data[i].platValue;
          for (var k = 0; k < dataTwo.length; k++) {
            if (dataTwo[k].flag == false) {
              dataTwo.splice(k, 1);
              k--;
            } else {
              var dataTree = dataTwo[k].marketplaceValue;
              for (var j = 0; j < dataTree.length; j++) {
                if (dataTree[j].flag == false) {
                  dataTree.splice(j, 1);
                  j--;
                  // } else {
                  //   var dataFour = dataTree[j].cateValue;
                  //   for (var l = 0; l < dataFour.length; l++) {
                  //     if (dataFour[l].flag == false) {
                  //       dataFour.splice(l, 1);
                  //       l--;
                  //     }
                  //   }
                }
              }
            }
          }
        }
      }
      obj.detail = data;
        ruleSaveCateRule(obj).then(res => {
          if (res.data.data) {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.addebaydisLogin = false;
            this.getData();
          } else {
            this.$message.error(res.data.message);
            this.addebaydisLogin = false;
            this.getData();
          }
        });
        console.log(obj);
    },
    editArt(index, row) {
      var obj = {
        id: row._id
      };
      this.itemCateIndex=0
      getCateRuleInfo(obj).then(response => {
        this.itemDetail = response.data.data.detail;
        // var pyCate=[]
        this.itemId = response.data.data._id.$oid;
        for (var i = 0; i < response.data.data.pyCate.length; i++) {
          // pyCate.push(response.data.data.pyCate[i].name)
          if (response.data.data.pyCate[i].flag == true) {
            this.addPyCate = response.data.data.pyCate[i].name;
          }
        }
        // this.pyCate=pyCate
      });
      setTimeout(() => {
        this.addebaydisLogin = true;
      }, 500);
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
          ruleDeleteCateRule(conId).then(res => {
            if (res.data.message == "success") {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getData();
            }
          });
        })
        .catch(() => {});
    },
    getData() {
      cateRule(this.condition).then(res => {
        this.ebayData = res.data.data.items;
        this.total = res.data.data._meta.totalCount;
        this.condition.pageSize = res.data.data._meta.perPage;
        this.condition.page = res.data.data._meta.currentPage;
      });
      getRulePlat().then(res => {
        this.rulePlat = res.data.data;
        // this.total = res.data.data._meta.totalCount;
        // this.condition.pageSize = res.data.data._meta.perPage;
        // this.condition.page = res.data.data._meta.currentPage;
      });
    },
    getCate() {
      getRulePlat().then(res => {
        this.rulePlat = res.data.data;
      });
    },
    getDataCategory() {
      ebayCatRule(this.ebayCat).then(res => {
        let data = res.data.data;
        for (let i = 0; i < data.length; i++) {
          if (data[i].parentId != null) {
            this.ebayCatRule.push(data[i]);
          } else {
            this.ebayCatRuleId.push(data[i]);
          }
        }
      });
    }
  },
  mounted() {
    this.getData();
    this.getCate();
    this.getDataCategory();
    getPyCate().then(response => {
      this.pyCate = response.data.data;
    });
    var obj = {
      id: null
    };
    getCateRuleInfo(obj).then(response => {
      this.itemDetail = this.itemDetail1 = response.data.data.detail;
      // var pyCate=[]
      // for(var i=0;i<response.data.data.pyCate.length;i++){
      //   pyCate.push(response.data.data.pyCate[i].name)
      // }
      // this.pyCate=pyCate
    });
    getMember().then(response => {
      const res = response.data.data;
      this.member = res.filter(ele => ele.position === "开发");
    });
  }
};
</script>

<style scoped>
.basp {
  text-align: center;
}
.baspOne {
  text-align: center;
  margin: 0;
  color: #3c8dbc;
  padding-bottom: 10px;
}
.accspan {
  margin: 0;
  margin-bottom: 15px;
  display: block;
  border: #409eff solid 1px;
  padding: 0 10px;
  text-align: center;
  border-radius: 5px;
  line-height: 28px;
  float: left;
  margin-right: 10px;
  cursor: pointer;
  position: relative;
}
.ruleAcc {
  background: #409eff;
  color: #fff;
}
.posx {
  position: absolute;
  display: block;
  right: -5px;
  top: -10px;
  font-size: 14px;
  background: #ccc;
  color: #fff;
  border-radius: 50%;
  height: 20px;
  line-height: 20px;
  width: 20px;
}
.oneClass {
  width: 14px;
  height: 14px;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  display: block;
  float: left;
  margin-right: 10px;
}
.curSpan {
  cursor: pointer;
}
.curSpanTree {
  display: block;
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 14px;
}
.curSpanFour {
  display: block;
  margin-bottom: 10px;
  font-size: 12px;
  margin-top: 5px;
}
/* .treeDiv {
  height: 90px;
  overflow: hidden;
  overflow-y: auto;
} */
.ruleBac {
  width: 4px;
  height: 4px;
  background: #fff;
  border: #409eff solid 6px;
}
.ruleBac1 {
  width: 4px;
  height: 4px;
  background: #fff;
  border: #67c23a solid 6px;
}
.redred{
  color: #3c8dbc !important;
}
.scrollTopHeight {
  height: 480px;
  overflow: hidden;
  overflow-y: auto;
}
.scrollTopHeight1{
  height: 210px;
  overflow: hidden;
  overflow-y: auto;
}
.supera{
  display: block;
  float: left;
  padding: 5px 10px;
  color: #0e9a00;
  border:rgba(3, 82, 38, 0.2) solid 1px;
  background:rgba(33, 170, 95, 0.1);
  border-radius:4px;
  margin: 5px 5px;
}
.cColor {
  color: #3c8dbc;
}
.pacAb {
  position: absolute;
  top: -40px;
  right: 1%;
}
</style>
<style>
.cTop2 .el-radio + .el-radio {
  margin-left: 0;
  margin-bottom: 15px;
}
.cTop2 .el-radio {
  margin-right: 15px;
}
.cTop2 .el-checkbox {
  margin-left: 0;
  margin-right: 20px;
  margin-bottom: 15px;
}
.topn .el-radio {
  width: 375px;
}
.topn .el-checkbox {
  width: 390px;
  margin-left: 0;
  margin-bottom: 10px;
}
.cTop2 ::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
</style>