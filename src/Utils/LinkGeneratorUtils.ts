import { Address } from "../interfaces/Address";

export const mapFromAddress = (address: Address) => {
    const link = `https://www.google.com/maps/place/${address.latitude},${address.longitude}/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d${address.latitude}!4d${address.longitude}`
    window.open(link, "_blank")
};
