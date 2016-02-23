const should = require('should');
const Trial = require('../../../api/models/trial');
const Location = require('../../../api/models/location');

describe('Trial', () => {
  before(() => (
    config.bookshelf.knex.migrate.latest()
      .then(() => config.bookshelf.knex('trials_locations').select().del())
      .then(() => config.bookshelf.knex('locations').select().del())
      .then(() => config.bookshelf.knex('trials_interventions').select().del())
      .then(() => config.bookshelf.knex('interventions').select().del())
      .then(() => config.bookshelf.knex('trials').select().del())
  ));

  afterEach(() => (
    config.bookshelf.knex('trials_locations').select().del()
      .then(() => config.bookshelf.knex('locations').select().del())
      .then(() => config.bookshelf.knex('trials_interventions').select().del())
      .then(() => config.bookshelf.knex('interventions').select().del())
      .then(() => config.bookshelf.knex('trials').select().del())
  ));

  it('exists', () => {
    should.exist(Trial);
  });

  describe('locations', () => {
    it('is an empty array if there\'re no locations', () => {
      return fixtures.trial().save()
        .then((trial) => {
          should(trial.toJSON().locations).deepEqual([]);
        });
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
    it('is an empty array if there\'re no interventions', () => {
      return fixtures.trial().save()
        .then((trial) => {
          should(trial.toJSON().interventions).deepEqual([]);
        });
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
});
