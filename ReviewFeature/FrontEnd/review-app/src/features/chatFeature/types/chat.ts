export interface Message {
  id: string
  roomId: string
  userId: string
  message: string
  createdAt: string
}

export interface Room {
  id: string
  data: {
    groupName: string | null
  }
}
