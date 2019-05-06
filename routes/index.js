var mariadb = require('mariadb'),
    secrets = require('../config/secrets');
const pool = mariadb.createPool({
     host: secrets.mariadb_connection,
     user:'root',
     connectionLimit: 5
});

/*
 * Connect all of your endpoints together here.
 */
module.exports = function (app, router) {
    app.use('/api', require('./home.js')(router));
    app.use('/api/players', require('./players.js')(pool));
    app.use('/api/matches', require('./matches.js')(pool));
};
