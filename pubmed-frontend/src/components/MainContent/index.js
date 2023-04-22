import React from 'react'
import { useSelector } from "react-redux";
import { selectFrom, selectTo } from "../../slices/searchSlice";

const MainContent = () => {
	const from = useSelector(selectFrom)
  const to = useSelector(selectTo)

  return (
    <div>
      <p style={{margin: 0}}>Search Results --- From: {from ? from : 1900} - To: {to? to : new Date().getFullYear()}</p>
    </div>
  )
}

export default MainContent