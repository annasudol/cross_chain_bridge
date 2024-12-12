import React from 'react'
import { LinkComponent } from './LinkComponent'
import { SITE_EMOJI } from '@/utils/site'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { NotificationsDrawer } from './NotificationsDrawer'

export function Header() {
  return (
    <header className='navbar flex justify-between p-4 pt-0'>
      <div>
        <LinkComponent href='/'>
          <h1 className='text-xl font-bold'>{SITE_EMOJI}</h1>
        </LinkComponent>
      </div>

      <div className='flex gap-2 bg-indigo-950 rounded-md whitespace-nowrap p-2'>
        <ConnectButton />
        <NotificationsDrawer />
      </div>
    </header>
  )
}
