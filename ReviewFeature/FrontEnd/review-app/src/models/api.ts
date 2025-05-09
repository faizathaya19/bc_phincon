import axios from 'axios'
import type { Course } from '../types/course'
import type { Tryout } from '../types/tryout'

const baseUrl = 'http://localhost:3001/api'

export const fetchCourses = async (): Promise<Course[]> => {
  const res = await axios.get(`${baseUrl}/courses`)
  return res.data.data
}

export const fetchTryouts = async (): Promise<Tryout[]> => {
  const res = await axios.get(`${baseUrl}/tryout-sections`)
  return res.data.data
}

export const getCourseDetail = async (
  id: string,
  type: 'course' | 'tryout-section' | 'app' = 'course'
): Promise<Course | Tryout> => {
  const res = await axios.get(`${baseUrl}/${type}/${id}`)
  return res.data.data
}
