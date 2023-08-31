import { createContext, useState } from "react";

// this is the actual value we want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

// the provider is the actual component that will wrap around any other component that need access to the values inside
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const value = { currentUser, setCurrentUser }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

