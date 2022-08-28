import { useState, useRef, useEffect } from "react"
import useAuth from "../hooks/useAuth"

const Enter = () => {
    const { setAuth } = useAuth()
    const usernameRef = useRef() // reference to the username input so we can focus it when the page loads
    const [username, setUsername] = useState("")

    useEffect(() => {
        usernameRef.current.focus()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch("http://localhost:5000/enter_chat", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username }),
            })
            const data = await response.json()
            const accessToken = data.accessToken

            setAuth({ username, accessToken }) // store username and accessToken in our auth object which is in the global context
            setUsername("")
        } catch (error) {}
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username"></label>
            <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                ref={usernameRef}
                autoComplete="off"
                required
            ></input>
            <button type="submit">Enter chat</button>
        </form>
    )
}
export default Enter
