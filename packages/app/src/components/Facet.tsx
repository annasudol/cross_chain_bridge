'use client'
import { useAccount, useBalance, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'
import { useState } from 'react';
import type { FormEvent } from 'react'

import { useNotifications } from '@/context/Notifications'
import { SwitchNetworkBtn } from '@/components/SwitchNetworkBtn'
import { TokenName } from '@/components/TokenName'
import { formatBalance } from '@/utils/formatBalance'
import { useWriteContract } from 'wagmi'
import { BaseError, parseAbi } from 'viem'
import { chains } from '@/contracts';

function A() {
  // const { writeContract } = useWriteContract()
  
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
  const { data: hash, error, isPending, writeContract } = useWriteContract()
  const handleSendTransaction = async() => {
    writeContract({
      address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
      abi: parseAbi(['function mint(uint256 tokenId)']),
      functionName: 'mint',
      args: [BigInt('A')],
    })
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({hash})
  
    // const { request } = await simulateContract(config, {
    //      abi,
    //       address: `0x${address}`,
    //       functionName: 'mint',
    //       args: [
    //         address,
    //         1000
    //       ],
    //    })
// })
// const hash = await writeContract(config, request)

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

  //   const handleToAdressInput = (to: string) => {
  //     if (to.startsWith('0x')) setTo(to as `0x${string}`)
  //     else setTo(`0x${to}`)
  //     setIsValidToAddress(isAddress(to))
  //   }
  
  // useEffect(() => {
  //   if (txSuccess) {
  //     Add(`Transaction successful`, {
  //       type: 'success',
  //       href: chain?.blockExplorers?.default.url ? `${chain.blockExplorers.default.url}/tx/${data}` : undefined,
  //     })
  //     balance.refetch()
  //   } else if (txError) {
  //     Add(`Transaction failed: ${txError.cause}`, {
  //       type: 'error',
  //     })
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [txSuccess, txError])
  
  return (
    <div className='flex flex-col align-center justify-between p-4 h-full'>
      <SwitchNetworkBtn />
          {chain?.name && <TokenName name={chain?.name as string} />}
          <button
            className='mt-2 mb-8 w-full items-center mx-auto justify-items-center rounded-full border border-transparent bg-lime-500 px-4 py-4 text-base font-medium text-blue-900 shadow-sm hover:bg-lime-400 focus:outline-none disabled:hover:bg-lime-500 disabled:opacity-10'
            onClick={handleSendTransaction}
            disabled={isConfirming}>
            {isLoading ? <span className='loading loading-dots loading-sm'></span> : 'Facet'}
          </button>
          {/* <WriteContract /> */}
          </div>
  )
}


export function Facet(){
  const { address, chain } = useAccount()
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
      {chain?.name && <div className='flex items-center'><TokenName name={chain?.name as string} title='Receive' /><SwitchNetworkBtn label='on' /></div>}

      <div>
        <p className='mb-2 text-sm'>To request {chains[chain?.id as number].name} funds, click button.</p>
        <p className='mb-2 text-sm'>You can request 0.1 {chains[chain?.id as number].name} every 24h!</p>
          <p className='mb-2 text-sm'>{chains[chain?.id as number].name} tokens is a currency that allows you to swap {chains[chain?.id as number].name === 'sETH' ? 'ETH' : 'BNC'} to {chains[chain?.id as number].name === 'sETH' ? 'BNC' : 'ETH'}</p>

    </div><form onSubmit={submit}>
        <button
          className='mt-2 mb-8 w-full items-center mx-auto justify-items-center rounded-full border border-transparent bg-lime-500 px-4 py-4 text-base font-medium text-blue-900 shadow-sm hover:bg-lime-400 focus:outline-none disabled:hover:bg-lime-500 disabled:opacity-10'
          onClick={submit}
          disabled={isConfirming || isPending}>
          {isPending ? <span className='loading loading-dots loading-sm'></span> : `Click to receive ${chains[chain?.id as number]}`}
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
