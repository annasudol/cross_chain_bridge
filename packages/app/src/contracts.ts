/* eslint-disable prettier/prettier */
import { Address } from 'viem'
const TOKEN_tBSC_ADDRESS = process.env.TOKEN_tBSC_ADDRESS || '0xf097BC82bbAF699fb99796aabeB0e1649F279715'
const BRIDGE_BSC_Address = process.env.BRIDGE_BSC_Address || '0x2D5a4AEa4c2B6d34da76f23e062051F1656B428a'
const TOKEN_sETH_ADDRESS = process.env.TOKEN_sETH_ADDRESS || '0x86B6b5B004F4cBEbA4Abde77a7D2f8E9f73B39f5'
const BRIDGE_sETH_Address = process.env.BRIDGE_sETH_Address || '0xED3649735e62a82C8121e2650A9C2177ddb6155F'

export const wagmiContractConfig = {
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    abi: [
        { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    name: 'owner',
                    type: 'address',
                },
                {
                    indexed: true,
                    name: 'approved',
                    type: 'address',
                },
                {
                    indexed: true,
                    name: 'tokenId',
                    type: 'uint256',
                },
            ],
            name: 'Approval',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    name: 'owner',
                    type: 'address',
                },
                {
                    indexed: true,
                    name: 'operator',
                    type: 'address',
                },
                {
                    indexed: false,
                    name: 'approved',
                    type: 'bool',
                },
            ],
            name: 'ApprovalForAll',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    name: 'from',
                    type: 'address',
                },
                { indexed: true, name: 'to', type: 'address' },
                {
                    indexed: true,
                    name: 'tokenId',
                    type: 'uint256',
                },
            ],
            name: 'Transfer',
            type: 'event',
        },
        {
            inputs: [
                { name: 'to', type: 'address' },
                { name: 'tokenId', type: 'uint256' },
            ],
            name: 'approve',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [{ name: 'owner', type: 'address' }],
            name: 'balanceOf',
            outputs: [{ name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [{ name: 'tokenId', type: 'uint256' }],
            name: 'getApproved',
            outputs: [{ name: '', type: 'address' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                { name: 'owner', type: 'address' },
                { name: 'operator', type: 'address' },
            ],
            name: 'isApprovedForAll',
            outputs: [{ name: '', type: 'bool' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'mint',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
            name: 'mint',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [],
            name: 'name',
            outputs: [{ name: '', type: 'string' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [{ name: 'tokenId', type: 'uint256' }],
            name: 'ownerOf',
            outputs: [{ name: '', type: 'address' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                { name: 'from', type: 'address' },
                { name: 'to', type: 'address' },
                { name: 'tokenId', type: 'uint256' },
            ],
            name: 'safeTransferFrom',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                { name: 'from', type: 'address' },
                { name: 'to', type: 'address' },
                { name: 'tokenId', type: 'uint256' },
                { name: '_data', type: 'bytes' },
            ],
            name: 'safeTransferFrom',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                { name: 'operator', type: 'address' },
                { name: 'approved', type: 'bool' },
            ],
            name: 'setApprovalForAll',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [{ name: 'interfaceId', type: 'bytes4' }],
            name: 'supportsInterface',
            outputs: [{ name: '', type: 'bool' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'symbol',
            outputs: [{ name: '', type: 'string' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [{ name: 'tokenId', type: 'uint256' }],
            name: 'tokenURI',
            outputs: [{ name: '', type: 'string' }],
            stateMutability: 'pure',
            type: 'function',
        },
        {
            inputs: [],
            name: 'totalSupply',
            outputs: [{ name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                { name: 'from', type: 'address' },
                { name: 'to', type: 'address' },
                { name: 'tokenId', type: 'uint256' },
            ],
            name: 'transferFrom',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ],
} as const

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
        bridgeAddress: BRIDGE_sETH_Address as Address,
        tokenAddress: TOKEN_sETH_ADDRESS as Address,
        id: 11155111,
        swapTokens: ['tBSC'],
        swapTokensId: [97],
        etherscan: 'https://sepolia.etherscan.io/'
    },
    97: {
        name: 'tBSC',
        bridgeAddress: BRIDGE_BSC_Address as Address,
        tokenAddress: TOKEN_tBSC_ADDRESS as Address,
        id: 97,
        swapTokens: ['sETH'],
        swapTokensId: [11155111],
        etherscan: 'https://testnet.bscscan.com/'
    },
}
