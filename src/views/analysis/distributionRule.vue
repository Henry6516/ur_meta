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
        <el-table-column property="ruleType" label="规则类型" align="center">
          <template slot-scope="scope">{{scope.row.ruleType=='new'?'新品':'热销'}}</template>
        </el-table-column>
        <el-table-column property="ruleName" label="推送规则" align="center"></el-table-column>
        <el-table-column property="productNum" label="推送产品数量" align="center"></el-table-column>
        <el-table-column property="category" label="类目" align="center"></el-table-column>
        <el-table-column property="deliveryLocation" label="发货地点" align="center"></el-table-column>
        <el-table-column property="createdDate" label="添加时间" align="center">
          <template slot-scope="scope">
              {{scope.row.createdDate | cutOutDate}}
            </template>
        </el-table-column>
        <el-table-column property="updatedDate" label="更新时间" align="center">
          <template slot-scope="scope">
              {{scope.row.updatedDate | cutOutDate}}
            </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="添加" :visible.sync="addebaydisLogin" width="78%" :close-on-click-modal="false">
      <el-row style="margin-top: 0">
        <el-col :span="24" class="cTop cTop1">
          <el-col :span="24" style="margin-bottom: 10px">
            <el-col :span="2">
              <p class="baspOne">部 门</p>
            </el-col>
            <el-col :span="22" style="margin-top:3px;">
              <el-radio-group v-model="addData.depart">
                <el-radio v-for='(item,index) in department' :key="index" :label="item.department" @change="getRuleDev(item.department)">{{item.department}}</el-radio>
              </el-radio-group>
            </el-col>
          </el-col>
          <el-col :span="24" style="margin-bottom: 12px" class="cTop1">
            <el-col :span="2">
              <p class="baspOne" style="padding-bottom:12px;">开发员</p>
            </el-col>
            <el-col :span="22" style="margin-top:3px;">
              <el-radio-group v-model="addData.username">
                <el-radio v-for='(item,index) in devData' :key="index" :label="item.username">{{item.username}}</el-radio>
              </el-radio-group>
            </el-col>
          </el-col>
          <el-col :span="24" style="margin-bottom: 10px">
            <el-col :span="2">
              <p class="baspOne">发货地点</p>
            </el-col>
            <el-col :span="22" style="margin-top:3px;">
              <el-radio-group v-model="addData.deliveryLocation">
                <el-radio v-for='(item,index) in place' :key="index" :label="item">{{item}}</el-radio>
              </el-radio-group>
            </el-col>
          </el-col>
          <el-col :span="24" style="margin-bottom: 10px">
            <el-col :span="2">
              <p class="baspOne">普源类目</p>
            </el-col>
            <el-col :span="22" style="margin-top:2px;">
              <el-radio-group v-model="addData.category">
                <el-radio v-for='(item,index) in pyCate' :key="index" :label="item">{{item}}</el-radio>
              </el-radio-group>
              <!-- <el-checkbox-group v-model="category" @change="handleCheckedCitiesChange">
                <el-checkbox v-for='(item,index) in pyCate' :key="index" :label="item" :value="item" @change="checkinlist(item)"></el-checkbox>
              </el-checkbox-group> -->
            </el-col>
          </el-col>
          <el-col :span="24" style="margin-bottom: 25px">
            <el-col :span="2">
              <p class="baspOne">推送数量</p>
            </el-col>
            <el-col :span="21">
              <el-input v-model="addData.productNum"></el-input>
            </el-col>
          </el-col>
          <el-col :span="24" style="margin-bottom: 10px">
            <el-col :span="2">
              <p class="baspOne">规则类型</p>
            </el-col>
            <el-col :span="22" style="margin-top:3px;">
              <el-radio-group v-model="addData.ruleType">
                <el-radio v-for='(item,index) in ruleType' :key="index" :label="item" @change="getRuleName(item)">{{item}}</el-radio>
              </el-radio-group>
            </el-col>
          </el-col>
          <el-col :span="24" style="margin-bottom: 10px">
            <el-col :span="2">
              <p class="baspOne">推送规则</p>
            </el-col>
            <el-col :span="22" style="margin-top:3px;">
              <el-radio-group v-model="addData.ruleName">
                <el-radio v-for='(item,index) in ruleName' :key="index" :label="item.ruleName">{{item.ruleName}}</el-radio>
              </el-radio-group>
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
          <el-col :span="24" style="margin-bottom: 10px">
            <el-col :span="2">
              <p class="baspOne">部 门</p>
            </el-col>
            <el-col :span="22" style="margin-top:3px;">
              <el-radio-group v-model="data.depart">
                <el-radio v-for='(item,index) in department' :key="index" :label="item.department" @change="getRuleDev(item.department)">{{item.department}}</el-radio>
              </el-radio-group>
            </el-col>
          </el-col>
          <el-col :span="24" style="margin-bottom: 15px" class="cTop1">
            <el-col :span="2">
              <p class="baspOne">开发员</p>
            </el-col>
            <el-col :span="22" style="margin-top:3px;">
              <el-radio-group v-model="data.username">
                <el-radio v-for='(item,index) in devData' :key="index" :label="item.username">{{item.username}}</el-radio>
              </el-radio-group>
            </el-col>
          </el-col>
          <el-col :span="24" style="margin-bottom: 10px">
            <el-col :span="2">
              <p class="baspOne">发货地点</p>
            </el-col>
            <el-col :span="22" style="margin-top:3px;">
              <el-radio-group v-model="data.deliveryLocation">
                <el-radio v-for='(item,index) in place' :key="index" :label="item">{{item}}</el-radio>
              </el-radio-group>
            </el-col>
          </el-col>
          <el-col :span="24" style="margin-bottom: 10px">
            <el-col :span="2">
              <p class="baspOne">普源类目</p>
            </el-col>
            <el-col :span="22" style="margin-top:2px;">
              <el-radio-group v-model="data.category">
                <el-radio v-for='(item,index) in pyCate' :key="index" :label="item">{{item}}</el-radio>
              </el-radio-group>
              <!-- <el-checkbox-group v-model="category" @change="handleCheckedCitiesChange">
                <el-checkbox v-for='(item,index) in pyCate' :key="index" :label="item" :value="item" @change="checkinlist(item)"></el-checkbox>
              </el-checkbox-group> -->
            </el-col>
          </el-col>
          <el-col :span="24" style="margin-bottom: 20px">
            <el-col :span="2">
              <p class="baspOne" style="text-align: center;">推送数量</p>
            </el-col>
            <el-col :span="21">
              <el-input v-model="data.productNum"></el-input>
            </el-col>
          </el-col>
          <el-col :span="24" style="margin-bottom: 10px">
            <el-col :span="2">
              <p class="baspOne">规则类型</p>
            </el-col>
            <el-col :span="22" style="margin-top:3px;">
              <el-radio-group v-model="data.ruleType">
                <el-radio v-for='(item,index) in ruleType' :key="index" :label="item" @change="getRuleName(item)">{{item}}</el-radio>
              </el-radio-group>
            </el-col>
          </el-col>
          <el-col :span="24" style="margin-bottom: 10px">
            <el-col :span="2">
              <p class="baspOne">推送规则</p>
            </el-col>
            <el-col :span="22" style="margin-top:3px;">
              <el-radio-group v-model="data.ruleName">
                <el-radio v-for='(item,index) in ruleName' :key="index" :label="item.ruleName">{{item.ruleName}}</el-radio>
              </el-radio-group>
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
  APRengineRuleHot
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
      devData:[],
      addData: {
        username: null,
        depart: null,
        ruleId: null,
        ruleName: null,
        ruleType: null,
        cateRuleId: null,
        productNum: null,
        category: [],
        deliveryLocation: null
      },
      category:[],
      ruleType: ["新品", "热销"],
      data: {
        id: null,
        username: null,
        depart: null,
        ruleId: null,
        cateRuleId: null,
        productNum: null,
        category: null,
        ruleName: null,
        ruleType: null,
        deliveryLocation: null
      },
      addebaydisLogin: false,
      datadisLogin: false
    };
  },
  filters: {
    cutOutDate(value){
      value = value.substring(0, 11);
      return value;
    },
  },
  methods: {
    getRuleDev(val){
      let arr=this.member
      let stj=[]
      for(let i=0;i<arr.length;i++){
        if(arr[i].department==val || arr[i].parent_department==val){
          stj.push(arr[i])
        }
      }
      this.devData=stj
    },
    handleCheckedCitiesChange(val){
      console.log(val)
    },
    checkinlist(val){
      console.log(val)
    },
    getRuleName(e) {
      this.addData.ruleName = null;
      this.data.ruleName = null;
      if (e == "新品") {
        APRengineRule().then(res => {
          this.ruleName = res.data.data;
        });
      } else {
        APRengineRuleHot().then(res => {
          this.ruleName = res.data.data;
        });
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
      this.addData.ruleId = null;
      this.addData.ruleName = null;
      this.addData.ruleType = null;
      this.addData.cateRuleId = null;
      this.addData.productNum = null;
      this.addData.category = null;
      this.ruleName = [];
      this.devData=[];
      this.addData.deliveryLocation = null;
      this.addebaydisLogin = true;
    },
    editArt(index, row) {
      this.data.id = row._id.$oid;
      this.data.username = row.username;
      this.data.depart = row.depart;
      this.data.ruleId = row.ruleId;
      this.data.cateRuleId = row.cateRuleId;
      this.data.productNum = row.productNum;
      this.data.category = row.category;
      this.data.ruleType = row.ruleType;
      this.data.ruleName = row.ruleName;
      this.data.deliveryLocation = row.deliveryLocation;
      if (this.data.ruleType == "new") {
        APRengineRule().then(res => {
          this.ruleName = res.data.data;
        });
        this.data.ruleType = "新品";
      } else {
        APRengineRuleHot().then(res => {
          this.ruleName = res.data.data;
        });
        this.data.ruleType = "热销";
      }
      if(this.data.depart){
        const val=this.data.depart
        let arr=this.member
        let stj=[]
        for(let i=0;i<arr.length;i++){
          if(arr[i].department==val || arr[i].parent_department==val){
            stj.push(arr[i])
          }
        }
        this.devData=stj
       }
      this.datadisLogin = true;
    },
    save() {
      if (this.data.ruleName) {
        for (let i = 0; i < this.ruleName.length; i++) {
          if (this.data.ruleName == this.ruleName[i].ruleName) {
            this.data.ruleId = this.ruleName[i]._id;
          }
        }
      }
      if (this.data.ruleType == "新品") {
        this.data.ruleType = "new";
      } else {
        this.data.ruleType = "hot";
      }
      saveAllotRule(this.data).then(res => {
        if (res.data.data) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.datadisLogin = false;
          this.getData();
        }
      });
    },
    delArt(index, row) {
      let obj = {
        id: row._id
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
      if (this.addData.ruleName) {
        for (let i = 0; i < this.ruleName.length; i++) {
          if (this.addData.ruleName == this.ruleName[i].ruleName) {
            this.addData.ruleId = this.ruleName[i]._id;
          }
        }
      }
      if (this.addData.ruleType == "新品") {
        this.addData.ruleType = "new";
      } else {
        this.addData.ruleType = "hot";
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
    },
    getData() {
      getAllotRule(this.condition).then(res => {
        this.tableData = res.data.data;
      });
    }
  },
  mounted() {
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
.baspOne{
  text-align: center;
  margin: 0;
  color: #3c8dbc;
}
@media (max-width: 1500px) {
  .basp {
    text-align: center;
    font-size: 12px;
  }
}
</style>
<style>
.cTop1 .el-radio+.el-radio{
  margin-left: 0;
  margin-bottom: 15px;
}
.cTop1 .el-radio{
  width: 90px;
  margin-right: 10px;
}
.cTop1 .el-checkbox{
  width: 90px;
  margin-left: 0;
  margin-right: 10px;
  margin-bottom: 15px;
}
</style>