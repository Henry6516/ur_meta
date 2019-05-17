<template>
  <section class="chart-container">
    <el-row>
      <el-col :span="24">
        <div id="AreaStack"
             style="width:100%; height:500px;"></div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import echarts from 'echarts'

export default {
  props: {
    options: Object
  },
  data() {
    return {
      areaStack: null
    }
  },

  methods: {
    drawAreaStack(opt) {
      this.areaStack = echarts.init(document.getElementById('AreaStack'))
      this.areaStack.setOption(opt, true)
    },
    drawCharts() {
      //   this.drawAreaStack();
    }
  },

  mounted: function() {
    this.drawCharts()
  },
  updated: function() {
    this.drawCharts()
  }
}
</script>

<style scoped>
.chart-container {
  width: 100%;
  float: left;
}
.el-col {
  padding: 30px 20px;
}
</style>
