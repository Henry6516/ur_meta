<template>
  <section class="toolbar">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in this.allMenu" :label="item.name" :name="item.name" :key="index">
      </el-tab-pane>
    </el-tabs>
  <div v-show="show.product">
  <el-col :span="24" style="padding:10px 20px;">
    <el-button plain @click='dialogVisible=true'>新增产品</el-button>
    <el-button plain @click="delAll">批量删除</el-button>
  </el-col>
  <!-- 新增对话框 -->
  <el-dialog title='新增' :visible.sync="dialogVisible">
    <el-form :model="addForm" :rules="rules" label-width="100px" label-position="left" class="demo-ruleForm" ref="addForm">
      <el-form-item label="图片" prop='img'>
        <el-input size="small" v-model="addForm.img" placeholder="必填"></el-input>
      </el-form-item>
      <el-form-item label="主类目" prop='cate'>
        <el-select size="small" v-model="addForm.cate" @change="productcategory" style="width:100%;">
          <el-option v-for="item in cate" :value="item.CategoryName" :key="item.CategoryName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="子类目" prop='subCate'>
        <el-select size="small" v-model="addForm.subCate" :disabled="this.disabled" style="width:100%;">
          <el-option v-for="item in subCate" :value="item.CategoryName" :key="item.CategoryName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开发员" prop='developer'>
        <el-select size="small" v-model="addForm.developer" style="width:100%;">
          <el-option v-for="item in developer" :value="item.username" :key="item.username"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="供应商链接" prop='vendor1'>
        <el-input size="small" v-model="addForm.vendor1"></el-input>
      </el-form-item>
      <el-form-item label="平台参考链接" prop='origin1'>
        <el-input size="small" v-model="addForm.origin1"></el-input>
      </el-form-item>
      <el-form-item label="推荐理由" prop='introReason'>
        <el-input size="small" v-model="addForm.introReason" placeholder="选填"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click='dialogVisible=false'>取消</el-button>
      <el-button type="primary" @click="submitForm">确定</el-button>
    </span>
  </el-dialog>
  <!-- 查看对话框 -->
  <el-dialog title='查看' :visible.sync="dialogVisibleView">
    <el-form :model="viewForm" label-position="left" label-width="100px" ref="viewForm">
      <el-form-item label="图片" prop="img" class="item1">
        <img :src='viewForm.img' style="width: 150px;height: 100px;">
      </el-form-item>
      <el-form-item label="图片地址" prop="img" class="item">
        <span>{{viewForm.img}}</span>
      </el-form-item>
      <el-form-item label="主类目" prop="cate" class="item">
        <span>{{viewForm.cate}}</span>
      </el-form-item>
      <el-form-item label="子类目" prop="subCate" class="item">
        <span>{{viewForm.subCate}}</span>
      </el-form-item>
      <el-form-item label="供应商链接" prop="vendor1" class="item">
        <span>{{viewForm.vendor1}}</span>
      </el-form-item>
      <el-form-item label="平台参考链接" prop="origin1" class="item">
        <span>{{viewForm.origin1}}</span>
      </el-form-item>
    </el-form>
  </el-dialog>
  <!-- 更新对话框 -->
  <el-dialog title='更新' :visible.sync="dialogVisibleEdit">
    <el-form :model="editForm" :rules="rules" label-width="100px" label-position="left" ref="editForm">
      <el-form-item label="图片" class="item2">
        <img :src='editForm.img' style="width: 150px;height: 100px">
      </el-form-item>
      <el-form-item label="图片地址" prop="img">
        <el-input v-model="editForm.img"></el-input>
      </el-form-item>
      <el-form-item label="主类目" prop="cate">
        <el-select size="small" v-model="editForm.cate" @change="getSubcate" style="width:100%;">
          <el-option v-for="item in cate" :value="item.CategoryName" :key="item.CategoryName">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="子类目" prop="subCate">
        <el-select size="small" v-model="editForm.subCate" style="width:100%;">
          <el-option v-for="item in subCate" :value="item.CategoryName" :key="item.CategoryName">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开发员" prop="developer">
        <el-select size="small" v-model="editForm.developer" style="width:100%;">
          <el-option v-for="item in developer" :value="item.username" :key="item.username">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="供应商链接">
        <el-input size="small" v-model="editForm.vendor1"></el-input>
      </el-form-item>
      <el-form-item label="平台参考链接">
        <el-input size="small" v-model="editForm.origin1"></el-input>
      </el-form-item>
      <el-form-item label="推荐理由">
        <el-input size="small" v-model="editForm.introReason" placeholder="选填"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitEdit">确定</el-button>
    </span>
  </el-dialog>
  <!-- 认领对话框 -->
  <el-dialog :visible.sync="dialogVisibleClaim">
    <el-form :model="claimForm" label-position="left" label-width="50px" ref="claimForm">
      <el-form-item label="认领">
        <el-radio-group v-model="claimForm.devStatus">
          <el-radio label="正向认领" border>正向认领</el-radio>
          <el-radio label="逆向认领" border>逆向认领</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitClaim">确定</el-button>
    </span>
  </el-dialog>
  <el-table :data="tableData" @selection-change="selsChange">
    <el-table-column type="selection" fixed align="center" header-align="center">
    </el-table-column>
    <el-table-column type="index" fixed align="center" header-align="center">
    </el-table-column>
    <el-table-column label="操作" fixed header-align="center" width="100">
      <template slot-scope="scope">
        <el-tooltip content="查看">
          <el-button type="text" @click="view(scope.$index, scope.row)">
            <i class="el-icon-view"></i>
          </el-button>
        </el-tooltip>
        <el-tooltip content="更新">
          <el-button type="text" @click="edit(scope.$index, scope.row)">
            <i class="el-icon-edit"></i>
          </el-button>
        </el-tooltip>
        <el-tooltip content="删除">
          <el-button type="text" @click="del(scope.$index, scope.row)">
            <i class="el-icon-delete"></i>
          </el-button>
        </el-tooltip>
        <el-tooltip content="认领">
          <el-button type="text" @click="claim(scope.$index, scope.row)">
            <i class="el-icon-star-on"></i>
          </el-button>  
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="img" fixed label="图片" header-align="center">
      <template slot-scope="scope">
        <img :src='scope.row.img' style="width: 60px;height: 50px">
      </template>
    </el-table-column>
    <el-table-column label="主类目" header-align="center">
      <el-table-column prop="cate" :render-header="renderHeader" width='150' align="center">
      </el-table-column>
    </el-table-column>
    <el-table-column label="子类目" header-align="center">
      <el-table-column prop="subCate" :render-header="renderHeader" width='150' align="center">
      </el-table-column>
    </el-table-column>
    <el-table-column label="供应商链接" header-align="center">
      <el-table-column prop="vendor1" :render-header="renderHeader" width='170' align="center">
        <template slot-scope="scope">
          <a :href="scope.row.vendor1" target="_blank" class="classa">{{scope.row.vendor1 | cutOut }}</a>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column label="平台参考链接" header-align="center">
      <el-table-column prop="origin1" :render-header="renderHeader" width='170' align="center">
        <template slot-scope="scope">
          <a :href="scope.row.origin1" target="_blank" class="classa">{{scope.row.origin1 | cutOut }}</a>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column label="开发员" header-align="center">
      <el-table-column prop="developer" :render-header="renderHeader" width='150' align="center">
      </el-table-column>
    </el-table-column>
    <el-table-column label="推荐人" header-align="center">
      <el-table-column prop="introducer" :render-header="renderHeader" width='150' align="center">
      </el-table-column>
    </el-table-column>
    <el-table-column label="推荐理由" header-align="center">
      <el-table-column prop="introReason" :render-header="renderHeader" width='150' align="center">
      </el-table-column>
    </el-table-column>
    <el-table-column label="产品状态" header-align="center">
      <el-table-column prop="checkStatus" :render-header="renderHeader" width='150' align="center">
        <template slot-scope="scope">
          <a :class="scope.row.checkStatus=='未认领'?'clasRed':'clasGreen'">{{scope.row.checkStatus}}</a>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column label="审批备注" header-align="center">
      <el-table-column prop="approvalNote" :render-header="renderHeader" width='150' align="center">
      </el-table-column>
    </el-table-column>
    <el-table-column label="创建时间" header-align="center">
      <el-table-column prop="createDate" :render-header="renderHeader" width='200' align="center">
      </el-table-column>
    </el-table-column>
    <el-table-column label="更新时间" header-align="center">
      <el-table-column prop="updateDate" :render-header="renderHeader" width='200' align="center">
      </el-table-column>
    </el-table-column>
  </el-table>
  <div class="toolbar">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="this.condition.page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="this.condition.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.total">
    </el-pagination>
  </div>
    </div>
    <div v-show="show.forward">
      <el-col :span="24" style="padding:10px 20px;">
        <el-button plain @click='dialogVisible1 = true'>新增产品</el-button>
        <el-button plain>批量导入</el-button>
        <el-button plain @click="delAll1">批量删除</el-button>
        <el-button plain>下载模板</el-button>
        <el-button plain @click="claimAll1">批量提交审批</el-button>
      </el-col>
    <!-- 新增对话框 -->
    <el-dialog title='新增' :visible.sync="dialogVisible1">
      <el-form :model="addForm" :rules="rules" label-width="110px" label-position="left" class="demo-ruleForm" ref="addForm">
        <el-form-item label="图片" prop='img'>
          <el-input size="small" v-model="addForm.img" placeholder="必填"></el-input>
        </el-form-item>
        <el-form-item label="主类目" prop='cate'>
          <el-select size="small" v-model="addForm.cate" @change="productcategory" style="width:100%;" placeholder="请选择父类">
            <el-option v-for="item in cate" :value="item.CategoryName" :key="item.CategoryName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="子类目" prop='subCate' placeholder="请选择父类">
          <el-select size="small" v-model="addForm.subCate" :disabled="this.disabled" style="width:100%;">
            <el-option v-for="item in subCate" :value="item.CategoryName" :key="item.CategoryName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供应商链接1" prop='vendor1' :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
          <el-input size="small" v-model="addForm.vendor1" placeholder="必填"></el-input>
        </el-form-item>
        <el-form-item label="供应商链接2" prop='vendor2'>
          <el-input size="small" v-model="addForm.vendor2"></el-input>
        </el-form-item>
        <el-form-item label="供应商链接3" prop='vendor3'>
          <el-input size="small" v-model="addForm.vendor3"></el-input>
        </el-form-item>
        <el-form-item label="平台参考链接1" prop='origin1'>
          <el-input size="small" v-model="addForm.origin1" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="平台参考链接2" prop='origin2'>
          <el-input size="small" v-model="addForm.origin2" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="平台参考链接3" prop='origin3'>
          <el-input size="small" v-model="addForm.origin3" placeholder="选填"></el-input>
        </el-form-item>
        <!-- <el-form-item label="开发员" prop='developer'>
          <el-select size="small" v-model="addForm.developer" style="width:100%;">
            <el-option v-for="item in developer" :value="item.username" :key="item.username"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="售价($)" prop='salePrice'>
          <el-input size="small" v-model="addForm.salePrice" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="预估月销量" prop='hopeSale'>
          <el-input size="small" v-model="addForm.hopeSale" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="预估利润率(%)" prop='hopeRate'>
          <el-input size="small" v-model="addForm.hopeRate" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="预估重量(克)" prop='hopeWeight'>
          <el-input size="small" v-model="addForm.hopeWeight" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="预估成本(￥)" prop='hopeCost'>
          <el-input size="small" v-model="addForm.hopeCost" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="预估月毛利($)" prop='hopeMonthProfit'>
          <el-input size="small" v-model="addForm.hopeMonthProfit" disabled placeholder="自动计算"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-checkbox-group v-model="addForm.stockUp">
            <el-checkbox label="是否备货" true-label="是" false-label="否" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm1">创建</el-button>
        <el-button type="primary" @click="submitFormCheck">创建并提交审批</el-button>
      </span>
    </el-dialog>
    <!-- 查看对话框 -->
    <el-dialog title='查看' :visible.sync="dialogVisibleView1">
      <el-form :model="viewForm" label-position="left" label-width="110px" ref="viewForm">
        <el-form-item label="图片" prop="img" class="item1">
          <img :src='viewForm.img' style="width: 150px;height: 100px;">
        </el-form-item>
        <el-form-item label="图片地址" prop="img" class="item">
          <span>{{viewForm.img}}</span>
        </el-form-item>
        <el-form-item label="是否备货" prop="stockUp" class="item">
          <span>{{viewForm.stockUp===1?'是':'否'}}</span>
        </el-form-item>
        <el-form-item label="主类目" prop="cate" class="item">
          <span>{{viewForm.cate}}</span>
        </el-form-item>
        <el-form-item label="子类目" prop="subCate" class="item">
          <span>{{viewForm.subCate}}</span>
        </el-form-item>
        <el-form-item label="供应商链接1" prop="vendor1" class="item">
          <span>{{viewForm.vendor1}}</span>
        </el-form-item>
        <el-form-item label="供应商链接2" prop="vendor2" class="item">
          <span>{{viewForm.vendor2}}</span>
        </el-form-item>
        <el-form-item label="供应商链接3" prop="vendor3" class="item">
          <span>{{viewForm.vendor3}}</span>
        </el-form-item>
        <el-form-item label="平台参考链接1" prop="origin1" class="item">
          <span>{{viewForm.origin1}}</span>
        </el-form-item>
        <el-form-item label="平台参考链接2" prop="origin2" class="item">
          <span>{{viewForm.origin2}}</span>
        </el-form-item>
        <el-form-item label="平台参考链接3" prop="origin3" class="item">
          <span>{{viewForm.origin3}}</span>
        </el-form-item>
        <el-form-item label="开发编号" prop="devNum" class="item">
          <span>{{viewForm.devNum}}</span>
        </el-form-item>
        <el-form-item label="开发员" prop="developer" class="item">
          <span>{{viewForm.developer}}</span>
        </el-form-item>
        <el-form-item label="推荐人" prop="introducer" class="item">
          <span>{{viewForm.introducer}}</span>
        </el-form-item>
        <el-form-item label="推荐理由" prop="introReason" class="item">
          <span>{{viewForm.introReason}}</span>
        </el-form-item>
        <el-form-item label="认领" prop="devStatus" class="item">
          <span>{{viewForm.devStatus}}</span>
        </el-form-item>
        <el-form-item label="产品状态" prop="checkStatus" class="item">
          <span>{{viewForm.checkStatus}}</span>
        </el-form-item>
        <el-form-item label="创建时间" prop="createDate" class="item">
          <span>{{viewForm.createDate}}</span>
        </el-form-item>
        <el-form-item label="更新时间" prop="updateDate" class="item">
          <span>{{viewForm.updateDate}}</span>
        </el-form-item>
        <el-form-item label="售价($)" prop="salePrice" class="item">
          <span>{{viewForm.salePrice}}</span>
        </el-form-item>
        <el-form-item label="预估重量(克)" prop="hopeWeight" class="item">
          <span>{{viewForm.hopeWeight}}</span>
        </el-form-item>
        <el-form-item label="预估利润率(%)" prop="hopeRate" class="item">
          <span>{{viewForm.hopeRate}}</span>
        </el-form-item>
        <el-form-item label="预估月销量" prop="hopeSale" class="item">
          <span>{{viewForm.hopeSale}}</span>
        </el-form-item>
        <el-form-item label="预估月毛利($)" prop="hopeMonthProfit" class="item">
          <span>{{viewForm.hopeMonthProfit}}</span>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 更新对话框 -->
    <el-dialog title='更新' :visible.sync="dialogVisibleEdit1">
      <el-form :model="editForm" :rules="rules" label-width="110px" label-position="left" ref="editForm">
        <el-form-item label="图片" class="item2">
          <img :src='editForm.img' style="width: 150px;height: 100px">
        </el-form-item>
        <el-form-item label="图片地址" prop="img">
          <el-input v-model="editForm.img"></el-input>
        </el-form-item>
        <el-form-item label="主类目" prop="cate">
          <el-select size="small" v-model="editForm.cate" @change="getSubcate" style="width:100%;">
            <el-option v-for="item in cate" :value="item.CategoryName" :key="item.CategoryName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="子类目" prop="subCate">
          <el-select size="small" v-model="editForm.subCate" style="width:100%;">
            <el-option v-for="item in subCate" :value="item.CategoryName" :key="item.CategoryName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供应商链接1" prop="vendor1" :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
          <el-input size="small" v-model="editForm.vendor1"></el-input>
        </el-form-item>
        <el-form-item label="供应商链接2">
          <el-input size="small" v-model="editForm.vendor2"></el-input>
        </el-form-item>
        <el-form-item label="供应商链接3">
          <el-input size="small" v-model="editForm.vendor3"></el-input>
        </el-form-item>
        <el-form-item label="平台参考链接1">
          <el-input size="small" v-model="editForm.origin1"></el-input>
        </el-form-item>
        <el-form-item label="平台参考链接2">
          <el-input size="small" v-model="editForm.origin2"></el-input>
        </el-form-item>
        <el-form-item label="平台参考链接3">
          <el-input size="small" v-model="editForm.origin3"></el-input>
        </el-form-item>
        <el-form-item label="售价($)">
          <el-input size="small" v-model="editForm.salePrice" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="预估月销量:">
          <el-input size="small" v-model="editForm.hopeSale" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="预估利润率(%):">
          <el-input size="small" v-model="editForm.hopeRate" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="预估重量(克):">
          <el-input size="small" v-model="editForm.hopeWeight" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="预估成本(￥):">
          <el-input size="small" v-model="editForm.hopeCost" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="预估月毛利($):">
          <el-input size="small" v-model="editForm.hopeMonthProfit" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-checkbox-group v-model="editForm.stockUp">
            <el-checkbox label="是否备货" true-label="是" false-label="否" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitEdit1">更新</el-button>
        <el-button type="primary" @click="submitEditCheck">更新并提交审批</el-button>
      </span>
    </el-dialog>
    <el-table :data="tableData1" @selection-change="selsChange">
      <el-table-column type="selection" fixed align="center" header-align="center">
      </el-table-column>
      <el-table-column type="index" fixed align="center" header-align="center">
      </el-table-column>
      <el-table-column label="操作" fixed header-align="center" width="110">
        <template slot-scope="scope">
          <el-tooltip content="查看">
            <el-button type="text" @click="view1(scope.$index, scope.row)">
              <i class="iconfont icon-yulan"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip content="更新">
            <el-button type="text" @click="edit1(scope.$index, scope.row)">
              <i class="iconfont icon-bianji"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip content="删除">
            <el-button type="text" @click="del1(scope.$index, scope.row)">
              <i class="iconfont icon-shanchu"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip content="提交审核">
            <el-button type="text" @click="claim1(scope.$index, scope.row)">
              <i class="iconfont icon-zhihangfankui"></i>
            </el-button>  
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="img" fixed label="图片" header-align="center">
        <template slot-scope="scope">
          <img :src='scope.row.img' style="width: 60px;height: 50px">
        </template>
      </el-table-column>
      <el-table-column label="是否备货" header-align="center">
        <el-table-column prop="stockUp" :formatter="empty" :render-header="renderHeader1" width='150' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="主类目" header-align="center">
        <el-table-column prop="cate" :render-header="renderHeader1" width='150' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="子类目" header-align="center">
        <el-table-column prop="subCate" :render-header="renderHeader1" width='150' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="供应商链接1" header-align="center">
        <el-table-column prop="vendor1" :render-header="renderHeader1" width='170' align="center">
          <template slot-scope="scope">
            <a :href="scope.row.vendor1" target="_blank" class="classa">{{scope.row.vendor1 | cutOut }}</a>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="平台参考链接1" header-align="center">
        <el-table-column prop="origin1" :render-header="renderHeader1" width='170' align="center">
          <template slot-scope="scope">
            <a :href="scope.row.origin1" target="_blank" class="classa">{{scope.row.origin1 | cutOut }}</a>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="开发编号" header-align="center">
        <el-table-column prop="devNum" :render-header="renderHeader1" width='150' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="开发员" header-align="center">
        <el-table-column prop="developer" :render-header="renderHeader1" width='150' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="推荐人" header-align="center">
        <el-table-column prop="introducer" :render-header="renderHeader1" width='150' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="推荐理由" header-align="center">
        <el-table-column prop="introReason" :render-header="renderHeader1" width='150' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="产品状态" header-align="center">
        <el-table-column prop="checkStatus" :render-header="renderHeader1" width='150' align="center">
          <template slot-scope="scope">
            <a :class="scope.row.checkStatus=='已审批'?'clasGreen':scope.row.checkStatus=='已认领'?'clasGreen':'clasRed'">{{scope.row.checkStatus}}</a>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="审批备注" header-align="center">
        <el-table-column prop="approvalNote" :render-header="renderHeader1" width='150' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="创建时间" header-align="center">
        <el-table-column prop="createDate" :render-header="renderHeader1" width='200'  align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="更新时间" header-align="center">
        <el-table-column prop="updateDate" :render-header="renderHeader1" width='200' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="售价($)" header-align="center">
        <el-table-column prop="salePrice" :render-header="renderHeader1" width='200'  align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="预估重量(克)" header-align="center">
        <el-table-column prop="hopeWeight" :render-header="renderHeader1" width='200' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="预估利润率(%)" header-align="center">
        <el-table-column prop="hopeRate" :render-header="renderHeader1" width='200' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="预估月销量" header-align="center">
        <el-table-column prop="hopeSale" :render-header="renderHeader1" width='200' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="预估月毛利($)" header-align="center">
        <el-table-column prop="hopeMonthProfit" :render-header="renderHeader1" width='200' align="center">
        </el-table-column>
      </el-table-column>
    </el-table>
    <div class="toolbar">
      <el-pagination
        background
        @size-change="handleSizeChange1"
        @current-change="handleCurrentChange1"
        :current-page="this.condition1.page1"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="this.condition1.pageSize1"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total1">
      </el-pagination>
    </div>
    </div>
    <div v-show="show.reverse">
      <el-col :span="24" style="padding:10px 20px;">
        <el-button plain @click='dialogVisible2 = true'>新增产品</el-button>
        <el-button plain>批量导入</el-button>
        <el-button plain @click="delAll2">批量删除</el-button>
        <el-button plain>下载模板</el-button>
        <el-button plain @click="claimAll2">批量提交审批</el-button>
      </el-col>
      <!-- 新增对话框 -->
    <el-dialog title='新增' :visible.sync="dialogVisible2">
      <el-form :model="addForm" :rules="rules" label-width="110px" label-position="left" class="demo-ruleForm" ref="addForm">
        <el-form-item label="图片" prop='img'>
          <el-input size="small" v-model="addForm.img" placeholder="必填"></el-input>
        </el-form-item>
        <el-form-item label="主类目" prop='cate'>
          <el-select size="small" v-model="addForm.cate" @change="productcategory" style="width:100%;">
            <el-option v-for="item in cate" :value="item.CategoryName" :key="item.CategoryName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="子类目" prop='subCate'>
          <el-select size="small" v-model="addForm.subCate" :disabled="this.disabled" style="width:100%;">
            <el-option v-for="item in subCate" :value="item.CategoryName" :key="item.CategoryName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供应商链接1" prop='vendor1'>
          <el-input size="small" v-model="addForm.vendor1"></el-input>
        </el-form-item>
        <el-form-item label="供应商链接2" prop='vendor2'>
          <el-input size="small" v-model="addForm.vendor2"></el-input>
        </el-form-item>
        <el-form-item label="供应商链接3" prop='vendor3'>
          <el-input size="small" v-model="addForm.vendor3"></el-input>
        </el-form-item>
        <el-form-item label="平台参考链接1" prop='origin1'>
          <el-input size="small" v-model="addForm.origin1"></el-input>
        </el-form-item>
        <el-form-item label="平台参考链接2" prop='origin2'>
          <el-input size="small" v-model="addForm.origin2"></el-input>
        </el-form-item>
        <el-form-item label="平台参考链接3" prop='origin3'>
          <el-input size="small" v-model="addForm.origin3"></el-input>
        </el-form-item>
        <el-form-item label="开发员" prop='developer'>
          <el-select size="small" v-model="addForm.developer" style="width:100%;">
            <el-option v-for="item in developer" :value="item.username" :key="item.username"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="售价($)" prop='salePrice'>
          <el-input size="small" v-model="addForm.salePrice" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="预估月销量" prop='hopeSale'>
          <el-input size="small" v-model="addForm.hopeSale" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="预估利润率(%)" prop='hopeRate'>
          <el-input size="small" v-model="addForm.hopeRate" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="预估重量(克)" prop='hopeWeight'>
          <el-input size="small" v-model="addForm.hopeWeight" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="预估成本(￥)" prop='hopeCost'>
          <el-input size="small" v-model="addForm.hopeCost" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="预估月毛利($)" prop='hopeMonthProfit'>
          <el-input size="small" v-model="addForm.hopeMonthProfit" placeholder="自动计算"></el-input>
        </el-form-item>
        <el-form-item label="售价($)">
          <el-checkbox-group v-model="addForm.stockUp">
            <el-checkbox label="是否备货" true-label="是" false-label="否" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm2">创建</el-button>
        <el-button type="primary" @click="submitFormCheck2">创建并提交审批</el-button>
      </span>
    </el-dialog>
    <!-- 查看对话框 -->
    <el-dialog title='查看' :visible.sync="dialogVisibleView2">
      <el-form :model="viewForm" label-position="left" label-width="110px" ref="viewForm">
        <el-form-item label="图片" prop="img" class="item1">
          <img :src='viewForm.img' style="width: 150px;height: 100px;">
        </el-form-item>
        <el-form-item label="图片地址" prop="img" class="item">
          <span>{{viewForm.img}}</span>
        </el-form-item>
        <el-form-item label="是否备货" prop="stockUp" class="item">
          <span>{{viewForm.stockUp}}</span>
        </el-form-item>
        <el-form-item label="主类目" prop="cate" class="item">
          <span>{{viewForm.cate}}</span>
        </el-form-item>
        <el-form-item label="子类目" prop="subCate" class="item">
          <span>{{viewForm.subCate}}</span>
        </el-form-item>
        <el-form-item label="供应商链接1" prop="vendor1" class="item">
          <span>{{viewForm.vendor1}}</span>
        </el-form-item>
        <el-form-item label="供应商链接2" prop="vendor2" class="item">
          <span>{{viewForm.vendor2}}</span>
        </el-form-item>
        <el-form-item label="供应商链接3" prop="vendor3" class="item">
          <span>{{viewForm.vendor3}}</span>
        </el-form-item>
        <el-form-item label="平台参考链接1" prop="origin1" class="item">
          <span>{{viewForm.origin1}}</span>
        </el-form-item>
        <el-form-item label="平台参考链接2" prop="origin2" class="item">
          <span>{{viewForm.origin2}}</span>
        </el-form-item>
        <el-form-item label="平台参考链接3" prop="origin3" class="item">
          <span>{{viewForm.origin3}}</span>
        </el-form-item>
        <el-form-item label="开发编号" prop="devNum" class="item">
          <span>{{viewForm.devNum}}</span>
        </el-form-item>
        <el-form-item label="开发员" prop="developer" class="item">
          <span>{{viewForm.developer}}</span>
        </el-form-item>
        <el-form-item label="推荐人" prop="introducer" class="item">
          <span>{{viewForm.introducer}}</span>
        </el-form-item>
        <el-form-item label="推荐理由" prop="introReason" class="item">
          <span>{{viewForm.introReason}}</span>
        </el-form-item>
        <el-form-item label="认领" prop="devStatus" class="item">
          <span>{{viewForm.devStatus}}</span>
        </el-form-item>
        <el-form-item label="产品状态" prop="checkStatus" class="item">
          <span>{{viewForm.checkStatus}}</span>
        </el-form-item>
        <el-form-item label="创建时间" prop="createDate" class="item">
          <span>{{viewForm.createDate}}</span>
        </el-form-item>
        <el-form-item label="更新时间" prop="updateDate" class="item">
          <span>{{viewForm.updateDate}}</span>
        </el-form-item>
        <el-form-item label="售价($)" prop="salePrice" class="item">
          <span>{{viewForm.salePrice}}</span>
        </el-form-item>
        <el-form-item label="预估重量(克)" prop="hopeWeight" class="item">
          <span>{{viewForm.hopeWeight}}</span>
        </el-form-item>
        <el-form-item label="预估利润率(%)" prop="hopeRate" class="item">
          <span>{{viewForm.hopeRate}}</span>
        </el-form-item>
        <el-form-item label="预估月销量" prop="hopeSale" class="item">
          <span>{{viewForm.hopeSale}}</span>
        </el-form-item>
        <el-form-item label="预估月毛利($)" prop="hopeMonthProfit" class="item">
          <span>{{viewForm.hopeMonthProfit}}</span>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 更新对话框 -->
    <el-dialog title='更新' :visible.sync="dialogVisibleEdit2">
      <el-form :model="editForm" :rules="rules" label-width="110px" label-position="left" ref="editForm">
        <el-form-item label="图片">
          <img :src='editForm.img' style="width: 60px;height: 50px">
        </el-form-item>
        <el-form-item label="图片地址" prop="img">
          <el-input v-model="editForm.img"></el-input>
        </el-form-item>
        <el-form-item label="主类目" prop="cate">
          <el-select size="small" v-model="editForm.cate" @change="getSubcate" style="width:100%;">
            <el-option v-for="item in cate" :value="item.CategoryName" :key="item.CategoryName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="子类目" prop="subCate">
          <el-select size="small" v-model="editForm.subCate" style="width:100%;">
            <el-option v-for="item in subCate" :value="item.CategoryName" :key="item.CategoryName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供应商链接1">
          <el-input size="small" v-model="editForm.vendor1"></el-input>
        </el-form-item>
        <el-form-item label="供应商链接2">
          <el-input size="small" v-model="editForm.vendor2"></el-input>
        </el-form-item>
        <el-form-item label="供应商链接3">
          <el-input size="small" v-model="editForm.vendor3"></el-input>
        </el-form-item>
        <el-form-item label="平台参考链接1">
          <el-input size="small" v-model="editForm.origin1"></el-input>
        </el-form-item>
        <el-form-item label="平台参考链接2">
          <el-input size="small" v-model="editForm.origin2"></el-input>
        </el-form-item>
        <el-form-item label="平台参考链接3">
          <el-input size="small" v-model="editForm.origin3"></el-input>
        </el-form-item>
        <el-form-item label="售价($)">
          <el-input size="small" v-model="editForm.salePrice" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="预估月销量:">
          <el-input size="small" v-model="editForm.hopeSale" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="预估利润率(%):">
          <el-input size="small" v-model="editForm.hopeRate" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="预估重量(克):">
          <el-input size="small" v-model="editForm.hopeWeight" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="预估成本(￥):">
          <el-input size="small" v-model="editForm.hopeCost" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="预估月毛利($):">
          <el-input size="small" v-model="editForm.hopeMonthProfit" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-checkbox-group v-model="editForm.stockUp">
            <el-checkbox label="是否备货" true-label="是" false-label="否" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitEdit2">更新</el-button>
        <el-button type="primary" @click="submitEditCheck2">更新并提交审核</el-button>
      </span>
    </el-dialog>
    <el-table :data="tableData2" @selection-change="selsChange">
      <el-table-column type="selection" fixed align="center" header-align="center">
      </el-table-column>
      <el-table-column type="index" fixed align="center" header-align="center">
      </el-table-column>
      <el-table-column label="操作" fixed header-align="center" width="110">
        <template slot-scope="scope">
          <el-tooltip content="查看">
            <el-button type="text" @click="view2(scope.$index, scope.row)">
              <i class="iconfont icon-yulan"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip content="更新">
            <el-button type="text" @click="edit2(scope.$index, scope.row)">
              <i class="iconfont icon-bianji"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip content="删除">
            <el-button type="text" @click="del2(scope.$index, scope.row)">
              <i class="iconfont icon-shanchu"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip content="提交审核">
            <el-button type="text" @click="claim2(scope.$index, scope.row)">
              <i class="iconfont icon-zhihangfankui"></i>
            </el-button>  
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="img" fixed label="图片" header-align="center">
        <template slot-scope="scope">
          <img :src='scope.row.img' style="width: 60px;height: 50px">
        </template>
      </el-table-column>
      <el-table-column label="是否备货" header-align="center">
        <el-table-column prop="stockUp" :formatter="empty" :render-header="renderHeader2" width='150' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="主类目" header-align="center">
        <el-table-column prop="cate" :render-header="renderHeader2" width='150' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="子类目" header-align="center">
        <el-table-column prop="subCate" :render-header="renderHeader2" width='150' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="供应商链接1" header-align="center">
        <el-table-column prop="vendor1" :render-header="renderHeader2" width='170' align="center">
          <template slot-scope="scope">
            <a :href="scope.row.vendor1" target="_blank" class="classa">{{scope.row.vendor1 | cutOut }}</a>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="平台参考链接1" header-align="center">
        <el-table-column prop="origin1" :render-header="renderHeader2" width='170' align="center">
          <template slot-scope="scope">
            <a :href="scope.row.origin1" target="_blank" class="classa">{{scope.row.origin1 | cutOut }}</a>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="开发编号" header-align="center">
        <el-table-column prop="devNum" :render-header="renderHeader2" width='150' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="开发员" header-align="center">
        <el-table-column prop="developer" :render-header="renderHeader2" width='150' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="推荐人" header-align="center">
        <el-table-column prop="introducer" :render-header="renderHeader2" width='150' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="推荐理由" header-align="center">
        <el-table-column prop="introReason" :render-header="renderHeader2" width='150' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="产品状态" header-align="center">
        <el-table-column prop="checkStatus" :render-header="renderHeader2" width='150' align="center">
          <template slot-scope="scope">
            <a :class="scope.row.checkStatus=='已审批'?'clasGreen':scope.row.checkStatus=='已认领'?'clasGreen':'clasRed'">{{scope.row.checkStatus}}</a>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="审批备注" header-align="center">
        <el-table-column prop="approvalNote" :render-header="renderHeader2" width='150' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="创建时间" header-align="center">
        <el-table-column prop="createDate" :render-header="renderHeader2" width='200'  align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="更新时间" header-align="center">
        <el-table-column prop="updateDate" :render-header="renderHeader2" width='200' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="售价($)" header-align="center">
        <el-table-column prop="salePrice" :render-header="renderHeader2" width='200'  align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="预估重量(克)" header-align="center">
        <el-table-column prop="hopeWeight" :render-header="renderHeader2" width='200' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="预估利润率(%)" header-align="center">
        <el-table-column prop="hopeRate" :render-header="renderHeader2" width='200' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="预估月销量" header-align="center">
        <el-table-column prop="hopeSale" :render-header="renderHeader2" width='200' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="预估月毛利($)" header-align="center">
        <el-table-column prop="hopeMonthProfit" :render-header="renderHeader2" width='200' align="center">
        </el-table-column>
      </el-table-column>
      </el-table>
      <div class="toolbar">
        <el-pagination
          background
          @size-change="handleSizeChange2"
          @current-change="handleCurrentChange2"
          :current-page="this.condition2.page2"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="this.condition2.pageSize2"
          layout="total, sizes, prev, pager, next, jumper"
          :total="this.total2">
        </el-pagination>
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
import { goodsList, goodsCreate, goodsDelete, goodsUpdate, goodsInfo, goodsClaim, forwardList, forwardCreate, forwardUpdate, forwardSubmit, reverseList, reverseCreate, reverseUpdate,reverseList1 } from '../../api/product.js'
import { getMember, getGoodscats } from '../../api/profit'
import { getMenu } from '../../api/login'

