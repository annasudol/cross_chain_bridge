'use client'
import { useEffect } from 'react'

interface TokenQuantityInputProps {
  id: string,
  onChange: (amount: string) => void,
  label: string,
  quantity: string
  maxValue?: string
  displayMaxClearButtons?: boolean
  disabled?: boolean
  minValue?: string
}
export function TokenQuantityInput({
  id,
  onChange,
  label,
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
    if (!disabled) {
      Number(maxValue) < Number(quantity) && onChange(maxValue as string)
      Number(minValue) > Number(quantity) && onChange(minValue as string)
    }
    
  }, [quantity])

  return (
    <div className='flex flex-col gap-2'>
      <label className='pr-2 text-white disabled:disabled:text-gray-400' htmlFor={id}>{label}</label>
      <input
        type='text'
        name={id}
        placeholder='0.01'
        value={quantity}
        className='w-full rounded-md bg-gray-600 bg-opacity-20 px-4 py-3 text-base text-white outline-none disabled:opacity-70 disabled::cursor-not-allowed disabled:text-gray-400'
        pattern='^-?[0-9]\d*\.?\d*$'
        onChange={(e) => handleChange(e)}
        disabled={disabled}
      />

      <div className={`${displayMaxClearButtons ? 'flex' : 'hidden'}  flex-row gap-2 w-full`}>
        <button
          onClick={handleSetMax}
          disabled={quantity === maxValue || disabled}
          className='btn btn-xs btn-outline btn-neutral text-white hover:text-gray-200 transition-colors disabled:text-gray-200 disabled:opacity-60'>
          Max
        </button>
        <button
          onClick={handleClear}
          disabled={quantity === minValue || disabled}
          className='btn btn-xs btn-outline btn-neutral text-white hover:text-gray-200 transition-colors disabled:text-gray-200 disabled:opacity-60'>
          Min
        </button>
      </div>
    </div>
  )
}
