# Cross chain bridge
app, which executes the ERC20 tokens(eETH, tBSC and mETH) between Goerli, Binance Testnet and Matic Mumbai Testnet, and reversely.

The project was built using solidity and hardhat. Contracts are tested with full coverage and deployed on Goerli Ethereum Testnet Network, Binance Testnet Network, Matic Mumbai Testnet Networks

add .env file
```bash
npm install
npx hardhat test
npx hardhat coverage
```
## Contract deployments on Ethereum Sepolia
```bash
npx hardhat run scripts/deploy_sETH.ts --network sepolia
npx hardhat run scripts/deploy_bridge_sETH.ts --network sepolia
npx hardhat grantRole --bridge [bridgeAddress] --token [sETH address] --network sepolia

npx hardhat grantRole --bridge 0xc1E5C6F46a673201FD3fAC7C74AC4Df6F15e9477 --token 0xA8195B3c0faB74cd7e80de4Ba0388b5c2EA2efda --network sepolia
npx hardhat verify --network sepolia 0xA8195B3c0faB74cd7e80de4Ba0388b5c2EA2efda 'Eth_Sepolia' 'sETH' 100
npx hardhat verify --network sepolia 0xc1E5C6F46a673201FD3fAC7C74AC4Df6F15e9477 0xd06ffA953497355eEce263007D88966Ef888b21F 0xA8195B3c0faB74cd7e80de4Ba0388b5c2EA2efda 11155111
```
## Contract deployments on Binance Testnet
```bash
npx hardhat run scripts/deploy_tBSC.ts --network bscTestnet
npx hardhat run scripts/deploy_bridge_tBSC.ts --network bscTestnet
npx hardhat grantRole --bridge [bridgeAddress] --token [BSC address] --network bscTestnet
npx hardhat grantRole --bridge 0xF5F65b8e87c48C475755F7D3e23Ab8fB7f71F923 --token 0xC13e06C53DC417C39e9a7fEfa60a6eE31afaB814 --network bscTestnet

npx hardhat verify --network bscTestnet 0xC13e06C53DC417C39e9a7fEfa60a6eE31afaB814 'testnet_Binance' 'tBSC' 100
npx hardhat verify --network bscTestnet 0xF5F65b8e87c48C475755F7D3e23Ab8fB7f71F923 0xd06ffA953497355eEce263007D88966Ef888b21F 0xC13e06C53DC417C39e9a7fEfa60a6eE31afaB814 97

```

## Taks for swap from Ethereum to Binance
```tasks
1. npx hardhat swapETH --to [address] --value [value] --network sepolia
2. then copy values from console for redeem with signature

```
## Taks for swap from Binance to Ethereum
```tasks
1. npx hardhat swapBSC --to [address] --value [value] --network bsctestnet
2. then copy values from console for redeem with signature
```

## swaps explained
when Swap token from Ethereum to Binance
1. eETH tokens are burn on Ethereum contract by Bridge ETH
2. Signed message is created
3. Reedem function can be run with created previously message, then: Tokens tBSC are minted on the Binance network

Swap token from Binance to Ethereum
1. tBSC tokens are burn on Binance ERC20 contract by Bridge BSC
2. Signed message is created
3. Reedem function can be run with created previously message, then: eETH Tokens are minted on the Ethereum network

npx hardhat swapETH --to 0xd06ffA953497355eEce263007D88966Ef888b21F --value 100 --network sepolia
/////------------------------TOKENS----------------------------------//////
## Token sETH on Sepolia Tesnet 
### 0xA8195B3c0faB74cd7e80de4Ba0388b5c2EA2efda
[contract at sepolia.etherscan.io] (https://sepolia.etherscan.io/address/0xA8195B3c0faB74cd7e80de4Ba0388b5c2EA2efda#code)

## Token_BSC on Binance Testnet 
### BSC 0xC13e06C53DC417C39e9a7fEfa60a6eE31afaB814
[contract at bscscan] (https://testnet.bscscan.com/address/0xC13e06C53DC417C39e9a7fEfa60a6eE31afaB814#code)


/////------------------------BRIDGES----------------------------------//////
## Bridge Ethereum
### Sepolia 0xc1E5C6F46a673201FD3fAC7C74AC4Df6F15e9477
[contract at sepolia.etherscan.io] (https://sepolia.etherscan.io/address/0xc1E5C6F46a673201FD3fAC7C74AC4Df6F15e9477#code)


## Bridge Bscscan 
### Bscscan 0xF5F65b8e87c48C475755F7D3e23Ab8fB7f71F923
[contract at testnet bscscan] (https://testnet.bscscan.com/address/0xF5F65b8e87c48C475755F7D3e23Ab8fB7f71F923#code)

# Frontend app built with next.js - work in progress
```
yarn
yarn run dev
```