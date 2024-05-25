'use client'

import React, { Children } from "react"
import Sidebar from "../components/sidebar"
import NavBar from "../components/navbar";

export default function Layout({children,}: Readonly<{children: React.ReactNode;}>){
    return(
        <main className="w-full min-h-screen bg-[#eeeeee] flex max-lg:flex-col"> 
            <Sidebar />
            <div className="flex-1 ml-[260px] max-lg:ml-0 flex flex-col bg-[#eeeeee]">
                <NavBar />
                <div className="flex-1 px-6 overflow-auto max-lg:mt-6">
                    {children}
                </div>
            </div>
        </main>
    )
}