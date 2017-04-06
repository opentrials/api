'use strict';

exports.up = (knex) => (
  knex.schema
    .raw("UPDATE trials SET study_phase = NULL WHERE study_phase = '{null}'")
    .raw("UPDATE records SET study_phase = NULL WHERE study_phase = '{null}'")
);

exports.down = () => {
  throw Error('Destructive migration can\'t be rolled back.');
};
