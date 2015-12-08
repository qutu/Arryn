<template>
  <header class="sub-header">
    <a v-link="{ path: goBack() }" class="back">&lt; {{name}}</a>
  </header>
  <section class="scenic-section photos-section">
    <div class="photos clearfix">
      <div class="scenic-photo-thumbnail" v-for="photo in photos">
        <img v-bind:src="photo.src" alt="">
      </div>
    </div>
  </section>
</template>

<script>
  import { Get } from '../libs/api'

  export default {
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

          if (result.photos)
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
      }
    }
  }
</script>