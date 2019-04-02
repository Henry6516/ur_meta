<template>
  <section class="toolbar">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in this.allMenu" :label="item.name" :name="item.name" :key="index">
      </el-tab-pane>
    </el-tabs>
    <div v-show="show.wait">
    <el-col :span="24" style="padding:10px 20px;">
      <el-button plain @click="passAll">批量通过</el-button>
      <el-button plain @click="unPassAll">批量未通过</el-button>
      <el-button plain @click="cancelAll">批量作废</el-button>
    </el-col>
    <!-- 查看对话框 -->
    <el-dialog title='查看' :visible.sync="dialogVisible">
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
    <!-- 列表 -->
    <el-table :data="tableData" @selection-change="selsChange" style="width: 97%;margin-left:20px">
      <el-table-column type="selection" fixed align="center" header-align="center">
      </el-table-column>
      <el-table-column type="index" fixed align="center" header-align="center">
      </el-table-column>
      <el-table-column label="操作" fixed header-align="center" width="105">
        <template slot-scope="scope">
          <el-tooltip content="查看">
            <el-button type="text" @click="view(scope.$index, scope.row)">
              <i class="iconfont icon-yulan"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip content="通过">
            <el-button type="text" @click="pass(scope.$index, scope.row)">
              <i class="iconfont icon-dianzan"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip content="未通过">
            <el-button type="text" @click="unPass(scope.$index, scope.row)">
              <i class="iconfont icon-dianzan-copy"></i>
            </el-button>  
          </el-tooltip>
          <el-tooltip content="作废">
            <el-button type="text" @click="cancel(scope.$index, scope.row)">
              <i class="iconfont icon-shanchu"></i>
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
        <el-table-column prop="stockUp" :formatter="empty" :render-header="renderHeader" width='150' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="是否采集" header-align="center">
        <el-table-column prop="mineId" :formatter="empty" :render-header="renderHeader" width='150' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="主类目" header-align="center">
        <el-table-column prop="cate" :render-header="renderHeader" width='150' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="子类目" header-align="center">
        <el-table-column prop="subCate" :render-header="renderHeader" width='150' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="供应商链接1" header-align="center">
        <el-table-column prop="vendor1" :render-header="renderHeader" width='170' align="center">
          <template slot-scope="scope">
            <a :href="scope.row.vendor1" target="_blank">{{scope.row.vendor1 | cutOut }}</a>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="平台参考链接1" header-align="center">
        <el-table-column prop="origin1" :render-header="renderHeader" width='170' align="center">
          <template slot-scope="scope">
            <a :href="scope.row.origin1" target="_blank">{{scope.row.origin1 | cutOut }}</a>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="开发编号" header-align="center">
        <el-table-column prop="devNum" :render-header="renderHeader" width='150' align="center">
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
        </el-table-column>
      </el-table-column>
      <el-table-column label="创建时间" header-align="center">
        <el-table-column prop="createDate" :render-header="renderHeader" width='200'  align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="更新时间" header-align="center">
        <el-table-column prop="updateDate" :render-header="renderHeader" width='200' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="售价($)" header-align="center">
        <el-table-column prop="salePrice" :render-header="renderHeader" width='200'  align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="预估重量(克)" header-align="center">
        <el-table-column prop="hopeWeight" :render-header="renderHeader" width='200' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="预估成本(￥)" header-align="center">
        <el-table-column prop="hopeCost" :render-header="renderHeader" width='200' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="预估利润率(%)" header-align="center">
        <el-table-column prop="hopeRate" :render-header="renderHeader" width='200' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="预估月销量" header-align="center">
        <el-table-column prop="hopeSale" :render-header="renderHeader" width='200' align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="预估月毛利($)" header-align="center">
        <el-table-column prop="hopeMonthProfit" :render-header="renderHeader" width='200' align="center">
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
    <div v-show="show.pass">
      <!-- 列表 -->
      <el-table :data="tableData1" @selection-change="selsChange" style="width: 97%;margin-left:20px">
        <el-table-column type="selection" fixed align="center" header-align="center">
        </el-table-column>
        <el-table-column type="index" fixed align="center" header-align="center">
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
              <a :href="scope.row.vendor1" target="_blank">{{scope.row.vendor1 | cutOut }}</a>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="平台参考链接1" header-align="center">
          <el-table-column prop="origin1" :render-header="renderHeader1" width='170' align="center">
            <template slot-scope="scope">
              <a :href="scope.row.origin1" target="_blank">{{scope.row.origin1 | cutOut }}</a>
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
        <el-table-column label="产品状态" header-align="center">
          <el-table-column prop="checkStatus" :render-header="renderHeader1" width='150'  align="center">
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
          <el-table-column prop="updateDate" :render-header="renderHeader1" width='200'  align="center">
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
        <el-table-column label="预估成本(￥)" header-align="center">
          <el-table-column prop="hopeCost" :render-header="renderHeader1" width='200' align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column label="预估利润率(%)" header-align="center">
          <el-table-column prop="hopeRate" :render-header="renderHeader1" width='200' align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column label="预估月销量" header-align="center">
          <el-table-column prop="hopeSale" :render-header="renderHeader1" width='200'  align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column label="预估月毛利($)" header-align="center">
          <el-table-column prop="hopeMonthProfit" :render-header="renderHeader1" width='200'  align="center">
          </el-table-column>
        </el-table-column>
      </el-table>
      <div class="toolbar">
        <el-pagination
          background
          @size-change="handleSizeChange1"
          @current-change="handleCurrentChange1"
          :current-page="this.condition1.page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="this.condition1.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="this.total1">
        </el-pagination>
      </div>
    </div>
    <div v-show="show.unPass">
      <!-- 查看对话框 -->
    <el-dialog title='查看' :visible.sync="dialogVisible2">
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
        <el-form-item label="预估成本(￥)" prop="hopeCost" class="item">
          <span>{{viewForm.hopeCost}}</span>
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
      <!-- 列表 -->
      <el-table :data="tableData2" @selection-change="selsChange" style="width: 97%;margin-left:20px">
        <el-table-column type="selection" fixed align="center" header-align="center">
        </el-table-column>
        <el-table-column type="index" fixed align="center" header-align="center">
        </el-table-column>
        <el-table-column label="操作" fixed header-align="center" width="105">
          <template slot-scope="scope">
            <el-tooltip content="查看">
              <el-button type="text" @click="view2(scope.$index, scope.row)">
                <i class="iconfont icon-yulan"></i>
              </el-button>
            </el-tooltip>
            <!-- <el-tooltip content="通过">
              <el-button type="text" @click="pass2(scope.$index, scope.row)">
                <i class="iconfont icon-dianzan3"></i>
              </el-button>
            </el-tooltip> -->
            <el-tooltip content="作废">
              <el-button type="text" @click="cancel2(scope.$index, scope.row)">
                <i class="iconfont icon-shanchu"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip content="编辑">
              <el-button type="text" @click="editWtg(scope.$index, scope.row)">
                <i class="el-icon-edit"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip content="提交审核">
              <el-button type="text" @click="putIn(scope.$index, scope.row)">
                <i class="el-icon-tickets"></i>
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
              <a :href="scope.row.vendor1" target="_blank">{{scope.row.vendor1 | cutOut }}</a>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="平台参考链接1" header-align="center">
          <el-table-column prop="origin1" :render-header="renderHeader2" width='170' align="center">
            <template slot-scope="scope">
              <a :href="scope.row.origin1" target="_blank">{{scope.row.origin1 | cutOut }}</a>
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
          <el-table-column prop="checkStatus" :render-header="renderHeader2" width='150'  align="center">
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
          <el-table-column prop="updateDate" :render-header="renderHeader2" width='200'  align="center">
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
        <el-table-column label="预估成本(￥)" header-align="center">
          <el-table-column prop="hopeCost" :render-header="renderHeader2" width='200' align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column label="预估利润率(%)" header-align="center">
          <el-table-column prop="hopeRate" :render-header="renderHeader2" width='200' align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column label="预估月销量" header-align="center">
          <el-table-column prop="hopeSale" :render-header="renderHeader2" width='200'  align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column label="预估月毛利($)" header-align="center">
          <el-table-column prop="hopeMonthProfit" :render-header="renderHeader2" width='200'  align="center">
          </el-table-column>
        </el-table-column>
      </el-table>
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
      <div class="toolbar">
        <el-pagination
          background
          @size-change="handleSizeChange2"
          @current-change="handleCurrentChange2"
          :current-page="this.condition2.page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="this.condition2.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="this.total2">
        </el-pagination>
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
import { getGoodscats } from '../../api/profit'
import { checkList, checkPassList, checkPass, checkFailed, checkCancel, checkFailedList, goodsInfo,forwardSubmit,forwardUpdate  } from '../../api/product'
import { getMenu } from '../../api/login'

