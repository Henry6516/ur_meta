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
    <div v-show="show.pcost">
      <pcost></pcost>
    </div>
    <div v-show="show.weight">
      <weight></weight>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
import { getMenu } from "../../api/login";
import pcost from "./pcost.vue";
import weight from "./weight.vue";

export default {
  components: {
    pcost,
    weight
  },
  data() {
    return {
      allMenu: [],
      activeName: "",
      show: {
        pcost: true,
        weight: false
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      if (tab.name === "/v1/perform/cost") {
        this.show["pcost"] = true;
      } else {
        this.show["pcost"] = false;
      }
      if (tab.name === "/v1/data-center/weight-diff") {
        this.show["weight"] = true;
      } else {
        this.show["weight"] = false;
      }
    }
  },
  mounted() {
    getMenu().then(response => {
      const res = response.data.data;
      const menu = res.filter(e => e.route === "/v1/data-center/options");
      const arr = menu[0].children;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].route == "/v1/data-center/logistics") {
          this.allMenu = arr[i].tabs;
        }
      }
      this.activeName = this.allMenu[0].route;
    });
  }
};
</script>