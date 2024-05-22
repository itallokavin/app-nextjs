'use client'

import React, { useState } from "react"
import Image from "next/image"
import logo from "../../public/assets/images/foguete.png"
import { FaHouse,FaUsers,FaBars} from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import {Divider} from "@nextui-org/react";

const Menu = ({icon, label, redirect}:any) => {
    const pathname = usePathname()
    const isActive = pathname === redirect

    return(
        <Link href={redirect} className={`flex items-center gap-6 px-4 py-3 hover:cursor-pointer ${isActive? 'bg-azul text-white rounded-md font-bold' : ''}`}>
            {icon}   
            <span className="text-sm">{label}</span>
        </Link>
    )

}

export default function Sidebar(){
    const [isMobile, setIsMobile] = useState(false);
    const toggleMobile = () => {setIsMobile(!isMobile)}

    return(
        <>
            <div className="w-[260px] bg-white lg:min-h-screen shadow-[rgba(0,_0,_0,_0.35)_0px_8px_30px] max-lg:hidden">
                <div className="flex flex-col items-center py-8 gap-2">
                    <Image src={logo} width={120} alt="logo"/>
                    <span className="text-[25px] text-azul font-bold italic">App Desafio</span>
                    <Divider className="mt-8 w-10/12"/>
                </div>
                <div className="flex flex-col gap-6 px-4">
                    <Menu label= "Página Inicial" icon={<FaHouse size={'20px'}/>} redirect='/home'/>
                    <Menu label= "Clientes" icon = {<FaUsers size={'20px'}/>} redirect='/clientes'/>
                </div>
            </div>
        </>
    )
}