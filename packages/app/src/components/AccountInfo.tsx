'use client'
import { useAccount } from 'wagmi'
import Image from 'next/image'
import Ethereum from '@/assets/icons/ethereum.png'
import { TokenBalance } from '@/components/TokenBalance'

import { TokenInfo } from '@/components/TokenInfo'

export function AccountInfo() {
  const { address, chain } = useAccount()

  return (
    <div className='stats shadow join-item mb-2 bg-gray-900'>
      <div className='stat'>
        <div className='stat-figure text-secondary'>
          <Image width={50} className='opacity-50 ml-10' src={Ethereum.src} alt='ethereum' />
        </div>
        <div className='stat-title '>Your balance</div>
        {/* {address ? <TokenBalance address={address} /> : <p>Please connect your wallet</p>} */}
        <TokenInfo chainId={chain?.id} />
      </div>
    </div>
  )
}
