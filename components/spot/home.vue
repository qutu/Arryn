<template>
  <header class="scenic-header clearfix" 
    v-bind:style="{ 'background-image': cover }">
    <h1 class="scenic-title">{{ spot.name }}</h1>
    <a v-link="{ path: $route.path + '/map' }" 
      class="scenic-map-button">
      <i class="material-icons">place</i>
    </a>
    <a v-link="{ path: '/scenics/' + $route.params.id + '/spots' }" 
      class="back">
      <i class="material-icons">chevron_left</i>
    </a>
  </header>
  <ad></ad>
  <section class="scenic-section">
    <span class="play-audio">语音解说</span>
    <audio v-bind:src="spot.voice_url" controls></audio>
  </section>
  <section class="scenic-section">
    <h3 class="scenic-title">简介</h3>
    <p class="desc">{{ spot.text_intro }}
      <a @click="expand" class="read-more"
        v-if="showExpand(spot.text_intro)">展开全文</a></p>
  </section>
  <section class="scenic-section" 
    v-if="photos" @click="goto()">
    <h3 class="scenic-title">相册</h3>
    <div class="photos clearfix">
      <div class="scenic-photo-thumbnail" 
        v-for="photo in photos">
        <img v-bind:src="photo.src" alt="">
      </div>
    </div>
  </section>
  <section class="scenic-section" v-if="nearby.length">
    <h3 class="scenic-title">附近</h3>
    <div class="nearby clearfix">
      <div class="nearby-tab">
        <a @click="changeTab('spot')" class="current nearby-tab-spot">景点</a>
        <a @click="changeTab('facility')" class="nearby-tab-facility">设施</a>
      </div>
      <div class="nearby-list">
        <div class="spots cleafix">
          <div class="spot" 
            v-for="spot in nearby" 
            @click="goto(spot.id)">
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
  import ad from '../ad.vue'

  export default {
    components: {
      ad
    },
    data() {
      return {
        err: null,
        spot: {},
        cover: null,
        nearby: [],
        photos: []
      }
    },
    route: {
      data() {
        Get(`scenics/${this.$route.params.id}/spots/${this.$route.params.spotId}`)
          // Fetch spot details
          .then(({result}) => {
            this.spot = result
            document.title = this.spot.name

            if (result.main_img_url)
              this.cover = `url(${result.main_img_url})`

            return Get(`spots/${this.spot.id}/nearby`)
          })
          // fetch photos
          .then(({result}) => {
            this.nearby = result 
            return Get(`spots/${this.$route.params.spotId}/photos`)
          })
          // Fetch nearby spots
          .then(({result}) => this.photos = result)
          .catch(err => this.err = err)
      },
      canReuse: false
    },
    methods: {
      showExpand(s) {
        return s && s.length > 100
      },
      expand(e) {
        const desc = e.target.parentElement
        desc.style.maxHeight = '3000px'
        e.target.style.display = 'none'
      },
      goto(spotId) {
        return this.$route.router.go({
          name: spotId ? 'spot' : 'spotPhotos',
          params: {
            id: this.$route.params.id,
            spotId: spotId || this.$route.params.spotId
          }
        })
      },
      // Change the source of nearby spots
      changeTab() {

      }
    }
  }
</script>