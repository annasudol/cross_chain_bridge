# Cross chain bridge
app, which executes the ERC20 tokens(eETH, bETH and mETH) between Goerli, Binance Testnet and Matic Mumbai Testnet, and reversely.

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
npx hardhat run scripts/deploy_BSC.ts --network bscTestnet
npx hardhat run scripts/deploy_bridge_BSC.ts --network bscTestnet
npx hardhat grantRole --bridge [bridgeAddress] --token [BSC address] --network bscTestnet

```

## Taks for swap from Ethereum to Binance
```tasks
1. npx hardhat swapETH --to [address] --value [value] --network sepolia
2. then copy values from console for redeem with signature

//eg. npx hardhat swapETH --to 0xd06ffA953497355eEce263007D88966Ef888b21F --value 100000 --network sepolia
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
3. Reedem function can be run with created previously message, then: Tokens bETH are minted on the Binance network

Swap token from Binance to Ethereum
1. bETH tokens are burn on Binance ERC20 contract by Bridge BSC
2. Signed message is created
3. Reedem function can be run with created previously message, then: eETH Tokens are minted on the Ethereum network

npx hardhat swapETH --to 0xd06ffA953497355eEce263007D88966Ef888b21F --value 100 --network sepolia
/////------------------------TOKENS----------------------------------//////
## Token sETH on Sepolia Tesnet 
### 0xD3A6c5d1c15B74a20D08a37C9F4dBcbF02f6906a
[contract at sepolia.etherscan.io] (https://sepolia.etherscan.io/address/0xD3A6c5d1c15B74a20D08a37C9F4dBcbF02f6906a#code)

## Token_BSC on Binance Testnet 
### BSC 0xf121DaF9eDdF06F3f7DD56952F6BFd000BFffA61
[contract at bscscan] (https://testnet.bscscan.com/address/0xf121DaF9eDdF06F3f7DD56952F6BFd000BFffA61#code)


/////------------------------BRIDGES----------------------------------//////
## Bridge Ethereum
### Sepolia 0x134Ec954683104acc9467E0b275ED995FF9C8007
[contract at sepolia.etherscan.io] (https://sepolia.etherscan.io/address/0x134Ec954683104acc9467E0b275ED995FF9C8007)


## Bridge Bscscan 
### Bscscan 0xA097413a69B55fe1aB8D6F0a4612CdAaA21dc725
[contract at testnet bscscan] (https://testnet.bscscan.com/address/0xA097413a69B55fe1aB8D6F0a4612CdAaA21dc725#code)

# Frontend app built with next.js - work in progress
```
yarn
yarn run dev
```