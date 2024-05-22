'use client'

import {AiOutlineEyeInvisible} from 'react-icons/ai';
import {BiShowAlt} from 'react-icons/bi';
import {useState } from "react";
import {useRouter} from 'next/navigation';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';

export default function FormLogin() {
  
    const router = useRouter();

    const [visiblePassword, setvisiblePassword] = useState(false)
    const [error, setError] = useState(false);
    const {register, handleSubmit} = useForm();

    const handleFormSubmit = async (data:any) => {
        const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if(!response.ok){
        return setError(true);
      }
      
      setError(false);
        
      const result = await response.json();
      const {access_token} = result;

      Cookies.set('access_token',access_token, {secure: true, sameSite: 'strict'})
      router.push('/home'); 
    }
    
    function showPassword(){
        setvisiblePassword(!visiblePassword)
    }

    return (
        <main className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-[#202140] from-40% to-40% to-white">
            <div className="bg-white w-[400px] border py-8 shadow-xl rounded-2xl max-sm:w-[90%]">
                <div className="p-12">
                    <p className="text-center text-[#202140] text-2xl font-bold">App Desafio</p>
                </div>
                <form className="px-5" onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm" htmlFor="">Usuário: </label>
                        <input 
                            type="text"
                            {...register('usuario')}
                            className="text-sm pl-2 outline-0 bg-[#fafafa] h-[35px] rounded-lg" />
                    </div>
                    <div className="flex flex-col mt-5 relative">
                        <div className="flex flex-col">
                            <label className="mb-1 text-sm" htmlFor="">Senha: </label>
                            <input 
                                type={visiblePassword ? "text" : "password"} 
                                className="text-sm pl-2 outline-0 bg-[#fafafa] h-[35px] rounded-lg" 
                                {...register('senha')}
                            />
                        </div>
                        {visiblePassword? 
                          <AiOutlineEyeInvisible className="absolute right-2 bottom-2 cursor-pointer" color="red" size={20} onClick={showPassword} />
                          :
                          <BiShowAlt className="absolute right-2 bottom-2 cursor-pointer"  size={20} onClick={showPassword} />
                        }
                        {error &&
                            <p className="mt-1 absolute bottom-[-20px] text-red-600 text-[11px]">Usuário ou senha inválidos</p>
                        }      
                    </div>
                    <div className='pb-2'>
                        <button type='submit' className="bg-[#202140] p-2 w-full rounded-lg text-white mt-10">Fazer Login</button>
                    </div>
                </form>
            </div>    
        </main>
  )
}
