<template>
  <div>
    <el-col
      :span="24"
      style="position: fixed; bottom:0; z-index:999;background: #f2f2f2;padding: 15px 0; padding-top:12px; border-top: #eee solid 1px;"
    >
      <el-col :span="10" :offset="6">
        <el-button @click="keep()" type="primary">保存当前数据</el-button>
        <el-button type="success" @click="keepWs()">保存并完善</el-button>
        <el-button @click="exportJoom()" type="warning">导出Joom模板</el-button>
      </el-col>
    </el-col>
    <el-col :span="24" style="padding: 0;">
      <h3 class="toolbar essential">基本信息</h3>
    </el-col>
    <div class="w98">
      <el-col :span="24">
        <el-col :span="8" class="top15">
          <el-col :span="4" class="titCenter">标题</el-col>
          <el-col :span="18">
            <el-input v-model="editForm.proName" clearable></el-input>
          </el-col>
        </el-col>
        <el-col :span="8" class="top15">
          <el-col :span="4" class="titCenter">标签</el-col>
          <el-col :span="18">
            <el-input v-model="editForm.tags" clearable></el-input>
          </el-col>
        </el-col>
        <el-col :span="8" class="top15">
          <el-col :span="4" class="titCenter">商品编码</el-col>
          <el-col :span="18">
            <el-input v-model="editForm.goodsCode" clearable></el-input>
          </el-col>
        </el-col>
      </el-col>
      <el-col :span="24">
        <el-col :span="8" class="top15">
          <el-col :span="4" class="titCenter">主类目</el-col>
          <el-col :span="18">
            <el-select
              v-model="editForm.cat"
              clearable
              @change="productcategory"
              style="width:100%;"
            >
              <el-option v-for="item in cate" :value="item" :key="item"></el-option>
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="8" class="top15">
          <el-col :span="4" class="titCenter">子类目</el-col>
          <el-col :span="18">
            <el-select v-model="editForm.subCat" clearable style="width:100%;">
              <el-option v-for="item in subCate" :value="item" :key="item"></el-option>
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="8" class="top15">
          <el-col :span="4" class="titCenter">特殊属性</el-col>
          <el-col :span="18">
            <el-select v-model="editForm.spAttribute" clearable style="width: 100%">
              <el-option
                v-for="(item, key) in specificity"
                :key="item.key"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-col>
        </el-col>
      </el-col>
    </div>
    <el-col :span="24">
      <el-col :span="1" class="titCenter top15" style="text-align: center;margin-left:23px;">描述</el-col>
      <el-col :span="22">
        <el-input
          type="textarea"
          :rows="14"
          v-model="editForm.description"
          style="width:98%;margin-left:10px;;margin-top:15px;"
        ></el-input>
      </el-col>
    </el-col>
    <el-col :span="24" style="padding: 0;">
      <h3 class="toolbar essential">图片信息</h3>
    </el-col>
    <div class="w98">
      <el-col :span="24" style="margin-top:15px;">
        <el-col :span="4" style="margin-left: 15px">
          <a
            :href="editForm.mainImage"
            target="_blank"
            style="display: block; width: 205px;height: 205px"
          >
            <img :src="editForm.mainImage" style="display: block; width: 205px;height: 205px" />
          </a>
        </el-col>
        <el-col :span="17">
          <el-col :span="3" class="textZt">主图</el-col>
          <el-col :span="21">
            <el-input v-model="editForm.mainImage"></el-input>
          </el-col>
          <el-col :span="3" class="textZt" style="margin-top: 15px"></el-col>
        </el-col>
      </el-col>
      <el-col style="margin-bottom: 10px;margin-top: 10px" :span="24">
        <span
          @click="sIs()"
          style="padding: 10px 20px;background: #409EFF;color: #fff;cursor: pointer;display: block;width: 70px;padding-left:10px;text-align: center;margin-left: 15px"
        >
          <i :class="[shoIS?'el-icon-minus':'el-icon-plus']" style="margin-right: 5px"></i>附加图
        </span>
      </el-col>
      <el-col :span="24">
        <el-col
          :span="12"
          style="margin-top: 15px;margin-bottom: 2px"
          v-for="(item,index) in url"
          :key="index"
          v-show="shoIS"
        >
          <el-col :span="19">
            <el-col :span="24">
              <el-input v-model="url[index]" @input="revise($event,index)"></el-input>
            </el-col>
            <el-col>
              <p class="sx" @click="botIndex(index)">
                <i class="el-icon-arrow-down"></i>下移动
              </p>
              <p class="sx" @click="topIndex(index)">
                <i class="el-icon-arrow-up"></i>上移动
              </p>
              <!-- <p class="sx" @click="delDz(index)">
                <i class="el-icon-delete"></i>删除
              </p>-->
              <p class="ss">#{{index+1}}</p>
            </el-col>
          </el-col>
          <el-col :span="3" style="margin-left: 15px">
            <a :href="url[index]" target="_blank">
              <img :src="url[index]" style="display: block;width: 90px;height: 90px" />
            </a>
          </el-col>
        </el-col>
      </el-col>
    </div>
    <el-col :span="24" style="padding: 0;">
      <h3 class="toolbar essential">
        多属性信息
        <span
          style="float:right;margin-right: 15px;font-size: 14px;margin-bottom: 15px;display: block"
        >
          共{{skuTotal}}条
          <span style="margin-left: 15px">第1-{{skuTotal}}条数据</span>
        </span>
      </h3>
    </el-col>
    <el-col style="margin-top:5px;">
      <el-table :data="tableData" border style="width:98%;margin-left:1%;" max-height="1300"  v-loading="listLoading">
        <!-- <el-table-column type="selection" width="30" align="center" header-align="center"></el-table-column> -->
        <el-table-column type="index" width="50" align="center" header-align="center"></el-table-column>
        <el-table-column label="操作" width="50" header-align="center" align="center">
          <template slot-scope="scope">
            <el-tooltip content="删除">
              <i
                class="el-icon-delete"
                @click="del(scope.$index, scope.row)"
                style="color:#409EFF;cursor:pointer;"
              ></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="唯一编码" prop="childId" header-align="center" min-width="130">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.childId"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="颜色" prop="color" header-align="center">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.color"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="尺码" prop="proSize" header-align="center">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.proSize"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="库存" prop="quantity" header-align="center">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.quantity"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="价格" prop="price" header-align="center">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.price"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="MSR价格" prop="msrPrice" header-align="center">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.msrPrice"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="运费" prop="shipping" header-align="center">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.shipping"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="重量" prop="shippingWeight" header-align="center">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.shippingWeight"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="配送时长" prop="shippingTime" header-align="center">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.shippingTime"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="主图" prop="varMainImage" header-align="center">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.varMainImage"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="图片" prop="varMainImage" header-align="center">
          <template slot-scope="scope">
            <img
              :src="scope.row.varMainImage"
              style="width:50px;height:50px;display: block;margin: auto"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <div class="w98">
      <el-col :span="24" style="margin-top:15px;">
        <el-col :span="3">
          <el-col :span="14">
            <el-input placeholder="新增行数" class="font12" size="small" v-model="rows"></el-input>
          </el-col>
          <el-col :span="9" class="boderrtb font12">
            <span @click="addClomun()" class="spBlock">行数</span>
          </el-col>
        </el-col>
        <el-col :span="3">
          <el-col :span="14">
            <el-input placeholder="库存设置" class="font12" size="small" v-model="stock"></el-input>
          </el-col>
          <el-col :span="9" class="boderrtb font12">
            <span @click="modifystock()" class="spBlock">库存</span>
          </el-col>
        </el-col>
        <el-col :span="5">
          <el-col :span="7">
            <el-select v-model="sign" size="small">
              <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-col>
          <el-col :span="9">
            <el-input placeholder="设置价格" class="font12" size="small" v-model="price"></el-input>
          </el-col>
          <el-col :span="7" class="boderrtb font12">
            <span @click="modifyprice()" class="spBlock">价格</span>
          </el-col>
        </el-col>
        <el-col :span="3">
          <el-col :span="14">
            <el-input placeholder="运费设置" class="font12" size="small" v-model="freight"></el-input>
          </el-col>
          <el-col :span="9" class="boderrtb font12">
            <span @click="modifyfreight()" class="spBlock">运费</span>
          </el-col>
        </el-col>
        <el-col :span="3">
          <el-col :span="14">
            <el-input placeholder="零售价" class="font12" size="small" v-model="retail"></el-input>
          </el-col>
          <el-col :span="9" class="boderrtb font12">
            <span @click="modifyretail()" class="spBlock">零售</span>
          </el-col>
        </el-col>
        <el-col :span="3">
          <el-col :span="14">
            <el-input placeholder="运输时间" class="font12" size="small" v-model="delivery"></el-input>
          </el-col>
          <el-col :span="9" class="boderrtb font12">
            <span @click="modifydelivery()" class="spBlock">配送</span>
          </el-col>
        </el-col>
        <el-col :span="3">
          <el-col :span="14">
            <el-input placeholder="重量设置" class="font12" size="small" v-model="weight"></el-input>
          </el-col>
          <el-col :span="9" class="boderrtb font12">
            <span @click="modifyweight" class="spBlock">重量</span>
          </el-col>
        </el-col>
      </el-col>
    </div>
    <el-col style="width:100%;height:80px;"></el-col>
  </div>
