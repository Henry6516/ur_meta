<template>
    <div>
        <el-tabs v-model="activeSale" @tab-click="handleClickSale">
                <el-tab-pane
                  v-for="(item, index) in allMenu"
                  :label="item.name"
                  :name="item.name"
                  :key="index"
                ></el-tab-pane>
              </el-tabs>
              <el-table
                :data="saleSh"
                size="small"
                :height="tableHeightNew"
                ref="table1"
                v-show="sale.shanghai"
                v-scrollBar:slim
                @sort-change="sortNumber"
              >
                <el-table-column type="index" align="center"></el-table-column>
                <el-table-column prop="depart" align="center" label="部门">
                  <el-table-column prop="depart" :render-header="renderHeaderPic" align="center"></el-table-column>
                </el-table-column>
                <el-table-column prop="username" align="center" label="姓名" sortable></el-table-column>
                <!-- <el-table-column prop="role"
                               align="center"
                label="角色"></el-table-column>-->
                <el-table-column :render-header="renderHeaderCk011"  align="center">
                <el-table-column prop="lastAmt" align="center" :render-header="renderHeaderCk02none" sortable="custom"></el-table-column>
                <el-table-column prop="amt" align="center" :render-header="renderHeaderCk01none" sortable="custom"></el-table-column>
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
                :data="saleDepartment"
                size="small"
                :height="tableHeightNew"
                v-show="sale.depart"
                @sort-change="sortNumber"
              >
                <el-table-column type="index" align="center"></el-table-column>
                <el-table-column prop="depart" label="部门" align="center">
                  <el-table-column prop="depart" :render-header="renderHeaderPic2" align="center"></el-table-column>
                </el-table-column>
                <el-table-column :render-header="renderHeaderCk011"  align="center">
                <el-table-column prop="lastAmt" align="center" :render-header="renderHeaderCk02none" sortable="custom"></el-table-column>
                <el-table-column prop="amt" :render-header="renderHeaderCk01none" align="center" sortable="custom"></el-table-column>
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
                :data="saleDevelop"
                :height="tableHeightNew"
                size="small"
                v-show="sale.developer"
                @sort-change="sortNumber"
              >
                <el-table-column type="index" align="center"></el-table-column>
                <el-table-column prop="depart" align="center" label="部门">
                  <el-table-column prop="depart" :render-header="renderHeaderPic3" align="center"></el-table-column>
                </el-table-column>
                <el-table-column prop="username" align="center" label="姓名" sortable></el-table-column>
                <!-- <el-table-column prop="role"
                               align="center"
                label="角色"></el-table-column>-->
                <el-table-column :render-header="renderHeaderCk011"  align="center">
                <el-table-column prop="lastAmt" align="center" :render-header="renderHeaderCk02none" sortable="custom"></el-table-column>
                <el-table-column prop="amt" align="center" :render-header="renderHeaderCk01none" sortable="custom"></el-table-column>
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
  getAmt,
  getDepartAmt,
  getDevAmt,
  APIAllDpart,
} from "../..//api/api";
import { compareUp, compareDown } from "../../api/tools";
export default {
  name: 'app',
  props: ['allMenu'],  //注意这里要父组件的名字一致
  data(){
    return {
      activeSale: "所有销售",  
      sybm:[],
      tableHeightNew: window.innerHeight - 138,
      thisMonth:0,
      lastMonth:0,
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
      sale: {
        shanghai: true,
        zhengzhou: false,
        depart: false,
        developer: false
      },
      saleSh:[],
      saleDepartment:[],
      saleDevelop:[],  
    }
  },
  watch:{
      allMenu: function(newValue) {
         this.allMenu=newValue
       }
  },
  methods:{
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
    handleClickSale(tab, event) {
      if (tab.label === "所有销售") {
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
    getDsh() {
      getAmt(this.profitl1).then(res => {
        this.saleSh = res.data.data;
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
    renderHeaderPic(h, { column, $index }) {
      if ($index === 0) {
        let filters = this.sybm;
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
    sortNumber(column, prop, order) {
      var tab;
        if (this.activeSale === "所有销售") {
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
          this.tableName = data.sort(compareDown(data, column.prop));
        } else {
          this.tableName = data.sort(compareUp(data, column.prop));
        }
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
    dateFormatter(date) {
      return date.substring(0, 10);
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
    getAmt(this.profitl1).then(res => {
      this.saleSh = res.data.data;
      var date=this.saleSh[0].updateTime
      date=date.substring(5,7)
      date=Number(date)
      this.thisMonth=date
      this.lastMonth=date-1
    });
    getDepartAmt(this.profitl3).then(res => {
      this.saleDepartment = res.data.data;
    });
    getDevAmt(this.profitl4).then(res => {
      this.saleDevelop = res.data.data;
    });  
    APIAllDpart().then(res => {
      this.sybm = res.data.data;
    });
  }
}
</script>

<style lang="scss">

</style>