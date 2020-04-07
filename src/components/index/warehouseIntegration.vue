<template>
    <div>
        <el-tabs
                v-model="activeCkName"
                style="width:100%;padding-left:14px;"
                @tab-click="getCkIntegral"
              >
                <el-tab-pane
                  v-for="(item, index) in titleMenuCk"
                  :label="item.name"
                  :name="item.name"
                  :key="index"
                ></el-tab-pane>
              </el-tabs>
              <el-table
                  :data="ckintegral"
                  size="small"
                  :height="tableHeightNew"
                  ref="table1"
                  v-show="inCk.zb"
                  @sort-change="sortNumberCk"
                >
                    <el-table-column
                      prop="order"
                      label="排名"
                      align="center"
                      width="80"
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
                  <el-table-column
                    prop="name"
                    align="center"
                    label="姓名"
                    width="80"
                  >
                  <template slot-scope="scope">
                    <p>{{scope.row.name}}</p>
                  </template>
                  </el-table-column>
                  <el-table-column
                    prop="job"
                    align="center"
                    min-width="125"
                    label="职位"
                  >
                    <el-table-column prop="job" :render-header="renderHeaderCkzb" align="center" min-width="125"></el-table-column>
                  </el-table-column>
                  <el-table-column :render-header="renderHeaderCk01"  align="center">
                    <el-table-column prop="this_total_num" align="center" :render-header="renderHeaderCk11" sortable="custom" min-width="135">
                      <template slot-scope="scope">
                        <span :class="scope.row.this_total_num<0?'colorRed':''">{{scope.row.this_total_num}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="this_job_num" align="center" :render-header="renderHeaderCk1" sortable="custom" min-width="115">
                      <template slot-scope="scope">
                        <span :class="scope.row.this_job_num<0?'colorRed':''">{{scope.row.this_job_num}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="this_other_num" align="center" :render-header="renderHeaderCk0" sortable="custom" min-width="135">
                      <template slot-scope="scope">
                        <span :class="scope.row.this_other_num<0?'colorRed':''">{{scope.row.this_other_num}}</span>
                      </template>
                    </el-table-column>                  
                    <el-table-column prop="this_agv_num" align="center" :render-header="renderHeaderCk2" sortable="custom" min-width="135">
                      <template slot-scope="scope">
                        <span :class="scope.row.this_agv_num<0?'colorRed':''">{{scope.row.this_agv_num}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="this_diff" align="center" sortable="custom" :render-header="renderHeaderCk3" min-width="115">
                      <template slot-scope="scope">
                        <span :class="scope.row.this_diff<0?'colorRed':''">{{scope.row.this_diff}}</span>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :render-header="renderHeaderCk02"  align="center">
                    <el-table-column prop="last_num" align="center" sortable="custom" :render-header="renderHeaderCk4" min-width="110">
                      <template slot-scope="scope">
                        <span :class="scope.row.last_num<0?'colorRed':''">{{scope.row.last_num}}</span>
                      </template>
                    </el-table-column>
                  </el-table-column>   
                  <el-table-column prop="this_last" align="center" label="本月VS上月" sortable="custom" min-width="125">
                    <template slot-scope="scope">
                      <el-progress
                        :text-inside="true"
                        :stroke-width="18"
                        :status="checkStatus1(scope.row,'this_last')"
                        :percentage="Math.round(scope.row.this_last*100)/100"
                      ></el-progress>
                    </template>
                  </el-table-column>
                  <el-table-column prop="dateRate" align="center" label="时间进度" min-width="120">
                    <template slot-scope="scope">
                      <el-progress
                        :text-inside="true"
                        :stroke-width="18"
                        status="exception"
                        :percentage="Math.round(scope.row.time_rate*100)/100"
                      ></el-progress>
                    </template>
                  </el-table-column>
                  <el-table-column prop="updateTime" align="center" label="统计日期" min-width="100">
                    <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span>{{dateFormatter(scope.row.update_time)}}</span>
                    </template>
                  </el-table-column>
                </el-table>
                <el-table
                  :data="ckintegral"
                  size="small"
                  :height="tableHeightNew"
                  ref="table1"
                  v-show="inCk.qt"
                  @sort-change="sortNumberCk"
                >
                    <el-table-column
                      prop="order"
                      label="排名"
                      align="center"
                      width="80"
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
                  <el-table-column
                    prop="name"
                    align="center"
                    label="姓名"
                    width="90"
                  >
                  <template slot-scope="scope">
                    <p>{{scope.row.name}}</p>
                  </template>
                  </el-table-column>
                  <el-table-column
                    prop="job"
                    align="center"
                    width="90"
                    label="职位"
                  ></el-table-column>
                  <el-table-column :render-header="renderHeaderCk01"  align="center">
                  <el-table-column prop="this_job_num" align="center" :render-header="renderHeaderCk1" sortable="custom" min-width="130">
                    <template slot-scope="scope">
                      <span :class="scope.row.this_job_num<0?'colorRed':''">{{scope.row.this_job_num}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="this_agv_num" align="center" :render-header="renderHeaderCk2" sortable="custom" min-width="175">
                    <template slot-scope="scope">
                      <span :class="scope.row.this_agv_num<0?'colorRed':''">{{scope.row.this_agv_num}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="this_diff" align="center" sortable="custom" :render-header="renderHeaderCk3" min-width="145">
                    <template slot-scope="scope">
                      <span :class="scope.row.this_diff<0?'colorRed':''">{{scope.row.this_diff}}</span>
                    </template>
                  </el-table-column>
                  </el-table-column>
                  <el-table-column :render-header="renderHeaderCk02"  align="center">
                  <el-table-column prop="last_num" align="center" sortable="custom" :render-header="renderHeaderCk44" min-width="130">
                    <template slot-scope="scope">
                      <span :class="scope.row.last_num<0?'colorRed':''">{{scope.row.last_num}}</span>
                    </template>
                  </el-table-column>
                  </el-table-column>
                  <el-table-column prop="this_last" align="center" label="本月VS上月" sortable="custom" min-width="120">
                    <template slot-scope="scope">
                      <el-progress
                        :text-inside="true"
                        :stroke-width="18"
                        :status="checkStatus1(scope.row,'this_last')"
                        :percentage="Math.round(scope.row.this_last*100)/100"
                      ></el-progress>
                    </template>
                  </el-table-column>
                  <el-table-column prop="dateRate" align="center" label="时间进度" min-width="120">
                    <template slot-scope="scope">
                      <el-progress
                        :text-inside="true"
                        :stroke-width="18"
                        status="exception"
                        :percentage="Math.round(scope.row.time_rate*100)/100"
                      ></el-progress>
                    </template>
                  </el-table-column>
                  <el-table-column prop="updateTime" align="center" label="统计日期" min-width="110">
                    <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span>{{dateFormatter(scope.row.update_time)}}</span>
                    </template>
                  </el-table-column>
                </el-table>
    </div>
</template>

<script>
import {
  ProsTarget,
  ProsTargetPm,
  getCkIntegral
} from "../..//api/api";
import { compareUp, compareDown } from "../../api/tools";
import { getqueryInfojob } from "../../api/product";
export default {
  name: 'app',
  props: ['titleMenuCk'],  //注意这里要父组件的名字一致
  data(){
    return {
      tableHeightNew: window.innerHeight - 138,
      activeCkName:'总榜',
      thisMonth:0,
      lastMonth:0,
      zbJob:null,
      ckintegral:[],
      indexJob:[],
      inCk:{
        zb:true,
        qt:false
      },
    }
  },
  watch:{
      titleMenuCk: function(newValue) {
         this.titleMenuCk=newValue
       }
  },
  methods:{
    sortNumberCk(column, prop, order) {
      const data = this.ckintegral;
      if (column.order === "descending") {
        this.ckintegral = data.sort(compareDown(data, column.prop));
      } else {
        this.ckintegral = data.sort(compareUp(data, column.prop));
      }
    },      
    checkStatus1(row, prop) {
      if (Number(row.rate) < Number(row.dateRate)) {
        return "exception";
      } else {
        return "success";
      }
    },
    dateFormatter(date) {
      return date.substring(0, 10);
    },
    renderHeaderCk11(h,{column}) { // h即为cerateElement的简写，具体可看vue官方文档
        var pmMonth=this.thisMonth
        return h(
          'span',
          [ 
            h('span', '总积分'),
          ],
        );
    },    
    renderHeaderCk0(h,{column}) { // h即为cerateElement的简写，具体可看vue官方文档
        var pmMonth=this.thisMonth
        return h(
          'span',
          [ 
            h('span', '其他岗位积分'),
          ],
        );
    },    
    renderHeaderCkzb(h, { column, $index }) {
      if ($index === 0) {
        let filters = this.indexJob;
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.zbJob,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.zbJob = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.getCkIntegral();
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
    sortNumberPX(column, prop, order) {
      const data = this.proTablepm;
      if (column.order === "descending") {
        this.proTablepm = data.sort(compareDown(data, column.prop));
      } else {
        this.proTablepm = data.sort(compareUp(data, column.prop));
      }
    },
    renderHeaderCk1(h,{column}) { // h即为cerateElement的简写，具体可看vue官方文档
        var pmMonth=this.thisMonth
        return h(
          'span',
          [ 
            h('span', '本岗位积分'),
          ],
        );
    },
    renderHeaderCk2(h,{column}) { // h即为cerateElement的简写，具体可看vue官方文档
        var pmMonth=this.thisMonth
        return h(
          'span',
          [ 
            h('span', '人员平均积分'),
          ],
        );
    },
    renderHeaderCk3(h,{column}) { // h即为cerateElement的简写，具体可看vue官方文档
        var pmMonth=this.thisMonth
        return h(
          'span',
          [ 
            h('span', '积分差'),
          ],
        );
    },
    renderHeaderCk4(h,{column}) { // h即为cerateElement的简写，具体可看vue官方文档
        var pmMonth=this.lastMonth
        return h(
          'span',
          [ 
            h('span', '总积分'),
          ],
        );
    },
    renderHeaderCk44(h,{column}) { // h即为cerateElement的简写，具体可看vue官方文档
        var pmMonth=this.lastMonth
        return h(
          'span',
          [ 
            h('span', '本岗位积分'),
          ],
        );
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
    getCkIntegral(){
      var activeCkName = this.activeCkName=='总榜'?activeCkName='':activeCkName=this.activeCkName
      if(this.activeCkName=='总榜' && this.zbJob==null){
        var container={
          job:activeCkName,
          type:'all'
        }
        this.inCk.zb=true
        this.inCk.qt=false
      }else if(this.activeCkName=='总榜' && this.zbJob!=null){
        var container={
          job:this.zbJob,
          type:'all'
        }
        this.inCk.zb=true
        this.inCk.qt=false
      }else{
        var container={
          job:activeCkName,
          type:'job'
        }
        this.inCk.zb=false
        this.inCk.qt=true
      }
      getCkIntegral(container).then(res => {
        this.ckintegral = res.data.data;
        var date=this.ckintegral[0].update_time
        date=date.substring(5,7)
        date=Number(date)
        this.thisMonth=date
        this.lastMonth=date-1
        });
    },
  },
  mounted() {
    getqueryInfojob().then(response => {
      this.indexJob = response.data.data;
    });
    this.getCkIntegral();    
  }
}
</script>

<style lang="scss">

</style>