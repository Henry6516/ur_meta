<template>
  <div class="case" :style="styObj">
    <a class="aba">
      距离活动结束还有
      <span class="abspan">60</span>秒
    </a>
    <div class="echartCase" ref="or1" :style="styheight"></div>
  </div>
</template>
<script type="text/ecmascript-6">
import axios from "axios";
import { formRefuseReport } from "../api/product";
import echarts from "echarts";
export default {
  data() {
    return {
      styObj: {
        width: "100%",
        height: window.innerHeight + "px"
      },
      styheight: {
        height: window.innerHeight - 150 + "px"
      },
      timer: null,
      options1: {
        // title: {
        //   text: "距离活动结束还剩60秒",
        //    x:'center',
        //    top:30,
        //   textStyle: {
        //     //文字颜色
        //     color: "#fff",
        //     //字体风格,'normal','italic','oblique'
        //     fontStyle: "normal",
        //     //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
        //     fontWeight: "normal",
        //     //字体系列
        //     fontFamily: "sans-serif",
        //     //字体大小
        //     fontSize: 22
        //   }
        // },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: [],
          splitLine: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: 14
            }
          }
        },
        yAxis: {
          type: "value",
          show: false,
          splitLine: {
            //网格线
            show: false
          }
        },
        series: [
          {
            data: [],
            type: "bar",
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "#fff",
                    fontSize: 18
                  },
                  formatter: function(params) {
                    if (params.value == 0) {
                      return "";
                    } else {
                      return params.value;
                    }
                  }
                },
                barBorderRadius: [100, 100, 100, 100],
                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#fbc500" // 0% 处的颜色
                  },
                  {
                    offset: 0.5,
                    color: "#fbc500" // 100% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#fbc500" // 100% 处的颜色
                  }
                ]), //背景渐变色
                lineStyle: {
                  // 系列级个性化折线样式
                  width: 4,
                  type: "solid",
                  color: "#fbc500"
                }
              },
              emphasis: {
                color: "#fbc500",
                lineStyle: {
                  // 系列级个性化折线样式
                  width: 4,
                  type: "dotted",
                  color: "#fbc500" //折线的颜色
                }
              }
            }, //线条样式
            barWidth: "45" //折线点的大小
          }
        ]
      }
    };
  },
  destroyed: function() {},
  methods: {
    getDataGl() {
      var that=this
      axios
        .get("https://shake.shyouranindustry.com/user/login/list", {})
        .then(function(res) {
          var tabledatagl = res.data.data.userInfo;
          var name = [];
          var data = [];
          for (var i = 0; i < tabledatagl.length; i++) {
            name.push(tabledatagl[i].nickName);
            data.push(tabledatagl[i].num);
          }
          that.options1.xAxis.data = name;
          that.options1.series[0].data = data;
          let or1 = that.$echarts.init(that.$refs.or1);
          or1.setOption(that.options1);
        })
        .catch(function(error) {

        });
      // formRefuseReport(this.condition2).then(res => {
      //   var tabledatagl = res.data.data.refuse;
      //   var name = [];
      //   var data = [];
      //   for (var i = 0; i < tabledatagl.length; i++) {
      //     name.push(tabledatagl[i].refuse);
      //     data.push(tabledatagl[i].num);
      //   }
      //   this.options1.xAxis.data = name;
      //   this.options1.series[0].data = data;
      //   let or1 = this.$echarts.init(this.$refs.or1);
      //   or1.setOption(this.options1);
      // });
    }
  },
  created() {
    this.getDataGl();
    this.timer = setInterval(() => {
      this.getDataGl();
    }, 1000);
  }
};
</script>
<style lang="scss" scoped>
.abspan {
  font-size: 36px;
  color: #fbc500;
  margin: 0px 5px;
}
.aba {
  position: absolute;
  left: 0;
  color: #fff;
  width: 100%;
  text-align: center;
  top: 100px;
  font-size: 22px;
  letter-spacing: 5px;
}
.caseTop {
  width: 100%;
  overflow: hidden;
  background: #409eff;
}
.page-container {
  font-size: 20px;
  text-align: center;
  line-height: 60px;
  color: #fff;
  letter-spacing: 2px;
  padding: 0;
  margin: 0;
}
.case {
  background: url(../assets/jjbg.jpg) no-repeat center;
  background-size: cover;
}
.echartCase {
  width: 85%;
  background: rgba(0, 0, 0, 0.1) !important;
  box-shadow: 0 5px 50px 10px rgba(255, 255, 255, 0.1);
  position: fixed !important;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
}
.title {
  position: fixed;
  z-index: 999;
  color: #fff;
}
</style>