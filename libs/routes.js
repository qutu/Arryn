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
        component: scenicHome
      },
      '/facility': {
        component: scenicSpotsFacility
      },
      '/photos': {
        component: photos
      },
      '/map': {
        component: map
      },
      '/tour': {
        component: tour
      },
      '/spots': {
        component: {
          template: '<router-view></router-view>'
        },
        subRoutes: {
          '/': {
            component: scenicSpots,
          },
          '/:spotId': {
            component: spot,
            subRoutes: {
              '/': {
                component: spotHome
              },
              '/photos': {
                component: photos
              },
              '/map': {
                component: map
              }
            }
          }
        }
      }
    }
  }
}