<template>
  <section>
    <el-row>
      <el-col :span="24" style="position: fixed;z-index: 999;overflow: hidden;border-bottom: #e4e7ed solid 1px; background: #eee;padding: 0">
        <span @click="attribute()" class="adClass">属性信息</span>
        <span @click="photo()" class="adClass">图片信息</span>
        <span @click="platform()" class="adClass actie">平台信息</span>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName"
             type="card"
             @tab-click="handleClick" style="margin-top: 48px;">
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
    attribute(){
      sessionStorage.setItem('judge', "属性信息")
      this.$router.push({
        path: `/v1/oa-goodsinfo/index`
      })
    },
    photo(){
      sessionStorage.setItem('judge', "图片信息")
      this.$router.push({
        path: `/v1/oa-goodsinfo/index`
      })
    },
    platform(){
      sessionStorage.setItem('judge', "平台信息")
      this.$router.push({
        path: `/v1/oa-goodsinfo/index`
      })
    },
    handleClick() {}
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

