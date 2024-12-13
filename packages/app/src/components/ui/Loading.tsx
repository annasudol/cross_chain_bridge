import React, { FC } from 'react'

interface LoadingProps {
  message: string
}

export const Loading: FC<LoadingProps> = ({ message }) => {
  return (
    <div className='flex items-center justify-center py-4 px-2 h-96'>
      <div className='flex flex-col items-center justify-center'>
        <p className='text-white mb-2'>{message}</p>
        <span className='loading loading-dots loading-xl text-center'></span>
      </div>
    </div>
  )
}
