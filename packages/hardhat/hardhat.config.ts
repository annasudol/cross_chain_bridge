import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox-viem'
import '@nomicfoundation/hardhat-verify'
require('@openzeppelin/hardhat-upgrades')
import * as dotenv from 'dotenv'
const ALCHEMY_PROJECT_ID = process.env.ALCHEMY_PROJECT_ID || ''
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ''
const OPTIMISTIC_API_KEY = process.env.OPTIMISTIC_API_KEY || ''

const MNEMONIC = process.env.MNEMONIC || ''
const SEPOLIA_URL = process.env.ALCHEMY_PROJECT_ID ? `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_PROJECT_ID}` : ''
const OPTIMISTIC_TEST_URL = process.env.ALCHEMY_PROJECT_ID ? `https://opt-mainnet.g.alchemy.com/v2/${POLYSCAN_API_KEY}`: ''

const config: HardhatUserConfig = {
  solidity: '0.8.24',
  defaultNetwork: 'hardhat',
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
      optimisticEthereum: OPTIMISTIC_API_KEY,
    },
  },
  sourcify: {
    enabled: true,
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      chainId: 31337,
      url: 'http://127.0.0.1:8545',
    },
    sepolia: {
      chainId: 11155111,
      url: 'https://rpc.sepolia.org/',
      accounts: { mnemonic: MNEMONIC },
    },
  },
}

export default config
