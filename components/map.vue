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
          const map = this.map = mapinfo
          const $map = this.$map = new BMap.Map('map-section')
          const $centerPoint = new BMap.Point(map.y_coordinate, map.x_coordinate)
          const $centerMarker = new BMap.Marker($centerPoint)

          // Zoom to 15
          $map.centerAndZoom($centerPoint, 18)
  
          // Add a center point
          $map.addOverlay($centerMarker)

          // Search all spots x,y
          if (!spotId)
            return Get(`scenics/${this.$route.params.id}/spots`) 

          // var options = {
          //   renderOptions: {
          //     map: $map
          //   },
          //   onSearchComplete: results => {
          //     console.log('Search Completed')
          //     console.log(results)
          //   }
          // }

          // var localSearch = new BMap.LocalSearch($map, options)

          // // Search nearby spots on Baidu Map
          // localSearch.searchNearby(map.name, $centerPoint, map.baidu_radius, {
          //   customData: {
          //     geotableId: map.geotable_id
          //   }
          // })
        })
        .then(spots => {
          spots.forEach(spot => {
            var point = new BMap.Point(spot.y_coordinate, spot.x_coordinate)
            var marker = new BMap.Marker(point)
            marker.addEventListener('click', () => this.$route.router.go(`/scenics/${this.$route.params.id}/spots/${spot.id}`))
            this.$map.addOverlay(marker)
          })
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