<template>
  <div class="bg">
    <el-form
      :model="ruleForm2"
      :rules="rules2"
      ref="ruleForm2"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-container"
    >
      <img src="../assets/xiongmao1.png" class="xm1" v-show="if1" />
      <img src="../assets/xiongmao2.png" class="xm2" v-show="if2" />
      <img src="../assets/xiongmao3.png" class="xm1" v-show="if3" />
      <!-- <h3 class="title">UR管理中心</h3> -->
      <div class="floatLeft">
        <div class="bgTop">
          <img src="../assets/yrlogo1.e1e1767.png" />
        </div>
      </div>
      <div class="floatRight">
        <p class="loginGo">欢迎登录</p>
        <span class="bgheight"></span>
        <el-form-item prop="username" class="margin90">
        <el-input type="text" v-model="ruleForm2.username" auto-complete="off" placeholder="账号" @focus="ifshow1">
          <i slot="prefix" class="eladate">
            <img
              src="../assets/logoHeader.png"
              style="width:15px;height:15px;margin-left:2px;margin-top:12px;"
            />
          </i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password" class="margin90">
        <el-input
          type="password"
          v-model="ruleForm2.password"
          auto-complete="off"
          @keyup.enter.native="handleSubmit2"
          @focus="ifshow2"
          placeholder="密码"
        >
          <i slot="prefix" class="eladate">
            <img
              src="../assets/lock.png"
              style="width:15px;height:15px;margin-left:2px;margin-top:12px;"
            />
          </i>
        </el-input>
      </el-form-item>
      <el-checkbox v-model="checked" class="remember" style="color:#fff">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button
          type="primary"
          style="width:85%;margin-left:7.5%;margin-top:30px;margin-bottom:80px;height:50px;"
          @click.native.prevent="handleSubmit2"
          @keyup.enter.native="handleSubmit2"
          :loading="logining"
        >登录</el-button>
      </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logining: false,
      if1:true,
      if2:false,
      if3:false,
      ruleForm2: {
        username: "",
        password: ""
      },
      rules2: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      checked: true
    };
  },
  mounted() {
    if (sessionStorage.getItem("aIndex")) {
      sessionStorage.removeItem("acTi");
      sessionStorage.removeItem("aIndex");
    }
    if (sessionStorage.getItem("ifmenu")) {
      sessionStorage.removeItem("ifmenu");
    }
    this.getCookie();
  },
  methods: {
    ifshow1(){
      this.if1=false
      this.if2=true
      this.if3=false
    },
    ifshow2(){
      this.if1=false
      this.if2=false
      this.if3=true
    },
    // 设置cookie
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date();
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); // 保存天数
      document.cookie =
        "userName=" + c_name + ";path=/;expires=" + exdate.toLocaleString();
      document.cookie =
        "userPwd=" + c_pwd + ";path=/;expires=" + exdate.toLocaleString;
    },
    // 获取cookie
    getCookie() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split(";");
        for (let i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("=");
          if (arr2[0] === "userName") {
            this.ruleForm2.username = arr2[1];
          } else if (arr2[0] === " userPwd") {
            this.ruleForm2.password = arr2[1];
          }
        }
      }
    },
    // 清除cookie
    clearCookie() {
      this.setCookie("", "", -1);
    },
    handleSubmit2() {
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          if (this.checked === true) {
            this.setCookie(this.ruleForm2.username, this.ruleForm2.password, 7);
            this.loading = true;
            this.$store
              .dispatch("LoginByUsername", this.ruleForm2)
              .then(() => {
                this.loading = false;
                sessionStorage.setItem("user", this.ruleForm2.username);
                this.$router.push({ path: "/index" });
              })
              .catch(err => {
                this.$message.error(err);
                this.loading = false;
              });
          } else {
            this.clearCookie();
            this.loading = true;
            this.$store
              .dispatch("LoginByUsername", this.ruleForm2)
              .then(() => {
                this.loading = false;
                sessionStorage.setItem("user", this.ruleForm2.username);
                this.$router.push({ path: "/index" });
              })
              .catch(err => {
                this.$message.error(err);
                this.loading = false;
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.2), 0 1px 0px 0 rgba(0, 0, 0, 0.05);
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -475px;
  margin-top: -292px;
  width: 950px;
  // padding: 25px 35px 25px 35px;
  background:#409EFF;
  // border: 1px solid #eee;
  // box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 10px 5% 35px 0px;
    margin-left: 7.5%;
  }
}
.bg {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url(../assets/bgban.png) no-repeat center;
  background-size: cover;
}
.bgTop {
  margin-left: 82px;
  margin-top:240px;
}
.bgTop img {
  display: block;
  margin: auto;
}
.floatLeft{
  float: left;
}
.floatRight{
  float: right;
  width: 475px;
  background: #fff;
}
.loginGo{
  font-size: 26px;
  width: 100%;
  text-align: center;
  font-weight: normal;
  padding-bottom: 10px;
  margin: 0;
  padding-top: 110px;
}
.margin90{
  width: 85%;
  margin: auto;
  margin-bottom: 20px;
}
.bgheight{
  width: 100px;
  height: 3px;
  margin: auto;
  background: #409EFF;
  display: block;
  margin-bottom: 50px;
  border-radius: 50px;
}
.fottrr{
  font-size: 14px;
  width: 100%;
  text-align: center;
  color: #fff;
  margin-top: 215px;
}
.xm1{
  position: absolute;
  right: 0;
  top: -100px;
  display: block;
}
.xm2{
  position: absolute;
  right: -10px;
  top: -120px;
  display: block;
}
</style>