<template>
  <div>
    <div class="dashboard-editor-container" style="height: 970px;" v-show="ifShowIndex">
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
                    :class="index==0?'el-icon-rank':index==1?'el-icon-tickets':index==2?'el-icon-document':index==3?'el-icon-date':'el-icon-tickets'"
                  ></i>
                  {{item.name}}
                </p>
              </div>
            </div>
            <div class="tabs-container tab-index-pan tswj" v-show="showTitle.wj">
              <div class="bigDemo">
                <div class="rightDemo">
                  <span class="span20">10%</span>
                  <div
                    :class="[item.rate==0?'indexbImg b0':item.rate==1?'indexbImg b1':item.rate==2?'indexbImg b2':item.rate==3?'indexbImg b3':item.rate==4?'indexbImg b4':item.rate==5?'indexbImg b5':item.rate==6?'indexbImg b6':item.rate==7?'indexbImg b7':item.rate==8?'indexbImg b8':item.rate==9?'indexbImg b9':item.rate==10?'indexbImg b10':item.rate==11?'indexbImg1 b11':item.rate==12?'indexbImg1 b12':item.rate==13?'indexbImg1 b13':item.rate==14?'indexbImg1 b14':item.rate==15?'indexbImg1 b15':item.rate==16?'indexbImg1 b16':item.rate==17?'indexbImg1 b17':item.rate==18?'indexbImg1 b18':item.rate==19?'indexbImg1 b19':item.rate==20?'indexbImg1 b20':'',item.username==sysUserName?'imbge':'']"
                    v-for="(item,index) in last20"
                    :key="index"
                    @click="judge(item.rate)"
                  ></div>
                </div>
                <div class="leftDemo">
                  <span class="span40">30%</span>
                  <div
                    :class="[item.rate==21?'indexbImg1 b21':item.rate==22?'indexbImg1 b22':item.rate==23?'indexbImg1 b23':item.rate==24?'indexbImg1 b24':item.rate==25?'indexbImg1 b25':item.rate==26?'indexbImg1 b26':item.rate==27?'indexbImg1 b27':item.rate==28?'indexbImg1 b28':item.rate==29?'indexbImg1 b29':item.rate==30?'indexbImg1 b30':item.rate==31?'indexbImg b31':item.rate==32?'indexbImg b32':item.rate==33?'indexbImg b33':item.rate==34?'indexbImg b34':item.rate==35?'indexbImg b35':item.rate==36?'indexbImg b36':item.rate==37?'indexbImg b37':item.rate==38?'indexbImg b38':item.rate==39?'indexbImg b39':item.rate==40?'indexbImg b40':'',item.username==sysUserName?'imbge':'']"
                    v-for="(item,index) in last40"
                    :key="index"
                    @click="judge(item.rate)"
                  ></div>
                </div>
                <div class="rightDemo">
                  <span class="span60">50%</span>
                  <div
                    :class="[item.rate==41?'indexbImg b41':item.rate==42?'indexbImg b42':item.rate==43?'indexbImg b43':item.rate==44?'indexbImg b44':item.rate==45?'indexbImg b45':item.rate==46?'indexbImg b46':item.rate==47?'indexbImg b47':item.rate==48?'indexbImg b48':item.rate==49?'indexbImg b49':item.rate==50?'indexbImg b50':item.rate==51?'indexbImg1 b51':item.rate==52?'indexbImg1 b52':item.rate==53?'indexbImg1 b53':item.rate==54?'indexbImg1 b54':item.rate==55?'indexbImg1 b55':item.rate==56?'indexbImg1 b56':item.rate==57?'indexbImg1 b57':item.rate==58?'indexbImg1 b58':item.rate==59?'indexbImg1 b59':item.rate==60?'indexbImg1 b60':'',item.username==sysUserName?'imbge':'']"
                    v-for="(item,index) in last60"
                    :key="index"
                    @click="judge(item.rate)"
                  ></div>
                </div>
                <div class="leftDemo">
                  <span class="span80">70%</span>
                  <div
                    :class="[item.rate==61?'indexbImg1 b61':item.rate==62?'indexbImg1 b62':item.rate==63?'indexbImg1 b63':item.rate==64?'indexbImg1 b64':item.rate==65?'indexbImg1 b65':item.rate==66?'indexbImg1 b66':item.rate==67?'indexbImg1 b67':item.rate==68?'indexbImg1 b68':item.rate==69?'indexbImg1 b69':item.rate==70?'indexbImg1 b70':item.rate==71?'indexbImg b71':item.rate==72?'indexbImg b72':item.rate==73?'indexbImg b73':item.rate==74?'indexbImg b74':item.rate==75?'indexbImg b75':item.rate==76?'indexbImg b76':item.rate==77?'indexbImg b77':item.rate==78?'indexbImg b78':item.rate==79?'indexbImg b79':item.rate==80?'indexbImg b80':'',item.username==sysUserName?'imbge':'']"
                    v-for="(item,index) in last80"
                    :key="index"
                    @click="judge(item.rate)"
                  ></div>
                </div>
                <div class="rightDemo">
                  <span class="span100">100%</span>
                  <div
                    :class="[item.rate==81?'indexbImg b81':item.rate==82?'indexbImg b82':item.rate==83?'indexbImg b83':item.rate==84?'indexbImg b84':item.rate==85?'indexbImg b85':item.rate==86?'indexbImg b86':item.rate==87?'indexbImg b87':item.rate==88?'indexbImg b88':item.rate==89?'indexbImg b89':item.rate==90?'indexbImg b90':item.rate==91?'indexbImg1 b91':item.rate==92?'indexbImg1 b92':item.rate==93?'indexbImg1 b93':item.rate==94?'indexbImg1 b94':item.rate==95?'indexbImg1 b95':item.rate==96?'indexbImg1 b96':item.rate==97?'indexbImg1 b97':item.rate==98?'indexbImg1 b98':item.rate==99?'indexbImg1 b99':item.rate==100?'indexbImg1 b100':'',item.username==sysUserName?'imbge':'']"
                    v-for="(item,index) in last100"
                    :key="index"
                    @click="judge(item.rate)"
                  ></div>
                </div>
                <div class="leftDemo">
                  <div class="jblist">
                    <div class="jb01 jbg">
                      <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                    </div>
                    <div class="jb02 jbg">
                      <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                    </div>
                    <div class="jb03 jbg">
                      <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                    </div>
                    <div class="jb04 jbg">
                      <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                    </div>
                    <div class="jb05 jbg">
                      <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                    </div>
                    <div class="jb06 jbg">
                      <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                    </div>
                    <div class="jb07 jbg">
                      <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                    </div>
                    <div class="jb08 jbg">
                      <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                    </div>
                    <div class="jb09 jbg">
                      <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                    </div>
                    <div class="jb10 jbg">
                      <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                    </div>
                    <div class="jb11 jbg">
                      <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                    </div>
                    <div class="jb12 jbg">
                      <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                    </div>
                    <div class="jb13 jbg">
                      <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                    </div>
                    <div class="jb14 jbg">
                      <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                    </div>
                    <div class="jb15 jbg">
                      <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                    </div>
                  </div>
                </div>
                <span class="start"></span>
                <span class="end">
                  <img src="../assets/qizi.png" style="width: 50px;height: 50px;" />
                </span>
              </div>
            </div>
            <div class="tabs-container tab-index-pan tabdColor" v-show="showTitle.wcd">
              <el-tabs
                v-model="activeTabwcd"
                style="width:100%;padding-left:14px;"
                @tab-click="handclickwcd"
              >
                <el-tab-pane
                  v-for="(item, index) in titleMenuwcd"
                  :label="item"
                  :name="item"
                  :key="index"
                ></el-tab-pane>
              </el-tabs>
              <div v-show="tabwcd.xs" class="infoTable">
                <el-table
                  :data="wcdxs"
                  size="small"
                  height="798"
                  ref="table1"
                  v-scrollBar:slim
                  @sort-change="sortNumberXS"
                >
                  <el-table-column type="index" align="center" width="40"></el-table-column>
                  <el-table-column prop="depart" align="center" label="部门" sortable min-width="95">
                    <el-table-column prop="depart" :render-header="renderHeaderticXs" align="center" min-width="95"></el-table-column>
                  </el-table-column>
                  <el-table-column
                    prop="username"
                    align="center"
                    label="姓名"
                    sortable
                    min-width="60"
                  ></el-table-column>
                  <el-table-column prop="target" align="center" label="目标" sortable="custom">
                    <template slot-scope="scope">
                      <span>{{scope.row.target |cutOut1}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="amt" align="center" label="已完成" sortable="custom"></el-table-column>
                  <el-table-column prop="bonus" align="center" label="奖金" sortable="custom">
                    <template slot-scope="scope">
                      <span>{{scope.row.bonus |cutOut1}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="rxtraBonus" align="center" label="额外奖金" sortable="custom"></el-table-column>
                  <el-table-column prop="rate" align="center" label="目标进度" sortable="custom">
                    <template slot-scope="scope">
                      <el-progress
                        :text-inside="true"
                        :stroke-width="18"
                        :status="checkStatus1(scope.row,'rate')"
                        :percentage="Math.round(scope.row.rate*100)/100"
                      ></el-progress>
                    </template>
                  </el-table-column>
                  <el-table-column prop="dateRate" align="center" label="时间进度">
                    <template slot-scope="scope">
                      <el-progress
                        :text-inside="true"
                        :stroke-width="18"
                        status="exception"
                        :percentage="Math.round(scope.row.dateRate*100)/100"
                      ></el-progress>
                    </template>
                  </el-table-column>
                  <el-table-column prop="updateTime" align="center" label="统计截止日期">
                    <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span>{{dateFormatter(scope.row.updatetime)}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div v-show="tabwcd.kf" class="infoTable">
                <el-table
                  :data="wcdkf"
                  size="small"
                  height="798"
                  ref="table1"
                  v-scrollBar:slim
                  @sort-change="sortNumberKF"
                >
                  <el-table-column type="index" align="center" width="40"></el-table-column>
                  <el-table-column prop="depart" align="center" label="部门" sortable min-width="95">
                    <el-table-column prop="depart" :render-header="renderHeaderticKf" align="center" min-width="95"></el-table-column>
                  </el-table-column>
                  <el-table-column prop="username" align="center" label="姓名" sortable min-width="60"></el-table-column>
                  <el-table-column prop="target" align="center" label="目标" sortable="custom">
                    <template slot-scope="scope">
                      <span>{{scope.row.target |cutOut1}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="amt" align="center" label="已完成" sortable="custom"></el-table-column>
                  <el-table-column prop="bonus" align="center" label="奖金" sortable="custom">
                    <template slot-scope="scope">
                      <span>{{scope.row.bonus |cutOut1}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="rxtraBonus" align="center" label="额外奖金" sortable="custom"></el-table-column>
                  <el-table-column prop="rate" align="center" label="目标进度" sortable="custom">
                    <template slot-scope="scope">
                      <el-progress
                        :text-inside="true"
                        :stroke-width="18"
                        :status="checkStatus1(scope.row,'rate')"
                        :percentage="Math.round(scope.row.rate*100)/100"
                      ></el-progress>
                    </template>
                  </el-table-column>
                  <el-table-column prop="dateRate" align="center" label="时间进度">
                    <template slot-scope="scope">
                      <el-progress
                        :text-inside="true"
                        :stroke-width="18"
                        status="exception"
                        :percentage="Math.round(scope.row.dateRate*100)/100"
                      ></el-progress>
                    </template>
                  </el-table-column>
                  <el-table-column prop="updateTime" align="center" label="统计截止日期">
                    <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span>{{dateFormatter(scope.row.updatetime)}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div v-show="tabwcd.bm">
                <el-table
                  :data="wcdbm"
                  size="small"
                  height="798"
                  ref="table1"
                  v-scrollBar:slim
                  @sort-change="sortNumberBM"
                >
                  <el-table-column type="index" align="center"></el-table-column>
                  <el-table-column prop="username" align="center" label="部门" sortable></el-table-column>
                  <el-table-column prop="target" align="center" label="目标" sortable="custom"></el-table-column>
                  <el-table-column prop="amt" align="center" label="已完成" sortable="custom"></el-table-column>
                  <el-table-column prop="bonus" align="center" label="奖金" sortable="custom"></el-table-column>
                  <el-table-column
                    prop="rate"
                    align="center"
                    label="目标进度"
                    sortable="custom"
                    width="180"
                  >
                    <template slot-scope="scope">
                      <el-progress
                        :text-inside="true"
                        :stroke-width="18"
                        :status="checkStatus1(scope.row,'rate')"
                        :percentage="Math.round(scope.row.rate*100)/100"
                      ></el-progress>
                    </template>
                  </el-table-column>
                  <el-table-column prop="dateRate" align="center" label="时间进度" width="180">
                    <template slot-scope="scope">
                      <el-progress
                        :text-inside="true"
                        :stroke-width="18"
                        status="exception"
                        :percentage="Math.round(scope.row.dateRate*100)/100"
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
                      />
                      <img
                        src="../assets/j2.png"
                        style="width: 31px;height: 38px;"
                        v-if="scope.row.order==2"
                      />
                      <img
                        src="../assets/j3.png"
                        style="width: 31px;height: 38px;"
                        v-if="scope.row.order==3"
                      />
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
                        />
                        <img
                          src="../assets/header.png"
                          style="width: 60px;height: 60px;border-radius:50%;"
                          v-if="scope.row.img==null"
                        />
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
                      />
                      <img
                        src="../assets/j2.png"
                        style="width: 31px;height: 38px;"
                        v-if="scope.row.order==2"
                      />
                      <img
                        src="../assets/j3.png"
                        style="width: 31px;height: 38px;"
                        v-if="scope.row.order==3"
                      />
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
                        />
                        <img
                          src="../assets/header.png"
                          style="width: 60px;height: 60px;border-radius:50%;"
                          v-if="scope.row.img==null"
                        />
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
                      />
                      <img
                        src="../assets/j2.png"
                        style="width: 31px;height: 38px;"
                        v-if="scope.row.order==2"
                      />
                      <img
                        src="../assets/j3.png"
                        style="width: 31px;height: 38px;"
                        v-if="scope.row.order==3"
                      />
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
                        />
                        <img
                          src="../assets/header.png"
                          style="width: 60px;height: 60px;border-radius:50%;"
                          v-if="scope.row.img==null"
                        />
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
                      />
                      <img
                        src="../assets/j2.png"
                        style="width: 31px;height: 38px;"
                        v-if="scope.row.order==2"
                      />
                      <img
                        src="../assets/j3.png"
                        style="width: 31px;height: 38px;"
                        v-if="scope.row.order==3"
                      />
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
                        />
                        <img
                          src="../assets/header.png"
                          style="width: 60px;height: 60px;border-radius:50%;"
                          v-if="scope.row.img==null"
                        />
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
                      />
                      <img
                        src="../assets/j2.png"
                        style="width: 31px;height: 38px;"
                        v-if="scope.row.order==2"
                      />
                      <img
                        src="../assets/j3.png"
                        style="width: 31px;height: 38px;"
                        v-if="scope.row.order==3"
                      />
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
                        />
                        <img
                          src="../assets/header.png"
                          style="width: 60px;height: 60px;border-radius:50%;"
                          v-if="scope.row.img==null"
                        />
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
                      />
                      <img
                        src="../assets/j2.png"
                        style="width: 31px;height: 38px;"
                        v-if="scope.row.order==2"
                      />
                      <img
                        src="../assets/j3.png"
                        style="width: 31px;height: 38px;"
                        v-if="scope.row.order==3"
                      />
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
                        />
                        <img
                          src="../assets/header.png"
                          style="width: 60px;height: 60px;border-radius:50%;"
                          v-if="scope.row.img==null"
                        />
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
              <div v-show="pmShow.pmShopee">
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
                      />
                      <img
                        src="../assets/j2.png"
                        style="width: 31px;height: 38px;"
                        v-if="scope.row.order==2"
                      />
                      <img
                        src="../assets/j3.png"
                        style="width: 31px;height: 38px;"
                        v-if="scope.row.order==3"
                      />
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
                        />
                        <img
                          src="../assets/header.png"
                          style="width: 60px;height: 60px;border-radius:50%;"
                          v-if="scope.row.img==null"
                        />
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
                      <img :src="scope.row.img" style="width: 120px;height: 120px;" />
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
                      <img :src="scope.row.img" style="width: 120px;height: 120px;" />
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
                      <img :src="scope.row.img" style="width: 120px;height: 120px;" />
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
                      <img :src="scope.row.img" style="width: 120px;height: 120px;" />
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
                      <img :src="scope.row.img" style="width: 120px;height: 120px;" />
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
                      <img :src="scope.row.img" style="width: 120px;height: 120px;" />
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
                <el-button
                  type="text"
                  slot="reference"
                  style="padding:8px;"
                  v-if="item.isTop==='1'"
                >
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
        <!-- <transition style="height:600px;" enter-active-class="animated fadeInRightBig">
      <div class="zhezhao" v-show="flagShow"></div>
        </transition>-->
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
    <div class="dashboard-editor-container" v-show="ifShowIndex1">
      <div class="left-boxCase">
        <img
          src="../assets/fhui.png"
          class="lGoback"
          v-show="ifShowIndex1"
          @click="goHome()"
          style="width: 40px;height: 40px;"
        />
        <div class="leftBox">
          <div class="bigDemo" ref="bigDemo">
            <div class="rightDemo">
              <span class="span20">10%</span>
              <div
                :class="[item.rate==0?'indexbImg b0':item.rate==1?'indexbImg b1':item.rate==2?'indexbImg b2':item.rate==3?'indexbImg b3':item.rate==4?'indexbImg b4':item.rate==5?'indexbImg b5':item.rate==6?'indexbImg b6':item.rate==7?'indexbImg b7':item.rate==8?'indexbImg b8':item.rate==9?'indexbImg b9':item.rate==10?'indexbImg b10':item.rate==11?'indexbImg1 b11':item.rate==12?'indexbImg1 b12':item.rate==13?'indexbImg1 b13':item.rate==14?'indexbImg1 b14':item.rate==15?'indexbImg1 b15':item.rate==16?'indexbImg1 b16':item.rate==17?'indexbImg1 b17':item.rate==18?'indexbImg1 b18':item.rate==19?'indexbImg1 b19':item.rate==20?'indexbImg1 b20':'',item.username==sysUserName?'imbge':'']"
                v-for="(item,index) in last20"
                :key="index"
                @click="judge(item.rate)"
              ></div>
            </div>
            <div class="leftDemo">
              <span class="span40">30%</span>
              <div
                :class="[item.rate==21?'indexbImg1 b21':item.rate==22?'indexbImg1 b22':item.rate==23?'indexbImg1 b23':item.rate==24?'indexbImg1 b24':item.rate==25?'indexbImg1 b25':item.rate==26?'indexbImg1 b26':item.rate==27?'indexbImg1 b27':item.rate==28?'indexbImg1 b28':item.rate==29?'indexbImg1 b29':item.rate==30?'indexbImg1 b30':item.rate==31?'indexbImg b31':item.rate==32?'indexbImg b32':item.rate==33?'indexbImg b33':item.rate==34?'indexbImg b34':item.rate==35?'indexbImg b35':item.rate==36?'indexbImg b36':item.rate==37?'indexbImg b37':item.rate==38?'indexbImg b38':item.rate==39?'indexbImg b39':item.rate==40?'indexbImg b40':'',item.username==sysUserName?'imbge':'']"
                v-for="(item,index) in last40"
                :key="index"
                @click="judge(item.rate)"
              ></div>
            </div>
            <div class="rightDemo">
              <span class="span60">50%</span>
              <div
                :class="[item.rate==41?'indexbImg b41':item.rate==42?'indexbImg b42':item.rate==43?'indexbImg b43':item.rate==44?'indexbImg b44':item.rate==45?'indexbImg b45':item.rate==46?'indexbImg b46':item.rate==47?'indexbImg b47':item.rate==48?'indexbImg b48':item.rate==49?'indexbImg b49':item.rate==50?'indexbImg b50':item.rate==51?'indexbImg1 b51':item.rate==52?'indexbImg1 b52':item.rate==53?'indexbImg1 b53':item.rate==54?'indexbImg1 b54':item.rate==55?'indexbImg1 b55':item.rate==56?'indexbImg1 b56':item.rate==57?'indexbImg1 b57':item.rate==58?'indexbImg1 b58':item.rate==59?'indexbImg1 b59':item.rate==60?'indexbImg1 b60':'',item.username==sysUserName?'imbge':'']"
                v-for="(item,index) in last60"
                :key="index"
                @click="judge(item.rate)"
              ></div>
            </div>
            <div class="leftDemo">
              <span class="span80">70%</span>
              <div
                :class="[item.rate==61?'indexbImg1 b61':item.rate==62?'indexbImg1 b62':item.rate==63?'indexbImg1 b63':item.rate==64?'indexbImg1 b64':item.rate==65?'indexbImg1 b65':item.rate==66?'indexbImg1 b66':item.rate==67?'indexbImg1 b67':item.rate==68?'indexbImg1 b68':item.rate==69?'indexbImg1 b69':item.rate==70?'indexbImg1 b70':item.rate==71?'indexbImg b71':item.rate==72?'indexbImg b72':item.rate==73?'indexbImg b73':item.rate==74?'indexbImg b74':item.rate==75?'indexbImg b75':item.rate==76?'indexbImg b76':item.rate==77?'indexbImg b77':item.rate==78?'indexbImg b78':item.rate==79?'indexbImg b79':item.rate==80?'indexbImg b80':'',item.username==sysUserName?'imbge':'']"
                v-for="(item,index) in last80"
                :key="index"
                @click="judge(item.rate)"
              ></div>
            </div>
            <div class="rightDemo">
              <span class="span100">100%</span>
              <div
                :class="[item.rate==81?'indexbImg b81':item.rate==82?'indexbImg b82':item.rate==83?'indexbImg b83':item.rate==84?'indexbImg b84':item.rate==85?'indexbImg b85':item.rate==86?'indexbImg b86':item.rate==87?'indexbImg b87':item.rate==88?'indexbImg b88':item.rate==89?'indexbImg b89':item.rate==90?'indexbImg b90':item.rate==91?'indexbImg1 b91':item.rate==92?'indexbImg1 b92':item.rate==93?'indexbImg1 b93':item.rate==94?'indexbImg1 b94':item.rate==95?'indexbImg1 b95':item.rate==96?'indexbImg1 b96':item.rate==97?'indexbImg1 b97':item.rate==98?'indexbImg1 b98':item.rate==99?'indexbImg1 b99':item.rate==100?'indexbImg1 b100':'',item.username==sysUserName?'imbge':'']"
                v-for="(item,index) in last100"
                :key="index"
                @click="judge(item.rate)"
              ></div>
            </div>
            <div class="leftDemo">
              <div
                v-for="(item,index) in last110"
                :key="index"
                @click="judge(item.rate)"
                :class="[item.rxtraBonus==100?'indexbImg1 jb01img':item.rxtraBonus==200?'indexbImg1 jb02img':item.rxtraBonus==300?'indexbImg1 jb03img':item.rxtraBonus==400?'indexbImg1 jb04img':item.rxtraBonus==500?'indexbImg1 jb05img':item.rxtraBonus==600?'indexbImg jb06img':item.rxtraBonus==700?'indexbImg jb07img':item.rxtraBonus==800?'indexbImg jb08img':item.rxtraBonus==900?'indexbImg jb09img':item.rxtraBonus==1000?'indexbImg jb010img':item.rxtraBonus==1100?'indexbImg jb011img':item.rxtraBonus==1200?'indexbImg jb012img':item.rxtraBonus==1300?'indexbImg jb013img':item.rxtraBonus==1400?'indexbImg jb014img':item.rxtraBonus==1500?'indexbImg jb015img':'',item.username==sysUserName?'imbge':'']"
              ></div>
              <div class="jblist">
                <div class="jb01 jbg">
                  <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                </div>
                <div class="jb02 jbg">
                  <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                </div>
                <div class="jb03 jbg">
                  <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                </div>
                <div class="jb04 jbg">
                  <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                </div>
                <div class="jb05 jbg">
                  <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                </div>
                <div class="jb06 jbg">
                  <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                </div>
                <div class="jb07 jbg">
                  <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                </div>
                <div class="jb08 jbg">
                  <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                </div>
                <div class="jb09 jbg">
                  <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                </div>
                <div class="jb10 jbg">
                  <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                </div>
                <div class="jb11 jbg">
                  <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                </div>
                <div class="jb12 jbg">
                  <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                </div>
                <div class="jb13 jbg">
                  <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                </div>
                <div class="jb14 jbg">
                  <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                </div>
                <div class="jb15 jbg">
                  <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                </div>
              </div>
            </div>
            <div class="rightDemo">
              <div
               v-for="(item,index) in last120"
                :key="index"
                @click="judge(item.rate)"
                :class="[item.rxtraBonus==1600?'indexbImg jb016img':item.rxtraBonus==1700?'indexbImg1 jb017img':item.rxtraBonus==1800?'indexbImg1 jb018img':item.rxtraBonus==1900?'indexbImg1 jb019img':item.rxtraBonus==2000?'indexbImg1 jb020img':item.rxtraBonus==2100?'indexbImg1 jb021img':item.rxtraBonus==2200?'indexbImg1 jb022img':item.rxtraBonus==2300?'indexbImg1 jb023img':item.rxtraBonus==2400?'indexbImg1 jb024img':item.rxtraBonus==2500?'indexbImg1 jb025img':item.rxtraBonus==2600?'indexbImg1 jb026img':'',item.username==sysUserName?'imbge':'']"
              >
              </div>
              <div class="jblist">
                <div class="jbg jbr1">
                  <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                </div>
                <div class="jbr2 jbg">
                  <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                </div>
                <div class="jbr3 jbg">
                  <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                </div>
                <div class="jbr4 jbg">
                  <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                </div>
                <div class="jbr5 jbg">
                  <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                </div>
                <div class="jbr6 jbg">
                  <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                </div>
                <div class="jbr7 jbg">
                  <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                </div>
                <div class="jbr8 jbg">
                  <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                </div>
                <div class="jbr9 jbg">
                  <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                </div>
                <div class="jbr10 jbg">
                  <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                </div>
                <div class="jbr11 jbg">
                  <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                </div>
              </div>
            </div>
            <div class="leftDemo">
              <div
               v-for="(item,index) in last130"
                :key="index"
                @click="judge(item.rate)"
                :class="[item.rxtraBonus==2700?'indexbImg1 jb027img':item.rxtraBonus==2800?'indexbImg jb028img':item.rxtraBonus==2900?'indexbImg jb029img':item.rxtraBonus==3000?'indexbImg jb030img':item.rxtraBonus==3100?'indexbImg jb031img':item.rxtraBonus==3200?'indexbImg jb032img':item.rxtraBonus==3300?'indexbImg jb033img':item.rxtraBonus==3400?'indexbImg jb034img':item.rxtraBonus==3500?'indexbImg jb035img':item.rxtraBonus==3600?'indexbImg jb036img':item.rxtraBonus==3700?'indexbImg jb037img':'',item.username==sysUserName?'imbge':'']"
              >
              </div>
              <div class="jblist">
                <div class="jb05 jbg">
                  <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                </div>
                <div class="jb06 jbg">
                  <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                </div>
                <div class="jb07 jbg">
                  <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                </div>
                <div class="jb08 jbg">
                  <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                </div>
                <div class="jb09 jbg">
                  <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                </div>
                <div class="jb10 jbg">
                  <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                </div>
                <div class="jb11 jbg">
                  <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                </div>
                <div class="jb12 jbg">
                  <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                </div>
                <div class="jb13 jbg">
                  <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                </div>
                <div class="jb14 jbg">
                  <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                </div>
                <div class="jb15 jbg">
                  <img src="../assets/jb.png" style="width: 35px;height: 50px;" />
                </div>
              </div>
            </div>
            <span class="start"></span>
            <span class="end">
              <img src="../assets/qizi.png" style="width: 50px;height: 50px;" />
            </span>
          </div>
        </div>
        <div class="rightBox">
          <div class="cardCase">
            <div class="cardLeft">
              <div class="cardLeft01">
                <p class="zmb">总目标奖金</p>
                <span class="swhite">{{bonus.total}}元</span>
                <p class="zmb">已领取奖金</p>
                <span class="spGreen">{{bonus.pass}}元</span>
                <p class="zmb">剩余奖金</p>
                <span>{{bonus.surplus}}元</span>
                <img src="../assets/jab.png" style="width:49px;height:37px;margin-top:5px;" />
              </div>
              <div class="cardLeft01">
                <p class="zmb">总目标年假</p>
                <span class="swhite">{{bonus.totalnj}}天</span>
                <p class="zmb">已领取年假</p>
                <span class="spGreen">{{bonus.passnj}}天</span>
                <p class="zmb">剩余年假</p>
                <span>{{bonus.surplusnj}}天</span>
                <img src="../assets/jab.png" style="width:49px;height:37px;margin-top:5px;" />
              </div>
              <!-- <div class="cardLeft01">
              <p class="zmb">已领取奖金</p>
              <span>{{bonus.pass}}元</span>
              <p class="njs">年假<b class="spGreen">{{bonus.passnj}}</b>天</p>
            </div>
            <div class="cardLeft01">
              <p class="zmb">剩余奖金</p>
              <span>{{bonus.surplus}}元</span>
              <p class="njs">年假<b class="spGreen">{{bonus.surplusnj}}</b>天</p>
              </div>-->
            </div>
            <div class="cardRight">
              <div class="luck-user-title">
                <span>奖金名单</span>
              </div>
              <div class="cardText">
                <div class="cardText01" v-for="(item,index) in bonusList" :key="index">
                  <img :src="item.avatar" style="width: 40px;height: 40px;border-radius:50%;" />
                  <span>{{item.username}}</span>
                  <p class="njts">{{item.vacationDays}}天</p>
                  <p>{{item.bonus | cutOut1}}+{{item.rxtraBonus | cutOut1}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition
      style="height:600px;"
      enter-active-class="animated jackInTheBox"
      leave-active-class="animated zoomOutDown"
    >
      <div class="digWhite" v-show="flagShow">
        <img
          src="../assets/close.png"
          @click="closeIndex()"
          class="closeIndex"
          style="width: 34px;height: 35px;"
        />
        <div class="CaseBox" v-show="flagShow">
          <transition
            style="height:600px;"
            enter-active-class="animated fadeInDownBig"
            leave-active-class="animated zoomOutDown"
            v-for="(item, index) in sortData"
            :key="index"
          >
            <div class="testCase tabCase" v-show="flagShow">
              <div class="tleft">
                <img
                  :src="item.avatar"
                  class="icimg"
                  @click="goBlack(item.avatar)"
                  style="width: 70px;height: 70px;border-radius:50%;"
                />
                <p class="namep">{{item.username}}</p>
              </div>
              <div class="tright">
                <p class="pred">
                  <span>完成度 ：</span>
                  {{item.rate}}%
                </p>
                <p>
                  <span>已完成 ：</span>
                  {{item.amt}}
                </p>
                <p>
                  <span>目&nbsp;&nbsp;&nbsp;&nbsp;标 ：</span>
                  {{item.target}}
                </p>
                <p class="pred">
                  <span>奖&nbsp;&nbsp;&nbsp;&nbsp;金 ：</span>
                  {{item.bonus}}元
                </p>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </transition>
    <transition
      style="height:600px;"
      enter-active-class="animated jackInTheBox"
      leave-active-class="animated zoomOutDown"
    >
      <div class="digWhiteFour" v-show="flagShowFour">
        <img
          src="../assets/close.png"
          @click="closeIndexFour()"
          class="closeIndexFour"
          style="width: 34px;height: 35px;"
        />
        <transition
          style="height:600px;"
          enter-active-class="animated fadeInDownBig"
          leave-active-class="animated zoomOutDown"
          v-for="(item, index) in sortData"
          :key="index"
        >
          <div class="testCase tabCase" v-show="flagShowFour">
            <div class="tleftFour">
              <img
                :src="item.avatar"
                class="icimg"
                @click="goBlack(item.avatar)"
                style="width: 70px;height: 70px;border-radius:50%;"
              />
              <p class="namepFour">{{item.username}}</p>
            </div>
            <div class="trightFour">
              <p class="pred">
                <span>完成度 ：</span>
                {{item.rate}}%
              </p>
              <p>
                <span>已完成 ：</span>
                {{item.amt}}
              </p>
              <p>
                <span>目&nbsp;&nbsp;&nbsp;&nbsp;标 ：</span>
                {{item.target}}
              </p>
              <p class="pred">
                <span>奖&nbsp;&nbsp;&nbsp;&nbsp;金 ：</span>
                {{item.bonus}}元
              </p>
            </div>
          </div>
        </transition>
      </div>
    </transition>
    <transition
      style="height:600px;"
      enter-active-class="animated jackInTheBox"
      leave-active-class="animated zoomOutDown"
    >
      <div class="digWhiteThree" v-show="flagShowThree">
        <img
          src="../assets/close.png"
          @click="closeIndexThree()"
          class="closeIndexThree"
          style="width: 34px;height: 35px;"
        />
        <transition
          style="height:600px;"
          enter-active-class="animated fadeInDownBig"
          leave-active-class="animated zoomOutDown"
          v-for="(item, index) in sortData"
          :key="index"
        >
          <div class="testCaseThree tabCase" v-show="flagShowThree">
            <div class="tleftThree">
              <img
                :src="item.avatar"
                class="icimg"
                @click="goBlack(item.avatar)"
                style="width: 80px;height: 80px;border-radius:50%;"
              />
              <p class="namepThree">{{item.username}}</p>
            </div>
            <div class="trightThree">
              <p class="pred">
                <span>完成度 ：</span>
                {{item.rate}}%
              </p>
              <p>
                <span>已完成 ：</span>
                {{item.amt}}
              </p>
              <p>
                <span>目&nbsp;&nbsp;&nbsp;&nbsp;标 ：</span>
                {{item.target}}
              </p>
              <p class="pred">
                <span>奖&nbsp;&nbsp;&nbsp;&nbsp;金 ：</span>
                {{item.bonus}}元
              </p>
            </div>
          </div>
        </transition>
      </div>
    </transition>
    <transition
      style="height:600px;"
      enter-active-class="animated jackInTheBox"
      leave-active-class="animated zoomOutDown"
    >
      <div class="digWhiteTwo" v-show="flagShowTwo">
        <img
          src="../assets/close.png"
          @click="closeIndexTwo()"
          class="closeIndexTwo"
          style="width: 34px;height: 35px;"
        />
        <transition
          style="height:600px;"
          enter-active-class="animated fadeInDownBig"
          leave-active-class="animated zoomOutDown"
          v-for="(item, index) in sortData"
          :key="index"
        >
          <div class="testCaseTwo tabCase" v-show="flagShowTwo">
            <div class="tleftTwo">
              <img
                :src="item.avatar"
                class="icimg"
                @click="goBlack(item.avatar)"
                style="width: 80px;height: 80px;border-radius:50%;"
              />
              <p class="namepTwo">{{item.username}}</p>
            </div>
            <div class="trightTwo">
              <p class="pred">
                <span>完成度 ：</span>
                {{item.rate}}%
              </p>
              <p>
                <span>已完成 ：</span>
                {{item.amt}}
              </p>
              <p>
                <span>目&nbsp;&nbsp;&nbsp;&nbsp;标 ：</span>
                {{item.target}}
              </p>
              <p class="pred">
                <span>奖&nbsp;&nbsp;&nbsp;&nbsp;金 ：</span>
                {{item.bonus}}元
              </p>
            </div>
          </div>
        </transition>
      </div>
    </transition>
    <transition
      style="height:600px;"
      enter-active-class="animated jackInTheBox"
      leave-active-class="animated zoomOutDown"
    >
      <div class="digWhiteOne" v-show="flagShowOne">
        <img
          src="../assets/close.png"
          @click="closeIndexOne()"
          class="closeIndexOne"
          style="width: 34px;height:34px;"
        />
        <transition
          style="height:600px;"
          enter-active-class="animated jackInTheBox"
          leave-active-class="animated zoomOutDown"
          v-for="(item, index) in sortData"
          :key="index"
        >
          <div class="testCaseOne" v-show="flagShowOne">
            <div class="tleftOne">
              <img
                :src="item.avatar"
                class="icimg"
                @click="goBlack(item.avatar)"
                style="width: 100px;height: 100px;border-radius:50%;"
              />
              <p class="namepOne">{{item.username}}</p>
            </div>
            <div class="trightOne">
              <div class="p01">
                <p class="pred">
                  <span>完成度 ：</span>
                  {{item.rate}}%
                </p>
                <p>
                  <span>已完成 ：</span>
                  {{item.amt}}
                </p>
              </div>
              <div class="p01">
                <p>
                  <span>目&nbsp;&nbsp;&nbsp;&nbsp;标 ：</span>
                  {{item.target}}
                </p>
                <p class="pred">
                  <span>奖&nbsp;&nbsp;&nbsp;&nbsp;金 ：</span>
                  {{item.bonus}}元
                </p>
              </div>
            </div>
            <div style="height:5px;width:100%"></div>
          </div>
        </transition>
      </div>
    </transition>
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
  getZzTargetJoom,
  APISiteIndex,
  APISiteSales,
  getSiteIndexXs,
  getSiteIndexKf,
  getSiteIndexBM
} from "../api/api";
import { compareUp, compareDown } from "../api/tools";
import { updateLog } from "../api/product";
import { getMenu } from "../api/login";

export default {
  data() {
    return {
      activeTabNamebk: "eBay-义乌仓",
      ifShowIndex1: true,
      ifShowIndex: false,
      indexTabactive: 0,
      titleMenuTab: [
        "eBay-义乌仓",
        "eBay-海外仓",
        "Wish",
        "SMT",
        "Amazon",
        "Joom",
        "Shopee"
      ],
      activeTabName: "eBay-义乌仓",
      activeTabzz: "郑州eBay平台",
      activeTabwcd: "所有销售",
      wcdxs: [],
      wcdxsTotal:[],
      wcdkf: [],
      wcdkfTotal:[],
      wcdbm: [],
      flagShow: false,
      sysUserName: null,
      flagShowFour: false,
      flagShowThree: false,
      flagShowTwo: false,
      flagShowOne: false,
      bonus: {
        total: null,
        pass: null,
        surplus: null,
        totalnj: null,
        passnj: null,
        surplusnj: null
      },
      bonusList: [],
      page: null,
      dialogVisible: false,
      sortData: [],
      tabSort: [],
      spareData: [],
      last20: [],
      last40: [],
      last60: [],
      last80: [],
      last100: [],
      last110: [],
      last120:[],
      last130:[],
      dateArr:[],
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
      tabzz: {
        ebay: true,
        joom: false
      },
      tabwcd: {
        xs: true,
        kf: false,
        bm: false
      },
      shanghaiTable: [],
      zhengzhouTable: [],
      departTable: [],
      developerTable: [],
      proTable: [],
      proTablepm: [],
      indexSybm:['运营一部','运营二部','运营三部','运营五部','运营六部','运营七部','郑州分部Joom','郑州分部eBay1','郑州分部eBay2','郑州分部eBay3'],
      saleSh: [],
      saleDepartment: [],
      saleDevelop: [],
      xsBmSx:null,
      kfBmSx:null,
      saleZz: [],
      titleMenuzz: [],
      titleMenuwcd: ["所有销售", "所有开发", "所有部门"],
      zzEbay: [],
      zzJoom: [],
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
        wj: false,
        wcd: false
      },
      pmShow: {
        pmYW: true,
        pmHW: false,
        pmHWISH: false,
        pmHSMT: false,
        pmHAMA: false,
        pmHJOOM: false,
        pmHShopee: false
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
    goBlack(n){
      window.open(n);
    },
    goHome() {
      this.ifShowIndex1 = false;
      this.ifShowIndex = true;
      this.showTitle["pming"] = true;
      this.activeTitle = "销售排名";
      this.indexTabactive = 0;
    },
    judge(n) {
      this.flagShow = false;
      this.flagShowFour = false;
      this.flagShowTwo = false;
      this.flagShowOne = false;
      this.flagShowThree = false;
      this.sortData = [];
      var dateArr=this.dateArr
        for (var i = 0; i < dateArr.length; i++) {
          var arrDb = String(parseInt(dateArr[i].rate));
          var arrDbi = arrDb.split('.');
          if (arrDbi[0] == n) {
            this.sortData.push(dateArr[i]);
          }
        }
        setTimeout(() => {
        if (this.sortData.length > 4) {
          this.flagShowFour = false;
          this.flagShowThree = false;
          this.flagShowTwo = false;
          this.flagShowOne = false;
          this.flagShow = true;
        }
        if (this.sortData.length == 4) {
          this.flagShow = false;
          this.flagShowThree = false;
          this.flagShowTwo = false;
          this.flagShowOne = false;
          this.flagShowFour = true;
        }
        if (this.sortData.length == 3) {
          this.flagShow = false;
          this.flagShowFour = false;
          this.flagShowTwo = false;
          this.flagShowOne = false;
          this.flagShowThree = true;
        }
        if (this.sortData.length == 2) {
          this.flagShow = false;
          this.flagShowFour = false;
          this.flagShowThree = false;
          this.flagShowOne = false;
          this.flagShowTwo = true;
        }
        if (this.sortData.length == 1) {
          this.flagShow = false;
          this.flagShowFour = false;
          this.flagShowThree = false;
          this.flagShowTwo = false;
          this.flagShowOne = true;
        }
      }, 200);
    },
    four() {
      this.flagShowFour = true;
    },
    closeIndexFour() {
      this.flagShowFour = false;
    },
    zoomIn() {
      this.flagShow = true;
    },
    closeIndex() {
      this.flagShow = false;
    },
    three() {
      this.flagShowThree = true;
    },
    closeIndexThree() {
      this.flagShowThree = false;
    },
    two() {
      this.flagShowTwo = true;
    },
    closeIndexTwo() {
      this.flagShowTwo = false;
    },
    one() {
      this.flagShowOne = true;
    },
    closeIndexOne() {
      this.flagShowOne = false;
    },
    handclickzz(tab, event) {
      if (tab.label === "郑州eBay平台") {
        this.tabzz["ebay"] = true;
      } else {
        this.tabzz["ebay"] = false;
      }
      if (tab.label === "郑州Joom平台") {
        this.tabzz["joom"] = true;
      } else {
        this.tabzz["joom"] = false;
      }
    },
    handclickwcd(tab, event) {
      if (tab.label === "所有销售") {
        this.tabwcd["xs"] = true;
      } else {
        this.tabwcd["xs"] = false;
      }
      if (tab.label === "所有开发") {
        this.tabwcd["kf"] = true;
      } else {
        this.tabwcd["kf"] = false;
      }
      if (tab.label === "所有部门") {
        this.tabwcd["bm"] = true;
      } else {
        this.tabwcd["bm"] = false;
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
    sortNumberXS(column, prop, order) {
      const data = this.wcdxs;
      if (column.order === "descending") {
        this.wcdxs = data.sort(compareDown(data, column.prop));
      } else {
        this.wcdxs = data.sort(compareUp(data, column.prop));
      }
    },
    sortNumberKF(column, prop, order) {
      const data = this.wcdkf;
      if (column.order === "descending") {
        this.wcdkf = data.sort(compareDown(data, column.prop));
      } else {
        this.wcdkf = data.sort(compareUp(data, column.prop));
      }
    },
    sortNumberBM(column, prop, order) {
      const data = this.wcdbm;
      if (column.order === "descending") {
        this.wcdbm = data.sort(compareDown(data, column.prop));
      } else {
        this.wcdbm = data.sort(compareUp(data, column.prop));
      }
    },
    xsBmSxList(){
      var xsNum=this.xsBmSx
      var xsList=this.wcdxsTotal
      var arrDy=[]
      if(xsNum){
        for(var i=0;i<xsList.length;i++){
          if(xsList[i].depart==xsNum){
            arrDy.push(xsList[i])
          }
        }
        this.wcdxs=arrDy
      }else{
        this.wcdxs=this.wcdxsTotal
      }
    },
    kfBmSxList(){
      var xsNum=this.kfBmSx
      var xsList=this.wcdkfTotal
      var arrDy=[]
      if(xsNum){
        for(var i=0;i<xsList.length;i++){
          if(xsList[i].depart==xsNum){
            arrDy.push(xsList[i])
          }
        }
        this.wcdkf=arrDy
      }else{
        this.wcdkf=this.wcdkfTotal
      }
    },
    renderHeaderticXs(h, { column, $index }) {
      if ($index === 0) {
        let filters = this.indexSybm;
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.xsBmSx,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.xsBmSx = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.xsBmSxList();
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
    renderHeaderticKf(h, { column, $index }) {
      if ($index === 0) {
        let filters = this.indexSybm;
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.kfBmSx,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.kfBmSx = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.kfBmSxList();
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
      if (tab.label === "Shopee") {
        this.activePlatpm = "Shopee";
        this.pmShow["pmShopee"] = true;
        ProsTargetPm(this.activePlatpm).then(res => {
          this.proTablepm = res.data.data;
        });
      } else {
        this.pmShow["pmShopee"] = false;
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
        this.ifShowIndex = false;
        this.ifShowIndex1 = true;
      }
      if (n === "旺季目标完成度") {
        this.showTitle["wcd"] = true;
        this.activeTitle = "旺季目标完成度";
        this.indexTabactive = index;
      } else {
        this.showTitle["wcd"] = false;
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
    checkStatus1(row, prop) {
      if (Number(row.rate) < Number(row.dateRate)) {
        return "exception";
      } else {
        return "success";
      }
    },
    checkStatus(row, prop) {
      if (row.lastProfit < 0 && row.profit > 0) {
        if (row[prop] < row.dateRate) {
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
    },
    cutOut1: function(value) {
      value = Number(value).toFixed(0);
      return value;
    }
  },
  mounted() {
    APISiteIndex().then(res => {
        this.spareData = res.data.data;
        var dateArr = this.spareData;
        for (var i = 0; i < dateArr.length; i++) {
          if (dateArr[i].avatar == null) {
            dateArr[i].avatar = `/static/img/header.1a1e548.png`;
          }
          dateArr[i].rate = Number(dateArr[i].rate).toFixed(2);

          dateArr[i].target = Number(dateArr[i].target).toFixed(0);
          
          dateArr[i].amt = Number(dateArr[i].amt).toFixed(0);
          if(Number(dateArr[i].rate>=100)){
            dateArr[i].bonus = Number(dateArr[i].bonus)+Number(dateArr[i].rxtraBonus);
          }else{
            dateArr[i].bonus = 0;
          }
        }
        this.dateArr=dateArr
      });
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
    this.$store.dispatch("GetUserInfo").then(() => {
      this.sysUserName = this.$store.getters.name;
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
    // getZzTargetEbay().then(res => {
    //   this.zzEbay = res.data.data;
    // });
    // getZzTargetJoom().then(res => {
    //   this.zzJoom = res.data.data;
    // });
    getSiteIndexXs().then(res => {
      this.wcdxs = res.data.data;
      this.wcdxsTotal = res.data.data;
    });
    getSiteIndexKf().then(res => {
      this.wcdkf = res.data.data;
      this.wcdkfTotal = res.data.data;
    });
    getSiteIndexBM().then(res => {
      this.wcdbm = res.data.data;
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
    APISiteIndex().then(res => {
      var arrData = res.data.data;
      for (var i = 0; i < arrData.length; i++) {
        if (arrData[i].avatar == null) {
          arrData[i].avatar = `/static/img/header.1a1e548.png`;
        }
        
        arrData[i].rate = parseInt(Number(arrData[i].rate));
        arrData[i].target = Number(arrData[i].target).toFixed(0);
        arrData[i].amt = Number(arrData[i].amt).toFixed(0);
        arrData[i].bonus = Number(arrData[i].bonus).toFixed(0);
        if (arrData[i].rate <= 20) {
          this.last20.push(arrData[i]);
        }
        if (arrData[i].rate > 20 && arrData[i].rate <= 40) {
          this.last40.push(arrData[i]);
        }
        if (arrData[i].rate > 40 && arrData[i].rate <= 60) {
          this.last60.push(arrData[i]);
        }
        if (arrData[i].rate > 60 && arrData[i].rate <= 80) {
          this.last80.push(arrData[i]);
        }
        if (arrData[i].rate > 80 && arrData[i].rate <= 100 && arrData[i].rxtraBonus == 0) {
          this.last100.push(arrData[i]);
        }
        if (arrData[i].rate >= 100 && arrData[i].rxtraBonus >0 && arrData[i].rxtraBonus >0<=1500) {
          this.last110.push(arrData[i]);
        }
        if (arrData[i].rate >= 100 && arrData[i].rxtraBonus >1500 &&  arrData[i].rxtraBonus >0<=2600) {
          this.last120.push(arrData[i]);
        }
        if (arrData[i].rate >= 100 && arrData[i].rxtraBonus >2600 &&  arrData[i].rxtraBonus >0<=3700) {
          this.last130.push(arrData[i]);
        }
      }
      this.tabSort = arrData;
    });
    APISiteSales(this.activePlatpm).then(res => {
      this.bonusList = res.data.data.list;
      for (var i = 0; i < this.bonusList.length; i++) {
        if (this.bonusList[i].avatar == null) {
          this.bonusList[i].avatar = `/static/img/header.1a1e548.png`;
        }
      }
      this.bonus.total = Number(res.data.data.bonusAllNum).toFixed(0);
      this.bonus.totalnj = Number(res.data.data.vacationDaysAllNum).toFixed(0);
      this.bonus.pass = Number(res.data.data.bonusUsedNum).toFixed(0);
      this.bonus.passnj = Number(res.data.data.vacationDaysUsedNum).toFixed(0);
      this.bonus.surplus = Number(res.data.data.bonusUnUsedNum).toFixed(0);
      this.bonus.surplusnj = Number(
        res.data.data.vacationDaysUnUsedNum
      ).toFixed(0);
    });
    this.getNews();
    setTimeout(()=>{
      var bigDemo=this.$refs.bigDemo
      var cont=0
      var setTime=setInterval(() => {
        if(cont<190){
          bigDemo.scrollTop=cont++
        }else{
          clearInterval(setTime)
        }
      }, 5);
    },1000)
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
.left-boxCase {
  width: 100%;
  float: left;
  margin-top: 1.5%;
  height: 915px;
  background: url(../assets/bgban51.png) no-repeat center;
  background-size: 100% 100%;
  position: relative;
}
.box-card {
  width: 30%;
  height: 375px;
  overflow-y: scroll;
  float: right;
  margin-top: 1.5%;
  background-size: 100% 100%;
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
  height: 530px;
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
.tswj {
  height: 848px;
  overflow-y: auto;
  background: #494a5f;
}
.tabNo {
  width: 80%;
  float: left;
}
.tabY {
  width: 20%;
  float: left;
}
.tabNoBlock {
  width: 100%;
  background: #fff;
  height: 6px;
  margin-top: 65px;
  position: relative;
  padding-left: -25px;
}
.leftDemo,
.rightDemo {
  position: absolute;
  width: 507.5px;
  height: 90px;
  border: 30px solid;
}
.leftDemo {
  border-right: 0;
  border-top-left-radius: 100px;
  border-bottom-left-radius: 100px;
  z-index: 1;
}
.rightDemo {
  left: 485px;
  width: 460px;
  border-left: 0;
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
}
.leftDemo:before,
.rightDemo:before {
  content: "";
  position: absolute;
  display: block;
  width: 507.5px;
  height: 90px;
  top: -15px;
  border: 15px solid;
}
.leftDemo:before {
  border-right: 0;
  border-top-left-radius: 100px;
  border-bottom-left-radius: 100px;
  left: -15px;
}
.rightDemo:before {
  width: 460px;
  border-left: 0;
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
}
.bigDemo {
  width: 980px;
  margin: 0 auto;
  padding-top: 66px;
  position: relative;
  height: 800px;
  overflow: hidden;
  overflow-y: auto;
}
.start {
  display: block;
  width: 25px;
  height: 25px;
  background: #e7e7e7;
  border: #303334 solid 10px;
  border-radius: 50%;
  position: absolute;
  top: 57px;
  left: 450px;
  text-align: center;
  line-height: 25px;
}
.end {
  display: block;
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  top: 656px;
  text-align: center;
  line-height: 25px;
  right: 477px;
  z-index: 10;
  color: red;
  animation: myfirst 2s infinite;
}
.end img {
  position: absolute;
  top: -5px;
  left: -5px;
}
@keyframes myfirst {
  0%,
  100% {
    transform: scale(0.8);
    -webkit-transform: scale(0.8);
  }
  50% {
    transform: scale(1.2);
    -webkit-transform: scale(1.2);
  }
}
@keyframes myfirst1 {
  0%,
  100% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
  50% {
    transform: scale(1.5);
    -webkit-transform: scale(1.5);
  }
}
.span20 {
  display: block;
  color: #5a9c8e;
  font-size: 50px;
  font-weight: 600;
  position: absolute;
  right: 40px;
  top: 16px;
}
.span40 {
  display: block;
  color: #46b2bc;
  font-size: 50px;
  font-weight: 600;
  position: absolute;
  left: 40px;
  top: 16px;
}
.span60 {
  display: block;
  color: #40bdc9;
  font-size: 50px;
  font-weight: 600;
  position: absolute;
  right: 40px;
  top: 16px;
}
.span80 {
  display: block;
  color: #0bdbee;
  font-size: 50px;
  font-weight: 600;
  position: absolute;
  left: 40px;
  top: 16px;
}
.span100 {
  color: #83cf20;
  display: block;
  font-size: 50px;
  font-weight: 600;
  position: absolute;
  left: -50px;
  top: 16px;
}
.rightDemo:nth-child(1) {
  border-color: #76c5cc;
  top: 66.5px;
}
.rightDemo:nth-child(1):before {
  border-color: #69b8a7;
}
.leftDemo:nth-child(2) {
  top: 186px;
  width: 460px;
  border-color: #69b8a7;
}
.leftDemo:nth-child(2):before {
  width: 460px;
  border-color: #76c5cc;
}
.rightDemo:nth-child(3) {
  left: 485.5px;
  z-index: 2;
  width: 460px;
  top: 305.5px;
  border-color: #76c5cc;
}
.rightDemo:nth-child(3):before {
  border-color: #69b8a7;
  width: 460px;
}
.leftDemo:nth-child(4) {
  width: 475px;
  top: 425px;
  border-color: #69b8a7;
}
.leftDemo:nth-child(4):before {
  width: 475px;
  border-color: #76c5cc;
}
.rightDemo:nth-child(5) {
  left: 485.5px;
  z-index: 3;
  width: 460px;
  top: 544px;
  border-color: #76c5cc;
}
.rightDemo:nth-child(5):before {
  border-color: #69b8a7;
  width: 460px;
}
.leftDemo:nth-child(6) {
  width: 870px;
  top: 665px;
  z-index: 2;
  border-color: #6caf29;
}
.leftDemo:nth-child(6):before {
  width: 870px;
  border-color: #8cc63e;
}
.rightDemo:nth-child(7) {
  width: 870px;
  top: 785px;
  left:75px;
  z-index: 1;
  border-color: #8cc63e;
}
.rightDemo:nth-child(7):before {
  width: 870px;
  border-color: #6caf29;
}
.leftDemo:nth-child(8) {
  width: 870px;
  top: 905px;
  border-color: #6caf29;
  z-index: 0;
}
.leftDemo:nth-child(8):before {
  width: 870px;
  border-color: #8cc63e;
}
.indexbImg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-size: 100%;
  background: url(../assets/sc.png) no-repeat center;
  margin-left: -20px;
  cursor: pointer;
}
.indexbImg1 {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-size: 100%;
  background: url(../assets/sc1.png) no-repeat center;
  margin-left: -20px;
  cursor: pointer;
}
.indexbImg:hover {
  -webkit-animation: icon-bounce 0.5s alternate;
  -moz-animation: icon-bounce 0.5s alternate;
  -o-animation: icon-bounce 0.5s alternate;
  animation: icon-bounce 0.5s alternate;
}
.indexbImg1:hover {
  -webkit-animation: icon-bounce 0.5s alternate;
  -moz-animation: icon-bounce 0.5s alternate;
  -o-animation: icon-bounce 0.5s alternate;
  animation: icon-bounce 0.5s alternate;
}
@keyframes icon-bounce {
  0% {
    transform: translate(0px, 0px);
  }
  50% {
    transform: translate(0px, -10px);
  }
  100% {
    transform: translate(0px, 0px);
  }
}
.indexbImg img {
  display: block;
  width: 45px;
  height: 45px;
}
.b0 {
  position: absolute;
  top: -35px;
  left: 5%;
  z-index: 101;
}
.b1 {
  position: absolute;
  top: -35px;
  left: 15%;
  z-index: 101;
}
.b2 {
  position: absolute;
  top: -35px;
  left: 25%;
  z-index: 101;
}
.b3 {
  position: absolute;
  top: -35px;
  left: 35%;
  z-index: 101;
}
.b4 {
  position: absolute;
  top: -35px;
  left: 45%;
  z-index: 101;
}
.b5 {
  position: absolute;
  top: -35px;
  left: 55%;
  z-index: 101;
}
.b6 {
  position: absolute;
  top: -35px;
  left: 65%;
  z-index: 101;
}
.b7 {
  position: absolute;
  top: -35px;
  left: 75%;
  z-index: 101;
}
.b8 {
  position: absolute;
  top: -35px;
  left: 85%;
  z-index: 101;
}
.b9 {
  position: absolute;
  top: -32px;
  left: 95%;
  z-index: 101;
}
.b10 {
  position: absolute;
  top: -0px;
  right: -25px;
  z-index: 101;
}
.b11 {
  position: absolute;
  top: 60px;
  right: -27px;
  z-index: 101;
}
.b12 {
  position: absolute;
  bottom: -35px;
  left: 90%;
  z-index: 101;
}
.b13 {
  position: absolute;
  bottom: -35px;
  left: 80%;
  z-index: 101;
}
.b14 {
  position: absolute;
  bottom: -35px;
  left: 70%;
  z-index: 101;
}
.b15 {
  position: absolute;
  bottom: -35px;
  left: 60%;
  z-index: 101;
}
.b16 {
  position: absolute;
  bottom: -35px;
  left: 50%;
  z-index: 101;
}
.b17 {
  position: absolute;
  bottom: -35px;
  left: 40%;
  z-index: 101;
}
.b18 {
  position: absolute;
  bottom: -35px;
  left: 30%;
  z-index: 101;
}
.b19 {
  position: absolute;
  bottom: -35px;
  left: 20%;
  z-index: 101;
}
.b20 {
  position: absolute;
  bottom: -35px;
  left: 5%;
  z-index: 101;
}
.b21 {
  position: absolute;
  top: -35px;
  left: 90%;
  z-index: 101;
}
.b22 {
  position: absolute;
  top: -35px;
  left: 80%;
  z-index: 101;
}
.b23 {
  position: absolute;
  top: -35px;
  left: 70%;
  z-index: 101;
}
.b24 {
  position: absolute;
  top: -35px;
  left: 60%;
  z-index: 101;
}
.b25 {
  position: absolute;
  top: -35px;
  left: 50%;
  z-index: 101;
}
.b26 {
  position: absolute;
  top: -35px;
  left: 40%;
  z-index: 101;
}
.b27 {
  position: absolute;
  top: -35px;
  left: 30%;
  z-index: 101;
}
.b28 {
  position: absolute;
  top: -35px;
  left: 20%;
  z-index: 101;
}
.b29 {
  position: absolute;
  top: -35px;
  left: 10%;
  z-index: 101;
}
.b30 {
  position: absolute;
  top: -5px;
  left: -5px;
  z-index: 101;
}
.b31 {
  position: absolute;
  top: 60px;
  left: -5px;
  z-index: 101;
}
.b32 {
  position: absolute;
  bottom: -35px;
  left: 10%;
  z-index: 101;
}
.b33 {
  position: absolute;
  bottom: -35px;
  left: 20%;
  z-index: 101;
}
.b34 {
  position: absolute;
  bottom: -35px;
  left: 30%;
  z-index: 101;
}
.b35 {
  position: absolute;
  bottom: -35px;
  left: 40%;
  z-index: 101;
}
.b36 {
  position: absolute;
  bottom: -35px;
  left: 50%;
  z-index: 101;
}
.b37 {
  position: absolute;
  bottom: -35px;
  left: 60%;
  z-index: 101;
}
.b38 {
  position: absolute;
  bottom: -35px;
  left: 70%;
  z-index: 101;
}
.b39 {
  position: absolute;
  bottom: -35px;
  left: 80%;
  z-index: 101;
}
.b40 {
  position: absolute;
  bottom: -35px;
  left: 85%;
  z-index: 101;
}
.b41 {
  position: absolute;
  top: -35px;
  left: 10%;
  z-index: 101;
}
.b42 {
  position: absolute;
  top: -35px;
  left: 20%;
  z-index: 101;
}
.b43 {
  position: absolute;
  top: -35px;
  left: 30%;
  z-index: 101;
}
.b44 {
  position: absolute;
  top: -35px;
  left: 40%;
  z-index: 101;
}
.b45 {
  position: absolute;
  top: -35px;
  left: 50%;
  z-index: 101;
}
.b46 {
  position: absolute;
  top: -35px;
  left: 60%;
  z-index: 101;
}
.b47 {
  position: absolute;
  top: -35px;
  left: 70%;
  z-index: 101;
}
.b48 {
  position: absolute;
  top: -35px;
  left: 80%;
  z-index: 101;
}
.b49 {
  position: absolute;
  top: -35px;
  left: 90%;
  z-index: 101;
}
.b50 {
  position: absolute;
  top: -5px;
  right: -25px;
  z-index: 101;
}
.b51 {
  position: absolute;
  top: 60px;
  right: -27px;
  z-index: 101;
}
.b52 {
  position: absolute;
  bottom: -35px;
  left: 90%;
  z-index: 101;
}
.b53 {
  position: absolute;
  bottom: -35px;
  left: 80%;
  z-index: 101;
}
.b54 {
  position: absolute;
  bottom: -35px;
  left: 70%;
  z-index: 101;
}
.b55 {
  position: absolute;
  bottom: -35px;
  left: 60%;
  z-index: 101;
}
.b56 {
  position: absolute;
  bottom: -35px;
  left: 50%;
  z-index: 101;
}
.b57 {
  position: absolute;
  bottom: -35px;
  left: 40%;
  z-index: 101;
}
.b58 {
  position: absolute;
  bottom: -35px;
  left: 30%;
  z-index: 101;
}
.b59 {
  position: absolute;
  bottom: -35px;
  left: 20%;
  z-index: 101;
}
.b60 {
  position: absolute;
  bottom: -35px;
  left: 5%;
  z-index: 101;
}
.b61 {
  position: absolute;
  top: -35px;
  left: 90%;
  z-index: 101;
}
.b62 {
  position: absolute;
  top: -35px;
  left: 80%;
  z-index: 101;
}
.b63 {
  position: absolute;
  top: -35px;
  left: 70%;
  z-index: 101;
}
.b64 {
  position: absolute;
  top: -35px;
  left: 60%;
  z-index: 101;
}
.b65 {
  position: absolute;
  top: -35px;
  left: 50%;
  z-index: 101;
}
.b66 {
  position: absolute;
  top: -35px;
  left: 40%;
  z-index: 101;
}
.b67 {
  position: absolute;
  top: -35px;
  left: 30%;
  z-index: 101;
}
.b68 {
  position: absolute;
  top: -35px;
  left: 20%;
  z-index: 101;
}
.b69 {
  position: absolute;
  top: -35px;
  left: 10%;
  z-index: 101;
}
.b70 {
  position: absolute;
  top: -5px;
  left: -5px;
  z-index: 101;
}
.b71 {
  position: absolute;
  top: 60px;
  left: -5px;
  z-index: 101;
}
.b72 {
  position: absolute;
  bottom: -35px;
  left: 10%;
  z-index: 101;
}
.b73 {
  position: absolute;
  bottom: -35px;
  left: 20%;
  z-index: 101;
}
.b74 {
  position: absolute;
  bottom: -35px;
  left: 30%;
  z-index: 101;
}
.b75 {
  position: absolute;
  bottom: -35px;
  left: 40%;
  z-index: 101;
}
.b76 {
  position: absolute;
  bottom: -35px;
  left: 50%;
  z-index: 101;
}
.b77 {
  position: absolute;
  bottom: -35px;
  left: 60%;
  z-index: 101;
}
.b78 {
  position: absolute;
  bottom: -35px;
  left: 70%;
  z-index: 101;
}
.b79 {
  position: absolute;
  bottom: -35px;
  left: 80%;
  z-index: 101;
}
.b80 {
  position: absolute;
  bottom: -35px;
  left: 90%;
  z-index: 101;
}
.b81 {
  position: absolute;
  top: -35px;
  left: 10%;
  z-index: 101;
}
.b82 {
  position: absolute;
  top: -35px;
  left: 20%;
  z-index: 101;
}
.b83 {
  position: absolute;
  top: -35px;
  left: 30%;
  z-index: 101;
}
.b84 {
  position: absolute;
  top: -35px;
  left: 40%;
  z-index: 101;
}
.b85 {
  position: absolute;
  top: -35px;
  left: 50%;
  z-index: 101;
}
.b86 {
  position: absolute;
  top: -35px;
  left: 60%;
  z-index: 101;
}
.b87 {
  position: absolute;
  top: -35px;
  left: 70%;
  z-index: 101;
}
.b88 {
  position: absolute;
  top: -35px;
  left: 80%;
  z-index: 101;
}
.b89 {
  position: absolute;
  top: -35px;
  left: 90%;
  z-index: 101;
}
.b90 {
  position: absolute;
  top: -5px;
  right: -25px;
  z-index: 101;
}
.b91 {
  position: absolute;
  top: 60px;
  right: -27px;
  z-index: 101;
}
.b92 {
  position: absolute;
  bottom: -35px;
  left: 91%;
  z-index: 101;
}
.b93 {
  position: absolute;
  bottom: -35px;
  left: 79%;
  z-index: 101;
}
.b94 {
  position: absolute;
  bottom: -35px;
  left: 69%;
  z-index: 101;
}
.b95 {
  position: absolute;
  bottom: -35px;
  left: 59%;
  z-index: 101;
}
.b96 {
  position: absolute;
  bottom: -35px;
  left: 49%;
  z-index: 101;
}
.b97 {
  position: absolute;
  bottom: -35px;
  left: 39%;
  z-index: 101;
}
.b98 {
  position: absolute;
  bottom: -35px;
  left: 29%;
  z-index: 101;
}
.b99 {
  position: absolute;
  bottom: -35px;
  left: 19%;
  z-index: 101;
}
.b100 {
  position: absolute;
  bottom: -35px;
  left: 8%;
  z-index: 101;
}
// 全部
.digWhite {
  width: 1300px;
  height: 500px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -650px;
  margin-top: -250px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 1px 2px 10px 1px rgba(60, 141, 188, 0.2);
  z-index: 999;
  border-radius: 15px;
}
.closeIndex {
  position: absolute;
  right: -10px;
  top: -8px;
  cursor: pointer;
}
.CaseBox {
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
  height: 500px;
}
.testCase {
  width: 22%;
  float: left;
  margin: 0 1.3% 0 1.7%;
  background: #fff;
  border-radius: 5px;
  margin-top: 50px;
  margin-bottom: 20px;
  box-shadow: 1px 8px 30px 1px rgba(60, 141, 188, 0.2);
}
.tleft {
  float: left;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin: 20px;
  box-shadow: 4px 13px 30px 5px rgba(60, 141, 188, 0.2);
}
.tright {
  float: left;
  padding: 0 15px;
  margin: 15px;
  padding-left: 23px;
  margin-left: 0;
  box-shadow: 4px 13px 30px 1px rgba(60, 141, 188, 0.2);
}
.tright p {
  font-size: 13px;
}
.tright span {
  display: block;
  float: left;
  width: 60px;
  text-align: justify;
  margin-top: -1px;
}
.namep {
  width: 100%;
  font-size: 13px;
  text-align: center;
  background: #f5af19;
  line-height: 28px;
  color: #fff;
  border-radius: 20px;
  letter-spacing: 3px;
}
.zhezhao {
  width: 200%;
  background: #000;
  height: 100%;
  position: fixed;
  opacity: 0.3;
  top: 0;
  left: -20rem;
  z-index: 10;
}
.animated {
  animation-duration: 1.5s;
}
//四个
.digWhiteFour {
  width: 1300px;
  height: 265px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -650px;
  margin-top: -133px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 1px 2px 10px 1px rgba(60, 141, 188, 0.2);
  z-index: 999;
  border-radius: 15px;
}
.closeIndexFour {
  position: absolute;
  right: -10px;
  top: -8px;
  cursor: pointer;
}
.CaseBoxFour {
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
}
.testCaseFour {
  width: 22%;
  float: left;
  margin: 0 1.3% 0 1.7%;
  background: #fff;
  border-radius: 5px;
  margin-top: 50px;
  margin-bottom: 20px;
  box-shadow: 1px 8px 30px 1px rgba(60, 141, 188, 0.2);
}
.tleftFour {
  float: left;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin: 20px;
  box-shadow: 4px 13px 30px 5px rgba(60, 141, 188, 0.2);
}
.trightFour {
  float: left;
  padding: 0 15px;
  margin: 15px;
  padding-left: 23px;
  margin-left: 0;
  box-shadow: 4px 13px 30px 1px rgba(60, 141, 188, 0.2);
}
.trightFour p {
  font-size: 13px;
}
.trightFour span {
  display: block;
  float: left;
  width: 60px;
  text-align: justify;
  margin-top: -1px;
}
.namepFour {
  width: 100%;
  font-size: 13px;
  text-align: center;
  background: #f5af19;
  line-height: 28px;
  color: #fff;
  border-radius: 20px;
  letter-spacing: 3px;
}
//三个
.digWhiteThree {
  width: 1100px;
  height: 265px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -550px;
  margin-top: -133px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 1px 2px 10px 1px rgba(60, 141, 188, 0.2);
  z-index: 999;
  border-radius: 15px;
}
.closeIndexThree {
  position: absolute;
  right: -10px;
  top: -8px;
  cursor: pointer;
}
.CaseBoxThree {
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
}
.testCaseThree {
  width: 30%;
  float: left;
  margin: 0 1.3% 0 1.7%;
  background: #fff;
  border-radius: 5px;
  margin-top: 50px;
  margin-bottom: 20px;
  box-shadow: 1px 8px 30px 1px rgba(60, 141, 188, 0.2);
}
.tleftThree {
  float: left;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 20px;
  box-shadow: 4px 13px 30px 5px rgba(60, 141, 188, 0.2);
}
.trightThree {
  float: left;
  padding: 0 25px;
  margin: 15px;
  padding-left: 35px;
  margin-left: 0;
  box-shadow: 4px 13px 30px 1px rgba(60, 141, 188, 0.2);
}
.trightThree p {
  font-size: 14px;
}
.trightThree span {
  display: block;
  float: left;
  width: 70px;
  text-align: justify;
  margin-top: -1px;
}
.namepThree {
  width: 100%;
  font-size: 13px;
  text-align: center;
  background: #f5af19;
  line-height: 28px;
  color: #fff;
  border-radius: 20px;
  letter-spacing: 3px;
}
//两个
.digWhiteTwo {
  width: 750px;
  height: 265px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -375px;
  margin-top: -133px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 1px 2px 10px 1px rgba(60, 141, 188, 0.2);
  z-index: 999;
  border-radius: 15px;
}
.closeIndexTwo {
  position: absolute;
  right: -10px;
  top: -8px;
  cursor: pointer;
}
.CaseBoxTwo {
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
}
.testCaseTwo {
  width: 45%;
  float: left;
  margin: 0 2.5%;
  background: #fff;
  border-radius: 5px;
  margin-top: 50px;
  margin-bottom: 20px;
  box-shadow: 1px 8px 30px 1px rgba(60, 141, 188, 0.2);
}
.tleftTwo {
  float: left;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 20px;
  box-shadow: 4px 13px 30px 5px rgba(60, 141, 188, 0.2);
}
.trightTwo {
  float: left;
  padding: 0 30px;
  margin: 15px;
  padding-left: 35px;
  margin-left: 0;
  box-shadow: 4px 13px 30px 1px rgba(60, 141, 188, 0.2);
}
.trightTwo p {
  font-size: 14px;
}
.trightTwo span {
  display: block;
  float: left;
  width: 70px;
  text-align: justify;
  margin-top: -1px;
}
.namepTwo {
  width: 100%;
  font-size: 13px;
  text-align: center;
  background: #f5af19;
  line-height: 28px;
  color: #fff;
  border-radius: 20px;
  letter-spacing: 3px;
}
//1条
.digWhiteOne {
  width: 360px;
  height: 320px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -172px;
  margin-top: -160px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 1px 2px 10px 1px rgba(60, 141, 188, 0.2);
  z-index: 999;
  border-radius: 15px;
}
.closeIndexOne {
  position: absolute;
  right: -10px;
  top: -8px;
  cursor: pointer;
}
.CaseBoxOne {
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
}
.testCaseOne {
  width: 88%;
  margin: 0 6%;
  background: #fff;
  border-radius: 5px;
  margin-top: 30px;
  margin-bottom: 20px;
  box-shadow: 1px 8px 30px 1px rgba(60, 141, 188, 0.2);
  padding-top: 15px;
}
.tleftOne {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: auto;
  box-shadow: 4px 13px 30px 5px rgba(60, 141, 188, 0.2);
}
.trightOne {
  width: 90%;
  margin: auto;
  overflow: hidden;
  box-shadow: 4px 13px 30px 1px rgba(60, 141, 188, 0.2);
  margin-top: 55px;
  padding-bottom: 5px;
  margin-bottom: 10px;
  padding-left: 8px;
  padding-top: 5px;
}
.trightOne p {
  font-size: 14px;
  margin: 0;
  line-height: 25px;
  padding: 5px 10px;
  padding-top: 10px;
}
.trightOne span {
  display: block;
  float: left;
  width: 70px;
  text-align: justify;
}
.p01 {
  overflow: hidden;
}
.p01 p {
  width: 48%;
  padding: 2px;
  line-height: 30px;
}
.p01 p:first-child {
  float: left;
}
.p01 p:last-child {
  float: right;
}
.namepOne {
  width: 100%;
  font-size: 13px;
  text-align: center;
  background: #f5af19;
  line-height: 28px;
  color: #fff;
  border-radius: 20px;
  letter-spacing: 3px;
}
.pred {
  color: red;
  font-weight: bold;
}
.pred span {
  color: #000;
  font-weight: normal;
}
.tabCase {
  transition: All 0.3s ease-in-out;
  -webkit-transition: All 0.3s ease-in-out;
  -moz-transition: All 0.3s ease-in-out;
  -o-transition: All 0.3s ease-in-out;
}
.tabCase:hover {
  transform: translate(0, -20px);
  -webkit-transform: translate(0, -20px);
  -moz-transform: translate(0, -20px);
  -o-transform: translate(0, -20px);
  -ms-transform: translate(0, -20px);
}
.imbge {
  animation: myfirst1 1.2s infinite;
  z-index: 105;
}
//奖金池
.cardCase {
  width: 100%;
  margin: auto;
  background: rgba(246, 248, 142, 0.1);
  height: 525px;
  overflow: hidden;
}
.cardLeft {
  float: left;
  color: #fff;
  margin-top: 1px;
  font-family: "Consolas";
}
.zmb {
  text-align: center;
  margin: 0;
  margin-top: 5px;
  color: #000;
  margin-top: 10px;
}
.njs {
  text-align: center;
  margin: 0;
  margin-top: 5px;
  font-size: 16px;
  letter-spacing: 2px;
  font-weight: normal;
}
.cardLeft01 {
  width: 175px;
  border: #f5ad18 4px solid;
  height: 235px;
  border-radius: 12px;
  margin-left: 45px;
  margin-top: 10px;
}
.cardLeft02 {
  width: 175px;
  border: #f5ad18 4px solid;
  height: 190px;
  border-radius: 12px;
  margin-left: 45px;
  margin-top: 10px;
}
.cardLeft span {
  display: block;
  font-size: 24px;
  color: #fff;
  text-align: center;
  margin-top: 1px;
  color: red;
}
.cardLeft img {
  display: block;
  margin: auto;
  width: 63px;
  height: 53px;
}
.cardRight {
  float: right;
  width: 53%;
  margin-right: 20px;
  height: 490px;
  margin-top: 19px;
  background: rgba(255, 255, 255, 0.4);
  position: relative;
}
.luck-user-title {
  position: absolute;
  width: 90%;
  display: block;
  text-align: center;
  line-height: 50px;
  left: 5%;
  font-size: 18px;
  color: #f5b43a;
  font-weight: bold;
}
.luck-user-title::before {
  width: 100%;
  position: absolute;
  content: "";
  top: 100%;
  left: 0;
  background: -webkit-linear-gradient(
    left,
    rgba(248, 215, 59, 0),
    #f0d03a,
    rgba(248, 215, 59, 0)
  );
  height: 2px;
}
.cardText::-webkit-scrollbar {
  width: 4px;
  height: 10px;
}
.cardText::-webkit-scrollbar-thumb {
  background-color: #fff;
  height: 50px;
  outline-offset: -1px;
  outline: 2px solid #fff;
  -webkit-border-radius: 40px;
  border: 1px solid #fff;
}
.cardText {
  width: 100%;
  margin: auto;
  margin-top: 62px;
  overflow: hidden;
  color: #fff;
  height: 425px;
  overflow-y: auto;
}
.cardText01 {
  overflow: hidden;
  padding: 8px 0;
}
.cardText img {
  float: left;
  margin-left: 8%;
}
.cardText span {
  display: block;
  float: left;
  line-height: 45px;
  margin-left: 18px;
  color: #000;
}
.cardText p {
  float: right;
  margin-right: 12px;
  color: red;
}
.icimg {
  transition: All 0.3s ease-in-out;
  cursor: pointer;
}
.icimg:hover {
  transform: scale(1.2);
}
.njts {
  margin-top: 12px;
  color: #67c23a !important;
}
.spGreen {
  color: #67c23a !important;
}
.swhite {
  color: #e6a23c !important;
}
.jbg {
  animation: rotate 1.5s infinite;
}
@keyframes rotate {
  0% {
    -webkit-transform: rotateY(0deg);
  }
  100% {
    -webkit-transform: rotateY(360deg);
  }
}
//金币
.jb01 {
  position: absolute;
  top: -85px;
  left: 40%;
}
.jb01img {
  position: absolute;
  top: -35px;
  left: 42%;
}
.jb01 span {
  display: block;
  position: absolute;
  color: #fff;
  top: 35%;
  left: 18%;
}
.jb02 {
  position: absolute;
  top: -85px;
  left: 30%;
}
.jb02img {
  position: absolute;
  top: -35px;
  left: 32%;
}
.jb02 span {
  display: block;
  position: absolute;
  color: #fff;
  top: 35%;
  left: 18%;
}
.jb03 {
  position: absolute;
  top: -85px;
  left: 20%;
}
.jb03img {
  position: absolute;
  top: -35px;
  left: 22%;
}
.jb03 span {
  display: block;
  position: absolute;
  color: #fff;
  top: 35%;
  left: 18%;
}
.jb04 {
  position: absolute;
  top: -85px;
  left: 10%;
}
.jb04img {
  position: absolute;
  top: -35px;
  left: 12%;
}
.jb04 span {
  display: block;
  position: absolute;
  color: #fff;
  top: 35%;
  left: 18%;
}
.jb05 {
  position: absolute;
  top: -85px;
  left: 0%;
}
.jb05img {
  position: absolute;
  top: -28px;
  left: 2%;
}
.jb05 span {
  display: block;
  position: absolute;
  color: #fff;
  top: 35%;
  left: 12%;
}
.jb06 {
  position: absolute;
  bottom: 3px;
  left: 0%;
}
.jb06img {
  position: absolute;
  bottom: -28px;
  left: 2%;
}
.jb06 span {
  display: block;
  position: absolute;
  color: #fff;
  top: 35%;
  left: 12%;
}
.jb07 {
  position: absolute;
  bottom: 3px;
  left: 10%;
}
.jb07img {
  position: absolute;
  bottom: -35px;
  left: 12%;
}
.jb07 span {
  display: block;
  position: absolute;
  color: #fff;
  top: 35%;
  left: 12%;
}
.jb08 {
  position: absolute;
  bottom: 3px;
  left: 20%;
}
.jb08img {
  position: absolute;
  bottom: -35px;
  left: 22%;
}
.jb08 span {
  display: block;
  position: absolute;
  color: #fff;
  top: 35%;
  left: 12%;
}
.jb09 {
  position: absolute;
  bottom: 3px;
  left: 30%;
}
.jb09img {
  position: absolute;
  bottom: -35px;
  left: 32%;
}
.jb09 span {
  display: block;
  position: absolute;
  color: #fff;
  top: 35%;
  left: 12%;
}
.jb10 {
  position: absolute;
  bottom: 3px;
  left: 40%;
}
.jb010img {
  position: absolute;
  bottom: -35px;
  left: 42%;
}
.jb10 span {
  display: block;
  position: absolute;
  color: #fff;
  top: 35%;
  left: 12%;
}
.jb11 {
  position: absolute;
  bottom: 3px;
  left: 50%;
}
.jb011img {
  position: absolute;
  bottom: -35px;
  left: 52%;
}
.jb11 span {
  display: block;
  position: absolute;
  color: #fff;
  top: 35%;
  left: 12%;
}
.jb12 {
  position: absolute;
  bottom: 3px;
  left: 60%;
}
.jb012img {
  position: absolute;
  bottom: -35px;
  left: 62%;
}
.jb12 span {
  display: block;
  position: absolute;
  color: #fff;
  top: 35%;
  left: 12%;
}
.jb13 {
  position: absolute;
  bottom: 3px;
  left: 70%;
}
.jb013img {
  position: absolute;
  bottom: -35px;
  left: 72%;
}
.jb13 span {
  display: block;
  position: absolute;
  color: #fff;
  top: 35%;
  left: 12%;
}
.jb14 {
  position: absolute;
  bottom: 3px;
  left: 80%;
}
.jb014img {
  position: absolute;
  bottom: -35px;
  left: 82%;
}
.jb14 span {
  display: block;
  position: absolute;
  color: #fff;
  top: 35%;
  left: 12%;
}
.jb15 {
  position: absolute;
  bottom: 3px;
  left: 90%;
}
.jb015img {
  position: absolute;
  bottom: -35px;
  left: 92%;
}
.jb15 span {
  display: block;
  position: absolute;
  color: #fff;
  top: 35%;
  left: 12%;
}
.jb016img {
  position: absolute;
  top: -30px;
  left: 97%;
}
.jb017img {
  position: absolute;
  bottom: -35px;
  left: 97%;
}
.jb018img {
  position: absolute;
  bottom: -35px;
  left: 87%;
}
.jb019img {
  position: absolute;
  bottom: -35px;
  left: 77%;
}
.jb020img {
  position: absolute;
  bottom: -35px;
  left: 67%;
}
.jb021img {
  position: absolute;
  bottom: -35px;
  left: 57%;
}
.jb022img {
  position: absolute;
  bottom: -35px;
  left: 47%;
}
.jb023img {
  position: absolute;
  bottom: -35px;
  left: 37%;
}
.jb024img {
  position: absolute;
  bottom: -35px;
  left: 27%;
}
.jb025img {
  position: absolute;
  bottom: -35px;
  left: 17%;
}
.jb026img {
  position: absolute;
  bottom: -35px;
  left: 7%;
}
.jb027img {
  position: absolute;
  top: -28px;
  left: 2%;
}
.jb028img {
  position: absolute;
  bottom: -28px;
  left: 2%;
}
.jb029img {
  position: absolute;
  bottom: -35px;
  left: 12%;
}
.jb030img {
  position: absolute;
  bottom: -35px;
  left: 22%;
}
.jb031img {
  position: absolute;
  bottom: -35px;
  left: 32%;
}
.jb032img {
  position: absolute;
  bottom: -35px;
  left: 42%;
}
.jb033img {
  position: absolute;
  bottom: -35px;
  left: 52%;
}
.jb034img {
  position: absolute;
  bottom: -35px;
  left: 62%;
}
.jb035img {
  position: absolute;
  bottom: -35px;
  left: 72%;
}
.jb036img {
  position: absolute;
  bottom: -35px;
  left: 82%;
}
.jb037img {
  position: absolute;
  bottom: -35px;
  left: 92%;
}
.jbr1{
  position: absolute;
  top: -85px;
  left:95%;
}
.jbr1 span {
  display: block;
  position: absolute;
  color: #fff;
  top: 35%;
  left: 12%;
}
.jbr2{
  position: absolute;
  top: 34px;
  left:95%;
}
.jbr2 span {
  display: block;
  position: absolute;
  color: #fff;
  top: 35%;
  left: 12%;
}
.jbr3{
  position: absolute;
  top: 34px;
  left:85%;
}
.jbr3 span {
  display: block;
  position: absolute;
  color: #fff;
  top: 35%;
  left: 12%;
}
.jbr4{
  position: absolute;
  top: 34px;
  left:75%;
}
.jbr4 span {
  display: block;
  position: absolute;
  color: #fff;
  top: 35%;
  left: 12%;
}
.jbr5{
  position: absolute;
  top: 34px;
  left:65%;
}
.jbr5 span {
  display: block;
  position: absolute;
  color: #fff;
  top: 35%;
  left: 12%;
}
.jbr6{
  position: absolute;
  top: 34px;
  left:55%;
}
.jbr6 span {
  display: block;
  position: absolute;
  color: #fff;
  top: 35%;
  left: 12%;
}
.jbr7{
  position: absolute;
  top: 34px;
  left:45%;
}
.jbr7 span {
  display: block;
  position: absolute;
  color: #fff;
  top: 35%;
  left: 12%;
}
.jbr8{
  position: absolute;
  top: 34px;
  left:35%;
}
.jbr8 span {
  display: block;
  position: absolute;
  color: #fff;
  top: 35%;
  left: 12%;
}
.jbr9{
  position: absolute;
  top: 34px;
  left:25%;
}
.jbr9 span {
  display: block;
  position: absolute;
  color: #fff;
  top: 35%;
  left: 12%;
}
.jbr10{
  position: absolute;
  top: 34px;
  left:15%;
}
.jbr10 span {
  display: block;
  position: absolute;
  color: #fff;
  top: 35%;
  left: 12%;
}
.jbr11{
  position: absolute;
  top: 34px;
  left:5%;
}
.jbr11 span {
  display: block;
  position: absolute;
  color: #fff;
  top: 35%;
  left: 12%;
}
//第二屏幕
.bgCase {
  width: 100%;
  height: 970px;
  background: url(../assets/bgban5.jpg) no-repeat center;
  background-size: 100% 100%;
  padding: 0 30px;
  background-color: #f0f2f5;
  zoom: 0.9;
}
.leftBox {
  width: 69%;
  float: left;
}
.rightBox {
  width: 30%;
  height: 475px;
  float: right;
  margin-top: 10px;
}
.lGoback {
  position: absolute;
  top: 20px;
  left: 20px;
  cursor: pointer;
  z-index: 999;
}
@media (max-width: 1500px) {
  .cardLeft {
    margin-left: 10px;
  }
  .cardLeft01 {
    margin-left: 0;
  }
  .cardText img {
    margin-left: 10px;
  }
  .cardText span {
    margin-left: 10px;
  }
  .cardText p {
    margin-right: 5px;
  }
  .cardRight {
    width: 54%;
    margin-right: 15px;
  }
  .cardLeft01 {
    width: 155px;
  }
  .cardLeft02 {
    width: 155px;
  }
}
</style>
<style>
.tab-index-pan .el-tabs__item {
  height: 50px;
  line-height: 50px;
}
.el-progress-bar__outer{
  background-color:#ccc;
}
.bigDemo::-webkit-scrollbar {
  width: 1px !important;
  height: 1px !important;
}
</style>
