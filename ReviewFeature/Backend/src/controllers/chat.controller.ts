import { Request, Response } from 'express'
import * as chatService from '../services/chat.service'
import { sendResponse } from '../utils/responseUtil'

export const createPrivateRoom = async (req: Request, res: Response) => {
  const { userIds } = req.body

  if (!Array.isArray(userIds) || userIds.length !== 2) {
    return sendResponse(res, 400, 'Private chat requires exactly two users')
  }

  try {
    const room = await chatService.createPrivateRoom(userIds)
    return sendResponse(res, 201, 'Private room ready', room)
  } catch (err) {
    console.error(err)
    return sendResponse(res, 500, 'Failed to create private room')
  }
}

export const createGroupRoom = async (req: Request, res: Response) => {
  const { userIds, sessionId, groupName } = req.body

  if (!Array.isArray(userIds) || userIds.length < 2) {
    return sendResponse(res, 400, 'Group chat requires at least two users')
  }

  try {
    const room = await chatService.createGroupRoom(
      userIds,
      sessionId,
      groupName
    )
    return sendResponse(res, 201, 'Group room created', room)
  } catch (err) {
    console.error(err)
    return sendResponse(res, 500, 'Failed to create group room')
  }
}

export const sendMessage = async (req: Request, res: Response) => {
  const { roomId, message } = req.body
  const userId = req.user_data?.id

  if (!roomId || !message || !userId) {
    return sendResponse(res, 400, 'roomId, message, and userId are required')
  }

  try {
    const result = await chatService.sendMessage(roomId, userId, message)
    return sendResponse(res, 201, 'Message sent', result)
  } catch (err) {
    console.error(err)
    return sendResponse(res, 500, 'Failed to send message')
  }
}

export const getMessages = async (req: Request, res: Response) => {
  const { roomId } = req.params

  try {
    const messages = await chatService.getMessages(roomId)
    return sendResponse(res, 200, 'Messages loaded', messages)
  } catch (err) {
    console.error(err)
    return sendResponse(res, 500, 'Failed to fetch messages')
  }
}

export const getUserChatRooms = async (req: Request, res: Response) => {
  const userId = req.user_data.id

  try {
    const rooms = await chatService.getUserRooms(userId)
    sendResponse(res, 200, 'Rooms fetched', rooms)
  } catch (err) {
    console.error(err)
    sendResponse(res, 500, 'Failed to fetch rooms')
  }
}
