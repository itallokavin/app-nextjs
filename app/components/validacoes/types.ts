import {schemaForm, schemaUpdate } from './schema'
import {z} from 'zod';

export type FormProps = z.infer<typeof schemaForm>
export type FormUpdate = z.infer<typeof schemaUpdate>

export type EnderecoProps = {
    logradouro: string,
    localidade: string,
    bairro: string,
    uf: string
}

export interface Cliente {
    id: number;
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

export type ClientAtualizar = {
    cliente: {
        nome: string;
        sobrenome: string;
        email: string;
        data_nascimento: string;
    };
    telefone: {
        numero: string;
    };
    endereco: {
        cep: string;
        logradouro: string;
        numero: string;
        bairro: string;
        cidade: string;
        estado: string;
    };
    cartao: {
        numero_cartao: string,
        validade_cartao: string,
        cvv_cartao: string
    },
    cartaodois?: {
        numero_cartao: string,
        validade_cartao: string,
        cvv_cartao: string
    }
}

