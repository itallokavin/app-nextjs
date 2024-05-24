import React from "react"
import Layout from "../../components/layout"
import AtualizarCliente from "../../components/formularios/atualizar-cliente"

export default async function CadastroClientes(){
    return(
        <Layout>
            <AtualizarCliente />
        </Layout>
    )
}