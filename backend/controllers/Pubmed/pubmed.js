const pubmedRouter = require("express").Router();
const pubmedFunctions = require("./pubmedFunctions");

pubmedRouter.get("/:term/full-records", async (req, res) => {
  let term = req.params.term;
  term = term.replaceAll("-", "%20");
  try {
    const uids = await pubmedFunctions.dbSearchForUIDsByTerm(
      term,
      req.body.retmax,
      req.body.minDate,
      req.body.maxDate,
      req.body.field
    );

    const uidsWithAbstracts = await pubmedFunctions.getUIDsOfSummariesWithAbstracts(
      uids
    );

    const results = await pubmedFunctions.getFullRecordsByUID(
      uidsWithAbstracts
    );
    res.json(results);
  } catch (error) {
    res.status(404).end();
  }
});

module.exports = pubmedRouter;
