'use strict';
const uuid = require('node-uuid');
const bookshelf = require('../../config').bookshelf;

const BaseModel = bookshelf.Model.extend({
  serialize: function (options) {
    const attributes = {};

    for (let key of Object.keys(this.attributes)) {
      const value = this.attributes[key];
      if (value) {
        attributes[key] = value;
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
