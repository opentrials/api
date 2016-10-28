/* eslint-disable no-console */

'use strict';

process.on('unhandledRejection', (reason) => {
  console.trace(reason);
});
