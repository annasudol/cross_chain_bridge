import React from 'react'
import { LinkComponent } from './LinkComponent'
import { SITE_EMOJI } from '@/utils/site'
import { Connect } from './Connect'
import { NotificationsDrawer } from './NotificationsDrawer'

export function Header() {
  return (
    <header className='navbar flex justify-between p-4 pt-0'>
     <div>
      <LinkComponent href='/'>
        <h1 className='text-xl font-bold'>{SITE_EMOJI}</h1>
      </LinkComponent>
      <nav>
        <ul className='flex ml-8'>
         <li className="mr-6">
          <a className="text-blue-950 hover:text-blue-900" href="/">Bridge</a>
        </li>
        <li className="mr-6">
          <a className="text-blue-950 hover:text-blue-900" href="/redeem">Redeem</a>
        </li>
        </ul>
      </nav>
      </div>

      <div className='flex gap-2 bg-indigo-950 rounded-md'>
        <Connect />
        <NotificationsDrawer />
      </div>
    </header>
  )
}
