import { chains } from '@/chains'

interface TokenNameProps {
  chainId?: number
}

export const TokenName: React.FC<TokenNameProps> = ({ chainId }) => (
  <span className='pr-2 text-base text-white'>{chains[chainId as number].name}</span>
)
