'use strict';

const should = require('should');
const Location = require('../../../api/models/location');

describe('Location', () => {
  before(clearDB);

  afterEach(clearDB);

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
        });
    });
  });
});
