'use strict';

process.on('unhandledRejection', (reason) => {
  throw reason;
});
