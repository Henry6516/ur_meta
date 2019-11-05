<template>
  <div>
    <el-col :span="24" style="padding:15px 15px;">
      <el-col :span="3">
        <el-input v-model="shopNmae" placeholder="店铺名称"></el-input>
      </el-col>
      <el-col :span="3" style="margin-left:10px;">
        <el-input v-model="shopId" placeholder="店铺ID"></el-input>
      </el-col>
      <el-col :span="2">
        <span class="dsblock fon12 dsblockGreen" @click="collection">开始订阅</span>
      </el-col>
    </el-col>
    <el-table
      :data="tableDate"
      border
      class="elTable"
      :height="tableHeight"
      :header-cell-style="getRowClass"
      style="width: 98%;margin:auto;margin-top:5px;"
    >
      <el-table-column type="index" fixed align="center" width="80" header-align="center"></el-table-column>
      <el-table-column label="操作" fixed align="center" width="108">
        <template slot-scope="scope">
          <el-tooltip content="查看">
            <i
              class="el-icon-view"
              @click="viewPic(scope.$index, scope.row)"
              style="color: #409EFF;cursor:pointer;"
            ></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="店铺名称" header-align="center" align="center" prop="storeName"></el-table-column>
      <!-- <el-table-column label="类目ID" header-align="center" align="center" prop="cateId"></el-table-column> -->
      <el-table-column label="店铺ID" header-align="center" align="center" prop="storeId"></el-table-column>
      <el-table-column label="创建人" header-align="center" align="center" prop="creator"></el-table-column>
      <el-table-column label="创建时间" header-align="center" align="center" prop="createdDate"></el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  getJoomSubscribed,
  getSubscribeJoomStore,
  getSubscribeJoomList
} from "../../api/profit";
export default {
  data() {
    return {
      shopNmae: null,
      shopId: null,
      tableHeight: window.innerHeight - 173,
      joomId: null,
      joomCate: [],
      tableDate: []
    };
  },
  mounted() {
    getJoomSubscribed().then(response => {
      this.tableDate = response.data.data;
    });
  },
  methods: {
    viewPic(index, row) {
      let Logistics = this.$router.resolve({
        path: `/joomSubscribeIdShop/${row.storeName}`
      });
      window.open(Logistics.href);
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "color:#337ab7;background:#f5f7fa";
      } else {
        return "";
      }
    },
    collection() {
      if (this.shopNmae && this.shopId) {
        let obj = {
          storeId: this.shopId,
          storeName: this.shopNmae
        };
        getSubscribeJoomStore(obj).then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: "成功",
              type: "success"
            });
            getJoomSubscribed().then(response => {
              this.tableDate = response.data.data;
            });
          } else {
            this.$message.error(res.data.message);
          }
        });
      } else {
        this.$message.error("请输入店铺名称或者ID");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.contentt {
  margin-top: 15px;
}
.content1 {
  margin-top: 20px;
}
.basp {
  padding: 0;
  margin: 0;
  line-height: 40px;
}
.cTop {
  margin-top: 0px;
}
.baspj {
  text-align: center;
}
.top20 {
  margin-top: 25px;
}
.font14 {
  font-size: 14px;
}
.dsblock {
  width: 95%;
  display: block;
  border: #ccc solid 1px;
  line-height: 38px;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
}
.dsblockGreen {
  background: #008d4c;
  color: #fff;
  border: #008d4c solid 1px;
}
.dsblockred {
  background: #d73925;
  border: #d73925 solid 1px;
  color: #fff;
}
.dsblockcse {
  background: #e08e0b;
  border: #e08e0b solid 1px;
  color: #fff;
}
.dack {
  border: #ccc solid 1px;
  background: #eee;
  border-left: none;
  width: 92%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.bodinput input {
  border-radius: 0;
}
.qCategory {
  display: block;
  width: 100%;
  line-height: 38px;
  text-align: center;
  cursor: pointer;
  border: #ccc solid 1px;
  background: #eee;
  border-left: none;
}
.clasRed1 {
  color: #f56c6c;
  border: rgba(245, 108, 108, 0.2) solid 1px;
  background: rgba(245, 108, 108, 0.1);
  width: 65%;
  margin: auto;
  line-height: 32px;
  display: block;
  border-radius: 5px;
}
.clasGreen1 {
  color: #0e9a00;
  border-radius: 5px;
  width: 65%;
  margin: auto;
  line-height: 32px;
  display: block;
  border: rgba(3, 82, 38, 0.2) solid 1px;
  background: rgba(33, 170, 95, 0.1);
}
.classc {
  color: #e6a23c;
  background-color: rgba(230, 162, 60, 0.1);
  border: rgba(214, 132, 8, 0.2) solid 1px;
  width: 65%;
  margin: auto;
  line-height: 32px;
  display: block;
  border-radius: 5px;
}
.classl {
  color: #409eff;
  background-color: rgba(64, 158, 255, 0.1);
  border: 1px solid rgba(64, 158, 255, 0.2);
  width: 65%;
  margin: auto;
  line-height: 32px;
  display: block;
  border-radius: 5px;
}
@media screen and (max-width: 1450px) {
  .fon12 {
    font-size: 13px;
  }
}
@media screen and (max-width: 1350px) {
  .fon12 {
    font-size: 12px;
  }
}
</style>


