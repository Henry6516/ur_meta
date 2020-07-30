<template>
  <div class="toolbar">
    <div class="demo-block demo-box demo-zh-CN demo-transition">
      <transition name="el-fade-in-linear">
        <el-form
          :model="condition"
          :inline="true"
          ref="condition"
          label-width="85px"
          style="padding-top:10px;"
          class="demo-form-inline"
        >
          <el-form-item label="商品编码" class="input" style="margin-left:12px;">
            <el-input v-model="condition.goodsCode" size="small"></el-input>
          </el-form-item>
          <el-form-item label="供应商链接" class="input" style="margin-left:12px;">
            <el-input v-model="condition.url" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="add">添加</el-button>
            <!-- <el-button size="small" type="primary" @click="all">批量修改</el-button> -->
            <el-select v-model="valueAll" placeholder="请选择" size="small" style="margin-left:10px;">
              <el-option
                v-for="(item,index) in data1688"
                :key="index"
                :label="item.vendor"
                :value="item.offerId"
              ></el-option>
            </el-select>
            <el-button size="small" type="primary" @click="allCom">一键应用供应商</el-button>
            <el-button size="small" type="success" @click="save">保存</el-button>
          </el-form-item>
        </el-form>
      </transition>
    </div>
    <el-table
      :data="tableData"
      id="sale-table"
      v-loading="listLoading"
      :height="tableHeight"
      border
      class="elTable"
      @sort-change="sortNumber"
      :header-cell-style="getRowClass"
      @selection-change="selsChange"
      style="width: 98%;font-size:13px;margin-left:0.7%;"
    >
      <el-table-column type="index" align="center" width="45" label="#" fixed header-align="center"></el-table-column>
      <el-table-column label="SKU" prop="sku" fixed width="180" header-align="center">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.sku" disabled></el-input>
        </template>
      </el-table-column>
      <el-table-column label="款式1" prop="property1" width="160" fixed header-align="center">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.property1" disabled></el-input>
        </template>
      </el-table-column>
      <el-table-column label="款式2" prop="property2" width="120" fixed header-align="center">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.property2" disabled></el-input>
        </template>
      </el-table-column>
      <el-table-column label="款式3" prop="property3" width="100" header-align="center">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.property3" disabled></el-input>
        </template>
      </el-table-column>
      <el-table-column label="成本价" prop="costPrice" width="100" header-align="center">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.costPrice" disabled></el-input>
        </template>
      </el-table-column>
      <el-table-column label="重量" prop="weight" width="100" header-align="center">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.weight" disabled></el-input>
        </template>
      </el-table-column>
      <el-table-column label="零售价" prop="retailPrice" width="100" header-align="center">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.retailPrice" disabled></el-input>
        </template>
      </el-table-column>
      <el-table-column label="joom零售价" prop="joomPrice" width="100" header-align="center">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.joomPrice" disabled></el-input>
        </template>
      </el-table-column>
      <el-table-column label="joom运费" prop="joomShipping" width="100" header-align="center">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.joomShipping" disabled></el-input>
        </template>
      </el-table-column>
      <el-table-column label="备货数量" prop="stockNum" width="100" header-align="center">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.stockNum" disabled></el-input>
        </template>
      </el-table-column>
      <el-table-column label="供应商" width="220" prop="property2" header-align="center">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.offerId"
            placeholder="请选择供应商"
            size="small"
            style="width:100%;margin-top:5px;"
            @change="currentSel(scope.$index,$event)"
          >
            <el-option
              v-for="(item,index) in data1688"
              :key="index"
              :label="item.vendor"
              :value="item.offerId"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="1688规格" prop="property2" width="245" header-align="center">
        <template slot-scope="scope">
          <el-select v-model="scope.row.style" placeholder="请选择" style="width:100%" size="small">
            <el-option
              v-for="(item,index) in scope.row.selectData"
              :key="index"
              :label="item.style"
              :value="item.style"
            ></el-option>
          </el-select>
        </template>
        <!-- <el-table-column prop="property2" :render-header="renderHeader" align="center" width="240">
          <template slot-scope="scope">
            <el-select v-model="scope.row.style" placeholder="请选择" style="width:100%" size="small">
              <el-option
                v-for="(item,index) in scope.row.selectData"
                :key="index"
                :label="item.style"
                :value="item.style"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>-->
      </el-table-column>
    </el-table>
    <el-dialog title="编辑" :visible.sync="dialog" width="30%">
      <el-select v-model="companyValue" placeholder="请选择" style="width:100%;">
        <el-option v-for="item in companyData" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="update()">保 存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="批量修改" :visible.sync="dialogAll" width="30%">
      <el-select v-model="companyValueAll" placeholder="请选择" style="width:100%;">
        <el-option v-for="item in companyData" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="allUpdate()">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  getSearchSuppliers,
  getAddSuppliers,
  getSkuInfo,
  APIget1688Suppliers,
  getSaveSkuInfo
} from "../../api/product";

