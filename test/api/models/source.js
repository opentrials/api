'use strict';

const should = require('should');
const Source = require('../../../api/models/source');

describe('Source', () => {
  before(clearDB);

  afterEach(clearDB);

  describe('lastRegistryUpdate', () => {
    it('is an empty array if there\'re none', () => {
      return new Source().lastRegistryUpdate().then((result) => {
        should(result).deepEqual([]);
      });
    });

    it('returns the latest date where one of the source\'s records was updated', () => {
      let source;
      let latestUpdatedAtDate;

      return factory.create('source')
        .then((_source) => source = _source)
        .then(() => (
          factory.createMany('record', [
              { source_id: source.attributes.id },
              { source_id: source.attributes.id },
            ])
        ))
        .then((records) => {
          const updatedDates = records.map((record) => record.attributes.updated_at)
          latestUpdatedAtDate = new Date(Math.max.apply(null, updatedDates));
        })
        .then(() => new Source().lastRegistryUpdate())
        .then((result) => {
          const expected = [{
              id: source.attributes.id,
              name: source.attributes.name,
              latest_updated_date: latestUpdatedAtDate,
            }];
          should(result).deepEqual(expected);
        });
    });
  });
});
