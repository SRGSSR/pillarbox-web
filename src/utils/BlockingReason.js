const REASON = {
  STARTDATE: 'STARTDATE',
  ENDDATE: 'ENDDATE',
  LEGAL: 'LEGAL',
  COMMERCIAL: 'COMMERCIAL',
  GEOBLOCK: 'GEOBLOCK',
  AGERATING18: 'AGERATING18',
  AGERATING12: 'AGERATING12',
  UNKNOWN: 'UNKNOWN',
};

class BlockingReason {
  static isStartDate(blockingReason) {
    return blockingReason === REASON.STARTDATE;
  }

  static isEndDate(blockingReason) {
    return blockingReason === REASON.ENDDATE;
  }

  static isGeoBlock(blockingReason) {
    return blockingReason === REASON.GEOBLOCK;
  }

  static isLegal(blockingReason) {
    return blockingReason === REASON.LEGAL;
  }

  static isCommercial(blockingReason) {
    return blockingReason === REASON.COMMERCIAL;
  }

  static isAgeRating18(blockingReason) {
    return blockingReason === REASON.AGERATING18;
  }

  static isAgeRating12(blockingReason) {
    return blockingReason === REASON.AGERATING12;
  }

  static isUnknown(blockingReason) {
    return blockingReason === REASON.UNKNOWN;
  }

  static isPermanentlyBlocked(blockingReason) {
    return (
      blockingReason &&
      !this.isStartDate(blockingReason) &&
      !this.isEndDate(blockingReason)
    );
  }

  static isBlocked(blockingReason) {
    return !!blockingReason;
  }

  static get AGERATING12() {
    return REASON.AGERATING12;
  }

  static get AGERATING18() {
    return REASON.AGERATING18;
  }

  static get COMMERCIAL() {
    return REASON.COMMERCIAL;
  }

  static get ENDDATE() {
    return REASON.ENDDATE;
  }

  static get GEOBLOCK() {
    return REASON.GEOBLOCK;
  }

  static get LEGAL() {
    return REASON.LEGAL;
  }

  static get STARTDATE() {
    return REASON.STARTDATE;
  }

  static get UNKNOWN() {
    return REASON.UNKNOWN;
  }
}

export default BlockingReason;
