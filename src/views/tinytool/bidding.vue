<template>
  <div class="toolbar" style="padding:10px 0px 0px 0px">
    <el-row>
      <el-form
        :model="condition"
        :inline="true"
        ref="condition"
        label-width="5.8rem"
        class="demo-form-inline"
      >
        <!-- <el-form-item label="关键词" class="input">
          <el-input
            placeholder="关键词"
            v-model="condition.keyword"
            style="width:160px;"
            size="small"
            clearable
          ></el-input>
        </el-form-item> -->
        <el-form-item>
          <!-- <el-button size="small" type="primary" @click="onSubmit(condition)">查询</el-button> -->
          <el-button size="small" type="success" @click="add()" style="margin-left:20px;">添加</el-button>
          <el-button size="small" type="success" @click="pyAdd()">普源添加</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-table border :height="tableHeight" :data="tableData" :header-row-style="thClass">
      <el-table-column label="操作" width="95" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="mark(scope.$index, scope.row)"
          >编辑</el-button>
        </template>
      </el-table-column>
      <el-table-column width="180" prop="keyword" label="关键词" :formatter="empty" header-align="center" align="center">
        <el-table-column prop="keyword" :render-header="renderHeaderPicEbay" align="center" width="180"></el-table-column>
      </el-table-column>
      <el-table-column width="180" prop="goodsCode" label="商品编码" :formatter="empty" header-align="center" align="center">
        <el-table-column prop="goodsCode" :render-header="renderHeaderPicEbay" align="center" width="180"></el-table-column>
      </el-table-column>
      <el-table-column width="180" prop="goodsName" label="商品名称" :formatter="empty" header-align="center" align="center">
        <el-table-column prop="goodsName" :render-header="renderHeaderPicEbay" align="center" width="180"></el-table-column>
      </el-table-column>
      <el-table-column width="120" prop="costPrice" label="平均单价(￥)" :formatter="empty" header-align="center" align="center"></el-table-column>
      <el-table-column min-width="100" prop="weight" label="重量(g)" :formatter="empty" header-align="center" align="center"></el-table-column>
      <el-table-column min-width="400" prop="url" label="UK链接" :formatter="empty" header-align="center" align="center">
        <template slot-scope="scope">
          <a :href="scope.row.url" target="_blank">{{scope.row.url}}</a>
        </template>
      </el-table-column>
      <el-table-column min-width="400" prop="url" label="AU链接" :formatter="empty" header-align="center" align="center">
        <template slot-scope="scope">
          <a :href="scope.row.url2" target="_blank">{{scope.row.url2}}</a>
        </template>
      </el-table-column>
      <!-- <infinite-loading
        slot="append"
        @infinite="infiniteHandler"
        force-use-infinite-wrapper=".el-table__body-wrapper"
      ></infinite-loading>-->
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="condition.page"
      :page-sizes="[30, 40, 50, 60]"
      :total="this.total"
      layout="total, sizes, prev, pager, next, jumper"
      style="padding-top: 7px;background: #fff"
    ></el-pagination>
    <el-dialog title="编辑" :visible.sync="dialogPictureBjEbayYs">
      <el-row class="contentt" style="margin-top: 0">
        <el-col :span="24" class="cTop">
          <el-col :span="24" style="margin-bottom: 20px">
            <el-col :span="3">
              <p class="basp">关键词</p>
            </el-col>
            <el-col :span="20">
              <el-input v-model="con.keyword"></el-input>
            </el-col>
          </el-col>
          <el-col :span="24" style="margin-bottom: 20px">
            <el-col :span="3">
              <p class="basp">商品编码</p>
            </el-col>
            <el-col :span="20">
              <el-input v-model="con.goodsCode"></el-input>
            </el-col>
          </el-col>
          <el-col :span="24" style="margin-bottom: 20px">
            <el-col :span="3">
              <p class="basp">商品名称</p>
            </el-col>
            <el-col :span="20">
              <el-input v-model="con.goodsName"></el-input>
            </el-col>
          </el-col>
          <el-col :span="24" style="margin-bottom: 20px">
            <el-col :span="3">
              <p class="basp">平均单价</p>
            </el-col>
            <el-col :span="20">
              <el-input v-model="con.costPrice"></el-input>
            </el-col>
          </el-col>
          <el-col :span="24" style="margin-bottom: 20px">
            <el-col :span="3">
              <p class="basp">重量</p>
            </el-col>
            <el-col :span="20">
              <el-input v-model="con.weight"></el-input>
            </el-col>
          </el-col>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPictureBjEbayYs = false">取 消</el-button>
        <el-button type="primary" @click="update()">更 新</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加" :visible.sync="dialogPictureBjEbaytj" :close-on-click-modal="false">
      <el-row class="contentt" style="margin-top: 0">
        <el-col :span="24" class="cTop" style="margin-top:15px">
          <el-col :span="24" style="margin-bottom: 20px">
            <el-col :span="3">
              <p class="basp">关键词</p>
            </el-col>
            <el-col :span="20">
              <el-input v-model="conTj.keyword"></el-input>
            </el-col>
          </el-col>
          <el-col :span="24" style="margin-bottom: 20px">
            <el-col :span="3">
              <p class="basp">商品编码</p>
            </el-col>
            <el-col :span="20">
              <el-input v-model="conTj.goodsCode"></el-input>
            </el-col>
          </el-col>
          <el-col :span="24" style="margin-bottom: 20px">
            <el-col :span="3">
              <p class="basp">商品名称</p>
            </el-col>
            <el-col :span="20">
              <el-input v-model="conTj.goodsName"></el-input>
            </el-col>
          </el-col>
          <el-col :span="24" style="margin-bottom: 20px">
            <el-col :span="3">
              <p class="basp">平均单价</p>
            </el-col>
            <el-col :span="20">
              <el-input v-model="conTj.costPrice"></el-input>
            </el-col>
          </el-col>
          <el-col :span="24" style="margin-bottom: 20px">
            <el-col :span="3">
              <p class="basp">重量</p>
            </el-col>
            <el-col :span="20">
              <el-input v-model="conTj.weight"></el-input>
            </el-col>
          </el-col>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPictureBjEbaytj = false">取 消</el-button>
        <el-button type="primary" @click="addSave()">添 加</el-button>
      </div>
    </el-dialog>
    <el-dialog title="普源添加" :visible.sync="dialogPytj" :close-on-click-modal="false" width="55%">
      <el-row>
        <el-col :span="24">
          <el-col :span="5">
            <el-input placeholder="商品编码" v-model="cob.goodsCode" clearable></el-input>
          </el-col>
          <el-col :span="5" style="margin-left:10px;">
            <el-input placeholder="商品名称" v-model="cob.goodsName" clearable></el-input>
          </el-col>
          <el-col :span="5" style="margin-left:10px;">
            <el-button type="primary" @click="searchPy()">搜索</el-button>
          </el-col>
        </el-col>
        <el-col :span="24" style="margin-top:10px;">
          <el-table
            border
            :data="viweTable"
            :header-row-style="thClass"
            v-show="viweTable.length!=0"
            v-loading="listLoading"
          >
            <el-table-column min-width="100" prop="goodsCode" label="商品编码" :formatter="empty" header-align="center" align="center"></el-table-column>
            <el-table-column min-width="100" prop="goodsName" label="商品名称" :formatter="empty" header-align="center" align="center"></el-table-column>
            <el-table-column min-width="100" prop="costPrice" label="平均单价(￥)" :formatter="empty" header-align="center" align="center"></el-table-column>
            <el-table-column min-width="100" prop="weight" label="重量(g)" :formatter="empty" header-align="center" align="center"></el-table-column>
            <el-table-column label="操作" width="95" header-align="center">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="small"
                  @click="uadAdd(scope.$index, scope.row)"
                  style="margin-left:10px;"
                >添加</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            @size-change="handleSizeChangeCob"
            @current-change="handleCurrentChangeCob"
            :current-page="cob.currentPage"
            :page-size="cob.pageSize"
            :total="this.totalcob"
            layout="prev, pager, next"
            v-show="viweTable.length!=0"
            style="margin: 15px 0;margin-bottom:0"
          ></el-pagination>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {
  getKeywordAnalysis,
  getKeywordInfo,
  getKeywordList
} from "../../api/profit";
import InfiniteLoading from "vue-infinite-loading";

