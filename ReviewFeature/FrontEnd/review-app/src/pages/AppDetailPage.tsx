import React from 'react'
import { useParams } from 'react-router-dom'

interface RouteParams extends Record<string, string | undefined> {
  id: string
}

const AppDetailPage: React.FC = () => {
  const { id } = useParams<RouteParams>()
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">App Detail - {id}</h2>
      <p>This is the detailed page for app {id}</p>
    </div>
  )
}

export default AppDetailPage
