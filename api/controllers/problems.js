const Problem = require('../models/problem');

function getProblem(req, res) {
  const id = req.swagger.params.id.value;

  return new Problem({ id: id }).fetch({})
    .catch((err) => {
      res.finish();
      throw err;
    })
    .then((problem) => {
      if (problem) {
        res.json(problem);
      } else {
        res.status(404);
        res.finish();
      }
    });
}

module.exports = {
  get: getProblem,
}
