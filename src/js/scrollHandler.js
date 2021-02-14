import localforage from 'localforage';

addEventListener('beforeunload', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  localStorage.setItem('scrollPosition', scrollTop);
});
addEventListener('DOMContentLoaded', () => localforage.getItem('scrollPosition').then((y) => window.scrollTo(0, y)));
