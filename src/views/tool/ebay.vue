<template>
  <el-form :model='condition' label-width="12rem" class="demo-ruleForm login-container" ref="condition">
    <el-form-item label="卖家账号：" prop="suffix" :rules="[{required: true, message: '请填写字段', trigger: 'blur'}]">
      <el-select v-model="condition.suffix" filterable multiple collapse-tags>
        <el-button plain type="info" @click="selectall">全选</el-button>
        <el-button plain type="info" @click="noselect">取消</el-button>
        <el-option v-for="item in suffix" :key="item.ebaySuffix" :value="item.ebayName"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="商品编码：" prop="goodsCode" :rules="[{required: true, message: '请填写字段', trigger: 'blur'}]">
      <el-input v-model="condition.goodsCode" placeholder="--必填--"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="input" @click="onSubmit(condition)">下载模板</el-button>
    </el-form-item>
  </el-form>
</template>

<script type="text/ecmascript-6">
import { geteBaytemplate, getToolaccount } from '../../api/profit'
export default {
  data() {
    return {
      suffix: [],
      goodsCode: '',
      condition: {
        suffix: [],
        goodsCode: ''
      }
    }
  },
  methods: {
    selectall() {
      const allValues = []
      for (const item of this.suffix) {
        allValues.push(item.ebaySuffix)
      }
      this.condition.suffix = allValues
    },
    noselect() {
      this.condition.suffix = []
    },
    onSubmit(form) {
      this.$refs.condition.validate(valid => {
        if (valid) {
          geteBaytemplate(form).then(response => {
            if (response.data.byteLength > 42) {
              const blob = new Blob([response.data], {
                type: 'application/vnd.ms-excel;charset=UTF-8'
              })
              const downloadElement = document.createElement('a')
              const objectUrl = window.URL.createObjectURL(blob)
              downloadElement.href = objectUrl
              const date = new Date()
              const year = date.getFullYear()
              let month = date.getMonth() + 1
              let strDate = date.getDate()
              let hour = date.getHours()
              let minute = date.getMinutes()
              let second = date.getSeconds()
              if (month >= 1 && month <= 9) {
                month = '0' + month
              }
              if (strDate >= 0 && strDate <= 9) {
                strDate = '0' + strDate
              }
              if (hour >= 0 && hour <= 9) {
                hour = '0' + hour
              }
              if (minute >= 0 && minute <= 9) {
                minute = '0' + minute
              }
              if (second >= 0 && second <= 9) {
                second = '0' + second
              }
              const filename =
                'ebay_' + year + month + strDate + hour + minute + second
              downloadElement.download = filename + '.xls'
              document.body.appendChild(downloadElement)
              downloadElement.click()
              document.body.removeChild(downloadElement)
            } else {
              alert('商品编码不匹配！')
            }
          })
        }
      })
    }
  },
  mounted() {
    getToolaccount({ type: 'eBay' }).then(response => {
      this.suffix = response.data.data
    })
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 8rem auto;
  width: 40rem;
  padding: 6rem 2rem 2rem 4.5rem;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .el-form-item {
    margin-bottom: 4rem;
    .el-input {
      width: 18rem;
    }
    .el-button {
      margin-left: 3rem;
    }
  }
}
</style>

