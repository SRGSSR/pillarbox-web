import * as urn6735513 from './urn:rts:video:6735513.json';
import * as urn8414077 from './urn:rts:video:8414077.json';
import * as urn10272382 from './urn:rts:video:10272382.json';
import * as urn10313496 from './urn:rts:video:10313496.json';
import * as urn10342901 from './urn:rts:video:10342901.json';
import * as urn10348175 from './urn:rts:video:10348175.json';
import * as urn10373456 from './urn:rts:video:10373456.json';

const urns = {
  'urn:rts:video:6735513': urn6735513,
  'urn:rts:video:8414077': urn8414077,
  'urn:rts:video:10272382': urn10272382,
  'urn:rts:video:10313496': urn10313496,
  'urn:rts:video:10342901': urn10342901,
  'urn:rts:video:10348175': urn10348175,
  'urn:rts:video:10373456': urn10373456,
};

const fetch = jest.fn((url, onlyChapters) => {
  const urn = url
    .split('/')
    .pop()
    .split('?')[0];

  return Promise.resolve({
    ok: urns[urn] !== undefined,
    json() {
      if (urns[urn] === undefined || onlyChapters === '') {
        return Promise.reject(new Error(`${urn} mocked URN does not exist`));
      }

      return Promise.resolve(urns[urn]);
    },
  });
});

export default (global.fetch = fetch);
