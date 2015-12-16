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
  import swipe from './swipe.vue'
  import { Get } from '../libs/api'
  import { formatPhotos, openSwipe } from '../libs/utils'

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
        .then(({result}) => {
          this.name = result.name

          // if this page is `/spot/photos`
          if (!!spotId)
            return Get(`spots/${spotId}/photos`)

          // hardcode here!
          this.photos = formatPhotos(result.all_photos)
        })
        .then(({result}) => this.photos = result)
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
        return openSwipe(currentPhoto, this.photos)
      }
    }
  }
</script>