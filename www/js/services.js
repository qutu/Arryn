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
