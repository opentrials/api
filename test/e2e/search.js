'use strict';

const should = require('should');

describe('(e2e) search', () => {
  it('should be successful', () => {
    return server.inject('/v1/search')
      .then((response) => {
        should(response.statusCode).eql(200);
        return JSON.parse(response.result)
      })
      .then((apiResponse) => should(apiResponse.failedValidation).be.undefined())
  });
})
