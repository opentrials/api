'use strict';

const should = require('should');
const Problem = require('../../../api/models/problem');

describe('Problem', () => {
  before(clearDB);

  afterEach(clearDB);

  describe('trials', () => {
    it('returns trials related to the problem', () => {
      let trialId;

      return factory.create('trialWithRelated')
        .then((trial) => {
          trialId = trial.id;
          const problemId = toJSON(trial).problems[0].attributes.id;
          return new Problem({ id: problemId }).fetch({ withRelated: 'trials' });
        }).then((problem) => {
          const trialsIds = problem.related('trials').models.map((trial) => trial.id);
          should(trialsIds).containEql(trialId);
        })
    })
  });

});
