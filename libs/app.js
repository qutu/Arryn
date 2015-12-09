'use strict';

// Global deps
import 'script!es6-promise-polyfill'
import 'script!whatwg-fetch'
import 'script!photoswipe/dist/photoswipe-ui-default.min.js'

import Vue from 'vue'
import VueRouter from 'vue-router'

// Local deps
import routes from './routes'
import { limit } from './filters'

// App Styles
import '../css/app.css'
import 'style/url!file!../node_modules/photoswipe/dist/default-skin/default-skin.css'

// install router
Vue.use(VueRouter)

// register filters globally
Vue.filter('limit', limit)

const router = new VueRouter()

router.map(routes)
router.beforeEach(() => window.scrollTo(0, 0))
router.start(new Vue({}), '#app')
