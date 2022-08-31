import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <main className="App container">
            {/* basically render the children */}
            <Outlet />
        </main>
    )
}

export default Layout
