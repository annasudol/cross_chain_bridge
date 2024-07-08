import { chains } from '@/contracts'
import React, { FC } from 'react'
import { ButtonSubmit } from '@/components/ButtonSubmit'

interface RedeemBtnProps {
  token: string
  value: string
  hash: string
  chainId: number
}

export const RedeemItem: FC<RedeemBtnProps> = ({ token, value, chainId, hash }) => {
  const handleClick = () => {
    console.log('click')
  }
  return (
    <div className='flex items-center w-full p-3 py-1 pl-4 pr-1 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-lime-400 hover:bg-opacity-80 hover:text-blue-900 focus:bg-blue-lime-300 focus:bg-opacity-80 focus:text-blue-900 active:bg-blue-500 active:bg-opacity-80 active:text-blue-900'>
      <a>
        {' '}
        href={`${chains[chainId].etherscan}/tx/${hash}`}
        {hash}
      </a>
      <ButtonSubmit onClick={handleClick}>
        Redeem {value} {token}
      </ButtonSubmit>
    </div>
  )
}
