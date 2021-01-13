<template>
  <div>
    <echarts v-bind:options="chartsOptions" v-bind:area="area"></echarts>
  </div>
</template>

<script>
export default {
  data() {
    return {
      area: "",
      chartsOptions: {
        tooltip: {},
        legend: { data: ["价格"] },
        xAxis: { data: ["北京", "上海", "深圳"] },
        yAxis: {},
        series: {
          name: "价格",
          type: "bar",
          data: [
            { _area: "北京", value: 0.19673821546264803 },
            { _area: "上海", value: 12.841810854861977 },
            { _area: "深圳", value: 12.064078596403768 }
          ]
        }
      }
    };
  }
};
</script>