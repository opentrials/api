'use strict';

const should = require('should');
const File = require('../../../api/models/file');

describe('File', () => {
  before(clearDB);

  afterEach(clearDB);

  describe('toJSONSummary', () => {
    it('returns simplified file representation', () => (
      factory.create('file')
        .then((file) => file.toJSONSummary().should.deepEqual({
          id: file.attributes.id,
          sha1: file.attributes.sha1,
          source_url: file.attributes.source_url,
          documentcloud_id: file.attributes.documentcloud_id,
        }))
    ));

    it('is an empty object if file is empty', () => {
      const file = new File();

      should(file.toJSONSummary()).deepEqual({});
    });
  });

  describe('toJSON', () => {
    it('returns the pages as object with "num" and "text" fields', () => (
      factory.create('file', { pages: ['foo', 'bar'] })
        .then((file) => {
          file.toJSON().pages.should.deepEqual([
            { num: 1, text: 'foo' },
            { num: 2, text: 'bar' },
          ]);
        })
    ));

    it('returns the pages undefined when there are no pages', () => (
      factory.create('file', { pages: null })
        .then((file) => {
          should(file.toJSON().pages).be.undefined();
        })
    ));
  });
});
