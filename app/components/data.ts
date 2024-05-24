import axios from "axios";

const fetchClientes = async () => {
    const response = await axios.get('http://localhost:8000/clientes');
    const { data } = response

    return data;
}

const getClientes = async () => {
    try{
        const clientes = await fetchClientes();
        return clientes;
    }
    catch(error){
        console.log('Erro na request de clientes')
    }
}

export default getClientes;
