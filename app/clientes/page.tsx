'use client'

import React from "react"
import Layout from "../components/layout"
import { loadClientes } from "./data"
import { useState, useEffect } from "react";

export default async function Clientes(){
    //const [clientes, setClientes] = useState([]); 
    
    // const fetchClientes = async () => {
    //     try{
    //         const data = await loadClientes();
    //         console.log(data)
    //     }
    //     catch(error){
    //         console.log(error)
    //     }
    // }

    // useEffect(()=> {
    //     fetchClientes();
    // },[])

    return(
        <Layout>
           <p className="text-center text-2xl py-32">Clientes</p>
        </Layout>
    )
}