export default {
  data() {
    return {
      tableHeight: window.innerHeight - 170,
      dialog: false,
      dialogAll: false,
      companyValue: null,
      companyValueAll: null,
      valueAll: null,
      tableData: [],
      sels: [],
      options: [],
      data1688: [],
      nid: null,
      companyData: [],
      vague: null,
      condition: {
        goodsCode: "",
        url: "",
      },
      listLoading: false,
    };
  },
  methods: {
    currentSel(index, e) {
      for (var i = 0; i < this.data1688.length; i++) {
        if (this.data1688[i].offerId == e) {
          this.tableData[index].selectData = this.data1688[i].value;
          this.tableData[index].specId = "";
          this.tableData[index].style = "";
        }
      }
    },
    renderHeader(h, { column, $index }) {
      if ($index === 0) {
        return h(
          "div",
          {
            style: {
              widthL: "100%",
              height: "30px",
            },
          },
          [
            h("el-input", {
              props: {
                value: this.vague,
                size: "mini",
                clearable: true,
              },
              on: {
                input: (value) => {
                  this.vague = value;
                  this.$emit("input", value);
                },
                change: (value) => {
                  this.getDateTable();
                },
              },
            }),
          ]
        );
      }
    },
    getDateTable() {
      let arr = [];
      let e = this.vague;
      for (let k = 0; k < this.selectData.length; k++) {
        if (this.selectData[k].style.indexOf(e) > -1) {
          arr.push(this.selectData[k]);
        }
      }
      this.vagueData = arr;
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].selectData = this.vagueData;
      }
    },
    sortNumber(column, prop, order) {
      if (column.order == null) {
        this.condition.sort = null;
        this.onSubmit(this.condition);
      }
      if (column.order == "ascending") {
        this.condition.sort = "-" + column.prop;
        this.onSubmit(this.condition);
      }
      if (column.order == "descending") {
        this.condition.sort = column.prop;
        this.onSubmit(this.condition);
      }
    },
    allCom() {
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].offerId = this.valueAll;
        this.tableData[i].specId = "";
        this.tableData[i].style = "";
        for (let k = 0; k < this.data1688.length; k++) {
          if (this.tableData[i].offerId == this.data1688[k].offerId) {
            this.tableData[i].selectData = this.data1688[k].value;
          }
        }
      }
    },
    add() {
      getAddSuppliers(this.condition).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.get1688Suppliers();
          this.getData();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    save() {
      for (let i = 0; i < this.tableData.length; i++) {
        for (let k = 0; k < this.data1688.length; k++) {
          if (this.tableData[i].offerId == this.data1688[k].offerId) {
            for (let j = 0; j < this.data1688[k].value.length; j++) {
              if (this.tableData[i].style == this.data1688[k].value[j].style) {
                this.tableData[i].specId = this.data1688[k].value[j].specId;
              }
            }
          }
        }
      }
      let obj ={
        data:this.tableData
      }
      getSaveSkuInfo(obj).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            message: "保存成功",
            type: "success",
          });
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    get1688Suppliers() {
      let obj = {
        goodsCode: this.condition.goodsCode,
      };
      APIget1688Suppliers(obj).then((res) => {
        if (res.data.code == 200) {
          if (res.data.data) {
            this.data1688 = res.data.data;
          } else {
            this.data1688 = [];
          }
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    getData() {
      let obj = {
        goodsCode: this.condition.goodsCode,
      };
      getSkuInfo(obj).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    allUpdate() {
      let obj = {
        skuInfo: [],
      };
      for (let i = 0; i < this.sels.length; i++) {
        obj.skuInfo.push({
          nid: this.sels[i].nid,
          companyName: this.companyValueAll,
        });
      }
      getSaveSkuSuppliers(obj).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            message: "编辑成功",
            type: "success",
          });
          this.dialogAll = false;
          this.onSubmit(this.condition);
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    selsChange(sels) {
      this.sels = sels;
    },
    all() {
      if (this.sels.length != 0) {
        this.companyValueAll = null;
        this.dialogAll = true;
      } else {
        this.$message.error("请选择SKU");
      }
    },
    update() {
      let obj = {
        skuInfo: [
          {
            nid: this.nid,
            companyName: this.companyValue,
          },
        ],
      };
      getSaveSkuSuppliers(obj).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            message: "编辑成功",
            type: "success",
          });
          this.dialog = false;
          this.onSubmit(this.condition);
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    editArt(index, row) {
      this.companyValue = row.companyName;
      this.nid = row.nid;
      this.dialog = true;
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "color:#337ab7;background:#f5f7fa";
      } else {
        return "";
      }
    },
    onSubmit(form) {
      this.listLoading = true;
      this.valueAll = null;
      getSearchSuppliers(form).then((response) => {
        this.listLoading = false;
        this.tableData = response.data.data.skuInfo;
        this.companyData = response.data.data.companyName;
      });
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.el-form {
  margin-bottom: 10px;
  .el-form-item {
    margin-bottom: 0px;
  }
}
</style>
