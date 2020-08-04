<template>
  <div>
    <el-form :model='condition'
             :inline='true'
             ref='condition'
             class='demo-form-inline toolbar'>
      <el-form-item label="平台" style="margin-left:20px;">
        <el-select size="small"
                   v-model="condition.plat"
                   clearable
                   style="width:140px;"
                   @change='platform'>
          <el-option v-for="item in plat"
                     :key="item.plat"
                     :value="item.plat"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="卖家简称">
        <el-select size="small"
                   v-model="condition.suffix"
                   clearable
                   multiple
                   collapse-tags>
          <el-button plain
                     type="info"
                     @click="selectall">全选</el-button>
          <el-button plain
                     type="info"
                     @click="noselect">取消</el-button>
          <el-option v-for="item in suffix"
                     :key="item.id"
                     :value="item.store"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="业绩归属人1">
        <el-select size="small"
                   style="width:140px;" 
                   v-model="condition.saler"
                   clearable>
          <el-option v-for="(item,index) in saler"
                     :index="index"
                     :key="item.username"
                     :value="item.username"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small"
                   type="primary"
                   @click="onSubmit(condition)">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-input clearable
                  size="small"
                  placeholder='search'
                  style="width:160px;"
                  v-model='searchValue'
                  @change='handleSearch'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small"
                   type='success'
                   @click='exportExcel'
                   :loading="downloadLoading">导出Excel</el-button>
      </el-form-item>
    </el-form>
    <!-- <el-row class="toolbar">
      <el-col :span='2'
              :offset='19'>
        <el-input clearable
                  placeholder='search'
                  v-model='searchValue'
                  @change='handleSearch'></el-input>
      </el-col>
      <el-col :span='2'>
        <el-button style='float:left'
                   type='default'
                   @click='exportExcel'
                   :loading="downloadLoading">导出Excel</el-button>
      </el-col>
    </el-row> -->
    <div>
      <el-table v-loading="listLoading"
                element-loading-text="正在加载中..."
                :height="tableHeight"
                :data="this.tableData"
                @sort-change="sortNumber"
                v-show="show"
                border 
                class="elTable"
                :header-cell-style="getRowClass"
                style="width: 100%;font-size:12px;">
        <el-table-column width="100"
                         prop="goodsCode"
                         label="商品编码"
                         align="center"
                         :formatter="empty"
                         sortable></el-table-column>
        <el-table-column width="120"
                         prop="goodsName"
                         label="商品名称"
                         align="center"
                         :formatter="empty"
                         sortable></el-table-column>
        <el-table-column width="100"
                         prop="goodsSKUStatus"
                         label="商品状态"
                         align="center"
                         :formatter="empty"
                         sortable></el-table-column>
        <el-table-column width="80"
                         prop="categoryName"
                         label="类目"
                         align="center"
                         :formatter="empty"
                         sortable></el-table-column>
        <el-table-column width="80"
                         prop="salerName"
                         label="归属1"
                         align="center"
                         :formatter="empty"
                         sortable></el-table-column>
        <el-table-column width="80"
                         prop="salerName2"
                         label="归属2"
                         align="center"
                         :formatter="empty"
                         sortable></el-table-column>
        <el-table-column width="100"
                         prop="createDate"
                         label="创建日期"
                         align="center"
                         :formatter="empty"
                         sortable>
                         <template slot-scope="scope">
                           {{scope.row.createDate | cutOut}}
                         </template>
                         </el-table-column>
        <el-table-column width="105"
                         prop="jinyitian"
                         align="center"
                         label="近1天销量"
                         :formatter="empty"
                         sortable></el-table-column>
        <el-table-column width="105"
                         prop="shangyitian"
                         align="center"
                         label="上1天销量"
                         :formatter="empty"
                         sortable></el-table-column>
        <el-table-column width="120"
                         prop="changeOneDay"
                         align="center"
                         label="1天销量变化"
                         :formatter="empty"
                         sortable></el-table-column>
        <el-table-column width="105"
                         prop="jinwutian"
                         align="center"
                         label="近5天销量"
                         :formatter="empty"
                         sortable></el-table-column>
        <el-table-column width="105"
                         prop="shangwutian"
                         align="center"
                         label="上5天销量"
                         :formatter="empty"
                         sortable></el-table-column>
        <el-table-column width="130"
                         prop="changeFiveDay"
                         align="center"
                         label="5天销量变化"
                         :formatter="empty"
                         sortable></el-table-column>
        <el-table-column width="120"
                         prop="jinshitian"
                         align="center"
                         label="近10天销量"
                         :formatter="empty"
                         sortable></el-table-column>
        <el-table-column width="120"
                         prop="shangshitian"
                         align="center"
                         label="上10天销量"
                         :formatter="empty"
                         sortable></el-table-column>
        <el-table-column width="130"
                         prop="changeTenDay"
                         align="center"
                         label="10天销量变化"
                         :formatter="empty"
                         sortable></el-table-column>
      </el-table>
    </div>
    <el-col :span="24"
            class="toolbar"
            v-show="total>0">
      <div class="pagination-container">
        <el-pagination background
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="this.condition.page"
                       :page-sizes="[100, 200, 500,1000,this.total]"
                       :page-size="this.condition.pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="this.total">
        </el-pagination>
      </div>
    </el-col>
  </div>
</template>

<script>
import { getPsales, getMember, getPlatform, getAccount } from '../../api/profit'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { compareUp, compareDown } from '../../api/tools'
import { APIPlatExportSales } from "../../api/product";
export default {
  data() {
    return {
      tableHeight: window.innerHeight - 195,
      downloadLoading: false,
      allData: [],
      allSuffix: [],
      show: false,
      currentPage: 1,
      pageSize: 100,
      listLoading: false,
      tableData: [],
      searchTable: [],
      searchValue: '',
      total: null,
      plat: [],
      suffix: [],
      saler: [],
      condition: {
        plat: '',
        suffix: [],
        saler: '',
        page: 1,
        pageSize: 100
      }
    }
  },
  filters: {
    cutOut: function(value) {
      value = value.substring(0, 11);
      return value;
    },
  },
  methods: {
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "color:#337ab7;background:#f5f7fa";
      } else {
        return "";
      }
    },
    // 全选
    selectall() {
      const allValues = []
      for (const item of this.suffix) {
        allValues.push(item.store)
      }
      this.condition.suffix = allValues
    },
    noselect() {
      this.condition.suffix = []
    },
    platform() {
      if (this.condition.plat.length > 0) {
        this.suffix = this.allSuffix.filter(
          e => e.platform === this.condition.plat
        )
      } else if (this.condition.plat.length === 0) {
        this.suffix = this.allSuffix
      }
    },
    handleSizeChange(val) {
      this.condition.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.condition.page = val
      this.getData()
    },
    onSubmit() {
      this.getData()
    },
    getData(){
      this.listLoading = true
      this.show=true
      getPsales(this.condition).then(response => {
        this.listLoading = false
        this.tableData = response.data.data.items
        this.total = response.data.data._meta.totalCount;
        this.condition.page = response.data.data._meta.currentPage;
        this.condition.pageSize = response.data.data._meta.perPage;
      })
    },
    // 导出
    exportExcel() {
      this.listLoading = true
      APIPlatExportSales(this.condition).then(res => {
        this.listLoading = false
        const blob = new Blob([res.data], {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        var file = res.headers["content-disposition"].split(";")[1].split("filename=")[1];
        var filename=JSON.parse(file)
        const downloadElement = document.createElement("a");
        const objectUrl = window.URL.createObjectURL(blob);
        downloadElement.href = objectUrl;
        // const filename =
        //   "Wish_" + year + month + strDate + hour + minute + second;
        downloadElement.download = filename;
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);
      });
      // this.downloadLoading = true
      // const th = [
      //   '商品编码',
      //   '商品名称',
      //   '商品状态',
      //   '类目',
      //   '归属1',
      //   '归属2',
      //   '创建日期',
      //   '近1天销量',
      //   '上1天销量',
      //   '1天销量变化',
      //   '近5天销量',
      //   '上5天销量',
      //   '5天销量变化',
      //   '近10天销量',
      //   '上10天销量',
      //   '10天销量变化'
      // ]
      // const filterVal = [
      //   'GoodsCode',
      //   'GoodsName',
      //   'GoodsSKUStatus',
      //   'CategoryName',
      //   'SalerName',
      //   'SalerName2',
      //   'CreateDate',
      //   'jinyitian',
      //   'shangyitian',
      //   'changeOneDay',
      //   'jinwutian',
      //   'shangwutian',
      //   'changeFiveDay',
      //   'jinshitian',
      //   'shangshitian',
      //   'changeTenDay'
      // ]
      // const form = Object.assign({}, this.condition)
      // form.limit = this.total
      // getPsales(form).then(response => {
      //   if (response.data.data.items.length > 0) {
      //     this.allData = response.data.data.items
      //     const Filename = '销售变化表'
      //     const data = this.allData.map(v => filterVal.map(k => v[k]))
      //     const [fileName, fileType, sheetName] = [Filename, 'xls']
      //     this.$toExcel({ th, data, fileName, fileType, sheetName })
      //     this.$message({
      //       message: '导出成功',
      //       duration: 5000,
      //       type: 'success'
      //     })
      //     this.downloadLoading = false
      //   } else {
      //     this.$message({
      //       message: '数据出错，请联系管理员',
      //       duration: 5000,
      //       type: 'warning'
      //     })
      //     this.downloadLoading = false
      //   }
      // })
    },
    handleSearch() {
      const searchValue = this.searchValue && this.searchValue.toLowerCase()
      const data = this.searchTable
      if (searchValue) {
        this.tableData = data.filter(function(row) {
          return Object.keys(row).some(function(key) {
            return (
              String(row[key])
                .toLowerCase()
                .indexOf(searchValue) > -1
            )
          })
        })
      } else {
        this.tableData = data
      }
    },
    empty(row, column, cellValue, index) {
      return cellValue || '--'
    },
    sortNumber(column, prop, order) {
      const data = this.tableData
      if (column.order === 'descending') {
        this.tableData = data.sort(compareDown(data, column.prop))
      } else {
        this.tableData = data.sort(compareUp(data, column.prop))
      }
    }
  },
  mounted() {
    getMember().then(response => {
      const s = response.data.data
      this.saler = s.filter(e => e.position === '开发')
    })
    getPlatform().then(response => {
      this.plat = response.data.data
    })
    getAccount().then(response => {
      this.allSuffix = this.suffix = response.data.data
    })
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  padding-top: 1rem;
}
</style>
