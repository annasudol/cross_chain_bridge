import { chains } from '@/contracts'
import React, { FC } from 'react'

interface RedeemBtnProps {
  token: string
  value: string
  hash: string
  chainId: number
}

export const RedeemItem: FC<RedeemBtnProps> = ({ token, value, chainId, hash }) => {
  return (
    <div className='flex items-center w-full p-3 py-1 pl-4 pr-1 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-lime-400 hover:bg-opacity-80 hover:text-blue-900 focus:bg-blue-lime-300 focus:bg-opacity-80 focus:text-blue-900 active:bg-blue-500 active:bg-opacity-80 active:text-blue-900'>
      <a>
        {' '}
        href={`${chains[chainId].etherscan}/tx/${hash}`}
        {hash}
      </a>
      <div className='grid ml-auto place-items-center justify-self-end'>
        <button
          className='relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-blue-gray-500 transition-all hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
          type='button'>
          Redeem {value}
          {token}
        </button>
      </div>
    </div>
  )
}
