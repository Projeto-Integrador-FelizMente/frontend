import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'
import ListaPostagensById from '../../components/postagens/listaPostagensById/ListaPostagensById'

function Perfil() {

    const navigate = useNavigate()

    const { usuario } = useContext(AuthContext)

    useEffect(() => {
        if (usuario.token === "") {
            alert('Você precisa estar logado')
            navigate("/login")
        }
    }, [usuario.token])

    return (
        <>
            <div className='flex'>
                
                <div className='container rounded-2xl overflow-hidden w-1/4 h-screen bg-sky-500 '>

                    <img
                        className='rounded-full w-56 h-56 mx-auto text-center  border-slate-900 border justify-center'
                        src={usuario.foto} alt={`Foto de perfil de ${usuario.nome}`} />

                    <div
                        className="  flex flex-col
                     text-white text-2xl items-center justify-center"
                    >
                        <p>Nome: {usuario.nome} </p>
                        <p>Email: {usuario.usuario}</p>
                        <p>Tipo: {usuario.tipo}</p>
                    </div>

                </div>
                <div className='mx-auto text-center ml-2'>
                    <h1 className='text-xl font-bold underline'>Minhas Postagens</h1>
                    <ListaPostagensById/>
                </div>
            </div>
        </>
    )
}

export default Perfil