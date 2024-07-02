/* eslint-disable @next/next/no-img-element */
'use client'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { FormEvent, useEffect, useState } from 'react'
import { useNotifications } from '@/context/Notifications'
import { TokenQuantityInput } from '@/components/TokenQuantityInput'
import { TokenName } from '@/components/TokenName'
import { SwitchNetworkBtn } from '@/components/SwitchNetworkBtn'
import { TokenBalance } from '@/components/TokenBalance'
import { chains } from '../contracts'
import { parseAbi, parseEther } from 'viem'
import { Connect } from '@/components/Connect'
import useNotify from '@/app/hooks/useNotify'

export function Bridge() {
  const [amount, setAmount] = useState('0.01')
  const { Add } = useNotifications()
  const { address, chain } = useAccount()
  const [balance, setBalance] = useState<string>()
  const { data: hash, error, isPending, writeContract } = useWriteContract()

  const { isLoading, error: txError, isSuccess: txSuccess } = useWaitForTransactionReceipt({ hash })
  async function handleSendTransaction(event: FormEvent) {
    event.preventDefault()
    if (chain && address) {
      writeContract({
        address: chains[chain?.id].bridgeAddress,
        abi: parseAbi(['function swap(address to, uint256 amount, uint256 chainId, string symbol)']),
        functionName: 'swap',
        args: [address, parseEther(amount), BigInt(chains[chain?.id].id), chains[chain?.id].name],
      })
    } else {
      Add(`Unknown chain ID or an address`, {
        type: 'error',
      })
    }
  }
  useEffect(() => {
    if (txSuccess) {
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
      <div className='flex justify-center items-center w-full h-full'>
        <div className='text-center flex flex-col items-center'>
          <p className='text-white mb-4'>Connect wallet !</p>
          <Connect />
        </div>
      </div>
    )
  }
  return (
    <div className='p-6'>
      <SwitchNetworkBtn />
      <div className='py-2 pl-1'>
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
      <div className='flex flex-col m-2'>
        <label className='form-control w-full'>
          <div className='label'>{chain?.id && <TokenName chainId={chain?.id} />}</div>
          <TokenQuantityInput onChange={setAmount} quantity={amount} maxValue={balance} />
        </label>
        <button
          className='mt-4 w-full items-center justify-items-center rounded-full border border-transparent bg-lime-500 px-4 py-4 text-base font-medium text-blue-900 shadow-sm hover:bg-lime-400 focus:outline-none disabled:opacity-30'
          onClick={handleSendTransaction}
          disabled={!address || amount === ''}>
          {isPending || isLoading ? (
            <span className='loading loading-dots loading-sm'></span>
          ) : (
            `Swap to ${chains[chain?.id as number]?.name === 'sETH' ? 'sBCS' : 'sETH'}`
          )}
        </button>
      </div>
    </div>
  )
}
