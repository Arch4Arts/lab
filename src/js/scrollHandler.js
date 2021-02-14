import localforage from 'localforage';

const getScrollPos = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  localStorage.setItem('scrollPosition', scrollTop);
}
const setScrollPos = () => localforage.getItem('scrollPosition').then((y) => window.scrollTo(0, y));

addEventListener('beforeunload', getScrollPos);
addEventListener('DOMContentLoaded', setScrollPos);
