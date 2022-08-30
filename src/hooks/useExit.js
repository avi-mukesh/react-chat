import useAuth from "./useAuth"

const useExit = () => {
    const { auth, setAuth } = useAuth()

    const exit = async () => {
        await fetch("http://localhost:5000/exit_chat", {
            method: "DELETE",
            credentials: "include",
            headers: {
                authorization: `Bearer ${auth.accessToken}`,
            },
        })

        setAuth({})
    }

    return exit
}

export default useExit
