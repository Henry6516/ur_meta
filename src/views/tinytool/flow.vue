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
    <div v-show="show.logistics">
      <logistics></logistics>
    </div>
    <div v-show="show.prescription">
      <prescription></prescription>
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
import logistics from "./logistics.vue";
import prescription from "./prescription.vue";
export default {
  components: {
    logistics,
    prescription
  },
  data() {
    return {
      allMenu: [],
      activeName: "",
      show: {
        logistics: true,
        prescription: false
      }
    };
  },
  methods: {
    addWish() {
      this.dialogPictureWish = true;
    },
    handleClick(tab, event) {
      if (tab.name === "/v1/tiny-tool/express-tracking") {
        this.show["logistics"] = true;
      } else {
        this.show["logistics"] = false;
      }
      if (tab.name === "/v1/tiny-tool/express-expired") {
        this.show["prescription"] = true;
      } else {
        this.show["prescription"] = false;
      }
    }
  },
  mounted() {
    getMenu().then(response => {
      const res = response.data.data;
      const menu = res.filter(e => e.route === "/v1/tiny-tool/options");
      const arr = menu[0].children;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].route == "/v1/tiny-tool/logistics-tool") {
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
