import axios from 'axios';

type FormUpdate = {
    cliente_id: number,
    cartao_id: number,
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
    cartao: {
        cliente_id: number;
        numero: string,
        validade: string,
        cvv:string
    }
}

export const handleFormUpdate = async (data:FormUpdate) => {
    const cliente_id = data.cliente_id
    const cartao_id = data.cartao_id
    
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

    try{
        const cartao = await axios.patch(`http://localhost:8000/cartao/${cartao_id}`,{ 
            cliente_id: cliente_id,
            numero_cartao: data.cartao.numero,
            validade_cartao: data.cartao.validade,
            cvv_cartao: data.cartao.cvv
        })
    }
    catch(error){
        console.log('Erro ao atualizar cartão do cliente')
    }

    return true
}
