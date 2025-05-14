import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDetail, getDetailfilter } from '../models/Api'
import type { Course } from '../types/Course'
import type { Tryout } from '../types/Tryout'
import type { App } from '../types/App'
import CreateReviewForm from '../components/CreateReviewForm'
import ReviewFilter from '../components/ReviewFilter'

type DetailType = Course | Tryout | App

const DetailPage: React.FC = () => {
  const { type, id } = useParams<{
    type: 'course' | 'tryout-section' | 'app'
    id: string
  }>()

  const [data, setData] = useState<DetailType | null>(null)
  const [error, setError] = useState<string>('')

  const fetchData = React.useCallback(() => {
    if (id && type) {
      getDetail(id, type)
        .then((result) => {
          setData(result)
        })
        .catch((error) => {
          console.error(`Gagal mengambil detail ${type}:`, error)
          setError('Gagal mengambil data')
        })
    }
  }, [id, type])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleFilterChange = (newFilters: {
    sortBy?: string
    rating?: string
    searchContent?: string
    searchUser?: string
  }) => {
    if (id && type) {
      getDetailfilter(id, type, newFilters)
        .then((result) => {
          setData(result)
        })
        .catch((error) => {
          console.error(`Gagal mengambil detail ${type}:`, error)
          setError('Gagal mengambil data')
        })
    }
  }

  const renderCommonData = () => {
    if (!data) return null

    return (
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{data.title}</h2>
        <p className="text-gray-600">{data.description}</p>

        <div className="mt-4 text-sm text-gray-700">
          <p>
            <strong>Tag:</strong> {data.tag}
          </p>
          <p>
            <strong>Aktif:</strong> {data.active ? 'Ya' : 'Tidak'}
          </p>
          <p>
            <strong>Dibuat:</strong> {new Date(data.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Diperbarui:</strong>{' '}
            {new Date(data.updatedAt).toLocaleString()}
          </p>
        </div>

        {'data' in data && data.data && (
          <div className="mt-4">
            {'level' in data.data && (
              <p>
                <strong>Level:</strong> {data.data.level}
              </p>
            )}
            {'duration' in data.data && (
              <p>
                <strong>Durasi:</strong> {data.data.duration}
              </p>
            )}
          </div>
        )}
      </div>
    )
  }

  const renderReviews = () => {
    if (!data || !('reviews' in data) || !Array.isArray(data.reviews))
      return null

    if (data.reviews.length === 0) {
      return <p className="text-gray-500">Tidak ada ulasan.</p>
    }

    const formatDate = (dateString: string) => {
      const date = new Date(dateString)
      const formatter = new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })

      return formatter.format(date)
    }

    const renderRatingStars = (rating: number) => {
      const totalStars = 5
      const filledStars = Math.floor(rating)
      const halfStars = rating % 1 >= 0.5 ? 1 : 0
      const emptyStars = totalStars - filledStars - halfStars

      return (
        <div className="flex items-center">
          {Array(filledStars)
            .fill('★')
            .map((_, index) => (
              <span
                key={`filled-${rating}-${index}`}
                className="text-yellow-400"
              >
                ★
              </span>
            ))}
          {halfStars > 0 && <span className="text-yellow-400">★</span>}
          {Array(emptyStars)
            .fill('★')
            .map((_, index) => (
              <span key={`empty-${rating}-${index}`} className="text-gray-300">
                ★
              </span>
            ))}
        </div>
      )
    }

    return (
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Ulasan</h3>
        <div className="space-y-4 mt-2">
          {data.reviews.map((review) => {
            const fullname = review.user?.fullname || 'Anonim'
            const createdAtFormatted = review.createdAt
              ? formatDate(review.createdAt)
              : null

            return (
              <div
                key={review.id}
                className="border border-gray-300 rounded-lg p-4 shadow-sm"
              >
                <div className="mb-2">
                  <p className="font-medium">{fullname}</p>
                  <div className="text-sm text-gray-600">
                    {renderRatingStars(review.rating)}
                  </div>
                  {createdAtFormatted && (
                    <p className="text-xs text-gray-500">
                      {createdAtFormatted}
                    </p>
                  )}
                </div>

                {review.image && (
                  <img
                    src={review.image}
                    alt="ulasan"
                    className="w-full max-w-xs h-auto object-cover rounded-md mb-2"
                  />
                )}

                <p>{review.content}</p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>
  }

  if (!data) {
    return <div className="p-6 text-gray-500">Memuat...</div>
  }

  return (
    <div className="p-6 space-y-6">
      {renderCommonData()}

      <CreateReviewForm
        userId="917bbec2-c46b-4fd6-b38e-ccfcfc2510be"
        referenceId={data.id}
        type={type as 'course' | 'tryout-section' | 'app'}
        onSuccess={fetchData}
      />

      <ReviewFilter onChange={handleFilterChange} />

      {renderReviews()}
    </div>
  )
}

export default DetailPage
