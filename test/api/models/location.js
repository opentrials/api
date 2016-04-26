const should = require('should');
const Location = require('../../../api/models/location');

describe('Location', () => {
  before(clearDB)

  afterEach(clearDB)

  it('exists', () => {
    should.exist(Location);
  });

  describe('Trials', () => {
    it('is an empty array if there\'re none', () => {
      should((new Location()).related('trials').models).deepEqual([]);
    });

    it('return trials which contains the location', () => {
      let _trial;
      return factory.create('trialWithRelated')
        .then((trial) => {
          _trial = trial;
          const locationId = toJSON(trial).locations[0].attributes.id;
          return new Location({ id: locationId }).fetch({ withRelated: 'trials' });
        }).then((location) => {
          let expectedTrialIds = location.related('trials').models.map((trial) => (trial.id));
          should(expectedTrialIds).containEql(_trial.id);
        })
    })
  });
});
