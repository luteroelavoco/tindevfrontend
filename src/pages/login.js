import React, {useState} from 'react';
import logo from "../assets/logo.svg";
import "./login.css"
import api from "../services/api";

export default function Login({history}) {

    const [username, setUsername] = useState('');

    async function handleSubmit(e){
        e.preventDefault();
        const response = await api.post('/devs',{
            username
        })
        const { _id } = response.data;

        history.push(`/devs/${_id}`);
    }
    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="tindev" />
                <input 
                    placeholder="Digite seu usuario do github"
                    value={username}
                    onChange={(e)=> setUsername(e.target.value)}
                    required
                />
                <button type="submit"> Enviar </button>
            </form>

        </div>
    )
}