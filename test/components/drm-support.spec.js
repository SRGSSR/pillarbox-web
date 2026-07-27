import pillarbox from '../../src/pillarbox.js';
import DrmSupport from '../../src/components/drm-support.js';

// Mock load to avoid having: Not implemented: HTMLMediaElement.prototype.load
window.HTMLMediaElement.prototype.load = () => { /* noop */ };

describe('DrmSupport', () => {
  let videoEl;
  let player;

  pillarbox.log.warn = jest.fn().mockReturnValue({});

  beforeAll(() => {
    videoEl = document.createElement('video');
    videoEl.id = 'player';

    document.body.appendChild(videoEl);

    player = new pillarbox('player');
  });

  beforeEach(() => {
    jest.restoreAllMocks();

    window.navigator.requestMediaKeySystemAccess = jest.fn();
  });

  afterEach(() => {
    if (!player) return;

    player.dispose();
  });

  it('should be registered and attached to the player', () => {
    expect(pillarbox.getComponent('DrmSupport')).toBe(DrmSupport);
    expect(player.drmSupport).toBeInstanceOf(DrmSupport);
  });

  it('should set createEl to false by default', () => {
    const DrmSupport = pillarbox.getComponent('DrmSupport');
    const drmSupport = new DrmSupport(player);

    expect(drmSupport.options().createEl).toBe(false);
  });

  it('should keep createEl option set to false', () => {
    const DrmSupport = pillarbox.getComponent('DrmSupport');
    const drmSupport = new DrmSupport(player, {
      createEl: true
    });

    expect(drmSupport.options().createEl).toBe(false);
  });

  describe('checkVendor', () => {
    const levels = [
      { robustness: 'HIGH', label: 'L1' },
      { robustness: 'LOW', label: 'L3' }
    ];
    const initTypes = ['cenc'];
    const type = 'video/mp4';

    it('should return level and hdcp for successful robustness', async () => {
      const mockMediaKeys = {};
      const mockAccess = { createMediaKeys: jest.fn().mockResolvedValue(mockMediaKeys) };

      window.navigator.requestMediaKeySystemAccess.mockResolvedValue(mockAccess);

      jest.spyOn(player.drmSupport, 'findMaxHdcp').mockResolvedValue('2.2');

      const result = await player.drmSupport.checkVendor('test.drm', levels, initTypes, type);

      expect(result).toEqual({ level: 'L1', hdcp: '2.2' });
      expect(mockAccess.createMediaKeys).toHaveBeenCalledTimes(1);
    });

    it('should continue to next level if first fails', async () => {
      const mockMediaKeys = {};
      const mockAccess = { createMediaKeys: jest.fn().mockResolvedValue(mockMediaKeys) };

      window.navigator
        .requestMediaKeySystemAccess
        .mockRejectedValueOnce(new Error('Fail HIGH'))
        .mockResolvedValueOnce(mockAccess);

      jest.spyOn(player.drmSupport, 'findMaxHdcp').mockResolvedValue('1.4');

      const result = await player.drmSupport.checkVendor('test.drm', levels, initTypes, type);

      expect(result).toEqual({ level: 'L3', hdcp: '1.4' });
      expect(window.navigator.requestMediaKeySystemAccess).toHaveBeenCalledTimes(2);
    });

    it('should return null if all levels fail', async () => {
      window.navigator.requestMediaKeySystemAccess.mockRejectedValue(new Error('Fail'));

      const result = await player.drmSupport.checkVendor('test.drm', levels, initTypes, type);

      expect(result).toBeNull();
    });
  });

  describe('findMaxHdcp', () => {
    it('should return null if getStatusForPolicy is missing', async () => {
      const mediaKeys = {};
      const result = await player.drmSupport.findMaxHdcp(mediaKeys);

      expect(result).toBeNull();
    });

    it('should return highest usable HDCP version', async () => {
      const mediaKeys = {
        getStatusForPolicy: jest.fn().mockImplementation(async ({ minHdcpVersion }) => {
          if (minHdcpVersion === '2.3') {
            throw new Error('Too high');
          }

          if (minHdcpVersion === '2.2') {
            return 'usable';
          }

          return 'usable';
        })
      };

      const result = await player.drmSupport.findMaxHdcp(mediaKeys);

      expect(result).toBe('2.2');
    });

    it('should return null if no version is usable', async () => {
      const mediaKeys = {
        getStatusForPolicy: jest.fn().mockRejectedValue(new Error('Fail'))
      };

      const result = await player.drmSupport.findMaxHdcp(mediaKeys);

      expect(result).toBeNull();
    });
  });

  describe('check', () => {
    it('should call checkVendor for all configs', async () => {
      jest.spyOn(player.drmSupport, 'checkVendor').mockResolvedValue({ level: 'MockLabel', hdcp: '2.2' });

      await player.drmSupport.check();

      expect(player.drmSupport.checkVendor)
        .toHaveBeenCalledTimes(
          Object.keys(DrmSupport.DRM_CONFIG).length
        );
    });
  });
});
