<template>
  <header class="sub-header">
    <a v-link="{ path: goBack() }" class="back">返回</a>
  </header>
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