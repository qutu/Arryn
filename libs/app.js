'use strict';

// Global deps
import 'script!es6-promise-polyfill'
import 'script!whatwg-fetch'
import Vue from 'vue'
import app from '../components/app.vue'

// Local deps
import consts from './consts'

// App Styles
import '../css/app.css'

new Vue({
  el: 'body',
  components: {
    app,
  }
})