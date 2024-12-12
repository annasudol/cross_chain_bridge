import React from 'react'
import { SITE_EMOJI, SITE_INFO, SOCIAL_GITHUB } from '@/utils/site'
import { FaGithub } from 'react-icons/fa6'
import { NetworkStatus } from '../NetworkStatus'
import { LinkComponent } from './LinkComponent'

export function Footer() {
  return (
    <>
      <footer className='sticky top-[100vh] footer flex justify-between items-center text-slate-100 p-4 bg-indigo-950'>
        <p>
          {SITE_EMOJI} {SITE_INFO}
        </p>
        <div className='flex gap-4'>
          <LinkComponent href={`https://github.com/${SOCIAL_GITHUB}`}>
            <FaGithub />
          </LinkComponent>
        </div>
        <NetworkStatus />
      </footer>
    </>
  )
}
