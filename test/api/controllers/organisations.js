'use strict';

describe('Organisations', () => {
  before(clearDB);

  afterEach(clearDB);

  describe('GET /v1/organisations/{id}', () => {
    it('returns 404 if there\'s no organisation with the received ID', () => (
      server.inject('/v1/organisations/eb1af997-3e9c-4f31-895f-002ec1cfa196')
        .then((response) => {
          response.statusCode.should.equal(404);
        })
    ));

    it('returns the Organisation', () => (
      factory.create('organisation').then((model) => (
        server.inject(`/v1/organisations/${model.attributes.id}`)
          .then((response) => {
            response.statusCode.should.equal(200);

            const expectedResult = JSON.parse(JSON.stringify(model.toJSON()));
            const result = JSON.parse(response.result);

            result.should.deepEqual(expectedResult);
          })
      ))
    ));
  });
});
