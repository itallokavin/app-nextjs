'use client'

import React from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import {useCep} from '../clientes/useCep';
import {handleFormSubmit} from '../clientes/create'

export default function FormularioCliente(){
    const {errors, handleSubmit, register} = useCep();
    return(
        <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-6">
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
                                <input type="text" {...register('cliente.data_nascimento')} placeholder="YYYY/MM/DD" className="border-b-2 outline-none py-1"/>
                            </div>
                            {errors.cliente?.data_nascimento?.message && (
                                <p className="text-xs text-danger mt-1">{errors.cliente?.data_nascimento?.message}</p>
                            )}
                        </div>
                        <div>
                            <div className="flex flex-col">
                                <label className="text-xs">Telefone</label>
                                <input type="text" {...register('telefone.numero')} className="border-b-2 outline-none py-1"/>
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
                                <input type="text" {...register('endereco.cep')} className="border-b-2 outline-none py-1"/>
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
            <div className="flex justify-center py-12 gap-6">
                <Link 
                    href={'/clientes'} 
                    className="w-[80px] h-[40px] flex items-center justify-center border border-azul rounded-xl">Voltar
                </Link>
                <Button type="submit" className="text-white bg-azul">Salvar</Button>
            </div>
        </form>
    )
}
