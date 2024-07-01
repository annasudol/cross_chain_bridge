'use client'
import { useAccount, useWaitForTransactionReceipt } from 'wagmi'
import { useState, type FormEvent } from 'react'

import { SwitchNetworkBtn } from '@/components/SwitchNetworkBtn'
import { TokenName } from '@/components/TokenName'
import { TokenBalance } from '@/components/TokenBalance'

import { BaseError, parseAbi } from 'viem'
import { useWriteContract } from 'wagmi'
import { chains } from '@/contracts';


export function Facet(){
  const { chain, address } = useAccount();
  const [balance, setBalance] = useState<string>();
  const { data: hash, error, isPending, writeContract } = useWriteContract()

  async function submit(event: FormEvent) {
    event.preventDefault()
    if(chain) {
        writeContract({
        address: chains[chain?.id].bridgeAddress,
        abi: parseAbi(['function facet()']),
        functionName: 'facet',
    })
    }
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({hash})
  return (
    <div className='px-4 text-white flex flex-col justify-between h-full'>
      {chain?.name && <div className='flex items-center'>
        <TokenName name={chain?.name as string} title='Receive' />
        <SwitchNetworkBtn label='on' />
      </div>}
      <div>{address && chain?.id && <p>Your balance:  <TokenBalance setBalance={setBalance} balance={balance} address={address} tokenAddress={chains[chain?.id].tokenAddress} /><span className='text-white mx-2'>{chains[chain?.id as number].name} </span></p>}</div>
      <div>
        <p className='mb-2 text-sm'>To request {chains[chain?.id as number].name} funds, click button.</p>
        <p className='mb-2 text-sm'>You can request 1 {chains[chain?.id as number].name} every 24h!</p>
        <p className='mb-2 text-sm'>{chains[chain?.id as number].name} tokens is a currency that allows you to swap {chains[chain?.id as number].name === 'sETH' ? 'ETH' : 'BNC'} to {chains[chain?.id as number].name === 'sETH' ? 'BNC' : 'ETH'}</p>
      </div>
      <form onSubmit={submit}>
        <button
          className='mt-2 mb-8 w-full items-center mx-auto justify-items-center rounded-full border border-transparent bg-lime-500 px-4 py-4 text-base font-medium text-blue-900 shadow-sm hover:bg-lime-400 focus:outline-none disabled:hover:bg-lime-500 disabled:opacity-10'
          onClick={submit}
          disabled={isConfirming || isPending}>
          {isPending ? <span className='loading loading-dots loading-sm'></span> : `Click to receive ${chains[chain?.id as number].name}`}
        </button>
      </form>
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && 'Waiting for confirmation...'}
      {isConfirmed && 'Transaction confirmed.'}
      {error && (
        <div>Error: {(error as BaseError).shortMessage || error.message}</div>
      )}
    </div>
  )
}
