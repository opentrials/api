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
      const sourceURL = 'http://example.com/myfilepath.pdf';

      return factory.create('file', { source_url: sourceURL })
        .then((file) => factory.create('documentWithFile', { file_id: file.attributes.id }))
        .then((doc) => new Document({ id: doc.attributes.id }).fetch({ withRelated: ['file'] }))
        .then((doc) => should(doc.toJSONSummary().source_url).equal(sourceURL));
    });
  });

  describe('virtuals', () => {
    describe('documentcloud_id', () => {
      it('should delegate to its file', () => {
        const dc_id = '1000-the-file';

        return factory.create('file', { documentcloud_id: dc_id })
          .then((file) => factory.create('documentWithFile', { file_id: file.attributes.id }))
          .then((doc) => new Document({ id: doc.attributes.id }).fetch({ withRelated: ['file'] }))
          .then((doc) => should(doc.toJSONSummary().documentcloud_id).equal(dc_id));
      });
    });

    describe('text', () => {
      it('should delegate to its file', () => {
        const text = 'Sample text';

        return factory.create('file', { text })
          .then((file) => factory.create('documentWithFile', { file_id: file.attributes.id }))
          .then((doc) => new Document({ id: doc.attributes.id }).fetch({ withRelated: ['file'] }))
          .then((doc) => should(doc.toJSONSummary().text).equal(text));
      });
    });
  });

  describe('serialize', () => {
    it(`doesn\'t return virtuals`, () => {
      const dc_id = '1000-the-file';

      return factory.create('file', { documentcloud_id: dc_id })
        .then((file) => factory.create('documentWithFile', { file_id: file.attributes.id }))
        .then((doc) => new Document({ id: doc.attributes.id }).fetch({ withRelated: ['file'] }))
        .then((doc) => should(doc.toJSON().documentcloud_id).be.undefined());
    });
    it('returns summarized version of file', () => {
      return factory.create('file')
        .then((file) => factory.create('documentWithFile', { file_id: file.attributes.id }))
        .then((doc) => new Document({ id: doc.attributes.id }).fetch({ withRelated: ['file'] }))
        .then((doc) => doc.toJSON().file.should.deepEqual(doc.related('file').toJSONSummary()));
    });
    it('returns undefined when fetching lacking file', () => {
      return factory.create('document', {file_id: undefined})
        .then((doc) => new Document({ id: doc.attributes.id }).fetch({ withRelated: ['file'] }))
        .then((doc) => should(doc.toJSON().file).be.undefined());
    });
  });
});
