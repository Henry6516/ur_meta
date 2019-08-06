<template>
  <section>
    <div>
      <el-col :span="24" class="toolbar tabe" style="padding:15px 25px;">
        <div class="floet">
          <div class="floet01">
            <span>主类目</span>
            <el-select
              v-model="condition.saler"
              placeholder="请选择"
              size="small"
              class="m10"
              style="width:110px;"
            >
              <el-option v-for="item in developer" :value="item" :key="item"></el-option>
            </el-select>
          </div>
          <div class="floet01">
            <span style="color:red">订单时间</span>
            <el-date-picker
              size="small"
              v-model="condition.orderDate"
              value-format="yyyy-MM-dd"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              class="m10 m210"
              :picker-options="pickerOptions2"
            ></el-date-picker>
          </div>
          <div class="floet01">
            <span>开发时间</span>
            <el-date-picker
              size="small"
              v-model="condition.devDate"
              value-format="yyyy-MM-dd"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              class="m10 m210"
              :picker-options="pickerOptions2"
            ></el-date-picker>
          </div>
          <div class="floet01">
            <el-button size="small" type="primary" @click="getdata()">查询</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="24" style="margin-top:1px;">
        <el-col :span="12">
          <el-card>
            <div ref="or1" :style="sty" v-loading="listLoading"></div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <div ref="or2" :style="sty" v-loading="listLoading"></div>
          </el-card>
        </el-col>
      </el-col>
    </div>
  </section>
</template>
<script type="text/ecmascript-6">
import { getDevPerform } from "../../api/product";
import { getDeveloper } from "../../api/profit";
import { compareUp, compareDown, getMonthDate } from "../../api/tools";
export default {
  data() {
    return {
      tableHeightstock: window.innerHeight - 214,
      options: [],
      total: null,
      developer: [],
      sty: {
        width: "100%",
        height: window.innerHeight - 168 + "px"
      },
      listLoading: false,
      dateType: [{ id: 0, type: "交易时间" }, { id: 1, type: "发货时间" }],
      condition: {
        dateFlag: 0,
        orderDate: [],
        devDate: []
      },
      options1: {
        title: {
          top:20,  
          text: "各开发产品款数",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}"
        },
        legend: {
          type: "scroll",
          x: "center",
          y: "bottom",
          data: []
        },
        toolbox: {
          top:10,
          right:10, 
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ["pie", "funnel"]
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        series: [
          {
            name: "各开发产品款数",
            type: "pie",
            radius : '60%',
            data: []
          }
        ]
      },
      options2: {
        title: {
          top:20,  
          text: "各开发销售额($)",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          type: "scroll",
          x: "center",
          y: "bottom",
          data: []
        },
        toolbox: {
          top:10,
          right:10,
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ["pie", "funnel"]
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        series: [
          {
            name: "各开发销售额($)",
            type: "pie",
            radius : '60%',
            data:[] 
          }
        ]
      },
      pickerOptions2: {
        shortcuts: [
          {
            text: "本月",
            onClick(vm) {
              const date = getMonthDate("thisMonth");
              vm.$emit("pick", [date["start"], date["end"]]);
            }
          },
          {
            text: "上个月",
            onClick(picker) {
              const date = getMonthDate("previousMonth");
              picker.$emit("pick", [date["start"], date["end"]]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const date = getMonthDate("lastMonth");
              picker.$emit("pick", [date["start"], date["end"]]);
            }
          }
        ]
      }
    };
  },
  methods: {
    getdata() {
      this.listLoading = true;
      getDevPerform(this.condition).then(response => {
        this.listLoading = false;
        var dataArr1=response.data.data.devData
        var arr1Name=[]
        var arr1Data=[]
        for(let i=0;i<dataArr1.length;i++){
            arr1Name.push(dataArr1[i].salerName)
            var obj={
                value:dataArr1[i].num,
                name:dataArr1[i].salerName
            }
            arr1Data.push(obj)
        }
        this.options1.legend.data = arr1Name;
        this.options1.series[0].data = arr1Data;
        let or1 = this.$echarts.init(this.$refs.or1);
        or1.setOption(this.options1);
        var dataArr2=response.data.data.orderData
        var arr2Name=[]
        var arr2Data=[]
        for(let i=0;i<dataArr2.length;i++){
            arr2Name.push(dataArr2[i].salerName)
            var obj={
                value:dataArr2[i].amt,
                name:dataArr2[i].salerName
            }
            arr2Data.push(obj)
        }
        this.options2.legend.data = arr2Name;
        this.options2.series[0].data = arr2Data;
        let or2 = this.$echarts.init(this.$refs.or2);
        or2.setOption(this.options2);
      });
    }
  },
  mounted() {
    this.condition.orderDate = [
      getMonthDate("lastMonth").start,
      getMonthDate("lastMonth").end
    ];
    getDeveloper().then(response => {
      const possessMan = response.data.data;
      this.developer = possessMan;
    });
    this.getdata();
  }
};
</script>

<style lang="scss" scoped>
.clasRed {
  color: #c55 !important;
}
.clasGreen {
  color: #0e9a00;
}
.classa {
  color: #337ab7;
  text-decoration: none;
}
.clasRed1 {
  color: #f56c6c;
  border: rgba(245, 108, 108, 0.2) solid 1px;
  background: rgba(245, 108, 108, 0.1);
  width: 65%;
  margin: auto;
  line-height: 32px;
  display: block;
  border-radius: 5px;
}
.clasGreen1 {
  color: #0e9a00;
  border-radius: 5px;
  width: 65%;
  margin: auto;
  line-height: 32px;
  display: block;
  border: rgba(3, 82, 38, 0.2) solid 1px;
  background: rgba(33, 170, 95, 0.1);
}
.redCu {
  color: red;
  font-weight: bold;
}
.redblack {
  color: #606266;
}
.saleP {
  font-size: 14px;
  margin-top: 5px;
  display: block;
  text-align: right;
  padding-right: 10px;
}
.floet {
  overflow: hidden;
}
.floet01 {
  float: left;
  margin-right: 20px;
}
.el-button {
  margin-left: 0px;
}
.m10 {
  margin-left: 10px;
}
.rid100 {
  margin-left: 10px;
}
.m210 {
  width: 230px;
}
</style>
