<template>
  <!-- <div>死库</div> -->
  <div class="mainp">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, index) in this.allMenu"
        :label="item.name"
        :name="item.name"
        :key="index"
      ></el-tab-pane>
    </el-tabs>
    <div class="frist" v-show="show.frist">
      <div>
        <p>
          下载Joom模板 :
          <el-button @click="fhTemplate">下载模板</el-button>
        </p>
        <el-upload
          class="upload-demo"
          drag
          :action="action"
          multiple
          :headers="headers"
          :onError="uploadError"
          :on-success="uploadSuccess"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
        </el-upload>
      </div>
    </div>
    <div class="last" v-show="show.last">
       <el-table :data="tabdate" :height="tableHeight">
        <el-table-column type="index" fixed align="center" header-align="center"></el-table-column>
        <el-table-column label="上传人" header-align="center">
          <el-table-column prop="creator" :render-header="renderHeaderPic" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="订单编号" header-align="center">
          <el-table-column prop="tradeNid" :render-header="renderHeaderPic" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="物流单号" header-align="center">
          <el-table-column prop="trackNumber" :render-header="renderHeaderPic" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="完成状态" header-align="center">
          <el-table-column prop="isDone" :render-header="renderHeaderPic" align="center">
            <template slot-scope="scope">
              <a
                :class="scope.row.isDone=='0'?'clasRed1':'clasGreen1'"
              >{{scope.row.isDone==0?'未完成':'已完成'}}</a>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="承运商" header-align="center">
          <el-table-column prop="expressName" :render-header="renderHeaderPic" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="上传日期" header-align="center">
          <el-table-column
            prop="createDate"
            :render-header="renderHeaderPic"
            width="200"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="更新日期" header-align="center">
          <el-table-column
            prop="updateDate"
            :render-header="renderHeaderPic"
            width="200"
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

<script>
import { uploadJoom, getHeaders } from "../../api/api";
import { APITralog, APISortkMember,APISort,APIDownJoom } from "../../api/product";
import XLSX from "xlsx";

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
       goodsCode: "",
      total: 0,
      time1: null,
      time2: null,
      reccondition: {
        pageSize: 20,
        page: 1,
        tradeNid: null,
        trackNumber: null,
        isDone: null,
        expressName: null,
        creator: null,
        createDate: [],
        updateDate: []
      },
      condition: {
        suffix: [],
        goodsCode: ""
      },
      action: "upload",
      activeName:'joom物流单号更改',
      allMenu:[
        {"name":'joom物流单号更改'},
        {"name":'物流单号更改日志'}
      ],
      show:{
        frist:true,
        last:false
      },
      headers: Object()
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
      APITralog(this.reccondition).then(response => {
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
        this.reccondition.createDate = [
          this.formatDate(this.time1[0]),
          this.formatDate(this.time1[1])
        ];
      } else {
        this.reccondition.createDate = [];
      }
      if (this.time2 !== null && this.time2.length !== 0) {
        this.reccondition.updateDate = [
          this.formatDate(this.time2[0]),
          this.formatDate(this.time2[1])
        ];
      } else {
        this.reccondition.updateDate = [];
      }
      this.getPic();
    },
    renderHeaderPic(h, { column, $index }) {
      if ($index === 0) {
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
                value: this.reccondition.creator,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.reccondition.creator = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
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
              height: "30px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.reccondition.tradeNid,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.reccondition.tradeNid = value;
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
                value: this.reccondition.trackNumber,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.reccondition.trackNumber = value;
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
        let filters = [
          { text: "0", value: "未完成" },
          { text: "1", value: "已完成" }
        ];
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.reccondition.isDone,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.reccondition.isDone = value;
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
                  value: item.text,
                  label: item.value
                }
              });
            })
          ]
        );
      } else if ($index === 4) {
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
                value: this.reccondition.expressName,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.reccondition.expressName = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      }else if ($index === 5) {
        return h("el-date-picker", {
          props: {
            value: this.time1,
            size: "mini",
            type: "daterange"
          },
          style: {
            width: "180px",
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
      } else if ($index === 6) {
        return h("el-date-picker", {
          props: {
            value: this.time2,
            size: "mini",
            type: "daterange"
          },
          style: {
            width: "180px",
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
      if (tab.name === "joom物流单号更改") {
        this.show["frist"] = true;
      } else {
        this.show["frist"] = false;
      }
      if (tab.name === "物流单号更改日志") {
        this.show["last"] = true;
      } else {
        this.show["last"] = false;
      }
    },
    uploadSuccess(response, file, fileList) {
      if (response.code == 200 && response.data[0] == "上传成功") {
        this.$message({
          message: "上传成功",
          type: "success"
        });
      } else {
        this.$message.error(response.message);
      }
    },
    uploadError(err, file, fileList) {
      console.log(err);
    },
    fhTemplate() {
      APIDownJoom().then(res => {
        const blob = new Blob([res.data], {
          type: "application/vnd.ms-excel;charset=UTF-8"
        });
        var file = res.headers["content-disposition"]
          .split(";")[1]
          .split("filename=")[1];
        var filename = JSON.parse(file);
        const downloadElement = document.createElement("a");
        const objectUrl = window.URL.createObjectURL(blob);
        downloadElement.href = objectUrl;
        // const filename =
        //   "joom_" + year + month + strDate + hour + minute + second;
        downloadElement.download = filename;
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);
      });
    }
  },
  mounted() {
    this.getPic();
    this.action = uploadJoom();
    this.headers = getHeaders();
  }
};
</script>

<style scoped lang='scss'>
.main {
  .frist {
    float: left;
    margin-left: 50px;
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