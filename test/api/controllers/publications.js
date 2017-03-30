'use strict';

describe('Publication', () => {
  before(clearDB);

  afterEach(clearDB);

  describe('GET /v1/publications/{id}', () => {
    it('returns 404 if there\'s no publication with the received ID', () => (
      server.inject('/v1/publications/eb1af997-3e9c-4f31-895f-002ec1cfa196')
        .then((response) => {
          response.statusCode.should.equal(404);
        })
    ));

    it('returns the Publication', () => {
      let publication;

      return factory.create('publication')
        .then((_publication) => (publication = _publication))
        .then(() => server.inject(`/v1/publications/${publication.attributes.id}`))
        .then((response) => {
          response.statusCode.should.equal(200);

          const expectedResult = JSON.parse(JSON.stringify(publication.toJSON()));
          const result = JSON.parse(response.result);
          result.should.deepEqual(expectedResult);
        });
    });

    it('returns all the attributes', () => {
      const attributes = [
        'id',
        'source',
        'source_url',
        'title',
        'abstract',
        'created_at',
        'updated_at',
        'authors',
        'url',
      ];
      factory.create('publication').then((model) => (
        server.inject(`/v1/publications/${model.attributes.id}`)
          .then((response) => JSON.parse(response.payload)
                .should.have.keys(...attributes))
      ));
    });
  });
});
