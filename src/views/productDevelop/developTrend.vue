<template>
  <div style="margin-top:5px;">
    <el-col :span="24" style="margin-top:1px;">
      <el-col :span="12">
        <el-card style="padding-top:15px;">
          <div ref="or3" style="height:500px;width:100%" v-loading="listLoading"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card style="padding-top:15px;">
          <div ref="or4" style="height:500px;width:100%" v-loading="listLoading"></div>
        </el-card>
      </el-col>
    </el-col>
     <el-col :span="24" style="margin-top:5px;">
      <el-col :span="12">
        <el-card style="padding-top:15px;">
          <div ref="or5" style="height:500px;width:100%" v-loading="listLoading"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card style="padding-top:15px;">
          <div ref="or6" style="height:500px;width:100%" v-loading="listLoading"></div>
        </el-card>
      </el-col>
    </el-col>
    <el-col :span="24" style="margin-top:5px;" class="por">
      <el-col :span="24">
        <el-card style="padding-top:15px;">
          <div ref="or1" style="height:800px;width:100%" v-loading="listLoading"></div>
        </el-card>
      </el-col>
      <el-button class="poa" size="small" type="primary" @click="dexz" v-show="showis">{{defaultay}}</el-button>
      <el-col :span="24">
        <el-card style="padding-top:15px;">
          <div ref="or2" style="height:800px;width:100%" v-loading="listLoading"></div>
        </el-card>
      </el-col>
    </el-col>
  </div>
</template>

