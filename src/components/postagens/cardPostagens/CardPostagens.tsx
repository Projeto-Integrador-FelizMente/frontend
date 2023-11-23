import { Link } from 'react-router-dom'
import Postagem from '../../../models/Postagem'
import { useState } from 'react'
import {PencilSimple, TrashSimple} from '@phosphor-icons/react'

interface CardPostagensProps {
    post: Postagem
}

function CardPostagens({ post }: CardPostagensProps) {

    const [isTextExpanded, setIsTextExpanded] = useState(false);

    let component;

    if (isTextExpanded || post.texto.length <= 40) {
        component = <p id='textoPost'>{post.texto}</p>;
    } else {
        component = (
            <p
                id='textoPost'
                className='h-20 overflow-hidden'
            >
                {post.texto}
            </p>
        );
    }

    return (
        <div className='border-slate-900 dark:border-slate-700 border 
            flex flex-col rounded overflow-hidden justify-between min-h-[250px]'>

            <div>
                <div className="py-2 px-6 bg-gradient-to-r from-yellow-300 to-pink-400 font-bold text-2xl dark:bg-gradient-to-r dark:from-yellow-600 dark:to-pink-600">
                </div>
                <div className='flex justify-end'>
                <Link to={`/editarPostagem/${post.id}`} >
                    <PencilSimple size={20}/>
                </Link>
                <Link to={`/deletarPostagem/${post.id}`} >
                    <TrashSimple size={20}/>
                </Link>
                </div>
                <div className='px-4'>
                    <h4 className='text-lg font-semibold uppercase truncate'>{post.titulo}</h4>
                    <p className='text-amber-600 font-bold'>Status: {post.estado}</p>
                    <p className='text-blue-900 dark:text-blue-600 font-bold'>Tema: {post.tema?.nome}</p>
                    <hr className='w-full' />
                    {component}
                    {post.texto.length >= 255 && (
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
         
        </div>
    )
}

export default CardPostagens