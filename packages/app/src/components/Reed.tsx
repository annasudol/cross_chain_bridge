/* eslint-disable @next/next/no-img-element */
'use client'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useEffect, useState } from 'react'
import { useNotifications } from '@/context/Notifications'

import { chains } from '../contracts'
import { Address, parseAbi, parseEther, parseUnits } from 'viem'
import { Connect } from '@/components/Connect'
import useLocalStorage from '@/app/hooks/useLocalStorage'
import { ButtonSubmit } from '@/components/ButtonSubmit'
import { signMessage } from '@/utils/helpers/signMessage'

export function Reed() {
  const { Add } = useNotifications()
  const { address, chain } = useAccount()
  const { data: hash, error, isPending, writeContract } = useWriteContract()
  const { isLoading, error: txError, isSuccess: txSuccess } = useWaitForTransactionReceipt({ hash })
  const [_value, setValue] = useLocalStorage(`redeem-${chains[chain?.id || 97].swapTokens[0]}`)
  const [value] = useLocalStorage(`redeem-${chains[chain?.id || 97].name}`)
  async function handleSendTransaction() {
    if (address && chain?.id) {
      const messageHash = await signMessage(
        address,
        address,
        parseEther(value[0].amount),
        BigInt(chain?.id),
        chains[chain?.id].name
      )
      if (messageHash) {
        writeContract({
          address: chains[chain?.id].bridgeAddress,
          abi: parseAbi([
            'function redeem(address from, address to, uint256 amount, uint256 nonce, uint256 _chainId, string memory symbol, bytes calldata signature)',
          ]),
          functionName: 'redeem',
          args: [
            address,
            address,
            parseEther(value[0].amount),
            BigInt(0),
            BigInt(chains[chain?.id].id),
            chains[chain?.id].name,
            messageHash as any,
          ],
        })
      } else {
        Add(`Unknown chain ID or an address`, {
          type: 'error',
        })
      }
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
      //   const token = chain?.id && chains[chain?.id].swapTokens[0]
      //   setValue(amount, address, hash)
    } else if (txError) {
      console.log(txError, 'txError')
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
      {value &&
        value.length &&
        value.map((v: any) => (
          <ButtonSubmit key={v.hash} onClick={handleSendTransaction}>
            Redeem {v.amount} {chains[chain?.id as number]?.name}
          </ButtonSubmit>
        ))}
      {/* <div className='flex flex-col m-2'>
        <ButtonSubmit
          onClick={handleSendTransaction}
          disabled={!address || Number(amount) < 0.01}
          isLoading={isPending || isLoading}>
          Redeem {amount} {chains[chain?.id as number]?.name}
        </ButtonSubmit>
      </div> */}
    </div>
  )
}
