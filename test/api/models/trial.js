'use strict';

const should = require('should');
const _ = require('lodash');
const Trial = require('../../../api/models/trial');
const Location = require('../../../api/models/location');

describe('Trial', () => {
  before(clearDB)

  afterEach(clearDB)

  it('exists', () => {
    should.exist(Trial);
  });

  it('should define the relatedModels', () => {
    Trial.relatedModels.should.deepEqual([
      'locations',
      'interventions',
      'conditions',
      'persons',
      'organisations',
      'records',
      'records.source',
      'publications',
      'publications.source',
    ]);
  });

  describe('locations', () => {
    it('is an empty array if there\'re none', () => {
      should(toJSON(new Trial()).locations).deepEqual([]);
    });

    it('adds the locations and its metadata from relationship into the resulting JSON', () => {
      let trial_id;
      let loc;

      return factory.create('trial')
        .then((trial) => {
          trial_id = trial.id;

          return factory.create('location').then((_loc) => {
            loc = _loc;
            return trial.locations().attach({
              location_id: loc.id,
              role: 'recruitment_countries',
            });
          });
        }).then((trial) => {
          return new Trial({ id: trial_id }).fetch({ withRelated: 'locations' })
        }).then((trial) => {
          should(toJSON(trial).locations).deepEqual([
            Object.assign({ role: 'recruitment_countries' }, toJSON(loc)),
          ]);
        });
    });
  });

  describe('interventions', () => {
    it('is an empty array if there\'re none', () => {
      should(toJSON(new Trial).interventions).deepEqual([]);
    });

    it('adds the interventions and its metadata from relationship into the resulting JSON', () => {
      let trial_id;
      let intervention;

      return factory.create('trial')
        .then((trial) => {
          trial_id = trial.id;

          return factory.create('intervention').then((_intervention) => {
            intervention = _intervention;

            return trial.interventions().attach({
              intervention_id: intervention.id,
            });
          });
        }).then((trial) => {
          return new Trial({ id: trial_id }).fetch({ withRelated: 'interventions' })
        }).then((trial) => {
          should(toJSON(trial).interventions).deepEqual([
            toJSON(intervention),
          ]);
        });
    });
  });

  describe('conditions', () => {
    it('is an empty array if there\'re none', () => {
      should(toJSON(new Trial()).conditions).deepEqual([]);
    });

    it('adds the conditions and its metadata from relationship into the resulting JSON', () => {
      let trial_id;
      let condition;

      return factory.create('trial')
        .then((trial) => {
          trial_id = trial.id;

          return factory.create('condition').then((_condition) => {
            condition = _condition;

            return trial.conditions().attach({
              condition_id: condition.id,
            });
          });
        }).then((trial) => {
          return new Trial({ id: trial_id }).fetch({ withRelated: 'conditions' })
        }).then((trial) => {
          should(toJSON(trial).conditions).deepEqual([
            toJSON(condition),
          ]);
        });
    });
  });

  describe('persons', () => {
    it('is an empty array if there\'re none', () => {
      should(toJSON(new Trial()).persons).deepEqual([]);
    });

    it('adds the persons and its metadata from relationship into the resulting JSON', () => {
      let trial_id;
      let person;

      return factory.create('trial')
        .then((trial) => {
          trial_id = trial.id;

          return factory.create('person').then((_person) => {
            person = _person;

            return trial.persons().attach({
              person_id: person.id,
              role: 'other',
            });
          });
        }).then((trial) => {
          return new Trial({ id: trial_id }).fetch({ withRelated: 'persons' })
        }).then((trial) => {
          should(toJSON(trial).persons).deepEqual([
            Object.assign({ role: 'other' }, toJSON(person)),
          ]);
        });
    });
  });

  describe('organisations', () => {
    it('is an empty array if there\'re none', () => {
      should(toJSON(new Trial()).organisations).deepEqual([]);
    });

    it('adds the organisations and its metadata from relationship into the resulting JSON', () => {
      let trial_id;
      let organisation;

      return factory.create('trial')
        .then((trial) => {
          trial_id = trial.id;

          return factory.create('organisation').then((_organisation) => {
            organisation = _organisation;

            return trial.organisations().attach({
              organisation_id: organisation.id,
              role: 'other',
            });
          });
        }).then((trial) => {
          return new Trial({ id: trial_id }).fetch({ withRelated: 'organisations' })
        }).then((trial) => {

          should(toJSON(trial).organisations).deepEqual([
            Object.assign({ role: 'other' }, toJSON(organisation)),
          ]);
        });
    });
  });

  describe('records', () => {
    it('is an empty array if there\'re none', () => {
      should(toJSON(new Trial()).records).deepEqual([]);
    });

    it('adds the records and their sources into the resulting JSON', () => {
      return factory.create('record')
        .then((record) => {
          const source = record.related('source');

          return new Trial({ id: record.attributes.trial_id })
            .fetch({ withRelated: ['records', 'records.source'] })
            .then((trial) => {
              should(toJSON(trial).records).deepEqual([
                toJSON(record.toJSONSummary()),
              ]);
            });
        });
    });
  });

  describe('trialsPerYear', () => {
    it('is an empty array if there\'re none', () => {
      return new Trial().trialsPerYear().then((result) => {
        should(result).deepEqual([]);
      });
    });

    it('returns trials count per year', () => {
      const registrationDates = [
        { registration_date: '2016-01-01'},
        { registration_date: '2015-01-01'},
        { registration_date: '2016-01-01'},
      ];

      return factory.createMany('trial', registrationDates)
        .then(() => new Trial().trialsPerYear())
        .then((result) => {
          should(result).deepEqual([
            { year: 2015, count: 1},
            { year: 2016, count: 2},
          ]);
        });
    });
  });

  describe('virtuals', () => {
    describe('has_discrepancies', () => {
      it('returns false if there\'re no discrepancies in the records', () => {
        let trial_id;

        return factory.create('record')
          .then((record) => {
            const baseFields = _.pick(record.toJSON(), [
              'trial_id',
              'public_title',
              'brief_summary',
              'target_sample_size',
              'gender',
              'registration_date',
            ]);
            trial_id = baseFields.trial_id;

            return factory.create('record', baseFields);
          })
          .then(() => new Trial({ id: trial_id }).fetch({ withRelated: 'records' }))
          .then((trial) => should(trial.has_discrepancies).be.false());
      });

      it('returns true if there\'re discrepancies in the records', () => {
        let trial_id;

        return factory.create('trial')
          .then((trial) => trial_id = trial.attributes.id)
          .then(() => factory.createMany('record', [{ trial_id }, { trial_id, brief_summary: 'foobar' }], 2))
          .then(() => new Trial({ id: trial_id }).fetch({ withRelated: 'records' }))
          .then((trial) => should(trial.has_discrepancies).be.true());
      });
    });
  });
});
