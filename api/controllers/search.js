const client = require('../../config').elasticsearch;

function search(req, res) {
  const page = req.swagger.params.page.value;
  const perPage = req.swagger.params.per_page.value;
  const searchQuery = {
    index: 'trials',
    q: req.swagger.params.q.value,
    from: (page - 1) * perPage,
    size: perPage,
  };

  return client.search(searchQuery)
    .then((esResult) => {
      res.json({
        total_count: esResult.hits.total,
        items: esResult.hits.hits.map((hit) => hit._source),
      });
    })
    .catch((err) => {
      res.finish();
      throw err;
    });
}

module.exports = {
  search: search,
};
