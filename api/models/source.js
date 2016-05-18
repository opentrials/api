'use strict';

require('./trial');

const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');

const Source = BaseModel.extend({
  tableName: 'sources',
  visible: [
    'id',
    'name',
    'type',
  ],
  latestUpdatedDates: function () {
    return bookshelf.knex
      .select(
        bookshelf.knex.raw('source_id as id'),
        bookshelf.knex.raw('sources.name as name'),
        bookshelf.knex.raw('max(trialrecords.updated_at) as latest_updated_date')
      )
      .from('trialrecords')
      .leftJoin('sources', 'source_id', 'sources.id')
      .groupBy('source_id', 'sources.name');
  },
  trialsPerSource: function () {
    return bookshelf.knex
      .select(
        bookshelf.knex.raw('source_id as id'),
        bookshelf.knex.raw('sources.name as name'),
        bookshelf.knex.raw('count(distinct trialrecords.trial_id)::int')
      )
      .from('trialrecords')
      .leftJoin('sources', 'source_id', 'sources.id')
      .groupBy('source_id', 'sources.name')
      .orderBy('sources.name');
  },
});

module.exports = bookshelf.model('Source', Source);
