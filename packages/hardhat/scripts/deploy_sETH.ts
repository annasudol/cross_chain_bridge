import { ethers } from 'hardhat'
import saveFrontendFiles from '../utils/saveFrontendFiles'

async function main() {
  const [deployer] = await ethers.getSigners()
  const symbol = 'sETH'
  console.log('Deploying contracts with the account:', deployer.address)
  const Token = await ethers.getContractFactory('Token')
  const token = await Token.deploy('Eth_Sepolia', symbol, 100)
  await token.deployed()
  console.log(`Token ${symbol} deployed on ${token.address}`)
  saveFrontendFiles('TOKEN_sETH_ADDRESS', token.address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
