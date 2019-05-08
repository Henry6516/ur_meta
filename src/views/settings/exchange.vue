<template>
  <el-form :inline="true" :model="condition" class="demo-form-inline" label-width="12rem">
    <el-form-item label="销售汇率">
      <el-input v-model="condition.salerRate" :placeholder="condition.salerRate"></el-input>
    </el-form-item>
    <br>
    <el-form-item label="其他部门开发汇率">
      <el-input v-model="condition.devRate" :placeholder="condition.devRate"></el-input>
    </el-form-item>
    <br>
    <el-form-item label="运营一部开发汇率">
      <el-input v-model="condition.devRate1" :placeholder="condition.devRate1"></el-input>
    </el-form-item>
    <br>
    <el-form-item label="运营五部开发汇率">
      <el-input v-model="condition.devRate5" :placeholder="condition.devRate5"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { getUpdateexchange, getExchange } from '../../api/profit'
export default {
  data() {
    return {
      placeholderd: '',
      placeholders: '',
      condate:[],
      condition: {
        devRate: '',
        salerRate: '',
        devRate1:'',
        devRate5 :''
      }
    }
  },
  methods: {
    onSubmit() {
      getUpdateexchange(this.condition).then(response => {
        if (response.data.code === 200) {
          this.$message({
                message: "更新汇率成功",
                type: "success"
              });
        } else {
         this.$message.error(response.data.message);
        }
      })
    },
  },
  mounted() {
    getExchange().then(response => {
      this.condition=response.data.data
    })
  }
}
</script>

<style scoped lang="scss">
.el-form {
  margin-top: 1rem;
}
</style>