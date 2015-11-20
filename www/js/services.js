angular.module('starter.services', [])
  .factory('Scenic', function ($resource, apiRoot) {
    return $resource(apiRoot + 'scenics/:id', {}, {})
  })

  .factory('Spot', function ($resource, apiRoot) {
    // Might use a resource here that returns a JSON array
    return $resource(apiRoot + 'spots/:id', {}, {})
  })

  .factory('ScenicSpot', function ($resource, apiRoot) {
    return $resource(apiRoot + 'scenics/:scenic_id/spots/:spot_id', {}, {})
  })

  .factory('SpotPhoto', function ($resource, apiRoot) {
    return $resource(apiRoot + 'spots/:spot_id/photos/:photo_id', {}, {})
  })
