'use strict';

const should = require('should');
const helpers = require('../../../api/helpers');
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
          url: publication.url,
          title: publication.attributes.title,
          source_id: publication.attributes.source_id,
        });
      });
  });

  describe('url', () => {
    it('returns the url', () => {
      return factory.build('publication')
        .then((publication) => should(publication.toJSON().url).eql(helpers.urlFor(publication)));
    });
  });
});
