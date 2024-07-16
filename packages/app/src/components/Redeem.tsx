/* eslint-disable @next/next/no-img-element */
'use client'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useEffect, useMemo, useState } from 'react'
import { useNotifications } from '@/context/Notifications'

import { chains } from '../contracts'
import { parseAbi, parseEther } from 'viem'
import { Connect } from '@/components/Connect'
import useLocalStorage from '@/app/hooks/useLocalStorage'
import { ButtonSubmit } from '@/components/ButtonSubmit'
import { IStorage } from '@/utils/types'
import { Loading } from './Loading'

export function Redeem() {
  const { Add } = useNotifications()
  const { address, chain } = useAccount()
  const { data: hash, error, writeContract } = useWriteContract()
  const { isPending, isLoading, error: txError, isSuccess: txSuccess } = useWaitForTransactionReceipt({ hash })
  const { state, setValue } = useLocalStorage(`redeem-${chains[chain?.id || 97].name}`)
  const [txRedeemed, setTxRedeemed] = useState<IStorage>();

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

  const redeemBtn = useMemo(() => {
    const redeemState = state && state?.length > 3 ? state.slice(state.length - 4, state.length - 1) : state
    return (
      redeemState &&
      redeemState.map((v: any) => (
        <ButtonSubmit key={v.hash} onClick={() => handleSendTransaction(v)}>
          Redeem {v.amount} {chains[chain?.id as number]?.name}
        </ButtonSubmit>
      ))
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain?.id, state])
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
  if (!state || state.length == 0)
    return (
      <div className='items-center flex flex-col justify-between py-4 px-2 h-96'>
        <p className='text-center text-white'>No transactions to redeem</p>
      </div>
    )
  if (isLoading) {
    return <Loading message='Waiting to complete Redeem transaction' />
  }

  return <div className='py-4 px-2'>{redeemBtn}</div>
}
