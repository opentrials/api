'use strict';

exports.up = (knex) => (
  knex.schema
    .raw('ALTER TABLE sources DROP CONSTRAINT sources_type_check;')
    .raw(`ALTER TABLE sources ADD CONSTRAINT sources_type_check
          CHECK (type = ANY (ARRAY['register'::text, 'other'::text, 'journal'::text]))`)
    .raw('UPDATE sources SET type = \'journal\' WHERE id = \'pubmed\'')
);

exports.down = (knex) => (
  knex.schema
    .raw('UPDATE sources SET type = \'other\' WHERE id = \'pubmed\'')
    .raw('ALTER TABLE sources DROP CONSTRAINT sources_type_check;')
    .raw(`ALTER TABLE sources ADD CONSTRAINT sources_type_check
          CHECK (type = ANY (ARRAY['register'::text, 'other'::text]))
    `)
);
