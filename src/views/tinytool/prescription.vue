<template>
  <div>
    <el-col :span="24" style="padding:10px 20px;">
      <el-button @click="cancelAll" type="primary">开始标记</el-button>
    </el-col>
    <el-table
      :data="data"
      style="width:98%;margin:auto"
      v-loading="listLoading"
      v-show="showIFif"
      class="elTableForm"
      element-loading-text="正在标记中..."
      empty-text="当前无标记到数据"
    >
      <el-table-column prop="tradeNid" label="订单编号"></el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
import { getExpressExpired } from "../../api/profit";
export default {
  data() {
    return {
      data: [],
      showIFif: false,
      listLoading: false
    };
  },
  mounted() {},
  methods: {
    cancelAll() {
      this.showIFif = true;
      this.listLoading = true;
      getExpressExpired().then(response => {
        this.listLoading = false;
        this.showIFif = true;
        this.data = response.data.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.toolbar {
  padding: 10px;
}
</style>


