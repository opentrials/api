'use strict';

exports.up = (knex) => (
  knex.schema
    .raw('ALTER TABLE trials DROP CONSTRAINT trials_status_check')
    .raw(`ALTER TABLE trials ADD CONSTRAINT trials_status_check
            CHECK (status = ANY(ARRAY[
                'ongoing'::text,
                'withdrawn'::text,
                'suspended'::text,
                'terminated'::text,
                'complete'::text,
                'unknown'::text,
                'other'::text
            ]))
      `)
    .raw('ALTER TABLE records DROP CONSTRAINT records_status_check')
    .raw(`ALTER TABLE records ADD CONSTRAINT records_status_check
            CHECK (status = ANY(ARRAY[
                'ongoing'::text,
                'withdrawn'::text,
                'suspended'::text,
                'terminated'::text,
                'complete'::text,
                'unknown'::text,
                'other'::text
            ]))
      `)
);

exports.down = (knex) => (
  knex.schema
    .raw('ALTER TABLE trials DROP CONSTRAINT trials_status_check')
    .raw(`ALTER TABLE trials ADD CONSTRAINT trials_status_check
            CHECK (status = ANY(ARRAY[
                'ongoing'::text,
                'withdrawn'::text,
                'suspended'::text,
                'terminated'::text,
                'complete'::text,
                'other'::text
            ]))
      `)
    .raw('ALTER TABLE records DROP CONSTRAINT records_status_check')
    .raw(`ALTER TABLE records ADD CONSTRAINT records_status_check
            CHECK (status = ANY(ARRAY[
                'ongoing'::text,
                'withdrawn'::text,
                'suspended'::text,
                'terminated'::text,
                'complete'::text,
                'other'::text
            ]))
      `)
);
