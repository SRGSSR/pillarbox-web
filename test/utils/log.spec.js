import videojs from 'video.js';
import '../../src/utils/log.js';

const expectedTimestampRegexp = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

describe('videojs logger patch', () => {
  it('should prepend a locale timestamp to log', () => {
    videojs.log('hello', 'world');

    const [, timestamp, ...rest] = videojs.log.history().pop();

    expect(typeof timestamp).toBe('string');
    expect(timestamp).toMatch(expectedTimestampRegexp);
    expect(rest).toEqual(['hello', 'world']);
  });

  ['debug', 'warn', 'error'].forEach(level => {
    it(`should prepend a locale timestamp to ${level}`, () => {
      videojs.log[level]('hello', 'world');

      const [, , timestamp, ...rest] = videojs.log.history().pop();

      expect(typeof timestamp).toBe('string');
      expect(timestamp).toMatch(expectedTimestampRegexp);
      expect(rest).toEqual(['hello', 'world']);
    });
  });
});
