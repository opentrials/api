'use strict';

const Publication = require('../../../api/models/publication');

describe('Publication', () => {
  before(clearDB);

  afterEach(clearDB);

  describe('GET /v1/publications/{id}', () => {
    it('returns 404 if there\'s no publication with the received ID', () => (
      server.inject('/v1/publications/eb1af997-3e9c-4f31-895f-002ec1cfa196')
        .then((response) => {
          response.statusCode.should.equal(404);
        })
    ));

    it('returns the Publication', () => (
      factory.create('publication').then((model) => {
        return server.inject(`/v1/publications/${model.attributes.id}`)
          .then((response) => {
            response.statusCode.should.equal(200);

            const expectedResult = JSON.parse(JSON.stringify(model.toJSON()));
            const result = JSON.parse(response.result);
            result.should.deepEqual(expectedResult);
          })
      })
    ));
  });
});
