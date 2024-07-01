import Image from 'next/image'
import Ethereum from '@/assets/icons/ethereum.png'
interface TokenInfoProps {
  name: string
  title?: string
}

export const TokenName: React.FC<TokenInfoProps> = ({ name, title }) => (
  <div className='flex py-8 items-center'>
    {title && <p className='text-white pr-2 text-lg'>{title}</p>}
   <div className='flex bg-indigo-900 px-2 py-1 rounded-full'>
     <span className='pl-1'>{name === 'OptimismSepolia' ? 'oETH' : 'sETH'}</span>
    <Image
      width={20}
      height={20}
      className='w-6 h-6 bg-blue-900 rounded-full mx-2 p-1'
      src={Ethereum.src}
      alt='ethereum'
    />
   </div>
  </div>
)
