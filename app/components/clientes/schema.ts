import {z} from 'zod';

export const schemaForm = z.object({
    cliente: z.object({
        nome: z.string()
            .min(3, { message: 'O nome deve ter no mínimo 3 caracteres.' }),
        sobrenome: z.string()
            .min(3, { message: 'O sobrenome deve ter no mínimo 3 caracteres.' }),
        email: z.string()
            .email({ message: 'Informe um email válido.' }),
        data_nascimento: z.string()
            .optional(),
    }),
    telefone: z.object({
        numero:z.string()
            .optional()
    }),
    endereco:z.object({
        cep: z.string().min(8,'CEP incorreto'),
        logradouro: z.string(),
        numero: z.string(),
        bairro: z.string(),
        cidade: z.string(),
        estado: z.string()
            .max(2),
    }),
}).transform((field) => ({
    cliente: {
        nome: field.cliente.nome,
        sobrenome: field.cliente.sobrenome,
        email: field.cliente.email,
        data_nascimento: field.cliente.data_nascimento,
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
    }
}));
