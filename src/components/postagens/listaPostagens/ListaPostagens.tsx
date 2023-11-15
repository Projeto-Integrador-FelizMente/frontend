import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dna } from 'react-loader-spinner';


import { buscar } from '../../../services/Service';
import { AuthContext } from '../../../contexts/AuthContext';

import Postagem from '../../../models/Postagem';
import CardPostagensFeed from '../cardPostagens/CardPostagemFeed';

function ListaPostagens() {

    const navigate = useNavigate();

    const [postagens, setPostagens] = useState<Postagem[]>([]);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarPostagens() {
        try {
            await buscar('/postagens', setPostagens, {
                headers: {
                    Authorization: token,
                },
            })

        } catch (error: any) {
            if (error.toString().includes('403')) {
                alert('O token expirou, favor logar novamente')
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado')
            navigate('/');
        }
    }, [token])

    useEffect(() => {
        buscarPostagens()
    }, [postagens.length])


    return (
        <>
            {postagens.length === 0 && (
                <Dna
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper mx-auto"
                />
            )}
            <div className='justify-center items-center container mx-4 my-4 grid grid-cols-1 gap-4 '>
                {postagens.map((postagem) => (
                    <CardPostagensFeed key={postagem.id} post={postagem} />
                ))}
            </div>
        </>
    )
}

export default ListaPostagens