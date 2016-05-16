'use strict';

const should = require('should');
const helpers = require('../../../api/helpers');
const Record = require('../../../api/models/record');

describe('Record', () => {
  before(clearDB);

  afterEach(clearDB);

  it('should define the relatedModels', () => {
    should(Record.relatedModels).deepEqual([
      'trial',
      'source',
    ]);
  })

  it('defines url and trial_url', () => {
    return factory.create('record')
      .then((record) => {
        const trial = record.related('trial');
        const fakeRecord = { id: record.id, tableName: 'records' };

        record.toJSON().should.containEql({
          url: helpers.urlFor([trial, fakeRecord]),
          trial_url: helpers.urlFor(trial),
        });
      });
  });

  it('#toJSONSummary returns simplified record representation', () => {
    return factory.create('record').then((record) => {
      const recordJSON = record.toJSON();

      record.toJSONSummary().should.deepEqual({
        source: record.related('source').toJSON(),
        id: recordJSON.id,
        url: recordJSON.url,
        source_url: recordJSON.source_url,
        updated_at: recordJSON.updated_at,
      });
    });
  });

  describe('trialsPerRegistry', () => {
    it('is an empty array if there\'re none', () => {
      new Record().trialsPerRegistry().then((result) => {
        should(result).deepEqual([]);
      });
    });

    it('returns trials per registry', () => {
      return factory.createMany('record', [
          { primary_register: 'primary_register1' }
        ], 20)
        .then((records) => {
          new Record().trialsPerRegistry().then((result) => {
            should(result).deepEqual([
              { registry: 'primary_register', count: 19 },
              { registry: 'primary_register1', count: 1 },
            ]);
          });
        });
    });
  });

  describe('lastRegistryUpdate', () => {
    it('is an empty array if there\'re none', () => {
      new Record().lastRegistryUpdate().then((result) => {
        should(result).deepEqual([]);
      });
    });

    it('returns date of last update registry', () => {
      return factory.create('sourceRelatedToSeveralRecords')
        .then((records) => {
          new Record().lastRegistryUpdate().then((result) => {
            const expected = [
              {
                id: records[0].attributes.source_id,
                name: 'test_source',
                updatedate: new Date('2016-01-01'),
              }
            ];
            should(result).deepEqual(expected);
          });
        });
    });
  });

});
