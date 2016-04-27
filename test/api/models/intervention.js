const should = require('should');
const Intervention = require('../../../api/models/intervention');

describe('Intervention', () => {
  before(clearDB)

  afterEach(clearDB)

  it('exists', () => {
    should.exist(Intervention);
  });

  describe('Trials', () => {
    it('is an empty array if there\'re none', () => {
      should((new Intervention()).related('trials').models).deepEqual([]);
    });

    it('return trials which contains the intervention', () => {
      let _trial;
      return factory.create('trialWithRelated')
        .then((trial) => {
          _trial = trial;
          const interventionId = toJSON(trial).interventions[0].attributes.id;
          return new Intervention({ id: interventionId }).fetch({ withRelated: 'trials' });
        }).then((intervention) => {
          let expectedTrialIds = intervention.related('trials').models.map((trial) => (trial.id));
          should(expectedTrialIds).containEql(_trial.id);
        })
    })
  });
});
