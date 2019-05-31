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
    <div v-show="show.pricetrend">
      <pricetrend></pricetrend>
    </div>
    <div v-show="show.perform">
      <perform></perform>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
import { getMenu } from "../../api/login";
import pricetrend from "./pricetrend.vue";
import perform from "./perform.vue";

export default {
  components: {
    pricetrend,
    perform
  },
  data() {
    return {
      allMenu: [],
      activeName: "",
      show: {
        pricetrend: true,
        perform: false
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      if (tab.name === "/v1/data-center/price-trend") {
        this.show["pricetrend"] = true;
      } else {
        this.show["pricetrend"] = false;
      }
      if (tab.name === "/v1/perform/perform") {
        this.show["perform"] = true;
      } else {
        this.show["perform"] = false;
      }
    }
  },
  mounted() {
    getMenu().then(response => {
      const res = response.data.data;
      const menu = res.filter(e => e.route === "/v1/data-center/options");
      const arr = menu[0].children;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].route == "/v1/data-center/product") {
          this.allMenu = arr[i].tabs;
        }
      }
      this.activeName = this.allMenu[0].route;
    });
  }
};
</script>