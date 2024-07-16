import { expect } from 'chai'
import { ethers } from 'hardhat'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { Bridge__factory, Token__factory, Bridge, Token } from '../typechain-types'

describe('Bridge', function () {
  const chainID_ETH = 5
  const chainID_BSC = 97
  const sETH = 'sETH'
  const bETH = 'bETH'
  let Bridge: Bridge__factory
  let Token: Token__factory
  let token_bETH: Token
  let token_sETH: Token

  let bridge_ETH: Bridge
  let bridge_BSC: Bridge

  let acc0: SignerWithAddress
  let acc1: SignerWithAddress

  const AUTHORIZED_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('AUTHORIZED_ROLE'))

  beforeEach(async function () {
    ;[acc0, acc1] = await ethers.getSigners()
    Token = await ethers.getContractFactory('Token')
    token_bETH = await Token.deploy('token_bETH', bETH, 100)
    token_sETH = await Token.deploy('token_sETH', sETH, 100)
    Bridge = await ethers.getContractFactory('Bridge')

    //deployed bridge used to send token from binance to ethereum
    bridge_BSC = await Bridge.deploy(token_bETH.address)
    //deployed bridge used to send token from ethereum to binance
    bridge_ETH = await Bridge.deploy(token_sETH.address)
  })
  describe('facet', () => {
    it('send eth to account successfully', async function () {
      await token_bETH.grantRole(AUTHORIZED_ROLE, bridge_BSC.address)
      const tx = await bridge_BSC.facet()
      expect(tx)
        .to.emit(token_bETH, 'Transfer')
        .withArgs(ethers.constants.AddressZero, acc0.address, ethers.utils.formatEther('1'))
      await expect(bridge_BSC.facet()).to.rejectedWith('we can only send facet every 24 hours')
    })
  })
  describe('swap and redeem tokens', () => {
    it('from Binance to Ethereum', async function () {
      const value = 10000
      const balance_acc0_before_swap = await token_bETH.balanceOf(acc0.address)
      await expect(bridge_BSC.swap(acc1.address, value, bETH)).to.rejectedWith('not authorized')

      //allow bridge to burn
      await token_bETH.grantRole(AUTHORIZED_ROLE, bridge_BSC.address)
      await token_sETH.grantRole(AUTHORIZED_ROLE, bridge_ETH.address)

      await expect(bridge_BSC.swap(acc1.address, value, 'ETH')).to.rejectedWith('non supported erc20 token')

      const tx_swap = await bridge_BSC.swap(acc1.address, value, bETH)
      expect(tx_swap).to.emit(bridge_BSC, 'SwapInitialized').withArgs(acc0.address, acc1.address, value, bETH)

      const balance_acc0__after_swap = await token_bETH.balanceOf(acc0.address)
      expect(balance_acc0_before_swap).to.equal(balance_acc0__after_swap.add(value))

      const balance_acc1_before_redeem = await token_sETH.balanceOf(acc1.address)

      const tx_redeem = await bridge_ETH.redeem(acc0.address, acc1.address, value, tx_swap.hash, sETH)

      expect(tx_redeem)
        .to.emit(bridge_BSC, 'RedeemInitialized')
        .withArgs(acc0.address, acc1.address, value, 0, chainID_ETH, sETH)

      const balance_acc1_after_redeem = await token_sETH.balanceOf(acc1.address)
      // expect to balance is higher on ETH chain for acc1
      expect(balance_acc1_before_redeem).to.equal(balance_acc1_after_redeem.sub(value))

      await expect(bridge_ETH.redeem(acc0.address, acc1.address, value, tx_swap.hash, sETH)).to.rejectedWith(
        're-entrance'
      )
    })
  })
})
