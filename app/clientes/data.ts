export const loadClientes = async () => {
    const response = await fetch('http://localhost:8000/clientes', {
        method: 'GET'
    });
    if (!response.ok) {
        throw new Error('Deu algum erro');
    }

    return await response.json();
};