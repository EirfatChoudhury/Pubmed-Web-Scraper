import axios from 'axios'
const baseURL = '/api/pubmed'

const getAll = async ( searchContent ) => {
    const result = await axios.get(
        `${baseURL}/${searchContent.term}`, 
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