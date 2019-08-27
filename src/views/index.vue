<template>
  <div class="dashboard-editor-container" style="height: 970px;">
    <section>
      <div class="left-box">
        <el-card>
          <div style="padding-top:20px;padding-left:12px;padding-bottom:5px;">
            <!-- <el-radio-group v-model="activeTitle">
              <el-radio-button :label="item.name" v-for="(item, index) in titleMenu" :key="index"></el-radio-button>
            </el-radio-group>-->
            <div class="index_content">
              <p
                :class="indexTabactive==index?'index_p index_active':''"
                v-for="(item, index) in titleMenu"
                :key="index"
                @click="handleTitle(item.name,index)"
              >
                <i
                  :class="index==0?'el-icon-rank':index==1?'el-icon-tickets':index==2?'el-icon-document':index==3?'el-icon-date':''"
                ></i>
                {{item.name}}
              </p>
            </div>
          </div>
          <div class="tabs-container tab-index-pan tswj" v-show="showTitle.wj">
            
          </div>
          <div class="tabs-container tab-index-pan" v-show="showTitle.pming">
            <el-tabs
              v-model="activeTabName"
              style="width:100%;padding-left:14px;"
              @tab-click="handclickPm"
            >
              <el-tab-pane
                v-for="(item, index) in titleMenuTab"
                :label="item"
                :name="item"
                :key="index"
              ></el-tab-pane>
            </el-tabs>
            <div v-show="pmShow.pmYW">
              <el-table :data="proTablepm" size="small" @sort-change="sortNumberPX" height="800">
                <el-table-column
                  prop="order"
                  label="排名"
                  sortable="custom"
                  align="center"
                  width="75"
                >
                  <template slot-scope="scope">
                    <img
                      src="../assets/j1.png"
                      style="width: 31px;height: 38px;"
                      v-if="scope.row.order==1"
                    >
                    <img
                      src="../assets/j2.png"
                      style="width: 31px;height: 38px;"
                      v-if="scope.row.order==2"
                    >
                    <img
                      src="../assets/j3.png"
                      style="width: 31px;height: 38px;"
                      v-if="scope.row.order==3"
                    >
                    <span v-if="scope.row.order>3">{{scope.row.order}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="username" label="销售员" align="center" width="100"></el-table-column>
                <el-table-column prop="img" label="头像" align="center" width="100">
                  <template slot-scope="scope">
                    <div
                      class="poImg"
                      :class="[scope.row.order==1?'poImg1':scope.row.order==2?'poImg2':scope.row.order==3?'poImg3':'']"
                    >
                      <img
                        :src="scope.row.img"
                        style="width: 60px;height: 60px;border-radius:50%;"
                        v-if="scope.row.img!=null"
                      >
                      <img
                        src="../assets/header.png"
                        style="width: 60px;height: 60px;border-radius:50%;"
                        v-if="scope.row.img==null"
                      >
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="depart" label="部门" align="center" width="100"></el-table-column>
                <!-- <el-table-column prop="role" label="职位" sortable="custom" align="center"></el-table-column> -->
                <el-table-column
                  prop="lastProfit"
                  label="上月毛利"
                  sortable="custom"
                  align="center"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="lastAve"
                  label="上月本平台平均毛利"
                  sortable="custom"
                  align="center"
                  width="170"
                ></el-table-column>
                <el-table-column
                  prop="lastDiff"
                  label="上月毛利差额"
                  sortable="custom"
                  align="center"
                  width="130"
                >
                  <template slot-scope="scope">
                    <span :class="scope.row.lastDiff<0?'colorRed':''">{{scope.row.lastDiff}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="thisProfit"
                  label="本月毛利"
                  sortable="custom"
                  align="center"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="thisAve"
                  label="本月本平台平均毛利"
                  sortable="custom"
                  align="center"
                  width="170"
                ></el-table-column>
                <el-table-column
                  prop="thisDiff"
                  label="本月毛利差额"
                  sortable="custom"
                  align="center"
                  width="130"
                >
                  <template slot-scope="scope">
                    <span :class="scope.row.thisDiff<0?'colorRed':''">{{scope.row.thisDiff}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="hireDate"
                  label="入职时长(月)"
                  sortable="custom"
                  align="center"
                  width="120"
                ></el-table-column>
                <el-table-column
                  prop="createDate"
                  label="统计时间"
                  sortable="custom"
                  align="center"
                  width="120"
                >
                  <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span>{{dateFormatter(scope.row.createDate)}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div v-show="pmShow.pmHW">
              <el-table :data="proTablepm" size="small" @sort-change="sortNumberPX" height="800">
                <el-table-column
                  prop="order"
                  label="排名"
                  sortable="custom"
                  align="center"
                  width="75"
                >
                  <template slot-scope="scope">
                    <img
                      src="../assets/j1.png"
                      style="width: 31px;height: 38px;"
                      v-if="scope.row.order==1"
                    >
                    <img
                      src="../assets/j2.png"
                      style="width: 31px;height: 38px;"
                      v-if="scope.row.order==2"
                    >
                    <img
                      src="../assets/j3.png"
                      style="width: 31px;height: 38px;"
                      v-if="scope.row.order==3"
                    >
                    <span v-if="scope.row.order>3">{{scope.row.order}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="username" label="销售员" align="center" width="100"></el-table-column>
                <el-table-column prop="img" label="头像" align="center" width="100">
                  <template slot-scope="scope">
                    <div
                      class="poImg"
                      :class="[scope.row.order==1?'poImg1':scope.row.order==2?'poImg2':scope.row.order==3?'poImg3':'']"
                    >
                      <img
                        :src="scope.row.img"
                        style="width: 60px;height: 60px;border-radius:50%;"
                        v-if="scope.row.img!=null"
                      >
                      <img
                        src="../assets/header.png"
                        style="width: 60px;height: 60px;border-radius:50%;"
                        v-if="scope.row.img==null"
                      >
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="depart" label="部门" align="center" width="100"></el-table-column>
                <!-- <el-table-column prop="role" label="职位" sortable="custom" align="center"></el-table-column> -->
                <el-table-column
                  prop="lastProfit"
                  label="上月毛利"
                  sortable="custom"
                  align="center"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="lastAve"
                  label="上月本平台平均毛利"
                  sortable="custom"
                  align="center"
                  width="170"
                ></el-table-column>
                <el-table-column
                  prop="lastDiff"
                  label="上月毛利差额"
                  sortable="custom"
                  align="center"
                  width="130"
                >
                  <template slot-scope="scope">
                    <span :class="scope.row.lastDiff<0?'colorRed':''">{{scope.row.lastDiff}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="thisProfit"
                  label="本月毛利"
                  sortable="custom"
                  align="center"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="thisAve"
                  label="本月本平台平均毛利"
                  sortable="custom"
                  align="center"
                  width="170"
                ></el-table-column>
                <el-table-column
                  prop="thisDiff"
                  label="本月毛利差额"
                  sortable="custom"
                  align="center"
                  width="130"
                >
                  <template slot-scope="scope">
                    <span :class="scope.row.thisDiff<0?'colorRed':''">{{scope.row.thisDiff}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="hireDate"
                  label="入职时长(月)"
                  sortable="custom"
                  align="center"
                  width="120"
                ></el-table-column>
                <el-table-column
                  prop="createDate"
                  label="统计时间"
                  sortable="custom"
                  align="center"
                  width="120"
                >
                  <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span>{{dateFormatter(scope.row.createDate)}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div v-show="pmShow.pmWISH">
              <el-table :data="proTablepm" size="small" @sort-change="sortNumberPX" height="800">
                <el-table-column
                  prop="order"
                  label="排名"
                  sortable="custom"
                  align="center"
                  width="75"
                >
                  <template slot-scope="scope">
                    <img
                      src="../assets/j1.png"
                      style="width: 31px;height: 38px;"
                      v-if="scope.row.order==1"
                    >
                    <img
                      src="../assets/j2.png"
                      style="width: 31px;height: 38px;"
                      v-if="scope.row.order==2"
                    >
                    <img
                      src="../assets/j3.png"
                      style="width: 31px;height: 38px;"
                      v-if="scope.row.order==3"
                    >
                    <span v-if="scope.row.order>3">{{scope.row.order}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="username" label="销售员" align="center" width="100"></el-table-column>
                <el-table-column prop="img" label="头像" align="center" width="100">
                  <template slot-scope="scope">
                    <div
                      class="poImg"
                      :class="[scope.row.order==1?'poImg1':scope.row.order==2?'poImg2':scope.row.order==3?'poImg3':'']"
                    >
                      <img
                        :src="scope.row.img"
                        style="width: 60px;height: 60px;border-radius:50%;"
                        v-if="scope.row.img!=null"
                      >
                      <img
                        src="../assets/header.png"
                        style="width: 60px;height: 60px;border-radius:50%;"
                        v-if="scope.row.img==null"
                      >
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="depart" label="部门" align="center" width="100"></el-table-column>
                <!-- <el-table-column prop="role" label="职位" sortable="custom" align="center"></el-table-column> -->
                <el-table-column
                  prop="lastProfit"
                  label="上月毛利"
                  sortable="custom"
                  align="center"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="lastAve"
                  label="上月本平台平均毛利"
                  sortable="custom"
                  align="center"
                  width="170"
                ></el-table-column>
                <el-table-column
                  prop="lastDiff"
                  label="上月毛利差额"
                  sortable="custom"
                  align="center"
                  width="130"
                >
                  <template slot-scope="scope">
                    <span :class="scope.row.lastDiff<0?'colorRed':''">{{scope.row.lastDiff}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="thisProfit"
                  label="本月毛利"
                  sortable="custom"
                  align="center"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="thisAve"
                  label="本月本平台平均毛利"
                  sortable="custom"
                  align="center"
                  width="170"
                ></el-table-column>
                <el-table-column
                  prop="thisDiff"
                  label="本月毛利差额"
                  sortable="custom"
                  align="center"
                  width="130"
                >
                  <template slot-scope="scope">
                    <span :class="scope.row.thisDiff<0?'colorRed':''">{{scope.row.thisDiff}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="hireDate"
                  label="入职时长(月)"
                  sortable="custom"
                  align="center"
                  width="120"
                ></el-table-column>
                <el-table-column
                  prop="createDate"
                  label="统计时间"
                  sortable="custom"
                  align="center"
                  width="120"
                >
                  <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span>{{dateFormatter(scope.row.createDate)}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div v-show="pmShow.pmSMT">
              <el-table :data="proTablepm" size="small" @sort-change="sortNumberPX" height="800">
                <el-table-column
                  prop="order"
                  label="排名"
                  sortable="custom"
                  align="center"
                  width="75"
                >
                  <template slot-scope="scope">
                    <img
                      src="../assets/j1.png"
                      style="width: 31px;height: 38px;"
                      v-if="scope.row.order==1"
                    >
                    <img
                      src="../assets/j2.png"
                      style="width: 31px;height: 38px;"
                      v-if="scope.row.order==2"
                    >
                    <img
                      src="../assets/j3.png"
                      style="width: 31px;height: 38px;"
                      v-if="scope.row.order==3"
                    >
                    <span v-if="scope.row.order>3">{{scope.row.order}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="username" label="销售员" align="center" width="100"></el-table-column>
                <el-table-column prop="img" label="头像" align="center" width="100">
                  <template slot-scope="scope">
                    <div
                      class="poImg"
                      :class="[scope.row.order==1?'poImg1':scope.row.order==2?'poImg2':scope.row.order==3?'poImg3':'']"
                    >
                      <img
                        :src="scope.row.img"
                        style="width: 60px;height: 60px;border-radius:50%;"
                        v-if="scope.row.img!=null"
                      >
                      <img
                        src="../assets/header.png"
                        style="width: 60px;height: 60px;border-radius:50%;"
                        v-if="scope.row.img==null"
                      >
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="depart" label="部门" align="center" width="100"></el-table-column>
                <!-- <el-table-column prop="role" label="职位" sortable="custom" align="center"></el-table-column> -->
                <el-table-column
                  prop="lastProfit"
                  label="上月毛利"
                  sortable="custom"
                  align="center"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="lastAve"
                  label="上月本平台平均毛利"
                  sortable="custom"
                  align="center"
                  width="170"
                ></el-table-column>
                <el-table-column
                  prop="lastDiff"
                  label="上月毛利差额"
                  sortable="custom"
                  align="center"
                  width="130"
                >
                  <template slot-scope="scope">
                    <span :class="scope.row.lastDiff<0?'colorRed':''">{{scope.row.lastDiff}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="thisProfit"
                  label="本月毛利"
                  sortable="custom"
                  align="center"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="thisAve"
                  label="本月本平台平均毛利"
                  sortable="custom"
                  align="center"
                  width="170"
                ></el-table-column>
                <el-table-column
                  prop="thisDiff"
                  label="本月毛利差额"
                  sortable="custom"
                  align="center"
                  width="130"
                >
                  <template slot-scope="scope">
                    <span :class="scope.row.thisDiff<0?'colorRed':''">{{scope.row.thisDiff}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="hireDate"
                  label="入职时长(月)"
                  sortable="custom"
                  align="center"
                  width="120"
                ></el-table-column>
                <el-table-column
                  prop="createDate"
                  label="统计时间"
                  sortable="custom"
                  align="center"
                  width="120"
                >
                  <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span>{{dateFormatter(scope.row.createDate)}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div v-show="pmShow.pmAMA">
              <el-table :data="proTablepm" size="small" @sort-change="sortNumberPX" height="800">
                <el-table-column
                  prop="order"
                  label="排名"
                  sortable="custom"
                  align="center"
                  width="75"
                >
                  <template slot-scope="scope">
                    <img
                      src="../assets/j1.png"
                      style="width: 31px;height: 38px;"
                      v-if="scope.row.order==1"
                    >
                    <img
                      src="../assets/j2.png"
                      style="width: 31px;height: 38px;"
                      v-if="scope.row.order==2"
                    >
                    <img
                      src="../assets/j3.png"
                      style="width: 31px;height: 38px;"
                      v-if="scope.row.order==3"
                    >
                    <span v-if="scope.row.order>3">{{scope.row.order}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="username" label="销售员" align="center" width="100"></el-table-column>
                <el-table-column prop="img" label="头像" align="center" width="100">
                  <template slot-scope="scope">
                    <div
                      class="poImg"
                      :class="[scope.row.order==1?'poImg1':scope.row.order==2?'poImg2':scope.row.order==3?'poImg3':'']"
                    >
                      <img
                        :src="scope.row.img"
                        style="width: 60px;height: 60px;border-radius:50%;"
                        v-if="scope.row.img!=null"
                      >
                      <img
                        src="../assets/header.png"
                        style="width: 60px;height: 60px;border-radius:50%;"
                        v-if="scope.row.img==null"
                      >
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="depart" label="部门" align="center" width="100"></el-table-column>
                <!-- <el-table-column prop="role" label="职位" sortable="custom" align="center"></el-table-column> -->
                <el-table-column
                  prop="lastProfit"
                  label="上月毛利"
                  sortable="custom"
                  align="center"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="lastAve"
                  label="上月本平台平均毛利"
                  sortable="custom"
                  align="center"
                  width="170"
                ></el-table-column>
                <el-table-column
                  prop="lastDiff"
                  label="上月毛利差额"
                  sortable="custom"
                  align="center"
                  width="130"
                >
                  <template slot-scope="scope">
                    <span :class="scope.row.lastDiff<0?'colorRed':''">{{scope.row.lastDiff}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="thisProfit"
                  label="本月毛利"
                  sortable="custom"
                  align="center"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="thisAve"
                  label="本月本平台平均毛利"
                  sortable="custom"
                  align="center"
                  width="170"
                ></el-table-column>
                <el-table-column
                  prop="thisDiff"
                  label="本月毛利差额"
                  sortable="custom"
                  align="center"
                  width="130"
                >
                  <template slot-scope="scope">
                    <span :class="scope.row.thisDiff<0?'colorRed':''">{{scope.row.thisDiff}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="hireDate"
                  label="入职时长(月)"
                  sortable="custom"
                  align="center"
                  width="120"
                ></el-table-column>
                <el-table-column
                  prop="createDate"
                  label="统计时间"
                  sortable="custom"
                  align="center"
                  width="120"
                >
                  <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span>{{dateFormatter(scope.row.createDate)}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div v-show="pmShow.pmJOOM">
              <el-table :data="proTablepm" size="small" @sort-change="sortNumberPX" height="800">
                <el-table-column
                  prop="order"
                  label="排名"
                  sortable="custom"
                  align="center"
                  width="75"
                >
                  <template slot-scope="scope">
                    <img
                      src="../assets/j1.png"
                      style="width: 31px;height: 38px;"
                      v-if="scope.row.order==1"
                    >
                    <img
                      src="../assets/j2.png"
                      style="width: 31px;height: 38px;"
                      v-if="scope.row.order==2"
                    >
                    <img
                      src="../assets/j3.png"
                      style="width: 31px;height: 38px;"
                      v-if="scope.row.order==3"
                    >
                    <span v-if="scope.row.order>3">{{scope.row.order}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="username" label="销售员" align="center" width="100"></el-table-column>
                <el-table-column prop="img" label="头像" align="center" width="100">
                  <template slot-scope="scope">
                    <div
                      class="poImg"
                      :class="[scope.row.order==1?'poImg1':scope.row.order==2?'poImg2':scope.row.order==3?'poImg3':'']"
                    >
                      <img
                        :src="scope.row.img"
                        style="width: 60px;height: 60px;border-radius:50%;"
                        v-if="scope.row.img!=null"
                      >
                      <img
                        src="../assets/header.png"
                        style="width: 60px;height: 60px;border-radius:50%;"
                        v-if="scope.row.img==null"
                      >
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="depart" label="部门" align="center" width="100"></el-table-column>
                <!-- <el-table-column prop="role" label="职位" sortable="custom" align="center"></el-table-column> -->
                <el-table-column
                  prop="lastProfit"
                  label="上月毛利"
                  sortable="custom"
                  align="center"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="lastAve"
                  label="上月本平台平均毛利"
                  sortable="custom"
                  align="center"
                  width="170"
                ></el-table-column>
                <el-table-column
                  prop="lastDiff"
                  label="上月毛利差额"
                  sortable="custom"
                  align="center"
                  width="130"
                >
                  <template slot-scope="scope">
                    <span :class="scope.row.lastDiff<0?'colorRed':''">{{scope.row.lastDiff}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="thisProfit"
                  label="本月毛利"
                  sortable="custom"
                  align="center"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="thisAve"
                  label="本月本平台平均毛利"
                  sortable="custom"
                  align="center"
                  width="170"
                ></el-table-column>
                <el-table-column
                  prop="thisDiff"
                  label="本月毛利差额"
                  sortable="custom"
                  align="center"
                  width="130"
                >
                  <template slot-scope="scope">
                    <span :class="scope.row.thisDiff<0?'colorRed':''">{{scope.row.thisDiff}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="hireDate"
                  label="入职时长(月)"
                  sortable="custom"
                  align="center"
                  width="120"
                ></el-table-column>
                <el-table-column
                  prop="createDate"
                  label="统计时间"
                  sortable="custom"
                  align="center"
                  width="120"
                >
                  <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span>{{dateFormatter(scope.row.createDate)}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="tabs-container tab-index-pan" v-show="showTitle.zz">
            <el-tabs
              v-model="activeTabzz"
              style="width:100%;padding-left:14px;"
              @tab-click="handclickzz"
            >
              <el-tab-pane
                v-for="(item, index) in titleMenuzz"
                :label="item.name"
                :name="item.name"
                :key="index"
              ></el-tab-pane>
            </el-tabs>
            <div v-show="tabzz.ebay">
              <el-table
                :data="zzEbay"
                size="small"
                height="798"
                ref="table1"
                v-scrollBar:slim
                @sort-change="sortNumberZZ"
              >
                <el-table-column type="index" align="center"></el-table-column>
                <el-table-column prop="username" align="center" label="姓名" sortable></el-table-column>
                <el-table-column prop="plat" align="center" label="平台" sortable></el-table-column>
                <el-table-column prop="target" align="center" label="目标" sortable="custom"></el-table-column>
                <el-table-column prop="amt" align="center" label="毛利" sortable="custom"></el-table-column>
                <el-table-column prop="rate" align="center" label="目标进度" sortable="custom">
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
            <div v-show="tabzz.joom">
              <el-table
                :data="zzJoom"
                size="small"
                height="798"
                ref="table1"
                v-scrollBar:slim
                @sort-change="sortNumberjoom"
              >
                <el-table-column type="index" align="center"></el-table-column>
                <el-table-column prop="username" align="center" label="姓名" sortable></el-table-column>
                <el-table-column prop="plat" align="center" label="平台" sortable></el-table-column>
                <el-table-column prop="target" align="center" label="目标" sortable="custom"></el-table-column>
                <el-table-column prop="amt" align="center" label="毛利" sortable="custom"></el-table-column>
                <el-table-column prop="rate" align="center" label="目标进度" sortable="custom">
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
          </div>
          <div class="tabs-container tab-index-pan" v-show="showTitle.baokuan">
            <el-tabs
              v-model="activeTabNamebk"
              style="width:100%;padding-left:14px;"
              @tab-click="handclickbk"
            >
              <el-tab-pane
                v-for="(item, index) in titleMenuTab"
                :label="item"
                :name="item"
                :key="index"
              ></el-tab-pane>
            </el-tabs>
            <div v-show="indexbk.yw">
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
            </div>
            <div v-show="indexbk.hw">
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
            </div>
            <div v-show="indexbk.wish">
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
            </div>
            <div v-show="indexbk.smt">
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
            </div>
            <div v-show="indexbk.ama">
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
            </div>
            <div v-show="indexbk.joom">
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
            </div>
          </div>
          <div class="tabs-container tab-index-pan" v-show="showTitle.zengzhang">
            <el-tabs
              v-model="activeName"
              @tab-click="handleClick"
              style="width:100%;padding-left:14px;"
            >
              <el-tab-pane
                v-for="(item, index) in allMenu"
                :label="item.name"
                :name="item.name"
                :key="index"
              ></el-tab-pane>
            </el-tabs>
          </div>
          <div
            class="tabs-container tab-index-pan"
            v-show="showTitle.sale"
            style="width:100%;padding-left:14px;"
          >
            <el-tabs v-model="activeSale" @tab-click="handleClickSale">
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
                <p class="titlep" :class="index==0?'clasRed':''">{{item.title}}</p>
                <span class="titlea">{{item.createdDate | cutOut}}</span>
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
  APIBranchDpart,
  getZzTargetEbay,
  getZzTargetJoom
} from "../api/api";
import { compareUp, compareDown } from "../api/tools";
import { updateLog } from "../api/product";
import { getMenu } from "../api/login";

export default {
  data() {
    return {
      activeTabNamebk: "eBay-义乌仓",
      indexTabactive: 0,
      titleMenuTab: [
        "eBay-义乌仓",
        "eBay-海外仓",
        "Wish",
        "SMT",
        "Amazon",
        "Joom"
      ],
      activeTabName: "eBay-义乌仓",
      activeTabzz: "郑州eBay平台",
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
      tabzz:{
        ebay:true,
        joom:false
      },
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
      titleMenuzz: [],
      zzEbay:[],
      zzJoom:[],
      activeName: "上海销售",
      activeTitle: "销售排名",
      activePlat: "eBay-义乌仓",
      activePlatpm: "eBay-义乌仓",
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
        pming: true,
        zz: false,
        wj:false,
      },
      pmShow: {
        pmYW: true,
        pmHW: false,
        pmHWISH: false,
        pmHSMT: false,
        pmHAMA: false,
        pmHJOOM: false
      },
      indexbk: {
        yw: true,
        hw: false,
        wish: false,
        smt: false,
        ama: false,
        joom: false
      }
    };
  },
  methods: {
    handclickzz(tab, event){
      if (tab.label === "郑州eBay平台") {
        this.tabzz['ebay'] = true;
      } else {
        this.tabzz['ebay'] = false;
      }
      if (tab.label === "郑州Joom平台") {
        this.tabzz['joom'] = true;
      } else {
        this.tabzz['joom'] = false;
      }
    },
    sortNumberPX(column, prop, order) {
      const data = this.proTablepm;
      if (column.order === "descending") {
        this.proTablepm = data.sort(compareDown(data, column.prop));
      } else {
        this.proTablepm = data.sort(compareUp(data, column.prop));
      }
    },
    sortNumberZZ(column, prop, order) {
      const data = this.zzEbay;
      if (column.order === "descending") {
        this.zzEbay = data.sort(compareDown(data, column.prop));
      } else {
        this.zzEbay = data.sort(compareUp(data, column.prop));
      }
    },
    sortNumberjoom(column, prop, order) {
      const data = this.zzJoom;
      if (column.order === "descending") {
        this.zzJoom = data.sort(compareDown(data, column.prop));
      } else {
        this.zzJoom = data.sort(compareUp(data, column.prop));
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
    handclickbk(tab, event) {
      if (tab.label === "eBay-义乌仓") {
        this.activeTabNamebk = "eBay-义乌仓";
        this.indexbk["yw"] = true;
        ProsTarget(this.activeTabNamebk).then(res => {
          this.proTable = res.data.data;
        });
      } else {
        this.indexbk["yw"] = false;
      }
      if (tab.label === "eBay-海外仓") {
        this.activeTabNamebk = "eBay-海外仓";
        this.indexbk["hw"] = true;
        ProsTarget(this.activeTabNamebk).then(res => {
          this.proTable = res.data.data;
        });
      } else {
        this.indexbk["hw"] = false;
      }
      if (tab.label === "Wish") {
        this.activeTabNamebk = "Wish";
        this.indexbk["wish"] = true;
        ProsTarget(this.activeTabNamebk).then(res => {
          this.proTable = res.data.data;
        });
      } else {
        this.indexbk["wish"] = false;
      }
      if (tab.label === "SMT") {
        this.activeTabNamebk = "SMT";
        this.indexbk["smt"] = true;
        ProsTarget(this.activeTabNamebk).then(res => {
          this.proTable = res.data.data;
        });
      } else {
        this.indexbk["smt"] = false;
      }
      if (tab.label === "Amazon") {
        this.activeTabNamebk = "Amazon";
        this.indexbk["ama"] = true;
        ProsTarget(this.activeTabNamebk).then(res => {
          this.proTable = res.data.data;
        });
      } else {
        this.indexbk["ama"] = false;
      }
      if (tab.label === "Joom") {
        this.activeTabNamebk = "Joom";
        this.indexbk["joom"] = true;
        ProsTarget(this.activeTabNamebk).then(res => {
          this.proTable = res.data.data;
        });
      } else {
        this.indexbk["joom"] = false;
      }
    },
    handclickPm(tab, event) {
      if (tab.label === "eBay-义乌仓") {
        this.activePlatpm = "eBay-义乌仓";
        this.pmShow["pmYW"] = true;
        ProsTargetPm(this.activePlatpm).then(res => {
          this.proTablepm = res.data.data;
        });
      } else {
        this.pmShow["pmYW"] = false;
      }
      if (tab.label === "eBay-海外仓") {
        this.activePlatpm = "eBay-海外仓";
        this.pmShow["pmHW"] = true;
        ProsTargetPm(this.activePlatpm).then(res => {
          this.proTablepm = res.data.data;
        });
      } else {
        this.pmShow["pmHW"] = false;
      }
      if (tab.label === "Wish") {
        this.activePlatpm = "Wish";
        this.pmShow["pmWISH"] = true;
        ProsTargetPm(this.activePlatpm).then(res => {
          this.proTablepm = res.data.data;
        });
      } else {
        this.pmShow["pmWISH"] = false;
      }
      if (tab.label === "SMT") {
        this.activePlatpm = "SMT";
        this.pmShow["pmSMT"] = true;
        ProsTargetPm(this.activePlatpm).then(res => {
          this.proTablepm = res.data.data;
        });
      } else {
        this.pmShow["pmSMT"] = false;
      }
      if (tab.label === "Amazon") {
        this.activePlatpm = "Amazon";
        this.pmShow["pmAMA"] = true;
        ProsTargetPm(this.activePlatpm).then(res => {
          this.proTablepm = res.data.data;
        });
      } else {
        this.pmShow["pmAMA"] = false;
      }
      if (tab.label === "Joom") {
        this.activePlatpm = "Joom";
        this.pmShow["pmJOOM"] = true;
        ProsTargetPm(this.activePlatpm).then(res => {
          this.proTablepm = res.data.data;
        });
      } else {
        this.pmShow["pmJOOM"] = false;
      }
    },
    handleTitle(n, index) {
      if (n === "今日爆款") {
        this.showTitle["baokuan"] = true;
        this.activeTitle = "今日爆款";
        this.indexTabactive = index;
      } else {
        this.showTitle["baokuan"] = false;
      }
      if (n === "利润增长表") {
        this.showTitle["zengzhang"] = true;
        this.activeTitle = "利润增长表";
        this.indexTabactive = index;
      } else {
        this.showTitle["zengzhang"] = false;
      }
      if (n === "销售额增长表") {
        this.showTitle["sale"] = true;
        this.activeTitle = "销售额增长表";
        this.indexTabactive = index;
      } else {
        this.showTitle["sale"] = false;
      }
      if (n === "销售排名") {
        this.showTitle["pming"] = true;
        this.activeTitle = "销售排名";
        this.indexTabactive = index;
      } else {
        this.showTitle["pming"] = false;
      }
      if (n === "郑州分部目标完成度") {
        this.showTitle["zz"] = true;
        this.activeTitle = "郑州分部目标完成度";
        this.indexTabactive = index;
      } else {
        this.showTitle["zz"] = false;
      }
      if (n === "旺季目标") {
        this.showTitle["wj"] = true;
        this.activeTitle = "旺季目标";
        this.indexTabactive = index;
      } else {
        this.showTitle["wj"] = false;
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
      for (let i = 0; i < this.titleMenu.length; i++) {
        if (this.titleMenu[i].name == "今日爆款") {
          this.titleMenu.splice(i, 1);
        }
        if (this.titleMenu[i].route == "/v1/site/zz-target") {
          this.titleMenuzz = this.titleMenu[i].tabs;
        }
      }
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
    getZzTargetEbay().then(res => {
      this.zzEbay = res.data.data;
    });
    getZzTargetJoom().then(res => {
      this.zzJoom = res.data.data;
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
.clasRed {
  color: red;
}
.colorRed {
  color: red;
}
.poImg {
  width: 80px;
  height: 80px;
}
.poImg img {
  margin-top: 16px;
}
.poImg1 {
  width: 80px;
  height: 80px;
  background: url(../assets/touguan.png) no-repeat center;
  background-size: 100% 100%;
}
.poImg2 {
  width: 80px;
  height: 80px;
  background: url(../assets/toukuang1.png) no-repeat center;
  background-size: 100% 100%;
}
.poImg3 {
  width: 80px;
  height: 80px;
  background: url(../assets/toukuang2.png) no-repeat center;
  background-size: 100% 100%;
}
.blueround {
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #007aff;
  position: absolute;
  left: -8.8%;
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
  text-decoration: none;
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
  min-height: 440px;
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
  margin-top: 1.5%;
  height: 900px;
}
.box-card {
  width: 30%;
  height: 390px;
  overflow-y: scroll;
  float: right;
  margin-top: 1.5%;
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
  height: 515px;
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
.index_content {
  width: auto;
  overflow: hidden;
  border-right: none;
}
.index_content p {
  float: left;
  padding: 0;
  margin: 0;
  padding: 12px 18px;
  border-top: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  border-right: 1px solid #dcdfe6;
  cursor: pointer;
}
.index_content p:first-child {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border-left: 1px solid #dcdfe6;
}
.index_content p:last-child {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}
.index_content p i {
  margin-right: 5px;
}
.index_active {
  background: #3c8dbc;
  color: #ffffff;
}
.tswj{
  height: 848px;
  overflow-y: auto;
  background: linear-gradient(54deg, #2a6496, #3c8dbc);
}
.tabNo{
  width: 80%;
  float: left;
}
.tabY{
  width: 20%;
  float: left;
}
.tabNoBlock{
  width: 100%;
  background: #fff;
  height: 6px;
  margin-top: 65px; 
  position: relative;
  padding-left: -25px;
}
.no10{
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #909399;
  color: #fff;
  text-align: center;
  line-height: 50px;
  position: absolute;
  left: 10%;
  top:-25px;
  margin-left: -25px;
}
.no20{
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #909399;
  color: #fff;
  text-align: center;
  line-height: 50px;
  position: absolute;
  left: 20%;
  top:-25px;
  margin-left: -25px;
}
.no30{
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #f56c6c;
  color: #fff;
  text-align: center;
  line-height: 50px;
  position: absolute;
  left: 30%;
  top:-25px;
  margin-left: -25px;
}
.no40{
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #f56c6c;
  color: #fff;
  text-align: center;
  line-height: 50px;
  position: absolute;
  left: 40%;
  top:-25px;
  margin-left: -25px;
}
.no50{
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #f56c6c;
  color: #fff;
  text-align: center;
  line-height: 50px;
  position: absolute;
  left: 50%;
  top:-25px;
  margin-left: -25px;
}
.no60{
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #e6a23c;
  color: #fff;
  text-align: center;
  line-height: 50px;
  position: absolute;
  left: 60%;
  top:-25px;
  margin-left: -25px;
}
.no70{
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #e6a23c;
  color: #fff;
  text-align: center;
  line-height: 50px;
  position: absolute;
  left: 70%;
  top:-25px;
  margin-left: -25px;
}
.no80{
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #409eff;
  color: #fff;
  text-align: center;
  line-height: 50px;
  position: absolute;
  left: 80%;
  top:-25px;
  margin-left: -25px;
}
.no90{
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #e6a23c;
  color: #fff;
  text-align: center;
  line-height: 50px;
  position: absolute;
  left: 90%;
  top:-25px;
  margin-left: -25px;
}
.no100{
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #67c23a;
  color: #fff;
  text-align: center;
  line-height: 50px;
  position: absolute;
  left: 100%;
  z-index: 999;
  top:-25px;
  margin-left: -25px;
}
</style>
<style>
.tab-index-pan .el-tabs__item {
  height: 50px;
  line-height: 50px;
}
</style>
