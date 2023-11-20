import { ChangeEvent, FormEvent, useState } from 'react'
import Postagem from '../../../models/Postagem'
import Comentarios from './Comentario'

interface CardPostagensProps {
    post: Postagem
}

function CardPostagensFeed({ post }: CardPostagensProps) {
    const [comentarios, setComentarios] = useState([''])
    const [novoComentarioTexto, setNovoComentarioTexto] = useState('')

    function criarNovoComentario(event: FormEvent) {
        event.preventDefault()
        setComentarios([...comentarios, novoComentarioTexto])
        setNovoComentarioTexto('')
    }
    function atualizarNovoComentario(event: ChangeEvent<HTMLTextAreaElement>) {
        setNovoComentarioTexto(event.target.value)
    }
    return (
        <div className='flex justify-center'>
            <div className='dark:border-slate-300 border-slate-900 border flex-col w-[75%] dark:bg-slate-900 dark:text-white'>

                <div>
                    <div className="py-2 px-6 bg-gradient-to-r from-yellow-300 to-pink-400 font-bold text-2xl dark:bg-gradient-to-r dark:from-yellow-600 dark:to-pink-600">
                    </div>
                    <div className='p-4'>
                        <h4 className='text-lg font-semibold uppercase text-center'>{post.titulo}</h4>
                        <p className='text-amber-600 font-bold ml-6'>Status: {post.estado}</p>
                        <p className='text-blue-900 dark:text-blue-600 font-bold ml-6'>Tema: {post.tema?.nome}</p>
                        <hr className='w-full' />
                        <p className='m-5'>{post.texto}</p>
                        <p>{post.link}</p>
                        <p>Data: {new Intl.DateTimeFormat(undefined, {
                            dateStyle: 'full',
                            timeStyle: 'medium',
                        }).format(new Date(post.data))}</p>
                    </div>
                </div>
                <hr />
                <form onSubmit={criarNovoComentario} className='flex flex-col p-4'>
                    <strong>Comentarios</strong>
                    <div className='flex '>
                        <textarea
                            className='w-full mt-4 mr-5 dark:border-slate-200 dark:bg-slate-900'
                            name='comment'
                            placeholder='Deixe seu comentário'
                            value={novoComentarioTexto}
                            onChange={atualizarNovoComentario}
                            required
                        />
                        <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold mt-2 py-2 px-4 rounded-full" type="submit">
                            Publicar
                        </button>
                    </div>
                </form>
                <div className='border-slate-900'>   
                    {comentarios.map(comentario => {
                        return (
                            <Comentarios conteudo={comentario} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default CardPostagensFeed