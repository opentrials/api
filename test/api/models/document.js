'use strict';

const should = require('should');
const Document = require('../../../api/models/document');

describe('Document', () => {
  before(clearDB);

  afterEach(clearDB);

  describe('toJSONSummary', () => {
    it('returns simplified document representation', () => {
      return factory.create('file')
        .then((file) => factory.create('documentWithFile', { file_id: file.attributes.id }))
        .then((doc) => doc.toJSONSummary().should.deepEqual({
          name: doc.attributes.name,
          type: doc.attributes.type,
          source_url: doc.related('file').toJSON().source_url,
          documentcloud_id: doc.documentcloud_id,
          text: doc.text,
        }));
    });

    it('should return its own source_url if it has no file', () => {
      return factory.create('document', { file_id: undefined })
        .then((doc) => should(doc.toJSONSummary().source_url).not.be.undefined());
    });

    it('should delegate to its file if it exists', () => {
      return factory.create('documentWithFile')
        .then((doc) => new Document({ id: doc.attributes.id }).fetch({ withRelated: ['file'] }))
        .then((doc) => {
          const file = doc.related('file');
          should(doc.toJSONSummary().source_url).equal(file.toJSON().source_url)
        });
    });
  });

  describe('virtuals', () => {
    describe('documentcloud_id', () => {
      it('should delegate to its file', () => {
        return factory.create('documentWithFile')
          .then((doc) => new Document({ id: doc.attributes.id }).fetch({ withRelated: ['file'] }))
          .then((doc) => {
            const file = doc.related('file');
            should(doc.toJSON().documentcloud_id).equal(file.toJSON().documentcloud_id)
          });
      });

      it('is undefined when document has no file', () => {
        return factory.create('document', { file_id: null })
          .then((doc) => new Document({ id: doc.attributes.id }).fetch({ withRelated: ['file'] }))
          .then((doc) => should(doc.toJSON().documentcloud_id).be.undefined());
      })
    });

    describe('text', () => {
      it('should delegate to its file', () => {
        return factory.create('documentWithFile')
          .then((doc) => new Document({ id: doc.attributes.id }).fetch({ withRelated: ['file'] }))
          .then((doc) => {
            const file = doc.related('file');
            should(doc.toJSON().text).equal(file.toJSON().text);
          });
      });

      it('is undefined when document has no file', () => {
        return factory.create('document', { file_id: null })
          .then((doc) => new Document({ id: doc.attributes.id }).fetch({ withRelated: ['file'] }))
          .then((doc) => should(doc.toJSON().text).be.undefined());
      })
    });
  });

  describe('serialize', () => {
    describe('file', () => {
      it('is the file\'s JSON summary', () => {
        return factory.create('documentWithFile')
          .then((doc) => new Document({ id: doc.attributes.id }).fetch({ withRelated: ['file'] }))
          .then((doc) => should(doc.toJSON().file).deepEqual(doc.related('file').toJSONSummary()));
      });

      it('is undefined when document has no file', () => {
        return factory.create('document', {file_id: undefined})
          .then((doc) => new Document({ id: doc.attributes.id }).fetch({ withRelated: ['file'] }))
          .then((doc) => should(doc.toJSON().file).be.undefined());
      });
    })
  });
});
