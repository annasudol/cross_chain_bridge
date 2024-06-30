'use client'
import { useAccount, useBalance, useEstimateGas, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'
import { useState, useEffect } from 'react'
import { useNotifications } from '@/context/Notifications'
import { TokenQuantityInput } from '@/components/TokenQuantityInput'
import { formatBalance } from '@/utils/formatBalance'
import { SwitchNetworkBtn } from './SwitchNetworkBtn'
import { TokenName } from './TokenName'

export function Mint() {
  const [amount, setAmount] = useState('0.01')

  const { Add } = useNotifications()

  const { address, chain } = useAccount()
  const balance = useBalance({
    address,
  })

  const { data, sendTransaction } = useSendTransaction()

  const {
    isLoading,
    error: txError,
    isSuccess: txSuccess,
  } = useWaitForTransactionReceipt({
    hash: data,
  })

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
  //   const handleToAdressInput = (to: string) => {
  //     if (to.startsWith('0x')) setTo(to as `0x${string}`)
  //     else setTo(`0x${to}`)
  //     setIsValidToAddress(isAddress(to))
  //   }
  useEffect(() => {
    if (txSuccess) {
      Add(`Transaction successful`, {
        type: 'success',
        href: chain?.blockExplorers?.default.url ? `${chain.blockExplorers.default.url}/tx/${data}` : undefined,
      })
      balance.refetch()
    } else if (txError) {
      Add(`Transaction failed: ${txError.cause}`, {
        type: 'error',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txSuccess, txError])
  console.log(chain, 'chain1')
  return (
    <div className='flex-column align-center p-8'>
      <SwitchNetworkBtn />
      <div className='flex flex-col-reverse align-end md:grid-cols-1 lg:grid-cols-2 gap-2'>
        <div className='flex-col mb-4 items-center'>
          <TokenQuantityInput
            onChange={setAmount}
            quantity={amount}
            maxValue={formatBalance(balance?.data?.value ?? BigInt(0))}
          />
          {chain?.name && <TokenName name={chain?.name as string} />}
          <button
            className='mt-2 w-full items-center mx-auto justify-items-center rounded-full border border-transparent bg-lime-500 px-4 py-4 text-base font-medium text-blue-900 shadow-sm hover:bg-lime-400 focus:outline-none disabled:hover:bg-lime-500 disabled:opacity-10'
            onClick={handleSendTransaction}
            disabled={amount === ''}>
            {isLoading ? <span className='loading loading-dots loading-sm'></span> : 'Continue to Mint'}
          </button>
        </div>
      </div>
    </div>
  )
}
