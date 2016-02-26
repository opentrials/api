const client = require('../../config').elasticsearch;

function search(req, res) {
  const page = req.swagger.params.page.value;
  const perPage = 20;
  const searchQuery = {
    q: req.swagger.params.q.value,
    from: (page - 1) * perPage,
    size: perPage,
  };

  return client.search(searchQuery)
    .then((esResult) => {
      res.json({
        total_count: esResult.hits.hits.length,
        items: esResult.hits.hits.map((hit) => hit._source),
      });
    })
    .catch((err) => {
      res.finish();
    });
}

module.exports = {
  search: search,
};
