'use strict';

const should = require('should');
const File = require('../../../api/models/file');

describe('File', () => {
  before(clearDB);

  afterEach(clearDB);

  describe('toJSONSummary', () => {
    it('returns simplified file representation', () => {
      return factory.create('file')
        .then((file) => file.toJSONSummary().should.deepEqual({
          id: file.attributes.id,
          sha1: file.attributes.sha1,
          source_url: file.attributes.source_url,
          documentcloud_id: file.attributes.documentcloud_id,
          pages_preview: file._getPagesPreview(file.toJSON().pages, 150)
        }));
    });

    it('is an empty object if file is empty', () => {
      const file = new File();

      should(file.toJSONSummary()).deepEqual({});
    });
  });

  describe('toJSON', () => {
    it('returns the pages as object with "num" and "text" fields', () => {
      return factory.create('file', { pages: ['foo', 'bar'] })
        .then((file) => {
          file.toJSON().pages.should.deepEqual([
            { num: 1, text: 'foo' },
            { num: 2, text: 'bar' },
          ]);
        });
    });

    it('returns the pages undefined when there are no pages', () => {
      return factory.create('file', { pages: null })
        .then((file) => {
          should(file.toJSON().pages).be.undefined();
        });
    });
  });

  describe('_getPagesPreview', () => {
    it('returns the pages preview if there are pages', () => {
      return factory.create('file', { pages: ['foo', 'bar'] })
        .then((file) => {
          file._getPagesPreview(file.toJSON().pages, 4)
            .should.deepEqual('foo bar');
        });
    });

    it('respects the limit of the preview string', () => {
      return factory.create('file', { pages: ['foo', 'bar baz'] })
        .then((file) => {
          file._getPagesPreview(file.toJSON().pages, 4)
            .should.deepEqual('foo bar [...]');
        });
    });

    it('appends the suffix when string is longer than limit', () => {
      return factory.create('file', { pages: ['foo', 'bar baz'] })
        .then((file) => {
          file._getPagesPreview(file.toJSON().pages, 4)
            .split(' ').pop()
            .should.deepEqual('[...]');
        });
    });
  });
});
