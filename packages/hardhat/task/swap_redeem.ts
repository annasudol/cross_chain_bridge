import { task } from 'hardhat/config'
import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-ethers'
import '@typechain/hardhat'
import * as dotenv from 'dotenv'

dotenv.config()
const TOKEN_ETH_ADDRESS: string = process.env.TOKEN_sETH_ADDRESS!
const TOKEN_BSC_ADDRESS: string = process.env.TOKEN_tBSC_ADDRESS!
const BRIDGE_ETH_ADDRESS: string = process.env.BRIDGE_sETH_Address!
const BRIDGE_BSC_ADDRESS: string = process.env.BRIDGE_BSC_Address!
const bETH = 'tBSC'
//npx hardhat redeemBSC --to 0x80dD5aD6B8775c4E31C999cA278Ef4D035717872 --value 1100000000000 --signature 0xbeec20f3f06c3f22a2789119b6c53d50b3c6870ca7b3ada0101589ab39647a6964ba278a5e354fbfed1f56d4f88ef7f3048a917a955df88d974527ac99789b1b1c --network bsctestnet
task('redeemBSC', 'approve swapped tokens from Ethereum to Binance')
  .addParam('to', 'address to swap')
  .addParam('value', 'add value ETh to swap to Binance')
  .addParam('tx', 'tx hash')
  .setAction(async (taskArgs, hre) => {
    try {
      const bridgeBSC = await hre.ethers.getContractAt('Bridge', BRIDGE_BSC_ADDRESS)
      const bEth_token = await hre.ethers.getContractAt('Token', TOKEN_BSC_ADDRESS)

      const { value, to, tx } = taskArgs
      const [acc0] = await hre.ethers.getSigners()

      let balance = await bEth_token.balanceOf(to)
      console.log(`Started Redeemed to ${to}. Balance of receiver ${hre.ethers.utils.formatEther(balance)} bETH`)
      const tx_redeem = await bridgeBSC.redeem(acc0.address, to, value, tx, bETH)
      if (tx_redeem.hash) {
        balance = await bEth_token.balanceOf(to)
        console.log(`Redeem successfully to Ethereum to Binance, tx.id ${tx_redeem.hash}`)
        console.log(`Balance of Receiver after redeem is ${balance} bETH`)
      }
    } catch (err: any) {
      console.log(`redeemBSC error: ${err.message}`)
    }
  })

//eg. npx hardhat swapBSC --to 0xd67674d605e4aF65B809A0d045eCa5781E7c48cF --value 1000000 --network bscTestnet
task('swapBSC', 'swap tokens from Binance to Ethereum')
  .addParam('to', 'address to swap')
  .addParam('value', 'add value ETh to swap to Binance')
  .setAction(async (taskArgs, hre) => {
    try {
      const bridgeBSC = await hre.ethers.getContractAt('Bridge', BRIDGE_BSC_ADDRESS)
      const bEth_token = await hre.ethers.getContractAt('Token', TOKEN_BSC_ADDRESS)

      const { value, to } = taskArgs
      const [acc0] = await hre.ethers.getSigners()
      let balance = await bEth_token.balanceOf(acc0.address)
      console.log(`Started Swapped to ${to}. Balance of giver is ${hre.ethers.utils.formatEther(balance)} ${bETH}`)
      const tx_swap = await bridgeBSC.swap(to, value, bETH)
      tx_swap.wait()
      if (tx_swap?.hash) {
        console.log(`swapped successfully from Ethereum to Binance, tx.id ${tx_swap.hash}`)

        console.log(`Balance of giver is ${hre.ethers.utils.formatEther(balance)} bETH`)
        console.log(`Run: npx hardhat redeemETH --to ${to} --value ${value} --tx ${tx_swap?.hash} --network sepolia`)
      }
    } catch (err: any) {
      console.log(`swap error: ${err.message}`)
    }
  })
