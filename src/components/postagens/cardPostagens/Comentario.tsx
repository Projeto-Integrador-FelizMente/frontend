interface ComentariosProps {
    conteudo: string
}

function Comentarios({ conteudo }: ComentariosProps) {
    return (
        <p className="mx-6 mb-4 ">{conteudo}</p>
    )
}

export default Comentarios