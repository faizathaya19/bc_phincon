declare global {
  namespace Express {
    interface Request {
      user_data?: any
    }
  }
}

export {}