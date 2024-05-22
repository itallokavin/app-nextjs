'use client'

import Image from "next/image";
import logo from "@/public/assets/images/foguete.png"
import {Input, Button} from "@nextui-org/react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function FormLogin(){
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const [isError, setIsError] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    
    const {register, handleSubmit} = useForm();
    
    const handleSubmitData = async (data:any) => {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
       })
      if(!response.ok){
        return setIsError(true);
      }
        setIsError(false);
        router.push('/home');        
    }

    return(
        <div className="w-full bg-white max-w-[500px] rounded-xl py-8">
          <div className="flex items-center justify-center py-12">
            <Image src={logo} width={70} alt="logo" />
            <span className="text-[25px] text-azul">App Desafio</span>
          </div>
          <form onSubmit={handleSubmit(handleSubmitData)} className="flex flex-col gap-6 justify-center items-center relative">
            <Input 
              className="w-10/12 max-w-[300px] outline-none" 
              {...register('usuario')} 
              size="sm" 
              variant="bordered" 
              label="Usuário"
            />
            <Input
              label="Senha"
              variant="bordered"
              {...register('senha')}
              size="sm"
              className="w-10/12 max-w-[300px]" 
              endContent={
                <button className="focus:outline-none mb-1" type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <FaEyeSlash className="text-xl text-default-400 pointer-events-none" />
                  ) : (
                    <FaEye className="text-xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
             />
             {isError && 
              <p className="text-danger text-[13px] text-left relative bottom-4 right-16">Usuário ou senha inválidos</p>
             }
            <Button type="submit" className="bg-azul text-white w-[125px]">Entrar</Button>
          </form>
        </div>
    )
}