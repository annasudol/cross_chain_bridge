'use client'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useEffect, type FC } from 'react'
import { useNotifications } from '@/context/Notifications'
import { chains } from '../contracts'
import { Address, parseAbi, parseEther } from 'viem'
import { ButtonSubmit } from '@/components/ButtonSubmit'

interface RedeemBtnProps {
  token: string
  amount: string
  chainId: number
  address: Address;
}

export const RedeemItem: FC<RedeemBtnProps> = ({ token, amount, chainId }) => {

  const { Add } = useNotifications()
  const { address, chain } = useAccount()
  const { data: hash, error, isPending, writeContract } = useWriteContract()
  const { isLoading, error: txError, isSuccess: txSuccess } = useWaitForTransactionReceipt({ hash })

  async function handleClick() {
    if (chain && address) {
    //   writeContract({
    //     address: chains[chain?.id].bridgeAddress,
    //     abi: parseAbi([
    //       'function redeem(address from, address to, uint256 amount, uint256 _chainId, string symbol, bytes signature)',
    //     ]),
    //     functionName: 'redeem',
    //     args: [address, address, parseEther(amount), BigInt(chains[chain?.id].id), chains[chain?.id].name],
    //   })
    // } else {
    //   Add(`Unknown chain ID or an address`, {
    //     type: 'error',
    //   })
    // }
  }
}

  useEffect(() => {
    if (txSuccess) {
      Add(`Transaction successful`, {
        type: 'success',
        href: chain?.blockExplorers?.default.url ? `${chain.blockExplorers.default.url}/tx/${hash}` : undefined,
      })
      const token = chain?.id && chains[chain?.id].swapTokens[0]
      setValue(amount, address, hash)
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


  return (
    <ButtonSubmit onClick={handleClick}>
      Redeem {amount} {token}
    </ButtonSubmit>
  )
}
