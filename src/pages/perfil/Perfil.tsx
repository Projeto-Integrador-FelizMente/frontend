import { useContext, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'
import ListaPostagensById from '../../components/postagens/listaPostagens/ListaPostagensById'
import { toastAlerta } from '../../utils/toastAlerta'

function Perfil() {

    const navigate = useNavigate()

    const { usuario } = useContext(AuthContext)

    useEffect(() => {
        if (usuario.token === "") {
            toastAlerta('Você precisa estar logado', 'info')
            navigate("/login")
        }
    }, [usuario.token])

    return (
        <>
            <div className='sm:flex lg:flex md:flex'>

                <div className='flex sm:flex-col md:flex-col lg:flex-col md:w-1/4 md:h-[100] md:min-h-screen sm:w-1/4 sm:h-[100] sm:min-h-screen lg:w-1/4 lg:h-[100] lg:min-h-screen bg-purple-400 dark:bg-purple-800 '>

                    <img className='rounded-full w-16 h-16 m-1 sm:w-32 sm:h-32 md:w-56 md:h-56 md:mx-auto md:mt-4 border-slate-900 border relative z-1' src={usuario.foto} alt={`Foto de perfil de ${usuario.nome}`} />

                    <div className="flex gap-4 mt-5 md:ml-2 md:mt-2 sm:flex-col md:flex-col lg:flex-col text-white text-xs sm:text-xl md:text-xl lg:text-2xl justify-center">
                        <div>
                            <p className=' font-bold'>Nome:</p>
                            <p>{usuario.nome}</p>
                        </div>
                        <div>
                            <p className='font-bold'>Email:</p>
                            <p> {usuario.usuario}</p>
                        </div>
                        <div>
                            <p className=' font-bold'>Tipo: </p>
                            <p>{usuario.tipo}</p>
                        </div>
                    </div>
                    <div className='justify-end md:justify-normal'>
                        <hr className='mb-5' />
                        <Link to={`/atualizarUsuario/${usuario.id}`}  >
                            <button className='bg-purple-800 hover:bg-purple-500 ml-4 md:ml-0 border md:border-double border-white md:border-4 justify-center md:w-full  md:h-10 text-white md:text-[18px]'>EDITAR</button>
                        </Link>
                    </div>
                </div>
                <div className='mx-auto text-center sm:ml-1 lg:ml-4 md:ml-2'>
                    <h1 className='md:text-xl font-bold underline'>Minhas Postagens</h1>
                    <ListaPostagensById />
                </div>
            </div>
        </>
    )
}

export default Perfil