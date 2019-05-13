<template>
 <div class="joomCat">
     <div>第1-{{relationTotal}}条,共{{relationTotal}}条</div>
        <el-row style="margin-top:10px;">
          <el-col :span="24">
            <el-col :span="5">
              <el-input v-model="codeRelation" disabled style="width:98%"></el-input>
            </el-col>
            <el-col :span="5">
              <el-input v-model="codeRelationinput" placeholder="--普源商品编码--" style="width:98%"></el-input>
            </el-col>
            <el-col :span="8">
              <el-button type="success" @click="keepRelation">保存</el-button>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-table
              :data="variations"
              border
              style="width:100%;margin-top:18px;"
              :height="tableHeight"
            >
              <el-table-column type="index" width="50" align="center" header-align="center"></el-table-column>
              <el-table-column label="唯一编码" prop="childId" header-align="center">
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.childId" disabled></el-input>
                </template>
              </el-table-column>
              <el-table-column label="颜色" prop="color" header-align="center">
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.color" disabled></el-input>
                </template>
              </el-table-column>
              <el-table-column label="尺码/型号" prop="proSize" header-align="center">
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.proSize" disabled></el-input>
                </template>
              </el-table-column>
              <el-table-column label="普源SKU" prop="pySku" header-align="center">
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.pySku"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="图片" prop="varMainImage" header-align="center" min-width="100">
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.varMainImage" disabled></el-input>
                </template>
              </el-table-column>
              <el-table-column label="图片" prop="varMainImage" header-align="center">
                <template slot-scope="scope">
                  <img
                    :src="scope.row.varMainImage"
                    style="width:50px;height:50px;display: block;margin: auto"
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
 </div>
</template>
<script type="text/ecmascript-6">
import {
  APIbindShopSku,
  APISaveShopSku
} from "../../api/product";

export default {
  data() {
    return {
     tableHeight:window.innerHeight -215,
     variations:[],
     codeRelation:null,
     codeRelationinput:null,
     relationTotal:0,
     condition:{
         id:null
     }
    }
  },
  methods: {
    keepRelation() {
      let relationObj = {
        goodsCode: this.codeRelation,
        pyGoodsCode: this.codeRelationinput,
        variations: this.variations
      };
      APISaveShopSku(relationObj).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          // this.dialogRelation = false;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    relation() {
      const ary = [];
      ary.push(this.condition.id);
      let objtr = {
        id: ary
      };
      APIbindShopSku(objtr).then(res => {
        if (res.data.code == 200) {
          this.dialogRelation = true;
          this.variations = res.data.data.variations;
          this.relationTotal = this.variations.length;
          this.codeRelation = res.data.data.goodsCode;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
  },
  mounted() {
   this.condition.id = this.$route.params.id;   
   this.relation();
  }
}
</script>

<style lang="scss" scoped>
.joomCat{
    width: 98%;
    overflow: hidden;
    margin: auto;
    margin-top: 15px;
}
</style>

