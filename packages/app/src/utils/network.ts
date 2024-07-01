import { bscTestnet, Chain, sepolia } from 'viem/chains'

let chains = [bscTestnet, sepolia] as [Chain, ...Chain[]]
export const ETH_CHAINS = chains

export const NETWORK_COLORS = {
  sepolia: {
    color: 'green',
    bgVariant: 'bg-green-600',
  },
  polygonMumbai: {
    color: 'sky',
    bgVariant: 'bg-sky-600',
  },
  optimism: {
    color: 'red',
    bgVariant: 'bg-red-600',
  },
  other: {
    color: 'gray',
    bgVariant: 'bg-gray-600',
  },
}

export function GetNetworkColor(chain?: string, type: 'color' | 'bgVariant' = 'color') {
  chain = chain?.toLocaleLowerCase()
  if (chain === 'sepolia') return NETWORK_COLORS.sepolia[type]
  if (chain?.includes('polpolygonMumbaiygon')) return NETWORK_COLORS.polygonMumbai[type]
  if (chain?.includes('optimism')) return NETWORK_COLORS.optimism[type]
  return NETWORK_COLORS.other[type]
}
