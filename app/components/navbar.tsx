'use client'

import React, { useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { FaBars,FaHouse,FaUsers,FaPowerOff  } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { useRouter, usePathname } from 'next/navigation';

const Menu = ({icon, label, redirect}:any) => {
  const pathname = usePathname()
  const isActive = pathname === redirect
  
  return(
      <Link 
        href={redirect} 
        className={`flex items-center gap-4 p-1 hover:cursor-pointer ${isActive? 'text-azul font-bold' : ''}`}
        >
          {icon}   
          <span className="text-sm">{label}</span>
      </Link>
  )
}

export default function NavBar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => {setIsMenuOpen(!isMenuOpen)}

  const logout = () => {
    const token = Cookies.get('access_token')
    if(token){
      Cookies.remove('access_token')
      router.push('/');
    }else{
      router.push('/');
    }
  }

  return (
    <>
      <div className="py-4 px-6 max-lg:bg-azul max-lg:text-white ">
        <div className="flex items-center gap-6 lg:hidden">
          {isMenuOpen ? 
            <FaTimes className="cursor-pointer" size={'30px'} onClick={toggleMenu}/>
            : 
            <FaBars className="cursor-pointer" size={'30px'} onClick={toggleMenu}/>
          }
          <p className="text-xl">App Desafio</p>
        </div>
        <div className="flex items-center gap-2 justify-end py-4 px-6 max-lg:hidden">
          <span className="cursor-pointer" onClick={logout}>
            Sair
          </span>
        </div>
      </div>
      {isMenuOpen &&
        <div className="bg-white flex flex-col gap-4 p-6">
          <Menu label= "Página Inicial" icon={<FaHouse size={'20px'}/>} redirect='/home'/>
          <Menu label= "Clientes" icon = {<FaUsers size={'20px'}/>} redirect='/clientes'/>
          <span 
            className="flex items-center gap-4 p-1 hover:cursor-pointer"
            onClick={logout}
            >
              <FaPowerOff size={'20px'}/>
              <span className="text-sm">Sair</span>
          </span>
        </div>
      }
    </>
  );
}
