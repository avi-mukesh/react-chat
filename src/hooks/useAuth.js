// usually to use the authentication context in a component would have to
// import useContext, AuthContext and then do useContext(AuthContext) which is just long

import { useContext } from "react"
import AuthContext from "../context/AuthProvider"

const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth
