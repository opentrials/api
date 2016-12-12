'use strict';

const should = require('should');
const pgTypes = require('pg').types;
const customTypes = require('../../config/pg_types');

describe('parseDate', () => {
  const DATE_OID = 1082;
  const parseDate = pgTypes.getTypeParser(DATE_OID);

  it('does not offset time', () => {
    let testDate = '2016-12-01';
    let expectedDate = new Date(testDate).toISOString();
    let resultedDate = parseDate(testDate);
    resultedDate.toISOString().should.equal(expectedDate);
  });

  it('returns null when value is null', () => {
    let testDate = null;
    should(parseDate(testDate)).equal(null);
  });

});

describe('parseDateArray', () => {
  const DATE_ARRAY_OID = 1182;
  const parseDateArray = pgTypes.getTypeParser(DATE_ARRAY_OID);

  it('parses array correctly', () => {
    let testDate = '2014-01-12';
    let testPgArray = `{${testDate}}`;
    let expectedDate = new Date(testDate).toISOString();
    let resultedArray = parseDateArray(testPgArray);
    resultedArray.map((date) => date.toISOString()).should.deepEqual([
      expectedDate,
    ]);
  });

  it('returns null when value is null', () => {
    let testPgArray = null;
    should(parseDateArray(testPgArray)).equal(null);
  });

  it('returns empty array when there are no values', () => {
    let testPgArray = `{}`;
    parseDateArray(testPgArray).should.be.empty();
  });

  it('returns null for the null values', () => {
    let testPgArray = `{null}`;
    parseDateArray(testPgArray).should.deepEqual([
      null,
    ]);
  });
});
