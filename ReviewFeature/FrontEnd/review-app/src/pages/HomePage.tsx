import { useProfile } from '../features/authFeature/hooks'

export default function Home() {
  const { profile } = useProfile()

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Home</h2>
      <p className="text-lg">{profile?.fullname}</p>
    </div>
  )
}