export default {
  data() {
    return {
      activeName: '待审批列表',
      total: null,
      total1: null,
      total2: null,
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisibleEdit2:false,
      disabled: true,
      allMenu: [],
      category: [],
      cate: [],
      sels: [],
      tableData: [],
      tableData1: [],
      tableData2: [],
      subCate:[],
      time1: [],
      time2: [],
      show: {
        wait: true,
        pass: false,
        unPass: false
      },
      viewForm: {},
      passForm: {},
      unPassForm: {},
      delForm: {},
      editForm:[],
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
      condition: {
        stockUp: null,
        mineId: null,
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
        page: 1,
        pageSize: 10
      },
      condition1: {
        stockUp: null,
        mineId: null,
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
        page: 1,
        pageSize: 10
      },
      condition2: {
        stockUp: null,
        mineId: null,
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
        page: 1,
        pageSize: 10
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
      }   
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
        if(arr[i].name=="产品审批"){
          this.allMenu=arr[i].tabs
        }
      }
    })
    this.getData()
    this.getPass()
    getGoodscats().then(response => {
      this.category = this.cate = response.data.data
    })
  },
  methods: {
    getSubcate() {
      if (this.editForm.cate !== '') {
        const val = this.editForm.cate
        const res = this.category
        this.subCate = res.filter(e => e.CategoryParentName === val)
      }
    },
    editWtg(index,row){
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
    submitEdit2() {
      this.$refs.editForm.validate((valid)=>{
        if(valid){
          this.editForm.type = 'create'
          console.log(this.editForm.stockUp)
          if(!this.editForm.stockUp=="是" || !this.editForm.stockUp=="否"){
            this.editForm.stockUp?this.editForm.stockUp="是":this.editForm.stockUp="否"
          }
          forwardUpdate(this.editForm).then(res => {
            this.dialogVisibleEdit2 = false
            this.getFailed()
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
          if(!this.editForm.stockUp=="是" || !this.editForm.stockUp=="否"){
            this.editForm.stockUp?this.editForm.stockUp="是":this.editForm.stockUp="否"
          }
          forwardUpdate(this.editForm).then(res => {
            this.dialogVisibleEdit2 = false
            this.getFailed()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    putIn(index,row){
      this.$confirm('确定审批该条记录？', '提示', { type: 'warning' }).then(() => {
        this.delForm.nid = [row.nid]
        forwardSubmit(this.delForm).then(res => {
          this.getFailed()
        })
      })
    },
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
      if (tab.label === '待审批列表') {
        this.show['wait'] = true
      } else {
        this.show['wait'] = false
      }
      if (tab.label === '已审批列表') {
        this.show['pass'] = true
        this.getPass()
      } else {
        this.show['pass'] = false
      }
      if (tab.label === '未通过列表') {
        this.show['unPass'] = true
        this.getFailed()
      } else {
        this.show['unPass'] = false
      }
    },
    // 待审核
    handleCurrentChange(val) {
      this.condition.page = val
      this.getData()
    },
    handleSizeChange(val) {
      this.condition.pageSize = val
      this.getData()
    },
    view(index, row) {
      this.dialogVisible = true
      this.viewForm.nid = row.nid
      goodsInfo(this.viewForm).then(res => {
        this.viewForm = res.data.data
      })
    },
    // 审核
    pass(index, row) {
      this.$confirm('确定通过该条记录？', '提示', { type: 'warning' }).then(() => {
        this.passForm.nid = [row.nid]
        checkPass(this.passForm).then(res => {
          this.getData()
        })
      })
    },
    passAll() {
      this.passForm.nid = this.sels.map(e => e.nid)
      this.$confirm('确定通过所选记录？', '提示', { type: 'warning' }).then(() => {
        checkPass(this.passForm).then(res => {
          this.getData()
        })
      })
    },
    unPass(index, row) {
      this.$confirm('确定不通过该条记录？', '提示', { type: 'warning' }).then(() => {
        this.unPassForm.nid = [row.nid]
        checkFailed(this.unPassForm).then(res => {
          this.getData()
        })
      })
    },
    unPassAll() {
      this.unPassForm.nid = this.sels.map(e => e.nid)
      this.$confirm('确定不通过所选记录？', '提示', { type: 'warning' }).then(() => {
        checkFailed(this.unPassForm).then(res => {
          this.getData()
        })
      })
    },
    // 作废
    cancel(index, row) {
      this.$confirm('确定作废该条记录？', '提示', { type: 'warning' }).then(() => {
        this.delForm.nid = [row.nid]
        checkCancel(this.delForm).then(res => {
          // this.tableData.splice(index, 1)
          this.getData()
        })
      })
    },
    cancelAll() {
      this.delForm.nid = this.sels.map(e => e.nid)
      this.$confirm('确定作废所选记录？', '提示', { type: 'warning' }).then(() => {
        checkCancel(this.delForm).then(res => {
          this.getData()
        })
      })
    },

    // 已通过
    handleCurrentChange1(val) {
      this.condition1.page = val
      this.getPass()
    },
    handleSizeChange1(val) {
      this.condition1.pageSize = val
      this.getPass()
    },
    renderHeader1(h, {column, $index}) {
      if($index === 0) {
        let filters = [ {text:'是','value':"是"} , {text:'否','value':"否"} ]
        return h('el-select',{
          props:{
            placeholder:'请选择',
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
      } else if($index === 10){
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
      } else if($index === 11){
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
      } else if($index === 12){
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
      } else if($index === 13){
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
      } else if($index === 14){
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
      } else if($index === 15){
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
      } else if($index === 16){
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
              value: this.condition1.checkStatus,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition1.checkStatus = value
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
    getPass() {
      checkPassList(this.condition1).then(res => {
        this.tableData1 = res.data.data.items
        this.total1 = res.data.data._meta.totalCount
        this.condition1.page = res.data.data._meta.currentPage
        this.condition1.pageSize = res.data.data._meta.perPage
      })
    },

    // 未通过
    handleCurrentChange2(val) {
      this.condition2.page = val
      this.getFailed()
    },
    handleSizeChange2(val) {
      this.condition2.pageSize = val
      this.getFailed()
    },
    view2(index, row) {
      this.dialogVisible2 = true
      this.viewForm.nid = row.nid
      goodsInfo(this.viewForm).then(res => {
        this.viewForm = res.data.data
      })
    },
    pass2(index, row) {
      // this.$confirm('确定通过该条记录？', '提示', { type: 'warning' }).then(() => {
      //   this.passForm.nid = [row.nid]
      //   checkPass(this.passForm).then(res => {
      //     this.getFailed()
      //   })
      // })
    },
    cancel2(index, row) {
      this.$confirm('确定作废该条记录？', '提示', { type: 'warning' }).then(() => {
        this.delForm.nid = [row.nid]
        checkCancel(this.delForm).then(res => {
          this.tableData2.splice(index, 1)
        })
      })
    },
    renderHeader2(h, {column, $index}) {
      if($index === 0) {
        let filters = [ {text:'是','value':"是"} , {text:'否','value':"否"} ]
        return h('el-select',{
          props:{
            placeholder:'请选择',
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
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition2.checkStatus,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition2.checkStatus = value
                this.$emit('input', value)
              },
              change: value => {
                this.filter()
              }
            }
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
      } else if ($index === 15) {
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition2.hopeCost,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition2.hopeCost = value
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
      } else if($index === 17){
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
      } else if($index === 18){
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
    getFailed() {
      checkFailedList(this.condition2).then(res => {
        this.tableData2 = res.data.data.items
        this.total2 = res.data.data._meta.totalCount
        this.condition2.page = res.data.data._meta.currentPage
        this.condition2.pageSize = res.data.data._meta.perPage
      })
    },
    selsChange(sels) {
      this.sels = sels
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
      if (this.activeName === '待审批列表') {
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
      } else if (this.activeName === '已审批列表') {
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
        this.getPass()
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
        this.getFailed()
      }
    },
    renderHeader(h, {column, $index}) {
      if($index === 0) {
        let filters = [ {text: '是','value':"是"} , {text: '否','value':"否"} ]
        return h('el-select',{
          props:{
            placeholder:'请选择',
            value:this.condition.stockUp,
            size:'mini',
            clearable:true,
          },
          on:{
            input:value=>{
              this.condition.stockUp=value
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
      } else if ($index === 1) {
        let filters = [ {text: 1,'value':"是"} , {text: 0,'value':"否"} ]
        return h('el-select',{
          props:{
            placeholder:'请选择',
            value:this.condition.mineId,
            size:'mini',
            clearable:true,
          },
          on:{
            input:value=>{
              this.condition.mineId=value
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
      } else if($index === 2){
        let filters = this.category
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
      } else if($index === 3){
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
      } else if($index === 4){
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
      } else if($index === 5){
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
      } else if($index === 6){
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition.devNum,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition.devNum = value
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
      } else if($index === 8){
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
      } else if($index === 10){
        return h('div',{
          style:{
            height:'40px'
          },
        },[
          h('el-input',{
            props:{
              value: this.condition.checkStatus,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition.checkStatus = value
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
              value: this.condition.salePrice,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition.salePrice = value
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
              value: this.condition.hopeWeight,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition.hopeWeight = value
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
              value: this.condition.hopeRate,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition.hopeRate = value
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
              value: this.condition.hopeSale,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition.hopeSale = value
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
              value: this.condition.hopeMonthProfit,
              size:'mini',
              clearable: true
            },
            on:{
              input:value=>{
                this.condition.hopeMonthProfit = value
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
      }
    },
    getData() {
      checkList(this.condition).then(res => {
        this.tableData = res.data.data.items
        this.total = res.data.data._meta.totalCount
        this.condition.page = res.data.data._meta.currentPage
        this.condition.pageSize = res.data.data._meta.perPage
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-button{
  margin-left: 0px;
}
</style>
