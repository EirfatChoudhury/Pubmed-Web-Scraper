/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


const Content = ( {article} ) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (!article.UID) return <p>{article.result}</p>

  const UID = article.UID

  let year, month, day
  if (article.pubDate.elements.length === 3 || article.pubDate.elements.length > 3) {
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
  if (authorsList.some(type => type.name === "ForeName")) foreName = authorsList.find(author => author.name === "ForeName").elements[0].text
  if (authorsList.some(type => type.name === "Initials")) initials = authorsList.find(author => author.name === "Initials").elements[0].text
  if (authorsList.some(type => type.name === "LastName")) lastName = authorsList.find(author => author.name === "LastName").elements[0].text

  const abstract = article.abstract

  return (
    <div style={{borderTop: 'solid', paddingTop: 25, borderWidth: 1}}>
      <div style={{marginLeft: 30, marginRight: 30}}>
        <a style={{fontWeight: 400, textDecoration: 'none', color: 'whitesmoke'}} href={`https://pubmed.ncbi.nlm.nih.gov/${UID}/`} target='_blank'>
          {articleTitle}
        </a>
      </div>

      <div style={{fontSize: 20, marginTop: 5, marginLeft: 30, marginRight: 30}}>
        {title} - {year} {month} {day} - {foreName} {lastName} {initials}
      </div>
      
      <div style={{marginRight: 25}}>
      <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          sx={{marginLeft: '92.5%'}}
        >
          <ExpandMoreIcon sx={{color: 'whitesmoke'}}/>
      </ExpandMore>
      </div>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <div style={{marginLeft: 30, marginRight: 30}} id='abstract-content'>
          {abstract.map(part => {
            let attributes
            let abstractText
            if (part.attributes) {
              attributes = part.attributes.Label
              abstractText = part.elements[0].text

              return(
                <div key={Math.floor(Math.random() * 100000000000000)}>
                  <p key={Math.floor(Math.random() * 100000000000000)}>{attributes}</p>
                  <p key={Math.floor(Math.random() * 100000000000000)}>{abstractText}</p>
                </div>
              )
            }

            abstractText = part.elements.map(element => element.text)
            return(
              <div key={Math.floor(Math.random() * 100000000000000)}>
                {abstractText.map(text => <text key={Math.floor(Math.random() * 100000000000000)}>{text}</text>)}
              </div>
            )
          })}
        </div>
      </Collapse>
    </div>
  )
}

export default Content