<template>
  <section>
    <el-tabs v-model="activeName"
             type="card"
             @tab-click="handleClick">
      <el-tab-pane label='Wish'
                   name='first'>
        <plat-wish></plat-wish>
      </el-tab-pane>
      <el-tab-pane label="eBay"
                   name='second'>
        <plat-ebay></plat-ebay>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>
<script>
import { APIPlatInfo, APISaveWishInfo } from '../../api/product'
import platWish from './platWish.vue'
import platEbay from './platEbay.vue'
export default {
  components: {
    platWish,
    platEbay
  },
  data() {
    return {
      // select: '',
      // select1: '',
      activeName: 'first'
      // wishForm: {},
      // mainForm: {},
      // tableData: [
      //   {
      //     a: 'Brand',
      //     b: 'Unbranded'
      //   }
      // ]
    }
  },
  methods: {
    handleClick() {}
  },
  mounted() {
    console.log(this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>
section {
  padding-bottom: 40px;
}
.el-col-21 {
  margin-top: 12px;
}
</style>

