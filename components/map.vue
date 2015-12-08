<template>
  <header class="sub-header">
    <a v-link="{ path: goBack() }" 
      class="back">返回</a>
  </header>
  <section id="map-section" 
    class="map-section">
  </section>
</template>

<script>
  import { Get } from '../libs/api'

  export default {
    data() {
      return {
        err: null,
        map: {}
      }
    },
    created() {
      const BMap = window.BMap
      const spotId = this.$route.params.spotId
      const uri = !!spotId ? 
        `scenics/${this.$route.params.id}/spots/${spotId}` :
        `scenics/${this.$route.params.id}`; 

      Get(uri)
        .then(mapinfo => {
          this.map = mapinfo

          // 百度地图API功能
          var map = new BMap.Map('map-section')
          var point = new BMap.Point(this.map.y_coordinate, this.map.x_coordinate)

          map.centerAndZoom(point, 15)
  
          var marker = new BMap.Marker(new BMap.Point(116.404, 39.915)); // 创建点

          // 添加覆盖物
          map.addOverlay(marker)
        })
        .catch(err => this.err = err)
    },
    methods: {
      goBack() {
        const spotId = this.$route.params.spotId
        return spotId ? 
          `/scenics/${this.$route.params.id}/spots/${spotId}` :
          `/scenics/${this.$route.params.id}`;
      }
    }
  }
</script>