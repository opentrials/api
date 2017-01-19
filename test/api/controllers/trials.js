'use strict';

const should = require('should');
const Record = require('../../../api/models/record');

describe('Trials', () => {
  before(clearDB);

  afterEach(clearDB);

  describe('GET /v1/trials/{id}', () => {
    it('returns 404 if there\'s no trial with the received ID', () => (
      server.inject('/v1/trials/eb1af997-3e9c-4f31-895f-002ec1cfa196')
        .then((response) => {
          response.statusCode.should.equal(404);
        })
    ));

    it('returns the Trial', () => (
      factory.create('trialWithRelated')
        .then((trial) => (
          server.inject(`/v1/trials/${trial.attributes.id}`)
            .then((response) => {
              response.statusCode.should.equal(200);

              // Convert and load from JSON so things like Dates get
              // properly stringified and we can compare with the API's output.
              const expectedResult = JSON.parse(JSON.stringify(trial));
              const result = JSON.parse(response.result);

              result.should.deepEqual(expectedResult);
            })
        ))
    ));
  });

  describe('GET /v1/trials/{id}/records/{id}', () => {
    it('returns 404 if there\'s no trial with the received ID', () => (
      server.inject('/v1/trials/eb1af997-3e9c-4f31-895f-002ec1cfa196/records/eb1af997-3e9c-4f31-895f-002ec1cfa196')
        .then((response) => {
          response.statusCode.should.equal(404);
        })
    ));

    it('returns the records', () => (
      factory.create('record')
        .then((record) => (
          server.inject(`/v1/trials/${record.attributes.trial_id}/records/${record.attributes.id}`)
            .then((response) => {
              response.statusCode.should.equal(200);

              // Convert and load from JSON so things like Dates get
              // properly stringified and we can compare with the API's output.
              const expectedResult = JSON.parse(JSON.stringify(record));
              const result = JSON.parse(response.result);

              result.should.deepEqual(expectedResult);
            })
        ))
    ));
  });

  describe('GET /v1/trials/{id}/records', () => {
    it('returns an array with all trial\'s records', () => {
      let trialId;
      let records;

      return factory.create('trial')
        .then((trial) => (trialId = trial.attributes.id))
        .then(() => factory.createMany('record', { trial_id: trialId }, 2))
        .then(() => Record.query({ where: { trial_id: trialId } }).fetchAll({ withRelated: ['source'] }))
        .then((_records) => (records = _records))
        .then(() => server.inject(`/v1/trials/${trialId}/records`))
        .then((response) => {
          response.statusCode.should.equal(200);

          const result = JSON.parse(response.result);
          should(result).deepEqual(records.map((record) => toJSON(record)));
        });
    });

    it('returns empty array if the trial has no records', () => (
      server.inject('/v1/trials/00000000-0000-0000-0000-000000000000/records')
        .then((response) => {
          response.statusCode.should.equal(200);

          const result = JSON.parse(response.result);
          should(result).deepEqual([]);
        })
    ));
  });
});
