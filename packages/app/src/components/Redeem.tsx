/* eslint-disable @next/next/no-img-element */
'use client'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useEffect } from 'react'
import { useNotifications } from '@/context/Notifications'

import { chains } from '../contracts'
import { Address, parseAbi, parseEther, parseUnits } from 'viem'
import { Connect } from '@/components/Connect'
import useLocalStorage from '@/app/hooks/useLocalStorage'
import { ButtonSubmit } from '@/components/ButtonSubmit'

export function Redeem() {
  const { Add } = useNotifications()
  const { address, chain } = useAccount()
  const { data: hash, error, isPending, writeContract } = useWriteContract()
  const { isLoading, error: txError, isSuccess: txSuccess } = useWaitForTransactionReceipt({ hash })
  const [value, setValue] = useLocalStorage(`redeem-${chains[chain?.id || 97].swapTokens[0]}`)
  console.log(value, 'value')
  async function handleSendTransaction(v: any) {
    setValue(v)
    // if (address && chain?.id) {
    //     writeContract({
    //       address: chains[chain?.id].bridgeAddress,
    //       abi: parseAbi([
    //         'function redeem(address from, address to, uint256 amount, uint256 tx_hash, string memory symbol)',
    //       ]),
    //       functionName: 'redeem',
    //     args: [address, address, parseEther(value[0].amount), chains[chain?.id].name, messageHash],
    //     })
    // } else {
    //   Add(`Unknown chain ID or an address`, {
    //     type: 'error',
    //   })
    // }
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
      console.log(error.message, 'error')

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
      {/* {value &&
        value.length &&
        value.map((v: any) => (
          <ButtonSubmit key={v.hash} onClick={() => handleSendTransaction(v)}>
            Redeem {v.amount} {chains[chain?.id as number]?.name}
          </ButtonSubmit>
        ))} */}
    </div>
  )
}
