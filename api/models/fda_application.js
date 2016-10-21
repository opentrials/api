'use strict';

require('./fda_approval');
require('./organisation');

const helpers = require('../helpers');
const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');
const relatedModels = [
  'fda_approvals',
  'organisation',
]

const FDAApplication = BaseModel.extend({
  tableName: 'fda_applications',
  visible: [
    'id',
    'drug_name',
    'active_ingredients',
    'fda_approvals',
    'organisation',
  ],
  fda_approvals: function () {
    return this.hasMany('FDAApproval');
  },
  organisation: function () {
    return this.belongsTo('Organisation');
  },
  virtuals: {
    url: function () {
      return helpers.urlFor(this);
    },
  },
}, {
  relatedModels
});

module.exports = bookshelf.model('FDAApplication', FDAApplication);
