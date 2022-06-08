<template>
  <view class="content">
   <qiun-data-charts 
      type="column"
      :opts="opts"
      :chart-data="chartData"
    />
  </view>
</template>

<script setup lang="ts">
import { reactive, toRefs, onMounted} from 'vue'

const state = reactive({
  chartData: {},
  opts: {
    xAxis: {
      disableGrid: true
    },
    yAxis: {
      data: [
        {
          min: 0
        }
      ]
    },
    extra: {
      column: {
        type: "group"
      }
    }
  }
})

const getServerData = ()=> {
  setTimeout(() => {
    //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
    let res = {
        categories: ["2016","2017","2018","2019","2020","2021"],
        series: [
          {
            name: "目标值",
            data: [35,36,31,33,13,34]
          },
          {
            name: "完成量",
            data: [18,27,21,24,6,28]
          }
        ]
      };
    state.chartData = JSON.parse(JSON.stringify(res));
  }, 500);
}

onMounted(() => {
  getServerData()
})

const {
  chartData,
  opts
} = toRefs(state)
</script>

<style scoped>
.charts-box {
    width: 100%;
    height: 300px;
  }
</style>
