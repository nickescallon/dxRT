var fs = require('fs');
var Firebase = require('firebase');
var parse = require('csv-parse')
var publisherBase = 'https://vivid-heat-6256.firebaseio.com/publishers/';

//Here we define our parser, and let it know to expect a header in our source data
var parser = parse({columns: true});

//parser events - TODO: handle errors
parser.on('readable', function() {
  while(record = parser.read()){
    var jsonRecord = csvToJs(record);
    pushToFirebase(jsonRecord);
  }
});

//Here we read the source file and pipe it to the parser
var readStream = fs.createReadStream(__dirname + '/data.csv');
readStream.pipe(parser);

/**************HELPERS**************/

function pushToFirebase(obj) {
  // Right now we use domain as the unique key, or else company name
  // We should enforce that domains must be present in seed
  // TODO: escape these keys properly - path can't contain ".", "#", "$", "[", or "]"
  var key = obj.domain.full || obj.company;
  key = key.split('/')[0].split('.').join('');

  var firebaseTarget = new Firebase(publisherBase + key);
  firebaseTarget.set(obj);
};

function csvToJs(csvRecord) {
  var VALUE_MAP = {
    //company has a space after it because the source does...
    'Company ': 'company',
    'Tier 1 IAB Category': 'tier1IABCategory',
    'Audience': 'audience',
    'SSP Affiliation': 'sspAffiliation',
    'Always On': 'alwaysOn',
    'Avails': 'availability',
    'Deal ID': 'dealId',
    'High Viewability': 'highViewability',
    'Demo': 'demographic',
    'History': 'history',
    'Fraud': 'fraud',
    'Locale': 'locale',
    '1st Party Data': 'firstPartyData'
  };

  function stringToBool(string) {
    if (string === 'Yes' || string === 'x') {
      string = true;
    } else if (string === 'No') {
      string = false;
    }
    return string;
  };

  var transformed = {};

  // direct value mappings
  for (var csvKey in VALUE_MAP) {
    var jsKey = VALUE_MAP[csvKey];
    transformed[jsKey] = stringToBool(csvRecord[csvKey]);
  }

  //constructed values
  //domains
  transformed.domain = {}
  var transformedDomain = csvRecord.Domain;
  var splitDomain = transformedDomain.split('.');
  transformed.domain.full = transformedDomain;
  if (splitDomain.length){
    transformed.domain.name = splitDomain[0];
    transformed.domain.suffix = splitDomain[1] ?  '.' + splitDomain[1] : '';
  } else {
    transformed.domain.name = '';
    transformed.domain.suffix = '';
  }

  //contacts
  transformed.contacts = {
    primary: {},
    secondary: {}
  };
  transformed.contacts.primary.name = csvRecord.Contacts;
  transformed.contacts.primary.email = csvRecord['Contact e-mail'];
  transformed.contacts.secondary.name = csvRecord['Secondary Contact'];
  transformed.contacts.secondary.email = csvRecord['2nd E-mail'];

  //channels
  transformed.channels = {};
  transformed.channels.display = stringToBool(csvRecord.Display);
  //the below has a space after the key because the source does...
  transformed.channels.desktopVideo = stringToBool(csvRecord['Desktop Video ']);
  transformed.channels.videoSSP = stringToBool(csvRecord['Video SSP']);
  transformed.channels.mobile = stringToBool(csvRecord.Mobile);
  transformed.channels.mobileSSP = stringToBool(csvRecord['Mobile SSP']);

  //ratings
  transformed.ratings = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    average: 0
  };

  //notes
  transformed.notes = [];
  if (csvRecord.Notes) {
      transformed.notes.push({
      author: '',
      title: '',
      text: csvRecord.Notes,
      createdAt: new Date().toUTCString()
    });
  }

  //Programamtic
  //TODO: change this to sample json structure
  transformed.programmaticDirect = csvRecord['Programmatic Direct'];

  //fixed or auction
  var fixedOrAuction = csvRecord['Fixed or Auction'];
  var fixed = '';
  var auction = '';
  if (fixedOrAuction.toLowerCase() === 'fixed') {
    fixed = true;
    auction = false;
  } else if (fixedOrAuction.toLowerCase() === 'auction') {
    auction = true;
    fixed = false;
  }
  transformed.fixed = fixed;
  transformed.auction = auction;

  //inventory
  transformed.inventory = {}
  transformed.inventory['160x600'] = stringToBool(csvRecord['160x600']);
  transformed.inventory['300x250'] = stringToBool(csvRecord['300x250']);
  transformed.inventory['728x90'] = stringToBool(csvRecord['728x90']);
  transformed.inventory['300x600'] = stringToBool(csvRecord['300x600']);
  transformed.inventory['300x50'] = stringToBool(csvRecord['300x50']);
  transformed.inventory['320x50'] = stringToBool(csvRecord['320x50']);

  //bid floor price
  transformed.bidFloorPrice = parseFloat( csvRecord['Bid Floor Price'].substring(1) ) || '';

  return transformed;
};
