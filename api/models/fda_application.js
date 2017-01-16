'use strict';

require('./fda_approval');
require('./organisation');

const helpers = require('../helpers');
const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');

const relatedModels = [
  'fda_approvals',
  'organisation',
];

const FDAApplication = BaseModel.extend({
  tableName: 'fda_applications',
  visible: [
    'id',
    'drug_name',
    'active_ingredients',
    'fda_approvals',
    'organisation',
  ],
  fda_approvals() {
    return this.hasMany('FDAApproval');
  },
  organisation() {
    return this.belongsTo('Organisation');
  },
  virtuals: {
    url() {
      return helpers.urlFor(this);
    },
    type() {
      const matches = this.id.match(/^[A-Z]+/i);
      if (matches) {
        return matches[0];
      }
      return undefined;
    },
  },
}, {
  relatedModels,
});

module.exports = bookshelf.model('FDAApplication', FDAApplication);
