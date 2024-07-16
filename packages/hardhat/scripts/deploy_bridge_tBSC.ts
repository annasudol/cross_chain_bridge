import { ethers } from 'hardhat'
import saveFrontendFiles from '../utils/saveFrontendFiles'

const TOKEN_tBSC_ADDRESS: string = process.env.TOKEN_tBSC_ADDRESS!

async function main() {
  const Bridge = await ethers.getContractFactory('Bridge')
  const bridge = await Bridge.deploy(TOKEN_tBSC_ADDRESS)
  await bridge.deployed()
  console.log('bridge Binance deployed to:', bridge.address, 'and TOKEN_tBSC', TOKEN_tBSC_ADDRESS)
  saveFrontendFiles('BRIDGE_tBSC_Address', bridge.address)
  console.log(`\n run:`)
  console.log(`\n npx hardhat grantRole --bridge ${bridge.address} --token ${TOKEN_tBSC_ADDRESS} --network bscTestnet`)
  console.log(`\n run:`)
  console.log(`\n npx hardhat verify ${bridge.address} --token ${TOKEN_tBSC_ADDRESS} --network bscTestnet`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
