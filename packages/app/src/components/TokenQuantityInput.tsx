'use client'
import { useState, useEffect } from 'react'

interface TokenQuantityInputProps {
  onChange: (amount: string) => void
  quantity: string
  maxValue?: string
  displayMaxClearButtons?: boolean
  disabled?: boolean
  minValue?: string
}
export function TokenQuantityInput({
  onChange,
  quantity,
  maxValue,
  displayMaxClearButtons = true,
  disabled = false,
  minValue = '0.01',
}: TokenQuantityInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // only allow numbers and one decimal point
    if (!/^\d*\.?\d*$/.test(e.target.value)) {
      return
    }
    onChange(e.target.value)
  }

  const handleSetMax = () => {
    onChange(maxValue ?? '0.00')
  }

  const handleClear = () => {
    onChange(minValue)
  }

  useEffect(() => {
    Number(maxValue) < Number(quantity) && onChange(maxValue as string)
  }, [quantity])

  return (
    <div className='flex flex-col gap-2'>
      <input
        type='text'
        placeholder='0.01'
        value={quantity}
        className='w-[100%] rounded-md bg-gray-600 bg-opacity-20 px-4 py-3 text-base text-white outline-none'
        pattern='^-?[0-9]\d*\.?\d*$'
        onChange={(e) => handleChange(e)}
        disabled={disabled}
      />

      <div className={`${displayMaxClearButtons ? 'flex' : 'hidden'}  flex-row gap-2 w-full`}>
        <button
          onClick={handleSetMax}
          disabled={quantity === maxValue}
          className='btn btn-xs btn-outline btn-neutral text-white hover:text-gray-200 transition-colors disabled:text-gray-200 disabled:opacity-20'>
          Max
        </button>
        <button
          onClick={handleClear}
          disabled={quantity === minValue}
          className='btn btn-xs btn-outline btn-neutral text-white hover:text-gray-200 transition-colors disabled:text-gray-200'>
          Clear
        </button>
      </div>
    </div>
  )
}
