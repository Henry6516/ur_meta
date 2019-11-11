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
        <el-table-column label="操作" fixed header-align="center" align="center" width="100">
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
        <el-table-column property="pyCate" label="普源类目" align="center"></el-table-column>
        <el-table-column property="plat" label="平台" align="center"></el-table-column>
        <el-table-column property="marketplace" label="站点" align="center"></el-table-column>
        <el-table-column property="cate" label="一级类目" align="center"></el-table-column>
        <el-table-column property="subCate" label="二级类目" align="center"></el-table-column>
        <el-table-column property="createdDate" label="添加时间" align="center">
            <template slot-scope="scope">
              {{scope.row.createdDate | cutOutDate}}
            </template>
        </el-table-column>
        <el-table-column property="updatedDate" label="更新时间" align="center">
          <template slot-scope="scope">
              {{scope.row.updatedDate | cutOutDate}}
            </template>
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
                <el-radio v-for='(item,index) in pyCate' :key="index" :label="item">{{item}}</el-radio>
              </el-radio-group>
              <!-- <el-checkbox-group v-model="category" @change="handleCheckedCitiesChange">
                <el-checkbox v-for='(item,index) in pyCate' :key="index" :label="item" :value="item" @change="checkinlist(item)"></el-checkbox>
              </el-checkbox-group> -->
            </el-col>
          </el-col>
          <el-col :span="24" style="margin-bottom: 12px">
            <el-col :span="2">
              <p class="baspOne">平台</p>
            </el-col>
            <el-col :span="22" style="margin-top:2px;">
              <el-radio-group v-model="ebay.plat">
                <el-radio v-for='(item,index) in rulePlat' :key="index" @change="getPlatEbay(item)" :label="item">{{item}}</el-radio>
              </el-radio-group>
            </el-col>
          </el-col>
          <el-col :span="24" style="margin-bottom: 12px">
            <el-col :span="2">
              <p class="baspOne">刊登站点</p>
            </el-col>
            <el-col :span="22" style="margin-top:2px;">
              <el-radio-group v-model="ebay.marketplace">
                <el-radio v-for='(item,index) in ebayRuleOptions' :key="index" @change="getOneLowRule(item)" :label="item">{{item}}</el-radio>
              </el-radio-group>
            </el-col>
          </el-col>
          <el-col :span="24" style="margin-bottom: 12px" class="topn">
            <el-col :span="2">
              <p class="baspOne">一级类目</p>
            </el-col>
            <el-col :span="22" style="margin-top:2px;">
              <el-radio-group v-model="ebay.cate">
                <el-radio v-for='(item,index) in ebayRuleOne' :key="index" @change="getTowLowRule(item.cate)" :label="item.cate">{{item.cate}}</el-radio>
              </el-radio-group>
            </el-col>
          </el-col>
          <el-col :span="24" style="margin-bottom: 0px" class="topn">
            <el-col :span="2">
              <p class="baspOne">二级类目</p>
            </el-col>
            <el-col :span="22" style="margin-top:2px;">
              <el-radio-group v-model="ebay.subCate">
                <el-radio v-for='(item,index) in ebayRuleTwo' :key="index" :label="item">{{item}}</el-radio>
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
    <el-dialog title="添加" :visible.sync="addebaydisLogin" width="70%" :close-on-click-modal="false">
      <el-row style="margin-top: 0">
        <el-col :span="24" class="cTop cTop2">
          <el-col :span="24" style="margin-bottom: 10px">
            <el-col :span="2">
              <p class="baspOne">普源类目</p>
            </el-col>
            <el-col :span="22" style="margin-top:2px;">
              <el-radio-group v-model="addebay.pyCate">
                <el-radio v-for='(item,index) in pyCate' :key="index" :label="item">{{item}}</el-radio>
              </el-radio-group>
              <!-- <el-checkbox-group v-model="category" @change="handleCheckedCitiesChange">
                <el-checkbox v-for='(item,index) in pyCate' :key="index" :label="item" :value="item" @change="checkinlist(item)"></el-checkbox>
              </el-checkbox-group> -->
            </el-col>
          </el-col>
          <el-col :span="24" style="margin-bottom: 12px">
            <el-col :span="2">
              <p class="baspOne">平台</p>
            </el-col>
            <el-col :span="22" style="margin-top:2px;">
              <el-radio-group v-model="addebay.plat">
                <el-radio v-for='(item,index) in rulePlat' :key="index" @change="getPlat(item)" :label="item">{{item}}</el-radio>
              </el-radio-group>
            </el-col>
          </el-col>
          <el-col :span="24" style="margin-bottom: 12px">
            <el-col :span="2">
              <p class="baspOne">刊登站点</p>
            </el-col>
            <el-col :span="22" style="margin-top:2px;">
              <el-radio-group v-model="addebay.marketplace">
                <el-radio v-for='(item,index) in ebayOptions' :key="index" @change="getOneLow(item)" :label="item">{{item}}</el-radio>
              </el-radio-group>
            </el-col>
          </el-col>
          <el-col :span="24" style="margin-bottom: 12px" class="topn">
            <el-col :span="2">
              <p class="baspOne">一级类目</p>
            </el-col>
            <el-col :span="22" style="margin-top:2px;">
              <el-radio-group v-model="addebay.cate">
                <el-radio v-for='(item,index) in addEbayOne' :key="index" @change="getTowLow(item.cate)" :label="item.cate">{{item.cate}}</el-radio>
              </el-radio-group>
            </el-col>
          </el-col>
          <el-col :span="24" style="margin-bottom: 0px" class="topn">
            <el-col :span="2">
              <p class="baspOne">二级类目</p>
            </el-col>
            <el-col :span="22" style="margin-top:2px;">
              <el-radio-group v-model="addebay.subCate">
                <el-radio v-for='(item,index) in addEbayTwo' :key="index" :label="item">{{item}}</el-radio>
              </el-radio-group>
            </el-col>
          </el-col>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addebaydisLogin = false">取 消</el-button>
        <el-button type="primary" @click="addsaveEbay()">保 存</el-button>
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
  ruleDeleteCateRule
} from "../../api/product";
import { getMember,getAttributeInfoCat } from "../../api/profit";
export default {
  data() {
    return {
      addEbayTwo: [],
      addEbayOne: [],
      ebayRuleOne: [],
      ebayRuleTwo: [],
      tableHeightstock: window.innerHeight - 175,
      ebaydisLogin: false,
      addebaydisLogin: false,
      pyCate:[],
      condition: {
        page: 1,
        pageSize: 40
      },
      total: null,
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
    cutOutDate(value){
      value = value.substring(0, 11);
      return value;
    },
  },
  methods: {
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
    getOneLow(e) {
      this.addebay.cate = null;
      this.addebay.subCate = null;
      this.addEbayTwo = [];
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
      this.addebay.pyCate = null;
      this.addebay.plat = null;
      this.addebay.marketplace = null;
      this.addebay.cate = null;
      this.addebay.subCate = null;
      this.ebayOptions = [];
      this.addEbayOne = [];
      this.addEbayTwo = [];
      this.addebaydisLogin = true;
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
      if (this.addebay.cate || this.addebay.subCate) {
        ruleSaveCateRule(this.addebay).then(res => {
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
      } else {
        this.$message.error("请选择类目");
      }
    },
    editArt(index, row) {
      this.ebay.pyCate = row.pyCate;
      this.ebay.plat = row.plat;
      this.ebay.cate = row.cate;
      this.ebay.subCate = row.subCate;
      this.ebay.marketplace = row.marketplace;
      this.ebay.id = row._id;
      if (this.ebay.plat) {
        let obj = {
          plat: this.ebay.plat
        };
        getRuleMarketplace(obj).then(res => {
          if (res.data.data) {
            this.ebayRuleOptions = res.data.data;
          }
        });
      }
      if (this.ebay.marketplace) {
        let obj = {
          cate: null,
          plat: this.ebay.plat,
          marketplace: this.ebay.marketplace
        };
        ruleCategory(obj).then(res => {
          this.ebayRuleOne = res.data.data;
        });
      }
      if (this.ebay.cate) {
        let obj = {
          cate: this.ebay.cate,
          plat: this.ebay.plat,
          marketplace: this.ebay.marketplace
        };
        ruleCategory(obj).then(res => {
          this.ebayRuleTwo = res.data.data[0].subCate;
        });
      }
      this.ebaydisLogin = true;
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
    getAttributeInfoCat().then(response => {
      this.pyCate = response.data.data;
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
.baspOne{
  text-align: center;
  margin: 0;
  color: #3c8dbc;
  padding-bottom: 10px;
}
</style>
<style>
.cTop2 .el-radio+.el-radio{
  margin-left: 0;
  margin-bottom: 15px;
}
.cTop2 .el-radio{
  margin-right: 15px;
}
.cTop2 .el-checkbox{
  margin-left: 0;
  margin-right: 10px;
  margin-bottom: 15px;
}
.topn .el-radio{
  width: 375px;
}
</style>