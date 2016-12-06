'use strict';

const should = require('should');
const pgTypes = require('pg').types;
const customTypes = require('../../config/pg_types');

describe('parseDate', () => {
  const DATE_OID = 1082;

  it('does not offset time', () => {
    let testDate = '2016-12-01';
    let expectedDate = new Date(testDate).toISOString();
    let resultedDate = pgTypes.getTypeParser(DATE_OID)(testDate);
    resultedDate.toISOString().should.equal(expectedDate);
  });

  it('returns null when value is null', () => {
    let testDate = null;
    should.equal(pgTypes.getTypeParser(DATE_OID)(testDate), null);
  });

  it('raises when value is invalid', () => {
    let testDate = 'not a date';
    pgTypes.getTypeParser(DATE_OID).bind(null, testDate).should.throw(/^Invalid Date/);
  })
});

describe('parseDateArray', () => {
  const DATE_ARRAY_OID = 1182;

  it('parses array correctly', () => {
    let testDate = '2014-01-12';
    let testArray = `{${testDate}}`;
    let expectedDate = new Date(testDate).toISOString();
    let resultedArray = pgTypes.getTypeParser(DATE_ARRAY_OID)(testArray);
    resultedArray.map((date) => date.toISOString()).should.containEql(expectedDate);
  });

  it('returns null when value is null', () => {
    let testArray = null;
    should.equal(pgTypes.getTypeParser(DATE_ARRAY_OID)(testArray), null);
  });

  it('returns empty array when there are no values', () => {
    let testArray = `{}`;
    let resultedArray = pgTypes.getTypeParser(DATE_ARRAY_OID)(testArray);
    resultedArray.should.be.empty;
  });

  it('raises when one of the values is invalid', () => {
    let testArray = `{2016-07-08, null}`;
    pgTypes.getTypeParser(DATE_ARRAY_OID).bind(null, testArray).should.throw(/^Invalid Date/);
  });
});
