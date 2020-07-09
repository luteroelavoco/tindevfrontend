import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import io from 'socket.io-client';
import logo from "../assets/logo.svg";
import "./main.css"
import like from "../assets/like.svg"
import dislike from "../assets/dislike.svg"
import api, { url } from "../services/api";
import itsmatch from "../assets/match.png";

export default function Main({ match }) {

    const [users, setUsers] = useState([]);
    const [matchDev, setMachDev] = useState();

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id
                }
            })
            setUsers(response.data);
        };
        loadUsers();

    }, [match.params.id])

    useEffect(() => {
        const socket = io(url, {
            query: { user: match.params.id }
        });

        socket.on('match', dev => {
            setMachDev(dev)
        })

    }, [match.params.id])

    async function handleLike(id) {
        await api.post(`/devs/${id}/likes`, null, {
            headers: {
                user: match.params.id
            }
        })
        setUsers(users.filter(user => user._id !== id));
    }

    async function handleDislike(id) {
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: {
                user: match.params.id
            }
        })
        setUsers(users.filter(user => user._id !== id));
    }


    return (
        <div className="main-container">
            <Link to="/">
                <img src={logo} alt="tindev" />
            </Link>
            {users.length > 0 ? (
                <ul>
                    {users.map(user =>
                        <li key={user._id}>
                            <img src={user.avatar} alt="programmer" />
                            <footer>
                                <strong>{user.name}</strong>
                                <p>{user.bio}</p>
                            </footer>
                            <div className="buttons">
                                <button type="button" onClick={() => handleLike(user._id)}>
                                    <img src={like} alt="like" />
                                </button>
                                <button type="button" onClick={() => handleDislike(user._id)}>
                                    <img src={dislike} alt="dislike" />
                                </button>
                            </div>
                        </li>
                    )}
                </ul>
            ) : (
                    <div className="empty">
                        Acabou :(
                    </div>
                )}

            {matchDev && (
                <div className="match-container">
                    <img className="match-title" src={itsmatch} alt="its a march" />
                    <img className="avatar" src={matchDev.avatar} alt="user" />
                    <strong>{matchDev.name}</strong>
                    <p>{matchDev.bio}</p>
                    <button type="button" onClick={() => setMachDev(null)}> Fechar </button>
                </div>
            )}
        </div>
    )
}
