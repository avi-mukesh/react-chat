import { useState, useRef, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

const Enter = () => {
    const { setAuth } = useAuth()
    const usernameRef = useRef() // reference to the username input so we can focus it when the page loads
    const [username, setUsername] = useState("avi")

    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from?.pathname || "/" // the page the user was initially trying to access before being redirected to /enter

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
            console.log(accessToken)

            setAuth({ username, accessToken }) // store username and accessToken in our auth object which is in the global context
            setUsername("")
            // take the user to where they wanted to go, before they were redirected to this enter page
            navigate(from, { replace: true })
            //replace: true makes it so that after the user has entered the chat and if they press back on their browser, they can't log in again just by pressing forward
        } catch (error) {}
    }

    return (
        <div className="row align-items-center">
            <div className="col">
                <Form onSubmit={handleSubmit} className="d-flex">
                    <label htmlFor="username"></label>
                    <Form.Control
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        ref={usernameRef}
                        autoComplete="off"
                        required
                    />
                    <Button variant="primary" type="submit">
                        Enter chat
                    </Button>
                </Form>
            </div>
        </div>
    )
}
export default Enter
