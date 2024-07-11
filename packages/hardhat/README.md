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


'sETH' 100
npx hardhat verify --network sepolia 0x86B6b5B004F4cBEbA4Abde77a7D2f8E9f73B39f5 'Eth_Sepolia' 'sETH' 0xd67674d605e4aF65B809A0d045eCa5781E7c48cF 0x86B6b5B004F4cBEbA4Abde77a7D2f8E9f73B39f5 11155111
```
## Contract deployments on Binance Testnet
```bash
npx hardhat run scripts/deploy_tBSC.ts --network bscTestnet //0xf097BC82bbAF699fb99796aabeB0e1649F279715
npx hardhat run scripts/deploy_bridge_tBSC.ts --network bscTestnet //0xA602ECB13aDd8f71787e5B1461CD5683a39e8A82
npx hardhat grantRole --bridge [bridgeAddress] --token [BSC address] --network bscTestnet


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
### 0x86B6b5B004F4cBEbA4Abde77a7D2f8E9f73B39f5
[contract at sepolia.etherscan.io] (https://sepolia.etherscan.io/address/0x86B6b5B004F4cBEbA4Abde77a7D2f8E9f73B39f5#code)

## Token_BSC on Binance Testnet 
### BSC 0xf097BC82bbAF699fb99796aabeB0e1649F279715
[contract at bscscan] (https://testnet.bscscan.com/address/0xf097BC82bbAF699fb99796aabeB0e1649F279715#code)


/////------------------------BRIDGES----------------------------------//////
## Bridge Ethereum
### Sepolia 0xED3649735e62a82C8121e2650A9C2177ddb6155F
[contract at sepolia.etherscan.io] (https://sepolia.etherscan.io/address/0xED3649735e62a82C8121e2650A9C2177ddb6155F#code)


## Bridge Bscscan 
### Bscscan 0x2D5a4AEa4c2B6d34da76f23e062051F1656B428a
[contract at testnet bscscan] (https://testnet.bscscan.com/address/0x2D5a4AEa4c2B6d34da76f23e062051F1656B428a#code)

# Frontend app built with next.js - work in progress
```
yarn
yarn run dev
```