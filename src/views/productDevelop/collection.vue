<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, index) in this.allMenu"
        :label="item.name"
        :name="item.name"
        :key="index"
      ></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
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
      if (tab.label === "Joom") {
        sessionStorage.setItem("judgeCollection", "属性信息");
        this.$router.push({
         path: `/v1/oa-data-mine/collectionJoom`
        });
      }
    }
  },
  watch: {
    "$route.path": function(newVal, oldVal) {
      if (newVal == "/v1/oa-data-mine/index") {
        if (this.allMenu[0].name == "Joom") {
          this.activeName = "Joom";
          sessionStorage.setItem("judgeCollection", "Joom");
          this.$router.push({
            path: `/v1/oa-data-mine/collectionJoom`
          });
        }
        if (this.allMenu[0].name == "Wish") {
          this.activeName = "Wish";
          sessionStorage.setItem("judgeCollection", "Wish");
          this.$router.push({
            path: `/v1/oa-data-mine/collectionWish`
          });
        }
        if (this.allMenu[0].name == "Ebay") {
          this.activeName = "Ebay";
          sessionStorage.setItem("judgeCollection", "Ebay");
          this.$router.push({
            path: `/v1/oa-data-mine/collectionEbay`
          });
        }
        if (this.allMenu[0].name == "Amazone") {
          this.activeName = "Amazone";
          sessionStorage.setItem("judgeCollection", "Amazone");
          this.$router.push({
            path: `/v1/oa-data-mine/collectionAmazone`
          });
        }
         if (this.allMenu[0].name == "Aliexpress") {
          this.activeName = "Aliexpress";
          sessionStorage.setItem("judgeCollection", "Aliexpress");
          this.$router.push({
            path: `/v1/oa-data-mine/collectionAliexpress`
          });
        }
      }
    }
  },
  mounted() {
    const fatName = sessionStorage.getItem("judgeCollection");
    if (fatName) {
      this.activeName = fatName;
    }
    getMenu().then(response => {
      const res = response.data.data;
      const menu = res.filter(e => e.name === "产品中心");
      let arr = menu[0].children;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].name == "数据采集") {
          this.allMenu = arr[i].tabs;
        }
      }
      if (!sessionStorage.getItem("judgeCollection")) {
        if (this.allMenu[0].name == "Joom") {
          this.activeName = "Joom";
          sessionStorage.setItem("judgeCollection", "Joom");
          this.$router.push({
            path: `/v1/oa-data-mine/collectionJoom`
          });
        }
        if (this.allMenu[0].name == "Wish") {
          this.activeName = "Wish";
          sessionStorage.setItem("judgeCollection", "Wish");
        //   this.$router.push({
        //     path: `/v1/oa-goodsinfo/goodsInfoPicture`
        //   });
        }
        if (this.allMenu[0].name == "Ebay") {
          this.activeName = "Ebay";
          sessionStorage.setItem("judgeCollection", "Ebay");
        //   this.$router.push({
        //     path: `/v1/oa-goodsinfo/goodsInfoPlatform`
        //   });
        }
        if (this.allMenu[0].name == "Amazone") {
          this.activeName = "Ebay";
          sessionStorage.setItem("judgeCollection", "Amazone");
        //   this.$router.push({
        //     path: `/v1/oa-goodsinfo/goodsInfoPlatform`
        //   });
        }
        if (this.allMenu[0].name == "Aliexpress") {
          this.activeName = "Ebay";
          sessionStorage.setItem("judgeCollection", "Aliexpress");
        //   this.$router.push({
        //     path: `/v1/oa-goodsinfo/goodsInfoPlatform`
        //   });
        }
      }
    });
  }
};
</script>

<style lang="scss" scoped>
</style>