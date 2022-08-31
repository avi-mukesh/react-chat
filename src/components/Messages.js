import { useState, useEffect } from "react"
import useAuth from "../hooks/useAuth"

import Message from "./Message"
import { socket } from "../socket"

import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"

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

        socket.on("newmessage", async () => {
            await getMessages()
        })

        return () => {
            socket.off("newmessage")
        }
    }, [])

    return (
        // <div className="messages">
        //     {messages.length
        //         ? messages.map((message) => {
        //               return <Message key={message._id} message={message} />
        //           })
        //         : "No messages to display"}
        // </div>

        <Card className="w-100 overflow-auto">
            <ListGroup variant="flush">
                {messages.length
                    ? messages.map((message) => {
                          return <Message key={message._id} message={message} />
                      })
                    : "No messages to display"}
            </ListGroup>
        </Card>
    )
}

export default Messages
