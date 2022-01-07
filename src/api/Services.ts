import axios, { AxiosRequestConfig } from 'axios';
import { Address } from '../interfaces/Address';
import { isValid, sanitize } from '../Utils/PostcodeUtils';

export const get = async ( value: string ) => {

  try {
    const postcode = sanitize(value);
    if(!isValid(postcode))
      throw { message: 'Invalid Postcode!' }

    const response = await axios
      .get(`https://api.ideal-postcodes.co.uk/v1/postcodes/${postcode}?api_key=iddqd`, )

    const data = response.data.result;
    
    _post(data)
    
    return data

  } catch(e){
    if(e.response)
      throw { message: 'You searched enough free!'}

    throw e
  }
}

const _post = async ( data: Address[] ) => {
  const config: AxiosRequestConfig = { headers: { 'Content-Type': 'application/json' } };

  const response = await axios
    .post(`https://location-delivery.herokuapp.com/api/location`, data, config)
}