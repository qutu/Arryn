<template>
  <header class="scenic-header clearfix" 
    v-bind:style="{ 'background-image': cover }">
    <h1 class="scenic-title">{{ spot.name }} <span class="level">{{ spot.level }}A</span></h1>
    <a v-link="{ path: $route.path + '/map' }" class="scenic-map-button">Map</a>
  </header>
  <div id="spot-sp" class="spot-sp sp"></div>
  <section class="scenic-section">
    <a href="#" class="play-audio" data-uri={{ spot.voice_url }}>语音解说</a>
  </section>
  <section class="scenic-section">
    <h3 class="scenic-title">简介</h3>
    <p class="desc">{{ scenic.text_intro }}</p>
  </section>
  <section class="scenic-section" 
    v-if="spot.photos">
    <h3 class="scenic-title">相册</h3>
    <div class="photos">
      <div class="spot-thumbnails" v-for="photo in spot.photos">
        <img v-bind:src="photo" alt="" class="spot-thumbnail-item">
      </div>
    </div>
  </section>
  <section class="scenic-section">
    <h3 class="scenic-title">附近</h3>
  </section>
</template>

<script>
  import { Get } from '../../libs/api'

  export default {
    data() {
      return {
        err: null,
        spot: {},
        cover: null,
        photos: [],
      }
    },
    created() {
      Get(`scenics/${this.$route.params.id}/spots/${this.$route.params.spotId}`)
        .then(result => {
          this.spot = result

          if (result.main_img_url)
            this.cover = `url(${result.main_img_url})`
          if (result.photos)
            this.photos = result.photos.split(';')
        })
        .catch(err => this.err = err)
    }
  }
</script>