'use strict';

exports.up = (knex) => (
  knex.schema
    .raw(`
      ALTER TABLE files
        RENAME COLUMN text TO pages
    `)
    .raw(`
      ALTER TABLE files
        ALTER COLUMN pages TYPE text[]
        USING array[pages]::text[]
    `)
);

exports.down = (knex) => (
  knex.schema
    .raw(`
      ALTER TABLE files
        ALTER COLUMN pages TYPE text
        USING array_to_string(pages, ' ')
    `)
    .raw(`
      ALTER TABLE files
        RENAME COLUMN pages TO text
    `)
);
