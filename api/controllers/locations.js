const Location = require('../models/location');

function list(req, res) {
  return new Location().fetchAll()
    .catch((err) => {
      // FIXME: We're ignoring errors for now, but we should at least log them.
    })
    .then(res.json);
}

module.exports = {
  list,
}
