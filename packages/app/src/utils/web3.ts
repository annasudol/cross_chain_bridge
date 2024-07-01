import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { cookieStorage, createStorage } from 'wagmi'
import { SITE_INFO, SITE_NAME, SITE_URL } from './site'
import { ETH_CHAINS } from './network'
import { bscTestnet, sepolia } from 'viem/chains'
import { http, createConfig } from '@wagmi/core'

export const WALLETCONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
if (!WALLETCONNECT_PROJECT_ID) {
  console.warn('You need to provide a NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID env variable')
}

export const WALLET_CONNECT_CONFIG = defaultWagmiConfig({
  projectId: WALLETCONNECT_PROJECT_ID as string,
  chains: ETH_CHAINS,
  ssr: true,
  metadata: {
    name: SITE_NAME,
    description: SITE_INFO,
    url: SITE_URL,
    icons: [],
  },
  auth: {
    email: true,
    socials: undefined,
    showWallets: true,
    walletFeatures: true,
  },
  storage: createStorage({
    storage: cookieStorage,
  }),
})
export const config = createConfig({
  chains: [bscTestnet, sepolia],
  transports: {
    [sepolia.id]: http(),
    [bscTestnet.id]: http(),
  },
})

// export const wagmiConfig = defaultWagmiConfig({
//   chains: [mainnet, sepolia, bscTestnet], // required
//   projectId, // required
//   metadata, // required
//   ssr: true,
//   transports: {
//     [mainnet.id]: http(),
//     [sepolia.id]: http(),
//     [bscTestnet.id]: http('https://data-seed-prebsc-1-s1.binance.org:8545'),
//   },
//   storage: createStorage({
//     storage: cookieStorage,
//   }),
//   enableWalletConnect: true, // Optional - true by default
//   enableInjected: true, // Optional - true by default
//   enableEIP6963: true, // Optional - true by default
//   enableCoinbase: true, // Optional - true by default
// });
