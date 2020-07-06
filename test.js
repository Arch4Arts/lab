'use strict';

const wrap = f => {
  let limit = 0;
  let counter = 0;
  let cancel = false;

  const wrapper = (...args) => {
    if (limit && counter === limit) wrapper.cancel();
    if (f && !cancel) {
      const res = f(...args);
      counter++;
      return res;
    }
  };

  wrapper.cancel = () => {
    cancel = true;
    return wrapper;
  };

  wrapper.continue = () => {
    cancel = false;
    return wrapper;
  };

  wrapper.timeout = msec => {
    setTimeout(() => {
      wrapper.cancel();
    }, msec);
    return wrapper;
  };

  wrapper.limit = count => {
    limit = count;
    return wrapper;
  };

  return wrapper;
};

// Usage

const fn = par => {
  console.log('Function called, par:', par);
};

const fn2 = wrap(fn).timeout(200).limit(4);
fn2('1st');

setTimeout(() => {
  fn2('2nd');
  fn2('3rd');
  fn2.cancel();
  fn2('4th');
  fn2.continue();
  fn2('5th');
}, 150);