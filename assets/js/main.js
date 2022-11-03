import SwipeCarousel from './extra/swipe-carousel.js';

const carousel = new SwipeCarousel({
  containerID: '#carousel',
  interval: 2000,
  isPlaying: true
});
carousel.init();