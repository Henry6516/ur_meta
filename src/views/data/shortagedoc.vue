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
    <div v-show="show.stock">
      <stock></stock>
    </div>
    <div v-show="show.delay">
      <delay></delay>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
import { getMenu } from "../../api/login";
import stock from "./stock.vue";
import delay from "./delay.vue";

export default {
  components: {
    stock,
    delay
  },
  data() {
    return {
      allMenu: [],
      activeName: "",
      show: {
        stock: true,
        delay: false
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      if (tab.name === "/v1/data-center/out-of-stock-info") {
        this.show["stock"] = true;
      } else {
        this.show["stock"] = false;
      }
      if (tab.name === "/v1/data-center/delay-delivery") {
        this.show["delay"] = true;
      } else {
        this.show["delay"] = false;
      }
    }
  },
  mounted() {
    getMenu().then(response => {
      const res = response.data.data;
      const menu = res.filter(e => e.route === "/v1/data-center/options");
      const arr = menu[0].children;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].route == "/v1/data-center/shortage") {
          this.allMenu = arr[i].tabs;
        }
      }
      this.activeName = this.allMenu[0].route;
    });
  }
};
</script>