import { useState, useEffect, useCallback } from 'react'
import {
  getAllType,
  getTypeById,
  createReview,
} from '../../api/services/review.service'
import {
  CourseTryoutSectionModel,
  ReviewType,
  ReviewModel,
} from '../../types/review'
import Tabs from './Tabs'
import ItemCard from './ItemCard'
import ReviewList from './ReviewList'
import ReviewForm from './ReviewForm'
import ReviewFilter from './ReviewFilter'
import { FaSpinner, FaExclamationTriangle } from 'react-icons/fa'

const ReviewPage = () => {
  const [selectedType, setSelectedType] = useState<ReviewType>('course')
  const [items, setItems] = useState<CourseTryoutSectionModel[]>([])
  const [selectedItem, setSelectedItem] =
    useState<CourseTryoutSectionModel | null>(null)
  const [isLoadingItems, setIsLoadingItems] = useState(false)
  const [isLoadingDetails, setIsLoadingDetails] = useState(false)
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [sortBy, setSortBy] = useState<
    'latest' | 'oldest' | 'highest_rating' | 'lowest_rating' | undefined
  >(undefined)
  const [ratingFilter, setRatingFilter] = useState<number | ''>('')
  const [searchUser, setSearchUser] = useState('')
  const [searchContent, setSearchContent] = useState('')

  const userId = 'dc10c347-7ad0-4e70-8fa3-ca899b7d2d1b'

  useEffect(() => {
    const fetchItems = async () => {
      console.log('Fetching type:', selectedType)
      setSelectedItem(null)
      setItems([])
      setIsLoadingItems(true)
      setError(null)
      try {
        const res = await getAllType(selectedType)
        setItems(res.data?.data)
      } catch (err) {
        console.error(`Error fetching ${selectedType}s:`, err)
        let errorMessage = `Gagal memuat daftar ${selectedType}. Coba lagi nanti.`
        if (err instanceof Error) {
          errorMessage = err.message
        } else if (
          typeof err === 'object' &&
          err !== null &&
          'message' in err
        ) {
          errorMessage = (err as { message: string }).message
        }
        setError(errorMessage)
      } finally {
        setIsLoadingItems(false)
      }
    }
    fetchItems()
  }, [selectedType])

  const fetchSelectedItemDetails = useCallback(
    async (
      id: string,
      currentSortBy?: typeof sortBy,
      currentRatingFilter?: typeof ratingFilter,
      currentSearchUser?: string,
      currentSearchContent?: string
    ) => {
      if (
        !id ||
        (selectedItem?.id === id &&
          !isLoadingDetails &&
          !currentSortBy &&
          !currentRatingFilter &&
          !currentSearchUser &&
          !currentSearchContent)
      )
        return

      setIsLoadingDetails(true)
      setError(null)
      try {
        const res = await getTypeById(selectedType, id, {
          sortBy: currentSortBy,
          rating: currentRatingFilter === '' ? undefined : currentRatingFilter,
          searchUser: currentSearchUser,
          searchContent: currentSearchContent,
        })
        console.log('Data item yang diterima:', res.data)
        setSelectedItem(
          res.data?.data as CourseTryoutSectionModel & {
            reviews?: ReviewModel[]
          }
        )
      } catch (err) {
        console.error(`Error fetching ${selectedType} by ID ${id}:`, err)
        let errorMessage = `Gagal memuat detail item. Coba lagi nanti.`
        if (err instanceof Error) {
          errorMessage = err.message
        } else if (
          typeof err === 'object' &&
          err !== null &&
          'message' in err
        ) {
          errorMessage = (err as { message: string }).message
        }
        setError(errorMessage)
        setSelectedItem(null)
      } finally {
        setIsLoadingDetails(false)
      }
    },
    [selectedType, isLoadingDetails, selectedItem?.id]
  )

  const handleItemClick = useCallback(
    (id: string) => {
      fetchSelectedItemDetails(id)
    },
    [fetchSelectedItemDetails]
  )

  const handleSubmitReview = async (formData: FormData) => {
    if (!selectedItem) {
      return
    }

    setIsSubmittingReview(true)
    setError(null)

    try {
      const newReviewResponse = await createReview(userId, formData)
      console.log('New review:', newReviewResponse.data.data)
      if (selectedItem && newReviewResponse?.data.data) {
        const newReview = newReviewResponse
        setSelectedItem({
          ...selectedItem,
          reviews: [newReview.data.data, ...(selectedItem.reviews || [])],
        })
      }
    } catch (err) {
      console.error('Error submitting review:', err)
      let errorMessage = 'Gagal mengirim ulasan. Coba lagi nanti.'
      if (err) {
        errorMessage = err.toString()
      } else if (err instanceof Error) {
        errorMessage = err.message
      } else if (typeof err === 'object' && err !== null && 'message' in err) {
        errorMessage = (err as { message: string }).message
      }
      setError(errorMessage)
    } finally {
      setIsSubmittingReview(false)
    }
  }

  const handleSortChange = (
    value: 'latest' | 'oldest' | 'highest_rating' | 'lowest_rating' | undefined
  ) => {
    setSortBy(value)
  }

  const handleRatingFilterChange = (value: number | '') => {
    setRatingFilter(value)
  }

  const handleSearchUserChange = (value: string) => {
    setSearchUser(value)
  }

  const handleSearchContentChange = (value: string) => {
    setSearchContent(value)
  }

  const handleApplyFilter = useCallback(() => {
    console.log('Tombol Apply Filter ditekan')
    console.log('sortBy:', sortBy)
    console.log('ratingFilter:', ratingFilter)
    console.log('searchUser:', searchUser)
    console.log('searchContent:', searchContent)
    if (selectedItem?.id) {
      console.log('Memanggil fetchSelectedItemDetails dari handleApplyFilter')
      fetchSelectedItemDetails(
        selectedItem.id,
        sortBy,
        ratingFilter,
        searchUser,
        searchContent
      )
    } else {
      console.log(
        'selectedItem belum dipilih, tidak memanggil fetchSelectedItemDetails'
      )
    }
  }, [
    selectedItem?.id,
    fetchSelectedItemDetails,
    sortBy,
    ratingFilter,
    searchUser,
    searchContent,
  ])

  const renderItems = () => {
    if (isLoadingItems) {
      return (
        <div className="flex justify-center items-center mt-6">
          <FaSpinner className="animate-spin text-blue-500 text-2xl" />
          <span className="ml-2">Memuat daftar item...</span>
        </div>
      )
    }
    if (items.length === 0 && !error) {
      return (
        <div className="text-center mt-6 text-gray-500">
          Tidak ada item {selectedType} ditemukan.
        </div>
      )
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onClick={() => handleItemClick(item.id)}
          />
        ))}
      </div>
    )
  }

  const renderSelectedItemDetails = () => {
    console.log('Rendering details with filter:', {
      sortBy,
      ratingFilter,
      searchUser,
      searchContent,
    })
    console.log('Current selectedItem:', selectedItem)
    return (
      selectedItem && (
        <div className="mt-8 p-6 border rounded-lg shadow-md bg-white">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            {selectedItem.title}
          </h2>
          <p className="text-gray-600 text-sm mb-2">
            Kode: {selectedItem.code}
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            {selectedItem.description}
          </p>

          <ReviewFilter
            sortBy={sortBy}
            ratingFilter={ratingFilter}
            searchUser={searchUser}
            searchContent={searchContent}
            onSortChange={handleSortChange}
            onRatingFilterChange={handleRatingFilterChange}
            onSearchUserChange={handleSearchUserChange}
            onSearchContentChange={handleSearchContentChange}
            onApplyFilter={handleApplyFilter}
          />
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Ulasan</h3>
            {isLoadingDetails ? (
              <div className="flex justify-center items-center">
                <FaSpinner className="animate-spin text-blue-500 text-xl" />
                <span className="ml-2">Memuat ulasan...</span>
              </div>
            ) : (
              <ReviewList reviews={selectedItem?.reviews || []} />
            )}
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Tulis Ulasan Anda
            </h3>
            <ReviewForm
              referenceId={selectedItem?.id || ''}
              type={selectedType}
              onSubmit={handleSubmitReview}
              isSubmitting={isSubmittingReview}
            />
          </div>
        </div>
      )
    )
  }

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-50 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Ulasan</h1>
      <Tabs selected={selectedType} onSelect={setSelectedType} />

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded-md text-center flex items-center justify-center">
          <FaExclamationTriangle className="mr-2" />
          {error}
        </div>
      )}

      {renderItems()}

      {selectedItem ? (
        renderSelectedItemDetails()
      ) : isLoadingDetails ? (
        <div className="text-center mt-8">
          <FaSpinner className="animate-spin text-blue-500 text-2xl" />
          <span className="ml-2">Memuat detail...</span>
        </div>
      ) : null}
    </div>
  )
}

export default ReviewPage
