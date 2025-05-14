import React from 'react'
import { Link } from 'react-router-dom'

interface CardProps {
  title: string
  description: string
  link: string
  duration: string
}

const Card: React.FC<CardProps> = ({ title, description, link, duration }) => {
  return (
    <Link to={link}>
      <div className="border rounded-lg p-4 shadow-md hover:shadow-lg mb-2 transition-all">
        <h3 className="font-semibold text-xl">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
        <span className="text-sm text-gray-600">{duration}</span>
        <span className="text-sm text-gray-600">
          <Link
            to={link}
            className="text-blue-600 hover:underline ml-4 inline-block"
          >
            View Details
          </Link>
        </span>
      </div>
    </Link>
  )
}

export default Card
