<template>
  <div>
    <el-col :span="24" class="toolbar" style="padding:15px 25px;">
      <div class="floet">
        <div class="floet01">
          <span>扫描时间</span>
          <el-date-picker
            size="small"
            v-model="condition.createdTime"
            value-format="yyyy-MM-dd"
            type="daterange"
            align="right"
            clearable
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width:250px;margin-left:10px;"
            :picker-options="pickerOptions2"
          ></el-date-picker>
        </div>
        <div class="floet01">
          <el-button size="small" type="primary" @click="getData()">查询</el-button>
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
</template>

<script type="text/ecmascript-6">
import { APIPickStatistics } from "../../api/product";
import { getMenu } from "../../api/login";
import {
  compareUp,
  compareDown,
  getMonthDate,
  getNextDate
} from "../../api/tools";
export default {
  data() {
    return {
      listLoading: false,
      options1: {
        title: {
          text: "单品拣货统计",
          top:10
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
          width: "100%",
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
          text: "多品拣货统计",
          top:10
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
          width: "100%",
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
      },
      sty: {
        width: "100%",
        height: window.innerHeight - 130 + "px"
      },
      condition: {
        createdTime: []
      }
    };
  },
  methods: {
    getData() {
      this.listLoading = true;
      APIPickStatistics(this.condition).then(response => {
        this.listLoading = false;
        var saledata = response.data.data;
        var name = [];
        var data = [];
        var name1 = [];
        var data1 = [];
        for (var i = 0; i < saledata.length; i++) {
          if (saledata[i].type == "single") {
            name.push(saledata[i].picker);
            data.push(saledata[i].salesNum);
          } else {
            name1.push(saledata[i].picker);
            data1.push(saledata[i].salesNum);
          }
        }
        var sery = [
          {
            data: data,
            type: "bar"
          }
        ];
        var sery1 = [
          {
            data: data1,
            type: "bar"
          }
        ];
        
        this.options1.legend.data = name;
        this.options1.xAxis[0].data = name;
        this.options1.series = sery;
        this.options1.yAxis[0].axisLabel.formatter = "{value}";
        let or1 = this.$echarts.init(this.$refs.or1);
        or1.setOption(this.options1);
        this.options2.legend.data = name1;
        this.options2.xAxis[0].data = name1;
        this.options2.series = sery1;
        this.options2.yAxis[0].axisLabel.formatter = "{value}";
        let or2 = this.$echarts.init(this.$refs.or2);
        or2.setOption(this.options2);
      });
    }
  },
  mounted() {
    var startData = getMonthDate("lastMonth").end;
    var endData = getMonthDate("lastMonth").end;
    this.condition.createdTime = [
      getNextDate(startData, -1),
      getNextDate(endData, -1)
    ];
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
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
</style>

