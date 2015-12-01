<template>
  <div class="scenic">
    <header class="scenic-header clearfix" 
      v-bind:style="{ 'background-image': cover }">
      <h1 class="scenic-title">{{ scenic.name }} <span class="level">{{ scenic.level }}A</span></h1>
      <a v-link="{ path: $route.path + '/map' }" class="scenic-map-button">Map</a>
    </header>
    <nav class="scenic-nav">
      <ul class="clearfix">
        <li class="spot"><a v-link="{ path: $route.path + '/spots' }">景点</a></li>
        <li class="shopping"><a v-link="{ path: $route.path + '/shopping' }">消费</a></li>
        <li class="tour"><a v-link="{ path: $route.path + '/tour' }">导览</a></li>
      </ul>
    </nav>
    <div class="scenic-sp"></div>
    <section class="scenic-section">
      <h3 class="scenic-title">位置</h3>
      <p class="desc">{{ scenic.address }}</p>
    </section>
    <section class="scenic-section">
      <h3 class="scenic-title">简介</h3>
      <h4>开放时间</h4>
      <p class="desc">{{ scenic.open_time_desc }}</p>
      <h4>景点介绍</h4>
      <p class="desc">{{ scenic.text_intro }}</p>
    </section>
    <section class="scenic-section">
      <h3 class="scenic-title">交通</h3>
      <p class="desc">{{ scenic.traffic }}</p>
    </section>
    <section class="scenic-section" 
      v-if="scenic.photos">
      <h3 class="scenic-title">相册</h3>
      <div class="photos">{{ scenic.photos }}</div>
    </section>
  </div>
</template>

<script>
  import { Get } from '../libs/api'

  export default {
    data() {
      return {
        err: null,
        scenic: {},
        cover: null,
      }
    },
    created() {
      Get(`scenics/${this.$route.params.id}`)
        .then(result => {
          this.scenic = result

          if (result.main_img_url)
            this.cover = `url(${result.main_img_url})`
        })
        .catch(err => this.err = err)
    }
  }
</script>
