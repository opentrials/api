const uuid = require('node-uuid');
const config = require('../../../config');
const urlFor = require('../../../api/helpers').urlFor;

describe('urlFor', () => {
  it('should return the trial URL', () => (
    factory.build('trial')
      .then((trial) => {
        urlFor(trial).should.equal(`${config.url}/v1/trials/${trial.id}`);
      })
  ));
});
