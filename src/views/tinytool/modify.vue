<template>
  <div class="contentBox1">
    <el-row class="congf">
      <el-col :span="4" class="congfel">
        <el-col :span="8" style="text-align:center;line-height:32px;">销售员</el-col>
        <el-col :span="15">
          <el-select size="small" v-model="condition.salesName" clearable>
            <el-option v-for="item in res" :key="item.username" :value="item.username"></el-option>
          </el-select>
        </el-col>
      </el-col>
      <el-col :span="4" class="congfel">
        <el-col :span="8" style="text-align:center;line-height:32px;">itemId</el-col>
        <el-col :span="15">
          <el-input size="small" v-model="condition.itemId" clearable></el-input>
        </el-col>
      </el-col>
      <el-col :span="4" class="congfel">
        <el-col :span="8" style="text-align:center;line-height:32px;">主SKU</el-col>
        <el-col :span="15">
          <el-input size="small" v-model="condition.parentSku" clearable></el-input>
        </el-col>
      </el-col>
      <el-col :span="4" class="congfel">
        <el-col :span="8" style="text-align:center;line-height:32px;">子SKU</el-col>
        <el-col :span="15">
          <el-input size="small" v-model="condition.sku" clearable></el-input>
        </el-col>
      </el-col>
      <el-col :span="4" class="congfel">
        <el-col :span="8" style="text-align:center;line-height:32px;">账号</el-col>
        <el-col :span="15">
          <el-select size="small" filterable v-model="condition.sellerUserid" clearable>
            <el-option
              v-for="(item,index) in account"
              :index="index"
              :key="item.id"
              :label="item.store"
              :value="item.store"
            ></el-option>
            <!-- <el-input size="small" v-model="condition.sellerUserid" clearable></el-input> -->
          </el-select>
        </el-col>
      </el-col>
      <el-col :span="4" class="congfel">
        <el-col :span="8" style="text-align:center;line-height:32px;">发货仓库</el-col>
        <el-col :span="15">
          <el-select size="small" v-model="condition.deliveryStorename" clearable>
            <el-option v-for="item in store" :key="item" :value="item"></el-option>
            <!-- <el-input size="small" v-model="condition.deliveryStorename" clearable></el-input> -->
          </el-select>
        </el-col>
      </el-col>
      <el-col :span="4" class="congfel">
        <el-col :span="8" style="text-align:center;line-height:32px;">在线数量</el-col>
        <el-col :span="15">
          <el-input size="small" v-model="condition.inventory" clearable></el-input>
        </el-col>
      </el-col>
      <el-col :span="4" class="congfel">
        <el-col :span="8" style="text-align:center;line-height:32px;">可用库存</el-col>
        <el-col :span="15">
          <el-input size="small" v-model="condition.useNum" clearable></el-input>
        </el-col>
      </el-col>
      <el-col :span="1">
        <span class="searchMod" @click="searchMod">搜索</span>
      </el-col>
      <el-col :span="1" style="margin-left:15px;">
        <span class="searchMod" @click="exportExcel">导出</span>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width:100%;"
      v-loading="listLoading"
      :height="tableHeight"
      v-scrollBar:slim
      :max-height="tableHeight"
      v-if="showIFif"
      element-loading-text="正在加载中..."
    >
      <el-table-column prop="salesName" label="销售员"></el-table-column>
      <el-table-column prop="sellerUserid" label="账号"></el-table-column>
      <el-table-column prop="itemId" label="itemId"></el-table-column>
      <el-table-column prop="parentSku" label="主SKU"></el-table-column>
      <el-table-column prop="sku" label="子SKU"></el-table-column>
      <el-table-column prop="inventory" label="在线数量"></el-table-column>
      <el-table-column prop="useNum" label="可用库存"></el-table-column>
      <el-table-column prop="deliveryStorename" label="发货仓库"></el-table-column>
      <el-table-column prop="updateDate" label="更新时间"></el-table-column>
    </el-table>
    <div class="botoomTatal" v-if="shiwIS">当前总共 {{totalPic}} 条数据</div>
    <!-- <el-pagination
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
    ></el-pagination>-->
  </div>
