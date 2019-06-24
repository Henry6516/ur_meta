<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col class="logo" :class="!collapsed?'logo-collapse-width':'logo-width'">
        {{!collapsed?'':sysName}}
      </el-col>
      <el-col :span="1">
        <div class="tools" @click.prevent="collapse">
          <i class="fa fa-align-justify"></i>
        </div>
      </el-col>
      <el-col :span="15" class="menuCon">
        <el-menu :default-active="activeIndex" @select="handleSelect" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
          <el-menu-item index="/index" style="line-height:5rem;"><font class="typeface">主页</font></el-menu-item>
          <el-submenu v-for="(item,position) in allMenu" :index="generateIndex(-1,position)" :key="generateIndex(-1,position)">
            <template slot="title">
              <font class="typeface">{{item.name}}</font>
            </template>
            <el-menu-item v-for="(child,index) in item.children" :index="child.route" :key="generateIndex(position,index)">{{child.name}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="3" class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner">
            {{sysUserName}}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>我的消息</el-dropdown-item>
            <el-dropdown-item @click.native="dialogVisible=true">设置头像</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span class="el-dropdown-link userinfo-inner">
          <img :src="image">
        </span>
      </el-col>
      <el-dialog :visible.sync="dialogVisible">
        <div class="pan-item" @click="imagecropperShow = true" :style="{zIndex:zIndex,height:height,width:width}">
          <div class="pan-info">
            <div class="pan-info-roles-container">
              <slot></slot>
            </div>
          </div>
          <img class="pan-thumb" :src="image">
          <el-button round plain type="success" style="font-size:18px;margin-left:130px;margin-top:40px;">
            修改头像
          </el-button>
        </div>
        <hr style="border:1px solid #f0f0f0;">
        <el-form :inline="true" :model="ValidateForm" status-icon ref="ValidateForm" class="demo-dynamic">
          <el-form-item prop="email" label="邮箱" :rules="[
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type:'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ]" class="lab">
            <el-input v-model="ValidateForm.email"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit('ValidateForm')">提交</el-button>
        </span>
      </el-dialog>
      <image-cropper ref="cropper" :width="300" :height="300" :url="url" @close='close' @crop-upload-success="cropSuccess" langType="en" :key="imagecropperKey" v-show="imagecropperShow"></image-cropper>
    </el-col>
    <el-col :span="24" class="main">
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'" v-show="collapsed">
        <!--导航菜单-->
        <el-menu :default-active="activeIndex" @select="handleSelect1" class="el-menu-vertical-demo" router>
          <el-submenu v-for="item in asideMenu.menu" :index="generateIndex(-1, asideMenu.position)" :key="generateIndex(-1, asideMenu.position)">
            <template slot="title">{{item.name}} </template>
            <el-menu-item v-for="(child,index) in item.children" :index="child.route" :key="generateIndex(asideMenu.position,index)" style="line-height:48px;height:48px;">{{child.name}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </aside>
      <section class="content-container" :class="collapsed?'content-container1':'content-container2'">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script type="text/ecmascript-6">
import { removeToken } from '../utils/auth'
import { getMenu } from '../api/login'
import { getAvatarUrl } from '../api/api'
import ImageCropper from '@/components/ImageCropper'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'avatarUpload-demo',
  components: { ImageCropper },
  props: {
    zIndex: {
      type: Number,
      default: 1
    },
    width: {
      type: String,
      default: '100px'
    },
    height: {
      type: String,
      default: '100px'
    }
  },
  data() {
    return {
      ValidateForm: {
        email: ''
      },
      dialogVisible: false,
      activeIndex: '',
      allMenu: [],
      asideMenu: { position: 0, menu: [{ name: '', children: [] }] },
      openeds: ['1'],
      url: getAvatarUrl(),
      imagecropperShow: false,
      imagecropperKey: 0,
      image: '',
      sysName: 'UR管理中心',
      collapsed: true,
      sysUserName: '',
      sysUserAvatar: '',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  computed: {
      ...mapGetters(['menu'])
  },
  mounted() {
    this.$store.dispatch('GetUserInfo').then(() => {
      this.sysUserName = this.$store.getters.name
      this.image = this.$store.getters.avatar
      this.ValidateForm.email=this.$store.getters.email
    })
    const ifmenu = sessionStorage.getItem('ifmenu')
    if(!ifmenu){
      getMenu().then(response => {
      let arrDat=response.data.data
      this.GetMenu(arrDat)
      this.allMenu = response.data.data
      this.allMenu.splice(0, 1)
      let checkedIdStr = JSON.stringify(this.allMenu);
      sessionStorage.setItem('ifmenu',checkedIdStr)
     })
    }else{
      this.allMenu=JSON.parse(sessionStorage.getItem("ifmenu"));
    }
    this.showMenu()
    if(this.$route.path=='/index'){
      this.collapsed = false
    }
  },
//  beforeRouteLeave(to, from, next) {
//    if (to.name === '首页') {
//      const collapsed = JSON.stringify(this.collapsed)
//      sessionStorage.setItem('collapsed', collapsed)
//    } else {
//      sessionStorage.removeItem('collapsed')
//    }
//    next()
//  },
  created() {
    // 从localStorage中读取条件并赋值给查询表单
    const collapsed = sessionStorage.getItem('collapsed')
    if (collapsed != null) {
      this.collapsed = JSON.parse(collapsed)
    }
  },
  methods: {
    ...mapActions( // 语法糖
          ['GetMenu'] // 相当于this.$store.dispatch('GetMenu'),提交这个方法
    ),
    showMenu(){
      if(sessionStorage.getItem('acTi')){
        this.activeIndex=sessionStorage.getItem('acTi')
      }
      if(sessionStorage.getItem('aIndex')) {
        const asideIndex = sessionStorage.getItem('aIndex')
        const allMenu = this.allMenu
        this.asideMenu = { position: asideIndex, menu: [allMenu[asideIndex]] }
      }
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    generateIndex(head, tail) {
      if (head < 0) {
        return String(tail + 1)
      }
      return String(head + 1) + '-' + String(tail + 1)
    },
    handleSelect1(index, indexPath){
      this.activeIndex = index
      sessionStorage.setItem('acTi',index)
      if(sessionStorage.getItem('judge')){
        sessionStorage.removeItem('judge')
      }
      if(sessionStorage.getItem('fixname')){
        sessionStorage.removeItem('fixname')
      }
      if(sessionStorage.getItem('judgeCollection')){
        sessionStorage.removeItem('judgeCollection')
      }
      sessionStorage.removeItem('sepage')
      sessionStorage.removeItem('sepagePic')
      sessionStorage.removeItem('sepageInfo')
    },
    handleSelect(index, indexPath) {
      if(sessionStorage.getItem('judge')){
        sessionStorage.removeItem('judge')
      }
      if(sessionStorage.getItem('fixname')){
        sessionStorage.removeItem('fixname')
      }
      if(sessionStorage.getItem('judgeCollection')){
        sessionStorage.removeItem('judgeCollection')
      }
      if (index === '/index') {
        this.collapsed = false
        sessionStorage.removeItem('acTi')
        sessionStorage.removeItem('aIndex')
        return
      }
      this.activeIndex = index
      this.collapsed = true
//      if(sessionStorage.getItem('aIndex')) {
//        var asideIndex = sessionStorage.getItem('aIndex')
//      }
      var asideIndex = parseInt(indexPath[0]) - 1
      sessionStorage.setItem('acTi',this.activeIndex)
      sessionStorage.setItem('aIndex',asideIndex)
      const allMenu = this.allMenu
      this.asideMenu = { position: asideIndex, menu: [allMenu[asideIndex]] }
    },
    cropSuccess(resData) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      const image = resData.data[0]
      this.image = image
    },
    close() {
      this.imagecropperShow = false
    },
    logout: function() {
      var _this = this
      this.$confirm('确认退出吗?', '提示', {
        type: 'warning'
      })
        .then(() => {
          sessionStorage.removeItem('user')
          removeToken()
          _this.$router.push('/login')
        })
        .catch(() => {})
    },
    // 折叠导航栏
    collapse: function() {
      this.collapsed = !this.collapsed
    }
  }
}
</script>

<style>
.lab .el-form-item__label{
  font-size: 18px;
  color: #969696;
  margin-top: -20px;
  margin-right: 70px;
}
@media screen and (max-width: 1452px) {
  .menuCon .el-submenu__title{
    padding: 0 0;
  }
}
</style>

<style lang="scss" scoped >
@import "~scss_vars";
 .typeface{
  font-size: 16px;
 } 
.pan-item {
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}
.pan-info-roles-container {
  padding: 20px;
  text-align: center;
}
.pan-thumb {
  width: 100%;
  height: 100%;
  background-size: 100%;
  border-radius: 50%;
  overflow: hidden;
  position: absolute;
}
.pan-info {
  position: absolute;
  width: inherit;
  height: inherit;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: inset 0 0 0 5px rgba(0, 0, 0, 0.05);
}
@media (max-width: 1152px){
  .header {
    height: 5rem;
    line-height: 5rem;
    background-color: #545c64;
    color: #fff;
    .el-col-3 {
      height: 5rem;
      .el-dropdown {
        line-height: 0rem;
      }
    }
    .userinfo {
      text-align: right;
      padding-right: 0rem;
      float: right;
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        img {
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
          margin: 0.5rem 0rem 0rem 0.5rem;
          float: right;
        }
        .hiddenInput {
          display: none;
        }
      }
    }
    .logo {
      text-align: center;
      height: 5rem;
      font-size: 18px;
      border-color: rgba(238, 241, 146, 0.3);
      border-right-width: 0.1rem;
      border-right-style: solid;
    }
    .logo-width {
      width: 15rem;
    }
    .logo-collapse-width {
      width: 0rem;
    }
    .tools {
      padding: 0rem 2rem;
      width: 1.4rem;
      height: 5rem;
      line-height: 5rem;
      cursor: pointer;
    }
  }
  .main {
    display: flex;
    position: absolute;
    top: 5rem;
    bottom: 0rem;
    overflow: hidden;
    aside {
      flex: 0 0 15rem;
      width: 15rem;
      .el-menu {
        height: 100%;
      }
      .el-menu-item {
        min-width: 15rem;
        padding-left: 5rem !important;
      }
      .data-scroll-width {
        width: 15rem;
      }
      .collapsed {
        .item {
          position: relative;
        }
        .submenu {
          position: absolute;
          top: 0rem;
          z-index: 99999;
          height: auto;
        }
      }
    }
    .menu-expanded {
      flex: 0 0 15rem;
      width: 15rem;
    }
    .content-container1 {
      flex: 1;
      position: absolute;
      right: 0rem;
      top: 0rem;
      bottom: 0rem;
      left: 15rem;
      overflow: auto;
      padding: 0rem !important; //二次修改
      .grid-content .bg-purple-light {
        overflow: auto;
      }
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
    .content-container2 {
      flex: 1;
      position: absolute;
      right: 0rem;
      top: 0rem;
      bottom: 0rem;
      left: 0rem;
      overflow: auto;
      padding: 0rem !important; //二次修改
      .grid-content .bg-purple-light {
        overflow: auto;
      }
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}
.container {
  position: absolute;
  top: 0rem;
  bottom: 0rem;
  width: 100%;
  @media (min-width: 1152px){
  .header {
    height: 5rem;
    line-height: 5rem;
    background-color: #545c64;
    color: #fff;
    .el-col-3 {
      height: 5rem;
      .el-dropdown {
        line-height: 0rem;
      }
    }
    .userinfo {
      text-align: right;
      padding-right: 2.5rem;
      float: right;
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        img {
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
          margin: 0.5rem 0rem 0rem 0.5rem;
          float: right;
        }
        .hiddenInput {
          display: none;
        }
      }
    }
    .logo {
      text-align: center;
      height: 5rem;
      font-size: 22px;
      border-color: rgba(238, 241, 146, 0.3);
      border-right-width: 0.1rem;
      border-right-style: solid;
    }
    .logo-width {
      width: 20rem;
    }
    .logo-collapse-width {
      width: 0rem;
    }
    .tools {
      padding: 0rem 2rem;
      width: 1.4rem;
      height: 5rem;
      line-height: 5rem;
      cursor: pointer;
    }
  }
  .main {
    display: flex;
    position: absolute;
    top: 5rem;
    bottom: 0rem;
    overflow: hidden;
    aside {
      flex: 0 0 20rem;
      width: 20rem;
      // overflow-y: auto;
      // overflow-x: hidden;
      .el-menu {
        height: 100%;
      }
      .el-menu-item {
        min-width: 20rem;
        padding-left: 5rem !important;
      }
      .data-scroll-width {
        width: 20rem;
      }
      .collapsed {
        .item {
          position: relative;
        }
        .submenu {
          position: absolute;
          top: 0rem;
          z-index: 99999;
          height: auto;
        }
      }
    }
    .menu-expanded {
      flex: 0 0 20rem;
      width: 20rem;
    }
    .content-container1 {
      flex: 1;
      position: absolute;
      right: 0rem;
      top: 0rem;
      bottom: 0rem;
      left: 20rem;
      overflow: auto;
      padding: 0rem !important; //二次修改
      .grid-content .bg-purple-light {
        overflow: auto;
      }
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
    .content-container2 {
      flex: 1;
      position: absolute;
      right: 0rem;
      top: 0rem;
      bottom: 0rem;
      left: 0rem;
      overflow: auto;
      padding: 0rem !important; //二次修改
      .grid-content .bg-purple-light {
        overflow: auto;
      }
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
 }
}
@media (max-width: 1200px){
 .typeface{
  font-size: 15px;
 } 
}
</style>