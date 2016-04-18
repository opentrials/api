'use strict';

exports.up = (knex) => {
  const query = `
    UPDATE trialrecords
    SET trial_id = trials_trialrecords.trial_id
    FROM (
      SELECT trial_id, trialrecord_id
      FROM trials_trialrecords
    ) AS trials_trialrecords
    WHERE trialrecords.id = trials_trialrecords.trialrecord_id
  `;
  function addTrialIdColumn(table) {
    table.uuid('trial_id')
      .references('trials.id')
      .index();
  }

  return knex.schema.table('trialrecords', addTrialIdColumn)
    .then(() => knex.raw(query))
    .then(() => knex.schema.dropTable('trials_trialrecords'));
};

exports.down = () => {
  throw Error('Destructive migration can\'t be rolled back.');
};
