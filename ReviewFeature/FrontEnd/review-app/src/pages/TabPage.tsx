import { useEffect, useState } from 'react'
import { fetchType } from '../models/api'
import { Link } from 'react-router-dom'

import Card from '../components/Card'

import type { Course } from '../types/Course'
import type { Tryout } from '../types/Tryout'
import type { App } from '../types/app'

export default function TabsPage() {
  const [tab, setTab] = useState<'course' | 'tryout-section' | 'app'>('course')
  const [tryouts, setTryouts] = useState<Tryout[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [apps, setApps] = useState<App[]>([])
  const [errorMessage, setError] = useState<string>('')

  useEffect(() => {
    if (tab === 'course') {
      fetchType('course')
        .then(setCourses)
        .catch((error) => {
          setError(error.message)
        })
    } else if (tab === 'app') {
      fetchType('app')
        .then(setApps)
        .catch((error) => {
          setError(error.message)
        })
    } else if (tab === 'tryout-section') {
      fetchType('tryout-section')
        .then(setTryouts)
        .catch((error) => {
          setError(error.message)
        })
    }
  }, [tab])

  const renderCards = () => {
    if (tab === 'course') {
      if (courses.length === 0) {
        return <div className="text-gray-500">No courses available</div>
      }
      return courses.map((course) => (
        <Link key={course.id} to={`/detail/course/${course.id}`}>
          <Card
            title={course.title}
            description={course.description}
            duration={course.data.duration}
            link={`/detail/course/${course.id}`}
          />
        </Link>
      ))
    }

    if (tab === 'tryout-section') {
      if (tryouts.length === 0) {
        return <div className="text-gray-500">No tryouts available</div>
      }
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

    if (tab === 'app') {
      if (apps.length === 0) {
        return <div className="text-gray-500">No apps available</div>
      }
      return apps.map((app) => (
        <Card
          key={app.id}
          title={app.title}
          description={app.description}
          duration={app.data.duration}
          link={`/detail/app/${app.id}`}
        />
      ))
    }

    return <div className="text-gray-500">No data available</div>
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
          onClick={() => setTab('tryout-section')}
          className={tab === 'tryout-section' ? 'font-bold' : ''}
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
      {errorMessage !== '' ? (
        <div className="text-red-500">Error data</div>
      ) : (
        renderCards()
      )}
    </div>
  )
}
