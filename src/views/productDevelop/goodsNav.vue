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
      if (tab.label === "属性信息") {
        sessionStorage.setItem("judge", "属性信息");
        this.$router.push({
          path: `/v1/oa-goodsinfo/indexIfo`
        });
      }
      if (tab.label === "图片信息") {
        sessionStorage.setItem("judge", "图片信息");
        this.$router.push({
          path: `/v1/oa-goodsinfo/goodsInfoPicture`
        });
      } else {
      }
      if (tab.label === "平台信息") {
        sessionStorage.setItem("judge", "平台信息");
        this.$router.push({
          path: `/v1/oa-goodsinfo/goodsInfoPlatform`
        });
      }
    }
  },
  watch: {
    "$route.path": function(newVal, oldVal) {
      if (newVal == "/v1/oa-goodsinfo/index") {
        if (this.allMenu[0].name == "属性信息") {
          this.activeName = "属性信息";
          sessionStorage.setItem("judge", "属性信息");
          this.$router.push({
            path: `/v1/oa-goodsinfo/indexIfo`
          });
        }
        if (this.allMenu[0].name == "图片信息") {
          this.activeName = "图片信息";
          sessionStorage.setItem("judge", "图片信息");
          this.$router.push({
            path: `/v1/oa-goodsinfo/goodsInfoPicture`
          });
        }
        if (this.allMenu[0].name == "平台信息") {
          this.activeName = "平台信息";
          sessionStorage.setItem("judge", "平台信息");
          this.$router.push({
            path: `/v1/oa-goodsinfo/goodsInfoPlatform`
          });
        }
      }
      if (newVal == "/v1/oa-goodsinfo/goodsInfoPicture") {
        this.activeName = "图片信息";
      }
      if (newVal == "/v1/oa-goodsinfo/goodsInfoPlatform") {
        this.activeName = "平台信息";
      }
    }
  },
  mounted() {
    const fatName = sessionStorage.getItem("judge");
    if (fatName) {
      this.activeName = fatName;
    }
    getMenu().then(response => {
      const res = response.data.data;
      const menu = res.filter(e => e.name === "产品中心");
      let arr = menu[0].children;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].name == "产品资料") {
          this.allMenu = arr[i].tabs;
        }
      }
      if (!sessionStorage.getItem("judge")) {
        if (this.allMenu[0].name == "属性信息") {
          this.activeName = "属性信息";
          sessionStorage.setItem("judge", "属性信息");
          this.$router.push({
            path: `/v1/oa-goodsinfo/indexIfo`
          });
        }
        if (this.allMenu[0].name == "图片信息") {
          this.activeName = "图片信息";
          sessionStorage.setItem("judge", "图片信息");
          this.$router.push({
            path: `/v1/oa-goodsinfo/goodsInfoPicture`
          });
        }
        if (this.allMenu[0].name == "平台信息") {
          this.activeName = "平台信息";
          sessionStorage.setItem("judge", "平台信息");
          this.$router.push({
            path: `/v1/oa-goodsinfo/goodsInfoPlatform`
          });
        }
      }
    });
  }
};
</script>

<style lang="scss" scoped>
</style>