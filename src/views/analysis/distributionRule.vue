<template>
  <section>
    <div>
      <el-button
        type="primary"
        size="small"
        @click="add()"
        style="margin-left:0.7%;margin-top:10px;"
      >
        <i class="el-icon-plus"></i>添加
      </el-button>
      <el-table
        :data="tableData"
        border
        style="width:98%;margin-left:0.7%;margin-top:15px;"
        :header-cell-style="getRowClass"
      >
        <el-table-column type="index" fixed align="center" width="50" header-align="center"></el-table-column>
        <el-table-column label="操作" fixed header-align="center" align="center" width="100">
          <template slot-scope="scope">
            <el-tooltip content="更新">
              <i
                @click="editArt(scope.$index, scope.row)"
                class="el-icon-edit"
                style="color: #409EFF;cursor:pointer;"
              ></i>
            </el-tooltip>
            <el-tooltip content="删除">
              <i
                class="el-icon-delete"
                style="color: #409EFF;cursor:pointer;"
                @click="delArt(scope.$index, scope.row)"
              ></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column property="username" label="开发员" align="center"></el-table-column>
        <el-table-column property="depart" label="部门" align="center"></el-table-column>
        <!-- <el-table-column property="ruleType" label="规则类型" align="center">
          <template slot-scope="scope">{{scope.row.ruleType=='new'?'新品':'热销'}}</template>
        </el-table-column>
        <el-table-column property="ruleName" label="推送规则" align="center"></el-table-column> -->
        <el-table-column property="productNum" label="推送产品数量" align="center"></el-table-column>
        <el-table-column property="category" label="类目" align="center"></el-table-column>
        <el-table-column property="deliveryLocation" label="发货地点" align="center"></el-table-column>
        <el-table-column property="createdDate" label="添加时间" align="center">
          <template slot-scope="scope">{{scope.row.createdDate | cutOutDate}}</template>
        </el-table-column>
        <el-table-column property="updatedDate" label="更新时间" align="center">
          <template slot-scope="scope">{{scope.row.updatedDate | cutOutDate}}</template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="添加" :visible.sync="addebaydisLogin" width="78%" :close-on-click-modal="false">
      <el-row style="margin-top: 0">
        <el-col :span="24" class="cTop cTop1">
          <el-col :span="8" style="margin-bottom: 20px">
            <el-col :span="6">
              <p class="basp">部 门</p>
            </el-col>
            <el-col :span="18">
              <el-select style="width:100%" v-model="addData.depart" @change="getRuleDev($event)">
                <el-option
                  v-for="(item, index) in department"
                  :key="index"
                  :label="item.department"
                  :value="item.department"
                ></el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="8" class="cTop1">
            <el-col :span="6">
              <p class="basp" style="padding-bottom:12px;">开发员</p>
            </el-col>
            <el-col :span="18">
              <el-select style="width:100%" v-model="addData.username">
                <el-option
                  v-for="(item, index) in devData"
                  :key="index"
                  :label="item.username"
                  :value="item.username"
                ></el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="6">
              <p class="basp">推送数量</p>
            </el-col>
            <el-col :span="18">
              <el-input v-model="addData.productNum"></el-input>
            </el-col>
          </el-col>
          <el-col :span="24" style="margin-bottom: 10px">
            <el-col :span="2">
              <p class="baspOne">发货地点</p>
            </el-col>
            <el-col :span="22" style="margin-top:3px;">
              <el-checkbox-group v-model="ruleDeliveryLocation" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="(item,index) in place" :key="index" :label="item" :value="item"></el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-col>
          <el-col :span="24" style="margin-bottom: 10px">
            <el-col :span="2">
              <p class="baspOne">普源类目</p>
            </el-col>
            <el-col :span="22" style="margin-top:2px;">
              <el-checkbox-group v-model="category" @change="handleCheckedCitiesChange">
                <el-checkbox
                  v-for="(item,index) in pyCate"
                  :key="index"
                  :label="item"
                  :value="item"
                  @change="checkinlist(item)"
                ></el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="2">
              <p class="baspOne">推送规则</p>
            </el-col>
            <el-col :span="22" style="margin-top:1px;">
              <el-col :span="24">
                <el-checkbox v-model="ruleNew" @change="ruleNewOne">新品</el-checkbox>
              </el-col>
              <el-col :span="24">
                <el-checkbox-group v-model="addruleNameNew" @change="ruleNewGet">
                  <el-checkbox
                    style="margin-left:25px;"
                    v-for="(item,index) in ruleNameXp"
                    :key="index"
                    :label="item.ruleName"
                  >{{item.ruleName}}</el-checkbox>
                </el-checkbox-group>
              </el-col>
              <el-col :span="24">
                <el-checkbox v-model="ruleHot" @change="ruleHotOne">热销</el-checkbox>
              </el-col>
              <el-col :span="24">
                <el-checkbox-group v-model="addruleNameHot" @change="ruleHotGet">
                  <el-checkbox
                    style="margin-left:25px;"
                    v-for="(item,index) in ruleNameRx"
                    :key="index"
                    :label="item.ruleName"
                  >{{item.ruleName}}</el-checkbox>
                </el-checkbox-group>
              </el-col>
            </el-col>
          </el-col>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addebaydisLogin = false">取 消</el-button>
        <el-button type="primary" @click="addsave()">保 存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑" :visible.sync="datadisLogin" width="78%" :close-on-click-modal="false">
      <el-row style="margin-top: 0">
        <el-col :span="24" class="cTop cTop1">
          <el-col :span="8" style="margin-bottom: 20px">
            <el-col :span="6">
              <p class="basp">部 门</p>
            </el-col>
            <el-col :span="18">
              <el-select style="width:100%" v-model="data.depart" @change="getRuleDev($event)">
                <el-option
                  v-for="(item, index) in department"
                  :key="index"
                  :label="item.department"
                  :value="item.department"
                ></el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="8" class="cTop1">
            <el-col :span="6">
              <p class="basp" style="padding-bottom:12px;">开发员</p>
            </el-col>
            <el-col :span="18">
              <el-select style="width:100%" v-model="data.username">
                <el-option
                  v-for="(item, index) in devData"
                  :key="index"
                  :label="item.username"
                  :value="item.username"
                ></el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="8" style="margin-bottom: 20px">
            <el-col :span="6">
              <p class="basp" style="text-align: center;">推送数量</p>
            </el-col>
            <el-col :span="18">
              <el-input v-model="data.productNum"></el-input>
            </el-col>
          </el-col>
          <el-col :span="24" style="margin-bottom: 10px">
            <el-col :span="2">
              <p class="baspOne">发货地点</p>
            </el-col>
            <el-col :span="22" style="margin-top:3px;">
              <el-checkbox-group v-model="dateruleDeliveryLocation">
                <el-checkbox v-for="(item,index) in place" :key="index" :label="item" :value="item"></el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-col>
          <el-col :span="24" style="margin-bottom: 10px">
            <el-col :span="2">
              <p class="baspOne">普源类目</p>
            </el-col>
            <el-col :span="22" style="margin-top:2px;">
              <el-checkbox-group v-model="datecategory">
                <el-checkbox
                  v-for="(item,index) in pyCate"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="2">
              <p class="baspOne">推送规则</p>
            </el-col>
            <el-col :span="22" style="margin-top:1px;">
              <el-col :span="24">
                <el-checkbox v-model="addruleNew" @change="addruleNewOne">新品</el-checkbox>
              </el-col>
              <el-col :span="24">
                <el-checkbox-group v-model="ruleNameNew" @change="addruleNewGet">
                  <el-checkbox
                    style="margin-left:25px;"
                    v-for="(item,index) in ruleNameXp"
                    :key="index"
                    :label="item.ruleName"
                  >{{item.ruleName}}</el-checkbox>
                </el-checkbox-group>
              </el-col>
              <el-col :span="24">
                <el-checkbox v-model="addruleHot" @change="addruleHotOne">热销</el-checkbox>
              </el-col>
              <el-col :span="24">
                <el-checkbox-group v-model="ruleNameHot" @change="addruleHotGet">
                  <el-checkbox
                    style="margin-left:25px;"
                    v-for="(item,index) in ruleNameRx"
                    :key="index"
                    :label="item.ruleName"
                  >{{item.ruleName}}</el-checkbox>
                </el-checkbox-group>
              </el-col>
            </el-col>
          </el-col>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="datadisLogin = false">取 消</el-button>
        <el-button type="primary" @click="save()">保 存</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script type="text/ecmascript-6">
