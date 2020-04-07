<template>
    <div>
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
              <el-table
                :data="shanghaiTable"
                size="small"
                :height="tableHeightNew"
                ref="table1"
                v-show="show.shanghai"
                v-scrollBar:slim
                @sort-change="sortNumber"
              >
                <el-table-column type="index" align="center"></el-table-column>
                <el-table-column prop="depart" align="center" label="部门">
                  <el-table-column prop="depart" :render-header="renderHeadertic" align="center"></el-table-column>
                </el-table-column>
                <el-table-column prop="username" align="center" label="姓名" sortable></el-table-column>
                <el-table-column :render-header="renderHeaderCk022"  align="center">
                <el-table-column prop="lastProfit" align="center" :render-header="renderHeaderCk02none" sortable="custom"></el-table-column>
                <el-table-column prop="profit" align="center" :render-header="renderHeaderCk01none" sortable="custom"></el-table-column>
                </el-table-column>
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
                :data="departTable"
                size="small"
                height="798"
                v-show="show.depart"
                @sort-change="sortNumber"
              >
                <el-table-column type="index" align="center"></el-table-column>
                <el-table-column prop="depart" label="部门" align="center">
                  <el-table-column prop="depart" :render-header="renderHeadertic2" align="center"></el-table-column>
                </el-table-column>
                <el-table-column :render-header="renderHeaderCk022"  align="center">
                <el-table-column prop="lastProfit" align="center" :render-header="renderHeaderCk02none" sortable="custom"></el-table-column>
                <el-table-column prop="profit" align="center" :render-header="renderHeaderCk01none" sortable="custom"></el-table-column>
                </el-table-column>
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
                :height="tableHeightNew"
                size="small"
                v-show="show.developer"
                @sort-change="sortNumber"
              >
                <el-table-column type="index" align="center"></el-table-column>
                <el-table-column prop="depart" align="center" label="部门">
                  <el-table-column prop="depart" :render-header="renderHeadertic3" align="center"></el-table-column>
                </el-table-column>
                <el-table-column prop="username" align="center" label="姓名" sortable></el-table-column>
                <!-- <el-table-column prop="role"
                               align="center"
                label="角色"></el-table-column>-->
                <el-table-column :render-header="renderHeaderCk022"  align="center">
                <el-table-column prop="lastProfit" align="center" :render-header="renderHeaderCk02none" sortable="custom"></el-table-column>
                <el-table-column prop="profit" align="center" :render-header="renderHeaderCk01none" sortable="custom"></el-table-column>
                </el-table-column>
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
</template>

<script>
import {
ShangHaiTarget,
DepartTarget,
DeveloperTarget,
APIAllDpart,
} from "../..//api/api";
import { compareUp, compareDown } from "../../api/tools";
export default {
  name: 'app',
  props: ['allMenu'],  //注意这里要父组件的名字一致
  data(){
    return {
      sybm:[],
      zzbm:[],  
      show: {
        shanghai: true,
        zhengzhou: false,
        depart: false,
        developer: false
      },  
      activeName: "所有销售",  
      tableHeightNew: window.innerHeight - 138,
      thisMonth:0,
      lastMonth:0,
      shanghaiTable: [],
      departTable: [],
      developerTable: [],
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
    }
  },
  watch:{
      allMenu: function(newValue) {
         this.allMenu=newValue
       }
  },
  methods:{
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
    },  
    renderHeaderCk011(h,{column}) { // h即为cerateElement的简写，具体可看vue官方文档
        return h(
          'span',
          [ 
            h('span', '销售额($)'),
          ],
        );
    },    
    renderHeaderCk022(h,{column}) { 
        return h(
          'span',
          [ 
            h('span', '毛利(￥)'),
          ],
        );
    },
    renderHeaderCk02none(h,{column}) { // h即为cerateElement的简写，具体可看vue官方文档
        var pmMonth=this.lastMonth
        return h(
          'span',
          [ 
            h('span', '上月'),
            h('span','('+pmMonth+'月)'),
          ],
        );
    },  
    renderHeaderCk01none(h,{column}) { // h即为cerateElement的简写，具体可看vue官方文档
        var pmMonth=this.thisMonth
        return h(
          'span',
          [ 
            h('span', '本月'),
            h('span','('+pmMonth+'月)'),
          ],
        );
    },            
    renderHeadertic(h, { column, $index }) {
      if ($index === 0) {
        let filters = this.sybm;
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
    sortNumber(column, prop, order) {
      var tab;
        if (this.activeName === "所有销售") {
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
          this.tableName = data.sort(compareDown(data, column.prop));
        } else {
          this.tableName = data.sort(compareUp(data, column.prop));
        }
    },  
    handleClick(tab, event) {
      if (tab.label === "所有销售") {
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
  },
  mounted() {
    ShangHaiTarget(this.profit1).then(res => {
      this.shanghaiTable = res.data.data;
      var date=this.shanghaiTable[0].updateTime
        date=date.substring(5,7)
        date=Number(date)
        this.thisMonth=date
        this.lastMonth=date-1
    });
    APIAllDpart().then(res => {
      this.sybm = res.data.data;
    });
    DepartTarget(this.profit3).then(res => {
      this.departTable = res.data.data;
    });
    DeveloperTarget(this.profit4).then(res => {
      this.developerTable = res.data.data;
    });
  }
}
</script>

<style lang="scss">

</style>