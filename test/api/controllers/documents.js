/* eslint-disable max-len */

'use strict';

const Document = require('../../../api/models/document');

describe('Document', () => {
  before(clearDB);

  afterEach(clearDB);

  describe('GET /v1/documents/{id}', () => {
    it('returns 404 if there\'s no document with the received ID', () => (
      server.inject('/v1/documents/00000000-0000-0000-0000-000000000000')
        .then((response) => {
          response.statusCode.should.equal(404);
        })
    ));

    it('returns the document', () => {
      let doc;

      return factory.create('document')
        .then((_doc) => new Document({ id: _doc.attributes.id }).fetch({ withRelated: Document.relatedModels }))
        .then((_doc) => (doc = _doc))
        .then(() => server.inject(`/v1/documents/${doc.attributes.id}`))
        .then((response) => {
          response.statusCode.should.equal(200);

          const expectedResult = doc.toJSON();
          const result = JSON.parse(response.result);

          result.should.deepEqual(expectedResult);
        });
    });
  });

  describe('GET /v1/documents', () => {
    it('returns the documents JSON Summaries in pages', () => {
      let doc;

      return factory.create('documentWithFile')
        .then((_doc) => new Document({ id: _doc.attributes.id }).fetch({ withRelated: Document.relatedModels }))
        .then((_doc) => (doc = _doc))
        .then(() => server.inject('/v1/documents'))
        .then((response) => {
          response.statusCode.should.equal(200);

          const expectedResult = {
            total_count: 1,
            items: [doc.toJSONSummary()],
          };
          const result = JSON.parse(response.result);
          result.should.deepEqual(toJSON(expectedResult));
        });
    });

    it('returns empty items array when there are no more documents', () => (
      factory.create('document').then(() => (
        server.inject('/v1/documents?page=2')
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
