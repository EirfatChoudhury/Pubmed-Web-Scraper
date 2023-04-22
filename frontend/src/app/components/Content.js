import React from 'react'
import { useSelector } from 'react-redux';
import { selectFrom } from "@/slices/searchSlice";

const Content = () => {
  const from = useSelector(selectFrom)

  return (
    <div>Search results - From: {from}</div>
  )
}

export default Content