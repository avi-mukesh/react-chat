import { Route, Routes } from "react-router-dom"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"

import Enter from "./components/Enter"
import Home from "./components/Home"
import Layout from "./components/Layout"
import Missing from "./components/Missing"
import RequireAuth from "./components/RequireAuth"
import PersistEnter from "./components/PersistEnter"

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* public route */}
                <Route path="enter" element={<Enter />} />

                {/* routes nested in here are protected by RequireAuth */}
                <Route element={<PersistEnter />}>
                    <Route element={<RequireAuth />}>
                        <Route index element={<Home />} />{" "}
                    </Route>
                </Route>

                <Route path="*" element={<Missing />} />
            </Route>
        </Routes>
    )
}

export default App
