import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RotatingLines } from "react-loader-spinner"

import { buscar, deletar } from '../../../services/Service'
import { AuthContext } from '../../../contexts/AuthContext'

import Postagem from '../../../models/Postagem'
import { toastAlerta } from '../../../utils/toastAlerta'

function DeletarPostagem() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                toastAlerta('O token expirou, favor logar novamente', 'info')
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            toastAlerta('Você precisa estar logado', 'info')
            navigate('/login')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarPostagem() {
        setIsLoading(true)

        try {
            await deletar(`/postagens/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            toastAlerta('Postagem apagada com sucesso', 'sucesso')

        } catch (error) {
            toastAlerta('Erro ao apagar a Postagem', 'erro')
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/perfil")
    }

    return (
        <div className='container w-1/3 mx-auto mb-3'>
            <h1 className='text-4xl text-center my-4'>Deletar Postagem</h1>

            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar a postagem a seguir?
            </p>

            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header className='py-2 px-6 bg-gradient-to-r from-yellow-300 to-pink-400 dark:bg-gradient-to-r dark:from-yellow-600 dark:to-pink-600 text-white font-bold text-2xl'>
                    Postagem
                </header>

                <div className="p-4">
                    <p className='text-xl h-full'>{postagem.titulo}</p>
                    <p>{postagem.texto}</p>
                </div>
                <div className="flex">
                    <button
                        className='text-slate-100 shadow-lg shadow-red-800 bg-red-400 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-950 w-full py-2'
                        onClick={retornar}>
                        Não
                    </button>

                    <button
                        className='w-full text-slate-100 shadow-lg shadow-yellow-800 dark:shadow-blue-500 bg-yellow-500 dark:bg-blue-800  hover:bg-yellow-800 dark:hover:bg-blue-950 text-center'
                        onClick={deletarPostagem}>

                        {isLoading ?
                            <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            /> :
                            <span>Sim</span>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarPostagem