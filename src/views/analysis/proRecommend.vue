<template>
  <section>
    <div>
      <el-tabs
        v-model="activeName"
        type="card"
        style="background-color:#fff"
        @tab-click="handleClick"
      >
        <el-tab-pane v-for="(item, index) in this.allMenu" :label="item" :name="item" :key="index"></el-tab-pane>
      </el-tabs>
      <router-view></router-view>
    </div>
  </section>
</template>
<script type="text/ecmascript-6">
import recommendEbay from "./recommendEbay.vue";
import recommendWish from "./recommendWish.vue";
export default {
  components: {
    recommendEbay,
    recommendWish
  },
  data() {
    return {
      allMenu: ["Ebay", "Wish", "Joom", "Amazon", "Aliexpress"],
      show: {
        ebay: true,
        wish: false
      },
      activeName: "Ebay"
    };
  },
  methods: {
    handleClick(tab, event) {
      if (tab.name === "Wish") {
        this.show.wish = true;
        this.$router.push({
          path: `/v1/products-engine/recommendWish`
        });
      } else {
        this.show.wish = false;
      }
      if (tab.name === "Ebay") {
        this.show.ebay = true;
        this.$router.push({
          path: `/v1/products-engine/recommendEbay`
        });
      } else {
        this.show.ebay = false;
      }
      if (tab.name === "Joom") {
        this.show.joom = true;
      } else {
        this.show.joom = false;
      }
      if (tab.name === "Amazon") {
        this.corner = "Amazon";
      }
      if (tab.name === "Aliexpress") {
        this.corner = "Aliexpress";
      }
    }
  },
  mounted() {
    this.$router.push({
      path: `/v1/products-engine/recommendEbay`
    });
  }
};
</script>

<style lang="scss" scoped>
</style>
