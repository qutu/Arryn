import scenic from '../components/scenic.vue'
import scenicHome from '../components/scenic/home.vue'
import scenicSpots from '../components/scenic/spots.vue'
import scenicSpotsFacility from '../components/scenic/facility.vue'

import spot from '../components/spot.vue'
import spotHome from '../components/spot/home.vue'

import map from '../components/map.vue'
import tour from '../components/tour.vue'
import photos from '../components/photos.vue'

export default {
  '/scenics/:id': {
    component: scenic,
    subRoutes: {
      '/': {
        name: 'scenicHome',
        component: scenicHome
      },
      '/facility': {
        name: 'scenicFacility',
        component: scenicSpotsFacility
      },
      '/photos': {
        name: 'photos',
        component: photos
      },
      '/map': {
        name: 'map',
        component: map
      },
      '/tour': {
        mame: 'tour',
        component: tour
      },
      '/spots': {
        component: {
          template: '<router-view></router-view>'
        },
        subRoutes: {
          '/': {
            name: 'spots',
            component: scenicSpots,
          },
          '/:spotId': {
            component: spot,
            subRoutes: {
              '/': {
                name: 'spot',
                component: spotHome
              },
              '/photos': {
                name: 'spotPhotos',
                component: photos
              },
              '/map': {
                name: 'spotMap',
                component: map
              }
            }
          }
        }
      }
    }
  }
}