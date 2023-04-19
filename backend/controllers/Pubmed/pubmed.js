const pubmedRouter = require("express").Router();
const pubmedFunctions = require("./pubmedFunctions");
const logger = require("../../utils/logger");

pubmedRouter.get("/dblist", async (_req, res) => {
  try {
    const results = await pubmedFunctions.getDbList();
    res.json(results);
  } catch (error) {
    res.status(404).end();
  }
});

pubmedRouter.get("/:db", async (req, res) => {
  const db = req.params.db;
  try {
    const results = await pubmedFunctions.getDbInfo(db);
    res.json(results);
  } catch (error) {
    res.status(404).end();
  }
});

pubmedRouter.get("/:db/:term/summaries", async (req, res) => {
  const db = req.params.db;
  let term = req.params.term;
  term = term.replaceAll("-", "%20");
  try {
    const uids = await pubmedFunctions.dbSearchForUIDsByTerm(
      db,
      term,
      req.body.retmax,
      req.body.minDate,
      req.body.maxDate,
      req.body.field
    );
    const results = await pubmedFunctions.getSummariesByUID(
      db,
      uids
    );
    res.json(results);
  } catch (error) {
    res.status(404).end();
  }
});

pubmedRouter.get("/:db/:term/full-records", async (req, res) => {
  const db = req.params.db;
  let term = req.params.term;
  term = term.replaceAll("-", "%20");
  try {
    const uids = await pubmedFunctions.dbSearchForUIDsByTerm(
      db,
      term,
      req.body.retmax,
      req.body.minDate,
      req.body.maxDate,
      req.body.field
    );
    const results = await pubmedFunctions.getFullRecordsByUID(
      db,
      uids
    );
    res.json(results);
  } catch (error) {
    res.status(404).end();
  }
});

module.exports = pubmedRouter;
