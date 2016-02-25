const sinon = require('sinon');
const elasticsearch = require('../../../config').elasticsearch;

describe('Search', () => {
  before(clearDB)

  afterEach(clearDB)

  describe('GET /v1/search', () => {
    let searchStub;

    beforeEach(() => {
      searchStub = sinon.stub(elasticsearch, 'search')
    });

    afterEach(() => {
      searchStub.restore();
    });

    it('returns empty list if no trials were found', () => {
      const esResult = {
        hits: {
          hits: [],
        },
      };

      searchStub.returns(Promise.resolve(esResult));

      return server.inject('/v1/search')
        .then((response) => {
          response.statusCode.should.equal(200);
          JSON.parse(response.result).should.deepEqual({
            total_count: 0,
            items: [],
          });
        })
    });

    it('returns the trials', () => {
      const trial = fixtures.trial();
      trial.attributes.id = 'd429efb2-dbf1-11e5-b5d2-0a1d41d68578';
      const esResult = {
        hits: {
          hits: [
            { _source: trial.toJSON() },
          ],
        },
      };

      searchStub.returns(Promise.resolve(esResult));

      return server.inject('/v1/search')
        .then((response) => {
          const items = esResult.hits.hits.map((hit) => {
            hit._source.registration_date = hit._source.registration_date.toISOString();
            return hit._source;
          });

          response.statusCode.should.equal(200);
          JSON.parse(response.result).should.deepEqual({
            total_count: items.length,
            items: items,
          });
        })
    });

    it('passes the query string to elasticsearch', () => {
      searchStub.returns(Promise.reject(new Error('ElasticSearch error')));

      return server.inject('/v1/search?q=foo')
        .then(() => {
          searchStub.calledWithMatch({ q: 'foo' }).should.be.true();
        });
    });

    it.skip('returns 500 if there were some error with elasticsearch', () => {
      // FIXME: There doesn't seems to be a way to set the status code with the
      // current swagger-node-runner version. This was fixed in later versions,
      // but other problems were created, so we can't update yet.
      // See https://github.com/theganyo/swagger-node-runner/issues/33
      searchStub.returns(Promise.reject(new Error('ElasticSearch error')));

      return server.inject('/v1/search')
        .then((response) => response.statusCode.should.equal(500));
    });
  });
});
