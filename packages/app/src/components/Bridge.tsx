/* eslint-disable @next/next/no-img-element */
'use client'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useEffect, useState } from 'react'
import { useNotifications } from '@/context/Notifications'
import { TokenQuantityInput } from '@/components/TokenQuantityInput'
import { TokenName } from '@/components/TokenName'
import { SwitchNetworkBtn } from '@/components/SwitchNetworkBtn'
import { chains } from '@/chains'
import { parseAbi, parseEther } from 'viem'
import { ConnectWallet } from '@/components/ConnectWallet'
import useLocalStorage from '@/app/hooks/useLocalStorage'
import { ButtonSubmit } from '@/components/ButtonSubmit'
import { useChainModal } from '@rainbow-me/rainbowkit'
import { useBalance } from '@/app/hooks/useBalance'
import { truncateString } from '@/utils/helpers/formatTools'
export function Bridge() {
  const [amount, setAmount] = useState('0.01')
  const [swapTxIsSuccess, setSwapTxIsSuccess] = useState(false)

  const { openChainModal } = useChainModal()

  const { Add } = useNotifications()
  const { address, chain } = useAccount()
  const { formattedBalance } = useBalance({ address, tokenAddress: chains[chain?.id as number].tokenAddress })

  const { data: hash, error, isPending, writeContract } = useWriteContract()
  const {
    isLoading,
    isPending: isPendingSwap,
    error: txError,
    isSuccess: txSuccess,
  } = useWaitForTransactionReceipt({ hash })
  const { setValue } = useLocalStorage(`redeem-${chains[chain?.id as number].swapTokens[0]}`)
  const handleClick = () => {
    openChainModal && openChainModal()
    setSwapTxIsSuccess(false)
  }
  async function handleSendTransaction() {
    if (chain && chain?.id && address) {
      writeContract({
        address: chains[chain?.id].bridgeAddress,
        abi: parseAbi(['function swap(address to, uint256 amount, string memory symbol)']),
        functionName: 'swap',
        args: [address, parseEther(amount), chains[chain?.id].name],
      })
    } else {
      Add(`Unknown chain ID or an address`, {
        type: 'error',
      })
    }
  }

  useEffect(() => {
    if (txSuccess && hash && address) {
      setValue(amount, address, hash)
      Add(`Transaction successful`, {
        type: 'success',
        href: chain?.blockExplorers?.default.url ? `${chain.blockExplorers.default.url}/tx/${hash}` : undefined,
      })
      if (!isLoading && !isPending && !isPendingSwap) setSwapTxIsSuccess(true)
    } else if (txError) {
      const message = (txError?.cause as any).message.split('')[0]
      Add(`Transaction failed: ${message || 'unknown reqason'}`, {
        type: 'error',
      })
    } else if (error) {
      const message = (error as any).message.split('  ')[0]
      Add(`Transaction failed: ${message || 'unknown reqason'}`, {
        type: 'error',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txSuccess, txError, error, isLoading, isPending, isPendingSwap])

  return (
    <ConnectWallet>
      <div className='flex flex-col justify-between py-4 px-2 h-96'>
        <SwitchNetworkBtn />
        <div className='py-2 pl-1 text-white'>
          {address && chain?.id && (
            <>
              Your balance: {formattedBalance}
              <span className='text-white mx-2'>{chains[chain?.id as number]?.name}</span>
            </>
          )}
        </div>
        {swapTxIsSuccess ? (
          <ButtonSubmit onClick={handleClick}>
            click to change network to {chains[chain?.id || 97].swapTokensChains[0]}
          </ButtonSubmit>
        ) : (
          <div className='m-2'>
            <div className='form-control w-full'>
              <div>{chain?.id && <TokenName chainId={chain?.id} />}</div>
              <TokenQuantityInput
                onChange={setAmount}
                quantity={amount}
                maxValue={formattedBalance}
                disabled={isPending || isLoading}
              />
            </div>
            <ButtonSubmit
              onClick={handleSendTransaction}
              disabled={!address || Number(amount) < 0.01}
              isLoading={isPending || isLoading}>
              {formattedBalance && Number(formattedBalance) < 0.01
                ? 'Insufficient balance'
                : `Swap ${amount} ${chains[chain?.id as number]?.name} to
              ${chains[chain?.id as number]?.name === 'sETH' ? 'sBCS' : 'sETH'}`}
            </ButtonSubmit>
          </div>
        )}
      </div>
    </ConnectWallet>
  )
}
