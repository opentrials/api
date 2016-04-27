const should = require('should');
const Person = require('../../../api/models/person');

describe('Person', () => {
  before(clearDB)

  afterEach(clearDB)

  it('exists', () => {
    should.exist(Person);
  });

  describe('Trials', () => {
    it('is an empty array if there\'re none', () => {
      should((new Person()).related('trials').models).deepEqual([]);
    });

    it('return trials which contains the person', () => {
      let _trial;
      return factory.create('trialWithRelated')
        .then((trial) => {
          _trial = trial;
          const personId = toJSON(trial).persons[0].attributes.id;
          return new Person({ id: personId }).fetch({ withRelated: 'trials' });
        }).then((person) => {
          let expectedTrialIds = person.related('trials').models.map((trial) => (trial.id));
          should(expectedTrialIds).containEql(_trial.id);
        })
    })
  });

});
