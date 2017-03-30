'use strict';

describe('Sources', () => {
  before(clearDB);

  afterEach(clearDB);

  describe('GET /v1/sources', () => {
    it('returns all the sources', () => (
      factory.createMany('source', 2).then((models) => (
        server.inject('/v1/sources')
          .then((response) => {
            response.statusCode.should.equal(200);

            const expectedResult = JSON.parse(JSON.stringify(models));
            const result = JSON.parse(response.result);

            result.should.deepEqual(expectedResult);
          })
      ))
    ));

    it('returns all the attributes', () => {
      const attributes = [
        'id',
        'name',
        'source_url',
        'terms_and_conditions_url',
        'type',
      ];
      factory.create('source').then(() => (
        server.inject('/v1/sources')
          .then((response) => JSON.parse(response.payload)[0]
                .should.have.keys(...attributes))
      ));
    });
  });
});

