'use strict';

const should = require('should');
const File = require('../../../api/models/file');

describe('Document', () => {
  before(clearDB);

  afterEach(clearDB);

  describe('toJSONSummary', () => {
    it('returns simplified file representation', () => {
      return factory.create('file')
        .then((file) => file.toJSONSummary().should.deepEqual({
          id: file.attributes.id,
          sha1: file.attributes.sha1,
          source_url: file.attributes.source_url,
        }));
    });
  });
});
