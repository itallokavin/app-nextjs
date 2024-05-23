'use client'

import React, { useCallback, useEffect } from "react"
import Link from "next/link";
import { Input, Button } from "@nextui-org/react"
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from 'zod';
import axios from "axios";

const schemaForm = z.object({
    cliente: z.object({
        nome: z.string()
            .min(3, { message: 'O nome deve ter no mínimo 3 caracteres.' }),
        sobrenome: z.string()
            .min(3, { message: 'O sobrenome deve ter no mínimo 3 caracteres.' }),
        email: z.string()
            .email({ message: 'Informe um email válido.' }),
        nascimento: z.date(),
    }),
    telefone: z.object({
        numero:z.string()
            .min(3, { message: 'Informe um telefone válido' }),
    }),
    endereco:z.object({
        cep: z.string().min(9,'CEP incorreto'),
        logradouro: z.string(),
        numero: z.string(),
        bairro: z.string(),
        cidade: z.string(),
        estado: z.string(),
    })
})

type FormProps = z.infer<typeof schemaForm>

type EnderecoProps = {
    logradouro: string,
    bairro: string,
    localidade: string,
    uf: string,
}

export default function FormularioCliente(){
    const {register, handleSubmit, watch, setValue, formState: {errors}} = useForm<FormProps>({
        criteriaMode: 'all',
        mode: 'all',
        resolver: zodResolver(schemaForm)
    });

    const handleFormSubmit = (data:any) => {
        console.log(data)
    }
    
    const cep = watch('endereco.cep')

    const handleSetEndereco = useCallback((data:EnderecoProps)=> {
        setValue('endereco.logradouro', data.logradouro)
        setValue('endereco.bairro', data.bairro)
        setValue('endereco.cidade', data.localidade)
        setValue('endereco.estado', data.uf)
    },[setValue])

    const handleFetchCep = useCallback(async (cep:string) => {
        try {
            const {data} = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            handleSetEndereco(data)
        } catch (error) {
            console.error('Error  CEP data:', error);
        }
    },[handleSetEndereco])
    
    useEffect(() => {
        if (cep && cep.length === 8) {
            handleFetchCep(cep);
        }
    }, [cep, handleFetchCep]);

    return(
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="bg-white px-6 card rounded-md">
                <div className="bg-azul text-white p-6 rounded-md relative bottom-6 ">
                    <h4 className="text-[18px]">Informações Pessoais</h4>
                </div>
                <div className="flex flex-col gap-12 pb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                        <Input {...register('cliente.nome')} label="Nome" variant="underlined"/>
                        <Input {...register('cliente.sobrenome')} label="Sobrenome" variant="underlined"/>
                    </div>
                    <div className="grid grid-cols-1  sm:grid-cols-3 gap-12">
                        <Input {...register('cliente.email')} label="Email" variant="underlined"/>
                        <Input {...register('cliente.nascimento')} label="Data de Nascimento" variant="underlined"/>
                        <Input {...register('telefone.numero')} label="Telefone" variant="underlined"/>
                    </div>
                </div>
            </div>
            <div className="bg-white px-6 card rounded-md mt-16">
                <div className="bg-azul text-white p-6 rounded-md relative bottom-6 ">
                    <h4 className="text-[18px]">Endereço</h4>
                </div>
                <div className="flex flex-col gap-12 pb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
                        <Input {...register('endereco.cep')} label="CEP" variant="underlined"/>
                        <Input {...register('endereco.logradouro')} label="Logradouro" variant="underlined"/>
                        <Input {...register('endereco.numero')} label="Nº da casa" variant="underlined"/>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
                        <Input {...register('endereco.bairro')} label="Bairro" variant="underlined"/>
                        <Input {...register('endereco.cidade')} label="Cidade" variant="underlined"/>
                        <Input {...register('endereco.estado')} label="Estado" variant="underlined"/>
                    </div>
                </div>
            </div>
            <div className="flex justify-center py-12 gap-6">
                <Link href={'/clientes'} className="w-[80px] h-[40px] flex items-center justify-center border border-azul rounded-xl">Voltar</Link>
                <Button type="submit" className="text-white bg-azul">Salvar</Button>
            </div>
        </form>
    )
}
