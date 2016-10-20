const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');

const FdaApproval = BaseModel.extend({
  tableName: 'fda_approvals',
  visible: [
    'id',
    'supplement_number',
    'type',
    'action_date',
    'notes',
  ],
});

module.exports = bookshelf.model('FdaApproval', FdaApproval);
