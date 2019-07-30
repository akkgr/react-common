import React, { createContext, useContext, useState } from 'react'

const LoadingContext = createContext(null)

function LoadingProvider(props) {
  const [loading, setLoading] = useState(false)
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {props.children}
    </LoadingContext.Provider>
  )
}

export const useLoading = () => useContext(LoadingContext)

export default LoadingProvider
