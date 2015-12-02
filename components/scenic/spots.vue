<template>
  <header class="sub-header">
    <a v-link="{ path: '../' + $route.params.id }" class="back">&lt; Back</a>
  </header>
  <div class="spots cleafix">
    <div class="spot" v-for="spot in spots" @click="goto(spot.id)">
      <div class="spot-thumbnail">
        <img v-bind:src="spot.main_img_url" alt="">
      </div>
      <div class="spot-text">
        <h4 class="spot-name">{{ spot.name }}</h4>
        <p class="spot-desc">{{ spot.text_intro | limit }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { Get } from '../../libs/api'

  export default {
    filters: {
      limit(value) {
        return value.substr(0, 50) + '...'
      }
    },
    data() {
      return {
        err: null,
        spots: [],
      }
    },
    created() {
      Get(`scenics/${this.$route.params.id}/spots`)
        .then(result => this.spots = result)
        .catch(err => this.err = err)
    },
    methods: {
      goto(spotId) {
        this.$route.router.go(`/scenics/${this.$route.params.id}/spots/${spotId}`)
      }
    }
  }
</script>