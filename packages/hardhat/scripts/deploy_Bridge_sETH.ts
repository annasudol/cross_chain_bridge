import { ethers } from 'hardhat'
import saveFrontendFiles from '../utils/saveFrontendFiles'

const TOKEN_sETH_ADDRESS: string = process.env.TOKEN_sETH_ADDRESS!

async function main() {
  const Bridge = await ethers.getContractFactory('Bridge')
  const bridge = await Bridge.deploy(TOKEN_sETH_ADDRESS)
  await bridge.deployed()
  console.log('bridge Ethereum deployed to:', bridge.address, 'and TOKEN_sETH', TOKEN_sETH_ADDRESS)
  saveFrontendFiles('BRIDGE_sETH_Address', bridge.address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
