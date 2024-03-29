// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngResource', 'starter.controllers', 'starter.services'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)
      }
      if (window.StatusBar) {
        StatusBar.styleDefault()
      }
    })
  })

  .config(function ($provide, $stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    $provide.value('apiRoot', 'http://api.byin.cc/')
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      .state('home', {
        url: '/',
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      })

      .state('scenic', {
        url: '/scenics/:scenic_id',
        abstract: true,
        templateUrl: 'templates/spot.html'
      })

      .state('scenic.spot', {
        url: '/spots/:spot_id',
        templateUrl: 'templates/spot.view.html',
        controller: 'SpotCtrl'
      })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/')

    $locationProvider.html5Mode(true)

    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json'
    $httpProvider.defaults.useXDomain = true
    delete $httpProvider.defaults.headers.common['X-Requested-With']})
