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
        <el-table-column property="createdDate" label="添加时间" align="center"></el-table-column>
        <el-table-column property="updatedDate" label="更新时间" align="center"></el-table-column>
      </el-table>
    </div>
    <el-dialog title="添加" :visible.sync="addebaydisLogin" width="78%">
      <el-row style="margin-top: 0">
        <el-col :span="24" class="cTop">
          <el-col :span="6" style="margin-bottom: 20px">
            <el-col :span="7">
              <p class="basp">开发</p>
            </el-col>
            <el-col :span="17">
              <el-select v-model="addData.username" placeholder="请选择" style="width:100%;">
                <el-option
                  v-for="(item,key) in member"
                  :key="item.key"
                  :label="item.username"
                  :value="item.username"
                ></el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="6" style="margin-bottom: 20px">
            <el-col :span="7">
              <p class="basp">部门</p>
            </el-col>
            <el-col :span="17">
              <el-select v-model="addData.depart" placeholder="请选择" style="width:100%;">
                <el-option
                  v-for="(item,index) in department"
                  :index="index"
                  :key="item.id"
                  :label="item.department"
                  :value="item.department"
                ></el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="6" style="margin-bottom: 20px">
            <el-col :span="7">
              <p class="basp" style="text-align: center;">规则类型</p>
            </el-col>
            <el-col :span="17">
              <el-select
                v-model="addData.ruleType"
                placeholder="请选择"
                style="width:100%;"
                @change="getRuleName($event)"
              >
                <el-option
                  v-for="(item,index) in ruleType"
                  :index="index"
                  :key="item.id"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="6" style="margin-bottom: 20px">
            <el-col :span="7">
              <p class="basp" style="text-align: center;">推送规则</p>
            </el-col>
            <el-col :span="17">
              <el-select v-model="addData.ruleName" placeholder="请选择" style="width:100%;">
                <el-option
                  v-for="(item,index) in ruleName"
                  :index="index"
                  :key="item.id"
                  :label="item.ruleName"
                  :value="item.ruleName"
                ></el-option>
              </el-select>
            </el-col>
          </el-col>
          <!-- <el-col :span="6" style="margin-bottom: 20px">
            <el-col :span="7">
              <p class="basp" style="text-align: center;">类目规则ID</p>
            </el-col>
            <el-col :span="17">
              <el-input v-model="addData.cateRuleId"></el-input>
            </el-col>
          </el-col>-->
          <el-col :span="6" style="margin-bottom: 20px">
            <el-col :span="7">
              <p class="basp" style="text-align: center;">普源类目</p>
            </el-col>
            <el-col :span="17">
              <el-select style="width:100%" v-model="addData.category">
                <el-option
                  v-for="(item, key) in pyCate"
                  :key="item.key"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="6" style="margin-bottom: 20px">
            <el-col :span="7">
              <p class="basp" style="text-align: center;">发货地点</p>
            </el-col>
            <el-col :span="17">
              <el-select v-model="addData.deliveryLocation" placeholder="请选择" style="width:100%">
                <el-option v-for="item in place" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="6" style="margin-bottom: 20px">
            <el-col :span="7">
              <p class="basp" style="text-align: center;">推送产品数量</p>
            </el-col>
            <el-col :span="17">
              <el-input v-model="addData.productNum"></el-input>
            </el-col>
          </el-col>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addebaydisLogin = false">取 消</el-button>
        <el-button type="primary" @click="addsave()">保 存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑" :visible.sync="datadisLogin" width="78%">
      <el-row style="margin-top: 0">
        <el-col :span="24" class="cTop">
          <el-col :span="6" style="margin-bottom: 20px">
            <el-col :span="7">
              <p class="basp">开发</p>
            </el-col>
            <el-col :span="17">
              <el-select v-model="data.username" placeholder="请选择" style="width:100%;">
                <el-option
                  v-for="(item,key) in member"
                  :key="item.key"
                  :label="item.username"
                  :value="item.username"
                ></el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="6" style="margin-bottom: 20px">
            <el-col :span="7">
              <p class="basp">部门</p>
            </el-col>
            <el-col :span="17">
              <el-select v-model="data.depart" placeholder="请选择" style="width:100%;">
                <el-option
                  v-for="(item,index) in department"
                  :index="index"
                  :key="item.id"
                  :label="item.department"
                  :value="item.department"
                ></el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="6" style="margin-bottom: 20px">
            <el-col :span="7">
              <p class="basp" style="text-align: center;">规则类型</p>
            </el-col>
            <el-col :span="17">
              <el-select
                v-model="data.ruleType"
                placeholder="请选择"
                style="width:100%;"
                @change="getRuleName($event)"
              >
                <el-option
                  v-for="(item,index) in ruleType"
                  :index="index"
                  :key="item.id"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="6" style="margin-bottom: 20px">
            <el-col :span="7">
              <p class="basp" style="text-align: center;">推送规则</p>
            </el-col>
            <el-col :span="17">
              <el-select v-model="data.ruleName" placeholder="请选择" style="width:100%;">
                <el-option
                  v-for="(item,index) in ruleName"
                  :index="index"
                  :key="item.id"
                  :label="item.ruleName"
                  :value="item.ruleName"
                ></el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="6" style="margin-bottom: 20px">
            <el-col :span="7">
              <p class="basp" style="text-align: center;">类目</p>
            </el-col>
            <el-col :span="17">
              <el-select style="width:100%" v-model="data.category">
                <el-option
                  v-for="(item, key) in pyCate"
                  :key="item.key"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="6" style="margin-bottom: 20px">
            <el-col :span="7">
              <p class="basp" style="text-align: center;">发货地点</p>
            </el-col>
            <el-col :span="17">
              <el-select v-model="data.deliveryLocation" placeholder="请选择" style="width:100%">
                <el-option v-for="item in place" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="6" style="margin-bottom: 20px">
            <el-col :span="7">
              <p class="basp" style="text-align: center;">推送产品数量</p>
            </el-col>
            <el-col :span="17">
              <el-input v-model="data.productNum"></el-input>
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
      addData: {
        username: null,
        depart: null,
        ruleId: null,
        ruleName: null,
        ruleType: null,
        cateRuleId: null,
        productNum: null,
        category: null,
        deliveryLocation: null
      },
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
  methods: {
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
        this.data.ruleType = "新品";
      } else {
        this.data.ruleType = "热销";
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
@media (max-width: 1500px) {
  .basp {
    text-align: center;
    font-size: 12px;
  }
}
</style>