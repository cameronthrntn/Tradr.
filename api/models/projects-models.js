const { connection } = require('../db/connection');

return connection.select('*').from('projects');
