import { GreetingModel } from '../models/GreetingModel'

export default function Home() {
  const greeting = new GreetingModel(1, 'Faiz').getGreeting()

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Home</h2>
      <p className="text-lg">{greeting.message}</p>
    </div>
  )
}
