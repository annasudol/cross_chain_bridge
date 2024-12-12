'use client'

import React from 'react'
import { useBlockNumber, useAccount } from 'wagmi'
import { LinkComponent } from './ui/LinkComponent'

export function NetworkStatus() {
  const block = useBlockNumber({ watch: true })
  const { chain } = useAccount()
  const explorerUrl = chain?.blockExplorers?.default.url
  const networkName = chain?.name ?? 'Ethereum'

  return (
    <div className='flex items-center gap-2 p-4'>
      <div className='px-4 py-1 bg-zinc-700 text-stone-50 rounded-full'>{networkName}</div>
      {explorerUrl && (
        <LinkComponent href={explorerUrl}>
          <p className='text-xs'># {block.data?.toString()}</p>
        </LinkComponent>
      )}
      {!explorerUrl && <p className='text-xs'># {block.data?.toString()}</p>}
    </div>
  )
}
