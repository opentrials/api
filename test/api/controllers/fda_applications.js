'use strict';

describe('FDAApplication', () => {
  before(clearDB);

  afterEach(clearDB);

  describe('GET /v1/fda_applications/{id}', () => {
    it('returns 404 if there\'s no FDA application with the received ID', () => (
      server.inject('/v1/fda_applications/00000000-0000-0000-0000-000000000000')
        .then((response) => {
          response.statusCode.should.equal(404);
        })
    ));

    it('returns the FDA application', () => (
      factory.create('fda_application').then((model) => (
        server.inject(`/v1/fda_applications/${model.attributes.id}`)
          .then((response) => {
            response.statusCode.should.equal(200);

            const expectedResult = toJSON(model);
            const result = JSON.parse(response.result);

            result.should.deepEqual(expectedResult);
          })
      ))
    ));
  });

  describe('GET /v1/fda_applications', () => {
    it('returns the FDA applications in pages', () => (
      factory.create('fda_application').then((model) => (
        server.inject('/v1/fda_applications')
          .then((response) => {
            response.statusCode.should.equal(200);

            const expectedResult = {
              total_count: 1,
              items: [toJSON(model)],
            };
            const result = JSON.parse(response.result);
            result.should.deepEqual(expectedResult);
          })
      ))
    ));

    it('returns empty items array when there are no more results', () => (
      factory.create('fda_application').then(() => (
        server.inject('/v1/fda_applications?page=2')
          .then((response) => {
            response.statusCode.should.equal(200);

            const expectedResult = {
              total_count: 1,
              items: [],
            };
            const result = JSON.parse(response.result);
            result.should.deepEqual(expectedResult);
          })
      ))
    ));
  });
});
