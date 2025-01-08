import { createContext } from "react";

export default createContext({
    isAdmin: "",
    setIsAdmin: () => {},
    user:[],
    setUser: () => {}
})