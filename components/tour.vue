<template>
  <!-- todo: this scenic.header component would be repeated -->
  <header class="scenic-header clearfix" 
    :style="{ 'background-image': cover }">
    <h1 class="scenic-title">{{ scenic.name }} <span class="level">{{ scenic.level }}A</span></h1>
    <a v-link="{ name:'map', params: { id: $route.params.id } }" class="scenic-map-button"><i class="material-icons">place</i></a>
  </header>
  <nav class="scenic-nav">
    <ul class="clearfix">
      <li class="spot-item"><a v-link="{ name: 'spots', params: { id: $route.params.id } }">景点</a></li>
      <li class="facility-item"><a v-link="{ name: 'facility', params: { id: $route.params.id } }">设施</a></li>
      <li class="tour-item"><a v-link="{ name: 'tour', params: { id: $route.params.id } }">导览</a></li>
    </ul>
  </nav>
  <section class="scenic-section section-tour">
    <img :src="scenic.guidemap_url" alt="">
  </section>
</template>

<script>
  import { Get } from '../libs/api'

  export default {
    name: 'Tour',
    data() {
      return {
        err: null,
        scenic: null,
        cover: null,
      }
    },
    created() {
      Get(`scenics/${this.$route.params.id}`)
        .then(({result}) => {
          this.scenic = result

          if (result.main_img_url)
            this.cover = `url(${result.main_img_url})`
        })
        .catch(err => this.err = err)
    }
  }
</script>