'use strict';

require('./fda_approval');
require('./organisation');

const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');
const relatedModels = [
  'fda_approvals',
  'organisation',
]

const FdaApplication = BaseModel.extend({
  tableName: 'fda_applications',
  visible: [
    'id',
    'drug_name',
    'active_ingredients',
    'fda_approvals',
    'organisation',
  ],
  fda_approvals: function () {
    return this.hasMany('FdaApproval');
  },
  organisation: function () {
    return this.belongsTo('Organisation');
  }
},{
  relatedModels
});

module.exports = bookshelf.model('FdaApplication', FdaApplication);
