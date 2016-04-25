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
        .then((model) => {
          return server.inject('/v1/trials/' + model.attributes.id)
            .then((response) => {
              response.statusCode.should.equal(200);

              // Convert and load from JSON so things like Dates get
              // properly stringified and we can compare with the API's output.
              const expectedResult = JSON.parse(JSON.stringify(model.toJSON()));
              const result = JSON.parse(response.result);

              result.should.deepEqual(expectedResult);
            })
        })
    ));
  });
});
