'use client'
import { useAccount, useWaitForTransactionReceipt } from 'wagmi'
import { useEffect } from 'react'

import { SwitchNetworkBtn } from '@/components/SwitchNetworkBtn'
import { TokenInfoImg } from '@/components/TokenInfoImg'
import { ButtonSubmit } from '@/components/ui/ButtonSubmit'
import bridgeAbi from '@/abi/BridgeAbi.json'
import { useWriteContract } from 'wagmi'
import { chains } from '@/chains'
import { ConnectWallet } from '@/components/ConnectWallet'
import { useNotifications } from '@/context/Notifications'
import { useBalance } from '@/app/hooks/useBalance'

export function Facet() {
  const { Add } = useNotifications()
  const { chain, address } = useAccount()
  const { data: hash, error, isPending, writeContract } = useWriteContract()
  const { formattedBalance } = useBalance({ address, tokenAddress: chains[chain?.id as number].tokenAddress })
  async function handleSendTransaction() {
    if (chain) {
      writeContract({
        address: chains[chain?.id].bridgeAddress,
        abi: bridgeAbi,
        functionName: 'facet',
      })
    }
  }
  const { isLoading, error: txError, isSuccess: txSuccess } = useWaitForTransactionReceipt({ hash })

  useEffect(() => {
    if (txSuccess) {
      Add(`Transaction successful`, {
        type: 'success',
        href: chain?.blockExplorers?.default.url ? `${chain.blockExplorers.default.url}/tx/${hash}` : undefined,
      })
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
    <ConnectWallet>
      <div className='text-white flex flex-col justify-between py-4 px-2 h-96'>
        {chain?.name && (
          <div className='flex items-center'>
            <TokenInfoImg name={chain?.name as string} title='Receive' id={chain.id} />
            <SwitchNetworkBtn label='on' />
          </div>
        )}
        <div>
          {address && chain?.id && (
            <p>
              Your balance: {formattedBalance}
              <span className='text-white mx-2'>{chains[chain?.id as number]?.name} </span>
            </p>
          )}
        </div>
        <div>
          <p className='mb-2 text-sm'>To request {chains[chain?.id as number]?.name} funds, click button.</p>
          <p className='mb-2 text-sm'>You can request 1 {chains[chain?.id as number]?.name} every 24h!</p>
          <p className='mb-2 text-sm'>
            {chains[chain?.id as number]?.name} tokens is a currency that allows you to swap{' '}
            {chains[chain?.id as number]?.name} to {chains[chain?.id as number]?.swapTokens[0]}
          </p>
        </div>
        <ButtonSubmit
          onClick={handleSendTransaction}
          disabled={isLoading || isPending}
          isLoading={isPending || isLoading}>
          Click to receive {chains[chain?.id as number]?.name}
        </ButtonSubmit>
      </div>
    </ConnectWallet>
  )
}
