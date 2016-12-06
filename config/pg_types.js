'use strict';

// Overwrite node-pg-types date parser. See https://github.com/tgriesser/knex/issues/1750
const pgTypes = require('pg').types;

const DATE_OID = 1082;
const DATE_ARRAY_OID = 1182;

function parseDate(value) {
  let date;

  if (isNaN(Date.parse(value)) === true) {
    if (!value) {
      date = null;
    } else {
      throw new Error('Invalid Date');
    }
  } else {
    date = new Date(value);
  }
  return date;
}

function parseDateArray(value) {
  if (!value) {
    return null;
  }

  const p = pgTypes.arrayParser.create(value, (entry) => {
    let parsedEntry = entry;
    if (entry !== null) {
      parsedEntry = parseDate(entry);
    }
    return parsedEntry;
  });

  return p.parse();
}

pgTypes.setTypeParser(DATE_OID, parseDate);
pgTypes.setTypeParser(DATE_ARRAY_OID, parseDateArray);
