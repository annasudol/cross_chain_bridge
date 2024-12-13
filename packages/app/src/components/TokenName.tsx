import { getChainById } from '@/chains'

interface TokenNameProps {
  chainId?: number
}

export const TokenName: React.FC<TokenNameProps> = ({ chainId }) => (
  <span className='pr-2 text-white'>{getChainById(chainId).name}</span>
)
