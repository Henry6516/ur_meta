<template>
  <div>
    <el-button
      @click="addNew()"
      type="primary"
      size="small"
      style="margin-top:15px;margin-left:15px;"
    >创建</el-button>
    <el-table
      :data="tableData"
      style="width: 98%;margin-top:15px;margin-left:0.8%"
      border
      :height="tableHeight"
    >
      <el-table-column type="index" fixed align="center" header-align="center" width="50"></el-table-column>
      <el-table-column label="操作" fixed header-align="center" width="80" align="center">
        <template slot-scope="scope">
          <el-tooltip content="更新">
            <i
              @click="edit(scope.$index, scope.row)"
              class="el-icon-edit"
              style="color: #409EFF;cursor:pointer;"
            ></i>
          </el-tooltip>
          <el-tooltip content="删除">
            <i
              class="el-icon-delete"
              style="color: #409EFF;cursor:pointer;"
              @click="delet(scope.$index, scope.row)"
            ></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="account" label="账号" align="center">
        <el-table-column prop="account" :render-header="renderHeaderPic" align="center"></el-table-column>
      </el-table-column>
      <el-table-column prop="balanceTime" label="出账单日期" align="center">
        <el-table-column prop="balanceTime" :render-header="renderHeaderPic" align="center"></el-table-column>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="this.condition.page"
      :page-sizes="[50, 100, 200]"
      :page-size="this.condition.pageSize"
      layout="total, sizes,slot, prev, pager, next, jumper"
      :total="this.total"
      style="padding-top:5px;padding-bottom:5px;"
    >
      <el-button type="text" @click="showAll">显示全部</el-button>
    </el-pagination>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false"
    >
      <el-row>
        <el-col :span="24">
          <el-col :span="5">
            <span class="appSpan">账号</span>
          </el-col>
          <el-col :span="18">
            <el-select
              v-model="add.account"
              filterable
              placeholder="请选择"
              clearable
              allow-create
              default-first-option
              style="width:100%"
            >
              <el-option
                v-for="item in accountList"
                :key="item.id"
                :label="item.store"
                :value="item.store"
              ></el-option>
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="24" style="margin-top:15px;">
          <el-col :span="5">
            <span class="appSpan">出账单日期</span>
          </el-col>
          <el-col :span="18">
            <el-select v-model="add.balanceTime" placeholder="请选择" style="width:100%">
              <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-col>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveData">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getEbayBalanceTimeGet,
  getebayBalanceTimeCreate,
  getebayBalanceTimeDelet,
  getebayBalanceTimeUpdate
} from "../../api/product";
import { getAccount } from "../../api/profit";
export default {
  data() {
    return {
      options: ["月初", "月中", "月末"],
      tableData: [],
      title: null,
      accountList: [],
      tableHeight: window.innerHeight - 200,
      condition: {
        pageSize: 50,
        page: 1,
        account: null,
        sort: null,
        balanceTime: null
      },
      dialogVisible: false,
      total: null,
      add: {
        account: null,
        balanceTime: null
      }
    };
  },
  mounted() {
    this.getData();
    getAccount().then(response => {
      let data = response.data.data;
      for (let i = 0; i < data.length; i++) {
        if (data[i].platform == "eBay") {
          this.accountList.push(data[i]);
        }
      }
    });
  },
  methods: {
    delet(index, row) {
      let data = {
        id: row.id
      };
      this.$confirm("确定删除所选记录？", "提示", { type: "warning" }).then(
        () => {
          getebayBalanceTimeDelet(data).then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: "成功",
                type: "success"
              });
              this.getData();
            } else {
              this.$message.error(res.data.message);
            }
          });
        }
      );
    },
    saveData() {
      if (this.title == "更新账单") {
        getebayBalanceTimeUpdate(this.add).then(response => {
          if (response.data.code === 200) {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.dialogVisible = false;
            this.getData();
          } else {
            this.$message.error(response.data.message);
          }
        });
      } else {
        getebayBalanceTimeCreate(this.add).then(response => {
          if (response.data.code === 200) {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.dialogVisible = false;
            this.getData();
          } else {
            this.$message.error(response.data.message);
          }
        });
      }
    },
    edit(index, row) {
      this.add.account = row.account;
      this.add.balanceTime = row.balanceTime;
      this.add.id = row.id;
      this.title = "更新账单";
      this.dialogVisible = true;
    },
    addNew() {
      this.add.account = null;
      this.add.balanceTime = null;
      this.add.id = null;
      this.title = "添加账单";
      this.dialogVisible = true;
    },
    handleSizeChange(val) {
      this.condition.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.condition.page = val;
      this.getData();
    },
    showAll() {
      this.handleSizeChange(this.total);
    },
    getData() {
      getEbayBalanceTimeGet(this.condition).then(response => {
        this.tableData = response.data.data.items;
        this.total = response.data.data._meta.totalCount;
        this.condition.pageSize = response.data.data._meta.perPage;
        this.condition.page = response.data.data._meta.currentPage;
      });
    },
    renderHeaderPic(h, { column, $index }) {
      if ($index === 0) {
        return h(
          "div",
          {
            style: {
              height: "30px",
              width: "95%"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.condition.account,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.account = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.getData();
                }
              }
            })
          ]
        );
      } else if ($index === 1) {
        return h(
          "div",
          {
            style: {
              height: "30px",
              width: "95%"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.condition.balanceTime,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.balanceTime = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.getData();
                }
              }
            })
          ]
        );
      }
    }
  }
};
</script>
<style scoped>
.appSpan {
  display: block;
  text-align: center;
  line-height: 36px;
}
</style>
