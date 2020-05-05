<template>
  <div>
    <div class="tabPurChase">
      <el-col :span="24" style="font-size:18px">同步订单差额</el-col>
      <el-col :span="24">
        <el-button type="primary" size="small" style="margin-top:10px;" @click="create()">开始同步</el-button>
      </el-col>
      <el-col :span="24" style="font-size:18px;margin-top:10px">{{title}}</el-col>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getAutoSync } from "../../api/product";
export default {
  data() {
    return {
      loading: false,
      title: ""
    };
  },
  methods: {
    create() {
      this.title = "同步中，请稍等.....";
      getAutoSync().then(res => {
        if (res.data.code == 200) {
          this.title = "同步完成！！！";
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