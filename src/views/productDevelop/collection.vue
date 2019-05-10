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
    <div v-if="showis">
        <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getMenu } from "../../api/login";
export default {
  data() {
    return {
      activeName: "",
      allMenu: [],
      showis:true
    };
  },
  methods: {
   handleClick(tab, event) {
      if (tab.label === "Joom采集") {
        this.showis=true
        sessionStorage.setItem("judgeCollection", "Joom采集");
        this.$router.push({
         path: `/v1/oa-data-mine/collectionJoom`
        });
      }else{
        this.showis=false
      }
    }
  },
  watch: {
    "$route.path": function(newVal, oldVal) {
      if (newVal == "/v1/oa-data-mine/index") {
        if (this.allMenu[0].name == "Joom采集") {
          this.activeName = "Joom采集";
          sessionStorage.setItem("judgeCollection", "Joom采集");
          this.$router.push({
            path: `/v1/oa-data-mine/collectionJoom`
          });
        }
        if (this.allMenu[0].name == "Wish采集") {
          this.activeName = "Wish采集";
          sessionStorage.setItem("judgeCollection", "Wish采集");
          this.$router.push({
            path: `/v1/oa-data-mine/collectionWish`
          });
        }
        if (this.allMenu[0].name == "Ebay采集") {
          this.activeName = "Ebay采集";
          sessionStorage.setItem("judgeCollection", "Ebay采集");
          this.$router.push({
            path: `/v1/oa-data-mine/collectionEbay`
          });
        }
        if (this.allMenu[0].name == "Amazone采集") {
          this.activeName = "Amazone采集";
          sessionStorage.setItem("judgeCollection", "Amazone采集");
          this.$router.push({
            path: `/v1/oa-data-mine/collectionAmazone`
          });
        }
         if (this.allMenu[0].name == "Aliexpress采集") {
          this.activeName = "Aliexpress采集";
          sessionStorage.setItem("judgeCollection", "Aliexpress采集");
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
        if (this.allMenu[0].name == "Joom采集") {
          this.activeName = "Joom采集";
          sessionStorage.setItem("judgeCollection", "Joom采集");
          this.$router.push({
            path: `/v1/oa-data-mine/collectionJoom`
          });
        }
        if (this.allMenu[0].name == "Wish采集") {
          this.activeName = "Wish采集";
          sessionStorage.setItem("judgeCollection", "Wish采集");
        //   this.$router.push({
        //     path: `/v1/oa-goodsinfo/goodsInfoPicture`
        //   });
        }
        if (this.allMenu[0].name == "Ebay采集") {
          this.activeName = "Ebay采集";
          sessionStorage.setItem("judgeCollection", "Ebay采集");
        //   this.$router.push({
        //     path: `/v1/oa-goodsinfo/goodsInfoPlatform`
        //   });
        }
        if (this.allMenu[0].name == "Amazone采集") {
          this.activeName = "Amazone采集";
          sessionStorage.setItem("judgeCollection", "Amazone采集");
        //   this.$router.push({
        //     path: `/v1/oa-goodsinfo/goodsInfoPlatform`
        //   });
        }
        if (this.allMenu[0].name == "Aliexpress采集") {
          this.activeName = "Aliexpress采集";
          sessionStorage.setItem("judgeCollection", "Aliexpress采集");
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