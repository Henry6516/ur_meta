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
    <div v-show="show.psales">
      <psales></psales>
    </div>
    <div v-show="show.saleschange">
      <saleschange></saleschange>
    </div>
    <div v-show="show.global">
      <global></global>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
import { getMenu } from "../../api/login";
import psales from "./psales.vue";
import saleschange from "./saleschange.vue";
import global from "./global.vue";

export default {
  components: {
    psales,
    saleschange,
    global
  },
  data() {
    return {
      allMenu: [],
      activeName: "",
      show: {
        psales: true,
        saleschange: false,
        global:false
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      if (tab.name === "/v1/perform/sales") {
        this.show["psales"] = true;
      } else {
        this.show["psales"] = false;
      }
      if (tab.name === "/v1/data-center/sales-change") {
        this.show["saleschange"] = true;
      } else {
        this.show["saleschange"] = false;
      }
      if (tab.name === "/v1/oa-data/global-market") {
        this.show["global"] = true;
      } else {
        this.show["global"] = false;
      }
    }
  },
  mounted() {
    getMenu().then(response => {
      const res = response.data.data;
      const menu = res.filter(e => e.route === "/v1/data-center/options");
      const arr = menu[0].children;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].route == "/v1/data-center/sales") {
          this.allMenu = arr[i].tabs;
        }
      }
      this.activeName = this.allMenu[0].route;
    });
  }
};
</script>