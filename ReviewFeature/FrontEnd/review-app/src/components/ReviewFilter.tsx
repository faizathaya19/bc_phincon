import React, { useState } from 'react'

interface FilterReviewProps {
  onChange: (params: {
    sortBy?: string
    rating?: string
    searchContent?: string
    searchUser?: string
  }) => void
}

const ReviewFilter: React.FC<FilterReviewProps> = ({ onChange }) => {
  const [localSortBy, setSortBy] = useState('')
  const [localRating, setRating] = useState('')
  const [localSearchContent, setSearchContent] = useState('')
  const [localSearchUser, setSearchUser] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setIsLoading(true)

    const filterParams: { [key: string]: string | undefined } = {}

    if (localSortBy) {
      filterParams.sortBy = localSortBy
    }

    if (localRating) {
      filterParams.rating = localRating
    }

    if (localSearchContent) {
      filterParams.searchContent = localSearchContent
    }

    if (localSearchUser) {
      filterParams.searchUser = localSearchUser
    }

    setTimeout(() => {
      onChange(filterParams)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div className="flex flex-wrap gap-4">
        <div>
          <label
            htmlFor="sortBy"
            className="block text-sm font-medium text-gray-700"
          >
            Urutkan
          </label>
          <select
            id="sortBy"
            value={localSortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Semua</option>
            <option value="latest">Terbaru</option>
            <option value="oldest">Terlama</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700"
          >
            Rating
          </label>
          <select
            id="rating"
            value={localRating}
            onChange={(e) => setRating(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Semua</option>
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
        </div>

        <div>
          <label htmlFor="searchContent" className="block text-sm font-medium text-gray-700">
            Cari Konten
          </label>
          <input
            id="searchContent"
            type="text"
            value={localSearchContent}
            onChange={(e) => setSearchContent(e.target.value)}
            placeholder="Cari konten..."
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label
            htmlFor="searchUser"
            className="block text-sm font-medium text-gray-700"
          >
            Cari User
          </label>
          <input
            id="searchUser"
            type="text"
            value={localSearchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            placeholder="Cari user..."
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        disabled={isLoading}
      >
        {isLoading ? 'Memuat...' : 'Terapkan Filter'}
      </button>
    </form>
  )
}

export default ReviewFilter
