<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="ruleForm2.username" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="ruleForm2.password" auto-complete="off" @keyup.enter.native="handleSubmit2" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" @keyup.enter.native="handleSubmit2" :loading="logining">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      logining: false,
      ruleForm2: {
        username: '',
        password: ''
      },
      rules2: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      checked: true
    }
  },
  mounted() {
    this.getCookie()
  },
  methods: {
    // 设置cookie
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date()
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays)// 保存天数
      document.cookie = 'userName=' + c_name + ';path=/;expires=' + exdate.toLocaleString()
      document.cookie = 'userPwd=' + c_pwd + ';path=/;expires=' + exdate.toLocaleString
    },
    // 获取cookie
    getCookie() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split(';')
        console.log(arr)
        for (let i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split('=')
          if (arr2[0] === 'userName') {
            this.ruleForm2.username = arr2[1]
          } else if (arr2[0] === ' userPwd') {
            this.ruleForm2.password = arr2[1]
          }
        }
      }
    },
    // 清除cookie
    clearCookie() {
      this.setCookie('', '', -1)
    },
    handleSubmit2() {
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          if (this.checked === true) {
            this.setCookie(this.ruleForm2.username, this.ruleForm2.password, 7)
            this.loading = true
            this.$store.dispatch('LoginByUsername', this.ruleForm2).then(() => {
              this.loading = false
              sessionStorage.setItem('user', this.ruleForm2.username)
              this.$router.push({ path: '/index' })
            }).catch(err => {
              this.$message.error(err)
              this.loading = false
            })
          } else {
            this.clearCookie()
            this.loading = true
            this.$store.dispatch('LoginByUsername', this.ruleForm2).then(() => {
              this.loading = false
              sessionStorage.setItem('user', this.ruleForm2.username)
              this.$router.push({ path: '/index' })
            }).catch(err => {
              this.$message.error(err)
              this.loading = false
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>