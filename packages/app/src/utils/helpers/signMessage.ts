/* eslint-disable prettier/prettier */
'use client'
import { ethers } from 'ethers'
import { Address } from 'viem';
const phrase = 'fashion tomorrow brand seek drink quiz beauty tray allow gold symptom boat'

export async function signMessage(from: Address, to: Address, value: BigInt, chainId: BigInt, symbol: string) {
    if (phrase) {

        const messageHash = ethers.utils.solidityKeccak256(
            ['address', 'address', 'uint256', 'uint256', 'uint256', 'string'],
            [from, to, value, BigInt(0), chainId, symbol]
        )

        const w = ethers.Wallet.fromMnemonic(phrase);
        const rawSignature = w.signMessage(messageHash)
        return rawSignature
    } else {
        console.error('Please add MNEMONIC to .env file')
        throw Error()

    }
}
