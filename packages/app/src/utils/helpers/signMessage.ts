/* eslint-disable prettier/prettier */
'use client'
import { ethers } from 'ethers'
import { parseUnits } from 'viem'
const phrase = process.env.MNEMONIC;
export async function signMessage(from: string, to: string, value: number, chainId: number, symbol: string) {
    if (phrase) {
        const messageHash = ethers.utils.solidityKeccak256(
            ['address', 'address', 'uint256', 'uint256', 'string'],
            [from, to, parseUnits(value.toString(), 9), parseUnits(chainId.toString(), 9), symbol]
        )

        const w = ethers.Wallet.fromMnemonic(phrase);
        const rawSignature = w.signMessage(messageHash)
        return rawSignature
    } else {
        console.error('Please add MNEMONIC to .env file')
        throw Error()

    }
}
