'use strict';

// Global deps
import 'script!es6-promise-polyfill'
import 'script!whatwg-fetch'
import 'script!photoswipe'
import Vue from 'vue'
import VueRouter from 'vue-router'

// Local deps
import consts from './consts'
import routes from './routes'

// App Styles
import '../css/app.css'

Vue.use(VueRouter)

const router = new VueRouter()

router.map(routes)
router.start(new Vue({}), '#app')
