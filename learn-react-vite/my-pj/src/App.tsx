import Navbar from './components/navbar'

function App() {
  return (
    <div>
      <Navbar />
      <main className="p-6">
        <h1 className="text-3xl font-bold">Welcome to MyApp!</h1>
        <p className="mt-4 text-gray-600">
          This is your React + Vite + TS + Tailwind setup.
        </p>
      </main>
    </div>
  )
}

export default App