</template>

<script type="text/ecmascript-6">
import { getMenu } from "../../api/login";
import {
  APIMineInfo,
  APIMineSave,
  APIDeleteDetail,
  APISaveAndFinish,
  APIMineExport
} from "../../api/product";
import {
  getAttributeInfoSpecialAttribute,
  getAttributeInfoCat,
  getAttributeInfoSubCat
} from "../../api/profit";
export default {
  data() {
    return {
      specificity: [],
      rows: 1,
      mainCategory: [],
      editForm: [],
      category: [],
      disabled: true,
      skuTotal: 0,
      shoIS: false,
      listLoading:false,
      stock: null,
      price: null,
      sign: "=",
      freight: null,
      retail: null,
      options: ["=", "+", "-", "*", "/"],
      delivery: null,
      weight: null,
      cate: [],
      url: [],
      tableData: [],
      subCate: [],
      condition: {
        id: null
      }
    };
  },
  methods: {
    exportJoom() {
      const arrId = [];
      arrId.push(this.condition.id);
      let objStr1 = {
        id: arrId
      };
      APIMineExport(objStr1).then(res => {
        const blob = new Blob([res.data], {
          type: "data:text/csv;charset=utf-8"
        });
        const downloadElement = document.createElement("a");
        const objectUrl = window.URL.createObjectURL(blob);
        downloadElement.href = objectUrl;
        const date = new Date();
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        if (hour >= 0 && hour <= 9) {
          hour = "0" + hour;
        }
        if (minute >= 0 && minute <= 9) {
          minute = "0" + minute;
        }
        if (second >= 0 && second <= 9) {
          second = "0" + second;
        }
        const filename =
          "joom_" + year + month + strDate + hour + minute + second;
        downloadElement.download = filename + ".csv";
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);
      });
    },
    keepWs() {
      let imgStr = {
        extraImage1: this.url[0],
        extraImage2: this.url[1],
        extraImage3: this.url[2],
        extraImage4: this.url[3],
        extraImage5: this.url[4],
        extraImage6: this.url[5],
        extraImage7: this.url[6],
        extraImage8: this.url[7],
        extraImage9: this.url[8],
        extraImage10: this.url[9],
        mainImage: this.editForm.mainImage
      };
      let data = {
        basicInfo: this.editForm,
        images: imgStr,
        detailsInfo: this.tableData
      };
      APISaveAndFinish(data).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.listLoading=true
          setTimeout(() => {
            APIMineInfo(this.condition).then(res => {
              if (res.data.code == 200) {
                this.tableData = res.data.data.detailsInfo;
                this.listLoading=false
              } else {
                this.$message.error(res.data.message);
              }
            });
          }, 10);
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    keep() {
      let imgStr = {
        extraImage1: this.url[0],
        extraImage2: this.url[1],
        extraImage3: this.url[2],
        extraImage4: this.url[3],
        extraImage5: this.url[4],
        extraImage6: this.url[5],
        extraImage7: this.url[6],
        extraImage8: this.url[7],
        extraImage9: this.url[8],
        extraImage10: this.url[9],
        mainImage: this.editForm.mainImage
      };
      let data = {
        basicInfo: this.editForm,
        images: imgStr,
        detailsInfo: this.tableData
      };
      APIMineSave(data).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.listLoading=true
          setTimeout(() => {
            APIMineInfo(this.condition).then(res => {
              if (res.data.code == 200) {
                this.tableData = res.data.data.detailsInfo;
                this.listLoading=false
              } else {
                this.$message.error(res.data.message);
              }
            });
          }, 10);
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    modifyweight() {
      if (this.weight) {
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].shippingWeight = this.weight;
        }
      } else {
        return false;
      }
    },
    modifydelivery() {
      if (this.delivery) {
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].shippingTime = this.delivery;
        }
      } else {
        return false;
      }
    },
    modifyretail() {
      if (this.retail) {
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].msrPrice = this.retail;
        }
      } else {
        return false;
      }
    },
    modifyfreight() {
      if (this.freight) {
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].shipping = this.freight;
        }
      } else {
        return false;
      }
    },
    modifyprice() {
      if (this.price) {
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.sign == "=") {
            this.tableData[i].price = this.price;
          }
          if (this.sign == "+") {
            this.tableData[i].price =
              Number(this.tableData[i].price) + Number(this.price);
          }
          if (this.sign == "-") {
            this.tableData[i].price =
              Number(this.tableData[i].price) - Number(this.price);
          }
          if (this.sign == "*") {
            this.tableData[i].price =
              Number(this.tableData[i].price) * Number(this.price);
          }
          if (this.sign == "/") {
            this.tableData[i].price =
              Number(this.tableData[i].price) / Number(this.price);
          }
        }
      } else {
        return false;
      }
    },
    modifystock() {
      if (this.stock) {
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].quantity = this.stock;
        }
      } else {
        return false;
      }
    },
    del(index, row) {
      let arrId = [];
      arrId.push(row.id);
      let aryId = {
        id: arrId
      };
      APIDeleteDetail(aryId).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.tableData.splice(index, 1);
          this.skuTotal = this.tableData.length;
          //          this.getData()
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    botOm(arr, index1, index2, direction) {
      if (direction == "down") {
        arr.push(arr[index1]);
        arr.splice(index1, 1);
        return arr;
      }
      arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      return arr;
    },
    swapItems(arr, index1, index2, direction) {
      if (direction == "up") {
        // 置顶
        arr.unshift(arr[index1]);
        arr.splice(index1 + 1, 1);
        return arr;
      }
      arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      return arr;
    },
    botIndex(index) {
      if (index == this.url.length - 1) {
        this.$message({
          message: "已经是最后一张了",
          type: "success"
        });
        return;
      }
      this.botOm(this.url, index, index + 1);
    },
    topIndex(index) {
      if (index == 0) {
        this.$message({
          message: "已经是第一张了",
          type: "success"
        });
        return;
      }
      this.swapItems(this.url, index, index - 1);
    },
    revise(e, index) {
      this.url[index] = e;
    },
    addClomun() {
      for (let i = 0; i < this.rows; i++) {
        var obj = {};
        obj.id = null;
        obj.childId = null;
        obj.color = null;
        obj.mid = this.editForm.id;
        obj.msrPrice = null;
        obj.parentId = null;
        obj.price = null;
        obj.proSize = null;
        obj.quantity = null;
        obj.shipping = null;
        obj.shippingTime = null;
        obj.shippingWeight = null;
        obj.varMainImage = null;
        this.tableData.push(obj);
      }
      this.skuTotal = this.tableData.length;
    },
    showAttribute() {
      this.showattribute = !this.showattribute;
    },
    sIs() {
      this.shoIS = !this.shoIS;
    },
    getData() {
      APIMineInfo(this.condition).then(res => {
        if (res.data.code == 200) {
          this.editForm = res.data.data.basicInfo;
          this.tableData = res.data.data.detailsInfo;
          this.skuTotal = this.tableData.length;
          for (var item in res.data.data.images) {
            this.url.push(res.data.data.images[item]);
          }
          this.url.pop();
          if (this.editForm.cat !== "") {
            this.subCate = [];
            const val = this.editForm.cat;
            for (var key in this.subCae) {
              if (this.subCae[key] == val) {
                this.subCate.push(key);
              }
            }
          }
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    productcategory() {
      if (this.editForm.cat !== "") {
        this.subCate = [];
        const val = this.editForm.cat;
        for (var key in this.subCae) {
          if (this.subCae[key] == val) {
            this.subCate.push(key);
          }
        }
        if (this.subCate.length != 0) {
          this.editForm.subCat = this.subCate[0];
        } else {
          this.editForm.subCat = "";
        }
      }
    }
  },
  mounted() {
    this.condition.id = this.$route.params.id;
    this.getData();
    getAttributeInfoSpecialAttribute().then(response => {
      this.specificity = response.data.data;
    });
    getAttributeInfoCat().then(response => {
      this.category = this.cate = response.data.data;
    });
    getAttributeInfoSubCat().then(response => {
      this.subCae = response.data.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.top15 {
  margin-top: 15px;
}
.titCenter {
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.w98 {
  width: 98%;
  margin: auto;
}
.image {
  width: 100px;
  height: 90px;
  margin-left: 10px;
}
.essential {
  width: 97%;
  margin: auto;
  font-size: 16px;
  line-height: 45px;
  font-weight: normal;
  padding-left: 18px;
  margin-top: 15px;
  border-left: 2px solid #2395f1;
}
.spsz {
  font-size: 15px;
  font-weight: normal;
  line-height: 40px;
  padding: 0;
  margin: 0;
  float: left;
  margin-right: 10px;
}
.textZt {
  line-height: 38px;
  text-align: center;
}
.sx {
  background: #eee;
  text-align: center;
  line-height: 34px;
  margin-left: 15px;
  margin-top: 12px;
  border-radius: 3px;
  cursor: pointer;
  width: 80px;
  float: right;
  font-size: 13px;
  border: #eee solid 1px;
}
.sx:nth-child(4) {
  background: #ecf5ff;
  color: #409eff;
  border: #b3d8ff solid 1px;
}
.sx:nth-child(3) {
  background: #fef0f0;
  color: #f56c6c;
  border: #fbc4c4 solid 1px;
}
.sx:nth-child(1) {
  background: #ecf5ff;
  color: #409eff;
  border: #b3d8ff solid 1px;
}
.sx:nth-child(2) {
  background: #ecf5ff;
  color: #409eff;
  border: #b3d8ff solid 1px;
}
.sx:hover {
  background: #409eff;
  color: #fff;
}
.sx:nth-child(3):hover {
  background: #f56c6c;
  color: #fff;
}
.ss {
  text-align: center;
  line-height: 38px;
  margin-left: 10px;
  margin-top: 12px;
  border-radius: 3px;
  cursor: pointer;
  width: 20px;
  float: left;
  color: red;
}
.adres {
  font-weight: normal;
  margin-top: 15px;
  margin-left: 5px;
}
.xzz {
  display: block;
  float: left;
  text-align: center;
  line-height: 30px;
  border: #ccc solid 1px;
  cursor: pointer;
  padding: 0 3px;
  font-size: 13px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
.xzz1 {
  display: block;
  float: left;
  text-align: center;
  line-height: 30px;
  border: #ccc solid 1px;
  cursor: pointer;
  padding: 0 8px;
  font-size: 13px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
.spBlock {
  display: block;
}
.m15 {
  margin-top: 15px;
}
.boderrtb {
  border: 1px solid #dcdfe6;
  border-left: none;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
}
@media screen and (max-width: 1500px) {
  .font12 {
    font-size: 12px;
  }
}
@media screen and (max-width: 1300px) {
  .titCenter {
    font-size: 12px;
  }
}
</style>