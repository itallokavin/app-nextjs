'use client'

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import {useCep} from '../validacoes/useCep';
import {handleFormUpdate} from '../validacoes/update'
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { GoTrash } from "react-icons/go";

export default function AtualizarCliente(){
    const router = useRouter();
    const searchParams = useSearchParams()
    const cliente_id = searchParams.get('id')
    const [cartao_id, setCartao_id] = useState()

    const {errors, handleSubmit, register, setValue} = useCep();

    const fetchCliente = async (cliente_id:any) => {
        try{
            const responseCliente = await axios.get(`http://localhost:8000/clientes/${cliente_id}`)
            const cliente = responseCliente.data.data;

            setValue('cliente.nome', cliente.nome)
            setValue('cliente.sobrenome', cliente.sobrenome)
            setValue('cliente.email', cliente.email)
            setValue('cliente.data_nascimento', cliente.data_nascimento)
        }
        catch(error){
            console.error(error)
        }
        
        try{
            const responseTelefone = await axios.get(`http://localhost:8000/telefones/${cliente_id}`)
            const telefone = responseTelefone.data.data; 
            
            setValue('telefone.numero', telefone.numero_telefone)
        }
        catch(error){
            console.error(error)
        }
                    
        try{
            const responseEndereco = await axios.get(`http://localhost:8000/enderecos/${cliente_id}`)
            const endereco = responseEndereco.data.data;

            setValue('endereco.cep', endereco.cep)
            setValue('endereco.logradouro', endereco.logradouro)
            setValue('endereco.numero', endereco.numero)
            setValue('endereco.bairro', endereco.bairro)
            setValue('endereco.cidade', endereco.cidade)
            setValue('endereco.estado', endereco.estado)
        }
        catch(error){
            console.error(error)
        }

        try{
            const responseCartao = await axios.get(`http://localhost:8000/cartao/clientes/${cliente_id}`)
            const cartao = responseCartao.data.data;
            if(cartao.length > 0 ){
                setValue('cartao.numero', cartao[0].numero_cartao)
                setValue('cartao.validade', cartao[0].validade_cartao)
                setValue('cartao.cvv', cartao[0].cvv_cartao)
                setCartao_id(cartao[0].id)
            }            
        }
        catch(error){
            console.error(error)
        }
    }

    useEffect(() => {
        if(cliente_id){
            fetchCliente(cliente_id)
        }
        else{
            router.replace('/clientes')
        }
        
    },[searchParams, cliente_id, router])
    
    const updateSubmit = async (data:any) => {
        const formData = {
            cliente_id: Number(cliente_id),
            cartao_id: Number(cartao_id),
            cliente: data.cliente,
            telefone:{
                cliente_id: Number(cliente_id),
                ...data.telefone
            },
            endereco:{
                cliente_id: Number(cliente_id),
                ...data.endereco
            },
            cartao: {
                cliente_id: Number(cliente_id),
                ...data.cartao
            }
        }

        const result = await handleFormUpdate(formData)
        if(result == true){
            router.push('/clientes?atualizado=true')
        }
    }

    const handleDeleteCartao = async () => {
        const response = await axios.delete(`http://localhost:8000/cartao/${cartao_id}`);
        router.push('/clientes?cartao_excluido=true')
    }

    return(
        <form onSubmit={handleSubmit(updateSubmit)} className="mt-6">
            <div className="bg-white px-6 card rounded-md">
                <div className="bg-azul text-white p-6 rounded-md relative bottom-6 ">
                    <h4 className="text-[18px]">Informações Pessoais</h4>
                </div>
                <div className="flex flex-col gap-12 pb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                        <div>
                            <div className="flex flex-col">
                                <label className="text-xs">Nome</label>
                                <input type="text" {...register('cliente.nome')} className="border-b-2 outline-none py-1"/>
                            </div>
                            {errors.cliente?.nome?.message && (
                                <p className="text-xs text-danger mt-1">{errors.cliente?.nome?.message}</p>
                            )}
                        </div>
                        <div>
                            <div className="flex flex-col">
                                <label className="text-xs">Sobrenome</label>
                                <input type="text" {...register('cliente.sobrenome')} className="border-b-2 outline-none py-1"/>
                            </div>
                            {errors.cliente?.sobrenome?.message && (
                                <p className="text-xs text-danger mt-1">{errors.cliente?.sobrenome?.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-1  sm:grid-cols-3 gap-12">
                        <div>
                            <div className="flex flex-col">
                                <label className="text-xs">Email</label>
                                <input type="text" {...register('cliente.email')} className="border-b-2 outline-none py-1"/>
                            </div>
                            {errors.cliente?.email?.message && (
                                <p className="text-xs text-danger mt-1">{errors.cliente?.email?.message}</p>
                            )}
                        </div>
                        <div>
                            <div className="flex flex-col">
                                <label className="text-xs">Data de Nascimento</label>
                                <input type="date" {...register('cliente.data_nascimento')} placeholder="YYYY/MM/DD" className="border-b-2 outline-none py-1"/>
                            </div>
                            {errors.cliente?.data_nascimento?.message && (
                                <p className="text-xs text-danger mt-1">{errors.cliente?.data_nascimento?.message}</p>
                            )}
                        </div>
                        <div>
                            <div className="flex flex-col">
                                <label className="text-xs">Telefone</label>
                                <input type="text" maxLength={11} {...register('telefone.numero')} className="border-b-2 outline-none py-1"/>
                            </div>
                            {errors.telefone?.numero?.message && (
                                <p className="text-xs text-danger mt-1">{errors.telefone?.numero?.message}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-white px-6 card rounded-md mt-16">
                <div className="bg-azul text-white p-6 rounded-md relative bottom-6 ">
                    <h4 className="text-[18px]">Endereço</h4>
                </div>
                <div className="flex flex-col gap-12 pb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
                        <div>
                            <div className="flex flex-col">
                                <label className="text-xs">CEP</label>
                                <input type="text" maxLength={8} {...register('endereco.cep')} className="border-b-2 outline-none py-1"/>
                            </div>
                            {errors.endereco?.cep?.message && (
                                <p className="text-xs text-danger mt-1">{errors.endereco?.cep?.message}</p>
                            )}
                        </div>
                        <div>
                            <div className="flex flex-col">
                                <label className="text-xs">Logradouro</label>
                                <input type="text" {...register('endereco.logradouro')} className="border-b-2 outline-none py-1"/>
                            </div>
                            {errors.endereco?.logradouro?.message && (
                                <p className="text-xs text-danger mt-1">{errors.endereco?.logradouro?.message}</p>
                            )}
                        </div>
                        <div>
                            <div className="flex flex-col">
                                <label className="text-xs">Nº da Casa</label>
                                <input type="text" {...register('endereco.numero')} className="border-b-2 outline-none py-1"/>
                            </div>
                            {errors.endereco?.numero?.message && (
                                <p className="text-xs text-danger mt-1">{errors.endereco?.numero?.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
                        <div>
                            <div className="flex flex-col">
                                <label className="text-xs">Bairro</label>
                                <input type="text" {...register('endereco.bairro')} className="border-b-2 outline-none py-1"/>
                            </div>
                            {errors.endereco?.bairro?.message && (
                                <p className="text-xs text-danger mt-1">{errors.endereco?.bairro?.message}</p>
                            )}
                        </div>
                        <div>
                            <div className="flex flex-col">
                                <label className="text-xs">Cidade</label>
                                <input type="text" {...register('endereco.cidade')} className="border-b-2 outline-none py-1"/>
                            </div>
                            {errors.endereco?.cidade?.message && (
                                <p className="text-xs text-danger mt-1">{errors.endereco?.cidade?.message}</p>
                            )}
                        </div>
                        <div>
                            <div className="flex flex-col">
                                <label className="text-xs">UF</label>
                                <input type="text" {...register('endereco.estado')} className="border-b-2 outline-none py-1"/>
                            </div>
                            {errors.endereco?.estado?.message && (
                                <p className="text-xs text-danger mt-1">{errors.endereco?.estado?.message}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white px-6 card rounded-md mt-16">
                <div className="bg-azul text-white p-6 rounded-md relative bottom-6 ">
                    <h4 className="text-[18px]">Cartão de Crédito</h4>
                </div>
                <div className="flex flex-col gap-12 pb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
                        <div>
                            <div className="flex flex-col">
                                <label className="text-xs">Número do Cartão</label>
                                <input type="text" maxLength={16} {...register('cartao.numero')} className="border-b-2 outline-none py-1"/>
                            </div>
                            {errors.cartao?.numero?.message && (
                                <p className="text-xs text-danger mt-1">{errors.cartao?.numero?.message}</p>
                            )}
                        </div>
                        <div>
                            <div className="flex flex-col">
                                <label className="text-xs">Validade</label>
                                <input type="text" {...register('cartao.validade')} placeholder="MM/YYYY" className="border-b-2 outline-none py-1"/>
                            </div>
                            {errors.cartao?.validade?.message && (
                                <p className="text-xs text-danger mt-1">{errors.cartao?.validade?.message}</p>
                            )}
                        </div>
                        <div>
                            <div className="flex flex-col">
                                <label className="text-xs">CVV</label>
                                <input type="text" maxLength={3} {...register('cartao.cvv')} className="border-b-2 outline-none py-1"/>
                            </div>
                            {errors.cartao?.cvv?.message && (
                                <p className="text-xs text-danger mt-1">{errors.cartao?.cvv?.message}</p>
                            )}
                        </div>
                    </div>
                    {cartao_id && 
                        <div className="flex justify-center">
                            <Button className="text-white bg-red-600" onClick={handleDeleteCartao}><GoTrash />Excluir Cartão</Button>
                        </div>
                    }
                </div>
            </div>
            
            <div className="flex justify-center py-12 gap-6">
                <Link 
                    href={'/clientes'} 
                    className="w-[80px] h-[40px] flex items-center justify-center border border-azul rounded-xl">Voltar
                </Link>
                <Button type="submit" className="text-white bg-azul">Atualizar</Button>
            </div>
        </form>
    )
}
