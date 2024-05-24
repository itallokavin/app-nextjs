import {number, z} from 'zod';

export const schemaForm = z.object({
    cliente: z.object({
        nome: z.string()
            .min(3, { message: 'O nome deve ter no mínimo 3 caracteres.' })
            .transform(value => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()),
        sobrenome: z.string()
            .min(3, { message: 'O sobrenome deve ter no mínimo 3 caracteres.' })
            .transform(value => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()),
        email: z.string()
            .email({ message: 'Informe um email válido.' })
            .transform(value => value.toLowerCase()),
        data_nascimento: z.string()
    }),
    telefone: z.object({
        numero:z.string()
            .min(10,'Número inválido')
            .max(11,'Número inválido')
    }),
    endereco:z.object({
        cep: z.string()
            .min(8,'CEP incorreto'),
        logradouro: z.string()
            .transform(value => value.charAt(0).toUpperCase() + value.slice(1)),
        numero: z.string(),
        bairro: z.string()
            .transform(value => value.charAt(0).toUpperCase() + value.slice(1)),
        cidade: z.string()
            .transform(value => value.charAt(0).toUpperCase() + value.slice(1)),
        estado: z.string()
            .max(2)
            .transform(value => value.toUpperCase()),
    }),
    cartao: z.object({
        numero: z.string()
            .min(16, 'Informe um cartão válido'),
        validade: z.string(),
        cvv:z.string()
            .min(3, 'Informe um código válido')
    })
}).transform((field) => ({
    cliente: {
        nome: field.cliente.nome,
        sobrenome: field.cliente.sobrenome,
        email: field.cliente.email,
        data_nascimento: field.cliente.data_nascimento
    },
    telefone: {
        numero: field.telefone.numero,
    },
    endereco: {
        cep: field.endereco.cep,
        logradouro: field.endereco.logradouro,
        numero: field.endereco.numero,
        bairro: field.endereco.bairro,
        cidade: field.endereco.cidade,
        estado: field.endereco.estado,
    },
    cartao: {
        numero: field.cartao.numero,
        validade: field.cartao.validade,
        cvv: field.cartao.cvv
    }
}));

export const schemaUpdate = z.object({
    cliente: z.object({
        nome: z.string()
            .min(3, { message: 'O nome deve ter no mínimo 3 caracteres.' })
            .transform(value => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()),
        sobrenome: z.string()
            .min(3, { message: 'O sobrenome deve ter no mínimo 3 caracteres.' })
            .transform(value => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()),
        email: z.string()
            .email({ message: 'Informe um email válido.' })
            .transform(value => value.toLowerCase()),
        data_nascimento: z.string()
    }),
    telefone: z.object({
        cliente_id:z.number(),
        numero:z.string()
            .min(10,'Número inválido')
            .max(11,'Número inválido')
    }),
    endereco:z.object({
        cliente_id:z.number(),
        cep: z.string()
            .min(8,'CEP incorreto'),
        logradouro: z.string()
            .transform(value => value.charAt(0).toUpperCase() + value.slice(1)),
        numero: z.string(),
        bairro: z.string()
            .transform(value => value.charAt(0).toUpperCase() + value.slice(1)),
        cidade: z.string()
            .transform(value => value.charAt(0).toUpperCase() + value.slice(1)),
        estado: z.string()
            .max(2)
            .transform(value => value.toUpperCase()),
    }),
}).transform((field) => ({
    cliente: {
        nome: field.cliente.nome,
        sobrenome: field.cliente.sobrenome,
        email: field.cliente.email,
        data_nascimento: field.cliente.data_nascimento
    },
    telefone: {
        cliente_id: field.telefone.cliente_id,
        numero_telefone: field.telefone.numero,
    },
    endereco: {
        cliente_id: field.endereco.cliente_id,
        cep: field.endereco.cep,
        logradouro: field.endereco.logradouro,
        numero: field.endereco.numero,
        bairro: field.endereco.bairro,
        cidade: field.endereco.cidade,
        estado: field.endereco.estado,
    }
}));
