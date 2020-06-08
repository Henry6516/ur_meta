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
        <el-row>
          <div class="ckBox">
            <el-col :span="24" class="newDj">
              <el-col :span="4" style="margin-left:15px;">
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
              </el-col>
              <el-col :span="3">
                <el-button type="danger" size="small" @click='export01Excel' style="margin-left:10px">
                  下载模板
                </el-button>
              </el-col>
              <div class="ckRight">
                <span class="ckText" @click="tabcl('1')"><span class="ckActive" :class="ckindex==1?'ckActiveBlock':''"></span><span>导入列表</span></span>
                <span class="ckText" @click="tabcl('0')"><span class="ckActive" :class="ckindex==0?'ckActiveBlock':''"></span><span>导入记录</span></span>
              </div>  
            </el-col>
          </div>
          <el-col :span="24">
            <el-table
            :data="data1"
            border
            v-show="ckindex==0"
            class="elTable"
            :header-cell-style="getRowClass" 
            :height="tableHeightCk"
            style="width: 97.1%;margin-left:1.2%;margin-top:15px"
          >
            <el-table-column type="index" fixed align="center" width="60" header-align="center"></el-table-column>
            <el-table-column label="文件名" align="center" prop="fileName">
            </el-table-column>
            <el-table-column label="文件大小" align="center" prop="fileSize">
            </el-table-column>
            <el-table-column label="上传人" align="center" prop="creator">
            </el-table-column>
            <el-table-column label="创建时间" align="center" prop="createdDate">
            </el-table-column>
            <el-table-column label="更新时间" align="center" prop="updatedDate">
            </el-table-column>
          </el-table>
          <el-table
            :data="data2"
            border
            class="elTable"
            v-show="ckindex==1"
            :header-cell-style="getRowClass" 
            :height="tableHeightCk"
            style="width: 97.1%;margin-left:1.2%;margin-top:15px"
          >
            <el-table-column type="index" fixed align="center" width="60" header-align="center"></el-table-column>
            <el-table-column label="姓 名" align="center" prop="name">
            </el-table-column>
            <el-table-column label="职 位" align="center" prop="job">
            </el-table-column>
            <el-table-column label="组 别" align="center" prop="group">
            </el-table-column>
            <el-table-column label="月 份" align="center" prop="month">
            </el-table-column>
            <el-table-column label="小 组" align="center" prop="team">
            </el-table-column>
            <el-table-column label="出勤天数" align="center" prop="all_days">
            </el-table-column>
            <el-table-column label="贴标出勤天数" align="center" prop="labeling_days">
            </el-table-column>
            <el-table-column label="分拣出勤天数" align="center" prop="sorting_days">
            </el-table-column>
            <el-table-column label="其它得分项" align="center" prop="other_integral">
            </el-table-column>
            <el-table-column label="扣分项" align="center" prop="deduction_integral">
            </el-table-column>
            <el-table-column label="更新时间" align="center" prop="update_time">
              <template slot-scope="scope">
                {{scope.row.update_time | cutOutDate}}
              </template>
            </el-table-column>
          </el-table>
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
  getDeletewarehouseRate,
  getintegralLog
} from "../../api/product";
import { uploadCk, getHeaders } from "../../api/api";
import XLSX from 'xlsx'
export default {
  data() {
    return {
      show:{
        sz:true,
        sj:false
      },
      data1:[],
      data2:[],
      ckindex:0,
      activeName:'参数设置',
      allMenu: ['参数设置','数据导入'],
      action: "upload",
      headers: Object(),
      tableHeight: window.innerHeight - 175,
      tableHeightCk: window.innerHeight - 195,
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
  filters: {
    cutOutDate(value) {
      value = value.substring(0, 15);
      return value;
    },
  },
  methods: {
    tabcl(n){
      this.ckindex=n
    },
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
      if (response.code == 200) {
        this.$message({
          message: "上传成功",
          type: "success"
        });
        this.getLog();
      } else {
        this.$message.error(response.message);
      }
    },
    uploadError(err, file, fileList) {
      console.log(err);
    },
    export01Excel() {
      var dataArr =[
        {
          "name":'庄美英',
          "month":'2020-03',
          "group":'生产组',
          "job":'打包',
          "team":'周芹英',
          "all_days":'0',
          "labeling_days":'2',
          "sorting_days":'0',
          "other_integral":'11',
          "deduction_integral":'22'
        }
      ]
      const th = [
        "name",
        "month",
        "group",
        "job",
        "team",
        "all_days",
        "labeling_days",
        "sorting_days",
        "other_integral",
        "deduction_integral"
      ];
      const filterVal = [
        "name",
        "month",
        "group",
        "job",
        "team",
        "all_days",
        "labeling_days",
        "sorting_days",
        "other_integral",
        "deduction_integral"
      ];
      const Filename = "example";
      const data = dataArr.map(v => filterVal.map(k => v[k]));
      const [fileName, fileType, sheetName] = [Filename, "xlsx"];
      this.$toExcel({ th, data, fileName, fileType, sheetName });
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
    },
    getLog(){
      getintegralLog().then(res => {
        this.data1 = res.data.data.log;
        this.data2 = res.data.data.content;
      });
    },
  },
  mounted() {
    this.action = uploadCk();
    this.headers = getHeaders();
    this.getDateArt();
    this.getLog();
  }
};
</script>

<style lang="scss">
.newDj .el-upload-dragger{
  width:100% !important;
  height: 32px !important;
  line-height: 32px !important;
}
.newDj .upload-demo{
  height: 32px !important;
}
.newDj .el-upload{
  width: 100% !important;
}
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
<style scoped>
.ckBox{
  width: 97%;
  margin-left: 1.2%;
  border: 1px solid #e2e2e2;
  background: #f8f8f8;
  padding: 12px 0;
  overflow: hidden;
  border-radius: 6px;
  position: relative;
  margin-top: 15px;
}
.ckRight{
  position: absolute;
  right: 0;
  top: 9px;
  overflow: hidden;
}
.ckActive{
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: block;
  background: #fff;
  float: left;
  border: 1px solid #ccc;
  margin-top: 10px;
  margin-right: 10px;
}
.ckText{
  font-size: 14px;
  padding: 0 18px;
  display: block;
  float: right;
  cursor: pointer;
  border: 1px solid #eee;
  background: #fff;
  line-height: 35px;
  margin-right: 20px;
  border-radius: 5px;
}
.ckActiveBlock{
  background: #fff;
  width: 4px;
  height: 4px;
  border: 5px solid #409eff;
}
</style>
