<template>
  <section>
    <!-- 新增 -->
    <el-col :span="24" class="toolbar">
      <el-button plain @click="handleAdd">新增</el-button>
    </el-col>
    <!-- 标题列表 -->
    <el-table :data="logList" :loading="listLoading">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="createdDate" label="创建时间" :formatter="formatter" width="140"></el-table-column>
      <el-table-column prop="creator" label="创建人"></el-table-column>
      <el-table-column prop="type" label="类型"></el-table-column>
      <el-table-column prop="title" label="标题">
        <template slot-scope="scope">
          <span v-html="scope.row.title"></span>
        </template>
      </el-table-column>
      <el-table-column prop="details" label="详情">
        <template slot-scope="scope">
          <span v-html="scope.row.details"></span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
     <div class="block toolbar">
      <el-pagination background @size-change='handleSizeChange' @current-change='handleCurrentChange' :current-page="this.data.page" :page-size="this.data.pageSize" :page-sizes="[10,20,30,40]" layout="total,sizes,prev,pager,next,jumper" :total="this.totalCount">
      </el-pagination>
    </div>
    <!-- 新增界面 -->
    <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" label-position="left" ref="addForm">
        <el-form-item label="标题" prop="title">
          <el-input v-model="addForm.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="详情" prop="details">
          <el-input v-model="addForm.details" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="detail">
          <el-input v-model="addForm.type" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit">提交</el-button>
      </div>
    </el-dialog>
    <!-- 编辑界面 -->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" label-position="left" ref="editForm">
        <el-form-item label="标题" prop="title">
          <el-input v-model="editForm.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="详情" prop="details">
          <el-input v-model="editForm.details" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="detail">
          <el-input v-model="editForm.type" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { updateLog, APILogSave,APILogInfo,APILogDelete } from "../../api/product";

export default {
  data() {
    return {
      data: {
        page: 1,
        pageSize: 10
      },
      totalCount: null,
      listLoading: false,
      editFormVisible: false,
      addFormVisible: false,
      logList: [],
      addForm: {
        title: "",
        details: "",
        type: "",
        id:null
      },
      editForm: {
        title: "",
        details: "",
        id: null,
        type:''
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      this.data.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.data.page = val;
      this.getData();
    },
    // 新增界面弹出
    handleAdd() {
      const form = {
        title: "",
        detail: "",
        star: 0,
        isTop: 0
      };
      this.addForm = Object.assign({}, form);
      this.addFormVisible = true;
    },
    // 新增界面提交
    addSubmit() {
      this.addFormVisible = false;
      const addContent = Object.assign({}, this.addForm);
      APILogSave(addContent).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: "新增成功",
            type: "success"
          });
          this.getData();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 编辑界面弹出
    handleEdit(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    // 编辑界面提交
    editSubmit() {
      APILogSave(this.editForm).then(res => {
        this.editFormVisible = false;
        this.getData();
      });
    },
    // 删除
    handleDel(index, row) {
      this.$confirm("确定删除该条记录？", "提示", { type: "warning" }).then(
        () => {
          this.listLoading = true;
          let str={
              id:row.id
          }
          APILogDelete(str).then(res => {
            this.listLoading = false;
            this.getData();
          });
        }
      );
    },
    formatter(row, column) {
      return row.createdDate ? row.createdDate.substring(0, 16) : "";
    },
    getData() {
      updateLog(this.data).then(res => {
        if (res.data.code == 200) {
          this.logList = res.data.data.items;
          this.data.page = res.data.data._meta.currentPage
          this.data.pageSize = res.data.data._meta.perPage
          this.totalCount = res.data.data._meta.totalCount
        } else {
          this.$message.error(res.data.message);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.toolbar {
  padding: 10px 40px;
}
</style>

