import { Link } from 'react-router-dom'
import Postagem from '../../../models/Postagem'
import { useState } from 'react'

interface CardPostagensProps {
    post: Postagem
}

function CardPostagens({ post }: CardPostagensProps) {

    const [isTextExpanded, setIsTextExpanded] = useState(false);

    let component;

    if (isTextExpanded || post.texto.length <= 20) {
        component = <p id='textoPost'>{post.texto}</p>;
    } else {
        component = (
            <p
                id='textoPost'
                className='h-10 overflow-hidden'
            >
                {post.texto}
            </p>
        );
    }

    return (
        <div className='border-slate-900 border 
            flex flex-col rounded overflow-hidden justify-between min-h-[300px]'>

            <div>
                <div className="py-2 px-6 bg-gradient-to-r from-yellow-300 to-pink-400 font-bold text-2xl dark:bg-gradient-to-r dark:from-yellow-600 dark:to-pink-600">
                </div>
                <div className='p-4'>
                    <h4 className='text-lg font-semibold uppercase truncate'>{post.titulo}</h4>
                    <p className='text-amber-600 font-bold'>Status: {post.estado}</p>
                    <p className='text-blue-900 font-bold'>Tema: {post.tema?.nome}</p>
                    <hr className='w-full' />
                    {component}
                    {post.texto.length >= 80 && (
                        <button
                            onClick={() => setIsTextExpanded(!isTextExpanded)}
                            className='text-blue-500 hover:underline focus:outline-none'
                        >
                            {isTextExpanded ? 'Mostrar menos' : 'Mostrar mais'}
                        </button>
                    )}
                    <p>{post.link}</p>

                </div>
            </div>
            <div>
                <p className='text-end text-xs'>Data: {new Intl.DateTimeFormat(undefined, {
                    dateStyle: 'full',
                    timeStyle: 'medium',
                }).format(new Date(post.data))}</p>
            </div>
            <div className="flex">
                <Link to={`/deletarPostagem/${post.id}`} className='text-white bg-red-400 
                    hover:bg-red-700 w-full flex items-center justify-center dark:bg-red-700 dark:hover:bg-red-950'>
                    <button>Deletar</button>
                </Link>
                <Link to={`/editarPostagem/${post.id}`} className="w-full text-slate-100 bg-green-400 hover:bg-green-800 flex items-center justify-center py-2 dark:bg-green-700 dark:hover:bg-green-950">
                    <button>Editar</button>
                </Link>
            </div>
        </div>
    )
}

export default CardPostagens