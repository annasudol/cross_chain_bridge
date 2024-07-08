'use server'
import { Address } from 'viem'
import { cookies } from 'next/headers'

export async function createCookie(tokenName: string, value: string, address: Address) {
    cookies().set(`redeem-${tokenName}`, `${value}-${address}`)
}

// const theme = cookieStore.get('theme')

export async function getCookie(tokenName: string) {
    cookies().get(`redeem-${tokenName}`)
}
