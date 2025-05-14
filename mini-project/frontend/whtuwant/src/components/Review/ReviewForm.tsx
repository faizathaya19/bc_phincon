import React, { useState, ChangeEvent, FormEvent } from 'react'
import { ReviewType } from '../../types/review'
import { FaStar, FaSpinner } from 'react-icons/fa'

interface ReviewFormProps {
  referenceId: string
  type: ReviewType
  onSubmit: (formData: FormData) => void
  isSubmitting?: boolean
}

const ReviewForm = ({
  referenceId,
  type,
  onSubmit,
  isSubmitting,
}: ReviewFormProps) => {
  const [rating, setRating] = useState(5)
  const [content, setContent] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(e.target.value))
  }

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setImageFile(null)
      setPreview(null)
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!content.trim()) {
      alert('Silakan tulis ulasan Anda.')
      return
    }

    const formData = new FormData()
    formData.append('referenceId', referenceId)
    formData.append('type', type)
    formData.append('rating', String(rating))
    formData.append('content', content)
    if (imageFile) {
      formData.append('image', imageFile)
    }

    onSubmit(formData)
    setContent('')
    setImageFile(null)
    setPreview(null)
    setRating(5)
    if (fileInputRef.current) {
      fileInputRef.current.value = '' // Reset file input
    }
  }

  return (
    <form
      className="mt-6 bg-white p-4 rounded-md shadow-sm"
      onSubmit={handleSubmit}
    >
      <h4 className="font-semibold mb-3 text-lg text-gray-800">
        Tinggalkan Ulasan
      </h4>
      <div className="mb-4">
        <label
          htmlFor="rating"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Rating:
        </label>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((value) => (
            <label key={value} className="inline-flex items-center mr-2">
              <input
                type="radio"
                name="rating"
                value={value}
                checked={rating === value}
                onChange={handleRatingChange}
                className="form-radio h-5 w-5 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded-full"
              />
              <FaStar
                className={`ml-1 text-yellow-500 ${
                  rating >= value ? '' : 'opacity-50'
                }`}
              />
            </label>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Ulasan Anda:
        </label>
        <textarea
          id="content"
          placeholder="Tulis ulasan Anda di sini..."
          value={content}
          onChange={handleContentChange}
          className="border p-2 w-full mt-1 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          rows={4}
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Gambar (Opsional):
        </label>
        <div className="flex items-center">
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="block w-full text-sm text-gray-500 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {preview && (
            <div className="ml-4">
              <img
                src={preview}
                alt="Pratinjau gambar yang dipilih"
                className="mt-1 border rounded-md max-h-20 object-contain"
              />
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed ${
          isSubmitting ? 'animate-pulse' : ''
        }`}
        disabled={!content.trim() || isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center">
            <FaSpinner className="animate-spin mr-2" /> Mengirim...
          </div>
        ) : (
          'Kirim Ulasan'
        )}
      </button>
    </form>
  )
}

export default ReviewForm
