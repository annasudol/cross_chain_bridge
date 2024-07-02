/* eslint-disable prettier/prettier */
/* eslint-disable @next/next/no-img-element */
'use client'
import { useAccount, useWaitForTransactionReceipt } from 'wagmi'
import { useEffect } from 'react'
import { useNotifications } from '@/context/Notifications'

const useNotify = ({ hash }: { hash?: `0x${string}` }) => {
    const { Add } = useNotifications()
    const { error: txError, isSuccess: txSuccess } = useWaitForTransactionReceipt({ hash })
    const { chain } = useAccount()
    useEffect(() => {
        if (txSuccess) {
            Add(`Transaction successful`, {
                type: 'success',
                href: chain?.blockExplorers?.default.url ? `${chain.blockExplorers.default.url}/tx/${hash}` : undefined,
            })
        } else if (txError) {
            Add(`Transaction failed: ${txError.cause}`, {
                type: 'error',
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [txSuccess, txError])
}

export default useNotify
