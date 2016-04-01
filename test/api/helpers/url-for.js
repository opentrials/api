const uuid = require('node-uuid');
const config = require('../../../config');
const urlFor = require('../../../api/helpers').urlFor;

describe('urlFor', () => {
  it('should return the trial URL', () => {
    const trial = fixtures.trial();
    trial.id = uuid.v1();

    urlFor(trial).should.equal(`http://0.0.0.0:10010/v1/trials/${trial.id}`);
  });
});
