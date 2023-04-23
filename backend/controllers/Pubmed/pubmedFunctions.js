const axios = require("axios");
const logger = require("../../utils/logger");
const { xml2js } = require("xml-js");

const baseURL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/";

const dbSearchForUIDsByTerm = async (
  term,
  minDate = 1900,
  maxDate = new Date().getFullYear(),
  field = "all"

) => {
  if (
    maxDate === null ||
    maxDate > new Date().getFullYear() ||
    maxDate < 1 ||
    maxDate < minDate
  )
    maxDate = new Date().getFullYear();

  if (minDate < 1900 || minDate > maxDate || minDate > new Date().getFullYear() || minDate === null)
    minDate = 1900;

  if (field === null || field !== "tiab") field = "all"

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
    if (!uids) return { result: "NO RESULTS" }

    const result = await axios.get(
      `${baseURL}efetch.fcgi?db=pubmed&id=${uids}&retmode=xml`
    );
    let allArticles = xml2js(result.data);
    allArticles = allArticles.elements.filter(element => element.name === "PubmedArticleSet")[0].elements // Filtering for Pubmed Article Sets
    allArticles = allArticles.map(article => article.elements)
    allArticles = allArticles.filter(article => article.some(element => element.name === "MedlineCitation")) // Checking to see if Medline Citations exist within each article
    allArticles = allArticles.map(article => article.filter(element => element.name === "MedlineCitation")[0].elements) // Filtering for articles with Medline Citations
    allArticles = allArticles.filter(article => article.filter(element => element.name === "Article")[0].elements.some(element => element.name === "Abstract")) // Checking and filtering for articles with Abstracts
    
    // Fetching data needed
    allArticles = allArticles.map(article => {
      const UID = article.filter(element => element.name === "PMID")[0].elements[0].text
      const everythingElse = article.filter(element => element.name === "Article")[0].elements
      const pubDate = everythingElse.filter(element => element.name === "Journal")[0].elements.filter(element => element.name === "JournalIssue")[0].elements.filter(element => element.name === "PubDate")[0]
      const title = everythingElse.filter(element => element.name === "Journal")[0].elements.filter(element => element.name === "Title")[0].elements
      const articleTitle = everythingElse.filter(element => element.name === "ArticleTitle")[0].elements
      const abstract = everythingElse.filter(element => element.name === "Abstract")[0].elements.filter(element => element.name === "AbstractText")
      const authorList = everythingElse.filter(element => element.name === "AuthorList")[0].elements.map(element => element.elements)

      return {
        UID,
        pubDate,
        title,
        articleTitle,
        abstract,
        authorList
      }
    })

    const temp = allArticles 
    logger.info(temp)

    return allArticles
  } catch (error) {
    logger.error("Error:", error);
  }
};

module.exports = {
  dbSearchForUIDsByTerm,
  getUIDsOfSummariesWithAbstracts,
  getFullRecordsByUID,
};
