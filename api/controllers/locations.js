const Location = require('../models/location');

function list(req, res) {
  return new Location().fetchAll()
    .catch((err) => {
      res.finish();
      throw err;
    })
    .then(res.json);
}

module.exports = {
  list,
}
