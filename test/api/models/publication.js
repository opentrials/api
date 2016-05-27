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

  it('#toJSONSummary returns simplified record representation', () => {
    return factory.create('publication')
      .then((publication) => {
        publication.toJSONSummary().should.deepEqual({
          id: publication.attributes.id,
          title: publication.attributes.title,
          source: publication.related('source').toJSON(),
        });
      });
  });
});
