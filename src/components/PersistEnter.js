import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"

import useRefreshToken from "../hooks/useRefreshToken"
import useAuth from "../hooks/useAuth"

const PersistEnter = () => {
    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken()
    const { auth } = useAuth()

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh()
            } catch (error) {
                console.error(error)
            } finally {
                // prevents endless loading loop
                setIsLoading(false)
            }
        }
        // when we refresh/come back from another page we will have empty auth state
        // need to make sure we only run this above function when we don't have an accessTokens

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)
    }, [])

    return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>
}

export default PersistEnter
