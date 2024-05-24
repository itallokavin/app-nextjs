import axios from 'axios';

type FormUpdate = {
    cliente_id: number,
    cliente: {
        nome: string;
        sobrenome: string;
        email: string;
        data_nascimento: string;
    };
    telefone: {
        cliente_id: number;
        numero: string;
    };
    endereco: {
        cliente_id: number;
        cep: string;
        logradouro: string;
        numero: string;
        bairro: string;
        cidade: string;
        estado: string;
    };
}

export const handleFormUpdate = async (data:FormUpdate) => {
    const cliente_id = data.cliente_id
    
    try{
        const cliente = await axios.patch(`http://localhost:8000/clientes/${cliente_id}`,{
            ...data.cliente
        })
    }
    catch(error){
        console.error('Erro ao atualizar dados do cliente', error)
    }

    try{
        const telefone = await axios.patch(`http://localhost:8000/telefones/${cliente_id}`,{
            cliente_id: cliente_id,
            numero_telefone: data.telefone.numero
        })
        
    }
    catch(error){
        console.log('Erro ao atualizar telefone do cliente')
    }

    try{
        const endereco = await axios.patch(`http://localhost:8000/enderecos/${cliente_id}`,{
            ...data.endereco
        })
    }
    catch(error){
        console.log('Erro ao atualizar endereço do cliente')
    }

    return true
}
