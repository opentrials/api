const should = require('should');
const Organisation = require('../../../api/models/organisation');

describe('Organisation', () => {
  before(clearDB)

  afterEach(clearDB)

  it('exists', () => {
    should.exist(Organisation);
  });

  describe('Trials', () => {
    it('is an empty array if there\'re none', () => {
      should((new Organisation()).related('trials').models).deepEqual([]);
    });

    it('return trials which contains the organisation', () => {
      let _trial;
      return factory.create('trialWithRelated')
        .then((trial) => {
          _trial = trial;
          const organisationId = toJSON(trial).organisations[0].attributes.id;
          return new Organisation({ id: organisationId }).fetch({ withRelated: 'trials' });
        }).then((organisation) => {
          let expectedTrialIds = organisation.related('trials').models.map((trial) => (trial.id));
          should(expectedTrialIds).containEql(_trial.id);
        })
    })
  });

});
