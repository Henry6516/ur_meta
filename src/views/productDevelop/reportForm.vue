<template>
  <section>
    <el-tabs
      v-model="activeName"
      type="card"
      @tab-click="handleClick"
      style="background-color:#fff"
    >
      <el-tab-pane
        v-for="(item, index) in this.allMenu"
        :label="item.name"
        :name="item.route"
        :key="index"
      ></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </section>
</template>
<script type="text/ecmascript-6">
import { getMenu } from "../../api/login";
export default {
  data() {
    return {
      activeName: "",
      allMenu: []
    };
  },
  methods: {
    handleClick(tab, event) {
      if (tab.name === "/v1/oa-data/sales") {
        this.$router.push({
          path: `/v1/oa-data/sales`
        });
      } else {
      }
      if (tab.name === "/v1/oa-data/wish") {
        this.$router.push({
          path: `/v1/oa-data/wish`
        });
      } else {
      }
      if (tab.name === "/v1/oa-data/stock") {
        this.$router.push({
          path: `/v1/oa-data/stock`
        });
      } else {
      }
      if (tab.name === "/v1/oa-data/nonstock") {
        this.$router.push({
          path: `/v1/oa-data/nonstock`
        });
      } else {
      }
      if (tab.name === "/v1/report/dev-limit") {
        this.$router.push({
          path: `/v1/report/dev-limit`
        });
      } else {
      }
      if (tab.name === "/v1/oa-data/sales-perform") {
        this.$router.push({
          path: `/v1/oa-data/sales-perform`
        });
      } else {
      }
      if (tab.name === "/v1/oa-data/stock-perform") {
        this.$router.push({
          path: `/v1/oa-data/stock-perform`
        });
      } else {
      }
      if (tab.name === "/v1/oa-data/product-perform") {
        this.$router.push({
          path: `/v1/oa-data/product-perform`
        });
      } else {
      }
      if (tab.name === "/v1/oa-data/dev-perform") {
        this.$router.push({
          path: `/v1/oa-data/dev-perform`
        });
      } else {
      }
      if (tab.name === "/v1/oa-data/cat-perform") {
        this.$router.push({
          path: `/v1/oa-data/cat-perform`
        });
      } else {
      }
      if (tab.name === "/v1/oa-data/global-market") {
        this.$router.push({
          path: `/v1/oa-data/global-market`
        });
      } else {
      }
      if (tab.name === "/v1/oa-data/stock-perform") {
        this.$router.push({
          path: `/v1/oa-data/stock-perform`
        });
      } else {
      }
      if (tab.name === "/v1/oa-data/dev-data") {
        this.$router.push({
          path: `/v1/oa-data/dev-data`
        });
      } else {
      }
    }
  },
  mounted() {
    getMenu().then(response => {
      const res = response.data.data;
      const menu = res.filter(e => e.name === "产品中心");
      let arr = menu[0].children;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].route == "/v1/oa-data/product") {
          this.allMenu = arr[i].tabs;
        }
      }
      //权限判断
      if (this.allMenu[0].route === "/v1/oa-data/sales") {
        this.activeName = this.allMenu[0].route;
        this.$router.push({
          path: `/v1/oa-data/sales`
        });
      }
      if (this.allMenu[0].route === "/v1/oa-data/wish") {
        this.activeName = this.allMenu[0].route;
        this.$router.push({
          path: `/v1/oa-data/wish`
        });
      }
      if (this.allMenu[0].route === "/v1/oa-data/stock") {
        this.activeName = this.allMenu[0].route;
        this.$router.push({
          path: `/v1/oa-data/stock`
        });
      }
      if (this.allMenu[0].route === "/v1/oa-data/nonstock") {
        this.activeName = this.allMenu[0].route;
        this.$router.push({
          path: `/v1/oa-data/nonstock`
        });
      }
      if (this.allMenu[0].route === "/v1/report/dev-limit") {
        this.activeName = this.allMenu[0].route;
        this.$router.push({
          path: `/v1/report/dev-limit`
        });
      }
      if (this.allMenu[0].route === "/v1/oa-data/sales-perform") {
        this.activeName = this.allMenu[0].route;
        this.$router.push({
          path: `/v1/oa-data/sales-perform`
        });
      }
      if (this.allMenu[0].route === "/v1/oa-data/stock-perform") {
        this.activeName = this.allMenu[0].route;
        this.$router.push({
          path: `/v1/oa-data/stock-perform`
        });
      }
      if (this.allMenu[0].route === "/v1/oa-data/product-perform") {
        this.activeName = this.allMenu[0].route;
        this.$router.push({
          path: `/v1/oa-data/product-perform`
        });
      }
      if (this.allMenu[0].route === "/v1/oa-data/dev-perform") {
        this.activeName = this.allMenu[0].route;
        this.$router.push({
          path: `/v1/oa-data/dev-perform`
        });
      }
      if (this.allMenu[0].route === "/v1/oa-data/global-market") {
        this.activeName = this.allMenu[0].route;
        this.$router.push({
          path: `/v1/oa-data/global-market`
        });
      }
      if (this.allMenu[0].route === "/v1/oa-data/cat-perform") {
        this.activeName = this.allMenu[0].route;
        this.$router.push({
          path: `/v1/oa-data/cat-perform`
        });
      }
      if (this.allMenu[0].route === "/v1/oa-data/stock-perform") {
        this.activeName = this.allMenu[0].route;
        this.$router.push({
          path: `/v1/oa-data/stock-perform`
        });
      }
      if (this.allMenu[0].route === "/v1/oa-data/dev-data") {
        this.activeName = this.allMenu[0].route;
        this.$router.push({
          path: `/v1/oa-data/dev-data`
        });
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.clasRed {
  color: #c55 !important;
}
.clasGreen {
  color: #0e9a00;
}
.classa {
  color: #337ab7;
  text-decoration: none;
}
.clasRed1 {
  color: #f56c6c;
  border: rgba(245, 108, 108, 0.2) solid 1px;
  background: rgba(245, 108, 108, 0.1);
  width: 85%;
  margin: auto;
  line-height: 32px;
  display: block;
  border-radius: 5px;
}
.clasGreen1 {
  color: #0e9a00;
  border-radius: 5px;
  width: 85%;
  margin: auto;
  line-height: 32px;
  display: block;
  border: rgba(3, 82, 38, 0.2) solid 1px;
  background: rgba(33, 170, 95, 0.1);
}
.redCu {
  color: red;
  font-weight: bold;
}
.redblack {
  color: #606266;
}
</style>
<style>
.elTableForm td {
  padding: 10px 0;
}
</style>


