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

const dbSearch = async (db, term, retmax) => {
    try {
        const result = await axios.get(`${baseURL}esearch.fcgi?db=${db}&term=${term}&retmax=${retmax}&retmode=json`);
        return result.data.esearchresult;
    }
    catch (error) {
        logger.error("Error:", error);
    }
}

module.exports = {
    getDbList, getDbInfo, dbSearch
}