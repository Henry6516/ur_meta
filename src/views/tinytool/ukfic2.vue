<template>
  <section class="toolbar">
    <el-row>
      <el-form :inline="true" :model="condition" label-width="80px">
        <el-form-item prop="sku" label="SKU*">
          <el-input size="small" v-model="condition.sku" placeholder="请填写产品SKU"></el-input>
        </el-form-item>
        <el-form-item prop="num" label="SKU套装">
          <el-input size="small" v-model="condition.num" placeholder="请填写套装数量"></el-input>
        </el-form-item>
        <el-form-item prop="price" label="售价（£）">
          <el-input size="small" v-model="condition.price" placeholder="请填写预计售价"></el-input>
        </el-form-item>
        <el-form-item prop="rate" label="毛利率">
          <el-input size="small" v-model="condition.rate" placeholder="请填写预计毛利率（%）"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="onSubmit()">获取</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <h4>SKU信息</h4>
    <el-table :data="tableData1" style="width:100%">
      <el-table-column prop="num" label="套餐数量"></el-table-column>
      <el-table-column prop="skuname" label="SKU名称"></el-table-column>
      <el-table-column prop="goodscode" label="商品编码"></el-table-column>
      <el-table-column prop="CategoryName" label="类目"></el-table-column>
      <el-table-column prop="CreateDate" label="创建时间"></el-table-column>
      <el-table-column prop="costprice" label="商品成本（RMB）"></el-table-column>
      <el-table-column prop="Weight" label="商品+包材重（g）"></el-table-column>
    </el-table>
    <el-table
      :data="tableData2"
      style="width:100%;margin-top:20px;"
      :header-cell-style="getRowClass"
    >
      <el-table-column label="根据售价获取毛利率" align="center">
        <el-table-column prop="country" label="国家" width="80" align="center"></el-table-column>
        <el-table-column prop="transport" label="物流方式" align="center"></el-table-column>
        <el-table-column prop="cost" label="物流费(￥)" width="110" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.cost | cutOut}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="price1" label="售价(£)" width="110" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.price1 | cutOut}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="eFee1" label="eBay交易费(£)" align="center" width="115">
          <template slot-scope="scope">
            <span>{{scope.row.eFee1 | cutOut}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="pFee1" label="paypal交易费(£)" align="center" width="110">
          <template slot-scope="scope">
            <span>{{scope.row.pFee1 | cutOut}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="profit1" label="毛利润(£)" width="110" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.profit1 | cutOut}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="profitRmb1" label="毛利润(￥)" width="110" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.profitRmb1 | cutOut}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="rate1" label="毛利率%" width="110" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.rate1 | cutOut}}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="根据毛利率获取售价" align="center">
        <el-table-column prop="price2" label="售价(£)" width="110" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.price2 | cutOut}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="eFee2" label="eBay交易费(£)" align="center" width="115">
          <template slot-scope="scope">
            <span>{{scope.row.eFee2 | cutOut}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="pFee2" label="PayPal交易费(£)" align="center" width="110">
          <template slot-scope="scope">
            <span>{{scope.row.pFee2 | cutOut}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="profit2" label="毛利润(£)" width="110" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.profit2 | cutOut}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="profitRmb2" label="毛利润(￥)" width="110" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.profitRmb2 | cutOut}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="rate2" label="毛利率%" width="110" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.rate2 | cutOut}}</span>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
import { getUkfic2 } from "../../api/profit";
export default {
  data() {
    return {
      listLoading: false,
      tableData1: [],
      tableData2: [],
      condition: {
        sku: "",
        num: null,
        price: null,
        rate: null
      }
    };
  },
  filters: {
    cutOut: function(value) {
      value=Number(value)
      console.log(value);
      if (value && Number.isInteger(value)) {
        return value + ".00";
      } else {
        if (value || value != 0) {
          value = value.toFixed(2);
          return value;
        } else if (value == 0) {
          return "0.00";
        }else{
          return value;
        }
      }
    }
  },
  methods: {
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0 && columnIndex === 1) {
        return "background: #66b1ff;color:#fff";
      }
      if (rowIndex === 1 && columnIndex >= 9) {
        return "background: #66b1ff;color:#fff";
      }
    },
    onSubmit() {
      this.listLoading = true;
      getUkfic2(this.condition).then(response => {
        this.listLoading = false;
        this.tableData1 = [response.data.data.detail];
        this.tableData2 = response.data.data.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.toolbar {
  padding: 10px;
}
</style>


