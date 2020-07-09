<template>
  <section>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, index) in this.allMenu"
        :label="item.name"
        :name="item.route"
        :key="index"
      ></el-tab-pane>
    </el-tabs>
    <div v-show="show.qc">
      <purchaseQc></purchaseQc>
    </div>
    <div v-show="show.nqc">
      <purchasenQc></purchasenQc>
    </div>
    <div v-show="show.qh">
      <purchaseQh></purchaseQh>
    </div>
    <div v-show="show.zd">
      <purchaseZd></purchaseZd>
    </div>
    <div v-show="show.tb">
      <purchaseTb></purchaseTb>
    </div>
    <div v-show="show.yl">
      <purchase1688></purchase1688>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
import { getMenu } from "../../api/login";
import purchaseQc from "./purchaseQc.vue";
import purchasenQc from "./purchasenQc.vue";
import purchaseQh from "./purchaseQh.vue";
import purchaseZd from "./purchaseZd.vue";
import purchaseTb from "./purchaseTb.vue";
import purchase1688 from "./purchase1688.vue";

export default {
  components: {
    purchaseQc,
    purchasenQc,
    purchaseQh,
    purchaseZd,
    purchaseTb,
    purchase1688
  },
  data() {
    return {
      allMenu: [],
      activeName: "",
      show: {
        qc: false,
        nqc: false,
        qh: false,
        zd: false,
        tb: false,
        yl: true
      }
    };
  },
  methods: {
    empty(row, column, cellValue, index) {
      return cellValue || "--";
    },
    handleClick(tab, event) {
      if (tab.name === "/v1/purchase-tool/clear-sku") {
        this.show["qc"] = true;
      } else {
        this.show["qc"] = false;
      }
      if (tab.name === "/v1/purchase-tool/unclear-sku") {
        this.show["nqc"] = true;
      } else {
        this.show["nqc"] = false;
      }
      if (tab.name === "/v1/purchase-tool/shortage") {
        this.show["qh"] = true;
      } else {
        this.show["qh"] = false;
      }
      if (tab.name === "/v1/purchase-tool/checking") {
        this.show["zd"] = true;
      } else {
        this.show["zd"] = false;
      }
      if (tab.name === "/v1/purchase-tool/auto-sync") {
        this.show["tb"] = true;
      } else {
        this.show["tb"] = false;
      }
      if (tab.name === "/v1/purchase-tool/search-suppliers") {
        this.show["yl"] = true;
      } else {
        this.show["yl"] = false;
      }
    }
  },
  mounted() {
    getMenu().then(response => {
      const res = response.data.data;
      const menu = res.filter(e => e.route === "/v1/tiny-tool/options");
      const arr = menu[0].children;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].route == "/v1/purchase-tool/options") {
          this.allMenu = arr[i].tabs;
        }
      }
      this.activeName = this.allMenu[0].route;
    });
  }
};
</script>