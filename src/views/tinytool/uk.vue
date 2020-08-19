<template>
  <section class="toolbar">
    <el-row>
      <el-form :inline="true"
               :model='condition'
               label-width="80px">
        <el-form-item prop="sku"
                      label="SKU*">
          <el-input size="small"
                    v-model="condition.sku"
                    placeholder="请填写产品SKU" style="width:150px"></el-input>
        </el-form-item>
        <el-form-item prop="num"
                      label="SKU套装">
          <el-input size="small"
                    v-model="condition.num"
                    placeholder="请填写套装数量" style="width:150px"></el-input>
        </el-form-item>
        <el-form-item prop="price"
                      label="售价（£）">
          <el-input size="small"
                    v-model="condition.price"
                    placeholder="请填写预计售价" style="width:150px"></el-input>
        </el-form-item>
        <el-form-item prop="rate"
                      label=" 广告费率">
          <el-input size="small"
                    v-model="condition.adRate"
                    placeholder="请填写预计毛利率(%)" style="width:160px"></el-input>
        </el-form-item>
        <el-form-item prop="rate"
                      label="毛利率">
          <el-input size="small"
                    v-model="condition.rate"
                    placeholder="请填写预计毛利率(%)" style="width:160px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small"
                     type="primary"
                     @click="onSubmit()">获取</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <h4>SKU信息</h4>
    <el-table :data="tableData1"
              style="width:100%">
      <el-table-column prop="num"
                       label="套餐数量"></el-table-column>
      <el-table-column prop="skuname"
                       label="SKU名称"></el-table-column>
      <el-table-column prop="goodscode"
                       label="商品编码"></el-table-column>
      <el-table-column prop="CategoryName"
                       label="类目"></el-table-column>
      <el-table-column prop="CreateDate"
                       label="创建时间"></el-table-column>
      <el-table-column prop="price"
                       label="商品成本（RMB）"></el-table-column>
      <el-table-column prop="weight"
                       label="商品+包材重（g）"></el-table-column>
      <el-table-column prop="length"
                       label="长（cm）"></el-table-column>
      <el-table-column prop="width"
                       label="宽（cm）"></el-table-column>
      <el-table-column prop="height"
                       label="高（cm）"></el-table-column>
    </el-table>
    <h4>根据售价获取毛利率</h4>
    <el-table :data="tableData2"
              style="width:100%">
      <el-table-column prop="price"
                       label="售价（£）"></el-table-column>
      <el-table-column prop="eFee"
                       label="eBay交易费（£）"></el-table-column>
      <el-table-column prop="pFee"
                       label="PayPal交易费（£）"></el-table-column>
      <el-table-column prop="profit"
                       label="毛利润（£）"></el-table-column>
      <el-table-column prop="profitRmb"
                       label="毛利润（￥）"></el-table-column>
      <el-table-column prop="rate"
                       label="毛利率（%）"></el-table-column>
      <el-table-column prop="adRate"
                       label="广告费率（%）"></el-table-column>                 
    </el-table>
    <h4>根据毛利率获取售价</h4>
    <el-table :data="tableData3"
              style="width:100%">
      <el-table-column prop="rate"
                       label="毛利率（%）"></el-table-column>
      <el-table-column prop="name"
                       label="物流方式"></el-table-column>                 
      <el-table-column prop="eFee"
                       label="eBay交易费（£）"></el-table-column>
      <el-table-column prop="pFee"
                       label="PayPal交易费（£）"></el-table-column>
      <el-table-column prop="profit"
                       label="毛利润（£）"></el-table-column>
      <el-table-column prop="profitRmb"
                       label="毛利润（￥）"></el-table-column>
      <el-table-column prop="price"
                       label="售价（£）"></el-table-column>
    </el-table>
    <h4>物流信息</h4>
    <el-table :data="tableData4"
              style="width:100%">
      <el-table-column prop="out"
                       label="出库费（£）"></el-table-column>
      <el-table-column prop="outRmb"
                       label="出库费（￥）"></el-table-column>                 
      <el-table-column prop="name"
                       label="物流方式"></el-table-column>
      <el-table-column prop="cost"
                       label="物流费（£）"></el-table-column>
      <el-table-column prop="costRmb"
                       label="物流费（￥）"></el-table-column>
    </el-table>
  </section>
</template>

<script>
import { getUK } from '../../api/profit'
export default {
  data() {
    return {
      listLoading: false,
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      condition: {
        sku: '',
        num: null,
        price: null,
        rate: null,
        adRate:null,
      }
    }
  },
  methods: {
    onSubmit() {
      this.listLoading = true
      getUK(this.condition).then(response => {
        this.listLoading = false
        this.tableData1 = response.data.data.detail
        this.tableData2 = response.data.data.rate
        this.tableData3 = response.data.data.price
        this.tableData4 = response.data.data.transport
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.toolbar {
  padding: 10px;
}
</style>