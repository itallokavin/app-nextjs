import axios from "axios";

const fetchClientes = async () => {
    const response = await axios.get('http://localhost:8000/clientes');
    const { data } = response

    return data;
}

export default fetchClientes;
