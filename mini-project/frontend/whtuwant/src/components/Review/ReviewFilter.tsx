interface ReviewFilterProps {
  sortBy: 'latest' | 'oldest' | 'highest_rating' | 'lowest_rating' | undefined
  ratingFilter: number | ''
  searchUser: string
  searchContent: string
  onSortChange: (
    value: 'latest' | 'oldest' | 'highest_rating' | 'lowest_rating' | undefined
  ) => void
  onRatingFilterChange: (value: number | '') => void
  onSearchUserChange: (value: string) => void
  onSearchContentChange: (value: string) => void
  onApplyFilter: () => void
}

const ReviewFilter = ({
  sortBy,
  ratingFilter,
  searchUser,
  searchContent,
  onSortChange,
  onRatingFilterChange,
  onSearchUserChange,
  onSearchContentChange,
  onApplyFilter,
}: ReviewFilterProps) => {
  return (
    <div className="mb-4 flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
      <div className="flex-1">
        <label
          htmlFor="sortBy"
          className="block text-sm font-medium text-gray-700"
        >
          Urutkan:
        </label>
        <select
          id="sortBy"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={sortBy}
          onChange={(e) =>
            onSortChange(e.target.value as ReviewFilterProps['sortBy'])
          }
        >
          <option value="">Default</option>
          <option value="latest">Terbaru</option>
          <option value="oldest">Terlama</option>
          <option value="highest_rating">Rating Tertinggi</option>
          <option value="lowest_rating">Rating Terendah</option>
        </select>
      </div>

      <div className="flex-1">
        <label
          htmlFor="ratingFilter"
          className="block text-sm font-medium text-gray-700"
        >
          Filter Rating:
        </label>
        <select
          id="ratingFilter"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={ratingFilter}
          onChange={(e) => onRatingFilterChange(Number(e.target.value) || '')}
        >
          <option value="">Semua Rating</option>
          <option value="5">5 Bintang</option>
          <option value="4">4 Bintang</option>
          <option value="3">3 Bintang</option>
          <option value="2">2 Bintang</option>
          <option value="1">1 Bintang</option>
        </select>
      </div>

      <div className="flex-1">
        <label
          htmlFor="searchUser"
          className="block text-sm font-medium text-gray-700"
        >
          Cari User:
        </label>
        <input
          type="text"
          id="searchUser"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Cari nama user"
          value={searchUser}
          onChange={(e) => onSearchUserChange(e.target.value)}
        />
      </div>

      <div className="flex-1">
        <label
          htmlFor="searchContent"
          className="block text-sm font-medium text-gray-700"
        >
          Cari Komentar:
        </label>
        <input
          type="text"
          id="searchContent"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Cari isi komentar"
          value={searchContent}
          onChange={(e) => onSearchContentChange(e.target.value)}
        />
      </div>

      <div className="mt-4 md:mt-0">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onApplyFilter}
        >
          Apply Filter
        </button>
      </div>
    </div>
  )
}

export default ReviewFilter
