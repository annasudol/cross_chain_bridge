import { chains } from '@/contracts'
import React, { FC } from 'react'
import { ButtonSubmit } from '@/components/ButtonSubmit'
import { Address, Hash } from 'viem'
import { useNotifications } from '@/context/Notifications'

interface RedeemBtnProps {
  token: string
  amount: string
  hash: Hash
  chainId: number
  address: Address
}

export const RedeemItem: FC<RedeemBtnProps> = ({ token, amount, chainId, hash }) => {
  const handleClick = () => {
    console.log('click')
  }
  return (
    <ButtonSubmit onClick={handleClick}>
      Redeem {amount} {token}
    </ButtonSubmit>
  )
}
