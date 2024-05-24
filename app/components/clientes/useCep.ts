import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { schemaForm } from './schema';
import { EnderecoProps, FormProps } from './types';
import { useCallback, useEffect } from "react";
import axios from "axios";

export const useCep = () => {
    
    const {register, handleSubmit, watch, setValue, formState: {errors}} = useForm<FormProps>({
        criteriaMode: 'all',
        mode: 'all',
        resolver: zodResolver(schemaForm),
        defaultValues:{
            endereco: {
                cep: '',
                logradouro: '',
                bairro: '',
                numero: '',
                cidade: '',
                estado: ''
            }
        }
    });

    const cep = watch('endereco.cep');

    const handleSetData = useCallback((data: EnderecoProps) => {
        setValue('endereco.bairro', data.bairro)
        setValue('endereco.cidade', data.localidade)
        setValue('endereco.logradouro', data.logradouro)
        setValue('endereco.estado', data.uf)
    },[])

    const fetchCep = useCallback(async(cep:string) => {
        const {data} = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        handleSetData(data)
    },[handleSetData])

    useEffect(()=> {
        if(cep && cep.length == 8){
            fetchCep(cep);
        }
    },[fetchCep, setValue, cep])

    return {handleSubmit, errors, register}
}