const should = require('should');
const helpers = require('../../../api/helpers');
const Record = require('../../../api/models/record');

describe('Record', () => {
  before(clearDB);

  afterEach(clearDB);

  it('should define the relatedModels', () => {
    should(Record.relatedModels).deepEqual([
      'trial',
      'source',
    ]);
  })

  it('defines url and trial_url', () => {
    return factory.create('record')
      .then((record) => {
        const trial = record.related('trial');
        const fakeRecord = { id: record.id, tableName: 'records' };

        record.toJSON().should.containEql({
          url: helpers.urlFor([trial, fakeRecord]),
          trial_url: helpers.urlFor(trial),
        });
      });
  });
});
