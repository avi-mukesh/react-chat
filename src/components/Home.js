import { useEffect, useRef, useState } from "react"
import useAuth from "../hooks/useAuth"
import useExit from "../hooks/useExit"
import useRefreshToken from "../hooks/useRefreshToken"
import Message from "./Message"

const Home = () => {
    const { auth } = useAuth()
    const exit = useExit()
    const refresh = useRefreshToken()

    const messageRef = useRef()
    const [message, setMessage] = useState("hello")

    const [messages, setMessages] = useState([])

    useEffect(() => {
        const getMessages = async function () {
            const response = await fetch("http://localhost:5000/messages", {
                method: "GET",
                headers: {
                    authorization: `Bearer ${auth.accessToken}`,
                },
            })
            const data = await response.json()
            setMessages(data.messages)
        }
        getMessages()
        messageRef.current.focus()
    }, [])

    useEffect(()=>{
        
    })

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
        console.log(data)
    }

    const handleExit = async (e) => {
        e.preventDefault()
        exit()
    }

    return (
        <main>
            <div className="messages">
                {messages.length
                    ? messages.map((message) => {
                          return <Message key={message._id} message={message} />
                      })
                    : "No messages to display"}
            </div>

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
