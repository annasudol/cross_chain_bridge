'use client'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useEffect, type FC } from 'react'
import { useNotifications } from '@/context/Notifications'
import { chains } from '../contracts'
import { Address, parseAbi, parseEther, toBytes } from 'viem'
import { ButtonSubmit } from '@/components/ButtonSubmit'
import { signMessage } from '@/utils/helpers/signMessage'
interface RedeemBtnProps {
  token: string
  amount: string
  chainId: number
  address: Address
}

export const RedeemItem: FC<RedeemBtnProps> = ({ token, amount, chainId, address }) => {
  const { Add } = useNotifications()
  const { data: hash, error, isPending, writeContract } = useWriteContract()
  const { isLoading, error: txError, isSuccess: txSuccess } = useWaitForTransactionReceipt({ hash })

  const handleClick = async () => {
    const messageHash = await signMessage(address, address, Number(amount), chainId, token)
    console.log(messageHash)

    if (messageHash) {
      writeContract({
        address: chains[chainId].bridgeAddress,
        abi: parseAbi([
          'function redeem(address from, address to, uint256 amount, uint256 _chainId, string memory symbol, bytes memory signature)',
        ]),
        functionName: 'redeem',
        args: [
          address,
          address,
          parseEther(amount),
          BigInt(chains[chainId].id),
          chains[chainId].name,
          `0x${messageHash}`,
        ],
      })
    } else {
      Add(`Unknown chain ID or an address`, {
        type: 'error',
      })
    }
  }

  // useEffect(() => {
  //   if (txSuccess) {
  //     Add(`Transaction successful`, {
  //       type: 'success',
  //       href: chain?.blockExplorers?.default.url ? `${chain.blockExplorers.default.url}/tx/${hash}` : undefined,
  //     })
  //     const token = chain?.id && chains[chain?.id].swapTokens[0]
  //     setValue(amount, address, hash)
  //   } else if (txError) {
  //     Add(`Transaction failed: ${txError.cause}`, {
  //       type: 'error',
  //     })
  //   } else if (error) {
  //     Add(`Transaction failed: ${error.message}`, {
  //       type: 'error',
  //     })
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [txSuccess, txError, error])

  return (
    <ButtonSubmit onClick={handleClick}>
      Redeem {amount} {token}
    </ButtonSubmit>
  )
}
