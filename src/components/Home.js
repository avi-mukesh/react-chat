import { useEffect, useRef, useState } from "react"
import useAuth from "../hooks/useAuth"
import useExit from "../hooks/useExit"
import useRefreshToken from "../hooks/useRefreshToken"
import Messages from "./Messages"
import { socket } from "../socket"

const Home = () => {
    const { auth } = useAuth()
    const exit = useExit()
    const refresh = useRefreshToken()

    const messageRef = useRef()
    const [message, setMessage] = useState("hello")

    useEffect(() => {
        messageRef.current.focus()
    }, [])

    const handleSendMessage = async (e) => {
        e.preventDefault()

        // make it so when we make a send_message request with an expired accessToken, we get a new accessToken with refresh() and try the request again
        const response = await fetch("http://localhost:5000/send_message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${auth.accessToken}`,
            },
            body: JSON.stringify({ message }),
        })
        // token has expired
        if (response.status === 403) {
            await refresh()
        }
        const data = await response.json()
        socket.emit("newmessage", data.message)
        setMessage("")
    }

    const handleExit = async (e) => {
        e.preventDefault()
        exit()
    }

    return (
        <main>
            <Messages />

            <form onSubmit={handleSendMessage}>
                <input
                    ref={messageRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                ></input>
                <button type="submit">Send</button>
            </form>
            <form onSubmit={handleExit}>
                <button type="submit">Exit</button>
            </form>
        </main>
    )
}
export default Home
