{
  domain: '247sports.com',
  name: '247sports',
  suffix: '.com',
  company: '24/7 Sports',
  tier1IABcategory: 'Sports',
  audience: null, //string
  contacts: [{ // array of objects
    name: null, //string
    email: null //string
  }],
  SSPaffiliation: 'Google AdX',
  alwaysOn: false, //bool
  ratings: {
    1: 0, //all ratings default to 0
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    average: 0
  },
  channels: {
    display: true, //bool
    desktopVideo: false,
    videoSSP: false,
    mobile: false,
    mobileSSP: false
  },
  availability: null, //number, represents millions/month
  programaticPartners: {
    us: [], //array of strings
    restOfWorld: []
  },
  bidFloorPrice: null, //number - dollars
  dealId: null, //number
  fixed: false, //bool - can only be fixed OR auction
  auction: false, //bool
  highViewability: false, //bool
  demographic: null, //string
  history: null, //?????????? - TODO: what is this?
  fraud: null, //?????????? - TODO: what is this?
  notes: [{ //array of objects
    author: null,
    title: null,
    text: null,
    createdAt: null //utc datestring
  }],
  locale: {
    country: null,
    state: null,
    city: null
  },
  inventory: {
    160x600: null, //bool or null
    300x250: null,
    728x90: null,
    300x600: null,
    320x50: null
  },
  firstPartyData: null
}
