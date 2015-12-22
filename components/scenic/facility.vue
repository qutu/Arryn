<template>
  <header class="sub-header">
    <a v-link="{ name: 'scenic', params: { id: $route.params.id } }" class="back">
      <i class="material-icons">chevron_left</i> {{ name }}
    </a>
  </header>
  <div class="spots cleafix" 
    v-if="spots.length">
    <div class="spot" 
      v-for="spot in spots" 
      @click="goto(spot.id)">
      <div class="spot-thumbnail">
        <img :src="spot.main_img_url" alt="">
      </div>
      <div class="spot-text">
        <h4 class="spot-name">{{ spot.name }}</h4>
        <p class="spot-desc">{{ spot.text_intro | limit }}</p>
      </div>
    </div>
  </div>
  <div class="nearby-404" 
    v-if="!spots.length">暂无数据</div>
  <span id="load-more" 
    v-if="spots.length"
    class="load-more">{{ nomore ? '没有更多了': '加载中...'}}</span>
</template>

<script>
  import scrollMonitor from 'scrollmonitor'
  import { Get } from '../../libs/api'

  export default {
    name: 'Facility',
    data() {
      return {
        name: '返回',
        err: null,
        spots: [],
        nomore: false
      }
    },
    created() {
      // Fetch spots facilities
      Get(`scenics/${this.$route.params.id}/spots`, { s: 10, type: 'f'})
        .then(({total, result}) => {
          this.spots = result
          this.total = total
          this.page = 1

          setTimeout(() => {
            const $loadMore = document.getElementById('load-more')
            const loaderWatcher = scrollMonitor.create($loadMore)  

            loaderWatcher.enterViewport(() => {
              if (this.page >= this.total) {
                this.nomore = true
                return
              }

              const query = {
                s: 10,
                type: 'f',
                p: this.page + 1
              }

              Get(`scenics/${this.$route.params.id}/spots`, query)
                .then(({result}) => {
                  this.spots = this.spots.concat(result)
                  this.page ++
                })
                .catch(err => {})
            })
          }, 500)
        })
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