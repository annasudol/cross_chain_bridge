/* eslint-disable prettier/prettier */
import { Address } from 'viem'
const NEXT_PUBLIC_TOKEN_tBSC_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_tBSC_ADDRESS
const NEXT_PUBLIC_BRIDGE_tBSC_Address = process.env.NEXT_PUBLIC_BRIDGE_tBSC_Address
const NEXT_PUBLIC_TOKEN_sETH_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_sETH_ADDRESS
const NEXT_PUBLIC_BRIDGE_sETH_Address = process.env.NEXT_PUBLIC_BRIDGE_sETH_Address

export const chains: {
    [id: number]: {
        name: string
        bridgeAddress: Address
        tokenAddress: Address
        id: number
        swapTokens: string[]
        swapTokensId: number[]
        etherscan: string;
    }
} = {
    11155111: {
        name: 'sETH',
        bridgeAddress: NEXT_PUBLIC_BRIDGE_sETH_Address as Address,
        tokenAddress: NEXT_PUBLIC_TOKEN_sETH_ADDRESS as Address,
        id: 11155111,
        swapTokens: ['tBSC'],
        swapTokensId: [97],
        etherscan: 'https://sepolia.etherscan.io/'
    },
    97: {
        name: 'tBSC',
        bridgeAddress: NEXT_PUBLIC_BRIDGE_tBSC_Address as Address,
        tokenAddress: NEXT_PUBLIC_TOKEN_tBSC_ADDRESS as Address,
        id: 97,
        swapTokens: ['sETH'],
        swapTokensId: [11155111],
        etherscan: 'https://testnet.bscscan.com/'
    },
}
