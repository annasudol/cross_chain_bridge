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
npx hardhat grantRole --bridge [bridgeAddress] --token [sETHaddress] --network sepolia



```
## Contract deployments on Binance Testnet
```bash
npx hardhat run scripts/deploy_tBSC.ts --network bscTestnet
npx hardhat run scripts/deploy_bridge_tBSC.ts --network bscTestnet 
npx hardhat grantRole --bridge [bridgeAddress] --token [BSC address] --network bscTestnet

```

## Taks for swap from Ethereum to Binance
```tasks
1. npx hardhat swapETH --to [address] --value [value] --network sepolia
2. then copy values from console for redeem on Binance network

```
## Taks for swap from Binance to Ethereum
```tasks
1. npx hardhat swapBSC --to [address] --value [value] --network bscTestnet
2. then copy values from console for redeem on Sepolia network
```

## swaps and redeem explained
when Swap token from Ethereum to Binance
1. Swap  - sSETH tokens are burn on Ethereum Sepolia contract by Bridge ETH  - tokens are burn and balance is decreased
2. User need to redeem tokens on the Binance network, tokens are minted and balance of the tokens are increased


/////------------------------TOKENS----------------------------------//////
## Token sETH on Sepolia Tesnet 
### 0xB2590B5e4Aa210f1536FA5707B79dD695E781809
[contract at sepolia.etherscan.io] (https://sepolia.etherscan.io/address/0xB2590B5e4Aa210f1536FA5707B79dD695E781809)

## Token_BSC on Binance Testnet 
### BSC 0x1C8cd559b58958679886F0Ab10c3455110A4aF2C
[contract at Bscscan] (https://testnet.bscscan.com/address/0x1C8cd559b58958679886F0Ab10c3455110A4aF2C)


/////------------------------BRIDGES----------------------------------//////
## Bridge Ethereum
### Sepolia 0x43bAeD0FA2AA5a5eA269B49EAF26821C6c0B22EF
[contract at sepolia.etherscan.io] (https://sepolia.etherscan.io/address/0x43bAeD0FA2AA5a5eA269B49EAF26821C6c0B22EF)


## Bridge Bscscan 
### Bscscan 0x67408729BFD8192673ADc073D4Ca33A56c55811d
[contract at testnet bscscan] (https://testnet.bscscan.com/address/0x67408729BFD8192673ADc073D4Ca33A56c55811d#code)

# Frontend app built with next.js - work in progress
```
yarn
yarn run dev
```