'use strict';

const config = require('../../../config');
const urlFor = require('../../../api/helpers').urlFor;

describe('urlFor', () => {
  it('should return the trial URL', () => (
    factory.build('trial')
      .then((trial) => {
        urlFor(trial).should.equal(`${config.url}/v1/trials/${trial.id}`);
      })
  ));

  it('should accept an array of models', () => (
    Promise.all([
      factory.build('trial'),
      factory.build('source'),
    ]).then((models) => {
      const trial = models[0];
      const source = models[1];

      urlFor([trial, source]).should.equal(`${config.url}/v1/trials/${trial.id}/sources/${source.id}`);
    })
  ));
});
