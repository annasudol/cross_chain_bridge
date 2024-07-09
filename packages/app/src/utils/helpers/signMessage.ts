/* eslint-disable prettier/prettier */
'use client'
import { ethers } from 'ethers'
import { parseEther } from 'viem'
const phrase = 'fashion tomorrow brand seek drink quiz beauty tray allow gold symptom boat'

export async function signMessage(from: string, to: string, value: string, chainId: number, symbol: string) {
    if (phrase) {

        const messageHash = ethers.utils.solidityKeccak256(
            ['address', 'address', 'uint256', 'uint256', 'string'],
            [from, to, parseEther(value), BigInt(chainId), symbol]
        );

        const w = ethers.Wallet.fromMnemonic(phrase);
        const rawSignature = w.signMessage(messageHash)
        return rawSignature
    } else {
        console.error('Please add MNEMONIC to .env file')
        throw Error()

    }
}
