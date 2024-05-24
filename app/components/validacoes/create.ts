import {FormProps} from './types';
import axios from 'axios';

export const handleFormSubmit = async (data:FormProps) => {
    try{

        const cliente = await axios.post('http://localhost:8000/clientes',{
            nome: data.cliente.nome,
            sobrenome: data.cliente.sobrenome,
            email: data.cliente.email,
            data_nascimento: data.cliente.data_nascimento
        });

        const cliente_id = cliente.data.data.id        

        const telefone = await axios.post('http://localhost:8000/telefones', {
            cliente_id : cliente_id,
            numero_telefone: data.telefone.numero
        });

        const endereco = await axios.post('http://localhost:8000/enderecos', {
            cliente_id : cliente_id,
            ...data.endereco
        })
        
        const cartao = await axios.post('http://localhost:8000/cartao', {
            cliente_id : cliente_id,
            numero_cartao: data.cartao.numero,
            validade_cartao: data.cartao.validade,
            cvv_cartao: data.cartao.cvv
        })

        return true;

    }catch(error){
        console.log('Erro no submit')
    }
}
