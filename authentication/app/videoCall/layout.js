'use client'
import { SocketProvider } from "../context/socketProvider"

export default function Layout({ children }) {
    return (
        <div>
            <SocketProvider>
                <div>
                    {children}
                </div>    
            </SocketProvider>
        </div>
    )
}