angular.module('starter.controllers', [])

  .controller('HomeCtrl', function ($scope, $stateParams) {
    console.log('home')

  })

  .controller('SpotCtrl', function ($scope, $stateParams, $sce, Scenic, Spot, ScenicSpot, SpotPhoto) {
    Scenic.get({id: $stateParams.scenic_id}, function(data){
      $scope.scenic = data;
    })
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
