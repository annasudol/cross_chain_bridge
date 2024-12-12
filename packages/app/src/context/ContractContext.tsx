import React, { createContext, useContext, useState } from 'react'

const ContractContext = createContext({ tokenBalance: 0 })

import { ReactNode } from 'react'

const ContractProvider = ({ children }: { children: ReactNode }) => {
  const [tokenBalance, setTokenBalance] = useState(0)
  const { data: balance } = useReadContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: 'balanceOf',
    args: [address],
  })

  return <ContractContext.Provider value={{ tokenBalance }}>{children}</ContractContext.Provider>
}

const useContract = () => {
  return useContext(ContractContext)
}

export { ContractProvider, useContract }
