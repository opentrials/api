'use strict';

const Trial = require('./api/models/trial');
const Record = require('./api/models/record');
const recordId = '7cd88d88-031d-11e6-b512-3e1d05defe78';
const trialId = '05cc77ad-5575-4c04-9309-4c64d5144b07';

Promise.resolve()
  //.then(() => new Trial({ id: trialId }).fetch({ require: true, withRelated: ['documents'] }))
  .then(() => new Record({ id: recordId }).fetch({ require: true, withRelated: ['documents'] }))
  .then((model) => {
//    console.log(model.related('documents').relatedData);
    console.log(model.related('documents').length);
  })
//  .then(() => new Trial({ id: trialId }).fetch({ require: true, withRelated: ['documents'] }))
//  .then((model) => {
//    console.log(model.related('documents').relatedData);
//    console.log(model.related('documents').length);
//  })
  .then(() => process.exit())
  .catch((err) => {
    console.log(err.stack);
    process.exit(1);
  });
