import Image from 'next/image'
import Ethereum from '@/assets/icons/ethereum.png'
interface TokenInfoProps {
  name: string
}

export const TokenName: React.FC<TokenInfoProps> = ({ name }) => (
  <div className='flex py-8'>
    <p className='text-white pr-2'>To</p>
    <span>{name === 'OptimismSepolia' ? 'oETH' : 'sETH'}</span>
    <Image
      width={20}
      height={20}
      className='w-6 h-6 bg-blue-900 rounded-full mx-2 p-1'
      src={Ethereum.src}
      alt='ethereum'
    />
  </div>
)
