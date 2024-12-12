'use client'

import { useReadContract } from 'wagmi'
import { useEffect, useState } from 'react'
import { formatEther } from 'viem'
import type { Address } from 'viem'
import tokenAbi from '@/abi/TokenABI.json'

interface UseBalanceProps {
  readonly address?: Address
  readonly tokenAddress?: Address
}

export const useBalance = ({ address, tokenAddress }: UseBalanceProps) => {
  const { data: balance } = useReadContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: 'balanceOf',
    args: [address],
  })

  const [formattedBalance, setFormattedBalance] = useState<string>('0')

  useEffect(() => {
    if (balance) {
      const formatted = parseFloat(formatEther(balance as bigint, 'wei')).toFixed(2)
      setFormattedBalance(formatted)
    }
  }, [balance])

  return { balance, formattedBalance }
}