</template>

<script>
import {
  getEbayVirtualStore,
  getMember,
  getAccount,
  getStore
} from "../../api/profit";
import { isAdmin } from "../../api/api";
export default {
  data() {
    return {
      shiwIS: false,
      tableData: [],
      tableHeight: window.innerHeight - 201,
      listLoading: false,
      totalPic: null,
      res: [],
      member: [],
      account: [],
      store: [],
      showIFif:false,
      resJl: [],
      condition: {
        salesName: null,
        itemId: null,
        sku: null,
        parentSku: null,
        sellerUserid: null,
        deliveryStorename: null,
        inventory: null,
        useNum: null,
        pageSize: 1000000,
        page: 1
      }
    };
  },
  mounted() {
    getMember().then(response => {
      const res = response.data.data;
      this.member = res.filter(ele => ele.position === "销售");
      this.res = res.filter(
        ele =>
          (ele.department === "运营一部" ||
            ele.parent_department === "运营一部") &&
          ele.position === "销售"
      );
      this.resJl = res.filter(
        ele => (ele.department === "运营一部" || ele.parent_department === "运营一部") && ele.position=="经理"
      );
    });
    getAccount().then(response => {
      this.account = response.data.data;
    });
    getStore().then(response => {
      this.store = response.data.data;
    });
  },
  methods: {
    exportExcel() {
      this.order = Object.assign({}, this.condition);
      this.order.pageSize = 100000;
      getEbayVirtualStore(this.order).then(res => {
        this.allDataOrder = res.data.data.items;
        const Filename = "eBay海外仓修改在线数量";
        const data = this.allDataOrder.map(v => filterVal.map(k => v[k]));
        const [fileName, fileType, sheetName] = [Filename, "xls"];
        this.$toExcel({ th, data, fileName, fileType, sheetName });
      });
      const th = [
        "销售员",
        "账号",
        "itemId",
        "主SKU",
        "子SKU",
        "在线数量",
        "可用库存",
        "发货仓库",
        "更新时间"
      ];
      const filterVal = [
        "salesName",
        "sellerUserid",
        "itemId",
        "parentSku",
        "sku",
        "inventory",
        "useNum",
        "deliveryStorename",
        "updateDate"
      ];
    },
    handleSizeChangePic(val) {
      this.condition.pageSize = val;
      this.searchMod();
    },
    handleCurrentChangePic(val) {
      this.condition.page = val;
      this.searchMod();
    },
    searchMod() {
      this.showIFif=true
      this.listLoading = true;
      this.shiwIS = false;
      if (this.condition.salesName) {
        getEbayVirtualStore(this.condition).then(res => {
          this.listLoading = false;
          this.tableData = res.data.data.items;
          this.totalPic = res.data.data._meta.totalCount;
          this.shiwIS = true;
        });
      } else {
        let admin = "";
        const username = sessionStorage.getItem("user");
        for (let i = 0; i < this.resJl.length; i++) {
          admin = this.resJl[i].username;
        }
        if (username === admin || isAdmin() === true) {
          this.listLoading = true;
          getEbayVirtualStore(this.condition).then(res => {
            this.listLoading = false;
            this.tableData = res.data.data.items;
            this.totalPic = res.data.data._meta.totalCount;
            this.shiwIS = true;
          });
        } else {
          if (this.res.length != 0) {
            this.condition.salesName = this.res[0].username;
            getEbayVirtualStore(this.condition).then(res => {
              this.listLoading = false;
              this.tableData = res.data.data.items;
              this.totalPic = res.data.data._meta.totalCount;
              this.shiwIS = true;
            });
          }
        }
      }
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
.botoomTatal {
  width: 100%;
  overflow: hidden;
  background: #fff;
  position: fixed;
  bottom: 0;
  z-index: 999;
  padding: 10px 0;
  padding-left: 10px;
  font-size: 15px;
  border-top: #eee solid 1px;
}
</style>