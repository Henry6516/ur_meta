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
            <el-input v-model="condition.goodsCode" size="small" style="width:100px"></el-input>
            <el-button size="small" type="primary" @click="search" style="margin-left:10px;">查询</el-button>
            <el-button
              size="small"
              type="primary"
              @click="synchro1688"
              style="margin-left:10px;"
            >同步1688</el-button>
          </el-form-item>
          <el-form-item label="供应商链接" class="input" style="margin-left:12px;">
            <el-input v-model="condition.url" size="small" style="width:300px;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="add">同步</el-button>
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
          <el-select
            v-model="scope.row.style"
            filterable
            placeholder="请选择"
            style="width:100%"
            size="small"
          >
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
  getSaveSkuInfo,
  APIsync1688Goods,
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
    synchro1688() {
      if (!this.condition.goodsCode) {
        this.$message.error("请填写商品编码");
        return;
      }
      let obj = {
        goodsCode: this.condition.goodsCode,
      };
      APIsync1688Goods(obj).then((res) => {
        if (res.data.code == "200") {
          this.$message({
            message: "同步成功",
            type: "success",
          });
          this.get1688Suppliers();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
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
      function getFlag(a, b) {
        if (a == "2XL" && b == "XXL") {
          return true;
        } else if (a == "3XL" && b == "XXXL") {
          return true;
        } else if (a == "4XL" && b == "XXXXL") {
          return true;
        } else if (a == "5XL" && b == "XXXXXL") {
          return true;
        } else if (a == "5XL" && b == "XXXXXL") {
          return true;
        } else if (a == "2X" && b == "XXL") {
          return true;
        } else if (a == "3X" && b == "XXXL") {
          return true;
        } else if (a == "4X" && b == "XXXXL") {
          return true;
        } else if (a == "5X" && b == "XXXXXL") {
          return true;
        } else {
          return a == b;
        }
      }
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].offerId = this.valueAll;
        for (let k = 0; k < this.data1688.length; k++) {
          if (this.tableData[i].offerId == this.data1688[k].offerId) {
            this.tableData[i].selectData = this.data1688[k].value;
          }
        }
        let property1 = this.tableData[i].property1;
        let property2 = this.tableData[i].property2;
        for (let j = 0; j < this.tableData[i].selectData.length; j++) {
          let style = this.tableData[i].selectData[j].style;
          let style1 = style.split("-->")[0];
          let style2 = style.split("-->")[1] ? style.split("-->")[1] : null;
          if (property1 == style1 && getFlag(property2, style2)) {
            this.tableData[i].specId = this.tableData[i].selectData[j].specId;
            this.tableData[i].style = this.tableData[i].selectData[j].style;
            break;
          } else {
            this.tableData[i].specId = "";
            this.tableData[i].style = "";
          }
        }
      }
    },
    add() {
      if (!this.condition.goodsCode) {
        this.$message.error("请填写商品编码");
        return;
      }
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
    search() {
      this.getData();
      this.get1688Suppliers();
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
      let obj = {
        data: this.tableData,
      };
      this.listLoading = true;
      getSaveSkuInfo(obj).then((res) => {
        this.listLoading = false;
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
      if (!this.condition.goodsCode) {
        this.$message.error("请填写商品编码");
        return;
      }
      let obj = {
        goodsCode: this.condition.goodsCode,
      };
      this.listLoading = true;
      getSkuInfo(obj).then((res) => {
        this.listLoading = false;
        if (res.data.code == 200) {
          this.tableData = res.data.data;
          for (let i = 0; i < this.tableData.length; i++) {
            const property1 = this.tableData[i].property1;
            const property2 = this.tableData[i].property2;
            const style = this.tableData[i].style;
            const style1 = style.split("-->")[0];
            const style2 = style.split("-->")[1] ? style.split("-->")[1] : null;
            if (property1 != style1 || getFlag(property2, style2)) {
              this.tableData[i].style = "";
              this.tableData[i].specId = "";
            }
          }
        } else {
          this.$message.error(res.data.message);
        }
        function getFlag(a, b) {
          if (a == "2XL" && b == "XXL") {
            return false;
          } else if (a == "3XL" && b == "XXXL") {
            return false;
          } else if (a == "4XL" && b == "XXXXL") {
            return false;
          } else if (a == "5XL" && b == "XXXXXL") {
            return false;
          } else if (a == "5XL" && b == "XXXXXL") {
            return false;
          } else if (a == "2X" && b == "XXL") {
            return false;
          } else if (a == "3X" && b == "XXXL") {
            return false;
          } else if (a == "4X" && b == "XXXXL") {
            return false;
          } else if (a == "5X" && b == "XXXXXL") {
            return false;
          } else {
            return a != b;
          }
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
