'use strict';

const should = require('should');

describe('FDAApplication', () => {
  before(clearDB);

  afterEach(clearDB);

  describe('virtuals', () => {
    describe('type', () => {
      it('extracts the type from the ID', () => (
        factory.build('fda_application', { id: 'ANDA000000' })
          .then((fdaApproval) => should(fdaApproval.toJSON().type).equal('ANDA'))
      ));

      it('is undefined when could not extract it from the ID', () => {
        factory.build('fda_application', { id: '0' })
          .then((fdaApproval) => should(fdaApproval.toJSON().type).be.undefined());
      });
    });
  });
});
