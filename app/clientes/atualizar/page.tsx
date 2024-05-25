import React, { Suspense } from "react"
import Layout from "../../components/layout"
import AtualizarCliente from "../../components/formularios/atualizar-cliente"
import {Spinner} from "@nextui-org/spinner";

export default async function CadastroClientes(){
    return(
        <Suspense fallback={<Spinner />}>
            <Layout>
                <AtualizarCliente />
            </Layout>
        </Suspense>
    )
}