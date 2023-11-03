import axios, { AxiosError } from 'axios'
import { parseCookies } from 'nookies'
import { AuthTokenError } from './errors/AuthTokenError';

import { singOut } from '../contexts/AuthContext';

export function setupAPIClient(ctx = undefined) {
    let cookies = parseCookies(ctx);

    const api = axios.create({
        baseURL: 'http://localhost:3333',
        headers: {
            Authorization: `Bearer ${cookies['@nextauth.token']}`
        }
    })

    api.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError) => {
        if(error.response.status === 401){
            //Qual quer erro 401 (nao autorizado) devemos desligar o usuario
            if(typeof window !== undefined){
                //Chamar a função para desligar o usuario
                singOut();
            }else{
                return Promise.reject(new AuthTokenError)
            }
        }

        return Promise.reject(error)
        
    })

}