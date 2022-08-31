import useAuth from "../hooks/useAuth"

import ListGroup from "react-bootstrap/ListGroup"
import Badge from "react-bootstrap/Badge"

const Message = ({ message }) => {
    const { auth } = useAuth()

    return (
        // <div
        //     className="messageBox"

        // >
        <ListGroup.Item
            style={{
                textAlign: auth.username === message.sender ? "end" : "start",
            }}
            variant="dark"
            className="p-1"
        >
            <Badge bg="secondary" pill>
                {message.timeCreated}
            </Badge>
            <div className="text-dark">
                <div className="fw-bold">{message.sender}</div>
                {message.content}
            </div>
        </ListGroup.Item>
        // </div>
    )
}

export default Message
