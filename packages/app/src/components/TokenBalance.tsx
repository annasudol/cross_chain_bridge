'use client'
import { useReadContract } from 'wagmi'
import { Dispatch, useEffect } from 'react'
import { erc20Abi, formatEther } from 'viem'
import type { Address } from 'viem'
import tokenAbi from '@/abi/TokenABI.json'
import { useState } from 'react'
interface TokenBalanceProps {
  readonly address: Address
  readonly tokenAddress?: Address
  balance?: string
  setBalance: Dispatch<string>
}

export const TokenBalance = ({ address, tokenAddress }: TokenBalanceProps) => {
  const { data: balance } = useReadContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: 'balanceOf',
    args: [address],
  })
  const [val, setVal] = useState<string>('')

  useEffect(() => {
    if (balance) {
      setVal(parseFloat(formatEther(balance as bigint, 'wei')).toFixed(2))
      // setFormattedBalance(parseFloat(formatEther(data, 'wei')).toFixed(4))
      // setBalance(Number(formatEther(tokenBalance?.data)).toFixed(2))
      return
    }
  }, [balance])

  return <span className='text-white'>{val || 0}</span>
}
