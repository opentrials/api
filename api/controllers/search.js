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
  };

  return client.search(searchQuery)
    .then(_convertElasticSearchResult)
    .then(res.json)
    .catch((err) => {
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
      res.finish();
      throw err;
    });
}

module.exports = {
  search: searchTrials,
  autocomplete,
};
