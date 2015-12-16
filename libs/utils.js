import Photoswipe from 'photoswipe'

export default {
  formatPhotos,
  openSwipe,
}

function formatPhotos(photos) {
  return photos.split(';').map(uri => { 
    return { 
      src: uri,
      // Hardcode here!
      w: 640,
      h: 426
    }
  })
}

function openSwipe(currentPhoto, photos) {
  const index = currentPhoto ? photos.indexOf(currentPhoto) : 0
  const gallery = new Photoswipe(
    document.getElementById('pswp'), 
    window.PhotoSwipeUI_Default, 
    photos, {
    history: false,
    focus: false,
    loop: true,
    showAnimationDuration: 0,
    hideAnimationDuration: 0,
    index,
  })
  gallery.init() 
}