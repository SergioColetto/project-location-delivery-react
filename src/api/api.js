import axios from 'axios';

export const searchByPostcode = async ( url, setResponse ) => {
  const response = await axios
    .get(`https://api.ideal-postcodes.co.uk/v1/postcodes/${url}?api_key=iddqd`, )
  setResponse(response.data.result)
}