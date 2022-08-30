import React from "react"
import useAuth from "../hooks/useAuth"

const Message = ({ message }) => {
    const { auth } = useAuth()

    return (
        <div
            className="messageBox"
            style={{
                justifyContent:
                    auth.username === message.sender
                        ? "flex-end"
                        : "flex-start",
            }}
        >
            <h4>{message.sender}</h4>
            <p>{message.content}</p>
        </div>
    )
}

export default Message
