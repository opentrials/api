'use strict';

const should = require('should');

describe('(e2e) sources', () => {
  it('should be successful', () => (
    server.inject('/v1/sources')
      .then((response) => {
        should(response.statusCode).eql(200);
        return JSON.parse(response.result);
      })
      .then((apiResponse) => should(apiResponse.failedValidation).be.undefined())
  ));
});
