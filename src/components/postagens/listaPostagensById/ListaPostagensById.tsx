import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dna } from 'react-loader-spinner';

import { buscar } from '../../../services/Service';
import { AuthContext } from '../../../contexts/AuthContext';

import Postagem from '../../../models/Postagem';
import CardPostagens from '../cardPostagens/CardPostagens';
import ModalPostagem from '../modalPostagem/ModalPostagem';

function ListaPostagensById() {
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
            });
        } catch (error: any) {
            if (error.toString().includes('403')) {
                alert('O token expirou, favor logar novamente');
                handleLogout();
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado');
            navigate('/');
        }
    }, [token, navigate]);

    useEffect(() => {
        buscarPostagens();
    }, [token]);

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
            <div className='flex'>
                <div className='container mx-auto my-4 
                    grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {postagens
                        .filter((postagem) => postagem.user?.id === usuario.id)
                        .map((filteredPostagem) => (
                            <CardPostagens key={filteredPostagem.id} post={filteredPostagem} />
                        ))}
                </div>
            </div>
            <ModalPostagem />
        </>
    );
}

export default ListaPostagensById;