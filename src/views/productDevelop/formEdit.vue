<template>
  <section>
    <el-tabs v-model="activeName"
             type="card"
             @tab-click="handleClick" style="margin-top: 0px;">
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
<script type="text/ecmascript-6">
import { APIPlatInfo, APISaveWishInfo } from '../../api/product'
import { getMenu } from '../../api/login'
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
      activeName: 'first',
      allMenu:[],
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
  },
  mounted() {
   
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
.el-col {
  padding: 10px;
}
.adClass{
  display: block;
  float: left;
  padding: 14px 30px;
  border-right: 1px solid #e4e7ed;
  cursor: pointer;
}
.actie{
  color: #409EFF;
}
.adClass:hover{
  color: #409EFF;
}
</style>

