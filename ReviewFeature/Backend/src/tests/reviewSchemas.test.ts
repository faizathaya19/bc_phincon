import { Request, Response } from 'express'
import Course from '../models/Course.model'
import { getAllCourses } from '../controllers/review.controller'

jest.mock('../models/Course.model')

describe('GET /courses', () => {
  const mockRequest = {} as Request
  let mockResponse: Response

  beforeEach(() => {
    jest.clearAllMocks()
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response
  })

  it('should handle errors gracefully', async () => {
    ;(Course.findAll as jest.Mock).mockRejectedValue(new Error('DB error'))

    await getAllCourses(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({
      code: 500,
      message: 'Error fetching courses',
      data: { error: expect.any(Error) },
    })
  })

  it('should return course list with 200', async () => {
    const mockCourses = [
      { id: '1', title: 'Course A' },
      { id: '2', title: 'Course B' },
    ]
    ;(Course.findAll as jest.Mock).mockResolvedValue(mockCourses)

    await getAllCourses(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({
      code: 200,
      message: 'courses retrieved successfully',
      data: mockCourses,
    })
  })

  it('should call Course.findAll once', async () => {
    ;(Course.findAll as jest.Mock).mockResolvedValue([])

    await getAllCourses(mockRequest, mockResponse)

    expect(Course.findAll).toHaveBeenCalledTimes(1)
  })

  it('should return empty array if no course found', async () => {
    ;(Course.findAll as jest.Mock).mockResolvedValue([])

    await getAllCourses(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({
      code: 200,
      message: 'courses retrieved successfully',
      data: [],
    })
  })
})
