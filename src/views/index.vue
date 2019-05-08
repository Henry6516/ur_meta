<template>
  <div class="dashboard-editor-container" style="height: 1010px;">
    <section>
      <div class="left-box">
        <el-card>
          <div slot="header" class="clearfix-table">
            <el-tabs v-model="activeTitle" @tab-click="handleTitle">
              <el-tab-pane
                v-for="(item, index) in titleMenu"
                :label="item.name"
                :name="item.name"
                :key="index"
              ></el-tab-pane>
            </el-tabs>
          </div>
            <div class="tabs-container" v-show="showTitle.pming">
            <el-tabs v-model="activePlatpm" type="card" @tab-click="handlePlatpm">
              <el-tab-pane label="eBay-义乌仓" name="eBay-义乌仓">
                <el-table :data="proTablepm" size="small" @sort-change="sortNumberPX" height="800">
                  <el-table-column prop="order" label="排名" sortable="custom" align="center" width="75">
                    <template slot-scope="scope">
                      <img src="./j1.png" style="width: 31px;height: 38px;" v-if="scope.row.order==1">
                      <img src="./j2.png" style="width: 31px;height: 38px;" v-if="scope.row.order==2">
                      <img src="./j3.png" style="width: 31px;height: 38px;" v-if="scope.row.order==3">
                      <span v-if="scope.row.order>3">{{scope.row.order}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="username" label="销售员" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="img" label="头像" align="center">
                    <template slot-scope="scope">
                       <div class="poImg" :class="[scope.row.order==1?'poImg1':scope.row.order==2?'poImg2':scope.row.order==3?'poImg3':'']">
                        <img :src="scope.row.img" style="width: 60px;height: 60px;border-radius:50%;" v-if="scope.row.img!=null">
                        <img src="./header.png" style="width: 60px;height: 60px;border-radius:50%;" v-if="scope.row.img==null">
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="depart" label="部门" sortable="custom" align="center"></el-table-column>
                  <!-- <el-table-column prop="role" label="职位" sortable="custom" align="center"></el-table-column> -->
                  <el-table-column prop="lastProfit" label="上月毛利"  sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="lastAve" label="上月平均毛利" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="lastDiff" label="上月毛利差额" sortable="custom" align="center">
                    <template slot-scope="scope">
                      <span :class="scope.row.lastDiff<0?'colorRed':''">{{scope.row.lastDiff}}</span>
                     </template> 
                  </el-table-column>
                  <el-table-column prop="thisProfit" label="本月毛利" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="thisAve" label="本月平均毛利" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="thisDiff" label="本月毛利差额" sortable="custom" align="center">
                    <template slot-scope="scope">
                      <span :class="scope.row.thisDiff<0?'colorRed':''">{{scope.row.thisDiff}}</span>
                     </template> 
                  </el-table-column>
                  <el-table-column prop="hireDate" label="入职时长（月）" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="createDate" label="统计时间" sortable="custom" align="center">
                     <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span>{{dateFormatter(scope.row.createDate)}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="eBay-海外仓" name="eBay-海外仓">
                 <el-table :data="proTablepm" size="small" @sort-change="sortNumberPX" height="800">
                  <el-table-column prop="order" label="排名" sortable="custom" align="center" width="75">
                    <template slot-scope="scope">
                      <img src="./j1.png" style="width: 31px;height: 38px;" v-if="scope.row.order==1">
                      <img src="./j2.png" style="width: 31px;height: 38px;" v-if="scope.row.order==2">
                      <img src="./j3.png" style="width: 31px;height: 38px;" v-if="scope.row.order==3">
                      <span v-if="scope.row.order>3">{{scope.row.order}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="username" label="销售员" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="img" label="头像" align="center">
                    <template slot-scope="scope">
                       <div class="poImg" :class="[scope.row.order==1?'poImg1':scope.row.order==2?'poImg2':scope.row.order==3?'poImg3':'']">
                        <img :src="scope.row.img" style="width: 60px;height: 60px;border-radius:50%;" v-if="scope.row.img!=null">
                        <img src="./header.png" style="width: 60px;height: 60px;border-radius:50%;" v-if="scope.row.img==null">
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="depart" label="部门" sortable="custom" align="center"></el-table-column>
                  <!-- <el-table-column prop="role" label="职位" sortable="custom" align="center"></el-table-column> -->
                  <el-table-column prop="lastProfit" label="上月毛利"  sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="lastAve" label="上月平均毛利" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="lastDiff" label="上月毛利差额" sortable="custom" align="center">
                    <template slot-scope="scope">
                      <span :class="scope.row.lastDiff<0?'colorRed':''">{{scope.row.lastDiff}}</span>
                     </template> 
                  </el-table-column>
                  <el-table-column prop="thisProfit" label="本月毛利" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="thisAve" label="本月平均毛利" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="thisDiff" label="本月毛利差额" sortable="custom" align="center">
                    <template slot-scope="scope">
                      <span :class="scope.row.thisDiff<0?'colorRed':''">{{scope.row.thisDiff}}</span>
                     </template> 
                  </el-table-column>
                  <el-table-column prop="hireDate" label="入职时长（月）" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="createDate" label="统计时间" sortable="custom" align="center">
                     <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span>{{dateFormatter(scope.row.createDate)}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="Wish" name="Wish">
                <el-table :data="proTablepm" size="small" @sort-change="sortNumberPX" height="800">
                  <el-table-column prop="order" label="排名" sortable="custom" align="center" width="75">
                    <template slot-scope="scope">
                      <img src="./j1.png" style="width: 31px;height: 38px;" v-if="scope.row.order==1">
                      <img src="./j2.png" style="width: 31px;height: 38px;" v-if="scope.row.order==2">
                      <img src="./j3.png" style="width: 31px;height: 38px;" v-if="scope.row.order==3">
                      <span v-if="scope.row.order>3">{{scope.row.order}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="username" label="销售员" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="img" label="头像" align="center">
                    <template slot-scope="scope">
                       <div class="poImg" :class="[scope.row.order==1?'poImg1':scope.row.order==2?'poImg2':scope.row.order==3?'poImg3':'']">
                        <img :src="scope.row.img" style="width: 60px;height: 60px;border-radius:50%;" v-if="scope.row.img!=null">
                        <img src="./header.png" style="width: 60px;height: 60px;border-radius:50%;" v-if="scope.row.img==null">
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="depart" label="部门" sortable="custom" align="center"></el-table-column>
                  <!-- <el-table-column prop="role" label="职位" sortable="custom" align="center"></el-table-column> -->
                  <el-table-column prop="lastProfit" label="上月毛利"  sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="lastAve" label="上月平均毛利" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="lastDiff" label="上月毛利差额" sortable="custom" align="center">
                    <template slot-scope="scope">
                      <span :class="scope.row.lastDiff<0?'colorRed':''">{{scope.row.lastDiff}}</span>
                     </template> 
                  </el-table-column>
                  <el-table-column prop="thisProfit" label="本月毛利" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="thisAve" label="本月平均毛利" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="thisDiff" label="本月毛利差额" sortable="custom" align="center">
                    <template slot-scope="scope">
                      <span :class="scope.row.thisDiff<0?'colorRed':''">{{scope.row.thisDiff}}</span>
                     </template> 
                  </el-table-column>
                  <el-table-column prop="hireDate" label="入职时长（月）" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="createDate" label="统计时间" sortable="custom" align="center">
                     <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span>{{dateFormatter(scope.row.createDate)}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="SMT" name="SMT">
                <el-table :data="proTablepm" size="small" @sort-change="sortNumberPX" height="800">
                  <el-table-column prop="order" label="排名" sortable="custom" align="center" width="75">
                    <template slot-scope="scope">
                      <img src="./j1.png" style="width: 31px;height: 38px;" v-if="scope.row.order==1">
                      <img src="./j2.png" style="width: 31px;height: 38px;" v-if="scope.row.order==2">
                      <img src="./j3.png" style="width: 31px;height: 38px;" v-if="scope.row.order==3">
                      <span v-if="scope.row.order>3">{{scope.row.order}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="username" label="销售员" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="img" label="头像" align="center">
                    <template slot-scope="scope">
                       <div class="poImg" :class="[scope.row.order==1?'poImg1':scope.row.order==2?'poImg2':scope.row.order==3?'poImg3':'']">
                        <img :src="scope.row.img" style="width: 60px;height: 60px;border-radius:50%;" v-if="scope.row.img!=null">
                        <img src="./header.png" style="width: 60px;height: 60px;border-radius:50%;" v-if="scope.row.img==null">
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="depart" label="部门" sortable="custom" align="center"></el-table-column>
                  <!-- <el-table-column prop="role" label="职位" sortable="custom" align="center"></el-table-column> -->
                  <el-table-column prop="lastProfit" label="上月毛利"  sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="lastAve" label="上月平均毛利" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="lastDiff" label="上月毛利差额" sortable="custom" align="center">
                    <template slot-scope="scope">
                      <span :class="scope.row.lastDiff<0?'colorRed':''">{{scope.row.lastDiff}}</span>
                     </template> 
                  </el-table-column>
                  <el-table-column prop="thisProfit" label="本月毛利" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="thisAve" label="本月平均毛利" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="thisDiff" label="本月毛利差额" sortable="custom" align="center">
                    <template slot-scope="scope">
                      <span :class="scope.row.thisDiff<0?'colorRed':''">{{scope.row.thisDiff}}</span>
                     </template> 
                  </el-table-column>
                  <el-table-column prop="hireDate" label="入职时长（月）" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="createDate" label="统计时间" sortable="custom" align="center">
                     <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span>{{dateFormatter(scope.row.createDate)}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="Amazon" name="Amazon">
                <el-table :data="proTablepm" size="small" @sort-change="sortNumberPX" height="800">
                  <el-table-column prop="order" label="排名" sortable="custom" align="center" width="75">
                    <template slot-scope="scope">
                      <img src="./j1.png" style="width: 31px;height: 38px;" v-if="scope.row.order==1">
                      <img src="./j2.png" style="width: 31px;height: 38px;" v-if="scope.row.order==2">
                      <img src="./j3.png" style="width: 31px;height: 38px;" v-if="scope.row.order==3">
                      <span v-if="scope.row.order>3">{{scope.row.order}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="username" label="销售员" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="img" label="头像" align="center">
                    <template slot-scope="scope">
                       <div class="poImg" :class="[scope.row.order==1?'poImg1':scope.row.order==2?'poImg2':scope.row.order==3?'poImg3':'']">
                        <img :src="scope.row.img" style="width: 60px;height: 60px;border-radius:50%;" v-if="scope.row.img!=null">
                        <img src="./header.png" style="width: 60px;height: 60px;border-radius:50%;" v-if="scope.row.img==null">
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="depart" label="部门" sortable="custom" align="center"></el-table-column>
                  <!-- <el-table-column prop="role" label="职位" sortable="custom" align="center"></el-table-column> -->
                  <el-table-column prop="lastProfit" label="上月毛利"  sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="lastAve" label="上月平均毛利" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="lastDiff" label="上月毛利差额" sortable="custom" align="center">
                    <template slot-scope="scope">
                      <span :class="scope.row.lastDiff<0?'colorRed':''">{{scope.row.lastDiff}}</span>
                     </template> 
                  </el-table-column>
                  <el-table-column prop="thisProfit" label="本月毛利" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="thisAve" label="本月平均毛利" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="thisDiff" label="本月毛利差额" sortable="custom" align="center">
                    <template slot-scope="scope">
                      <span :class="scope.row.thisDiff<0?'colorRed':''">{{scope.row.thisDiff}}</span>
                     </template> 
                  </el-table-column>
                  <el-table-column prop="hireDate" label="入职时长（月）" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="createDate" label="统计时间" sortable="custom" align="center">
                     <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span>{{dateFormatter(scope.row.createDate)}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="Joom" name="Joom">
                <el-table :data="proTablepm" size="small" @sort-change="sortNumberPX" height="800">
                  <el-table-column prop="order" label="排名" sortable="custom" align="center" width="75">
                    <template slot-scope="scope">
                      <img src="./j1.png" style="width: 31px;height: 38px;" v-if="scope.row.order==1">
                      <img src="./j2.png" style="width: 31px;height: 38px;" v-if="scope.row.order==2">
                      <img src="./j3.png" style="width: 31px;height: 38px;" v-if="scope.row.order==3">
                      <span v-if="scope.row.order>3">{{scope.row.order}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="username" label="销售员" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="img" label="头像" align="center">
                    <template slot-scope="scope">
                       <div class="poImg" :class="[scope.row.order==1?'poImg1':scope.row.order==2?'poImg2':scope.row.order==3?'poImg3':'']">
                        <img :src="scope.row.img" style="width: 60px;height: 60px;border-radius:50%;" v-if="scope.row.img!=null">
                        <img src="./header.png" style="width: 60px;height: 60px;border-radius:50%;" v-if="scope.row.img==null">
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="depart" label="部门" sortable="custom" align="center"></el-table-column>
                  <!-- <el-table-column prop="role" label="职位" sortable="custom" align="center"></el-table-column> -->
                  <el-table-column prop="lastProfit" label="上月毛利"  sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="lastAve" label="上月平均毛利" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="lastDiff" label="上月毛利差额" sortable="custom" align="center">
                    <template slot-scope="scope">
                      <span :class="scope.row.lastDiff<0?'colorRed':''">{{scope.row.lastDiff}}</span>
                     </template> 
                  </el-table-column>
                  <el-table-column prop="thisProfit" label="本月毛利" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="thisAve" label="本月平均毛利" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="thisDiff" label="本月毛利差额" sortable="custom" align="center">
                    <template slot-scope="scope">
                      <span :class="scope.row.thisDiff<0?'colorRed':''">{{scope.row.thisDiff}}</span>
                     </template> 
                  </el-table-column>
                  <el-table-column prop="hireDate" label="入职时长（月）" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="createDate" label="统计时间" sortable="custom" align="center">
                     <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span>{{dateFormatter(scope.row.createDate)}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="tabs-container" v-show="showTitle.baokuan">
            <el-tabs v-model="activePlat" type="card" @tab-click="handlePlat">
              <el-tab-pane label="eBay-义乌仓" name="eBay-义乌仓">
                <el-table :data="proTable" size="small" @sort-change="sortNumber" height="800">
                  <el-table-column type="index" align="center"></el-table-column>
                  <el-table-column prop="platform" label="平台" sortable align="center"></el-table-column>
                  <el-table-column prop="developer" label="开发员" sortable align="center"></el-table-column>
                  <el-table-column prop="goodsCode" label="商品编码" sortable align="center">
                    <template slot-scope="scope">
                      <a :href="scope.row.linkUrl" target="_blank">{{scope.row.goodsCode}}</a>
                    </template>
                  </el-table-column>
                  <el-table-column prop="goodsName" label="商品名称" sortable align="center"></el-table-column>
                  <el-table-column prop="subCate" label="主类目" sortable align="center"></el-table-column>
                  <el-table-column prop="cate" label="子类目" sortable align="center"></el-table-column>
                  <el-table-column prop="img" label="图片" align="center">
                    <template slot-scope="scope">
                      <img :src="scope.row.img" style="width: 120px;height: 120px;">
                    </template>
                  </el-table-column>
                  <el-table-column prop="salesNum" label="月销量" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="profit" label="月毛利" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="endTime" label="统计截止日期" sortable align="center">
                    <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span>{{dateFormatter(scope.row.endTime)}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="eBay-海外仓" name="eBay-海外仓">
                <el-table :data="proTable" size="small" @sort-change="sortNumber" height="800">
                  <el-table-column type="index" align="center"></el-table-column>
                  <el-table-column prop="platform" label="平台" sortable align="center"></el-table-column>
                  <el-table-column prop="developer" label="开发员" sortable align="center"></el-table-column>
                  <el-table-column prop="goodsCode" label="商品编码" sortable align="center">
                    <template slot-scope="scope">
                      <a :href="scope.row.linkUrl" target="_blank">{{scope.row.goodsCode}}</a>
                    </template>
                  </el-table-column>
                  <el-table-column prop="goodsName" label="商品名称" sortable align="center"></el-table-column>
                  <el-table-column prop="subCate" label="主类目" sortable align="center"></el-table-column>
                  <el-table-column prop="cate" label="子类目" sortable align="center"></el-table-column>
                  <el-table-column prop="img" label="图片" sortable align="center">
                    <template slot-scope="scope">
                      <img :src="scope.row.img" style="width: 120px;height: 120px;">
                    </template>
                  </el-table-column>
                  <el-table-column prop="salesNum" label="月销量" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="profit" label="月毛利" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="endTime" label="统计截止日期" sortable align="center">
                    <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span>{{dateFormatter(scope.row.endTime)}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="Wish" name="Wish">
                <el-table :data="proTable" size="small" @sort-change="sortNumber" height="800">
                  <el-table-column type="index" align="center"></el-table-column>
                  <el-table-column prop="platform" label="平台" sortable align="center"></el-table-column>
                  <el-table-column prop="developer" label="开发员" sortable align="center"></el-table-column>
                  <el-table-column prop="goodsCode" label="商品编码" sortable align="center">
                    <template slot-scope="scope">
                      <a :href="scope.row.linkUrl" target="_blank">{{scope.row.goodsCode}}</a>
                    </template>
                  </el-table-column>
                  <el-table-column prop="goodsName" label="商品名称" sortable align="center"></el-table-column>
                  <el-table-column prop="subCate" label="主类目" sortable align="center"></el-table-column>
                  <el-table-column prop="cate" label="子类目" sortable align="center"></el-table-column>
                  <el-table-column prop="img" label="图片" sortable align="center">
                    <template slot-scope="scope">
                      <img :src="scope.row.img" style="width: 120px;height: 120px;">
                    </template>
                  </el-table-column>
                  <el-table-column prop="salesNum" label="月销量" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="profit" label="月毛利" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="endTime" label="统计截止日期" sortable align="center">
                    <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span>{{dateFormatter(scope.row.endTime)}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="SMT" name="SMT">
                <el-table :data="proTable" size="small" @sort-change="sortNumber" height="800">
                  <el-table-column type="index" align="center"></el-table-column>
                  <el-table-column prop="platform" label="平台" sortable align="center"></el-table-column>
                  <el-table-column prop="developer" label="开发员" sortable align="center"></el-table-column>
                  <el-table-column prop="goodsCode" label="商品编码" sortable align="center">
                    <template slot-scope="scope">
                      <a :href="scope.row.linkUrl" target="_blank">{{scope.row.goodsCode}}</a>
                    </template>
                  </el-table-column>
                  <el-table-column prop="goodsName" label="商品名称" sortable align="center"></el-table-column>
                  <el-table-column prop="subCate" label="主类目" sortable align="center"></el-table-column>
                  <el-table-column prop="cate" label="子类目" sortable align="center"></el-table-column>
                  <el-table-column prop="img" label="图片" sortable align="center">
                    <template slot-scope="scope">
                      <img :src="scope.row.img" style="width: 120px;height: 120px;">
                    </template>
                  </el-table-column>
                  <el-table-column prop="salesNum" label="月销量" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="profit" label="月毛利" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="endTime" label="统计截止日期" sortable align="center">
                    <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span>{{dateFormatter(scope.row.endTime)}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="Amazon" name="Amazon">
                <el-table :data="proTable" size="small" @sort-change="sortNumber" height="800">
                  <el-table-column type="index" align="center"></el-table-column>
                  <el-table-column prop="platform" label="平台" sortable align="center"></el-table-column>
                  <el-table-column prop="developer" label="开发员" sortable align="center"></el-table-column>
                  <el-table-column prop="goodsCode" label="商品编码" sortable align="center">
                    <template slot-scope="scope">
                      <a :href="scope.row.linkUrl" target="_blank">{{scope.row.goodsCode}}</a>
                    </template>
                  </el-table-column>
                  <el-table-column prop="goodsName" label="商品名称" sortable align="center"></el-table-column>
                  <el-table-column prop="subCate" label="主类目" sortable align="center"></el-table-column>
                  <el-table-column prop="cate" label="子类目" sortable align="center"></el-table-column>
                  <el-table-column prop="img" label="图片" sortable align="center">
                    <template slot-scope="scope">
                      <img :src="scope.row.img" style="width: 120px;height: 120px;">
                    </template>
                  </el-table-column>
                  <el-table-column prop="salesNum" label="月销量" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="profit" label="月毛利" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="endTime" label="统计截止日期" sortable align="center">
                    <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span>{{dateFormatter(scope.row.endTime)}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="Joom" name="Joom">
                <el-table :data="proTable" size="small" @sort-change="sortNumber" height="800">
                  <el-table-column type="index" align="center"></el-table-column>
                  <el-table-column prop="platform" label="平台" sortable align="center"></el-table-column>
                  <el-table-column prop="developer" label="开发员" sortable align="center"></el-table-column>
                  <el-table-column prop="goodsCode" label="商品编码" sortable align="center">
                    <template slot-scope="scope">
                      <a :href="scope.row.linkUrl" target="_blank">{{scope.row.goodsCode}}</a>
                    </template>
                  </el-table-column>
                  <el-table-column prop="goodsName" label="商品名称" sortable align="center"></el-table-column>
                  <el-table-column prop="subCate" label="主类目" sortable align="center"></el-table-column>
                  <el-table-column prop="cate" label="子类目" sortable align="center"></el-table-column>
                  <el-table-column prop="img" label="图片" sortable align="center">
                    <template slot-scope="scope">
                      <img :src="scope.row.img" style="width: 120px;height: 120px;">
                    </template>
                  </el-table-column>
                  <el-table-column prop="salesNum" label="月销量" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="profit" label="月毛利" sortable="custom" align="center"></el-table-column>
                  <el-table-column prop="endTime" label="统计截止日期" sortable align="center">
                    <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span>{{dateFormatter(scope.row.endTime)}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="tabs-container" v-show="showTitle.zengzhang">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
              <el-tab-pane
                v-for="(item, index) in allMenu"
                :label="item.name"
                :name="item.name"
                :key="index"
              ></el-tab-pane>
            </el-tabs>
          </div>
          <div class="tabs-container" v-show="showTitle.sale">
            <el-tabs v-model="activeSale" type="card" @tab-click="handleClickSale">
              <el-tab-pane
                v-for="(item, index) in allMenu"
                :label="item.name"
                :name="item.name"
                :key="index"
              ></el-tab-pane>
            </el-tabs>
          </div>
          <div class="table-container" v-show="showTitle.zengzhang">
            <el-table
              :data="shanghaiTable"
              size="small"
              height="798"
              ref="table1"
              v-if="show.shanghai"
              v-scrollBar:slim
              @sort-change="sortNumber"
            >
              <el-table-column type="index" align="center"></el-table-column>
              <el-table-column prop="depart" align="center" label="部门" sortable>
                <el-table-column prop="depart" :render-header="renderHeadertic" align="center"></el-table-column>
              </el-table-column>
              <el-table-column prop="username" align="center" label="姓名" sortable></el-table-column>
              <!-- <el-table-column prop="role"
                               align="center"
              label="角色"></el-table-column>-->
              <el-table-column prop="lastProfit" align="center" label="上月毛利" sortable="custom"></el-table-column>
              <el-table-column prop="profit" align="center" label="本月毛利" sortable="custom"></el-table-column>
              <el-table-column prop="rate" align="center" label="本月VS上月" sortable="custom">
                <template slot-scope="scope">
                  <el-progress
                    :text-inside="true"
                    :stroke-width="18"
                    :status="checkStatus(scope.row,'rate')"
                    :percentage="Math.round(scope.row.rate*10000)/100"
                  ></el-progress>
                </template>
              </el-table-column>
              <el-table-column prop="dateRate" align="center" label="时间进度">
                <template slot-scope="scope">
                  <el-progress
                    :text-inside="true"
                    :stroke-width="18"
                    status="exception"
                    :percentage="Math.round(scope.row.dateRate*10000)/100"
                  ></el-progress>
                </template>
              </el-table-column>
              <el-table-column prop="updateTime" align="center" label="统计截止日期">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span>{{dateFormatter(scope.row.updateTime)}}</span>
                </template>
              </el-table-column>
            </el-table>
            <el-table
              :data="zhengzhouTable"
              @sort-change="sortNumber"
              size="small"
              height="798"
              v-show="show.zhengzhou"
            >
              <el-table-column type="index" align="center"></el-table-column>
              <el-table-column prop="depart" align="center" label="部门">
                <el-table-column prop="depart" :render-header="renderHeadertic1" align="center"></el-table-column>
              </el-table-column>
              <el-table-column prop="username" align="center" label="姓名" sortable></el-table-column>
              <!-- <el-table-column prop="role"
                               align="center"
              label="角色"></el-table-column>-->
              <el-table-column prop="lastProfit" align="center" label="上月毛利" sortable="custom"></el-table-column>
              <el-table-column prop="profit" align="center" label="本月毛利" sortable="custom"></el-table-column>
              <el-table-column prop="rate" align="center" label="本月VS上月" sortable="custom">
                <template slot-scope="scope">
                  <el-progress
                    :text-inside="true"
                    :stroke-width="18"
                    :status="checkStatus(scope.row,'rate')"
                    :percentage="Math.round(scope.row.rate*10000)/100"
                  ></el-progress>
                </template>
              </el-table-column>
              <el-table-column prop="dateRate" align="center" label="时间进度">
                <template slot-scope="scope">
                  <el-progress
                    :text-inside="true"
                    :stroke-width="18"
                    status="exception"
                    :percentage="Math.round(scope.row.dateRate*10000)/100"
                  ></el-progress>
                </template>
              </el-table-column>
              <el-table-column prop="updateTime" align="center" label="统计截止日期">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span>{{ dateFormatter(scope.row.updateTime) }}</span>
                </template>
              </el-table-column>
            </el-table>
            <el-table
              :data="departTable"
              size="small"
              height="798"
              v-show="show.depart"
              @sort-change="sortNumber"
            >
              <el-table-column type="index" align="center"></el-table-column>
              <el-table-column prop="depart" label="部门" align="center" sortable>
                <el-table-column prop="depart" :render-header="renderHeadertic2" align="center"></el-table-column>
              </el-table-column>
              <el-table-column prop="lastProfit" align="center" label="上月毛利" sortable="custom"></el-table-column>
              <el-table-column prop="profit" label="本月毛利" align="center" sortable="custom"></el-table-column>
              <el-table-column prop="rate" label="本月VS上月" align="center" sortable="custom">
                <template slot-scope="scope">
                  <el-progress
                    :text-inside="true"
                    :stroke-width="18"
                    :status="checkStatus(scope.row,'rate')"
                    :percentage="Math.round(scope.row.rate*10000)/100"
                  ></el-progress>
                </template>
              </el-table-column>
              <el-table-column prop="dateRate" align="center" label="时间进度">
                <template slot-scope="scope">
                  <el-progress
                    :text-inside="true"
                    :stroke-width="18"
                    status="exception"
                    :percentage="Math.round(scope.row.dateRate*10000)/100"
                  ></el-progress>
                </template>
              </el-table-column>
              <el-table-column prop="updateTime" align="center" label="统计截止日期">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span>{{ dateFormatter(scope.row.updateTime) }}</span>
                </template>
              </el-table-column>
            </el-table>
            <el-table
              :data="developerTable"
              height="798"
              size="small"
              v-show="show.developer"
              @sort-change="sortNumber"
            >
              <el-table-column type="index" align="center"></el-table-column>
              <el-table-column prop="depart" align="center" label="部门" sortable>
                <el-table-column prop="depart" :render-header="renderHeadertic3" align="center"></el-table-column>
              </el-table-column>
              <el-table-column prop="username" align="center" label="姓名" sortable></el-table-column>
              <!-- <el-table-column prop="role"
                               align="center"
              label="角色"></el-table-column>-->
              <el-table-column prop="lastProfit" align="center" label="上月毛利" sortable="custom"></el-table-column>
              <el-table-column prop="profit" align="center" label="本月毛利" sortable="custom"></el-table-column>
              <el-table-column prop="rate" align="center" label="本月VS上月" sortable="custom">
                <template slot-scope="scope">
                  <el-progress
                    :text-inside="true"
                    :stroke-width="18"
                    :status="checkStatus(scope.row,'rate')"
                    :percentage="Math.round(scope.row.rate*10000)/100"
                  ></el-progress>
                </template>
              </el-table-column>
              <el-table-column prop="dateRate" align="center" label="时间进度">
                <template slot-scope="scope">
                  <el-progress
                    :text-inside="true"
                    :stroke-width="18"
                    status="exception"
                    :percentage="Math.round(scope.row.dateRate*10000)/100"
                  ></el-progress>
                </template>
              </el-table-column>
              <el-table-column prop="updateTime" align="center" label="统计截止日期">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span>{{dateFormatter(scope.row.updateTime)}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="table-container" v-show="showTitle.sale">
            <el-table
              :data="saleSh"
              size="small"
              height="798"
              ref="table1"
              v-if="sale.shanghai"
              v-scrollBar:slim
              @sort-change="sortNumber"
            >
              <el-table-column type="index" align="center"></el-table-column>
              <el-table-column prop="depart" align="center" label="部门" sortable>
                <el-table-column prop="depart" :render-header="renderHeaderPic" align="center"></el-table-column>
              </el-table-column>
              <el-table-column prop="username" align="center" label="姓名" sortable></el-table-column>
              <!-- <el-table-column prop="role"
                               align="center"
              label="角色"></el-table-column>-->
              <el-table-column prop="lastAmt" align="center" label="上月销售额" sortable="custom"></el-table-column>
              <el-table-column prop="amt" align="center" label="本月销售额" sortable="custom"></el-table-column>
              <el-table-column prop="rate" align="center" label="本月VS上月" sortable="custom">
                <template slot-scope="scope">
                  <el-progress
                    :text-inside="true"
                    :stroke-width="18"
                    :status="checkStatus(scope.row,'rate')"
                    :percentage="Math.round(scope.row.rate*10000)/100"
                  ></el-progress>
                </template>
              </el-table-column>
              <el-table-column prop="dateRate" align="center" label="时间进度">
                <template slot-scope="scope">
                  <el-progress
                    :text-inside="true"
                    :stroke-width="18"
                    status="exception"
                    :percentage="Math.round(scope.row.dateRate*10000)/100"
                  ></el-progress>
                </template>
              </el-table-column>
              <el-table-column prop="updateTime" align="center" label="统计截止日期">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span>{{dateFormatter(scope.row.updateTime)}}</span>
                </template>
              </el-table-column>
            </el-table>
            <el-table
              :data="saleZz"
              @sort-change="sortNumber"
              size="small"
              height="798"
              v-show="sale.zhengzhou"
            >
              <el-table-column type="index" align="center"></el-table-column>
              <el-table-column prop="depart" align="center" label="部门">
                <el-table-column prop="depart" :render-header="renderHeaderPic1" align="center"></el-table-column>
              </el-table-column>
              <el-table-column prop="username" align="center" label="姓名" sortable></el-table-column>
              <!-- <el-table-column prop="role"
                               align="center"
              label="角色"></el-table-column>-->
              <el-table-column prop="lastAmt" align="center" label="上月销售额" sortable="custom"></el-table-column>
              <el-table-column prop="amt" align="center" label="本月销售额" sortable="custom"></el-table-column>
              <el-table-column prop="rate" align="center" label="本月VS上月" sortable="custom">
                <template slot-scope="scope">
                  <el-progress
                    :text-inside="true"
                    :stroke-width="18"
                    :status="checkStatus(scope.row,'rate')"
                    :percentage="Math.round(scope.row.rate*10000)/100"
                  ></el-progress>
                </template>
              </el-table-column>
              <el-table-column prop="dateRate" align="center" label="时间进度">
                <template slot-scope="scope">
                  <el-progress
                    :text-inside="true"
                    :stroke-width="18"
                    status="exception"
                    :percentage="Math.round(scope.row.dateRate*10000)/100"
                  ></el-progress>
                </template>
              </el-table-column>
              <el-table-column prop="updateTime" align="center" label="统计截止日期">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span>{{ dateFormatter(scope.row.updateTime) }}</span>
                </template>
              </el-table-column>
            </el-table>
            <el-table
              :data="saleDepartment"
              size="small"
              height="798"
              v-show="sale.depart"
              @sort-change="sortNumber"
            >
              <el-table-column type="index" align="center"></el-table-column>
              <el-table-column prop="depart" label="部门" align="center" sortable>
                <el-table-column prop="depart" :render-header="renderHeaderPic2" align="center"></el-table-column>
              </el-table-column>
              <el-table-column prop="lastAmt" align="center" label="上月销售额" sortable="custom"></el-table-column>
              <el-table-column prop="amt" label="本月销售额" align="center" sortable="custom"></el-table-column>
              <el-table-column prop="rate" label="本月VS上月" align="center" sortable="custom">
                <template slot-scope="scope">
                  <el-progress
                    :text-inside="true"
                    :stroke-width="18"
                    :status="checkStatus(scope.row,'rate')"
                    :percentage="Math.round(scope.row.rate*10000)/100"
                  ></el-progress>
                </template>
              </el-table-column>
              <el-table-column prop="dateRate" align="center" label="时间进度">
                <template slot-scope="scope">
                  <el-progress
                    :text-inside="true"
                    :stroke-width="18"
                    status="exception"
                    :percentage="Math.round(scope.row.dateRate*10000)/100"
                  ></el-progress>
                </template>
              </el-table-column>
              <el-table-column prop="updateTime" align="center" label="统计截止日期">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span>{{ dateFormatter(scope.row.updateTime) }}</span>
                </template>
              </el-table-column>
            </el-table>
            <el-table
              :data="saleDevelop"
              height="798"
              size="small"
              v-show="sale.developer"
              @sort-change="sortNumber"
            >
              <el-table-column type="index" align="center"></el-table-column>
              <el-table-column prop="depart" align="center" label="部门" sortable>
                <el-table-column prop="depart" :render-header="renderHeaderPic3" align="center"></el-table-column>
              </el-table-column>
              <el-table-column prop="username" align="center" label="姓名" sortable></el-table-column>
              <!-- <el-table-column prop="role"
                               align="center"
              label="角色"></el-table-column>-->
              <el-table-column prop="lastAmt" align="center" label="上月销售额" sortable="custom"></el-table-column>
              <el-table-column prop="amt" align="center" label="本月销售额" sortable="custom"></el-table-column>
              <el-table-column prop="rate" align="center" label="本月VS上月" sortable="custom">
                <template slot-scope="scope">
                  <el-progress
                    :text-inside="true"
                    :stroke-width="18"
                    :status="checkStatus(scope.row,'rate')"
                    :percentage="Math.round(scope.row.rate*10000)/100"
                  ></el-progress>
                </template>
              </el-table-column>
              <el-table-column prop="dateRate" align="center" label="时间进度">
                <template slot-scope="scope">
                  <el-progress
                    :text-inside="true"
                    :stroke-width="18"
                    status="exception"
                    :percentage="Math.round(scope.row.dateRate*10000)/100"
                  ></el-progress>
                </template>
              </el-table-column>
              <el-table-column prop="updateTime" align="center" label="统计截止日期">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span>{{dateFormatter(scope.row.updateTime)}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </div>
      <el-card class="box-card">
        <div slot="header" class="clearfix-list">
          <h2>公告栏</h2>
        </div>
        <ul>
          <li v-for="(item, index) in newsList" :key="index">
            <div class="post-left-box">
              <div class="subtitle">
                <h2 v-html="item.title"></h2>
                <p
                  style="color:#b2b2b2;"
                >{{item.creator}} &nbsp;&nbsp;| &nbsp;&nbsp;{{item.createDate.substring(0, 16)}}</p>
              </div>
            </div>
            <div class="post-right-box">
              <el-button type="text" @click="dialogTopShow(item.id)">
                <i class="el-icon-view"></i>
              </el-button>
              <el-button type="text" slot="reference" style="padding:8px;" v-if="item.isTop==='1'">
                <el-badge value="顶" style="margin-top:-5px;"></el-badge>
              </el-button>
              <el-button
                type="text"
                @click="handleTop(item.id)"
                slot="reference"
                style="padding:10px;"
                v-else-if="item.isTop==='0'"
              >
                <span>⇧</span>
              </el-button>
            </div>
          </li>
        </ul>
        <el-button
          type="text"
          @click="loadMore"
          class="more"
          v-text="this.page>=this.newsData.page?'加载更多':'已无更多'"
        ></el-button>
      </el-card>
      <el-card class="box-card1">
        <div slot="header" class="clearfix-list">
          <h2>更新日志</h2>
        </div>
        <div class="contentBox">
          <div class="contentBox01">
            <!-- <div class="contentBoxLeft">
            <div class="texta">
              <a class="titlea">2019-15-12</a>
              <span class="blueround"></span>    
            </div>
            </div>-->
            <div class="contentBoxRight">
              <div class="text01" v-for="(item, index) in logList" :key="index">
                <span class="blueround"></span>
                <p class="titlep">{{item.title}}</p>
                <a class="titlea">{{item.createdDate | cutOut}}</a>
                <p class="cp">{{item.details}}</p>
              </div>
            </div>
          </div>
        </div>
      </el-card>
      <!-- <el-card class="box-card1">
        <div slot="header"
             class="clearfix-list">
          <h2>活动栏</h2>
        </div>
        <img src="../assets/1.5.jpg"
             style="height:400px;width:95%;padding:15px;">
      </el-card>-->
      <el-dialog :visible.sync="dialogVisible">
        <el-form :model="newsDetailList" label-width="80px" ref="detailForm">
          <el-form-item label="标题：" prop="title">
            <span v-html="newsDetailList.title" style="font-size:18px;"></span>
          </el-form-item>
          <el-form-item label="详情：" prop="detail">
            <span v-html="newsDetailList.detail" style="font-size:18px;"></span>
          </el-form-item>
        </el-form>
      </el-dialog>
    </section>
  </div>
</template>

<script>
import {
  ShangHaiTarget,
  ZhengZhouTarget,
  DepartTarget,
  DeveloperTarget,
  news,
  newsTop,
  ProsTarget,
  ProsTargetPm,
  getAmt,
  getZzAmt,
  getDepartAmt,
  getDevAmt,
  APIHeadDpart,
  APIAllDpart,
  APIBranchDpart
} from "../api/api";
import { compareUp, compareDown } from "../api/tools";
import { updateLog } from "../api/product";
import { getMenu } from "../api/login";

export default {
  data() {
    return {
      page: null,
      dialogVisible: false,
      data: {
        id: "",
        isTop: "1"
      },
      newsData: {
        page: 1,
        pageSize: 10
      },
      logdata: {
        page: 1,
        pageSize: 100000
      },
      newsDetailList: {},
      allMenu: [],
      titleMenu: [],
      moreData: [],
      newsList: [],
      tableHeight: null,
      permission: [],
      logList: [],
      shbm: [],
      sybm: [],
      zzbm: [],
      shanghaiTable: [],
      zhengzhouTable: [],
      departTable: [],
      developerTable: [],
      proTable: [],
      proTablepm: [],
      saleSh: [],
      saleDepartment: [],
      saleDevelop: [],
      saleZz: [],
      activeName: "上海销售",
      activeTitle: "销售排名",
      activePlat: "eBay-义乌仓",
      activePlatpm:"eBay-义乌仓",
      activeSale: "上海销售",
      profitl1: {
        depart: null
      },
      profitl2: {
        depart: null
      },
      profitl3: {
        depart: null
      },
      profitl4: {
        depart: null
      },
      profit1: {
        depart: null
      },
      profit2: {
        depart: null
      },
      profit3: {
        depart: null
      },
      profit4: {
        depart: null
      },
      show: {
        shanghai: true,
        zhengzhou: false,
        depart: false,
        developer: false
      },
      sale: {
        shanghai: true,
        zhengzhou: false,
        depart: false,
        developer: false
      },
      showTitle: {
        baokuan: false,
        zengzhang: false,
        sale: false,
        pming:true
      }
    };
  },
  methods: {
    sortNumberPX(column, prop, order) {
      const data = this.proTablepm
      if (column.order === 'descending') {
        this.proTablepm = data.sort(compareDown(data, column.prop))
      } else {
        this.proTablepm = data.sort(compareUp(data, column.prop))
      }
    },
    renderHeadertic(h, { column, $index }) {
      if ($index === 0) {
        let filters = this.shbm;
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.profit1.depart,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.profit1.depart = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.getDlr1();
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
      }
    },
    renderHeadertic1(h, { column, $index }) {
      if ($index === 0) {
        let filters = this.zzbm;
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.profit2.depart,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.profit2.depart = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.getDlr2();
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
      }
    },
    renderHeadertic2(h, { column, $index }) {
      if ($index === 0) {
        let filters = this.sybm;
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.profit3.depart,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.profit3.depart = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.getDlr3();
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
      }
    },
    renderHeadertic3(h, { column, $index }) {
      if ($index === 0) {
        let filters = this.sybm;
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.profit4.depart,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.profit4.depart = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.getDlr4();
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
      }
    },
    renderHeaderPic(h, { column, $index }) {
      if ($index === 0) {
        let filters = this.shbm;
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.profitl1.depart,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.profitl1.depart = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.getDsh();
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
      }
    },
    renderHeaderPic1(h, { column, $index }) {
      if ($index === 0) {
       let filters = this.zzbm;
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.profitl2.depart,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.profitl2.depart = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.getDzz();
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
      }
    },
    renderHeaderPic2(h, { column, $index }) {
      if ($index === 0) {
        let filters = this.sybm;
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.profitl3.depart,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.profitl3.depart = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.getDsy();
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
      }
    },
    renderHeaderPic3(h, { column, $index }) {
      if ($index === 0) {
        let filters = this.sybm;
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.profitl4.depart,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.profitl4.depart = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.getDkf();
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
      }
    },
    getDlr1() {
     ShangHaiTarget(this.profit1).then(res => {
      this.shanghaiTable = res.data.data;
    });
    },
    getDlr2() {
      ZhengZhouTarget(this.profit2).then(res => {
      this.zhengzhouTable = res.data.data;
    });
    },
    getDlr3() {
     DepartTarget(this.profit3).then(res => {
      this.departTable = res.data.data;
    });
    },
    getDlr4() {
      DeveloperTarget(this.profit4).then(res => {
      this.developerTable = res.data.data;
    });
    },
    getDsh() {
      getAmt(this.profitl1).then(res => {
        this.saleSh = res.data.data;
      });
    },
    getDzz() {
      getZzAmt(this.profitl2).then(res => {
        this.saleZz = res.data.data;
      });
    },
    getDsy() {
      getDepartAmt(this.profitl3).then(res => {
        this.saleDepartment = res.data.data;
      });
    },
    getDkf() {
      getDevAmt(this.profitl4).then(res => {
        this.saleDevelop = res.data.data;
      });
    },
    // 加载更多
    loadMore() {
      this.newsData.page++;
      news(this.newsData).then(res => {
        this.moreData = res.data.data.items;
        this.newsList = this.newsList.concat(this.moreData);
      });
    },
    // 公告详情
    dialogTopShow(id) {
      this.dialogVisible = true;
      this.newsDetailList = this.newsList.filter(e => e.id === id);
      this.newsDetailList = this.newsDetailList[0];
    },
    // 置顶
    handleTop(id) {
      this.data.id = id;
      newsTop(this.data).then(res => {
        this.getNews();
      });
      this.newsData.page = 1;
    },
    getNews() {
      news(this.newsData).then(res => {
        const ret = res.data.data.items;
        this.newsList = ret;
        this.page = res.data.data._meta.pageCount;
      });
    },
    handleClick(tab, event) {
      if (tab.label === "上海销售") {
        this.show["shanghai"] = true;
      } else {
        this.show["shanghai"] = false;
      }
      if (tab.label === "郑州销售") {
        this.show["zhengzhou"] = true;
      } else {
        this.show["zhengzhou"] = false;
      }
      if (tab.label === "所有部门") {
        this.show["depart"] = true;
      } else {
        this.show["depart"] = false;
      }
      if (tab.label === "所有开发") {
        this.show["developer"] = true;
      } else {
        this.show["developer"] = false;
      }
    },
    handleClickSale(tab, event) {
      if (tab.label === "上海销售") {
        this.sale["shanghai"] = true;
      } else {
        this.sale["shanghai"] = false;
      }
      if (tab.label === "郑州销售") {
        this.sale["zhengzhou"] = true;
      } else {
        this.sale["zhengzhou"] = false;
      }
      if (tab.label === "所有部门") {
        this.sale["depart"] = true;
      } else {
        this.sale["depart"] = false;
      }
      if (tab.label === "所有开发") {
        this.sale["developer"] = true;
      } else {
        this.sale["developer"] = false;
      }
    },
    handleTitle(tab, event) {
      if (tab.label === "今日爆款") {
        this.showTitle["baokuan"] = true;
      } else {
        this.showTitle["baokuan"] = false;
      }
      if (tab.label === "利润增长表") {
        this.showTitle["zengzhang"] = true;
      } else {
        this.showTitle["zengzhang"] = false;
      }
      if (tab.label === "销售额增长表") {
        this.showTitle["sale"] = true;
      } else {
        this.showTitle["sale"] = false;
      }
      if (tab.label === "销售排名") {
        this.showTitle["pming"] = true;
      } else {
        this.showTitle["pming"] = false;
      }
    },
    handlePlat(tab, event) {
      if (tab.label === "eBay-义乌仓") {
        ProsTarget(this.activePlat).then(res => {
          this.proTable = res.data.data;
        });
      }
      if (tab.label === "eBay-海外仓") {
        ProsTarget(this.activePlat).then(res => {
          this.proTable = res.data.data;
        });
      }
      if (tab.label === "Wish") {
        ProsTarget(this.activePlat).then(res => {
          this.proTable = res.data.data;
        });
      }
      if (tab.label === "SMT") {
        ProsTarget(this.activePlat).then(res => {
          this.proTable = res.data.data;
        });
      }
      if (tab.label === "Amazon") {
        ProsTarget(this.activePlat).then(res => {
          this.proTable = res.data.data;
        });
      }
      if (tab.label === "Joom") {
        ProsTarget(this.activePlat).then(res => {
          this.proTable = res.data.data;
        });
      }
    },
    handlePlatpm(tab, event) {
      if (tab.label === "eBay-义乌仓") {
        ProsTargetPm(this.activePlatpm).then(res => {
          this.proTablepm = res.data.data;
        });
      }
      if (tab.label === "eBay-海外仓") {
        ProsTargetPm(this.activePlatpm).then(res => {
          this.proTablepm = res.data.data;
        });
      }
      if (tab.label === "Wish") {
        ProsTargetPm(this.activePlatpm).then(res => {
          this.proTablepm = res.data.data;
        });
      }
      if (tab.label === "SMT") {
        ProsTargetPm(this.activePlatpm).then(res => {
          this.proTablepm = res.data.data;
        });
      }
      if (tab.label === "Amazon") {
        ProsTargetPm(this.activePlatpm).then(res => {
          this.proTablepm = res.data.data;
        });
      }
      if (tab.label === "Joom") {
        ProsTargetPm(this.activePlatpm).then(res => {
          this.proTablepm = res.data.data;
        });
      }
    },
    dateFormatter(date) {
      return date.substring(0, 10);
    },
    // 数字排序
    sortNumber(column, prop, order) {
      if (this.activeTitle === "利润增长表") {
        var tab;
        if (this.activeName === "上海销售") {
          tab = "shanghai";
        } else if (this.activeName === "郑州销售") {
          tab = "zhengzhou";
        } else if (this.activeName === "所有部门") {
          tab = "depart";
        } else if (this.activeName === "所有开发") {
          tab = "developer";
        }
        const tableName = tab + "Table";
        const data = this[tableName];
        if (column.order === "descending") {
          this.tableData = data.sort(compareDown(data, column.prop));
        } else {
          this.tableData = data.sort(compareUp(data, column.prop));
        }
      } else if (this.activeTitle === "销售额增长表") {
        var tab;
        if (this.activeSale === "上海销售") {
          tab = "saleSh";
        } else if (this.activeSale === "郑州销售") {
          tab = "saleZz";
        } else if (this.activeSale === "所有部门") {
          tab = "saleDepartment";
        } else if (this.activeSale === "所有开发") {
          tab = "saleDevelop";
        }
        const tableName = tab;
        const data = this[tableName];
        if (column.order === "descending") {
          this.tableData = data.sort(compareDown(data, column.prop));
        } else {
          this.tableData = data.sort(compareUp(data, column.prop));
        }
      } else {
        const data = this.proTable;
        if (column.order === "descending") {
          this.tableData = data.sort(compareDown(data, column.prop));
        } else {
          this.tableData = data.sort(compareUp(data, column.prop));
        }
      }
    },
    checkStatus(row, prop) {
      if (row.lastProfit < 0 && row.profit > 0) {
        if (Math.abs(row[prop]) < row.dateRate) {
          return "exception";
        }
        return "success";
      } else if (row.lastProfit > 0 && row.profit < 0) {
        return "exception";
      } else if (row[prop] < row.dateRate) {
        return "exception";
      }
      return "success";
    }
  },
  filters: {
    cutOut: function(value) {
      if (!value) return "";
      value = value.substring(0, 10);
      return value;
    }
  },
  mounted() {
    getMenu().then(response => {
      const res = response.data.data;
      const menu = res.filter(e => e.name === "主页");
      this.allMenu = menu[0].tabs[1].tabs;
      this.titleMenu = menu[0].tabs;
    });
    updateLog(this.logdata).then(res => {
      if (res.data.code == 200) {
        this.logList = res.data.data.items;
      } else {
        this.$message.error(res.data.message);
      }
    });
    APIHeadDpart().then(res => {
      this.shbm = res.data.data;
    });
    APIAllDpart().then(res => {
      this.sybm = res.data.data;
    });
    APIBranchDpart().then(res => {
      this.zzbm = res.data.data;
    });
    getAmt(this.profitl1).then(res => {
      this.saleSh = res.data.data;
    });
    getZzAmt(this.profitl2).then(res => {
      this.saleZz = res.data.data;
    });
    getDepartAmt(this.profitl3).then(res => {
      this.saleDepartment = res.data.data;
    });
    getDevAmt(this.profitl4).then(res => {
      this.saleDevelop = res.data.data;
    });
    ShangHaiTarget(this.profit1).then(res => {
      this.shanghaiTable = res.data.data;
    });
    ZhengZhouTarget(this.profit2).then(res => {
      this.zhengzhouTable = res.data.data;
    });
    DepartTarget(this.profit3).then(res => {
      this.departTable = res.data.data;
    });
    DeveloperTarget(this.profit4).then(res => {
      this.developerTable = res.data.data;
    });
    ProsTarget(this.activePlat).then(res => {
      this.proTable = res.data.data;
    });
    ProsTargetPm(this.activePlatpm).then(res => {
      this.proTablepm = res.data.data;
    });
    this.getNews();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.colorRed{
  color: red;
}
.poImg{
  width: 80px;
  height: 80px;
}
.poImg img{
  margin-top: 16px;
}
.poImg1{
  width: 80px;
  height: 80px;
  background: url(./touguan.png) no-repeat center;
  background-size: 100% 100%;
}
.poImg2{
  width: 80px;
  height: 80px;
  background: url(./toukuang1.png) no-repeat center;
  background-size: 100% 100%;
}
.poImg3{
  width: 80px;
  height: 80px;
  background: url(./toukuang2.png) no-repeat center;
  background-size: 100% 100%;
}
.blueround {
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #007aff;
  position: absolute;
  left: -8.5%;
  top: 16px;
  z-index: 999;
}
.text01 {
  width: 100%;
  position: relative;
}
.titlea {
  display: block;
  padding-top: 12px;
  text-align: center;
  position: absolute;
  left: -37%;
  top: 0;
  font-size: 16px;
  color: #303133;
}
@media screen and (max-width: 1600px) {
  .blueround {
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #007aff;
    position: absolute;
    left: -9.5%;
    top: 16px;
    z-index: 999;
  }
  .titlea {
    display: block;
    padding-top: 12px;
    text-align: center;
    position: absolute;
    left: -38%;
    top: 0;
    font-size: 16px;
    color: #303133;
  }
}
@media screen and (max-width: 1400px) {
  .titlea {
    display: block;
    padding-top: 12px;
    text-align: center;
    position: absolute;
    left: -45.5%;
    top: 0;
    font-size: 16px;
    color: #303133;
  }
}
.contentBox {
  width: 95%;
  overflow: hidden;
  margin: auto;
}
.contentBox01 {
  width: 100%;
  overflow: hidden;
}
.contentBoxLeft {
  width: 25%;
  float: left;
}
.contentBoxRight {
  width: 68%;
  float: right;
  border-left: #d2d4da solid 1px;
  margin-left: 27%;
  padding-left: 5%;
  padding-top: 15px;
  min-height: 420px;
}
.cp {
  line-height: 25px;
  font-size: 14px;
}
.titlep {
  font-size: 16px;
  padding: 0;
  margin: 0;
  padding-top: 10px;
  font-weight: bold;
}
.clearfix-table {
  height: 21px;
  line-height: 0px;
}
.clearfix-list {
  height: 4px;
  line-height: 0px;
}
.left-box {
  width: 69%;
  float: left;
  margin-top: 2%;
  height: 900px;
}
.box-card {
  width: 30%;
  height: 390px;
  overflow-y: scroll;
  float: right;
  margin-top: 2%;
  .post-left-box {
    position: relative;
    float: left;
    width: 400px;
    h2 {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
  .post-right-box {
    position: relative;
    float: right;
    margin-top: 10px;
    margin-right: 10px;
    i {
      margin-right: -15px;
      font-size: 20px;
    }
    span {
      margin-right: 5px;
      font-style: normal;
      font-size: 24px;
    }
    span:hover {
      color: red;
    }
  }
  li {
    list-style: none;
    border-bottom: 1px solid #eee;
    transition: all 0.3s;
    height: 100px;
  }
  .more {
    margin-left: 50%;
  }
}
.box-card1 {
  width: 30%;
  height: 495px;
  float: right;
  margin-top: 10px;
  overflow-y: scroll;
}
a {
  color: #428bac;
  text-decoration: none;
}
a:hover {
  color: #2a6496;
  text-decoration: underline;
}
h2:hover {
  color: #1ebbf0;
}
.dashboard-editor-container {
  padding: 0 30px;
  background-color: #f0f2f5;
  zoom: 0.9;
}
.table-container {
  background-color: #ffffff;
}
.tabs-container {
  background-color: #ffffff;
}
.text {
  font-size: 18px;
}
</style>