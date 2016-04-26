const should = require('should');
const Problem = require('../../../api/models/problem');

describe('Problem', () => {
  before(clearDB);

  afterEach(clearDB);

  it('exists', () => {
    should.exist(Problem);
  });

  describe('Trials', () => {
    it('is an empty array if there\'re none', () => {
      should((new Problem()).related('trials').models).deepEqual([]);
    });

    it('return trials which contains the problem', () => {
      let _trial;
      return factory.create('trialWithRelated')
        .then((trial) => {
          _trial = trial;
          const problemId = toJSON(trial).problems[0].attributes.id;
          return new Problem({ id: problemId }).fetch({ withRelated: 'trials' });
        }).then((problem) => {
          let expectedTrialIds = problem.related('trials').models.map((trial) => (trial.id));
          should(expectedTrialIds).containEql(_trial.id);
        })
    })
  });

});
