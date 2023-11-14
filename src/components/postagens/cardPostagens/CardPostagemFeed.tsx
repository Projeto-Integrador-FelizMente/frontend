import Postagem from '../../../models/Postagem'

interface CardPostagensProps {
    post: Postagem
}

function CardPostagensFeed({ post }: CardPostagensProps) {
    return (
        <div className='border-slate-900 border 
            flex flex-col rounded overflow-hidden justify-between w-[75%] mx-auto'>

            <div>
                <div className="py-2 px-6 bg-gradient-to-r from-yellow-300 to-pink-400 font-bold text-2xl">  
                </div>
                <div className='p-4'>
                    <h4 className='text-lg font-semibold uppercase text-center'>{post.titulo}</h4>
                    <p className='text-amber-600 font-bold ml-6'>Status: {post.estado}</p>
                    <p className='ml-6'>Tema: {post.tema?.nome}</p>
                    <hr className='w-full'/>
                    <p className='m-5'>{post.texto}</p>
                    <p>{post.link}</p>
                    <p>Data: {new Intl.DateTimeFormat(undefined, {
                        dateStyle: 'full',
                        timeStyle: 'medium',
                    }).format(new Date(post.data))}</p>
                </div>
            </div>
            
        </div>
    )
}

export default CardPostagensFeed