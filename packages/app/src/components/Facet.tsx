'use client'
import { useAccount, useWaitForTransactionReceipt } from 'wagmi'
import { useState, useEffect, type FormEvent } from 'react'

import { SwitchNetworkBtn } from '@/components/SwitchNetworkBtn'
import { TokenInfoImg } from '@/components/TokenInfoImg'
import { TokenBalance } from '@/components/TokenBalance'
import { ButtonSubmit } from '@/components/ButtonSubmit'

import { parseAbi } from 'viem'
import { useWriteContract } from 'wagmi'
import { chains } from '@/contracts'
import { Connect } from '@/components/Connect'
import { useNotifications } from '@/context/Notifications'

export function Facet() {
  const { Add } = useNotifications()

  const { chain, address } = useAccount()
  const [balance, setBalance] = useState<string>()
  const { data: hash, error, isPending, writeContract } = useWriteContract()

  async function handleSendTransaction() {
    if (chain) {
      writeContract({
        address: chains[chain?.id].bridgeAddress,
        abi: parseAbi(['function facet()']),
        functionName: 'facet',
      })
    }
  }
  const { isLoading, error: txError, isSuccess: txSuccess } = useWaitForTransactionReceipt({ hash })

  useEffect(() => {
    if (txSuccess) {
      setBalance(() => (Number(balance) + 1).toString())
      Add(`Transaction successful`, {
        type: 'success',
        href: chain?.blockExplorers?.default.url ? `${chain.blockExplorers.default.url}/tx/${hash}` : undefined,
      })
    } else if (txError) {
      Add(`Transaction failed: ${txError.cause}`, {
        type: 'error',
      })
    } else if (error) {
      Add(`Transaction failed: ${error.message}`, {
        type: 'error',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txSuccess, txError, error])

  if (!address) {
    return (
      <div className='items-center flex flex-col justify-between py-4 px-2 h-96'>
        <div className='text-center flex flex-col items-center'>
          <p className='text-white mb-4'>Connect wallet !</p>
          <Connect />
        </div>
      </div>
    )
  }
  return (
    <div className='text-white flex flex-col justify-between py-4 px-2 h-96'>
      {chain?.name && (
        <div className='flex items-center'>
          <TokenInfoImg name={chain?.name as string} title='Receive' id={chain.id} />
          <SwitchNetworkBtn label='on' />
        </div>
      )}
      <div>
        {address && chain?.id && (
          <p>
            Your balance:{' '}
            <TokenBalance
              setBalance={setBalance}
              balance={balance}
              address={address}
              tokenAddress={chains[chain?.id].tokenAddress}
            />
            <span className='text-white mx-2'>{chains[chain?.id as number]?.name} </span>
          </p>
        )}
      </div>
      <div>
        <p className='mb-2 text-sm'>To request {chains[chain?.id as number]?.name} funds, click button.</p>
        <p className='mb-2 text-sm'>You can request 1 {chains[chain?.id as number]?.name} every 24h!</p>
        <p className='mb-2 text-sm'>
          {chains[chain?.id as number]?.name} tokens is a currency that allows you to swap{' '}
          {chains[chain?.id as number]?.name} to {chains[chain?.id as number]?.swapTokens[0]}
        </p>
      </div>
      <ButtonSubmit
        onClick={handleSendTransaction}
        disabled={isLoading || isPending}
        isLoading={isPending || isLoading}>
        Click to receive {chains[chain?.id as number]?.name}
      </ButtonSubmit>
    </div>
  )
}
