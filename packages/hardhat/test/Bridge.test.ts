import { expect } from 'chai'
import { ethers } from 'hardhat'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { Bridge__factory, Token__factory, Bridge, Token } from '../typechain-types'

describe('Bridge', function () {
  const chainID_ETH = 11155111
  const chainID_BSC = 97
  const eETH = 'sETH'
  const tBSC = 'tBSC'
  let Bridge: Bridge__factory
  let Token: Token__factory
  let token_tBSC: Token
  let token_eETH: Token

  let bridge_ETH: Bridge
  let bridge_BSC: Bridge

  let validator: SignerWithAddress
  let acc0: SignerWithAddress
  let acc1: SignerWithAddress

  const AUTHORIZED_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('AUTHORIZED_ROLE'))

  beforeEach(async function () {
    const [_acc1, validator] = await ethers.getSigners()
    Token = await ethers.getContractFactory('Token')
    token_tBSC = await Token.deploy('token_tBSC', tBSC, 100)
    token_eETH = await Token.deploy('token_eETH', eETH, 100)
    Bridge = await ethers.getContractFactory('Bridge')

    //deployed bridge used to send token from binance to ethereum
    bridge_BSC = await Bridge.deploy(validator.address, token_tBSC.address, chainID_BSC)
    //deployed bridge used to send token from ethereum to binance
    bridge_ETH = await Bridge.deploy(validator.address, token_eETH.address, chainID_ETH)
  })
  describe('facet', async () => {
    const [acc0] = await ethers.getSigners()

    it('send eth to account successfully', async function () {
      await token_tBSC.grantRole(AUTHORIZED_ROLE, bridge_BSC.address)
      const tx = await bridge_BSC.facet()
      expect(tx)
        .to.emit(token_tBSC, 'Transfer')
        .withArgs(ethers.constants.AddressZero, acc0.address, ethers.utils.formatEther('1'))
      await expect(bridge_BSC.facet()).to.rejectedWith('we can only send facet every 24 hours')
    })

    describe('swap and redeem tokens', async () => {
      const [acc0, _acc1, validator] = await ethers.getSigners()

      it('from Binance to Ethereum', async function () {
        const value = 10000
        const balance_acc0_before_swap = await token_tBSC.balanceOf(acc0.address)
        //swap tokens from binance to ethereum

        //token_BSC.burn(to, amount)
        await expect(bridge_BSC.swap(acc0.address, value, chainID_BSC, tBSC)).to.rejectedWith('not authorized')

        //allow bridge to burn
        await token_tBSC.grantRole(AUTHORIZED_ROLE, bridge_BSC.address)
        await expect(bridge_BSC.swap(acc0.address, value, chainID_ETH, tBSC)).to.rejectedWith('non supported chain')
        await expect(bridge_BSC.swap(acc0.address, value, chainID_ETH, 'ETH')).to.rejectedWith(
          'non supported erc20 token'
        )

        const tx_swap = await bridge_BSC.swap(acc0.address, value, chainID_BSC, tBSC)
        expect(tx_swap)
          .to.emit(bridge_BSC, 'SwapInitialized')
          .withArgs(acc0.address, acc0.address, value, chainID_BSC, tBSC)
        //expect to balance is lower on BSC chain for acc0
        const balance_acc0__after_swap = await token_tBSC.balanceOf(acc0.address)
        expect(balance_acc0_before_swap).to.equal(balance_acc0__after_swap.add(value))

        const messageHash = ethers.utils.solidityKeccak256(
          ['address', 'address', 'uint256', 'uint256', 'string'],
          [acc0.address, acc0.address, value, chainID_ETH, eETH]
        )
        const rightSignature = await signature(messageHash, validator)

        const messageHash2 = ethers.utils.solidityKeccak256(
          ['address', 'address', 'uint256', 'uint256', 'string'],
          [acc0.address, acc0.address, value, chainID_ETH, tBSC]
        )
        const wrongSignature = await signature(messageHash2, validator)

        await expect(
          bridge_ETH.redeem(acc0.address, acc0.address, value, chainID_ETH, eETH, wrongSignature)
        ).to.rejectedWith('invalid signature')

        await expect(
          bridge_ETH.redeem(acc0.address, acc0.address, value, chainID_ETH, tBSC, rightSignature)
        ).to.rejectedWith('non supported erc20 token')

        const balance_acc1_before_redeem = await token_eETH.balanceOf(acc0.address)
        await token_eETH.grantRole(AUTHORIZED_ROLE, bridge_ETH.address)

        const tx_redeem = await bridge_ETH.redeem(acc0.address, acc0.address, value, chainID_ETH, eETH, rightSignature)

        expect(tx_redeem)
          .to.emit(bridge_ETH, 'RedeemInitialized')
          .withArgs(acc0.address, acc0.address, value, chainID_ETH, eETH)

        const balance_acc1_after_redeem = await token_eETH.balanceOf(acc0.address)
        //expect to balance is higher on ETH chain for acc1
        expect(balance_acc1_before_redeem).to.equal(balance_acc1_after_redeem.sub(value))

        await expect(
          bridge_ETH.redeem(acc0.address, acc0.address, value, chainID_ETH, eETH, rightSignature)
        ).to.rejectedWith('re-entrance')
      })
      it('from Ethereum to Binance', async function () {
        await token_eETH.grantRole(AUTHORIZED_ROLE, bridge_ETH.address)
        await token_tBSC.grantRole(AUTHORIZED_ROLE, bridge_BSC.address)
        const value = 1000
        const tx_swap = await bridge_ETH.swap(acc0.address, value, chainID_ETH, eETH)
        expect(tx_swap)
          .to.emit(bridge_ETH, 'SwapInitialized')
          .withArgs(acc0.address, acc0.address, value, chainID_ETH, eETH)
        expect(tx_swap).to.emit(token_eETH, 'Transfer').withArgs(ethers.constants.AddressZero, acc0.address, value)
        const messageHash = ethers.utils.solidityKeccak256(
          ['address', 'address', 'uint256', 'uint256', 'string'],
          [acc0.address, acc0.address, value, chainID_BSC, tBSC]
        )

        const rightSignature = await signature(messageHash, validator)
        const tx_redeem = await bridge_BSC.redeem(acc0.address, acc0.address, value, chainID_BSC, tBSC, rightSignature)
        expect(tx_redeem)
          .to.emit(bridge_BSC, 'RedeemInitialized')
          .withArgs(acc0.address, acc0.address, value, 0, chainID_BSC, tBSC)
        expect(tx_swap).to.emit(token_tBSC, 'Transfer').withArgs(acc0.address, ethers.constants.AddressZero, value)
      })
    })
  })
})

async function signature(messageHash: string, validator: SignerWithAddress) {
  const messageArray = ethers.utils.arrayify(messageHash)
  const rawSignature = await validator.signMessage(messageArray)
  return rawSignature
}
