'use client'
import { ethers } from 'ethers'

function WalletT() {
  const createWallet = () => {
    const MNEMONIC = 'fashion tomorrow brand seek drink quiz beauty tray allow gold symptom boat'

    async function signMessage(from: string, to: string, value: number, chainId: number, symbol: string) {
      const messageHash = ethers.utils.solidityKeccak256(
        ['address', 'address', 'uint256', 'uint256', 'string'],
        [from, to, value, chainId, symbol]
      )
      const messageArray = ethers.utils.arrayify(messageHash)
      const w = ethers.Wallet.fromMnemonic(MNEMONIC)
      const rawSignature = w.signMessage(messageArray)
      return rawSignature
    }
  }


  return <button onClick={() => createWallet()}>Create Wallet</button>
}

export default WalletT
