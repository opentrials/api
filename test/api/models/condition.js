'use strict';

const should = require('should');
const helpers = require('../../../api/helpers');
const Condition = require('../../../api/models/condition');

describe('Condition', () => {
  before(clearDB);

  afterEach(clearDB);

  describe('trials', () => {
    it('returns trials related to the condition', () => {
      let trialId;

      return factory.create('trialWithRelated')
        .then((trial) => {
          trialId = trial.id;
          const conditionId = toJSON(trial).conditions[0].id;
          return new Condition({ id: conditionId }).fetch({ withRelated: 'trials' });
        }).then((condition) => {
          const trialsIds = condition.related('trials').models.map((trial) => trial.id);
          should(trialsIds).containEql(trialId);
        });
    });
  });

  describe('url', () => {
    it('returns the url', () => (
      factory.build('condition')
        .then((condition) => should(condition.toJSON().url).eql(helpers.urlFor(condition)))
    ));
  });
});
