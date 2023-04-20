import axios from 'axios'
const baseURL = 'http://localhost:3001/api/pubmed'

const getAll = async ( searchContent ) => {
    const term = searchContent.term.replaceAll(" ", "+")
    const result = await axios.get(
        `${baseURL}/${term}`, 
        { 
            params : {
                minDate: searchContent.minDate,
                maxDate: searchContent.maxDate,
                field: searchContent.field
            }
        }
    )
    return result.data
}

export default { getAll }