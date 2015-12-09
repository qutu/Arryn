<template>
  <header class="sub-header map-header">
    <a v-link="{ path: goBack() }" 
      class="back">
      <i class="material-icons">chevron_left</i>
    </a>
  </header>
  <section id="map-section" 
    class="map-section">
  </section>
</template>

<script>
  import fetchJsonp from 'fetch-jsonp'
  import { Get } from '../libs/api'
  import { ak } from '../libs/consts'

  export default {
    data() {
      return {
        err: null,
        map: {}
      }
    },
    data() {
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
          const geolocationControl = new BMap.GeolocationControl()

          // Zoom to 15
          $map.centerAndZoom($centerPoint, 18)

          // Add a center point
          $map.addOverlay($centerMarker)
          $map.addControl(geolocationControl)
          $centerMarker.setAnimation(window.BMAP_ANIMATION_BOUNCE)

          // Search all spots x,y
          if (!spotId)
            return Get(`scenics/${this.$route.params.id}/spots`)

          // Search the nearby spots
          fetchJsonp(`http://api.map.baidu.com/geosearch/v3/nearby?geotable_id=${map.geotable_id}&location=${map.y_coordinate},${map.x_coordinate}&radius=${map.baidu_radius}&ak=${ak}&callback=jsonp`)
            .then(res => res.json())
            .then(json => {
              if (json.status !== 0)
                throw new Error('Map error')
              
              this.addToMap(json.contents)
            })
            .catch(err => {

            })
        })
        .then(spots => this.addToMap(spots))
        .catch(err => this.err = err)
    },
    methods: {
      addToMap(spots) {
        spots.forEach(spot => {
          let y = spot.location ? spot.location[0] : spot.y_coordinate
          let x = spot.location ? spot.location[1] : spot.x_coordinate
          let point = new BMap.Point(y, x)
          let marker = new BMap.Marker(point)
          var label = new BMap.Label(spot.name || 'name', {
            position: point,
            offset: new BMap.Size(8, -28) // 设置文本偏移量
          })

          label.setStyle({
            color : "#fff",
            fontSize : "12px",
            height : "20px",
            lineHeight : "20px",
            borderColor: '#999',
            borderRadius: '10px',
            padding: '3px 8px',
            backgroundColor: '#000',
            opacity: '.8'
          })

          marker.addEventListener('click', () => {
            if (spot.spot_url) {
              window.location.href = spot.spot_url
              return
            }

            this.$route.router.go(`/scenics/${this.$route.params.id}/spots/${spot.id}`)
          })

          this.$map.addOverlay(marker)
          this.$map.addOverlay(label)
        })
      },
      goBack() {
        const spotId = this.$route.params.spotId
        return spotId ? 
          `/scenics/${this.$route.params.id}/spots/${spotId}` :
          `/scenics/${this.$route.params.id}`;
      }
    }
  }
</script>