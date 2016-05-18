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
    'slug',
  ],
  source: function () {
    return this.belongsTo('Source');
  },
}, { relatedModels });

module.exports = bookshelf.model('Publication', Publication);
