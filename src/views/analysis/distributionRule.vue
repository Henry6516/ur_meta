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
      <el-table :data="tableData" border style="width:98%;margin-left:0.7%;margin-top:15px;">
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
        <el-table-column property="ruleId" label="推送规则ID" align="center"></el-table-column>
        <el-table-column property="productNum" label="推送产品数量" align="center"></el-table-column>
        <el-table-column property="category" label="类目" align="center"></el-table-column>
        <el-table-column property="deliveryLocation" label="发货地点" align="center"></el-table-column>
        <el-table-column property="createdDate" label="添加时间" align="center"></el-table-column>
        <el-table-column property="updatedDate" label="更新时间" align="center"></el-table-column>
      </el-table>
    </div>
    <el-dialog title="添加" :visible.sync="addebaydisLogin" width="75%">
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
              <p class="basp" style="text-align: center;">推送规则ID</p>
            </el-col>
            <el-col :span="17">
              <el-input v-model="addData.ruleId"></el-input>
            </el-col>
          </el-col>
          <el-col :span="6" style="margin-bottom: 20px">
            <el-col :span="7">
              <p class="basp" style="text-align: center;">类目规则ID</p>
            </el-col>
            <el-col :span="17">
              <el-input v-model="addData.cateRuleId"></el-input>
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
          <el-col :span="6" style="margin-bottom: 20px">
            <el-col :span="7">
              <p class="basp" style="text-align: center;">类目</p>
            </el-col>
            <el-col :span="17">
              <el-input v-model="addData.category"></el-input>
            </el-col>
          </el-col>
          <el-col :span="6" style="margin-bottom: 20px">
            <el-col :span="7">
              <p class="basp" style="text-align: center;">发货地点</p>
            </el-col>
            <el-col :span="17">
              <el-input v-model="addData.deliveryLocation"></el-input>
            </el-col>
          </el-col>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addebaydisLogin = false">取 消</el-button>
        <el-button type="primary" @click="addsave()">保 存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑" :visible.sync="datadisLogin" width="75%">
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
              <p class="basp" style="text-align: center;">推送规则ID</p>
            </el-col>
            <el-col :span="17">
              <el-input v-model="data.ruleId"></el-input>
            </el-col>
          </el-col>
          <el-col :span="6" style="margin-bottom: 20px">
            <el-col :span="7">
              <p class="basp" style="text-align: center;">类目规则ID</p>
            </el-col>
            <el-col :span="17">
              <el-input v-model="data.cateRuleId"></el-input>
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
          <el-col :span="6" style="margin-bottom: 20px">
            <el-col :span="7">
              <p class="basp" style="text-align: center;">类目</p>
            </el-col>
            <el-col :span="17">
              <el-input v-model="data.category"></el-input>
            </el-col>
          </el-col>
          <el-col :span="6" style="margin-bottom: 20px">
            <el-col :span="7">
              <p class="basp" style="text-align: center;">发货地点</p>
            </el-col>
            <el-col :span="17">
              <el-input v-model="data.deliveryLocation"></el-input>
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
  DeleteAllotRule
} from "../../api/product";
import { getMember, getSection } from "../../api/profit";
export default {
  data() {
    return {
      tableData: [],
      department: [],
      member: [],
      addData: {
        username: null,
        depart: null,
        ruleId: null,
        cateRuleId: null,
        productNum: null,
        category: null,
        deliveryLocation: null
      },
      data: {
        id: null,
        username: null,
        depart: null,
        ruleId: null,
        cateRuleId: null,
        productNum: null,
        category: null,
        deliveryLocation: null
      },
      addebaydisLogin: false,
      datadisLogin: false
    };
  },
  methods: {
    add() {
      this.addData.username = null;
      this.addData.depart = null;
      this.addData.ruleId = null;
      this.addData.cateRuleId = null;
      this.addData.productNum = null;
      this.addData.category = null;
      this.addData.deliveryLocation = null;
      this.addebaydisLogin = true;
    },
    editArt(index, row) {
      this.data.id = row._id;
      this.data.username = row.username;
      this.data.depart = row.depart;
      this.data.ruleId = row.ruleId;
      this.data.cateRuleId = row.cateRuleId;
      this.data.productNum = row.productNum;
      this.data.category = row.category;
      this.data.deliveryLocation = row.deliveryLocation;
      this.datadisLogin = true;
    },
    save() {
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