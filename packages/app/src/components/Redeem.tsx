'use client'
import { useAccount } from 'wagmi'

import { Connect } from '@/components/Connect'

import { chains } from '@/contracts'
import useLocalStorage from '@/app/hooks/useLocalStorage'
import { RedeemItem } from '@/components/RedeemItem'
export function Redeem() {
  const { address, chain } = useAccount()

  const [value] = useLocalStorage(`redeem-${chains[chain?.id || 97].name}`)

  if (!address) {
    return (
      <div className='flex justify-center items-center w-full h-full'>
        <div className='text-center flex flex-col items-center'>
          <p className='text-white mb-4'>Connect wallet !</p>
          <Connect />
        </div>
      </div>
    )
  }

  return (
    <div className='px-4 text-white flex flex-col justify-between h-full'>
      <h1>Transactions to Redeem</h1>
      {chain ? (
        <div>
          {Array.isArray(value) &&
            value.map(({ amount, address, hash }) => (
              <RedeemItem
                key={hash}
                amount={amount}
                address={address}
                chainId={chain?.id || 97}
                token={chains[chain?.id || 97].name}
              />
            ))}
        </div>
      ) : (
        <span className='loading loading-dots loading-sm'></span>
      )}
    </div>
  )
}
