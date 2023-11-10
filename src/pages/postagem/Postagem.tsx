import { useState, useEffect } from 'react'
import Postagem from '../../models/Postagem'
import { listar } from '../../services/Service'
import CardPosts from '../../components/postagens/cardPostagens/CardPostagens'

function Postagens() {
    const [postagens, setPostagens] = useState<Postagem[]>([])
    async function listarPostagens() {
        try {
            await listar('postagens', setPostagens)
        } catch (error) {
            console.log(`Erro: ${error}`)
        }
    }
    useEffect(() => {
        listarPostagens()
    }, [])
    return (
        <div className='flex flex-col items-center'>
            <div className='my-5'>
                {
                    postagens.map((item) => {
                        return (
                            <>
                               <CardPosts post={item} />
                            </>
                        )
                    })
                }
            </div>
        </ div>
    )
}

export default Postagens