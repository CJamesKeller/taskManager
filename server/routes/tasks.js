var express = require("express");
var router = express.Router();
var pg = require("pg");

var config =
{
  host: "localhost",
  port: 5432,
  database: "christopher",
  max: 10,
  idleTimeoutMillis: 5000
};

var pool = new pg.Pool(config);

router.get("/", function(req, res)
{
  pool.connect(function(error, database, done)
  {
    if(error)
    {
    console.log("Error connecting.");
    res.sendStatus(500);
    }
    else
    {
      database.query(' SELECT * FROM "tasks" ', function(queryError, result)
      {
        done();
        if(queryError)
        {
          console.log("Error making query");
          res.sendStatus(500);
        }
        else
        {
          res.send(result.rows);
        }
      });
    }
  });
});

router.post("/add", function(req, res)
{
  var taskName = req.body.name;
  var taskStatus = req.body.status;
  pool.connect(function(error, database, done)
  {
    if(error)
    {
    console.log("Error connecting.");
    res.sendStatus(500);
    }
    else
    {
      database.query(' INSERT INTO "tasks" ("name", "status") VALUES ($1, $2); ',
      [taskName, taskStatus], function(queryError, result)
      {
        done();
        if(queryError)
        {
          console.log("Error making query");
          res.sendStatus(500);
        }
        else
        {
          res.sendStatus(200);
        }
      });
    }
  });
});

router.delete("/delete/:id", function(req, res)
{
  pool.connect(function(error, database, done)
  {
    if(error)
    {
    console.log("Error connecting.");
    res.sendStatus(500);
    }
    else
    {
      database.query(' DELETE FROM "tasks" WHERE "id"=' + req.params.id + '; ', function(queryError, result)
      {
        done();
        if(queryError)
        {
          console.log("Error making query");
          res.sendStatus(500);
        }
        else
        {
          res.sendStatus(200);
        }
      });
    }
  });
});

router.put("/done/", function(req, res)
{
  var taskID = req.body.id;
  pool.connect(function(error, database, done)
  {
    if(error)
    {
    console.log("Error connecting.");
    res.sendStatus(500);
    }
    else
    {
      database.query('UPDATE "tasks" SET "status" = FALSE WHERE "id" = $1;',
      [taskID], function(queryError, result)
      {
        done();
        if(queryError)
        {
          console.log("Error making query");
          res.sendStatus(500);
        }
        else
        {
          res.sendStatus(200);
        }
      });
    }
  });
});

module.exports = router;
