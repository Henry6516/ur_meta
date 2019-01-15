<template>
  <div class="dashboard-editor-container" style="height: 1010px;">
    <section>
      <div class="left-box">
        <el-card>
          <div slot="header" class="clearfix-table">
            <el-tabs v-model="activeTitle" @tab-click="handleTitle">
              <el-tab-pane v-for="(item, index) in titleMenu" :label="item.name" :name="item.name" :key="index">
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="tabs-container" v-show="showTitle.baokuan">
            <el-tabs v-model="activePlat" type="card" @tab-click="handlePlat">
              <el-tab-pane label="eBay-义乌仓" name="eBay-义乌仓">
                <el-table :data="proTable" size="small" @sort-change="sortNumber" height="800">
                  <el-table-column type="index" align="center"></el-table-column>
                  <el-table-column prop="platform" label="平台" sortable align="center"></el-table-column>
                  <el-table-column prop="goodsCode" label="商品编码" sortable align="center"></el-table-column>
                  <el-table-column prop="goodsName" label="商品名称" sortable align="center"></el-table-column>
                  <el-table-column prop="img" label="图片" sortable align="center">
                    <template slot-scope="scope">
                      <img :src='scope.row.img' style="width: 120px;height: 120px;">
                    </template>
                  </el-table-column>
                  <el-table-column prop="profit" label="本月毛利" sortable="custom" align="center"></el-table-column>
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
                  <el-table-column prop="goodsCode" label="商品编码" sortable align="center"></el-table-column>
                  <el-table-column prop="goodsName" label="商品名称" sortable align="center"></el-table-column>
                  <el-table-column prop="img" label="图片" sortable align="center">
                    <template slot-scope="scope">
                      <img :src='scope.row.img' style="width: 120px;height: 120px;">
                    </template>
                  </el-table-column>
                  <el-table-column prop="profit" label="本月毛利" sortable="custom" align="center"></el-table-column>
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
                  <el-table-column prop="goodsCode" label="商品编码" sortable align="center"></el-table-column>
                  <el-table-column prop="goodsName" label="商品名称" sortable align="center"></el-table-column>
                  <el-table-column prop="img" label="图片" sortable align="center">
                    <template slot-scope="scope">
                      <img :src='scope.row.img' style="width: 120px;height: 120px;">
                    </template>
                  </el-table-column>
                  <el-table-column prop="profit" label="本月毛利" sortable="custom" align="center"></el-table-column>
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
                  <el-table-column prop="goodsCode" label="商品编码" sortable align="center"></el-table-column>
                  <el-table-column prop="goodsName" label="商品名称" sortable align="center"></el-table-column>
                  <el-table-column prop="img" label="图片" sortable align="center">
                    <template slot-scope="scope">
                      <img :src='scope.row.img' style="width: 120px;height: 120px;">
                    </template>
                  </el-table-column>
                  <el-table-column prop="profit" label="本月毛利" sortable="custom" align="center"></el-table-column>
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
                  <el-table-column prop="goodsCode" label="商品编码" sortable align="center"></el-table-column>
                  <el-table-column prop="goodsName" label="商品名称" sortable align="center"></el-table-column>
                  <el-table-column prop="img" label="图片" sortable align="center">
                    <template slot-scope="scope">
                      <img :src='scope.row.img' style="width: 120px;height: 120px;">
                    </template>
                  </el-table-column>
                  <el-table-column prop="profit" label="本月毛利" sortable="custom" align="center"></el-table-column>
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
                  <el-table-column prop="goodsCode" label="商品编码" sortable align="center"></el-table-column>
                  <el-table-column prop="goodsName" label="商品名称" sortable align="center"></el-table-column>
                  <el-table-column prop="img" label="图片" sortable align="center">
                    <template slot-scope="scope">
                      <img :src='scope.row.img' style="width: 120px;height: 120px;">
                    </template>
                  </el-table-column>
                  <el-table-column prop="profit" label="本月毛利" sortable="custom" align="center"></el-table-column>
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
              <el-tab-pane v-for="(item, index) in allMenu" :label="item.name" :name="item.name" :key="index">
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class='table-container' v-show="showTitle.zengzhang">
            <el-table
              :data="shanghaiTable"
              size="small"
              height="798"
              ref="table1"
              v-if="show.shanghai"
              v-scrollBar:slim
              @sort-change="sortNumber">
              <el-table-column type="index" align="center"></el-table-column>
              <el-table-column prop="depart" align="center" label="部门" sortable></el-table-column>
              <el-table-column prop="username" align="center" label="姓名" sortable></el-table-column>
              <el-table-column prop="role" align="center" label="角色"></el-table-column>
              <el-table-column prop="lastProfit" align="center" label="上月毛利" sortable="custom"></el-table-column>
              <el-table-column prop="profit" align="center" label="本月毛利" sortable="custom"></el-table-column>
              <el-table-column prop="rate" align="center" label="本月VS上月" sortable="custom">
                <template slot-scope="scope">
                  <el-progress :text-inside="true" :stroke-width="18" :status="checkStatus(scope.row,'rate')" :percentage="Math.round(scope.row.rate*10000)/100"></el-progress>
                </template>
              </el-table-column>
              <el-table-column prop="dateRate" align="center" label="时间进度" >
                <template slot-scope="scope">
                  <el-progress :text-inside="true" :stroke-width="18" status="exception" :percentage="Math.round(scope.row.dateRate*10000)/100"></el-progress>
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
              v-show="show.zhengzhou">
              <el-table-column type="index" align="center"></el-table-column>
              <el-table-column prop="depart" align="center" label="部门" ></el-table-column>
              <el-table-column prop="username" align="center" label="姓名" sortable></el-table-column>
              <el-table-column prop="role" align="center" label="角色"></el-table-column>
              <el-table-column prop="lastProfit" align="center" label="上月毛利" sortable="custom"></el-table-column>
              <el-table-column prop="profit" align="center" label="本月毛利" sortable="custom"></el-table-column>
              <el-table-column prop="rate" align="center" label="本月VS上月" sortable="custom">
                <template slot-scope="scope">
                  <el-progress :text-inside="true" :stroke-width="18" :status="checkStatus(scope.row,'rate')" :percentage="Math.round(scope.row.rate*10000)/100"></el-progress>
                </template>
              </el-table-column>
              <el-table-column prop="dateRate" align="center" label="时间进度">
                <template slot-scope="scope">
                  <el-progress :text-inside="true" :stroke-width="18" status="exception" :percentage="Math.round(scope.row.dateRate*10000)/100"></el-progress>
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
              @sort-change="sortNumber">
              <el-table-column type="index" align="center"></el-table-column>
              <el-table-column prop="depart" label="部门" align="center" sortable></el-table-column>
              <el-table-column prop="lastProfit" align="center" label="上月毛利" sortable="custom"></el-table-column>
              <el-table-column prop="profit" label="本月毛利" align="center" sortable="custom">
              </el-table-column>
              <el-table-column prop="rate" label="本月VS上月" align="center" sortable="custom">
                <template slot-scope="scope">
                  <el-progress :text-inside="true" :stroke-width="18" :status="checkStatus(scope.row,'rate')" :percentage="Math.round(scope.row.rate*10000)/100"></el-progress>
                </template>
              </el-table-column>
              <el-table-column prop="dateRate" align="center" label="时间进度">
                <template slot-scope="scope">
                  <el-progress :text-inside="true" :stroke-width="18" status="exception" :percentage="Math.round(scope.row.dateRate*10000)/100"></el-progress>
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
              @sort-change="sortNumber">
              <el-table-column type="index" align="center"></el-table-column>
              <el-table-column prop="depart" align="center" label="部门" sortable></el-table-column>
              <el-table-column prop="username" align="center" label="姓名" sortable></el-table-column>
              <el-table-column prop="role" align="center" label="角色"></el-table-column>
              <el-table-column prop="lastProfit" align="center" label="上月毛利" sortable="custom"></el-table-column>
              <el-table-column prop="profit" align="center" label="本月毛利" sortable="custom"></el-table-column>
              <el-table-column prop="rate" align="center" label="本月VS上月" sortable="custom">
                <template slot-scope="scope">
                  <el-progress :text-inside="true" :stroke-width="18" :status="checkStatus(scope.row,'rate')" :percentage="Math.round(scope.row.rate*10000)/100"></el-progress>
                </template>
              </el-table-column>
              <el-table-column prop="dateRate" align="center" label="时间进度" >
                <template slot-scope="scope">
                  <el-progress :text-inside="true" :stroke-width="18" status="exception" :percentage="Math.round(scope.row.dateRate*10000)/100"></el-progress>
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
                  <h2 v-html="item.title">
                  </h2>
                  <p style="color:#b2b2b2;">{{item.creator}} &nbsp;&nbsp;| &nbsp;&nbsp;{{item.createDate.substring(0, 16)}}</p>
                </div>
              </div>
              <div class="post-right-box">
                <el-button type="text" @click="dialogTopShow(item.id)">
                  <i class="el-icon-view" ></i>
                </el-button>
                <el-button type="text" slot="reference" style="padding:8px;" v-if='item.isTop==="1"'>
                  <el-badge value="顶" style="margin-top:-5px;"></el-badge>
                </el-button>
                <el-button type="text" @click="handleTop(item.id)" slot="reference" style="padding:10px;" v-else-if='item.isTop==="0"'>
                  <span>⇧</span>
                  </el-button>
              </div>
            </li>
          </ul>
          <el-button type="text" @click="loadMore" class="more" v-text="this.page>=this.newsData.page?'加载更多':'已无更多'">
          </el-button>
        </el-card>
        <el-card class="box-card1">
          <div slot="header" class="clearfix-list">
            <h2>活动栏</h2>
          </div>
          <img src="../assets/1.5.jpg" style="height:400px;width:95%;padding:15px;">
        </el-card>
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
import { ShangHaiTarget, ZhengZhouTarget, DepartTarget, DeveloperTarget, news, newsTop, ProsTarget } from '../api/api'
import { compareUp, compareDown } from '../api/tools'
import { getMenu } from '../api/login'

