import { Address } from 'viem'

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
    [id: number]: { name: string; bridgeAddress: Address; tokenAddress: Address; id: number; swapTokens: string[] }
} = {
    11155111: {
        name: 'sETH',
        bridgeAddress: '0x551312645f3112A65394247078E7709fD40CfE05',
        tokenAddress: '0x640590C4F3d31e0614D550BA3bbf1eF414608763',
        id: 11155111,
        swapTokens: ['tBSC'],
    },
    97: {
        name: 'tBSC',
        bridgeAddress: '0x9ECA56d49309c4169Db5d9a0a5a99A51b3C3eeCd',
        tokenAddress: '0x63cA1a726aD47D01AAcb6E7CEd023B96B3b49Cd9',
        id: 97,
        swapTokens: ['sETH'],
    },
}
