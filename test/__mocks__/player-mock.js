import * as mediaData from '../__mocks__/mediaData.json';

let playerMock = jest.fn(() => ({
  audioTrack: jest.fn().mockReturnValue({}),
  audioTracks: jest.fn().mockReturnValue({}),
  buffered: jest.fn().mockReturnValue({ length: 0, start: jest.fn(), end: jest.fn() }),
  currentDimensions: jest.fn().mockReturnValue({ width: 1024, height: 768 }),
  currentSource: jest.fn().mockReturnValue(mediaData),
  currentTime: jest.fn().mockReturnValue(0),
  dispose: jest.fn(() => {
    document.dispatchEvent(new Event('dispose'));
  }),
  debug: jest.fn().mockReturnValue(false),
  duration: jest.fn().mockReturnValue(0),
  liveTracker: {
    atLiveEdge: jest.fn(),
    liveCurrentTime: jest.fn(),
    liveWindow: jest.fn(),
    options: jest.fn().mockReturnValue({
      trackingThreshold: 100,
    }),
    seekableStart: jest.fn(),
  },
  el: jest.fn(),
  ended: jest.fn(),
  error: jest.fn((err) => {
    document.dispatchEvent(new Event('error'));

    return err;
  }),
  getVideoPlaybackQuality: jest.fn().mockReturnValue({}),
  hasStarted: jest.fn(),
  muted: jest.fn(),
  play: jest.fn(() => {
    document.dispatchEvent(new Event('play'));
    document.dispatchEvent(new Event('playing'));
  }),
  pause: jest.fn(() => {
    document.dispatchEvent(new Event('pause'));
  }),
  paused: jest.fn(),
  playbackRate: jest.fn().mockReturnValue(1),
  on: jest.fn((evt, fn) => {
    if (!Array.isArray(evt)) {
      document.addEventListener(evt, fn);

      return;
    }

    evt.forEach(e => {
      document.addEventListener(e, fn);
    });
  }),
  off: jest.fn((evt, fn) => {
    document.removeEventListener(evt, fn);
  }),
  one: jest.fn((evt, fn) => {
    document.addEventListener(evt, fn, { once: true });
  }),
  reset: jest.fn(() => {
    document.dispatchEvent(new Event('playerreset'));
  }),
  seekable: jest.fn(),
  seeking: jest.fn(),
  tech: jest.fn().mockReturnValue({
    isCasting: undefined,
  }),
  textTrack: jest.fn().mockReturnValue(undefined),
  textTracks: jest.fn().mockReturnValue({}),
  trigger: jest.fn((evt) => {
    document.dispatchEvent(new Event(evt));
  }),
  scrubbing: jest.fn(),
  src: jest.fn(() => {
    document.dispatchEvent(new Event('emptied'));
  }),
  videoTracks: jest.fn().mockReturnValue({}),
  volume: jest.fn().mockReturnValue(1),
  eventBusEl_: true,
  options_: {},
}));

export default playerMock;