export default {
  data() {
    return {
      page: null,
      dialogVisible: false,
      data: {
        id: '',
        isTop: '1'
      },
      newsData: {
        page: 1,
        pageSize: 10
      },
      newsDetailList: {},
      allMenu: [],
      titleMenu: [],
      moreData: [],
      newsList: [],
      tableHeight: null,
      permission: [],
      shanghaiTable: [],
      zhengzhouTable: [],
      departTable: [],
      developerTable: [],
      proTable: [],
      activeName: '上海销售',
      activeTitle: '利润增长表',
      activePlat: 'eBayY',
      show: {
        shanghai: true,
        zhengzhou: false,
        depart: false,
        developer: false
      },
      showTitle: {
        baokuan: false,
        zengzhang: true
      }
    }
  },
  methods: {
    // 加载更多
    loadMore() {
      this.newsData.page++
      news(this.newsData).then(res => {
        this.moreData = res.data.data.items
        this.newsList = this.newsList.concat(this.moreData)
      })
    },
    // 公告详情
    dialogTopShow(id) {
      this.dialogVisible = true
      this.newsDetailList = this.newsList.filter(e => e.id === id)
      this.newsDetailList = this.newsDetailList[0]
    },
    // 置顶
    handleTop(id) {
      this.data.id = id
      newsTop(this.data).then(res => {
        this.getNews()
      })
      this.newsData.page = 1
    },
    getNews() {
      news(this.newsData).then(res => {
        const ret = res.data.data.items
        this.newsList = ret
        this.page = res.data.data._meta.pageCount
      })
    },
    handleClick(tab, event) {
      if (tab.label === '上海销售') {
        this.show['shanghai'] = true
      } else {
        this.show['shanghai'] = false
      }
      if (tab.label === '郑州销售') {
        this.show['zhengzhou'] = true
      } else {
        this.show['zhengzhou'] = false
      }
      if (tab.label === '所有部门') {
        this.show['depart'] = true
      } else {
        this.show['depart'] = false
      }
      if (tab.label === '所有开发') {
        this.show['developer'] = true
      } else {
        this.show['developer'] = false
      }
    },
    handleTitle(tab, event) {
      if (tab.label === '今日爆款') {
        this.showTitle['baokuan'] = true
      } else {
        this.showTitle['baokuan'] = false
      }
      if (tab.label === '利润增长表') {
        this.showTitle['zengzhang'] = true
      } else {
        this.showTitle['zengzhang'] = false
      }
    },
    handlePlat(tab, event) { 
      if (tab.label === 'eBay-义乌仓') {
        ProsTarget(this.activePlat).then(res => {
          this.proTable = res.data.data
        })
      }
      if (tab.label === 'eBay-海外仓') {
        ProsTarget(this.activePlat).then(res => {
          this.proTable = res.data.data
        })
      }
      if (tab.label === 'Wish') {
        ProsTarget(this.activePlat).then(res => {
          this.proTable = res.data.data
        })
      } 
      if (tab.label === 'SMT') {
        ProsTarget(this.activePlat).then(res => {
          this.proTable = res.data.data
        })
      } 
      if (tab.label === 'Amazon') {
        ProsTarget(this.activePlat).then(res => {
          this.proTable = res.data.data
        })
      } 
      if (tab.label === 'Joom') {
        ProsTarget(this.activePlat).then(res => {
          this.proTable = res.data.data
        })
      }
    },
    dateFormatter(date) {
      return date.substring(0, 10)
    },
    // 数字排序
    sortNumber(column, prop, order) {
      if (this.activeTitle === '利润增长表') {
        var tab
        if (this.activeName === '上海销售') {
          tab = 'shanghai'
        } else if (this.activeName === '郑州销售') {
          tab = 'zhengzhou'
        } else if (this.activeName === '所有部门') {
          tab = 'depart'
        } else if (this.activeName === '所有开发') {
          tab = 'developer'
        }
        const tableName = tab + 'Table'
        const data = this[tableName]
        if (column.order === 'descending') {
          this.tableData = data.sort(compareDown(data, column.prop))
        } else {
          this.tableData = data.sort(compareUp(data, column.prop))
        }
      } else {
        const data = this.proTable
        if (column.order === 'descending') {
          this.tableData = data.sort(compareDown(data, column.prop))
        } else {
          this.tableData = data.sort(compareUp(data, column.prop))
        }
      }
    },
    checkStatus(row, prop) {
      if (row.lastProfit < 0 && row.profit > 0) {
        if (Math.abs(row[prop]) < row.dateRate) {
          return 'exception'
        }
        return 'success'
      } else if (row.lastProfit > 0 && row.profit < 0) {
        return 'exception'
      } else if (row[prop] < row.dateRate) {
        return 'exception'
      }
      return 'success'
    }
  },
  mounted() {
    getMenu().then(response => {
      const res = response.data.data
      const menu = res.filter(e => e.name === '主页')
      this.allMenu = menu[0].tabs[1].tabs
      this.titleMenu = menu[0].tabs
    })
    ShangHaiTarget().then((res) => {
      this.shanghaiTable = res.data.data
    })
    ZhengZhouTarget().then((res) => {
      this.zhengzhouTable = res.data.data
    })
    DepartTarget().then((res) => {
      this.departTable = res.data.data
    })
    DeveloperTarget().then((res) => {
      this.developerTable = res.data.data
    })
    ProsTarget(this.activePlat).then(res => {
      this.proTable = res.data.data
    })
    this.getNews()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.clearfix-table{
  height: 21px;
  line-height: 0px;
}
.clearfix-list{
  height: 4px;
  line-height: 0px;
}
.left-box{
  width: 69%;
  float: left;
  margin-top:3%;
  height: 900px;
}
.box-card{
  width: 30%;
  height: 400px;
  overflow-y: scroll;
  float: right;
  margin-top:3%;
  .post-left-box{
    position: relative;
    float: left;
    width: 400px;
    h2{
      text-overflow:ellipsis; 
      white-space:nowrap;
      overflow: hidden;
    }
  }
  .post-right-box{
    position: relative;
    float: right;
    margin-top: 10px;
    margin-right: 10px;
    i{
      margin-right: -15px;
      font-size: 20px;
    }
    span{
      margin-right: 5px;
      font-style: normal;
      font-size: 24px;
    }
    span:hover{
      color: red;
    }
  }
  li{
    list-style: none;
    border-bottom: 1px solid #eee;
    transition: all .3s;
    height: 100px;
  }
  .more{
    margin-left: 50%;
  }
}
.box-card1{
  width: 30%;
  height: 485px;
  float: right;
  margin-top: 10px;
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
  zoom:0.9;
}
.table-container {
  background-color: #FFFFFF;
}
.tabs-container {
  background-color:#FFFFFF;
}
.text {
  font-size: 18px;
}
</style>