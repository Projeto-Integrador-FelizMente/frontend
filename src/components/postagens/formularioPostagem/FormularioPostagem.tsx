import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';

import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { AuthContext } from '../../../contexts/AuthContext';

import Tema from '../../../models/Tema';
import Postagem from '../../../models/Postagem';
import { toastAlerta } from '../../../utils/toastAlerta';
import { ArrowCircleLeft } from '@phosphor-icons/react';

interface FormularioPostagemProps {
    posts?: Postagem[]
    getPosts?: () => void
}

function FormularioPostagem({ posts, getPosts }: FormularioPostagemProps) {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [temas, setTemas] = useState<Tema[]>([]);
    const [tema, setTema] = useState<Tema>({ id: 0, nome: '', descricao: '' });
    const [postagem, setPostagem] = useState<Postagem>({
        id: 0,
        titulo: '',
        estado: "",
        texto: "",
        link: "",
        data: "",
        tema: null,
        user: null,
    });
    const { usuario, handleLogout } = React.useContext(AuthContext);
    const { id } = useParams<{ id: string }>();


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
            toastAlerta('Você precisa estar logado', 'info');
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

                toastAlerta('Postagem atualizada com sucesso', 'sucesso');

            } catch (error: any) {
                if (error.toString().includes('403')) {
                    toastAlerta('O token expirou, favor logar novamente', 'info');
                    handleLogout();
                } else {
                    toastAlerta('Erro ao atualizar a Postagem', 'erro');
                }
            }
        } else {
            try {
                await cadastrar(`/postagens`, postagem, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                });


                toastAlerta('Postagem cadastrada com sucesso', 'sucesso');

            } catch (error: any) {
                if (error.toString().includes('403')) {
                    toastAlerta('O token expirou, favor logar novamente', 'info');
                    handleLogout();
                } else {
                    toastAlerta('Erro ao cadastrar a Postagem', 'erro');
                }
            }
        }

        setIsLoading(false);
        getPosts()
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
        <div className="container flex flex-col mx-auto items-center dark:bg-slate-900 pb-5">
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
                        className="border-2 border-slate-700 dark:border-slate-200 dark:bg-slate-900 rounded p-2"
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
                        className="border-2 border-slate-700 dark:border-slate-200 dark:bg-slate-900 rounded p-2"
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
                        className="border-2 border-slate-700 dark:border-slate-200 dark:bg-slate-900 rounded p-2"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <p>Estado da Postagem</p>
                    <select
                        name="estado"
                        id="estado"
                        className='border p-2 border-slate-800 rounded dark:border-slate-200 dark:bg-slate-900'
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
                    <select name="tema" id="tema" className='border p-2 border-slate-800 rounded dark:border-slate-200 dark:bg-slate-900'
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
                    className='flex justify-center font-bold w-1/2 mx-auto py-2 rounded disabled:bg-slate-200 disabled:shadow-gray-300  shadow-lg shadow-yellow-800  bg-yellow-500 hover:bg-yellow-800 dark:disabled:bg-slate-600 dark:disabled:shadow-gray-600 dark:bg-blue-800 dark:hover:bg-blue-950 dark:shadow-blue-500 text-center'
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
                <div className="lg:hidden fixed bottom- left-4 flex items-center">
                    <Link to='/postagens'>
                        <ArrowCircleLeft size={48} weight="bold" />
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default FormularioPostagem;
