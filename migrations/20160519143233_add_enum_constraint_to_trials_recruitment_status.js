'use strict';

exports.up = (knex) => (
  knex.schema
    .raw('UPDATE trials SET recruitment_status = LOWER(recruitment_status)')
    .raw('UPDATE records SET recruitment_status = LOWER(recruitment_status)')
    .raw(`ALTER TABLE trials ADD CONSTRAINT trials_recruitment_status_check
          CHECK (recruitment_status = ANY(ARRAY['pending'::text, 'recruiting'::text,
                                                'suspended'::text, 'complete'::text,
                                                'other'::text]))`)
    .raw(`ALTER TABLE records ADD CONSTRAINT records_recruitment_status_check
          CHECK (recruitment_status = ANY(ARRAY['pending'::text, 'recruiting'::text,
                                                'suspended'::text, 'complete'::text,
                                                'other'::text]))`)
);

exports.down = (knex) => (
  knex.schema
    .raw('ALTER TABLE trials DROP CONSTRAINT trials_recruitment_status_check')
    .raw('ALTER TABLE records DROP CONSTRAINT records_recruitment_status_check')
);
