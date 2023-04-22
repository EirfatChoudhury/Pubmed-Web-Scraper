import React from 'react'

const Content = ( {article} ) => {
  let year, month, day
  if (article.pubDate.elements.length === 3) {
    year = article.pubDate.elements[0].elements[0].text
    month = article.pubDate.elements[1].elements[0].text
    day = article.pubDate.elements[2].elements[0].text
  }
  else if (article.pubDate.elements.length === 2) {
    year = article.pubDate.elements[0].elements[0].text
    month = article.pubDate.elements[1].elements[0].text
  }
  else if (article.pubDate.elements.length === 1) {
    year = article.pubDate.elements[0].elements[0].text
  }

  const title = article.title[0].text
  const articleTitle = article.articleTitle[0].text

  const authorsList = article.authorList
  let lastName, foreName, initials
  if (authorsList.find(authorList => authorList.some(type => type.name === "LastName"))) lastName = authorsList.find(authorList => authorList.find(type => type.name === "LastName")).find(author => author.name === "LastName").elements[0].text
  if (authorsList.find(authorList => authorList.some(type => type.name === "ForeName"))) foreName = authorsList.find(authorList => authorList.find(type => type.name === "ForeName")).find(author => author.name === "ForeName").elements[0].text
  if (authorsList.find(authorList => authorList.some(type => type.name === "Initials"))) initials = authorsList.find(authorList => authorList.find(type => type.name === "Initials")).find(author => author.name === "Initials").elements[0].text

  const abstract = article.abstract
  let abstractTexts
  abstractTexts = abstract.find(abstract => abstract.name === "AbstractText").elements

  return (
    <div>
      {year} {month} {day} {title} {articleTitle} {foreName} {lastName} {initials} {abstractTexts.map(text => text.elements ? text.elements[0].text.length > 5 && !text.elements[0].text.includes(" ") ? <p>{text.elements[0].text}</p> : <text>{text.elements[0].text}</text> : <text>{text.text}</text>)}
    </div>
  )
}

export default Content