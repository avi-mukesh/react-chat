import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <main className="App">
            {/* basically render the children */}
            <Outlet />
        </main>
    )
}

export default Layout
