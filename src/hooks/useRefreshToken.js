import useAuth from "./useAuth"

const useRefreshToken = () => {
    const { setAuth } = useAuth()

    // we will use this function when our accessToken has expired
    // then it will refresh, get a new token and try the request again
    const refresh = async () => {
        const response = await fetch("http://localhost:5000/refresh_token", {
            method: "POST",
            credentials: "include",
        })

        const data = await response.json()
        setAuth((prev) => {
            console.log(prev)
            return {
                ...prev,
                username: data.username,
                accessToken: data.accessToken,
            }
        })

        return data.accessToken
    }

    return refresh
}

export default useRefreshToken
