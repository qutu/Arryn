<template>
  <header class="scenic-header clearfix" 
    v-bind:style="{ 'background-image': cover }">
    <h1 class="scenic-title">{{ scenic.name }} <span class="level">{{ scenic.level }}A</span></h1>
    <a v-link="{ path: $route.path + '/map' }" class="scenic-map-button"><i class="material-icons">place</i></a>
  </header>
  <nav class="scenic-nav">
    <ul class="clearfix">
      <li class="spot-item"><a v-link="{ path: $route.path + '/spots' }">景点</a></li>
      <li class="facility-item"><a v-link="{ path: $route.path + '/facility' }">设施</a></li>
      <li class="tour-item"><a v-link="{ path: $route.path + '/tour' }">导览</a></li>
    </ul>
  </nav>
  <ad></ad>
  <section class="scenic-section">
    <h3 class="scenic-title">位置</h3>
    <p class="desc">{{ scenic.address }}</p>
  </section>
  <section class="scenic-section">
    <h3 class="scenic-title">简介</h3>
    <h4>开放时间</h4>
    <p class="desc">{{ scenic.open_time_desc }}</p>
    <h4>景点介绍</h4>
    <p class="desc">
      {{ scenic.text_intro }}
      <a @click="expand" class="read-more"
        v-if="showExpand(scenic.text_intro)">展开全文</a>
    </p>
  </section>
  <section class="scenic-section">
    <h3 class="scenic-title">交通</h3>
    <p class="desc">
      {{ scenic.traffic }}
      <a @click="expand" class="read-more"
        v-if="showExpand(scenic.traffic)">展开全文</a>
    </p>
  </section>
  <section class="scenic-section" 
    v-if="photos.length">
    <h3 class="scenic-title" @click="goto()">相册</h3>
    <div class="photos clearfix">
      <div class="scenic-photo-thumbnail" v-for="photo in photos">
        <img v-bind:src="photo" alt="">
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
        scenic: {},
        cover: null,
        photos: []
      }
    },

    created() {
      Get(`scenics/${this.$route.params.id}`)
        .then(result => {
          this.scenic = result

          if (result.main_img_url)
            this.cover = `url(${result.main_img_url})`

          if (result.photos)
            this.photos = result.photos.split(';')
        })
        .catch(err => 
          this.err = err)
    },

    methods: {
      showExpand(s) {
        return s && s.length > 100
      },
      expand(e) {
        const desc = e.target.parentElement
        desc.style.maxHeight = '200px'
        e.target.style.display = 'none'
      },
      goto() {
        this.$route.router.go(`/scenics/${this.$route.params.id}/photos`)
      }
    }
  }
</script>
