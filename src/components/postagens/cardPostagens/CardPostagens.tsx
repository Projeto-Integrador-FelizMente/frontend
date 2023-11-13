import { Link } from 'react-router-dom'
import Postagem from '../../../models/Postagem'

interface CardPostagensProps {
    post: Postagem
}

function CardPostagens({ post }: CardPostagensProps) {
    return (
        <div className='border-slate-900 border 
            flex flex-col rounded overflow-hidden justify-between'>

            <div>
                <div className="py-2 px-6 bg-gradient-to-r from-yellow-300 to-pink-400 font-bold text-2xl">  
                </div>
                <div className='p-4'>
                    <h4 className='text-lg font-semibold uppercase'>{post.titulo}</h4>
                    <p className='text-amber-600 font-bold'>Status: {post.estado}</p>
                    <p>{post.texto}</p>
                    <p>Tema: {post.tema?.nome}</p>

                    <p>{post.link}</p>
                    <p>Data: {new Intl.DateTimeFormat(undefined, {
                        dateStyle: 'full',
                        timeStyle: 'medium',
                    }).format(new Date(post.data))}</p>
                </div>
            </div>
            <div className="flex">
                <Link to={`/deletarPostagem/${post.id}`} className='text-white bg-red-400 
                    hover:bg-red-700 w-full flex items-center justify-center'>
                    <button>Deletar</button>
                </Link>
                        <Link to={`/editarPostagem/${post.id}`} className="w-full text-slate-100 bg-green-400 hover:bg-green-800 
                                flex items-center justify-center py-2">
                            <button>Editar</button>
                        </Link>
            </div>
        </div>
    )
}

export default CardPostagens