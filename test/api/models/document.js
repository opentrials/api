'use strict';

const should = require('should');
const Document = require('../../../api/models/document');

describe('Document', () => {
  before(clearDB);

  afterEach(clearDB);

  describe('source_url', () => {
    it('should return its own source_url if it has no file', () => {
      return factory.create('document', { file_id: undefined })
        .then((doc) => should(doc.toJSON().source_url).not.be.undefined());
    })

    it('should delegate to its file if it exists', () => {
      const sourceURL = 'http://example.com/myfilepath.pdf';

      return factory.create('file', { source_url: sourceURL })
        .then((file) => factory.create('documentWithFile', { file_id: file.attributes.id }))
        .then((doc) => new Document({ id: doc.attributes.id }).fetch({ withRelated: ['file'] }))
        .then((doc) => should(doc.toJSON().source_url).equal(sourceURL));
    })
  });

  describe('virtuals', () => {
    describe('documentcloud_id', () => {
      it('should delegate to its file', () => {
        const dc_id = '1000-the-file';

        return factory.create('file', { documentcloud_id: dc_id })
          .then((file) => factory.create('documentWithFile', { file_id: file.attributes.id }))
          .then((doc) => new Document({ id: doc.attributes.id }).fetch({ withRelated: ['file'] }))
          .then((doc) => should(doc.toJSON().documentcloud_id).equal(dc_id));
      })
    });

    describe('text', () => {
      it('should delegate to its file', () => {
        const text = 'Sample text';

        return factory.create('file', { text })
          .then((file) => factory.create('documentWithFile', { file_id: file.attributes.id }))
          .then((doc) => new Document({ id: doc.attributes.id }).fetch({ withRelated: ['file'] }))
          .then((doc) => should(doc.toJSON().text).equal(text));
      })
    });
  });
});
