'use strict';

const should = require('should');
const helpers = require('../../../api/helpers');
const Location = require('../../../api/models/location');

describe('Location', () => {
  before(clearDB)

  afterEach(clearDB)

  describe('trials', () => {
    it('returns trials related to the location', () => {
      let trialId;

      return factory.create('trialWithRelated')
        .then((trial) => {
          trialId = trial.id;
          const locationId = toJSON(trial).locations[0].id;
          return new Location({ id: locationId }).fetch({ withRelated: 'trials' });
        }).then((loc) => {
          const trialsIds = loc.related('trials').models.map((trial) => trial.id);
          should(trialsIds).containEql(trialId);
        })
    })
  });

  describe('topLocations', () => {
    it('is an empty array if there\'re none', () => {
      return new Location().topLocations().then((result) => {
        should(result).deepEqual([]);
      });
    });

    it('returns 10 top locations', () => {
      return factory.createMany('trialWithRelated', 20)
        .then((trials) => (new Location().topLocations()))
        .then((result) => {
          should(result.length).equal(10);
        });
    });
  });

  describe('url', () => {
    it('returns the url', () => {
      return factory.build('location')
        .then((loc) => should(loc.toJSON().url).eql(helpers.urlFor(loc)));
    });
  });
});
