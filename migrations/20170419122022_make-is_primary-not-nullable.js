'use strict';

exports.up = (knex) => (
  knex.schema
    .raw('UPDATE records SET is_primary = false where is_primary IS NULL')
    .raw('ALTER TABLE records ALTER COLUMN is_primary SET NOT NULL')
);

exports.down = () => {
  throw Error('Destructive migration can\'t be rolled back.');
};
