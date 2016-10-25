'use strict';

const Document = require('../../../api/models/document');

describe('Document', () => {
  before(clearDB);

  afterEach(clearDB);

  describe('GET /v1/documents/{id}', () => {
    it('returns 404 if there\'s no document with the received ID', () => (
      server.inject('/v1/document/NOID')
        .then((response) => {
          response.statusCode.should.equal(404);
        })
    ));

    it('returns the document', () => (
      factory.create('document').then((model) => {
        return server.inject(`/v1/documents/${model.attributes.id}`)
          .then((response) => {
            response.statusCode.should.equal(200);

            const expectedResult = toJSON(model);
            const result = JSON.parse(response.result);

            result.should.deepEqual(expectedResult);
          })
      })
    ));
  });

  describe('GET /v1/documents', () => {
    it('returns the documents in pages', () => (
      factory.create('document').then((model) => {
        return server.inject('/v1/documents')
          .then((response) => {
            response.statusCode.should.equal(200);

            const expectedResult = {
              total_count: 1,
              items: [toJSON(model)],
            }
            const result = JSON.parse(response.result);
            result.should.deepEqual(expectedResult);
          })
      })
    ));

    it('returns empty items array when there are no more documents', () => (
      factory.create('document').then((model) => {
        return server.inject('/v1/documents?page=2')
          .then((response) => {
            response.statusCode.should.equal(200);

            const expectedResult = {
              total_count: 1,
              items: [],
            }
            const result = JSON.parse(response.result);
            result.should.deepEqual(expectedResult);
          })
      })
    ));
  });
});
