import { createContext, ReactNode, useState } from "react";

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    singIn: (credentials: SingInProps) => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SingInProps = {
    email: string;
    password: string;
}
type AuthProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState()
    const isAuthenticated = !!user;

    async function singIn() {
        alert("Clicou no Login")
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, singIn }}>
            {children}
        </AuthContext.Provider>
    )
}