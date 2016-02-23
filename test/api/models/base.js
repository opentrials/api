const BaseModel = require('../../../api/models/base');
const should = require('should');

describe('BaseModel', () => {
  it('sets the ID on saving', () => {
    const base = new BaseModel();
    should.not.exist(base.attributes.id);
    base.trigger('saving', base);
    should.exist(base.attributes.id);
  });
});
