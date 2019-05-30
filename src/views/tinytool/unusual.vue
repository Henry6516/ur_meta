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
    <div v-show="show.ukfic2">
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
    <div v-show="show.modify">
      <modify></modify>
    </div>
  </section>
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
        this.show["ukfic2"] = true;
      } else {
        this.show["ukfic2"] = false;
      }
      if (tab.name === "/v1/tiny-tool/uk-fic") {
        this.show["ukfic"] = true;
      } else {
        this.show["ukfic"] = false;
      }
      if (tab.name === "/v1/tiny-tool/uk") {
        this.show["uk"] = true;
      } else {
        this.show["uk"] = false;
      }
      if (tab.name === "/v1/tiny-tool/au") {
        this.show["au"] = true;
      } else {
        this.show["au"] = false;
      }
      if (tab.name === "/v1/tiny-tool/uk-replenish") {
        this.show["ukxn"] = true;
      } else {
        this.show["ukxn"] = false;
      }
      if (tab.name === "/v1/tiny-tool/au-real-replenish") {
        this.show["ukzc"] = true;
      } else {
        this.show["ukzc"] = false;
      }
      if (tab.name === "/v1/tiny-tool/uk-real-replenish") {
        this.show["auzc"] = true;
      } else {
        this.show["auzc"] = false;
      }
      if (tab.name === "/v1/tiny-tool/ebay-virtual-store") {
        this.show["modify"] = true;
      } else {
        this.show["modify"] = false;
      }
    }
  },
  mounted() {
    getMenu().then(response => {
      const res = response.data.data;
      const menu = res.filter(e => e.route === "/v1/tiny-tool/options");
      const arr = menu[0].children;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].route == "/v1/tiny-tool/exception") {
          this.allMenu = arr[i].tabs;
        }
      }
      this.activeName = this.allMenu[0].route;
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
