import {schemaForm } from './schema'
import {z} from 'zod';

export type FormProps = z.infer<typeof schemaForm>

export type EnderecoProps = {
    logradouro: string,
    localidade: string,
    bairro: string,
    uf: string
}

export interface Cliente {
    nome: string;
    sobrenome: string;
    email: string;
    data_nascimento: string;
}

export interface Telefone {
    cliente_id:number;
    numero: string;
}

export interface Endereco {
    cliente_id:number;
    cep: string;
    logradouro: string;
    cidade: string;
    bairro: string;
    estado: string;
    clienteId: number;
}