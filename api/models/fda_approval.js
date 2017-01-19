'use strict';

require('./fda_application');

const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');

const FDAApproval = BaseModel.extend({
  tableName: 'fda_approvals',
  visible: [
    'id',
    'supplement_number',
    'type',
    'action_date',
    'notes',
    'fda_application',
  ],
  fda_application() {
    return this.belongsTo('FDAApplication');
  },
});

module.exports = bookshelf.model('FDAApproval', FDAApproval);
