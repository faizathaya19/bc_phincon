import { Link } from 'react-router-dom'

type Props = {
  title: string
  description: string
  image?: string
  product_id: number
}

export default function Card({ title, description, image, product_id }: Props) {
  return (
    <Link to={`/product/${product_id}`}>
      <div className="border rounded-lg shadow hover:shadow-md transition p-4">
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover rounded mb-2"
          />
        )}
        <h3 className="text-lg font-bold mb-1">{title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
      </div>
    </Link>
  )
}