export default {
  data() {
    return {
      activeName: '产品推荐',
      disabled: true,
      total: null,
      total1: null,
      total2: null,
      dialogVisible1: false,
      dialogVisibleView1: false,
      dialogVisibleEdit1: false,
      dialogVisible2: false,
      dialogVisibleView2: false,
      dialogVisibleEdit2: false,
      dialogVisibleClaim: false,
      dialogVisibleEdit: false,
      dialogVisibleView: false,
      dialogVisible:false,
      show: {
        product: true,
        forward: false,
        reverse: false
      },
      condition: {
        cate: '',
        introducer: '',
        checkStatus: '',
        createDate: [],
        updateDate: [],
        subCate: '',
        vendor1: '',
        origin1: '',
        developer: '',
        introReason: '',
        approvalNote: '',
        page: 1,
        pageSize: 10
      },
      condition1: {
        stockUp: null,
        devNum: '',
        cate: '',
        introducer: '',
        checkStatus: '',
        createDate: [],
        updateDate: [],
        subCate: '',
        vendor1: '',
        origin1: '',
        developer: '',
        introReason: '',
        approvalNote: '',
        salePrice: null,
        hopeMonthProfit: null,
        hopeRate: null,
        hopeWeight: null,
        hopeCost: null,
        hopeSale: null,
        page1: 1,
        pageSize1: 10
      },
      condition2: {
        stockUp: null,
        devNum: '',
        cate: '',
        introducer: '',
        checkStatus: '',
        createDate: [],
        updateDate: [],
        subCate: '',
        vendor1: '',
        origin1: '',
        developer: '',
        introReason: '',
        approvalNote: '',
        salePrice: null,
        hopeMonthProfit: null,
        hopeRate: null,
        hopeWeight: null,
        hopeCost: null,
        hopeSale: null,
        page2: 1,
        pageSize2: 10
      },
      allMenu: [],
      sels: [],
      developer: [],
      category: [],
      cate: [],
      subCate: [],
      addForm:{
        img: '',
        cate: null,
        subCate: null,
        vendor1: '',
        origin1: '',
        developer: '',
        introReason: ''
      },
      viewForm: {
        nid: null,
      },
      editForm: {
        nid: null,
        img: '',
        cate: '',
        subCate: '',
        vendor1: '',
        origin1: '',
        developer: '',
        introReason: ''
      },
      delForm: {
        nid: []
      },
      claimForm: {
        nid: null,
        devStatus: ''
      },
      rules: {
        img: [
          { required: true, message: '图片不能为空', trigger: 'blur' }
        ],
        cate: [
          { required: true, message: '主类目不能为空', trigger: 'blur' }
        ],
        subCate: [
          { required: true, message: '子类目不能为空', trigger: 'blur' }
        ],
        developer: [
          { required: true, message: '开发员不能为空', trigger: 'blur' }
        ],
      },
      time1: '',
      time2: '',
      tableData: [],
      tableData1: [],
      tableData2: []
    }
  },
  filters: {
    cutOut: function (value) {
      if (!value) return ''
      value = value.substring(0,21)
      return value
    }
  },
  mounted() {
    getMenu().then(response => {
      const res = response.data.data
      const menu = res.filter(e => e.name === '产品中心')
      let arr=menu[0].children
      for(let i=0;i<arr.length;i++){
        if(arr[i].name=="产品开发"){
          this.allMenu=arr[i].tabs
        }
      }
    })
    this.getData()
    this.getForward()
    this.getReverse()
    getMember().then(response => {
      const possessMan = response.data.data
      this.developer = possessMan.filter(e => e.position === '开发')
    })
    getGoodscats().then(response => {
      this.category = this.cate = response.data.data
    })
  },
  methods:{
    empty(row, column, cellValue, index) {
      if (cellValue === 0) {
        return '否'
      } else if (cellValue === 1) {
        return '是'
      } else {
        return cellValue
      }
    },
    handleClick(tab, event) {
      if (tab.label === '产品推荐') {
        this.show['product'] = true
      } else {
        this.show['product'] = false
      }
      if (tab.label === '正向开发') {
        this.show['forward'] = true
        this.getForward()
      } else {
        this.show['forward'] = false
      }
      if (tab.label === '逆向开发') {
        this.show['reverse'] = true
        this.getReverse()
      } else {
        this.show['reverse'] = false
      }
    },
    // 正向开发
    handleCurrentChange1(val) {
      this.condition1.page1 = val
      this.getForward()
    },
    handleSizeChange1(val) {
      this.condition1.pageSize1 = val
      this.getForward()
    },
    view1(index, row) {
      this.dialogVisibleView1 = true
      this.viewForm.nid = row.nid
      goodsInfo(this.viewForm).then(res => {
        this.viewForm = res.data.data
      })
    },
    edit1(index, row) {
      this.dialogVisibleEdit1 = true
      this.editForm.nid = row.nid
      goodsInfo(this.editForm).then(res => {
        this.editForm = res.data.data
        this.editForm.stockUp=="是"?this.editForm.stockUp=true:this.editForm.stockUp=false
      })
      if (this.editForm.cate !== '') {
        const val = this.editForm.cate
        const res = this.category
        this.subCate = res.filter(e => e.CategoryParentName === val)
      }
    },
    // 审批
    claim1(index, row) {
      this.$confirm('确定审批该条记录？', '提示', { type: 'warning' }).then(() => {
        this.delForm.nid = [row.nid]
        forwardSubmit(this.delForm).then(res => {
          if(res.data.code==200){
            this.getForward()
            this.$message({
              message: '成功',
              type: 'success'
            })
          }else {
            this.$message.error(res.data.message)
          }
        })
      })
    },
    claimAll1() {
      this.delForm.nid = this.sels.map(e => e.nid)
      this.$confirm('确定审批所选记录？', '提示', { type: 'warning' }).then(() => {
        forwardSubmit(this.delForm).then(res => {
          if(res.data.code==200){
            this.getForward()
            this.$message({
              message: '成功',
              type: 'success'
            })
          }else {
            this.$message.error(res.data.message)
          }
        })
      })
    },
    submitForm1() {
      this.$refs.addForm.validate((valid)=>{
        if(valid){
          this.addForm.type = 'create'
          this.addForm.flag='forward'
          forwardCreate(this.addForm).then(res => {
            if (res.data.code === 200) {
              this.dialogVisible1 = false
              this.getForward()
              this.$message({
                message: '成功',
                type: 'success'
              })
            } else {
              this.$confirm('错误！', '提示', { type: 'error' }).then(() => {
                this.dialogVisible1=false
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitFormCheck() {
      this.$refs.addForm.validate((valid)=>{
        if(valid){
          this.addForm.type = 'check'
          this.addForm.flag='forward'
          forwardCreate(this.addForm).then(res => {
            if (res.data.code === 200) {
              this.dialogVisible1 = false
              this.getForward()
              this.$message({
                message: '成功',
                type: 'success'
              })
            } else {
              this.$confirm('错误！', '提示', { type: 'error' }).then(() => {
                this.dialogVisible1=false
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitEdit1() {
      this.$refs.editForm.validate((valid)=>{
        if(valid){
          this.editForm.type = 'create'
          if(this.editForm.stockUp!=="是" && this.editForm.stockUp!=="否"){
            this.editForm.stockUp?this.editForm.stockUp="是":this.editForm.stockUp="否"
          }
          forwardUpdate(this.editForm).then(res => {
            if (res.data.code === 200) {
              this.dialogVisibleEdit1 = false
              this.getForward()
              this.$message({
                message: '成功',
                type: 'success'
              })
            } else {
              this.$confirm('错误！', '提示', { type: 'error' }).then(() => {
                this.dialogVisibleEdit1=false
              })
            }
         })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitEditCheck() {
      this.$refs.editForm.validate((valid)=>{
        if(valid){
          this.editForm.type = 'check'
          if(this.editForm.stockUp!=="是" && this.editForm.stockUp!=="否"){
            this.editForm.stockUp?this.editForm.stockUp="是":this.editForm.stockUp="否"
          }
          forwardUpdate(this.editForm).then(res => {
            if (res.data.code === 200) {
              this.dialogVisibleEdit1 = false
              this.getForward()
              this.$message({
                message: '成功',
                type: 'success'
              })
//              this.$confirm('成功！', '提示', { type: 'success' }).then(() => {
//                this.dialogVisibleEdit1 = false
//                this.getForward()
//              })
            } else {
              this.$confirm('错误！', '提示', { type: 'error' }).then(() => {
                this.dialogVisibleEdit1=false
              })
            }
         })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitClaim1() {},
    // 批量删除
    del1(index, row) {
      this.$confirm('确定删除该条记录？', '提示', { type: 'warning' }).then(() => {
        this.delForm.nid = [row.nid]
        goodsDelete(this.delForm).then(res => {
          this.tableData1.splice(index, 1)
        })
      })
    },
    delAll1() {
      this.delForm.nid = this.sels.map(e => e.nid)
      this.$confirm('确定删除所选记录？', '提示', { type: 'warning' }).then(() => {
        goodsDelete(this.delForm).then(res => {
          this.getForward()
        })
      })
    },
    getForward() {
      forwardList(this.condition1).then(res => {
        this.tableData1 = res.data.data.items
        this.condition1.page1 = res.data.data._meta.currentPage
        this.condition1.pageSize1 = res.data.data._meta.perPage
        this.total1 = res.data.data._meta.totalCount
      })
    },
    renderHeader1(h,{column, $index}) {
      if($index === 0) {
        let filters = [ {text: '是','value':"是"} , {text: '否','value':"否"} ]
        return h('el-select',{
          props:{
            placeholder:'请选择',
            //filterable:true, 
            value:this.condition1.stockUp,
            size:'mini',
            clearable:true,
          },
          on:{
            input:value=>{
              this.condition1.stockUp=value
              this.$emit('input', value)
            },
            change:searchValue=>{
              this.filter()
            }
          }
        },[
          filters.map(item=>{
            return h('el-option',{
              props:{
                value:item.text,
                label:item.value
              }
            });
          })
        ])
      } else if($index === 1){
        let filters = this.category
        return h('el-select',{
          props:{
            placeholder:'请选择',
            filterable:true, 
            value:this.condition1.cate,
            size:'mini',
            clearable:true,
          },
          on:{
            input:value=>{
              this.condition1.cate=value
              this.$emit('input', value)
            },
            change:searchValue=>{
              this.filter()
            }
          }
        },[
          filters.map(item=>{
            return h('el-option',{
              props:{
                value:item.CategoryName,
                label:item.CategoryName
              }
            });
          })
        ])
      } else if($index === 2){
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition1.subCate,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition1.subCate = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
          })
        ])
      } else if($index === 3){
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition1.vendor1,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition1.vendor1 = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
          })
        ])
      } else if($index === 4){
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition1.origin1,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition1.origin1 = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
          })
        ])
      } else if($index === 5){
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition1.devNum,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition1.devNum = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
          })
        ])
      } else if($index === 6){
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition1.developer,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition1.developer = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
          })
        ])
      } else if($index === 7){
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition1.introducer,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition1.introducer = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
          })
        ])
      } else if($index === 9){
        let filters = [ {text:'已认领',value:"已认领"}, {text:'待提交',value:"待提交"}, {text:'待审核',value:"待审核"}, {text:'已审批',value:"已审批"}, {text:'未通过',value:"未通过"} ]
        return h('el-select',{
          props:{
            placeholder:'请选择',
            filterable:true, 
            value:this.condition1.checkStatus,
            size:'mini',
            clearable:true,
          },
          on:{
            input:value=>{
              this.condition1.checkStatus=value
              this.$emit('input', value)
            },
            change:searchValue=>{
              this.filter()
            }
          }
        },[
          filters.map(item=>{
            return h('el-option',{
              props:{
                value:item.text,
                label:item.value
              }
            });
          })
        ])
      } else if($index === 10){
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition1.approvalNote,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition1.approvalNote = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
          })
        ])
      } else if($index === 11){
        return h('el-date-picker',{
          props:{
            value:this.time1,
            size:'mini',
            type:'daterange',
          },
          style:{
            width:'180px',
            padding:'2px',
          },
          on:{
            input:value=>{
              this.time1=value
              this.$emit('input', value)
            },
            change:value => {
              this.filter()
            }
          }
        })
      } else if($index === 12){
        return h('el-date-picker',{
          props:{
            value:this.time2,
            size:'mini',
            type:'daterange',
          },
          style:{
            width:'180px',
            padding:'2px',
          },
          on:{
            input:value=>{
              this.time2=value
              this.$emit('input', value)
            },
            change:value => {
              this.filter()
            }
          }
        })
      } else if($index === 13){
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition1.salePrice,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition1.salePrice = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
          })
        ])
      } else if($index === 14){
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition1.hopeWeight,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition1.hopeWeight = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
          })
        ])
      } else if($index === 15){
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition1.hopeRate,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition1.hopeRate = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
          })
        ])
      } else if($index === 16){
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition1.hopeSale,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition1.hopeSale = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
          })
        ])
      } else if($index === 17){
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition1.hopeMonthProfit,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition1.hopeMonthProfit = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
          })
        ])
      } else {
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition1.introReason,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition1.introReason = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
          })
        ])
      }
    },

    // 逆向开发
    handleCurrentChange2(val) {
      this.condition2.page2 = val
      this.getReverse()
    },
    handleSizeChange2(val) {
      this.condition2.pageSize2 = val
      this.getReverse()
    },
    view2(index, row) {
      this.dialogVisibleView2 = true
      this.viewForm.nid = row.nid
      goodsInfo(this.viewForm).then(res => {
        this.viewForm = res.data.data
      })
    },
    edit2(index, row) {
      this.dialogVisibleEdit2 = true
      this.editForm.nid = row.nid
      goodsInfo(this.editForm).then(res => {
        this.editForm = res.data.data
        this.editForm.stockUp=="是"?this.editForm.stockUp=true:this.editForm.stockUp=false
      })
      if (this.editForm.cate !== '') {
        const val = this.editForm.cate
        const res = this.category
        this.subCate = res.filter(e => e.CategoryParentName === val)
      }
    },
    del2(index, row) {
      this.$confirm('确定删除该条记录？', '提示', { type: 'warning' }).then(() => {
        this.delForm.nid = [row.nid]
        goodsDelete(this.delForm).then(res => {
          this.tableData2.splice(index, 1)
        })
      })
    },
    delAll2() {
      this.delForm.nid = this.sels.map(e => e.nid)
      this.$confirm('确定删除所选记录？', '提示', { type: 'warning' }).then(() => {
        goodsDelete(this.delForm).then(res => {
          this.getReverse()
        })
      })
    },
    // 审批
    claim2(index, row) {
      this.$confirm('确定审批该条记录？', '提示', { type: 'warning' }).then(() => {
        this.delForm.nid = [row.nid]
        forwardSubmit(this.delForm).then(res => {
          if(res.data.code==200){
            this.getReverse()
            this.$message({
              message: '成功',
              type: 'success'
            })
          }else {
            this.$message.error(res.data.message)
          }
        })
      })
    },
    claimAll2() {
      this.delForm.nid = this.sels.map(e => e.nid)
      this.$confirm('确定审批所选记录？', '提示', { type: 'warning' }).then(() => {
        forwardSubmit(this.delForm).then(res => {
          if(res.data.code==200){
            this.getReverse()
            this.$message({
              message: '成功',
              type: 'success'
            })
          }else {
            this.$message.error(res.data.message)
          }
        })
      })
    },
    submitForm2() {
      this.$refs.addForm.validate((valid)=>{
        if(valid){
          this.addForm.type = 'create'
          this.addForm.flag='backward'
          forwardCreate(this.addForm).then(res => {
            if (res.data.code === 200) {
              this.dialogVisible2 = false
              this.getReverse()
              this.$message({
                message: '成功',
                type: 'success'
              })
            } else {
              this.$confirm('错误！', '提示', { type: 'error' }).then(() => {
                this.dialogVisible2 = false
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitFormCheck2() {
      this.$refs.addForm.validate((valid)=>{
        if(valid){
          this.addForm.type = 'check'
          this.addForm.flag='backward'
          forwardCreate(this.addForm).then(res => {
            if (res.data.code === 200) {
              this.dialogVisible2 = false
              this.getReverse()
              this.$message({
                message: '成功',
                type: 'success'
              })
            } else {
              this.$confirm('错误！', '提示', { type: 'error' }).then(() => {
                this.dialogVisible2 = false
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitEdit2() {
      this.$refs.editForm.validate((valid)=>{
        if(valid){
          this.editForm.type = 'create'
          if(this.editForm.stockUp!=="是" && this.editForm.stockUp!=="否"){
            this.editForm.stockUp?this.editForm.stockUp="是":this.editForm.stockUp="否"
          }
          forwardUpdate(this.editForm).then(res => {
            if (res.data.code === 200) {
              this.dialogVisibleEdit2 = false
              this.getReverse()
              this.$message({
                message: '成功',
                type: 'success'
              })
            } else {
              this.$confirm('错误！', '提示', { type: 'error' }).then(() => {
                this.dialogVisibleEdit2=false
              })
            }
         })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitEditCheck2() {
      this.$refs.editForm.validate((valid)=>{
        if(valid){
          this.editForm.type = 'check'
          if(this.editForm.stockUp!=="是" && this.editForm.stockUp!=="否"){
            this.editForm.stockUp?this.editForm.stockUp="是":this.editForm.stockUp="否"
          }
          forwardUpdate(this.editForm).then(res => {
            if (res.data.code === 200) {
              this.dialogVisibleEdit2 = false
              this.getReverse()
              this.$message({
                message: '成功',
                type: 'success'
              })
            } else {
              this.$confirm('错误！', '提示', { type: 'error' }).then(() => {
                this.dialogVisibleEdit2=false
              })
            }
         })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getReverse() {
      reverseList1(this.condition2).then(res => {
        this.tableData2 = res.data.data.items
        this.condition2.page2 = res.data.data._meta.currentPage
        this.condition2.pageSize2 = res.data.data._meta.perPage
        this.total2 = res.data.data._meta.totalCount
      })
    },
    renderHeader2(h,{column, $index}) {
      if($index === 0) {
        let filters = [ {text:'是','value':"是"} , {text:'否','value':"否"} ]
        return h('el-select',{
          props:{
            placeholder:'请选择',
            //filterable:true, 
            value:this.condition2.stockUp,
            size:'mini',
            clearable:true,
          },
          on:{
            input:value=>{
              this.condition2.stockUp=value
              this.$emit('input', value)
            },
            change:searchValue=>{
              this.filter()
            }
          }
        },[
          filters.map(item=>{
            return h('el-option',{
              props:{
                value:item.text,
                label:item.value
              }
            });
          })
        ])
      } else if($index === 1){
        let filters = this.category
        return h('el-select',{
          props:{
            placeholder:'请选择',
            filterable:true, 
            value:this.condition2.cate,
            size:'mini',
            clearable:true,
          },
          on:{
            input:value=>{
              this.condition2.cate=value
              this.$emit('input', value)
            },
            change:searchValue=>{
              this.filter()
            }
          }
        },[
          filters.map(item=>{
            return h('el-option',{
              props:{
                value:item.CategoryName,
                label:item.CategoryName
              }
            });
          })
        ])
      } else if($index === 2){
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition2.subCate,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition2.subCate = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
          })
        ])
      } else if($index === 3){
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition2.vendor1,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition2.vendor1 = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
          })
        ])
      } else if($index === 4){
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition2.origin1,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition2.origin1 = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
          })
        ])
      } else if($index === 5){
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition2.devNum,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition2.devNum = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
          })
        ])
      } else if($index === 6){
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition2.developer,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition2.developer = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
          })
        ])
      } else if($index === 7){
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition2.introducer,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition2.introducer = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
          })
        ])
      } else if($index === 9){
        let filters = [ {text:'已认领',value:"已认领"}, {text:'待审核',value:"待审核"}, {text:'待提交',value:"待提交"}, {text:'已审批',value:"已审批"}, {text:'未通过',value:"未通过"} ]
        return h('el-select',{
          props:{
            placeholder:'请选择',
            filterable:true, 
            value:this.condition2.checkStatus,
            size:'mini',
            clearable:true,
          },
          on:{
            input:value=>{
              this.condition2.checkStatus=value
              this.$emit('input', value)
            },
            change:searchValue=>{
              this.filter()
            }
          }
        },[
          filters.map(item=>{
            return h('el-option',{
              props:{
                value:item.text,
                label:item.value
              }
            });
          })
        ])
      } else if($index === 10){
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition2.approvalNote,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition2.approvalNote = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
          })
        ])
      } else if($index === 11){
        return h('el-date-picker',{
          props:{
            value:this.time1,
            size:'mini',
            type:'daterange',
          },
          style:{
            width:'180px',
            padding:'2px',
          },
          on:{
            input:value=>{
              this.time1=value
              this.$emit('input', value)
            },
            change:value => {
              this.filter()
            }
          }
        })
      } else if($index === 12){
        return h('el-date-picker',{
          props:{
            value:this.time2,
            size:'mini',
            type:'daterange',
          },
          style:{
            width:'180px',
            padding:'2px',
          },
          on:{
            input:value=>{
              this.time2=value
              this.$emit('input', value)
            },
            change:value => {
              this.filter()
            }
          }
        })
      } else if($index === 13){
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition2.salePrice,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition2.salePrice = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
          })
        ])
      } else if($index === 14){
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition2.hopeWeight,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition2.hopeWeight = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
          })
        ])
      } else if($index === 15){
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition2.hopeRate,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition2.hopeRate = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
          })
        ])
      } else if($index === 16){
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition2.hopeSale,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition2.hopeSale = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
          })
        ])
      } else if($index === 17){
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition2.hopeMonthProfit,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition2.hopeMonthProfit = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
          })
        ])
      } else {
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition2.introReason,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition2.introReason = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
          })
        ])
      }
    },

    // 产品推荐
    // 查看
    view(index, row) {
      this.dialogVisibleView = true
      this.viewForm.nid = row.nid
      goodsInfo(this.viewForm).then(res => {
        this.viewForm = res.data.data
      })
    },
    // 更新
    edit(index, row) {
      this.dialogVisibleEdit = true
      this.editForm = Object.assign({}, row)
      if (this.editForm.cate !== '') {
        const val = this.editForm.cate
        const res = this.category
        this.subCate = res.filter(e => e.CategoryParentName === val)
      }
    },
    submitEdit() {
      this.$refs.editForm.validate((valid)=>{
        if(valid){
          goodsUpdate(this.editForm).then(res => {
            this.dialogVisibleEdit = false
            this.getData()
         })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 认领
    claim(index, row) {
      this.dialogVisibleClaim = true
      this.claimForm.nid = row.nid
    },
    submitClaim() {
      goodsClaim(this.claimForm).then(res => {
        this.dialogVisibleClaim = false
        this.getData()
      })
    },
    // 删除
    selsChange(sels) {
      this.sels = sels
    },
    del(index, row) {
      this.$confirm('确定删除该条记录？', '提示', { type: 'warning' }).then(() => {
        this.delForm.nid = [row.nid]
        goodsDelete(this.delForm).then(res => {
          this.tableData.splice(index, 1)
        })
      })
    },
    delAll() {
      this.delForm.nid = this.sels.map(e => e.nid)
      this.$confirm('确定删除所选记录？', '提示', { type: 'warning' }).then(() => {
        goodsDelete(this.delForm).then(res => {
          this.getData()
        })
      })
    },
    handleSizeChange(val) {
      this.condition.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.condition.page = val
      this.getData()
    },
    // 子类目
    productcategory() {
      if (this.addForm.cate !== '') {
        this.disabled = false
        const val = this.addForm.cate
        const res = this.category
        this.subCate = res.filter(e => e.CategoryParentName === val)
      } else if (this.addForm.cate === '') {
        this.disabled = true
      }
    },
    getSubcate() {
      if (this.editForm.cate !== '') {
        const val = this.editForm.cate
        const res = this.category
        this.subCate = res.filter(e => e.CategoryParentName === val)
      }
    },
    getData() {
      goodsList(this.condition).then(res => {
        this.tableData = res.data.data.items
        this.condition.page = res.data.data._meta.currentPage
        this.condition.pageSize = res.data.data._meta.perPage
        this.total = res.data.data._meta.totalCount
      })
    },
    // 新增
    submitForm() {
      this.$refs.addForm.validate((valid)=>{
        if(valid){
          goodsCreate(this.addForm).then(res => {
            if (res.data.code === 200) {
              this.dialogVisible=false
              this.getData()
              this.$message({
                message: '新增成功',
                type: 'success'
              })
            } else {
              this.$confirm('错误！', '提示', { type: 'error' }).then(() => {
                this.dialogVisible=false
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    //过滤，搜索
    formatTen(num) {
      return num > 9 ? (num + "") : ("0" + num)
    },
    formatDate(date) { 
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate() 
      const hour = date.getHours()
      const minute = date.getMinutes()
      const second = date.getSeconds() 
      return year + "-" + this.formatTen(month) + "-" + this.formatTen(day) 
    },
    filter() {
      if (this.activeName === '产品推荐') {
        if (this.time1 !== null && this.time1.length !== 0) {
          this.condition.createDate = [this.formatDate(this.time1[0]), this.formatDate(this.time1[1])]
        } else {
          this.condition.createDate = []
        }
        if (this.time2 !== null && this.time2.length !== 0) {
          this.condition.updateDate = [this.formatDate(this.time2[0]), this.formatDate(this.time2[1])]
        } else {
          this.condition.updateDate = []
        }
        this.getData()
      } else if (this.activeName === '正向开发') {
        if (this.time1 !== null && this.time1.length !== 0) {
          this.condition1.createDate = [this.formatDate(this.time1[0]), this.formatDate(this.time1[1])]
        } else {
          this.condition1.createDate = []
        }
        if (this.time2 !== null && this.time2.length !== 0) {
          this.condition1.updateDate = [this.formatDate(this.time2[0]), this.formatDate(this.time2[1])]
        } else {
          this.condition1.updateDate = []
        }
        this.getForward()
      } else {
        if (this.time1 !== null && this.time1.length !== 0) {
          this.condition2.createDate = [this.formatDate(this.time1[0]), this.formatDate(this.time1[1])]
        } else {
          this.condition2.createDate = []
        }
        if (this.time2 !== null && this.time2.length !== 0) {
          this.condition2.updateDate = [this.formatDate(this.time2[0]), this.formatDate(this.time2[1])]
        } else {
          this.condition2.updateDate = []
        }
        this.getReverse()
      }
    },
    renderHeader(h,{column, $index}) {
      let filters = this.category
      if($index === 0) {
        return h('el-select',{
          props:{
            placeholder:'请选择',
            filterable:true, 
            value:this.condition.cate,
            size:'mini',
            clearable:true,
          },
          on:{
            input:value=>{
              this.condition.cate=value
              this.$emit('input', value)
            },
            change:searchValue=>{
              this.filter()
            }
          }
        },[
          filters.map(item=>{
            return h('el-option',{
              props:{
                value:item.CategoryName,
                label:item.CategoryName
              }
            });
          })
        ])
      } else if($index === 7){
        let filters = [ {text:'未认领','value':"未认领"} , {text:'已认领','value':"已认领"} ]
        return h('el-select',{
          props:{
            placeholder:'请选择',
            filterable:true, 
            value:this.condition.checkStatus,
            size:'mini',
            clearable:true,
          },
          on:{
            input:value=>{
              this.condition.checkStatus=value
              this.$emit('input', value)
            },
            change:searchValue=>{
              this.filter()
            }
          }
        },[
          filters.map(item=>{
            return h('el-option',{
              props:{
                value:item.text,
                label:item.value
              }
            });
          })
        ])
      } else if($index === 9){
        return h('el-date-picker',{
          props:{
            value:this.time1,
            size:'mini',
            type:'daterange',
          },
          style:{
            width:'180px',
            padding:'2px',
          },
          on:{
            input:value=>{
              this.time1=value
              this.$emit('input', value)
            },
            change:value => {
              this.filter()
            }
          }
        })
      } else if($index === 10) {
        return h('el-date-picker',{
          props:{
            value:this.time2,
            size:'mini',
            type:'daterange',
          },
          style:{
            width:'180px',
            padding:'2px',
          },
          on:{
            input:value=>{
              this.time2=value
              this.$emit('input', value)
            },
            change:value => {
              this.filter()
            }
          }
        })
      } else if($index === 1){
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition.subCate,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition.subCate = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
          })
        ])
      } else if($index === 2){
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition.vendor1,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition.vendor1 = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
          })
        ])
      } else if($index === 3){
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition.origin1,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition.origin1 = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
          })
        ])
      } else if($index === 4){
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition.developer,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition.developer = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
          })
        ])
      } else if($index === 5){
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition.introducer,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition.introducer = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
          })
        ])
      } else if($index === 6){
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition.introReason,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition.introReason = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
          })
        ])
      } else {
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition.approvalNote,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition.approvalNote = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
          })
        ])
      }
    }
  }
}
</script>

<style>
  .item .el-form-item__label{
    color: #99a9bf;
    margin-right: 1%;
  }
  .item1 .el-form-item__label{
    color: #99a9bf;
    margin-right: 1%;
    margin-top: 3%;
  }
  .item2 .el-form-item__label{
    margin-right: 1%;
    margin-top: 3%;
  }
</style>

<style lang="scss" scoped>
.el-button{
  margin-left: 0px;
}
  .clasRed{
    color: red;
  }
  .clasGreen{
    color: #0E9A00;
  }
  .classa{
    color: #409EFF;
  }
</style>
