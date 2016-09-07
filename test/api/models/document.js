'use strict';

const should = require('should');
const Document = require('../../../api/models/document');

describe('Document', () => {
  before(clearDB);

  afterEach(clearDB);

  describe('virtuals', () => {
    describe('url', () => {
      it('should delegate to its file', () => {
        const url = 'http://example.com/myfilepath.pdf';

        return factory.create('file', { url })
          .then((file) => factory.create('document', { file_id: file.attributes.id }))
          .then((doc) => new Document({ id: doc.attributes.id }).fetch({ withRelated: ['file'] }))
          .then((doc) => should(doc.toJSON().url).equal(url));
      })
    });

    describe('documentcloud_id', () => {
      it('should delegate to its file', () => {
        const dc_id = '1000-the-file';

        return factory.create('file', { documentcloud_id: dc_id })
          .then((file) => factory.create('document', { file_id: file.attributes.id }))
          .then((doc) => new Document({ id: doc.attributes.id }).fetch({ withRelated: ['file'] }))
          .then((doc) => should(doc.toJSON().documentcloud_id).equal(dc_id));
      })
    });

    describe('text', () => {
      it('should delegate to its file', () => {
        const text = 'Sample text';

        return factory.create('file', { text })
          .then((file) => factory.create('document', { file_id: file.attributes.id }))
          .then((doc) => new Document({ id: doc.attributes.id }).fetch({ withRelated: ['file'] }))
          .then((doc) => should(doc.toJSON().text).equal(text));
      })
    });
  });
});
