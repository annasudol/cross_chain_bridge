import { get } from 'http'
import { Address } from 'viem'
export const TOKEN_tBSC_ADDRESS = '0xf097BC82bbAF699fb99796aabeB0e1649F279715'
export const BRIDGE_BSC_Address = '0x67408729BFD8192673ADc073D4Ca33A56c55811d'
export const TOKEN_sETH_ADDRESS = '0x86B6b5B004F4cBEbA4Abde77a7D2f8E9f73B39f5'
export const BRIDGE_sETH_Address = '0xED3649735e62a82C8121e2650A9C2177ddb6155F'

export interface IChain {
  name: string
  bridgeAddress: Address
  tokenAddress: Address
  id: number
  swapTokens: string[]
  swapTokensId: number[]
  swapTokensChains: string[]
  etherscan: string
}
export const chains: { [id: number]: IChain } = {
  11155111: {
    name: 'sETH',
    bridgeAddress: BRIDGE_sETH_Address,
    tokenAddress: TOKEN_sETH_ADDRESS,
    id: 11155111,
    swapTokens: ['tBSC'],
    swapTokensId: [97],
    swapTokensChains: ['Bscscan'],
    etherscan: 'https://sepolia.etherscan.io/',
  },
  97: {
    name: 'tBSC',
    bridgeAddress: BRIDGE_BSC_Address,
    tokenAddress: TOKEN_tBSC_ADDRESS,
    id: 97,
    swapTokens: ['sETH'],
    swapTokensId: [11155111],
    etherscan: 'https://testnet.bscscan.com/',
    swapTokensChains: ['sepolia'],
  },
}

export const getChainById = (id?: number) => chains[id ||11155111];
