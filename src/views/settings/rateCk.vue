<template>
  <section>
    <div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, index) in this.allMenu"
        :label="item"
        :name="item"
        :key="index"
      ></el-tab-pane>
      </el-tabs>
      <div v-show="show.sz">
        <el-row class="contentt">
        <el-col :span="24" class="newDj">
          <!-- <el-col :span="3">
            <el-upload
              class="upload-demo"
              drag
              :action="action"
              multiple
              :headers="headers"
              :onError="uploadError"
              :on-success="uploadSuccess"
            >
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
          </el-col> -->
          <el-col :span="5">
            <el-button type="primary" size="small" @click="addJoomArt()">
              创建
            </el-button>
            <!-- <el-button type="danger" size="small" @click='export01Excel'>
              下载模板
            </el-button> -->
          </el-col>
        </el-col>
      </el-row>
      <el-row class="content1">
        <el-col :span="24">
          <el-table
            :data="dateArt"
            border
            class="elTable"
            :header-cell-style="getRowClass" 
            :height="tableHeight"
            style="width: 98%;"
          >
            <el-table-column type="index" fixed align="center" width="60" header-align="center"></el-table-column>
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
            <el-table-column label="参数名称" align="center" prop="type">
            </el-table-column>
            <el-table-column label="参数值" align="center" prop="rate">
            </el-table-column>
            <el-table-column label="更新时间" align="center" prop="update">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      </div>
      <div v-show="show.sj">
        <el-row class="contentt">
          <el-col :span="24" class="newDj">
              <el-button type="danger" size="small" @click='export01Excel'>
                下载模板
              </el-button>
              <el-upload
                class="upload-demo"
                drag
                :action="action"
                multiple
                :headers="headers"
                style="margin-top:15px;"
                :onError="uploadError"
                :on-success="uploadSuccess"
              >
              <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              </el-upload>
          </el-col>
        </el-row>
      </div>
      <el-dialog title="创建" :visible.sync="dialogPictureBjArt">
        <el-row class="contentt" style="margin-top: 0">
          <el-col :span="24" class="cTop">
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">参数名称</p>
              </el-col>
                <el-col :span="20">
                  <el-input v-model="condition.type"></el-input>
                </el-col>
            </el-col>
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">参数值</p>
              </el-col>
              <el-col :span="20">
                <el-input v-model="condition.rate" type='number'></el-input>
              </el-col>
            </el-col>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogPictureBjArt = false">取 消</el-button>
          <el-button type="primary" @click="addJoomTjArt()">添 加</el-button>
        </div>
      </el-dialog>
      <el-dialog title="编辑" :visible.sync="disLoginArt">
        <el-row class="contentt" style="margin-top: 0">
          <el-col :span="24" class="cTop">
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">参数名称</p>
              </el-col>
                <el-col :span="20">
                  <el-input v-model="savecondition.type"></el-input>
                </el-col>
            </el-col>
            <el-col :span="24" style="margin-bottom: 20px">
              <el-col :span="3">
                <p class="basp">参数值</p>
              </el-col>
              <el-col :span="20">
                <el-input v-model="savecondition.rate" type='number'></el-input>
              </el-col>
            </el-col>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="disLoginArt = false">取 消</el-button>
          <el-button type="primary" @click="saveArt()">保 存</el-button>
        </div>
      </el-dialog>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
import {
  getwarehouseRate,
  getSavewarehouseRate,
  getDeletewarehouseRate
} from "../../api/product";
import { uploadJoom, getHeaders } from "../../api/api";
import XLSX from 'xlsx'
export default {
  data() {
    return {
      show:{
        sz:true,
        sj:false
      },
      activeName:'积分参数',
      allMenu: ['参数设置','数据导入'],
      action: "upload",
      headers: Object(),
      tableHeight: window.innerHeight - 145,
      dateArt: [],
      data01: [['name', 'month', 'job', 'team', 'labeling_days', 'sorting_days', 'other_integral', 'deduction_integral']],
      dialogPictureArt: false,
      dialogPictureBjArt: false,
      disLoginArt: false,
      condition: {
        type:null,
        rate:null
      },
      savecondition: {
        id:null,
        type:null,
        rate:null
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      if (tab.label === "参数设置") {
        this.show.sz = true;
      } else {
        this.show.sz = false;
      }
      if (tab.label === "数据导入") {
        this.show.sj = true;
      } else {
        this.show.sj = false;
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
    export01Excel() {
      /* convert state to workbook */
      const ws = XLSX.utils.aoa_to_sheet(this.data01)
      const wb = XLSX.utils.book_new()
      const date = new Date()
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      let hour = date.getHours()
      let minute = date.getMinutes()
      let second = date.getSeconds()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      if (hour >= 0 && hour <= 9) {
        hour = '0' + hour
      }
      if (minute >= 0 && minute <= 9) {
        minute = '0' + minute
      }
      if (second >= 0 && second <= 9) {
        second = '0' + second
      }
      const filename =
        'example' + year + month + strDate + hour + minute + second
      XLSX.utils.book_append_sheet(wb, ws, 'Y_saleofflineclearn')
      /* generate file and send to client */
      XLSX.writeFile(wb, filename + '.xlsx')
    },    
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "color:#3c8dbc;background:#f5f7fa";
      } else {
        return "";
      }
    },
    editArt(index,row){
      this.savecondition.id=row.id
      this.savecondition.type=row.type
      this.savecondition.rate=row.rate
      this.disLoginArt=true
    },    
    addJoomTjArt() {
      getSavewarehouseRate(this.condition).then(res => {
        if (res.data.code=='200') {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.getDateArt();
          this.dialogPictureBjArt = false;
        }
      });
    },
    saveArt() {
      getSavewarehouseRate(this.savecondition).then(res => {
        if (res.data.code=='200') {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.disLoginArt = false;
          this.getDateArt();
        }
      });
    },
    delArt(index, row) {
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let conId = {
            id: row.id
          };
          getDeletewarehouseRate(conId).then(res => {
            if (res.data.message == "success") {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getDateArt();
            }
          });
        })
        .catch(() => {});
    },
    addJoomArt() {
      this.condition.type=null
      this.condition.rate=null
      this.dialogPictureBjArt = true;
    },
    viewPicArt(index, row) {
      let conId = {
        id: row.id
      };
      this.dialogPictureArt = true;
      APIRulesInfo(conId).then(res => {
        if (res.data.message == "success") {
          this.delistArt = res.data.data;
        }
      });
    },

    handleSizeChangeArt(val) {
      this.conditionArt.pageSize = val;
      this.getDateArt();
    },
    handleCurrentChangeArt(val) {
      this.conditionArt.page = val;
      this.getDateArt();
    },
    getDateArt() {
      getwarehouseRate().then(res => {
        this.dateArt = res.data.data;
      });
    }
  },
  mounted() {
    this.action = uploadJoom();
    this.headers = getHeaders();
    this.getDateArt();
  }
};
</script>

<style lang="scss">
// .newDj .el-upload-dragger{
//   width:100% !important;
//   height: 32px !important;
//   line-height: 32px !important;
// }
// .newDj .upload-demo{
//   height: 32px !important;
// }
// .newDj .el-upload{
//   width: 100% !important;
// }
.contentt {
  margin-left: 20px;
  margin-top: 15px;
}
.content1 {
  margin-left: 20px;
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
.elTable td {
  padding: 8px 0 !important;
}
.aArial{
  font-family: Arial !important;
}
.aArial .el-textarea__inner{
  font-family: Arial !important;
}
.aArial .el-input__inner{
  font-family: Arial !important;
}
</style>
