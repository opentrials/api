'use strict';

const _ = require('lodash');
const uuid = require('node-uuid');
const bookshelf = require('../../config').bookshelf;

const BaseModel = bookshelf.Model.extend({
  serialize(...args) {
    const attributes = Object.assign(
      {},
      Object.getPrototypeOf(BaseModel.prototype).serialize.call(this, args)
    );

    // FIXME: We don't want empty objects to be added to the resulting JSON.
    // This is the default behaviour of Bookshelf when using single entities,
    // but for collections it isn't. Looks like a bug in their side (see
    // https://github.com/tgriesser/bookshelf/issues/753)
    const isEmptyPlainObject = (value) => _.isPlainObject(value) && _.isEmpty(value);

    // FIXME: This is a workaround because Swagger doesn't allow nullable
    // fields. Check https://github.com/OAI/OpenAPI-Specification/issues/229.
    const isNullOrEmptyPlainObject = (value) => (value === null) || isEmptyPlainObject(value);

    return _.omitBy(attributes, isNullOrEmptyPlainObject);
  },
  toJSON(...args) {
    // FIXME: Bookshelf's virtuals plugin adds the virtual attributes
    // regardless of their value. We can't change this behaviour on
    // `serialize()`, because the plugin overwrittes it, so we need to do it
    // here.
    const json = Object.getPrototypeOf(BaseModel.prototype).toJSON.call(this, args);

    return _.omitBy(json, _.isUndefined);
  },
  initialize() {
    this.on('saving', this.addIdIfNeeded);
  },
  addIdIfNeeded: (model) => {
    if (!model.attributes.id) {
        // eslint-disable-next-line no-param-reassign
      model.attributes.id = uuid.v1();
    }
  },
});

module.exports = BaseModel;
