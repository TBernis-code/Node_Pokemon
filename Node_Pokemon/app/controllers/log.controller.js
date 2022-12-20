// eslint-disable-next-line import/no-extraneous-dependencies
const csv = require('csv-parser');
const fs = require('fs');
const logger = require('../../logger');

exports.log = (req, res) => {
  logger.info('Log requested');

  // Convert the log file to CSV format
  fs.createReadStream('log.log')
    .pipe(csv())
    .on('data', (data) => res.status(200).send({ data }))
    .on('end', () => console.log('Done'));
};
