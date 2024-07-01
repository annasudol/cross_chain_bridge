import Image from 'next/image'
import Ethereum from '@/assets/icons/ethereum.png'
import { TokenName } from '@/components/TokenName'
interface TokenInfoImgProps {
  name: string
  title?: string
  id: number
}

export const TokenInfoImg: React.FC<TokenInfoImgProps> = ({ name, title, id }) => (
  <div className='flex py-8 items-center'>
    {title && <p className='text-white pr-2 text-lg'>{title}</p>}
   <div className='flex bg-indigo-900 px-2 py-1 rounded-full'>
    <TokenName chainId={id} />
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
