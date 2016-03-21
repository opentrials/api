const trialsController = require('../../../api/controllers/trials');
const Trial = require('../../../api/models/trial');

describe('Trials', () => {
  before(clearDB)

  afterEach(clearDB)

  describe('GET /v1/trials/{id}', () => {
    it('returns 404 if there\'s no trial with the received ID', () => (
      server.inject('/v1/trials/eb1af997-3e9c-4f31-895f-002ec1cfa196')
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
