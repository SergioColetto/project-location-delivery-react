import axios from 'axios';
import { isValid } from '../Utils/PostcodeUtils';

export const get = async ( url: string ) => {

  try {
    if(!isValid(url))
      throw { message: 'Invalid Postcode!' }

    const response = await axios
      .get(`https://api.ideal-postcodes.co.uk/v1/postcodes/${url}?api_key=iddqd`, )

    return response.data.result

  } catch(e){
    if(e.response)
      throw { message: 'You searched enough free!'}

    throw e
  }


  
}

// const api = async () => {
//   const postcode = sanitize(searchPostcode)
//   if (isValid(postcode)) {
//     const data = await fetch('')
//     const listAddress = await data.json()
//     if (!listAddress.result) {
//       setAddresses([])
//       return
//     }
//     setAddresses(listAddress.result)
//     await fetch(`https://location-delivery.herokuapp.com/api/location`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(listAddress.result)
//     })
//   }
// }