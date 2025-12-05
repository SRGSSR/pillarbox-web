import videojs from 'video.js';

/**
 * Patch the built-in Video.js logger to prepend a local-timezone timestamp
 * to every log message using a locale string to ensures timestamps align
 * naturally with what the user sees on their device.
 *
 * The output is in swedish because the Swedish locale an ISO-like date format:
 * `YYYY-MM-DD HH:mm:ss`.
 */

videojs.log = new Proxy(videojs.log, {
  apply(target, thisArg, args) {
    return target.apply(thisArg, [new Date().toLocaleString('sv'), ...args]);
  },
  get(target, prop, receiver) {
    const value = Reflect.get(target, prop, receiver);

    if (['debug', 'warn', 'error'].includes(prop) && typeof value === 'function') {
      return function (...args) {
        return value.call(target, new Date().toLocaleString('sv'), ...args);
      };
    }

    return value;
  }
});

