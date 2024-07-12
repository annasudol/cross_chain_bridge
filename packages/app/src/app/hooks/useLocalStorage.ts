/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react'
import { Address, Hash } from 'viem'
export interface IRedeemStorage {
    amount: string
    address: Address
    hash: Hash
}
const useLocalStorage = (key: string) => {
    const [state, setState] = useState(() => {
        // Initialize the state
        try {
            const value = window.localStorage.getItem(key)
            return value ? JSON.parse(value) : {}
        } catch (error) {
            console.log(error)
        }
    })
    const setValue = (amount: string, address: Address, hash: Hash) => {
        let valueToStore = {};
        try {
            if (Object.keys(state).length > 0) {
                valueToStore = [...state, { amount, address, hash }];
            } else {
                valueToStore = [{ amount, address, hash }];
            }
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
            setState(valueToStore)
        } catch (error) {
            console.log(error)
        }
    }

    return [state, setValue]
}

export default useLocalStorage
