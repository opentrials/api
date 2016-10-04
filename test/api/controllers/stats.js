'use strict';

describe('Stats', () => {
  before(clearDB);

  afterEach(clearDB);

  describe('GET /v1/stats', () => {

    it('returns 404', () => {
      return factory.create('trialWithRelated')
        .then(() => factory.create('record'))
        .then(() => server.inject('/v1/stats'))
        .then((response) => {
          response.statusCode.should.equal(404);
        });
    })
  });
});
