const trialsController = require('../../../api/controllers/trials');
const Trial = require('../../../api/models/trial');

describe('Trials', () => {
  before(() => (
    config.bookshelf.knex.migrate.latest().then(() => (
      config.bookshelf.knex('trials').truncate()
    ))
  ));

  afterEach(() => (
    config.bookshelf.knex('trials').truncate()
  ))

  describe('GET /trials', () => {
    it('returns empty list if there\'re no trials', () => (
      server.inject('/trials')
        .then((response) => {
          response.statusCode.should.equal(200);
          JSON.parse(response.result).should.deepEqual([]);
        })
    ));

    it('returns the list of trials', () => (
      new Trial({ title: 'foo' }).save()
        .then((model) => (
          server.inject('/trials')
            .then((response) => {
              response.statusCode.should.equal(200);

              const result = JSON.parse(response.result);
              result.should.have.length(1);

              // FIXME: The model coming from the API use ISO time for
              // timestamps, and the one coming from Trial don't.
              // They should both return the same.
              model.attributes.created_at = model.attributes.created_at.toISOString();
              model.attributes.updated_at = model.attributes.updated_at.toISOString();

              result.should.deepEqual([model.attributes]);
            })
        ))
    ));
  });

  describe('GET /trials/{id}', () => {
    it('returns 404 if there\'s no trial with the received ID', () => (
      server.inject('/trials/51')
        .then((response) => {
          response.statusCode.should.equal(404);
        })
    ));

    it('returns the Trial', () => (
      new Trial({ title: 'foo' }).save()
        .then((model) => (
          server.inject('/trials/'+model.attributes.id)
            .then((response) => {
              response.statusCode.should.equal(200);

              const result = JSON.parse(response.result);

              // FIXME: The model coming from the API use ISO time for
              // timestamps, and the one coming from Trial don't.
              // They should both return the same.
              model.attributes.created_at = model.attributes.created_at.toISOString();
              model.attributes.updated_at = model.attributes.updated_at.toISOString();

              result.should.deepEqual(model.attributes);
            })
        ))
    ));
  });
});
