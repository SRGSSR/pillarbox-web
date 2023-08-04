import BlockingReason from '../../src/utils/BlockingReason';

describe('BlockReason', () => {
  /**
   *****************************************************************************
   * isPermanentlyBlocked ******************************************************
   *****************************************************************************
   */
  describe('isPermanentlyBlocked', () => {
    it('should return true when permanently blocked', () => {
      expect(BlockingReason.isPermanentlyBlocked('GEOBLOCK')).toBeTruthy();
      expect(BlockingReason.isPermanentlyBlocked('COMMERCIAL')).toBeTruthy();
    });

    it('should return false when not permanently blocked', () => {
      expect(BlockingReason.isPermanentlyBlocked('STARTDATE')).toBeFalsy();
      expect(BlockingReason.isPermanentlyBlocked('ENDDATE')).toBeFalsy();
    });

    it('should return false when not blocked', () => {
      expect(BlockingReason.isPermanentlyBlocked(undefined)).toBeFalsy();
    });
  });

  /**
   *****************************************************************************
   * isBlocked *****************************************************************
   *****************************************************************************
   */
  describe('isBlocked', () => {
    it('should return true when blocked', () => {
      expect(BlockingReason.isBlocked('GEOBLOCK')).toBeTruthy();
      expect(BlockingReason.isBlocked('COMMERCIAL')).toBeTruthy();
    });

    it('should return false when not blocked', () => {
      expect(BlockingReason.isBlocked(undefined)).toBeFalsy();
      expect(BlockingReason.isBlocked('')).toBeFalsy();
    });
  });

  /**
   *****************************************************************************
   * getters *******************************************************************
   *****************************************************************************
   */
  describe('getters', () => {
    it('should validate all getters', () => {
      Object.getOwnPropertyNames(BlockingReason)
        .map((key) => [
          key,
          Object.getOwnPropertyDescriptor(BlockingReason, key)
        ])
        .filter(([_, descriptor]) => typeof descriptor.get === 'function')
        .forEach(([key]) => {
          expect(BlockingReason[key]).toBeTruthy();
        });
    });
  });

  /**
   *****************************************************************************
   * is ************************************************************************
   *****************************************************************************
   */
  describe('is functions', () => {
    it('should validate all is functions', () => {
      Object.getOwnPropertyNames(BlockingReason)
        .map((key) => [
          key,
          Object.getOwnPropertyDescriptor(BlockingReason, key)
        ])
        .filter(([_, descriptor]) => typeof descriptor.value === 'function')
        .forEach(([key]) => {
          const getter = key.substring(2).toUpperCase();

          if (BlockingReason[getter]) {
            expect(BlockingReason[key](getter)).toBeTruthy();
          }
        });
    });
  });
});
