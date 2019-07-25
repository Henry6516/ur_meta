<template>
  <section>
    <!-- 新增 -->
    <el-col :span="24" class="toolbarD">
      <el-button type="primary" @click="handleAdd">新增</el-button>
    </el-col>
    <!-- 标题列表 -->
    <el-col :span="24" class="toolbarrr">
    <el-table :data="newsList" :loading="listLoading" style="width:98%;margin-left:0.8%;" :height="tableHeight" class="elTableee" border :header-cell-style="getRowClass">
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column type="index" width="60" align="center"></el-table-column>
      <el-table-column prop="createDate" label="创建时间" :formatter="formatter" align="center"></el-table-column>
      <el-table-column prop="creator" label="创建人" align="center"></el-table-column>
      <el-table-column prop="title" label="标题" align="center">
        <template slot-scope="scope">
          <span v-html="scope.row.title"></span>
        </template>
      </el-table-column>
      <el-table-column prop="detail" label="详情" align="center">
        <template slot-scope="scope">
          <span v-html="scope.row.detail"></span>
        </template>
      </el-table-column>
      <el-table-column prop="isTop" label="是否置顶" align="center"></el-table-column>
      <el-table-column label="操作" width="220" align="center">
        <template slot-scope="scope"> 
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-col>
    <!-- 分页 -->
    <div class="block toolbar posb">
      <el-pagination background @size-change='handleSizeChange' @current-change='handleCurrentChange' :current-page="this.data.page" :page-size="this.data.pageSize" :page-sizes="[10,20,30,40]" layout="total,sizes,prev,pager,next,jumper" :total="this.totalCount">
      </el-pagination>
    </div>
    <!-- 新增界面 -->
    <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" label-position="left" ref="addForm">
        <el-form-item label="创建人" prop="creator">
          <el-input v-model="addForm.creator" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="addForm.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="详情" prop="detail">
          <el-input v-model="addForm.detail" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否置顶" prop="isTop">
          <el-switch v-model="addForm.isTop" active-color="#13ce66" inactive-color="#909399" active-value="1" inactive-value="0"></el-switch>
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
        <el-form-item label="创建人" prop="creator">
          <el-input v-model="editForm.creator" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="editForm.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="详情" prop="detail">
          <el-input v-model="editForm.detail" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否置顶" prop="isTop">
          <el-switch v-model="editForm.isTop" active-color="#13ce66" inactive-color="#909399" active-value="1" inactive-value="0"></el-switch>
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
import { news, newsCreate, newsEdit, deleteNews } from '../../api/api'

export default {
  data() {
    return {
      tableHeight: window.innerHeight - 175,
      data: {
        page: 1,
        pageSize: 10
      },
      totalCount: null,
      listLoading: false,
      editFormVisible: false,
      addFormVisible: false,
      newsList: [],
      addForm: {
        title: '',
        detail: '',
        star: '',
        isTop: ''
      },
      editForm: {
        title: '',
        detail: '',
        star: '',
        isTop: '',
        createDate: '',
        id: null
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "color:#337ab7;background:#f5f7fa";
      } else {
        return "";
      }
    },
    // 分页
    handleSizeChange(val) {
      this.data.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.data.page = val
      this.getData()
    },
    // 新增界面弹出
    handleAdd() {
      const form = {
        title: '',
        detail: '',
        star: 0,
        isTop: 0
      }
      this.addForm = Object.assign({}, form)
      this.addFormVisible = true
    },
    // 新增界面提交
    addSubmit() {
      this.addFormVisible = false
      const addContent = Object.assign({}, this.addForm)
      newsCreate(addContent).then(res => {
        this.newsList.unshift(res.data.data)
      })
    },
    // 编辑界面弹出
    handleEdit(index, row) {
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
    },
    // 编辑界面提交
    editSubmit() {
      newsEdit(this.editForm).then(res => {
        this.editFormVisible = false
        const req = res.data
        this.newsList = this.newsList.map(ele => {
          if (parseInt(ele.id) === req.id) {
            return req
          }
          return ele
        })
        this.getData()
      })
    },
    // 删除
    handleDel(index, row) {
      this.$confirm('确定删除该条记录？', '提示', { type: 'warning' }).then(
        () => {
          this.listLoading = true
          deleteNews(row.id).then(res => {
            this.listLoading = false
            this.newsList.splice(index, 1)
          })
        }
      )
    },
    formatter(row, column) {
      return row.createDate ? row.createDate.substring(0, 16) : ''
    },
    getData() {
      news(this.data).then(res => {
        this.newsList = res.data.data.items
        this.data.page = res.data.data._meta.currentPage
        this.data.pageSize = res.data.data._meta.perPage
        this.totalCount = res.data.data._meta.totalCount
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.toolbar{
  padding: 15px 15px;
}
.posb{
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 5px;
}
.toolbarD{
  padding: 10px 15px;
}
.toolbarrr{
  background: #eee;
  padding-top: 12px;
}
</style>

