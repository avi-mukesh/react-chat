import { useState, useEffect, useRef } from "react"
import useAuth from "../hooks/useAuth"

import Message from "./Message"
import { socket } from "../socket"

import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"

const Messages = () => {
    const { auth } = useAuth()
    const [messages, setMessages] = useState([])

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

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
            // scrollToBottom()
        })

        return () => {
            socket.off("newmessage")
        }
    }, [])

    useEffect(() => {
        scrollToBottom()
    })

    return (
        <Card className="w-100 overflow-auto">
            <ListGroup variant="flush">
                {messages.length
                    ? messages.map((message) => {
                          return <Message key={message._id} message={message} />
                      })
                    : "No messages to display"}
            </ListGroup>
            <div ref={messagesEndRef} />
        </Card>
    )
}

export default Messages
