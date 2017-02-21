/* eslint-disable max-len */

'use strict';

const DocumentCategory = require('../../../api/models/document_category');

describe('Document category', () => {
  before(clearDB);

  afterEach(clearDB);

  describe('GET /v1/document_categories/{id}', () => {
    it('returns 404 if there\'s no document with the received ID', () => (
      server.inject('/v1/document_categories/0')
        .then((response) => {
          response.statusCode.should.equal(404);
        })
    ));

    it('returns a document category', () => {
      let cat;

      return factory.create('document_category')
        .then((_cat) => new DocumentCategory({ id: _cat.attributes.id }).fetch())
        .then((_cat) => (cat = _cat))
        .then(() => server.inject(`/v1/document_categories/${cat.attributes.id}`))
        .then((response) => {
          response.statusCode.should.equal(200);

          const expectedResult = cat.toJSON();
          const result = JSON.parse(response.result);

          result.should.deepEqual(expectedResult);
        });
    });
  });

  describe('GET /v1/document_categories', () => {
    it('returns the document categories', () => {
      let cat;

      return factory.create('document_category')
        .then((_cat) => new DocumentCategory({ id: _cat.attributes.id }).fetch())
        .then((_cat) => (cat = _cat))
        .then(() => server.inject('/v1/document_categories'))
        .then((response) => {
          response.statusCode.should.equal(200);

          const expectedResult = {
            total_count: 1,
            items: [cat.toJSON()],
          };
          const result = JSON.parse(response.result);
          result.should.deepEqual(toJSON(expectedResult));
        });
    });
  });
});
