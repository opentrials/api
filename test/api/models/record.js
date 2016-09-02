'use strict';

const should = require('should');
const helpers = require('../../../api/helpers');
const Record = require('../../../api/models/record');

describe('Record', () => {
  before(clearDB);

  afterEach(clearDB);

//  it('should define the relatedModels', () => {
//    should(Record.relatedModels).deepEqual([
//      'trial',
//      'source',
//    ]);
//  })
//
//  it('defines url and trial_url', () => {
//    return factory.create('record')
//      .then((record) => {
//        const trial = record.related('trial');
//        const fakeRecord = { id: record.id, tableName: 'records' };
//
//        record.toJSON().should.containEql({
//          url: helpers.urlFor([trial, fakeRecord]),
//          trial_url: helpers.urlFor(trial),
//        });
//      });
//  });
//
//  it('#toJSONSummary returns simplified record representation', () => {
//    return factory.create('record').then((record) => {
//      const recordJSON = record.toJSON();
//
//      record.toJSONSummary().should.deepEqual({
//        source: record.related('source').toJSON(),
//        id: recordJSON.id,
//        url: recordJSON.url,
//        source_url: recordJSON.source_url,
//        updated_at: recordJSON.updated_at,
//      });
//    });
//  });

//  it('has documents', () => {
//    let record;
//
//    return factory.create('record')
//      .then((_record) => record = _record.toJSON())
//      .then(() => factory.create('document', {
//        trial_id: record.trial_id,
//        source_id: record.source_id,
//        type: 'results',
//      }))
//      .then(() => new Record({ id: record.id }).fetch({ require: true, withRelated: ['documents'] }))
//      .then((_record) => should(_record.toJSON().has_published_results).be.true());
//  });

  it('has documents', () => {
    let record;

    return factory.create('record')
      .then((_record) => record = _record.toJSON())
      .then(() => factory.create('document', {
        trial_id: record.trial_id,
        source_id: record.source_id,
      }))
      .then(() => new Record({ id: record.id }).fetch({ require: true, withRelated: ['documents'] }))
      .then((_record) => {
        console.log(_record.related('documents'));
        should(_record.toJSON().documents).have.length(1)
      });
  });
});
