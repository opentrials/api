'use strict';

const should = require('should');
const helpers = require('../../../api/helpers');
const Person = require('../../../api/models/person');

describe('Person', () => {
  before(clearDB);

  afterEach(clearDB);

  describe('trials', () => {
    it('returns trials related to the person', () => {
      let trialId;

      return factory.create('trialWithRelated')
        .then((trial) => {
          trialId = trial.id;
          const personId = toJSON(trial).persons[0].id;
          return new Person({ id: personId }).fetch({ withRelated: 'trials' });
        }).then((person) => {
          const trialsIds = person.related('trials').models.map((trial) => trial.id);
          should(trialsIds).containEql(trialId);
        });
    });
  });

  describe('url', () => {
    it('returns the url', () => (
      factory.build('person')
        .then((person) => should(person.toJSON().url).eql(helpers.urlFor(person)))
    ));
  });
});
