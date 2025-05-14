import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Galleries } from '../models/product.model' 
import { cn } from '../../lib/utils'

// Interface untuk ProductImageGallery Props
interface ProductImageGalleryProps {
  images?: Galleries[] // Gunakan tipe Gallery
  className?: string
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  className,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    if (images && images.length > 0) {
      setSelectedImage(images[0].url)
    } else {
      setSelectedImage(null)
    }
  }, [images])

  // Placeholder jika tidak ada gambar
  if (!images || images.length === 0) {
    return (
      <div
        className={cn(
          'aspect-square w-full bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-500',
          className
        )}
      >
        Tidak ada gambar
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {/* Main Image */}
      <motion.div
        key={selectedImage} // Animate on change
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="aspect-square w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm"
      >
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Product Display"
            className="w-full h-full object-contain" // Use contain to prevent cropping
          />
        ) : (
          // Placeholder while loading or if URL is broken, though useEffect handles the initial null
          <div className="text-gray-400">Memuat Gambar...</div>
        )}
      </motion.div>

      {/* Thumbnails (only if more than one image) */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
          {' '}
          {/* Negatif margin + padding untuk scroll */}
          {images.map((img) => (
            <motion.div
              key={img.id}
              whileHover={{ scale: 1.05, y: -2, borderColor: '#6366F1' }} // Indigo-500
              whileTap={{ scale: 0.98 }}
              className={cn(
                'w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-md border-2 cursor-pointer transition-all duration-200 overflow-hidden bg-gray-100 dark:bg-gray-700',
                selectedImage === img.url
                  ? 'border-indigo-500 dark:border-indigo-400 ring-2 ring-indigo-200 dark:ring-indigo-700/50'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
              )}
              onClick={() => setSelectedImage(img.url)}
            >
              <img
                src={img.url}
                alt={`Product Thumbnail ${img.id}`}
                className="w-full h-full object-cover" // Use cover for thumbnails
                loading="lazy" // Lazy load thumbnails
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export { ProductImageGallery }
