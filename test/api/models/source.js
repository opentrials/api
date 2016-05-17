'use strict';

const should = require('should');
const sinon = require('sinon');
const helpers = require('../../../api/helpers');
const Source = require('../../../api/models/source');

describe('Source', (done) => {
  let clock;

  before(() => {
    return clearDB().then(() => {
      clock = sinon.useFakeTimers(Date.parse('2016-01-01'), 'Date');
    })
  });

  after(() => {
    clock.restore();
  });

  afterEach(clearDB);

  describe('lastRegistryUpdate', () => {
    it('is an empty array if there\'re none', () => {
      return new Source().lastRegistryUpdate().then((result) => {
        should(result).deepEqual([]);
      });
    });

    it('returns date of last update registry', () => {
      let records = [];
      return factory.create('sourceRelatedToSeveralRecords')
        .then((_records) => {
          records = _records;
          return new Source().lastRegistryUpdate();
        })
        .then((result) => {
          const expected = [{
              id: records[0].attributes.source_id,
              name: 'test_source',
              latest_update_date: new Date('2016-01-01'),
            }];
          should(result).deepEqual(expected);
        });
    });
  });
});
