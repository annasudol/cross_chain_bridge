interface TokenInfoProps {
  chainId?: number
}

export const TokenInfo: React.FC<TokenInfoProps> = ({ chainId }) => (
  <span className='pr-2 text-base text-white'>{chainId === 11155111 ? 'sETH' : 'oETH'}</span>
)
