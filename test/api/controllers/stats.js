'use strict';
const Promise = require('bluebird');

describe('Stats', () => {
  before(clearDB);

  afterEach(clearDB);

  describe('GET /v1/stats', () => {

    it('returns the Stats', () => {
      let promises = [];
      promises.push(factory.create('trialWithRelated'));
      promises.push(factory.create('record'));

      Promise.all(promises).then((result) => {
        return server.inject('/v1/stats')
          .then((response) => {
            response.statusCode.should.equal(200);

            let expectedResult = {
              trialsCount: 2,
              trialsPerRegistry: [{ registry: 'primary_register', count: 1 }],
              trialsPerYear: [{ year: 2016, count: 2 }],
              topLocations: [{
                name: 'location2',
                count: 1
              }],
              dateRegistry: [{}]
            };
            const result = JSON.parse(response.result);
            expectedResult.dateRegistry[0].updatedate = result.dateRegistry[0].updatedate;
            expectedResult.dateRegistry[0].registry = result.dateRegistry[0].registry;
            expectedResult.topLocations[0].id = result.topLocations[0].id;

            result.should.deepEqual(expectedResult);
          });
      })
    });
  })
});
