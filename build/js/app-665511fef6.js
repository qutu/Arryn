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
        url: '/scenic/:scenic_id',
        abstract: true,
        templateUrl: 'templates/spot.html'
      })

      .state('scenic.spot', {
        url: '/spot/:spot_id',
        templateUrl: 'templates/spot.view.html',
        controller: 'SpotCtrl'
      })

    // .state('scenic.spot.view', {
      //   url: '/',
      //   templateUrl: 'templates/spot.view.html',
      //   controller: 'SpotCtrl'
      // })

    // .state('poi.gallery', {
      //   url: '/gallery',
      //   templateUrl: 'templates/poi.gallery.html',
      //   controller: 'PoiGalleryCtrl'
      // })

    // .state('poi.photo', {
      //   url: '/photo/:photo_id',
      //   templateUrl: 'templates/poi.photo.html',
      //   controller: 'PoiPhotoCtrl'
      // })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/')

    $locationProvider.html5Mode(true)

    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json'
    $httpProvider.defaults.useXDomain = true
    delete $httpProvider.defaults.headers.common['X-Requested-With']})

angular.module('starter.controllers', [])

  .controller('HomeCtrl', function ($scope, $stateParams) {
    console.log('home')

  })

  .controller('SpotCtrl', function ($scope, $stateParams, $sce, Scenic, Spot, ScenicSpot, SpotPhoto) {
    $scope.scenic = Scenic.get({id: $stateParams.scenic_id})
    ScenicSpot.get(
      {
        scenic_id: $stateParams.scenic_id,
        spot_id: $stateParams.spot_id
      },
      function(data){
        data.main_img_url = data.main_img_url + '?imageView2/2/w/' + parseInt(window.innerWidth)
        $scope.spot = data

        $scope.voice_url = function () {
          return $sce.trustAsResourceUrl($scope.spot.voice_url)
        }
      })
    SpotPhoto.query(
      {spot_id: $stateParams.spot_id},
      function(data){
        for (var i = data.length - 1; i >= 0; i--) {
          data[i].msrc = data[i].src + '?imageView2/2/w/' + parseInt((window.innerWidth -12) /3)
        };
        $scope.photos = data
      })

    var pswpElement = document.querySelectorAll('.pswp')[0]

    $scope.view = function (index) {
      var options = {
        history: false,
        shareEl: false,
        // focus: false,
        index: index,// I can verify that 0,1,2,3 all load up correctly for an initial load
      // showAnimationDuration: 0,
      // hideAnimationDuration: 0
      }
      var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, $scope.photos, options)
      gallery.init()
    }

    $scope.audio_control = 'play'
    $scope.control = function () {
      var audio = document.getElementById('audio')
      if (audio.paused) {
        audio.play()
        $scope.audio_control = 'play'
      } else {
        audio.pause()
        $scope.audio_control = 'pause'
      }
    }
  })

  .controller('PoiGalleryCtrl', function ($scope, $stateParams) {})

  .controller('PoiPhotoCtrl', function ($scope, $state, $stateParams, $window) {})

angular.module('starter.services', [])
  .factory('Scenic', function ($resource, apiRoot) {
    return $resource(apiRoot + 'scenic/:id', {}, {})
  })

  .factory('Spot', function ($resource, apiRoot) {
    // Might use a resource here that returns a JSON array
    return $resource(apiRoot + 'spot/:id', {}, {})
  })

  .factory('ScenicSpot', function ($resource, apiRoot) {
    return $resource(apiRoot + 'scenic/:scenic_id/spot/:spot_id', {}, {})
  })

  .factory('SpotPhoto', function ($resource, apiRoot) {
    return $resource(apiRoot + 'spot/:spot_id/photos/:photo_id', {}, {})
  })
