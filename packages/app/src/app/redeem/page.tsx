'use client'
import { useTransactionReceipt } from 'wagmi'
import { useEffect } from 'react'
import { getCookie } from '../actions'
export default function Home() {
  // const tokenSwap = chains[chain?.id as number]?.swapTokens[0];
  useEffect(() => {
    const token = getCookie('redeem-sETH')
    token.then((res) => console.log(res))
  }, [])
  return (
    <div className='mt-4'>
      <p>redeem</p>
    </div>
  )
}