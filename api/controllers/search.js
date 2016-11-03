'use strict';

const client = require('../../config').elasticsearch;

function _convertElasticSearchResult(esResult) {
  return {
    total_count: esResult.hits.total,
    items: esResult.hits.hits.map((hit) => hit._source),
  };
}

function searchTrials(req, res) {
  const params = req.swagger.params;
  const page = params.page.value;
  const perPage = params.per_page.value;
  const searchQuery = {
    index: 'trials',
    type: 'trial',
    q: params.q.value,
    from: (page - 1) * perPage,
    size: perPage,
    defaultOperator: 'AND',
    sort: [
      'registration_date:desc',
      '_score:desc',
    ],
  };

  return client.search(searchQuery)
    .then(_convertElasticSearchResult)
    .then((data) => {
      res.status(200);
      res.setHeader('Content-Type', 'application/json');
      return res.end(data);
    })
    .catch((err) => {
      // FIXME: Log error and return 500 HTTP code
      res.finish();
      throw err;
    });
}

function _convertFDADocumentsElasticSearchResult(esResult) {
  return {
    total_count: esResult.hits.total,
    items: esResult.hits.hits.map((hit) => {
      const doc = hit._source;

      if (hit.inner_hits.page !== undefined) {
        const pages = hit.inner_hits.page.hits.hits;
        doc.file.pages = pages.map((page) => ({
          text: page._source.text,
          num: page._source.num,
        }));
      }

      return doc;
    }),
  };
}

function searchFDADocuments(req, res) {
  const params = req.swagger.params;
  const page = params.page.value;
  const perPage = params.per_page.value;
  const queryString = params.q.value;

  let documentQuery;
  let pageQuery;
  if (queryString === undefined) {
    documentQuery = {
      match_all: {},
    };
    pageQuery = {
      match_all: {},
    };
  } else {
    const queryStringQuery = {
      query: queryString,
      default_operator: 'AND',
    };
    const pageQueryString = Object.assign(
      {},
      queryStringQuery,
      {
        default_field: 'text',
      }
    );

    documentQuery = {
      query_string: queryStringQuery,
    };
    pageQuery = {
      query_string: pageQueryString,
    };
  }

  const searchQuery = {
    index: 'fda_documents',
    type: 'document',
    from: (page - 1) * perPage,
    size: perPage,
    sort: [
      '_score:desc',
    ],
    body: {
      query: {
        bool: {
          minimum_should_match: 1,
          should: [
            documentQuery,
            {
              has_child: {
                type: 'page',
                query: pageQuery,
                inner_hits: {},
              },
            },
          ],
        }
      },
    },
  };

  return client.search(searchQuery)
    .then(_convertFDADocumentsElasticSearchResult)
    .then((data) => {
      res.status(200);
      res.setHeader('Content-Type', 'application/json');
      return res.end(data);
    })
    .catch((err) => {
      // FIXME: Log error and return 500 HTTP code
      res.finish();
      throw err;
    });
}

function autocomplete(req, res) {
  const params = req.swagger.params;
  const page = params.page.value;
  const perPage = params.per_page.value;
  const searchQuery = {
    index: 'autocomplete',
    type: params.in.value,
    from: (page - 1) * perPage,
    size: perPage,
    defaultOperator: 'AND',
  };

  if (params.q.value) {
    searchQuery.body = {
      query: {
        match: {
          name: params.q.value,
        },
      },
    }
  } else {
    // Return all results
    searchQuery.q = undefined;
  };

  return client.search(searchQuery)
    .then(_convertElasticSearchResult)
    .then(res.json)
    .catch((err) => {
      // FIXME: Log error and return 500 HTTP code
      res.finish();
      throw err;
    });
}

module.exports = {
  searchTrials,
  searchFDADocuments,
  autocomplete,
};
