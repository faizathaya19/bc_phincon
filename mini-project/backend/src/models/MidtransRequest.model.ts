// src/models/MidtransRequest.ts

export interface ItemDetails {
  id: string
  price: number
  quantity: number
  name: string
}

export interface TransactionDetails {
  gross_amount: number
  order_id: string
}

export interface CustomerDetails {
  email: string
  first_name: string
  last_name: string
  phone: string
}

export interface BankTransfer {
  bank: string
  va_number: string
}

export interface MidtransRequest {
  payment_type: string
  transaction_details: TransactionDetails
  customer_details: CustomerDetails
  item_details: ItemDetails[]
  bank_transfer: BankTransfer
}
