'use strict';

const should = require('should');
const sinon = require('sinon');
const elasticsearch = require('../../../config').elasticsearch;


describe('Search', () => {
  before(clearDB)

  afterEach(clearDB)

  beforeEach(() => {
    sinon.stub(elasticsearch, 'search')
  });

  afterEach(() => {
    elasticsearch.search.restore();
  });

  describe('GET /v1/search', () => {
    const url = '/v1/search'

    describe('basic search', basicSearchTests(url, 'trial'));
    describe('pagination', paginationTests(url));

    it('passes the query string to elasticsearch', () => {
      elasticsearch.search.returns(Promise.reject(new Error('Ignore ElasticSearch response')));

      return server.inject(`${url}?q=foo`)
        .then(() => {
          elasticsearch.search.calledWithMatch({ q: 'foo' }).should.be.true();
        });
    });
  });

  describe('GET /v1/search/autocomplete/{in}', () => {
    describe('GET /v1/search/autocomplete/condition',
             autocompleteTests('/v1/search/autocomplete/condition', 'condition'));

    describe('GET /v1/search/autocomplete/intervention',
             autocompleteTests('/v1/search/autocomplete/intervention', 'intervention'));

    describe('GET /v1/search/autocomplete/location',
             autocompleteTests('/v1/search/autocomplete/location', 'location'));

    describe('GET /v1/search/autocomplete/person',
             autocompleteTests('/v1/search/autocomplete/person', 'person'));

    describe('GET /v1/search/autocomplete/organisation',
             autocompleteTests('/v1/search/autocomplete/organisation', 'organisation'));
  });
});


function basicSearchTests(url, factoryName) {
  return () => {
    it('returns empty list if no entities were found', () => {
      const esResult = {
        hits: {
          total: 0,
          hits: [],
        },
      };

      elasticsearch.search.returns(Promise.resolve(esResult));

      return server.inject(url)
        .then((response) => {
          response.statusCode.should.equal(200);
          JSON.parse(response.result).should.deepEqual({
            total_count: 0,
            items: [],
          });
        })
    });

    it('returns the found entities', () => {
      const esResult = {
        hits: {
          total: 1,
          hits: [
            { _source: JSON.stringify(factory.build(factoryName)) },
          ],
        },
      };

      elasticsearch.search.returns(Promise.resolve(esResult));

      return server.inject(url)
        .then((response) => {
          const items = esResult.hits.hits.map((hit) => hit._source);

          response.statusCode.should.equal(200);
          JSON.parse(response.result).should.deepEqual({
            total_count: items.length,
            items: items,
          });
        })
    });

    it('defines the default operator as AND', () => {
      elasticsearch.search.returns(Promise.reject(new Error('Ignore ElasticSearch response')));

      return server.inject(url)
        .then(() => {
          elasticsearch.search.calledWithMatch({ defaultOperator: 'AND' }).should.be.true();
        });
    });

    it.skip('returns 500 if there were some error with elasticsearch', () => {
      // FIXME: There doesn't seems to be a way to set the status code with the
      // current swagger-node-runner version. This was fixed in later versions,
      // but other problems were created, so we can't update yet.
      // See https://github.com/theganyo/swagger-node-runner/issues/33
      elasticsearch.search.returns(Promise.reject(new Error('Ignore ElasticSearch response')));

      return server.inject(url)
        .then((response) => response.statusCode.should.equal(500));
    });
  };
}


function paginationTests(url) {
  return () => {
    beforeEach(() => {
      elasticsearch.search.returns(Promise.reject(new Error('Ignore ES result')))
    });

    it('defaults to first page and 20 items per page', () => {
      return server.inject(url)
        .then(() => {
          elasticsearch.search.calledWithMatch({ from: 0, size: 20 }).should.be.true();
        });
    });

    it('allows getting other pages', () => {
      return server.inject(`${url}?page=3&per_page=20`)
        .then(() => {
          elasticsearch.search.calledWithMatch({ from: 40, size: 20 }).should.be.true();
        });
    });

    it('allows changing number of items per page', () => {
      return server.inject(`${url}?per_page=33`)
        .then(() => {
          elasticsearch.search.calledWithMatch({ from: 0, size: 33 }).should.be.true();
        });
    });

    it('total_count contains the number of items in total, not per page', () => {
      const esResult = {
        hits: {
          total: 51,
          hits: []
        }
      };

      elasticsearch.search.returns(Promise.resolve(esResult));

      return server.inject(url)
        .then((response) => {
          const result = JSON.parse(response.result);

          should(result.total_count).equal(esResult.hits.total);
        });
    });

    it('validates that page is greater than 1', () => {
      // FIXME: Should return error HTTP status code
      return server.inject(`${url}?page=0`)
        .then((response) => {
          const result = JSON.parse(response.result);

          should(result.failedValidation).be.true();
          should(result.code).equal('MINIMUM');
          should(result.paramName).equal('page');
        });
    });

    it('validates that page is smaller than 100', () => {
      // FIXME: Should return error HTTP status code
      return server.inject(`${url}?page=101`)
        .then((response) => {
          const result = JSON.parse(response.result);

          should(result.failedValidation).be.true();
          should(result.code).equal('MAXIMUM');
          should(result.paramName).equal('page');
        });
    });

    it('validates that items per page is greater than 10', () => {
      // FIXME: Should return error HTTP status code
      return server.inject(`${url}?per_page=9`)
        .then((response) => {
          const result = JSON.parse(response.result);

          should(result.failedValidation).be.true();
          should(result.code).equal('MINIMUM');
          should(result.paramName).equal('per_page');
        });
    });

    it('validates that items per page is smaller than 100', () => {
      // FIXME: Should return error HTTP status code
      return server.inject(`${url}?per_page=101`)
        .then((response) => {
          const result = JSON.parse(response.result);

          should(result.failedValidation).be.true();
          should(result.code).equal('MAXIMUM');
          should(result.paramName).equal('per_page');
        });
    });
  }
}

function autocompleteTests(url, factoryName) {
  return () => {
    describe('basic search', basicSearchTests(url, factoryName));
    describe('pagination', paginationTests(url));

    it('passes an undefined query string to elasticsearch if called with empty query', () => {
      elasticsearch.search.returns(Promise.reject(new Error('Ignore ElasticSearch response')));

      return server.inject(url)
        .then(() => {
          elasticsearch.search.calledWithMatch({ q: undefined }).should.be.true();
        });
    });

    it('matches query on "name" field in elasticsearch', () => {
      elasticsearch.search.returns(Promise.reject(new Error('Ignore ElasticSearch response')));
      const expectedQueryParams = {
        body: {
          query: {
            match: {
              name: 'foo',
            },
          },
        },
      };

      return server.inject(`${url}?q=foo`)
        .then(() => {
          elasticsearch.search.calledWithMatch(expectedQueryParams).should.be.true();
        });
    });
  };
}
