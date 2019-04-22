<template>
  <div class="contentBox1">
    <el-row class="congf">
      <el-col :span="4" class="congfel">
        <el-col :span="6" style="text-align:center;line-height:32px;">销售员</el-col>
        <el-col :span="16">
          <el-input size="small" v-model="condition.salesName"></el-input>
        </el-col>
      </el-col>
      <el-col :span="4" class="congfel">
        <el-col :span="6" style="text-align:center;line-height:32px;">itemId</el-col>
        <el-col :span="16">
          <el-input size="small" v-model="condition.itemId"></el-input>
        </el-col>
      </el-col>
      <el-col :span="4" class="congfel">
        <el-col :span="6" style="text-align:center;line-height:32px;">主SKU</el-col>
        <el-col :span="16">
          <el-input size="small" v-model="condition.parentSku"></el-input>
        </el-col>
      </el-col>
      <el-col :span="4" class="congfel">
        <el-col :span="6" style="text-align:center;line-height:32px;">子SKU</el-col>
        <el-col :span="16">
          <el-input size="small" v-model="condition.sku"></el-input>
        </el-col>
      </el-col>
      <el-col :span="4" class="congfel">
        <el-col :span="6" style="text-align:center;line-height:32px;">账号</el-col>
        <el-col :span="16">
          <el-input size="small" v-model="condition.sellerUserid"></el-input>
        </el-col>
      </el-col>
      <el-col :span="4" class="congfel">
        <el-col :span="6" style="text-align:center;line-height:32px;">发货仓库</el-col>
        <el-col :span="16">
          <el-input size="small" v-model="condition.deliveryStorename"></el-input>
        </el-col>
      </el-col>
      <el-col :span="4" class="congfel">
        <el-col :span="6" style="text-align:center;line-height:32px;">在线数量</el-col>
        <el-col :span="16">
          <el-input size="small" v-model="condition.inventory"></el-input>
        </el-col>
      </el-col>
      <el-col :span="4" class="congfel">
        <el-col :span="6" style="text-align:center;line-height:32px;">可用库存</el-col>
        <el-col :span="16">
          <el-input size="small" v-model="condition.useNum"></el-input>
        </el-col>
      </el-col>
      <el-col :span="1">
        <span class="searchMod" @click="searchMod">搜索</span>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width:100%">
      <el-table-column prop="sellerUserid" label="账号"></el-table-column>
      <el-table-column prop="itemId" label="itemId"></el-table-column>
      <el-table-column prop="salesName" label="销售员"></el-table-column>
      <el-table-column prop="parentSku" label="主SKU"></el-table-column>
      <el-table-column prop="sku" label="子SKU"></el-table-column>
      <el-table-column prop="updateDate" label="更新时间"></el-table-column>
      <el-table-column prop="deliveryStorename" label="发货仓库"></el-table-column>
      <el-table-column prop="inventory" label="在线数量"></el-table-column>
      <el-table-column prop="useNum" label="可用库存"></el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChangePic"
      @current-change="handleCurrentChangePic"
      :current-page="this.condition.page"
      :page-sizes="[20, 30, 40, 50]"
      :page-size="this.condition.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      style="margin-top:10px;"
      v-if="tableData.length!=0"
      :total="this.totalPic"
    ></el-pagination>
  </div>
</template>

<script>
import { getEbayVirtualStore } from "../../api/profit";
export default {
  data() {
    return {
      tableData: [],
      totalPic: null,
      condition: {
        salesName: null,
        itemId: null,
        sku: null,
        parentSku: null,
        sellerUserid: null,
        deliveryStorename: null,
        inventory: null,
        useNum: null,
        pageSize: 20,
        page: 1
      }
    };
  },
  mounted() {
    this.searchMod();
  },
  methods: {
    handleSizeChangePic(val) {
      this.condition.pageSize = val;
      this.searchMod();
    },
    handleCurrentChangePic(val) {
      this.condition.page = val;
      this.searchMod();
    },
    searchMod() {
      getEbayVirtualStore(this.condition).then(res => {
        this.tableData = res.data.data.items;
        this.totalPic = res.data.data._meta.totalCount;
        this.condition.pageSize = res.data.data._meta.perPage;
        this.condition.page = res.data.data._meta.currentPage;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.congf {
  background: #f2f2f2;
  padding-top: 15px;
  padding-bottom: 3px;
}
.contentBox1 {
  width: 100%;
  margin: auto;
}
.congfel {
  padding-bottom: 12px;
}
.searchMod {
  text-align: center;
  background: #409eff;
  color: #fff;
  line-height: 32px;
  margin-left: 10px;
  cursor: pointer;
  display: block;
  width: 100%;
  border-radius: 3px;
}
</style>