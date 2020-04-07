<template>
	<div>
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
                <el-table :data="proTablepm" size="small" @sort-change="sortNumberPX" :height="tableHeightNew">
                  <el-table-column
                    prop="order"
                    label="排名"
                    align="center"
                    width="70"
                  >
                    <template slot-scope="scope">
                      <img
                        src="../../assets/j1.png"
                        style="width: 31px;height: 38px;"
                        v-if="scope.row.order==1"
                      />
                      <img
                        src="../../assets/j2.png"
                        style="width: 31px;height: 38px;"
                        v-if="scope.row.order==2"
                      />
                      <img
                        src="../../assets/j3.png"
                        style="width: 31px;height: 38px;"
                        v-if="scope.row.order==3"
                      />
                      <span v-if="scope.row.order>3">{{scope.row.order}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="username" label="销售员" align="center" width="80"></el-table-column>
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
                        />
                        <img
                          src="../../assets/header.png"
                          style="width: 60px;height: 60px;border-radius:50%;"
                          v-if="scope.row.img==null"
                        />
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="depart" label="部门" align="center" min-width="80"></el-table-column>
                  <!-- <el-table-column prop="role" label="职位" sortable="custom" align="center"></el-table-column> -->
                  <el-table-column :render-header="renderHeaderCk01"  align="center">
                  <el-table-column
                    prop="thisProfit"
                    label="毛利"
                    sortable="custom"
                    align="center"
                    min-width="110"
                  ></el-table-column>
                  <el-table-column
                    prop="thisAve"
                    label="本平台平均毛利"
                    sortable="custom"
                    align="center"
                    min-width="170"
                  ></el-table-column>
                  <el-table-column
                    prop="thisDiff"
                    label="毛利差额"
                    sortable="custom"
                    align="center"
                    min-width="135"
                  >
                    <template slot-scope="scope">
                      <span :class="scope.row.thisDiff<0?'colorRed':''">{{scope.row.thisDiff}}</span>
                    </template>
                  </el-table-column>
                  </el-table-column>
                  <el-table-column :render-header="renderHeaderCk02"  align="center">
                  <el-table-column
                    prop="lastProfit"
                    label="毛利"              
                    sortable="custom"
                    align="center"
                    min-width="110"
                  ></el-table-column>
                  <el-table-column
                    prop="lastAve"
                    label="本平台平均毛利"
                    sortable="custom"
                    align="center"
                    min-width="175"
                  ></el-table-column>
                  <el-table-column
                    prop="lastDiff"
                    label="毛利差额"
                    sortable="custom"
                    align="center"
                    min-width="135"
                  >
                    <template slot-scope="scope">
                      <span :class="scope.row.lastDiff<0?'colorRed':''">{{scope.row.lastDiff}}</span>
                    </template>
                  </el-table-column>
                  </el-table-column>
                  <el-table-column
                    prop="hireDate"
                    label="入职时长(月)"
                    sortable="custom"
                    align="center"
                    min-width="130"
                  ></el-table-column>
                  <el-table-column
                    prop="createDate"
                    label="统计时间"
                    align="center"
                    min-width="125"
                  >
                    <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span>{{dateFormatter(scope.row.createDate)}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div v-show="pmShow.pmHW">
                <el-table :data="proTablepm" size="small" @sort-change="sortNumberPX" :height="tableHeightNew">
                  <el-table-column
                    prop="order"
                    label="排名"
                    align="center"
                    width="70"
                  >
                    <template slot-scope="scope">
                      <img
                        src="../../assets/j1.png"
                        style="width: 31px;height: 38px;"
                        v-if="scope.row.order==1"
                      />
                      <img
                        src="../../assets/j2.png"
                        style="width: 31px;height: 38px;"
                        v-if="scope.row.order==2"
                      />
                      <img
                        src="../../assets/j3.png"
                        style="width: 31px;height: 38px;"
                        v-if="scope.row.order==3"
                      />
                      <span v-if="scope.row.order>3">{{scope.row.order}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="username" label="销售员" align="center" width="80"></el-table-column>
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
                        />
                        <img
                          src="../../assets/header.png"
                          style="width: 60px;height: 60px;border-radius:50%;"
                          v-if="scope.row.img==null"
                        />
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="depart" label="部门" align="center" min-width="80"></el-table-column>
                  <!-- <el-table-column prop="role" label="职位" sortable="custom" align="center"></el-table-column> -->
                  <el-table-column :render-header="renderHeaderCk01"  align="center">
                  <el-table-column
                    prop="thisProfit"
                    label="毛利"
                    sortable="custom"
                    align="center"
                    min-width="110"
                  ></el-table-column>
                  <el-table-column
                    prop="thisAve"
                    label="本平台平均毛利"
                    sortable="custom"
                    align="center"
                    min-width="170"
                  ></el-table-column>
                  <el-table-column
                    prop="thisDiff"
                    label="毛利差额"
                    sortable="custom"
                    align="center"
                    min-width="135"
                  >
                    <template slot-scope="scope">
                      <span :class="scope.row.thisDiff<0?'colorRed':''">{{scope.row.thisDiff}}</span>
                    </template>
                  </el-table-column>
                  </el-table-column>
                  <el-table-column :render-header="renderHeaderCk02"  align="center">
                  <el-table-column
                    prop="lastProfit"
                    label="毛利"              
                    sortable="custom"
                    align="center"
                    min-width="110"
                  ></el-table-column>
                  <el-table-column
                    prop="lastAve"
                    label="本平台平均毛利"
                    sortable="custom"
                    align="center"
                    min-width="175"
                  ></el-table-column>
                  <el-table-column
                    prop="lastDiff"
                    label="毛利差额"
                    sortable="custom"
                    align="center"
                    min-width="135"
                  >
                    <template slot-scope="scope">
                      <span :class="scope.row.lastDiff<0?'colorRed':''">{{scope.row.lastDiff}}</span>
                    </template>
                  </el-table-column>
                  </el-table-column>
                  <el-table-column
                    prop="hireDate"
                    label="入职时长(月)"
                    sortable="custom"
                    align="center"
                    min-width="130"
                  ></el-table-column>
                  <el-table-column
                    prop="createDate"
                    label="统计时间"
                    align="center"
                    min-width="125"
                  >
                    <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span>{{dateFormatter(scope.row.createDate)}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div v-show="pmShow.pmWISH">
                <el-table :data="proTablepm" size="small" @sort-change="sortNumberPX" :height="tableHeightNew">
                  <el-table-column
                    prop="order"
                    label="排名"
                    align="center"
                    width="70"
                  >
                    <template slot-scope="scope">
                      <img
                        src="../../assets/j1.png"
                        style="width: 31px;height: 38px;"
                        v-if="scope.row.order==1"
                      />
                      <img
                        src="../../assets/j2.png"
                        style="width: 31px;height: 38px;"
                        v-if="scope.row.order==2"
                      />
                      <img
                        src="../../assets/j3.png"
                        style="width: 31px;height: 38px;"
                        v-if="scope.row.order==3"
                      />
                      <span v-if="scope.row.order>3">{{scope.row.order}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="username" label="销售员" align="center" width="80"></el-table-column>
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
                        />
                        <img
                          src="../../assets/header.png"
                          style="width: 60px;height: 60px;border-radius:50%;"
                          v-if="scope.row.img==null"
                        />
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="depart" label="部门" align="center" min-width="80"></el-table-column>
                  <!-- <el-table-column prop="role" label="职位" sortable="custom" align="center"></el-table-column> -->
                  <el-table-column :render-header="renderHeaderCk01"  align="center">
                  <el-table-column
                    prop="thisProfit"
                    label="毛利"
                    sortable="custom"
                    align="center"
                    min-width="110"
                  ></el-table-column>
                  <el-table-column
                    prop="thisAve"
                    label="本平台平均毛利"
                    sortable="custom"
                    align="center"
                    min-width="170"
                  ></el-table-column>
                  <el-table-column
                    prop="thisDiff"
                    label="毛利差额"
                    sortable="custom"
                    align="center"
                    min-width="135"
                  >
                    <template slot-scope="scope">
                      <span :class="scope.row.thisDiff<0?'colorRed':''">{{scope.row.thisDiff}}</span>
                    </template>
                  </el-table-column>
                  </el-table-column>
                  <el-table-column :render-header="renderHeaderCk02"  align="center">
                  <el-table-column
                    prop="lastProfit"
                    label="毛利"              
                    sortable="custom"
                    align="center"
                    min-width="110"
                  ></el-table-column>
                  <el-table-column
                    prop="lastAve"
                    label="本平台平均毛利"
                    sortable="custom"
                    align="center"
                    min-width="175"
                  ></el-table-column>
                  <el-table-column
                    prop="lastDiff"
                    label="毛利差额"
                    sortable="custom"
                    align="center"
                    min-width="135"
                  >
                    <template slot-scope="scope">
                      <span :class="scope.row.lastDiff<0?'colorRed':''">{{scope.row.lastDiff}}</span>
                    </template>
                  </el-table-column>
                  </el-table-column>
                  <el-table-column
                    prop="hireDate"
                    label="入职时长(月)"
                    sortable="custom"
                    align="center"
                    min-width="130"
                  ></el-table-column>
                  <el-table-column
                    prop="createDate"
                    label="统计时间"
                    align="center"
                    min-width="125"
                  >
                    <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span>{{dateFormatter(scope.row.createDate)}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div v-show="pmShow.pmSMT">
                <el-table :data="proTablepm" size="small" @sort-change="sortNumberPX" :height="tableHeightNew">
                  <el-table-column
                    prop="order"
                    label="排名"
                    align="center"
                    width="70"
                  >
                    <template slot-scope="scope">
                      <img
                        src="../../assets/j1.png"
                        style="width: 31px;height: 38px;"
                        v-if="scope.row.order==1"
                      />
                      <img
                        src="../../assets/j2.png"
                        style="width: 31px;height: 38px;"
                        v-if="scope.row.order==2"
                      />
                      <img
                        src="../../assets/j3.png"
                        style="width: 31px;height: 38px;"
                        v-if="scope.row.order==3"
                      />
                      <span v-if="scope.row.order>3">{{scope.row.order}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="username" label="销售员" align="center" width="80"></el-table-column>
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
                        />
                        <img
                          src="../../assets/header.png"
                          style="width: 60px;height: 60px;border-radius:50%;"
                          v-if="scope.row.img==null"
                        />
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="depart" label="部门" align="center" min-width="80"></el-table-column>
                  <!-- <el-table-column prop="role" label="职位" sortable="custom" align="center"></el-table-column> -->
                  <el-table-column :render-header="renderHeaderCk01"  align="center">
                  <el-table-column
                    prop="thisProfit"
                    label="毛利"
                    sortable="custom"
                    align="center"
                    min-width="110"
                  ></el-table-column>
                  <el-table-column
                    prop="thisAve"
                    label="本平台平均毛利"
                    sortable="custom"
                    align="center"
                    min-width="170"
                  ></el-table-column>
                  <el-table-column
                    prop="thisDiff"
                    label="毛利差额"
                    sortable="custom"
                    align="center"
                    min-width="135"
                  >
                    <template slot-scope="scope">
                      <span :class="scope.row.thisDiff<0?'colorRed':''">{{scope.row.thisDiff}}</span>
                    </template>
                  </el-table-column>
                  </el-table-column>
                  <el-table-column :render-header="renderHeaderCk02"  align="center">
                  <el-table-column
                    prop="lastProfit"
                    label="毛利"              
                    sortable="custom"
                    align="center"
                    min-width="110"
                  ></el-table-column>
                  <el-table-column
                    prop="lastAve"
                    label="本平台平均毛利"
                    sortable="custom"
                    align="center"
                    min-width="175"
                  ></el-table-column>
                  <el-table-column
                    prop="lastDiff"
                    label="毛利差额"
                    sortable="custom"
                    align="center"
                    min-width="135"
                  >
                    <template slot-scope="scope">
                      <span :class="scope.row.lastDiff<0?'colorRed':''">{{scope.row.lastDiff}}</span>
                    </template>
                  </el-table-column>
                  </el-table-column>
                  <el-table-column
                    prop="hireDate"
                    label="入职时长(月)"
                    sortable="custom"
                    align="center"
                    min-width="130"
                  ></el-table-column>
                  <el-table-column
                    prop="createDate"
                    label="统计时间"
                    align="center"
                    min-width="125"
                  >
                    <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span>{{dateFormatter(scope.row.createDate)}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div v-show="pmShow.pmAMA">
                <el-table :data="proTablepm" size="small" @sort-change="sortNumberPX" :height="tableHeightNew">
                  <el-table-column
                    prop="order"
                    label="排名"
                    align="center"
                    width="70"
                  >
                    <template slot-scope="scope">
                      <img
                        src="../../assets/j1.png"
                        style="width: 31px;height: 38px;"
                        v-if="scope.row.order==1"
                      />
                      <img
                        src="../../assets/j2.png"
                        style="width: 31px;height: 38px;"
                        v-if="scope.row.order==2"
                      />
                      <img
                        src="../../assets/j3.png"
                        style="width: 31px;height: 38px;"
                        v-if="scope.row.order==3"
                      />
                      <span v-if="scope.row.order>3">{{scope.row.order}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="username" label="销售员" align="center" width="80"></el-table-column>
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
                        />
                        <img
                          src="../../assets/header.png"
                          style="width: 60px;height: 60px;border-radius:50%;"
                          v-if="scope.row.img==null"
                        />
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="depart" label="部门" align="center" min-width="80"></el-table-column>
                  <!-- <el-table-column prop="role" label="职位" sortable="custom" align="center"></el-table-column> -->
                  <el-table-column :render-header="renderHeaderCk01"  align="center">
                  <el-table-column
                    prop="thisProfit"
                    label="毛利"
                    sortable="custom"
                    align="center"
                    min-width="110"
                  ></el-table-column>
                  <el-table-column
                    prop="thisAve"
                    label="本平台平均毛利"
                    sortable="custom"
                    align="center"
                    min-width="170"
                  ></el-table-column>
                  <el-table-column
                    prop="thisDiff"
                    label="毛利差额"
                    sortable="custom"
                    align="center"
                    min-width="135"
                  >
                    <template slot-scope="scope">
                      <span :class="scope.row.thisDiff<0?'colorRed':''">{{scope.row.thisDiff}}</span>
                    </template>
                  </el-table-column>
                  </el-table-column>
                  <el-table-column :render-header="renderHeaderCk02"  align="center">
                  <el-table-column
                    prop="lastProfit"
                    label="毛利"              
                    sortable="custom"
                    align="center"
                    min-width="110"
                  ></el-table-column>
                  <el-table-column
                    prop="lastAve"
                    label="本平台平均毛利"
                    sortable="custom"
                    align="center"
                    min-width="175"
                  ></el-table-column>
                  <el-table-column
                    prop="lastDiff"
                    label="毛利差额"
                    sortable="custom"
                    align="center"
                    min-width="135"
                  >
                    <template slot-scope="scope">
                      <span :class="scope.row.lastDiff<0?'colorRed':''">{{scope.row.lastDiff}}</span>
                    </template>
                  </el-table-column>
                  </el-table-column>
                  <el-table-column
                    prop="hireDate"
                    label="入职时长(月)"
                    sortable="custom"
                    align="center"
                    min-width="130"
                  ></el-table-column>
                  <el-table-column
                    prop="createDate"
                    label="统计时间"
                    align="center"
                    min-width="125"
                  >
                    <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span>{{dateFormatter(scope.row.createDate)}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div v-show="pmShow.pmJOOM">
                <el-table :data="proTablepm" size="small" @sort-change="sortNumberPX" :height="tableHeightNew">
                  <el-table-column
                    prop="order"
                    label="排名"
                    align="center"
                    width="70"
                  >
                    <template slot-scope="scope">
                      <img
                        src="../../assets/j1.png"
                        style="width: 31px;height: 38px;"
                        v-if="scope.row.order==1"
                      />
                      <img
                        src="../../assets/j2.png"
                        style="width: 31px;height: 38px;"
                        v-if="scope.row.order==2"
                      />
                      <img
                        src="../../assets/j3.png"
                        style="width: 31px;height: 38px;"
                        v-if="scope.row.order==3"
                      />
                      <span v-if="scope.row.order>3">{{scope.row.order}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="username" label="销售员" align="center" width="80"></el-table-column>
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
                        />
                        <img
                          src="../../assets/header.png"
                          style="width: 60px;height: 60px;border-radius:50%;"
                          v-if="scope.row.img==null"
                        />
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="depart" label="部门" align="center" min-width="80"></el-table-column>
                  <!-- <el-table-column prop="role" label="职位" sortable="custom" align="center"></el-table-column> -->
                  <el-table-column :render-header="renderHeaderCk01"  align="center">
                  <el-table-column
                    prop="thisProfit"
                    label="毛利"
                    sortable="custom"
                    align="center"
                    min-width="110"
                  ></el-table-column>
                  <el-table-column
                    prop="thisAve"
                    label="本平台平均毛利"
                    sortable="custom"
                    align="center"
                    min-width="170"
                  ></el-table-column>
                  <el-table-column
                    prop="thisDiff"
                    label="毛利差额"
                    sortable="custom"
                    align="center"
                    min-width="135"
                  >
                    <template slot-scope="scope">
                      <span :class="scope.row.thisDiff<0?'colorRed':''">{{scope.row.thisDiff}}</span>
                    </template>
                  </el-table-column>
                  </el-table-column>
                  <el-table-column :render-header="renderHeaderCk02"  align="center">
                  <el-table-column
                    prop="lastProfit"
                    label="毛利"              
                    sortable="custom"
                    align="center"
                    min-width="110"
                  ></el-table-column>
                  <el-table-column
                    prop="lastAve"
                    label="本平台平均毛利"
                    sortable="custom"
                    align="center"
                    min-width="175"
                  ></el-table-column>
                  <el-table-column
                    prop="lastDiff"
                    label="毛利差额"
                    sortable="custom"
                    align="center"
                    min-width="135"
                  >
                    <template slot-scope="scope">
                      <span :class="scope.row.lastDiff<0?'colorRed':''">{{scope.row.lastDiff}}</span>
                    </template>
                  </el-table-column>
                  </el-table-column>
                  <el-table-column
                    prop="hireDate"
                    label="入职时长(月)"
                    sortable="custom"
                    align="center"
                    min-width="130"
                  ></el-table-column>
                  <el-table-column
                    prop="createDate"
                    label="统计时间"
                    align="center"
                    min-width="125"
                  >
                    <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span>{{dateFormatter(scope.row.createDate)}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div v-show="pmShow.pmShopee">
                <el-table :data="proTablepm" size="small" @sort-change="sortNumberPX" :height="tableHeightNew">
                  <el-table-column
                    prop="order"
                    label="排名"
                    align="center"
                    width="70"
                  >
                    <template slot-scope="scope">
                      <img
                        src="../../assets/j1.png"
                        style="width: 31px;height: 38px;"
                        v-if="scope.row.order==1"
                      />
                      <img
                        src="../../assets/j2.png"
                        style="width: 31px;height: 38px;"
                        v-if="scope.row.order==2"
                      />
                      <img
                        src="../../assets/j3.png"
                        style="width: 31px;height: 38px;"
                        v-if="scope.row.order==3"
                      />
                      <span v-if="scope.row.order>3">{{scope.row.order}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="username" label="销售员" align="center" width="80"></el-table-column>
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
                        />
                        <img
                          src="../../assets/header.png"
                          style="width: 60px;height: 60px;border-radius:50%;"
                          v-if="scope.row.img==null"
                        />
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="depart" label="部门" align="center" min-width="80"></el-table-column>
                  <!-- <el-table-column prop="role" label="职位" sortable="custom" align="center"></el-table-column> -->
                  <el-table-column :render-header="renderHeaderCk01"  align="center">
                  <el-table-column
                    prop="thisProfit"
                    label="毛利"
                    sortable="custom"
                    align="center"
                    min-width="110"
                  ></el-table-column>
                  <el-table-column
                    prop="thisAve"
                    label="本平台平均毛利"
                    sortable="custom"
                    align="center"
                    min-width="170"
                  ></el-table-column>
                  <el-table-column
                    prop="thisDiff"
                    label="毛利差额"
                    sortable="custom"
                    align="center"
                    min-width="135"
                  >
                    <template slot-scope="scope">
                      <span :class="scope.row.thisDiff<0?'colorRed':''">{{scope.row.thisDiff}}</span>
                    </template>
                  </el-table-column>
                  </el-table-column>
                  <el-table-column :render-header="renderHeaderCk02"  align="center">
                  <el-table-column
                    prop="lastProfit"
                    label="毛利"              
                    sortable="custom"
                    align="center"
                    min-width="110"
                  ></el-table-column>
                  <el-table-column
                    prop="lastAve"
                    label="本平台平均毛利"
                    sortable="custom"
                    align="center"
                    min-width="175"
                  ></el-table-column>
                  <el-table-column
                    prop="lastDiff"
                    label="毛利差额"
                    sortable="custom"
                    align="center"
                    min-width="135"
                  >
                    <template slot-scope="scope">
                      <span :class="scope.row.lastDiff<0?'colorRed':''">{{scope.row.lastDiff}}</span>
                    </template>
                  </el-table-column>
                  </el-table-column>
                  <el-table-column
                    prop="hireDate"
                    label="入职时长(月)"
                    sortable="custom"
                    align="center"
                    min-width="130"
                  ></el-table-column>
                  <el-table-column
                    prop="createDate"
                    label="统计时间"
                    align="center"
                    min-width="125"
                  >
                    <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span>{{dateFormatter(scope.row.createDate)}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div v-show="pmShow.pmVOVA">
                <el-table :data="proTablepm" size="small" @sort-change="sortNumberPX" :height="tableHeightNew">
                  <el-table-column
                    prop="order"
                    label="排名"
                    align="center"
                    width="70"
                  >
                    <template slot-scope="scope">
                      <img
                        src="../../assets/j1.png"
                        style="width: 31px;height: 38px;"
                        v-if="scope.row.order==1"
                      />
                      <img
                        src="../../assets/j2.png"
                        style="width: 31px;height: 38px;"
                        v-if="scope.row.order==2"
                      />
                      <img
                        src="../../assets/j3.png"
                        style="width: 31px;height: 38px;"
                        v-if="scope.row.order==3"
                      />
                      <span v-if="scope.row.order>3">{{scope.row.order}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="username" label="销售员" align="center" width="80"></el-table-column>
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
                        />
                        <img
                          src="../../assets/header.png"
                          style="width: 60px;height: 60px;border-radius:50%;"
                          v-if="scope.row.img==null"
                        />
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="depart" label="部门" align="center" min-width="80"></el-table-column>
                  <!-- <el-table-column prop="role" label="职位" sortable="custom" align="center"></el-table-column> -->
                  <el-table-column :render-header="renderHeaderCk01"  align="center">
                  <el-table-column
                    prop="thisProfit"
                    label="毛利"
                    sortable="custom"
                    align="center"
                    min-width="110"
                  ></el-table-column>
                  <el-table-column
                    prop="thisAve"
                    label="本平台平均毛利"
                    sortable="custom"
                    align="center"
                    min-width="170"
                  ></el-table-column>
                  <el-table-column
                    prop="thisDiff"
                    label="毛利差额"
                    sortable="custom"
                    align="center"
                    min-width="135"
                  >
                    <template slot-scope="scope">
                      <span :class="scope.row.thisDiff<0?'colorRed':''">{{scope.row.thisDiff}}</span>
                    </template>
                  </el-table-column>
                  </el-table-column>
                  <el-table-column :render-header="renderHeaderCk02"  align="center">
                  <el-table-column
                    prop="lastProfit"
                    label="毛利"              
                    sortable="custom"
                    align="center"
                    min-width="110"
                  ></el-table-column>
                  <el-table-column
                    prop="lastAve"
                    label="本平台平均毛利"
                    sortable="custom"
                    align="center"
                    min-width="175"
                  ></el-table-column>
                  <el-table-column
                    prop="lastDiff"
                    label="毛利差额"
                    sortable="custom"
                    align="center"
                    min-width="135"
                  >
                    <template slot-scope="scope">
                      <span :class="scope.row.lastDiff<0?'colorRed':''">{{scope.row.lastDiff}}</span>
                    </template>
                  </el-table-column>
                  </el-table-column>
                  <el-table-column
                    prop="hireDate"
                    label="入职时长(月)"
                    sortable="custom"
                    align="center"
                    min-width="130"
                  ></el-table-column>
                  <el-table-column
                    prop="createDate"
                    label="统计时间"
                    align="center"
                    min-width="125"
                  >
                    <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span>{{dateFormatter(scope.row.createDate)}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
</template>

<script>
import {
  ProsTarget,
  ProsTargetPm,
} from "../..//api/api";
import { compareUp, compareDown } from "../../api/tools";
export default {
  name: 'app',
  data(){
    return {
      tableHeightNew: window.innerHeight - 138,
      titleMenuTab: [
        "eBay-义乌仓",
        "eBay-海外仓",
        "Wish",
        "Aliexpress",
        "Amazon",
        "Joom",
        "Shopee",
        "VOVA"
      ],
      pmShow: {
        pmYW: true,
        pmHW: false,
        pmHWISH: false,
        pmHSMT: false,
        pmHAMA: false,
        pmHJOOM: false,
        pmHShopee: false,
        pmHVOVA: false,
      },
      activeTabName: "eBay-义乌仓",
      activePlatpm: "eBay-义乌仓",
      proTable:[],
      activePlatpm: "eBay-义乌仓",
      proTablepm:[],
      thisMonth:0,
      lastMonth:0,
    }
  },
  methods:{
    dateFormatter(date) {
      return date.substring(0, 10);
    },    
    sortNumberPX(column, prop, order) {
      const data = this.proTablepm;
      if (column.order === "descending") {
        this.proTablepm = data.sort(compareDown(data, column.prop));
      } else {
        this.proTablepm = data.sort(compareUp(data, column.prop));
      }
    },    
    renderHeaderCk02(h,{column}) { // h即为cerateElement的简写，具体可看vue官方文档
        var pmMonth=this.lastMonth
        return h(
          'span',
          [ 
            h('span',{
              style:'color:red;'
            }, '上月'),
            h('span', {
              style:'color:red;'
            },'('+pmMonth+'月)'),
          ],
        );
    },    
    renderHeaderCk01(h,{column}) { // h即为cerateElement的简写，具体可看vue官方文档
        var pmMonth=this.thisMonth
        return h(
          'span',
          [ 
            h('span',{
              style:'color:red;'
            }, '本月'),
            h('span', {
              style:'color:red;'
            },'('+pmMonth+'月)'),
          ],
        );
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
      if (tab.label === "Aliexpress") {
        this.activePlatpm = "Aliexpress";
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
      if (tab.label === "Shopee") {
        this.activePlatpm = "Shopee";
        this.pmShow["pmShopee"] = true;
        ProsTargetPm(this.activePlatpm).then(res => {
          this.proTablepm = res.data.data;
        });
      } else {
        this.pmShow["pmShopee"] = false;
      }
      if (tab.label === "VOVA") {
        this.activePlatpm = "VOVA";
        this.pmShow["pmVOVA"] = true;
        ProsTargetPm(this.activePlatpm).then(res => {
          this.proTablepm = res.data.data;
        });
      } else {
        this.pmShow["pmVOVA"] = false;
      }
    },
  },
  mounted() {
    // ProsTarget(this.activePlat).then(res => {
    //   this.proTable = res.data.data;
    //   console.log(res.data.data)
    // });
    ProsTargetPm(this.activePlatpm).then(res => {
      this.proTablepm = res.data.data;
      var date=this.proTablepm[0].createDate
      date=date.substring(5,7)
      date=Number(date)
      this.thisMonth=date
      this.lastMonth=date-1
    });
  }
}
</script>

<style lang="scss">

</style>