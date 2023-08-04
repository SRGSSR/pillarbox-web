const STREAM_TYPES_LIST = ['ON_DEMAND', 'LIVE', 'DVR'];
const STREAM_TYPES = {
  DVR: STREAM_TYPES_LIST[2],
  LIVE: STREAM_TYPES_LIST[1],
  ON_DEMAND: STREAM_TYPES_LIST[0],
};

class SRGStreamType {
  /**
   * Evaluate the stream type.
   *
   * @param {Boolean} dvr
   * @param {Boolean} live
   *
   * @see STREAM_TYPES_LIST
   * @see STREAM_TYPES
   *
   * @returns {String} the stream type: DVR or LIVE or ON_DEMAND
   */
  static evaluate(dvr, live) {
    if (dvr && live) {
      return SRGStreamType.types.DVR;
    }

    if (live) {
      return SRGStreamType.types.LIVE;
    }

    return SRGStreamType.types.ON_DEMAND;
  }

  /**
   * Check if the stream type is DVR.
   *
   * @param {String} streamType
   *
   * @return {Boolean} True if the stream type is DVR
   */
  static isDvr(streamType) {
    return SRGStreamType.types.DVR === streamType;
  }

  /**
   * Check if the stream type is LIVE.
   *
   * @param {String} streamType
   *
   * @return {Boolean} True if the stream type is live
   */
  static isLive(streamType) {
    return SRGStreamType.types.LIVE === streamType;
  }

  /**
   * Check if the stream type is ON_DEMAND.
   *
   * @param {String} streamType
   *
   * @return {Boolean} True if the stream type is ON_DEMAND
   */
  static isOnDemand(streamType) {
    return SRGStreamType.types.ON_DEMAND === streamType;
  }

  /**
   * Existing stream types: ON_DEMAND, LIVE, DVR
   *
   * @returns {Array} stream types array
   */
  static get list() {
    return STREAM_TYPES_LIST;
  }

  /**
   * Existing stream types: ON_DEMAND, LIVE, DVR
   *
   * - ON_DEMAND: On-demand stream.
   * - LIVE: Live-only stream.
   * - DVR: DVR stream (live with timeshift support).
   *
   * @returns {Object} stream types object
   */
  static get types() {
    return STREAM_TYPES;
  }
}

export default SRGStreamType;
