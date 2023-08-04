import SRGStreamType from '../../src/utils/SRGStreamType.js';
import streamTypeList from '../__mocks__/streamTypeList.js';

describe('SRGStreamType', () => {
  /**
   *****************************************************************************
   * evaluate ******************************************************************
   *****************************************************************************
   */
  describe('evaluate', () => {
    it('should return ON_DEMAND if parameters are undefined', () => {
      expect(SRGStreamType.evaluate()).toBe(SRGStreamType.types.ON_DEMAND);
    });

    it('should evaluate correctly all stream types in the list', () => {
      streamTypeList.forEach((stream) => {
        const { dvr, live, streamType } = stream;

        expect(SRGStreamType.evaluate(dvr, live)).toBe(streamType);
      });
    });
  });

  /**
   *****************************************************************************
   * isDvr *********************************************************************
   *****************************************************************************
   */
  describe('isDvr', () => {
    it('should return true if the streamType is DVR', () => {
      streamTypeList.forEach((stream) => {
        const { streamType } = stream;
        const isDvr = SRGStreamType.types.DVR === streamType;

        expect(SRGStreamType.isDvr(streamType)).toBe(isDvr);
      });
    });
  });

  /**
   *****************************************************************************
   * isLive ********************************************************************
   *****************************************************************************
   */
  describe('isLive', () => {
    it('should return true if the streamType is LIVE', () => {
      streamTypeList.forEach((stream) => {
        const { streamType } = stream;
        const isLive = SRGStreamType.types.LIVE === streamType;

        expect(SRGStreamType.isLive(streamType)).toBe(isLive);
      });
    });
  });

  /**
   *****************************************************************************
   * isOnDemand ****************************************************************
   *****************************************************************************
   */
  describe('isOnDemand', () => {
    it('should return true if the streamType is ON_DEMAND', () => {
      streamTypeList.forEach((stream) => {
        const { streamType } = stream;
        const isOnDemand = SRGStreamType.types.ON_DEMAND === streamType;

        expect(SRGStreamType.isOnDemand(streamType)).toBe(isOnDemand);
      });
    });
  });
});
