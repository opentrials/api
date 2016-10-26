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

  it('removes empty plain objects when serializing', () => {
    const base = new BaseModel({
      plainObj: {},
      nonPlainObj: [],
    });

    base.toJSON().should.not.have.ownProperty('plainObj');
    base.toJSON().should.have.ownProperty('nonPlainObj');
  });

  it('removes undefined virtual attributes', () => {
    const Model = BaseModel.extend({
      visible: ['data'],
      virtuals: {
        data: () => undefined,
      },
    });
    const model = new Model();

    should(model.toJSON()).not.have.ownProperty('data');
  });
});
