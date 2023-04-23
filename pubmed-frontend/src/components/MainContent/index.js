import React from 'react'
import { useSelector } from "react-redux";
import { selectFrom, selectTo } from "../../slices/searchSlice";
import { selectArticles } from '../../slices/articleSlice';
import Content from './Content';

const MainContent = () => {
	const from = useSelector(selectFrom)
  const to = useSelector(selectTo)
  const articles = useSelector(selectArticles)

  return (
    <div>
      <p style={{margin: 0}}>Search Results --- From: {from ? from : 1900} - To: {to? to : new Date().getFullYear()}</p>
      
      {articles.UID ?
        articles.map(article => 
          <div style={{paddingTop: 20}}>
            <Content article={article} key={article.UID}/>
          </div>
        )
        : <p>{articles.result}</p>
      }
    </div>
  )
}

export default MainContent