import React, { Children } from "react"
import Sidebar from "../components/sidebar"

export default function Layout({children,}: Readonly<{children: React.ReactNode;}>){
    return(
        <main className="w-full min-h-screen bg-gradient-to-r from-sky-100 to-cyan-200 max-sm:px-5 flex"> 
            <Sidebar />
            <div className="w-[calc(100%-300px)] flex p-5 border">
                {children}
            </div>
        </main>
    )
}