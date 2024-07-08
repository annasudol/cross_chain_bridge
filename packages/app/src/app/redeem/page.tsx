'use client'
import { useAccount, useTransactionReceipt } from 'wagmi'
import { useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { chains } from '@/contracts'

export default function Home() {
  const { address, chain } = useAccount()

  const [value, setValue] = useLocalStorage(`redeem-${chains[chain?.id || 97].name}`, '')

  // const tokenSwap = chains[chain?.id as number]?.swapTokens[0];
  useEffect(() => {
    console.log(value, 'value')
  }, [value])
  return (
    <div className='mt-4 rounded-xl p-3 min-h-96 max-w-xl bg-indigo-950'>
      <p>redeem</p>
    </div>
  )
}