<script>
import { APIDevData } from "../../api/product";
export default {
  data() {
    return {
      listLoading: false,
      defaultay:'全不选',
      showis:false,
      options1: {
        title: {
          text: "开发-近30天每天开发款数"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          type: "scroll",
          width: "65%",
          left: "12.8%",
          data: [String]
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar", "stack", "tiled"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [String]
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value} $"
            }
          }
        ],
        series: [Object]
      },
      options2: {
        title: {
          text: "销售-近30天每天开发款数"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          type: "scroll",
          width: "65%",
          left: "12.8%",
          data: [String]
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar", "stack", "tiled"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [String]
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value} $"
            }
          }
        ],
        series: [Object]
      },
      options3: {
        title: {
          text: "开发员-销售额($)",
          left:10
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          selectedMode: "single",
          data: ["1个月新品", "3个月新品", "6个月新品"],
          selected: {
            "1个月新品": true,
            "3个月新品": false,
            "6个月新品": false
          }
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar", "stack", "tiled"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [String]
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value} $"
            }
          }
        ],
        series: [Object]
      },
      options4: {
        title: {
          text: "推荐人-销售额($)",
          left:10
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          selectedMode: "single",
          data: ["1个月新品", "3个月新品", "6个月新品"],
          selected: {
            "1个月新品": true,
            "3个月新品": false,
            "6个月新品": false
          }
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar", "stack", "tiled"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [String]
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value} $"
            }
          }
        ],
        series: [Object]
      },
      options5: {
        title: {
          text: "开发员-新品款数(个)",
          left:10
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          selectedMode: "single",
          data: ["1个月新品", "3个月新品", "6个月新品"],
          selected: {
            "1个月新品": true,
            "3个月新品": false,
            "6个月新品": false
          }
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar", "stack", "tiled"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [String]
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value} $"
            }
          }
        ],
        series: [Object]
      },
      options6: {
        title: {
          text: "推荐人-推荐成功款数(个)",
          left:10
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          selectedMode: "single",
          data: ["1个月新品", "3个月新品", "6个月新品"],
          selected: {
            "1个月新品": true,
            "3个月新品": false,
            "6个月新品": false
          }
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar", "stack", "tiled"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [String]
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value} $"
            }
          }
        ],
        series: [Object]
      }
    };
  },
  methods: {
    dexz() {
      var selectAll = this.options1.legend.data;
      if (this.defaultay == "全不选") {
        var val = false;
        this.defaultay = "全选";
      } else {
        var val = true;
        this.defaultay = "全不选";
      }
      var obj = {};
      for (var key in selectAll) {
        obj[selectAll[key]] = val;
      }
      this.options1.legend.selected = obj;
      let or1 = this.$echarts.init(this.$refs.or1);
      or1.setOption(this.options1);
    },
    getData() {
      this.listLoading = true;
      APIDevData().then(response => {
        this.listLoading = false;
        var devdata = [];
        var saledata = [];
        var dataPerDay = response.data.data.dataPerDay;
        for (var i = 0; i < dataPerDay.length; i++) {
          if (dataPerDay[i].type == "dev") {
            devdata.push(dataPerDay[i]);
          } else if (dataPerDay[i].type == "art") {
            saledata.push(dataPerDay[i]);
          }
        }
        const lineName = [];
        const series = [];
        devdata.forEach(element => {
          if (lineName.indexOf(element.username) < 0) {
            lineName.push(element.username);
          }
        });
        const date = [];
        lineName.forEach(name => {
          const sery = {
            type: "line",
            areaStyle: { normal: {} },
            stack: "总量"
          };
          const amt = [];
          devdata.map(element => {
            if (element.username === name) {
              amt.push(Number(element.num));
              if (date.indexOf(element.createDate) < 0) {
                date.push(element.createDate);
              }
            }
          });
          sery["data"] = amt;
          sery["name"] = name;
          series.push(sery);
        });
        this.options1.legend.data = lineName;
        this.options1.xAxis[0].data = date;
        this.options1.series = series;
        this.options1.yAxis[0].axisLabel.formatter = "{value}";
        let or1 = this.$echarts.init(this.$refs.or1);
        or1.setOption(this.options1);
        this.showis=true
        //开发员销售额
        var devlopMoney = response.data.data.dataAmt;
        var dm1 = [];
        var dm2 = [];
        var dm3 = [];
        var dname=[]
        for (var i = 0; i < devlopMoney.length; i++) {
          if (devlopMoney[i].type == "dev") {
            dm1.push(devlopMoney[i].amtOne);
            dm2.push(devlopMoney[i].amtThr);
            dm3.push(devlopMoney[i].amtSix);
            dname.push(devlopMoney[i].username)
          }
        }
        var dData = [
          {
            name: "1个月新品",
            type: "bar",
            data: dm1
          },
          {
            name: "3个月新品",
            type: "bar",
            data: dm2
          },
          {
            name: "6个月新品",
            type: "bar",
            data: dm3
          }
        ];
        this.options3.xAxis[0].data = dname;
        this.options3.series = dData;
        this.options3.yAxis[0].axisLabel.formatter = "{value}";
        let or3 = this.$echarts.init(this.$refs.or3);
        or3.setOption(this.options3);
        //推荐人销售额
        var tevlopMoney = response.data.data.dataAmt;
        var tm1 = [];
        var tm2 = [];
        var tm3 = [];
        var tname=[]
        for (var i = 0; i < tevlopMoney.length; i++) {
          if (tevlopMoney[i].type == "int") {
            tm1.push(tevlopMoney[i].amtOne);
            tm2.push(tevlopMoney[i].amtThr);
            tm3.push(tevlopMoney[i].amtSix);
            tname.push(tevlopMoney[i].username)
          }
        }
        var tData = [
          {
            name: "1个月新品",
            type: "bar",
            data: tm1
          },
          {
            name: "3个月新品",
            type: "bar",
            data: tm2
          },
          {
            name: "6个月新品",
            type: "bar",
            data: tm3
          }
        ];
        this.options4.xAxis[0].data = tname;
        this.options4.series = tData;
        this.options4.yAxis[0].axisLabel.formatter = "{value}";
        let or4 = this.$echarts.init(this.$refs.or4);
        or4.setOption(this.options4);
        //开发推荐个数
        var devlopTj = response.data.data.dataAmt;
        var dt1 = [];
        var dt2 = [];
        var dt3 = [];
        var dtname=[]
        for (var i = 0; i < devlopTj.length; i++) {
          if (devlopTj[i].type == "dev") {
            dt1.push(devlopTj[i].devNumOne);
            dt2.push(devlopTj[i].devNumThr);
            dt3.push(devlopTj[i].devNumSix);
            dtname.push(devlopTj[i].username)
          }
        }
        var dtData = [
          {
            name: "1个月新品",
            type: "bar",
            data: dt1
          },
          {
            name: "3个月新品",
            type: "bar",
            data: dt2
          },
          {
            name: "6个月新品",
            type: "bar",
            data: dt3
          }
        ];
        this.options5.xAxis[0].data = dtname;
        this.options5.series = dtData;
        this.options5.yAxis[0].axisLabel.formatter = "{value}";
        let or5 = this.$echarts.init(this.$refs.or5);
        or5.setOption(this.options5);
        //推荐推荐个数
         var tevlopTj = response.data.data.dataAmt;
        var tt1 = [];
        var tt2 = [];
        var tt3 = [];
        var ttname=[]
        for (var i = 0; i < tevlopTj.length; i++) {
          if (tevlopTj[i].type == "int") {
            tt1.push(tevlopTj[i].devNumOne);
            tt2.push(tevlopTj[i].devNumThr);
            tt3.push(tevlopTj[i].devNumSix);
            ttname.push(tevlopTj[i].username)
          }
        }
        var ttData = [
          {
            name: "1个月新品",
            type: "bar",
            data: tt1
          },
          {
            name: "3个月新品",
            type: "bar",
            data: tt2
          },
          {
            name: "6个月新品",
            type: "bar",
            data: tt3
          }
        ];
        this.options6.xAxis[0].data = ttname;
        this.options6.series = ttData;
        this.options6.yAxis[0].axisLabel.formatter = "{value}";
        let or6 = this.$echarts.init(this.$refs.or6);
        or6.setOption(this.options6);
      });
    },
    getData1() {
      this.listLoading = true;
      APIDevData().then(response => {
        this.listLoading = false;
        var saledata = [];
        var devdata = [];
        var dataPerDay = response.data.data.dataPerDay;
        for (var i = 0; i < dataPerDay.length; i++) {
          if (dataPerDay[i].type == "dev") {
            devdata.push(dataPerDay[i]);
          } else if (dataPerDay[i].type == "art") {
            saledata.push(dataPerDay[i]);
          }
        }
        const lineName = [];
        const series = [];
        saledata.forEach(element => {
          if (lineName.indexOf(element.username) < 0) {
            lineName.push(element.username);
          }
        });
        const date = [];
        lineName.forEach(name => {
          const sery = {
            type: "line",
            areaStyle: { normal: {} },
            stack: "总量"
          };
          const amt = [];
          saledata.map(element => {
            if (element.username === name) {
              amt.push(Number(element.num));
              if (date.indexOf(element.createDate) < 0) {
                date.push(element.createDate);
              }
            }
          });
          sery["data"] = amt;
          sery["name"] = name;
          series.push(sery);
        });
        this.options2.legend.data = lineName;
        this.options2.xAxis[0].data = date;
        this.options2.series = series;
        this.options2.yAxis[0].axisLabel.formatter = "{value}";
        let or2 = this.$echarts.init(this.$refs.or2);
        or2.setOption(this.options2);
      });
    }
  },
  mounted() {
    this.getData();
    this.getData1();
  }
};
</script>

<style lang="scss">
.por{
    position: relative;
}
.poa{
    position: absolute;
    right: 12%;
    top: 15px;
}
</style>