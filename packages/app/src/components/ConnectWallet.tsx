import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi'

export function ConnectWallet({children}: {children?: React.ReactNode}) {
  const { address } = useAccount()
  if (!address) {
  return (
    
    <div className='items-center flex flex-col justify-between py-4 px-2 h-96'>
    <div className='text-center flex flex-col items-center'>
      <p className='text-white mb-4'>Connect wallet !</p>
      <ConnectButton />
    </div>
  </div>

    
  )}
  return (
    <>
      {children}
    </>
  )

}
