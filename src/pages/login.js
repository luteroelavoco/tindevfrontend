import React, { useState } from 'react';
import logo from "../assets/logo.svg";
import load from "../assets/load.gif";
import "./login.css"
import api from "../services/api";

export default function Login({ history }) {

    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        
        await api.post('/devs', {
            username
        })
            .then(response => {
                const { _id } = response.data;
                if (_id) {
                    history.push(`/devs/${_id}`);
                }
            })
            .catch(error => {
                console.log(error)
                if (error.response.status === 404)
                    window.alert('Usuario não existe');
                else if (error.response.status === 406)
                    window.alert('Este usuário do github contem informações invalidas');
                else
                    window.alert('Aconteceu um erro no servidor, tenta mais tarde');
            }).finally(resp => ()=>{
                setLoading(false)
            })

    }
    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img className="logo" src={logo} alt="tindev" />
                <input
                    placeholder="Digite seu usuario do github"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                {loading && <img className="loading" src={load} alt="loading" />}
                <button type="submit"> Enviar </button>
            </form>

        </div>
    )
}