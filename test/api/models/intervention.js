'use strict';

const should = require('should');
const Intervention = require('../../../api/models/intervention');

describe('Intervention', () => {
  before(clearDB);

  afterEach(clearDB);

  describe('trials', () => {
    it('returns trials related to the intervention', () => {
      let trialId;

      return factory.create('trialWithRelated')
        .then((trial) => {
          trialId = trial.id;
          const interventionId = toJSON(trial).interventions[0].id;
          return new Intervention({ id: interventionId }).fetch({ withRelated: 'trials' });
        }).then((intervention) => {
          const trialsIds = intervention.related('trials').models.map((trial) => trial.id);
          should(trialsIds).containEql(trialId);
        })
    })
  });
});
