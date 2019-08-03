<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, index) in this.allMenu"
        :label="item.name"
        :name="item.route"
        :key="index"
      ></el-tab-pane>
    </el-tabs>
    <!-- <div v-show="show.ukfic2">
      <ukfic2></ukfic2>
    </div>
    <div v-show="show.ukfic">
      <ukfic></ukfic>
    </div>
    <div v-show="show.uk">
      <uk></uk>
    </div>
    <div v-show="show.au">
      <au></au>
    </div>
    <div v-show="show.ukxn">
      <ukxn></ukxn>
    </div>
    <div v-show="show.ukzc">
      <ukzc></ukzc>
    </div>
    <div v-show="show.auzc">
      <auzc></auzc>
    </div>
    <div v-show="show.bidding">
      <bidding></bidding>
    </div>
    <div v-show="show.modify">
      <modify></modify>
    </div> -->
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  APIWishSuffix,
  APICreateWish,
  APIDeleteWish,
  APIWishInfo,
  APIUpdateWish
} from "../../api/product";
import { getMenu } from "../../api/login";
import ukfic2 from "./ukfic2.vue";
import ukfic from "./ukfic.vue";
import uk from "./uk.vue";
import au from "./au.vue";
import ukxn from "./ukxn.vue";
import ukzc from "./ukzc.vue";
import auzc from "./auzc.vue";
import bidding from "./bidding.vue";
import modify from "./modify.vue";
export default {
  components: {
    ukfic2,
    ukfic,
    uk,
    au,
    ukxn,
    ukzc,
    auzc,
    bidding,
    modify
  },
  data() {
    return {
      allMenu: [],
      activeName: "",
      show: {
        ukfic2: true,
        ukfic: false,
        uk: false,
        au: false,
        ukxn: false,
        ukzc: false,
        auzc:false,
        bidding:false,
        modify:false
      }
    };
  },
  methods: {
    addWish() {
      this.dialogPictureWish = true;
    },
    handleClick(tab, event) {
      if (tab.name === "/v1/tiny-tool/uk-fic2") {
        sessionStorage.setItem("fixname", "/v1/tiny-tool/uk-fic2");
        this.$router.push({
          path: `/v1/tiny-tool/uk-fic2`
        });
      }
      if (tab.name === "/v1/tiny-tool/uk-fic") {
      sessionStorage.setItem("fixname", "/v1/tiny-tool/uk-fic");
       this.$router.push({
          path: `/v1/tiny-tool/uk-fic`
        });
      }
      if (tab.name === "/v1/tiny-tool/uk") {
       sessionStorage.setItem("fixname", "/v1/tiny-tool/uk"); 
       this.$router.push({
          path: `/v1/tiny-tool/uk`
        });
      }
      if (tab.name === "/v1/tiny-tool/au") {
       sessionStorage.setItem("fixname", "/v1/tiny-tool/au"); 
       this.$router.push({
          path: `/v1/tiny-tool/au`
        });
      }
      if (tab.name === "/v1/tiny-tool/uk-replenish") {
       sessionStorage.setItem("fixname", "/v1/tiny-tool/uk-replenish"); 
       this.$router.push({
          path: `/v1/tiny-tool/uk-replenish`
        });
      }
      if (tab.name === "/v1/tiny-tool/au-real-replenish") {
       sessionStorage.setItem("fixname", "/v1/tiny-tool/au-real-replenish"); 
       this.$router.push({
          path: `/v1/tiny-tool/au-real-replenish`
        });
      }
      if (tab.name === "/v1/tiny-tool/uk-real-replenish") {
        sessionStorage.setItem("fixname", "/v1/tiny-tool/uk-real-replenish"); 
        this.$router.push({
          path: `/v1/tiny-tool/uk-real-replenish`
        });
      }
      if (tab.name === "/v1/tiny-tool/keyword-analysis") {
        sessionStorage.setItem("fixname", "/v1/tiny-tool/keyword-analysis");
        this.$router.push({
          path: `/v1/tiny-tool/keyword-analysis`
        });
      }
      if (tab.name === "/v1/tiny-tool/ebay-virtual-store") {
        sessionStorage.setItem("fixname", "/v1/tiny-tool/ebay-virtual-store");
        this.$router.push({
          path: `/v1/tiny-tool/ebay-virtual-store`
        });
      }
      if (tab.name === "/v1/tiny-tool/uk-virtual-replenish") {
        sessionStorage.setItem("fixname", "/v1/tiny-tool/uk-virtual-replenish");
        this.$router.push({
          path: `/v1/tiny-tool/uk-virtual-replenish`
        });
      }
    }
  },
  mounted() {
    getMenu().then(response => {
      const res = response.data.data;
      const menu = res.filter(e => e.route === "/v1/tiny-tool/options");
      const arr = menu[0].children;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].route == "/v1/tiny-tool/fix-price") {
          this.allMenu = arr[i].tabs;
        }
      }
      const fatName = sessionStorage.getItem("fixname");
      if (fatName) {
        this.activeName = fatName;
      }else{
        this.activeName = this.allMenu[0].route;
      }
    });
  }
};
</script>

<style lang="scss">
.contentt {
  margin-left: 20px;
  margin-top: 15px;
}
.content1 {
  margin-left: 20px;
  margin-top: 20px;
}
.basp {
  padding: 0;
  margin: 0;
  line-height: 40px;
}
.cTop {
  margin-top: 0px;
}
.baspj {
  text-align: center;
}
.top20 {
  margin-top: 25px;
}
.font14 {
  font-size: 14px;
}
.elTable td {
  padding: 16px 0 !important;
}
// .el-input__inner{
//   padding: 0 10px;
// }
</style>
