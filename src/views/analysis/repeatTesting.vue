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
        <div class="floet01 floeatTest">
          <!-- <el-upload
            class="upload-demo"
            :action="actionUrl"
            drag
            :on-change="getFile"
            :http-request="handleHttpRequest"
            :show-file-list="false"
          >
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>-->
        </div>
      </div>
    </div>
    <div style="overflow:hidden;margin-bottom:5px;">
      <el-upload
        class="upload-demo floeatTest"
        :action="actionUrl"
        drag
        :on-change="getFile"
        style="float:left;margin-left:18px;margin-top:10px;"
        :http-request="handleHttpRequest"
        :show-file-list="false"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
      </el-upload>
      <div class="imgDiv" style="margin-left:20px;float:left" v-show="condition.imageUrl">
        <img
          :src="condition.imageUrl"
          style="width:88%;height:245px;margin-left:3%;margin-top:10px;"
        />
      </div>
    </div>
    <div class="w90" :style="obj1" v-loading="imgLoading">
      <div style="margin-left:10px;">
        <div v-for="(item,index) in imageArr" :key="index" class="imgDiv">
          <a :href="item.ProductId" target="_black">
            <img :src="item.ProductId" class="imageSty" />
          </a>
          <span @click="goDetails(item.GoodsCode)">{{item.GoodsCode}}<a style="margin-left:10px;">查看</a></span>
        </div>
      </div>
    </div>
    <el-dialog width="92%" title :visible.sync="innerVisible">
      <el-table :data="arrData"  class="elTableee" border :header-cell-style="getRowClass" max-height="600">
        <el-table-column property="SKU" label="SKU" align="center" width="90"></el-table-column>
        <el-table-column property="skuImageUrl" label="图片" align="center" width="100">
          <template slot-scope="scope">
            <img :src="scope.row.skuImageUrl" style="width:80px;height:80px;display: block;margin: auto">
          </template>
        </el-table-column>
        <el-table-column property="goodscode" label="商品编码" align="center" width="90"></el-table-column>
        <el-table-column property="goodsname" label="商品名称" align="center" width="175"></el-table-column>
        <el-table-column property="SellCount" label="5天销量" align="center" width="80"></el-table-column>
        <el-table-column property="SellCount1" label="10天销量" align="center" width="80"></el-table-column>
        <el-table-column property="SellCount2" label="20天销量" align="center" width="80"></el-table-column>
        <el-table-column property="storeName" label="仓库" align="center" width="80"></el-table-column>
        <el-table-column property="Number" label="库存数量" align="center" width="80"></el-table-column>
        <el-table-column property="ReservationNum" label="占用数量" align="center" width="80"></el-table-column>
        <el-table-column property="usenum" label="可用数量" align="center"  width="80"></el-table-column>
        <el-table-column property="purchase" label="采购" align="center"  width="80"></el-table-column>
        <el-table-column property="GoodsStatus" label="商品状态" align="center"  width="80"></el-table-column>
        <el-table-column property="SalerName" label="开发员" align="center" width="80"></el-table-column>
        <el-table-column property="hopeUseNum" label="预计可用数量" align="center" width="110"></el-table-column>
        <el-table-column property="CreateDate" label="创建时间" align="center" width="100"></el-table-column>
        <el-table-column property="CreateDate" label="SKU名称" align="center" width="100"></el-table-column>
        <el-table-column property="Weight" label="重量" align="center" width="80"></el-table-column>
        <el-table-column property="possessMan1" label="美工" align="center" width="80"></el-table-column>
      </el-table>
    </el-dialog>
  </section>
</template>

<script type="text/ecmascript-6">
import { formImageSearch, formSkuInfo } from "../../api/product";
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
      innerVisible:false,
      imageArr: [],
      arrData:[],
      condition: {
        imageUrl: null
      }
    };
  },
  methods: {
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "color:#337ab7;background:#f5f7fa";
      } else {
        return "";
      }
    },    
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
    goDetails(e) {
      console.log(e);
      var obj = {
        goodsCode: e
      };
      formSkuInfo(obj).then(res => {
        this.arrData=res.data.data
        this.innerVisible=true
      });
    },
    seach() {
      if (this.condition.imageUrl == null) {
        this.$message.error("请输入图片地址");
      } else {
        this.imgLoading = true;
        formImageSearch(this.condition).then(res => {
          if (res.data.code == "200") {
            this.imageArr = res.data.data.Auctions;
          } else {
            this.$message.error("没有匹配到产品");
          }
          this.imgLoading = false;
        });
      }
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
  padding: 12px 6px;
  border-radius: 5px;
}
.w90 {
  width: 100%;
  overflow: hidden;
  margin: auto;
  // margin-top: 15px;
}
.floet {
  overflow: hidden;
}
.imageSty {
  width: 88%;
  margin: auto;
  height: 245px;
  border: #ccc solid 1px;
  transition: transform 0.3s;
  margin-left: 3%;
}
.imageSty:hover {
  // transform: scale(1.1);
  border: #3c8dbc solid 1px;
}
.floet01 {
  float: left;
  margin-right: 15px;
}
.imgDiv {
  width: 20%;
  float: left;
}
.imgDiv span {
  display: block;
  width: 90%;
  text-align: center;
  overflow: hidden;
  color: red;
  font-weight: bold;
  cursor: pointer;
  line-height: 30px;
}
.repa{
  display: block;
  width: 90%;
  overflow: hidden;
  height: 60px;
}
@media screen and (max-width: 1500px) {
  .imageSty {
    width: 92%;
    margin: auto;
    height: 180px;
    border: #ccc solid 1px;
  }
  .w90 {
    width: 100%;
    overflow: hidden;
    margin: auto;
    margin-top: 15px;
  }
}
</style>
<style>
.floeatTest .el-upload-dragger {
  background: #fff;
  width: 310px;
  height: 245px;
}
.floeatTest .el-upload-dragger .el-icon-upload {
  margin: 65px 0 16px;
}
</style>