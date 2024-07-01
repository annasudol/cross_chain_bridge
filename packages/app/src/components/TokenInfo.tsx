import { chains } from "@/contracts"

interface TokenInfoProps {
  chainId?: number
}

export const TokenInfo: React.FC<TokenInfoProps> = ({ chainId }) => (
  <span className='pr-2 text-base text-white'>{chains[chainId as number].name}</span>
)
