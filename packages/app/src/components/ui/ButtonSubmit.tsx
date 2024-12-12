/* eslint-disable react/display-name */
import type { FC } from 'react'
import { forwardRef, type FormEvent } from 'react'

import type { ReactNode } from 'react'

interface ButtonProps {
  onClick: () => void
  children?: ReactNode
  disabled?: boolean
  isLoading?: boolean
}

export const ButtonSubmit: FC<ButtonProps> = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(
  ({ children, onClick, disabled, isLoading = false }) => {
    const handleClick = (event: FormEvent) => {
      event.preventDefault()
      onClick()
    }
    return (
      <button
        className='mt-2 mb-8 w-full items-center mx-auto justify-items-center rounded-full border border-transparent bg-lime-500 px-4 py-4 text-base font-medium text-blue-900 shadow-sm hover:bg-lime-400 focus:outline-none disabled:hover:bg-lime-500 disabled:opacity-90'
        onClick={handleClick}
        disabled={disabled}>
        {isLoading ? <span className='loading loading-dots loading-sm'></span> : children}
      </button>
    )
  }
)
