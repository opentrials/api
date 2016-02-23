const should = require('should');
const Trial = require('../../../api/models/trial');
const Location = require('../../../api/models/location');

describe('Trial', () => {
  before(() => (
    config.bookshelf.knex.migrate.latest()
      .then(() => config.bookshelf.knex('trials_locations').select().del())
      .then(() => config.bookshelf.knex('locations').select().del())
      .then(() => config.bookshelf.knex('trials').select().del())
  ));

  it('exists', () => {
    should.exist(Trial);
  });

  describe('locations', () => {
    afterEach(() => (
      config.bookshelf.knex('trials_locations').select().del()
        .then(() => config.bookshelf.knex('locations').select().del())
        .then(() => config.bookshelf.knex('trials').select().del())
    ));

    it('is an empty array if there\'re no locations', () => {
      return fixtures.trial().save()
        .then((trial) => {
          trial.toJSON().locations.should.deepEqual([]);
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
            return trial.locations().attach(_loc);
          });
        }).then((trial) => {
          return trial.updatePivot({ role: 'recruitment_countries' });
        }).then((trial) => {
          // Reload the trial so we fetch the locations as well
          return new Trial({ id: trial_id }).fetch({ withRelated: 'locations' })
        }).then((trial) => {
          trial.toJSON().locations.should.deepEqual([
            {
              role: 'recruitment_countries',
              'location': loc.toJSON(),
            }
          ]);
        });
    });
  });
});
