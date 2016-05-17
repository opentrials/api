'use strict';
const Promise = require('bluebird');

describe('Stats', () => {
  before(clearDB);

  afterEach(clearDB);

  describe('GET /v1/stats', () => {

    it('returns the Stats', () => {
      return factory.create('trialWithRelated')
        .then(() => factory.create('record'))
        .then(() => server.inject('/v1/stats'))
        .then((response) => {
          response.statusCode.should.equal(200);
          const result = JSON.parse(response.result);

          result.trialsCount.should.equal(2);
          result.trialsPerRegistry.should.be.an.Array();
          result.trialsPerYear.should.be.an.Array();
          result.topLocations.should.be.an.Array();
          result.dateRegistry.should.be.an.Array();
        });
    })
  });
});
