import { useEffect, useRef, useState } from "react"

import useAuth from "../hooks/useAuth"
import useExit from "../hooks/useExit"
import useRefreshToken from "../hooks/useRefreshToken"

import Messages from "./Messages"
import { socket } from "../socket"

import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

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
        socket.emit("newmessage")
        setMessage("")
    }

    const handleExit = async (e) => {
        e.preventDefault()
        exit()
    }

    return (
        <main className="flex-grow-1">
            <Messages />

            <Form onSubmit={handleSendMessage} className="w-100 m-2 d-flex">
                <Form.Control
                    ref={messageRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="m-2"
                />
                <Button type="submit" className="m-2">
                    Send
                </Button>
            </Form>
            <Form onSubmit={handleExit}>
                <Button type="submit" variant="danger">
                    Exit
                </Button>
            </Form>
        </main>
    )
}
export default Home
