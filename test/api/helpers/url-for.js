'use strict';

const should = require('should');
const Trial = require('../../../api/models/trial');
const config = require('../../../config');
const urlFor = require('../../../api/helpers').urlFor;

describe('urlFor', () => {
  it('should return the trial URL', () => (
    factory.build('trial')
      .then((trial) => {
        should(urlFor(trial)).equal(`${config.url}/v1/trials/${trial.id}`);
      })
  ));

  it('should accept an array of models', () => (
    Promise.all([
      factory.build('trial'),
      factory.build('source'),
    ]).then((models) => {
      const trial = models[0];
      const source = models[1];

      should(urlFor([trial, source])).equal(`${config.url}/v1/trials/${trial.id}/sources/${source.id}`);
    })
  ));

  it('should return undefined if any of the models is new', () => {
    Promise.all([
      new Trial(),
      factory.build('source'),
    ]).then((models) => {
      const trial = models[0];
      const source = models[1];

      should(urlFor([trial, source])).be.undefined();
    });
  });
});
