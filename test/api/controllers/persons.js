'use strict';

describe('Persons', () => {
  before(clearDB);

  afterEach(clearDB);

  describe('GET /v1/persons/{id}', () => {
    it('returns 404 if there\'s no person with the received ID', () => (
      server.inject('/v1/persons/eb1af997-3e9c-4f31-895f-002ec1cfa196')
        .then((response) => {
          response.statusCode.should.equal(404);
        })
    ));

    it('returns the Person', () => (
      factory.create('person').then((model) => (
        server.inject(`/v1/persons/${model.attributes.id}`)
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
