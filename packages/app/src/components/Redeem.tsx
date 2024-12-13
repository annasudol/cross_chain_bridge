/* eslint-disable @next/next/no-img-element */
'use client'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useEffect, useMemo, useState } from 'react'
import { useNotifications } from '@/context/Notifications'

import { getChainById } from '@/chains'
import { parseEther } from 'viem'
import { ConnectWallet } from '@/components/ConnectWallet'
import useLocalStorage from '@/app/hooks/useLocalStorage'
import { ButtonSubmit } from '@/components/ui/ButtonSubmit'
import { IStorage } from '@/utils/types'
import { Loading } from './ui/Loading'
import BridgeAbi from '@/abi/BridgeAbi.json'

export function Redeem() {
  const { Add } = useNotifications()
  const { address, chain } = useAccount()
  const { data: hash, error, writeContract } = useWriteContract()
  const { isLoading, error: txError, isSuccess: txSuccess } = useWaitForTransactionReceipt({ hash })
  const { state, setValue } = useLocalStorage(`redeem-${getChainById(chain?.id).name}`)
  const [txRedeemed, setTxRedeemed] = useState<IStorage>()

  async function handleSendTransaction(v: IStorage) {
    if (address && chain?.id) {
      setTxRedeemed({ amount: v.amount, address: v.address, hash: v.hash })
      writeContract({
        address: getChainById(chain?.id).bridgeAddress,
        abi: BridgeAbi,
        functionName: 'redeem',
        args: [address, address, parseEther(v.amount), BigInt(v.hash), getChainById(chain?.id).swapTokens[0]],
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
      Add(`The Redeem transaction is completed`, {
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
    const redeemByAccount = state?.filter((x) => x.address === address)
    const redeemState =
      redeemByAccount && redeemByAccount?.length > 3
        ? redeemByAccount.slice(redeemByAccount.length - 4, redeemByAccount.length - 1)
        : redeemByAccount
    return (
      redeemState &&
      redeemState.map((v: any) => (
        <ButtonSubmit key={v.hash} onClick={() => handleSendTransaction(v)}>
          Redeem {v.amount} {getChainById(chain?.id)?.name}
        </ButtonSubmit>
      ))
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain?.id, state, address])

  if (!state || state.length == 0)
    return (
      <div className='items-center flex flex-col justify-between py-4 px-2 h-96'>
        <p className='text-center text-white'>No transactions to redeem</p>
      </div>
    )
  if (isLoading) {
    return <Loading message='Waiting to complete the redeem transaction' />
  }

  return (
    <ConnectWallet>
      <div className='py-4 px-2 text-center text-white'>
        {redeemBtn && redeemBtn.length > 0 ? redeemBtn : 'No transactions to redeem'}
      </div>
    </ConnectWallet>
  )
}
