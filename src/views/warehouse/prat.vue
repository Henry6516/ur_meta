<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, index) in this.allMenu"
        :label="item.name"
        :name="item.name"
        :key="index"
      ></el-tab-pane>
    </el-tabs>
    <div v-if="pickingTab">
      <el-form
        :model="condition"
        label-width="100px"
        class="demo-ruleForm login-container"
        ref="condition"
      >
        <el-form-item
          label="入库人："
          prop="user"
          :rules="[{required: true, message: '请填写字段', trigger: 'blur'}]"
        >
          <el-select v-model="condition.user" style="width:230px;">
            <el-option v-for="item in suffix" :key="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="SKU："
          prop="sku"
          :rules="[{required: true, message: '请填写字段', trigger: 'blur'}]"
        >
          <el-input
            v-model="condition.sku"
            placeholder="--必填--"
            @change="myFunction()"
            style="width:230px;"
            ref="gName"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="SKU数量："
          prop="number"
          :rules="[{required: true, message: '请填写字段', trigger: 'blur'}]"
        >
          <el-input
            v-model="condition.number"
            placeholder="--必填--"
            disabled
            style="width:230px;"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="input" @click="onSubmit()">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-if="recordTab">
      <el-table :data="tabdate" :height="tableHeight">
        <el-table-column type="index" fixed align="center" header-align="center"></el-table-column>
        <el-table-column label="入库人" header-align="center">
          <el-table-column prop="user" :render-header="renderHeaderPic" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="SKU" header-align="center">
          <el-table-column prop="sku" :render-header="renderHeaderPic" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="数量" header-align="center">
          <el-table-column prop="number" :render-header="renderHeaderPic" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="扫描时间" header-align="center">
          <el-table-column
            prop="createdTime"
            :render-header="renderHeaderPic"
            width="270"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="完成时间" header-align="center">
          <el-table-column
            prop="updatedTime"
            :render-header="renderHeaderPic"
            width="270"
            align="center"
          ></el-table-column>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.reccondition.page"
        :page-sizes="[20, 30, 40]"
        :page-size="this.reccondition.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  geteBaytemplate,
  getToolaccount,
  getPickMembe,
  APIPick
} from "../../api/profit";
import { APIwarehouseLog, APISortkMember,APISort,APISortMember,APIaddWarehouse } from "../../api/product";
import { getMenu } from "../../api/login";
export default {
  data() {
    return {
      suffix: [],
      tableHeight: window.innerHeight - 135,
      allMenu: [],
      tabdate: [],
      pickingTab: true,
      recordTab: false,
      pickName: [],
      activeName: "入库扫描",
      goodsCode: "",
      total: 0,
      time1: null,
      time2: null,
      reccondition: {
        pageSize: 20,
        page: 1,
        user: null,
        sku: null,
        number: null,
        logisticsNo: null,
        createdTime: [],
      },
      condition: {
        user: [],
        sku: "",
        number:'1',
      }
    };
  },
  methods: {
    handleSizeChange(val) {
      this.reccondition.pageSize = val;
      this.getPic();
    },
    handleCurrentChange(val) {
      this.reccondition.page = val;
      this.getPic();
    },
    getPic() {
      APIwarehouseLog(this.reccondition).then(response => {
        this.tabdate = response.data.data.items;
        this.total = response.data.data._meta.totalCount;
        this.reccondition.pageSize = response.data.data._meta.perPage;
        this.reccondition.page = response.data.data._meta.currentPage;
      });
    },
    formatTen(num) {
      return num > 9 ? num + "" : "0" + num;
    },
    formatDate(date) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();
      return year + "-" + this.formatTen(month) + "-" + this.formatTen(day);
    },
    filter() {
      if (this.time1 !== null && this.time1.length !== 0) {
        this.reccondition.createdTime = [
          this.formatDate(this.time1[0]),
          this.formatDate(this.time1[1])
        ];
      } else {
        this.reccondition.createdTime = [];
      }
      if (this.time2 !== null && this.time2.length !== 0) {
        this.reccondition.updatedTime = [
          this.formatDate(this.time2[0]),
          this.formatDate(this.time2[1])
        ];
      } else {
        this.reccondition.updatedTime = [];
      }
      this.getPic();
    },
    renderHeaderPic(h, { column, $index }) {
      if ($index === 0) {
        let filters = this.pickName;
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.reccondition.user,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.reccondition.user = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.filter();
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item,
                  label: item
                }
              });
            })
          ]
        );
      } else if ($index === 1) {
        return h(
          "div",
          {
            style: {
              height: "30px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.reccondition.sku,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.reccondition.sku = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      } else if ($index === 2) {
        return h(
          "div",
          {
            style: {
              height: "30px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.reccondition.number,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.reccondition.number = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      } else if ($index === 3) {
        return h("el-date-picker", {
          props: {
            value: this.time1,
            size: "mini",
            type: "daterange"
          },
          style: {
            width: "250px",
            padding: "2px"
          },
          on: {
            input: value => {
              this.time1 = value;
              this.$emit("input", value);
            },
            change: value => {
              this.filter();
            }
          }
        });
      } else if ($index === 4) {
        return h("el-date-picker", {
          props: {
            value: this.time2,
            size: "mini",
            type: "daterange"
          },
          style: {
            width: "250px",
            padding: "2px"
          },
          on: {
            input: value => {
              this.time2 = value;
              this.$emit("input", value);
            },
            change: value => {
              this.filter();
            }
          }
        });
      }
    },
    handleClick(tab, event) {
      if (tab.label === "入库扫描") {
        this.pickingTab = true;
      } else {
        this.pickingTab = false;
      }
      if (tab.label === "扫描记录") {
        this.recordTab = true;
        this.getPic();
      } else {
        this.recordTab = false;
      }
    },
    myFunction() {
      this.onSubmit();
    },
    onSubmit(form) {
      this.$refs.condition.validate(valid => {
        if (valid) {
          let obj = {
            user: this.condition.user,
            sku: this.condition.sku,
            number: this.condition.number
          };
          APIaddWarehouse(obj).then(response => {
            if (response.data.code == 200) {
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.condition.sku = "";
              this.$refs.gName.focus();
            } else {
              this.$message.error(res.data.message);
            }
          });
        }
        if (!valid) {
          this.$refs.gName.focus();
        }
      });
    }
  },
  mounted() {
    APISortkMember().then(response => {
      this.pickName = response.data.data;
    });
    let obj = {
      type:'warehouse'
    }
    APISortMember(obj).then(response => {
      this.suffix = response.data.data;
    });
    this.getPic();
    getMenu().then(response => {
      const res = response.data.data;
      const menu = res.filter(e => e.name === "仓库工具");
      let arr = menu[0].children;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].name == "入库工具") {
          this.allMenu = arr[i].tabs;
        }
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 8rem auto;
  width: 40rem;
  padding: 6rem 2rem 2rem 4.5rem;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;

  .el-form-item {
    margin-bottom: 4rem;

    .el-input {
      width: 18rem;
    }

    .el-button {
      margin-left: 3rem;
    }
  }
}
.clasRed1 {
  color: #f56c6c;
  border: rgba(245, 108, 108, 0.2) solid 1px;
  background: rgba(245, 108, 108, 0.1);
  width: 50%;
  margin: auto;
  line-height: 32px;
  display: block;
  border-radius: 5px;
  margin-top: 8px;
  margin-bottom: 8px;
}
.clasGreen1 {
  color: #0e9a00;
  border-radius: 5px;
  width: 50%;
  margin: auto;
  line-height: 32px;
  display: block;
  border: rgba(3, 82, 38, 0.2) solid 1px;
  background: rgba(33, 170, 95, 0.1);
  margin-top: 8px;
  margin-bottom: 8px;
}
</style>

