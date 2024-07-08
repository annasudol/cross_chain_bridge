/* eslint-disable prettier/prettier */
import { useState } from 'react'
import { Address, Hash } from 'viem'

const useLocalStorage = (key: string, initialValue: string) => {
    const [state, setState] = useState(() => {
        // Initialize the state
        try {
            const value = window.localStorage.getItem(key)
            // Check if the local storage already has any values,
            // otherwise initialize it with the passed initialValue
            return value ? JSON.parse(value) : initialValue
        } catch (error) {
            console.log(error)
        }
    })

    const setValue = (amount: string, address: Address, hash: Hash) => {
        try {
            // If the passed value is a callback function,
            const valueToStore = [...state, { amount, address, hash }];
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
            setState(valueToStore)
        } catch (error) {
            console.log(error)
        }
    }

    return [state, setValue]
}

export default useLocalStorage
