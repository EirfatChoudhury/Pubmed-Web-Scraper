import React from 'react'
import { useSelector } from "react-redux";
import { selectFrom, selectTo } from "../../slices/searchSlice";
import { selectArticles } from '../../slices/articleSlice';
import Content from './Content';
import { CircularProgress } from '@mui/material';

const MainContent = () => {
	const from = useSelector(selectFrom)
  const to = useSelector(selectTo)
  const articles = useSelector(selectArticles)

  return (
    <div>
      <p style={{margin: 0}}>Search Results --- From: {from ? from : 1900} - To: {to? to : new Date().getFullYear()} {articles.length > 1 ? `(${articles.length} resulsts)` : null}</p>
      
      { 
        articles.map(article => 
          <div style={{paddingTop: 20}} key={Math.floor(Math.random() * 100000000000000)}>
            <Content article={article} key={article.UID}/>
          </div>
        )
      }

      {articles.length === 0 ? <CircularProgress color='inherit' sx={{marginTop: 2.5}}/> : null}
    </div>
  )
}

export default MainContent