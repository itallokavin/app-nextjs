'use client'

import React, { useEffect } from "react"
import Layout from "../components/layout"
import { ChakraProvider } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default async function Clientes(){
    
    const toast = useToast();
    const searchParams = useSearchParams();
    const router = useRouter();
    
    useEffect(() => {
        
        const cliente = searchParams.get('cliente_cadastrado')
        
        if(cliente == 'true'){
            toast({
                title: 'Cliente Cadastrado',
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
            <p className="text-center text-2xl py-32">Clientes</p>
            </Layout>
        </ChakraProvider>
    )
}