import { useState } from 'react'
import Header from '../components/ui/Header'
import LandingPage from '../pages/LandingPage'

function Home() {
  const [profile, setProfile] = useState<{ firstname: string } | null>(null)
  return (
    <div className="min-h-screen bg-gray-50">
      <Header name={profile?.firstname} />
      <LandingPage onProfileLoaded={setProfile} />
    </div>
  )
}

export default Home
