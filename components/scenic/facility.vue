<template>
  <header class="sub-header">
    <a v-link="{ path: '/scenics/' + $route.params.id }" class="back"><i class="material-icons">chevron_left</i> {{ name }}</a>
  </header>
  <div class="spots cleafix" 
    v-if="spots.length">
    <div class="spot" 
      v-for="spot in spots" 
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
  <div class="nearby-404" 
    v-if="!spots.length">暂无数据</div>
</template>

<script>
  import { Get } from '../../libs/api'

  export default {
    data() {
      return {
        name: '返回',
        err: null,
        spots: [],
      }
    },
    created() {
      // Fetch spots facilities
      Get(`scenics/${this.$route.params.id}/spots`, { type: 'f'})
        .then(({result}) => this.spots = result)
        .catch(err => this.err = err)

      // Fetch scenics name
      Get(`scenics/${this.$route.params.id}`)
        .then(({result}) => this.name = result.name)
        .catch(err => this.err = err)
    },
    methods: {
      goto(spotId) {
        this.$route.router.go(
          `/scenics/${this.$route.params.id}/spots/${spotId}`
        )
      }
    }
  }
</script>