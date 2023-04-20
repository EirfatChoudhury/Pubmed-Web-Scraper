const axios = require("axios");
const logger = require("../../utils/logger");
const { xml2js } = require("xml-js");

const baseURL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/";

const dbSearchForUIDsByTerm = async (
  term,
  minDate = 1900,
  maxDate = null,
  field = "all"
) => {
  if (
    maxDate === null ||
    maxDate > new Date().getFullYear() ||
    maxDate < 1 ||
    maxDate < minDate
  )
    maxDate = new Date().getFullYear();

  if (minDate < 1 || minDate > maxDate || minDate > new Date().getFullYear())
    minDate = 1900;

  try {
    const result = await axios.get(
      `${baseURL}esearch.fcgi?db=pubmed&term=${term}[${field}]&mindate=${minDate}&maxdate=${maxDate}&retmode=json&retmax=250`
    );
    return result.data.esearchresult.idlist;
  } catch (error) {
    logger.error("Error:", error);
  }
};

const getUIDsOfSummariesWithAbstracts = async (uids) => {
  try {
    const result = await axios.get(
      `${baseURL}esummary.fcgi?db=pubmed&id=${uids}&retmode=json`
    );
    return Object.values(result.data.result).pop();
  } catch (error) {
    logger.error("Error:", error);
  }
};

const getFullRecordsByUID = async (uids) => {
  try {
    const result = await axios.get(
      `${baseURL}efetch.fcgi?db=pubmed&id=${uids}&retmode=xml`
    );
    const jsonObject = xml2js(result.data);
    let pubmedArticles = jsonObject.elements[1].elements;
    pubmedArticles = pubmedArticles.map(
      (a) => a.elements[0].elements[2].elements
    );
    pubmedArticles = pubmedArticles.filter(
      (a) =>
        a.some((object) => object["name"] === "Journal") &&
        a.some((object) => object["name"] === "Abstract")
    );
    pubmedArticles = pubmedArticles.map((a) => {
      const pubDate = a[0].elements[1].elements.filter(
        (element) => element.name === "PubDate"
      )[0];
      const title = a[0].elements.filter(
        (element) => element.name === "Title"
      )[0].elements;
      const articleTitle = a.filter(
        (element) => element.name === "ArticleTitle"
      )[0].elements;
      const abstract = a.filter((element) => element.name === "Abstract")[0]
        .elements;
      const authorList = a
        .filter((element) => element.name === "AuthorList")[0]
        .elements.map((author) => author.elements.splice(0, 3));

      return {
        pubDate,
        title,
        articleTitle,
        abstract,
        authorList,
      };
    });

    return pubmedArticles;
  } catch (error) {
    logger.error("Error:", error);
  }
};

module.exports = {
  dbSearchForUIDsByTerm,
  getUIDsOfSummariesWithAbstracts,
  getFullRecordsByUID,
};
