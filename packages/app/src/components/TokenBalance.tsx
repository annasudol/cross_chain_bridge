'use client'
import { useReadContract } from 'wagmi'
import { Dispatch, useEffect } from 'react'
import { erc20Abi, formatEther } from 'viem'
import type { Address } from 'viem'

interface TokenBalanceProps {
  readonly address: Address
  readonly tokenAddress?: Address
  balance?: string
  setBalance: Dispatch<string>
}

export const TokenBalance = ({ address, tokenAddress, balance, setBalance }: TokenBalanceProps) => {
  const tokenBalance = useReadContract({
    abi: erc20Abi,
    address: tokenAddress,
    functionName: 'balanceOf',
    args: [address],
  })

  useEffect(() => {
    if (tokenBalance.data) {
      setBalance(Number(formatEther(tokenBalance?.data)).toFixed(2))
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenBalance])

  return <span className='text-white'>{balance || 0}</span>
}
