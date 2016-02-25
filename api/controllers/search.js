const client = require('../../config').elasticsearch;

function search(req, res) {
  const query = req.swagger.params.q.value;

  return client.search({ q: query })
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
