<template>
  <section class="tabheught" :style="obj">
    <div class="w95">
      <div class="floet">
        <div class="floet01" style="margin-left:5px;">
          <el-input
            v-model="condition.imageUrl"
            size="small"
            placeholder="请输入图片URL地址"
            style="width:550px;"
          ></el-input>
        </div>
        <div class="floet01">
          <el-button size="small" type="primary" @click="seach">搜索</el-button>
        </div>
        <div class="floet01">
          <el-upload
            class="upload-demo"
            :action="actionUrl"
            :on-change="getFile"
            :http-request="handleHttpRequest"
            :show-file-list="false"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </div>
      </div>
    </div>
    <div style="margin-top:10px;">
      <div class="imgDiv" style="margin-left:10px;">
        <img :src="condition.imageUrl" class="imageSty" />
      </div>
    </div>
    <div class="w90" :style="obj1" v-loading="imgLoading">
      <div style="margin-left:10px;">
        <div v-for="(item,index) in imageArr" :key="index" class="imgDiv">
          <img :src="item.PicName" class="imageSty" />
        </div>
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
import { formImageSearch } from "../../api/product";
export default {
  data() {
    return {
      actionUrl: "",
      obj: {
        height: window.innerHeight - 60 + "px"
      },
      obj1: {
        height: window.innerHeight - 145 + "px"
      },
      imgLoading: false,
      imageArr: [],
      condition: {
        imageUrl: null
      }
    };
  },
  methods: {
    handleHttpRequest() {},
    getBase64(file) {
      //把图片转成base64编码
      return new Promise(function(resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function() {
          imgResult = reader.result;
        };
        reader.onerror = function(error) {
          reject(error);
        };
        reader.onloadend = function() {
          resolve(imgResult);
        };
      });
    },
    getFile(file, fileList) {
      //上传头像
      this.getBase64(file.raw).then(res => {
        this.condition.imageUrl = res;
        formImageSearch(this.condition).then(res => {
        this.imageArr = res.data.data.Auctions;
        this.imgLoading = false;
      });
      });
    },
    seach() {
      this.imgLoading = true;
      formImageSearch(this.condition).then(res => {
        this.imageArr = res.data.data.Auctions;
        this.imgLoading = false;
      });
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.tabheught {
  background: #eee;
  overflow: hidden;
}
.w95 {
  width: 100%;
  overflow: hidden;
  background: #fff;
  padding: 15px 6px;
  border-radius: 5px;
}
.w90 {
  width: 100%;
  overflow: hidden;
  margin: auto;
  margin-top: 15px;
}
.floet {
  overflow: hidden;
}
.imageSty {
  width: 92%;
  margin: auto;
  height: 250px;
  border: #ccc solid 1px;
  margin-bottom: 10px;
}
.floet01 {
  float: left;
  margin-right: 15px;
}
.imgDiv {
  width: 20%;
  float: left;
}
@media screen and (max-width: 1500px) {
  .imageSty {
    width: 92%;
    margin: auto;
    height: 180px;
    border: #ccc solid 1px;
    margin-bottom: 10px;
  }
}
</style>