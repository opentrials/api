'use strict';

exports.up = (knex) => {
  function doSchemaModifications(schema, tableName) {
    return schema
      .table(tableName, (table) => {
        table.enu('status', [
          'ongoing',
          'withdrawn',
          'suspended',
          'terminated',
          'complete',
          'other',
        ]);
      })
      .raw(`UPDATE "${tableName}" SET recruitment_status = null`)
      .raw(`ALTER TABLE "${tableName}" DROP CONSTRAINT ${tableName}_recruitment_status_check`)
      .raw(`ALTER TABLE "${tableName}" ADD CONSTRAINT ${tableName}_recruitment_status_check
            CHECK (recruitment_status = ANY(ARRAY[
                'recruiting'::text,
                'not_recruiting'::text,
                'unknown'::text,
                'other'::text
            ]))
      `);
  }

  const schema = knex.schema;

  doSchemaModifications(schema, 'trials');
  doSchemaModifications(schema, 'records');

  return schema;
};

exports.down = () => {
  throw Error('Destructive migration can\'t be rolled back.');
};
