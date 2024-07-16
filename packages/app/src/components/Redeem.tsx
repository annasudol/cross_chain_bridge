/* eslint-disable @next/next/no-img-element */
'use client'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useEffect, useMemo, useState } from 'react'
import { useNotifications } from '@/context/Notifications'

import { chains } from '../contracts'
import { Address, parseAbi, parseEther, parseUnits } from 'viem'
import { Connect } from '@/components/Connect'
import useLocalStorage from '@/app/hooks/useLocalStorage'
import { ButtonSubmit } from '@/components/ButtonSubmit'
import { IStorage } from '@/utils/types'
import { useMutation } from '@tanstack/react-query'

export function Redeem() {
  const { Add } = useNotifications()
  const { address, chain } = useAccount()
  const { data: hash, error, writeContract } = useWriteContract()
  const { error: txError, isSuccess: txSuccess } = useWaitForTransactionReceipt({ hash })
  const { state, setValue } = useLocalStorage(`redeem-${chains[chain?.id || 97].name}`)
  const [txRedeemed, setTxRedeemed] = useState<IStorage>()
  async function handleSendTransaction(v: IStorage) {
    if (address && chain?.id) {
      setTxRedeemed({ amount: v.amount, address: v.address, hash: v.hash })
      writeContract({
        address: chains[chain?.id].bridgeAddress,
        abi: parseAbi([
          'function redeem(address from, address to, uint256 amount, uint256 tx_hash, string memory symbol)',
        ]),
        functionName: 'redeem',
        args: [address, address, parseEther(v.amount), BigInt(v.hash), chains[chain?.id].name],
      })
    } else {
      Add(`Unknown chain ID or an address`, {
        type: 'error',
      })
    }
  }

  useEffect(() => {
    if (txSuccess && txRedeemed) {
      console.log(txRedeemed, 'txRedeemed')
      setValue(txRedeemed.amount, txRedeemed.address, txRedeemed.hash)
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
  console.log(state, 'state')
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
  const redeemBtn = useMemo(() => {
    if (state && state.length > 0) {
      return state.map((v: any) => (
        <ButtonSubmit key={v.hash} onClick={() => handleSendTransaction(v)}>
          Redeem {v.amount} {chains[chain?.id as number]?.name}
        </ButtonSubmit>
      ))
    } else {
      return <p className='text-center'>No transactions to redeem</p>
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain?.id, state])
  return <div className='p-6'>{redeemBtn}</div>
}
