const api = require('./api');
const config = require('./config');

api.listen(config.app.port, (h) => {
  console.log(`Started on port ${config.app.port}`);
});
