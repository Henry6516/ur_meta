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
        <el-table-column property="developer" label="开发员" align="center"></el-table-column>
        <el-table-column property="marketplace" label="刊登站点" align="center"></el-table-column>
        <el-table-column property="firstCategory" label="一级类目" align="center"></el-table-column>
        <el-table-column property="category" label="二级类目" align="center"></el-table-column>
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
    <el-dialog title="编辑" :visible.sync="ebaydisLogin" width="70%">
      <el-row style="margin-top: 0">
        <el-col :span="24" class="cTop">
          <el-col :span="6" style="margin-bottom: 20px">
            <el-col :span="6">
              <p class="basp">开发</p>
            </el-col>
            <el-col :span="18">
              <el-select v-model="ebay.developer" placeholder="请选择" style="width:100%;">
                <el-option
                  v-for="(item,key) in member"
                  :key="item.key"
                  :label="item.username"
                  :value="item.username"
                ></el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="6" style="margin-bottom: 20px">
            <el-col :span="6">
              <p class="basp" style="text-align: center;">刊登站点</p>
            </el-col>
            <el-col :span="18">
              <el-select
                style="width:100%"
                v-model="ebay.marketplace"
                @change="getOneLowRule($event)"
              >
                <el-option
                  v-for="(item, key) in ebayOptions"
                  :key="item.key"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="6" style="margin-bottom: 20px">
            <el-col :span="6">
              <p class="basp" style="text-align: center;">一级类目</p>
            </el-col>
            <el-col :span="18">
              <el-select
                v-model="ebay.firstCategory"
                placeholder="请选择"
                style="width:100%;"
                @change="getTowLowRule($event)"
              >
                <el-option
                  v-for="(item,key) in ebayRuleOne"
                  :key="item.key"
                  :label="item.category"
                  :value="item.category"
                ></el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="6" style="margin-bottom: 20px">
            <el-col :span="6">
              <p class="basp" style="text-align: center;">二级类目</p>
            </el-col>
            <el-col :span="18">
              <el-select v-model="ebay.category" placeholder="请选择" style="width:100%;">
                <el-option
                  v-for="(item,key) in ebayRuleTwo"
                  :key="item.key"
                  :label="item.category"
                  :value="item.category"
                ></el-option>
              </el-select>
            </el-col>
          </el-col>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ebaydisLogin = false">取 消</el-button>
        <el-button type="primary" @click="saveEbay()">保 存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加" :visible.sync="addebaydisLogin" width="70%">
      <el-row style="margin-top: 0">
        <el-col :span="24" class="cTop">
          <el-col :span="6" style="margin-bottom: 20px">
            <el-col :span="6">
              <p class="basp">开发</p>
            </el-col>
            <el-col :span="18">
              <el-select v-model="addebay.developer" placeholder="请选择" style="width:100%;">
                <el-option
                  v-for="(item,key) in member"
                  :key="item.key"
                  :label="item.username"
                  :value="item.username"
                ></el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="6" style="margin-bottom: 20px">
            <el-col :span="6">
              <p class="basp" style="text-align: center;">刊登站点</p>
            </el-col>
            <el-col :span="18">
              <el-select
                style="width:100%"
                v-model="addebay.marketplace"
                @change="getOneLow($event)"
              >
                <el-option
                  v-for="(item, key) in ebayOptions"
                  :key="item.key"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="6" style="margin-bottom: 20px">
            <el-col :span="6">
              <p class="basp" style="text-align: center;">一级类目</p>
            </el-col>
            <el-col :span="18">
              <el-select
                v-model="addebay.firstCategory"
                placeholder="请选择"
                style="width:100%;"
                @change="getTowLow($event)"
              >
                <el-option
                  v-for="(item,key) in addEbayOne"
                  :key="item.key"
                  :label="item.category"
                  :value="item.category"
                ></el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="6" style="margin-bottom: 20px">
            <el-col :span="6">
              <p class="basp" style="text-align: center;">二级类目</p>
            </el-col>
            <el-col :span="18">
              <el-select v-model="addebay.category" placeholder="请选择" style="width:100%;">
                <el-option
                  v-for="(item,key) in addEbayTwo"
                  :key="item.key"
                  :label="item.category"
                  :value="item.category"
                ></el-option>
              </el-select>
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
  ebayDeleteDevCat
} from "../../api/product";
import { getMember } from "../../api/profit";
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
      condition: {
        category: null,
        developer: null,
        marketplace: null,
        page: 1,
        pageSize: 40
      },
      total: null,
      ebay: {
        id: null,
        developer: null,
        category: null,
        categoryId: null,
        firstCategory: null,
        marketplace: null
      },
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
      addebay: {
        developer: null,
        category: null,
        categoryId: null,
        firstCategory: null,
        marketplace: null
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
      ebayData: []
    };
  },
  methods: {
    getOneLow(e) {
      this.addebay.firstCategory = null;
      this.addebay.category = null;
      this.addEbayTwo = [];
      let obj = {
        parentId: 0,
        category: null,
        marketplace: e
      };
      ebayCatRule(obj).then(res => {
        this.addEbayOne = res.data.data;
      });
    },
    getTowLow(e) {
      this.addebay.category = null;
      let obj = {
        parentId: null,
        category: null,
        marketplace: null
      };
      for (let i = 0; i < this.addEbayOne.length; i++) {
        if (e == this.addEbayOne[i].category) {
          obj.parentId = this.addEbayOne[i].id;
        }
      }
      ebayCatRule(obj).then(res => {
        this.addEbayTwo = res.data.data;
      });
    },
    getOneLowRule(e) {
      this.ebay.firstCategory = null;
      this.ebay.category = null;
      this.ebayRuleTwo = [];
      let obj = {
        parentId: 0,
        category: null,
        marketplace: e
      };
      ebayCatRule(obj).then(res => {
        this.ebayRuleOne = res.data.data;
      });
    },
    getTowLowRule(e) {
      this.ebay.category = null;
      let obj = {
        parentId: null,
        category: null,
        marketplace: null
      };
      for (let i = 0; i < this.ebayRuleOne.length; i++) {
        if (e == this.ebayRuleOne[i].category) {
          obj.parentId = this.ebayRuleOne[i].id;
        }
      }
      ebayCatRule(obj).then(res => {
        this.ebayRuleTwo = res.data.data;
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
      this.addebay.developer = null;
      this.addebay.category = null;
      this.addebay.firstCategory = null;
      this.addebay.marketplace = null;
      this.addebaydisLogin = true;
    },
    saveEbay() {
      if (this.ebay.category || this.ebay.firstCategory) {
        if (this.ebay.category) {
          for (let i = 0; i < this.ebayRuleTwo.length; i++) {
            if (this.ebay.category == this.ebayRuleTwo[i].category) {
              this.ebay.categoryId = this.ebayRuleTwo[i].id;
            }
          }
        } else {
          for (let i = 0; i < this.ebayRuleOne.length; i++) {
            if (this.ebay.firstCategory == this.ebayRuleOne[i].category) {
              this.ebay.categoryId = this.ebayRuleOne[i].id;
            }
          }
        }
        ebaySaveDevCat(this.ebay).then(res => {
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
      if (this.addebay.category || this.addebay.firstCategory) {
        if (this.addebay.category) {
          for (let i = 0; i < this.addEbayTwo.length; i++) {
            if (this.addebay.category == this.addEbayTwo[i].category) {
              this.addebay.categoryId = this.addEbayTwo[i].id;
            }
          }
        } else {
          for (let i = 0; i < this.addEbayOne.length; i++) {
            if (this.addebay.firstCategory == this.addEbayOne[i].category) {
              this.addebay.categoryId = this.addEbayOne[i].id;
            }
          }
        }
        ebaySaveDevCat(this.addebay).then(res => {
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
      this.ebay.developer = row.developer;
      this.ebay.category = row.category;
      this.ebay.firstCategory = row.firstCategory;
      this.ebay.marketplace = row.marketplace;
      this.ebay.id = row.id;
      let obj = {
        parentId: 0,
        category: null,
        marketplace: this.ebay.marketplace
      };
      ebayCatRule(obj).then(res => {
        this.ebayRuleOne = res.data.data;
        if (row.category && row.firstCategory) {
          let strObj = {
            parentId: null,
            category: null,
            marketplace: null
          };
          for (let i = 0; i < this.ebayRuleOne.length; i++) {
            if (row.firstCategory == this.ebayRuleOne[i].category) {
              strObj.parentId = this.ebayRuleOne[i].id;
            }
          }
          ebayCatRule(strObj).then(res => {
            this.ebayRuleTwo = res.data.data;
          });
        } else {
          this.ebayRuleTwo = [];
        }
      });
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
            id: row.id
          };
          ebayDeleteDevCat(conId).then(res => {
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
      ebayDevCatRule(this.condition).then(res => {
        this.ebayData = res.data.data.items;
        this.total = res.data.data._meta.totalCount;
        this.condition.pageSize = res.data.data._meta.perPage;
        this.condition.page = res.data.data._meta.currentPage;
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
    this.getDataCategory();
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
</style>