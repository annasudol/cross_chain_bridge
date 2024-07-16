/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react'
import { Address, Hash } from 'viem'
export interface IRedeemStorage {
    amount: string
    address: Address
    hash: string
}
const useLocalStorage = (key: string) => {
    const [state, setState] = useState(() => {
        try {
            const value = window.localStorage.getItem(key)
            return value ? JSON.parse(value) : {}
        } catch (error) {
            console.log(error)
        }
    })
    const setValue = (amount: string, address: Address, hash: string) => {
        let valueToStore = [];
        window.localStorage.clear()
        try {
            if (Object.values(state).length > 0) {
                console.log(Object.values(state), "Object.values(state)")
                console.log(Object.values(state).includes(hash), "Object.values(state).includes(hash)")

                valueToStore = Object.values(state).includes(hash) ? state.filter((v: any) => v !== v.hash) : [...state, { amount, address, hash }]
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