export default {
  components: {
    InfiniteLoading
  },
  data() {
    return {
      tableHeight: window.innerHeight - 200,
      tableData: [],
      viweTable: [],
      listLoading:false,
      addFormVisible: false,
      dialogPictureBjEbayYs: false,
      dialogPictureBjEbaytj: false,
      dialogPytj: false,
      flag: true,
      condition: {
        keyword: null,
        pageSize: 20,
        currentPage: 1,
        goodsCode: null,
        goodsName: null,
        costPrice: null,
        weight: null
      },
      total: 0,
      totalcob: 0,
      con: {
        id: null,
        keyword: null,
        goodsCode: null,
        goodsName: null,
        costPrice: null,
        weight: null
      },
      conTj: {
        keyword: null,
        goodsCode: null,
        goodsName: null,
        costPrice: null,
        weight: null
      },
      conTjob: {
        keyword: null,
        goodsCode: null,
        goodsName: null,
        costPrice: null,
        weight: null
      },
      cob: {
        goodsCode: null,
        goodsName: null,
        currentPage: 1,
        pageSize: 10
      }
    };
  },
  methods: {
   renderHeaderPicEbay(h, { column, $index }) {
      if ($index === 0) {
        return h(
          "div",
          {
            style: {
              height: "30px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.condition.keyword,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.keyword = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.onSubmit();
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
              height: "30px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.condition.goodsCode,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.goodsCode = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.onSubmit();
                }
              }
            })
          ]
        );
      } else if ($index === 2) {
        return h(
          "div",
          {
            style: {
              height: "30px"
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
                  this.onSubmit();
                }
              }
            })
          ]
        );
      }
    },
    pyAdd() {
      this.dialogPytj = true;
    },
    searchPy() {
      this.listLoading=true
      getKeywordList(this.cob).then(response => {
        this.listLoading=false
        if (response.data.code === 200) {
          this.viweTable = response.data.data.items;
          this.totalcob = response.data.data._meta.totalCount;
          this.cob.pageSize = response.data.data._meta.perPage;
          this.cob.page = response.data.data._meta.currentPage;
        } else {
          this.$message.error(response.data.message);
        }
      });
    },
    handleSizeChange(val) {
      this.condition.pageSize = val;
      this.onSubmit();
    },
    handleCurrentChange(val) {
      this.condition.currentPage = val;
      this.onSubmit();
    },
    handleSizeChangeCob(val) {
      this.cob.pageSize = val;
      this.searchPy();
    },
    handleCurrentChangeCob(val) {
      this.cob.currentPage = val;
      this.searchPy();
    },
    mark(index, row) {
      this.dialogPictureBjEbayYs = true;
      this.con.keyword = row.keyword;
      this.con.id = row.id;
      this.con.goodsCode = row.goodsCode;
      this.con.goodsName = row.goodsName;
      this.con.costPrice = row.costPrice;
      this.con.weight = row.weight;
    },
    uadAdd(index, row){
      this.conTjob.goodsCode = row.goodsCode;
      this.conTjob.goodsName = row.goodsName;
      this.conTjob.costPrice = row.costPrice;
      this.conTjob.weight = row.weight;
      getKeywordInfo(this.conTjob).then(response => {
        if (response.data.code === 200) {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.onSubmit();
        } else {
          this.$message.error(response.data.message);
        }
      });
    },
    // infiniteHandler($state) {
    //   if (this.condition.currentPage != 1) {
    //     console.log(this.condition.currentPage);
    //     getKeywordAnalysis(this.condition).then(response => {
    //       if (response.data.data.items) {
    //         this.tableData.push(...response.data.data.items);
    //         this.condition.currentPage += 1;
    //         $state.loaded();
    //       } else {
    //         $state.complete();
    //       }
    //     });
    //   }
    // },
    update() {
      getKeywordInfo(this.con).then(response => {
        if (response.data.code === 200) {
          this.$message({
            message: "更新成功",
            type: "success"
          });
          this.dialogPictureBjEbayYs = false;
          this.onSubmit();
        } else {
          this.$message.error(response.data.message);
        }
      });
    },
    addSave() {
      getKeywordInfo(this.conTj).then(response => {
        if (response.data.code === 200) {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.dialogPictureBjEbaytj = false;
          this.onSubmit();
        } else {
          this.$message.error(response.data.message);
        }
      });
    },
    add() {
      this.dialogPictureBjEbaytj = true;
    },
    onSubmit() {
      getKeywordAnalysis(this.condition).then(response => {
        // this.condition.currentPage += 1;
        this.tableData = response.data.data.items;
        this.total = response.data.data._meta.totalCount;
        this.condition.pageSize = response.data.data._meta.perPage;
        this.condition.page = response.data.data._meta.currentPage;
      });
    },
    // onSubmit1(data) {
    //   this.condition.currentPage = 1;
    //   getKeywordAnalysis(data).then(response => {
    //     this.condition.currentPage += 1;
    //     this.tableData = response.data.data.items;
    //   });
    // },
    empty(row, column, cellValue, index) {
      return cellValue || "--";
    },
    thClass({ row, rowIndex }) {
      return "color:#e42c4e";
    }
  },
  mounted() {
    this.onSubmit();
  }
};
</script>

<style lang="scss" scoped>
.el-table {
  width: 100%;
  a {
    color: #428bac;
    text-decoration: none;
  }
  a:hover {
    color: #2a6496;
    text-decoration: underline;
  }
}
</style>