import {
  getAllotRule,
  saveAllotRule,
  DeleteAllotRule,
  APRengineRule,
  APRengineRuleHot,
  getAllotRuleInfo
} from "../../api/product";
import { getMember, getSection, getAttributeInfoCat } from "../../api/profit";
export default {
  data() {
    return {
      tableData: [],
      department: [],
      member: [],
      pyCate: [],
      ruleName: [],
      ruleTypeData: [],
      ruleNameXp: [],
      ruleNameRx: [],
      addruleName: [],
      addruleName1: [],
      addruleNameNew: [],
      addruleNameHot: [],
      ruleNameNew: [],
      ruleNameHot: [],
      ruleDeliveryLocation: [],
      dateruleDeliveryLocation:[],
      ruleActive: 0,
      ruleNew: false,
      ruleHot: false,
      addruleNew:false,
      addruleHot:false,
      place: [
        "中国",
        "香港",
        "美国",
        "英国",
        "法国",
        "德国",
        "意大利",
        "澳大利亚"
      ],
      devData: [],
      addData: {
        username: null,
        depart: null,
        productNum: null,
        category: [],
        deliveryLocation: null,
        detail: []
      },
      category: [],
      datecategory:[],
      ruleType: ["新品", "热销"],
      data: {
        id: null,
        username: null,
        depart: null,
        productNum: null,
        category: null,
        ruleName: null,
        detail:[],
        deliveryLocation: null
      },
      addebaydisLogin: false,
      datadisLogin: false
    };
  },
  filters: {
    cutOutDate(value) {
      value = value.substring(0, 11);
      return value;
    }
  },
  methods: {
    addruleNewGet() {
      if (this.ruleNameNew.length <= 0) {
        // this.ruleNew=false
      } else {
        this.addruleNew = true;
      }
    },
    addruleHotGet() {
      if (this.ruleNameHot.length <= 0) {
        // this.ruleHot=false
      } else {
        this.addruleHot = true;
      }
    },
    addruleNewOne() {
      if (!this.addruleNew) {
        this.ruleNameNew = [];
      }else{
        var arr=[]
        for(var i=0;i<this.ruleNameXp.length;i++){
          arr.push(this.ruleNameXp[i].ruleName)
        }
        this.ruleNameNew = arr;
      }
    },
    addruleHotOne() {
      if (!this.addruleHot) {
        this.ruleNameHot = [];
      }else{
        var arr=[]
        for(var i=0;i<this.ruleNameRx.length;i++){
          arr.push(this.ruleNameRx[i].ruleName)
        }
        this.ruleNameHot = arr;
      }
    },
    ruleNewOne() {
      if (!this.ruleNew) {
        this.addruleNameNew = [];
      }else{
        var arr=[]
        for(var i=0;i<this.ruleNameXp.length;i++){
          arr.push(this.ruleNameXp[i].ruleName)
        }
        this.addruleNameNew = arr;
      }
    },
    ruleHotOne() {
      if (!this.ruleHot) {
        this.addruleNameHot = [];
      }else{
        var arr=[]
        for(var i=0;i<this.ruleNameRx.length;i++){
          arr.push(this.ruleNameRx[i].ruleName)
        }
        this.addruleNameHot = arr;
      }
    },
    ruleNewGet() {
      if (this.addruleNameNew.length <= 0) {
        // this.ruleNew=false
      } else {
        this.ruleNew = true;
      }
    },
    ruleHotGet() {
      if (this.addruleNameHot.length <= 0) {
        // this.ruleHot=false
      } else {
        this.ruleHot = true;
      }
    },
    deletRuleXp() {
      this.ruleNameXp = [];
      this.ruleActive = 1;
      for (let i = 0; i < this.ruleTypeData.length; i++) {
        if (this.ruleTypeData[i] == "新品") {
          this.ruleTypeData.splice(i, 1);
        }
      }
    },
    deletRuleRx() {
      this.ruleNameRx = [];
      this.ruleActive = 0;
      for (let i = 0; i < this.ruleTypeData.length; i++) {
        if (this.ruleTypeData[i] == "热销") {
          this.ruleTypeData.splice(i, 1);
        }
      }
    },
    ruleA(e) {
      this.ruleActive = e;
    },
    getRuleDev(val) {
      let arr = this.member;
      let stj = [];
      this.addData.username = "";
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].department == val || arr[i].parent_department == val) {
          stj.push(arr[i]);
        }
      }
      this.devData = stj;
    },
    handleCheckedCitiesChange(val) {},
    checkinlist(val) {},
    getRuleName(e) {
      this.addData.ruleName = null;
      this.data.ruleName = null;
      if (e == "新品") {
        if (this.ruleNameXp.length > 0) {
          this.ruleNameXp = [];
          this.ruleActive = 1;
        } else {
          this.ruleActive = 0;
          APRengineRule().then(res => {
            this.ruleNameXp = res.data.data;
          });
        }
      } else {
        if (this.ruleNameRx.length > 0) {
          this.ruleNameRx = [];
          this.ruleActive = 0;
        } else {
          this.ruleActive = 1;
          APRengineRuleHot().then(res => {
            this.ruleNameRx = res.data.data;
          });
        }
      }
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "color:#337ab7;background:#f5f7fa";
      } else {
        return "";
      }
    },
    add() {
      this.addData.username = null;
      this.addData.depart = null;
      this.addData.productNum = null;
      this.addData.category = null;
      this.addData.detail = [];
      this.ruleDeliveryLocation = [];
      this.category = [];
      this.addruleNameHot = [];
      this.addruleNameNew = [];
      this.ruleHot = false;
      this.ruleNew = false;
      this.addData.deliveryLocation = null;
      this.addebaydisLogin = true;
    },
    editArt(index, row) {
      // this.data.id = row._id.$oid;
      let obj={
        id:row._id.$oid
      }
      getAllotRuleInfo(obj).then(res => {
        this.data.detail=[]
        this.data.id=res.data.data._id
        this.data.username=res.data.data.username
        this.data.depart=res.data.data.depart
        this.data.productNum=res.data.data.productNum
        this.dateruleDeliveryLocation=res.data.data.deliveryLocation
        this.datecategory=res.data.data.category
        var detail=res.data.data.detail    
        this.ruleNameNew=[]
        this.ruleNameHot=[]
        for(var i=0;i<detail.length;i++){
          if(detail[i].ruleType=='new' && detail[i].flag){
            this.addruleNew=true
            if(detail[i].ruleValue.length!=0){
              for(var k=0;k<detail[i].ruleValue.length;k++){
                this.ruleNameNew.push(detail[i].ruleValue[k].ruleName)
              }
            }
          }
          if(detail[i].ruleType=='hot' &&  detail[i].flag){
            this.addruleHot=true
            if(detail[i].ruleValue.length!=0){
              for(var k=0;k<detail[i].ruleValue.length;k++){
                this.ruleNameHot.push(detail[i].ruleValue[k].ruleName)
              }
            }
          }
        }
      });
      this.datadisLogin = true;
    },
    save() {
      if (this.data.depart && this.data.username) {
        this.data.category = this.datecategory;
        this.data.deliveryLocation = this.dateruleDeliveryLocation;
        if (this.addruleNew) {
          var obj = {
            ruleType: "new",
            ruleValue: []
          };
          for (var i = 0; i < this.ruleNameNew.length; i++) {
            for (var k = 0; k < this.ruleNameXp.length; k++) {
              if (this.ruleNameNew[i] == this.ruleNameXp[k].ruleName) {
                var str = {
                  ruleName: this.ruleNameNew[i],
                  ruleId: {
                    oid: this.ruleNameXp[k]._id
                  }
                };
                obj.ruleValue.push(str);
              }
            }
          }
          this.data.detail.push(obj);
        }
        if (this.addruleHot) {
          var obj = {
            ruleType: "hot",
            ruleValue: []
          };
          for (var i = 0; i < this.ruleNameHot.length; i++) {
            for (var k = 0; k < this.ruleNameRx.length; k++) {
              if (this.ruleNameHot[i] == this.ruleNameRx[k].ruleName) {
                var str = {
                  ruleName: this.ruleNameHot[i],
                  ruleId: {
                    oid: this.ruleNameRx[k]._id
                  }
                };
                obj.ruleValue.push(str);
              }
            }
          }
          this.data.detail.push(obj);
        }
        saveAllotRule(this.data).then(res => {
          if (res.data.data) {
            this.$message({
              message: "编辑成功",
              type: "success"
            });
            this.datadisLogin = false;
            this.getData();
          }
        });
      } else {
        this.$message.error("请选择部门或者开发");
      }
    },
    delArt(index, row) {
      let obj = {
        id: row._id.$oid
      };
      DeleteAllotRule(obj).then(res => {
        if (res.data.data) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.getData();
        }
      });
    },
    addsave() {
      if (this.addData.depart && this.addData.username) {
        this.addData.category = this.category;
        this.addData.deliveryLocation = this.ruleDeliveryLocation;
        if (this.ruleNew) {
          var obj = {
            ruleType: "new",
            ruleValue: []
          };
          for (var i = 0; i < this.addruleNameNew.length; i++) {
            for (var k = 0; k < this.ruleNameXp.length; k++) {
              if (this.addruleNameNew[i] == this.ruleNameXp[k].ruleName) {
                var str = {
                  ruleName: this.addruleNameNew[i],
                  ruleId: {
                    oid: this.ruleNameXp[k]._id
                  }
                };
                obj.ruleValue.push(str);
              }
            }
          }
          this.addData.detail.push(obj);
        }
        if (this.ruleHot) {
          var obj = {
            ruleType: "hot",
            ruleValue: []
          };
          for (var i = 0; i < this.addruleNameHot.length; i++) {
            for (var k = 0; k < this.ruleNameRx.length; k++) {
              if (this.addruleNameHot[i] == this.ruleNameRx[k].ruleName) {
                var str = {
                  ruleName: this.addruleNameHot[i],
                  ruleId: {
                    oid: this.ruleNameRx[k]._id
                  }
                };
                obj.ruleValue.push(str);
              }
            }
          }
          this.addData.detail.push(obj);
        }
        saveAllotRule(this.addData).then(res => {
          if (res.data.data) {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.addebaydisLogin = false;
            this.getData();
          }
        });
      } else {
        this.$message.error("请选择部门或者开发");
      }
    },
    getData() {
      getAllotRule(this.condition).then(res => {
        this.tableData = res.data.data;
        for (let i = 0; i < this.tableData.length; i++) {
          let category = this.tableData[i].category;
          let deliveryLocation = this.tableData[i].deliveryLocation;
          for(let i=0;i<category.length;i++){
            if(i!=category.length-1){
              category[i]=category[i]+','
            }
          }
          for(let i=0;i<deliveryLocation.length;i++){
            if(i!=deliveryLocation[i].length-1){
              deliveryLocation[i]=deliveryLocation[i]+','
            }
          }
        }
      });
    }
  },
  mounted() {
    APRengineRule().then(res => {
      this.ruleNameXp = res.data.data;
    });
    APRengineRuleHot().then(res => {
      this.ruleNameRx = res.data.data;
    });
    this.getData();
    getSection().then(response => {
      const res = response.data.data;
      this.department = res.filter(
        ele => ele.department && ele.type === "业务"
      );
    });
    getAttributeInfoCat().then(response => {
      this.pyCate = response.data.data;
    });
    getMember().then(response => {
      const res = response.data.data;
      this.member = res.filter(ele => ele.position === "开发");
    });
  }
};
</script>

<style scoped>
.basp {
  text-align: center;
}
.baspOne {
  text-align: center;
  margin: 0;
}
.accspan {
  margin: 0;
  margin-bottom: 15px;
  display: block;
  border: #409eff solid 1px;
  width: 70px;
  text-align: center;
  border-radius: 5px;
  line-height: 28px;
  float: left;
  margin-right: 10px;
  cursor: pointer;
  position: relative;
}
.ruleAcc {
  background: #409eff;
  color: #fff;
}
.posx {
  position: absolute;
  display: block;
  right: -5px;
  top: -10px;
  font-size: 14px;
  background: #ccc;
  color: #fff;
  border-radius: 50%;
  height: 20px;
  line-height: 20px;
  width: 20px;
}
@media (max-width: 1500px) {
  .basp {
    text-align: center;
    font-size: 12px;
  }
}
</style>
<style>
.cTop1 .el-radio + .el-radio {
  margin-left: 0;
  margin-bottom: 15px;
}
.cTop1 .el-radio {
  width: 90px;
  margin-right: 10px;
}
.cTop1 .el-checkbox {
  width: 90px;
  margin-left: 0;
  margin-right: 10px;
  margin-bottom: 15px;
}
</style>