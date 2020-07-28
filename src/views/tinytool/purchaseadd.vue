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
            <el-button size="small" type="primary" @click="save">添加</el-button>
            <!-- <el-button size="small" type="primary" @click="all">批量修改</el-button> -->
            <el-select v-model="valueAll" placeholder="请选择" size="small" style="margin-left:10px;">
              <el-option v-for="item in companyData" :key="item" :label="item" :value="item"></el-option>
            </el-select>
            <el-button size="small" type="primary" @click="allCom">一键应用供应商</el-button>
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
      <el-table-column type="index" label="#" align="center" width="45"></el-table-column>
      <el-table-column prop="SKU" label="SKU" align="center" sortable="custom"></el-table-column>
      <el-table-column prop="property1" label="款式1" align="center"></el-table-column>
      <el-table-column prop="property2" label="款式2" align="center"></el-table-column>
      <el-table-column prop="property3" label="款式3" align="center"></el-table-column>
      <el-table-column prop="SKUName" label="商品名称" align="center"></el-table-column>
      <el-table-column prop="companyName" label="供应商" align="center">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.companyName"
            placeholder="请选择"
            style="width:100%;"
            size="small"
          >
            <el-option v-for="item in scope.row.values" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="style" label="供应商款式" align="center"></el-table-column>
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
import { getSearchSuppliers, getAddSuppliers } from "../../api/product";

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
      nid: null,
      companyData: [],
      condition: {
        goodsCode: "",
        url: "",
      },
      listLoading: false,
    };
  },
  methods: {
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
        for (let k = 0; k < this.tableData[i].values.length; k++) {
          if (this.valueAll == this.tableData[i].values[k]) {
            this.tableData[i].companyName = this.valueAll;
            break;
          } else {
            this.tableData[i].companyName = "无";
          }
        }
      }
    },
    save() {
      getAddSuppliers(this.condition).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            message: "添加成功",
            type: "success",
          });
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
