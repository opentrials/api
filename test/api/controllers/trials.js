const trialsController = require('../../../api/controllers/trials');
const Trial = require('../../../api/models/trial');

describe('Trials', () => {
  before(clearDB)

  afterEach(clearDB)

  describe('GET /v1/trials', () => {
    it('returns empty list if there\'re no trials', () => (
      server.inject('/v1/trials')
        .then((response) => {
          response.statusCode.should.equal(200);
          JSON.parse(response.result).should.deepEqual([]);
        })
    ));

    it('returns the list of trials', () => {
      return fixtures.trialWithRelated()
        .then((model) =>
          server.inject('/v1/trials')
            .then((response) => {
              response.statusCode.should.equal(200);

              const result = JSON.parse(response.result);
              const expectedResult = model.toJSON();
              expectedResult.registration_date = expectedResult.registration_date.toISOString()

              result.should.deepEqual([expectedResult]);
            })
        );
    });
  });

  describe('GET /v1/trials/{id}', () => {
    it('returns 404 if there\'s no trial with the received ID', () => (
      server.inject('/v1/trials/foo')
        .then((response) => {
          response.statusCode.should.equal(404);
        })
    ));

    it('returns the Trial', () => (
      fixtures.trialWithRelated()
        .then((model) => (
          server.inject('/v1/trials/'+model.attributes.id)
            .then((response) => {
              response.statusCode.should.equal(200);

              const result = JSON.parse(response.result);
              const expectedResult = model.toJSON();
              expectedResult.registration_date = expectedResult.registration_date.toISOString()

              result.should.deepEqual(expectedResult);
            })
        ))
    ));
  });
});
