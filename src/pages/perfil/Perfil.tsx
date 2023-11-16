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

    console.log(usuario)
    return (
        <>
            <div className='flex'>

                <div className='container w-1/4 h-[100] min-h-screen bg-purple-400 dark:bg-purple-800  col-span-3'>

                    <img
                        className='rounded-full w-56 h-56 mx-auto text-center mt-4 border-slate-900 border justify-center'
                        src={usuario.foto} alt={`Foto de perfil de ${usuario.nome}`} />

                    <div
                        className=" ml-2 mt-2 flex flex-col
                     text-white text-xl justify-center"
                    >
                        <p className=' font-bold'>Nome:</p>
                        <p>{usuario.nome}</p>
                        <p className='font-bold'>Email:</p>
                        <p> {usuario.usuario}</p>
                        <p className=' font-bold'>Tipo: </p>
                        <p>{usuario.tipo}</p>
                    </div>

                    <hr className='mb-5'/>
                    <Link to={`/atualizarUsuario/${usuario.id}`}  >
                        <button className='bg-purple-800 hover:bg-purple-500 border-double border-white border-4 p justify-center w-full  h-10 text-white text-[18px]'>EDITAR</button>
                    </Link>
                </div>
                <div className='mx-auto text-center ml-2'>
                    <h1 className='text-xl font-bold underline'>Minhas Postagens</h1>
                    <ListaPostagensById />
                </div>
            </div>
        </>
    )
}

export default Perfil