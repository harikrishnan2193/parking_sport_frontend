import { BASEURL } from "./baseUrl"
import { commonAPI } from "./commonApi"



export const getAllLocationApi = async()=>{
    return await commonAPI('GET',`${BASEURL}/park/getalllocation`)
}

export const getvehicleTypeApi = async()=>{
    return await commonAPI('GET',`${BASEURL}/park/gettypes`)
}

export const getSpotApi = async(selectOption)=>{
    return await commonAPI('POST',`${BASEURL}/park/getSpot`,selectOption,'')
}

export const sumbitFormApi = async(selectOption)=>{
    return await commonAPI('POST',`${BASEURL}/park/addSelectedOption`,selectOption,'')
}

export const getRatesApi = async()=>{
    return await commonAPI('GET',`${BASEURL}/park/getRates`)
}

export const sumbitDetilsApi = async(data)=>{
    return await commonAPI('POST',`${BASEURL}/park/submitDetils`,data,'')
}

export const getparkingdetilsApi = async(vehicleNumber)=>{
    return await commonAPI('POST',`${BASEURL}/park/parkingdetils`,{ vehicleNumber },'')
}
export const getSpotdetilsApi = async(vehicleNumber)=>{
    return await commonAPI('POST',`${BASEURL}/park/parkingSpotdetils`,{ vehicleNumber },'')
}