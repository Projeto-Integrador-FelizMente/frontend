import { Link } from "react-router-dom";
import Tema from "../../../models/Tema";
import { useState } from 'react'
import {PencilSimple, TrashSimple} from '@phosphor-icons/react'

interface CardTemasProps {
  tema: Tema;
}

function CardTemas({ tema }: CardTemasProps) {

  const [isTextExpanded, setIsTextExpanded] = useState(false);

  let component;

  if (isTextExpanded || tema.descricao.length <= 20) {
    component = <p id='textoPost' className="px-8  text-3xl h-full">{tema.descricao}</p>;
  } else {
    component = (
      <p
        id='textoPost'
        className='h-20 overflow-hidden px-8  text-3xl '
      >
        {tema.descricao}
      </p>
    );
  }
  return (
    <div className="border flex flex-col rounded-2xl overflow-hidden justify-between pb-5">
      <header className="py-2 px-6 bg-gradient-to-r from-yellow-300 to-pink-400 font-bold text-2xl dark:bg-gradient-to-r dark:from-yellow-600 dark:to-pink-600">
        {tema.nome}
      </header>
      <div className='flex justify-end'>
        <Link to={`/editarTema/${tema.id}`} >
          <PencilSimple size={20} />
        </Link>
        <Link to={`/deletarTema/${tema.id}`} >
          <TrashSimple size={20} />
        </Link>
      </div>

      {component}
      {tema.descricao.length >= 80 && (
        <button
          onClick={() => setIsTextExpanded(!isTextExpanded)}
          className='text-blue-500 hover:underline focus:outline-none'
        >
          {isTextExpanded ? 'Mostrar menos' : 'Mostrar mais'}
        </button>
      )}

    </div>
  );
}

export default CardTemas;
