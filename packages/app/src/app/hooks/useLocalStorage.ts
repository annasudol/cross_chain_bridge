/* eslint-disable prettier/prettier */
import { IStorage } from '@/utils/types'
import {  useState } from 'react'
import { Address } from 'viem'

const useLocalStorage = (key: string) => {
    const [state, setState] = useState<IStorage[] | undefined>(() => {
        try {
            const value = window.localStorage.getItem(key)
            return value ? JSON.parse(value) : undefined
        } catch (error) {
            console.log(error)
        }
    })
    const setValue = (amount: string, address: Address, tx_hash: string) => {
        let valueToStore;
        console.log(amount, address, tx_hash)
        try {
            if (state && Object.values(state).length > 0) {
                valueToStore = state.filter((v: IStorage) => v.hash === tx_hash).length > 0 ? state.filter((v: IStorage) => v.hash !== tx_hash) : [...state, { amount, address, hash: tx_hash }];
                console.log(valueToStore, "valueToStore")
            } else {
                valueToStore = [{ amount, address, hash: tx_hash }];
            }
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
            setState(valueToStore)
        } catch (error) {
            console.log(error)
        }
    }

    return {state, setValue}
}

export default useLocalStorage
