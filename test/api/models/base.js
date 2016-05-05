'use strict';

const BaseModel = require('../../../api/models/base');
const should = require('should');

describe('BaseModel', () => {
  it('sets the ID on saving', () => {
    const base = new BaseModel();
    should.not.exist(base.attributes.id);
    base.trigger('saving', base);
    should.exist(base.attributes.id);
  });

  it('removes null attributes when serializing', () => {
    const base = new BaseModel({ foo: null });

    base.toJSON().should.not.have.ownProperty('foo');
  });
});
