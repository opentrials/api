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
        doc.file.pages = pages.map((page) => {
          let text = page._source.text;
          if (page.highlight !== undefined && page.highlight.text.length > 0) {
            text = page.highlight.text[0];
          }

          return {
            text,
            num: page._source.num,
          };
        });
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
  const textQuery = params.text.value;

  const defaultQueryString = {
    default_operator: 'AND',
  };

  let documentQuery = {
    match_all: {},
  };
  if (queryString !== undefined) {
    const documentQueryString = Object.assign(
      {},
      defaultQueryString,
      {
        query: queryString,
      }
    );

    documentQuery = {
      query_string: documentQueryString,
    };
  }

  let pageQuery = {
    match_all: {},
  };
  if (textQuery !== undefined) {
    const pageQueryString = Object.assign(
      {},
      defaultQueryString,
      {
        query: textQuery,
        default_field: 'text',
      }
    );
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
      'application_id:desc',
      'fda_approval.supplement_number:desc',
      'name:asc',
    ],
    body: {
      query: {
        bool: {
          minimum_should_match: 2,
          should: [
            documentQuery,
            {
              has_child: {
                type: 'page',
                query: pageQuery,
                inner_hits: {
                  size: 2,
                  sort: [
                    { num: 'asc' },
                  ],
                  highlight: {
                    require_field_match: false,
                    fields: {
                      text: {
                        fragment_size: 150,
                        no_match_size: 150,
                        number_of_fragments: 1,
                      },
                    },
                  },
                },
              },
            },
          ],
        },
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
    };
  } else {
    // Return all results
    searchQuery.q = undefined;
  }

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
