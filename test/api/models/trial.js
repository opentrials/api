const should = require('should');
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
      'problems',
      'persons',
      'organisations',
      'sources',
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
              context: JSON.stringify(''),
            });
          });
        }).then((trial) => {
          return new Trial({ id: trial_id }).fetch({ withRelated: 'locations' })
        }).then((trial) => {
          should(toJSON(trial).locations).deepEqual([
            {
              role: 'recruitment_countries',
              attributes: toJSON(loc),
            }
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
              role: 'other',
              context: JSON.stringify(''),
            });
          });
        }).then((trial) => {
          return new Trial({ id: trial_id }).fetch({ withRelated: 'interventions' })
        }).then((trial) => {
          should(toJSON(trial).interventions).deepEqual([
            {
              role: 'other',
              attributes: toJSON(intervention),
            }
          ]);
        });
    });
  });

  describe('problems', () => {
    it('is an empty array if there\'re none', () => {
      should(toJSON(new Trial()).problems).deepEqual([]);
    });

    it('adds the problems and its metadata from relationship into the resulting JSON', () => {
      let trial_id;
      let problem;

      return factory.create('trial')
        .then((trial) => {
          trial_id = trial.id;

          return factory.create('problem').then((_problem) => {
            problem = _problem;

            return trial.problems().attach({
              problem_id: problem.id,
              role: 'other',
              context: JSON.stringify(''),
            });
          });
        }).then((trial) => {
          return new Trial({ id: trial_id }).fetch({ withRelated: 'problems' })
        }).then((trial) => {
          should(toJSON(trial).problems).deepEqual([
            {
              role: 'other',
              attributes: toJSON(problem),
            }
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
              context: JSON.stringify(''),
            });
          });
        }).then((trial) => {
          return new Trial({ id: trial_id }).fetch({ withRelated: 'persons' })
        }).then((trial) => {
          should(toJSON(trial).persons).deepEqual([
            {
              role: 'other',
              attributes: toJSON(person),
            }
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
              context: JSON.stringify(''),
            });
          });
        }).then((trial) => {
          return new Trial({ id: trial_id }).fetch({ withRelated: 'organisations' })
        }).then((trial) => {
          should(toJSON(trial).organisations).deepEqual([
            {
              role: 'other',
              attributes: toJSON(organisation),
            }
          ]);
        });
    });
  });

  describe('sources', () => {
    it('is an empty array if there\'re none', () => {
      should(toJSON(new Trial()).sources).deepEqual([]);
    });

    it('adds the sources and its metadata from relationship into the resulting JSON', () => {
      let trial_id;
      let source;
      const trialrecord = toJSON({
        id: 'fb6c1601-77f3-4f4d-afc9-2cbbc27bfacb',
        source_url: 'http://clinicaltrials.gov/ct2/show/NCT00000000',
        source_data: {},
        primary_register: 'nct',
        primary_id: 'NCT00000000',
        secondary_ids: [],
        registration_date: new Date('2016-01-01'),
        public_title: 'public_title',
        brief_summary: 'brief_summary',
        recruitment_status: 'recruitment_status',
        eligibility_criteria: {},
        study_type: 'study_type',
        study_design: 'study_design',
        study_phase: 'study_phase',
        created_at: new Date('2016-01-01 12:32:10'),
        updated_at: new Date('2016-05-01 15:21:03'),
      });

      return factory.create('trial')
        .then((trial) => {
          trial_id = trial.id;

          return factory.create('source').then((_source) => {
            source = _source;

            return trial.sources().attach(
              Object.assign({ source_id: source.id }, trialrecord)
            )
          });
        }).then((trial) => {
          return new Trial({ id: trial_id }).fetch({ withRelated: 'sources' })
        }).then((trial) => {
          should(toJSON(trial).sources).deepEqual([
            {
              attributes: toJSON(source),
              source_url: trialrecord.source_url,
              source_data: trialrecord.source_data,
              updated_at: trialrecord.updated_at,
            }
          ]);
        });
    });
  });
});


function toJSON(object) {
  return JSON.parse(JSON.stringify(object))
}
