'use strict';

const should = require('should');
const Publication = require('../../../api/models/publication');

describe('Publication', () => {
  before(clearDB);

  afterEach(clearDB);

  it('should define the relatedModels', () => {
    should(Publication.relatedModels).deepEqual([
      'source',
    ]);
  })
});
