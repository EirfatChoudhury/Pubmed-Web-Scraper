const pubmedRouter = require("express").Router();
const pubmedFunctions = require("./pubmedFunctions");
const logger = require("../../utils/logger");

pubmedRouter.get("/:term", async (req, res) => {
  let term = req.params.term;
  try {
    const uids = await pubmedFunctions.dbSearchForUIDsByTerm(
      term,
      req.query.minDate,
      req.query.maxDate,
      req.query.field
    );

    const uidsWithAbstracts =
      await pubmedFunctions.getUIDsOfSummariesWithAbstracts(uids);

    const results = await pubmedFunctions.getFullRecordsByUID(
      uidsWithAbstracts
    );
    res.json(results);
  } catch (error) {
    res.status(404).end();
  }
});

module.exports = pubmedRouter;
