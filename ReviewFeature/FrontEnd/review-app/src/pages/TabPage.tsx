import { useEffect, useState } from 'react'
import { fetchCourses, fetchTryouts } from '../models/api'
import type { Course } from '../types/course'
import type { Tryout } from '../types/tryout'
import { Link } from 'react-router-dom'
import Card from '../components/Card'

export default function TabsPage() {
  const [tab, setTab] = useState<'course' | 'tryout' | 'app'>('course')
  const [courses, setCourses] = useState<Course[]>([])
  const [tryouts, setTryouts] = useState<Tryout[]>([])

  useEffect(() => {
    if (tab === 'course') fetchCourses().then(setCourses)
    if (tab === 'tryout') fetchTryouts().then(setTryouts)
  }, [tab])

  const renderCards = () => {
    if (tab === 'course') {
      return courses.map((course) => (
        <Link key={course.id} to={`/detail/course/${course.id}`}>
          <Card
            key={course.id}
            title={course.title}
            description={course.description}
            duration={course.data.duration}
            link={`/detail/course/${course.id}`}
          />
        </Link>
      ))
    }

    if (tab === 'tryout') {
      return tryouts.map((tryout) => (
        <Card
          key={tryout.id}
          title={tryout.title}
          description={tryout.description}
          duration={tryout.data.duration}
          link={`/detail/tryout-section/${tryout.id}`}
        />
      ))
    }

    return <div className="text-gray-500">No App data yet.</div>
  }

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setTab('course')}
          className={tab === 'course' ? 'font-bold' : ''}
        >
          Course
        </button>
        <button
          onClick={() => setTab('tryout')}
          className={tab === 'tryout' ? 'font-bold' : ''}
        >
          Tryout
        </button>
        <button
          onClick={() => setTab('app')}
          className={tab === 'app' ? 'font-bold' : ''}
        >
          App
        </button>
      </div>

      {renderCards()}
    </div>
  )
}
