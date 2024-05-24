import React from "react"
import Layout from "../../components/layout"
import FormularioCliente from "../../components/formularios/cadastro-cliente"

export default async function CadastroClientes(){
    return(
        <Layout>
            <FormularioCliente />
        </Layout>
    )
}