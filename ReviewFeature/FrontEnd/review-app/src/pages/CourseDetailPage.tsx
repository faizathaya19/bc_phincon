import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { Course } from '../types/course'
import { getCourseDetail } from '../models/api'
import type { Tryout } from '../types/tryout'

const CourseDetailPage: React.FC = () => {
  const { type, id } = useParams<{
    type: 'course' | 'tryout-section' | 'app'
    id: string
  }>()

  const [data, setData] = useState<Course | Tryout>()

  useEffect(() => {
    if (id) {
      getCourseDetail(id, type)
        .then((result) => {
          console.log('Course detail:', result)
          setData(result)
        })
        .catch((error) => {
          console.error('Failed to fetch course detail:', error)
        })
    }
  }, [id, type])

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Course Detail - {data?.title}</h2>
      <p>This is the detailed page for Course {id}</p>
    </div>
  )
}

export default CourseDetailPage
