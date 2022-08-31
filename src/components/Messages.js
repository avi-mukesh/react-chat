import { useState, useEffect } from "react"
import useAuth from "../hooks/useAuth"
import Message from "./Message"
import { socket } from "../socket"

const Messages = () => {
    const { auth } = useAuth()
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

        socket.on("newmessage", async (message) => {
            await getMessages()
            console.log("someone has sent a message", message)
        })

        return () => {
            socket.off("newmessage")
        }
    }, [])

    return (
        <div className="messages">
            {messages.length
                ? messages.map((message) => {
                      return <Message key={message._id} message={message} />
                  })
                : "No messages to display"}
        </div>
    )
}

export default Messages
