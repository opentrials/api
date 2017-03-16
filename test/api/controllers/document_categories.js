/* eslint-disable max-len */

'use strict';

const DocumentCategory = require('../../../api/models/document_category');

describe('Document category', () => {
  before(clearDB);

  afterEach(clearDB);

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
