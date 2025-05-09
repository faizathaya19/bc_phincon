interface ApiResponse {
  code: number
  message: string
  data: any
}

export const sendResponse = (
  res: any,
  code: number,
  message: string,
  data: any = null
): void => {
  res.status(code).json(<ApiResponse>{
    code,
    message,
    data,
  })
}
