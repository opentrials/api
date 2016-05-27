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
    return factory.create('publication').then((publication) => {
      const publicationJSON = publication.toJSON();

      publication.toJSONSummary().should.deepEqual({
        id: publicationJSON.id,
        title: publicationJSON.title,
        source: publication.related('source').toJSON(),
      });
    });
  });
});
