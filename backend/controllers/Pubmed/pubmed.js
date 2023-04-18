const pubmedRouter = require('express').Router();
const pubmedFunctions = require('./pubmedFunctions')
const logger = require("../../utils/logger")

pubmedRouter.get("/dblist", async (_req, res) => {
    try {
        const results = await pubmedFunctions.getDbList();
        res.json(results)
    } catch (error) {
        res.status(404).end()
    }
});

pubmedRouter.get("/:db", async (req, res) => {
    const db = req.params.db
    try {
        const results = await pubmedFunctions.getDbInfo(db);
        res.json(results)
    } catch (error) {
        res.status(404).end()
    }
});

pubmedRouter.get("/:db/:term", async (req, res) => {
    const db = req.params.db
    let term = req.params.term
    let retmax = 20
    if (req.body.retmax) {
        retmax = req.body.retmax
    }
    term = term.replaceAll("-", "%20")
    try {
        const results = await pubmedFunctions.dbSearch(db, term, retmax);
        res.send(results)
    } catch (error) {
        logger.error("Error:", error)
    }

    res.status(404).end()
});

module.exports = pubmedRouter;