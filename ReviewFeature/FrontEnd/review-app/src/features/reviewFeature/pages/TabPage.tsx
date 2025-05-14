import { useState } from 'react'
import Card from '../components/Card'
import { useTypes } from '../hooks/useTypes'
import type { Course } from '../types/Course'
import type { Tryout } from '../types/Tryout'
import type { App } from '../types/App'

export default function TabsPage() {
  const [tab, setTab] = useState<'course' | 'tryout-section' | 'app'>('course')
  const { data, loading, error } = useTypes(tab)

  const renderCards = () => {
    if (data.length === 0) {
      return <div className="text-gray-500">No {tab} available</div>
    }

    return data.map((data: Course | Tryout | App) => (
      <Card
        key={data.id}
        title={data.title}
        description={data.description}
        duration={data.data.duration}
        link={`/detail/${tab}/${data.id}`}
      />
    ))
  }

  const renderLoading = () => {
    return <div className="text-gray-500">Loading ...</div>
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

      {(() => {
        if (loading) {
          return renderLoading()
        } else if (error !== null) {
          return <div className="text-red-500">Error</div>
        } else {
          return renderCards()
        }
      })()}
    </div>
  )
}
