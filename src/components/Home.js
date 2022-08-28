import { useState } from "react"

const Home = () => {
    const [message, setMessage] = useState("")
    console.log("home")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:5000/send_message", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message }),
        })
        const data = await response.json()
        console.log(data)
    }

    return (
        <main>
            <div className="messages"></div>
            <form onSubmit={handleSubmit}>
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                ></input>
                <button type="submit">Send</button>
            </form>
        </main>
    )
}
export default Home
