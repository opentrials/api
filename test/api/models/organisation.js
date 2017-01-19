'use strict';

const should = require('should');
const helpers = require('../../../api/helpers');
const Organisation = require('../../../api/models/organisation');

describe('Organisation', () => {
  before(clearDB);

  afterEach(clearDB);

  describe('trials', () => {
    it('returns trials related to the organisation', () => {
      let trialId;

      return factory.create('trialWithRelated')
        .then((trial) => {
          trialId = trial.id;
          const organisationId = toJSON(trial).organisations[0].id;
          return new Organisation({ id: organisationId }).fetch({ withRelated: 'trials' });
        }).then((organisation) => {
          const trialsIds = organisation.related('trials').models.map((trial) => trial.id);
          should(trialsIds).containEql(trialId);
        });
    });
  });

  describe('url', () => {
    it('returns the url', () => (
      factory.build('organisation')
        .then((org) => should(org.toJSON().url).eql(helpers.urlFor(org)))
    ));
  });
});
