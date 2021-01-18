import localforage from 'localforage';

localforage.getItem('scrollPosition').then((y) => window.scrollTo(0, y));

window.onbeforeunload = function() {
  // https://plainjs.com/javascript/styles/get-and-set-scroll-position-of-an-element-26/
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  localStorage.setItem('scrollPosition', scrollTop);
}
