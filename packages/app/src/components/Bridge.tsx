/* eslint-disable @next/next/no-img-element */
'use client'
import { useAccount, useWriteContract} from 'wagmi'
import { FormEvent, useState } from 'react'
import { useNotifications } from '@/context/Notifications'
import { TokenQuantityInput } from '@/components/TokenQuantityInput'
import { TokenName } from '@/components/TokenName'
import { SwitchNetworkBtn } from '@/components/SwitchNetworkBtn'
import { TokenBalance } from '@/components/TokenBalance'
import { brideABI, chains } from '../contracts';
import { parseAbi, toBytes } from 'viem'

export function Bridge() {
  const [amount, setAmount] = useState('0.01')
  const { Add } = useNotifications()
  const { address, chain } = useAccount()
  const [balance, setBalance] = useState<string>();
  const { data: hash, error, isPending, writeContract } = useWriteContract()

  async function handleSendTransaction(event: FormEvent) {
    event.preventDefault()
    if(chain && address) {

        writeContract({
        address: chains[chain?.id].bridgeAddress,
        abi: brideABI,
        functionName: 'swap',
        args: [address, BigInt(1), BigInt(10) ,BigInt(chain.id), chains[chain?.id as number]?.name]
    })} else {
      console.log('h')

    }
    console.log(error, 'error')
  }

  return (
    <div className='p-6'>
      <SwitchNetworkBtn />
      <div className='py-2 pl-1'>{address && chain?.id && <p>Your balance: <TokenBalance setBalance={setBalance} balance={balance} address={address} tokenAddress={chains[chain?.id].tokenAddress} /><span className='text-white mx-2'>{chains[chain?.id as number]?.name} </span></p>}</div>
        <div className='flex flex-col m-2'>
          <label className='form-control w-full'>
            <div className='label'>
              {chain?.id && <TokenName chainId={chain?.id} />}
            </div>
            <TokenQuantityInput
              onChange={setAmount}
              quantity={amount}
              maxValue={balance}
            />
          </label>
          <button
            className='mt-4 w-full items-center justify-items-center rounded-full border border-transparent bg-lime-500 px-4 py-4 text-base font-medium text-blue-900 shadow-sm hover:bg-lime-400 focus:outline-none disabled:opacity-30'
            onClick={handleSendTransaction}
            disabled={!address || amount === ''}>
            {isPending ? <span className='loading loading-dots loading-sm'></span> : `Swap to ${chains[chain?.id as number]?.name === 'sETH' ? 'sBCS' : 'sETH'}`}
          </button>
      </div>
    </div>
  )
}
