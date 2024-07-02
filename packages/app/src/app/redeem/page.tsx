'use client'
import { useTransactionReceipt } from 'wagmi'
import { useEffect } from 'react';
export default function Home() {
    
  useEffect(()=> {
    const result =async()=> useTransactionReceipt({
    hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
  });
 console.log(result)
    // console.log(result, 'result')
  });
  return (
    <div className='mt-4'>
      <p>redeem</p>
    </div>
  )
}
