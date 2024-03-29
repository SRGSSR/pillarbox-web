const streamTypeList = [
  {
    dvr: true,
    live: true,
    streamType: 'DVR',
    index: 0,
    quality: 'HD',
    tokenType: 'NONE',
  },
  {
    dvr: false,
    live: true,
    streamType: 'LIVE',
    index: 1,
    quality: 'SD',
    tokenType: 'AKAMAI',
  },
  {
    dvr: false,
    live: false,
    streamType: 'ON_DEMAND',
    index: 2,
    quality: 'SD',
    tokenType: 'AKAMAI',
  },
  {
    dvr: false,
    live: false,
    streamType: 'ON_DEMAND',
    index: 3,
    quality: 'HQ',
    tokenType: 'AKAMAI',
  },
  {
    dvr: false,
    live: true,
    streamType: 'LIVE',
    index: 4,
    quality: 'HD',
    tokenType: 'NONE',
  },
  {
    dvr: false,
    live: false,
    streamType: 'ON_DEMAND',
    index: 5,
    quality: 'HD',
    tokenType: 'NONE',
  },
  {
    dvr: false,
    live: true,
    streamType: 'LIVE',
    index: 6,
    quality: 'HQ',
    tokenType: 'AKAMAI',
  },
  {
    dvr: true,
    live: true,
    streamType: 'DVR',
    index: 7,
    quality: 'SD',
    tokenType: 'NONE',
  }
];

export default streamTypeList;
