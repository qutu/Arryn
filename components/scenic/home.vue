<template>
  <header class="scenic-header clearfix" 
    v-bind:style="{ 'background-image': cover }">
    <h1 class="scenic-title">{{ scenic.name }} <span class="level">{{ scenic.level }}A</span></h1>
    <a v-link="{ name: 'map', params: { id: $route.params.id } }" class="scenic-map-button"><i class="material-icons">place</i></a>
  </header>
  <nav class="scenic-nav">
    <ul class="clearfix">
      <li class="spot-item"><a v-link="{ name: 'spots', params: { id: $route.params.id }}">景点</a></li>
      <li class="facility-item"><a v-link="{ name: 'facility', params: { id: $route.params.id } }">设施</a></li>
      <li class="tour-item"><a v-link="{ name:'tour', params: { id: $route.params.id } }">导览</a></li>
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
    <h3 class="scenic-title" 
      @click="goto()">相册</h3>
    <div class="photos clearfix">
      <div class="scenic-photo-thumbnail" 
        @click="openSwipe(photo)"
        v-for="photo in photos">
        <img :src="photo.src" alt="">
      </div>
    </div>
  </section>
  <swipe></swipe>
</template>

<script>
  import { Get } from '../../libs/api'
  import { formatPhotos, openSwipe } from '../../libs/utils'
  import ad from '../ad.vue'
  import swipe from '../swipe.vue'

  export default {
    name: 'ScenicHome',
    components: {
      ad,
      swipe
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
        .then(({result}) => {
          this.scenic = result

          document.title = this.scenic.name

          if (result.main_img_url)
            this.cover = `url(${result.main_img_url})`

          if (result.all_photos)
            this.photos = result.all_photos
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
        desc.style.maxHeight = '3000px'
        e.target.style.display = 'none'
      },
      goto() {
        this.$route.router.go(`/scenics/${this.$route.params.id}/photos`)
      },
      openSwipe(currentPhoto) {
        return openSwipe(currentPhoto, this.photos)
      }
    }
  }
</script>
