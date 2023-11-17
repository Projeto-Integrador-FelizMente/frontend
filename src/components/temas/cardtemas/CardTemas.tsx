import { Link } from "react-router-dom";
import Tema from "../../../models/Tema";

interface CardTemasProps {
  tema: Tema;
}

function CardTemas({ tema }: CardTemasProps) {
  return (
    <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
      <header className="py-2 px-6 bg-gradient-to-r from-yellow-300 to-pink-400 font-bold text-2xl dark:bg-gradient-to-r dark:from-yellow-600 dark:to-pink-600">
        {tema.nome}
      </header>

      <p className="p-8 text-3xl h-full">{tema.descricao}</p>

      <div className="flex">
      <Link
          to={`/deletarTema/${tema.id}`}
          className="text-slate-100 bg-red-400 hover:bg-red-700 w-full flex items-center justify-center dark:bg-red-700 dark:hover:bg-red-950"
        >
          <button>Deletar</button>
        </Link>
        <Link
          to={`/editarTema/${tema.id}`}
          className="w-full text-slate-100 bg-green-400 hover:bg-green-800 flex items-center justify-center py-2 dark:bg-green-700 dark:hover:bg-green-950"
        >
          <button>Editar</button>
        </Link>

        
      </div>
    </div>
  );
}

export default CardTemas;
