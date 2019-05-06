var mariadb = require('mariadb'),
    express = require('express'),
    router = express.Router(),
    queries = require('../config/queries');

module.exports = function (pool) {
  router.get('/', async function (req, res) {
    var limit = eval('(' + req.query.limit + ')') || 25,
        page = eval('(' + req.query.page + ')') || 0;
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query(queries.get_players + " limit " + (limit*page) + "," + limit);
      res.json({
        status: "OK",
        data: rows
      });

    } catch (err) {
      res.status(404).send({
        message: err,
        data: []
      });
    } finally {
      if (conn) return conn.end();
    }
  });

  router.post('/', async function (req, res) {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query(queries.insert_player, Object.values(req.body));
      res.json({
        status: "OK",
        data: rows
      });
    } catch (err) {
      res.status(404).send({
        message: err,
        data: []
      });
    } finally {
      if (conn) return conn.end();
    }
  });

  router.get('/max', async function (req, res) {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query(queries.get_max_player_id);
      res.json({
        status: "OK",
        data: rows
      });

    } catch (err) {
      res.status(404).send({
        message: err,
        data: []
      });
    } finally {
      if (conn) return conn.end();
    }
  });

  router.get('/:id', async function (req, res) {
    var limit = eval('(' + req.query.limit + ')') || 10,
        page = eval('(' + req.query.page + ')') || 0;
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query(queries.get_player_games + req.params.id + " limit " + (limit*page) + "," + limit);
      res.json({
        status: "OK",
        data: rows
      });

    } catch (err) {
      res.status(404).send({
        message: err,
        data: []
      });
    } finally {
      if (conn) return conn.end();
    }
  });

  router.delete('/:id', async function (req, res) {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query(queries.delete_player + req.params.id);
      res.json({
        status: "OK",
        data: rows
      });

    } catch (err) {
      res.status(404).send({
        message: err,
        data: []
      });
    } finally {
      if (conn) return conn.end();
    }
  });

  return router;
}
