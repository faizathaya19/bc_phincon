import { useEffect, useState } from 'react'
import type { App } from '../types/App'
import { fetchType } from '../services/review.service'
import type { Tryout } from '../types/Tryout'
import type { Course } from '../types/Course'

export const useTypes = (type: 'course' | 'tryout-section' | 'app') => {
  const [data, setData] = useState<App[] | Tryout[] | Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      try {
        const data = await fetchType(type)
        setData(data)
      } catch (err) {
        setError(`Failed to fetch reviews: ${err}`)
      } finally {
        setLoading(false)
      }
    }

    fetch()
  }, [type])

  return { data, loading, error }
}
