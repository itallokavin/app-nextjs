'use client'

import React from "react"
import Image from "next/image"
import logo from "../../public/assets/images/foguete.png"
import { FaHouse,FaUsers  } from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from 'next/navigation'

const Menu = ({icon, label, redirect}:any) => {
    const pathname = usePathname()
    const isActive = pathname === redirect
    return(
        <Link href={redirect} className={`flex items-center gap-6 hover:cursor-pointer ${isActive? 'text-azul font-bold' : ''}`}>
            {icon}   
            <span>{label}</span>
        </Link>
    )

}

export default function Sidebar(){
    return(
        <div className="w-[300px] bg-white min-h-screen shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <div className="flex items-center px-6 py-12">
                <Image src={logo} width={70} alt="logo" />
                <span className="text-[25px] text-azul">App Desafio</span>
            </div>
            <div className="flex flex-col gap-10 px-8">
                <Menu label= "Página Inicial" icon={<FaHouse size={'20px'}/>} redirect='/home'/>
                <Menu label= "Clientes" icon = {<FaUsers size={'20px'}/>} redirect='/clientes'/>
            </div>
        </div>
    )
}