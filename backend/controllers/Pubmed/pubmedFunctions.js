const axios = require('axios');
const logger = require("../../utils/logger");

const baseURL = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/';

const getDbList = async () => {
    try {
        const result = await axios.get(`${baseURL}einfo.fcgi?retmode=json`);
        return result.data.einforesult.dblist;
    }
    catch (error) {
        logger.error("Error:", error);
    }
}

const getDbInfo = async (db) => {
    try {
        const result = await axios.get(`${baseURL}einfo.fcgi?db=${db}&retmode=json`);
        return result.data.einforesult.dbinfo[0];
    }
    catch (error) {
        logger.error("Error:", error);
    }
}

const dbSearch = async (db, term, retmax = 20, minDate = 1900, maxDate = null, field = "all") => {
    if (maxDate === null) maxDate = new Date().getFullYear();
    try {
        const result = await axios.get(`${baseURL}esearch.fcgi?db=${db}&term=${term}[${field}]&retmax=${retmax}&mindate=${minDate}&maxdate=${maxDate}&retmode=json`);
        return result.data.esearchresult;
    }
    catch (error) {
        logger.error("Error:", error);
    }
}

module.exports = {
    getDbList, getDbInfo, dbSearch
}