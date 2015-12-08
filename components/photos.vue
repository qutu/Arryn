<template>
  <header class="sub-header">
    <a v-link="{ path: goBack() }" 
      class="back"><i class="material-icons">chevron_left</i> {{name}}
    </a>
  </header>
  <section class="scenic-section photos-section">
    <div class="photos clearfix">
      <div class="scenic-photo-thumbnail" 
        @click="openSwipe(photo)"
        v-for="photo in photos">
        <img v-bind:src="photo.src" alt="">
      </div>
    </div>
  </section>
  <swipe></swipe>
</template>

<script>
  import { Get } from '../libs/api'
  import swipe from './swipe.vue'
  import Photoswipe from 'photoswipe'

  export default {
    components: {
      swipe,
    },
    data() {
      return {
        err: null,
        name: '返回',
        photos: []
      }
    },
    created() {
      const spotId = this.$route.params.spotId
      const uri = !spotId ? 
        `scenics/${this.$route.params.id}` : 
        `scenics/${this.$route.params.id}/spots/${spotId}`;

      Get(uri)
        .then(result => {
          this.name = result.name

          // if this page is `/spot/photos`
          if (!!spotId)
            return Get(`spots/${spotId}/photos`)

          this.photos = result.photos
        })
        .then(photos => this.photos = photos)
        .catch(err => this.err = err)
    },
    methods: {
      goBack() {
        const spotId = this.$route.params.spotId
        return spotId ? 
          `/scenics/${this.$route.params.id}/spots/${spotId}` :
          `/scenics/${this.$route.params.id}`;
      },
      openSwipe(currentPhoto) {
        const index = currentPhoto ? this.photos.indexOf(currentPhoto) : 0
        const gallery = new Photoswipe(document.getElementById('pswp'), window.PhotoSwipeUI_Default, this.photos, {
          history: false,
          focus: false,
          loop: true,
          showAnimationDuration: 0,
          hideAnimationDuration: 0,
          index,
        })
        gallery.init()
      }
    }
  }
</script>