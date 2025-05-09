import React from 'react'
import { useParams } from 'react-router-dom'

interface RouteParams extends Record<string, string | undefined> {
  id: string
}

const TryoutDetailPage: React.FC = () => {
  const { id } = useParams<RouteParams>()
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Tryout Detail - {id}</h2>
      <p>This is the detailed page for tryout {id}</p>
    </div>
  )
}

export default TryoutDetailPage
