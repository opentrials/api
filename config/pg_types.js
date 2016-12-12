'use strict';

// Overwrite node-pg-types date parser. See https://github.com/tgriesser/knex/issues/1750
const pgTypes = require('pg').types;

const DATE_OID = 1082;
const DATE_ARRAY_OID = 1182;

function parseDate(value) {
  if (!value) {
    return null;
  }

  return new Date(Date.parse(value));
}

function parseDateArray(value) {
  if (!value) {
    return null;
  }

  const parser = pgTypes.arrayParser.create(value, (entry) => {
    let parsedEntry = entry;
    if (String(entry).toLowerCase() !== String(null)) {
      parsedEntry = parseDate(entry);
    } else {
      parsedEntry = null;
    }
    return parsedEntry;
  });

  return parser.parse();
}

pgTypes.setTypeParser(DATE_OID, parseDate);
pgTypes.setTypeParser(DATE_ARRAY_OID, parseDateArray);
