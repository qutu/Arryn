<template>
  <header class="scenic-header clearfix" 
    v-bind:style="{ 'background-image': cover }">
    <h1 class="scenic-title">{{ spot.name }}</h1>
    <a v-link="{ path: $route.path + '/map' }" class="scenic-map-button">Map</a>
    <a v-link="{ path: '../spots' }" class="back">&lt; Back</a>
  </header>
  <div id="spot-sp" class="spot-sp sp">AD</div>
  <section class="scenic-section">
    <span class="play-audio">语音解说</span>
    <audio v-bind:src="spot.voice_url" controls></audio>
  </section>
  <section class="scenic-section">
    <h3 class="scenic-title">简介</h3>
    <p class="desc">{{ spot.text_intro }}</p>
  </section>
  <section class="scenic-section" 
    v-if="photos" @click="goto()">
    <h3 class="scenic-title">相册</h3>
    <div class="photos clearfix">
      <div class="scenic-photo-thumbnail" v-for="photo in photos">
        <img v-bind:src="photo" alt="">
      </div>
    </div>
  </section>
  <section class="scenic-section" v-if="nearby">
    <h3 class="scenic-title">附近</h3>
    <div class="nearby clearfix">
      <div class="nearby-tab">
        <a href="#" class="nearby-tab-spot">景点</a>
        <a href="#" class="nearby-tab-shopping">设施</a>
      </div>
      <div class="nearby-list">
        <div class="spots cleafix">
          <div class="spot" v-for="spot in nearby" @click="goto(spot.id)">
            <div class="spot-thumbnail">
              <img v-bind:src="spot.main_img_url" alt="">
            </div>
            <div class="spot-text">
              <h4 class="spot-name">{{ spot.name }}</h4>
              <p class="spot-desc">{{ spot.text_intro | limit }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
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
        nearby: null,
        photos: [
          'http://ww2.sinaimg.cn/bmiddle/6b41b574jw1eymy6nwphjj20cz07mglt.jpg',
          'http://ww2.sinaimg.cn/bmiddle/6b41b574jw1eymy6nwphjj20cz07mglt.jpg',
          'http://ww2.sinaimg.cn/bmiddle/6b41b574jw1eymy6nwphjj20cz07mglt.jpg',
        ],
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

          // Fetch nearby spots
          return Get(`spots/${this.spot.id}/nearby`)
        })
        .then(nearby => this.nearby = nearby)
        .catch(err => this.err = err)
    },
    methods: {
      goto(spotId) {
        this.$route.router.go(
          `/scenics/${this.$route.params.id}/spots/${this.$route.params.spotId}/photos`
        )
      }
    }
  }
</script>