import axios from 'axios'
import config from '../config/configData'
import { MidtransRequest } from '../models/MidtransRequest.model'
import { MidtransResponse } from '../models/MidtransResponse.model'

const midtransHeaderApi = axios.create({
  baseURL: config.midtrans.midtransDevUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization:
      'Basic ' +
      Buffer.from(config.midtrans.serverKey + ':').toString('base64'),
  },
})

export async function transferViaMidtransVA(
  payload: MidtransRequest
): Promise<MidtransResponse> {
  try {
    const response = await midtransHeaderApi.post('/charge', payload)
    return response.data as MidtransResponse
  } catch (error: any) {
    console.error(
      'Midtrans Transaction Error:',
      error.response?.data ?? error.message
    )
    throw error
  }
}
