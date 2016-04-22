const Problem = require('../../../api/models/problem');

describe('Problems', () => {
  before(clearDB);

  afterEach(clearDB);

  describe('GET /v1/problems/{id}', () => {
    it('returns 404 if there\'s no problem with the received ID', () => (
      server.inject('/v1/problems/eb1af997-3e9c-4f31-895f-002ec1cfa196')
        .then((response) => {
          response.statusCode.should.equal(404);
        })
    ));

    it('returns the Problem', () => {
      const model = fixtures.problem();
      server.inject('/v1/problems/' + model.attributes.id)
        .then((response) => {
          response.statusCode.should.equal(200);

          const expectedResult = JSON.parse(JSON.stringify(model.toJSON()));
          const result = JSON.parse(response.result);

          result.should.deepEqual(expectedResult);
        })
    });
  });
});
