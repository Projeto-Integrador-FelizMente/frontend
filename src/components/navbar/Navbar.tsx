import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div
        className="w-full bg-indigo-700 text-white
              flex justify-center py-4"
      >
        <div className="container flex justify-between text-lg">
          FelizMente
          <div className="flex gap-4">
            <Link to="./home" className="text-indigo-800 hover:underline">
              Postagens
            </Link>

            <Link to="./home" className="text-indigo-800 hover:underline">
              Temas
            </Link>

            <Link to="./home" className="text-indigo-800 hover:underline">
              Cadastrar tema
            </Link>

            <Link to="./home" className="text-indigo-800 hover:underline">
              Perfil
            </Link>

            <Link to="./login" className="text-indigo-800 hover:underline">
              Sair
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
