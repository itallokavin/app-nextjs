'use client'

import React, { useEffect } from "react"
import Layout from "../components/layout"
import { ChakraProvider } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import TableClientes from "../components/table";

export default async function Clientes(){
    
    const toast = useToast();
    const searchParams = useSearchParams();
    const router = useRouter();
    
    useEffect(() => {
        
        const cadastrado = searchParams.get('cliente_cadastrado')
        const atualizado = searchParams.get('atualizado')
        const excluido = searchParams.get('excluido')
        
        if(cadastrado == 'true'){
            toast({
                title: 'Cliente Cadastrado',
                status: 'success',
                duration: 3000,
                position: 'bottom-left',
                isClosable: true,
              })
            router.replace('/clientes', undefined);
        }

        if(atualizado == 'true'){
            toast({
                title: 'Cliente Atualizado',
                status: 'success',
                duration: 3000,
                position: 'bottom-left',
                isClosable: true,
              })
            router.replace('/clientes', undefined);
        }

        if(excluido == 'true'){
            toast({
                title: 'Cliente Excluído',
                status: 'success',
                duration: 3000,
                position: 'bottom-left',
                isClosable: true,
              })
            router.replace('/clientes', undefined);
        }
        
    },[])

    return(
        <ChakraProvider>
            <Layout>
                <TableClientes />
            </Layout>
        </ChakraProvider>
    )
}