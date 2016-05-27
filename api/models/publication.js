'use strict';

const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');
const Source = require('./source');

const relatedModels = [
  'source',
];

const Publication = BaseModel.extend({
  tableName: 'publications',
  hasTimestamps: true,
  visible: [
    'id',
    'source',
    'source_url',
    'title',
    'abstract',
    'created_at',
    'updated_at',
    'facts',
    'authors',
  ],
  source: function () {
    return this.belongsTo('Source');
  },
  toJSONSummary: function () {
    const attributes = this.toJSON();
    const result = {
      id: attributes.id,
      title: attributes.title,
      source: this.related('source').toJSON(),
    };

    return result;
  },
}, {
  relatedModels
});

module.exports = bookshelf.model('Publication', Publication);
