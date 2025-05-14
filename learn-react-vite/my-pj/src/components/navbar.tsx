// src/components/Navbar.tsx


const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-semibold">MyApp</div>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              About
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              Services
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
