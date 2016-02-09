const should = require('should');
const Trial = require('../../../api/models/trial');

describe('Trial', () => {
  it('exists', () => {
    should.exist(Trial);
  });
});
