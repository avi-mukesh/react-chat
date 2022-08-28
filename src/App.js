import { Route, Routes } from "react-router-dom"
import "./App.css"

import Enter from "./components/Enter"
import Home from "./components/Home"
import Layout from "./components/Layout"
import Missing from "./components/Missing"
import RequireAuth from "./components/RequireAuth"

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* public route */}
                <Route path="enter" element={<Enter />} />

                {/* routes nested in here are protected by RequireAuth */}
                <Route element={<RequireAuth />}>
                    <Route index element={<Home />} />{" "}
                </Route>

                <Route path="*" element={<Missing />} />
            </Route>
        </Routes>
    )
}

export default App
