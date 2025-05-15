import { v4 as uuidv4 } from 'uuid'
import { Op, Sequelize } from 'sequelize'
import ChatRoom from '../models/chatRoom.model'
import UsersChatRoom from '../models/usersChatRoom.model'
import Message from '../models/Message.model'

const sequelize = ChatRoom.sequelize as Sequelize

export const createPrivateRoom = async (userIds: string[]) => {
  if (userIds.length !== 2) {
    throw new Error('Private chat requires exactly two users')
  }

  // Cek apakah room dengan 2 user ini sudah ada
  const rooms = await UsersChatRoom.findAll({
    where: {
      userId: { [Op.in]: userIds },
      active: 1,
    },
    attributes: ['roomId'],
    group: ['roomId'],
    having: sequelize.literal('COUNT(DISTINCT userId) = 2'),
  })

  if (rooms.length > 0) {
    const roomId = rooms[0].getDataValue('roomId')
    return ChatRoom.findOne({ where: { id: roomId } })
  }

  // Buat room baru
  const room = await ChatRoom.create({
    id: uuidv4(),
    active: 1,
    data: { isGroup: false },
  })

  const participants = userIds.map((userId) => ({
    id: uuidv4(),
    roomId: room.id,
    userId,
    active: 1,
  }))

  await UsersChatRoom.bulkCreate(participants)
  return room
}

export const createGroupRoom = async (
  userIds: string[],
  sessionId: string | null = null,
  groupName: string | null = null
) => {
  if (userIds.length < 2) {
    throw new Error('Group chat requires at least two users')
  }

  const room = await ChatRoom.create({
    id: uuidv4(),
    sessionId,
    active: 1,
    data: { isGroup: true, groupName },
  })

  const participants = userIds.map((userId) => ({
    id: uuidv4(),
    roomId: room.id,
    userId,
    active: 1,
  }))

  await UsersChatRoom.bulkCreate(participants)
  return room
}

export const getUserRooms = async (userId: string) => {
  const rooms = await UsersChatRoom.findAll({
    where: { userId, active: 1 },
    include: [
      {
        model: ChatRoom,
        required: true,
        where: { active: 1 },
      },
    ],
  })

  const grouped = rooms.reduce(
    (acc, entry) => {
      const room = entry.ChatRoom
      if (room.data?.isGroup) acc.group.push(room)
      else acc.private.push(room)
      return acc
    },
    { group: [] as ChatRoom[], private: [] as ChatRoom[] }
  )

  return grouped
}

export const sendMessage = async (
  roomId: string,
  userId: string,
  message: string
) => {
  return Message.create({
    id: uuidv4(),
    roomId,
    userId,
    message,
    active: 1,
  })
}

export const getMessages = async (roomId: string) => {
  return Message.findAll({
    where: { roomId, active: 1 },
    order: [['createdAt', 'ASC']],
  })
}

export const getAllUsers = async (roomId: string) => {
  return Message.findAll({
    where: { roomId, active: 1 },
    order: [['createdAt', 'ASC']],
  })
}
