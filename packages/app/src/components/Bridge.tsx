/* eslint-disable @next/next/no-img-element */
'use client'
import { useAccount, useBalance, useEstimateGas, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'
import { useState, useEffect } from 'react'
import { parseEther, isAddress } from 'viem'
import { useNotifications } from '@/context/Notifications'
import { TokenQuantityInput } from '@/components/TokenQuantityInput'
import { formatBalance } from '@/utils/formatBalance'
import { TokenInfo } from '@/components/TokenInfo'
import { SwitchNetworkBtn } from '@/components/SwitchNetworkBtn'
import { TokenBalance } from '@/components/TokenBalance'
import { chains } from '../contracts';

type Address = `0x${string}` | undefined

export function Bridge() {
  const [amount, setAmount] = useState('0.01')
  const { Add } = useNotifications()
  const { address, chain } = useAccount()
  // const balance = useBalance({
  //   address,
  // })
  const { data, sendTransaction } = useSendTransaction()
  const {
    isLoading,
    error: txError,
    isSuccess: txSuccess,
  } = useWaitForTransactionReceipt({
    hash: data,
  })
  const [balance, setBalance] = useState<string>();

  const handleSendTransaction = () => {
    // if (estimateError) {
    //   Add(`Transaction failed: ${estimateError.cause}`, {
    //     type: 'error',
    //   })
    //   return
    // }
    // sendTransaction({
    //   gas: estimateData,
    //   value: parseEther(amount),
    //   to: (to as Address)!,
    // })
  }

  const handleToAddressInput = (to: string) => {
    // if (to.startsWith('0x')) setTo(to as `0x${string}`)
    // else setTo(`0x${to}`)
    // setIsValidToAddress(isAddress(to))
  }

  useEffect(() => {
    if (txSuccess) {
      Add(`Transaction successful`, {
        type: 'success',
        href: chain?.blockExplorers?.default.url ? `${chain.blockExplorers.default.url}/tx/${data}` : undefined,
      })
      // balance.refetch()
    } else if (txError) {
      Add(`Transaction failed: ${txError.cause}`, {
        type: 'error',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txSuccess, txError])

  return (
    <div className='p-6'>
      <SwitchNetworkBtn />
      <div className='py-2 pl-1'>{address && chain?.id && <p>Your balance: <TokenBalance setBalance={setBalance} balance={balance} address={address} tokenAddress={chains[chain?.id].tokenAddress} /><span className='text-white mx-2'>{chains[chain?.id as number].name} </span></p>}</div>
        <div className='flex flex-col m-2'>
          <label className='form-control w-full'>
            <div className='label'>
              <TokenInfo chainId={chain?.id} />
            </div>
            <TokenQuantityInput
              onChange={setAmount}
              quantity={amount}
              maxValue={balance}
            />
          </label>
          <button
            className='mt-4 w-full items-center justify-items-center rounded-full border border-transparent bg-lime-500 px-4 py-4 text-base font-medium text-blue-900 shadow-sm hover:bg-lime-400 focus:outline-none disabled:opacity-30'
            onClick={handleSendTransaction}
            disabled={!address || amount === ''}>
            {isLoading ? <span className='loading loading-dots loading-sm'></span> : `Swap to ${chains[chain?.id as number].name === 'sETH' ? 'sBCS' : 'sETH'}`}
          </button>
      </div>
    </div>
  )
}
