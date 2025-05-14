import { ReviewModel } from '../../types/review'
import { FaStar } from 'react-icons/fa'

const ReviewList = ({ reviews }: { reviews: ReviewModel[] }) => {
  console.log('ReviewList menerima props reviews:', reviews)
  return (
    <div className="space-y-4">
      {reviews && reviews.length > 0 ? (
        reviews.map((r) => (
          <div key={r.id} className="bg-white border rounded-md shadow-sm p-4">
            <div className="flex items-center mb-2">
              <div className="font-semibold text-gray-800">
                {r.user.fullname}
              </div>
              <div className="ml-2 text-yellow-500 flex items-center">
                <FaStar className="mr-1" /> {r.rating}
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">{r.content}</p>
            {r.image && (
              <div className="mt-2">
                <img
                  src={r.image}
                  alt="review"
                  className="w-32 h-auto rounded-md border"
                />
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500">Belum ada ulasan untuk item ini.</p>
      )}
    </div>
  )
}

export default ReviewList
