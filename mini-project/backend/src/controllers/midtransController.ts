import { Request, Response } from 'express'
import { transferViaMidtransVA } from '../services/midtransService'
import { MidtransRequest } from '../models/MidtransRequest.model'
import { MidtransResponse } from '../models/MidtransResponse.model'
import User from '../models/users/users.model'

interface CustomRequest extends Request {
  user?: any
}

export const handleTransfer = async (req: CustomRequest, res: Response) => {
  try {
    const user = await User.findByPk(req.user?.id)

    if (!user) {
      res.status(401).json({ code: 401, message: 'Unauthorized' })
      return
    }

    const customerDetails = {
      email: user.email,
      first_name: user.fullname,
      last_name: '',
      phone: user.phoneNumber?.toString() ?? '',
    }

    const { transaction_details, item_details, bank_transfer } = req.body

    const payload: MidtransRequest = {
      payment_type: 'bank_transfer',
      transaction_details,
      customer_details: customerDetails,
      item_details,
      bank_transfer,
    }

    const result: MidtransResponse = await transferViaMidtransVA(payload)

    // const payload: MidtransRequest = req.body
    // const result: MidtransResponse = await transferViaMidtransVA(payload)
    res.status(200).json({
      code: 200,
      message: 'Transaction created successfully',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: 'Midtrans transaction failed',
      data: null,
    })
  }
}
