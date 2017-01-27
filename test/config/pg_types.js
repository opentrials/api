'use strict';

const should = require('should');
const pgTypes = require('pg').types;
require('../../config/pg_types');

describe('parseDate', () => {
  const DATE_OID = 1082;
  const parseDate = pgTypes.getTypeParser(DATE_OID);

  it('does not offset time', () => {
    const testDate = '2016-12-01';
    const expectedDate = new Date(testDate).toISOString();
    const resultedDate = parseDate(testDate);
    resultedDate.toISOString().should.equal(expectedDate);
  });

  it('returns null when value is null', () => {
    const testDate = null;
    should(parseDate(testDate)).equal(null);
  });
});

describe('parseDateArray', () => {
  const DATE_ARRAY_OID = 1182;
  const parseDateArray = pgTypes.getTypeParser(DATE_ARRAY_OID);

  it('parses array correctly', () => {
    const testDate = '2014-01-12';
    const testPgArray = `{${testDate}}`;
    const expectedDate = new Date(testDate).toISOString();
    const resultedArray = parseDateArray(testPgArray);
    resultedArray.map((date) => date.toISOString()).should.deepEqual([
      expectedDate,
    ]);
  });

  it('returns null when value is null', () => {
    const testPgArray = null;
    should(parseDateArray(testPgArray)).equal(null);
  });

  it('returns empty array when there are no values', () => {
    const testPgArray = '{}';
    parseDateArray(testPgArray).should.be.empty();
  });

  it('returns null for the null values', () => {
    const testPgArray = '{null}';
    parseDateArray(testPgArray).should.deepEqual([
      null,
    ]);
  });
});
