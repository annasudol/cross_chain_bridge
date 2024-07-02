import { bscTestnet, Chain, sepolia } from 'viem/chains'

let chains = [bscTestnet, sepolia] as [Chain, ...Chain[]]
export const ETH_CHAINS = chains
