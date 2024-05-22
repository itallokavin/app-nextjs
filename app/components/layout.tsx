import React, { Children } from "react"
import Sidebar from "../components/sidebar"
import NavBar from "../components/navbar";

export default function Layout({children,}: Readonly<{children: React.ReactNode;}>){
    return(
        <main className="w-full min-h-screen bg-[#eeeeee] flex max-lg:flex-col"> 
            <Sidebar />
            <div className="w-[calc(100%-260px)] max-lg:w-full flex flex-col bg-[#eeeeee]">
                <NavBar />
                <div className="">
                    {children}
                </div>
            </div>
        </main>
    )
}