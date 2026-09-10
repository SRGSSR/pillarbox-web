import Pillarbox from '../../src/pillarbox.js';
import '../../src/middleware/srgssr.js';

/**
 * Disposing a player while a source is being resolved leaves the middleware's
 * asynchronous continuation running against a released player. These tests use
 * a real player instead of a mock, as the crashes only occur once video.js has
 * actually released its references.
 */
describe('SrgSsr disposed player', () => {
  let player;
  let unhandledRejections;
  const collectRejection = (reason) => unhandledRejections.push(reason);

  const createPlayer = (dataProvider) => {
    const videoEl = document.createElement('video');

    videoEl.id = 'mock-player';
    videoEl.classList.add('video-js');
    document.body.appendChild(videoEl);

    return Pillarbox(videoEl, {
      restoreEl: true,
      srgOptions: { dataProvider },
    });
  };

  beforeEach(() => {
    unhandledRejections = [];
    process.on('unhandledRejection', collectRejection);
  });

  afterEach(() => {
    process.off('unhandledRejection', collectRejection);

    if (player && !player.isDisposed()) {
      player.dispose();
    }
  });

  it('should ignore a data provider error if the player is disposed', async () => {
    let rejectRequest;

    player = createPlayer(() => new Promise((_resolve, reject) => {
      rejectRequest = reject;
    }));

    player.src({ src: 'urn:srf:video:pending', type: 'srgssr/urn' });

    while (!rejectRequest) {
      await new Promise(resolve => setTimeout(resolve, 0));
    }

    player.dispose();
    rejectRequest(new Error('Request failed'));

    await new Promise(resolve => setTimeout(resolve, 300));

    expect(player.isDisposed()).toBe(true);
    expect(unhandledRejections).toHaveLength(0);
  });

  it('should ignore a resolved source if the player is disposed', async () => {
    let resolveRequest;

    player = createPlayer(() => new Promise(resolve => {
      resolveRequest = resolve;
    }));

    player.src({ src: 'urn:srf:video:pending', type: 'srgssr/urn' });

    while (!resolveRequest) {
      await new Promise(resolve => setTimeout(resolve, 0));
    }

    player.dispose();
    resolveRequest({});

    await new Promise(resolve => setTimeout(resolve, 300));

    expect(player.isDisposed()).toBe(true);
    expect(unhandledRejections).toHaveLength(0);
  });
});
