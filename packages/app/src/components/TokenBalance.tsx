'use client'
import { useReadContract } from 'wagmi'
import { Dispatch, useEffect } from 'react'
import { erc20Abi, formatEther } from 'viem'
import type { Address } from 'viem'
import tokenAbi from '@/abi/TokenABI.json'

interface TokenBalanceProps {
  readonly address: Address
  readonly tokenAddress?: Address
  balance?: string
  setBalance: Dispatch<string>
}

export const TokenBalance = ({ address, tokenAddress, balance, setBalance }: TokenBalanceProps) => {
  const tokenBalance = useReadContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: 'balanceOf',
    args: [address],
  })

  useEffect(() => {
    if (tokenBalance.data) {
      setBalance(Number(formatEther(tokenBalance?.data)).toFixed(2))
      return
    }
  }, [setBalance, tokenBalance.data])

  return <span className='text-white'>{balance || 0}</span>
}
