import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";


function Navbar() {

  const navigate = useNavigate();
  const { handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    alert("Usuário deslogado com sucesso");
    navigate("/login");
  }

  return (
    <>
      <div className='w-full bg-indigo-700 text-white
              flex justify-center py-4'>

        <div className="container flex justify-between text-lg">
          FelizMente

          <div className='flex gap-4'>
            <Link to='./home' className="text-indigo-800 hover:underline">
              Postagens
            </Link>

            <Link to='./home' className="text-indigo-800 hover:underline">
              Temas
            </Link>

            <Link to='./home' className="text-indigo-800 hover:underline">
              Cadastrar tema
            </Link>

            <Link to='./home' className="text-indigo-800 hover:underline">
              Perfil
            </Link>

            <Link to="" onClick={logout} className="hover:underline">
              Sair
            </Link>


          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar