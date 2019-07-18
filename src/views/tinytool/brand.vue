<template>
  <div>
    <el-form :model='condition'
             :inline='true'
             ref='condition'
             label-width='8rem'
             class='demo-form-inline toolbar'>
      <el-form-item label="品牌"
                    prop="brand">
        <el-input size="small"
                  v-model="condition.brand"
                  style="width:18rem"></el-input>
      </el-form-item>
      <el-form-item label="国家"
                    prop="country">
        <el-select size="small"
                   v-model="condition.country"
                   clearable>
          <el-option v-for="item in country"
                     :key="item"
                     :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类别"
                    prop="category">
        <el-select size="small"
                   v-model="condition.category"
                   clearable>
          <el-option v-for="item in category"
                     :key="item"
                     :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small"
                   type="primary"
                   @click="onSubmit(condition)">查询</el-button>
      </el-form-item>
    </el-form>
    <el-row v-loading="listLoading"
            element-loading-text="正在加载中...">
      <div 
              class="mix"
              v-for="item in this.tableData"
              :key="item.rowId">
        <a :href="item.url"
           target="_blank"
           style="text-decoration:none;paddint-top:8px;">
          <img :src=item.imgUrl
               :alt="item.imgName">
          <p>
            <font color="black"
                  size="3">
              <strong>{{item.brand}}</strong>
            </font>
          </p>
          <font color="black">
            {{item.country}}<br>{{item.category}}
          </font>
        </a>
      </div>
    </el-row>
    <el-col :span="24"
            class="toolbar posbottom"
            v-show="total>0">
      <div class="pagination-container">
        <el-pagination background
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="this.condition.page"
                       :page-sizes=[20,50,100,this.total]
                       :page-size="this.condition.pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
      </div>
    </el-col>
  </div>
</template>

<script>
import { getBrandcountry, getBrandcategory, getBrand } from '../../api/profit'
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 20,
      total: null,
      listLoading: false,
      tableData: [],
      country: [],
      category: [],
      condition: {
        brand: '',
        country: '',
        category: '',
        page: 1,
        pageSize: 20
      }
    }
  },
  // beforeRouteLeave(to, from, next) {
  //   if (from.name === '品牌列表') {
  //     const condition = JSON.stringify(this.condition)
  //     sessionStorage.setItem('condition', condition)
  //   } else {
  //     sessionStorage.removeItem('condition')
  //   }
  //   next()
  // },
  created() {
    // const condition = sessionStorage.getItem('condition')
    // if (condition != null) {
    //   this.condition = JSON.parse(condition)
    //   this.getData()
    // }
  },
  methods: {
    onSubmit() {
      this.getData();
    },
    handleSizeChange(val) {
      this.condition.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.condition.page = val;
      this.getData();
    },
    getData(){
      this.listLoading = true
      getBrand(this.condition).then(response => {
        this.listLoading = false
        this.tableData = response.data.data.items
        this.total = response.data.data._meta.totalCount;
        this.condition.page = response.data.data._meta.currentPage;
        this.condition.pageSize = response.data.data._meta.perPage;
      })
    },
  },
  mounted() {
    this.getData()
    getBrandcountry().then(response => {
      this.country = response.data.data
    })
    getBrandcategory().then(response => {
      this.category = response.data.data
    })
  }
}
</script>

<style lang="scss" scoped>
.el-form-item {
  margin: 0.8rem;
}
.el-row {
  max-height: 64rem;
  overflow: auto;
  .mix:hover {
    border-radius: 1rem;
    border: 1px solid #03c4eb;
  }
  .mix {
    width: 18.7%;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    display: inline-block;
    height: 13.35rem;
    margin-left: 0.9%;
    position: relative;
    transition: all 0.2s ease-in-out;
    padding-top: 1rem;
    margin-top: 15px;
    text-align: center;
    border: #ffffff solid 1px;
    overflow: hidden;
    p {
      margin: 0 0 1rem;
    }
  }
}
.posbottom{
  position: fixed;
  bottom: 0;
}
</style>

