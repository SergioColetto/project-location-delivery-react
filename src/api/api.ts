import axios from 'axios';

export const get = async ( url: string ) => {
  const response = await axios
    .get(`https://api.ideal-postcodes.co.uk/v1/postcodes/${url}?api_key=iddqd`, )

  return response.data.result
}