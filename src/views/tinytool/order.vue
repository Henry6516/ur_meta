<template>
  <el-form :inline="true" :rules="rules" ref="form" :model="condition" class="toolbar" label-width="150px">
    <el-form-item label="订单编号" prop="order_id">
      <el-input size="small" v-model="condition.order_id" placeholder="多个订单用逗号隔开"></el-input>
    </el-form-item>
    <el-form-item label="申报价总和" prop="declared_value">
      <el-input size="small" v-model.number="condition.declared_value" placeholder="默认为2(美元)"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button size="small" type="primary" @click="onSubmit">确定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getOrder } from '../../api/profit'
export default {
  data() {
    return {
      condition: {
        order_id: '',
        declared_value: null
      },
      rules: {
        order_id: [
          { required: true, message: '请输入订单编码', trigger: 'blur' }
        ],
        declared_value: [
          { type: 'number', message: '必须为数字值' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          getOrder(this.condition).then(res => {
            if (res.data.code === 200) {
              this.$confirm('成功!', '提示', {
                confirmButtonText: '确定',
                type: 'success'
              })
            } else {
              this.$confirm('无效的订单编号或订单异常！', '提示', {
                confirmButtonText: '确定',
                type: 'error'
              })
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.toolbar{
  padding: 10px;
}
</style>

