'use strict';

const should = require('should');
const Source = require('../../../api/models/source');

describe('Source', () => {
  before(clearDB);

  afterEach(clearDB);

  describe('latestUpdatedDates', () => {
    it('is an empty array if there\'re none', () => {
      return new Source().latestUpdatedDates().then((result) => {
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
        .then(() => new Source().latestUpdatedDates())
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

  describe('trialsPerSource', () => {
    it('is an empty array if there\'re none', () => {
      return new Source().trialsPerSource().then((result) => {
        should(result).deepEqual([]);
      });
    });

    it('returns count of trials per source', () => {
      let sources;

      return Promise.all([
        factory.createMany('trial', 2),
        factory.createMany('source', 2),
      ]).then((results) => {
          const trials = results[0];
          sources = results[1];

          const recordsAttributes = [
            { source_id: sources[0].attributes.id, trial_id: trials[0].attributes.id },
            { source_id: sources[0].attributes.id, trial_id: trials[1].attributes.id },
            { source_id: sources[0].attributes.id, trial_id: trials[1].attributes.id },
            { source_id: sources[1].attributes.id, trial_id: trials[0].attributes.id },
            { source_id: sources[1].attributes.id, trial_id: trials[1].attributes.id },
          ];

          return factory.createMany('record', recordsAttributes);
        })
        .then(() => new Source().trialsPerSource())
        .then((result) => {
          const expectedResult = sources.map((source) => {
            return {
              id: source.attributes.id,
              name: source.attributes.name,
              count: 2,
            };
          }).sort((a, b) => (a.name > b.name));

          should(result).containDeep(expectedResult);
        });
    });
  });
});
