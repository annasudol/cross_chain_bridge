import { Address } from 'viem'
import {
  NEXT_PUBLIC_BRIDGE_sETH_Address,
  NEXT_PUBLIC_TOKEN_sETH_ADDRESS,
  NEXT_PUBLIC_BRIDGE_tBSC_Address,
  NEXT_PUBLIC_TOKEN_tBSC_ADDRESS,
} from './contracts'

export const chains = {
  11155111: {
    name: 'sETH',
    bridgeAddress: NEXT_PUBLIC_BRIDGE_sETH_Address as Address,
    tokenAddress: NEXT_PUBLIC_TOKEN_sETH_ADDRESS as Address,
    id: 11155111,
    swapTokens: ['tBSC'],
    swapTokensId: [97],
    swapTokensChains: ['Bscscan'],
    etherscan: 'https://sepolia.etherscan.io/',
  },
  97: {
    name: 'tBSC',
    bridgeAddress: NEXT_PUBLIC_BRIDGE_tBSC_Address as Address,
    tokenAddress: NEXT_PUBLIC_TOKEN_tBSC_ADDRESS as Address,
    id: 97,
    swapTokens: ['sETH'],
    swapTokensId: [11155111],
    etherscan: 'https://testnet.bscscan.com/',
    swapTokensChains: ['sepolia'],
  },
}
