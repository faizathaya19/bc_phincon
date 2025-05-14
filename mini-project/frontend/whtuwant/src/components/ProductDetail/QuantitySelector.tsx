import React from 'react'
import { Button } from '../ui/button'
import { Minus, Plus } from 'lucide-react'

interface QuantitySelectorProps {
  value: number
  setValue: (value: number) => void
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  value,
  setValue,
}) => {
  const handleQuantityChange = (delta: number) => {
    setValue(Math.max(1, value + delta))
  }

  return (
    <div className="flex items-center gap-4 mt-6">
      <label htmlFor="quantity" className="text-sm font-medium">
        Kuantitas:
      </label>
      <div className="flex items-center border rounded-md overflow-hidden">
        <Button
          onClick={() => handleQuantityChange(-1)}
          disabled={value <= 1}
          size="icon"
        >
          <Minus className="w-4 h-4" />
        </Button>
        <input
          type="number"
          readOnly
          value={value}
          className="w-12 text-center border-x"
        />
        <Button onClick={() => handleQuantityChange(1)} size="icon">
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
