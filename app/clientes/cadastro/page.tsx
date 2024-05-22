import React from "react"
import Layout from "../../components/layout"
import { Input, Button } from "@nextui-org/react"

export default async function CadastroClientes(){
    return(
        <Layout>
            <div className="px-10">
                <form className="bg-white py-6 rounded-xl">
                    <fieldset className="p-6">
                        <legend>Informações Pessoais</legend>
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                            <Input className="max-w-xs" size="sm" label="Nome" variant="flat"/>
                            <Input className="max-w-xs" size="sm" label="Sobrenome" variant="flat"/>
                            <Input className="max-w-xs" size="sm" label="Email" variant="flat"/>
                            <Input className="max-w-xs" size="sm" label="Data de Nascimento" variant="flat"/>
                            <Input className="max-w-xs" size="sm" label="Telefone" variant="flat"/>
                            <Input className="max-w-xs" size="sm" label="CEP" variant="flat"/>
                            <Input className="max-w-xs" size="sm" label="Logradouro" variant="flat"/>
                            <Input className="max-w-xs" size="sm" label="Nº" variant="flat"/>
                            <Input className="max-w-xs" size="sm" label="Bairro" variant="flat"/>
                            <Input className="max-w-xs" size="sm" label="Cidade" variant="flat"/>
                            <Input className="max-w-xs" size="sm" label="Estado" variant="flat"/>
                        </div>
                    </fieldset>
                    <fieldset className="p-6">
                        <legend>Informações de Pagamento</legend>
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                            <Input className="max-w-xs" size="sm" label="Nº do cartão" variant="flat"/>
                            <Input className="max-w-xs" size="sm" label="Validade" variant="flat"/>
                            <Input className="max-w-xs" size="sm" label="CVV" variant="flat"/>
                        </div>
                    </fieldset>
                    <div className="flex justify-center py-6">
                        <Button className="bg-azul text-white">Salvar</Button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}