'use strict';

exports.up = (knex) => {
  function addOnDeleteCascade(schema, tableName, originalConstraintName) {
    const constraint = `${tableName}_trial_id_foreign`;
    const originalConstraint = originalConstraintName || constraint;

    return schema.raw(`ALTER TABLE ${tableName}
                       DROP CONSTRAINT ${originalConstraint},
                       ADD CONSTRAINT ${constraint}
                         FOREIGN KEY (trial_id)
                         REFERENCES trials(id)
                         ON DELETE CASCADE
    `);
  }

  const schema = knex.schema;

  addOnDeleteCascade(schema, 'trials_conditions', 'trials_problems_trial_id_foreign');
  addOnDeleteCascade(schema, 'trials_interventions');
  addOnDeleteCascade(schema, 'trials_locations');
  addOnDeleteCascade(schema, 'trials_organisations');
  addOnDeleteCascade(schema, 'trials_persons');
  addOnDeleteCascade(schema, 'trials_publications');

  return schema;
};

exports.down = (knex) => {
  function removeOnDeleteCascade(schema, tableName, originalConstraintName) {
    const constraint = `${tableName}_trial_id_foreign`;
    const originalConstraint = originalConstraintName || constraint;

    return schema.raw(`ALTER TABLE ${tableName}
                       DROP CONSTRAINT ${constraint},
                       ADD CONSTRAINT ${originalConstraint}
                         FOREIGN KEY (trial_id)
                         REFERENCES trials(id)
    `);
  }

  const schema = knex.schema;

  removeOnDeleteCascade(schema, 'trials_conditions', 'trials_problems_trial_id_foreign');
  removeOnDeleteCascade(schema, 'trials_interventions');
  removeOnDeleteCascade(schema, 'trials_locations');
  removeOnDeleteCascade(schema, 'trials_organisations');
  removeOnDeleteCascade(schema, 'trials_persons');
  removeOnDeleteCascade(schema, 'trials_publications');

  return schema;
};
