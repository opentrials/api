const should = require('should');
const Trial = require('../../../api/models/trial');
const Location = require('../../../api/models/location');

describe('Trial', () => {
  before(clearDB)

  afterEach(clearDB)

  it('exists', () => {
    should.exist(Trial);
  });

  describe('locations', () => {
    it('is an empty array if there\'re none', () => {
      should(new Trial().toJSON().locations).deepEqual([]);
    });

    it('adds the locations and its metadata from relationship into the resulting JSON', () => {
      let trial_id;
      let loc;

      return fixtures.trial().save()
        .then((trial) => {
          trial_id = trial.id;

          return fixtures.location().save().then((_loc) => {
            loc = _loc;
            return trial.locations().attach({
              location_id: _loc.id,
              role: 'recruitment_countries',
              context: JSON.stringify(''),
            });
          });
        }).then((trial) => {
          return new Trial({ id: trial_id }).fetch({ withRelated: 'locations' })
        }).then((trial) => {
          should(trial.toJSON().locations).deepEqual([
            {
              role: 'recruitment_countries',
              attributes: loc.toJSON(),
            }
          ]);
        });
    });
  });

  describe('interventions', () => {
    it('is an empty array if there\'re none', () => {
      should(new Trial().toJSON().interventions).deepEqual([]);
    });

    it('adds the interventions and its metadata from relationship into the resulting JSON', () => {
      let trial_id;
      let intervention;

      return fixtures.trial().save()
        .then((trial) => {
          trial_id = trial.id;

          return fixtures.intervention().save().then((_intervention) => {
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
          should(trial.toJSON().interventions).deepEqual([
            {
              role: 'other',
              attributes: intervention.toJSON(),
            }
          ]);
        });
    });
  });

  describe('problems', () => {
    it('is an empty array if there\'re none', () => {
      should(new Trial().toJSON().problems).deepEqual([]);
    });

    it('adds the problems and its metadata from relationship into the resulting JSON', () => {
      let trial_id;
      let problem;

      return fixtures.trial().save()
        .then((trial) => {
          trial_id = trial.id;

          return fixtures.problem().save().then((_problem) => {
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
          should(trial.toJSON().problems).deepEqual([
            {
              role: 'other',
              attributes: problem.toJSON(),
            }
          ]);
        });
    });
  });

  describe('persons', () => {
    it('is an empty array if there\'re none', () => {
      should(new Trial().toJSON().persons).deepEqual([]);
    });

    it('adds the persons and its metadata from relationship into the resulting JSON', () => {
      let trial_id;
      let person;

      return fixtures.trial().save()
        .then((trial) => {
          trial_id = trial.id;

          return fixtures.person().save().then((_person) => {
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
          should(trial.toJSON().persons).deepEqual([
            {
              role: 'other',
              attributes: person.toJSON(),
            }
          ]);
        });
    });
  });
});
