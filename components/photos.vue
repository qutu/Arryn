<template>
  <header class="sub-header">
    <a v-link="{ path: goBack() }" class="back">&lt; {{name}}</a>
  </header>
  <section class="scenic-section photos-section">
    <div class="photos clearfix">
      <div class="scenic-photo-thumbnail" v-for="photo in scenic.photos">
        <img v-bind:src="photo" alt="">
      </div>
    </div>
  </section>
</template>

<script>
  import { Get } from '../libs/api'
  import { testPhotos } from '../libs/consts'

  export default {
    data() {
      return {
        err: null,
        name: '返回',
        scenic: {
          photos: testPhotos
        }
      }
    },
    created() {
      Get(`scenics/${this.$route.params.id}`)
        .then(result => {
          if (result.photos)
            this.scenic.photos = result.photos
          if (this.$route.params.spotId)
            return Get(`scenics/${this.$route.params.id}/spots/${this.$route.params.spotId}`)

          this.name = result.name
        })
        .then(spot => this.name = spot.name)
        .catch(err => this.err = err)
    },
    methods: {
      goBack() {
        const spotId = this.$route.params.spotId
        return spotId ? 
          `/scenics/${this.$route.params.id}/spots/${spotId}` :
          `/scenics/${this.$route.params.id}`;
      }
    }
  }
</script>