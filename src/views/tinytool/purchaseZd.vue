<template>
  <div>
    <div class="tabPurChase">
      <el-col :span="24" style="font-size:18px">自动审核订单</el-col>
      <el-col :span="24">
        <el-button type="primary" size="small" style="margin-top:10px;" @click="create()">开始审核</el-button>
      </el-col>
      <el-col :span="24" style="font-size:18px;margin-top:10px">{{title}}</el-col>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getChecking } from "../../api/product";
export default {
  data() {
    return {
      loading: false,
      title: ""
    };
  },
  methods: {
    create() {
      this.title = "审核中，请稍等.....";
      getChecking().then(res => {
        if (res.data.code == 200) {
          this.title = "审核完成！！！";
        }
      });
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.tabPurChase {
  overflow: hidden;
  padding: 10px 15px;
}
</style>