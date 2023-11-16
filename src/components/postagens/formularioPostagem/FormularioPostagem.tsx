import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';

import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { AuthContext } from '../../../contexts/AuthContext';

import Tema from '../../../models/Tema';
import Postagem from '../../../models/Postagem';

function FormularioPostagem() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [temas, setTemas] = useState<Tema[]>([]);
    const [tema, setTema] = useState<Tema>({ id: 0, nome: '', descricao: '' });
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

    const { id } = useParams<{ id: string }>();

    const { usuario, handleLogout } = React.useContext(AuthContext);
    const token = usuario.token;

    async function buscarPostagemPorId(postagemId: string) {
        await buscar(`/postagens/${postagemId}`, setPostagem, {
            headers: {
                Authorization: token,
            },
        });
    }

    async function buscarTemaPorId(temaId: string) {
        await buscar(`/tema/${temaId}`, setTema, {
            headers: {
                Authorization: token,
            },
        });
    }

    async function buscarTemas() {
        await buscar('/tema', setTemas, {
            headers: {
                Authorization: token,
            },
        });
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado');
            navigate('/');
        }
    }, [token, navigate]);

    useEffect(() => {
        buscarTemas();

        if (id !== undefined) {
            buscarPostagemPorId(id);
        }
    }, [id]);

    useEffect(() => {
        setPostagem((prevPostagem) => ({
            ...prevPostagem,
            tema: tema,
        }));
    }, [tema]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setPostagem((prevPostagem) => ({
            ...prevPostagem,
            [e.target.name]: e.target.value,
            tema: tema,
            user: usuario,
        }));
    }

    function retornar() {
        navigate('/perfil');
    }

    async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        if (id !== undefined) {
            try {
                await atualizar(`/postagens`, postagem, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                });

                alert('Postagem atualizada com sucesso');
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    alert('O token expirou, favor logar novamente');
                    handleLogout();
                } else {
                    alert('Erro ao atualizar a Postagem');
                }
            }
        } else {
            try {
                await cadastrar(`/postagens`, postagem, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                });

                alert('Postagem cadastrada com sucesso');
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    alert('O token expirou, favor logar novamente');
                    handleLogout();
                } else {
                    alert('Erro ao cadastrar a Postagem');
                }
            }
        }

        setIsLoading(false);
        retornar();
    }

    const [estadoSelecionado, setEstadoSelecionado] = useState('');

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;

        setEstadoSelecionado(selectedValue);

        setPostagem((prevPostagem) => ({
            ...prevPostagem,
            estado: (usuario.id !== undefined && selectedValue === 'Inativo') ? 'Inativo' : 'Ativo',

        }));
    };

    const carregandoTema = tema.descricao === '';

    return (
        <div className="container flex flex-col mx-auto items-center">
            <h1 className="text-4xl text-center my-8">
                {id !== undefined ? 'Editar Postagem' : 'Cadastrar Postagem'}
            </h1>

            <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovaPostagem}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Título da Postagem</label>
                    <input
                        value={postagem.titulo}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        type="text"
                        placeholder="Insira aqui o Título"
                        name="titulo"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="texto">Texto da Postagem</label>

                    <input
                        value={postagem.texto}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        type="text"
                        placeholder="Adicione aqui o Texto da Postagem"
                        name="texto"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="link">link da Postagem</label>

                    <input
                        value={postagem.link}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        type="text"
                        placeholder="Adicione aqui o link da Postagem"
                        name="link"
                        className="border-2 border-slate-700 rounded p-2"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <p>Estado da Postagem</p>
                    <select
                        name="estado"
                        id="estado"
                        className='border p-2 border-slate-800 rounded'
                        onChange={handleSelectChange}
                        value={estadoSelecionado}
                    >
                        <option value="" disabled>Selecione um Estado</option>
                        <option value="Ativo">Ativo</option>
                        {id !== undefined && (
                            <option value="Inativo" disabled={id === undefined}>
                                Inativo
                            </option>
                        )}
                    </select>

                </div>

                <div className="flex flex-col gap-2">
                    <p>Tema da Postagem</p>
                    <select name="tema" id="tema" className='border p-2 border-slate-800 rounded'
                        onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
                    >
                        <option value="" selected disabled>Selecione um Tema</option>
                        {temas.map((tema) => (
                            <>
                                <option value={tema.id} >{tema.nome}</option>
                            </>
                        ))}
                    </select>
                </div>

                <button

                    type='submit'
                    disabled={carregandoTema}
                    className='flex justify-center rounded disabled:bg-slate-200 bg-indigo-400 
                            hover:bg-indigo-800 text-white font-bold w-1/2 mx-auto py-2'
                >

                    {isLoading ?
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                        <span>Confirmar</span>
                    }
                </button>
            </form>
        </div>
    )
}

export default FormularioPostagem;
