const should = require('should');
const Person = require('../../../api/models/person');

describe('Person', () => {
  before(clearDB)

  afterEach(clearDB)

  describe('trials', () => {
    it('returns trials related to the person', () => {
      let trialId;

      return factory.create('trialWithRelated')
        .then((trial) => {
          trialId = trial.id;
          const personId = toJSON(trial).persons[0].attributes.id;
          return new Person({ id: personId }).fetch({ withRelated: 'trials' });
        }).then((person) => {
          const trialsIds = person.related('trials').models.map((trial) => trial.id);
          should(trialsIds).containEql(trialId);
        })
    })
  });

});
