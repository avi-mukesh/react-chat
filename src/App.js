import { Route, Routes } from "react-router-dom"
import "./App.css"

import Enter from "./components/Enter"
import Home from "./components/Home"
import Layout from "./components/Layout"
import Missing from "./components/Missing"

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* public route */}
                <Route path="enter" element={<Enter />} />
                {/* want to protect this route */}
                {/* this rout correspodns to / */}
                <Route index element={<Home />} />{" "}
                <Route path="*" element={<Missing />} />
            </Route>
        </Routes>
    )
}

export default App
