'use strict';
const uuid = require('node-uuid');
const bookshelf = require('../../config').bookshelf;

const BaseModel = bookshelf.Model.extend({
  serialize: function (options) {
    const attributes = Object.assign(
      {},
      Object.getPrototypeOf(BaseModel.prototype).serialize.call(this, arguments)
    );

    // FIXME: This is a workaround because Swagger doesn't allow nullable
    // fields. Check https://github.com/OAI/OpenAPI-Specification/issues/229.
    for (let key of Object.keys(attributes)) {
      const value = attributes[key];
      if (value === null) {
        delete attributes[key];
      }
    }

    return attributes;
  },
  initialize: function () {
    this.on('saving', this.addIdIfNeeded);
  },
  addIdIfNeeded: (model) => {
    if (!model.attributes.id) {
      model.attributes.id = uuid.v1();
    }
  },
});

module.exports = BaseModel;
