<template>
  <!-- todo: this scenic.header component would be repeated -->
  <header class="scenic-header clearfix" 
    v-bind:style="{ 'background-image': cover }">
    <h1 class="scenic-title">{{ scenic.name }} <span class="level">{{ scenic.level }}A</span></h1>
    <a v-link="{ path: '/scenics/' + $route.params.id + '/map' }" class="scenic-map-button"><i class="material-icons">place</i></a>
  </header>
  <nav class="scenic-nav">
    <ul class="clearfix">
      <li class="spot-item"><a v-link="{ path: '/scenics/' + $route.params.id + '/spots' }">景点</a></li>
      <li class="facility-item"><a v-link="{ path: '/scenics/' + $route.params.id + '/facility' }">设施</a></li>
      <li class="tour-item"><a v-link="{ path: $route.path }">导览</a></li>
    </ul>
  </nav>
  <section class="scenic-section section-tour">
    <img v-bind:src="scenic.guidemap_url" alt="">
  </section>
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
        .then(({result}) => {
          this.scenic = result

          if (result.main_img_url)
            this.cover = `url(${result.main_img_url})`
        })
        .catch(err => this.err = err)
    }
  }
</script>