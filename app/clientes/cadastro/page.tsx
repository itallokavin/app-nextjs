import React, { Suspense } from "react"
import Layout from "../../components/layout"
import FormularioCliente from "../../components/formularios/cadastro-cliente"
import { Spinner } from "@nextui-org/react"

export default async function CadastroClientes(){
    return(
        <Suspense fallback={<Spinner />}>
            <Layout>
                <FormularioCliente />
            </Layout>
        </Suspense>
    )
}