<template>
  <div class="item agriculture">
    <h3>猪肉价格查询器</h3>
    <label for="area">地名/区号</label>
    <input v-model="area" type="text" value="" id="area" />
    <div class="price-area">
      <h4>{{ area }}猪肉价格:</h4>
      <span>(测算时间：{{ date() }})</span>
      <echarts v-bind:options="chartsOptions" v-bind:area="area"></echarts>
      <hr />
      <Echarts></Echarts>
    </div>
  </div>
</template>

<script>
/**
 * @file feed流单图item
 * @author ld
 */
import Echarts from "./Echarts.vue";
export default {
  data() {
    return {
      area: "北京",
      infos: []
    };
  },
  components: { Echarts },
  created() {
    const debounce = this.createDebounce(area => {
      this.requestPrice(area);
    }, 3000);

    this.requestPrice(this.area);

    this.$watch("area", area => debounce(area));
  },

  computed: {
    chartsOptions() {
      return {
        tooltip: {},
        legend: {
          data: ["价格"]
        },
        xAxis: {
          data: this.infos.map(info => info.area)
        },
        yAxis: {},
        series: {
          name: "价格",
          type: "bar",
          data: this.infos.map(info => ({
            _area: info.area,
            value: info.price
          }))
        }
      };
    }

    // date() {
    //     const date = new Date;
    //     return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    // }
  },

  methods: {
    date() {
      const date = new Date();
      return (
        date.getFullYear() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getDate() +
        "/" +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds()
      );
    },

    requestPrice(area) {
      fetch(`/price?area=${area}`)
        .then(res => {
          // 这里的 res 是 Response 对象，需要转换成json
          return res.json();
        })
        .then(res => {
          this.infos = res.infos;
        });
    }
  }
};
</script>

<style scoped>
@import "./index.css";
h3 {
  font-size: 17px;
  font-weight: normal;
  margin: 0 0 1em 0;
}

input,
button {
  font-size: 17px;
}

.price-area {
  min-height: 170px;
}

span {
  font-size: 12px;
}
</style>
