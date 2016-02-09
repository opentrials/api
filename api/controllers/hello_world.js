const util = require('util');

function hello(req, res) {
  const name = req.swagger.params.name.value || 'stranger';
  const result = {
    message: util.format('Hello, %s!', name),
  };

  res.json(result);
}

module.exports = {
  hello,
};
