import Image from 'next/image'
import Ethereum from '@/assets/icons/ethereum.png'
import { getChainById } from '@/chains'

interface TokenInfoImgProps {
  id: number
  title?: string
}

export const TokenInfoImg: React.FC<TokenInfoImgProps> = ({ title, id }) => (
  <div className='flex py-8 items-center'>
    {title && <p className='text-white pr-2 text-lg ml-1'>{title}</p>}
    <div className='flex px-2 py-1 rounded-full'>
      <span className='pr-2 text-white'>{getChainById(id).name}</span>
      <Image
        width={20}
        height={20}
        className='w-6 h-6 bg-blue-900 rounded-full'
        src={Ethereum.src}
        alt='ethereum'
      />
    </div>
  </div>
)
