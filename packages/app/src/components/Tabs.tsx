'use client'
import { Tab } from '@headlessui/react'
import { useState } from 'react'
import { Mint } from '@/components/Mint'
// import { useBridgeContract, useTokenContract } from '@/hooks/useContract';
// import { Bridge } from '../Bridge'
// import { Facet } from '../Facet'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const Tabs = () => {
  const categories = ['Mint', 'Unlock']
  return (
    <div className='mt-16 w-full max-w-xl py-16 sm:px-0'>
      <Tab.Group>
        <Tab.List className='flex space-x-1 rounded-xl max-w-xl bg-indigo-950 p-1'>
          {categories.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  selected ? 'bg-indigo-900 shadow text-white' : 'text-white'
                )
              }>
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className='mt-2'>
          {categories.map((_cat, idx) => (
            <Tab.Panel key={idx} className='rounded-xl p-3 h-96 max-w-xl bg-indigo-950 focus:outline-none'>
              {idx === 1 ? <p>redeem</p> : <Mint />}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
