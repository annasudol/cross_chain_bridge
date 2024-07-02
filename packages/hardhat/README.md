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
### 0x640590C4F3d31e0614D550BA3bbf1eF414608763
[contract at sepolia.etherscan.io] (https://sepolia.etherscan.io/address/0x640590C4F3d31e0614D550BA3bbf1eF414608763#code)

## Token_BSC on Binance Testnet 
### BSC 0x63cA1a726aD47D01AAcb6E7CEd023B96B3b49Cd9
[contract at bscscan] (https://testnet.bscscan.com/address/0x63cA1a726aD47D01AAcb6E7CEd023B96B3b49Cd9)


/////------------------------BRIDGES----------------------------------//////
## Bridge Ethereum
### Sepolia 0x551312645f3112A65394247078E7709fD40CfE05
[contract at sepolia.etherscan.io] (https://sepolia.etherscan.io/address/0x551312645f3112A65394247078E7709fD40CfE05)


## Bridge Bscscan 
### Bscscan 0x9ECA56d49309c4169Db5d9a0a5a99A51b3C3eeCd
[contract at testnet bscscan] (https://testnet.bscscan.com/address/0x9ECA56d49309c4169Db5d9a0a5a99A51b3C3eeCd#code)

# Frontend app built with next.js - work in progress
```
yarn
yarn run dev
```